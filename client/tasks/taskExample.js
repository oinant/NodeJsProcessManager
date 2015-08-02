var Merger = require("../../merger.js");

function mergeCrawlerResults() {
    this.execute = function(context, eventBus) {
    	var taskCompleteCallback = function(data) {
            context.crawlerMergeResults = data;
            eventBus.taskDone();
        }
        
        var merger = new Merger(taskCompleteCallback);
        merger.merge(context.crawledNewLinks);
    }
}

module.exports = mergeCrawlerResults;