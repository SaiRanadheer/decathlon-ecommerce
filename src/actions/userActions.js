import bcrypt from "bcryptjs";
import {
  USER_SIGNIN_FAILURE,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT
} from "../constants/userConstants";
import { generateToken } from "../utils";
import data from "../data";
export const signin = (emailAddress, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { emailAddress, password } });
  try {
    const findUser = (email, pass) => {
      const user = data.users.find(
        (x) => x.email === email && bcrypt.compareSync(pass, x.password)
      );

      if (user)
        return {
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user)
        };
      else return "Invalid email address or password";
    };

    const userData = findUser(emailAddress, password);

    if (typeof userData === "string") {
      dispatch({ type: USER_SIGNIN_FAILURE, payload: userData });
    } else {
      dispatch({ type: USER_SIGNIN_SUCCESS, payload: userData });
      localStorage.setItem("userInfo", JSON.stringify(userData));
    }
  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAILURE, payload: error });
  }
};

export const signout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("cartItems");
  localStorage.removeItem("shippingAddress");
  dispatch({ type: USER_SIGNOUT });
};
