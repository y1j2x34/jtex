import { isNotDefined } from '../../src/utils/isNotDefined';

describe('isNotDefined', () => {
    it('should worlk as expected', () => {
        expect(isNotDefined(undefined)).toBeTruthy();
        expect(isNotDefined(null)).toBeTruthy();
        expect(isNotDefined('')).toBeFalsy();
        expect(isNotDefined(0)).toBeFalsy();
        expect(isNotDefined(NaN)).toBeFalsy();
        expect(isNotDefined(Infinity)).toBeFalsy();
        expect(isNotDefined(-Infinity)).toBeFalsy();
        expect(isNotDefined([])).toBeFalsy();
        expect(isNotDefined([0])).toBeFalsy();
        expect(isNotDefined([[]])).toBeFalsy();
        expect(isNotDefined({})).toBeFalsy();
    });
});
