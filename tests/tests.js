QUnit.test( "TLC Library is available", function( assert ) {
  assert.ok( $.type(TLC ), 'object', "Passed!" );
});

QUnit.test( "changeLampColor function", function( assert ) {
  TLC.changeLampColor("NS");
  assert.equal( $("#RedSouth").hasClass("lampRed"), true );
  assert.equal( $("#RedNorth").hasClass("lampRed"), true );
});
