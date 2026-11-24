"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cliente = void 0;
class Cliente {
    constructor(nome, cpf, endereco, renda) {
        this._contas = [];
        this._nome = nome;
        this._cpf = cpf;
        this._endereco = endereco;
        this._renda = renda;
    }
    get nome() { return this._nome; }
    get cpf() { return this._cpf; }
    get endereco() { return this._endereco; }
    get renda() { return this._renda; }
    get contas() { return this._contas; }
    adicionarConta(conta) {
        this._contas.push(conta);
    }
}
exports.Cliente = Cliente;
