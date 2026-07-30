import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookiesParser from 'cookie-parser';

import authRoutes from './routes/auth.route.js';
import reservationRoutes from './routes/reservation.route.js';
import productRoutes from './routes/product.route.js';
import contactRoutes from './routes/contact.route.js';
import blogRoutes from './routes/blog.route.js';
import dashboardRoutes from "./routes/dashboard.route.js"
import { RES_CODE } from './constants/responseCode.constant.js';
import { formatResponse } from './utils/response.util.js';

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookiesParser());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Server is awake and healthy!"
  })
})

app.use('/api/auth', authRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/products', productRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/blogs', blogRoutes);
app.use("/api/dashboard", dashboardRoutes)

app.use((req, res, next) => {
  res
    .status(404)
    .json(
      formatResponse(
        RES_CODE.FAIL,
        `API Endpoint Not Found: ${req.originalUrl}`,
      ),
    );
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  const code = err.responseCode || RES_CODE.FAIL;

  const errorData =
    process.env.NODE_ENV === 'development' && err.stack
      ? { stack: err.stack }
      : {};

  res
    .status(statusCode)
    .json(
      formatResponse(code, err.message || 'Internal Server Error', errorData),
    );
});

export default app;
