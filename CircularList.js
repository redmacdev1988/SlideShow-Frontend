"use strict";

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
        if(removeLastNode(traversal)) return;
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

var c = new CircularList();
c.remove("hohoho");

c.insert("ricky");
c.insert("david");
c.insert("evan");
c.insert("Shirly");
c.insert("Ivan");
c.print();

c.remove("ricky");
c.print();
c.remove("Ivan");
c.print();
c.remove("evan");
c.print();
c.remove("david");
c.remove("Shirly");
c.print();

/*
c.insert("david");
c.print();
c.remove("ricky");
c.print();
*/
