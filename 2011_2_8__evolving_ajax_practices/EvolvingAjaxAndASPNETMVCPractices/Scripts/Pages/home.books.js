$(document).ready(function () {
    var api = new booksApi();
    api.getAuthors({
        success: function (result) {
            for (var i = 0; i < result.length; i++) {
                var option = new Option(result[i], result[i]);
                $('#authors').append(option);
            }
        }
    });

    $('#authors').change(function () {
        var author = $('#authors').val();

        api.getBooksByAuthor({
            success: function (result) {
                $('#bookTableBody').empty();
                $('#bookTemplate').tmpl(result).appendTo('#bookTableBody');
            }
        }, author);
    });
});
