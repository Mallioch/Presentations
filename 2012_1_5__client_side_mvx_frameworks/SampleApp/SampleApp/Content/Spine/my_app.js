(function (exports) {

    var Card = Spine.Model.setup('Card', ['recto', 'verso']);
    Card.extend(Spine.Model.Ajax);
    Card.extend({
        url: '/api/card'
    });
    Card.bind('refresh', function () {
        console.log('refreshing', Card.all());
    });

    var cards;
    var createControllers = function () {

        //Cards controller
        var Cards = Spine.Controller.create({
            init: function () {
                Card.bind('refresh change', this.proxy(this.start));
            },

            events: {
                'click #forward': 'forward',
                'click #back': 'back',
                'click #card': 'flip'
            },

            start: function () {
                cardList = Card.all();
                cardList.sort(function () { return 0.5 - Math.random() });
                this.index = 0;
                this.side = 'recto';
                this.updateCard();
            },

            forward: function () {
                this.index++;
                this.side = 'recto';

                if (this.index === cardList.length)
                    this.index = 0;
                this.updateCard();
            },

            back: function () {
                this.index--;
                this.side = 'recto';

                if (this.index === -1)
                    this.index = cardList.length - 1;
                this.updateCard();
            },

            flip: function () {
                if (this.side === 'verso')
                    this.side = 'recto';
                else
                    this.side = 'verso';
                this.updateCard();
            },

            updateCard: function () {
                this.model = cardList[this.index];
                this.render();
            },

            render: function () {
                $('#card', this.el).html('<p>' + this.model[this.side] + '</p>');
            }
        });

        //AppController
        window.App = Spine.Controller.create({
            el: $('#app'),

            elements: {
                '#cardHolder': 'cardHolderEl',
                '#addForm': 'addFormEl'
            },

            init: function () {
                this.cardHolder = Cards.init({
                    el: this.cardHolderEl
                });

                Card.fetch();
            }

        }).init();
    }

    var cardList;
    var index = 0;

    $(document).ready(function () {
        createControllers();
    });

})(this);