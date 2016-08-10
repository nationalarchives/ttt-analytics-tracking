QUnit.test( 'Bootstrap', function( assert ) {
    assert.equal(typeof $, 'function', 'jQuery exists');
    assert.ok($('#qunit-fixture').length == 1, 'The qUnit fixture is available');
    assert.equal(typeof ttt_analytics, 'object', 'the ttt_analytics object is available');
    assert.equal(typeof ttt_analytics.webTrendsProxy, 'function', 'webTrendsProxyForTTT is defined as a function');
});

// Specific dcsMultiTrack events to be fired at specific points:

// DONE - stub configurable proxy for WebTrends calling function
// TODO - fire dcsMultiTrack event when the page is loaded
// TODO     - record time when page was loaded
// TODO - fire dcsMultiTrack event when a user starts scrolling
// TODO     - event should send the time between load and begin of scroll
// TODO - fire event when user scrolling reaches the TTT widget
// TODO     - event should send time between load and reaching widget
// TODO - fire event when scroll reaches bottom of the page (start of footer)
// TODO     - event should send time between load and reaching bottom of page

