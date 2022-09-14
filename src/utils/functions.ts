interface IGetRejectionMessage {
  eligibleByClass: boolean;
  eligibleByConnectionType: boolean;
  eligibleByTaxModality: boolean;
}

type EvaluationMap = {
  [key: string]: boolean;
};

type MessageMap = {
  [key: string]: string;
}

function getRejectionMessage(props: IGetRejectionMessage): Array<string> {
  const evaluationMap: EvaluationMap = {
    byClass: props.eligibleByClass,
    byConnectionType: props.eligibleByConnectionType,
    byTaxModality: props.eligibleByTaxModality
  };

  const messageMap: MessageMap = {
    byClass: 'Classe de consumo não aceita',
    byConnectionType: 'Tipo de conexão não aceita',
    byTaxModality: 'Modalidade tarifária não aceita'
  };

  const messages = Object.keys(evaluationMap)
    .filter((evaluation: string): boolean => !evaluationMap[evaluation])
    .map((message): string => messageMap[message]);

  return messages;
}

export { getRejectionMessage }