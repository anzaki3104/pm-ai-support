var addBtn;

var naviView;
var mainPanel;
var actionFloatPanel;

var eventPanel = null;
var currentActionPanel;
var actionPanels = new Array();//イベント毎のアクションスタック
var allEvents = new Array();//全イベントJSONリスト
var actions = new Array();//全アクションJSONリスト
var currentActions = new Array();//アクション用JSON
var eventCount = 0;

var refresh = false;//Refreshかどうか
var eventForRefresh;//Refresh用イベント格納変数1
var refreshBtn;

var projectDefault = "[Project] : ";
var projectName;//プロジェクト一意名
var projectID;//プロジェクトキー（ＤＢ）
var pjLabel;//プロジェクトラベルオブジェクト

var picker;//共通picker

//-------------------------------------
//Main layout
//-------------------------------------
Ext.application({
  launch: function() {
   
    Ext.Viewport.add({
      xtype: 'navigationview',
      id: 'naviView',
        items: 
          [
          {
            xtype: 'panel',
            id: 'mainPanel',
            title: 'Program mode',    // ナビゲーションバーに表示する文字列
            items : [//start item
            {
              id: 'projectName',
              xtype: 'label',
              html: projectDefault 
            },
           {//Toobar
              xtype: 'toolbar',
              docked: 'top',
              items: [
                {
                  iconCls: 'add',
                  id: 'add',
                  iconMask: true,
                  handler: function(){
                    createProject();
                  }
                },
                {
                  text: 'Load',
                  id: 'load',
                  handler: function(){
                    loadProjectList();
                  }
                },
                {
                  text: 'list',
                  id: 'list',
                  handler: function(){
                    showProjectList();
                  }
                },
                {
                  iconCls: 'refresh',
                  id: 'refresh',
                  iconMask: true,
                  handler: function(){
                    reloadConfirm();
                  }
                },
                {
                  text: 'Save',
                  id: 'save',
                  handler: function(){
                    saveProject();
                  }
                }
              ]
           }
          ]//end item
          }]//navigationview item
    });//Ext.Viewport


  //--------------------------------
  var panels  = Ext.ComponentQuery.query('panel');
  
  //インスタンスの取得
  var navis  = Ext.ComponentQuery.query('navigationview');
  naviView = getObjectById(navis, 'naviView');

  mainPanel = getObjectById(panels, 'mainPanel');

  //refreshボタンの制御用
  var refs  = Ext.ComponentQuery.query('button');
  refreshBtn = getObjectById(refs, 'refresh');
  refreshBtn.disable();


  //ActionFloatPanelの生成
  createActionFloatPanel();
  Ext.Viewport.add(actionFloatPanel);

  //Pickerの生成
  picker = Ext.Viewport.add({
                       xtype: 'picker',
                       slots: {
                         name: 'action',
                         title: 'Function',
                         data: makeList()
                       },
                       listeners : {
                         change : function (picker, value) {
                           eventAddBtnTapped( value );
                         }
                       }
                     });
  picker.hide();
 
  //--------------------------------
  }
});


//-------------------------------------------------------
//Functions
//-------------------------------------------------------

//--- create start ----------------------------------------------
/**
 * EventPanelの生成
 */
var createEventPanel = function(){
  eventPanel = Ext.create("Ext.Panel", {
              id: 'eventPanel',
              layout: 'hbox',
              height: '30%',
              scrollable: true,
            });
  return eventPanel;
}


/**
 * EventAddBtnの生成
 */
var createEventAddBtn = function(){
  var btn = Ext.create('Ext.Button', {
                 id: 'plusAdd',
                 text: 'Add',
                 iconCls: 'add',
                 iconMask: true,
                 badgeText: 'v4',
                 height: '44px',
                 ui: 'round',
                 margin: 5,
      
                 // ボタンにイベントをtextfield設定
                 handler: function() {
                   picker.show();
                 }
  });

  addBtn = btn;
  return btn;
 
}

/**
 * ActionFloatPanelの生成
 */
