"use strict";


function TimeLiner() {
    this.circularList = new CircularList();

    this.insertTimeFrame = function(data) {
        this.circularList.insert(data);
    };

    this.currentFrame = function() {
      return this.circularList.current();
    };

    this.nextFrame = function() {
      return this.circularList.stepNext(1);
    };

    this.previousFrame = function() {
      return this.circularList.stepPrev(1);
    };

    this.setCurrentToFirstFrame = function() {
      return this.circularList.setCurrentToHead();
    };

    this.setCurrentToLastFrame = function() {
      return this.circularList.setCurrentToTail();
    };

    this.displayAllFrames = function() {
      this.circularList.print();
    }
}
