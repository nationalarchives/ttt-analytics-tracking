QUnit.test('Bootstrap', function (assert) {
    assert.equal(typeof $, 'function', 'jQuery exists');
    assert.ok($('#qunit-fixture').length == 1, 'The qUnit fixture is available');
    assert.equal(typeof ttt_analytics, 'object', 'the ttt_analytics object is available');
    assert.equal(typeof ttt_analytics.webTrendsProxy, 'function', 'webTrendsProxyForTTT is defined as a function');
});


QUnit.test('Event is fired when page has loaded', function (assert) {
    var done = assert.async();
    setTimeout(function () {
        assert.equal(ttt_analytics.load_event_called, true);
        done();
    }, 500);
});

QUnit.test('Load time is recorded in object', function (assert) {
    var done = assert.async();
    setTimeout(function () {
        assert.notEqual(ttt_analytics.load_time, false, "The load time is not false");
        assert.ok(/^\d*$/.test(ttt_analytics.load_time), true, "The load time is digits only");
        done();
    }, 500);
});


QUnit.test('Scroll begin time is recorded in object', function (assert) {
    var done = assert.async(2);
    setTimeout(function () {
        assert.equal(ttt_analytics.time_from_load_to_start_scroll, false, "The scroll time is initially false");
        done();
    }, 500);

    // Simulate a scroll event

    setTimeout(function () {
        $(document).triggerHandler('scroll');
        assert.notEqual(ttt_analytics.time_from_load_to_start_scroll, false, "The scroll time is no longer false after scroll event");
        assert.ok(/^\d*$/.test(ttt_analytics.time_from_load_to_start_scroll), true, "The time is digits only");
        done();
    }, 500)
});

// Specific dcsMultiTrack events to be fired at specific points:

// DONE - stub configurable proxy for WebTrends calling function
// DONE - fire dcsMultiTrack event when the page is loaded
// DONE     - record time when page was loaded
// TODO - fire dcsMultiTrack event when a user starts scrolling
// TODO     - event should send the time between load and begin of scroll
// TODO - fire event when user scrolling reaches the TTT widget
// TODO     - event should send time between load and reaching widget
// TODO - fire event when scroll reaches bottom of the page (start of footer)
// TODO     - event should send time between load and reaching bottom of page

