// Playground - noun: a place where people can play

import UIKit

//MARK: Functions

func funcWithNoReturnValue() {
    var sum = 5 + 5
}

func addInts(val1: Int, val2: Int) -> Int {
    return val1 + val2
}

var sumOfTwoInts = addInts(10, 9)



// MARK: Tuples

var thing = (age: 6, name: "bob")
thing.age
thing.name

struct AjaxError {
    var errorMessage: String
}

//Yay for multiple return values
func goGetDataOrSomething() -> (Int?, AjaxError?) {
    return (1, nil)
}

var returnValue = goGetDataOrSomething()
if let error = returnValue.1 {
    //Do error stuff
}
else {
    //yay success
}

//Named tuples are better
func goGetDataOrSomething2() -> (value: Int?, error:AjaxError?) {
    return (nil, AjaxError(errorMessage: "Connection failed"))
}

var returnValue2 = goGetDataOrSomething2()
if let error = returnValue2.error {
    //Do error stuff
}
else {
    //yay success
}



//MARK: Functions as types

var functionVariable = goGetDataOrSomething2
var fv: () -> (value: Int?, error: AjaxError?) = goGetDataOrSomething2

//So the general syntax of functions as types is
//  (params) -> returnType

func makeNiceGreetingFor(name: String) -> String {
    return "Hello \(name), you are looking fabulous today!"
}
func makeMeanGreetingFor(name: String) -> String {
    return "Hello \(name), you are a jerkface."
}

func greet(externalName name: String, greetFunc: (name: String) -> String) -> String {
    return greetFunc(name: name)
}

greet(externalName: "Steve", makeNiceGreetingFor)
greet(externalName: "Bob", makeMeanGreetingFor)



//MARK: Function arguments

func changeThis(inout value: Int) {
    value = value + 1
}


var val = 6
changeThis(&val)
val



//MARK: Closures

//Totally stole this from the Apple Swift book
func backwards(first: Int, second: Int) -> Bool {
    return first > second
}

var randomIntArray = [5, 98, 1, 987]
var newRandomIntArray : [Int]

newRandomIntArray = sorted(randomIntArray, backwards)

/* Closure syntax!

{ (parameters) -> ReturnType in
statements
}

*/

newRandomIntArray = sorted(randomIntArray, { (first: Int, second: Int) -> Bool in
    return first > second
})

newRandomIntArray = sorted(randomIntArray, { (first, second) -> Bool in
    return first > second
})

newRandomIntArray = sorted(randomIntArray, { (first, second) in
    return first > second
})

newRandomIntArray = sorted(randomIntArray, { first, second in
    return first > second
})

newRandomIntArray = sorted(randomIntArray, { $0 > $1 })

newRandomIntArray = sorted(randomIntArray, >)

func canTakeAClosure(passedInFunction: () -> ()) {
    passedInFunction()
}


canTakeAClosure({ println("hello") })

//Trailing closure syntax

newRandomIntArray = sorted(randomIntArray) { $0 > $1 }
canTakeAClosure { println("my name is Bob") }


// Let's create something funky!
// Totally stole this idea, modified from Mike Ash: https://www.mikeash.com/pyblog/friday-qa-2014-06-20-interesting-swift-features.html

dispatch_async(dispatch_get_main_queue(), {
    //do something on the main thread
    println("main")
})

dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_BACKGROUND, 0), {
    //do something in the background
    println("background")
})

func mainQueue(theFunc: () -> ()) {
    dispatch_async(dispatch_get_main_queue(), theFunc)
}

func backgroundQueue(theFunc: () -> ()) {
    dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_BACKGROUND, 0), theFunc)
}

mainQueue {
    //on the main thread, yo
}

backgroundQueue {
    //on a background thread
}



//MARK: And now for something completely different


class FantasyCharacter {
    
    var name: String
    var ac : Int
    var hitPoints: Int
    
    init(name: String, ac: Int, hitPoints: Int) {
        self.name = name
        self.ac = ac
        self.hitPoints = hitPoints
    }
    

}

class Goblin {
    var ac: Int
    var hitPoints: Int
    
    init(ac: Int, hitPoints: Int) {
        self.ac = ac
        self.hitPoints = hitPoints
    }
}

func createGoblin() -> Goblin {
    var num = randomInt(max: 12)
    var goblin = Goblin(ac: 10, hitPoints: num)
    return goblin
}

func randomInt(#max: Int) -> Int {
    return Int(arc4random_uniform(UInt32(max)))
}


var goblin = createGoblin()

var caramon = FantasyCharacter(name: "Caramon Majere",
    ac: 19,
    hitPoints: 15)


while goblin.hitPoints >= 0 && caramon.hitPoints >= 0 {
    
    var caramonDieRoll = randomInt(max: 20)
    if caramonDieRoll >= goblin.ac {
        goblin.hitPoints -= randomInt(max: 8)
        println("Caramon hit!")
    }
    
    var goblinDieRoll = randomInt(max: 20)
    if goblinDieRoll >= caramon.ac {
        caramon.hitPoints -= randomInt(max: 8)
        println("goblin hit!")
    }
}


"Caramon HP: \(caramon.hitPoints), goblin HP: \(goblin.hitPoints)"









