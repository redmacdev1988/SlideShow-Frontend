
let a = new Map();

var keyString = "rt";
var keyObj = {}


a.set(keyString, "hado ken!")
a.set(keyObj, "some empty object here")

console.log(a.size)

console.log(a.get(keyString))
console.log(a.get(keyObj))

console.log(a.get("rt"))


var map = new Map(); // maps can have object keys


function doSomethingWith(obj) {
    console.log("doSomething .....with")
}

function useObj(obj){
    console.log(" --- use object function --- ")

    doSomethingWith(obj);

    // called takes on map.get(obj),  which is a count.
    // or if null, take on 0
    var temp = map.get(obj);
    console.log(temp);

    var called = temp || 0;
    console.log("called: " + called);

    called++; // called one more time
    if(called > 10) {
      console.log("more than 10 times yo!")
    }

    // 1) we keep track of every single object "obj",
    // that's passed into this function
    // 2) hence, memory leak because garbage collection will never
    // collect those objects. The map is created on the heap and is a global
    // variable, thus, will always exist.
    map.set(obj, called); // set the obj as key, its value is # of times its been called
}

let myObj = {};

useObj(myObj);
useObj(myObj);

console.log(" ----------- weak map example --------");

// Any variables declared inside a block, is scoped to the nearest function.
// create closure with IIFE, thus all variables declared are private to the
// nearest function

//The first difference from Map is that its keys must be objects, not primitive values:

let Person = (function () {
  console.log(" --- scope of IIFE ---")

  // private to this scope
  let privateProps = new WeakMap();

  let jKey = {name:"John"}
  class Person {
    constructor(name) {
      console.log("constructing Person....")
      this.name = name; // this is public

      // sets instance 'this' to property value
      privateProps.set(this, {age: 20, SSN:"NA"}); // this is private
      privateProps.set(jKey, "testing 1 2 3");
    }

    greet() {
      console.log("calling greet function")
      console.log(privateProps.has(jKey))
      console.log(privateProps.has(this))
      console.log(privateProps)
      // Here we can access both name and age
      console.log(`name: ${this.name}, age: ${privateProps.get(this).age}`);
          console.log(`SSN -  ${privateProps.get(this).SSN}`);
      console.log(privateProps.get(jKey));
    }
  }

  console.log(" returning Person class");
  return Person; // returns class Person to outside variable Person
})();



let rickyPerson = new Person("ricky");
rickyPerson.greet();
