//var Harness = Siesta.Harness.Browser.ExtJS;
var Harness = Siesta.Harness.Browser.SenchaTouch;
 
Harness.configure({
    title     : 'Siesta for Sencha Touch JS',
    preload : [
        "assets/lib/sencha-touch/sencha-touch-all-debug.js",
        "assets/lib/sencha-touch/resources/css/sencha-touch.css"
    ]
});
 
Harness.start({
    group: 'Group1',
    autoCheckGlobals : true,
    testClass: Siesta.Test.ExtJS,
//    preload: [
//        "./ext/packages/ext-theme-neptune/build/resources/ext-theme-neptune-all.css",
//        "assets/lib/sencha-touch-all-debug.js"
//    ],
    items: [
        'assets/lib/siesta/tests/group1/001_sanity.t.js'
    ]
});

