import { Cliente } from "./Cliente";

export interface CanalNotificacao {
  enviar(mensagem: string, cliente: Cliente): void;
}