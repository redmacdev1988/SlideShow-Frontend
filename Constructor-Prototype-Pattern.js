"use strict";

var StepEnum = Object.freeze({NEXT: "step next", PREV: "step previous"});

function ListNode(newData, newPrev, newNext) {

    // this = {}
    if (new.target === undefined) {
         console.log('You didnt use new. Giving you a new Node Object');
         return new Node();
    }

    // public properties
    this.data = newData;
    this.next = newNext;
    this.prev = newPrev;

    // public functions
    this.clean = function() {
        this.data = null;
        this.next = null;
        this.prev = null;
    }

    this.display = function() {
        console.log("[" + this.data + "]")
    }
    // return this
} // List Node


function List(newName) {

  this.head = null;
  this.tail = null;
  this.now = null;
  this.listName = newName;

  // O(1)
  this.removeLastNode = function(data, ref) {
    if (this.dataMatches(data.toUpperCase(), ref.data.toUpperCase())) {
      if (this.head === this.tail) {
            this.head = this.head.next = this.head.prev = null;
            this.tail = this.tail.next = this.tail.prev = null;
            ref.clean();
            return true;
        }
    }
    return false;
  }


  this.removeNodeAtHead = function(ref) {
    if (ref === this.head) {
        var temp = ref;
        ref.next.prev = this.tail;
        ref.prev.next = ref.next;
        this.head = ref.next;
        temp.clean();
        return true;
    }
    return false;
  }

  // O(1)
  this.removeNodeAtTail = function(ref) {
    if (ref === this.tail) {
        var temp = ref;
        ref.next.prev = ref.prev;
        ref.prev.next = ref.next;
        this.tail = ref.prev;
        temp.clean();
        return true;
    }
    return false;
  }

  // O(1)
  this.removeNodeInBetween = function(ref) {
      if ((ref !== this.tail) && (ref !== this.head)) {
        ref.next.prev = ref.prev;
        ref.prev.next = ref.next;
        ref.clean();
        return true;
      }
      return false;
  }

}

List.prototype.about = function() {
    console.log(`Circular list (${this.listName}) with nodes that reference next and previous.  Ricky Tsao 2018`);
}

List.prototype.current = function() {
  return this.now;
}

List.prototype.setCurrentToHead = function() {
    this.now = this.head;
    return this.now;
}

List.prototype.setCurrentToTail = function() {
    this.now = this.tail;
    return this.now
};

List.prototype.step = function(steps, StepEnum) {
    if(!isNaN(steps) && steps > 0) {
      while (steps > 0) {
        this.now = (StepEnum.NEXT) ? this.now.next : this.now.prev;
        steps--;
      }
    }
}

List.prototype.isEmpty = function() {
    return (!this.head && !this.tail);
}

List.prototype.insert = function(data) {
  console.log("PROTOTYPE - Inserting data: " + data);
  try {
    if (!this.isString(data)) throw "Data Must be a String";
    if (this.isEmpty()) {
        this.head = new ListNode(data, null, null);
        this.tail = this.head;
    } else {
       this.tail = new ListNode(data, this.tail, this.head);
       this.tail.prev.next = this.tail;
       this.head.prev = this.tail;
    }
    this.now = this.tail;
  } catch(err) {
    console.log("\n------ ERROR ------");
    console.log("description: data not entered");
    console.log("reason: " + err);
    console.log("===================\n\n")
  }
}

// Notice that in our prototype, we can use private functions from List
// public
// O(n)
List.prototype.remove = function(data) {
    if (this.isEmpty()) {
        console.log("Nothing to remove because list is empty");
        return;
    }
    try {
      var traversal = this.head;

      if (this.removeLastNode(data, traversal)) { return;}
    do {
        if (this.dataMatches(data.toUpperCase(), traversal.data.toUpperCase())) {
            if (this.removeNodeAtHead(traversal)) return;
            if (this.removeNodeAtTail(traversal)) return;
            if (this.removeNodeInBetween(traversal)) return;
        }
        traversal = traversal.next;
    } while (traversal != this.head);

  } catch(error) {
    console.log("Warning: "+ error);
  }
};

List.prototype.dataMatches = function(data1, data2) {
    return (data1.toUpperCase() === data2.toUpperCase());
}

List.prototype.isString = function(data) {
    return ((typeof data) === 'string');
}

List.prototype.display = function() {
  console.log("PROTOTYPE - display CircularList: " + this.listName)
    if (this.isEmpty()) { console.log("-- LIST (" + this.listName + ") IS EMPTY --"); return; }
    var traversal = this.head;
    console.log("-----" + this.listName + "-----");
    do {
        traversal.display();
        traversal = traversal.next;
    } while (traversal !== this.head && traversal != null);
    console.log("===============")
}

var metro = new List("metro");
metro.about();
metro.insert("Hou Hai");
metro.insert("Keyuan");
metro.insert("Window of the World");
metro.display();

metro.remove("Window of the World");
metro.display();

metro.remove("Hou Hai");
metro.display();

metro.remove("Window of the World");
metro.display();

metro.remove("Shui wan");
metro.display();

metro.remove("Keyuan");
metro.display();
