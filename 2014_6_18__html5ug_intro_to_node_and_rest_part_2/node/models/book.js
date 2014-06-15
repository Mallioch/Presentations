var Book = function(id, title, author, year) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.year = year;

    this.links = {
        self: { rel: 'self', href: '/api/book/' + this.id }
    };
}

exports.Book = Book;