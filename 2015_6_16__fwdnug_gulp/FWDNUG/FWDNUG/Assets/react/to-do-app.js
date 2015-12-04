var React = require('react');

var ToDoHeader = require('./to-do-header.js');
var ToDoInput = require('./to-do-input.js');
var ToDoList = require('./to-do-list.js');
var Store = require('./store.js');


var App = React.createClass({
    render: function() {
        return (
            <div className="to-do-app">
                <ToDoHeader />
                <ToDoInput />
                <ToDoList />
            </div>
        )
    }
});


React.render(<App />, document.getElementById('app'));
