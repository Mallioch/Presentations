console.log('jquery implementation');

var container, listTemplate, editTemplate, addTemplate, detailTemplate, addButton;

$(document).ready(function() {
    console.log('loaded');

    container = $('#container');
    addButton = $('#add');
    listTemplate = _.template($('#listTemplate').html());
    editTemplate = _.template($('#editTemplate').html());
    addTemplate = _.template($('#addTemplate').html());
    detailTemplate = _.template($('#detailTemplate').html());

    addButton.on('click', toAdd);

    toList();
})

function toList() {
    $.ajax({
        url: '/api/book',
        success: function(result) {

            var html = listTemplate({ books: result });
            container.html(html);

            $('#books #edit').on('click', function(e) {
                e.preventDefault();

                toEdit($(this).data('resource'));
            });
            
            $('#books #view').on('click', function(e) {
                e.preventDefault();

                toDetail($(this).data('resource'));
            });
        }
    });
}

function toDetail(resource) {
    console.log('to', resource);

    $.ajax({
        url: resource,
        success: function(data) {
            var html = detailTemplate(data);
            container.html(html);
        }
    })
}

function toEdit(resource) {
    $.ajax({
        url: resource,
        success: function(data) {
            var html = editTemplate(data);
            container.html(html);

            //saving
            $('#save').on('click', function(e) {
                e.preventDefault();

                var obj = formToObj();
                update(resource, obj);
            });

            //delete
            $('#delete').on('click', function(e) {
                e.preventDefault();

                del(resource);
            });
        }
    })
}

function toAdd() {
    var html = addTemplate();
    container.html(html);

    $('#save').on('click', function() {
        var obj = formToObj();
        add('/api/book', obj);
    });
}

function add(resource, obj) {
    $.ajax({
        url: resource,
        data: obj,
        method: 'POST',
        success: function() {
            toList();
        }
    });
}

function update(resource, obj) {
    $.ajax({
        url: resource,
        data: obj,
        method: 'PUT',
        success: function() {
            toList();
        }
    });
}

function del(resource) {
    $.ajax({
        url: resource,
        method: 'DELETE',
        success: function() {
            toList();
        }
    });   
}

function formToObj() {
    var obj = {
        title: $('#title').val(),
        author: $('#author').val(),
        year: $('#year').val()
    };

    return obj;
}



