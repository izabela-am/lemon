import { EvaluateByTaxModality } from '../EvaluateByTaxModality';

let evaluateByTaxModality: EvaluateByTaxModality;
describe('EvaluateByConnectionType', () => {
  beforeEach(() => {
    evaluateByTaxModality = new EvaluateByTaxModality();
  });

  describe('Lead Approval Cases', () => {
    it('Should be able to approve Lead if Tax Modality is equal to convencional', () => {
      const response = evaluateByTaxModality.run('convencional');

      expect(response).toBe(true);
    });

    it('Should be able to approve Lead if Tax Modality is equal to branca', () => {
      const response = evaluateByTaxModality.run('branca');

      expect(response).toBe(true);
    });
  });


  describe('Lead Rejection Cases', () => {
    it('Should be able to approve Lead if Tax Modality is equal to azul', () => {
      const response = evaluateByTaxModality.run('azul');

      expect(response).toBe(false);
    });

    it('Should be able to approve Lead if Tax Modality is equal to verde', () => {
      const response = evaluateByTaxModality.run('verde');

      expect(response).toBe(false);
    });
  });
});