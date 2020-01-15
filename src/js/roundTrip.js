$(function() {
    $("#head_menu li").eq(0).addClass('active-bji')
    var head_bottom_ul = $(".head-bottom ul");
    head_bottom_ul.eq(0).addClass('active')
    loading()
    var type = getSessionstorage("type");
    var sCity = getUrlParam("sCity");
    var eCity = getUrlParam("eCity");
    var sTime = getUrlParam("sTime");
    var EDay = getUrlParam("EDay");
    var SDate = getUrlParam("SDate");
    var cityType = getUrlParam("cityType");
    var sportName = getSessionstorage("startCityH").substring(0,getSessionstorage("startCityH").length-5);
    var eportName = getSessionstorage("endCityH").substring(0,getSessionstorage("endCityH").length-5);
    var eTime = getUrlParam("eTime");
    var zhifei = getUrlParam("zhifei");
    var cangwei = getSessionstorage("cangwei");
    var $flytype = $(".flytype");
    var $route = $(".route");
    var $startCitySelect = $("#startCityGW");
    var $endCitySelect = $("#endCityGW");
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
    if (cangwei == "经济舱" || cangwei == "null" || cangwei == null) {
        setTimeout(()=>{
            getAir(sCity, eCity, type, sTime, SDate, EDay, removeLoading, eTime, zhifei)
        },2000)
    } else {
        NOP();
        var $not_searched=$(".not-searched");
        $not_searched.find("p").eq(0).html("·头等舱、商务舱暂不提供实时数据查询，请直接联系客服申请高仓折扣票！010-64060909")
        $not_searched.find("p").eq(1).hide();
        $not_searched.find("p").eq(2).hide();
    }
    //方式选择

    var flytypeB = true;
    $flytype.click(function(ev) {
        var $this = $(this);
        if (flytypeB) {
            var e = ev || event;
            e.stopPropagation()
            $this.find(".flytypeSelect").stop().animate({ "height": 25 });
            $(document).click(function() {
                $this.find(".flytypeSelect").stop().animate({ "height": 0 });
                flytypeB = true;
            })
            flytypeB = false;
            var span=$this.find('span').html();
            if(span=="单程"){
                $this.find(".flytypeSelect").find("b").html("往返");

            }else{
                $this.find(".flytypeSelect").find("b").html("单程");
            }
            $this.find(".flytypeSelect").find("b").click(function(ev) {
                var e = ev || event;
                e.stopPropagation()
                $(this).parent().siblings("span").html($(this).html())
                $(this).parent().stop().animate({ "height": 0 })
                flytypeB = true;
                if ($(this).html() == "单程") {
                    $("#endTime").attr("disabled", "disabled");
                    $("#endTime").addClass("active");
                } else {
                    $("#endTime").removeAttr("disabled");
                    $("#endTime").removeClass("active");
                }
            })
        } else {
            $this.find(".flytypeSelect").stop().animate({ "height": 0 });
            flytypeB = true;
        }
    })
    // $(".not-searched-wrap").css("display", "block") //无票显示
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
            var sTime = $("#startTime").val();
            var eTime = $("#endTime").val();
            if(!sTime || $.trim(sTime).length<1){
            	alert("请选择出发日期");
                selecB = false;
            }
            if (type == "单程") {
                $route.find('b').eq(1).html("去程" + sTime)
                $route.find('b').eq(2).html("")
                $route.find("img").attr("src", "@@imgpath/route_dc_01.png");
                $route.find('b').eq(0).html("(单程)")
            } else {
                var eDate = $(".eTimeSelect").eq(1).find("input").val();
                var EDay = DateDiff(eDate, date);
                if(selecB && (!eTime || $.trim(eTime).length<1)){
                	alert("请选择返程日期");
                    selecB = false;
                }
                if (EDay < 1||eDate=="") {
                	if(selecB){
                        alert("返回日期最少比出发日期晚一天");
                        selecB = false;                		
                	}
                } else {
                    $route.find("img").attr("src", "@@imgpath/route_wf_01.png")
                    $route.find('b').eq(1).html("去程" + sTime)
                    $route.find('b').eq(2).html("回程" + eTime)
                    $route.find('b').eq(0).html("(往返)")
                }
            }
            var SDate = date.split("-")[1];
            var cityType = $endCitySelect.siblings('input[type=hidden]').val().split("$")[0];
            $route.find('span').eq(0).html($startCitySelect.val().split("(")[0])
            $route.find('span').eq(1).html($endCitySelect.val())

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
                var zhifei = false;
                getAir(sCity, eCity, type, date, SDate, EDay, removeLoading, eTime, zhifei)

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

function getAir(sCode, eCode, type, date, SDate, EDay, removeLoading, eTime, zhifei) {
    $.ajax({
            url: '@@apispath/SelectPriceServlet',
            type: 'get',
            dataType: 'json',
            data: {
                "sCode": sCode,
                "eCode": eCode,
                "type": type
            },
            error: function() {
                removeLoading();
                NOP();
            }
        })
        .done(function(data) {
            $(".route").show();
            $(".lineListZ").show();
            $(".not-searched-wrap").hide();
            if (SDate[0] == "0") {
                SDate = SDate[1];
            }
            if (data.hangxian.length == 0) {
                NOP();
                removeLoading();
            } else {
                if (type == "单程") {

                    /**
                     * 处理票价
                     */
                    for (var i = 0; i < data.piaojia.length; i++) {
                        for (var k = 0; k < data.piaojia[i].length; k++) {
                            if (parseInt(data.piaojia[i][k].startM) > parseInt(SDate) || parseInt(data.piaojia[i][k].endM) < parseInt(SDate)) {
                                data.piaojia[i].splice(k, 1)
                                k--;
                            }
                        }
                    }
                    /**
                     * 去掉空的航线信息，以及其他关联信息
                     */
                    for (var i = 0; i < data.hangxian.length; i++) {
                        if (data.hangxian[i].length == 0) {
                            data.hangxian.splice(i, 1);
                            data.jipiao.splice(i, 1);
                            data.piaojia.splice(i, 1);
                            data.zhuanji.splice(i, 1);
                            i--;
                        }
                    }
                    /**
                     * 去除相同航班
                     */
                    // for (var i = 0; i < data.hangxian.length; i++) {
                    //     for (var k = 0; k < data.hangxian[i].length - 1; k++) {
                    //         if (data.hangxian[i][k].AirCode == data.hangxian[i][k + 1].AirCode) {
                    //             data.hangxian[i].splice(k, 1)
                    //             data.zhuanji[i].splice(k, 1)
                    //             i--;
                    //         }
                    //     }
                    // }
                    /**
                     * 选出最低价
                     */
                    for (var i = 0; i < data.piaojia.length; i++) {
                        if (data.piaojia[i].length != 1) {
                            var arr = [];
                            for (var k = 0; k < data.piaojia[i].length; k++) {
                                arr.push(parseInt(data.piaojia[i][k].TicketPrice));
                            }
                            var minP = arrMin(arr);
                            for (var j = 0; j < data.piaojia[i].length; j++) {
                                if (parseInt(data.piaojia[i][j].TicketPrice) != minP) {
                                    data.piaojia[i].splice(j, 1);
                                    j--;
                                }
                            }
                        }
                    }
                    /**
                     * 票价为空，去掉相关联信息
                     */
                    for (var i = 0; i < data.piaojia.length; i++) {
                        if (data.piaojia[i].length == 0) {
                            data.hangxian.splice(i, 1);
                            data.jipiao.splice(i, 1);
                            data.piaojia.splice(i, 1);
                            data.zhuanji.splice(i, 1);
                            i--;
                        }
                    }
                    for (var i = 0; i < data.hangxian.length; i++) {
                        for (var k = 0; k < data.hangxian[i].length; k++) {
                            data.hangxian[i][k].DCS = data.jipiao[i].DCS;
                            data.hangxian[i][k].SandyPrice = data.piaojia[i][0].SandyPrice;
                            data.hangxian[i][k].TicketPrice = data.piaojia[i][0].TicketPrice;
                            data.hangxian[i][k].beizhu = data.piaojia[i][0].beizhu;
                        }
                    }
                    for (var i = 0; i < data.hangxian.length; i++) {
                        for (var k = 0; k < data.hangxian[i].length; k++) {
                            data.hangxian[i][k].zhuanji = data.zhuanji[i][k]
                        }
                    }
                    /**
                     * 查询机型，航空公司信息
                     */
                    var aircom = [];
                    var jixing = [];
                    for (var i = 0; i < data.hangxian.length; i++) {
                        aircom.push(data.hangxian[i][0].CompanyCode)
                        for (var k = 0; k < data.hangxian[i].length; k++) {
                            jixing.push(data.hangxian[i][k].Jixing)
                        }
                    }
                    /**
                     * 将信息汇总，生成一个数组，用于遍历数据
                     */
                    var DCInfo = [];
                    for (var i = 0; i < data.hangxian.length; i++) {
                        DCInfo.push(data.hangxian[i])
                    }

                    /**
                     * 仅查直飞
                     */
                    if (zhifei == "true") {
                        for (var i = 0; i < DCInfo.length; i++) {
                            for (var k = 0; k < DCInfo[i].length; k++) {
                                if (DCInfo[i].length != 0) {
                                    if (DCInfo[i][k].zhuanji != 0) {
                                        DCInfo[i].splice(k, 1);
                                        k--;
                                    }
                                }
                            }
                        }
                        for (var i = 0; i < DCInfo.length; i++) {
                            if (DCInfo[i].length == 0) {
                                DCInfo.splice(i, 1);
                                i--;
                            }
                        }
                    }
                    if (DCInfo.length == 0) {
                        removeLoading();
                        NOP();
                    }
                    $.ajax({
                            url: '@@apispath/FindAirComJixingServlet',
                            type: 'get',
                            dataType: 'json',
                            traditional: true,
                            data: {
                                "aircom": aircom,
                                "jixing": jixing
                            },
                            error: function() {
                                removeLoading();
                                NOP();
                            }
                        })
                        .done(function(data) {
                            for (var i = 0; i < data.airInfo.length; i++) {
                                if (data.airInfo[i].AirName != undefined) {
                                    data.airInfo[i] = data.airInfo[i].AirName + " " + "长/宽" + data.airInfo[i].JXCK + "  " + "座位数" + data.airInfo[i].ZWS
                                } else {
                                    data.airInfo[i] = "";
                                }
                            }
                            for (var i = 0; i < DCInfo.length; i++) {
                                for (var k = 0; k < DCInfo[i].length; k++) {
                                    DCInfo[i][k].aircomInfo = data.aircomInfo[i];
                                    DCInfo[i][k].airInfo = data.airInfo[i];
                                }

                            }
                            for (var i = 0; i < DCInfo.length - 1; i++) {
                                for (var k = 0; k < DCInfo.length - 1 - i; k++) {
                                    if (parseInt(DCInfo[k][0].TicketPrice) > parseInt(DCInfo[k + 1][0].TicketPrice)) {
                                        var temp = DCInfo[k];
                                        DCInfo[k] = DCInfo[k + 1];
                                        DCInfo[k + 1] = temp;
                                    }
                                }
                            }
                            if (zhifei != "true") {
                                DCInfo = danchengpaixu(DCInfo);
                            }
                            for (var i = 0; i < DCInfo.length; i++) {
                                /**
                                 * 航空公司
                                 */
                                if (DCInfo[i][0].aircomInfo.CompanyName == undefined) {
                                    var aircomDC = '<div class="DCAircom">\
                                                        <div class="DCAircomC">\
                                                            <img src="" alt="">\
                                                            <span>暂无信息</span>\
                                                        </div>\
                                                    </div>';
                                } else {
                                    var aircomDC = '<div class="DCAircom">\
                                                        <div class="DCAircomC">\
                                                            <img src="' + DCInfo[i][0].aircomInfo.Picture + '" alt="">\
                                                            <span>' + DCInfo[i][0].aircomInfo.CompanyName.substring(0, 4) + '</span>\
                                                            <input type="hidden" value="' + DCInfo[i][0].CompanyCode + '"/>\
                                                        </div>\
                                                    </div>';
                                }
                                /**
                                 * 直飞
                                 */
                                if (DCInfo[i][0].zhuanji.length == 0) {
                                    /**
                                     * 转机次数
                                     */
                                    var DCtype = '<div class="DCjixing">\
                                                        <div class="DCjixingC">\
                                                            <span>去程</span>\
                                                            <b>直飞</b>\
                                                        </div>\
                                                    </div>';

                                    /**
                                     * 单程的航线
                                     */
                                    var DChangxian = '<div class="DCxingchengListZF">\
                                                            <div class="DCZFhangban">\
                                                                <span>' + DCInfo[i][0].AirCode + '</span>\
                                                                <b>机型：<i>' + DCInfo[i][0].Jixing + '</i></b>\
                                                            </div>\
                                                            <div class="DCZFSPort">\
                                                                <span>' + DCInfo[i][0].SPortName + '</span>\
                                                                <b>起飞：' + DCInfo[i][0].STime + '</b>\
                                                            </div>\
                                                            <div class="DCZFEPort">\
                                                                <span>' + DCInfo[i][0].EPortName + '</span>\
                                                                <b>降落：' + DCInfo[i][0].ETime + '</b>\
                                                            </div>\
                                                        </div>';
                                } else {
                                    /**
                                     * 转机次数
                                     */
                                    var zhuanjiCishu;
                                    if (DCInfo[i][0].zhuanji.length == 1) {
                                        zhuanjiCishu = "一次转机";
                                    } else if (DCInfo[i][0].zhuanji.length == 2) {
                                        zhuanjiCishu = "二次转机";
                                    } else if (DCInfo[i][0].zhuanji.length == 3) {
                                        zhuanjiCishu = "三次转机";
                                    } else if (DCInfo[i][0].zhuanji.length == 4) {
                                        zhuanjiCishu = "四次转机";
                                    } else {
                                        zhuanjiCishu = "多次转机";
                                    }
                                    var DCtype = '<div class="DCjixing">\
                                                        <div class="DCjixingC">\
                                                            <span>去程</span>\
                                                            <b>' + zhuanjiCishu + '</b>\
                                                        </div>\
                                                    </div>';
                                    /**
                                     * 多程的航线
                                     */
                                    var DChangxian = '<div class="DCxingchengList">\
                                                            <div class="DCZFhangban Z">\
                                                                <span>' + DCInfo[i][0].AirCode + '</span>\
                                                                <b>机型：<i>' + DCInfo[i][0].Jixing + '</i></b>\
                                                            </div>\
                                                            <div class="DCZFSPort Z">\
                                                                <span>' + DCInfo[i][0].SPortName + '</span>\
                                                                <b>起飞：' + DCInfo[i][0].STime + '</b>\
                                                            </div>\
                                                            <div class="DCZFEPort Z">\
                                                                <span>' + DCInfo[i][0].EPortName + '</span>\
                                                                <b>降落：' + DCInfo[i][0].ETime + '</b>\
                                                            </div>\
                                                        </div>';
                                    for (var j = 0; j < DCInfo[i][0].zhuanji.length; j++) {
                                        DChangxian += '<div class="DCxingchengList">\
                                                           <div class="DCZFhangban Z">\
                                                                <span>' + DCInfo[i][0].zhuanji[j].AirCode + '</span>\
                                                                <b>机型：<i>' + DCInfo[i][0].zhuanji[j].Jixing + '</i></b>\
                                                            </div>\
                                                            <div class="DCZFSPort Z">\
                                                                <span>' + DCInfo[i][0].zhuanji[j].SPortName + '</span>\
                                                                <b>起飞：' + DCInfo[i][0].zhuanji[j].STime + '</b>\
                                                            </div>\
                                                            <div class="DCZFEPort Z">\
                                                                <span>' + DCInfo[i][0].zhuanji[j].EPortName + '</span>\
                                                                <b>降落：' + DCInfo[i][0].zhuanji[j].ETime + '</b>\
                                                            </div>\
                                                        </div>';
                                    }
                                }

                                /**
                                 * 有无更多航班
                                 */
                                if (DCInfo[i].length == 1) {
                                    var DCMoreCH = "无更多航班";
                                    var DCmoreListLH = "";
                                } else {
                                    var DCMoreCH = "更多航班";
                                    var DCmoreListLH = "";
                                    for (var n = 1; n < DCInfo[i].length; n++) {
                                        /**
                                         * 转机次数
                                         */
                                        var morezhuanjiCishu = "";
                                        if (DCInfo[i][n].zhuanji.length == 0) {
                                            morezhuanjiCishu = "直飞";
                                        } else if (DCInfo[i][n].zhuanji.length == 1) {
                                            morezhuanjiCishu = "一次转机";
                                        } else if (DCInfo[i][n].zhuanji.length == 2) {
                                            morezhuanjiCishu = "二次转机";
                                        } else if (DCInfo[i][n].zhuanji.length == 3) {
                                            morezhuanjiCishu = "三次转机";
                                        } else if (DCInfo[i][n].zhuanji.length == 4) {
                                            morezhuanjiCishu = "四次转机";
                                        } else {
                                            morezhuanjiCishu = "多次转机";
                                        }
                                        /**
                                         * 航班列表
                                         */
                                        var DCmoreListLLCXingchengCH = '<div class="DCmoreListLLCXingchengC">\
                                                                        <div class="DCmoreListLLCXingchengCjixing">\
                                                                            <span>' + DCInfo[i][n].AirCode + '</span>\
                                                                            <b>机型: <i>' + DCInfo[i][n].Jixing + '</i></b>\
                                                                        </div>\
                                                                        <div class="DCmoreListLLCXingchengCSport">\
                                                                            <span>' + DCInfo[i][n].SPortName + '</span>\
                                                                            <b>起飞：' + DCInfo[i][n].STime + '</b>\
                                                                        </div>\
                                                                        <div class="DCmoreListLLCXingchengCSport">\
                                                                            <span>' + DCInfo[i][n].EPortName + '</span>\
                                                                            <b>降落：' + DCInfo[i][n].ETime + '</b>\
                                                                        </div>\
                                                                    </div>';
                                        if (DCInfo[i][n].zhuanji.length != 0) {
                                            for (var m = 0; m < DCInfo[i][n].zhuanji.length; m++) {
                                                DCmoreListLLCXingchengCH += '<div class="DCmoreListLLCXingchengC">\
                                                                        <div class="DCmoreListLLCXingchengCjixing">\
                                                                            <span>' + DCInfo[i][n].zhuanji[m].AirCode + '</span>\
                                                                            <b>机型: <i>' + DCInfo[i][n].zhuanji[m].Jixing + '</i></b>\
                                                                        </div>\
                                                                        <div class="DCmoreListLLCXingchengCSport">\
                                                                            <span>' + DCInfo[i][n].zhuanji[m].SPortName + '</span>\
                                                                            <b>起飞：' + DCInfo[i][n].zhuanji[m].STime + '</b>\
                                                                        </div>\
                                                                        <div class="DCmoreListLLCXingchengCSport">\
                                                                            <span>' + DCInfo[i][n].zhuanji[m].EPortName + '</span>\
                                                                            <b>降落：' + DCInfo[i][n].zhuanji[m].ETime + '</b>\
                                                                        </div>\
                                                                    </div>';
                                            }
                                        }
                                        DCmoreListLH += '<div class="DCmoreListL">\
                                                        <div class="DCmoreListLL">\
                                                            <div class="DCmoreListLLC">\
                                                                <div class="zhuanjicishu">\
                                                                    <span>' + morezhuanjiCishu + '</span>\
                                                                </div>\
                                                                <div class="DCmoreListLLCXingcheng">\
                                                                    ' + DCmoreListLLCXingchengCH + '\
                                                                </div>\
                                                            </div>\
                                                        </div>\
                                                    </div>';
                                    }
                                }
                                var html = '<div class="DC">\
                                                <div class="DCList">\
                                                    ' + aircomDC + '\
                                                    ' + DCtype + '\
                                                    <div class="DCxingcheng">\
                                                        ' + DChangxian + '\
                                                    </div>\
                                                    <div class="DCMore">\
                                                        <div class="DCMoreC">' + DCMoreCH + '</div>\
                                                    </div>\
                                                    <div class="DCprice">\
                                                        <div class="DCpriceC">';
                                                                if (i < 2){
                                                                    html += '<span><i>￥</i>' + DCInfo[i][0].TicketPrice + '<label>限时特价<div>申请特价票下单后请等客服专员电话确认</div></label></span>';
                                                                } else {
                                                                    html += '<span><i>￥</i>' + DCInfo[i][0].TicketPrice + '</span>';
                                                                }
                                                                html += '<b>税金：≈￥' + DCInfo[i][0].DCS + '</b>\
                                                        </div>\
                                                    </div>\
                                                    <div class="DCSure">\
                                                        <div class="DCSureC">\
                                                            <div class="DCSureSure">预定</div>\
                                                            <div class="DCtui">\
                                                                <span>退改签说明▼</span>\
                                                                <div class="tuigai">\
                                                                    <div class="tuigaiT">限制条件详情信息</div>\
                                                                    <div class="tuigaiCon">\
                                                                        ' + getBZ(DCInfo[i][0].beizhu) + '\
                                                                    </div>\
                                                                </div>\
                                                            </div>\
                                                        </div>\
                                                    </div>\
                                                </div>\
                                                <div class="DCmoreList">\
                                                    ' + DCmoreListLH + '\
                                                </div>\
                                            </div>';
                                $(".lineListDetil").append(html)
                            }
                            removeLoading();
                            $(".chenglist").each(function() {
                                $(this).height($(this).children().length * 55)
                            })
                            $(".qucheng").each(function() {
                                $(this).height($(this).children(".chenglist").height())
                            })
                            $(".huicheng").each(function() {
                                $(this).height($(this).children(".chenglist").height())
                            })
                            $(".hangxian").each(function() {
                                $(this).height($(this).children(".qucheng").height() + $(this).children(".huicheng").height())
                            })
                            $(".list").each(function() {
                                $(this).height($(this).children(".hangxian").height())
                            })
                            $(".DCList").each(function() {
                                var $this=$(this);
                                if ($this.children('.DCjixing').children(".DCjixingC").children("b").html() == "直飞") {
                                    $this.height(77)
                                } else {
                                    $this.height($this.children(".DCxingcheng").children(".DCxingchengList").length * 55)
                                }
                            })
                            $(".DCmoreListL").each(function() {
                                $(this).height($(this).children().children().children(".DCmoreListLLCXingcheng").children().length * 45)
                            })
                            for (var i = 0; i < $(".DCtui span").length; i++) {
                                $(".DCtui span").eq(i).hoverDelay({
                                    hoverEvent: function() {
                                        $(this).siblings().show();
                                    },
                                    outEvent: function() {
                                        $(this).siblings().hide();
                                    }
                                });
                            }


                            //each问题
                            $(".DCMoreC").each(function() {
                                var html = $(this).html();
                                if (html == "无更多航班") {
                                    $(this).css("color", "#8f8d8d");
                                }
                            })
                            $(".DCMoreC").click(function(ev) {
                                var e = ev || event;
                                e.stopPropagation();
                                var $this = $(this);
                                var TarGet = $this.parent().parent().siblings();
                                var YShtml = $this.html();
                                if ($this.html() == "更多航班") {
                                    var TarGetHeight = 0;
                                    TarGet.find('.DCmoreListL').each(function() {
                                        TarGetHeight += $(this).height();
                                    })
                                    TarGet.stop().animate({ "height": TarGetHeight })
                                    $(this).html("收回");
                                } else if ($this.html() == "收回") {
                                    TarGet.stop().animate({ "height": 0 })
                                    $this.html("更多航班");
                                }
                                $(document).click(function() {
                                    TarGet.stop().animate({ "height": 0 })
                                    $this.html(YShtml)
                                })
                            })
                            $(".DCmoreList").find(".DCmoreListL").click(function() {
                                var TarGetData = [];
                                var TarGet = $(this).children().children();
                                var zhuanjicishu = TarGet.children(".zhuanjicishu").find('span').html();
                                var TarGetTarGet = TarGet.children('.DCmoreListLLCXingcheng').children('.DCmoreListLLCXingchengC');
                                for (var i = 0; i < TarGetTarGet.length; i++) {
                                    var obj = {};
                                    obj.AirCode = TarGetTarGet.eq(i).children('.DCmoreListLLCXingchengCjixing').find('span').html();
                                    obj.Jixing = TarGetTarGet.eq(i).children('.DCmoreListLLCXingchengCjixing').find('b').find('i').html();
                                    obj.SPortName = TarGetTarGet.eq(i).children(".DCmoreListLLCXingchengCSport").eq(0).find('span').html();
                                    obj.STime = TarGetTarGet.eq(i).children(".DCmoreListLLCXingchengCSport").eq(0).find('b').html();
                                    obj.EPortName = TarGetTarGet.eq(i).children(".DCmoreListLLCXingchengCSport").eq(1).find('span').html();
                                    obj.ETime = TarGetTarGet.eq(i).children(".DCmoreListLLCXingchengCSport").eq(1).find('b').html();
                                    TarGetData.push(obj)
                                }
                                var DChangxian = "";
                                if (zhuanjicishu == "直飞") {
                                    DChangxian = '<div class="DCxingchengListZF">\
                                                        <div class="DCZFhangban">\
                                                            <span>' + TarGetData[0].AirCode + '</span>\
                                                            <b><i>' + TarGetData[0].Jixing + '</i></b>\
                                                        </div>\
                                                        <div class="DCZFSPort">\
                                                            <span>' + TarGetData[0].SPortName + '</span>\
                                                            <b>' + TarGetData[0].STime + '</b>\
                                                        </div>\
                                                        <div class="DCZFEPort">\
                                                            <span>' + TarGetData[0].EPortName + '</span>\
                                                            <b>' + TarGetData[0].ETime + '</b>\
                                                        </div>\
                                                    </div>';
                                } else {
                                    for (var i = 0; i < TarGetData.length; i++) {
                                        DChangxian += '<div class="DCxingchengList">\
                                                            <div class="DCZFhangban Z">\
                                                                <span>' + TarGetData[i].AirCode + '</span>\
                                                                <b>机型：<i>' + TarGetData[i].Jixing + '</i></b>\
                                                            </div>\
                                                            <div class="DCZFSPort Z">\
                                                                <span>' + TarGetData[i].SPortName + '</span>\
                                                                <b>' + TarGetData[i].STime + '</b>\
                                                            </div>\
                                                            <div class="DCZFEPort Z">\
                                                                <span>' + TarGetData[i].EPortName + '</span>\
                                                                <b>' + TarGetData[i].ETime + '</b>\
                                                            </div>\
                                                        </div>';
                                    }
                                }
                                /*以上为下面点击后生成的html*/
                                /*以下为上面点击后生成的html*/
                                var EtarGet = $(this).parent().siblings().children(".DCxingcheng");
                                var EtarGetData = [];
                                if (EtarGet.siblings('.DCjixing').children().find('b').html() == "直飞") {
                                    var EtarGetDataObj = {};
                                    EtarGetDataObj.AirCode = EtarGet.children('.DCxingchengListZF').children('.DCZFhangban').find('span').html();
                                    EtarGetDataObj.Jixing = EtarGet.children('.DCxingchengListZF').children('.DCZFhangban').find('b').find('i').html();
                                    EtarGetDataObj.SPortName = EtarGet.children('.DCxingchengListZF').children('.DCZFSPort').find('span').html();
                                    EtarGetDataObj.STime = EtarGet.children('.DCxingchengListZF').children('.DCZFSPort').find('b').html();
                                    EtarGetDataObj.EPortName = EtarGet.children('.DCxingchengListZF').children('.DCZFEPort').find('span').html();
                                    EtarGetDataObj.ETime = EtarGet.children('.DCxingchengListZF').children('.DCZFEPort').find('b').html();
                                    EtarGetData.push(EtarGetDataObj);
                                } else {
                                    for (var i = 0; i < EtarGet.children('.DCxingchengList').length; i++) {
                                        var EtarGetDataObj1 = {};
                                        EtarGetDataObj1.AirCode = EtarGet.children('.DCxingchengList').eq(i).children('.DCZFhangban').find('span').html();
                                        EtarGetDataObj1.Jixing = EtarGet.children('.DCxingchengList').eq(i).children('.DCZFhangban').find('b').find('i').html();
                                        EtarGetDataObj1.SPortName = EtarGet.children('.DCxingchengList').eq(i).children('.DCZFSPort').find('span').html();
                                        EtarGetDataObj1.STime = EtarGet.children('.DCxingchengList').eq(i).children('.DCZFSPort').find('b').html();
                                        EtarGetDataObj1.EPortName = EtarGet.children('.DCxingchengList').eq(i).children('.DCZFEPort').find('span').html();
                                        EtarGetDataObj1.ETime = EtarGet.children('.DCxingchengList').eq(i).children('.DCZFEPort').find('b').html();
                                        EtarGetData.push(EtarGetDataObj1)
                                    }
                                }
                                if (EtarGetData.length == 1) {
                                    var clickXhuanji = "直飞";
                                } else if (EtarGetData.length == 2) {
                                    var clickXhuanji = "一次转机";
                                } else if (EtarGetData.length == 3) {
                                    var clickXhuanji = "二次转机";
                                } else if (EtarGetData.length == 4) {
                                    var clickXhuanji = "三次转机";
                                } else if (EtarGetData.length == 5) {
                                    var clickXhuanji = "四次转机";
                                }
                                var clickHtml = "";
                                for (var i = 0; i < EtarGetData.length; i++) {
                                    clickHtml += '<div class="DCmoreListLLCXingchengC">\
                                                        <div class="DCmoreListLLCXingchengCjixing">\
                                                            <span>' + EtarGetData[i].AirCode + '</span>\
                                                            <b>机型: <i>' + EtarGetData[i].Jixing + '</i></b>\
                                                        </div>\
                                                        <div class="DCmoreListLLCXingchengCSport">\
                                                            <span>' + EtarGetData[i].SPortName + '</span>\
                                                            <b>' + EtarGetData[i].STime + '</b>\
                                                        </div>\
                                                        <div class="DCmoreListLLCXingchengCSport">\
                                                            <span>' + EtarGetData[i].EPortName + '</span>\
                                                            <b>' + EtarGetData[i].ETime + '</b>\
                                                        </div>\
                                                    </div>';
                                }

                                var clickZhtml = '<div class="DCmoreListLL">\
                                                            <div class="DCmoreListLLC">\
                                                                <div class="zhuanjicishu">\
                                                                    <span>' + clickXhuanji + '</span>\
                                                                </div>\
                                                                <div class="DCmoreListLLCXingcheng">\
                                                                    ' + clickHtml + '\
                                                                </div>\
                                                            </div>\
                                                        </div>';
                                $(this).parent().siblings().children(".DCxingcheng").empty();
                                $(this).parent().siblings().children(".DCxingcheng").append(DChangxian);
                                $(this).parent().siblings().children(".DCxingcheng").siblings('.DCjixing').children().find('b').html(zhuanjicishu)
                                // $(this).parent().append(clickZhtml);
                                $(this).html(clickZhtml);
                                $(".chenglist").each(function() {
                                    $(this).height($(this).children().length * 55)
                                })
                                $(".qucheng").each(function() {
                                    $(this).height($(this).children(".chenglist").height())
                                })
                                $(".huicheng").each(function() {
                                    $(this).height($(this).children(".chenglist").height())
                                })
                                $(".hangxian").each(function() {
                                    $(this).height($(this).children(".qucheng").height() + $(this).children(".huicheng").height())
                                })
                                $(".list").each(function() {
                                    $(this).height($(this).children(".hangxian").height())
                                })
                                $(".DCList").each(function() {
                                    var $this=$(this);
                                    if ($this.children('.DCjixing').children(".DCjixingC").children("b").html() == "直飞") {
                                        $this.height(77)
                                    } else {
                                        $this.height($this.children(".DCxingcheng").children(".DCxingchengList").length * 55)
                                    }
                                })
                                $(".DCmoreListL").each(function() {
                                    $(this).height($(this).children().children().children(".DCmoreListLLCXingcheng").children().length * 45)
                                })
                            })
                            $(".DCSureSure").click(function() {

                                var $this = $(this);
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
                                        var TarGet = $this.parent().parent();
                                        setSessionstorage("picture", TarGet.siblings(".DCAircom").children().find('img')[0].src);
                                        setSessionstorage("aircom", TarGet.siblings(".DCAircom").children().find('span').html());
                                        setSessionstorage("aircomCode", TarGet.siblings(".DCAircom").children().find('input').val());
                                        setSessionstorage("type", "单程");
                                        setSessionstorage("date", date);
                                        setSessionstorage("eTime", eTime);
                                        setSessionstorage("chufadi", data.a);
                                        setSessionstorage("daodadi", data.b);
                                        setSessionstorage("zhuanji", TarGet.siblings(".DCjixing").children().find('b').html());
                                        setSessionstorage("tuigai", $this.siblings().children('.tuigai').children('.tuigaiCon').html());
                                        setSessionstorage("piaojia", parseInt(TarGet.siblings(".DCprice").children().find('span').html().replace(/[^0-9]/ig, "")));
                                        setSessionstorage("shuijin", parseInt(TarGet.siblings(".DCprice").children().find('b').html().replace(/[^0-9]/ig, "")));
                                        var arr = [];
                                        var lineTarGet = TarGet.siblings(".DCxingcheng").children();
                                        for (var i = 0; i < lineTarGet.length; i++) {
                                            var obj = {};
                                            obj.AirCode = lineTarGet.eq(i).children('.DCZFhangban').find('span').html();
                                            obj.jixing = lineTarGet.eq(i).children('.DCZFhangban').find('b').find('i').html();
                                            obj.sport = lineTarGet.eq(i).children('.DCZFSPort').find('span').html();
                                            obj.stime = lineTarGet.eq(i).children('.DCZFSPort').find('b').html();
                                            obj.eport = lineTarGet.eq(i).children('.DCZFEPort').find('span').html();
                                            obj.etime = lineTarGet.eq(i).children('.DCZFEPort').find('b').html();
                                            arr.push(obj)
                                        }
                                        setSessionstorage("airLine", JSON.stringify(arr))
                                        window.location.href = "@@pagepath/personalInformation.html";
                                    })
                            })
                        })
                } else {
                    /**
                     * 处理票价
                     */
                    for (var i = 0; i < data.piaojia.length; i++) {
                        for (var k = 0; k < data.piaojia[i].length; k++) {
                            if (parseInt(data.piaojia[i][k].startM) > parseInt(SDate) || parseInt(data.piaojia[i][k].endM) < parseInt(SDate) || parseInt(data.piaojia[i][k].WFTS) < parseInt(EDay)) {
                                data.piaojia[i].splice(k, 1)
                                k--;
                            }
                        }
                    }


                    /**
                     * 去掉空的航线信息，以及其他关联信息
                     */
                    for (var i = 0; i < data.hangxian.length; i++) {
                        if (data.hangxian[i].length == 0) {
                            data.hangxian.splice(i, 1);
                            data.jipiao.splice(i, 1);
                            data.piaojia.splice(i, 1);
                            data.zhuanji.splice(i, 1);
                            data.hangxianS.splice(i, 1);
                            data.zhuanjiS.splice(i, 1);
                            i--;
                        }
                    }
                    for (var i = 0; i < data.hangxianS.length; i++) {
                        if (data.hangxianS[i].length == 0) {
                            data.hangxian.splice(i, 1);
                            data.jipiao.splice(i, 1);
                            data.piaojia.splice(i, 1);
                            data.zhuanji.splice(i, 1);
                            data.hangxianS.splice(i, 1);
                            data.zhuanjiS.splice(i, 1);
                            i--;
                        }
                    }
                    /**
                     * 票价为空，去掉相关联信息
                     */
                    for (var i = 0; i < data.piaojia.length; i++) {
                        if (data.piaojia[i].length == 0) {
                            data.hangxian.splice(i, 1);
                            data.jipiao.splice(i, 1);
                            data.piaojia.splice(i, 1);
                            data.zhuanji.splice(i, 1);
                            data.hangxianS.splice(i, 1);
                            data.zhuanjiS.splice(i, 1);
                            i--;
                        }
                    }


                    /**
                     * 选出最低价
                     */
                    for (var i = 0; i < data.piaojia.length; i++) {
                        if (data.piaojia[i].length != 1) {
                            var arr = [];
                            for (var k = 0; k < data.piaojia[i].length; k++) {
                                arr.push(parseInt(data.piaojia[i][k].TicketPrice));
                            }
                            var minP = arrMin(arr);
                            for (var j = 0; j < data.piaojia[i].length; j++) {
                                if (parseInt(data.piaojia[i][j].TicketPrice) != minP) {
                                    data.piaojia[i].splice(j, 1);
                                    j--;
                                }
                            }
                        }
                    }
                    for (var i = 0; i < data.piaojia.length; i++) {
                        for (var k = 0; k < data.piaojia[i].length - 1; k++) {
                            if (data.piaojia[i][k].TicketPrice == data.piaojia[i][k + 1].TicketPrice) {
                                data.piaojia[i].splice(k, 1);
                            }
                        }
                    }

                    for (var i = 0; i < data.hangxian.length; i++) {
                        for (var k = 0; k < data.hangxian[i].length; k++) {
                            data.hangxian[i][k].WFS = data.jipiao[i].WFS;
                            data.hangxian[i][k].SandyPrice = data.piaojia[i][0].SandyPrice;
                            data.hangxian[i][k].TicketPrice = data.piaojia[i][0].TicketPrice;
                            data.hangxian[i][k].beizhu = data.piaojia[i][0].beizhu;
                        }
                    }
                    for (var i = 0; i < data.hangxian.length; i++) {
                        for (var k = 0; k < data.hangxian[i].length; k++) {
                            data.hangxian[i][k].zhuanji = data.zhuanji[i][k]
                        }
                    }
                    for (var i = 0; i < data.hangxianS.length; i++) {
                        for (var k = 0; k < data.hangxianS[i].length; k++) {
                            data.hangxianS[i][k].zhuanji = data.zhuanjiS[i][k]
                        }
                    }
                    console.log(data)
                    /**
                     * 查询机型，航空公司信息
                     */
                    var aircom = [];
                    var jixing = [];
                    for (var i = 0; i < data.hangxian.length; i++) {
                        aircom.push(data.hangxian[i][0].CompanyCode)
                        for (var k = 0; k < data.hangxian[i].length; k++) {
                            jixing.push(data.hangxian[i][k].Jixing)
                        }
                    }
                    for (var i = 0; i < data.hangxianS.length; i++) {
                        aircom.push(data.hangxianS[i][0].CompanyCode)
                        for (var k = 0; k < data.hangxianS[i].length; k++) {
                            jixing.push(data.hangxianS[i][k].Jixing)
                        }
                    }
                    var wfdata = {};
                    wfdata.qucheng = data.hangxian;
                    wfdata.huicheng = data.hangxianS;
                    $.ajax({
                            url: '@@apispath/FindAirComJixingServlet',
                            type: 'get',
                            dataType: 'json',
                            traditional: true,
                            data: {
                                "aircom": aircom,
                                "jixing": jixing
                            },
                            error: function() {
                                removeLoading();
                                NOP();
                            }
                        })
                        .done(function(data) {
                            for (var i = 0; i < data.airInfo.length; i++) {
                                if (data.airInfo[i].AirName != undefined) {
                                    data.airInfo[i] = data.airInfo[i].AirName + " " + "长/宽" + data.airInfo[i].JXCK + "  " + "座位数" + data.airInfo[i].ZWS
                                } else {
                                    data.airInfo[i] = "";
                                }
                            }
                            for (var i = 0; i < wfdata.qucheng.length; i++) {
                                for (var k = 0; k < wfdata.qucheng[i].length; k++) {
                                    wfdata.qucheng[i][k].aircomInfo = data.aircomInfo[i];
                                    wfdata.qucheng[i][k].airInfo = data.airInfo[i];
                                }
                            }
                            var huichengair = data.aircomInfo.slice(Math.ceil(data.aircomInfo.length / 2), data.aircomInfo.length);
                            var huichengjixing = data.airInfo.slice(Math.ceil(data.airInfo.length / 2), data.airInfo.length);
                            for (var i = 0; i < wfdata.huicheng.length; i++) {
                                for (var k = 0; k < wfdata.huicheng[i].length; k++) {
                                    wfdata.huicheng[i][k].aircomInfo = huichengair[i];
                                    wfdata.huicheng[i][k].airInfo = huichengjixing[i];
                                }
                            }
                            //机型遍历问题

                            /**
                             * 按价钱排序
                             */
                            for (var i = 0; i < wfdata.qucheng.length - 1; i++) {
                                for (var k = 0; k < wfdata.qucheng.length - 1 - i; k++) {
                                    if (parseInt(wfdata.qucheng[k][0].TicketPrice) > parseInt(wfdata.qucheng[k + 1][0].TicketPrice)) {
                                        var temp = wfdata.qucheng[k];
                                        wfdata.qucheng[k] = wfdata.qucheng[k + 1];
                                        wfdata.qucheng[k + 1] = temp;

                                        var temp1 = wfdata.huicheng[k];
                                        wfdata.huicheng[k] = wfdata.huicheng[k + 1];
                                        wfdata.huicheng[k + 1] = temp1;
                                    }
                                }
                            }
                            if (zhifei != "true") {
                                wfdata = wangfanpaixu(wfdata);
                            }
                            if (zhifei == "true") {
                                for (var i = 0; i < wfdata.qucheng.length; i++) {
                                    for (var k = 0; k < wfdata.qucheng[i].length; k++) {
                                        if (wfdata.qucheng[i].length != 0) {
                                            if (wfdata.qucheng[i][k].zhuanji != 0) {
                                                wfdata.qucheng[i].splice(k, 1);
                                                k--
                                            }
                                        }
                                    }
                                }
                                for (var i = 0; i < wfdata.qucheng.length; i++) {
                                    if (wfdata.qucheng[i].length == 0) {
                                        wfdata.qucheng.splice(i, 1);
                                        i--;
                                    }
                                }

                                for (var i = 0; i < wfdata.huicheng.length; i++) {
                                    for (var k = 0; k < wfdata.huicheng[i].length; k++) {
                                        if (wfdata.huicheng[i].length != 0) {
                                            if (wfdata.huicheng[i][k].zhuanji != 0) {
                                                wfdata.huicheng[i].splice(k, 1);
                                                k--
                                            }
                                        }
                                    }
                                }
                                for (var i = 0; i < wfdata.huicheng.length; i++) {
                                    if (wfdata.huicheng[i].length == 0) {
                                        wfdata.huicheng.splice(i, 1);
                                        i--;
                                    }
                                }
                            }
                            if (wfdata.qucheng.length == 0) {
                                removeLoading();
                                NOP();
                            }




                            for (var i = 0; i < wfdata.qucheng.length; i++) {
                                /**
                                 * 航空公司
                                 */
                                if (wfdata.qucheng[i][0].aircomInfo.CompanyName == undefined) {
                                    var aircomDC = '<div class="aircom">\
                                                        <div class="aircomC">\
                                                            <img src="" alt="">\
                                                            <span>暂无信息</span>\
                                                        </div>\
                                                    </div>';
                                } else {
                                    var aircomDC = '<div class="aircom">\
                                                        <div class="aircomC">\
                                                            <img src="' + wfdata.qucheng[i][0].aircomInfo.Picture + '" alt="">\
                                                            <span>' + wfdata.qucheng[i][0].aircomInfo.CompanyName.substring(0, 4) + '</span>\
                                                            <input type="hidden" value="' + wfdata.qucheng[i][0].CompanyCode + '"/>\
                                                        </div>\
                                                    </div>';
                                }
                                /**
                                 * 转机，去程转机和回程转机
                                 */
                                var quzhuan = "";
                                if (wfdata.qucheng[i][0].zhuanji.length == 0) {
                                    quzhuan = "直飞";
                                } else if (wfdata.qucheng[i][0].zhuanji.length == 1) {
                                    quzhuan = "一次转机";
                                } else if (wfdata.qucheng[i][0].zhuanji.length == 2) {
                                    quzhuan = "二次转机";
                                } else if (wfdata.qucheng[i][0].zhuanji.length == 3) {
                                    quzhuan = "三次转机";
                                } else if (wfdata.qucheng[i][0].zhuanji.length == 4) {
                                    quzhuan = "四次转机";
                                } else if (wfdata.qucheng[i][0].zhuanji.length == 5) {
                                    quzhuan = "五次转机";
                                } else {
                                    quzhuan = "多次转机";
                                }
                                var huizhuan = "";
                                if (wfdata.huicheng[i][0].zhuanji.length == 0) {
                                    huizhuan = "直飞";
                                } else if (wfdata.huicheng[i][0].zhuanji.length == 1) {
                                    huizhuan = "一次转机";
                                } else if (wfdata.huicheng[i][0].zhuanji.length == 2) {
                                    huizhuan = "二次转机";
                                } else if (wfdata.huicheng[i][0].zhuanji.length == 3) {
                                    huizhuan = "三次转机";
                                } else if (wfdata.huicheng[i][0].zhuanji.length == 4) {
                                    huizhuan = "四次转机";
                                } else if (wfdata.huicheng[i][0].zhuanji.length == 5) {
                                    huizhuan = "五次转机";
                                } else {
                                    huizhuan = "多次转机";
                                }

                                /**
                                 * 去程航班,回程航班
                                 */
                                var quhang = '<div class="lineList">\
                                                    <div class="hangban">\
                                                        <span>' + wfdata.qucheng[i][0].AirCode + '</span>\
                                                        <b>机型：<i>' + wfdata.qucheng[i][0].Jixing + '</i></b>\
                                                    </div>\
                                                    <div class="jichangS">\
                                                        <span>' + wfdata.qucheng[i][0].SPortName + '</span>\
                                                        <b>起飞：' + wfdata.qucheng[i][0].STime + '</b>\
                                                    </div>\
                                                    <div class="jichangE">\
                                                        <span>' + wfdata.qucheng[i][0].EPortName + '</span>\
                                                        <b>到达：' + wfdata.qucheng[i][0].ETime + '</b>\
                                                    </div>\
                                                </div>';
                                for (var m = 0; m < wfdata.qucheng[i][0].zhuanji.length; m++) {
                                    quhang += '<div class="lineList">\
                                                    <div class="hangban">\
                                                        <span>' + wfdata.qucheng[i][0].zhuanji[m].AirCode + '</span>\
                                                        <b>机型：<i>' + wfdata.qucheng[i][0].zhuanji[m].Jixing + '</i></b>\
                                                    </div>\
                                                    <div class="jichangS">\
                                                        <span>' + wfdata.qucheng[i][0].zhuanji[m].SPortName + '</span>\
                                                        <b>起飞：' + wfdata.qucheng[i][0].zhuanji[m].STime + '</b>\
                                                    </div>\
                                                    <div class="jichangE">\
                                                        <span>' + wfdata.qucheng[i][0].zhuanji[m].EPortName + '</span>\
                                                        <b>到达：' + wfdata.qucheng[i][0].zhuanji[m].ETime + '</b>\
                                                    </div>\
                                                </div>';
                                }

                                var huihang = '<div class="lineList">\
                                                    <div class="hangban">\
                                                        <span>' + wfdata.huicheng[i][0].AirCode + '</span>\
                                                        <b>机型：<i>' + wfdata.huicheng[i][0].Jixing + '</i></b>\
                                                    </div>\
                                                    <div class="jichangS">\
                                                        <span>' + wfdata.huicheng[i][0].SPortName + '</span>\
                                                        <b>起飞：' + wfdata.huicheng[i][0].STime + '</b>\
                                                    </div>\
                                                    <div class="jichangE">\
                                                        <span>' + wfdata.huicheng[i][0].EPortName + '</span>\
                                                        <b>到达：' + wfdata.huicheng[i][0].ETime + '</b>\
                                                    </div>\
                                                </div>';
                                for (var m = 0; m < wfdata.huicheng[i][0].zhuanji.length; m++) {
                                    huihang += '<div class="lineList">\
                                                    <div class="hangban">\
                                                        <span>' + wfdata.huicheng[i][0].zhuanji[m].AirCode + '</span>\
                                                        <b>机型：<i>' + wfdata.huicheng[i][0].zhuanji[m].Jixing + '</i></b>\
                                                    </div>\
                                                    <div class="jichangS">\
                                                        <span>' + wfdata.huicheng[i][0].zhuanji[m].SPortName + '</span>\
                                                        <b>起飞：' + wfdata.huicheng[i][0].zhuanji[m].STime + '</b>\
                                                    </div>\
                                                    <div class="jichangE">\
                                                        <span>' + wfdata.huicheng[i][0].zhuanji[m].EPortName + '</span>\
                                                        <b>到达：' + wfdata.huicheng[i][0].zhuanji[m].ETime + '</b>\
                                                    </div>\
                                                </div>';
                                }

                                /**
                                 * 有无更多航班
                                 */
                                if (wfdata.qucheng[i].length == 1 && wfdata.huicheng[i].length == 1) {
                                    var gengduo = "无更多航班";
                                } else {
                                    var gengduo = "更多航班";
                                }
                                /**
                                 * 更多航班
                                 */
                                var qugenghang = "";
                                for (var n = 1; n < wfdata.qucheng[i].length; n++) {
                                    var qugenghangC = '<div class="moreListList">\
                                                            <div class="moreListListJiXing">\
                                                                <span>' + wfdata.qucheng[i][n].AirCode + '</span>\
                                                                <b>机型：<i>' + wfdata.qucheng[i][n].Jixing + '</i></b>\
                                                            </div>\
                                                            <div class="moreListListS">\
                                                                <span>' + wfdata.qucheng[i][n].SPortName + '</span>\
                                                                <b>起飞：' + wfdata.qucheng[i][n].STime + '</b>\
                                                            </div>\
                                                            <div class="moreListListE">\
                                                                <span>' + wfdata.qucheng[i][n].EPortName + '</span>\
                                                                <b>到达：' + wfdata.qucheng[i][n].ETime + '</b>\
                                                            </div>\
                                                        </div>';
                                    for (var nn = 0; nn < wfdata.qucheng[i][n].zhuanji.length; nn++) {
                                        qugenghangC += '<div class="moreListList">\
                                                            <div class="moreListListJiXing">\
                                                                <span>' + wfdata.qucheng[i][n].zhuanji[nn].AirCode + '</span>\
                                                                <b>机型：<i>' + wfdata.qucheng[i][n].zhuanji[nn].Jixing + '</i></b>\
                                                            </div>\
                                                            <div class="moreListListS">\
                                                                <span>' + wfdata.qucheng[i][n].zhuanji[nn].SPortName + '</span>\
                                                                <b>起飞：' + wfdata.qucheng[i][n].zhuanji[nn].STime + '</b>\
                                                            </div>\
                                                            <div class="moreListListE">\
                                                                <span>' + wfdata.qucheng[i][n].zhuanji[nn].EPortName + '</span>\
                                                                <b>到达：' + wfdata.qucheng[i][n].zhuanji[nn].ETime + '</b>\
                                                            </div>\
                                                        </div>';
                                    }

                                    qugenghang += '<div class="moreList">\
                                                        <div class="moreListC">\
                                                            ' + qugenghangC + '\
                                                        </div>\
                                                    </div>';
                                }

                                var huigenghang = "";
                                for (var n = 1; n < wfdata.huicheng[i].length; n++) {
                                    var huigenghangC = '<div class="moreListList">\
                                                            <div class="moreListListJiXing">\
                                                                <span>' + wfdata.huicheng[i][n].AirCode + '</span>\
                                                                <b>机型：<i>' + wfdata.huicheng[i][n].Jixing + '</i></b>\
                                                            </div>\
                                                            <div class="moreListListS">\
                                                                <span>' + wfdata.huicheng[i][n].SPortName + '</span>\
                                                                <b>起飞：' + wfdata.huicheng[i][n].STime + '</b>\
                                                            </div>\
                                                            <div class="moreListListE">\
                                                                <span>' + wfdata.huicheng[i][n].EPortName + '</span>\
                                                                <b>到达：' + wfdata.huicheng[i][n].ETime + '</b>\
                                                            </div>\
                                                        </div>';
                                    for (var nn = 0; nn < wfdata.huicheng[i][n].zhuanji.length; nn++) {
                                        huigenghangC += '<div class="moreListList">\
                                                            <div class="moreListListJiXing">\
                                                                <span>' + wfdata.huicheng[i][n].zhuanji[nn].AirCode + '</span>\
                                                                <b>机型：<i>' + wfdata.huicheng[i][n].zhuanji[nn].Jixing + '</i></b>\
                                                            </div>\
                                                            <div class="moreListListS">\
                                                                <span>' + wfdata.huicheng[i][n].zhuanji[nn].SPortName + '</span>\
                                                                <b>起飞：' + wfdata.huicheng[i][n].zhuanji[nn].STime + '</b>\
                                                            </div>\
                                                            <div class="moreListListE">\
                                                                <span>' + wfdata.huicheng[i][n].zhuanji[nn].EPortName + '</span>\
                                                                <b>到达：' + wfdata.huicheng[i][n].zhuanji[nn].ETime + '</b>\
                                                            </div>\
                                                        </div>';
                                    }

                                    huigenghang += '<div class="moreList">\
                                                        <div class="moreListC">\
                                                            ' + huigenghangC + '\
                                                        </div>\
                                                    </div>';
                                }
                                var zHtml = '<div class="WF">\
                                                    <div class="list">\
                                                        ' + aircomDC + '\
                                                        <div class="hangxian">\
                                                            <div class="qucheng">\
                                                                <div class="type">\
                                                                    <div class="typeC">\
                                                                        <span>去程</span>\
                                                                        <b>' + quzhuan + '</b>\
                                                                    </div>\
                                                                </div>\
                                                                <div class="chenglist">\
                                                                    ' + quhang + '\
                                                                </div>\
                                                            </div>\
                                                            <div class="huicheng">\
                                                                <div class="type">\
                                                                    <div class="typeC">\
                                                                        <span>回程</span>\
                                                                        <b>' + huizhuan + '</b>\
                                                                    </div>\
                                                                </div>\
                                                                <div class="chenglist">\
                                                                    ' + huihang + '\
                                                                </div>\
                                                            </div>\
                                                        </div>\
                                                        <div class="more">\
                                                            <div class="clickMore">' + gengduo + '</div>\
                                                        </div>\
                                                        <div class="price">\
                                                            <div class="priceC">';
                                                                if (i < 2){
                                                                    zHtml += '<span><i>￥</i>' + wfdata.qucheng[i][0].TicketPrice + '<label>限时特价<div>申请特价票下单后请等客服专员电话确认</div></label></span>';
                                                                } else {
                                                                    zHtml += '<span><i>￥</i>' + wfdata.qucheng[i][0].TicketPrice + '</span>';
                                                                }
                                                                zHtml += '<b>税金：≈ ￥' + wfdata.qucheng[i][0].WFS + '</b>\
                                                            </div>\
                                                        </div>\
                                                        <div class="yuding">\
                                                            <div class="yudingC">\
                                                                <div class="sure">预定</div>\
                                                                <div class="DCtui">\
                                                                    <span>退改签说明▼</span>\
                                                                    <div class="tuigai">\
                                                                        <div class="tuigaiT">限制条件详情信息</div>\
                                                                        <div class="tuigaiCon">\
                                                                            ' + getBZ(wfdata.qucheng[i][0].beizhu) + '\
                                                                        </div>\
                                                                    </div>\
                                                                </div>\
                                                            </div>\
                                                        </div>\
                                                    </div>\
                                                    <div class="listdetile">\
                                                        <div class="listdetileD">\
                                                            <div class="listdetileDTitle">\
                                                                <div class="listdetileDTitleC">去程</div>\
                                                            </div>\
                                                            ' + qugenghang + '\
                                                        </div>\
                                                        <div class="listdetileS">\
                                                            <div class="listdetileDTitle">\
                                                                <div class="listdetileDTitleC">回程</div>\
                                                            </div>\
                                                            ' + huigenghang + '\
                                                        </div>\
                                                    </div>\
                                                </div>';
                                $(".lineListDetil").append(zHtml)
                            }
                            removeLoading();
                            $(".chenglist").each(function() {
                                $(this).height($(this).children().length * 55)
                            })
                            $(".qucheng").each(function() {
                                $(this).height($(this).children(".chenglist").height())
                            })
                            $(".huicheng").each(function() {
                                $(this).height($(this).children(".chenglist").height())
                            })
                            $(".hangxian").each(function() {
                                $(this).height($(this).children(".qucheng").height() + $(this).children(".huicheng").height())
                            })
                            $(".list").each(function() {
                                $(this).height($(this).children(".hangxian").height())
                            })
                            for (var i = 0; i < $(".DCtui span").length; i++) {
                                $(".DCtui span").eq(i).hoverDelay({
                                    hoverEvent: function() {
                                        $(this).siblings().show();
                                    },
                                    outEvent: function() {
                                        $(this).siblings().hide();
                                    }
                                });
                            }
                            $(".clickMore").each(function() {
                                var html = $(this).html();
                                if (html == "无更多航班") {
                                    $(this).css("color", "#8f8d8d");
                                }
                            })
                            $(".clickMore").click(function(ev) {
                                var e = ev || event;
                                e.stopPropagation();
                                var $this = $(this);
                                var TarGet = $this.parent().parent().siblings();
                                if ($this.html() == "更多航班") {
                                    var quheight = TarGet.find('.listdetileD').find('.listdetileDTitle').height();
                                    TarGet.find('.listdetileD').find('.moreList').each(function() {
                                        quheight += $(this).height()
                                    })
                                    var huiheight = TarGet.find('.listdetileS').find('.listdetileDTitle').height();
                                    TarGet.find('.listdetileS').find('.moreList').each(function() {
                                        huiheight += $(this).height()
                                    })
                                    var TarGetHeight = Math.max(quheight, huiheight);
                                    TarGet.stop().animate({ "height": TarGetHeight })
                                    $this.html("收回")
                                } else if ($this.html() == "收回") {
                                    TarGet.stop().animate({ "height": 0 })
                                    $this.html("更多航班")
                                }
                                $(document).click(function() {
                                    TarGet.stop().animate({ "height": 0 })
                                    $this.html("更多航班")
                                })
                            })
                            $(".moreList").click(function(ev) {
                                var e = ev || event;
                                e.stopPropagation();
                                var TarGetData = [];
                                var UseTarGet = $(this).children().children(".moreListList");
                                var TarGetType = $(this).siblings().children().html();
                                for (var i = 0; i < UseTarGet.length; i++) {
                                    var obj = {};
                                    obj.AirCode = UseTarGet.eq(i).children('.moreListListJiXing').find('span').html();
                                    obj.Jixing = UseTarGet.eq(i).children('.moreListListJiXing').find('b').find('i').html();
                                    obj.SPortName = UseTarGet.eq(i).children(".moreListListS").find('span').html();
                                    obj.STime = UseTarGet.eq(i).children(".moreListListS").find('b').html();
                                    obj.EPortName = UseTarGet.eq(i).children(".moreListListE").find('span').html();
                                    obj.ETime = UseTarGet.eq(i).children(".moreListListE").find('b').html();
                                    TarGetData.push(obj)
                                }
                                if (TarGetData.length == 1) {
                                    var zhuanji = "直飞";
                                } else if (TarGetData.length == 2) {
                                    var zhuanji = "一次转机";
                                } else if (TarGetData.length == 3) {
                                    var zhuanji = "二次转机";
                                } else if (TarGetData.length == 4) {
                                    var zhuanji = "三次转机";
                                } else if (TarGetData.length == 5) {
                                    var zhuanji = "四次转机";
                                } else if (TarGetData.length == 6) {
                                    var zhuanji = "五次转机";
                                } else {
                                    var zhuanji = "多次转机";
                                }
                                var TargetHtml = "";
                                for (var i = 0; i < TarGetData.length; i++) {
                                    TargetHtml += '<div class="lineList">\
                                                    <div class="hangban">\
                                                        <span>' + TarGetData[i].AirCode + '</span>\
                                                        <b>机型：<i>' + TarGetData[i].Jixing + '</i></b>\
                                                    </div>\
                                                    <div class="jichangS">\
                                                        <span>' + TarGetData[i].SPortName + '</span>\
                                                        <b>' + TarGetData[i].STime + '</b>\
                                                    </div>\
                                                    <div class="jichangE">\
                                                        <span>' + TarGetData[i].EPortName + '</span>\
                                                        <b>' + TarGetData[i].ETime + '</b>\
                                                    </div>\
                                                </div>';
                                }

                                /**
                                 * 要换的数据,生成的html
                                 */
                                var TargetTargetData = [];
                                if (TarGetType == "去程") {
                                    var Target = $(this).parent().parent().siblings().children('.hangxian').children('.qucheng');
                                    var TargetC = Target.children(".chenglist").children()
                                    for (var i = 0; i < TargetC.length; i++) {
                                        var obj = {};
                                        obj.AirCode = TargetC.eq(i).children('.hangban').find('span').html();
                                        obj.Jixing = TargetC.eq(i).children('.hangban').find('b').find('i').html();
                                        obj.SPortName = TargetC.eq(i).children(".jichangS").find('span').html();
                                        obj.STime = TargetC.eq(i).children(".jichangS").find('b').html();
                                        obj.EPortName = TargetC.eq(i).children(".jichangE").find('span').html();
                                        obj.ETime = TargetC.eq(i).children(".jichangE").find('b').html();
                                        TargetTargetData.push(obj)
                                    }
                                } else {
                                    var Target = $(this).parent().parent().siblings().children('.hangxian').children('.huicheng');
                                    var TargetC = Target.children(".chenglist").children()
                                    for (var i = 0; i < TargetC.length; i++) {
                                        var obj = {};
                                        obj.AirCode = TargetC.eq(i).children('.hangban').find('span').html();
                                        obj.Jixing = TargetC.eq(i).children('.hangban').find('b').find('i').html();
                                        obj.SPortName = TargetC.eq(i).children(".jichangS").find('span').html();
                                        obj.STime = TargetC.eq(i).children(".jichangS").find('b').html();
                                        obj.EPortName = TargetC.eq(i).children(".jichangE").find('span').html();
                                        obj.ETime = TargetC.eq(i).children(".jichangE").find('b').html();
                                        TargetTargetData.push(obj)
                                    }
                                }
                                var TargetTargetHtml = "";
                                for (var i = 0; i < TargetTargetData.length; i++) {
                                    TargetTargetHtml += '<div class="moreListList">\
                                                            <div class="moreListListJiXing">\
                                                                <span>' + TargetTargetData[i].AirCode + '</span>\
                                                                <b>机型：<i>' + TargetTargetData[i].Jixing + '</i></b>\
                                                            </div>\
                                                            <div class="moreListListS">\
                                                                <span>' + TargetTargetData[i].SPortName + '</span>\
                                                                <b>' + TargetTargetData[i].STime + '</b>\
                                                            </div>\
                                                            <div class="moreListListE">\
                                                                <span>' + TargetTargetData[i].EPortName + '</span>\
                                                                <b>' + TargetTargetData[i].ETime + '</b>\
                                                            </div>\
                                                        </div>';
                                }

                                var FTarget = "";
                                if (TarGetType == "去程") {
                                    FTarget = $(this).parent().parent().siblings().children('.hangxian').children('.qucheng');
                                } else {
                                    FTarget = $(this).parent().parent().siblings().children('.hangxian').children('.huicheng');
                                }
                                FTarget.children('.type').children().find("b").html(zhuanji);
                                FTarget.children(".chenglist").html(TargetHtml);
                                $(this).children().html(TargetTargetHtml)
                                $(".chenglist").each(function() {
                                    $(this).height($(this).children().length * 55)
                                })
                                $(".qucheng").each(function() {
                                    $(this).height($(this).children(".chenglist").height())
                                })
                                $(".huicheng").each(function() {
                                    $(this).height($(this).children(".chenglist").height())
                                })
                                $(".hangxian").each(function() {
                                    $(this).height($(this).children(".qucheng").height() + $(this).children(".huicheng").height())
                                })
                                $(".list").each(function() {
                                    $(this).height($(this).children(".hangxian").height())
                                })
                            })
                            $(".sure").click(function() {
                                var $this = $(this);
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
                                        var TarGet = $this.parent().parent();
                                        setSessionstorage("picture", TarGet.siblings(".aircom").children().find('img')[0].src);
                                        setSessionstorage("aircom", TarGet.siblings(".aircom").children().find('span').html());
                                        setSessionstorage("aircomCode", TarGet.siblings(".aircom").children().find('input').val());
                                        setSessionstorage("type", "往返");
                                        setSessionstorage("date", date);
                                        setSessionstorage("eTime", eTime);
                                        setSessionstorage("chufadi", data.a);
                                        setSessionstorage("daodadi", data.b);
                                        setSessionstorage("Qzhuanji", TarGet.siblings(".hangxian").children(".qucheng").find('.type').children().find('b').html());
                                        setSessionstorage("Hzhuanji", TarGet.siblings(".hangxian").children(".huicheng").find('.type').children().find('b').html());
                                        setSessionstorage("tuigai", $this.siblings().children('.tuigai').children('.tuigaiCon').html());
                                        setSessionstorage("piaojia", parseInt(TarGet.siblings(".price").children().find('span').html().replace(/[^0-9]/ig, "")));
                                        setSessionstorage("shuijin", parseInt(TarGet.siblings(".price").children().find('b').html().replace(/[^0-9]/ig, "")));
                                        var arr1 = [];
                                        var qutarGet = TarGet.siblings(".hangxian").children(".qucheng").children(".chenglist").children();
                                        for (var i = 0; i < qutarGet.length; i++) {
                                            var obj = {};
                                            obj.AirCode = qutarGet.eq(i).children('.hangban').find('span').html();
                                            obj.jixing = qutarGet.eq(i).children('.hangban').find('b').find('i').html();
                                            obj.sport = qutarGet.eq(i).children('.jichangS').find('span').html();
                                            obj.stime = qutarGet.eq(i).children('.jichangS').find('b').html();
                                            obj.eport = qutarGet.eq(i).children('.jichangE').find('span').html();
                                            obj.etime = qutarGet.eq(i).children('.jichangE').find('b').html();
                                            arr1.push(obj)
                                        }
                                        setSessionstorage("airLineQ", JSON.stringify(arr1))
                                        var arr2 = [];
                                        var huiTarGet = TarGet.siblings(".hangxian").children(".huicheng").children(".chenglist").children();
                                        for (var i = 0; i < huiTarGet.length; i++) {
                                            var obj = {};
                                            obj.AirCode = huiTarGet.eq(i).children('.hangban').find('span').html();
                                            obj.jixing = huiTarGet.eq(i).children('.hangban').find('b').find('i').html();
                                            obj.sport = huiTarGet.eq(i).children('.jichangS').find('span').html();
                                            obj.stime = huiTarGet.eq(i).children('.jichangS').find('b').html();
                                            obj.eport = huiTarGet.eq(i).children('.jichangE').find('span').html();
                                            obj.etime = huiTarGet.eq(i).children('.jichangE').find('b').html();
                                            arr2.push(obj)
                                        }
                                        setSessionstorage("airLineH", JSON.stringify(arr2))
                                        var _search = "";
                                        if(TarGet.siblings(".price").find('label').length > 0){
                                        	_search += '?specialoffer=1';
                                        }
                                        window.location.href = "@@pagepath/personalInformation.html" + _search;
                                    })
                            })
                        })
                }
            }
        })

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
}


