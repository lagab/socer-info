import  { Telegraf } from 'telegraf';

import { create } from 'axios';
import Crawler from './crawler';

require("dotenv").config();

const bot = new Telegraf(process.env.BOT_TOKEN, { polling: true });

const axiosInstance = create({ baseURL: 'https://www.soccerstats.com/' });
const crawler = new Crawler(axiosInstance);

crawler.getStats().then((stats) => {
  let message = `
  `;
  stats.forEach((matchs,league)=>{
    const matchDatas = matchs.map((match)=> `- ${match[0].name} (${match[0].percent}%) <b>VS</b> ${match[1].name} (${match[1].percent}%)\n`);
    message = `${message}
    <b>${league}:</b>
    ${matchDatas.join('\n')}

    `;
  });
  bot.telegram.sendMessage(process.env.CHANEL_ID,message, {parse_mode: 'HTML'});
});

crawler.getStats(0,30).then((stats) => {
  let message = `
  `;
  stats.forEach((matchs,league)=>{
    const matchDatas = matchs.map((match)=> `- ${match[0].name} (${match[0].percent}%) <b>VS</b> ${match[1].name} (${match[1].percent}%)`);
    message = `${message}
    <b>${league}:</b>
    ${matchDatas.join('\n')}

    `;
  });
  bot.telegram.sendMessage(process.env.CHANEL_ID,message, {parse_mode: 'HTML'});
});