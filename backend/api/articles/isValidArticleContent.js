function isValidArticleContent(content) {
    const MIN_LENGTH = 100;
    const MAX_LENGTH = 5000;
    const bannedWords = ['spamword', 'anotherbannedword']; // Add any banned words here

    if (content.length < MIN_LENGTH || content.length > MAX_LENGTH) return false;

    for (let word of bannedWords) {
        if (content.includes(word)) return false;
    }

    return true;
}

export default isValidArticleContent;
