window.customer = ' <div class="kf">\
    <div class="kfr">\
        <div class="kfr-tx">\
            <img src="./images/kf_pic_01.png" alt="" class="tupian">\
        </div>\
        <div class="kf-name">\
            <p>今日客服之星</p>\
            <p><a href="javascript:;" class="kfName"></a></p>\
        </div>\
        <ul class="fw">\
            <li>\
                <i class="kf_01"></i>\
                <span><a href="https://www16.53kf.com/webCompany.php?arg=10173611&kf_sign=zQxMTMTUyMAyMjEwMTg1MDc0NDA4MDA0&style=1" target="_blank">线上咨询</a></span>\
            </li>\
            <li>\
                <i class="qq_01"></i>\
                <span><a href="" target="_blank" class="qqjiaotan">QQ咨询</a></span>\
            </li>\
            <li>\
                <i class="wx_01"></i>\
                <span><a href="javascript:;">微信咨询</a></span>\
                <div class="weixinerweima">\
                    <img src="" alt=""/>\
                </div>\
            </li>\
            <li>\
                <i class="tel_01"></i>\
                <span><a href="javascript:;">电话咨询</a></span>\
                <div class="shoujihao"></div>\
            </li>\
        </ul>\
        </div>\
    </div>';

window.Writecustomer = function() {
    document.write(customer)
    $(".fw").find("li").bind({
        mouseenter: function(event) {
            $(this).find("div").stop().animate({ "opacity": 1 })
        },
        mouseleave: function(event) {
            $(this).find("div").stop().animate({ "opacity": 0 })
        }
    })
    $.ajax({
            url: 'AdminLunhuan',
            type: 'get',
            dataType: 'text',
            error: function() {
                alert("网络错误，请刷新重试")
            }
        })
        .done(function(data) {
            var CLNAME = data;
            $.ajax({
                    url: 'ZdyOrderServlet',
                    type: 'post',
                    dataType: 'json',
                    data:{
                        "CLNAME":CLNAME
                    },
                    error: function() {
                        alert("网络错误，请刷新重试")
                    }
                })
                .done(function(data) {
                    $(".tupian").attr("src",data.tp);
                    $(".qqjiaotan").attr("href","http://sighttp.qq.com/msgrd?v=1&uin="+data.qq+"");
                    $(".kfName").html(CLNAME);
                    $(".weixinerweima").find("img").attr("src",data.wx);
                    $(".shoujihao").html(data.phone);
                    _.setItem('jrzx', data.phone);
                    _.setItem('imgcode', data.wx);
                    $('#sp_header_phone').text(data.phone);
                    $('.img-code').find('img').attr('src', data.wx);
                })
        })
}