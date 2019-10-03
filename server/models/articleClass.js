import func from '../helpers/functions';

class Article {
    constructor(articles, title, article, authorId) {
        this.id = func.idIncrementor(articles);
        this.title = title;
        this.article = article;
        this.authorId = authorId;
        this.comments = [];
    }
}

export default Article;