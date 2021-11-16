import React, { useEffect } from "react";
import UserNav from "../../Components/nav/UserNav";
import { userListOrder } from "../../Actions/orderAction";
import { listBrands } from "../../Actions/brandAction";
import { useSelector, useDispatch } from "react-redux";
import ShowPaymentInfo from "../../Components/ShowPaymentInfo";
import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { CloudDownloadOutlined } from "@ant-design/icons";
import Invoice from "../../Components/Invoice";
import ModalImage from "react-modal-image";
import Meta from "../../Components/Meta";

const HistoryScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userListOrder());
    dispatch(listBrands());
  }, [dispatch]);

  const orderUserList = useSelector((state) => state.orderUserList);
  const { orders } = orderUserList;

  const brandList = useSelector((state) => state.brandList);
  const { brands } = brandList;
  const showOrderinTable = (order) => (
    <div className="table-responsive">
      <table className="table table-bordered">
        <thead className="thead-light">
          <tr>
            <th scope="col">Image</th>
            <th scope="col">Title</th>
            <th scope="col">Price</th>
            <th scope="col">Brand</th>
            <th scope="col">Color</th>
            <th scope="col">Count</th>
            <th scope="col">Shipping</th>
          </tr>
        </thead>
        <tbody>
          {order.products.map((p, i) => (
            <tr key={i}>
              <td>
                <div style={{ width: "100px", height: "auto" }}>
                  {p.product.images.length && (
                    <ModalImage
                      small={p.product.images[0].url}
                      large={p.product.images[0].url}
                    />
                  )}
                </div>
              </td>
              <td>
                <b>{p.product.title}</b>
              </td>
              <td>{p.product.price}</td>
              {brands
                .filter((b) => b._id === p.product.brand)
                .map((item, i) => (
                  <td key={i}>{item.name}</td>
                ))}
              <td>{p.product.color}</td>
              <td>{p.count}</td>
              <td>
                {p.product.shipping === "Yes" ? (
                  <CheckCircleTwoTone twoToneColor="#52c41a" />
                ) : (
                  <CloseCircleTwoTone twoToneColor="#E74C3C" />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const showDownloadLink = (order) => {
    return (
      <PDFDownloadLink
        document={<Invoice order={order} />}
        fileName="invoice.pdf"
        className="btn btn-sm btn-info"
      >
        <CloudDownloadOutlined style={{ fontSize: "15px" }} /> Download Invoice
      </PDFDownloadLink>
    );
  };

  const showOrders = () =>
    orders.reverse().map((order, i) => (
      <div key={i} className="m-5 p-3 card">
        <ShowPaymentInfo order={order} />
        {showOrderinTable(order)}
        <div className="row mt-2">
          <div className="col">{showDownloadLink(order)}</div>
        </div>
      </div>
    ));

  return (
    <div className="container-fluid">
      <Meta title="Electro: Purchase History" />
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col-md-8 offset-1">
          {orders.length > 0 ? (
            <>
              <h3
                style={{ textAlign: "center", marginTop: 55, color: "#001529" }}
              >
                User History
              </h3>
              <div className="underline"></div>
            </>
          ) : (
            <h3
              style={{ textAlign: "center", marginTop: 55, color: "#001529" }}
            >
              No Purchase Yet
            </h3>
          )}
          {orders.length > 0 && showOrders()}
        </div>
      </div>
    </div>
  );
};

export default HistoryScreen;
