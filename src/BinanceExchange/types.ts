export interface PremiumIndex {
  symbol: string;
  markPrice: number;
  indexPrice: number;
  estimatedSettlePrice: number;
  fundingRate: number;
  nextFundingTimestamp: number;
  interestRate?: number;
}
