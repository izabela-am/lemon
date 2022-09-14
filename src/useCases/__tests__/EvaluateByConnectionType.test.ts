import { EvaluateByConnectionType } from '../EvaluateByConnectionType';

let evaluateByConnectionType: EvaluateByConnectionType;

describe('EvaluateByConnectionType', () => {
  beforeEach(() => {
    evaluateByConnectionType = new EvaluateByConnectionType();
  });

  describe('Lead Approval Cases', () => {
    it('Should be able to approve Lead if the consumption average is bigger than the monofasico category threshold', () => {
      const consumptionHistory = [3878, 9760, 5976, 2797, 2481, 5731, 7538, 4392, 7859, 4160, 6941, 4597];
      const { consumptionAverage, eligibleByConnectionType } = evaluateByConnectionType.run(
        'monofasico',
        consumptionHistory
      );

      expect(eligibleByConnectionType).toBe(true);
      expect(consumptionAverage).toBeDefined();
      expect(consumptionAverage).toBeCloseTo(5509.1666);
    });

    it('Should be able to approve Lead if the consumption average is bigger than the bifasico category threshold', () => {
      const consumptionHistory = [5976, 9760, 5976, 3878, 3878, 5731, 7538, 4392, 7859, 4160, 6941, 4597];
      const { consumptionAverage, eligibleByConnectionType } = evaluateByConnectionType.run(
        'bifasico',
        consumptionHistory
      );

      expect(eligibleByConnectionType).toBe(true);
      expect(consumptionAverage).toBeDefined();
      expect(consumptionAverage).toBeCloseTo(5890.5);
    });

    it('Should be able to approve Lead if the consumption average is bigger than the trifasico category threshold', () => {
      const consumptionHistory = [9760, 9760, 7538, 3878, 3878, 6000, 7538, 9760, 7859, 6941, 6941, 9760];
      const { consumptionAverage, eligibleByConnectionType } = evaluateByConnectionType.run(
        'trifasico',
        consumptionHistory
      );

      expect(eligibleByConnectionType).toBe(true);
      expect(consumptionAverage).toBeDefined();
      expect(consumptionAverage).toBeCloseTo(7467.75);
    });
  });


  describe('Lead Rejection Cases', () => {
    it('Should be able to reject Lead if the consumption average is less than any category threshold', () => {
      const consumptionHistory = [29, 6, 98, 100, 100, 100, 700, 100, 100, 500, 100, 400];
      const { eligibleByConnectionType } = evaluateByConnectionType.run(
        'trifasico',
        consumptionHistory
      );

      expect(eligibleByConnectionType).toBe(false);
    });
  });
});