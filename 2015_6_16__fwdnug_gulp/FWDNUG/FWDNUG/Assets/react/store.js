var emitter = require('./emitter.js');

var Store = {
    items: [],
    currentIndex: 1,
    emitter: emitter,

    addItem: function (text) {
        //console.log('addItem', text);
        Store.items.splice(0, 0, Store.createItem(text));
        emitter.emit('stateChanged', {
            items: Store.items,
            incompleteCount: Store.items.length
        });
    },

    partialItem: function (text) {
        if (text === '') {
            emitter.emit('stateChanged', {
                items: Store.items,
                incompleteCount: Store.items.length
            });
            return;
        }

        var copy = Store.items.slice(0);
        copy.splice(0, 0, Store.createItem(text));
        emitter.emit('stateChanged', {
            items: copy,
            incompleteCount: Store.items.length
        });
    },

    createItem: function (text) {
        return { id: Store.currentIndex, text: text };
    }
};

emitter.bind('addItem', Store.addItem);
emitter.bind('partialItem', Store.partialItem);

module.exports = Store;