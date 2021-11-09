import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "../Actions/productAction";
import { listSearchProducts } from "../Actions/searchAction";
import UserProductCard from "../Components/cards/UserProductCard";
import { Menu, Slider } from "antd";
import { DollarOutlined, LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
const { SubMenu } = Menu;

const ShopScreen = () => {
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { products: defaultProducts, loading: loadingDefault } = productList;

  const search = useSelector((state) => state.search);
  const { text } = search;

  const antIcon = <LoadingOutlined style={{ fontSize: 200 }} spin />;

  const searchFilterProducts = useSelector(
    (state) => state.searchFilterProducts
  );
  const { products: filterProducts, loading: loadingFilter } =
    searchFilterProducts;

  const handleSlider = (value) => {
    setPrice(value);
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  useEffect(() => {
    dispatch(listProducts("all", 1));
  }, [dispatch]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(listSearchProducts({ query: text, price }));
    }, 300);
    return () => clearTimeout(timeout);
    //eslint-disable-next-line
  }, [dispatch, text, ok]);

  return (
    <Spin
      spinning={loadingDefault === true || loadingFilter === true}
      indicator={antIcon}
    >
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 pt-2">
            <h3 style={{ marginTop: 60, color: "#001529" }}>Search/Filter</h3>
            <hr />
            <Menu defaultOpenKeys={["slider"]} mode="inline">
              <SubMenu
                key="slider"
                title={
                  <span className="h6">
                    <DollarOutlined />
                    Price
                  </span>
                }
              >
                <div>
                  <Slider
                    className="ml-4 mr-4"
                    tipFormatter={(v) => `Rs. ${v}`}
                    range
                    value={price}
                    max="99999"
                    onChange={handleSlider}
                  />
                </div>
              </SubMenu>
            </Menu>
          </div>
          <div className="col-md-9 pt-2">
            <h3
              style={{ marginTop: 60, color: "#001529", textAlign: "center" }}
            >
              Products
            </h3>
            <div className="underline"></div>
            <div className="row mt-2">
              {text.length === 0 && price[0] === 0 && price[1] === 0
                ? defaultProducts &&
                  defaultProducts.length > 0 &&
                  defaultProducts.map((p) => (
                    <div className="col-md-4 mb-5" key={p._id}>
                      <UserProductCard product={p} />
                    </div>
                  ))
                : filterProducts && filterProducts.length > 0
                ? filterProducts.map((p) => (
                    <div className="col-md-4 mb-5" key={p._id}>
                      <UserProductCard product={p} />
                    </div>
                  ))
                : "No Product Found"}
            </div>
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default ShopScreen;
