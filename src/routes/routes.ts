import { Router } from "express";

import { validator } from "../middlewares/routeValidators";
import { EvaluationController } from "../controllers/EvaluationController";

const routes = Router();

const evaluationController = new EvaluationController();

routes.post('/evaluation', validator, evaluationController.create);

export { routes };