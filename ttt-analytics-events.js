// Implemented using the revealing module pattern

var ttt_analytics = (function () {

    return {

        load_event_recorded: false,
        load_time: false,

        initial_scroll_event_recorded: false,
        load_to_initial_scroll_time: false,

        scroll_to_widget_event_recorded: false,
        user_sees_widget_time: false,
        load_to_seeing_widget_time: false,

        scroll_to_footer_event_recorded: false,

        loaded: function () {
            this.load_event_recorded = true;
            this.load_time = Date.now();
            this.webTrendsProxy('load-event');
        },

        scrolled: function () {
            if (this.initial_scroll_event_recorded === false) {
                this.initial_scroll_event_recorded = true;
                this.load_to_initial_scroll_time = this.timeSinceLoad();
                this.webTrendsProxy('initial-scroll-event');
                return;
            }

            if (this.widget_visible()) {
                this.load_to_seeing_widget_time = this.timeSinceLoad();
                this.webTrendsProxy('user-sees-widget');
                return;
            }
            if (this.footer_reached()) {
                this.webTrendsProxy('user-reached-footer');
            }
        },

        timeSinceLoad: function() {
          return ((Date.now() - this.load_time) / 1000).toPrecision(2);
        },

        widget_visible: function () {
            if (this.scroll_to_widget_event_recorded === false) {
                var scrolledFromTop = $(window).scrollTop(),
                    elementTop = $('#traces-through-time-collection').offset().top,
                    inView = scrolledFromTop - (elementTop - window.innerHeight);
                if (inView > 0) {
                    this.user_sees_widget_time = Date.now();
                    this.scroll_to_widget_event_recorded = true;
                    return true;
                }
            }
            return false;
        },

        footer_reached: function () {
            if (this.scroll_to_footer_event_recorded == false) {
                var scrolledFromTop = $(window).scrollTop(),
                    elementTop = $('#footer-wrapper').offset().top,
                    inView = scrolledFromTop - (elementTop - window.innerHeight);
                if (inView > 0) {
                    this.scroll_to_footer_event_recorded = true;
                    return true;
                }
            }
            return false;
        },

        webTrendsProxy: function (arg) {
            switch (arg) {
                case 'load-event':
                    // Insert webTrendsCall for load event
                    console.log('Load event has happened');
                    break;
                case 'initial-scroll-event':
                    // Insert webTrendsCall for scroll event
                    console.log('Initial scroll event has happened');
                    break;
                case 'user-sees-widget':
                    // Insert webTrendsCall for user seeing widget
                    console.log('User sees widget event has happened');
                    break;
                case 'user-reached-footer':
                    // Insert webTrendsCall for user reaching footer
                    console.log('User reaching footer event has happened');
                    break;
            }
        }
    }
})();

$(document).ready(function () {
    ttt_analytics.loaded();
});

$(document).on('scroll', function () {
    ttt_analytics.scrolled();
});