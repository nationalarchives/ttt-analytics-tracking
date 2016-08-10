// Implemented using the revealing module pattern

var ttt_analytics = (function() {

    return {
        load_event_called : false,
        load_time : false,
        webTrendsProxy : function(arg) {
            switch (arg) {
                case 'load-event':
                    // webTrendsCall for load event
                    this.load_event_called = true;
                    this.load_time = Date.now();
                    break;

            }
        }
    }
})();

$(document).ready(function() {
   ttt_analytics.webTrendsProxy('load-event')
});