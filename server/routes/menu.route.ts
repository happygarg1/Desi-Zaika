import  express  from "express";
import upload from "../middlewares/multer";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { asyncHandler } from "../utils/asyncHandler"; // 👈 your helper
import { addMenu, editMenu } from "../controller/menu.controller";

const router=express.Router();

router.route("/").post(isAuthenticated,upload.single("image"),asyncHandler(addMenu));
router.route("/:id").put(isAuthenticated,upload.single("image"),asyncHandler(editMenu));


export default router;