var createActionFloatPanel = function(){
   //Floating panel
   actionFloatPanel = Ext.create('Ext.Panel', {
        centered: true,
        width: '100%',
        hidden: true,
        modal: true,
        hideOnMaskTap: true,
        showAnimation: {
          type: 'popIn',
          duration: 250,
          easing: 'ease-out'
        },
        hideAnimation: {
          type: 'popOut',
          duration: 250,
          easing: 'ease-out'
        },
        items: [
        {//--------------------------
            defaults: {
              xtype: 'button',
              margin: 5,
              width: '44px',
              height: '44px',
              iconMask: true,
              handler: function() {
        actionBtnTapped(this);
      },
              listeners: {taphold:function(){Ext.Msg.alert("hoge");}}
            },
            layout: 'hbox',
            items: [ 
                { iconCls: 'info', id: 'talk', text: 'SP'},
                { iconCls: 'star', id: 'light'},
                { iconCls: 'user', id: 'camera'},
                { iconCls: 'time', id: 'wait'},
                { iconCls: 'locate', id: 'application' },
                { iconCls: 'arrow_right', id: 'media' }
           ] 
        },//--------------------------
       {//Cancel button
            xtype: 'toolbar',
            docked: 'top',
            defaults: {
                iconMask: true
            },
            items: [
                { xtype: 'spacer' },
                { iconCls: 'delete', left: '85%', handler: function() {actionFloatPanel.hide()} },
                { xtype: 'spacer' }
            ]
       }]});
   return actionFloatPanel;
}


/**
 * createActionPanel
 */
var createActionPanel = function(){

  var id = 'actionPanel' + eventCount;

  var panel = Ext.create('Ext.Panel', {
    id: id,
    layout: 'vbox',
    height: '70%',
    scrollable: true,
    items: [
      {
        html: 'Action',
        style: 'background-color: #5E99CC;'
      }
    ]
  });

  actionPanels.push(panel);//スタックにプッシュ
  currentActionPanel = panel;

  //+ボタンの追加
  panel.add(createActionPlusBtn());
  return panel;
}

//Action追加ボタン「＋」
var createActionPlusBtn = function() {

  var id = 'plus' + eventCount;

  var plus = Ext.create('Ext.Button', {
      id: id,
      iconCls: 'add',
      iconMask: true,
      height: '66px',
      handler: function() {
      //ActionFloatPanelの表示
       actionFloatPanel.show(); 
     }});
  return plus;
}


/**
 * makeList
 * Pickers lists
 */
var makeList = function(){
  var json = [             {text: events.say, value: 'say'},
                           {text: events.time, value: 'time'},
                           {text: events.saw, value: 'saw'},
                           {text: events.pan, value: 'pan'},
                           {text: events.move, value: 'move'}];
  return json;
}


//Valueとイベントのマップ
var events = { 
  "say": "音声を検知",
  "time": "時間がきたら",
  "saw": "誰かを見たら",
  "pan": "手をたたく",
  "move": "動作を検知"
};

//--- create end ----------------------------------------------


//--- event start ----------------------------------------------

/**
 * eventAddBtnTapped
 */
var eventAddBtnTapped = function( value ){

  //currentActionsの設定
  currentActions = new Array();
  actions.push( currentActions );
  
  //既存のものがあれば消す
  if(eventCount > 0)
    currentActionPanel.hide();

    var eventId = 'event' + eventCount;

  //イベントの条件入力へ
  //Action Mode
  switch (value.action){
    case "say":
      eventSaid(eventId, events.say, "say");
      break;

    case "time":
      eventTime(eventId, events.time, "time");
      break;

    case "saw":
      eventSaw(eventId, events.saw, "saw");
      break;

    default:
      Ext.Msg.alert(value.action + "は、今使えません。");
      return;
      //break;
  }

}

//Sub Function
var eventSaid = function(eventId, btnName, eventType){

  //Refresh
  if( refresh ){
    createEventBtn(eventId, btnName, eventForRefresh.operator, eventForRefresh.param, eventType );
    return;
  }

  var panel = Ext.create('Ext.Panel', {
    title: 'What human say?',
    items: [
      {xtype: 'label', html: '一致条件を選択してね'},
      {xtype: 'selectfield', name: 'options', id: 'ifsay',
        options: [
          {text: '部分一致したら', value: '='},
          {text: '完全一致したら', value: '=='}
        ]
      },
      {xtype: 'label', html: '条件を入力してね'},
      {xtype: 'textfield', id:'whatsay'},
      {xtype: 'button', text: 'ENTER', ui: 'action',
        handler: function() {//登録ボタンを押したら
          //入力値の取得
          var objs  = Ext.ComponentQuery.query('textfield');
          var obj = getObjectById(objs, 'whatsay');
          var input2 = obj.getValue();

          objs  = Ext.ComponentQuery.query('selectfield');
          obj = getObjectById(objs, 'ifsay');
          var input1 = obj.getValue();

        

          if(nullCheck(input2, "条件を入力してね")){
            //選択したボタンの描画
            //createEventBtn(eventId, btnName + "["+ input1 + ":" + input2 +"]");
            createEventBtn(eventId, btnName, input1, input2, eventType);
            naviView.pop();
          }
        }
      }
    ]
  });

  naviView.push( panel );
}


