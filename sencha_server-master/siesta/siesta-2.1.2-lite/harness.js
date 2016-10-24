// Sencha Ext JS用ハーネスのショートハンド設定
//var Harness = Siesta.Harness.Browser.ExtJS;
var Harness = Siesta.Harness.Browser.SenchaTouch;
 
// コンフィグ指定
Harness.configure({
    title     : 'Siesta v2 サンプル for Sencha Ext JS',
    preload : [
        //".ext/ext-all-debug.js"
        "../../vendor/assets/javascripts/lib/sencha-touch-all-debug.js"
    ]
});
 
// ハーネス実行
Harness.start(
);

