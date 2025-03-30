import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET;

// Generate Token
export const generateToken = (userId) => {
  return jwt.sign({ userId }, SECRET_KEY, { expiresIn: "1d" });
};

// Verify Token
export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log("Decoded token:", decoded); // Debugging
    return decoded;
  } catch (error) {
    console.log("Token verification failed:", error.message);
    return null;
  }
};
