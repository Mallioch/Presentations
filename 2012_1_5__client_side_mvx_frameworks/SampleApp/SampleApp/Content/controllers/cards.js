(function (exports, PubSub, Card) {

    var cardList;
    var index = 0;

    var Cards = Spine.Controller.create({
        init: function () {
            Card.bind('refresh', this.proxy(this.start));
            Card.bind('change', this.proxy(this.updateCardDisplay));
        },

        events: {
            'click #forward': 'forward',
            'click #back': 'back',
            'click #card': 'flip',
            'click #showModifyFormForEdit': 'edit',
            'click #archive': 'archive'
        },

        elements: {
            '#showModifyFormForEdit': 'showModifyFormForEditEl'
        },

        start: function () {
            cardList = Card.all();
            cardList.sort(function () { return 0.5 - Math.random() });
            index = 0;
            this.side = 'recto';
            this.updateCardDisplay();
            this.showModifyFormForEditEl.show();
        },

        forward: function () {
            index++;
            this.side = 'recto';

            if (index === cardList.length)
                index = 0;
            this.updateCardDisplay();
        },

        back: function () {
            index--;
            this.side = 'recto';

            if (index === -1)
                index = cardList.length - 1;
            this.updateCardDisplay();
        },

        flip: function () {
            if (this.side === 'verso')
                this.side = 'recto';
            else
                this.side = 'verso';
            this.updateCardDisplay();
        },

        updateCardDisplay: function () {
            this.model = cardList[index];
            this.render();
        },

        render: function () {
            $('#card', this.el).html('<p>' + this.model[this.side] + '</p>');
        },

        show: function () {
            this.el.show();
        },

        hide: function () {
            this.el.hide();
        },

        edit: function () {
            PubSub.publish('editCard', this.model);
        },

        archive: function () {
            this.model.isArchived = true;
            this.model.save();
            this.trigger('flashMessage', 'this card as been marked as archived');
        }
    });

    exports.Cards = Cards;

})(window, window.PubSub, window.Card);