enchant()

function rand(n){
  return Math.floor(Math.random() * (n));
}

function iro(){
  var Values = [
    ["red","あか"],
    ["blue","あお"],
    ["black","くろ"],
    ["yellow","きいろ"]
  ];
  var aaa = rand(4);
  var bbb = rand(3);
  var Values2 = [];
  var k = 0;
  for (var i = 0; i < Values.length; i++) {
    if(i != aaa){
      Values2[k] = Values[i];
      k++;
    }
  }
  return([Values[aaa][1],Values2[bbb][0]]);
}

function Load(width,height){
  var core = new Core(width, height);

  core.preload("ボタン.png");
  core.fps = 10;
  core.onload = function(){
    var StartScene = function(){
       var scene = new Scene();                                // 新しいシーンを作る
       var Start = new Sprite(505,505);
       Start.image = core.assets["image/Start.png"];
       Start.x = 0;
       Start.y = 0;
       scene.addChild(Start);
       scene.on("touchstart",function(e){
         core.replaceScene(MenuScene(0));
       })
       return scene;
    };
    var MainScene = function(){
      var scene = new Scene();                                // 新しいシーンを作る

      var iros = iro();

      var Label1 = new Label();
      Label1.font  = "90px monospace";
      Label1.x = 150;
      Label1.y = 150;
      Label1.width = 300;
      Label1.height = 300;
      Label1.text = iros[0];
      Label1.color = iros[1];
      scene.addChild(Label1);

      var Label2 = new Label();
      Label2.font  = "20px monospace";
      Label2.x = 0;
      Label2.y = 150;
      Label2.width = 600;
      Label2.height = 20;
      Label2.text = "ポイント";
      scene.addChild(Label2);

      var Label3 = new Label();
      Label3.font  = "20px monospace";
      Label3.x = 0;
      Label3.y = 170;
      Label3.width = 600;
      Label3.height = 20;
      Label3.text = "0";
      scene.addChild(Label3);

      /*
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
      */

      var Button_red = new Sprite(150,150);
      Button_red.image = core.assets["ボタン.png"];
      Button_red.x = 0;
      Button_red.y = 450;
      Button_red.frame = 0;
      scene.addChild(Button_red);

      var Button_black = new Sprite(150,150);
      Button_black.image = core.assets["ボタン.png"];
      Button_black.x = 150;
      Button_black.y = 450;
      Button_black.frame = 1;
      scene.addChild(Button_black);

      var Button_blue = new Sprite(150,150);
      Button_blue.image = core.assets["ボタン.png"];
      Button_blue.x = 300;
      Button_blue.y = 450;
      Button_blue.frame = 2;
      scene.addChild(Button_blue);

      var Button_yellow = new Sprite(150,150);
      Button_yellow.image = core.assets["ボタン.png"];
      Button_yellow.x = 450;
      Button_yellow.y = 450;
      Button_yellow.frame = 3;
      scene.addChild(Button_yellow);

      var Judgment = new Sprite(150,150);
      Judgment.image = core.assets["ボタン.png"];
      Judgment.x = 0;
      Judgment.y = 0;
      Judgment.frame = 6;
      scene.addChild(Judgment);

      var Point = 0;

      Button_red.addEventListener("touchstart",function(){
        if(Label1.color=="red"){
          Point++;
          Judgment.frame = 4;
        }
        else{
          if(Point>0) Point--;
          Judgment.frame = 5;
        }
        iros = iro();
        Label1.text = iros[0];
        Label1.color = iros[1];
        Label3.text = Point;
        return;
      })

      Button_blue.addEventListener("touchstart",function(){
        if(Label1.color=="blue"){
          Point++;
          Judgment.frame = 4;
        }
        else{
          if(Point>0) Point--;
          Judgment.frame = 5;
        }
        iros = iro();
        Label1.text = iros[0];
        Label1.color = iros[1];
        Label3.text = Point;
        return;
      })

      Button_black.addEventListener("touchstart",function(){
        if(Label1.color=="black"){
          Point++;
          Judgment.frame = 4;
        }
        else{
          if(Point>0) Point--;
          Judgment.frame = 5;
        }
        iros = iro();
        Label1.text = iros[0];
        Label1.color = iros[1];
        Label3.text = Point;
        return;
      })

      Button_yellow.addEventListener("touchstart",function(){
        if(Label1.color=="yellow"){
          Point++;
          Judgment.frame = 4;
        }
        else{
          if(Point>0) Point--;
          Judgment.frame = 5;
        }
        iros = iro();
        Label1.text = iros[0];
        Label1.color = iros[1];
        Label3.text = Point;
        return;
      })

      /*

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

      var Colors = 0;
      Label1.addEventListener("enterframe",function(){
        Colors = "rgb(" + S_Input1._element.value + "," + S_Input2._element.value + "," + S_Input3._element.value + ")";
        Label1.color = Colors;
        S_Input4._element.value = Label1.color;
      })
      */
      return scene;
    };
    core.replaceScene(MainScene());
  }
  core.start()
}
