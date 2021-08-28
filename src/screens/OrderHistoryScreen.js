import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { historyOrder } from "../actions/orderActions";

export default function OrderHistoryScreen(props) {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userSignin);
  if (!userInfo) props.history.push("/signin?redirect=orderhistory");
  const ordersHistory = useSelector((state) => state.ordersHistory);
  const { loading, error, orders } = ordersHistory;

  useEffect(() => dispatch(historyOrder()), [dispatch]);
  return (
    <div>
      <h1>Order History</h1>
      {loading ? (
        <div>loading...</div>
      ) : error ? (
        <div className="error">
          {error} <Link to="/">Go Shopping</Link>
        </div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ORDER ID</th>
              <th>TOTAL ITEMS</th>
              <th>PAYMENT METHOD</th>
              <th>TOTAL AMOUNT</th>
              <th>SHIPPING ADDRESS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.orderId}>
                <td>{order.orderId}</td>
                <td>{order.orderItems.length}</td>
                <td>{order.paymentMethod}</td>
                <td>{order.totalPrice}</td>
                <td>
                  {order.shippingAddress.fullName} <br />
                  {order.shippingAddress.city}, {order.shippingAddress.country}{" "}
                  - {order.shippingAddress.postalCode}
                </td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() => {
                      props.history.push(`/order/${order.orderId}`);
                    }}
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
