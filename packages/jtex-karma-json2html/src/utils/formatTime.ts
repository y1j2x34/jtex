const ONE_SECOND = 1000;
const ONE_MINUTE = ONE_SECOND * 60;
const ONE_HOUR = ONE_MINUTE * 60;
const ONE_DAY = ONE_HOUR * 24;

export function formatTime(time: number, t: (key: string) => string) {
    if (!isFinite(time)) {
        return `(invalid time: ${time})`;
    }
    if (time < ONE_SECOND) {
        return time + t('time.milliseconds');
    } else if (time < ONE_MINUTE) {
        const seconds = Math.floor(time / 1000);
        const mils = time - seconds * 1000;
        return seconds + t('time.seconds') + (mils > 0 ? formatTime(mils, t) : '');
    } else if (time < ONE_HOUR) {
        const minutes = Math.floor(time / ONE_MINUTE);
        const mils = time - minutes * ONE_MINUTE;
        return minutes + t('time.minutes') + (mils > 0 ? formatTime(mils, t) : '');
    } else if (time < ONE_DAY) {
        const hours = Math.floor(time / ONE_HOUR);
        const mils = time - hours * ONE_HOUR;
        return hours + t('time.hours') + (mils > 0 ? formatTime(mils, t) : '');
    } else {
        const days = Math.floor(time / ONE_DAY);
        const mils = time - days * ONE_DAY;
        return days + t('time.days') + (mils > 0 ? formatTime(mils, t) : '');
    }
}
