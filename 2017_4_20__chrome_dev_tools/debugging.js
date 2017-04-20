var getJokeButton = document.querySelector('#get-joke');
var jokeDisplay = document.querySelector('#joke-display');

var jokes = [
  'Chuck Norris doesn\'t cheat death. He wins fair and square.',
  'Chuck Norris beat the sun in a staring contest.',
  'Giraffes were created when Chuck Norris uppercutted a horse.',
  'When the Boogeyman goes to sleep every night he checks his closet for Chuck Norris.',
  'Chuck Norris will never have a heart attack... even a heart isnt foolish enough to attack Chuck Norris.',
  'Chuck Norris once went to mars. Thats why there are no signs of life.',
  'Chuck Norris is the reason Waldo is hiding.'];

function getRandomNumber() {
  var rand = Math.random();
  return Math.floor(rand * jokes.length);
}

function getRandomJoke() {
  var index = getRandomNumber();
  return jokes[index];
}

getJokeButton.addEventListener('click', function() {
  var joke = getRandomJoke();

  jokeDisplay.textContent = joke;
});
