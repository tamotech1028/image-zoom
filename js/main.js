
$(function(){

    //ダークモードの処理
    let $body = $('body'),
        $darkMode = $('.darkMode'),
        $darkMode_trigger = $darkMode.find('.darkMode_trigger');

    //クリックイベントを設定
    $darkMode_trigger.on('click',function(){
        $(this).toggleClass('darkModeActive');
        if($(this).hasClass('darkModeActive')){
            $body.addClass('dark');
        } else {
            $body.removeClass('dark');
        }
    });



    //スティッキーヘッダーの処理
    $('header').each(function(){
        var $window = $(window),
            $header = $(this),
            headeBoxTop = $header.offset().top;
        $window.on('scroll',function(){
            if($window.scrollTop()>headeBoxTop){
                $header.addClass('sticky');
            } else {
                $header.removeClass('sticky');
            }
        });
        $window.trigger('scroll');
    });

    //上へスムーズスクロールするための処理
    $('.backTop').each(function(){

        var $window = $(window);

        //上へ戻るボタンの出現設定
        $window.on('scroll', function(){
            //スクロール量が100px以上ならto-topクラスを追加
            if ($(this).scrollTop() < 100 ){
                $('.backTop').removeClass('to-top');
            } else {
                $('.backTop').addClass('to-top');
            }
        });

        //scrollTop()が適用される要素を取得
        var el = scrollableElement('html','body');

        //クリックされたら一番上に戻る
        $(this).on('click',function(event){
            event.preventDefault();
            $(el).animate({scrollTop: 0},300);
        });

        //scrollTop()が適用される要素を取得する関数
        function scrollableElement(){
            var i, len, el, $el, scrollable;
            for ( i = 0, len = arguments.length; i < len; i++){
                el = arguments[i],
                $el = $(el);
                if ($el.scrollTop() > 0){
                    return el;
                } else {
                    $el.scrollTop(1);
                    scrollable = $el.scrollTop() > 0;
                    $el.scrollTop(0);
                    if (scrollable){
                        return el;
                    }
                }
            }
            return [];
        }
        
        //ウィンドウのスクロールイベントを発生させる
        $window.trigger('scroll');

    });


});