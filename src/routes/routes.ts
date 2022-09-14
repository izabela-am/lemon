import { Router } from "express";

import { EvaluationController } from "../controllers/EvaluationController";

const routes = Router();

const evaluationController = new EvaluationController();

routes.post('/rota', evaluationController.create);

export { routes };