import {
  ORDER_CREATE_FAILURE,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_RESET,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAILURE,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_HISTORY_FAILURE,
  ORDER_HISTORY_REQUEST,
  ORDER_HISTORY_SUCCESS
} from "../constants/orderConstants";

export const orderCreateReducer = (state = { orderItems: [] }, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { ...state, loading: true };
    case ORDER_CREATE_SUCCESS:
      return {
        ...state,
        orderItems: [...state.orderItems, action.payload],
        loading: false,
        success: true
      };
    case ORDER_CREATE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case ORDER_CREATE_RESET:
      return { ...state, loading: false, error: false, success: false };
    default:
      return state;
  }
};

export const orderDetailsReducer = (
  state = { order: {}, loading: true },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { loading: true };
    case ORDER_DETAILS_SUCCESS:
      console.log("Here");
      console.log(action.payload);
      return { loading: false, order: action.payload };
    case ORDER_DETAILS_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderHistoryReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_HISTORY_REQUEST:
      return { loading: true };
    case ORDER_HISTORY_SUCCESS:
      return { loading: false, orders: action.payload };
    case ORDER_HISTORY_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
