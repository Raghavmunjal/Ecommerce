import React, { useEffect } from "react";
import AdminNav from "../../Components/nav/AdminNav";
import { useSelector, useDispatch } from "react-redux";
import { listOrders, updateOrder } from "../../Actions/orderAction";
import { ORDER_UPDATE_RESET } from "../../Constants/orderConstant";
import ShowPaymentInfo from "../../Components/ShowPaymentInfo";
import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";
import { listBrands } from "../../Actions/brandAction";
import Meta from "../../Components/Meta";

const AdminDashBoardScreen = () => {
  const orderList = useSelector((state) => state.orderList);
  const { orders } = orderList;
  const orderUpdate = useSelector((state) => state.orderUpdate);
  const { success } = orderUpdate;

  const dispatch = useDispatch();

  const brandList = useSelector((state) => state.brandList);
  const { brands } = brandList;

  useEffect(() => {
    if (success) {
      dispatch({ type: ORDER_UPDATE_RESET });
    }
    dispatch(listOrders());
    dispatch(listBrands());
  }, [dispatch, success]);

  const handleStatusChange = (orderId, orderStatus) => {
    dispatch(updateOrder(orderId, orderStatus));
  };

  const showOrderinTable = (order) => (
    <div className="table-responsive">
      <table className="table table-bordered">
        <thead className="thead-light">
          <tr>
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

  return (
    <div className="container-fluid">
      <Meta title="Admin Dashboard" />
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-8 offset-md-1">
          <h3 style={{ textAlign: "center", marginTop: 60, color: "#001529" }}>
            Admin DashBoard
          </h3>
          <div className="underline"></div>
          {orders.map((o) => (
            <div key={o._id} className="row pb-5">
              <div className="btn btn-block bg-light">
                <ShowPaymentInfo order={o} />
                <div className="row">
                  <div className="col-md-4">Delivery Status</div>
                  <div className="col-md-8">
                    <select
                      onChange={(e) =>
                        handleStatusChange(o._id, e.target.value)
                      }
                      className="form-control"
                      defaultValue={o.orderStatus}
                      name="status"
                    >
                      <option value="Not Processed">Not Processed</option>
                      <option value="Processing">Processing</option>
                      <option value="Dispatched">Dispatched</option>
                      <option value="Cancelled">Cancelled</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>
              </div>
              {showOrderinTable(o)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashBoardScreen;
