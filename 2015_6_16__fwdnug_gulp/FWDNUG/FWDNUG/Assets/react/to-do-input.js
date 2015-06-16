var emitter = require('./emitter.js');
var React = require('react');

var ToDoInput = React.createClass({
    getInitialState: function() {
        return {
            text: ''
        }
    },

    render: function() {

        return (
            <div className="to-do-input">
                <input
        onChange={this.change}
        onKeyUp={this.keyUp}
        value={this.state.text} />
</div>
        );
    },

    change: function(e) {
        //console.log(e.target.value);
        this.setState({
            text: e.target.value
        });
        emitter.emit('partialItem', e.target.value);
    },

    keyUp: function(e) {
        if (e.which === 13) {
            //save data
            emitter.emit('addItem', this.state.text)
            this.setState({
                text: ''
            });
        }
        //console.log(e.which);
    }
});

module.exports = ToDoInput;