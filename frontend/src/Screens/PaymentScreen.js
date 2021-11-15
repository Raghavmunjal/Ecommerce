import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckout from "../Components/StripeCheckout";
import "../stripe.css";

// load Stripe outside of components render to avoid recreating stripe object on every render
const promise = loadStripe(
  "pk_test_51JvbrlSDzC3xMfDCFOxmWUACkaTHfbhyR26GTFy2bSR98RCCOpIVYjgGOlNkw5Iv8FXhTUIoRRVHvcHj5cb35hT500b0bxwvvV"
);

const PaymentScreen = ({ history }) => {
  const intended = history.location.state;
  return (
    <div className="container p-5 text-center">
      <h3 style={{ textAlign: "center", marginTop: 60, color: "#001529" }}>
        Complete your Purchase
      </h3>
      <div className="underline"></div>
      <Elements stripe={promise}>
        <div className="col-md-8 offset-md-2">
          <StripeCheckout intended={intended} />
        </div>
      </Elements>
    </div>
  );
};

export default PaymentScreen;
