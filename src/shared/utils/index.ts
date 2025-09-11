import * as fs from 'fs';
import * as path from 'path';

import * as moment from 'moment';
import 'moment/locale/es';

export const expireTime = 60 * 60 * 24 * 30; // 30 days in seconds

export const expiresIn = () => {
  return Math.floor(Date.now() / 1000) + expireTime;
};

export const stringToDateWithTime = (date: string | Date) =>
  moment(date).format('LLL');

export const durantionToTime = (startDate: Date, endDate: Date) => {
  const duration = moment.duration(moment(endDate).diff(moment(startDate)));
  const hours = duration.hours();
  const minutes = duration.minutes();
  const seconds = duration.seconds();
  return `${hours ? hours + 'h' : ''} ${minutes ? minutes + 'm' : ''} ${
    seconds ? seconds + 's' : ''
  }`;
};

export const groupBy = (
  items: {
    [key: string]: any;
  }[],
  key: string,
) =>
  items.reduce(
    (result, item) => ({
      ...result,
      [item[key]]: [...(result[item[key]] || []), item],
    }),
    {},
  );

export const formatDateToYYYYMMDD = (dateString: string) => {
  const date = dateString.split('T')[0].split('-');
  return `${date[0]}-${date[1]}-${date[2]}`;
};

export function uploadStaticImage(img: string): string {
  if (!img) {
    return null;
  }

  const routeImg = path.join(process.cwd(), 'public', 'static', 'images', img);

  if (!fs.existsSync(routeImg)) {
    return null;
  }

  const buffer = fs.readFileSync(routeImg);
  return buffer.toString('base64');
}
