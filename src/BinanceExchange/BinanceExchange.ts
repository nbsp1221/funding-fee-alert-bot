import { parsePremiumIndex } from './parsers';
import { type PremiumIndex } from './types';

export class BinanceExchange {
  public async fetchPremiumIndexes(): Promise<PremiumIndex[]> {
    const response = await fetch('https://www.binance.com/fapi/v1/premiumIndex', {
      headers: {
        'Accept': 'application/json',
      },
    });

    return (await response.json()).map(parsePremiumIndex);
  }
}
