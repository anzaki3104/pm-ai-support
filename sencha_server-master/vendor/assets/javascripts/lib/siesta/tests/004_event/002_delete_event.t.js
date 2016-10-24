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
      function(next){  t.diag('Delete Talk Test');next();  },
      {  click: '#event0'  },
      {  waitFor: 500  },
      function(next){ 
        var btns = t.cq('button');
        var i; 
        for(i = 0; i < btns.length; i++){
          if( btns[i]._text == "話す [変更しました]" ){
            t.longpress(btns[i]);
          }
        }
        next();
      },
      {  waitFor: 2000  },
      {  click: '>> button[text=Delete]'  },
      {  waitFor: 500  },
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
            t.fail("BTN:" + btns[i]._text);
            t.fail('Should not show talk button');
            flg = false;
            next();
          }
          else if( btns[i]._text == "光る" ){
            t.pass("BTN:" + btns[i]._text);
            t.pass('Should show light button');
            flg = true;
            next();
          }
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
            t.fail("BTN:" + btns[i]._text);
            t.fail('Should not show talk button');
            flg = false;
            next();
          }
          else if( btns[i]._text == "光る" ){
            t.pass("BTN:" + btns[i]._text);
            t.pass('Should show light button');
            flg = true;
            next();
          }
        }
      },
      function(next){  t.diag('Delete Wait Test');next();  },
      {  click: '#event0'  },
      {  waitFor: 500  },
      function(next){ 
        var btns = t.cq('button');
        var i; 
        for(i = 0; i < btns.length; i++){
          if( btns[i]._text == "光る" ){
            t.longpress(btns[i]);
          }
        }
        next();
      },
      {  waitFor: 2000  },
      {  click: '>> button[text=Delete]'  },
      {  waitFor: 500  },
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
            t.fail("BTN:" + btns[i]._text);
            t.fail('Should not show talk button');
            flg = false;
            next();
          }
          else if( btns[i]._text == "光る" ){
            t.fail("BTN:" + btns[i]._text);
            t.fail('Should not show light button');
            flg = false;
            next();
          }
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
            t.fail("BTN:" + btns[i]._text);
            t.fail('Should not show talk button');
            flg = false;
            next();
          }
          else if( btns[i]._text == "光る" ){
            t.fail("BTN:" + btns[i]._text);
            t.fail('Should not show light button');
            flg = false;
            next();
          }
        }
      },
      function(next){  t.diag('Delete Camera Test');next();  },
      {  click: '#event1'  },
      {  waitFor: 500  },
      function(next){ 
        var btns = t.cq('button');
        var i; 
        for(i = 0; i < btns.length; i++){
          if( btns[i]._text == "写真を撮る" ){
            t.longpress(btns[i]);
          }
        }
        next();
      },
      {  waitFor: 2000  },
      {  click: '>> button[text=Delete]'  },
      {  waitFor: 500  },
      function(next){  t.diag('Before Save and All Modify Check');next();  },
      function(next){ 
        t.is(t.cq1('#event0')._text, '音声を検知[部分:First]', 'Should show event button label');
        t.is(t.cq1('#event1')._text, '誰かを見たら[完全:FACE]', 'Should show event button label');
 
        var btns = t.cq('button');
        var i; 
        var flg = false;
        for(i = 0; i < btns.length; i++){
          if( btns[i]._text == "写真を撮る" ){
            t.fail("BTN:" + btns[i]._text);
            t.fail('Should not show camera button');
            flg = false;
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
            t.fail("BTN:" + btns[i]._text);
            t.fail('Should not show talk button');
            flg = false;
            next();
          }
          else if( btns[i]._text == "光る" ){
            t.fail("BTN:" + btns[i]._text);
            t.fail('Should not show light button');
            flg = false;
            next();
          }
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
            t.fail("BTN:" + btns[i]._text);
            t.fail('Should not show camera button');
            flg = false;
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
            t.fail("BTN:" + btns[i]._text);
            t.fail('Should not show talk button');
            flg = false;
            next();
          }
          else if( btns[i]._text == "光る" ){
            t.fail("BTN:" + btns[i]._text);
            t.fail('Should not show light button');
            flg = false;
            next();
          }
        }
      },
      function(next){  t.diag('Delete Time Test');next();  },
      {  click: '#event1'  },
      {  waitFor: 500  },
      function(next){ 
        var btns = t.cq('button');
        var i; 
        for(i = 0; i < btns.length; i++){
          if( btns[i]._text == "[777] 秒待つ" ){
            t.longpress(btns[i]);
          }
        }
        next();
      },
      {  waitFor: 2000  },
      {  click: '>> button[text=Delete]'  },
      {  waitFor: 500  },
      function(next){  t.diag('Before Save and All Modify Check');next();  },
      function(next){ 
        t.is(t.cq1('#event0')._text, '音声を検知[部分:First]', 'Should show event button label');
        t.is(t.cq1('#event1')._text, '誰かを見たら[完全:FACE]', 'Should show event button label');
 
        var btns = t.cq('button');
        var i; 
        var flg = false;
        for(i = 0; i < btns.length; i++){
          if( btns[i]._text == "写真を撮る" ){
            t.fail("BTN:" + btns[i]._text);
            t.fail('Should not show camera button');
            flg = false;
            next();
          }
          else if( btns[i]._text == "[777] 秒待つ" ){
            t.fail("BTN:" + btns[i]._text);
            t.fail('Should show wait button');
            flg = false;
            next();
          }
          else if( btns[i]._text == "[jp.test] を起動" ){
            t.pass("BTN:" + btns[i]._text);
            t.pass('Should show application button');
            flg = true;
            next();
          }
          else if( btns[i]._text == "話す [変更しました]" ){
            t.fail("BTN:" + btns[i]._text);
            t.fail('Should not show talk button');
            flg = false;
            next();
          }
          else if( btns[i]._text == "光る" ){
            t.fail("BTN:" + btns[i]._text);
            t.fail('Should not show light button');
            flg = false;
            next();
          }
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
            t.fail("BTN:" + btns[i]._text);
            t.fail('Should not show camera button');
            flg = false;
            next();
          }
          else if( btns[i]._text == "[777] 秒待つ" ){
            t.fail("BTN:" + btns[i]._text);
            t.fail('Should not show wait button');
            flg = false;
            next();
          }
          else if( btns[i]._text == "[jp.test] を起動" ){
            t.pass("BTN:" + btns[i]._text);
            t.pass('Should show application button');
            flg = true;
            next();
          }
          else if( btns[i]._text == "話す [変更しました]" ){
            t.fail("BTN:" + btns[i]._text);
            t.fail('Should not show talk button');
            flg = false;
            next();
          }
          else if( btns[i]._text == "光る" ){
            t.fail("BTN:" + btns[i]._text);
            t.fail('Should not show light button');
            flg = false;
            next();
          }
        }
      },
      function(next){  t.diag('Delete App Test');next();  },
      {  click: '#event1'  },
      {  waitFor: 500  },
      function(next){ 
        var btns = t.cq('button');
        var i; 
        for(i = 0; i < btns.length; i++){
          if( btns[i]._text == "[jp.test] を起動" ){
            t.longpress(btns[i]);
          }
        }
        next();
      },
      {  waitFor: 2000  },
      {  click: '>> button[text=Delete]'  },
      {  waitFor: 500  },
      function(next){  t.diag('Before Save and All Modify Check');next();  },
      function(next){ 
        t.is(t.cq1('#event0')._text, '音声を検知[部分:First]', 'Should show event button label');
        t.is(t.cq1('#event1')._text, '誰かを見たら[完全:FACE]', 'Should show event button label');
 
        var btns = t.cq('button');
        var i; 
        var flg = false;
        for(i = 0; i < btns.length; i++){
          if( btns[i]._text == "写真を撮る" ){
            t.fail("BTN:" + btns[i]._text);
            t.fail('Should not show camera button');
            flg = false;
            next();
          }
          else if( btns[i]._text == "[777] 秒待つ" ){
            t.fail("BTN:" + btns[i]._text);
            t.fail('Should show wait button');
            flg = false;
            next();
          }
          else if( btns[i]._text == "[jp.test] を起動" ){
            t.fail("BTN:" + btns[i]._text);
            t.fail('Should not show application button');
            flg = false;
            next();
          }
          else if( btns[i]._text == "話す [変更しました]" ){
            t.fail("BTN:" + btns[i]._text);
            t.fail('Should not show talk button');
            flg = false;
            next();
          }
          else if( btns[i]._text == "光る" ){
            t.fail("BTN:" + btns[i]._text);
            t.fail('Should not show light button');
            flg = false;
            next();
          }
        }
        next();
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
        for(i = 0; i < btns.length; i++){
          if( btns[i]._text == "写真を撮る" ){
            t.fail("BTN:" + btns[i]._text);
            t.fail('Should not show camera button');
            next();
          }
          else if( btns[i]._text == "[777] 秒待つ" ){
            t.fail("BTN:" + btns[i]._text);
            t.fail('Should not show wait button');
            next();
          }
          else if( btns[i]._text == "[jp.test] を起動" ){
            t.fail("BTN:" + btns[i]._text);
            t.fail('Should show application button');
            next();
          }
          else if( btns[i]._text == "話す [変更しました]" ){
            t.fail("BTN:" + btns[i]._text);
            t.fail('Should not show talk button');
            next();
          }
          else if( btns[i]._text == "光る" ){
            t.fail("BTN:" + btns[i]._text);
            t.fail('Should not show light button');
            next();
          }
        }
        next();
      },
      function(next){  t.diag('Delete Event Test');next();  },
      {  longpress: '#event0'  },
      {  waitFor: 500  },
      {  click: '>> button[text=Delete]'  },
      function(next){  t.diag('Before Save and All Modify Check');next();  },
      function(next){ 
        var btns = t.cq('button');
        var i; 
        for(i = 0; i < btns.length; i++){
          if( btns[i]._text == "音声を検知[部分:First]" ){
            t.fail("BTN:" + btns[i]._text);
            t.fail('Should not show Event0 button');
            next();
          }
          else if( btns[i]._text == "誰かを見たら[完全:FACE]" ){
            t.pass("BTN:" + btns[i]._text);
            t.pass('Should show Event1 button');
            next();
          }
        }
        next();
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
        var btns = t.cq('button');
        var i; 
        for(i = 0; i < btns.length; i++){
          if( btns[i]._text == "音声を検知[部分:First]" ){
            t.fail("BTN:" + btns[i]._text);
            t.fail('Should not show Event0 button');
            next();
          }
          else if( btns[i]._text == "誰かを見たら[完全:FACE]" ){
            t.pass("BTN:" + btns[i]._text);
            t.pass('Should show Event1 button');
            next();
          }
        }
        t.done();
      }
    );
});

