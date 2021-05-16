import { JSDOM } from 'jsdom';

class Crawler {

  constructor(instance){
    this.axiosInstance = instance;
  }

  static getPreviousSibling(elem, selector) {

    let sibling = elem.previousElementSibling;
  
    if (!selector) return sibling;

    while (sibling) {
      if (sibling.matches(selector)) return sibling;
      sibling = sibling.previousElementSibling;
    }
    return null;

  }


  async getStats(minValue = 80,maxValue = 100) {
    const { data } = await this.axiosInstance.get("matches.asp?matchday=1");
    const dom = new JSDOM(data, {});
    const { document } = dom.window;

    const teamsTmp = [];
    const lines =document.querySelectorAll('table .steam');


    let i =1;
    lines.forEach((line) => {
      const tds = line.parentElement.querySelectorAll('td');
      const htmlLeagueName = this.getPreviousSibling(line.parentElement,'.parent').textContent;
      const league =  htmlLeagueName.substring(0,htmlLeagueName.indexOf('stats')).trim();

      if(tds.length > 12){
        const name = line.textContent;
        const percent = Number((i %2 === 0) ? tds[11].textContent.slice(0, -1) : tds[12].textContent.slice(0, -1));
        
        const {previousSibling, nextElementSibling} = line.parentElement;
        if (i %2 === 0){
            if(previousSibling && previousSibling.querySelectorAll('td').length > 7){
              teamsTmp.push({league, name, percent});
            }
        }else if(nextElementSibling && nextElementSibling.querySelectorAll('td').length > 7){
          teamsTmp.push({league, name, percent});
        }
      }
      i+= 1;
    });


    const leagueMatchs = new Map();
    let teams =  teamsTmp.reduce((result, value, index, sourceArray) => index % 2 === 0 ? [...result, sourceArray.slice(index, index + 2)] : result, []);
    teams = teams.filter((match) => match[0].percent >= minValue && match[0].percent <= maxValue && match[1].percent >= minValue && match[1].percent <= maxValue);

    teams.forEach((match) =>{
      leagueMatchs.set(match[0].league,
        (leagueMatchs.has(match[0].league)) ?
        [...leagueMatchs.get(match[0].league),match]
        : [match]);

    });

    return leagueMatchs;
  }


  async getStatData(page){
    const { data } = await this.axiosInstance.get(page);
    const dom = new JSDOM(data, {});
    const { document } = dom.window;
    return document;
  };

}

module.exports = Crawler;