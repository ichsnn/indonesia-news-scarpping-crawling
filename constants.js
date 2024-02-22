export const WEB_NEWS_BASE = [
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
    newsLinkSelector: 'body > div.wrap > div.container.clearfix > div:nth-child(4) > div.col-bs10-7 > div.latest.ga--latest.mt2.clearfix.-newlayout > div > div.article__list__title > h3 > a'
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