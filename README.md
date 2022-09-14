## Stack do projeto
- Node.js
- Express
- TypeScript
- Jest

## Rodando o projeto
```shell
# Clone o repositório
git clone https://github.com/izabela-am/lemon.git

# Instale as dependências usando seu package manager de preferência
cd lemon
yarn

# Rode os testes automatizados
yarn test

# Inicie a aplicação
yarn init
```

## Enviando requisições
A API possui apenas uma rota, do tipo POST: ```/evaluation```.

Exemplo de request:
```
curl --request POST \
  --url http://localhost:3333/evaluation \
  --header 'Content-Type: application/json' \
  --data '{
  "numeroDoDocumento": "14041737706",
  "tipoDeConexao": "bifasico",
  "classeDeConsumo": "comercial",
  "modalidadeTarifaria": "convencional",
  "historicoDeConsumo": [
    3878,
    9760,
    5976,
    2797,
    2481,
    5731,
    7538,
    4392,
    7859,
    4160,
    6941,
    4597
  ]
}'
```

## Estrutura de Pastas
```
/src
├── controllers
│   └── EvaluationController.ts
│
├── routes
│   └── routes.ts
│
├── types
│   └── types.ts
│
├── useCases
│   ├── EvaluateByClass.ts
│   ├── EvaluateByConnectionType.ts
│   ├── EvaluateByTaxModality.ts
│   └── ProfileEvaluation.ts
│
├── utils
│   └── functions.ts
│
├── app.ts
└── server.ts
```