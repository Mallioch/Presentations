(function (exports, Card, PubSub) {

    var ModifyForm = Spine.Controller.create({

        elements: {
            '#rectoInput': 'rectoInputEl',
            '#versoInput': 'versoInputEl',
            '#save': 'saveEl'
        },

        events: {
            'click #save': 'save'
        },

        init: function () {
        },

        save: function () {
            if (!this.model) {
                this.model = Card.init();
            }

            this.model.recto = this.rectoInputEl.val();
            this.model.verso = this.versoInputEl.val();

            var message = this.model.validate();
            if (message) {
                PubSub.publish('showMessage', message);
                return;
            }

            this.model.save();

            this.rectoInputEl.val('');
            this.versoInputEl.val('');
            this.model = undefined;

            if (this.mode === 'edit') {
                PubSub.publish('editCardFinished');
            }
            else {
                PubSub.publish('flashMessage', 'the card has been added');
            }
        },

        show: function () {
            if (this.mode === 'edit') {
                this.saveEl.val('save');
            }
            else {
                this.saveEl.val('add');
            }

            this.el.show();

            if (this.model) {
                this.rectoInputEl.val(this.model.recto);
                this.versoInputEl.val(this.model.verso);
            }
        },

        hide: function () {
            this.el.hide();
        }
    });

    exports.ModifyForm = ModifyForm;

})(this, this.Card, this.PubSub);