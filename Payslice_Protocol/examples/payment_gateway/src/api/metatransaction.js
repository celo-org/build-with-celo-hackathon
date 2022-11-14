import { signERC2612Permit } from 'eth-permit';
import { approve, createContract, createTokenContract } from '../helpers';
import forwarderAbi from "../interface/Forwarder.json"
import { signMetaTxRequest } from '../helpers/signer';
import { ERC20PermitTokens, TOKENS } from '../constants/invoicedata';

async function sendTx(sliceContract, paymentDetails) {

	const txn = await sliceContract.makePayment(...paymentDetails, { gasLimit: 700000 });

	const result = await txn.wait();

	return result;
}

async function signRequest(sliceContract, from, signer, paymentDetails) {

	const forwarder = createContract(forwarderAbi.address, forwarderAbi.abi, signer);
	const data = sliceContract.interface.encodeFunctionData('makePayment', [...paymentDetails]);
	const to = sliceContract.address;

	const request = await signMetaTxRequest(signer, forwarder, { to, from, data });
	return request;
}

async function sendMetaTx(request) {
	console.log(`Making payment`);
	const url = process.env.REACT_APP_WEBHOOK_URL;
	if (!url) throw new Error(`Missing relayer url`);

	const resp = await fetch(url, {
		method: 'POST',
		body: JSON.stringify(request),
		headers: { 'Content-Type': 'application/json' },
	});

	return resp;
}

export async function makePayment(
	sliceContract,
	signer,
	from,
	inputToken,
	sender,
	amountOut,
	amountIn,
	payeruid,
	path,
	payToken, {
		onSuccess = () => { },
		onStateChange = (message) => { },
		onError = (error) => { }
	} = {}) {

	try {
		onStateChange("Validating data...");
		if (!inputToken) throw new Error(`input token cannot be empty`);
		if (!sender) throw new Error(`sender cannot be empty`);
		if (!amountOut) throw new Error(`amountOut cannot be empty`);
		if (!amountIn) throw new Error(`amountIn cannot be empty`);
		if (!payeruid) throw new Error(`payeruid cannot be empty`);
		if (!window.ethereum) throw new Error(`User wallet not found`);

		onStateChange("Connecting to wallet");
		await window.ethereum.enable();
		const forwarder = createContract(forwarderAbi.address, forwarderAbi.abi, signer);


		// If `payToken` is native token do not use meta transactions
		// console.log(payToken, TOKENS.Celo)
		if (payToken === TOKENS.Celo) {
			onStateChange("Approve token allowance");
			await approve(
				inputToken,
				signer,
				sliceContract.address,
				amountIn
			);
			onStateChange("Transfering tokens");
			return sendTx(sliceContract.connect(signer), [
				inputToken,
				sender,
				amountOut,
				amountIn,
				payeruid,
				path
			]);
		}

		// Use meta transaction and charge gas in selected token
		// If the token supports permit then charge in the same token for approval
		// Else use native currency to execute approvals

		// Sign transaction 
		onStateChange("Sign meta transaction");
		const { signature, request } = await signRequest(sliceContract, from, signer, [
			inputToken,
			sender,
			amountOut,
			amountIn,
			payeruid,
			path
		]);

		// verify signature
		onStateChange("Verifying transaction signature");
		const verified = await forwarder.verify(request, signature);

		if (!verified) throw Error("Signature verification failed");

		// estimate gas cost for transaction
		onStateChange("Estimating transaction gas");
		const encodedFunctionData = forwarder.interface.encodeFunctionData("execute", [request, signature]);
		const gasPrice = await signer.getGasPrice();
		const gasRequired = await signer.estimateGas({
			to: forwarder.address,
			data: encodedFunctionData
		});

		const transactionCost = gasPrice.mul(gasRequired);

		//check user balance if there is enough tokens to pay for the transaction
		const tokenContract = createTokenContract(payToken, signer);
		const [balance, [transactionFee,]] = await Promise.all([tokenContract.balanceOf(from), forwarder.gasCost(transactionCost, [payToken, TOKENS.Celo])]);
		const canSendTx = balance.gt(transactionFee);

		if (!canSendTx) throw Error("Insufficient balance for gas fees");

		// If token supports permit, use meta transaction for approval
		// Else use native currency.
		onStateChange("Approving selected Tokens");

		let approveInputTokenSignature = undefined;

		if (ERC20PermitTokens.includes(inputToken))
			approveInputTokenSignature = await signERC2612Permit(window.ethereum, inputToken, from, sliceContract.address, amountIn.toString(), undefined, (await tokenContract.nonces(from)).toString())
		else {
			onStateChange("Token does not support off-chain approval. Approve allowance on-chain. This will cost gas");
			approveInputTokenSignature = await approve(
				inputToken,
				signer,
				sliceContract.address,
				amountIn
			);
		}


		//append `payToken` if `approveInputTokenSignature` is defined
		const approvalRequest = approveInputTokenSignature ? { ...approveInputTokenSignature, payToken } : approveInputTokenSignature;
		console.log()
		// If approval request is via meta transaction
		if (approvalRequest) {
			onStateChange("Sending allowance permit request");
			const resp = await sendMetaTx({ approvalRequest });
			const res = await resp.json();
		}

		// wait 12 sec before attempting next signing.
		// This will make sure changes persist on the blockchain
		await new Promise((resolve, reject) =>
			setTimeout(() => resolve(), 1000 * 18)
		)

		onStateChange("Approving payment Tokens");

		// If token supports permit, use meta transaction for approval for payment token
		// Else use native currency.
		let approvePayTokenSignature = undefined;
		if (ERC20PermitTokens.includes(payToken))
			approvePayTokenSignature = await signERC2612Permit(window.ethereum, payToken, from, forwarder.address, transactionFee.toString(), undefined, (await tokenContract.nonces(from)).toString())
		else {
			onStateChange("Token does not support off-chain approval. Approve allowance on-chain. This will cost gas");
			approvePayTokenSignature = await approve(
				payToken,
				signer,
				forwarder.address,
				transactionFee
			);
		}

		//append `payToken` if `approvePayTokenSignature` is defined
		const paygasRequest = approvePayTokenSignature ? { ...approvePayTokenSignature, payToken } : approvePayTokenSignature;

		if (paygasRequest) {
			onStateChange("Completing transactions.");
			const resp = await sendMetaTx({ request, signature, paygasRequest });
			const res = await resp.json();
		}

		onSuccess({
			sliceContract,
			signer,
			from,
			inputToken,
			sender,
			amountOut,
			amountIn,
			payeruid,
			path,
			payToken,
		});

		// wait 5 sec for block confirmation.
		// This will make sure changes persist on the blockchain
		await new Promise((resolve, reject) =>
			setTimeout(() => resolve(), 5000)
		)

		return true;

	} catch (error) {
		console.log(error);
		onError(error);
	} finally {
		onStateChange("Transaction complete");
	}

}
