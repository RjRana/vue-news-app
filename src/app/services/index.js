const API_KEY = process.env.NEWS_API_KEY;
export function fetchNews() {
  const url = `https://newsapi.org/v2/top-headlines?country=us&from=${Date.now()}&sortBy=publishedAt&apiKey=${API_KEY}`;
  return axios.get(url);
}

export function searchNews(search) {
  const url = `https://newsapi.org/v2/top-headlines?q=${
    search || ''
  }&from=${Date.now()}&sortBy=publishedAt&apiKey=${API_KEY}`;
  return axios.get(url);
}

export function getAllSources() {
  const url = `https://newsapi.org/v2/sources?apiKey=${API_KEY}`;
  return axios.get(url);
}

export function getNewsFromSource(sources) {
  const url = `https://newsapi.org/v2/everything?sources=${sources || ''}&apiKey=${API_KEY}`;
  return axios.get(url);
}