//Sub Function
var eventTime = function(eventId, btnName, eventType){

  //Refresh
  if( refresh ){
    createEventBtn(eventId, btnName, eventForRefresh.operator, eventForRefresh.param, eventType );
    return;
  }

  var panel = Ext.create('Ext.Panel', {
    title: 'What time work?',
    items: [
      {xtype: 'label', html: '起時間(時)入力してね'},
      {xtype: 'textfield', id:'hh24'},
      {xtype: 'label', html: '起時間(分)入力してね'},
      {xtype: 'textfield', id:'mi'},

      {xtype: 'button', text: 'ENTER', ui: 'action',
        handler: function() {//登録ボタンを押したら
          //入力値の取得
          var objs  = Ext.ComponentQuery.query('textfield');
          var obj = getObjectById(objs, 'hh24');
          var input1 = obj.getValue();

          objs  = Ext.ComponentQuery.query('textfield');
          obj = getObjectById(objs, 'mi');
          var input2 = obj.getValue();
        

          if(nullCheck(input1, "条件を入力してね") && hhCheck(input1, "時間を入力してね")){
            if(nullCheck(input2, "条件を入力してね") && miCheck(input2, "時間を入力してね")){
              //選択したボタンの描画
              createEventBtn(eventId, btnName, "==", fillZero(input1) + fillZero(input2), eventType);
              naviView.pop();
            }
          }
        }
      }
    ]
  });

  naviView.push( panel );
}


//Sub Function
var eventSaw = function(eventId, btnName, eventType){

  //Refresh
  if( refresh ){
    createEventBtn(eventId, btnName, eventForRefresh.operator, eventForRefresh.param, eventType);
    return;
  }

  //JSONにオブジェクトを追加
  createEventBtn(eventId, btnName, "==", "FACE", eventType);

}


//Sub Function
//イベント（条件）ボタンの生成
var createEventBtn = function(eventId, btnName, input1, input2, eventType){

  var out;
  var json;

  if(input1 == "=="){
    out = "完全";

    //JSONのPush
    json = {"event": eventType, "type" : "==", "param": input2};
  }
  else{
    out = "部分";
    json = {"event": eventType, "type" : "=", "param": input2};
  }

  allEvents.push( json );

  out = btnName + "["+ out + ":" + input2 +"]";

  var btn = Ext.create('Ext.Button', {
    id: eventId,
    text: out,//選択した値のボタンを生成
    height: '44px',
    ui: 'action',
    margin: 5,
    // ボタンにイベントを設定
    handler: function() {
      //カレントアクション配列の付け替え
      currentActions = actions[Number(getEventId(this.id))]; 
      eventBtnTapped(this.id);
    },
    listeners : {
      element: 'element',
      taphold: function(e){
        //For Delete
        var actionSheet = deleteConfirm( this, "event" ); 
        Ext.Viewport.add( actionSheet );
        actionSheet.show();
      }
    }
  });

  eventPanel.add( btn );
  removeAndCreateEventAddBtn();
}

//Sub Function
var removeAndCreateEventAddBtn = function(){

    //イベントトリガーのaddBtnの削除
    eventPanel.remove(addBtn);

    //Add Buttonの再描画
    eventPanel.add(
      createEventAddBtn()
    );

    //Action add buttonの生成
    mainPanel.add(createActionPanel()); 
    

    //イベント処理追加数のカウントアップ
    eventCount = eventCount + 1;
}

/**
 * eventBtnTapped
 */
var eventBtnTapped = function(actionPanelId){

  currentActionPanel.hide();
  var num = Number(getEventId(actionPanelId));
  currentActionPanel = actionPanels[num];
  currentActionPanel.show();

}


/**
 * actionBtnTapped
 */
var actionBtnTapped = function(obj, json){

  //Action Mode
  switch (obj.id){
    case "talk":
      //Add ActionItem
      programingTalk( json );
      actionFloatPanel.hide();
      break;

    case "light":
      programingLight();
      actionFloatPanel.hide();
      break;

    case "camera":
      programingCamera();
      actionFloatPanel.hide();
      break;

    case "wait":
      programingWait( json );
      actionFloatPanel.hide();
      break;

    case "application":
      programingApplication( json );
      actionFloatPanel.hide();
      break;

    case "media":
      programingMedia( json );
      actionFloatPanel.hide();
      break;

    default:
      Ext.Msg.alert(obj.id + "は、今使えません。");
      return;
      //break;
  }
 
}

