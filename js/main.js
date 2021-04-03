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

  core.preload("../画像/ボタン.png","../画像/黒半透明.png","../画像/背景.png","../画像/上下.png");
  core.fps = 30;
  core.onload = function(){
    var StartScene = function(Name){
       var scene = new Scene();                                // 新しいシーンを作る

       var T_I = "red";
       var S_T = 0;
       var Numbers = 0;
       var Start_text = "ルール:              ";
       Start_text += "文字の色をタッチしよう。      ";
       Start_text += "時間内の正解数から不正回数を    ";
       Start_text += "引いた数を競います。　　 　  　　";
       Start_text += "上級は色か文字かを　　　　    　";
       Start_text += "タッチする指示が出て　　　   　　";
       Start_text += "連続正解した分ポイントになります。 ";
       Start_text += "不正解は-10ポイントです。";

       function Texts(a){
         if(i%18==0) Numbers += 30;
         Text[i] = new Sprite();
         Text[i]._element = document.createElement("innerHTML");
         Text[i]._style.font  = "30px monospace";
         Text[i]._element.textContent = a;
         Text[i].x = 30 * (i%18);
         Text[i].y = Numbers;
         scene.addChild(Text[i]);
       }

       var Label1 = new Label();
       Label1.font  = "30px monospace";
       Label1.y = 300;
       Label1.width = 600;
       Label1.height = 30;
       Label1.text = "ここをタッチしてゲームスタート。";
       Label1.color = "red";
       scene.addChild(Label1);

       var Label2 = new Label();
       Label2.font  = "30px monospace";
       Label2.y = 400;
       Label2.width = 600;
       Label2.height = 30;
       Label2.text = "ここをタッチして上級ゲームスタート。";
       Label2.color = "red";
       scene.addChild(Label2);

       for (var i = 0; i < Start_text.length; i++) {
         Texts(Start_text[i]);
       }

       Text[21].addEventListener("enterframe",function(){
         S_T++;
         if(S_T%10!=0) return;
         switch (T_I) {
           case "red":
             T_I = "blue";
             break;
           case "blue":
            T_I = "yellow";
            break;
           case "yellow":
              T_I = "red";
              break;
           default:
             T_I = "black";
             break;
         }
         this._style.color = T_I;
       })

       Label1.addEventListener("touchstart",function(e){
         core.replaceScene(MainScene(false,Name));
         core.pushScene(CountdownScene());
       })

       Label2.addEventListener("touchstart",function(e){
         core.replaceScene(MainScene(true,Name));
         core.pushScene(CountdownScene());
       })

       var S_Input1 = new Entity();
       S_Input1.moveTo(150,450);
       S_Input1.width = 300;
       S_Input1.height = 30;
       S_Input1._element = document.createElement('input');
       S_Input1._element.value = "機種変更";
       S_Input1._element.type = "submit";
       scene.addChild(S_Input1);

       S_Input1.addEventListener("touchstart",function(){
         core.pushScene(ChangeScene());
         return;
       })

       var Button = new Entity();
       Button.moveTo((width/5)*4,height-(width/5));
       Button.width = (width/5);
       Button.height = (width/5);
       Button._element = document.createElement('input');
       Button._element.type = "submit";
       Button._element.value = "ノベルゲーム";
       Button.backgroundColor = "buttonface";
       scene.addChild(Button);
       Button._element.onclick = function(e){
         core.popScene();
         novel_game_load(405,600);
         return;
       };

       return scene;
    };
    var MainScene = function(Difficulty,Name){
      var scene = new Scene();                                // 新しいシーンを作る

      var Time = 1000;
      var iros = iro();
      var seikai = null;

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
      Label3.text = "残り時間:" + Time;
      scene.addChild(Label3);

      var P_P = 1;

      if(Difficulty){

        var Touch = rand(2);
        if(Touch==0) Touch = "色";
        if(Touch==1) Touch = "字";

        var Label4 = new Label();
        Label4.font  = "40px monospace";
        Label4.x = 250;
        Label4.y = 100;
        Label4.width = 300;
        Label4.height = 300;
        Label4.text = Touch + "をタッチ！";
        scene.addChild(Label4);
      }

      if(Difficulty){
        ddd();
        if(Touch=="字") seikai = iros[0];
        else seikai = iros[1];
      }
      else seikai = iros[1];

      switch (seikai) {
        case "red":
        case "あか":
          seikai = "赤";
          break;
        case "くろ":
        case "black":
          seikai = "黒";
          break;
        case "あお":
        case "blue":
          seikai = "青";
          break;
        case "きいろ":
        case "yellow":
          seikai = "黄色";
          break;
        default:
          console.log(seikai);
          break;
      }

      var Label5 = new Label();
      Label5.font  = "50px monospace";
      Label5.x = 450;
      Label5.y = 0;
      Label5.width = 300;
      Label5.height = 300;
      Label5.text = "中断";
      scene.addChild(Label5);

      var Button_red = new Sprite(150,150);
      Button_red.image = core.assets["../画像/ボタン.png"];
      Button_red.x = 0;
      Button_red.y = 450;
      Button_red.frame = 0;
      scene.addChild(Button_red);

      var Button_black = new Sprite(150,150);
      Button_black.image = core.assets["../画像/ボタン.png"];
      Button_black.x = 150;
      Button_black.y = 450;
      Button_black.frame = 1;
      scene.addChild(Button_black);

      var Button_blue = new Sprite(150,150);
      Button_blue.image = core.assets["../画像/ボタン.png"];
      Button_blue.x = 300;
      Button_blue.y = 450;
      Button_blue.frame = 2;
      scene.addChild(Button_blue);

      var Button_yellow = new Sprite(150,150);
      Button_yellow.image = core.assets["../画像/ボタン.png"];
      Button_yellow.x = 450;
      Button_yellow.y = 450;
      Button_yellow.frame = 3;
      scene.addChild(Button_yellow);

      var Judgment = new Sprite(150,150);
      Judgment.image = core.assets["../画像/ボタン.png"];
      Judgment.x = 0;
      Judgment.y = 0;
      Judgment.frame = 6;
      scene.addChild(Judgment);

      var Point = 0;

      function View(aaaa){
        if(aaaa){
          Point += P_P;
          if(Difficulty) P_P++;
          Judgment.frame = 4;
        }
        else{
          if(Difficulty) Point -= 10;
          else Point --;
          if(Point<0) Point = 0;
          P_P = 1;
          Judgment.frame = 5;
        }
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
        if(Difficulty){
          ddd();
          if(Touch=="字") seikai = iros[0];
          else seikai = iros[1];
        }
        else seikai = iros[1];

        switch (seikai) {
          case "red":
          case "あか":
            seikai = "赤";
            break;
          case "くろ":
          case "black":
            seikai = "黒";
            break;
          case "あお":
          case "blue":
            seikai = "青";
            break;
          case "きいろ":
          case "yellow":
            seikai = "黄色";
            break;
          default:
            console.log(seikai);
            break;
        }
        return;
      }

      function ddd(){
          Touch = rand(2);
          if(Touch==0) Touch = "色";
          if(Touch==1) Touch = "字";
          Label4.text = Touch + "をタッチ！";
      }

      Label3.addEventListener("enterframe",function(){
        Time--;
        if(Time==0) core.replaceScene(ENDScene(Point,Difficulty,Name));
        Label3.text = "残り時間:" + Time;
      })

      Button_red.addEventListener("touchstart",function(){
        if(seikai=="赤") View(true);
        else View(false);
        return;
      })

      Button_blue.addEventListener("touchstart",function(){
        if(seikai=="青") View(true);
        else View(false);
        return;
      })

      Button_black.addEventListener("touchstart",function(){
        if(seikai=="黒") View(true);
        else View(false);
        return;
      })

      Button_yellow.addEventListener("touchstart",function(){
        if(seikai=="黄色") View(true);
        else View(false);
        return;
      })

      Label5.addEventListener("touchstart",function(){
        core.pushScene(StopScene(Point,Difficulty,Name));
        return;
      })

      return scene;
    };
    var ENDScene = function(Point,Difficulty,Name){
       var scene = new Scene();                                // 新しいシーンを作る

       var Label1 = new Label();
       Label1.font  = "30px monospace";
       Label1.x = 150;
       Label1.y = 50;
       Label1.width = 600;
       Label1.height = 300;
       Label1.text = Point + "ポイント獲得！";
       scene.addChild(Label1);

       var S_Input1 = new Entity();
       S_Input1.moveTo(150,100);
       S_Input1.width = 300;
       S_Input1.height = 30;
       S_Input1._element = document.createElement('input');
       S_Input1._element.type = "text";
       S_Input1._element.name = "myText";
       S_Input1._element.value = Name;
       S_Input1._element.placeholder = "ニックネームを入力";
       scene.addChild(S_Input1);

       var S_Input2 = new Entity();
       S_Input2.moveTo(150,150);
       S_Input2.width = 300;
       S_Input2.height = 30;
       S_Input2._element = document.createElement('input');
       S_Input2._element.type = "submit";
       scene.addChild(S_Input2);

       var S_Input3 = new Entity();
       S_Input3.moveTo(150,200);
       S_Input3.width = 300;
       S_Input3.height = 30;
       S_Input3._element = document.createElement('input');
       S_Input3._element.value = "ポイントコード発行";
       S_Input3._element.type = "submit";
       if(HTML=="Tanakake") scene.addChild(S_Input3);

       var S_Input4 = new Entity();
       S_Input4.moveTo(150,250);
       S_Input4.width = 300;
       S_Input4.height = 30;
       S_Input4._element = document.createElement('input');
       S_Input4._element.type = "text";
       S_Input4._element.name = "myText";
       S_Input4._element.placeholder = "ワンタイムパスワード";

       var S_Input5 = new Entity();
       S_Input5.moveTo(150,300);
       S_Input5.width = 300;
       S_Input5.height = 30;
       S_Input5._element = document.createElement('input');
       S_Input5._element.value = "もう一度";
       S_Input5._element.type = "submit";
       scene.addChild(S_Input5);

       var S_Input6 = new Entity();
       S_Input6.moveTo(150,350);
       S_Input6.width = 300;
       S_Input6.height = 30;
       S_Input6._element = document.createElement('input');
       S_Input6._element.value = "スタートへ戻る";
       S_Input6._element.type = "submit";
       scene.addChild(S_Input6);

       var S_Input7 = new Entity();
       S_Input7.moveTo(150,400);
       S_Input7.width = 300;
       S_Input7.height = 30;
       S_Input7._element = document.createElement('input');
       S_Input7._element.value = "ランキングを見る";
       S_Input7._element.type = "submit";
       if(Point>0){
         S_Input2._element.value = "ランキング登録";
         scene.addChild(S_Input7);
       }
       else S_Input2._element.value = "ランキングを見る";

       var hakkou = false;
       var Code = "";
       if(HTML == "index"){
         if(Difficulty) var Rank = "上級";
         else var Rank = "通常";
       }
       else{
         if(Difficulty) var Rank = "田植";
         else var Rank = "田中";
       }

       S_Input2.addEventListener("touchstart",function(){
         if(S_Input1._element.value.length>6){
           Label1.text = "名前は六文字以下です。";
           return;
         }
         Name = S_Input1._element.value;
         window.localStorage.setItem("Name",Name);
         if(this._element.value == "ランキングを見る"){
           core.pushScene(ReadScene("読み込み"));
           fetch
           (
             "https://script.google.com/macros/s/AKfycbxmC5AscixoTM6P1eAPeQwQrNn-vbP_B8Aovhant0tDl8r2_C0/exec",
             {
               method: "POST",
               body: Rank + "ランキングデータロード"
             }
           ).then(res => res.json()).then(result => {
              core.replaceScene(RankingScene(result,0));
              return;
             },);
             return;
         }
         core.pushScene(ReadScene("保存"));
         fetch
         (
           "https://script.google.com/macros/s/AKfycbxmC5AscixoTM6P1eAPeQwQrNn-vbP_B8Aovhant0tDl8r2_C0/exec",
           {
             method: 'POST',
             body: Rank + Point + "(改行)" + Name + "(改行)" + ID
           }
         ).then(res => res.json()).then(result => {
            core.popScene();
            this._element.value = "ランキングを見る";
            scene.removeChild(S_Input7);
            return;
           },);
         return;
       })

       S_Input3.addEventListener("touchstart",function(){
         if(S_Input1._element.value.length>6){
           Label1.text = "名前は六文字以下です。";
           return;
         }
         Name = S_Input1._element.value;
         window.localStorage.setItem("Name",Name);
         if(hakkou){
           S_Input4._element.value = Code;
           return;
         }

         var Codes = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",
         "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
         "1","2","3","4","5","6","7","8","9"];

         for (var i = 0; i < 12; i++) {
           Code += Codes[rand(Codes.length)];
         }

         S_Input4._element.value = Code;
         scene.addChild(S_Input4);
         hakkou = true;
         fetch
         (
           "https://script.google.com/macros/s/AKfycbxmC5AscixoTM6P1eAPeQwQrNn-vbP_B8Aovhant0tDl8r2_C0/exec",
           {
             method: 'POST',
             body: "発行" + Code + Point
           }
         )
         return;
       })

       S_Input5.addEventListener("touchstart",function(){
         if(S_Input1._element.value.length>6){
           Label1.text = "名前は六文字以下です。";
           return;
         }
         Name = S_Input1._element.value;
         window.localStorage.setItem("Name",Name);
         core.replaceScene(MainScene(Difficulty,Name));
         core.pushScene(CountdownScene());
         return;
       })

       S_Input6.addEventListener("touchstart",function(){
         if(S_Input1._element.value.length>6){
           Label1.text = "名前は六文字以下です。";
           return;
         }
         Name = S_Input1._element.value;
         window.localStorage.setItem("Name",Name);
         core.replaceScene(StartScene(Name));
         return;
       })

       S_Input7.addEventListener("touchstart",function(){
         if(S_Input1._element.value.length>6){
           Label1.text = "名前は六文字以下です。";
           return;
         }
         Name = S_Input1._element.value;
         window.localStorage.setItem("Name",Name);
         core.pushScene(ReadScene("読み込み"));
         fetch
         (
           "https://script.google.com/macros/s/AKfycbxmC5AscixoTM6P1eAPeQwQrNn-vbP_B8Aovhant0tDl8r2_C0/exec",
           {
             method: "POST",
             body: Rank + "ランキングデータロード"
           }
         ).then(res => res.json()).then(result => {
            core.replaceScene(RankingScene(result,0));
            return;
           },);
           return;
       })

       return scene;
    };
    var StopScene = function(Point,Difficulty,Name){
       var scene = new Scene();                                // 新しいシーンを作る

       var Background = new Sprite(600,600);
       Background.image = core.assets["../画像/黒半透明.png"];
       Background.x = 0;
       Background.y = 0;
       scene.addChild(Background);

       var Label1 = new Label();
       Label1.font  = "90px monospace";
       Label1.y = 150;
       Label1.width = 270;
       Label1.height = 90;
       Label1.text = "続ける";
       Label1.backgroundColor = "white";
       Label1.x = width/2 - Label1.text.length * 45;
       scene.addChild(Label1);

       var Label2 = new Label();
       Label2.font  = "90px monospace";
       Label2.y = 300;
       Label2.width = 270;
       Label2.height = 90;
       Label2.text = "やめる";
       Label2.backgroundColor = "white";
       Label2.x = width/2 - Label1.text.length * 45;
       scene.addChild(Label2);

       Label1.addEventListener("touchstart",function(){
         core.replaceScene(CountdownScene());
         return;
       })

       Label2.addEventListener("touchstart",function(){
         core.popScene();
         core.replaceScene(ENDScene(Point,Difficulty,Name));
         return;
       })


       return scene;
    };
    var ReadScene = function(Type){
       var scene = new Scene();                                // 新しいシーンを作る

       var Background = new Sprite(600,600);
       Background.image = core.assets["../画像/黒半透明.png"];
       Background.x = 0;
       Background.y = 0;
       scene.addChild(Background);

       var Loading = new Entity();
       Loading._element = document.createElement("img");
       if(Type=="読み込み") Loading._element.src = "../画像/読み込み中.gif";
       else Loading._element.src = "../画像/送信中.gif";
       Loading.width = width;
       Loading.height = height;
       scene.addChild(Loading);

       return scene;
    };
    var RankingScene = function(Datas,Number){
       var scene = new Scene();                                // 新しいシーンを作る

       var Background = new Sprite(600,600);
       Background.image = core.assets["../画像/背景.png"];
       Background.x = 0;
       Background.y = 0;
       scene.addChild(Background);

       var Label1 = new Label();
       Label1.font  = "50px monospace";
       Label1.y = 500;
       Label1.width = 300;
       Label1.height = 90;
       Label1.text = "戻る";
       Label1.x = width/2 - Label1.text.length * 25;
       scene.addChild(Label1);

       var UP1 = new Sprite(80,80);
       UP1.image = core.assets["../画像/上下.png"];
       UP1.x = 35;
       UP1.y = 405;

       var UP2 = new Sprite(80,80);
       UP2.image = core.assets["../画像/上下.png"];
       UP2.x = 485;
       UP2.y = 405;

       var DOWN1 = new Sprite(80,80);
       DOWN1.image = core.assets["../画像/上下.png"];
       DOWN1.x = 35;
       DOWN1.y = 485;
       DOWN1.frame = 1;

       var DOWN2 = new Sprite(80,80);
       DOWN2.image = core.assets["../画像/上下.png"];
       DOWN2.x = 485;
       DOWN2.y = 485;
       DOWN2.frame = 1;

       if(Number > 0){
         scene.addChild(UP1);
         scene.addChild(UP2);
       }

       if(Datas.length > Number + 10){
         scene.addChild(DOWN1);
         scene.addChild(DOWN2);
       }

       var Numbers = 40;

       function Texts(a,b){
         Text[i] = new Sprite();
         Text[i]._element = document.createElement("innerHTML");
         Text[i]._style.font  = "30px monospace";
         Text[i]._element.textContent = a;
         Text[i].x = b;
         Text[i].y = Numbers;
         scene.addChild(Text[i]);
       }

       var Result = [];
       var k = 0;
       var R_X = null;

       for (var i = Number; i < Number + 10; i++) {
         if(Datas.length <= i) break;
         Result[k] = Datas[i];
         k++;
       }

       for (var i = 0; i < Result.length; i++) {
         R_X = 40;
         if(Result[i].順位 < 10) R_X += 15;
         if(Result[i].順位 < 100) R_X += 15;
         if(Result[i].順位 < 1000) R_X += 15;
         if(Result[i].順位 < 10000) R_X += 15;
         if(Result[i].順位 < 100000) R_X += 15;
         Texts(Result[i].順位+"位",R_X);
         R_X = 180;
         if(Result[i].ポイント < 10) R_X += 15;
         if(Result[i].ポイント < 100) R_X += 15;
         if(Result[i].ポイント < 1000) R_X += 15;
         if(Result[i].ポイント < 10000) R_X += 15;
         Texts(Result[i].ポイント+"ポイント",R_X);
         R_X = 380;
         Texts(Result[i].名前,R_X);
         Numbers += 35;
       }

       Label1.addEventListener("touchstart",function(){
         core.popScene();
         return;
       })

       UP1.addEventListener("touchstart",function(){
         core.replaceScene(RankingScene(Datas,Number-1));
         return;
       })

       UP2.addEventListener("touchstart",function(){
         core.replaceScene(RankingScene(Datas,Number-1));
         return;
       })

       DOWN1.addEventListener("touchstart",function(){
         core.replaceScene(RankingScene(Datas,Number+1));
         return;
       })

       DOWN2.addEventListener("touchstart",function(){
         core.replaceScene(RankingScene(Datas,Number+1));
         return;
       })

       return scene;
    };
    var ChangeScene = function(){
       var scene = new Scene();                                // 新しいシーンを作る

       var Background = new Sprite(600,600);
       Background.image = core.assets["../画像/背景.png"];
       Background.x = 0;
       Background.y = 0;
       scene.addChild(Background);

       var S_Input1 = new Entity();
       S_Input1.moveTo(150,100);
       S_Input1.width = 300;
       S_Input1.height = 30;
       S_Input1._element = document.createElement('input');
       S_Input1._element.value = "他の端末からこの端末へデータを移行";
       S_Input1._element.type = "submit";
       scene.addChild(S_Input1);

        var S_Input2 = new Entity();
        S_Input2.moveTo(150,200);
        S_Input2.width = 300;
        S_Input2.height = 30;
        S_Input2._element = document.createElement('input');
        S_Input2._element.value = "この端末から他の端末へデータを移行";
        S_Input2._element.type = "submit";
        scene.addChild(S_Input2);

        var S_Input3 = new Entity();
        S_Input3.moveTo(150,520);
        S_Input3.width = 300;
        S_Input3.height = 30;
        S_Input3._element = document.createElement('input');
        S_Input3._element.value = "やめる";
        S_Input3._element.type = "submit";
        scene.addChild(S_Input3);

       var S_Input4 = new Entity();
       S_Input4.moveTo(1500,1500);
       S_Input4.width = 300;
       S_Input4.height = 30;
       S_Input4._element = document.createElement('input');
       S_Input4._element.type = "text";
       S_Input4._element.name = "myText";
       scene.addChild(S_Input4);

       S_Input1.addEventListener("touchstart",function(){
         S_Input4.moveTo(150,300);
         S_Input4._element.value = "";
         S_Input4._element.placeholder = "ここにIDを入力";
         S_Input3._element.value = "引継ぎ";
         return;
       })

       S_Input2.addEventListener("touchstart",function(){
         S_Input4.moveTo(150,300);
         S_Input4._element.value = ID;
         S_Input4._element.placeholder = "あなたのID";
         S_Input3._element.value = "やめる";
         return;
       })

       S_Input3.addEventListener("touchstart",function(){
         if(S_Input3._element.value == "引継ぎ"){
           ID = S_Input4._element.value;
           window.localStorage.setItem("ID",ID);
         }
         core.popScene();
         return;
       })

       return scene;
    };
    var CountdownScene = function(){
       var scene = new Scene();                                // 新しいシーンを作る

       var Background = new Sprite(600,600);
       Background.image = core.assets["../画像/黒半透明.png"];
       Background.x = 0;
       Background.y = 0;
       scene.addChild(Background);

       var Label1 = new Label();
       Label1.font  = "100px monospace";
       Label1.text = "四";
       Label1.width = Label1.text.length * 100;
       Label1.height = 100;
       Label1.x = width/2 - Label1.text.length * 50;
       Label1.y = width/2 - 75;
       Label1.backgroundColor = "white";
       Label1.color = "green";
       scene.addChild(Label1);

       core.fps = 1;

       Label1.addEventListener("enterframe",function(){
         switch (Label1.text) {
           case "四":
             Label1.text = "三";
             break;
           case "三":
             Label1.text = "二";
             break;
           case "二":
             Label1.text = "一";
             break;
           case "一":
             Label1.text = "スタート！";
             Label1.width = Label1.text.length * 100;
             Label1.x = width/2 - Label1.text.length * 50;
             break;
           case "スタート！":
             core.fps = 30;
             core.popScene();
             break;
         }
       })

       return scene;
    };
    var ID = window.localStorage.getItem("ID");
    if(!ID){
      Name = "名無し";
      var Codes = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",
      "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
      "1","2","3","4","5","6","7","8","9"];
      ID = "";
      for (var i = 0; i < 10; i++) {
        ID += Codes[rand(Codes.length)];
      }
      window.localStorage.setItem("ID",ID);
    }
    else Name = window.localStorage.getItem("Name");
    core.replaceScene(StartScene(Name));
  }
  core.start()
}
