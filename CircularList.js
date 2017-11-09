"use strict";

function CircularList() {

    this.head = null;
    this.tail = null;
    this.now = null;

    this.current = function() {
        return this.now;
    };

    this.setCurrentToHead = function() {
        this.now = this.head;
        return this.now;
    };

    this.setCurrentToTail = function() {
        this.now = this.tail;
        return this.now;
    };

    this.stepNext = function(steps) {
      if(!isNaN(steps) && steps > 0) {
        while (steps > 0) {
          this.now = this.now.next;
          steps--;
        }
      }
    };

    this.stepPrev = function(steps) {
      if(!isNaN(steps) && steps > 0) {
        while (steps > 0) {
          this.now = this.now.prev;
          steps--;
        }
      }
    };

    this.insert = function(data) {
        if (this.head === null && this.tail === null) {
           this.head = new ListNode(data, null, null);
           this.tail = this.head;
        } else {
           this.tail = new ListNode(data, this.tail, this.head);
           this.tail.prev.next = this.tail;
           this.head.prev = this.tail;
        }

        this.now = this.tail;
    };

    this.dataMatches = function(data1, data2) {
        return (data1.toUpperCase() === data2.toUpperCase());
    };

    this.removeLastNode = function(ref) {
        if (this.head === this.tail) {
            console.log("LAST ITEM IN THE LIST.")
            this.head = this.head.next = this.head.prev = null;
            this.tail = this.tail.next = this.tail.prev = null;
            ref.clean();
            return true;
        }

        return false;
    };

    this.removeNodeAtHead = function(ref) {
      if (ref === this.head) {
        console.log("removing node at head");
          var temp = ref;
          ref.next.prev = this.tail;
          ref.prev.next = ref.next;
          this.head = ref.next;
          temp.clean();
          return true;
      }
      return false;
    };

    this.removeNodeAtTail = function(ref) {
      if (ref === this.tail) {
        console.log("removing node at tail");
          var temp = ref;
          ref.next.prev = ref.prev;
          ref.prev.next = ref.next;
          this.tail = ref.prev;
          temp.clean();
          return true;
      }
      return false;
    };

    this.removeNodeInBetween = function(ref) {
        if ((ref !== this.tail) && (ref !== this.head)) {
          console.log("removing node in between");
          ref.next.prev = ref.prev;
          ref.prev.next = ref.next;
          ref.clean();
          return true;
        }
        return false;
    };

    this.remove = function(data) {
        console.log("-- we want to remove {" + data + "} --");
        var traversal = this.head;
        if(this.removeLastNode(traversal)) return;
        do {
            if (this.dataMatches(data.toUpperCase(), traversal.data.toUpperCase())) {
              if (this.removeNodeAtHead(traversal)) return;
              if (this.removeNodeAtTail(traversal)) return;
              if (this.removeNodeInBetween(traversal)) return;
            }
            traversal = traversal.next;
        } while (traversal != this.head);
        console.log(data + " cannot be found in our list.");
    };

    this.print = function() {
      if (this.head === null) { console.log("-- LIST IS EMPTY --"); return; }
      var traversal = this.head;
      do {
        traversal.display();
        traversal = traversal.next;
      } while (traversal !== this.head);
    };

}
