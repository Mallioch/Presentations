class Calc {
    add(first:number, second:number) {
        return first + second;
    }

    attach() {
        var firstInput = <HTMLInputElement>document.getElementById('first'),
            secondInput = <HTMLInputElement>document.getElementById('second'),
            addButton = document.getElementById('add'),
            outputSpan = document.getElementById('output');

        addButton.addEventListener('click', function () {
            outputSpan.innerText = calc.add(parseInt(firstInput.value), parseInt(secondInput.value)).toString();
        });
    }
}

var calc = new Calc();
if (this.document) {
    calc.attach();
}