var booksApi = function () { }

booksApi.prototype.getAuthors = function (options) {
    var config = $.extend({
        success: function () { },
        error: function () { }
    }, options);

    $.apiCall({
        url: '/api/book/getauthors',
        success: function (result) { config.success(result); }
    });
}

booksApi.prototype.getBooksByAuthor = function (options, author) {
    var config = $.extend({
        success: function () { },
        error: function () { },
    }, options);

    $.apiCall({
        url: encodeURI('/api/book/getbooksbyauthor/'),
        type: 'POST',
        data: { author: author },
        success: function (result) { config.success(result); },
        error: function (result) { config.error(result); }
    });
}