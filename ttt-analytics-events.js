// Implemented using the revealing module pattern

var ttt_analytics = (function () {

    return {
        load_event_called: false,
        load_time: false,
        time_from_load_to_start_scroll: false,
        webTrendsProxy: function (arg) {
            switch (arg) {
                case 'load-event':
                    // webTrendsCall for load event
                    this.load_event_called = true;
                    this.load_time = Date.now();
                    break;
                case 'scroll-event':
                    // webTrendsCall for scroll event
                    this.time_from_load_to_start_scroll = Date.now() - this.load_time;
                    break;
            }
        }
    }
})();

$(document).ready(function () {
    ttt_analytics.webTrendsProxy('load-event');
});

$(document).one('scroll', function () {
    ttt_analytics.webTrendsProxy('scroll-event');
});