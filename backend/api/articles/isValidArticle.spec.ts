import isValidArticle from './isValidArticle';

describe('isValidArticle function', () => {

    it('should return false for titles shorter than 5 characters', () => {
        expect(isValidArticle('Hey')).toBe(false);
    });

    it('should return false for titles longer than 100 characters', () => {
        const longTitle = 'a'.repeat(101);
        expect(isValidArticle(longTitle)).toBe(false);
    });

    it('should return false for titles with special characters', () => {
        expect(isValidArticle('Hello@World')).toBe(false);
        expect(isValidArticle('Hello#World')).toBe(false);
    });

    it('should return true for valid titles', () => {
        expect(isValidArticle('Hello World')).toBe(true);
    });

});
