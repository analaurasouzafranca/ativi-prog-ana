import { Conta } from "./Conta";

export class Cliente {
  private _nome: string;
  private _cpf: string;
  private _endereco: string;
  private _renda: number;
  private _contas: Conta[] = [];

  constructor(nome: string, cpf: string, endereco: string, renda: number) {
    this._nome = nome;
    this._cpf = cpf;
    this._endereco = endereco;
    this._renda = renda;
  }

  get nome(): string { return this._nome; }
  get cpf(): string { return this._cpf; }
  get endereco(): string { return this._endereco; }
  get renda(): number { return this._renda; }
  get contas(): Conta[] { return this._contas; }

  adicionarConta(conta: Conta): void {
    this._contas.push(conta);
  }
}