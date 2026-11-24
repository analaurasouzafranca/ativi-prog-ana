import { Cliente } from "./Cliente";
import { CanalNotificacao } from "./CanalNotificacao";
import {
  ValorInvalidoException,
  ContaBloqueadaException,
  SaldoInsuficienteException,
  LimiteDiarioExcedidoException,
} from "./exceptions";

export class Conta {
  private _numero: string;
  private _agencia: string;
  private _dataAbertura: Date;
  private _saldo: number;
  private _bloqueada: boolean = false;
  private _limiteDiario: number;
  private _totalSaquesDia: number = 0;
  private _canalNotificacao: CanalNotificacao | null;

  constructor(
    numero: string,
    agencia: string,
    dataAbertura: Date,
    saldoInicial: number,
    limiteDiario: number,
    canal: CanalNotificacao | null
  ) {
    this._numero = numero;
    this._agencia = agencia;
    this._dataAbertura = dataAbertura;
    this._saldo = saldoInicial;
    this._limiteDiario = limiteDiario;
    this._canalNotificacao = canal;
  }

  sacar(valor: number, cliente: Cliente): void {
    try {

      if (valor <= 0 || Number.isNaN(valor)) {
        throw new ValorInvalidoException(
          `Valor inválido: ${valor}. O valor deve ser maior que zero.`
        );
      }
     
      if (this._bloqueada) {
        throw new ContaBloqueadaException(
          `Conta ${this._numero} está BLOQUEADA (suspeita de fraude). Procure a cooperativa.`
        );
      }
      
      if (valor > this._saldo) {
        const falta = valor - this._saldo;
        throw new SaldoInsuficienteException(
          `Saldo insuficiente. Faltam R$ ${falta.toFixed(2)}`,
          falta
        );
      }
      
      if (this._totalSaquesDia + valor > this._limiteDiario) {
        throw new LimiteDiarioExcedidoException(
          `Limite diário excedido. Limite: R$ ${this._limiteDiario}. ` +
          `Já sacado hoje: R$ ${this._totalSaquesDia}`
        );
      }
      
      this._saldo -= valor;
      this._totalSaquesDia += valor;
      console.log(`Saque de R$ ${valor} realizado. Novo saldo: R$ ${this._saldo}`);
    } catch (e) {
      
      if (this._canalNotificacao) {
        const msg = e instanceof Error ? e.message : String(e);
        this._canalNotificacao.enviar(`Falha no saque: ${msg}`, cliente);
      }
      throw e;
    }
  }

  depositar(valor: number): void {
    if (valor <= 0 || Number.isNaN(valor)) {
      throw new ValorInvalidoException(`Valor de depósito inválido: ${valor}`);
    }
    this._saldo += valor;
    console.log(`Depósito de R$ ${valor} realizado. Novo saldo: R$ ${this._saldo}`);
  }

  consultarSaldo(): number {
    return this._saldo;
  }

  get numero(): string { return this._numero; }
  get saldo(): number { return this._saldo; }
  get bloqueada(): boolean { return this._bloqueada; }

  setBloqueada(b: boolean): void { this._bloqueada = b; }
  setCanalNotificacao(c: CanalNotificacao): void { this._canalNotificacao = c; }
}