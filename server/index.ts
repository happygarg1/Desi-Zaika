import dotenv from "dotenv";
dotenv.config();
// console.log(">>> STRIPE_SECRET_KEY:", process.env.STRIPE_SECRET_KEY);
import express from "express";
import connectDb from "./db/connectDB";
import userRoute from "./routes/user.route";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import restaurantRoute from "./routes/restaurant.route";
import menuRoute from "./routes/menu.route";
import orderRoute from "./routes/order.route";
import cors from "cors";
import path from "path";


const app = express();
const PORT = process.env.PORT || 3000;

const DIRNAME=path.resolve();

// Middleware
app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json());
app.use(cookieParser());

// CORS configuration
const corsOptions = {
    origin: 'http://localhost:5173',  // Remove trailing slash
    credentials: true,  // Ensure this is needed for your use case
};

app.use(cors(corsOptions));

// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/restaurant", restaurantRoute);
app.use("/api/v1/menu", menuRoute);
app.use("/api/v1/order", orderRoute);

// app.use(express.static(path.join(DIRNAME,"/client/dist")));
// app.use("*",(_,res)=>{
//     res.sendFile(path.resolve(DIRNAME,"client","dist","index.html"));
// })

// Server start and DB connection
// console.log(process.env.STRIPE_SECRET_KEY);
app.listen(PORT, () => {
    connectDb();
    console.log(`Server listening at port ${PORT}`);
});
