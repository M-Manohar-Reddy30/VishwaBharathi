import dns from "node:dns";

dns.setDefaultResultOrder("ipv4first");

import app from "./app.js";
import env from "./config/env.js";
import connectDatabase from "./database/mongodb.js";

const startServer = async () => {
  try {
    await connectDatabase();

    app.listen(env.PORT, () => {
      console.log(`
=========================================================
🚀 Vishwa Bharathi Platform Backend Started
=========================================================

🌍 Environment : ${env.NODE_ENV}

🚪 Port        : ${env.PORT}

🔗 API         : http://localhost:${env.PORT}

❤️ Health      : http://localhost:${env.PORT}/api/v1/health

=========================================================
`);
    });
  } catch (error) {
    console.error("Server Startup Failed");
    console.error(error);
    process.exit(1);
  }
};

startServer();