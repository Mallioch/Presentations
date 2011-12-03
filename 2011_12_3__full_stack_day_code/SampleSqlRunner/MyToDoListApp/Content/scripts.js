$(document).ready(function () {

    $('#addTaskStart').click(function () {
        $(this).hide();
        $('#addTaskForm').show();
    });

    $('#addTaskCancel').click(function () {
        resetAddForm();
    });

    $('#addTaskFinish').click(function () {
        var descr = $('#description').val();

        $.ajax({
            url: '/api/add/',
            type: 'POST',
            data: { description: descr },
            success: function (data) {
                resetAddForm();
                $('#taskList').append(data);
            },
            error: function () {
                alert('losing');
            }
        });
    });


    $('body').delegate('.delete', 'click', function () {

        var result = confirm('Click okay if really really want to delete this task.');
        if (!result)
            return false;

        var id = $(this).data('id');
        console.log('id', id);
        var self = this;

        $.ajax({
            url: '/api/delete/' + id,
            type: 'DELETE',
            success: function () {
                $(self).closest('li').hide();
            },
            error: function () {
                alert('you are a loser');
            }
        });

        return false;
    });



});

function resetAddForm() {
    $('#addTaskStart').show();
    $('#addTaskForm').hide();
    $('#description').val('');
}


/*

//Old stuff


var foo = 7;
var anArray = ['hello', 'world'];

var obj = {};
obj.name = 'bob';
obj.doSomething = function () { alert('doin something!'); }

function something() {
alert('something');
}

var coolObj = function () {
alert('I am an object');
}

var sayIt = function (name) {
alert(name);
}

var logIt = function (name) {
console.log(name);
}

function communicateName(name, funk) {
funk(name);
}

communicateName('bob', logIt);

function animal() {
this.makeNoise = function () { console.log('growl'); }
};

var dog = function dog() { };

dog.prototype = new animal();

var rover = new dog();
rover.makeNoise();
*/