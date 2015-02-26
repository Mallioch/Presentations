// Playground - noun: a place where people can play

import UIKit

// MARK: Variables

var anIntegerValue = 7 //type inference
var anotherIntegerValue : Int = 7 //you can specify the type
let fred = "Fred never changes" //they do have constants
var sum = anIntegerValue + anotherIntegerValue //Look there ==>



// MARK: Arrays

var arrayOfInts = [1, 2, 3]
var oldSchoolNSArray = [1, "bob", false, 10.1]
var aValue: AnyObject = oldSchoolNSArray[0]

var initiallyEmptyArray = Array<Int>() //Generics!
initiallyEmptyArray.append(1)
initiallyEmptyArray.append(2)
initiallyEmptyArray

//Because having two ways to declare arrays isn't enough...
var initiallyEmptyArray2 = [Int]()
initiallyEmptyArray2.append(3)
initiallyEmptyArray2.append(4)
initiallyEmptyArray2

// MARK: Dictionaries

var ages = [ "Eric" : 38, "Bob" : 39 ]
ages["Steve"] = 59

var explicitlyTypedDict = Dictionary<String, Int>()
explicitlyTypedDict["someValue"] = 5



// MARK: Optionals
var optionalAge : Int? = ages["Eric"]
var optionalAge2 : Int? = ages["Dirk"] //Nothing here!

if let age = optionalAge {
    println(age)
}
else {
    println("nope")
}

if let age = optionalAge2 {
    println(age)
}
else {
    println("nope")
}

if optionalAge != nil {
    println("true")
}
if optionalAge2 == nil {
    println("true")
}

//Optional chaining...woohoo!
var optionalDistance : Int? = optionalAge?.distanceTo(100)
if let age = optionalAge {
    var distance : Int = age.distanceTo(100)
}



// MARK: Enums

enum WaysToCookSteakProperly {
    case Blue
    case ExtremelyRare
    case VeryRare
    case Rare
    
    func isTheBest() -> Bool {
        if self ==  .ExtremelyRare {
            return true
        }
        else {
            return false
        }
    }
}

var steakValue = WaysToCookSteakProperly.VeryRare
steakValue.isTheBest()

//Associated values!
enum Abilities {
    case Strength(Int)
    case Dexterity(Int)
    case Constitution(Int)
    case Intelligence(Int)
    case Wisdom(Int)
    case Charisma(Int)
}

var strength = Abilities.Strength(12)
var strengthMessage: String?

//Note: switches must be exhaustive.
switch (strength) {
    case .Strength(18):
        strengthMessage = "Super strong"
    case .Strength(17), .Strength(16):
        strengthMessage = "Pretty strong"
    case .Strength(15):
        strengthMessage = "Strong enough, I suppose"
    default:
        strengthMessage = "Puny human!"
}






// MARK: Classes and Structs

class ThisIsAClass {
}
struct ThisIsAStruct {
}

var classInstance = ThisIsAClass()
var structInstance = ThisIsAStruct()

//Compile-time nil checking!
//var nilInstance : ThisIsAClass = nil //You can't do this!

//Optionals change how you instantiate objects
//So you can't do this

/*
class InvalidClass {
    var name : String
    var int: Int
}

var instance = InvalidClass()
*/

class FantasyCharacter {
    var name: String
    var age: Int
    
    init(name: String, age: Int) {
        self.name = name
        self.age = age
    }
    
    func attack() {
        //Do whatever
    }
}

var caramon = FantasyCharacter(name: "Caramon Majere", age: 26)
caramon.attack()



// MARK: Optional Chaining
class Monster {
    var inventory: Inventory?
}
class Inventory {
    var meleeWeapon: Weapon?
}
class Weapon {
    var maximumDamage: Int?
}

var monster : Monster?

monster = Monster()
monster?.inventory = Inventory()
monster?.inventory?.meleeWeapon = Weapon()
monster?.inventory?.meleeWeapon?.maximumDamage = 15

var maximumWeaponDamage: Int?
maximumWeaponDamage = monster?.inventory?.meleeWeapon?.maximumDamage



// MARK: Implicitly Unwrapped Optionals

class Monster2 {
    var inventory: Inventory!
}

let monster2 = Monster2()
let inv: Inventory? = monster2.inventory



//MARK: Inheritance

class Basilisk : Monster {
    func usePetrifyingGaze() {
        //turn some unlucky soul into stone
    }
}
let basilTheBasilisk = Basilisk()
basilTheBasilisk.usePetrifyingGaze()



//MARK: Computed Properties and Property Observers

class ObserveMeChange {
    
    private var _aComputedValue: Int = 0
    
    var aValue: Int?
    var aComputedValue: Int {
        get {
            println("get")
            return _aComputedValue + 5
        }
        set {
            println("set")
            _aComputedValue = newValue
        }
    }
    var observedValue: Int? {
        willSet {
            println("willSet")
        }
        didSet {
            println("didSet")
        }
    }
    
}

var observe = ObserveMeChange()
observe.aValue = 3
observe.observedValue = 7
observe.aComputedValue = 4
observe.aComputedValue



//MARK: They have Protocols (Interfaces in .NET)

protocol FireBreathing {
    
    func breathFire(character: FantasyCharacter)
    
}

class Dragon : FireBreathing {
    
    func breathFire(character: FantasyCharacter) {
        //implement
    }
}



//MARK: Extensions

extension Dragon {
    func bite(character: FantasyCharacter) {
        //ouch
    }
}

var dragon = Dragon()


//MARK: Generics
//...you've already seen them...



//MARK: Playing around with the iOS API

var label = UILabel()
label.frame = CGRect(x: 0, y: 10, width: 100, height: 50)
label.text = "Howdy y'all"
label.backgroundColor = UIColor.lightGrayColor()
label.textAlignment = NSTextAlignment.Center




class TestView : UIView {
    
    override func drawRect(rect: CGRect) {
        
        var c = UIGraphicsGetCurrentContext()
        
        CGContextSetStrokeColorWithColor(c, UIColor.redColor().CGColor)
        CGContextSetLineWidth(c, 5.0)
        CGContextMoveToPoint(c, 25, 165)
        CGContextAddLineToPoint(c, 200, 50)
        CGContextAddLineToPoint(c, 375, 165)
        CGContextStrokePath(c)
        
        
        CGContextSetFillColorWithColor(c, UIColor.grayColor().CGColor)
        
        CGContextMoveToPoint(c, 200, 100)
        CGContextFillRect(c, CGRect(x: 50, y: 150, width: 300, height: 200))
    }

}

var view = TestView()
view.frame = CGRect(x: 0, y: 0, width: 400, height: 400)

var red = UIColor.redColor()










































