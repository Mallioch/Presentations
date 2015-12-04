var emitter = require('./emitter.js');
var React = require('react');

var ToDoItem = React.createClass({
    render: function() {
        console.log('rendering item');
        return (
            <li className="to-do-item">
            {this.props.text}
            </li>
        );
    }
});

var ToDoList = React.createClass({
    getInitialState: function() {
        return {
            items: []
        }
    },

    componentDidMount: function() {
        var self = this;
        emitter.bind('stateChanged', function(data) {
            self.setState({
                items: data.items
            })
        })
    },

    render: function() {
        console.log('rendering list', this.state.items)
        return (
            <ul className="to-do-list">
                {this.state.items.map(function(item) {
                    return <ToDoItem text={item.text} />
                    })}
            </ul>
        );
    }
});

module.exports = ToDoList;