StartTest(function(t) {
  t.chain(
      {  waitFor :'componentVisible', args : '#naviView' },

      function(next){
        t.pass('Should find init view on app start');
        t.is(t.cq1('#mainPanel').initialConfig.title, 'Program mode',  'Should equal title');
        t.is(t.cq1('#projectName')._html, '[Project] : ',  'Should equal project name');
        t.ok(t.cq1('#add'), 'Should find a add button');
        t.ok(t.cq1('#load'), 'Should find a load button');
        t.ok(t.cq1('#list'), 'Should find a list button');
        t.ok(t.cq1('#refresh'), 'Should find a refresh button');
        t.ok(t.cq1('#save'), 'Should find a save button');
        t.notOk(t.cq1('#hoge'), 'Should find a hoge button');


        t.pass('Should cannot tap reload button');
        t.ok(t.cq1('#refresh').isDisabled(), 'reload button cannot tap');
      }
  );

});

