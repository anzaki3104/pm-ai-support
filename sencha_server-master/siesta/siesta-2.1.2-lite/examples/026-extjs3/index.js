var Harness = Siesta.Harness.Browser.ExtJS;

Harness.configure({
    title     : 'Sencha Ext JS examples',

    preload : [
        "http://cdn.sencha.com/ext/commercial/3.4.1.1/resources/css/ext-all.css",
        "http://cdn.sencha.com/ext/commercial/3.4.1.1/adapter/ext/ext-base-debug.js",
        "http://cdn.sencha.com/ext/commercial/3.4.1.1/ext-all.js"
    ]
});


Harness.start(
    '010_ext-resize.t.js',
    '020_ext-window.t.js',
    '030_ext-grid.t.js'
);

