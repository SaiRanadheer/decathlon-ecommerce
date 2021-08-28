import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    },
    process.env.JWT_SECRET || "F33E168A315AB1B49CF74F49D3FB5",
    {
      expiresIn: "300"
    }
  );
};
