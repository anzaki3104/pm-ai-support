StartTest(function(t) {
  t.chain(
      {  waitFor :'componentVisible', args : '#naviView' },
      
      //////////////////// cancel button test /////////
      function(next){
        t.click(t.cq1('#add'), function(){
          t.diag('+ button is tapped');
        });
        next();
      },
      {
        action : 'wait',
        delay  : 500
      },
      function(next){
        var promptBtn = t.cq('button[text=Cancel]');

        //Cancelボタン配列の2番目（決めうち)

        t.click(promptBtn[1])

        next();
      },
      //{
      //  click: '>> button[text=Cancel]'
      //},
      {
        action : 'wait',
        delay  : 500
      },
      function(next){
        t.messageBoxIsHidden();
        next();
      },

      //////////////////// Empty  test /////////
      function(next){
        t.pass('Should create project');
        t.click(t.cq1('#add'), function(){
          t.diag('+ button is tapped');
        });
        //t.ok(t.cq1('messagebox'), 'proj1');
        next();
      },
      {
        action : 'wait',
        delay  : 500
      },
      function(next){
          t.messageBoxIsVisible();
          next();
      },
      {
        //Empty project Name
        click: '>> button[text=OK]'
      },
      {
        action : 'wait',
        delay  : 500
      },
      function(next){
        //show error
        t.messageBoxIsVisible();
        //I don't know how assert error message

        next();
      },
      {//InVisible error message
        click: '>> button[text=OK]'
      },
      {
        action : 'wait',
        delay  : 500
      },
      function(next){
        t.messageBoxIsHidden();
        next();
      }
  );
});

