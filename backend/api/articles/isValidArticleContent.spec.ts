import isValidArticleContent from './isValidArticleContent';

describe('isValidArticleContent function', () => {

    it('should return false for content shorter than 100 characters', () => {
        expect(isValidArticleContent('Short content')).toBe(false);
    });

    it('should return false for content longer than 5000 characters', () => {
        const longContent = 'a'.repeat(5001);
        expect(isValidArticleContent(longContent)).toBe(false);
    });

    it('should return false for content with banned words', () => {
        expect(isValidArticleContent('This article contains spamword')).toBe(false);
    });

    it('should return true for valid content', () => {
        const validContent = 'a'.repeat(100);
        expect(isValidArticleContent(validContent)).toBe(true);
    });

});
