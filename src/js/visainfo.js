$(function() {
    var name = getUrlParam("name")
    _.ajax({
        url: '/LsitVisaContentBycountryServlet',
        type: 'get',
        dataType: 'json',
        data: { "country": name },
        success: function(data) {
            $(".list").html("")
            $(".visacountry").html(data[0].country);
            $(".contenttitle i").html(data[0].Location)
            $(".contenttitle").find('img').attr("src",data[0].ImgUrl)
            for (var i = 0; i < data.length; i++) {
                var eLi = document.createElement("li");
                if (data[i].name == "暂无") {
                    eLi.innerHTML += '<h3>' + data[i].name + '</h3>';
                    eLi.innerHTML += '<span>有效期:</span>';
                    eLi.innerHTML += '<span class="validity">' + data[i].YXQ + '</span>';
                    eLi.innerHTML += '<span>最多停留:</span>';
                    eLi.innerHTML += '<span class="stay">' + data[i].TLQ + '</span>';
                    eLi.innerHTML += '<span>办理时间:</span>';
                    eLi.innerHTML += '<span class="time">' + data[i].BLSJ + '</span>'
                    eLi.innerHTML += '<span>邀请函:</span>';
                    eLi.innerHTML += '<span class="invitation">' + data[i].YQH + '</span>';
                    eLi.innerHTML += '<span>签证面试:</span>';
                    eLi.innerHTML += '<span class="interview">' + data[i].MS + '</span>';
                    eLi.innerHTML += '<span class="red mg">受理人群:</span>'
                    eLi.innerHTML += '<span class="red acceptance">' + data[i].SLRQ + '</span>';
                    eLi.innerHTML += '<i>' + data[i].price + '</i>';
                } else {
                    eLi.innerHTML += '<h3>' + data[i].name + '</h3>';
                    eLi.innerHTML += '<span>有效期:</span>';
                    eLi.innerHTML += '<span class="validity">' + data[i].YXQ + '</span>';
                    eLi.innerHTML += '<span>最多停留:</span>';
                    eLi.innerHTML += '<span class="stay">' + data[i].TLQ + '</span>';
                    eLi.innerHTML += '<span>办理时间:</span>';
                    eLi.innerHTML += '<span class="time">' + data[i].BLSJ + '</span>'
                    eLi.innerHTML += '<span>邀请函:</span>';
                    eLi.innerHTML += '<span class="invitation">' + data[i].YQH + '</span>';
                    eLi.innerHTML += '<span>签证面试:</span>';
                    eLi.innerHTML += '<span class="interview ">' + data[i].MS + '</span>';
                    eLi.innerHTML += '<span class="red mg">受理人群:</span>'
                    eLi.innerHTML += '<span class="red acceptance">' + data[i].SLRQ + '</span>';
                    eLi.innerHTML += '<i>' + data[i].price + '</i>';
                    eLi.innerHTML += '<button class="btn">申请办理</button>';
                }
                $(".list").append(eLi)
            }
            $(".btn").click(function() {
                var name = $(this).siblings('h3').html();
                window.location.href = "@@pagepath/visadetilinfor.html?name=" + name
            })
        },
        error: function() {
            console.log("错误")
        }
    })

  
    
    $(".select input").click(function(e) {
        e = e || window.event;
        e.stopPropagation();
        $(".selectCity").show();
        $(this).val("");

        $(document).click(function() {
            $(".selectCity").hide();
        })

    });


    // Promise/A规范   异步模式编程   JS中遵循Promise/A规范的函数有 settimeout   ajax  setinterval
    // js两种执行模式：同步模式  异步模式
    // 同步模式：前一个任务执行结束后再执行后一个任务，任务排列顺序和执行完成顺序是一致的
    // 异步模式：每一个任务都有一个或多个回调函数，前一个任务执行结束后，不是执行后一个任务而是执行回调函数，任务排列顺序和任务执行完成顺序不一致

    // Promise/A+规范  ES6 Promise   Jquery-Deferred


    
    _.ajax({
        url: '/ListCountryServlet',
        type: 'get',
        dataType: 'json',
        success: function(data) {
            var arr = data;
            for (var i = 0; i < arr.length; i++) {
                var eLi = document.createElement("li");
                eLi.innerHTML += arr[i].name
                $(".citycontent").append(eLi)
            }
            $(".citycontent li").click(function() {
                var thisval = $(this).html();
                $(".select input").val(thisval)
                $(".selectCity").hide()
                _.ajax({
                    url: '/LsitVisaContentBycountryServlet',
                    type: 'get',
                    dataType: 'json',
                    data: { "country": thisval },
                    success: function(data) {
                        $(".list").html("")
                        $(".visacountry").html(data[0].country);
                        $(".contenttitle i").html(data[0].Location)
                        $(".contenttitle").find('img').attr("src",data[0].ImgUrl)
                        for (var i = 0; i < data.length; i++) {
                            var eLi = document.createElement("li");
                            if (data[i].name == "暂无") {
                                eLi.innerHTML += '<h3>' + data[i].name + '</h3>';
                                eLi.innerHTML += '<span>有效期:</span>';
                                eLi.innerHTML += '<span class="validity">' + data[i].YXQ + '</span>';
                                eLi.innerHTML += '<span>最多停留:</span>';
                                eLi.innerHTML += '<span class="stay">' + data[i].TLQ + '</span>';
                                eLi.innerHTML += '<span>办理时间:</span>';
                                eLi.innerHTML += '<span class="time">' + data[i].BLSJ + '</span>'
                                eLi.innerHTML += '<span>邀请函:</span>';
                                eLi.innerHTML += '<span class="invitation">' + data[i].YQH + '</span>';
                                eLi.innerHTML += '<span>签证面试:</span>';
                                eLi.innerHTML += '<span class="interview">' + data[i].MS + '</span>';
                                eLi.innerHTML += '<span class="red mg">受理人群:</span>'
                                eLi.innerHTML += '<span class="red acceptance">' + data[i].SLRQ + '</span>';
                                eLi.innerHTML += '<i>' + data[i].price + '</i>';
                            } else {
                                eLi.innerHTML += '<h3>' + data[i].name + '</h3>';
                                eLi.innerHTML += '<span>有效期:</span>';
                                eLi.innerHTML += '<span class="validity">' + data[i].YXQ + '</span>';
                                eLi.innerHTML += '<span>最多停留:</span>';
                                eLi.innerHTML += '<span class="stay">' + data[i].TLQ + '</span>';
                                eLi.innerHTML += '<span>办理时间:</span>';
                                eLi.innerHTML += '<span class="time">' + data[i].BLSJ + '</span>'
                                eLi.innerHTML += '<span>邀请函:</span>';
                                eLi.innerHTML += '<span class="invitation">' + data[i].YQH + '</span>';
                                eLi.innerHTML += '<span>签证面试:</span>';
                                eLi.innerHTML += '<span class="interview ">' + data[i].MS + '</span>';
                                eLi.innerHTML += '<span class="red mg">受理人群:</span>'
                                eLi.innerHTML += '<span class="red acceptance">' + data[i].SLRQ + '</span>';
                                eLi.innerHTML += '<i>' + data[i].price + '</i>';
                                eLi.innerHTML += '<button class="btn">申请办理</button>';
                            }
                            $(".list").append(eLi)
                        }
                        $(".btn").click(function() {
                            var name = $(this).siblings('h3').html();
                            window.location.href = "@@pagepath/visadetilinfor.html?name=" + name
                        })
                    },
                    error: function() {
                        console.log("错误")
                    }
                })
            })
        }
    })



})

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