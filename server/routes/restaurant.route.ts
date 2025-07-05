import  express  from "express";
import { createRestaurant, getRestaurant, getRestaurantOrder, getSingleRestaurant, searchRestaurant, updateOrderStatus, updateRestaurant } from "../controller/restaurant.controller";
import upload from "../middlewares/multer";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { asyncHandler } from "../utils/asyncHandler"; // 👈 your helper
const router=express.Router();
router.route("/").post(isAuthenticated,upload.single("imageFile"),asyncHandler(createRestaurant));
router.route("/").get(isAuthenticated,asyncHandler(getRestaurant));
router.route("/").put(isAuthenticated,upload.single("imageFile"),asyncHandler(updateRestaurant));
router.route("/order").get(isAuthenticated,asyncHandler(getRestaurantOrder));
router.route("/order/:orderId/status").put(isAuthenticated,asyncHandler(updateOrderStatus));
router.route("/search/:searchText").get(isAuthenticated,asyncHandler(searchRestaurant));
router.route("/:id").get(isAuthenticated,asyncHandler(getSingleRestaurant));

export default router;