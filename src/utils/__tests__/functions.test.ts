import { getRejectionMessage } from '../functions';

describe('Helper Functions', () => {
  describe('getRejectionMessage', () => {
    it('Should be able to return Tax Modality rejection message', () => {
      const message = getRejectionMessage({
        eligibleByClass: true,
        eligibleByConnectionType: true,
        eligibleByTaxModality: false
      });

      expect(message[0]).toBe('Modalidade tarifária não aceita');
      expect(message).toHaveLength(1)
    });

    it('Should be able to return Connection Type rejection message', () => {
      const message = getRejectionMessage({
        eligibleByClass: true,
        eligibleByConnectionType: false,
        eligibleByTaxModality: true
      });

      expect(message[0]).toBe('Tipo de conexão não aceita');
      expect(message).toHaveLength(1)
    });

    it('Should be able to return Tax Modality message', () => {
      const message = getRejectionMessage({
        eligibleByClass: false,
        eligibleByConnectionType: true,
        eligibleByTaxModality: true
      });

      expect(message[0]).toBe('Classe de consumo não aceita');
      expect(message).toHaveLength(1)
    });

    it('Should return no messages if all props are set to true', () => {
      const message = getRejectionMessage({
        eligibleByClass: true,
        eligibleByConnectionType: true,
        eligibleByTaxModality: true
      });

      expect(message).toHaveLength(0);
      expect(message[0]).toBeUndefined();
    });

    it('Should be able return array with more than 1 element', () => {
      const message = getRejectionMessage({
        eligibleByClass: false,
        eligibleByConnectionType: true,
        eligibleByTaxModality: false
      });

      expect(message).toHaveLength(2);
    });
  });
});