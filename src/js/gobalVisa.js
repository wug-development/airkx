$(function() {
    var head_menuLi = $("#head_menu li").eq(1);
    var head_bottom_ul = $(".head-bottom ul");


    head_menuLi.addClass('active-bji');
    head_bottom_ul.eq(1).addClass('active')
    head_bottom_ul.children().eq(4).addClass('active-borb').children().children().addClass('active')

    var num = 1;
    var n = 1;
    var $swiper_wrapper=$(".swiper-wrapper");
    $(".swiper-button-next").click(function() {
        num++;
        if (num == 7) {
            num = 0;
            $swiper_wrapper.css("left", -408 * num);
            num++;
            $swiper_wrapper.stop().animate({ "left": -408 * num });
        }
        $swiper_wrapper.stop().animate({ "left": -408 * num });
        n = num;
    });
    $(".swiper-button-prev").click(function() {
        n--;
        if (n == -1) {
            n = 6;
            $swiper_wrapper.css("left", -408 * n);
            n--;
            $swiper_wrapper.stop().animate({ "left": -408 * n });
        }
        $swiper_wrapper.stop().animate({ "left": -408 * n });
        num = n;
    })
    setInterval(function() {
        num++;
        if (num >= 7) {
            num = 0;
            $swiper_wrapper.css("left", -408 * num);
            num++;
            $swiper_wrapper.stop().animate({ "left": -408 * num });
        }
        $swiper_wrapper.stop().animate({ "left": -num * 408 })
        n = num
    }, 3000)


    _hover('.hotarea-nav', 'active-bor-b', '.continent-box')


    /*   Word_map */
    //亚洲
    $("#world_asia").show();
    $('.world-map-wrap').css({ 'background-position': '0 -' + 1116 + 'px' });
    switchContinents('#asia', 1116, 'li#world_asia');
    //非洲
    switchContinents('#africa', 2790, '#world_africa');
    //欧洲
    switchContinents('#europe', 1674, '#world_europe');
    //澳洲
    switchContinents('#oceania', 2232, '#world_oceania');
    //美洲
    switchContinents('#america', 558, '#world_american');


    var messages_wrapLiFir = '<li>\
                        <p>用户张亚* 132****7321 | 2018-06-01</p>\
                        <span>预订了利比亚商务包签</span>\
                    </li>\
                    <li>\
                        <p>用户王* 131****2321 | 2018-06-01</p>\
                        <span>预订了利比亚商务包签</span>\
                    </li>\
                    <li>\
                        <p>用户白义* 135****2229 | 2018-06-04</p>\
                        <span>预订了利比亚商务包签</span>\
                    </li>\
                    <li>\
                        <p>用户周璐* 137****6621 | 2018-06-04</p>\
                        <span>预订了利比亚商务包签</span>\
                    </li>\
                    <li>\
                        <p>用户王馨* 135****3321 | 2018-06-05</p>\
                        <span>预订了利比亚商务包签</span>\
                    </li>\
                    <li>\
                        <p>用户武* 132****7321 | 2018-06-06</p>\
                        <span>预订了利比亚商务包签</span>\
                    </li>\
                    <li>\
                        <p>用户郑* 132****7321 | 2018-06-06</p>\
                        <span>预订了利比亚商务包签</span>\
                    </li>';

    var messages_wrapLiSec = '<li>\
                        <p>用户陈义* 132****7321 | 2018-06-06</p>\
                        <span>预订了利比亚商务包签</span>\
                    </li>\
                    <li>\
                        <p>用户张亚* 132****7321 | 2018-06-07</p>\
                        <span>预订了利比亚商务包签</span>\
                    </li>\
                    <li>\
                        <p>用户陈义* 132****7321 | 2018-06-07</p>\
                        <span>预订了利比亚商务包签</span>\
                    </li>\
                    <li>\
                        <p>用户张亚* 132****7321 | 2018-06-08</p>\
                        <span>预订了利比亚商务包签</span>\
                    </li>\
                    <li>\
                        <p>用户郑* 132****7321 | 2018-06-11</p>\
                        <span>预订了利比亚商务包签</span>\
                    </li>\
                    <li>\
                        <p>用户周璐* 132****7321 | 2018-06-11</p>\
                        <span>预订了利比亚商务包签</span>\
                    </li>\
                    <li>\
                        <p>用户王馨* 132****7321 | 2018-06-12</p>\
                        <span>预订了利比亚商务包签</span>\
                    </li>';

    var messages_wrap = 0;
    var $messages_wrap = $("#messages_wrap");
    $messages_wrap.append(messages_wrapLiSec)
    setInterval(function() {
        $messages_wrap.html("")
        messages_wrap++;
        if (messages_wrap == 1) {
            $messages_wrap.append(messages_wrapLiFir)

        } else if (messages_wrap == 2) {
            $messages_wrap.append(messages_wrapLiSec)

        }
        if (messages_wrap == 2) {
            messages_wrap = 0;
        }

    }, 2000)


    _.ajax({
        url: '/ListCountryServlet',
        type: 'post',
        dataType: 'json',
        success: function(data) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].location == "亚洲") {
                    var eSpan = document.createElement("span");
                    eSpan.innerHTML += data[i].name
                    $("#world_asia ul li").append(eSpan)
                }else if(data[i].location == "欧洲"){
                	var eSpan = document.createElement("span");
                    eSpan.innerHTML += data[i].name
                    $("#world_europe ul li").append(eSpan)
                }else if(data[i].location == "非洲"){
                	var eSpan = document.createElement("span");
                    eSpan.innerHTML += data[i].name
                    $("#world_africa ul li").append(eSpan)
                }else if(data[i].location == "美洲"){
                	var eSpan = document.createElement("span");
                    eSpan.innerHTML += data[i].name
                    $("#world_american ul li").append(eSpan)
                }else if(data[i].location == "大洋洲"){
                	var eSpan = document.createElement("span");
                    eSpan.innerHTML += data[i].name
                    $("#world_oceania ul li").append(eSpan)
                }
            }

            $('.world-map-wrap').find('span').click(function(){
            	var val=$(this).html();
            	window.location.href="@@pagepath/visaInformation.html?name="+val
            })
        },
        error: function(error) {
            console.log(error)
        }
    })

    $(".hotarea-sub").find('img').click(function(){
    	var val=$(this).attr('title')
    	window.location.href="@@pagepath/visaInformation.html?name="+val
    })
})



//鼠标滑过效果 obj是传入ul state是传入的添加到class状态名字 oc是需要展示的列表
function _hover(obj, state, oc) {
    var _obj = $(obj).find('li');
    var oc = $(oc).find('li');
    for (var i in _obj) {
        _obj.eq(i).hover(function() {
            $(this).addClass(state).siblings().removeClass(state);
            var _index = $(this).index();
            for (var j = 0; j < oc.length; j++) {
                if (_index == oc.eq(j).index()) {
                    oc.eq(j).stop().fadeIn().siblings().stop().fadeOut();
                }
            }
        })
    }
}





function switchContinents(obj, num, deltaName) { //obj 是操作对象，num是偏移的数值 deltaName是展示的内容
    $(obj).click(function() {
        $('.world-map-wrap').css({ 'background-position': '0 -' + num + 'px' });
        $(deltaName).show().siblings().hide();
    })
}