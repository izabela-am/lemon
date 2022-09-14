import { Request, Response } from "express";

import { EvaluateByClass } from "../useCases/EvaluateByClass";
import { ProfileEvaluation } from "../useCases/ProfileEvaluation";
import { EvaluateByTaxModality } from "../useCases/EvaluateByTaxModality";
import { EvaluateByConnectionType } from "../useCases/EvaluateByConnectionType";

export class EvaluationController {
  private profileEvaluation: ProfileEvaluation;

  constructor() {
    this.profileEvaluation = new ProfileEvaluation(
      new EvaluateByClass(),
      new EvaluateByConnectionType(),
      new EvaluateByTaxModality()
    );
  }

  create = async (request: Request, response: Response): Promise<Response> => {
    const {
      numeroDoDocumento,
      tipoDeConexao,
      classeDeConsumo,
      modalidadeTarifaria,
      historicoDeConsumo
    } = request.body;

    const evaluationResponse = this.profileEvaluation.run({
      connectionType: tipoDeConexao,
      consumptionClass: classeDeConsumo,
      consumptionHistory: historicoDeConsumo,
      taxModality: modalidadeTarifaria
    });

    return response.status(200).send(evaluationResponse);
  }
}
