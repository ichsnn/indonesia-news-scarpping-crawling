import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import { WEB_NEWS_BASE } from './constants.js';

export async function scrapeNews() {
  const news = [];

  for (const web of WEB_NEWS_BASE) {
    const response = await fetch(web.url);

    const body = await response.text();

    const $ = cheerio.load(body);

    const image = getImage($, web);

    const title = getTitle($, web);

    const description = getDescription($, web);

    const date = getDate($, web);

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

function getDate($, web) {
  return $(web.dateSelector)
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
}

function getDescription($, web) {
  return $(web.descSelector)
    .map((_, el) => $(el).text())
    .get();
}

function getTitle($, web) {
  return $(web.titleSelector)
    .map((_, el) => $(el).text())
    .get();
}

function getImage($, web) {
  return $(web.imageSelector)
    .map((_, el) => el.attribs['data-src'] || el.attribs['src'])
    .get();
}
