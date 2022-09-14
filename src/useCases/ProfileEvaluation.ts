import { ConsumptionClasses, TaxModality, ConnectionTypes } from '../types/types'

import { EvaluateByClass } from './EvaluateByClass';
import { EvaluateByTaxModality } from './EvaluateByTaxModality'
import { EvaluateByConnectionType } from './EvaluateByConnectionType';

import { getRejectionMessage } from '../utils/functions'

interface IRequest {
  taxModality: TaxModality;
  connectionType: ConnectionTypes;
  consumptionHistory: Array<number>;
  consumptionClass: ConsumptionClasses;
}

interface IResponse {
  elegivel: boolean;
  razoesInelegibilidade?: Array<string>;
  economiaAnualDeCO2?: number;
}

/**
 * Junta todas as peças e faz a avaliação final do perfil do Lead
 */
export class ProfileEvaluation {
  constructor(
    private evaluateByClass: EvaluateByClass,
    private evaluateByConnectionType: EvaluateByConnectionType,
    private evaluateByTaxModality: EvaluateByTaxModality
  ) { }

  run({ consumptionClass, connectionType, consumptionHistory, taxModality }: IRequest) {
    const eligibleByClass = this.evaluateByClass.run(consumptionClass);
    const eligibleByTaxModality = this.evaluateByTaxModality.run(taxModality);
    const { eligibleByConnectionType, consumptionAverage } = this.evaluateByConnectionType.run(
      connectionType,
      consumptionHistory
    );

    // Checa se a resposta de todas as avaliações são TRUE
    // Ou seja, se o lead foi aprovado em todas as avaliações
    const evaluationArray = [eligibleByClass, eligibleByConnectionType, eligibleByTaxModality];
    const allApproved = evaluationArray.every(element => element === true);

    const response: IResponse = {
      elegivel: false, // denial by default
    };

    if (allApproved) {
      const yearlyEconomy = ((consumptionAverage * 84) / 1000) * 12;

      response.economiaAnualDeCO2 = yearlyEconomy;
      response.elegivel = true;

      return response;
    }

    const messageArray = getRejectionMessage({
      eligibleByClass,
      eligibleByConnectionType,
      eligibleByTaxModality
    });

    response.razoesInelegibilidade = messageArray;

    return response;
  }
}