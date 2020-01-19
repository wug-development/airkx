$(function() {
    function getUrlParam(key) {
        // 获取参数
        var url = window.location.search;
        // 正则筛选地址栏
        var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
        // 匹配目标参数
        var result = url.substr(1).match(reg);
        //返回参数值
        return result ? decodeURIComponent(result[2]) : null;
    }
    var name = getUrlParam("name")
    var $title = $(".title");
    _.ajax({
        url: '/ListVisaContentByNameServlet',
        type: 'get',
        dataType: 'json',
        data: { name: name },
        success: function(data) {
            $title.find('h3').html(data[0].name)
            $title.find('i').html(data[0].price)
            $title.find('.validity').html(data[0].YXQ)
            $title.find('.stay').html(data[0].TLQ)
            $title.find('.time').html(data[0].BLSJ)
            $title.find('.invitation').html(data[0].YQH)
            $title.find('.interview').html(data[0].MS)
            $title.find('.invisa').html(data[0].RJGD)
            $title.find('img').attr("src", data[0].ImgUrl)
            $title.find('button').click(function() {
                var name = $(this).siblings('h3').html();
                window.location.href = "makevisa.html?name=" + name
            })
        }
    })
})