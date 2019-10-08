import func from "../helpers/functions";
import articles from "./articleModel";
class Article {
  constructor(title, article, category, authorId) {
    this.id = func.idIncrementor(articles);
    this.createdOn = new Date().toString();
    this.title = title;
    this.article = article;
    this.authorId = authorId;
    this.category = category;
    this.isInappropiate = false;
    this.comments = [];
  }
}

export default Article;
