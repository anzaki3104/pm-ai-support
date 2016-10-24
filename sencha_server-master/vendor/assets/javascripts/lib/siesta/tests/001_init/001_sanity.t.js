StartTest(function(t) {
    t.diag("Assertion is OK");

    t.ok(true, 'true is OK');
    t.ok(1, '1 is OK');
    t.ok({}, '{} is OK');
    t.ok(Ext, 'Ext exsit');
 
    t.notOk(false, 'false is NOT OK');
    t.notOk(0, '0 is NOT OK');
    t.notOk(undefined, '`undefined` is NOT OK');
    
});

