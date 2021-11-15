import React, { useState, useEffect } from "react";
import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import { createPaymentIntent } from "../axios/payment";
import { Link } from "react-router-dom";
import { Alert } from "antd";

const StripeCheckout = ({ intended }) => {
  const stripe = useStripe();
  const elements = useElements();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const applyCoupon = useSelector((state) => state.applyCoupon);

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  const [cartTotal, setCartTotal] = useState(0);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [payable, setPayable] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    createPaymentIntent(applyCoupon, userInfo.token).then((res) => {
      setClientSecret(res.data.clientSecret);
      setCartTotal(res.data.cartTotal);
      setTotalAfterDiscount(res.data.totalAfterDiscount);
      setPayable(res.data.payable);
    });
  }, [userInfo, applyCoupon]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: e.target.name.value,
        },
      },
    });

    if (payload.error) {
      setError(`Payment Failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      // successful
      // create order and save in database
      // empty user cart
      console.log(JSON.stringify(payload, null, 4));
      setProcessing(false);
      setError(null);
      setSuccess(true);
    }
  };

  const handleChange = async (e) => {
    // listen for changes in card
    // display any errors as customer type their card details
    setDisabled(e.empty); // disables paybutton if error
    setError(e.error ? e.error.message : "");
    setProcessing(false);
  };

  const message = () => (
    <>
      Payment Successfull{" "}
      <Link to="/user/history">See it in your purchase history</Link>
    </>
  );

  const description = () => (
    <>
      <p>Cart total: Rs.{cartTotal}</p>
      {intended.from !== "" && (
        <>
          <p>Coupon Applied: {intended.from}</p>
          <p>Total After Discount: Rs.{totalAfterDiscount}</p>
        </>
      )}
    </>
  );

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  return (
    <>
      <form id="payment-form" className="stripe-form" onSubmit={handleSubmit}>
        <Alert
          message={`Amount to be paid: Rs. ${payable / 100}`}
          type="info"
          description={show && description()}
          className="text-left mb-4"
          action={
            <span
              className="text-info"
              style={{ fontSize: "17px", cursor: "pointer" }}
              onClick={() => setShow(!show)}
            >
              <i class="fas fa-info-circle"></i>
            </span>
          }
        />

        <CardElement
          id="card-element"
          options={cardStyle}
          onChange={handleChange}
        />
        <button
          className="stripe-button"
          disabled={processing || disabled || success}
        >
          <span id="button-text">
            {processing ? <div className="spinner" id="spinner"></div> : "Pay"}
          </span>
        </button>
        {error && (
          <div className="card-error text-danger" role="alert">
            {error}
          </div>
        )}
        {success && (
          <Alert
            message={message()}
            type="success"
            showIcon
            className="mt-3 mb-3"
          />
        )}
      </form>
    </>
  );
};

export default StripeCheckout;
