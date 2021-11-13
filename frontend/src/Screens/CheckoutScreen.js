import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserCartItems,
  deleteUserCartItems,
  saveUserShippingAddress,
} from "../axios/cart";
import { toast } from "react-toastify";
import { CART_EMPTY } from "../Constants/cartConstant";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CheckoutScreen = ({ history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState(
    userInfo.address ? userInfo.address : ""
  );
  const [isAddressSave, setIsAddressSave] = useState(false);

  useEffect(() => {
    getUserCartItems(userInfo.token)
      .then((res) => {
        setProducts(res.data.products);
        setTotal(res.data.cartTotal);
      })
      .catch((e) => {
        toast.error(e.message);
        console.log(e);
      });
    // eslint-disable-next-line
  }, []);

  const saveAddresstoDb = () => {
    saveUserShippingAddress(address, userInfo.token).then((res) => {
      if (res.data.success) {
        setIsAddressSave(true);
        userInfo.address = address;
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        toast.success("Address Saved");
      }
    });
  };

  const emptyCart = () => {
    if (window.confirm("Empty the Cart?")) {
      deleteUserCartItems(userInfo.token)
        .then((res) => {
          if (res.data.success === true) {
            dispatch({ type: CART_EMPTY });
            localStorage.removeItem("cartItems");
            history.push("/");
          }
        })
        .catch((e) => {
          toast.error(e.message);
          console.log(e);
        });
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6">
          <h3 style={{ marginTop: 60, color: "#001529" }}>Shipping Address</h3>
          <br />
          <br />
          <ReactQuill theme="snow" value={address} onChange={setAddress} />
          <button className="btn btn-primary mt-2" onClick={saveAddresstoDb}>
            Save
          </button>
          <hr />
          <h3 style={{ color: "#001529", fontSize: "25px" }}>Got Coupon?</h3>
        </div>
        <div className="col-md-6">
          <h3 style={{ marginTop: 60, color: "#001529" }}>Order Summary</h3>
          <hr />
          <p style={{ fontSize: "20px" }}>{products.length} Products</p>

          {products.map((p, i) => (
            <div key={i}>
              <p>
                {p.product.title} ({p.color}) x {p.count} ={" "}
                {p.product.price * p.count}
              </p>
            </div>
          ))}
          <hr />
          <p>Cart Total: Rs.{total}</p>
          <div className="row">
            <div className="col-md-6">
              <button
                className="btn btn-primary"
                disabled={!isAddressSave || !products.length}
              >
                Place Order
              </button>
            </div>
            <div className="col-md-6">
              <button
                disabled={!products.length}
                onClick={emptyCart}
                className="btn btn-primary"
              >
                Empty Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutScreen;
