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
})()

var _hmt = _hmt || [];
(function() {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?beb7b2efca8d11fd0c524903355d8969";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})();