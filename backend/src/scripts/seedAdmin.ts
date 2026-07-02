import bcrypt from "bcrypt";

import { env } from "../config/env.js";
import connectDatabase from "../database/mongodb.js";
import Admin from "../modules/auth/auth.model.js";

const seedAdmin = async () => {
  try {
    await connectDatabase();

    if (
      !env.ADMIN_NAME ||
      !env.ADMIN_EMAIL ||
      !env.ADMIN_PASSWORD
    ) {
      throw new Error(
        "ADMIN_NAME, ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env"
      );
    }

    const hashedPassword = await bcrypt.hash(env.ADMIN_PASSWORD, 12);

    const existingAdmin = await Admin.findOne({
      email: env.ADMIN_EMAIL.toLowerCase(),
    });

    if (existingAdmin) {
      existingAdmin.fullName = env.ADMIN_NAME;
      existingAdmin.password = hashedPassword;
      existingAdmin.isActive = true;

      await existingAdmin.save();

      console.log("✅ Admin updated successfully");
    } else {
      await Admin.create({
        fullName: env.ADMIN_NAME,
        email: env.ADMIN_EMAIL.toLowerCase(),
        password: hashedPassword,
        role: "SUPER_ADMIN",
        isActive: true,
      });

      console.log("✅ Admin created successfully");
    }

    console.log("--------------------------------------");
    console.log(`Name     : ${env.ADMIN_NAME}`);
    console.log(`Email    : ${env.ADMIN_EMAIL}`);
    console.log("--------------------------------------");

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedAdmin();