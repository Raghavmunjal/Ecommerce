import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckout from "../Components/StripeCheckout";
import "../stripe.css";
import CheckoutSteps from "../Components/CheckoutSteps";
import Meta from "../Components/Meta";

// load Stripe outside of components render to avoid recreating stripe object on every render
const promise = loadStripe(
  "pk_test_51JvbrlSDzC3xMfDCFOxmWUACkaTHfbhyR26GTFy2bSR98RCCOpIVYjgGOlNkw5Iv8FXhTUIoRRVHvcHj5cb35hT500b0bxwvvV"
);

const PaymentScreen = ({ history }) => {
  const intended = history.location.state;
  return (
    <div className="container p-5 text-center">
      <Meta title="Payment" />
      <div className="row">
        <div className="col-md-8 offset-md-2 mb-5 mt-2">
          <CheckoutSteps step3 />
        </div>
      </div>
      <Elements stripe={promise}>
        <div className="col-md-8 offset-md-2">
          <StripeCheckout intended={intended} />
        </div>
      </Elements>
    </div>
  );
};

export default PaymentScreen;
