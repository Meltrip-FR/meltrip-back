import * as dotenv from "dotenv";
dotenv.config();

export const stripe = require("stripe")(process.env.API_KEY_STRIPE_PRIVATE);
