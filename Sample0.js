function MyFunction1() { //現在日時を取得する
    document.getElementById("txt").innerHTML=Date();               
}

function func1() { //計算
    var input_num = document.getElementById("input_num").value;
    var input_num1 = input_num * 6;
    var input_num2 = Math.round((input_num * 6 / 10800) * 10) / 10;
    document.getElementById("output1").innerHTML=input_num1;
    document.getElementById("output2").innerHTML=input_num2;
}

function cal2() {    
   let obj = document.getElementById("Bid");
    let w = ocj.getBoundingClientRect().width;
    alert("幅は" + w + "です");
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
    var vol = document.getElementById("input_num").value;
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
            W_kihon = 520;
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
            
        w_sum = Math.round((w_sum + W_kihon) * 1.1);
        s_sum = Math.round((s_sum + S_kihon)* 1.1);

        document.getElementById("cal_test").innerHTML= "水道料金は"+ w_sum + "円、下水道料金は" + s_sum +"円です。" ;
}



