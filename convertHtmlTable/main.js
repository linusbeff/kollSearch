const cheerio = require('cheerio')
const tableParser = require('cheerio-tableparser')
const fs = require('fs')

const tableHTML = fs.readFileSync('koll.html','utf-8')

let kollegium = []

let $  = cheerio.load(tableHTML)

tableParser($)

let kollArray = $("table").parsetable();


const ABK = kollArray[0]
const NAME = kollArray[1]
const FAECHER = kollArray[2]

for(let abk in ABK) {

  let abkc = cheerio.load(ABK[abk]);
  abkc = abkc('span').text()

  if(abkc == 'LiV' || abkc == 'ZEITV.' || abkc == 'Abk' || abkc == '') {
    continue;
  }

  let namec = cheerio.load(NAME[abk]);
  namec = namec('span').text()

  let faecherc = cheerio.load(FAECHER[abk])
  faecherc = clean(faecherc('span').text().replace(/\(([^\)]+)\)/g,'').split(','))

  let temp = {
    abk: abkc,
    name: namec,
    faecher: faecherc
  }
  kollegium.push(temp)
}

fs.writeFileSync('koll.json',JSON.stringify(kollegium),'utf-8')

function clean(array) {
  let temp = [];
  for(let i = 0; i<array.length; i++) {
    temp.push(array[i].trim())
  }

  return temp;
}