var i = 1;

function appendToTable() {
    var $formObject = document.getElementById("InputForm");
    var $tableObject = document.getElementById("LapTable");
    var $tr = "<tr>";
    var now = new Date()
    $tr += "<td>" + i + "</td>";
    $tr += "<td>" + get_now() + "</td>";
    $tr += "<td>" + watch.innerHTML + "</td>";
    $tr += "<td>" + lapwatch.innerHTML + "</td>";
    $tr += "<td>" + $formObject.workComment.value + "</td>";
    //$tr += "<td>" + $formObject.formName.value + "</td>";
    //$tr += "<td>" + $formObject.formArea.value + "</td>";
    //$tr += "<td>" + $formObject.formAge.value + "</td>";
    //$tr += "<td>" + $formObject.formComent.value + "</td>";
    $tr += "</tr>";
    $tableObject.insertAdjacentHTML("beforeend", $tr);
    lapwatch.innerHTML = "00:00:00";  
    i = i + 1
    lapstartTime = new Date(); // スタート時間を退避
}

function resetTable() {
    var $tableObject = document.getElementById("LapTable");
    var rowLen = $tableObject.rows.length;
    //上の行から削除していくと下の行がずれていくので下から検査
    for (var i = rowLen - 1; i > 0; i--) {
        $tableObject.deleteRow(i);
    }
    i = 1;
}

// 時計のメインとなる関数
function get_now() {
    // 曜日を表す各文字列の配列
    var weeks = new Array("Sun", "Mon", "Thu", "Wed", "Thr", "Fri", "Sat");
    // 現在日時を表すインスタンスを取得
    var now = new Date();
    // 年
    var y = now.getFullYear();
    // 月 0~11で取得されるので実際の月は+1したものとなる
    var mo = now.getMonth() + 1;
    // 日
    var d = now.getDate();
    // 曜日 0~6で日曜始まりで取得されるのでweeks配列のインデックスとして指定する
    var w = weeks[now.getDay()];
    // 時
    var h = now.getHours();
    // 分
    var mi = now.getMinutes();
    // 秒
    var s = now.getSeconds();

    // 日付時刻文字列のなかで常に2ケタにしておきたい部分はここで処理
    if (mo < 10) mo = "0" + mo;
    if (d < 10) d = "0" + d;
    if (mi < 10) mi = "0" + mi;
    if (s < 10) s = "0" + s;

    return h + ":" + mi;
}
