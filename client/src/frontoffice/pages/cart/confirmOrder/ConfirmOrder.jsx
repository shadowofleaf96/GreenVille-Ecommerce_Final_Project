import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../../components/footer/Footer";
import Navbar from "../../../components/header/Navbar";
import MetaData from "../../../components/MetaData";
import CheckoutSteps from "../checkoutSteps/CheckoutSteps";
const backend = import.meta.env.VITE_BACKEND_URL;


const ConfirmOrder = () => {
    const { cartItems, shippingInfo } = useSelector((state) => state.carts);
    const { customer } = useSelector((state) => state.customers);

    const history = useNavigate();

    const itemsPrice = cartItems.reduce(
        (acc, item) => acc + item.discountPrice * item.quantity,
        0
    );

    if (itemsPrice === 0) {
        history("/products")
    }

    let shippingPrice;

    if (itemsPrice <= 1500) {
        shippingPrice = 15;
    } else {
        shippingPrice = 0
    }

    const taxPrice = Number((0.20 * itemsPrice).toFixed(2));
    const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2);

    const processToPayment = () => {
        history("/payment", { replace: true });
    };

    return (
        <div className="flex flex-col gap-6 w-full">
            <MetaData title={"Confirm Order"} />
            <div className="container py-2 my-8 mx-auto">
                <div className="flex flex-col">
                    <CheckoutSteps shipping confirmOrder />
                </div>
                <div className="flex justify-center ml-8 mt-8">
                    <div className="mb-8 lg:mb-0 bg-white shadow-lg p-8 rounded-2xl mx-auto border border-gray-200 w-full">
                        <h4 className="text-lg font-semibold mb-3">Shipping Info</h4>
                        <p className="text-gray-700 mb-2">
                            <b>Name: </b> {customer && `${customer.first_name} ${customer.last_name}`}
                        </p>
                        <p className="text-gray-700 mb-2">
                            <b>Phone: </b> {shippingInfo.phoneNo}
                        </p>
                        <p className="text-gray-700 mb-4">
                            <b>Address: </b> {`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`}
                        </p>

                        <hr className="my-4" />

                        <h4 className="text-lg font-semibold mt-4">Your Cart Items:</h4>

                        {cartItems.map((item) => (
                            <Fragment key={item.product}>
                                <hr className="my-2" />
                                <div className="flex items-center py-2">
                                    <div className="w-1/4 lg:w-1/6">
                                        <img
                                            src={typeof item?.image === "string" ? `${backend}/${item?.image}` : `${backend}/${item?.image[0]}`}
                                            alt={item.name}
                                            className="w-16 h-16 object-cover"
                                        />
                                    </div>
                                    <div className="w-1/2 lg:w-1/2">
                                        <Link to={`/products/${item.product}`} className="text-blue-600 hover:underline">
                                            {item.name}
                                        </Link>
                                    </div>
                                    <div className="w-1/4 lg:w-1/6">
                                        <p className="text-gray-700">
                                            {item.quantity} x {item.discountPrice} DH ={" "}
                                            <b>{(item.quantity * item.discountPrice).toFixed(2)} DH</b>
                                        </p>
                                    </div>
                                </div>
                            </Fragment>
                        ))}
                    </div>

                    <div className="w-full ml-8">
                        <div className="bg-blue-50 p-4 rounded-lg shadow">
                            <h4 className="text-lg font-semibold mb-4">Order Summary</h4>
                            <hr className="mb-4" />
                            <p className="flex justify-between mb-2">
                                Subtotal <span>{itemsPrice} DH</span>
                            </p>
                            <p className="flex justify-between mb-2">
                                Shipping <span>{shippingPrice} DH</span>
                            </p>
                            <p className="flex justify-between mb-2">
                                Tax <span>{taxPrice} DH</span>
                            </p>

                            <hr className="my-4" />

                            <p className="flex justify-between text-xl font-bold">
                                Total <span>{totalPrice} DH</span>
                            </p>

                            <hr className="my-4" />

                            <button
                                className="w-full bg-[#8DC63F] font-medium shadow-none transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-yellow-400 text-white py-3 px-8 rounded-lg mt-4"
                                onClick={processToPayment}
                            >
                                Proceed to Payment
                            </button>
                        </div>
                    </div >
                </div>
            </div>
        </div >
    );
};

export default ConfirmOrder;
