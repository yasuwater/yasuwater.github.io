window.onload = function(){
    document.getElementById("square-button").onclick = function() {
        this.classList.toggle("blue");
      };
  };



function func1() { //計算
    var input_num = document.getElementById("input_num").value;
    var input_num1 = input_num * 6;
    var input_num2 = Math.round((input_num * 6 / 10800) * 10) / 10;
    document.getElementById("output1").innerHTML=input_num1;
    document.getElementById("output2").innerHTML=input_num2;
}

let kaido = 0 //バルブ開度
let suiryo = 0 //瞬間的な水量(L/sec)
let sum_suiryo = 0 //水量の合計
let timer = "" //setinterval用の変数

function sums() {
    sum_suiryo = rnd3(sum_suiryo + suiryo);
    document.getElementById("sum_suiryo").innerHTML=sum_suiryo; 
    cal1();   //料金計算
}

function rnd3(x) { //少数第三位で四捨五入
    return Math.round(x *1000)/1000
}

let d = 0
function kaiten(d1) { //オブジェクトを任意の角度で回転
d = d + d1
document.getElementById("sbtn").style.transform = "rotate(" + d + "deg)";  
}

function clRight() { //蛇口を開く   
    
    kaido = kaido +0.5;
    if(kaido === 10) {      //とりあえず10を全開する        
        document.getElementById("kaido").innerHTML=kaido + "(全開)";
        kaiten(22.5); 
    } else if(kaido < 10){
        kaiten(22.5);        
        wChange(5);     
        document.getElementById("kaido").innerHTML=kaido;
    } else { //開度が10より大きい
        kaido = 10
    }       
    suiryo = rnd3(kaido / 10 * 0.035);  　//開度に応じて瞬時の水量を計算
    document.getElementById("suiryo").innerHTML=suiryo;

    clearInterval(timer);
    timer = setInterval(sums,100);
}


function clLeft() { //蛇口を閉める
    kaido = kaido - 0.5;
    if(kaido === 0) {     
        document.getElementById("kaido").innerHTML=kaido + "(全閉)";
        kaiten(-22.5);   
        wChange(-5); 
        clearInterval(timer);
        kaido  = 0
    } else if(kaido > 0){
        kaiten(-22.5);   
        wChange(-5); 
        document.getElementById("kaido").innerHTML=kaido;
        clearInterval(timer);
        timer = setInterval(sums,100);    
    } else if(kaido < 0) {        
        kaido = 0
        clearInterval(timer); 
    }       
    suiryo = rnd3(kaido / 10 * 0.035); ////少数第三位で四捨五入
    document.getElementById("suiryo").innerHTML=suiryo;


}

function wChange(adds) {    //widthを取得して変更する
    let obj = document.getElementById("drop_anime");
    //let w = obj.getBoundingClientRect().width;
    //alert("幅は" + w + "です");
    //obj.style.width = (w + adds) + "px";
    let w = kaido / 10 * 100

    if(kaido === 0){
        obj.style.width = 0 + "px";
    } else {
        obj.style.width = w + "px";
    }
    
 }
 
function chk1(val) {    
    
    let vol_avg = 0;    
    
    switch (val) {
        case "1":
            vol_avg = 8.2*2;
            break;
        case "2":
            vol_avg = 15.9*2;
            break;
        case "3":
            vol_avg = 20.4*2;
            break;
        case "4":
            vol_avg = 24.3*2;
            break;
        case "5":
            vol_avg = 28.5*2;
            break;
        case "6":
            vol_avg = 33.9*2;
            break;
    }
    document.getElementById("fam_cnt").innerHTML=val;
    document.getElementById("avg").innerHTML=vol_avg;

}

function cal1() { //水道料金を計算
    //const vol = 1040;
    //var vol = document.getElementById("input_num").value;
    let vol = sum_suiryo / 1000
    let w_sum = 0;  //水道料金
    let s_sum = 0;  //下水道料金
    let city = "okazaki"; //地域指定
    //水道料金の変数
    let W_kihon = 0;
    let W_level = [0];　//使用水量単位を設定
    let W_tanka = [0]; //使用水量単位に対応する料金単価を設定
    //下水道料金の変数
    let S_kihon = 0;
    let S_level = [0];　//使用水量単位を設定
    let S_tanka = [0]; //使用水量単位に対応する料金単価を設定

    switch (city) {　//地域別に単価を設定
        case "tokyo":  
            w_kihon = 860;
            w_level = [0,5,10,20,30,50,100,200,1000];
            w_tanka = [0,0,22,128,163,202,213,298,372];
            S_kihon = 1232;
            S_level = [0,40,60,100];
            S_tanka = [0,118.8,176,196.9];
            //alert("東京が選択されました");
            break;
        case "okazaki":
            W_kihon = 0;
            W_level = [0,10,25,50,1000];
            W_tanka = [0,65,127,156,201];
            S_kihon = 700;
            S_level = [0,10,25,50,1000];
            S_tanka = [0,10,105,165,210];
            //alert("大阪が選択されました");
            break;
        case "nagoya":            
            W_kihon = 1375;
            W_level = [0,20,40,60,100];
            W_tanka = [0,11,169.4,233.2,271.7];
            S_kihon = 1232;
            S_level = [0,40,60,100];
            S_tanka = [0,118.8,176,196.9];
            //alert("名古屋が選択されました");
            break;
        default:
    }
    
        if (vol > W_level[W_level.length-1]) {    
            alert("使用数量は" + W_level[W_level.length-1] + "ｍ３以下で入力してください。");        
            console.log(a)
        };

        //水道料金計算
            for (let i = 1; i<W_level.length; i++) {
                if (vol > W_level[i]) {
                    w_sum = w_sum + (W_level[i] - W_level[i-1] )* W_tanka[i]
                } else {
                    w_sum = w_sum + (vol - W_level[i-1])* W_tanka[i]
                    break;
                };        
            };
            
        //下水道料金計算
        for (let i = 1; i<S_level.length; i++) {
            if (vol > S_level[i]) {
                s_sum = s_sum + (S_level[i] - S_level[i-1] )* S_tanka[i]
            } else {
                s_sum = s_sum + (vol - S_level[i-1])* S_tanka[i]
                break;
            };        
        };
            
        w_sum = (w_sum + W_kihon) * 1.1;
        s_sum = Math.round((s_sum + S_kihon)* 1.1);

        w_sum = rnd3(w_sum);

        document.getElementById("cal_test").innerHTML= "水道料金は基本料金＋"+ w_sum + "円です";
}



