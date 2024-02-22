// import express from 'express';
import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

// const app = express();

const WEB_NEWS_BASE = [
  {
    source: 'KOMPAS.COM',
    url: 'https://kompas.com/tag/pertanian',
    titleSelector:
      'body > div.wrap > div.container.clearfix > div:nth-child(4) > div.col-bs10-7 > div:nth-child(2) > div > div > div > div.article__box > div.article__title > a',
    imageSelector:
      'body > div.wrap > div.container.clearfix > div:nth-child(4) > div.col-bs10-7 > div:nth-child(2) > div > div > div > div.article__asset > a > img',
    descSelector:
      'body > div.wrap > div.container.clearfix > div:nth-child(4) > div.col-bs10-7 > div:nth-child(2) > div > div > div > div.article__box > div.article__lead',
    dateSelector:
      'body > div.wrap > div.container.clearfix > div:nth-child(4) > div.col-bs10-7 > div:nth-child(2) > div > div > div > div.article__box > div.article__box__bottom > div.article__date',
  },
  {
    source: 'CNN',
    url: 'https://www.cnnindonesia.com/tag/pertanian',
    imageSelector:
      'div > div > div.flex.flex-col.gap-5 > article > a > span > span > img.object-cover.w-full',
    titleSelector:
      'body > div > div.flex.gap-6 > div.grow-0.w-leftcontent.min-w-0 > div > div > article > a > span.flex-grow > h2',
    dateSelector:
      'body > div > div.flex.gap-6 > div.grow-0.w-leftcontent.min-w-0 > div > div > article > a > span.flex-grow > span > span.text-xs.text-cnn_black_light3',
  },
  {
    source: 'Detik',
    url: 'https://www.detik.com/tag/pertanian',
    imageSelector:
      'body > div.wrapper > div > div.l_content > div.list.media_rows.list-berita > article > a > span.ratiobox.box_thumb > span > img',
    titleSelector:
      'body > div.wrapper > div > div.l_content > div.list.media_rows.list-berita > article > a > span.box_text > h2',
    descSelector:
      'body > div.wrapper > div > div.l_content > div.list.media_rows.list-berita > article > a > span.box_text > p',
    dateSelector:
     'body > div.wrapper > div > div.l_content > div.list.media_rows.list-berita > article > a > span.box_text > span'
  },
];

async function scrapeNews() {
  const news = [];

  for (const web of WEB_NEWS_BASE) {
    const response = await fetch(web.url);

    const body = await response.text();

    const $ = cheerio.load(body);

    const image = $(web.imageSelector)
      .map((_, el) => el.attribs.src)
      .get();

    const title = $(web.titleSelector)
      .map((_, el) => $(el).text())
      .get();

    const description = $(web.descSelector)
      .map((_, el) => $(el).text())
      .get();

    const date = $(web.dateSelector)
      .map((_, el) => {
        if (el.children.length > 1) {
          const obj = el.children.find((obj) => {
            return obj.type == 'comment';
          });
          return obj?.data || $(el).text();
        }
        return $(el).text();
      })
      .get();

    // combine image and description
    for (let i = 0; i < image.length; i++) {
      news.push({
        source: web.source,
        image: image[i],
        title: title[i],
        description: description[i],
        date: date[i],
      });
    }
  }

  return news;
}

const getNews = async () => {
  const news = await scrapeNews();
  console.log(news);
};

getNews();

// app.get('/', async (req, res) => {
//   const news = await scrapeNews();
//   res.json(news);
// });

// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });
