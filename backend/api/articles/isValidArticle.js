
function isValidArticle(title) {
    if (title.length < 5 || title.length > 100) return false;

    const specialCharPattern = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (specialCharPattern.test(title)) return false;

    return true;
}

export default isValidArticle;