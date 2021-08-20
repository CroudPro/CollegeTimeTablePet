let axios = require('axios'),
  fs = require('fs');
cheerio = require('cheerio');
let url = 'https://college.spbstu.ru';

const download_pdf = (url) => {
  axios({
    url,
    responseType: 'stream',
  })
    .then(
      (response) =>
        new Promise((resolve, reject) => {
          //const date = new Date();
          //const adder = Math.floor(date.getTime()/ 1000);
          response.data
            .pipe(fs.createWriteStream(`./backend/data/raw/data.pdf`))
            .on('finish', () => resolve())
            .on('error', (e) => reject(e));
        }),
    );
};
const retryFunc = () => {
  return axios
    .get(url)
    .then((response) => {
      let $ = cheerio.load(response.data);
      $('a[href]')
        .each((index, element) => {
          let str = $(element)
            .attr('href');
          if (
            str.startsWith(
              'https://college.spbstu.ru/userfiles/files/raspisanie/detskoe',
            )
          ) {
            console.log(index, str);
            (async () => {
              await download_pdf(str);
            })();
          }
        });
    })
    .catch((e) => {
      console.log(e);
      retryFunc();
    });
};

retryFunc()
  .then(r => console.log(r));
module.exports = retryFunc;
