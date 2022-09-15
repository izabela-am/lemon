import express from "express";

import { routes } from './routes/routes';
import { error } from "./middlewares/errors";

export const app = express();

app.use(express.json());

app.use(routes);
app.use(error);
