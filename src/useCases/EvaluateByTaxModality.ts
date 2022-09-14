import { TaxModality } from "../types/types";

/**
 * Avalia a elegiblidade pela Modalidade Tarifária
 */
export class EvaluateByTaxModality {
  /**
  * @returns TRUE caso a modalidade do cliente esteja entre as definidas
  * @returns FALSE caso a modalidade do cliente não esteja entre as definidas
  */
  run(taxModality: TaxModality): boolean {
    const eligibleModalities = ['branca', 'convencional'];

    if (eligibleModalities.includes(taxModality)) {
      return true;
    }

    return false;
  }
}
