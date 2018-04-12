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


class CircularList {

  constructor(listName) {
    console.log("Constructing CircularList " + listName);
    // uses scope variables for privacy
    var _name = listName;
    // setting new name
    this.setName = function(listName) { _name = listName;}
    // getting the new name
    this.getName = function() { return _name; }


    // private member variables
    var _head = null;
    this.setHead = function(newHead) {_head = newHead;}
    this.getHead = function() {return _head;}

    var _tail = null;
    this.setTail = function(newTail) {_tail = newTail;}
    this.getTail = function() {return _tail;}

    var _now = null;
    this.setNow = function(newNow) {_now=newNow;}
    this.getNow = function() {return _now;}

    // private functions

    let dataMatches = (data1, data2) => {
        return (data1.toUpperCase() === data2.toUpperCase());
    }

    let removeLastNode = (data, ref) => {
      console.log("---removeLastNode---")
      if (dataMatches(data.toUpperCase(), ref.data.toUpperCase())) {
        console.log("data matches!");

        if (_head === _tail) {
            console.log("head and tail are same")
            _head.prev = null;
            _head.next = null;
            _head = null;

            _tail.prev = null;
            _tail.next = null;
            _tail = null;

            ref.clean();
            return true;
          }
      }
      return false;
    }

    let removeNodeAtHead = (ref) => {

      if (ref === _head) {
          var temp = ref;
          ref.next.prev = _tail;
          ref.prev.next = ref.next;
          _head = ref.next;
          temp.clean();
          return true;
      }
      return false;
    }

    let removeNodeAtTail = (ref) => {
      if (ref === _tail) {
          var temp = ref;
          ref.next.prev = ref.prev;
          ref.prev.next = ref.next;
          _tail = ref.prev;
          temp.clean();
          return true;
      }
      return false;
    }

    let removeNodeInBetween = (ref) => {
        if ((ref !== _tail) && (ref !== _head)) {
          ref.next.prev = ref.prev;
          ref.prev.next = ref.next;
          ref.clean();
          return true;
        }
        return false;
    }

    // public function that uses private
    this.remove = function(data){
        if (this.isEmpty()) {
            console.log("Remove: Nothing to remove because list is empty");
            return;
        }
        try {
          let traversal = _head;

          if (removeLastNode(data, traversal)) { return;}
        do {
            if (dataMatches(data.toUpperCase(), traversal.data.toUpperCase())) {
                if (removeNodeAtHead(traversal)) return;
                if (removeNodeAtTail(traversal)) return;
                if (removeNodeInBetween(traversal)) return;
            }
            traversal = traversal.next;
        } while (traversal != _head);

      } catch(error) {
        console.log("Warning: "+ error);
      }
    };

    console.log("Finished constructing CircularList")

  } // end of constructor

  current() {
    return this.getNow();
  }

  setCurrentToHead() {
      this.setNow(this.getHead());
      return this.getNow();
  }

  setCurrentToTail() {
      this.setNow(this.getTail());
      return this.getNow();
  };

  step(steps, step_ENUM) {
      if(!isNaN(steps) && steps > 0) {
        do {
          this.setNow((step_ENUM === StepEnum.NEXT) ? this.getNow().next : this.getNow().prev);
          steps--;
        } while (steps > 0);
      }
  }
  // public functions

  isString(data) {
    return ((typeof data) === 'string');
  }

  isEmpty() {
    return (this.getHead() == null && this.getTail() == null);
  }

  insert(data) {
    console.log("CircularList - Inserting data: " + data);

    try {
      if (!this.isString(data)) throw "Data Must be a String";
      if (this.isEmpty()) {
          this.setHead(new ListNode(data, null, null));
          this.setTail(this.getHead());
      } else {
         this.setTail(new ListNode(data, this.getTail(), this.getHead()));

         this.getTail().prev.next = this.getTail();
         this.getHead().prev = this.getTail();
      }
      this.setNow(this.getHead());

    } catch(err) {
      console.log("\n------ ERROR ------");
      console.log("description: data not entered");
      console.log("reason: " + err);
      console.log("===================\n\n")
    }
  }

