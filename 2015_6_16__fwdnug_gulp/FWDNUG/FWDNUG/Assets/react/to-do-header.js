var emitter = require('./emitter.js');
var React = require('react');

var ToDoHeader = React.createClass({
    getInitialState: function() {
        return {
            incompleteCount: 0
        }
    },

    componentDidMount: function() {
        var self = this;
        emitter.bind('stateChanged', function(data) {
            self.setState({
                incompleteCount: data.incompleteCount
            })
        });
    },

    render: function() {
        if (this.state.incompleteCount === 0) {
            return null;
        }

        return (
            <div className="to-do-header">
            Incomplete #: {this.state.incompleteCount}
        </div>
        );
    } 
})

module.exports = ToDoHeader;