//sub function
var programingTalk = function( json ){

  if( refresh ){
    //ボタンの生成
    addActionBtnTalk( json.param );

    return;
  }

  //修正の場合
  else if( json != null){
  var panel = Ext.create('Ext.Panel', {
    title: 'I can talk',
    items: [
      {xtype: 'label', html: 'ここにメッセージを入力してね。'},
      {xtype: 'textfield', id:'talktext', value: json.param },
      {xtype: 'button', text: 'ENTER', ui: 'action',
        handler: function() {//登録ボタンを押したら
          //入力値の取得
          var objs  = Ext.ComponentQuery.query('textfield');
          var obj = getObjectById(objs, 'talktext');
          var input = obj.getValue();

          if(nullCheck(input, "メッセージを入力してね")){

          objs  = Ext.ComponentQuery.query('button');
          obj = getObjectById(objs, json.id);
          obj.setText("話す [" + input + "]");
            
            //Jsonを更新
            json.param = input;

            //戻る
            naviView.pop();
 
          }
        }
      }
    ]
  });
  naviView.push( panel );
  return;
  }

  var panel = Ext.create('Ext.Panel', {
    title: 'I can talk',
    items: [
      {xtype: 'label', html: 'ここにメッセージを入力してね。'},
      {xtype: 'textfield', id:'talktext'},
      {xtype: 'button', text: 'ENTER', ui: 'action',
        handler: function() {//登録ボタンを押したら
          //入力値の取得
          var objs  = Ext.ComponentQuery.query('textfield');
          var obj = getObjectById(objs, 'talktext');
          var input = obj.getValue();

          if(nullCheck(input, "メッセージを入力してね")){

            //ボタンの生成
            addActionBtnTalk( input );

            naviView.pop();
          }
        }
      }
    ]
  });
  naviView.push( panel );
  return;
}

/**
 * addActionBtnTalk
 */
var addActionBtnTalk = function( input ){
  var btn = addActionBtn("話す [" + input + "]");

  //Jsonに出力
  addActionJson(btn.id, "talk", input, true);

  //ボタンを生成して、戻る
  currentActionPanel.add( btn );
}

//sub function
var programingWait = function( json ){

  if( refresh ){
    //ボタンの生成
    addActionBtnWait( json.param );
    return;
  }


  //修正の場合
  if( json != null){

    //Navi画面の生成
  var panel = Ext.create('Ext.Panel', {
    title: 'I am waiting ',
    items: [
      {xtype: 'label', html: '何秒待てばいい？'},
      {xtype: 'textfield', id:'waittime', value: json.param },
      {xtype: 'button', text: 'ENTER', ui: 'action',
        handler: function() {//登録ボタンを押したら
          //入力値の取得
          var objs  = Ext.ComponentQuery.query('textfield');
          var obj = getObjectById(objs, 'waittime');
          var input = toHankaku( obj.getValue() );

          objs  = Ext.ComponentQuery.query('button');
          obj = getObjectById(objs, json.id);
          
          //ボタンを生成して、戻る
          if(nullCheck(input, "待ち時間を入力してね")){
            if(numberCheck(input, "数字を入力してね")){

            obj.setText("[" + input + "] 秒待つ");
            
            //Jsonを更新
            json.param = input;

            //戻る
            naviView.pop();
          }}
        }
      }
    ]
  });
  naviView.push( panel );
  return;
  }

  var panel = Ext.create('Ext.Panel', {
    title: 'I am waiting ',
    items: [
      {xtype: 'label', html: '何秒待てばいい？'},
      {xtype: 'textfield', id:'waittime'},
      {xtype: 'button', text: 'ENTER', ui: 'action',
        handler: function() {//登録ボタンを押したら
          //入力値の取得
          var objs  = Ext.ComponentQuery.query('textfield');
          var obj = getObjectById(objs, 'waittime');
          var input = toHankaku( obj.getValue() );

          //ボタンを生成して、戻る
          if(nullCheck(input, "待ち時間を入力してね")){
            if(numberCheck(input, "数字を入力してね")){
              addActionBtnWait( input );
              naviView.pop();
          }}
        }
      }
    ]
  });
  naviView.push( panel );
  return;
}

/**
 * addActionBtnWait
 */
var addActionBtnWait = function( input ){
  var btn  = addActionBtn("[" + input + "] 秒待つ");
  //
  //Jsonに出力
  addActionJson(btn.id, "wait", input, true);

  //ボタンを生成して、戻る
  currentActionPanel.add( btn );
}

