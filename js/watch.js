var startStopFlag = 0; // スタート・ストップのフラグ
var restartFlag = 0; // 再開判定用のフラグ
var startTime; // スタート時間
var restartTime; //再開時間
var stopTime; //止めた時間
var interval;

function clickButton() {
    var flagButton = document.getElementById('FlagButton');

    if (startStopFlag == 0) { // スタートボタンを押した
        if (restartFlag == 0) {
            startTime = new Date(); // スタート時間を退避
        }
        
        restartTime = new Date(); //リスタートした時間

        startStopFlag = 1;
        flagButton.value = "ストップ"
        interval = setInterval("elapsedTime()", 1000);
    } else { // ストップボタンを押した
        
        stopTime = new Date(); // 停止した時間を退避
        //elapsedTime();
        startStopFlag = 0;
        restartFlag = 1;
        flagButton.value = "スタート";
        clearInterval(interval);
    }
}

function stopButton() {
    restartFlag = 0;
    watch.innerHTML = "00:00:00";

}

function lapButton() {
    alert("ラップボタンはテスト中です。")
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

    var watch = document.getElementById('watch');
    watch.innerHTML = H.slice(-2) + ":" + M.slice(-2) + ":" + S.slice(-2);
}
