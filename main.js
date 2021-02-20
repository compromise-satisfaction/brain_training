enchant()

///window.onload = function(){

function Load(width,height){
  var core = new Core(width, height);

  core.fps = 10;
  core.onload = function(){
    var MainScene = function(){
      var scene = new Scene();                                // 新しいシーンを作る

      var Label1 = new Label();
      Label1.font  = "300px monospace";
      Label1.color = 'black';
      Label1.x = 300;
      Label1.y = 0;
      Label1.width = 300;
      Label1.height = 300;
      Label1.text = "■";
      scene.addChild(Label1);

      var Label2 = new Label();
      Label2.font  = "200px monospace";
      Label2.color = 'red';
      Label2.x = 0;
      Label2.y = 300;
      Label2.width = 200;
      Label2.height = 200;
      Label2.text = "■";
      scene.addChild(Label2);

      var Label3 = new Label();
      Label3.font  = "200px monospace";
      Label3.color = 'green';
      Label3.x = 400;
      Label3.y = 300;
      Label3.width = 200;
      Label3.height = 200;
      Label3.text = "■";
      scene.addChild(Label3);

      var Label4 = new Label();
      Label4.font  = "200px monospace";
      Label4.color = 'blue';
      Label4.x = 200;
      Label4.y = 300;
      Label4.width = 200;
      Label4.height = 200;
      Label4.text = "■";
      scene.addChild(Label4);

      var S_Input1 = new Entity();
      S_Input1.moveTo(0,0);
      S_Input1.width = 190;
      S_Input1.height = 30;
      S_Input1._element = document.createElement('input');
      S_Input1._element.type = "text";
      S_Input1._element.name = "myText";
      S_Input1._element.value = "0";
      S_Input1._element.placeholder = "赤を入力";
      scene.addChild(S_Input1);

      var S_Input2 = new Entity();
      S_Input2.moveTo(0,40);
      S_Input2.width = 190;
      S_Input2.height = 30;
      S_Input2._element = document.createElement('input');
      S_Input2._element.type = "text";
      S_Input2._element.name = "myText";
      S_Input2._element.value = "0";
      S_Input2._element.placeholder = "緑を入力";
      scene.addChild(S_Input2);

      var S_Input3 = new Entity();
      S_Input3.moveTo(0,80);
      S_Input3.width = 190;
      S_Input3.height = 30;
      S_Input3._element = document.createElement('input');
      S_Input3._element.type = "text";
      S_Input3._element.name = "myText";
      S_Input3._element.value = "0";
      S_Input3._element.placeholder = "青を入力";
      scene.addChild(S_Input3);


      var S_Input4 = new Entity();
      S_Input4.moveTo(0,120);
      S_Input4.width = 190;
      S_Input4.height = 30;
      S_Input4._element = document.createElement('input');
      S_Input4._element.type = "text";
      S_Input4._element.name = "myText";
      S_Input4._element.value = "0";
      S_Input4._element.placeholder = "カラーキー";
      scene.addChild(S_Input4);

      var S_Input5 = new Entity();
      S_Input5.moveTo(0,160);
      S_Input5.width = 190;
      S_Input5.height = 30;
      S_Input5._element = document.createElement('input');
      S_Input5._element.value = "保存";
      S_Input5._element.type = "submit";
      scene.addChild(S_Input5);

      var S_Input6 = new Entity();
      S_Input6.moveTo(0,200);
      S_Input6.width = 190;
      S_Input6.height = 30;
      S_Input6._element = document.createElement('input');
      S_Input6._element.value = "リセット";
      S_Input6._element.type = "submit";
      scene.addChild(S_Input6);

      S_Input5.addEventListener("touchstart",function(){
        var form = document.createElement('form');
        var request = document.createElement('input');
        form.method = 'POST';
        form.target="_blank";
        form.action = 'https://script.google.com/macros/s/AKfycbyPUoNDeYxhqB0aUkMm9ySQo29NlrPtG5vLWDP2w9LY9v8TM9mV/exec';
        request.type = 'hidden'; //入力フォームが表示されないように
        request.name = "value";
        request.value = Colors;
        form.appendChild(request);
        document.body.appendChild(form);
        form.submit();
        return;
      })

      S_Input6.addEventListener("touchstart",function(){
        S_Input1._element.value = 0;
        S_Input2._element.value = 0;
        S_Input3._element.value = 0;
        return;
      })

      Label2.addEventListener("touchmove",function(e){
        S_Input1._element.value ++;
        return;
      })

      Label3.addEventListener("touchmove",function(e){
        S_Input2._element.value ++;
        return;
      })

      Label4.addEventListener("touchmove",function(e){
        S_Input3._element.value ++;
        return;
      })

      var Colors = 0;
      Label1.addEventListener("enterframe",function(){
        Colors = "rgb(" + S_Input1._element.value + "," + S_Input2._element.value + "," + S_Input3._element.value + ")";
        Label1.color = Colors;
        S_Input4._element.value = Label1.color;
      })

      return scene;
    };
    core.replaceScene(MainScene());
  }
  core.start()
}
