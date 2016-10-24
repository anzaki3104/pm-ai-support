var pjname = "002_create";
StartTest(function(t) {
  t.chain(
      {  waitFor :'componentVisible', args : '#naviView' },

      function(next){
        t.pass('Should create project');
        t.click(t.cq1('#add'), function(){
          t.diag('+ button is tapped');
        });
        next();
      },
      {
        action : 'wait',
        delay  : 500
      },
      {
        click: '>> textfield'
      },
      {
        type: pjname //"002_pj[ENTER]"
      },
      {
        click: '>> button[text=OK]'
      },
      {
        action : 'wait',
        delay  : 500
      },
      function(next){
        t.messageBoxIsHidden();
        next();
      },
      function(next){
        t.pass('Create project workspace');
        next();
      },
      function(next){
        t.is(t.cq1('#projectName')._html, '[Project] : ' + pjname,  'Should equal project name');
        next();
      },
      function(next){
        //Should show +Add button
        t.ok(t.cq1('#plusAdd'), 'Should show +Add button');
        next();
      },
      //////////////////////// make contents ////////////////
      function(next){  t.diag('Event1 Input Start');next();  },
      {
        click: '>> button[text=Add]'
      },
      { waitFor : 500 },
      {
        click: '>> button[text=Done]'
      },
      { waitFor : 500 },
      {
        click: '>> #whatsay'
      },
      {
        type: "First"
      },
      {  click: '>> button[text=ENTER]'  },
      { waitFor : 500 },
      function(next){
        //Should show +Add button
        t.ok(t.cq1('#event0'), 'Should show event button[First]');
        t.is(t.cq1('#event0')._text, '音声を検知[部分:First]', 'Should show event button label');
        next();
      },
      function(next){
        //Should show +Add button
        t.ok(t.cq1('#plus0'), 'Should show action add (+) button');
        next();
      },
      {  click: '>> #plus0'  },
      {  waitFor : 500 },
      {  click: '>> #talk'  },
      {  waitFor : 500 },
      {  click: '>> button[text=ENTER]'  },
      function(next){
        t.messageBoxIsVisible();
        next();
      },
      {  waitFor : 500 },
      {  click: '>> button[text=OK]'  },
      {  waitFor : 500 },
      {  click: '>> #talktext'  },
      {  type: "正常テストケース"  },
      {  click: '>> button[text=ENTER]'  },
      {  waitFor : 500 },
      {  click: '>> #plus0'  },
      {  waitFor : 500 },
      {  click: '>> #light'  },
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
      ////////////////////  event2 /////////////////
      function(next){  t.diag('Event2 Input Start');next();  },
      {  click: '>> button[text=Add]'  },
      {  waitForCQ: "picker" },
      {  waitFor : 500 },
      {  click: "picker => .x-dataview-item:nth-child(2)"},
      {  click: '>> button[text=Done]'  },
      {  waitFor : 500 },
      function(next){
        //Should show +Add button
        t.ok(t.cq1('#event1'), 'Should show event button[First]');
        t.is(t.cq1('#event1')._text, '誰かを見たら[完全:FACE]', 'Should show event button label');
        next();
      },
      {  click: '>> #plus1'  },
      {  click: '>> #camera'  },
      {  waitFor : 500 },
      {  click: '>> #plus1'  },
      {  click: '>> #wait'  },
      {  waitFor : 500 },
      {  click: '>> #waittime'  },
      {  type: "X"  },
      {  click: '>> button[text=ENTER]'  },
      {  waitFor : 500 },
      function(next){
        t.messageBoxIsVisible();
        next();
      },
      {  waitFor : 500 },
      {  click: '>> button[text=OK]'  },
      {  waitFor : 500 },
      {  click: '>> #waittime'  },
      {  type: "[BACKSPACE]"  },
      {  type: "5"  },
      {  click: '>> button[text=ENTER]'  },
      {  waitFor : 500 },
      {  click: '>> #plus1'  },
      {  click: '>> #application'  },
      {  waitFor : 500 },
      {  click: '>> button[text=ENTER]'  },
      {  waitFor : 500 },
      function(next){
        t.messageBoxIsVisible();
        next();
      },
      {  waitFor : 500 },
      {  click: '>> button[text=OK]'  },
      {  waitFor : 500 },
      {  click: '>> #applicationName'  },
      {  type: "com.test.app"  },
      {  click: '>> button[text=ENTER]'  },
      {  waitFor : 500 },
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
      {  click: '>> #event0'  },
      {  waitFor : 500 },
      {  click: '>> #event1'  },
      {  click: '>> #save'  },
      {  waitFor : 3000 },
      function(next){
        t.messageBoxIsVisible();
        next();
      },
      {  click: '>> button[text=OK]'  },
      {  waitFor : 500 },
      {  click: '>> #load'  },
      {  waitFor : 1000 },
      {  click: "list => .project:nth-child(1)"},
      function(next) {
        t.pass('Should see a project list after tapping a load button');
        next();
      },
      function(next) {
        t.done();
      }
  );
});