//sub function
var programingCamera = function(){

    var btn = addActionBtn("写真を撮る");

    //Jsonに出力
    addActionJson(btn.id, "camera", null, false);
    
  //ボタンを生成して、戻る
  currentActionPanel.add( btn );
}

//sub function
var programingLight = function(){

    var btn = addActionBtn("光る");

    //Jsonに出力
    addActionJson(btn.id, "light", null, false);
    
  //ボタンを生成して、戻る
  currentActionPanel.add( btn );
}

//▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼

//sub function
var programingApplication = function( json ){

  if( refresh ){
    //ボタンの生成
    addActionBtnApplication( json.param );
    return;
  }

  //修正の場合
  if( json != null){
    //Navi画面の生成
  var panel = Ext.create('Ext.Panel', {
    title: 'I can lunch applications. ',
    items: [
      {xtype: 'label', html: '何アプリを起動しますか？'},
      {xtype: 'textfield', id:'applicationName', value: json.param },
      {xtype: 'button', text: 'ENTER', ui: 'action',
        handler: function() {//登録ボタンを押したら
          //入力値の取得
          var objs  = Ext.ComponentQuery.query('textfield');
          var obj = getObjectById(objs, 'applicationName');
          var input = obj.getValue();

          objs  = Ext.ComponentQuery.query('button');
          obj = getObjectById(objs, json.id);
          
          //ボタンを生成して、戻る
          if(nullCheck(input, "起動するアプリケーションIDを入力してね")){

            obj.setText("[" + input + "] を起動");
            
            //Jsonを更新
            json.param = input;

            //戻る
            naviView.pop();
          }
        }
      }
    ]
  });
  naviView.push( panel );
  return;
  }

  var panel = Ext.create('Ext.Panel', {
    title: 'I can lunch applications. ',
    items: [
      {xtype: 'label', html: '何アプリを起動しますか？'},
      {xtype: 'textfield', id:'applicationName'},
      {xtype: 'button', text: 'ENTER', ui: 'action',
        handler: function() {//登録ボタンを押したら
          //入力値の取得
          var objs  = Ext.ComponentQuery.query('textfield');
          var obj = getObjectById(objs, 'applicationName');
          var input = obj.getValue();

          //ボタンを生成して、戻る
          if(nullCheck(input, "起動するアプリケーションIDを入力してね")){
              addActionBtnApplication( input );
              naviView.pop();
          }
        }
      }
    ]
  });
  naviView.push( panel );
  return;
}

var addActionBtnApplication = function( input ){
  var btn  = addActionBtn("[" + input + "] を起動");
  //
  //Jsonに出力
  addActionJson(btn.id, "application", input, true);

  //ボタンを生成して、戻る
  currentActionPanel.add( btn );
}



//sub function
var programingMedia = function( json ){

  if( refresh ){
    //ボタンの生成
    addActionBtnMedia( json.param );
    return;
  }

  //修正の場合
  if( json != null){
    //Navi画面の生成
  var panel = Ext.create('Ext.Panel', {
    title: 'I can lunch applications. ',
    items: [
      {xtype: 'label', html: 'メディアURLを入力してください'},
      {xtype: 'textfield', id:'mediaUrl', value: json.param },
      {xtype: 'button', text: 'ENTER', ui: 'action',
        handler: function() {//登録ボタンを押したら
          //入力値の取得
          var objs  = Ext.ComponentQuery.query('textfield');
          var obj = getObjectById(objs, 'mediaUrl');
          var input = obj.getValue();

          objs  = Ext.ComponentQuery.query('button');
          obj = getObjectById(objs, json.id);
          
          //ボタンを生成して、戻る
          if(nullCheck(input, "URLを入力してね")){

            obj.setText("[" + input + "] をロード");
            
            //Jsonを更新
            json.param = input;

            //戻る
            naviView.pop();
          }
        }
      }
    ]
  });
  naviView.push( panel );
  return;
  }

  var panel = Ext.create('Ext.Panel', {
    title: 'I can lunch applications. ',
    items: [
      {xtype: 'label', html: 'Media URLを入力してください'},
      {xtype: 'textfield', id:'mediaUrl'},
      {xtype: 'button', text: 'ENTER', ui: 'action',
        handler: function() {//登録ボタンを押したら
          //入力値の取得
          var objs  = Ext.ComponentQuery.query('textfield');
          var obj = getObjectById(objs, 'mediaUrl');
          var input = obj.getValue();

          //ボタンを生成して、戻る
          if(nullCheck(input, "URLを入力してね")){
              addActionBtnMedia( input );
              naviView.pop();
          }
        }
      }
    ]
  });
  naviView.push( panel );
  return;
}

