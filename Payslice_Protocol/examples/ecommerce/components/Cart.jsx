import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import { useRouter } from 'next/router'
import toast from 'react-hot-toast';
import { ethers } from "ethers";
import Link from 'next/link';

import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client';
import { TOKENS } from '../constants/tokens';
import { address as loggerAddress, abi as loggerAbi } from "../constants/logger.json";
import { keccak256 } from 'ethers/lib/utils';

const Cart = () => {
	const [isLoading, setLoading] = useState(false);
	const cartRef = useRef();
	const targetToken = TOKENS.cEUR;
	const recipientAddress = "0x3c25848655C9fccB1124A4eD4aa937cfd0b43Ba8";
	const recipientAddressChainId = 44787;
	const router = useRouter();

	const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuanitity, onRemove } = useStateContext();
	const payeruid = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(JSON.stringify({ ...cartItems, timestamp: Date.now() })));
	
	const loggerContract = useMemo(() =>
		new ethers.Contract(
			loggerAddress, loggerAbi,
			new ethers.providers.Web3Provider(window.ethereum)
		),
		[loggerAddress, loggerAbi]);

	useEffect(() => {
		// create a subscription and listen for payments

		const eventFilter = loggerContract.filters.PaymentMade(null, payeruid);
		console.log("listening");
		loggerContract.on(eventFilter, (...eventData) => {
			const [proxy, puid, amountPaid, totalPaid, txnNumber] = eventData;
			
			if (keccak256(payeruid) == puid.hash && parseFloat(ethers.utils.formatEther(totalPaid)) >= totalPrice) {
				//redirect
				router.push("/success");
			}

		})

		return () => loggerContract.removeAllListeners();
	}, []);

	const handleCheckout = async () => {
		// const stripe = await getStripe();
		let toastId;
		try {
			setLoading(true);

			toastId = toast.loading('Preparing Invoice...');


			const response = await fetch('/api/payslice', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					cartItems,
					title: "JSM Purchase Invoice",
					totalReceivable: ethers.utils.parseEther(totalPrice.toString()),
					targetToken,
					recipientAddress,
					recipientAddressChainId,
					payeruid
				}),
			});

			toast.remove(toastId);

			if (response.statusCode === 500) return;

			const result = await response.json();

			toastId = toast.loading('Redirecting...');

			const payslice_site = "localhost:3001/payment";
			window.open(`http://${payslice_site}?ref=${window.location.href}&cad=${result.proxy}&pid=${result.payeruid}`, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');
			// console.log('window');


		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
			toast.remove(toastId)
		}


	}

	return (
		<div className="cart-wrapper" ref={cartRef}>
			<div className="cart-container">
				<button
					type="button"
					className="cart-heading"
					onClick={() => setShowCart(false)}>
					<AiOutlineLeft />
					<span className="heading">Your Cart</span>
					<span className="cart-num-items">({totalQuantities} items)</span>
				</button>

				{cartItems.length < 1 && (
					<div className="empty-cart">
						<AiOutlineShopping size={150} />
						<h3>Your shopping bag is empty</h3>
						<Link href="/">
							<button
								type="button"
								onClick={() => setShowCart(false)}
								className="btn"
							>
								Continue Shopping
							</button>
						</Link>
					</div>
				)}

				<div className="product-container">
					{cartItems.length >= 1 && cartItems.map((item) => (
						<div className="product" key={item._id}>
							<img src={urlFor(item?.image[0])} className="cart-product-image" />
							<div className="item-desc">
								<div className="flex top">
									<h5>{item.name}</h5>
									<h4>{item.price} cEUR</h4>
								</div>
								<div className="flex bottom">
									<div>
										<p className="quantity-desc">
											<span className="minus" onClick={() => toggleCartItemQuanitity(item._id, 'dec')}>
												<AiOutlineMinus />
											</span>
											<span className="num" onClick="">{item.quantity}</span>
											<span className="plus" onClick={() => toggleCartItemQuanitity(item._id, 'inc')}><AiOutlinePlus /></span>
										</p>
									</div>
									<button
										type="button"
										className="remove-item"
										onClick={() => onRemove(item)}
									>
										<TiDeleteOutline />
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
				{cartItems.length >= 1 && (
					<div className="cart-bottom">
						<div className="total">
							<h3>Subtotal:</h3>
							<h3>{totalPrice} cEUR</h3>
						</div>
						<div className="btn-container">
							<button type="button" disabled={isLoading} className="btn" onClick={handleCheckout}>
								Pay with Slice
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default Cart