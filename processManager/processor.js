var processEvents = require("./processEvents.js"),
    ProcessEventBus = require("./processManager/processEventBus.js");

function Processor(process, onCompletion, options) {
    options = options || {};
    options.logEvents = options.hasOwnProperty('logEvents') ? options.logEvents : false;
    options.context = options.hasOwnProperty('context') ? options.context : {};

    var eventBus = new ProcessEventBus();

    function executeNext() {
        if(options.logEvents) console.log('Processor.executeNext, tasks left : ' + process.length);
        
        if (process.length > 0) {
            var nextTask = process.shift();
            nextTask.execute(options.context, eventBus);
        }
        else
            eventBus.processDone();
    }

    eventBus.on(processEvents.taskDone, function(data) {
        if(options.logEvents) console.log('processEvents.taskDone');
        executeNext();
    });
    
    eventBus.on(processEvents.processDone, function(data) {
        if(options.logEvents) console.log('processEvents.processDone');
        onCompletion(context);
    });
    
    this.execute = function() {
        if(options.logEvents) console.log('Processor.execute, initial tasks count : ' + process.length);
        executeNext();
    };
}

module.exports = Processor;