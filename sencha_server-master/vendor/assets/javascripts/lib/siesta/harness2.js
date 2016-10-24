//var Harness = Siesta.Harness.Browser.ExtJS;
var Harness = Siesta.Harness.Browser.SenchaTouch;
 
Harness.configure({
    title     : 'Siesta for Sencha Touch JS',
    preload : [
        "assets/lib/sencha-touch/sencha-touch-all-debug.js",
        "assets/lib/sencha-touch/resources/css/sencha-touch.css"
    ]
});
 
Harness.start(
{
  group       : 'Init',
  hostPageUrl : '/',
  performSetup: false,
  items: [
    'assets/lib/siesta/tests/001_init/001_init.t.js'
  ]
},
{
  group       : 'Create Project',
  hostPageUrl : '/',
  performSetup: false,
  items: [
    'assets/lib/siesta/tests/002_createProject/001_not_create.t.js',
    'assets/lib/siesta/tests/002_createProject/002_create.t.js'
  ]
},
{
  group       : 'Load Project',
  hostPageUrl : '/',
  performSetup: false,
  items: [
    'assets/lib/siesta/tests/003_loadProject_reLoadProject/001_load_reload.t.js'
  ]
},
{
  group       : 'Event',
  hostPageUrl : '/',
  performSetup: false,
  items: [
    'assets/lib/siesta/tests/004_event/001_event.t.js',
    'assets/lib/siesta/tests/004_event/002_delete_event.t.js'
  ]
}
);

