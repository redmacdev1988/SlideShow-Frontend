"use strict";


function TimeLiner() {
    this.circularList = new CircularList("TimeLiner");

    this.insertTimeFrame = function(data) {
      this.circularList.insert(data);
    };

    this.currentFrame = function() {
        return this.circularList.current();
    };

    this.nextFrame = function() {
        return this.circularList.step(1, StepEnum.NEXT);
    };

    this.previousFrame = function() {
        return this.circularList.step(1, StepEnum.PREV);
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
