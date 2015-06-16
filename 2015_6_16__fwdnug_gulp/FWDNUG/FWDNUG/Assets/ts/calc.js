var Calc = (function () {
    function Calc() {
    }
    Calc.prototype.add = function (first, second) {
        return first + second;
    };

    Calc.prototype.attach = function () {
        var firstInput = document.getElementById('first'), secondInput = document.getElementById('second'), addButton = document.getElementById('add'), outputSpan = document.getElementById('output');

        addButton.addEventListener('click', function () {
            outputSpan.innerText = calc.add(parseInt(firstInput.value), parseInt(secondInput.value)).toString();
        });
    };
    return Calc;
})();

var calc = new Calc();
if (this.document) {
    calc.attach();
}
//# sourceMappingURL=calc.js.map
