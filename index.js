const WebSocket = require('ws');
const axios = require('axios');

const TOKEN = '8464839745:AAGkjG9X8VZjJBoTZaKoE0ehRsZjswdtark';
const CHAT_ID = '-1003266341547';

async function enviar(txt) {
  try {
    await axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      chat_id: CHAT_ID, text: txt, parse_mode: 'HTML'
    });
  } catch (e) { console.log("Erro ao enviar para o Telegram"); }
}

function conectar() {
  const ws = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@kline_1m");
  
  ws.on('open', () => {
    console.log("Conectado à Binance");
    enviar("🚀 <b>BRUZI SNIPER v28.0 ONLINE!</b>\nMonitorando mercado 24h via GitHub/Render...");
  });

  ws.on('message', (data) => {
    const k = JSON.parse(data).k;
    if (!k.x) return;

    const direcao = parseFloat(k.c) > parseFloat(k.o) ? "COMPRA 🟢" : "VENDA 🔴";
    const msg = `🎯 <b>SINAL DETECTADO!</b>\n\n📊 Ativo: BTC/USDT\n⚡ Direção: <b>${direcao}</b>\n💰 Entrada: $${k.c}`;
    enviar(msg);
  });

  ws.on('close', () => setTimeout(conectar, 5000));
}

conectar();

// Servidor básico para a Render não dar erro
const http = require('http');
http.createServer((req, res) => res.end("Sniper Ativo")).listen(process.env.PORT || 3000);
                                                                                                             
