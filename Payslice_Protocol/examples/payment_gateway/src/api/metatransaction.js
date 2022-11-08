import { signERC2612Permit } from 'eth-permit';
import { approve, createContract, createTokenContract } from '../helpers';
import forwarderAbi from "../interface/Forwarder.json"
import { signMetaTxRequest } from '../helpers/signer';
import { TOKENS } from '../constants/invoicedata';
import { BigNumber } from 'ethers';

async function sendTx(sliceContract, signer, paymentDetails) {
	// console.log(`Making payment`);
	const [inputToken, , , amountIn] = paymentDetails;

	// console.log(inputToken,
	// 	signer,
	// 	sliceContract.address,
	// 	amountIn);

	await approve(
		inputToken,
		signer,
		sliceContract.address,
		amountIn
	);

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
	payToken) {

	try {

		if (!inputToken) throw new Error(`input token cannot be empty`);
		if (!sender) throw new Error(`sender cannot be empty`);
		if (!amountOut) throw new Error(`amountOut cannot be empty`);
		if (!amountIn) throw new Error(`amountIn cannot be empty`);
		if (!payeruid) throw new Error(`payeruid cannot be empty`);
		if (!window.ethereum) throw new Error(`User wallet not found`);

		await window.ethereum.enable();
		const forwarder = createContract(forwarderAbi.address, forwarderAbi.abi, signer);

		// If `payToken` is native token do not use meta transactions
		// console.log(payToken, TOKENS.Celo)
		if (payToken === TOKENS.Celo) {
			return sendTx(sliceContract.connect(signer), signer, [
				inputToken,
				sender,
				amountOut,
				amountIn,
				payeruid,
				path
			])

		}

		// Esitmated gas cost in celo
		const { signature, request } = await signRequest(sliceContract, from, signer, [
			inputToken,
			sender,
			amountOut,
			amountIn,
			payeruid,
			path
		]);

		const verified = await forwarder.verify(request, signature);

		if (!verified) throw Error("Signature verification failed");

		const encodedFunctionData = forwarder.interface.encodeFunctionData("execute", [request, signature]);
		const gasPrice = await signer.getGasPrice();
		const gasRequired = await signer.estimateGas({
			to: forwarder.address,
			data: encodedFunctionData
		});

		const transactionCost = gasPrice.mul(gasRequired);

		const tokenContract = createTokenContract(payToken, signer);
		const [balance, [transactionFee,]] = await Promise.all([tokenContract.balanceOf(from), forwarder.gasCost(transactionCost, [payToken, TOKENS.Celo])]);
		const canSendTx = balance.gt(transactionFee);

		if (!canSendTx) throw Error("Insufficient balance for gas fees");

		const approveInputTokenSignature = (inputToken === TOKENS.DAI) ?

			await signERC2612Permit(window.ethereum, inputToken, from, sliceContract.address, amountIn.toString()) :
			await approve(
				inputToken,
				signer,
				sliceContract.address,
				amountIn
			);

		const approvePayTokenSignature = (payToken === TOKENS.DAI) ?
			await signERC2612Permit(window.ethereum, payToken, from, forwarder.address, transactionFee.toString()) :
			await approve(
				payToken,
				signer,
				forwarder.address,
				transactionFee
			);

		//append `payToken` if `approveInputTokenSignature` is defined
		const approvalRequest = approveInputTokenSignature ? { ...approveInputTokenSignature, payToken } : approveInputTokenSignature;

		//append `payToken` if `approvePayTokenSignature` is defined
		const permitRequest = approvePayTokenSignature ? { ...approvePayTokenSignature, payToken } : approvePayTokenSignature;

		console.log(approvalRequest, permitRequest);

		if (permitRequest) {
			const gasTxn = await forwarder.executeGasPayment(
				permitRequest.payToken,
				approvalRequest.owner,
				approvalRequest.spender,
				approvalRequest.value,
				approvalRequest.deadline,
				approvalRequest.value,
				approvalRequest.v,
				approvalRequest.r,
				approvalRequest.s
			);
			const txnRes = await gasTxn.wait();
			console.log(txnRes);
		}

		return;


		const resp = await sendMetaTx({ request, signature, undefined, approvalRequest });
		const res = await resp.json()
		console.log(JSON.parse(res.result));
		// console.log(resp);

		return resp;
	} catch (error) {
		console.log(error);
	}

}
