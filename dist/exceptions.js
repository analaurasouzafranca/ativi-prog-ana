"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LimiteDiarioExcedidoException = exports.SaldoInsuficienteException = exports.ContaBloqueadaException = exports.ValorInvalidoException = void 0;
class ValorInvalidoException extends Error {
    constructor(mensagem) {
        super(mensagem);
        this.name = "ValorInvalidoException";
    }
}
exports.ValorInvalidoException = ValorInvalidoException;
class ContaBloqueadaException extends Error {
    constructor(mensagem) {
        super(mensagem);
        this.name = "ContaBloqueadaException";
    }
}
exports.ContaBloqueadaException = ContaBloqueadaException;
class SaldoInsuficienteException extends Error {
    constructor(mensagem, quantoFalta) {
        super(mensagem);
        this.name = "SaldoInsuficienteException";
        this.quantoFalta = quantoFalta;
    }
}
exports.SaldoInsuficienteException = SaldoInsuficienteException;
class LimiteDiarioExcedidoException extends Error {
    constructor(mensagem) {
        super(mensagem);
        this.name = "LimiteDiarioExcedidoException";
    }
}
exports.LimiteDiarioExcedidoException = LimiteDiarioExcedidoException;