var addActionBtnMedia = function( input ){
  var btn  = addActionBtn("[" + input + "] をロード");
  //
  //Jsonに出力
  addActionJson(btn.id, "media", input, true);

  //ボタンを生成して、戻る
  currentActionPanel.add( btn );
}

//============================================================


//============================================================

/**
 * 選択したアクションボタンの描画
 */
var addActionBtn = function(text){

  var newBtn = Ext.create('Ext.Button', {
    text: text,
    handler: function(){
      //JSONの検索
      var json = getJsonById( this.id ); 

      //編集可能ボタンのみ、ナビ表示
      if(json.modify){

        //Navi画面への遷移
        //ダミーオブジェクト
        var obj = {"id": null};
        obj.id = json.action;
        actionBtnTapped(obj, json);
      }
    },
    listeners : {
      element: 'element',
      taphold: function(e){
        //For Delete
        var actionSheet = deleteConfirm( this, "action" ); 
        Ext.Viewport.add( actionSheet );
        actionSheet.show();
      }
    }

  });

  currentActionPanel.add(newBtn);
  actionFloatPanel.hide();

  return newBtn;
}

//ActionSheet for DELETE
var deleteConfirm = function( btn, btnType ){

  var actionSheet = Ext.create('Ext.ActionSheet', {
    items: [
      {
        text: 'Delete', ui: 'decline',
        handler: function(){
          switch ( btnType ){
            case "action":
              //Delete function
              deleteAction( btn );
            break;

            case "event":
              //Delete event
              deleteEvent( btn );

            default:
            break;
          }

          //Hide actionSheet
          actionSheet.hide();
          actionSheet.destroy();
        }
      },
      {
        text: 'Cancel', ui: 'normal',
        handler: function(){
          actionSheet.hide();
          actionSheet.destroy();
        }
      }
    ]
  });

  return actionSheet;
}

//Delete action
var deleteAction = function ( actionBtn ){

  //Delete from JSON
  deleteJsonById( actionBtn.id );

  //Delete Button
  actionBtn.destroy(); 

  //Return
  naviView.pop();

}


//Delete event
var deleteEvent = function ( btn ){

  //Delete JSON
  deleteEventJsonById( btn.id );

  //Delete Button
  btn.destroy(); 

  //Delete Panel
  currentActionPanel.destroy();

}

/**
 * saveProject
 * プロジェクトの保存
 */
var saveProject = function(){


  //Project名のチェック
  if( !nullCheck( projectName, "プロジェクト名を入力してください。\"+\" Button" ) )
    return;
  

  waitingAnimation("Saving..", true);

  var eventList = new Array();
  var actionList;
  var json;

  var i = 0;
  var j = 0;


  var flg = false;
  var flg2 = false;
  var eventId = 1;
  
  json = "{";

  //ProjectName
  json += "\"project\":\""+ projectName + "\",";
  json += "\"events\": [";

  for (i = 0; i < allEvents.length; i++){
    if(allEvents[i] != null){
      flg = true;

      eventList.push( allEvents[i] );
      actionList = new Array();

      json += "{\"event\":\"" + allEvents[i].event + "\",";
      json += "\"operator\":\"" + allEvents[i].type + "\",";
      json += "\"param\":\"" + allEvents[i].param + "\",";
      json += "\"event_id\":\"" + eventId + "\",";
      eventId += 1;
      
      json += "\"actions\": [";

      flg2 = false;//1イベント毎に初期化

      for(j = 0; j < actions[i].length; j++){
        if(actions[i][j] != null){
          flg2 = true;
          actionList.push( actions[i][j] );

          var param = actions[i][j].param;
          if(param == null)
            param = "";
          
          json += "{\"action\":\"" + actions[i][j].action + "\",";
          json += "\"param\":\"" + param + "\"},\n";

        }
      }

      //Actionsのコンマ削除処理
      if( flg2 ){
        json = json.substr(0, json.length-2);
      }
      json += "]";

      json += "},\n";

    }
  }

  if( flg ){
    //Events最後のコンマ削除処理
    json = json.substr(0, json.length-2);//コンマ+改行コード
  }

  json += "]}";

  //Send JSON
  $.ajax({
    type : 'post',
    url : "/projects",
    data : JSON.stringify(json),
    contentType: 'application/JSON',
    dataType : 'JSON',
    scriptCharset: 'utf-8',
    success : function(data) {
      waitingAnimation("", false);
      Ext.Msg.alert("保存しました！");
    },
    error : function(data) {
      alert("error:" + data);
    }
  });
  

  return json;
}


