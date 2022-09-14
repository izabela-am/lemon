import { ConnectionTypes } from "../types/types";

type TypeMap = {
  [key in ConnectionTypes]: number;
}

interface IResponse {
  eligibleByConnectionType: boolean;
  consumptionAverage: number;
}

/**
 * Avalia a elegiblidade pelo tipo de conexão
 */
export class EvaluateByConnectionType {
  /**
  * @returns FALSE caso a média de consumo seja menor que o mínimo definido
  * @returns TRUE caso a média de consumo seja maior que o mínimo definido
  */
  run(connectionType: ConnectionTypes, consumptionHistory: Array<number>): IResponse {
    // values in kWh
    const typeMap: TypeMap = {
      'monofasico': 400,
      'bifasico': 500,
      'trifasico': 750
    };

    const threshold = typeMap[connectionType];

    const recentConsumptionValues = consumptionHistory.slice(0, 12);

    const consumptionAverage = recentConsumptionValues.reduce((i, j) => {
      return i + j
    }, 0) / recentConsumptionValues.length;

    if (consumptionAverage < threshold) {
      return { eligibleByConnectionType: false, consumptionAverage }
    }

    return { eligibleByConnectionType: true, consumptionAverage };
  }
}