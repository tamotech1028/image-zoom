$(function(){

    const $originImg = $("#original-img"),
          $zoomImg = $("#zoom-img"),
          $zoomCursor = $("#zoom-cursor");

    /* 
    * zoom関数の実行
    * 第１引数：ズーム倍率
    * 第２引数：元画像の親要素
    * 第３引数：ズーム画像の親要素
    * 第４引数：ズーム範囲指定カーソル要素
    */
    zoom(10, $originImg, $zoomImg, $zoomCursor);
});

function zoom (zoomRate, $originImg, $zoomImg, $zoomCursor) {

    // ズームカーソルの範囲設定
    $zoomCursor.css({
        "width"  : $originImg.width() / zoomRate,
        "height" : $originImg.height() / zoomRate
    });

    // ズーム後の画像のサイズ設定
    $zoomImg.find("img").css({
        "width"  : ($originImg.width() + 2) * zoomRate,
        "height" : ($originImg.height() + 2)  * zoomRate
    });

    const originImgTopPositon = $originImg.offset().top,                        // 元画像上端位置
          originImgBottomPositon = originImgTopPositon + $originImg.height(),   // 元画像下端位置
          originImgLeftPositon = $originImg.offset().left,                      // 元画像左端位置
          originImgRightPositon = originImgLeftPositon + $originImg.width(),    // 元画像右端位置

          zoomCursorWidth = $zoomCursor.width(),        // 範囲指定カーソル幅
          zoomCursorHeight = $zoomCursor.height();      // 範囲指定カーソル高さ
        
    // カーソルが元画像要素の上に来ている時の処理
    $originImg.on('mousemove', function(e) {

        // 現在のカーソル位置の取得
        let mouseX = e.pageX,
            mouseY = e.pageY;

        //横方向の微調整    
        if (mouseX <= originImgLeftPositon + zoomCursorWidth / 2 ) {
            // カーソルが元画像の左端にいる時のカーソル位置の設定
            mouseX = originImgLeftPositon;

        } else if (mouseX >= originImgRightPositon - zoomCursorWidth / 2 ) {
            // カーソルが元画像の右端にいる時のカーソル位置の設定
            mouseX = originImgRightPositon - zoomCursorWidth;

        } else {
            // カーソルが元画像の中央付近にいる時のカーソル位置の設定
            mouseX -= (zoomCursorWidth / 2);
        }

        //縦方向の微調整
        if (mouseY <= originImgTopPositon + zoomCursorHeight / 2) {
            // カーソルが元画像の上端にいる時のカーソル位置の設定
            mouseY = originImgTopPositon;
        } else if (mouseY >= originImgBottomPositon - zoomCursorHeight / 2) {
            // カーソルが元画像の下端にいる時のカーソル位置の設定
            mouseY = originImgBottomPositon - zoomCursorHeight;
        } else {
            // カーソルが元画像の中央付近にいる時のカーソル位置の設定
            mouseY -= (zoomCursorHeight / 2);
        }

        // カーソルの位置設定
        $zoomCursor.css({
            "left" : mouseX,
            "top"  : mouseY
        });
        $zoomCursor.show();

        // ズーム画像の位置設定
        $zoomImg.find("img").css({
            "left" : - (mouseX - originImgLeftPositon) * zoomRate,
            "top"  : - (mouseY - originImgTopPositon) * zoomRate
        });
        $zoomImg.find("img").show();

    });

    // カーソルが元画像要素の上から離れた時の処理
    $originImg.on('mouseout', function(e) {
        $zoomCursor.hide();
        $zoomImg.find("img").hide();
    });
}