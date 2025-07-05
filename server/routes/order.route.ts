import  express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { createCheckoutSession, getOrders, stripeWebhook } from "../controller/order.controller";
import { asyncHandler } from "../utils/asyncHandler";

const router=express.Router();
router.route("/").get(isAuthenticated,asyncHandler(getOrders));
router.route("/checkout/create-checkout-session").post(isAuthenticated,asyncHandler(createCheckoutSession));
router.route("/webhook").post(express.raw({type:'application/json'}),stripeWebhook);

export default router;