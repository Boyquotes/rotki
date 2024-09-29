const MAX_MILLISECONDS_DELAY = 2 ** 31 - 1;

export const Constraints = {
  MAX_MILLISECONDS_DELAY,
  MAX_SECONDS_DELAY: Math.floor(MAX_MILLISECONDS_DELAY / 1000),
  MAX_MINUTES_DELAY: Math.floor(MAX_MILLISECONDS_DELAY / (1000 * 60)),
  MAX_HOURS_DELAY: Math.floor(MAX_MILLISECONDS_DELAY / (1000 * 60 * 60)),
} as const;

export const MINIMUM_DIGIT_TO_BE_ABBREVIATED = 4;
