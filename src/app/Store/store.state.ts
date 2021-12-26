export interface store{
  data: OblikaPodatkov[];
}
export interface OblikaPodatkov {
  id: number;
  symbol: string;
  name: string;
  nameid: string;
  rank: number;
  price_usd: number;
  percent_change_24h: number;
  percent_change_1h: number;
  percent_change_7d: number;
  price_btc: number;
  market_cap_usd: number;
  volume24: number;
  volume24a: number;
  csupply: number;
  tsupply: number;
  msupply: number;
}
