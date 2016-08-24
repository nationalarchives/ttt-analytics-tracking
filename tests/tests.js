QUnit.test('Bootstrap', function (assert) {
    assert.equal(typeof $, 'function', 'jQuery exists');
    assert.ok($('#qunit-fixture').length == 1, 'The qUnit fixture is available');
    assert.ok($('#traces-through-time-collection').length === 1, "The widget is present in the fixture");
    assert.equal(typeof ttt_analytics, 'object', 'the ttt_analytics object is available');
    assert.equal(typeof ttt_analytics.webTrendsProxy, 'function', 'webTrendsProxyForTTT is defined as a function');
});

QUnit.test('Event is fired when page has loaded', function (assert) {
    assert.equal(ttt_analytics.load_event_recorded, true);
});

QUnit.test('Load time is recorded in object', function (assert) {
    assert.notEqual(ttt_analytics.load_time, false, "The load time is not false");
    assert.ok(/^\d*$/.test(ttt_analytics.load_time), true, "The load time is digits only");
});

QUnit.test('Scroll begin time is recorded in object', function (assert) {
    $(document).triggerHandler('scroll');
    assert.equal(ttt_analytics.initial_scroll_event_recorded, true, "The user having scrolled is recorded");
    assert.notEqual(ttt_analytics.load_to_initial_scroll_time, false, "The scroll time is no longer false after scroll event");
    assert.ok(/^\d*$/.test(ttt_analytics.load_to_initial_scroll_time), true, "The time is digits only");
});

QUnit.test('Scrolling to the TTT widget and related events', function (assert) {
    assert.ok(typeof ttt_analytics.widget_visible == 'function', "The widget_visible is a function");
    assert.ok(ttt_analytics.widget_visible() == false, "The widget is not in view initially");
});

QUnit.test('Scroll begin time is recorded in object', function (assert) {
    $(window).scrollTop(9000);
    assert.ok(ttt_analytics.widget_visible() == true, "The widget is identified as being in view after scroll event");
    assert.ok(ttt_analytics.scroll_to_widget_event_recorded == true, "The user having scrolled to the widget is recorded");
    assert.ok(ttt_analytics.user_sees_widget_time !== false, "The time the user sees the widget is recorded");
    assert.ok(/^\d*$/.test(ttt_analytics.user_sees_widget_time), true, "The time is digits only");

    $(window).scrollTop(0);
    $(document).triggerHandler('scroll');
    assert.ok(ttt_analytics.scroll_to_widget_event_recorded == true, "The user having seen the widget is still recorded");
});

QUnit.test('Scrolling to the footer', function (assert) {
    $(window).scrollTop(9000);
    $(document).triggerHandler('scroll');
    assert.ok(ttt_analytics.scroll_to_footer_event_recorded == true, "The user having scrolled to the footer is recorded");
});

// Specific dcsMultiTrack events to be fired at specific points:

// DONE - stub configurable proxy for WebTrends calling function
// DONE - fire dcsMultiTrack event when the page is loaded
// DONE     - record time when page was loaded
// DONE - fire dcsMultiTrack event when a user starts scrolling
// DONE     - event should send the time between load and begin of scroll
// DONE - fire event when user scrolling reaches the TTT widget
// DONE     - event should send time between load and reaching widget
// DONE - fire event when scroll reaches bottom of the page (start of footer)
// DONE     - event should send time between load and reaching bottom of page

