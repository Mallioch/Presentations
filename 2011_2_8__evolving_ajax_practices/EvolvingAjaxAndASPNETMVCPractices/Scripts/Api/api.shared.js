(function ($) {
    $.apiCall = function (options) {
        var config = $.extend({
            type: 'GET',
            data: {},
            contentType: 'application/x-www-form-urlencoded',
            success: function () { },
            error: function () { },
        }, options);

        $.ajax({
            type: config.type,
            url: config.url,
            contentType: config.contentType,
            data: config.data,
            success: function (result) {
                config.success(result);
            },
            error: function (result) {
                config.error(result);
                $('#errorDisplay').show().html('<p>' + result.responseText + '</p>');
                //Okay, so this last bit is kindof a problem. Your nice, sharable api should not be referencing something
                //  on the master page. So you could pass it all the way down. But that means you have to have this defined
                //  lots of places. Or you could create another js object to wrap this. There are several ways to do this and
                //  how you do it is up to you.
            },
        });
    }
})(jQuery);