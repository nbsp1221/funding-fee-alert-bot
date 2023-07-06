import { differenceInMinutes } from 'date-fns';
import Table from 'easy-table';
import cron from 'node-cron';
import { BinanceExchange } from './BinanceExchange';
import { Telegram } from './Telegram/Telegram';
import { TARGET_FUNDING_RATE, TARGET_REMAINING_MINUTES, TELEGRAM_ACCESS_KEY, TELEGRAM_CHAT_ID } from './constants';
import { formatCountdown } from './utils';

const telegram = new Telegram({ accessKey: TELEGRAM_ACCESS_KEY });
const binanceExchange = new BinanceExchange();

async function trigger() {
  const premiumIndexes = await binanceExchange.fetchPremiumIndexes();

  const isTriggered = premiumIndexes.some((value) => {
    if (Math.abs(value.fundingRate) < TARGET_FUNDING_RATE) {
      return false;
    }

    if (differenceInMinutes(value.nextFundingTimestamp, new Date()) > TARGET_REMAINING_MINUTES) {
      return false;
    }

    return true;
  });

  if (!isTriggered) {
    return;
  }

  const table = new Table();

  premiumIndexes
    .sort((a, b) => Math.abs(b.fundingRate) - Math.abs(a.fundingRate))
    .slice(0, 10)
    .forEach((value) => {
      table.cell('Symbol', value.symbol);
      table.cell('Funding Rate', `${(value.fundingRate * 100).toFixed(4)}%`);
      table.cell('Countdown', formatCountdown(value.nextFundingTimestamp));
      table.newRow();
    });

  const text = [
    `${TARGET_REMAINING_MINUTES}분 내에서 펀딩 비율이 ${TARGET_FUNDING_RATE * 100}% 이상인 종목이 감지되었습니다.`,
    '',
    '```',
    table.toString().slice(0, -1),
    '```',
    'https://www.binance.com/en/futures/BTCUSDT',
  ].join('\n');

  await telegram.sendMessage(TELEGRAM_CHAT_ID, text);
}

async function main() {
  trigger();

  cron.schedule('30 */10 * * * *', async () => {
    trigger();
  });
}

main();
