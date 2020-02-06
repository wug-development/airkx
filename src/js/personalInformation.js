$(function() {
    $("#head_menu li").eq(0).addClass('active-bji')
    var userID = getSessionstorage("userID");
    if (userID == null || userID == "null") { //用户未登录
        $(".contact").show();
        $(".lianxiren").show();
        $(".changyongCJR").hide();
    } else { //用户已登陆
        $(".contact").hide();
        $(".lianxiren").hide();
        $(".changyongCJR").show();
        $.ajax({
                url: '@@apispath/SendCYcontactServlet',
                type: 'post',
                dataType: 'json',
                data: {
                    "userID": userID
                },
                error: function() {
                    alert("网络错误，请刷新重试")
                }
            })
            .done(function(data) {
                var CYCJR = data;
                var html = "";
                for (var i = 0; i < data.length; i++) {
                    if (data[i].SFZ == "") {
                        html += '<div class="changyongCJRConList">\
                                    <input type="checkbox" name="" value="' + data[i].CjrName + '"><span>' + data[i].CjrName + '</span>\
                                </div>'
                    }
                }
                $(".changyongCJRCon").append(html);
                $(".changyongCJRSure").click(function() {
                    var xingmingArr = [];
                    $(".changyongCJRConList").find("input").each(function() {
                        if ($(this).is(":checked")) {
                            xingmingArr.push($(this).val())
                        }

                    })

                    if (xingmingArr.length == 0) {
                        alert("您还没有选择")
                    } else {
                        var yicunzaiCJR = [];
                        $(".chengjiren").each(function() {
                            yicunzaiCJR.push($(this).find(".pi-item").eq(0).find("input").val())
                        })
                        for (var i = 0; i < xingmingArr.length; i++) {
                            if ($.inArray(xingmingArr[i], yicunzaiCJR) != -1) {
                                xingmingArr.splice(i, 1);
                                i--;
                            }
                        }
                        if (yicunzaiCJR[0] == "") {
                            var xingm = xingmingArr[0];
                            xingmingArr.splice(0, 1);
                            var $chengjiren0FC=$(".chengjiren").eq(0).find(".pi-item");
                            for (var i = 0; i < CYCJR.length; i++) {
                                if (xingm == CYCJR[i].CjrName) {
                                    $chengjiren0FC.eq(0).find('input').val(CYCJR[i].CjrName)
                                    $chengjiren0FC.eq(1).find('input').val(CYCJR[i].CSRQ)
                                    $chengjiren0FC.eq(2).find('input').val(CYCJR[i].HZH)
                                    $chengjiren0FC.eq(3).find('input').val(CYCJR[i].HZYXQ)
                                    $chengjiren0FC.eq(4).find('input').each(function() {
                                        var $this=$(this);
                                        if ($this.val() == CYCJR[i].Sex) {
                                            $this.prop("checked", true);
                                        } else {
                                            $this.prop("checked", false);
                                        }
                                    })
                                }
                            }
                        }
                        for (var i = 0; i < xingmingArr.length; i++) {
                            for (var k = 0; k < CYCJR.length; k++) {
                                if (xingmingArr[i] == CYCJR[k].CjrName) {
                                    var danjia = parseInt($ticketPriceRede.html()) + parseInt($ticket_priceRed.html());
                                    var num = $(".parent").length;
                                    if (num < 8) {
                                        if (CYCJR[k].Sex == "男") {
                                            var shtml = '<input checked="checked" name="mel' + num + '" type="radio" class="sex" value="男">\
                                                        先生\
                                                        <input name="mel' + num + '" type="radio" class="sex" value="女">\
                                                        女士'
                                        } else {
                                            var shtml = '<input name="mel' + num + '" type="radio" class="sex" value="男">\
                                                        先生\
                                                        <input name="mel' + num + '" type="radio" class="sex" value="女" checked="checked">\
                                                        女士'
                                        }
                                        PERSON_MORE = '<div class="parent chengjiren"><a href="javascript:;" class="btn-close Personparent">\
                                                                    <input type="hidden" value="1" />\
                                                                    <img src="@@imgpath/btn-close.png" alt="">\
                                                                </a>\
                                                                <div id="pinfo' + num + '" class="person-info">\
                                                                <div class="pi-item">\
                                                                    <span>姓名:</span>\
                                                                    <input class="airPer" type="text" value="' + CYCJR[k].CjrName + '">\
                                                                    <b>*</b>\
                                                                    <i>例如：zhang/tiantian</i>\
                                                                    <p>该信息格式有误</p>\
                                                                </div>\
                                                                 <div class="pi-item">\
                                                                    <span>出生年月:</span>\
                                                                    <input type="text" readonly="readonly" class="airchusheng" value="' + CYCJR[k].CSRQ + '">\
                                                                    <b>*</b>\
                                                                    <i>例如：20010101</i>\
                                                                    <p>该信息格式有误</p>\
                                                                </div>\
                                                                 <div class="pi-item">\
                                                                    <span>护照号码:</span>\
                                                                    <input type="text" class="huzhaohaoma" value="' + CYCJR[k].HZH + '">\
                                                                    <b>*</b>\
                                                                    <p>该信息格式有误</p>\
                                                                </div>\
                                                                 <div class="pi-item">\
                                                                    <span>护照有效期:</span>\
                                                                    <input type="text" readonly="readonly" class="huzhaoyouxiao" value="' + CYCJR[k].HZYXQ + '">\
                                                                    <p>该信息格式有误</p>\
                                                                </div>\
                                                                <div class="pi-item">\
                                                                    <span>性别:</span>\
                                                                    ' + shtml + '\
                                                                </div>\
                                                            </div><div>  ';
                                        $('#person_box').append(PERSON_MORE);
                                    }
                                    $(".Personparent").unbind("click").on("click", function() {
                                        delParent($(this))
                                        $ticketPriceRed.html($ticketPriceRed.html() - danjia)
                                    })
                                    $ticketPriceRed.html(parseInt($ticketPriceRed.html()) + danjia)
                                    addPersonInfo = true;
                                    $addPersonInfoCP.stop().animate({ "opacity": 0 }, function() {
                                        $addPersonInfoCP.hide();
                                    })

                                }
                            }
                        }
                    }
                })
                var changyongCJRT = true;
                $(".changyongCJRT").click(function() {
                    var $changyongCJRTC=$(".changyongCJRTC");
                    if (changyongCJRT) {
                        $changyongCJRTC.stop().animate({ "height": 197 })
                        changyongCJRT = false;
                    } else {
                        $changyongCJRTC.stop().animate({ "height": 0 })
                        changyongCJRT = true;
                    }
                })
            })
    }



    $(".personal-ticket").eq(0).empty();
    $(".personal-ticket").eq(1).empty();
    var lineType = getSessionstorage("type");
    var aircom = getSessionstorage("aircom");
    var chufadi = getSessionstorage("chufadi");
    var daodadi = getSessionstorage("daodadi");
    var date = getSessionstorage("date");
    var piaojia = getSessionstorage("piaojia");
    var picture = getSessionstorage("picture");
    var shuijin = getSessionstorage("shuijin");
    var tuigai = getSessionstorage("tuigai");
    if (lineType == "单程") {
        var zhuanji = getSessionstorage("zhuanji");
        var airLine = JSON.parse(getSessionstorage("airLine"));
        var hangxian = '';
        for (var i = 0; i < airLine.length; i++) {
            hangxian += '<div class="personal-ticketairjixing"><img src="' + picture + '" alt="">' + aircom + '&nbsp;&nbsp;&nbsp;' + airLine[i].AirCode + '&nbsp;&nbsp;&nbsp;机型：' + airLine[i].jixing + '</div>\
                        <div class="personal-ticketTime">\
                        <span>出发时间</span><b>到达时间</b>\
                        </div>\
                        <div class="personal-ticketTime1">\
                        <span>' + airLine[i].stime + '</span><b>' + airLine[i].etime + '</b>\
                        </div>\
                        <div class="personal-ticketTime2">\
                        <span>' + airLine[i].sport + '</span><img src="@@imgpath/line_01.png"><b>' + airLine[i].eport + '</b>\
                        </div>'
        }
        var html = ' <div class="personal-ticketTitle">去程</div>\
    <div class="personal-ticketSE">' + date.split("-")[1] + "月" + date.split("-")[2] + "日" + '&nbsp;' + chufadi + '<img src="@@imgpath/qu.png" alt="">' + daodadi + '</div>\
                ' + hangxian + '\
                '
        $(".personal-ticket").eq(0).append(html);
    } else if (lineType == "往返") {
        var Hzhuanji = getSessionstorage("Hzhuanji");
        var Qzhuanji = getSessionstorage("Qzhuanji");
        var airLineH = JSON.parse(getSessionstorage("airLineH"));
        var airLineQ = JSON.parse(getSessionstorage("airLineQ"));
        var eTime = getSessionstorage("eTime");
        var Qhangxian = '';
        for (var i = 0; i < airLineQ.length; i++) {
            Qhangxian += '<div class="personal-ticketairjixing"><img src="' + picture + '" alt="">' + aircom + '&nbsp;&nbsp;&nbsp;' + airLineQ[i].AirCode + '&nbsp;&nbsp;&nbsp;机型：' + airLineQ[i].jixing + '</div>\
                        <div class="personal-ticketTime">\
                        <span>出发时间</span><b>到达时间</b>\
                        </div>\
                        <div class="personal-ticketTime1">\
                        <span>' + airLineQ[i].stime + '</span><b>' + airLineQ[i].etime + '</b>\
                        </div>\
                        <div class="personal-ticketTime2">\
                        <span>' + airLineQ[i].sport + '</span><img src="@@imgpath/line_01.png"><b>' + airLineQ[i].eport + '</b>\
                        </div>'
        }
        var Qhtml = ' <div class="personal-ticketTitle">去程</div>\
    <div class="personal-ticketSE">' + date.split("-")[1] + "月" + date.split("-")[2] + "日" + '&nbsp;' + chufadi + '<img src="@@imgpath/qu.png" alt="">' + daodadi + '</div>\
                ' + Qhangxian + '\
                '
        $(".personal-ticket").eq(0).append(Qhtml);
        var Hhangxian = '';
        for (var i = 0; i < airLineH.length; i++) {
            Hhangxian += '<div class="personal-ticketairjixing"><img src="' + picture + '" alt="">' + aircom + '&nbsp;&nbsp;&nbsp;' + airLineH[i].AirCode + '&nbsp;&nbsp;&nbsp;机型：' + airLineH[i].jixing + '</div>\
                        <div class="personal-ticketTime">\
                        <span>出发时间</span><b>到达时间</b>\
                        </div>\
                        <div class="personal-ticketTime1">\
                        <span>' + airLineH[i].stime.substring(3) + '</span><b>' + airLineH[i].etime.substring(3) + '</b>\
                        </div>\
                        <div class="personal-ticketTime2">\
                        <span>' + airLineH[i].sport + '</span><img src="@@imgpath/line_01.png"><b>' + airLineH[i].eport + '</b>\
                        </div>'
        }
        var Hhtml = ' <div class="personal-ticketTitle">回程</div>\
    <div class="personal-ticketSE">' + eTime.split("-")[1] + "月" + eTime.split("-")[2] + "日" + '&nbsp;' + daodadi + '<img src="@@imgpath/qu.png" alt="">' + chufadi + '</div>\
                ' + Hhangxian + '\
                '
        $(".personal-ticket").eq(1).append(Hhtml);
    }
    $(".pwc-tit").find("span").html(lineType);
    $(".tuigai").html(tuigai)
    var $ticketPriceRed = $(".ticketPrice .red")
    var $ticketPriceRede = $(".ticket-price .rede")
    var $ticket_priceRed = $(".ticket-price .red")
    $ticketPriceRede.html(shuijin);
    $ticket_priceRed.html(piaojia)


    var $notice_a = $(".notice").find("a");
    var $tuigai = $(".tuigai");
    var $goupiao = $(".goupiao");
    $notice_a.eq(0).on({
        mouseover: function() {
            $tuigai.show();
        },
        mouseleave: function() {
            $tuigai.hide();
        }
    })
    $notice_a.eq(1).on({
        mouseover: function() {
            $goupiao.show();
        },
        mouseleave: function() {
            $goupiao.hide();
        }
    })

    var PERSON_MORE = '';

    $ticketPriceRed.html((parseInt($ticketPriceRede.html()) + parseInt($ticket_priceRed.html())))
    var addPersonInfo = true;
    var $addPersonInfoCP = $(".addPersonInfoCP");
    $('#addPersonInfo').click(function() {
        if (addPersonInfo) {
            $addPersonInfoCP.show().stop().animate({ "opacity": 1 })
            addPersonInfo = false;
        } else {
            addPersonInfo = true;
            $addPersonInfoCP.stop().animate({ "opacity": 0 }, function() {
                $addPersonInfoCP.hide();
            })
        }
    })
    $addPersonInfoCP.eq(0).click(function() {
        var danjia = parseInt($ticketPriceRede.html()) + parseInt($ticket_priceRed.html());
        var num = $(".parent").length;
        if (num < 8) {
            PERSON_MORE = '<div class="parent chengjiren"><a href="javascript:;" class="btn-close Personparent">\
                                <input type="hidden" value="1" />\
                                <img src="@@imgpath/btn-close.png" alt="">\
                            </a>\
                            <div id="pinfo' + num + '" class="person-info">\
                            <div class="pi-item">\
                                <span>姓名:</span>\
                                <input class="airPer" type="text">\
                                <b>*</b>\
                                <i>例如：zhang/tiantian</i>\
                                <p>该信息格式有误</p>\
                            </div>\
                             <div class="pi-item">\
                                <span>出生年月:</span>\
                                <input type="text" readonly="readonly" class="airchusheng">\
                                <b>*</b>\
                                <i>例如：20010101</i>\
                                <p>该信息格式有误</p>\
                            </div>\
                             <div class="pi-item">\
                                <span>护照号码:</span>\
                                <input type="text" class="huzhaohaoma">\
                                <b>*</b>\
                                <p>该信息格式有误</p>\
                            </div>\
                             <div class="pi-item">\
                                <span>护照有效期:</span>\
                                <input type="text" readonly="readonly" class="huzhaoyouxiao">\
                                <p>该信息格式有误</p>\
                            </div>\
                            <div class="pi-item">\
                                <span>性别:</span>\
                                    <input checked="checked" name="mel' + num + '" type="radio" class="sex" value="男">\
                                    先生\
                                    <input name="mel' + num + '" type="radio" class="sex" value="女">\
                                    女士\
                            </div>\
                        </div><div>  ';
            $('#person_box').append(PERSON_MORE);
        }
        $(".Personparent").off("click").on("click", function() {
            delParent($(this))
            $ticketPriceRed.html($ticketPriceRed.html() - danjia)
        })
        $ticketPriceRed.html(parseInt($ticketPriceRed.html()) + danjia)
        addPersonInfo = true;
        $addPersonInfoCP.stop().animate({ "opacity": 0 }, function() {
            $addPersonInfoCP.hide();
        })
        bindEvent(num+1);
    })
    $addPersonInfoCP.eq(1).click(function() {
        var shuijinc = parseInt($ticketPriceRede.html()) - 90;
        var piaojiac = parseInt(parseInt($ticket_priceRed.html()) * 0.75);
        var danjia = shuijinc + piaojiac;
        var num = $(".parent").length;
        if (num < 8) {
            PERSON_MORE = '<div class="parent chengjiren"><a href="javascript:;" class="btn-close Personchild">\
                                <input type="hidden" value="2"/>\
                                <img src="@@imgpath/btn-close.png" alt="">\
                            </a>\
                            <div id="pinfo' + num + '" class="person-info">\
                            <div class="pi-item">\
                                <span>姓名:</span>\
                                <input class="airPer" type="text">\
                                <b>*</b>\
                                <i>例如：zhang/tiantian</i>\
                                <p>该信息格式有误</p>\
                            </div>\
                             <div class="pi-item">\
                                <span>出生年月:</span>\
                                <input type="text" readonly="readonly" class="airchusheng ertong">\
                                <b>*</b>\
                                <i>例如：20010101 儿童年龄为2-12周岁</i>\
                                <p>该信息格式有误</p>\
                            </div>\
                             <div class="pi-item">\
                                <span>护照号码:</span>\
                                <input type="text" class="huzhaohaoma">\
                                <b>*</b>\
                                <p>该信息格式有误</p>\
                            </div>\
                             <div class="pi-item">\
                                <span>护照有效期:</span>\
                                <input type="text" readonly="readonly" class="huzhaoyouxiao">\
                                <p>该信息格式有误</p>\
                            </div>\
                            <div class="pi-item">\
                                <span>性别:</span>\
                                    <input checked="checked" name="mel' + num + '" type="radio" class="sex" value="男">\
                                    先生\
                                    <input name="mel' + num + '" type="radio" class="sex" value="女">\
                                    女士\
                            </div>\
                        </div><div>  ';
            $('#person_box').append(PERSON_MORE);
        }else{
        	return false;
        }

        $(".Personchild").off("click").on("click", function() {
            delParent($(this))
            $ticketPriceRed.html($ticketPriceRed.html() - danjia)
        })
        addPersonInfo = true;
        $addPersonInfoCP.stop().animate({ "opacity": 0 }, function() {
            $addPersonInfoCP.hide();
        })
        $ticketPriceRed.html(parseInt($ticketPriceRed.html()) + danjia);
        bindEvent(num+1);
    })

    var $chusheng = false;
    var $engname = false;
    var $huzhaohaoma = false;
    var $huzhaoyouxiao = true;
    
    function bindEvent(key){
    	$(".airchusheng").off('blur').on("blur", function() {
            var $this = $(this)
            if (chusheng($this.val())) {            
                if($(this).hasClass("ertong")){
                	var myDate = new Date();
                    var mouth = myDate.getMonth() + 1 + "";
                    if (mouth.length == 1) {
                        mouth = "0" + mouth;
                    }
                    var date = myDate.getDate() + "";
                    if (date.length == 1) {
                        date = "0" + date;
                    }
                    var time = myDate.getFullYear() + "" + mouth + "" + date;
                    var age = time - $this.val() + "";
                    for (var i = 0; i < 4; i++) {
                        age = age.substring(0, age.length - 1);
                    }
                    if (age <= 12) {
                        $this.siblings("p").hide();
                        $this.css("borderColor", "green")
                        $chusheng = true;
                    } else {
                        $this.siblings("p").html("该乘客年龄超出，请重新输入").show();
                        $this.css("borderColor", "red")
                        $chusheng = false;
                    }                	
                }else{
                    $this.siblings("p").hide();
                    $this.css("borderColor", "green");  
                    $chusheng = true;  
                }
            } else {
                $this.siblings("p").html("该信息格式有误").show();
                $this.css("borderColor", "red");
                $chusheng = false;
            }
        });
        $(".airPer").off('blur').on("blur", function() {
            var $this = $(this)
            $this.val($this.val().replace(/ /g,''));
            if (englishName($this.val())) {
                $this.css("borderColor", "green")
                $this.siblings("p").hide();
                $engname = true;
            } else {
                $this.siblings("p").show();
                $this.css("borderColor", "red")
                $engname = false;
            }
        });

        $(".huzhaohaoma").off('blur').on("blur",function() {
            var $this = $(this);
            $this.val($this.val().replace(/ /g,''));
            var _val = $this.val();
            if (_val.length > 50 || App.isEn(_val)) {
                $this.css("borderColor", "red");
                $this.siblings("p").html('格式不正确').show();
                $huzhaohaoma = false;
            } else if (App.isNumber(_val) || App.isNumberEn(_val)) {
            	$this.css("borderColor", "green");
                $this.siblings("p").hide();
                $huzhaohaoma = true;
            } else {
            	$this.css("borderColor", "red");
                $this.siblings("p").show();
                $huzhaohaoma = false;
            }
        });
            	
        laydate.render({
            elem: $(".airchusheng")[key],
            min: "1900-01-01",
            max: 0,
    		format: 'yyyyMMdd',
    		done: function(value, date){
    			$(".airchusheng").blur();
    		}
        });
        laydate.render({
            elem: $(".huzhaoyouxiao")[key],
            min: 0,
    		format: 'yyyyMMdd'
        });
    }
    bindEvent(0);

    var userID = getSessionstorage("userID");
    if (userID != null && userID != "null") {
        var cbigbtn = 0;
        $(".cbigbtn").click(function() {
            if (cbigbtn == 0) {
                $(this).addClass("active").val("提交中····");
                cbigbtn++;
                var isturn = "";
                var XM = $(".airPer").val();
                var CS = $(".airchusheng").val();
                var HZ = $(".huzhaohaoma").val();
                var YXQ = $(".huzhaoyouxiao").val();
                if (XM != "" && CS != "" && HZ != "") {
                    isturn = true;
                	$('.chengjiren').each(function(){
                		if($.trim($(this).find(".airPer").val()) == ''){
                			isturn = false;
                		}else if($.trim($(this).find(".airchusheng").val()) == ''){
                			isturn = false;
                		}else if($.trim($(this).find(".huzhaohaoma").val()) == ''){
                			isturn = false;
                		}
                	});
                } else {
                    isturn = false;
                    cbigbtn = 0;
                    $(this).removeClass("active").val("提交订单");
                }
                if (isturn) {
                    var Price = $ticketPriceRed.html();
                    var userID = getSessionstorage("userID");
                    var Mobile = $("#phone").val();
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
                            var OrderCode = randomNum(0, 9) + "" + randomNum(0, 9) + "" + randomNum(0, 9) + "" + randomNum(0, 9) + "" + randomNum(0, 9) + "" + randomNum(0, 9);
                            var OrderPrice = $ticketPriceRed.html();
                            var OrderType = 2;
                            var OrderState = "处理中";
                            var FKState = 0;
                            var AirType = lineType;
                            var yidenglu = 0;
                            var mdd = getSessionstorage("daodadi");
                            if (userID == null || userID == "null") {
                                var LXR = $("#contacts").val();
                                var Mobile = $("#phone").val();
                                var LXDH = $("#phone").val();
                                var pas = $(".pass").val();
                                var Contact = $("#contacts").val();
                                var Email = $(".email").val();
                                yidenglu = "weidenglu";
                            } else {
                                yidenglu = "yidenglu";
                            }
                            $.ajax({
                                    url: '@@apispath/SendAdminServlet',
                                    type: 'post',
                                    dataType: 'text',
                                    data: {
                                        "OrderCode": OrderCode,
                                        "OrderPrice": OrderPrice,
                                        "OrderType": OrderType,
                                        "OrderState": OrderState,
                                        "FKState": FKState,
                                        "AirType": AirType,
                                        "CLNAME": CLNAME,
                                        "userID": userID,
                                        "LXR": LXR,
                                        "Mobile": Mobile,
                                        "LXDH": LXDH,
                                        "yidenglu": yidenglu,
                                        "pas": pas,
                                        "Contact": Contact,
                                        "Email": Email,
                                        "mdd":mdd
                                    },
                                    error: function() {
                                        alert("网络错误，请刷新重试，或联系管理员")
                                    }
                                })
                                .done(function(data) {
                                    var OrderID = data;
                                    if ($(".parent").length == 0) {
                                        var FlightPrice = getSessionstorage("piaojia");
                                        var Shuijin = getSessionstorage("shuijin");
                                    } else {
                                        var FlightPrice = getSessionstorage("piaojia") + "*" + ($(".parent").length + 1);
                                        var Shuijin = getSessionstorage("shuijin") + "*" + ($(".parent").length + 1);
                                    }
                                    var CompanyName = getSessionstorage("aircomCode");
                                    var FlightCode = "";
                                    var FlightCode1 = [];
                                    var lineType = getSessionstorage("type");
                                    var FlightContent = getSessionstorage("tuigai").trim();
                                    var StartDate = [];
                                    var eTime = getSessionstorage("eTime");
                                    var cityCode1 = [];
                                    var cityCode2 = [];
                                    var cityTime1 = [];
                                    var cityTime2 = [];
                                    var cityCode3 = [];
                                    var cityCode4 = [];
                                    var cityCode5 = [];
                                    var jixing = [];
                                    var cityTime3 = [];
                                    var cityTime4 = [];
                                    if (lineType == "单程") {
                                        var airLine = JSON.parse(getSessionstorage("airLine"));
                                        for (var i = 0; i < airLine.length; i++) {
                                            FlightCode += airLine[i].AirCode + " ";
                                            cityCode1.push(airLine[i].sport);
                                            cityCode2.push(airLine[i].eport);
                                            cityTime1.push(airLine[i].stime.substring(3));
                                            cityTime2.push(airLine[i].etime.substring(3));
                                            jixing.push(airLine[i].jixing);
                                            FlightCode1.push(airLine[i].AirCode);
                                            StartDate.push(date);
                                        }
                                        cityCode3.push(airLine[0].sport);
                                        cityCode3.push(airLine[airLine.length - 1].eport);
                                        cityTime3.push(date)
                                    } else if (lineType == "往返") {
                                        var airLineH = JSON.parse(getSessionstorage("airLineH"));
                                        var airLineQ = JSON.parse(getSessionstorage("airLineQ"));
                                        for (var i = 0; i < airLineQ.length; i++) {
                                            FlightCode += airLineQ[i].AirCode + " ";
                                            cityCode1.push(airLineQ[i].sport);
                                            cityCode2.push(airLineQ[i].eport);
                                            cityTime1.push(airLineQ[i].stime.substring(3));
                                            cityTime2.push(airLineQ[i].etime.substring(3));
                                            jixing.push(airLineQ[i].jixing);
                                            FlightCode1.push(airLineQ[i].AirCode);
                                            StartDate.push(date);
                                        }
                                        for (var i = 0; i < airLineH.length; i++) {
                                            FlightCode += airLineH[i].AirCode + " ";
                                            cityCode1.push(airLineH[i].sport);
                                            cityCode2.push(airLineH[i].eport);
                                            cityTime1.push(airLineH[i].stime.substring(3));
                                            cityTime2.push(airLineH[i].etime.substring(3));
                                            jixing.push(airLineH[i].jixing);
                                            FlightCode1.push(airLineH[i].AirCode);
                                            StartDate.push(eTime);
                                        }

                                        cityCode4.push(airLineQ[0].sport);
                                        cityCode4.push(airLineH[0].sport);
                                        cityCode5.push(airLineQ[airLineQ.length - 1].eport);
                                        cityCode5.push(airLineH[airLineH.length - 1].eport);
                                        cityTime4.push(date);
                                        cityTime4.push(eTime);
                                    }
                                    $.ajax({
                                            url: '@@apispath/AddFilghtServlet',
                                            type: 'get',
                                            dataType: 'text',
                                            data: {
                                                "FlightPrice": FlightPrice,
                                                "Shuijin": Shuijin,
                                                "CompanyName": CompanyName,
                                                "FlightCode": FlightCode,
                                                "FlightContent": FlightContent,
                                                "OrderID": OrderID
                                            }
                                        })
                                        .done(function(data) {
                                            var FlightID = data.split("$")[0];
                                            var OrderID = data.split("$")[1];
                                            var PSEX = [];
                                            $("input:radio:checked").each(function() {
                                                PSEX.push($(this).val());
                                            });
                                            var chengjiren = [];
                                            $(".chengjiren").each(function() {
                                                var $thisC=$(this).children();
                                                var obj = {};
                                                obj.PName = $thisC.find(".airPer").val();
                                                obj.PCode = $thisC.find(".huzhaohaoma").val() + $thisC.find(".huzhaoyouxiao").val();
                                                obj.PBD = $thisC.find(".airchusheng").val();
                                                obj.FlightID = 0;
                                                obj.PHZ = $thisC.find(".huzhaohaoma").val();
                                                obj.PHZYXQ = $thisC.find(".huzhaoyouxiao").val();
                                                chengjiren.push(obj)
                                            })
                                            for (var i = 0; i < chengjiren.length; i++) {
                                                chengjiren[i].PSEX = PSEX[i];
                                            }
                                            for (var i = 0; i < cityTime1.length; i++) {
                                                if (cityTime1[i].indexOf("+1") != -1) {
                                                    StartDate[i] = getNewDay(StartDate[i], 1);
                                                } else if (cityTime1[i].indexOf("+2") != -1) {
                                                    StartDate[i] = getNewDay(StartDate[i], 2)
                                                } else if (cityTime1[i].indexOf("+3") != -1) {
                                                    StartDate[i] = getNewDay(StartDate[i], 3)
                                                } else if (cityTime1[i].indexOf("-1") != -1) {
                                                    StartDate[i] = getNewDay(StartDate[i], -1)
                                                } else if (cityTime1[i].indexOf("-2") != -1) {
                                                    StartDate[i] = getNewDay(StartDate[i], -2)
                                                }
                                            }
                                            
                                            $.ajax({
                                                    url: '@@apispath/AddFilghtServlet',
                                                    type: 'post',
                                                    dataType: 'json',
                                                    traditional: true,
                                                    data: {
                                                        "FlightID": FlightID,
                                                        "StartDate": StartDate,
                                                        "cityCode1": cityCode1,
                                                        "cityTime1": cityTime1,
                                                        "cityCode2": cityCode2,
                                                        "cityCode3": cityCode3,
                                                        "cityCode4": cityCode4,
                                                        "cityCode5": cityCode5,
                                                        "cityTime2": cityTime2,
                                                        "cityTime3": cityTime3,
                                                        "cityTime4": cityTime4,
                                                        "FlightCode1": FlightCode1,
                                                        "jixing": jixing,
                                                        "chengjiren": JSON.stringify(chengjiren),
                                                        "lineType": lineType
                                                    }
                                                })
                                                .done(function(data) {
                                                    if (data == "1") {
                                                        var userID = getSessionstorage("userID");
                                                        var QWZ = getSessionstorage("daodadi");
                                                        var XCContent = $(".remarks_text textarea").val();
                                                        if (XCContent == "｜订单备注") {
                                                            XCContent == "";
                                                        }
                                                        var yidenglu = 0;
                                                        if (userID == null || userID == "null") {
                                                            var Contact = $("#contacts").val();
                                                            var Email = $(".email").val();
                                                            var Mobile = $("#phone").val();
                                                            var pas = $(".pass").val();
                                                            yidenglu = "weidenglu";
                                                        } else {
                                                            yidenglu = "yidenglu";
                                                        }
                                                        $.ajax({
                                                                url: '@@apispath/AdddetailServlet',
                                                                type: 'post',
                                                                dataType: 'json',
                                                                data: {
                                                                    "yidenglu": yidenglu,
                                                                    "userID": userID,
                                                                    "Contact": Contact,
                                                                    "Email": Email,
                                                                    "Mobile": Mobile,
                                                                    "pas": pas,
                                                                    "OrderID": OrderID,
                                                                    "XCContent": XCContent,
                                                                    "chengjiren": JSON.stringify(chengjiren)
                                                                }
                                                            })
                                                            .done(function(data) {
                                                                if (data == "0") {
                                                                    alert("网络错误，请刷新重试，或联系管理员")
                                                                } else {
                                                                    setSessionstorage("userID", data);
                                                                    var _text = "订单提交成功！";
                                                                    if(getUrlParams('specialoffer') == "1"){
                                                                        _text = "，您申请的特价票已提交成功! 请耐心等待客服电话确认。";
                                                                    }
                                                                    alert({
                                                                        text:_text,
                                                                        callfun:function(){ 
                                                                            window.location.href = "@@pagepath/personalHomePage.html";
                                                                        }
                                                                    });
                                                                }
                                                            })
                                                    } else {
                                                        alert("网络错误，请刷新重试，或联系管理员")
                                                    }
                                                })
                                        })
                                })
                        })
                } else {
                    alert("请填写正确的信息")
                    cbigbtn = 0;
                    $(this).removeClass("active").val("提交订单");
                }
            } else {
                alert("网络错误，请刷新重试，或联系管理员")
                cbigbtn = 0;
                $(this).removeClass("active").val("提交订单");
            }
        })
    } else {
        var $contacts = false;
        var $emall = false;
        var $phone = false;
        var $pass = false;
        var ishuiyuan = 0;
        $(".email").blur(function() {
            var $this = $(this);
            var _val = App.clearSpace($this.val(),'.email');
            if (!emall(_val)) {
                $this.css("borderColor", "red")
                $this.siblings("p").html('Email地址格式不正确').show();
                $emall = false;
            } else if(_val.length>50){
            	$this.css("borderColor", "red")
                $this.siblings("p").html('Email长度不能超过50位').show();
                $emall = false;
            } else {
                $this.css("borderColor", "green")
                $this.siblings("p").hide();
                $emall = true;
            }
        });
        $("#contacts").blur(function() {
            var $this = $(this);
            var _val = App.clearSpace($this.val());
            $this.val(_val);
            var _text="";
            if (_val == "") {
            	_text = '该信息不能为空';
            } else if(!App.isEn(_val) && !App.isCn(_val)){
            	_text = '联系人只能是中文或者是英文';
            } else if(App.isCn(_val) && _val.length>4){
            	_text = '联系人名称不能超过4个汉字';
            } else if(App.isEn(_val) && _val.length>15){
            	_text = '联系人名称不能超过15个字母';
            }
            if(_text != ""){
            	$this.css("borderColor", "red")
                $this.siblings("p").html(_text).show();
                $contacts = false;
            } else {
                $this.css("borderColor", "green")
                $this.siblings("p").hide();
                $contacts = true;
            }
        });
        $(".pass").blur(function() {
            var $this = $(this);
            var Mobile = $("#phone").val();
            var password = $this.val();
            var _text = "";
            if (password == "") {
            	_text = "密码不能为空";
            } else if(password.length > 12){
            	_text = "密码长度不能超过12位";
            } else if(!App.isEn(password) && !App.isCn(password) && !App.isNumberEn(password)){
            	_text = "密码只能是数字或字母";
            }
            
            if (_text != "") {
                $this.css("borderColor", "red")
                $this.siblings("p").html(_text).show();
                $pass = false;
            } else if (ishuiyuan == 1) {
                $.ajax({
                    url: '@@apispath/IsLogin',
                    type: 'post',
                    dataType: 'json',
                    data: {
                        "Mobile": Mobile,
                        "password": password
                    },
                    error: function() {
                        alert("网络错误，请刷新重试")
                    }
                })
                .done(function(data) {
                    if (data == "-1") {
                        $this.css("borderColor", "red")
                        $this.siblings("p").html('密码错误！').show();
                        $pass = false;
                    } else {
                        $this.css("borderColor", "green")
                        $this.siblings("p").hide();
                        $pass = true;
                    }
                })
            } else {
                $this.css("borderColor", "green")
                $this.siblings("p").hide();
                $pass = true;
            }
        });
        $(".phone").blur(function() {
            var $this = $(this);
            var Mobile = $this.val();
            if (!phone(Mobile)) {
                $this.css("borderColor", "red")
                $this.siblings("p").show();
                $phone = false;
            } else {
                $this.siblings("p").hide();
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
                    var $contactsC=$(".contacts").children('.pi-item');
                    var $nohuiyuan=$(".nohuiyuan");
                    var $zhushi=$(".zhushi");
                    var $wangjima=$(".wangjima");
                    var $ishuiyuan=$(".ishuiyuan");
                    if (data == "1") {
                        $nohuiyuan.hide();
                        $ishuiyuan.show();
                        ishuiyuan = 1;
                        $contactsC.eq(1).hide();
                        $contactsC.eq(2).hide();
                        $contactsC.eq(3).find('span').html("登陆密码");
                        $zhushi.addClass("active");
                        $zhushi.hide();
                        $wangjima.show();
                        $wangjima.addClass("active");
                    } else {
                        $nohuiyuan.show();
                        $ishuiyuan.hide();
                        ishuiyuan = 2;
                        $contactsC.eq(1).show();
                        $contactsC.eq(2).show();
                        $zhushi.removeClass("active")
                        $wangjima.hide();
                        $wangjima.removeClass("active");
                        
                    }
                })
            }
        })
        
        var cbigbtn = 0;
        $(".cbigbtn").click(function() {
            if (cbigbtn == 0) {
                $(this).addClass("active").val("提交中····");
                cbigbtn++;
                var isturn = "";
                var userID = getSessionstorage("userID");
                var XM = $(".airPer").val();
                var CS = $(".airchusheng").val();
                var HZ = $(".huzhaohaoma").val();
                var YXQ = $(".huzhaoyouxiao").val();
                if (userID == null || userID == "null") {                	
                    if (XM != "" && CS != "" && HZ != "") {
                    	if(ishuiyuan == 1 && $pass && $phone){
                            isturn = true;
                    	}else if($pass && $phone && $emall && $contacts){
                    		isturn = true;
                    	}else{
                    		isturn = false;
                            cbigbtn = 0;
                            $(this).removeClass("active").val("提交订单");
                    	}
                    } else {
                        isturn = false;
                        cbigbtn = 0;
                        $(this).removeClass("active").val("提交订单");
                    }
                } else {
                    if (XM != "" && CS != "" && HZ != "") {
                        isturn = true;
                    } else {
                        isturn = false;
                        cbigbtn = 0;
                        $(this).removeClass("active").val("提交订单");
                    }
                }
                if (isturn) {
                    var Price = $ticketPriceRed.html();
                    var userID = getSessionstorage("userID");
                    var Mobile = $("#phone").val();
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
                        var OrderCode = randomNum(0, 9) + "" + randomNum(0, 9) + "" + randomNum(0, 9) + "" + randomNum(0, 9) + "" + randomNum(0, 9) + "" + randomNum(0, 9);
                        var OrderPrice = $ticketPriceRed.html();
                        var OrderType = 2;
                        var OrderState = "处理中";
                        var FKState = 0;
                        var AirType = lineType;
                        var yidenglu = 0;
                        var mdd = getSessionstorage("daodadi");
                        if (userID == null || userID == "null") {
                            var LXR = $("#contacts").val();
                            var Mobile = $("#phone").val();
                            var LXDH = $("#phone").val();
                            var pas = $(".pass").val();
                            var Contact = $("#contacts").val();
                            var Email = $(".email").val();
                            yidenglu = "weidenglu";
                        } else {
                            yidenglu = "yidenglu";
                        }
                        var _data = {
                            "OrderCode": OrderCode,
                            "OrderPrice": OrderPrice,
                            "OrderType": OrderType,
                            "OrderState": OrderState,
                            "FKState": FKState,
                            "AirType": AirType,
                            "CLNAME": CLNAME,
                            "userID": userID,
                            "LXR": LXR,
                            "Mobile": Mobile,
                            "LXDH": LXDH,
                            "yidenglu": yidenglu,
                            "pas": pas,
                            "Contact": Contact,
                            "Email": Email,
                            "mdd":mdd
                        };
                        console.log(_data);
                        $.ajax({
                            url: '@@apispath/SendAdminServlet',
                            type: 'post',
                            dataType: 'text',
                            data: _data,
                            error: function() {
                                alert("网络错误，请刷新重试，或联系管理员")
                            }
                        })
                        .done(function(data) {
                            var OrderID = data;
                            if ($(".parent").length == 0) {
                                var FlightPrice = getSessionstorage("piaojia");
                                var Shuijin = getSessionstorage("shuijin");
                            } else {
                                var FlightPrice = getSessionstorage("piaojia") + "*" + ($(".parent").length + 1);
                                var Shuijin = getSessionstorage("shuijin") + "*" + ($(".parent").length + 1);
                            }
                            var CompanyName = getSessionstorage("aircomCode");
                            var FlightCode = "";
                            var FlightCode1 = [];
                            var lineType = getSessionstorage("type");
                            var FlightContent = getSessionstorage("tuigai").trim();
                            var StartDate = [];
                            var eTime = getSessionstorage("eTime");
                            var cityCode1 = [];
                            var cityCode2 = [];
                            var cityTime1 = [];
                            var cityTime2 = [];
                            var cityCode3 = [];
                            var cityCode4 = [];
                            var cityCode5 = [];
                            var jixing = [];
                            var cityTime3 = [];
                            var cityTime4 = [];
                            if (lineType == "单程") {
                                var airLine = JSON.parse(getSessionstorage("airLine"));
                                for (var i = 0; i < airLine.length; i++) {
                                    FlightCode += airLine[i].AirCode + " ";
                                    cityCode1.push(airLine[i].sport);
                                    cityCode2.push(airLine[i].eport);
                                    cityTime1.push(airLine[i].stime.substring(3));
                                    cityTime2.push(airLine[i].etime.substring(3));
                                    jixing.push(airLine[i].jixing);
                                    FlightCode1.push(airLine[i].AirCode);
                                    StartDate.push(date);
                                }
                                cityCode3.push(airLine[0].sport);
                                cityCode3.push(airLine[airLine.length - 1].eport);
                                cityTime3.push(date)
                            } else if (lineType == "往返") {
                                var airLineH = JSON.parse(getSessionstorage("airLineH"));
                                var airLineQ = JSON.parse(getSessionstorage("airLineQ"));
                                for (var i = 0; i < airLineQ.length; i++) {
                                    FlightCode += airLineQ[i].AirCode + " ";
                                    cityCode1.push(airLineQ[i].sport);
                                    cityCode2.push(airLineQ[i].eport);
                                    cityTime1.push(airLineQ[i].stime.substring(3));
                                    cityTime2.push(airLineQ[i].etime.substring(3));
                                    jixing.push(airLineQ[i].jixing);
                                    FlightCode1.push(airLineQ[i].AirCode);
                                    StartDate.push(date);
                                }
                                for (var i = 0; i < airLineH.length; i++) {
                                    FlightCode += airLineH[i].AirCode + " ";
                                    cityCode1.push(airLineH[i].sport);
                                    cityCode2.push(airLineH[i].eport);
                                    cityTime1.push(airLineH[i].stime.substring(3));
                                    cityTime2.push(airLineH[i].etime.substring(3));
                                    jixing.push(airLineH[i].jixing);
                                    FlightCode1.push(airLineH[i].AirCode);
                                    StartDate.push(eTime);
                                }

                                cityCode4.push(airLineQ[0].sport);
                                cityCode4.push(airLineH[0].sport);
                                cityCode5.push(airLineQ[airLineQ.length - 1].eport);
                                cityCode5.push(airLineH[airLineH.length - 1].eport);
                                cityTime4.push(date);
                                cityTime4.push(eTime);
                            }
                            $.ajax({
                                url: '@@apispath/AddFilghtServlet',
                                type: 'get',
                                dataType: 'text',
                                data: {
                                    "FlightPrice": FlightPrice,
                                    "Shuijin": Shuijin,
                                    "CompanyName": CompanyName,
                                    "FlightCode": FlightCode,
                                    "FlightContent": FlightContent,
                                    "OrderID": OrderID
                                }
                            })
                            .done(function(data) {
                                var FlightID = data.split("$")[0];
                                var OrderID = data.split("$")[1];
                                var PSEX = [];
                                $("input:radio:checked").each(function() {
                                    PSEX.push($(this).val());
                                });
                                var chengjiren = [];
                                $(".chengjiren").each(function() {
                                    var obj = {};
                                    obj.PName = $(this).children().find(".airPer").val();
                                    obj.PCode = $(this).children().find(".huzhaohaoma").val() + $(this).children().find(".huzhaoyouxiao").val();
                                    obj.PBD = $(this).children().find(".airchusheng").val();
                                    obj.FlightID = 0;
                                    obj.PHZ = $(this).children().find(".huzhaohaoma").val();
                                    obj.PHZYXQ = $(this).children().find(".huzhaoyouxiao").val();
                                    chengjiren.push(obj)
                                })
                                for (var i = 0; i < chengjiren.length; i++) {
                                    chengjiren[i].PSEX = PSEX[i];
                                }
                                for (var i = 0; i < cityTime1.length; i++) {
                                    if (cityTime1[i].indexOf("+1") != -1) {
                                        StartDate[i] = getNewDay(StartDate[i], 1);
                                    } else if (cityTime1[i].indexOf("+2") != -1) {
                                        StartDate[i] = getNewDay(StartDate[i], 2)
                                    } else if (cityTime1[i].indexOf("+3") != -1) {
                                        StartDate[i] = getNewDay(StartDate[i], 3)
                                    } else if (cityTime1[i].indexOf("-1") != -1) {
                                        StartDate[i] = getNewDay(StartDate[i], -1)
                                    } else if (cityTime1[i].indexOf("-2") != -1) {
                                        StartDate[i] = getNewDay(StartDate[i], -2)
                                    }
                                }
                                
                                $.ajax({
                                    url: '@@apispath/AddFilghtServlet',
                                    type: 'post',
                                    dataType: 'json',
                                    traditional: true,
                                    data: {
                                        "FlightID": FlightID,
                                        "StartDate": StartDate,
                                        "cityCode1": cityCode1,
                                        "cityTime1": cityTime1,
                                        "cityCode2": cityCode2,
                                        "cityCode3": cityCode3,
                                        "cityCode4": cityCode4,
                                        "cityCode5": cityCode5,
                                        "cityTime2": cityTime2,
                                        "cityTime3": cityTime3,
                                        "cityTime4": cityTime4,
                                        "FlightCode1": FlightCode1,
                                        "jixing": jixing,
                                        "chengjiren": JSON.stringify(chengjiren),
                                        "lineType": lineType
                                    }
                                })
                                .done(function(data) {
                                    if (data == "1") {
                                        var userID = getSessionstorage("userID");
                                        var QWZ = getSessionstorage("daodadi");
                                        var XCContent = $(".remarks_text textarea").val();
                                        console.log(XCContent)
                                        if (XCContent == "｜订单备注") {
                                            XCContent == "";
                                        }
                                        var yidenglu = 0;
                                        if (userID == null || userID == "null") {
                                            var Contact = $("#contacts").val();
                                            var Email = $(".email").val();
                                            var Mobile = $("#phone").val();
                                            var pas = $(".pass").val();
                                            yidenglu = "weidenglu";
                                        } else {
                                            yidenglu = "yidenglu";
                                        }
                                        $.ajax({
                                            url: '@@apispath/AdddetailServlet',
                                            type: 'post',
                                            dataType: 'json',
                                            data: {
                                                "yidenglu": yidenglu,
                                                "userID": userID,
                                                "Contact": Contact,
                                                "Email": Email,
                                                "Mobile": Mobile,
                                                "pas": pas,
                                                "OrderID": OrderID,
                                                "XCContent": XCContent,
                                                "chengjiren": JSON.stringify(chengjiren)
                                            }
                                        })
                                        .done(function(data) {
                                            if (data == "0") {
                                                alert("网络错误，请刷新重试，或联系管理员")
                                            } else {
                                                setSessionstorage("userID", data);
                                                var _text = "订单提交成功！";
                                                if(getUrlParams('specialoffer') == "1"){
                                                    _text = "您申请的特价票已提交成功! 请耐心等待客服电话确认。";
                                                }
                                                alert({
                                                    text:_text,
                                                    callfun:function(){ 
                                                        window.location.href = "@@pagepath/personalHomePage.html";
                                                    }
                                                });
                                            }
                                        })
                                    } else {
                                        alert("网络错误，请刷新重试，或联系管理员")
                                    }
                                })
                            })
                        })
                    })
                } else {
                    alert("请填写正确的信息")
                    cbigbtn = 0;
                    $(this).removeClass("active").val("提交订单");
                }
            } else {
                alert("网络错误，请刷新重试，或联系管理员")
                cbigbtn = 0;
                $(this).removeClass("active").val("提交订单");
            }
        })
        $(".wangjima").click(function() {
            var _phone = $("#phone").val();
            if (phone(_phone)) {
                $.ajax({
                    url: '@@apispath/Wangjimima',
                    type: 'post',
                    dataType: 'json',
                    data: {
                        "phone": _phone
                    },
                    error: function() {
                        alert("网络错误，请刷新重试")
                    }
                })
                .done(function(data) {
                    if (data == "-1") {
                        alert("您还不是凯兴网的会员，请先注册")
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
});

function delParent(obj) { //点击删除按钮 删除父节点
    obj.parent().remove();
}

function getSessionstorage(key) {
    return window.sessionStorage.getItem(key);
}

function randomNum(min, max) {
    return Math.floor(min + Math.random() * (max - min));
}

function setSessionstorage(key, value) {
    window.sessionStorage.setItem(key, value);
}

function getNewDay(dateTemp, days) {
    var dateTemp = dateTemp.split("-");
    var nDate = new Date(dateTemp[1] + '-' + dateTemp[2] + '-' + dateTemp[0]); //转换为MM-DD-YYYY格式    
    var millSeconds = Math.abs(nDate) + (days * 24 * 60 * 60 * 1000);
    var rDate = new Date(millSeconds);
    var year = rDate.getFullYear();
    var month = rDate.getMonth() + 1;
    if (month < 10) month = "0" + month;
    var date = rDate.getDate();
    if (date < 10) date = "0" + date;
    return (year + "-" + month + "-" + date);
}

function getUrlParams(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return r[2];
    return null;
}