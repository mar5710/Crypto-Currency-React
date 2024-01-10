export const API_URL = 'http://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&'
export const getCurrencyURL = id => `http://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${id}&order=market_cap_desc&sparkline=false`
