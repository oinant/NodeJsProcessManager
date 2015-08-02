var Merger = require("../../merger.js");

function mergeCrawlerResults() {
    this.execute = function(context, eventBus) {
        var merger = new Merger(function(data) {
            context.crawlerMergeResults = data;
            eventBus.taskDone();
        });
        merger.merge(context.crawledNewLinks);
    }
}

module.exports = mergeCrawlerResults;