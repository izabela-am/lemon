import { EvaluateByClass } from '../EvaluateByClass';

let evaluateByClass: EvaluateByClass;
describe('EvaluateByClass', () => {
  beforeEach(() => {
    evaluateByClass = new EvaluateByClass();
  });

  describe('Lead Approval Cases', () => {
    it('Should be able to approve Lead if Consumption Class is equal to comercial', () => {
      const response = evaluateByClass.run('comercial');

      expect(response).toBe(true);
    });

    it('Should be able to approve Lead if Consumption Class is equal to residencial', () => {
      const response = evaluateByClass.run('residencial');

      expect(response).toBe(true);
    });

    it('Should be able to approve Lead if Consumption Class is equal to industrial', () => {
      const response = evaluateByClass.run('industrial');

      expect(response).toBe(true);
    });
  });


  describe('Lead Rejection Cases', () => {
    it('Should reject Lead if Consumption Class is equal to poderPublico', () => {
      const response = evaluateByClass.run('poderPublico');

      expect(response).toBe(false);
    });

    it('Should reject Lead if Consumption Class is equal to rural', () => {
      const response = evaluateByClass.run('rural');

      expect(response).toBe(false);
    });
  });
});