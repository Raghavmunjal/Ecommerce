import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserCartItems,
  deleteUserCartItems,
  saveUserShippingAddress,
} from "../axios/cart";
import { applyCouponOnItems } from "../Actions/cartAction";
import { toast } from "react-toastify";
import { CART_EMPTY } from "../Constants/cartConstant";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Alert } from "antd";

const CheckoutScreen = ({ history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const applyCoupon = useSelector((state) => state.applyCoupon);
  const { error, success, totalAfterDiscount } = applyCoupon;

  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [isAddressSave, setIsAddressSave] = useState(false);
  const [coupon, setCoupon] = useState("");

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

  const applyDiscountCoupon = () => {
    dispatch(applyCouponOnItems(coupon));
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6">
          <h3 style={{ marginTop: 60, color: "#001529" }}>Shipping Address</h3>
          <br />
          <ReactQuill theme="snow" value={address} onChange={setAddress} />
          <button
            className="btn btn-primary btn-raised mt-3"
            onClick={saveAddresstoDb}
          >
            Save
          </button>
          <hr />
          <br />
          <h3 style={{ color: "#001529", fontSize: "25px" }}>Got Coupon?</h3>
          <input
            type="text"
            className="form-control"
            value={coupon}
            placeholder="Enter Coupon Code"
            onChange={(e) => setCoupon(e.target.value)}
          />
          {error && (
            <Alert
              message={error}
              type="error"
              showIcon
              className="mt-2"
              closable
            />
          )}
          {success && (
            <Alert
              message={`Coupon applied successfully`}
              type="success"
              showIcon
              className="mt-2"
              closable
            />
          )}
          <button
            onClick={applyDiscountCoupon}
            className="btn btn-info btn-raised mt-3"
          >
            Apply Coupon
          </button>
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
          {totalAfterDiscount > 0 ? (
            <Alert
              message={
                <span style={{ letterSpacing: "0.08rem" }}>
                  Cart Total: Rs.
                  <span
                    style={{
                      textDecoration: "line-through",
                      color: "hsl(210, 22%, 49%)",
                    }}
                  >
                    {total}
                  </span>
                  <b> {totalAfterDiscount} </b>
                </span>
              }
              type="warning"
              className="mt-2 mb-4"
            />
          ) : (
            <p>Cart Total: Rs.{total}</p>
          )}

          <div className="row">
            <div className="col-md-6">
              <button
                className="btn btn-primary btn-raised"
                disabled={!isAddressSave || !products.length}
              >
                Place Order
              </button>
            </div>
            <div className="col-md-6">
              <button
                disabled={!products.length}
                onClick={emptyCart}
                className="btn btn-raised btn-info"
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
