"use strict";


function Node(newKey, newData, newNext) {
    // this = {}
    if (new.target === undefined) {
         console.log('You didnt use new. Giving you a new Node Object');
         return new Node();
    }
    // assign properties to self
    this.key = newKey;
    this.data = newData;
    this.next = newNext;

    this.clean = function() {
      this.key = null;
      this.data = null;
      this.next = null;
    }

    this.display = function() {
        console.log(`${this.key}, ${this.data}`);
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

    this.insert = function(newKey, newData) {
        if (this.head === null && this.tail === null) {
            this.head = this.tail = new Node(newKey, newData, null);
        } else {
            this.tail.next = new Node(newKey, newData, null);
            this.tail = this.tail.next;
        }
    };

    this.array = function() {
        var flatArray = [];
        var iterator = this.head;
        while (iterator != null) {
            flatArray.push({
              "key" : iterator.key,
              "data" : iterator.data
            });
            iterator = iterator.next;
        }
        return flatArray;
    };


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
        // loop through and try to find the data
        while(iterator != null) {
            if (iterator.key === key) {
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

function HashTable(size) {
  var _size = size || 0; // private
  // getter and setter
  this.getSize = function() {return _size;}
  this.setSize = function(newSize) {_size = newSize;}

  var _table = new Array(size); // private
  for (var i = 0; i < size; i++) { _table[i] = null; }

  // getter and setter
  this.getTable = function() {return _table};
  this.setTable = function(newTable) {_table = newTable}

  // private
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

  // public function of instance, uses private function
  this.index = function(key) { return pvt_HashFunction(key) % size; }
}

HashTable.prototype.insert = function(key, obj) {
  var indexToInsert = this.index(key);
  if (this.getTable()[indexToInsert] == null) {
    this.getTable()[indexToInsert] = new Queue();
  }
  // queue.insert(obj)
  this.getTable()[indexToInsert].insert(key, obj);
}

HashTable.prototype.print = function() {
  console.log("======== hash table print ==========");
  let tableLength = this.getTable().length;
  let table = this.getTable();

  if (tableLength <= 0) { console.log("Ø hash table empty Ø"); return; }
  for (var i = 0; i < tableLength; i++) {
      var queue = table[i];
      console.log("     " + i + "    ");
      if (table[i]) { queue.print(); } else { console.log(" EMPTY "); }
  }

}

HashTable.prototype.access = function(key) {
      var indexToRetrieve = this.index(key);
      var queue = this.getTable()[indexToRetrieve];
      return (queue) ? queue.get(key) : null;
}

HashTable.prototype.flatArray = function() {
    var allHashTableElements = [];
    let table = this.getTable();
    for (var i = 0; i < table.length; i++) {
        var queue = table[i];
        if (queue) { allHashTableElements = allHashTableElements.concat(queue.array()); }
    }
    return allHashTableElements;
}
