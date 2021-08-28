import { v4 as uuidv4 } from "uuid";

import {
  ORDER_CREATE_FAILURE,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAILURE,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_HISTORY_FAILURE,
  ORDER_HISTORY_REQUEST,
  ORDER_HISTORY_SUCCESS
} from "../constants/orderConstants";
import { CART_EMPTY } from "../constants/cartConstants";

export const createOrder = (order) => async (dispatch, getState) => {
  dispatch({ type: ORDER_CREATE_REQUEST, paylod: order });
  try {
    const {
      userSignin: { userInfo }
    } = getState();
    if (order.cartItems.length) {
      const generateUniqueId = () => {
        const id = uuidv4();
        const ifPresent = getState().orderCreate.orderItems.find(
          (order) => order.orderId === id
        );
        if (ifPresent) return generateUniqueId();
        return id;
      };
      const data = {
        orderId: generateUniqueId(),
        orderItems: order.cartItems,
        shippingAddress: order.shippingAddress,
        paymentMethod: order.paymentMethod,
        itemsPrice: order.itemsPrice,
        shippingPrice: order.shippingPrice,
        taxPrice: order.taxPrice,
        totalPrice: order.totalPrice,
        user: userInfo._id
      };
      dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
      localStorage.setItem(
        "orderItems",
        JSON.stringify(getState().orderCreate.orderItems)
      );
      dispatch({ type: CART_EMPTY });
    } else {
      dispatch({ type: ORDER_CREATE_FAILURE, error: "Cart is Empty" });
    }
    localStorage.removeItem("cartItems");
  } catch (error) {
    dispatch({ type: ORDER_CREATE_FAILURE, payload: error });
  }
};

export const detailsOrder = (orderId) => (dispatch, getState) => {
  console.log("Entered2");
  dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
  console.log("Entered");
  try {
    const orderItems = localStorage.getItem("orderItems")
      ? JSON.parse(localStorage.getItem("orderItems"))
      : [];
    const order =
      orderItems && orderItems.length
        ? orderItems.find((x) => x.orderId === orderId)
        : {};
    if (order && Object.keys(order).length)
      dispatch({ type: ORDER_DETAILS_SUCCESS, payload: order });
    else dispatch({ type: ORDER_DETAILS_FAILURE, payload: "No order found" });
  } catch (error) {
    dispatch({ type: ORDER_DETAILS_FAILURE, payload: error });
  }
};

export const historyOrder = () => (dispatch, getState) => {
  dispatch({ type: ORDER_HISTORY_REQUEST });
  const {
    userSignin: { userInfo }
  } = getState();
  try {
    const orders = localStorage.getItem("orderItems")
      ? JSON.parse(localStorage.getItem("orderItems"))
      : [];

    const ordersHistory = orders.filter((order) => order.user === userInfo._id);

    if (ordersHistory && ordersHistory.length)
      dispatch({ type: ORDER_HISTORY_SUCCESS, payload: ordersHistory });
    else
      dispatch({
        type: ORDER_HISTORY_FAILURE,
        payload: "You have not ordered anything yet."
      });
  } catch (error) {
    dispatch({ type: ORDER_HISTORY_FAILURE, payload: error });
  }
};
