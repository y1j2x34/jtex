import { formatTime } from '../../src/utils/formatTime';

describe('formatTime', () => {
    let mockTranslate: (key: string) => string;
    beforeEach(() => {
        mockTranslate = jest.fn().mockImplementation((key: string) => {
            switch (key) {
                case 'time.milliseconds':
                    return 'ms';
                case 'time.seconds':
                    return 's';
                case 'time.minutes':
                    return 'm';
                case 'time.hours':
                    return 'h';
                case 'time.days':
                    return 'd';
            }
            throw Error('Unexpected key: ' + key);
        });
    });
    it('should transform timestamp correctly', () => {
        expect(formatTime(0, mockTranslate)).toBe('0ms');
        expect(formatTime(999, mockTranslate)).toBe('999ms');
        expect(formatTime(1000, mockTranslate)).toBe('1s');
        expect(formatTime(1000 * 59, mockTranslate)).toBe('59s');
        expect(formatTime(1000 * 60, mockTranslate)).toBe('1m');
        expect(formatTime(1000 * 60 * 59, mockTranslate)).toBe('59m');
        expect(formatTime(1000 * 60 * 59 + 1000 * 59, mockTranslate)).toBe('59m59s');
        expect(formatTime(1000 * 60 * 60, mockTranslate)).toBe('1h');
        expect(formatTime(1000 * 60 * 60 * 2 - 1000, mockTranslate)).toBe('1h59m59s');
        expect(formatTime(1000 * 60 * 60 * 24 - 1000, mockTranslate)).toBe('23h59m59s');
        expect(formatTime(1000 * 60 * 60 * 24 - 500, mockTranslate)).toBe('23h59m59s500ms');
        expect(formatTime(1000 * 60 * 60 * 24, mockTranslate)).toBe('1d');
        expect(formatTime(1000 * 60 * 60 * 24 * 2 - 1000, mockTranslate)).toBe('1d23h59m59s');
        expect(formatTime(1000 * 60 * 60 * 24 * 10, mockTranslate)).toBe('10d');
    });
});
