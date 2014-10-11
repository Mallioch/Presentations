//Sort algo taken from http://waynewbishop.com/swift/sorting-algorithms/

import UIKit
import XCPlayground

var data = [19, 25, 1, 12, 5, 100, 2]

func insertionSort(var numbers: [Int]) -> [Int] {
    var x, y, key : Int
    
    for (x = 0; x < numbers.count; x++) {
        key = numbers[x]
        
        for (y = x; y > -1; y--) {
            if (key < numbers[y]) {
                y
                numbers.removeAtIndex(y + 1)
                numbers
                numbers.insert(key, atIndex: y)
                numbers
            }
        }
    }
    
    return numbers
}

insertionSort(data)


