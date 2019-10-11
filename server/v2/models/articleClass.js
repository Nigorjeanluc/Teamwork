class Article {
  constructor(title, article, category, authorId) {
    this.createdOn = new Date();
    this.updatedOn = new Date();
    this.title = title;
    this.article = article;
    this.authorId = authorId;
    this.category = category;
    this.isInappropiate = false;
  }
}

export default Article;
