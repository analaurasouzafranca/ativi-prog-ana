import { Cliente } from "./Cliente";
import { Conta } from "./Conta";
import { NotifSMS, NotifEmail, NotifAplicativo } from "./canais";
import {
  ValorInvalidoException,
  SaldoInsuficienteException,
  ContaBloqueadaException,
  LimiteDiarioExcedidoException,
} from "./exceptions";


const laura = new Cliente("Laura", "123.456.789-10", "Rua A, 10", 3800);
const ana  = new Cliente("Ana lala",  "987.654.321-03", "Rua B, 20", 2500);


const c1 = new Conta("1234", "001", new Date(), 300, 500, new NotifSMS());
const c2 = new Conta("5678", "001", new Date(), 1000, 500, new NotifEmail());
const c3 = new Conta("9012", "001", new Date(), 500, 500, new NotifAplicativo());

laura.adicionarConta(c1);
ana.adicionarConta(c2);
ana.adicionarConta(c3);


console.log("\n=== Situação 1: saque OK ===");
try {
  c2.sacar(100, ana);
} catch (e) {
  console.log("Erro:", (e as Error).message);
}


console.log("\n=== Situação 2: saldo insuficiente ===");
try {
  c1.sacar(150, laura);
} catch (e) {
  if (e instanceof SaldoInsuficienteException) {
    console.log(`Erro: ${e.message} | falta: ${e.quantoFalta}`);
  } else {
    console.log("Erro:", (e as Error).message);
  }
}


console.log("\n=== Situação 3: valor inválido ===");
try {
  c3.sacar(-50, ana);
} catch (e) {
  if (e instanceof ValorInvalidoException) {
    console.log("Erro:", e.message);
  }
}


console.log("\n=== Situação 4: conta bloqueada ===");
c3.setBloqueada(true);
try {
  c3.sacar(10, ana);
} catch (e) {
  if (e instanceof ContaBloqueadaException) {
    console.log("Erro:", e.message);
  }
}


console.log("\n=== Situação 5: limite diário excedido ===");
try {
  c1.depositar(1000);   
  c1.sacar(400, laura);  
  c1.sacar(200, laura);  
} catch (e) {
  if (e instanceof LimiteDiarioExcedidoException) {
    console.log("Erro:", e.message);
  }
}


console.log("\n=== Situação 6: depósito inválido ===");
try {
  c2.depositar(0);
} catch (e) {
  if (e instanceof ValorInvalidoException) {
    console.log("Erro:", e.message);
  }
}