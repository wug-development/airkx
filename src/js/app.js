function loadSwiper (obj) {
    let _defualt = {
        box: '.swiper-container',
        loop: true,
        autoplay: 4000
    }
    Object.assign(_defualt, obj)
    var mySwiper = new Swiper(_defualt.box,{
        pagination: '.pagination',
        loop: _defualt.loop,
        autoplay: _defualt.autoplay,
        paginationClickable: true,
        onSlideChangeStart: function() {}
    });
}

(() => {
    if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
        window.location.href = "http://m.airkx.com";
    }

    let userID = sessionStorage.getItem("userID")
    if (userID) {
        $.ajax({
            url: '@@apispath/SendUserInfoServlet',
            type: 'post',
            dataType: 'json',
            data: {
                "userID":userID
            },
            error: function() {
                alert("网络错误，请刷新重试")
            }
        })
        .done(function(data) {
            if (location.href.indexOf('personalHomePage') > -1) {
                $('#login_info').show()
                $('#span_loginout').click(function () {
                    sessionStorage.setItem("userID", '')
                    window.location.href = '@@pagepath/index.html'
                })
            } else {
                $('#login_after').show()
            }            
            $('.header_uname').text(data.UserName)
        })
    } else {
        $('#login_before').show()
    }

    window.lessThenIE8 = function () {
	    var UA = navigator.userAgent,
	        isIE = UA.indexOf('MSIE') > -1,
	        v = isIE ? /\d+/.exec(UA.split(';')[1]) : 'no ie';
	    return v < 9;
	}();
	
	//小于ie9执行
	if(lessThenIE8){
		$(window).ready(function(){thrid_codes();});
	}else{
		window.onload = thrid_codes;
	}
})()

function thrid_codes () {
    var _hmt = _hmt || [];
    (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?beb7b2efca8d11fd0c524903355d8969";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
    })();
}
