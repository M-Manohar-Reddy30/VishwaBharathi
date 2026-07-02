import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import Admin from "./auth.model.js";
import env from "../../config/env.js";

interface LoginPayload {
  email: string;
  password: string;
}

class AuthService {
  async login(payload: LoginPayload) {
    const admin = await Admin.findOne({
      email: payload.email.toLowerCase(),
    }).select("+password");

    if (!admin) {
      throw new Error("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(
      payload.password,
      admin.password
    );

    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    if (!admin.isActive) {
      throw new Error("Your account has been disabled");
    }

    admin.lastLogin = new Date();

    await admin.save();

    const accessToken = jwt.sign(
      {
        id: admin._id,
        role: admin.role,
      },
      env.JWT_ACCESS_SECRET,
      {
        expiresIn: "15m",
      }
    );

    const refreshToken = jwt.sign(
      {
        id: admin._id,
      },
      env.JWT_REFRESH_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return {
      admin: {
        id: admin._id,
        fullName: admin.fullName,
        email: admin.email,
        role: admin.role,
      },
      accessToken,
      refreshToken,
    };
  }
}

export default new AuthService();