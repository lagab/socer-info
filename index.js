/* const browserObject = require('./browser');
const scraperController = require('./pageController');

//Start the browser and create a browser instance
let browserInstance = browserObject.startBrowser();

// Pass the browser instance to the scraper controller
scraperController(browserInstance)
*/
/*
require("dotenv").config();
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TELEGRAM_TOKEN;
// t.me/soccer_informations_bot
const bot = new TelegramBot(token, { polling: true });
bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  console.log(msg);
  const resp = match[1];
  bot.sendMessage(chatId, resp);
}); */

require("dotenv").config();
const { Telegraf } = require('telegraf')

const bot = new Telegraf(process.env.BOT_TOKEN, { polling: true });
bot.start((ctx) => {
    ctx.reply(`Welcome ${ctx.from.first_name}`);
    console.log(ctx.from);
});
bot.telegram.sendMessage(process.env.CHANEL_ID,'test 1');
bot.on(/\/echo (.+)/, (ctx, match) => {

    console.log(match);
    const resp = match[1];
    ctx.reply(resp);
  }); 
  bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))