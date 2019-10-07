import func from './functions';
import articles from '../models/articleModel';
class Article {
    constructor(title, article, category, authorId) {
        this.id = func.idIncrementor(articles);
        this.createdOn = new Date().toString();
        this.title = title;
        this.article = article;
        this.authorId = authorId;
        this.category = category;
        this.isInappropriate = false;
        this.comments = [];
    }
}

export default Article;