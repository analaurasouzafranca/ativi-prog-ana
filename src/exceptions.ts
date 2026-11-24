export class ValorInvalidoException extends Error {
  constructor(mensagem: string) {
    super(mensagem);
    this.name = "ValorInvalidoException";
  }
}

export class ContaBloqueadaException extends Error {
  constructor(mensagem: string) {
    super(mensagem);
    this.name = "ContaBloqueadaException";
  }
}

export class SaldoInsuficienteException extends Error {
  public readonly quantoFalta: number;

  constructor(mensagem: string, quantoFalta: number) {
    super(mensagem);
    this.name = "SaldoInsuficienteException";
    this.quantoFalta = quantoFalta;
  }
}

export class LimiteDiarioExcedidoException extends Error {
  constructor(mensagem: string) {
    super(mensagem);
    this.name = "LimiteDiarioExcedidoException";
  }
}