
var StepEnum = Object.freeze({NEXT: "step next", PREV: "step previous"});

class CircularList {

  // properties and functions declared in constructor
  // are attached to "this" object
  // Hence, it is copied into every instance
  // log CircularListClass or the instance itself.
  constructor(listName) {
    console.log("Constructing CircularList " + listName);
    // uses scope variables for privacy
    var _name = listName;
    // setting new name
    this.setName = function(listName) { _name = listName;}
    // getting the new name
    this.getName = function() { return _name; }

    // private member variables //////////////////////////

    var _head = null;

    // pubic getter setter for private variable
    this.setHead = function(newHead) {_head = newHead;}
    this.getHead = function() {return _head;}

    var _tail = null;
    this.setTail = function(newTail) {_tail = newTail;}
    this.getTail = function() {return _tail;}

    var _now = null;
    this.setNow = function(newNow) {_now=newNow;}
    this.getNow = function() {return _now;}

    // private functions //////////////////////////

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

    // public function that uses privates
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


  // attached to prototype object //
  // log instance.__proto__ or CircularListClass.prototype

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

  current() {
    console.log(this.getNow());
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
          let toGoFrame = (step_ENUM === StepEnum.NEXT) ? this.getNow().next : this.getNow().prev;
          if (toGoFrame) {
            this.setNow(toGoFrame);
            steps--;
          } else {
            return;
          }
        } while (steps > 0);
      }
  }

}
