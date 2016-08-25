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
        user_sees_footer_time: false,
        load_to_seeing_footer_time: false,

        loaded: function () {
            this.load_event_recorded = true;
            this.load_time = Date.now();
            this.webTrendsProxy('load-event');
        },

        scrolled: function () {
            if (this.is_initial_scroll()) {
                this.webTrendsProxy('initial-scroll-event');
                return;
            }

            if (this.widget_visible()) {
                this.webTrendsProxy('user-sees-widget');
                return;
            }
            if (this.footer_visible()) {
                this.webTrendsProxy('user-reached-footer');
            }
        },

        time_since_load: function () {
            return ((Date.now() - this.load_time) / 1000).toPrecision(2);
        },

        is_initial_scroll: function () {
            if (this.initial_scroll_event_recorded === false) {
                this.initial_scroll_event_recorded = true;
                this.load_to_initial_scroll_time = this.time_since_load();
                return true;
            }
            return false;
        },

        widget_visible: function () {
            if (this.scroll_to_widget_event_recorded === false) {
                var scrolledFromTop = $(window).scrollTop(),
                    elementTop = $('#traces-through-time-collection').offset().top,
                    inView = scrolledFromTop - (elementTop - window.innerHeight);
                if (inView > 0) {
                    this.user_sees_widget_time = Date.now();
                    this.load_to_seeing_widget_time = this.time_since_load();
                    this.scroll_to_widget_event_recorded = true;
                    return true;
                }
            }
            return false;
        },

        footer_visible: function () {
            if (this.scroll_to_footer_event_recorded == false) {
                var scrolledFromTop = $(window).scrollTop(),
                    elementTop = $('#footer-wrapper').offset().top,
                    inView = scrolledFromTop - (elementTop - window.innerHeight);
                if (inView > 0) {
                    this.user_sees_footer_time = Date.now();
                    this.load_to_seeing_footer_time = this.time_since_load();
                    this.scroll_to_footer_event_recorded = true;
                    return true;
                }
            }
            return false;
        },

        webTrendsProxy: function (arg) {
            switch (arg) {
                case 'load-event':
                    // dcsMultiTrack('DCS.dcsuri', '/page-scroll/page-loaded/', 'WT.ti', 'Page scroll: Page loaded', 'WT.cg_n', 'Page scrolling', 'WT.dl', '0', 'DCSext.docref', ' ', 'DCSext.prodpgtype', ' ', 'WT.pn_sku', ' ', 'WT.pn_gr', ' ', 'WT.pn_fa', ' ', 'WT.tx_e', ' ', 'WT.si_n', ' ', 'WT.si_p', ' ');
                    console.log('Load event has happened');
                    break;
                case 'initial-scroll-event':
                    // dcsMultiTrack('DCS.dcsuri', '/page-scroll/start-scrolling/', 'WT.ti', 'Page scroll: Start page scroll', 'WT.cg_n', 'Page scrolling', 'WT.dl', '0', 'WT.dcsext.time', this.load_to_initial_scroll_time, 'DCSext.docref', ' ', 'DCSext.prodpgtype', ' ', 'WT.pn_sku', ' ', 'WT.pn_gr', ' ', 'WT.pn_fa', ' ', 'WT.tx_e', ' ', 'WT.si_n', ' ', 'WT.si_p', ' ');
                    console.log('Initial scroll event has happened');
                    break;
                case 'user-sees-widget':
                    // dcsMultiTrack('DCS.dcsuri', '/page-scroll/start-ttt-widget /', 'WT.ti', 'Page scroll: Start TTT widget', 'WT.cg_n', 'Page scrolling', 'WT.dl', '0', 'WT.dcsext.time', this.load_to_seeing_widget_time, 'DCSext.docref', ' ', 'DCSext.prodpgtype', ' ', 'WT.pn_sku', ' ', 'WT.pn_gr', ' ', 'WT.pn_fa', ' ', 'WT.tx_e', ' ', 'WT.si_n', ' ', 'WT.si_p', ' ');
                    console.log('User sees widget event has happened');
                    break;
                case 'user-reached-footer':
                    // dcsMultiTrack('DCS.dcsuri', '/page-scroll/bottom-of-page/', 'WT.ti', 'Page scroll: Bottom of page', 'WT.cg_n', 'Page scrolling', 'WT.dl', '0', 'WT.dcsext.time', this.load_to_seeing_footer_time, 'DCSext.docref', ' ', 'DCSext.prodpgtype', ' ', 'WT.pn_sku', ' ', 'WT.pn_gr', ' ', 'WT.pn_fa', ' ', 'WT.tx_e', ' ', 'WT.si_n', ' ', 'WT.si_p', ' ');
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



