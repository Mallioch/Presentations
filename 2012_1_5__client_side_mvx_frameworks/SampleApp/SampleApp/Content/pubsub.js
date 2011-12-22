(function (exports) {

    var PubSub = {
        subscribe: function (ev, callback) {
            var calls = this._callbacks || (this._callbacks = {});

            (this._callbacks[ev] || (this._callbacks[ev] = [])).push(callback);
            return this;
        },

        publish: function () {

            if (this._callbacks)
                console.log('callbacks', this._callbacks);
            else
                console.log('no callbacks');

            var args = Array.prototype.slice.call(arguments, 0);

            var ev = args.shift();

            console.log('event trigger', ev);

            var list, calls, i, l;
            if (!(calls = this._callbacks)) return this;
            if (!(list = this._callbacks[ev])) return this;

            for (i = 0, l = list.length; i < l; i++) {
                console.log('calling callback', list[i]);
                list[i].apply(this, args);
            }
            return this;
        }
    };

    exports.PubSub = PubSub;

})(window);