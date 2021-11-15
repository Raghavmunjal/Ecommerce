import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CartCards from "../Components/cards/CartCards";
import { saveUserCartItems } from "../axios/cart";
import { toast } from "react-toastify";

const CartScreen = ({ history }) => {
  const { cartItems } = useSelector((state) => state.cart);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const getTotal = () => {
    return cartItems.reduce((acc, curr) => {
      return acc + curr.count * curr.price;
    }, 0);
  };

  const saveOrderToDb = () => {
    saveUserCartItems(cartItems, userInfo.token)
      .then((res) => {
        if (res.data.success === true) history.push("/checkout");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  const showCartItems = () => {
    return (
      <table className="table table-bordered">
        <thead className="thead-light">
          <tr>
            <th scope="col">Image</th>
            <th scope="col">Title</th>
            <th scope="col">Price</th>
            <th scope="col">Brand</th>
            <th scope="col">Color</th>
            <th scope="col">Quantity</th>
            <th scope="col">Shipping</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>

        {cartItems.map((c) => {
          return <CartCards key={c._id} c={c} />;
        })}
      </table>
    );
  };

  return (
    <div className="container-fluid pt-2">
      <div className="row">
        <div className="col">
          <h3 style={{ marginTop: 60, color: "#001529" }}>
            Cart / {cartItems.length}
          </h3>
        </div>
      </div>
      <div className="row">
        <div className="col-md-8">
          {!cartItems.length ? (
            <h4>
              No Products in Cart
              <Link to="/shop"> Continue Shopping</Link>
            </h4>
          ) : (
            showCartItems()
          )}
        </div>
        <div className="col-md-4">
          <h3 style={{ color: "#001529", fontSize: "25px" }}>Order Summary</h3>
          <hr />
          <h3 style={{ color: "#001529", fontSize: "18px" }}>Products</h3>
          {cartItems.length > 0 &&
            cartItems.map((c, i) => (
              <div key={i}>
                <p>
                  {c.title} x {c.count} = Rs.{c.price * c.count}
                </p>
              </div>
            ))}
          {cartItems.length > 0 && (
            <>
              <hr />
              Total : <b>Rs. {getTotal()}</b>
            </>
          )}

          <hr />
          {userInfo ? (
            <button
              className="btn btn-sm btn-raised  btn-primary mt-2"
              onClick={saveOrderToDb}
              disabled={cartItems.length === 0}
            >
              <span className="h6">Proceed to Checkout</span>
            </button>
          ) : (
            <button className="btn btn-sm btn-info mt-2">
              <Link to={{ pathname: "/login", state: { from: "/cart" } }}>
                <span className="h6"> Login to Checkout</span>
              </Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartScreen;
