import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function ProfileScreen() {
  const { userInfo } = useSelector((state) => state.userSignin);
  const dispatch = useDispatch();

  if (userInfo) {
    return (
      <form className="form">
        <div>
          <h1>User Profile</h1>
        </div>
        <div>
          <label htmlFor="name">Name</label>
          <input id="name" type="text" disabled value={userInfo.name} />
        </div>
        <div>
          <label htmlFor="name">Email</label>
          <input id="name" type="email" disabled value={userInfo.email} />
        </div>
        <div>
          <label />
          <Link to="/orderhistory">
            <button className="block primary">View Order History</button>
          </Link>
        </div>
      </form>
    );
  } else
    return (
      <>
        User Details Not found. Please <Link to="/signin">Signin here</Link>
      </>
    );
}
