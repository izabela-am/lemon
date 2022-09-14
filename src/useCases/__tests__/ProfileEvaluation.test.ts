import { EvaluateByClass } from '../EvaluateByClass';
import { EvaluateByConnectionType } from '../EvaluateByConnectionType';
import { EvaluateByTaxModality } from '../EvaluateByTaxModality';
import { ProfileEvaluation } from '../ProfileEvaluation';

const consumptionHistory = [
  3878, // mes atual
  9760, // mes anterior
  5976, // 2 meses atras
  2797, // 3 meses atras
  2481, // 4 meses atras
  5731, // 5 meses atras
  7538, // 6 meses atras
  4392, // 7 meses atras
  7859, // 8 meses atras
  4160, // 9 meses atras
  6941, // 10 meses atras
  4597  // 11 meses atras
];
let profileEvaluation: ProfileEvaluation;

describe('ProfileEvaluation', () => {
  beforeEach(() => {
    profileEvaluation = new ProfileEvaluation(
      new EvaluateByClass(),
      new EvaluateByConnectionType(),
      new EvaluateByTaxModality()
    );
  });

  describe('Lead Approval Cases', () => {
    it('Should be able to approve a Lead if all evaluations are passed', () => {
      const response = profileEvaluation.run({
        consumptionHistory,
        connectionType: 'bifasico',
        taxModality: 'convencional',
        consumptionClass: 'comercial',
      });

      expect(response).toBeDefined();
      expect(response).toHaveProperty('elegivel');
      expect(response).toHaveProperty('economiaAnualDeCO2');
      expect(response.elegivel).toBe(true);
      expect(response.economiaAnualDeCO2).toBeCloseTo(5553.24)
    });
  });


  describe('Lead Rejection Cases', () => {
    it('Should be able to reject Lead if Tax Modality is not supported', () => {
      const response = profileEvaluation.run({
        consumptionHistory,
        connectionType: 'bifasico',
        taxModality: 'azul',
        consumptionClass: 'comercial',
      });

      expect(response).toBeDefined();
      expect(response).toHaveProperty('elegivel');
      expect(response).toHaveProperty('razoesInelegibilidade');
      expect(response.elegivel).toBe(false);
      expect(response.razoesInelegibilidade![0]).toBe('Modalidade tarifária não aceita');
    });

    it('Should be able to reject Lead if Consumption Class is not supported', () => {
      const response = profileEvaluation.run({
        consumptionHistory,
        connectionType: 'bifasico',
        taxModality: 'convencional',
        consumptionClass: 'rural',
      });

      expect(response).toBeDefined();
      expect(response).toHaveProperty('elegivel');
      expect(response).toHaveProperty('razoesInelegibilidade');
      expect(response.elegivel).toBe(false);
      expect(response.razoesInelegibilidade![0]).toBe('Classe de consumo não aceita');
    });
  });
});