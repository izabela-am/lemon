import { ConsumptionClasses } from "../types/types";

/**
 * Avalia a elegiblidade pela Classe de Consumo
 */
export class EvaluateByClass {
  /**
  * @returns TRUE caso a casse de consumo do cliente esteja entre as definidas
  * @returns FALSE caso a casse de consumo do cliente não esteja entre as definidas
  */
  run(consumptionClass: ConsumptionClasses): boolean {
    const eligibleClasses = ['comercial', 'residencial', 'industrial'];

    if (eligibleClasses.includes(consumptionClass)) {
      return true;
    }

    return false;
  }
}
