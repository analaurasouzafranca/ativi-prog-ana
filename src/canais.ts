import { CanalNotificacao } from "./CanalNotificacao";
import { Cliente } from "./Cliente";

export class NotifSMS implements CanalNotificacao {
  enviar(mensagem: string, cliente: Cliente): void {
    const curta = mensagem.length > 50
      ? mensagem.substring(0, 47) + "..."
      : mensagem;
    console.log(`[SMS para ${cliente.nome}]: ${curta}`);
  }
}

export class NotifEmail implements CanalNotificacao {
  enviar(mensagem: string, cliente: Cliente): void {
    console.log(`[E-MAIL para ${cliente.nome}]: ${mensagem}`);
  }
}

export class NotifAplicativo implements CanalNotificacao {
  enviar(mensagem: string, cliente: Cliente): void {
    console.log(`[APP - notificação imediata para ${cliente.nome}]: ${mensagem}`);
  }
}