/*************************************
 * reloadProject
 *************************************/
var reloadConfirm = function(){
  Ext.Msg.confirm("Confirmation", "Are you sure reload?", loadProject);
}


/*************************************
 * showProjectList
 *************************************/
var showProjectList = function(){
  window.open('/projects');
}


/*************************************
 * loadProject
 *************************************/
var loadProject = function( btn ) {

  if( btn == "no" )
    return;
  
  waitingAnimation("Loading..", true);

  var request = new XMLHttpRequest();

  request.open("GET", "/projects/" + projectID + "/events.json");
  request.onreadystatechange = function() {
    if (request.readyState == 4 && request.status == 200) {
      //受信完了時の処理
      var text = document.createTextNode(decodeURI(request.responseText));

      //PARSE
      var json = JSON.parse( text.data );

      //Refesh
      refreshAll( json );

    }
  }
  request.send("");
}

//sub refreshAll
var refreshAll = function( events ){

  //refreshフラグをオン
  refresh = true;


  //画面初期化処理
  clearAll(); 


  //1つめのActionPanelの生成
  var i = 0;
  var j = 0;
 
  var flg = false;

  for(i = 0; i < events.length; i++){

    //1件でもイベントがあったら
    if(!flg)
      flg = true;


    var event = events[i];
    
    //イベントボタンの生成プロセス
    eventForRefresh = event;
    var val = {"action": event.event };
    eventAddBtnTapped( val );


    //イベントスタックとアクションスタックの再生成
    // allEvents.push( event );
    //actions.push( event.actions );

    for(j = 0; j < event.actions.length; j++){
      var action = event.actions[j];

      //(1)ActionPanelの生成
      //mainPanel.add( createActionPanel() );
      //currentActionPanel.hide();

      //ダミーObj
      var obj = {"id": null};
      obj.id = action.action;

      //(2)Actionボタンの追加
      actionBtnTapped(obj, action);


    }
  }

  //refreshフラグを戻す
  refresh = false;

  //Refreshボタンが押せるようになる
  refreshBtn.enable();

  if(flg)
    currentActionPanel.show();

  waitingAnimation("", false);
}


/****************************************
 * clearAll
 ***************************************/
var clearAll = function(){
  var i = 0;

  //初期化
  for(i = 0; i < actionPanels.length; i++){
    actionPanels[i].destroy();
  }
  actionPanels = new Array();//Indexがずれるので



  allEvents = new Array();
  actions = new Array();
  if( eventPanel != null ) eventPanel.destroy();
  //EventPanelの生成
  mainPanel.add( createEventPanel() );
  //EventAddButtonの生成
  eventPanel.add(createEventAddBtn());

  if( currentActionPanel != null )
    currentActionPanel.destroy();

  eventCount = 0;

}





/****************************************
 * createProject
 ***************************************/
var createProject = function(){

  Ext.Msg.prompt('New project', 'Please enter project name:', function(text, value) {

    if( text == "ok" ){//OK
      
      if( nullCheck( value, "プロジェクト名を入力してください" ) ){


        clearProject( value );

        clearAll();

        setProject( value );

        //Refreshボタンが押せなくなる
        refreshBtn.disable();

      }

    }
    else{//cancel
      return;
    }


  });
}


/****************************************
 * loadProjectList
 ***************************************/
var loadProjectList = function(){

  waitingAnimation("Loading..", true);

  var request = new XMLHttpRequest();
  request.open("GET", "/projects.json");
  request.onreadystatechange = function() {
    if (request.readyState == 4 && request.status == 200) {
      //受信完了時の処理
      var text = document.createTextNode(decodeURI(request.responseText));

      //PARSE
      var json = JSON.parse( text.data );

      //Model
      Ext.define('Project', {
        extend: 'Ext.data.Model',
        config: {
          fields: ['pjname', 'id']
        }
      });
      //Data
      Ext.create('Ext.data.Store', {
        id: 'Projects',
        model: 'Project',
        sorters: 'pjname',
        grouper: function( record ) {
          return record.get('pjname')[0];
        },
        data: json
      });

      //Overlay View
      var overlay = Ext.Viewport.add({
        xtype: 'panel',
        modal: true,
        hideOnMaskTap: true,
        showAnimation: {
          type: 'popIn',
          duration: 250,
          easing: 'ease-out'
        },
        hideAnimation: {
          type: 'popOut',
          duration: 250,
          easing: 'ease-out'
        },
        centered:true,
        width: Ext.os.deviceType == 'Phone' ? 260 : 400,
        height: Ext.os.deviceType == 'Phone' ? 270 : 400,
        styleHtmlContent: true,
        items:[
          {
            docked: 'top',
            xtype: 'toolbar',
            title: 'Project list'
          },
          {
            width: Ext.os.deviceType == 'Phone' ? 220 : 350,
            height: Ext.os.deviceType == 'Phone' ? 180 : 300,
            xtype: 'list',
            store: 'Projects',
            itemTpl: '<div class="project"><strong>{pjname}</strong></div>',
            grouped: true,
            pinHeaders: false,
            //indexBar: true
            onItemDisclosure: function(record, btn, index){

              //hide Panel
              this.parent.hide();

              //loadProject
              setProject(record.get("pjname"));
              projectID  = record.get("id");

              loadProject("yes");
            }
          }
        ]
        //scrollable: true
      });

      overlay.show();

      waitingAnimation("Loading..", false);
    }
  }
  request.send("");

}


