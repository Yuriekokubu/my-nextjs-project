import { formatInTimeZone } from 'date-fns-tz';

export const formatDateInTimezone = (dateString: string): string => {
    const date = new Date(dateString);
    const timeZone = 'Asia/Bangkok';

    return formatInTimeZone(date, timeZone, 'dd/MM/yyyy HH:mm:ss');
};


