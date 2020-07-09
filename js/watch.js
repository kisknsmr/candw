var startStopFlag = 0; // スタート・ストップのフラグ
var restartFlag = 0; // 再開判定用のフラグ
var startTime; // スタート時間
var lapstartTime; // スタート時間
var restartTime; //再開時間
var laprestartTime; // スタート時間
var stopTime; //止めた時間
var interval;
var lapinterbal;

function clickButton() {
    var flagButton = document.getElementById('FlagButton');
    if (startStopFlag == 0) { // スタートボタンを押した
        if (restartFlag == 0) {
            startTime = new Date(); // スタート時間を退避
            lapstartTime = new Date(); // スタート時間を退避
        }
       
                
        restartTime = new Date(); //リスタートした時間 ALLタイマー
        laprestartTime = new Date(); //リスタート時間　LAPタイマー

        startStopFlag = 1;
        flagButton.value = "ストップ"
        flagButton.style.backgroundColor = '#ff8a8e';

        interval = setInterval("elapsedTime()", 1000);
        lapinterval = setInterval("lapelapsedTime()", 1000);
    } else { // ストップボタンを押した
        stopTime = new Date(); // 停止した時間を退避
        //elapsedTime();
        startStopFlag = 0;
        restartFlag = 1;
        flagButton.value = "▶";
        flagButton.style.backgroundColor = '#05aa73';
        clearInterval(interval);
        clearInterval(lapinterval);
    }
}

function stopButton() {
    var flagButton = document.getElementById('FlagButton');
    flagButton.value = "スタート";
    clearInterval(interval);
    clearInterval(lapinterval);
    startStopFlag = 0;
    restartFlag = 0;
    watch.innerHTML = "00:00:00";
    lapwatch.innerHTML = "00:00:00";
}

function elapsedTime() {
    // スタート時間と現在時間の差分を取得し、時・分・秒・ミリ秒・を抜き出していく
    var nowTime = new Date(); // 経過時間を退避

    if (restartFlag == 0) {
        var elapsed = nowTime.getTime() - startTime.getTime();
    } // 経過時間の差分を取得 
    else {
        var elapsed = nowTime.getTime() - startTime.getTime() - (restartTime.getTime() - stopTime.getTime()); // 再開時間考慮時間の差分を取得
    }

    var H = Math.floor(elapsed / (60 * 60 * 1000)); // 時間取得
    elapsed = elapsed - (H * 60 * 60 * 1000);
    var M = Math.floor(elapsed / (60 * 1000)); // 分取得
    elapsed = elapsed - (M * 60 * 1000);
    var S = Math.floor(elapsed / 1000); // 秒取得
    var MS = elapsed % 1000; // ミリ秒取得

    H = "0" + H;
    M = "0" + M;
    S = "0" + S;
    MS = "" + MS;

    var watch = document.getElementById('watch');
    var lapwatch = document.getElementById('lapwatch');
    watch.innerHTML = H.slice(-2) + ":" + M.slice(-2) + ":" + S.slice(-2);
    //lapwatch.innerHTML = H.slice(-2) + ":" + M.slice(-2) + ":" + S.slice(-2);
}

function lapelapsedTime() {
    // スタート時間と現在時間の差分を取得し、時・分・秒・ミリ秒・を抜き出していく
    var nowTime = new Date(); // 経過時間を退避

    if (restartFlag == 0) {
        var lapelapsed = nowTime.getTime() - startTime.getTime();
    } // 経過時間の差分を取得 
    else {
        var lapelapsed = nowTime.getTime() - lapstartTime.getTime() - (laprestartTime.getTime() - stopTime.getTime()); // 再開時間考慮時間の差分を取得
    }

    var lapelapsed = nowTime.getTime() - lapstartTime.getTime();
    var H = Math.floor(lapelapsed / (60 * 60 * 1000)); // 時間取得
    lapelapsed = lapelapsed - (H * 60 * 60 * 1000);
    var M = Math.floor(lapelapsed / (60 * 1000)); // 分取得
    lapelapsed = lapelapsed - (M * 60 * 1000);
    var S = Math.floor(lapelapsed / 1000); // 秒取得
    var MS = lapelapsed % 1000; // ミリ秒取得

    H = "0" + H;
    M = "0" + M;
    S = "0" + S;
    MS = "" + MS;

    var lapwatch = document.getElementById('lapwatch');
    lapwatch.innerHTML = H.slice(-2) + ":" + M.slice(-2) + ":" + S.slice(-2);
}
