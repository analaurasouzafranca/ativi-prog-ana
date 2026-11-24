"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotifAplicativo = exports.NotifEmail = exports.NotifSMS = void 0;
class NotifSMS {
    enviar(mensagem, cliente) {
        const curta = mensagem.length > 50
            ? mensagem.substring(0, 47) + "..."
            : mensagem;
        console.log(`[SMS para ${cliente.nome}]: ${curta}`);
    }
}
exports.NotifSMS = NotifSMS;
class NotifEmail {
    enviar(mensagem, cliente) {
        console.log(`[E-MAIL para ${cliente.nome}]: ${mensagem}`);
    }
}
exports.NotifEmail = NotifEmail;
class NotifAplicativo {
    enviar(mensagem, cliente) {
        console.log(`[APP - notificação imediata para ${cliente.nome}]: ${mensagem}`);
    }
}
exports.NotifAplicativo = NotifAplicativo;
