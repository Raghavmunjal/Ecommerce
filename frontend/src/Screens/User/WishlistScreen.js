import React, { useState, useEffect } from "react";
import UserNav from "../../Components/nav/UserNav";
import { getWishlist, removeFromWishlist } from "../../axios/user";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { DeleteTwoTone } from "@ant-design/icons";
import Meta from "../../Components/Meta";

const WishlistScreen = () => {
  const [wishlist, setWishlist] = useState([]);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    loadWishlist();
    // eslint-disable-next-line
  }, []);

  const loadWishlist = () => {
    getWishlist(userInfo.token)
      .then((res) => {
        setWishlist(res.data.wishlist);
      })
      .catch((e) => console.log(e));
  };

  const handleRemove = (id) =>
    removeFromWishlist(id, userInfo.token).then((res) => {
      loadWishlist();
    });

  return (
    <div className="container-fluid">
      <Meta title="Wishlist" />
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col-md-8 offset-1">
          <h3 style={{ textAlign: "center", marginTop: 55, color: "#001529" }}>
            Wishlist
          </h3>
          <div className="underline"></div>
          {wishlist.map((p) => (
            <div key={p._id} className="alert alert-secondary">
              <Link to={`/product/${p.slug}`}>{p.title}</Link>
              <span
                onClick={() => handleRemove(p._id)}
                className="btn btn-sm float-right"
              >
                <DeleteTwoTone twoToneColor="red" />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishlistScreen;
