(function (exports, PubSub, Card, Cards) {

    var createControllers = function () {

        window.App = Spine.Controller.create({
            el: $('#app'),

            elements: {
                '#cardHolder': 'cardHolderEl',
                '#modifyForm': 'modifyFormEl',
                '#hideModifyForm': 'hideModifyFormEl',
                '#showModifyForm': 'showModifyFormEl',
                '#messenger p': 'messengerEl'
            },

            events: {
                'click #showModifyForm': 'add',
                'click #hideModifyForm': 'switchToCardMode'
            },

            init: function () {
                this.cardHolder = exports.Cards.init({
                    el: this.cardHolderEl
                });

                this.modifyForm = ModifyForm.init({
                    el: this.modifyFormEl
                });

                Card.fetch();

                PubSub.subscribe('editCard', this.proxy(this.edit));
                PubSub.subscribe('editCardFinished', this.proxy(this.switchToCardMode));
                PubSub.subscribe('flashMessage', this.proxy(this.flashMessage));
                PubSub.subscribe('showMessage', this.proxy(this.showMessage));
            },

            edit: function (card) {
            
                console.log('in edit', card);

                this.modifyForm.model = card;
                this.modifyForm.mode = 'edit';
                this.showModifyForm();
            },

            add: function () {
                this.modifyForm.mode = 'add';
                this.showModifyForm();
            },

            showModifyForm: function () {
                this.cardHolder.hide();
                this.modifyForm.show();
                this.hideModifyFormEl.show();
                this.showModifyFormEl.hide();
            },

            switchToCardMode: function () {
                this.modifyForm.hide();
                this.cardHolder.show();
                this.hideModifyFormEl.hide();
                this.showModifyFormEl.show();
            },

            flashMessage: function (message) {
                this.messengerEl.html(message);
                this.messengerEl.show();
                this.messengerEl.fadeOut(1200);
            },

            showMessage: function (message) {
                this.messengerEl.html(message);
                this.messengerEl.show();
            },

        }).init();
    }

    $(document).ready(function () {
        createControllers();
    });

})(this, this.PubSub, this.Card, this.Cards);