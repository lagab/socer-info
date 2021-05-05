require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TELEGRAM_TOKEN;
// t.me/soccer_informations_bot
const bot = new TelegramBot(token, {polling: true});
bot.onText(/\/echo (.+)/,(msg,match)=> {
    const chatId = msg.chat.id;
    console.log(msg);
    const resp = match[1];
    bot.sendMessage(chatId, resp);
});