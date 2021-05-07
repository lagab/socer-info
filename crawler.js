const { JSDOM } = require('jsdom');
const axios = require('axios');

const axiosInstance = axios.create({ baseURL: 'https://www.soccerstats.com/' });

const getStatsLinks = async () => {
  const { data } = await axiosInstance.get("matches.asp?matchday=1");
  const dom = new JSDOM(data, {});
  const { document } = dom.window;
  const results = [];
  const statsLinks = document.querySelectorAll("a.vsmall");
  statsLinks.forEach((link) => {
    if (link.text === "stats") {
      // console.log(link.href, link.text);
      results.push (link.href);
    }
  });
  return results;
};

const getStatData = async(page) => {
  const { data } = await axiosInstance.get(page);
  const dom = new JSDOM(data, {});
  const { document } = dom.window;
  return document;
};

const upvoteFirstPost = async () => {
  /* const links = await getStatsLinks();
  console.log(links[1]); */
  const stat = await getStatData('/pmatch.asp?league=portugal&stats=275-14-3-2021-farense-guimaraes');
  // const leagueName = stat.querySelector('#content h1').firstChild.nodeValue;
  const leagueName = stat.querySelector('.six.columns:first-child  table:first-child > tbody > tr > td:nth-child(3) font').firstChild.nodeValue;
  const matchName = stat.querySelector('#content h1').firstChild.nodeValue;
  const team1 = stat.querySelector('#content ').innerHTML;
  const team2 = stat.querySelector('#content .five.columns > table .trow2 td:nth-child(3) font');
  // console.log(stat.body.innerHTML);
  /* const team1 = teams[0].firstChild.nodeValue; */
  // const team2 = teams[1].nodeValue;

  console.log(leagueName,matchName,team1,team2);
  
  /* links.every(async (link) => {
    const stat = await getStatData(link);
    console.log(link, stat);
    return false;
  }); */
};

upvoteFirstPost().then((msg) => console.log(`end ${msg}`));
/*
const Nightmare = require('nightmare')

const nightmare = Nightmare({ show: true })

nightmare
  .goto('https://duckduckgo.com')
  .type('#search_form_input_homepage', 'github nightmare')
  .click('#search_button_homepage')
  .wait('#r1-0 a.result__a')
  .evaluate(() => document.querySelector('#r1-0 a.result__a').href)
  .end()
  .then(console.log)
  .catch(error => {
    console.error('Search failed:', error)
  })
*/