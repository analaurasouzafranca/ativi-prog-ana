"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Conta = void 0;
const exceptions_1 = require("./exceptions");
class Conta {
    constructor(numero, agencia, dataAbertura, saldoInicial, limiteDiario, canal) {
        this._bloqueada = false;
        this._totalSaquesDia = 0;
        this._numero = numero;
        this._agencia = agencia;
        this._dataAbertura = dataAbertura;
        this._saldo = saldoInicial;
        this._limiteDiario = limiteDiario;
        this._canalNotificacao = canal;
    }
    sacar(valor, cliente) {
        try {
            if (valor <= 0 || Number.isNaN(valor)) {
                throw new exceptions_1.ValorInvalidoException(`Valor inválido: ${valor}. O valor deve ser maior que zero.`);
            }
            if (this._bloqueada) {
                throw new exceptions_1.ContaBloqueadaException(`Conta ${this._numero} está BLOQUEADA (suspeita de fraude). Procure a cooperativa.`);
            }
            if (valor > this._saldo) {
                const falta = valor - this._saldo;
                throw new exceptions_1.SaldoInsuficienteException(`Saldo insuficiente. Faltam R$ ${falta.toFixed(2)}`, falta);
            }
            if (this._totalSaquesDia + valor > this._limiteDiario) {
                throw new exceptions_1.LimiteDiarioExcedidoException(`Limite diário excedido. Limite: R$ ${this._limiteDiario}. ` +
                    `Já sacado hoje: R$ ${this._totalSaquesDia}`);
            }
            this._saldo -= valor;
            this._totalSaquesDia += valor;
            console.log(`Saque de R$ ${valor} realizado. Novo saldo: R$ ${this._saldo}`);
        }
        catch (e) {
            if (this._canalNotificacao) {
                const msg = e instanceof Error ? e.message : String(e);
                this._canalNotificacao.enviar(`Falha no saque: ${msg}`, cliente);
            }
            throw e;
        }
    }
    depositar(valor) {
        if (valor <= 0 || Number.isNaN(valor)) {
            throw new exceptions_1.ValorInvalidoException(`Valor de depósito inválido: ${valor}`);
        }
        this._saldo += valor;
        console.log(`Depósito de R$ ${valor} realizado. Novo saldo: R$ ${this._saldo}`);
    }
    consultarSaldo() {
        return this._saldo;
    }
    get numero() { return this._numero; }
    get saldo() { return this._saldo; }
    get bloqueada() { return this._bloqueada; }
    setBloqueada(b) { this._bloqueada = b; }
    setCanalNotificacao(c) { this._canalNotificacao = c; }
}
exports.Conta = Conta;
