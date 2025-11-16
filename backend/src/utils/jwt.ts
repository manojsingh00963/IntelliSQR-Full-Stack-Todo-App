import jwt, { SignOptions } from "jsonwebtoken";

export const signToken = (payload: object) => {
  const secret = process.env.JWT_SECRET as string;

  // Convert the env value to correct type
  let expiresIn: SignOptions["expiresIn"];

  const raw = process.env.JWT_EXPIRES_IN || "1d";

  // If env is numeric, convert to number
  const num = Number(raw);
  if (!isNaN(num)) {
    expiresIn = num;
  } else {
    // otherwise use it as literal string ("1d", "2h", etc.)
    expiresIn = raw as any;
  }

  const options: SignOptions = {
    expiresIn,
  };

  return jwt.sign(payload, secret, options);
};
