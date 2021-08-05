'use strict'
module.exports = (socket) =>{
    var nodecron = require("node-cron");
// New Nodecron run a task every 5 seconds
var job = nodecron.schedule("*/5 * * * * *", task);
// task to execute from cron job
function task() {

     //}
}

}

// start the cron jobjob.start();
// Add a health check every 10sec
// setInterval(function () {
// console.log("-- health check -- Last Execution" ,job);
// console.log("-- health check -- Is job running? ");
// console.log("-- health check -- Next task at: ");
// }, 10*1000);