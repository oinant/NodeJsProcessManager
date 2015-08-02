var processEvents = require('./processEvents.js');
var events = require('events'),
    util = require('util');

function ProcessEventBus() {
    events.EventEmitter.call(this);
}

util.inherits(ProcessEventBus, events.EventEmitter);

ProcessEventBus.prototype.taskDone = function(data) {
    this.emit(processEvents.taskDone, data);
};

ProcessEventBus.prototype.taskFaulted = function(data) {
    this.emit(processEvents.taskFaulted, data);
};

ProcessEventBus.prototype.processDone = function(data) {
    this.emit(processEvents.processDone, data);
};

module.exports = ProcessEventBus;