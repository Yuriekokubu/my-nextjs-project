import { format, addHours } from 'date-fns';

export const formatDateInTimezone = (dateString: string): string => {
    const date = new Date(dateString);
    const timezoneOffset = 7; // +7 hours
    const localDate = addHours(date, timezoneOffset);

    return format(localDate, 'dd/MM/yyyy HH:mm:ss');
};
