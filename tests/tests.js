QUnit.test( "Bootstrap", function( assert ) {
    assert.ok(typeof $ == 'function', "jQuery exists");
    assert.ok($('#qunit-fixture').length == 1, "The qUnit fixture is available");
});