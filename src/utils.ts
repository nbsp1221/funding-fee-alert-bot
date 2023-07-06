import { intervalToDuration } from 'date-fns';

export function formatCountdown(timestamp: number): string {
  const duration = intervalToDuration({
    start: new Date(),
    end: timestamp,
  });

  const paddedHours = duration.hours?.toString().padStart(2, '0') ?? '';
  const paddedMinutes = duration.minutes?.toString().padStart(2, '0') ?? '';
  const paddedSeconds = duration.seconds?.toString().padStart(2, '0') ?? '';

  return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
}
