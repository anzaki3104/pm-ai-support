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
      function(next){  t.diag('Event2 Input Validation Start');next();  },
      function(next){
        //Should show +Add button
        t.ok(t.cq1('#event1'), 'Should show event button[First]');
        t.is(t.cq1('#event1')._text, '誰かを見たら[完全:FACE]', 'Should show event button label');
        next();
      },
      function(next){ 
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
          else if( btns[i]._text == "[5] 秒待つ" ){
            t.pass("BTN:" + btns[i]._text);
            t.pass('Should show wait button');
            flg = true;
            next();
          }
          else if( btns[i]._text == "[com.test.app] を起動" ){
            t.pass("BTN:" + btns[i]._text);
            t.pass('Should show application button');
            flg = true;
            next();
          }
        }
        if(!flg){
          t.fail('Action buttons cannot find');
          next();
        }
      },
      function(next){  t.diag('Event1 Input Validation Start');next();  },
      {  click: '>> #event0'  },
      {  waitFor: 500  },
      function(next){ 
        var btns = t.cq('button');
        var i; 
        var flg = false;
        for(i = 0; i < btns.length; i++){
          if( btns[i]._text == "話す [正常テストケース]" ){
            t.pass("BTN:" + btns[i]._text);
            t.pass('Should show talk button');
            flg = true;
            next();
          }
        }
        if(!flg){
          t.fail('Talk button cannot find');
          next();
        }
      },
      function(next){ 
        var btns = t.cq('button');
        var i; 
        var flg = false;
        for(i = 0; i < btns.length; i++){
          if( btns[i]._text == "光る" ){
            t.pass("BTN:" + btns[i]._text);
            t.pass('Should show light button');
            flg = true;
            next();
          }
        }
        if(!flg){
          t.fail('Light button cannot find');
          next();
        }
      },
      function(next){  t.diag('Event AddBtn Validation Start');next();  },
      function(next){
        //Should show +Add button
        t.ok(t.cq1('#plusAdd'), 'Should show +Add button');
        next();
      },
      {  click: '>> button[text=Add]'  },
      {  waitFor: 500  },
      function(next){
        t.messageBoxIsVisible();
        next();
      },
      {  click: '>> button[text=Cancel]'  },
      {  waitFor: 500  },
      function(next){  t.diag('Action AddBtn Validation Pre');next();  },
      {  click: '>> #plus0'  },
      {  waitFor : 500 },
      function(next){
        t.messageBoxIsVisible();
        next();
      },
      function(next){  t.diag('Reload Test Start');next();  },
      {  click: '>> #wait'  },
      {  waitFor : 500 },
      {  click: '>> #waittime'  },
      {  type: "999"  },
      {  click: '>> button[text=ENTER]'  },
      {  waitFor : 500 },
      function(next){  t.diag('Action AddBtn Validation Start');next();  },
      {  click: '>> #refresh'  },
      {  waitFor : 500 },
      {  click: '>> button[text=Yes]'  },
      {  waitFor : 3000 },
      function(next){ 
        var btns = t.cq('button');
        var i; 
        var flg = true;
        for(i = 0; i < btns.length; i++){
          if( btns[i]._text == "[999] 秒待つ" ){
            flg = false;
            t.fail("BTN:" + btns[i]._text);
            t.fail('Reload button did not work!');
            next();
          }
        }
        if(flg){
          t.pass('Reload button OK');
          next();
        }
      }
    );
});

