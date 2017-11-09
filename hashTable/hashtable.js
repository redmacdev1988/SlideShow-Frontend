"use strict";


function Node(newData, newNext) {
    // this = {}
    if (new.target === undefined) {
         console.log('You didnt use new. Giving you a new Node Object');
         return new Node();
    }
    // assign properties to self
    this.data = newData;
    this.next = newNext;

    this.clean = function() {
      this.data = null;
      this.next = null;
    }

    this.display = function() {
        console.log(this.data);
    };
    // return this
}

function Queue() {

  if (new.target === undefined) {
       console.log('You didnt use new. Giving you a new Queue Object');
       return new Queue();
  }

  this.head = null;
  this.tail = null;

  this.insert = function(newData) {
    if (this.head === null && this.tail === null) {
        this.head = this.tail = new Node(newData, null);
    }  else {
      this.tail.next = new Node(newData, null);
      this.tail = this.tail.next;
    }
  };

  this.array = function() {
      var flatArray = [];
      var iterator = this.head;
      while (iterator != null) {
          flatArray.push(iterator.data);
          iterator = iterator.next;
      }
      return flatArray;
  }


  this.remove = function() {
      var toRemove;
      if (this.head == null && this.tail == null) {
        console.log("Can't remove. Queue is already empty");
      } else if (this.head === this.tail) {
        toRemove = this.head;
        this.head = this.tail = null;
        return toRemove;
      } else if(this.head != null) {
        toRemove = this.head;
        this.head = this.head.next;
        return toRemove;
      }
  };

  // iterates through the queue and looks to see if data exists. returns if found.
  // returns null if not.
  this.get = function(key) {
      var iterator = this.head;
      while(iterator != null) {
          if (iterator.data.name === key) {
            return iterator.data;
          }
          iterator = iterator.next;
      }
      return null;
  }

  this.print = function() {
    console.log("--- Queue (print) ---");
    var iterator = this.head;
    while(iterator !== null) {
      iterator.display();
      iterator = iterator.next;
    }
    console.log("--------------");
  };

}

//https://www.hackerearth.com/practice/data-structures/hash-tables/basics-of-hash-tables/tutorial/
function HashTable(size) {

  var size = size || 0; // private
  var table = Array(size); // private

  for (var i = 0; i < size; i++) {
    table[i] = null;
  }

  var pvt_HashFunction = function(key) {
    var sum = 0;
    var arrayOfCharacters = key.split('');

    // sum of (ASCII value of each character * index of each character)
    for (var index = 0; index < arrayOfCharacters.length; index++) {
      var asciiValue = arrayOfCharacters[index].charCodeAt();
      sum += asciiValue * (index+1);
    }
    return sum;
  }

  this.index = function(key) {
    return pvt_HashFunction(key) % size;
  }

  this.insert = function(key, obj) {
    var indexToInsert = this.index(key);
    if (table[indexToInsert] == null) {
      table[indexToInsert] = new Queue();
    }
    table[indexToInsert].insert(obj);
  }


  this.access = function(key) {
      var indexToRetrieve = this.index(key);
      console.log(indexToRetrieve);
      var queue = table[indexToRetrieve];
      return (queue) ? queue.get(key) : null;
  }

  this.flatArray = function() {
    var allHashTableElements = [];
    for (var i = 0; i < table.length; i++) {
        var queue = table[i];
        if (queue) {
          allHashTableElements = allHashTableElements.concat(queue.array());
        }
    }
    return allHashTableElements;
  }

  this.print = function() {
    console.log("======== hash table print ==========");
    if (table.length <= 0) {
        console.log("Ø hash table empty Ø");
        return;
    }
    for (var i = 0; i < table.length; i++) {
        var queue = table[i];
        console.log("     " + i + "    ");
        if (table[i]) {
          queue.print();
        } else {
          console.log(" EMPTY ");
        }
    }
  }


}

HashTable.CreateObject = function(sizeOfTable) {
  return (isNaN(sizeOfTable) || (sizeOfTable < 0)) ? null : new HashTable(sizeOfTable);
}
