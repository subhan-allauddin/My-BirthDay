export interface BirthdayCountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isBirthdayToday: boolean;
  currentAge: number;
  turningAge: number;
  targetYear: number;
  formattedTargetDate: string;
  yearProgressPercent: number;
}

const BIRTH_YEAR = 2011;
const BIRTH_MONTH_INDEX = 6; // July (0-indexed)
const BIRTH_DAY = 28;

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/**
 * Computes the live countdown toward the next upcoming July 28th celebration
 * from birth date 28 July 2011, ensuring the timer never stays stuck at 00.
 */
export function getBirthdayCountdown(now: Date = new Date()): BirthdayCountdownState {
  const currentYear = now.getFullYear();
  const isBirthdayToday =
    now.getMonth() === BIRTH_MONTH_INDEX && now.getDate() === BIRTH_DAY;

  const thisYearBirthday = new Date(
    currentYear,
    BIRTH_MONTH_INDEX,
    BIRTH_DAY,
    0,
    0,
    0,
    0
  );

  // Compute current completed age
  const hasHadBirthdayThisYear =
    now.getMonth() > BIRTH_MONTH_INDEX ||
    (now.getMonth() === BIRTH_MONTH_INDEX && now.getDate() >= BIRTH_DAY);
  const currentAge = currentYear - BIRTH_YEAR - (hasHadBirthdayThisYear ? 0 : 1);

  // Target the next upcoming birthday (if today is or after July 28, target next year)
  const targetYear =
    now.getTime() >= thisYearBirthday.getTime() ? currentYear + 1 : currentYear;

  const nextBirthday = new Date(
    targetYear,
    BIRTH_MONTH_INDEX,
    BIRTH_DAY,
    0,
    0,
    0,
    0
  );
  const prevBirthday = new Date(
    targetYear - 1,
    BIRTH_MONTH_INDEX,
    BIRTH_DAY,
    0,
    0,
    0,
    0
  );

  const difference = Math.max(nextBirthday.getTime() - now.getTime(), 1000);

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  const totalYearMs = nextBirthday.getTime() - prevBirthday.getTime();
  const elapsedMs = Math.max(0, now.getTime() - prevBirthday.getTime());
  const yearProgressPercent = Math.min(
    100,
    Math.max(0, Math.round((elapsedMs / totalYearMs) * 1000) / 10)
  );

  return {
    days,
    hours,
    minutes,
    seconds,
    isBirthdayToday,
    currentAge,
    turningAge: targetYear - BIRTH_YEAR,
    targetYear,
    formattedTargetDate: `${BIRTH_DAY} ${MONTH_NAMES[BIRTH_MONTH_INDEX]} ${targetYear}`,
    yearProgressPercent,
  };
}
