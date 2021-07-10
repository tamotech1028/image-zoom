$(function(){
    // ランダムに表示させたいイメージ名を配列に格納
    let thumbnaileFileNameArray = [
        "thumbnail_1",
        "thumbnail_2",
        "thumbnail_3",
        "thumbnail_4",
        "thumbnail_5",
    ];
    // ランダム表示させたいimg要素を定義
    let $thumbnaileImgElement = $("#random_thumbnaile img");

    // 関数の実行
    randomImage(thumbnaileFileNameArray, $thumbnaileImgElement)
});


/****************************
ランダム表示する関数
第１引数：イメージ名配列
第２引数：イメージ要素（jQuery型）
*****************************/
function randomImage ( imgArray, $target){
    var num = Math.random();
    num = Math.floor(num * imgArray.length);
    $target.attr("src", "img/" + imgArray[num] + ".jpg");
};