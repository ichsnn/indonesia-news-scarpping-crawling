import express from 'express';
import { scrapeNews } from './scrapeNews.js';

const app = express();

app.get('/', async (_, res) => {
  const news = await scrapeNews();
  res.json(news);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
