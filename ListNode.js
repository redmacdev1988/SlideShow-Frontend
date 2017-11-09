"use strict";

function ListNode(newData, newPrev, newNext) {
    // this = {}
    if (new.target === undefined) {
         console.log('You didnt use new. Giving you a new Node Object');
         return new Node();
    }
    // assign properties to self
    this.data = newData;
    this.next = newNext;
    this.prev = newPrev;

    this.clean = function() {
      this.data = null;
      this.next = null;
      this.prev = null;
    }

    this.display = function() {
        console.log("ListNode data >")
        console.log(this.data);
    };
    // return this
}
