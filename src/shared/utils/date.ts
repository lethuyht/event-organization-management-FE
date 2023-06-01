import dayjs from 'dayjs';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';

TimeAgo.addDefaultLocale(en);

export const timeAgo = new TimeAgo('en-US');

export const formatDate = (date: string, formatter = 'DD/MM/YYYY') =>
  dayjs(date).format(formatter);

export const dayDiff = (time: Date) => {
  const diffHour = dayjs().diff(dayjs(time), 'hour', false);
  if (diffHour === 0) {
    return {
      diff: 'Just now',
      unit: undefined,
    };
  }
  if (diffHour < 24 && diffHour > 0) {
    return {
      diff: diffHour,
      unit: diffHour === 1 ? 'hour' : 'hours',
    };
  }
  const diffDay = dayjs().diff(dayjs(time), 'day', false);

  if (diffDay < 30 && diffDay > 0) {
    return {
      diff: diffDay,
      unit: diffDay === 1 ? 'day' : 'days',
    };
  }

  const diffMonth = dayjs().diff(dayjs(time), 'month', false);
  return {
    diff: diffMonth,
    unit: diffMonth === 1 ? 'month' : 'months',
  };
};
