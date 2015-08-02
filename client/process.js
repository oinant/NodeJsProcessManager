var // infra & services
    Store = require("../../dal.js"),
    // process infrastruture
    Processor = require("../processManager/processor.js"),
    // tasks 
    GetStoredActiveLinks = require("./tasks/getStoredActiveLinks.js"),
    GetAllLinks = require("./tasks/getAllLinks.js"),
    Crawl = require("./tasks/crawl.js"),
    MergeCrawlerResults = require("./tasks/mergeCrawlerResults.js"),
    CheckForDelta = require("./tasks/checkForDelta.js"),
    SaveNewLinks = require("./tasks/saveNewLinks.js"),
    SaveLinksSummary = require("./tasks/saveLinksSummary.js");

function Process() {
    
    var store = new Store();
    
    var process = [
          new GetStoredActiveLinks(store)
        , new GetAllLinks(store)
        , new Crawl()
        , new MergeCrawlerResults()
        , new CheckForDelta()
        , new SaveNewLinks(store)
        , new SaveLinksSummary(store)
    ];

    this.execute = function() {
        console.log('new process');
        var processor = new Processor(process, function(result){ console.log("process completed")});
        processor.execute();
    }
};

module.exports = Process;