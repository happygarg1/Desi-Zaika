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
// Add this right after your middleware setup
app.disable('strict routing');
app.set('strict routing', false);
const DIRNAME=path.resolve();

// Middleware
app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json());
app.use(cookieParser());
// CORS configuration
const corsOptions = {
    origin: 'https://desi-zaika.onrender.com',  // Remove trailing slash
    credentials: true,  // Ensure this is needed for your use case
};

app.use(cors(corsOptions));

// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/restaurant", restaurantRoute);
app.use("/api/v1/menu", menuRoute);
app.use("/api/v1/order", orderRoute);

// Serve static files from Vite build (client/dist) in production
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));

// Fallback to index.html for SPA routing
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});
}
// Server start and DB connection
// console.log(process.env.STRIPE_SECRET_KEY);
connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening at port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("DB connection failed", error);
  });