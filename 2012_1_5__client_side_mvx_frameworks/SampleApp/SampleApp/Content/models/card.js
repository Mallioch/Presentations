(function (exports) {

    var Card = Spine.Model.setup('Card', ['recto', 'verso', 'isArchived']);
    Card.extend(Spine.Model.Ajax);
    Card.extend({
        url: '/api/card'
    });
    Card.include({
        validate: function () {
            if (!this.recto) return "Text for the front of the card is required.";
            if (!this.verso) return "Text for the back of the card is required.";
        }
    });
    Card.bind('refresh', function () {
        console.log('refreshing', Card.all());
    });

    exports.Card = Card;

})(this);