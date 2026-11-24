"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Cliente_1 = require("./Cliente");
const Conta_1 = require("./Conta");
const canais_1 = require("./canais");
const exceptions_1 = require("./exceptions");
const laura = new Cliente_1.Cliente("Laura", "123.456.789-10", "Rua A, 10", 3800);
const ana = new Cliente_1.Cliente("Ana lala", "987.654.321-03", "Rua B, 20", 2500);
const c1 = new Conta_1.Conta("1234", "001", new Date(), 300, 500, new canais_1.NotifSMS());
const c2 = new Conta_1.Conta("5678", "001", new Date(), 1000, 500, new canais_1.NotifEmail());
const c3 = new Conta_1.Conta("9012", "001", new Date(), 500, 500, new canais_1.NotifAplicativo());
laura.adicionarConta(c1);
ana.adicionarConta(c2);
ana.adicionarConta(c3);
console.log("\n=== Situação 1: saque OK ===");
try {
    c2.sacar(100, ana);
}
catch (e) {
    console.log("Erro:", e.message);
}
console.log("\n=== Situação 2: saldo insuficiente ===");
try {
    c1.sacar(150, laura);
}
catch (e) {
    if (e instanceof exceptions_1.SaldoInsuficienteException) {
        console.log(`Erro: ${e.message} | falta: ${e.quantoFalta}`);
    }
    else {
        console.log("Erro:", e.message);
    }
}
console.log("\n=== Situação 3: valor inválido ===");
try {
    c3.sacar(-50, ana);
}
catch (e) {
    if (e instanceof exceptions_1.ValorInvalidoException) {
        console.log("Erro:", e.message);
    }
}
console.log("\n=== Situação 4: conta bloqueada ===");
c3.setBloqueada(true);
try {
    c3.sacar(10, ana);
}
catch (e) {
    if (e instanceof exceptions_1.ContaBloqueadaException) {
        console.log("Erro:", e.message);
    }
}
console.log("\n=== Situação 5: limite diário excedido ===");
try {
    c1.depositar(1000);
    c1.sacar(400, laura);
    c1.sacar(200, laura);
}
catch (e) {
    if (e instanceof exceptions_1.LimiteDiarioExcedidoException) {
        console.log("Erro:", e.message);
    }
}
console.log("\n=== Situação 6: depósito inválido ===");
try {
    c2.depositar(0);
}
catch (e) {
    if (e instanceof exceptions_1.ValorInvalidoException) {
        console.log("Erro:", e.message);
    }
}
