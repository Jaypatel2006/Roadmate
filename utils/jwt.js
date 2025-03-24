import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

// Generate Token
export const generateToken = (userId) => {
  return jwt.sign({ userId }, SECRET_KEY, { expiresIn: "1d" });
};

// Verify Token
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return null;
  }
};
