// Implemented using the revealing module pattern

var ttt_analytics = (function () {

    return {
        load_event_called: false,
        load_time: false,
        time_from_load_to_start_scroll: false,
        scrolled_to_widget_event_called: false,
        time_user_sees_widget: false,
        time_from_load_to_seeing_widget: false,
        user_has_scrolled_to_footer: false,
        ttt_widget_in_view: function () {
            if (this.scrolled_to_widget_event_called === false) {
                var scrolledFromTop = $(window).scrollTop(),
                    elementTop = $('#traces-through-time-collection').offset().top,
                    inView = scrolledFromTop - (elementTop - window.innerHeight);
                if (inView > 0) {
                    this.scrolled_to_widget_event_called = true;
                    this.time_user_sees_widget = Date.now();
                    return true;
                }
            }
            return false;
        },
        footer_reached: function () {
            if (this.user_has_scrolled_to_footer == false) {
                var scrolledFromTop = $(window).scrollTop(),
                    elementTop = $('#footer-wrapper').offset().top,
                    inView = scrolledFromTop - (elementTop - window.innerHeight);
                if (inView > 0) {
                    this.user_has_scrolled_to_footer = true;
                    return true;
                }
            }
            return false;
        },
        webTrendsProxy: function (arg) {
            switch (arg) {
                case 'load-event':
                    // webTrendsCall for load event
                    this.load_event_called = true;
                    this.load_time = Date.now();
                    console.log('Load event has happened');
                    break;
                case 'scroll-event':
                    // webTrendsCall for scroll event
                    this.time_from_load_to_start_scroll = Date.now() - this.load_time;
                    console.log('Scroll event has happened');
                    break;
                case 'user-sees-widget':
                    // webTrendsCall for user seeing widget
                    this.time_from_load_to_seeing_widget = Date.now() - this.time_user_sees_widget;
                    console.log('User sees widget event has happened');
                    break;
                case 'user-reached-footer':
                    // webTrendsCall for user reaching footer
                    console.log('User reaching footer event has happened');
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

$(document).on('scroll', function () {
    if (ttt_analytics.ttt_widget_in_view()) {
        ttt_analytics.webTrendsProxy('user-sees-widget');
    }
    if (ttt_analytics.footer_reached()) {
        ttt_analytics.webTrendsProxy('user-reached-footer');
    }
});