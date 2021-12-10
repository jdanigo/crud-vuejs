import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import apiRouter from './routes/api';
import connectMongo from "./config/dbConnect";
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swaggerDocs';
import serveIndex from 'serve-index';
import cors from 'cors';
const app = express();

// Production enviroment
const isProduction = process.env.NODE_ENV === "prod";
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//https debug
app.use(morgan("dev"));

//Connect Mongo
connectMongo();
//enable cors
app.use(cors({ origin: '*' }));
//routes
app.use("/api", apiRouter);
app.use('/uploads', express.static('uploads'), serveIndex('uploads', { icons: true }));
//routes docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on isProductionss => ${isProduction}`);
  console.log(`Server is running on PORT ${PORT}`);
});