import { type PremiumIndex } from './types';

export function parsePremiumIndex(data: any): PremiumIndex {
  return {
    symbol: data.symbol,
    markPrice: parseFloat(data.markPrice),
    indexPrice: parseFloat(data.indexPrice),
    estimatedSettlePrice: parseFloat(data.estimatedSettlePrice),
    fundingRate: parseFloat(data.lastFundingRate),
    nextFundingTimestamp: data.nextFundingTime,
    interestRate: parseFloat(data.interestRate),
  };
}