  print() {
      if (this.getHead() === null) { console.log("-- LIST IS EMPTY --"); return; }
      var traversal = this.getHead();
      do {
          traversal.display();
          traversal = traversal.next;
      } while (traversal !== this.getHead() && traversal != null);
  }

}



/*
class way
*/



// OLD WAY, no good
/*
function CircularList() {

    if (new.target === undefined) {
         console.log('You didnt use new. Giving you a new CircularList Object');
         return new CircularList();
    }

    // private member variables
    var head = null;
    var tail = null;
    var now = null;

    // public
    // O(1)
    this.current = function() {
        return now;
    };

    // public
    // O(1)
    this.setCurrentToHead = function() {
        now = head;
        return now;
    };

    // public
    // O(1)
    this.setCurrentToTail = function() {
        now = tail;
        return now;
    };

    // public
    // O(n)
    this.stepNext = function(steps) {
        if(!isNaN(steps) && steps > 0) {
            while (steps > 0) {
                now = now.next;
                steps--;
            }
        }
    };

    // public
    // O(n)
    this.stepPrev = function(steps) {
        if(!isNaN(steps) && steps > 0) {
            while (steps > 0) {
                now = now.prev;
                steps--;
            }
        }
    };

    // done
    // public
    // O(1)
    this.insert = function(data) {
        if (head === null && tail === null) {
            head = new ListNode(data, null, null);
            tail = head;
        } else {
           tail = new ListNode(data, tail, head);
           tail.prev.next = tail;
           head.prev = tail;
        }
        now = tail;
    };

    // public
    // O(n)
    this.remove = function(data) {
        console.log("-- we want to remove {" + data + "} --");

        if (isEmpty()) {
            console.log("Nothing to remove because list is empty");
            return;
        }

        var traversal = head;
        if (removeLastNode(traversal)) return;
        do {
            if (dataMatches(data.toUpperCase(), traversal.data.toUpperCase())) {
                if (removeNodeAtHead(traversal)) return;
                if (removeNodeAtTail(traversal)) return;
                if (removeNodeInBetween(traversal)) return;
            }
            traversal = traversal.next;
        } while (traversal != head);
        console.log(data + " cannot be found in our list.");
    };

    // done
    // public
    // O(n)
    this.print = function() {
        if (head === null) { console.log("-- LIST IS EMPTY --"); return; }

        var traversal = head;
        do {
            traversal.display();
            traversal = traversal.next;
        } while (traversal !== head && traversal != null);
    };

    function isEmpty() {
        return (head == null && tail == null);
    }

    // private
    // O(1)
    function dataMatches (data1, data2) {
        return (data1.toUpperCase() === data2.toUpperCase());
    };

    // private
    // O(1)
    function removeLastNode (ref) {
        if (head === tail) {
            head = head.next = head.prev = null;
            tail = tail.next = tail.prev = null;
            ref.clean();
            return true;
        }
        return false;
    };

    // private
    function removeNodeAtHead(ref) {
      if (ref === head) {
          var temp = ref;
          ref.next.prev = tail;
          ref.prev.next = ref.next;
          head = ref.next;
          temp.clean();
          return true;
      }
      return false;
    }

    // private
    // O(1)
    function removeNodeAtTail (ref) {
      if (ref === tail) {
          var temp = ref;
          ref.next.prev = ref.prev;
          ref.prev.next = ref.next;
          tail = ref.prev;
          temp.clean();
          return true;
      }
      return false;
    }

    // private
    // O(1)
    function removeNodeInBetween (ref) {
        if ((ref !== tail) && (ref !== head)) {
          console.log("removing node in between");
          ref.next.prev = ref.prev;
          ref.prev.next = ref.next;
          ref.clean();
          return true;
        }
        return false;
    }

}
*/