function setSessionstorage(key, value) {
    window.sessionStorage.setItem(key, value);
}

function getSessionstorage(key) {
    return window.sessionStorage.getItem(key);
}

function getBZ(str) {
    var reg3=new RegExp("\r\n", "g");
    str=str.replace(reg3,"")
    var arr = str.split("、");
    var temp = "";
    for (var i = 0; i < arr.length - 1; i++) {
        var sum = arr[i][arr[i].length - 1];
        temp += sum + "、" + arr[i + 1] + "<br>";
    }
    var temparr = temp.split("<br>")
    for (var i = 0; i < temparr.length - 2; i++) {
        temparr[i] = temparr[i].substring(0, temparr[i].length - 1);
    }
    var rs = temparr.join("<br>");
    return rs;
}

function NOP() {
    $(".route").hide();
    $(".lineListZ").hide();
    $(".not-searched-wrap").show();
    $("#loading").hide();
    var $emall = false;
    $(".sirenyouxiang").blur(function() {
        var $this = $(this);
        if (!emall($this.val())) {
            $this.css("borderColor", "red")
            $emall = false;
        } else {
            $this.css("borderColor", "green")
            $emall = true;
        }
    })
    var $phone = false;
    var $ppp=false;
    $(".sirendianhua").blur(function() {
        var $this = $(this);
        var Mobile = $this.val();
        if (!phone(Mobile)) {
            $this.css("borderColor", "red")
            $phone = false;
        } else {
            $this.css("borderColor", "green")
            $phone = true;
            $.ajax({
                    url: '@@apispath/FindLoginServlet',
                    type: 'post',
                    dataType: 'json',
                    data: {
                        "Mobile": Mobile
                    },
                    error: function() {
                        alert("网络错误，请刷新重试")
                    }
                })
                .done(function(data) {
                    var $sirendingzhiUL=$(".sirendingzhi").find("ul").find('li');
                    var $wangjima=$(".wangjima");
                    var $sirenmima=$(".sirenmima").siblings('span');
                    if (data == "1") {
                        $sirendingzhiUL.eq(0).hide();
                        $sirendingzhiUL.eq(2).hide();
                        $wangjima.show();
                        $ppp=true;
                        $sirenmima.html("登陆密码");
                    } else {
                        $sirendingzhiUL.eq(0).show();
                        $sirendingzhiUL.eq(2).show();
                        $wangjima.hide();
                        $ppp=false;
                        $sirenmima.html("请设置您的订单查询密码");
                    }
                })
        }
    })

    var $xingm = false;
    $(".sirenxingming").blur(function() {
        var $this = $(this);
        var Mobile = $this.val();
        if (Mobile == "") {
            $this.css("borderColor", "red")
            $xingm = false;
        } else {
            $this.css("borderColor", "green")
            $xingm = true;
        }
    })

    var $mima = false;
    $(".sirenmima").blur(function() {
        var $this = $(this);
        var Mobile = $this.val();
        if (Mobile == "" || Mobile.length>12) {
            $this.css("borderColor", "red")
            $mima = false;
        } else {
            $this.css("borderColor", "green")
            $mima = true;
        }
    })

    var $xinxi = false;
    $(".xingchengxinxi").blur(function() {
        var $this = $(this);
        var Mobile = $this.val();
        if (Mobile == "") {
            $this.css("borderColor", "red")
            $xinxi = false;
        } else {
            $this.css("borderColor", "green")
            $xinxi = true;
        }
    })
    $(".tijiaoxingcheng").unbind("click").on("click", function() {
        var xingmingxingming = $(".sirenxingming").val();
        var phone = $(".sirendianhua").val();
        var emall = $(".sirenyouxiang").val();
        var mima = $(".sirenmima").val();
        var xinxi = $(".xingchengxinxi").val();
        var Mobile = $(".sirendianhua").val();
        var userID = getSessionstorage("userID");
        if (userID == null || userID == -1 || userID == "null") {

        } else {
            $emall = true;
            $phone = true;
            $xingm = true;
            $mima = true;
        }
        if($ppp==true){
                $xingm = true;
                $emall = true;
            }
        var OrderCode = randomNum(0, 9) + "" + randomNum(0, 9) + "" + randomNum(0, 9) + "" + randomNum(0, 9) + "" + randomNum(0, 9) + "" + randomNum(0, 9);
        if ($emall && $phone && $xingm && $mima && $xinxi) {
            $.ajax({
                    url: '@@apispath/AdminLunhuan',
                    type: 'post',
                    dataType: 'text',
                    data: {
                        "Mobile": Mobile,
                        "userID": userID
                    },
                    error: function() {
                        alert("网络错误，请刷新重试，或联系管理员")
                    }
                })
                .done(function(data) {
                    var CLNAME = data;
                    var navInfo = "";
                    var qudao = "roundTrip.js";
                    //获取userAgent信息
                	if(navigator && navigator.userAgent){
                		navInfo=navigator.userAgent;
                	}
                    $.ajax({
                            url: '@@apispath/ZdyOrderServlet',
                            type: 'get',
                            dataType: 'json',
                            data: {
                                "xingmingxingming": xingmingxingming,
                                "phone": phone,
                                "emall": emall,
                                "mima": mima,
                                "xinxi": xinxi,
                                "OrderCode": OrderCode,
                                "CLNAME": CLNAME,
                                "userID": userID,
                                "navInfo":navInfo,
                                "qudao":qudao
                            },
                            error: function() {
                                alert("网络错误，请刷新重试")
                            }
                        })
                        .done(function(data) {
                            if (data == "-1") {
                                alert("您的手机或密码输入错误，请输入正确的信息")
                            } else if (data == "0") {
                                alert("提交失败，请刷新重试，或联系管理员")
                            } else {
                                setSessionstorage("userID", data);
                                alert("提交成功,请稍后");
                                window.location.href = "@@pagepath/personalHomePage.html";
                            }
                        })

                })
        } else {
            alert("请填写正确的信息")
        }

    })
    $(".wangjima").unbind("click").on("click",function() {
        var phonee = function(phone) { //手机号
            var mobileRegex = /^(((1[3456789][0-9]{1})|(15[0-9]{1}))+\d{8})$/;
            if (mobileRegex.test(phone)) {
                return true;
            } else {
                return false;
            }
        }
        var phone = $(".sirendianhua").val();
        if (phonee(phone)) {
            $.ajax({
                    url: '@@apispath/Wangjimima',
                    type: 'post',
                    dataType: 'json',
                    data: {
                        "phone": phone
                    },
                    error: function() {
                        alert("网络错误，请刷新重试")
                    }
                })
                .done(function(data) {
                    if (data == "-1") {
                        alert("您还不是凯行网的会员，请先注册")
                    } else if (data == "0") {
                        alert("短信发送失败，请联系服务人员")
                    } else if (data == "1") {
                        alert("您的密码已经发送到您的手机，请注意查收")
                    }
                })
        } else {
            alert("请输入正确的手机号")
        }

    })
}

