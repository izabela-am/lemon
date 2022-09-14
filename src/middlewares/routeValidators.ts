import { celebrate, Joi, Segments } from 'celebrate';

export const validator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    numeroDoDocumento: Joi.string().required().custom((doc) => {
      const cpf = /^\\d{11}$/;
      const cnpj = /^\\d{14}$/;

      const isValid = cpf.test(doc) || cnpj.test(doc);

      if (isValid) return doc;
    }),
    tipoDeConexao: Joi.string().required(),
    classeDeConsumo: Joi.string().required(),
    modalidadeTarifaria: Joi.string().required(),
    historicoDeConsumo: Joi.array().required(),
  }).options({ abortEarly: false })
});