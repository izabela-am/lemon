import { celebrate, Joi, Segments } from 'celebrate';

export const validator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    numeroDoDocumento: Joi.string().required().custom((doc) => {
      const cpf = /^\\d{11}$/;
      const cnpj = /^\\d{14}$/;

      const isValid = cpf.test(doc) || cnpj.test(doc);

      if (isValid) return doc;
    }),
    tipoDeConexao: Joi.string().required().valid(
      'monofasico',
      'bifasico',
      'trifasico'
    ),
    classeDeConsumo: Joi.string().required().valid(
      'residencial',
      'industrial',
      'comercial',
      'rural',
      'poderPublico',
    ),
    modalidadeTarifaria: Joi.string().required().valid(
      'azul',
      'branca',
      'verde',
      'convencional'
    ),
    historicoDeConsumo: Joi.array().required(),
  }).options({ abortEarly: false })
});