function randomNum(min, max) {
    return Math.floor(min + Math.random() * (max - min));
}

function danchengpaixu(arr) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].length != 1) {
            var arr1 = [];
            var arr2 = [];
            for (var k = 0; k < arr[i].length; k++) {
                if (arr[i][k].zhuanji.length == 0) {
                    arr1.push(arr[i][k]);
                } else {
                    arr2.push(arr[i][k]);
                }
            }
            arr[i] = arr1.concat(arr2);
        }
    }
    var arr3 = [];
    var arr4 = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i][0].zhuanji.length == 0) {
            arr3.push(arr[i]);
        } else {
            arr4.push(arr[i]);
        }
    }
    return arr3.concat(arr4);
}

function wangfanpaixu(arr) {
    for (var i = 0; i < arr.qucheng.length; i++) {
        if (arr.qucheng[i].length != 1) {
            var arr1 = [];
            var arr2 = [];
            for (var k = 0; k < arr.qucheng[i].length; k++) {
                if (arr.qucheng[i][k].zhuanji.length == 0) {
                    arr1.push(arr.qucheng[i][k]);
                } else {
                    arr2.push(arr.qucheng[i][k]);
                }
            }
            arr.qucheng[i] = arr1.concat(arr2);
        }
    }

    var arr3 = [];
    var arr33 = [];
    var arr4 = [];
    var arr44 = [];

    for (var i = 0; i < arr.qucheng.length; i++) {
        if (arr.qucheng[i][0].zhuanji.length == 0) {
            arr3.push(arr.qucheng[i]);
            arr33.push(arr.huicheng[i]);
        } else {
            arr4.push(arr.qucheng[i]);
            arr44.push(arr.huicheng[i]);
        }
    }
    arr.qucheng = arr3.concat(arr4);
    arr.huicheng = arr33.concat(arr44);
    console.log(arr)
    return arr;
}