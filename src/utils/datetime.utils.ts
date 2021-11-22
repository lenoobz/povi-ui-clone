export const MONTH_SHORT_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const greet = (name?: string): string => {
  const now = new Date();
  const hour = now.getHours();

  let greeting: string = '';

  if (6 <= hour && hour < 12) {
    greeting = 'Good morning';
  } else if (12 <= hour && hour < 17) {
    greeting = 'Good afternoon';
  } else if (17 <= hour && hour < 20) {
    greeting = 'Good evening';
  } else {
    greeting = 'Good night';
  }

  if (name) {
    return `${greeting}, ${name}`;
  }

  return greeting;
};

export const isLeapYear = (year: number) => {
  return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
};

export const daysOfYear = (date?: Date) => {
  const year = date ? new Date(date).getUTCFullYear() : new Date().getUTCFullYear();
  return isLeapYear(year) ? 366 : 365;
};

export const getFirstDayOfCurrentYear = () => new Date(new Date().getUTCFullYear(), 0, 1);

export const getLastDayOfCurrentYear = () => {
  const numDays = daysOfYear();
  return new Date(new Date().getUTCFullYear(), 0, numDays);
};
