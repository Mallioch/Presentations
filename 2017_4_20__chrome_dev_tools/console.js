

/* Want different types of logs? */
// console.log('log');
// console.debug('debug')
// console.warn('warn');
// console.error('error');
// console.info('info');


/* You can change the formatting of your log.
  I found these tips here: https://davidwalsh.name/add-styles-console
  Some of the things mentioned in the comments didn't work for me. */

// console.log('%c%s',
//             'color: green; background: yellow; font-size: 24px;',
//             'WARNING!');




/* You can always create custom functions.
  I got the idea of doing this here: https://raygun.com/blog/useful-javascript-debugging-tips-you-didnt-know/*/
// console.todo = function( msg){
//     console.log( '%c %s %s %s ', 'color: yellow; background-color: black;', '--', msg, '--');
// }
// console.important = function( msg){
//     console.log( '%c%s %s %s', 'color: brown; font-weight: bold; text-decoration: underline;', '--', msg, '--');
// }
// console.todo("This is something that's need to be fixed");
// console.important('This is an important message');
//



/* You can print an array of objects as a table. */
// var objects = [
//   { firstName: 'Bob', lastName: 'Smith', primaryLanguage: 'English', age: 45 },
//   { firstName: 'Jack', lastName: 'Black', primaryLanguage: 'English', age: 17 },
//   { firstName: 'Anastasia', lastName: 'Karividopoulos', primaryLanguage: 'Greek', age: 27 },
//   { firstName: 'Peter', lastName: 'Tchaicovsky', primaryLanguage: 'Russian', age: 45 },
// ];
//
// console.table(objects);


//You can restrict the columns shown.
//https://blog.mariusschulz.com/2013/11/13/advanced-javascript-debugging-with-consoletable
// console.table(objects, ['firstName', 'lastName']);







/* You can print a stack trace */
// function one() {
//   two();
// }
//
// function two() {
//   three();
// }
//
// function three() {
//   console.trace();
// }
//
// one();




/* You can time your code. */

// console.time();
//
// var value = 0;
// for (var i = 0; i < 1000000; i++) {
//   value += 1;
// }
//
// console.timeEnd();




/* you can use `monitor(callThis)` in the console to monitor what gets passed into the function. */
// function callThis() {
// }
//
// setTimeout(function() {
//   callThis('Hi', 7, { prop: 'thing' });
// }, 5000);
//
// var monitorThisDiv = document.querySelector('#monitor-this');
// monitorThisDiv.addEventListener('click', callThis);
