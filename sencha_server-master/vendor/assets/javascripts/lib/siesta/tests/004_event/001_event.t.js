var pjname = "002_create";
StartTest(function(t) {
  t.chain(
      {  waitFor :'componentVisible', args : '#naviView' },
      function(next){
        t.pass('Should load project');
        t.click(t.cq1('#load'), function(){
          t.diag('load button is tapped');
        });
        next();
      },
      {  waitFor: 1000  },
      function(next){
        t.messageBoxIsVisible();
        next();
      },
      {  click: [660, 300]  },
      {  waitFor: 1000  },
      function(next){  t.diag('ProjectName Validation');next();  },
      function(next){
        t.is(t.cq1('#projectName')._html, '[Project] : ' + pjname,  'Should equal project name');
        next();
      },
      function(next){  t.diag('Modify Event Test');next();  },
      //{  longpress: '>> #event0'  },
      {  waitFor: 500  },
      function(next){  t.todo('イベント変更機能の実装', function(todo){
        next();
      }
      );  },
      function(next){  t.diag('Modify Talk Test');next();  },
      {  tap: '>> #event0'  },
      function(next){ 
        var btns = t.cq('button');
        var i; 
        for(i = 0; i < btns.length; i++){
          if( btns[i]._text == "話す [正常テストケース]" ){
            t.click(btns[i]);
          }
        }
        next();
      },
      {  waitFor : 500 },
      {  click: '>> #talktext'  },
      {  type: "[BACKSPACE]"  },
      {  type: "[BACKSPACE]"  },
      {  type: "[BACKSPACE]"  },
      {  type: "[BACKSPACE]"  },
      {  type: "[BACKSPACE]"  },
      {  type: "[BACKSPACE]"  },
      {  type: "[BACKSPACE]"  },
      {  type: "[BACKSPACE]"  },
      {  type: "変更しました"  },
      {  click: '>> button[text=ENTER]'  },
      {  waitFor : 500 },
      function(next){  t.diag('Modify Wait Test');next();  },
      {  tap: '>> #event1'  },
      function(next){ 
        var btns = t.cq('button');
        var i; 
        for(i = 0; i < btns.length; i++){
          if( btns[i]._text == "[5] 秒待つ" ){
            t.click(btns[i]);
          }
        }
        next();
      },
      {  waitFor : 500 },
      {  click: '>> #waittime'  },
      {  type: "[BACKSPACE]"  },
      {  type: "777"  },
      {  click: '>> button[text=ENTER]'  },
      {  waitFor : 500 },
      function(next){  t.diag('Modify App Test');next();  },
      function(next){ 
        var btns = t.cq('button');
        var i; 
        for(i = 0; i < btns.length; i++){
          if( btns[i]._text == "[com.test.app] を起動" ){
            t.click(btns[i]);
          }
        }
        next();
      },
      {  waitFor : 500 },
      {  click: '>> #applicationName'  },
      {  type: "[BACKSPACE]"  },
      {  type: "[BACKSPACE]"  },
      {  type: "[BACKSPACE]"  },
      {  type: "[BACKSPACE]"  },
      {  type: "[BACKSPACE]"  },
      {  type: "[BACKSPACE]"  },
      {  type: "[BACKSPACE]"  },
      {  type: "[BACKSPACE]"  },
      {  type: "[BACKSPACE]"  },
      {  type: "[BACKSPACE]"  },
      {  type: "[BACKSPACE]"  },
      {  type: "[BACKSPACE]"  },
      {  type: "[BACKSPACE]"  },
      {  type: "jp.test"  },
      {  click: '>> button[text=ENTER]'  },
      {  waitFor : 500 },
      function(next){  t.diag('Before Save and All Modify Check');next();  },
      function(next){ 
        t.is(t.cq1('#event0')._text, '音声を検知[部分:First]', 'Should show event button label');
        t.is(t.cq1('#event1')._text, '誰かを見たら[完全:FACE]', 'Should show event button label');
 
        var btns = t.cq('button');
        var i; 
        var flg = false;
        for(i = 0; i < btns.length; i++){
          if( btns[i]._text == "写真を撮る" ){
            t.pass("BTN:" + btns[i]._text);
            t.pass('Should show camera button');
            flg = true;
            next();
          }
          else if( btns[i]._text == "[777] 秒待つ" ){
            t.pass("BTN:" + btns[i]._text);
            t.pass('Should show wait button');
            flg = true;
            next();
          }
          else if( btns[i]._text == "[jp.test] を起動" ){
            t.pass("BTN:" + btns[i]._text);
            t.pass('Should show application button');
            flg = true;
            next();
          }
          else if( btns[i]._text == "話す [変更しました]" ){
            t.pass("BTN:" + btns[i]._text);
            t.pass('Should show talk button');
            flg = true;
            next();
          }
          else if( btns[i]._text == "光る" ){
            t.pass("BTN:" + btns[i]._text);
            t.pass('Should show light button');
            flg = true;
            next();
          }
        }
        if(!flg){
          t.fail('Action buttons cannot find');
          next();
        }
      },
      function(next){  t.diag('Save and All Modify Check');next();  },
      {  click: '>> #save'  },
      {  waitFor : 3000 },
      {  click: '>> button[text=OK]'  },
      {  waitFor : 500 },
       function(next){
        t.pass('Should load project');
        t.click(t.cq1('#load'), function(){
          t.diag('load button is tapped');
        });
        next();
      },
      {  waitFor: 1000  },
      {  click: [660, 300]  },
      {  waitFor: 1000  },
      function(next){ 
        t.is(t.cq1('#event0')._text, '音声を検知[部分:First]', 'Should show event button label');
        t.is(t.cq1('#event1')._text, '誰かを見たら[完全:FACE]', 'Should show event button label');
 
        var btns = t.cq('button');
        var i; 
        var flg = false;
        for(i = 0; i < btns.length; i++){
          if( btns[i]._text == "写真を撮る" ){
            t.pass("BTN:" + btns[i]._text);
            t.pass('Should show camera button');
            flg = true;
            next();
          }
          else if( btns[i]._text == "[777] 秒待つ" ){
            t.pass("BTN:" + btns[i]._text);
            t.pass('Should show wait button');
            flg = true;
            next();
          }
          else if( btns[i]._text == "[jp.test] を起動" ){
            t.pass("BTN:" + btns[i]._text);
            t.pass('Should show application button');
            flg = true;
            next();
          }
          else if( btns[i]._text == "話す [変更しました]" ){
            t.pass("BTN:" + btns[i]._text);
            t.pass('Should show talk button');
            flg = true;
            next();
          }
          else if( btns[i]._text == "光る" ){
            t.pass("BTN:" + btns[i]._text);
            t.pass('Should show light button');
            flg = true;
            next();
          }
        }
        if(!flg){
          t.fail('Action buttons cannot find');
          next();
        }
      }

    );
});