//--- event end ----------------------------------------------

/**
 * getObjectById 
 * Ext.ComponentQuery.query('button'); De Tukau
 */
var getObjectById = function (items, id){
  var i;
  for(i = 0; i < items.length; i++){
    if(items[i].id == id)
   return items[i];
  }
  return null;
}

/**
 * getEventId
 */
var getEventId = function ( EventId ){
  return EventId.substr(5);

}

/**
 * nullCheck
 */
var nullCheck = function(input, msg){
  if( ( input == null ) || (input.length == 0 )){
    Ext.Msg.alert(msg);
    return false;
  }
  else
    return true;
}

var numberCheck = function( input, msg ){
  if ( input.match(/[^0-9]+/)){
    Ext.Msg.alert( msg );
    return false;
  }
  else
    return true;
  
}

var hhCheck = function( input, msg ){
  if ( input.match(/[^0-9]+/)){
    Ext.Msg.alert( msg );
    return false;
  }
  else if( input > 23 ){
    Ext.Msg.alert( "0-23で入力してね" );
    return false;
  }
  else
    return true;
}

var miCheck = function( input, msg ){
  if ( input.match(/[^0-9]+/)){
    Ext.Msg.alert( msg );
    return false;
  }
  else if( input > 59 ){
    Ext.Msg.alert( "0-59で入力してね" );
    return false;
  }
  else
    return true;
}

var fillZero = function ( input ){

  if(input.length == 1){
    return "0" + input;
  }
  
  return input;
}

var toHankaku = function ( input ){
  
  /*var val =  input.replace( /[０-９]/g, function(s) {
    return String.fromCharCode(s.charCodeAt(0) - 65248);
  });
 */
  //return val;
  return input;
}

/**
 * addActionJSON
 */
var addActionJson = function(btnId, action, param, modify){
  var json = {
    "id"     : btnId,
    "action" : action,
    "param"  : param,
    "modify" : modify
  };
  currentActions.push( json );
}

/**
 * getJsonById
 */
var getJsonById = function(id){
  var i;
  for (i = 0; i < currentActions.length; i++){
    if(currentActions[i].id == id)
      return currentActions[i];
  }

  return null;
}

/**
 * deleteJsonById
 */
var deleteEventJsonById = function(id){

  var index = getEventId(id);

  allEvents[index] = null;
  actions[index] = null;

  return null;
}

/**
 * deleteJsonById
 */
var deleteJsonById = function(id){
  var i;
  for (i = 0; i < currentActions.length; i++){
    if(currentActions[i].id == id){
      currentActions.splice( i, 1 );
    }
  }

  return null;
}

/**
 * loadingAnimation
 */
var waitingAnimation = function( msg , flg){

  if( flg)
    Ext.Viewport.setMasked({
      xtype: 'loadmask',
      message: msg 
    });
  else
    Ext.Viewport.setMasked( false );
}

/**
 * setProject
 */
var setProject = function( pjname ){
  projectName = pjname;

  if( pjLabel == null ){
    var labels  = Ext.ComponentQuery.query('label');
    pjLabel = getObjectById(labels, 'projectName');
  }
  pjLabel.setHtml( projectDefault + projectName );
}

/**
 * clearProject
 */
var clearProject = function() {
  projectName = "";

  if( pjLabel == null ){
    var labels  = Ext.ComponentQuery.query('label');
    pjLabel = getObjectById(labels, 'projectName');
  }
  pjLabel.setHtml( projectDefault + projectName );
}
