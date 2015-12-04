var calc = {
    attach: function() {
        var firstInput = document.getElementById('first'),
            secondInput = document.getElementById('second'),
            addButton = document.getElementById('add'),
            outputSpan = document.getElementById('output');

        addButton.addEventListener('click', function () {
            outputSpan.innerText = calc.add(firstInput.value, secondInput.value);
        });
    },

    add: function (first, second) {
        return parseInt(first) + parseInt(second);
    }
};

if (window.document) {
    calc.attach();
}

module.exports = calc;