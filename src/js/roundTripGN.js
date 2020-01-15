$(function() {
    $("#head_menu li").eq(0).addClass('active-bji')
    loading()
    var type = getSessionstorage("type");
    var sCity = getUrlParam("sCity");
    var eCity = getUrlParam("eCity");
    var sTime = getUrlParam("sTime");
    var EDay = getUrlParam("EDay");
    var SDate = getUrlParam("SDate");
    var cityType = getUrlParam("cityType");
    var sportName = getSessionstorage("startCityH").substring(0,getSessionstorage("startCityH").length-5);
    var eportName = getSessionstorage("endCityH");
    var eTime = getUrlParam("eTime");
    var $flytype = $(".flytype");
    var $route = $(".route");
    var $startCitySelect = $("#startCityGN");
    var $endCitySelect = $("#endCityGN");
    $flytype.find("span").html(type);
    $startCitySelect.val(sportName);
    $startCitySelect.siblings('input[type=hidden]').val(sCity);
    $endCitySelect.val(eportName)
    $endCitySelect.siblings('input[type=hidden]').val(cityType + "$" + eCity);
    $("#startTime").val(sTime);
    var $$endTime=$("#endTime");
    if (eTime != "undefined") {
        $$endTime.val(eTime);
        $route.find("img").attr("src", "@@imgpath/route_wf_01.png")
        $route.find('b').eq(1).html("去程" + sTime)
        $route.find('b').eq(2).html("回程" + eTime)
        $$endTime.removeAttr("disabled");
        $$endTime.removeClass("active");
    } else {
        $route.find('b').eq(1).html("去程" + sTime)
        $route.find("img").attr("src", "@@imgpath/route_dc_01.png");
        $$endTime.attr("disabled", "disabled");
        $$endTime.addClass("active");
    }

    $route.find('span').eq(0).html(sportName)
    $route.find('span').eq(1).html(eportName)
    $route.find('b').eq(0).html("(" + type + ")")

    selectGN(sCity, eCity, sTime, removeLoading)

    
    /**
     * 重新选择
     */
    var flySelect = 0;
    $(".flySelect").click(function() {
        if (flySelect == 0) {
            var type = $flytype.find("span").html();
            var sCity = $startCitySelect.siblings('input[type=hidden]').val();
            var eCity = $endCitySelect.siblings('input[type=hidden]').val().split("$")[1];
            var date = $(".eTimeSelect").eq(0).find("input").val();
            var selecB = true;
            if (type == "单程") {

            } else {
                var eDate = $(".eTimeSelect").eq(1).find("input").val();
                var EDay = DateDiff(eDate, date);
                if (EDay < 0) {
                    alert("请输入正确的时间");
                    selecB = false;
                }
            }
            var SDate = date.split("-")[1];
            var cityType = $endCitySelect.siblings('input[type=hidden]').val().split("$")[0];
            $route.find('span').eq(0).html($startCitySelect.val().split("(")[0])
            $route.find('span').eq(1).html($endCitySelect.val())
            $route.find('b').eq(0).html(type)
            $route.find('b').eq(1).html(date)

            if ($(".history").children().length != 0 || $(".history1").children().length != 0) {
                selecB = false;
            }
            if (selecB) {
                flySelect++;
                $(this).addClass("active")
                /**
                 * 国际航线
                 */
                loading();

                selectGN(sCity, eCity, date, removeLoading)

                setTimeout(function() {
                    flySelect = 0;
                    $(".flySelect").removeClass("active")
                }, 1000)

            }
        }
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

    function DateDiff(d1, d2) {
        var day = 24 * 60 * 60 * 1000;
        try {
            var dateArr = d1.split("-");
            var checkDate = new Date();
            checkDate.setFullYear(dateArr[0], dateArr[1] - 1, dateArr[2]);
            var checkTime = checkDate.getTime();

            var dateArr2 = d2.split("-");
            var checkDate2 = new Date();
            checkDate2.setFullYear(dateArr2[0], dateArr2[1] - 1, dateArr2[2]);
            var checkTime2 = checkDate2.getTime();

            var cha = Math.ceil((checkTime - checkTime2) / day);
            return cha;
        } catch (e) {
            return false;
        }
    }
    /**
     * 数组获取最小值
     */
    function arrMin(arr) {
        var min = arr[0];
        var len = arr.length;
        for (var i = 1; i < len; i++) {
            if (arr[i] < min) {
                min = arr[i];
            }
        }
        return min;
    }

    function loading() {
        $("#loading").css("display", "block");
        $(".lineListDetil").empty();
        $(".not-searched-wrap").hide()
    }

    function removeLoading() {
        $("#loading").css("display", "none");
    }

    function CompareDate(d1, d2) {
        return ((new Date(d1.replace(/-/g, "\/"))) >= (new Date(d2.replace(/-/g, "\/"))));
    }
})


/**
 * 出发地三字码,到达地三字码,时间
 */
function selectGN(orgAirportCode, dstAirportCode, date, removeLoading) {
    $.ajax({
            url: '@@apispath/SelectGuonei',
            type: 'post',
            dataType: 'JSON',
            data: {
                "orgAirportCode": orgAirportCode,
                "dstAirportCode": dstAirportCode,
                "date": date
            },
            error: function(data) {
                console.log(data, 1);
                removeLoading();
                $(".not-searched-wrap").css("display", "block");
            }
        })
        .done(function(data) {
            console.log(data)
            if (data == "-1") {
                alert("由于你访问频繁，已禁止您访问，如有问题，请联系客服人员");
                removeLoading();
                $(".not-searched-wrap").css("display", "block");
            } else if (data == "0") {
                alert("您访问的过于频繁，请您稍候再试");
                removeLoading();
                $(".not-searched-wrap").css("display", "block");
            } else {
                if (data.length == 0) {
                    console.log("无航班，可能是当天日期，也可能是没有航班");
                    removeLoading();
                    $(".not-searched-wrap").css("display", "block");
                } else {
                    for (var i = 0; i < data.length; i++) {
                        data[i].jiangluoshijian = data[i].jiangluoshijian.substring(0, 2) + ":" + data[i].jiangluoshijian.substring(2, 4)
                        data[i].qifeishijian = data[i].qifeishijian.substring(0, 2) + ":" + data[i].qifeishijian.substring(2, 4)
                    }
                    for (var i = 0; i < data.length; i++) {
                        for (var k = 0; k < data[i].cangwei.length; k++) {
                            if (parseFloat(data[i].cangwei[k].zhekou) >= 1) {
                                data[i].cangwei[k].zhekou = "全价";
                            } else {
                                data[i].cangwei[k].zhekou = (data[i].cangwei[k].zhekou * 10).toFixed(1) + "折";
                            }
                            if (isNaN(data[i].cangwei[k].zhuangtai)) {
                                data[i].cangwei[k].zhuangtai = "";
                            } else {
                                data[i].cangwei[k].zhuangtai = "仅剩" + data[i].cangwei[k].zhuangtai + "张票"
                            }
                        }
                    }
                    var aircom = [];
                    var jixing = [];
                    for (var i = 0; i < data.length; i++) {
                        aircom.push(data[i].hangbanhao.substring(0, 2))
                    }
                    var GNInFO = data;

                    $.ajax({
                            url: '@@apispath/FindAirComJixingServlet',
                            type: 'get',
                            dataType: 'json',
                            traditional: true,
                            data: {
                                "aircom": aircom
                            },
                            error: function(data) {
                                console.log(data, 2)
                                removeLoading();
                                $(".not-searched-wrap").css("display", "block");
                            }
                        })
                        .done(function(data) {
                            for (var i = 0; i < GNInFO.length; i++) {
                                GNInFO[i].hangkonggongsi = data[i];
                                GNInFO[i].feixingshijian = TimeDifference(GNInFO[i].qifeishijian, GNInFO[i].jiangluoshijian);
                            }


                            $.ajax({
                                    url: '@@apispath/FindAirportNameByCode',
                                    type: 'get',
                                    dataType: 'text',
                                    data: {
                                        "orgAirportCode": orgAirportCode,
                                        "dstAirportCode": dstAirportCode
                                    },
                                    error: function(data) {
                                        console.log(data)
                                        removeLoading();
                                        $(".not-searched-wrap").css("display", "block");
                                    }
                                })
                                .done(function(data) {
                                    for (var i = 0; i < GNInFO.length; i++) {
                                        GNInFO[i].sPort = data.split("-")[0];
                                        GNInFO[i].ePort = data.split("-")[1];
                                    }
                                    var Y = GNInFO[0].cangwei[0].piaojia;
                                    setSessionstorage("Y", Y);
                                    for (var i = 0; i < GNInFO.length; i++) {

                                        if (GNInFO[i].hangkonggongsi.CompanyName == undefined) {
                                            var aircomHtml = '<div class="GNAircom">\
                                            <img src="" alt="">\
                                            <span>暂无信息</span>\
                                        </div>';
                                        } else {
                                            var aircomHtml = '<div class="GNAircom">\
                                            <img src="" alt="">\
                                            <span>' + GNInFO[i].hangkonggongsi.CompanyName.substring(0, 4) + '</span>\
                                        </div>';
                                        }
                                        var html = '<div class="GN">\
                                    <div class="guonei">\
                                        ' + aircomHtml + '\
                                        <div class="GNtype">\
                                            <span>去程</span>\
                                            <b>直飞</b>\
                                        </div>\
                                        <div class="GNjixing">\
                                            <span>' + GNInFO[i].hangbanhao + '</span>\
                                            <b>机型：<i>' + GNInFO[i].jingxing + '</i></b>\
                                        </div>\
                                        <div class="GNSprot">\
                                            <span>' + GNInFO[i].sPort + '</span>\
                                            <b>起飞：' + GNInFO[i].qifeishijian + '</b>\
                                        </div>\
                                        <div class="flyTime">\
                                            <span>飞行' + GNInFO[i].feixingshijian + '</span>\
                                        </div>\
                                        <div class="GNEprot">\
                                            <span>' + GNInFO[i].ePort + '</span>\
                                            <b>起飞：' + GNInFO[i].jiangluoshijian + '</b>\
                                        </div>\
                                        <div class="GNLast">\
                                            <div class="GNprice">\
                                                <div class="GNpriceP"><i>￥</i><span>' + GNInFO[i].cangwei[0].piaojia + '</span>\
                                                    <p>' + GNInFO[i].cangwei[0].zhekou + '</p>\
                                                </div>\
                                                <div class="GNtuoigai">\
                                                    <input type="hidden" value="' + GNInFO[i].hangbanhao.substring(0, 2) + '/' + GNInFO[i].cangwei[0].cangweima + '/' + date + '/' + orgAirportCode + '/' + dstAirportCode + '"/>\
                                                    <span>退改签</span><b>机建+燃油：￥' + (parseInt(GNInFO[i].ranyoufei) + parseInt(GNInFO[i].jijianfei)) + '</b>\
                                                    <div class="GNtuoigaiCon">\
                                                        <div class="GNtuoigaiConTitle">限制条件详情信息</div>\
                                                        <div class="GNtuoigaiConCon"></div>\
                                                    </div>\
                                                </div>\
                                            </div>\
                                            <div class="GNyuding">\
                                                <div class="GNyudingding NOONE">预定</div>\
                                                <div class="GNmore">更多航班▼</div>\
                                            </div>\
                                        </div>\
                                    </div>\
                                    <div class="guoneimore">\
                                    </div>\
                                </div>';
                                        $(".lineListDetil").append(html);
                                        $(".GNAircom").eq(i).find("img").attr("src", GNInFO[i].hangkonggongsi.Picture)
                                        for (var k = 0; k < GNInFO[i].cangwei.length; k++) {
                                            var shtml = ' <div class="guoneimoreList">\
                                            <div class="cangwei">' + GNInFO[i].cangwei[k].cangwei + '</div>\
                                            <div class="GNLast">\
                                                <div class="GNprice">\
                                                    <div class="GNpriceP GNMO"><i>￥</i><span>' + GNInFO[i].cangwei[k].piaojia + '</span>\
                                                        <p>' + GNInFO[i].cangwei[k].zhekou + '</p>\
                                                    </div>\
                                                    <div class="GNtuoigai">\
                                                    <span>退改签</span>\
                                                    <input type="hidden" value="' + GNInFO[i].hangbanhao.substring(0, 2) + '/' + GNInFO[i].cangwei[k].cangweima + '/' + date + '/' + orgAirportCode + '/' + dstAirportCode + '"/>\
                                                    <div class="GNtuoigaiCon">\
                                                        <div class="GNtuoigaiConTitle">限制条件详情信息</div>\
                                                        <div class="GNtuoigaiConCon"></div>\
                                                    </div>\
                                                    </div>\
                                                </div>\
                                                <div class="GNyuding">\
                                                    <div class="GNyudingding">预定</div>\
                                                    <div class="yupiao">' + GNInFO[i].cangwei[k].zhuangtai + '</div>\
                                                </div>\
                                            </div>\
                                        </div>';
                                            $(".guoneimore").eq(i).append(shtml)
                                        }
                                    }
                                    removeLoading();
                                    $(".GNmore").click(function(ev) {
                                        var e = ev || event;
                                        e.stopPropagation();
                                        var $this = $(this)
                                        var GNtarget = $this.parent().parent().parent().siblings();
                                        if (GNtarget.height() <= 0) {
                                            $this.html("更多航班▲")
                                            var Theight = GNtarget.children(".guoneimoreList").length * 62;
                                            GNtarget.stop().animate({ "height": Theight })
                                        } else {
                                            GNtarget.stop().animate({ "height": 0 })
                                            $this.html("更多航班▼")
                                        }
                                        $(document).click(function() {
                                            GNtarget.stop().animate({ "height": 0 });
                                            $this.html("更多航班▼");
                                        })
                                    })
                                    for (var i = 0; i < $(".GNtuoigai span").length; i++) {
                                        $(".GNtuoigai span").eq(i).hoverDelay({
                                            hoverEvent: function() {
                                                var $this = $(this);
                                                $this.addClass("active")
                                                var airlineCode = $this.siblings("input").val().split("/")[0];
                                                var classCode = $this.siblings("input").val().split("/")[1];
                                                var depDate = $this.siblings("input").val().split("/")[2];
                                                var depCode = $this.siblings("input").val().split("/")[3];
                                                var arrCode = $this.siblings("input").val().split("/")[4];
                                                $.ajax({
                                                        url: '@@apispath/SelectTGQservlet',
                                                        type: 'get',
                                                        dataType: 'text',
                                                        data: {
                                                            "airlineCode": airlineCode,
                                                            "classCode": classCode,
                                                            "depDate": depDate,
                                                            "depCode": depCode,
                                                            "arrCode": arrCode
                                                        },
                                                        error: function(data) {}
                                                    })
                                                    .done(function(data) {
                                                        var a = data.split("-")[0];
                                                        var b = data.split("-")[1];
                                                        var c = data.split("-")[2];
                                                        $this.siblings('.GNtuoigaiCon').children(".GNtuoigaiConCon").html(a + "<br>" + b + "<br>" + c);
                                                        $this.siblings('.GNtuoigaiCon').show();
                                                        $this.removeClass('active')
                                                    })
                                            },
                                            outEvent: function() {
                                                var $this = $(this);
                                                $this.removeClass('active');
                                                $this.siblings('.GNtuoigaiCon').children(".GNtuoigaiConCon").html("");
                                                $this.siblings('.GNtuoigaiCon').hide();
                                            }
                                        });
                                    }
                                    $(".GNyudingding").click(function() {
                                        var $this = $(this);
                                        var sCode = orgAirportCode;
                                        var eCode = dstAirportCode;
                                        $.ajax({
                                                url: '@@apispath/FindCityByCodeServlet',
                                                type: 'get',
                                                dataType: 'json',
                                                data: {
                                                    "sCode": sCode,
                                                    "eCode": eCode
                                                }
                                            })
                                            .done(function(data) {
                                                setSessionstorage("chufadi", data.a);
                                                setSessionstorage("daodadi", data.b);
                                                setSessionstorage("type", "国内");
                                                setSessionstorage("date", date);
                                                var tui = $this.parent().siblings().children(".GNtuoigai").find('input').val();
                                                var airlineCode = tui.split("/")[0];
                                                var classCode = tui.split("/")[1];
                                                var depDate = tui.split("/")[2];
                                                var depCode = tui.split("/")[3];
                                                var arrCode = tui.split("/")[4];
                                                $.ajax({
                                                        url: '@@apispath/SelectTGQservlet',
                                                        type: 'get',
                                                        dataType: 'text',
                                                        data: {
                                                            "airlineCode": airlineCode,
                                                            "classCode": classCode,
                                                            "depDate": depDate,
                                                            "depCode": depCode,
                                                            "arrCode": arrCode
                                                        },
                                                        error: function(data) {}
                                                    })
                                                    .done(function(data) {
                                                        setSessionstorage("tuigai", data);
                                                        var target = $this.parent().parent().parent();
                                                        if (target.attr("class") == "guonei") {
                                                            var Target = target;
                                                            setSessionstorage("ranyou", parseInt($this.parent().siblings().children(".GNtuoigai").find('b').html().replace(/[^0-9]/ig, "")));
                                                        } else if (target.attr("class") == "guoneimoreList") {
                                                            var Target = target.parent().siblings('.guonei');
                                                            setSessionstorage("ranyou", parseInt(Target.children(".GNLast").find('.GNprice').children(".GNtuoigai").find('b').html().replace(/[^0-9]/ig, "")));
                                                        }
                                                        setSessionstorage("piaojia", parseInt($this.parent().siblings().children(".GNpriceP").find('span').html().replace(/[^0-9]/ig, "")));
                                                        setSessionstorage("picture", Target.children(".GNAircom").find('img')[0].src);
                                                        setSessionstorage("aircom", Target.children(".GNAircom").find('span').html());
                                                        setSessionstorage("zhuanji", Target.children(".GNtype").find('b').html());
                                                        setSessionstorage("jixing", Target.children(".GNjixing").find('b').find('i').html());
                                                        setSessionstorage("AirCode", Target.children(".GNjixing").find('span').html());
                                                        setSessionstorage("sport", Target.children(".GNSprot").find('span').html());
                                                        setSessionstorage("stime", Target.children(".GNSprot").find('b').html());
                                                        setSessionstorage("eport", Target.children(".GNEprot").find('span').html());
                                                        setSessionstorage("etime", Target.children(".GNEprot").find('b').html());
                                                        if ($this.is(".NOONE")) {
                                                            var cw = $this.parent().parent().parent().siblings().children('.guoneimoreList').eq(0).children('.cangwei').html();
                                                            setSessionstorage("AirCW", cw);
                                                        } else {
                                                            var cw = $this.parent().parent().siblings(".cangwei").html();
                                                            setSessionstorage("AirCW", cw);
                                                        }
                                                        var zhekou = $this.parent().siblings().children(".GNpriceP").find("p").html();
                                                        setSessionstorage("zhekou", zhekou);
                                                        window.location.href = "@@pagepath/personalInformationGN.html";
                                                    })
                                            })
                                    })
                                })
                        })
                }
            }


        })

    function TimeDifference(time1, time2) {
        var min1 = parseInt(time1.substr(0, 2)) * 60 + parseInt(time1.substr(3, 5));
        var min2 = parseInt(time2.substr(0, 2)) * 60 + parseInt(time2.substr(3, 5));
        //两个分钟数相减得到时间部分的差值，以分钟为单位  
        var n = min2 - min1;
        n = Math.floor(n / 60) + "小时" + (n % 60) + "分";
        return n;
    }
}

function setSessionstorage(key, value) {
    window.sessionStorage.setItem(key, value);
}

function getSessionstorage(key) {
    return window.sessionStorage.getItem(key);
}

function getBZ(str) {
    var arr = str.split("、");
    var temp = "";
    for (var i = 0; i < arr.length - 1; i++) {
        var sum = arr[i][arr[i].length - 1];
        temp += sum + "、" + arr[i + 1] + "<br>";
    }
    var temparr = temp.split("<br>")
    for (var i = 0; i < temparr.length - 1; i++) {
        temparr[i] = temparr[i].substring(0, temparr[i].length - 1);
    }
    var rs = temparr.join("<br>");
    return rs;
}