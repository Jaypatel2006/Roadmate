// utils/jwt.js
import { SignJWT, jwtVerify } from 'jose';

const encoder = new TextEncoder();
const SECRET_KEY = encoder.encode(process.env.JWT_SECRET);

// Generate Token (equivalent to jwt.sign)
export const generateToken = async (userId) => {
  const token = await new SignJWT({ userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('1d')
    .sign(SECRET_KEY);
  return token;
};

// Verify Token (equivalent to jwt.verify)
export const verifyToken = async (token) => {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    console.log("Decoded token:", payload);
    return payload;
  } catch (error) {
    console.log("Token verification failed:", error.message);
    return null;
  }
};
