enchant()

var Start_time = null;

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
  var aaa = rand(Values.length);
  var Values2 = [];
  var k = 0;
  for (var i = 0; i < Values.length; i++) {
    if(i != aaa){
      Values2[k] = Values[i];
      k++;
    }
  }
  var bbb = rand(Values2.length);
  return([Values[aaa][1],Values2[bbb][0]]);
}

function Load(width,height){
  var core = new Core(width, height);

  core.preload("ボタン.png");
  core.fps = 100;
  core.onload = function(){
    var StartScene = function(){
       var scene = new Scene();                                // 新しいシーンを作る

       var Numbers = 0;
       var Start_text = "ルール:        文字の色をタッチしよう。二分間の正解数から　　　不正回数を引いた数を　　競います。   　　　　　　　　　　　     タッチしてスタート。";

       function Texts(a){
         if(i%12==0) Numbers += 50;
         Text[i] = new Sprite();
         Text[i]._element = document.createElement("innerHTML");
         Text[i]._style.font  = "50px monospace";
         Text[i]._element.textContent = a;
         Text[i].x = 50 * (i%12);
         Text[i].y = Numbers;
         scene.addChild(Text[i]);
       }

       for (var i = 0; i < Start_text.length; i++) {
         Texts(Start_text[i]);
       }

       scene.on("touchstart",function(e){
         Start_time = new Date().getTime() - new Date().getTime()%1000;
         Start_time = Start_time/1000 + 120;
         core.replaceScene(MainScene());
       })
       return scene;
    };
    var MainScene = function(){
      var scene = new Scene();                                // 新しいシーンを作る

      var iros = iro();
      var Time = 120;

      var Label1 = new Label();
      Label1.font  = "90px monospace";
      Label1.y = 150;
      Label1.width = 300;
      Label1.height = 300;
      Label1.text = iros[0];
      Label1.color = iros[1];
      Label1.x = width/2 - Label1.text.length * 45;
      scene.addChild(Label1);

      var Label2 = new Label();
      Label2.font  = "20px monospace";
      Label2.x = 0;
      Label2.y = 150;
      Label2.width = 600;
      Label2.height = 20;
      Label2.text = "ポイント:0";
      scene.addChild(Label2);

      var Label3 = new Label();
      Label3.font  = "20px monospace";
      Label3.x = 0;
      Label3.y = 180;
      Label3.width = 600;
      Label3.height = 20;
      Label3.text = "残り時間:120秒";
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

      function View(){
        var old_iros1 = iros[0]
        var old_iros2 = iros[1];
        iros = iro();
        while (old_iros1==iros[0] && old_iros2==iros[1]) {
          iros = iro();
        }
        Label2.text = "ポイント:" + Point;
        Label1.text = iros[0];
        Label1.color = iros[1];
        Label1.x = width/2 - Label1.text.length * 45;
        return;
      }

      Button_red.addEventListener("touchstart",function(){
        if(Label1.color=="red"){
          Point++;
          Judgment.frame = 4;
        }
        else{
          if(Point>0) Point--;
          Judgment.frame = 5;
        }
        View();
        return;
      })

      Button_black.addEventListener("enterframe",function(){
        Label3.text = Start_time - (new Date().getTime() - new Date().getTime()%1000)/1000;
        if(Label3.text > 99) Label3.text = Label3.text.substring(0,3);
        else Label3.text = Label3.text.substring(0,2);
        Label3.text = "残り時間:" + Label3.text + "秒";
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
        View();
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
        View();
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
        View();
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
    core.replaceScene(StartScene());
  }
  core.start()
}
