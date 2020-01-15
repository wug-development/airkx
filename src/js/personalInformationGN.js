$(function() {
    $("#head_menu li").eq(0).addClass('active-bji')
    var userID = getSessionstorage("userID");
    if (userID == null || userID == "null") { //用户未登录
        $(".contact").show();
        $(".contactT").show();
        $(".changyongCJR").hide();
    } else { //用户已登陆
        $(".contact").hide();
        $(".contactT").hide();
        $(".changyongCJR").show();
        $('#addPersonInfo').addClass('active');
        $(".add-person").addClass('active');
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
                    if (data[i].SFZ != "") {
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
                            yicunzaiCJR.push($(this).find(".personList").eq(0).find("input").val())
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
                            for (var i = 0; i < CYCJR.length; i++) {
                                if (xingm == CYCJR[i].CjrName) {
                                    $(".xingming").val(CYCJR[i].CjrName);
                                    $(".shenfenzheng").val(CYCJR[i].SFZ);
                                    $(".lichengkahao").eq(0).val(CYCJR[i].LCKH);
                                }
                            }
                        }
                        for (var i = 0; i < xingmingArr.length; i++) {
                            for (var k = 0; k < CYCJR.length; k++) {
                                if (xingmingArr[i] == CYCJR[k].CjrName) {
                                    var num = $(".parent").length;
                                    if (num < 8) {
                                        var PERSON_MORE = '<div class="person-info chengjiren"><a href="javascript:;" class="btn-close Personparent">\
                                                        <input type="hidden" value="1" />\
                                                        <img src="@@imgpath/btn-close.png" alt="">\
                                                    </a>\
                                                     <div class="personList">\
                                                        <span>乘客姓名:</span>\
                                                        <div class="peopleType">成人</div>\
                                                        <input type="text" value="' + CYCJR[k].CjrName + '">\
                                                        <p>该信息不能为空</p>\
                                                    </div>\
                                                    <div class="personList">\
                                                        <span>证件信息:</span>\
                                                        <select>\
                                                            <option>身份证</option>\
                                                            <option>护照</option>\
                                                            <option>军人证</option>\
                                                            <option>港澳通行证</option>\
                                                        </select>\
                                                        <input type="text" value="' + CYCJR[k].SFZ + '">\
                                                        <p>该信息不能为空</p>\
                                                    </div>\
                                                    <div class="personList">\
                                                        <span>里程卡号:</span>\
                                                        <input type="text" class="lichengkahao" value="' + CYCJR[k].LCKH + '">\
                                                        <p>该信息不能为空</p>\
                                                    </div>\
                                                    <div class="personList">\
                                                        <span>购买保险:</span>\
                                                        <select class="maibaoxian">\
                                                            <option>1份</option>\
                                                            <option>2份</option>\
                                                            <option>3份</option>\
                                                        </select>\
                                                        <b>每份20元</b>\
                                                    </div>\
                                                   </div>  ';
                                        $('#person_box').append(PERSON_MORE);
                                    }
                                    window.chengren += 1;
                                    $(".Personparent").unbind("click").on("click", function() {
                                        delParent($(this))
                                        window.chengren -= 1;
                                        zongjia(piaojia, ranyou, Y);
                                        $(".baoxian").html(baoxianshu() * 20 + "元")
                                    })
                                    zongjia(piaojia, ranyou, Y);
                                    addPersonInfo = true;
                                    $addPersonInfoCP.stop().animate({ "opacity": 0 }, 100, function() {
                                        $addPersonInfoCP.hide();
                                    })
                                    $(".maibaoxian").change(function() {
                                        $(".baoxian").html(baoxianshu() * 20 + "元")
                                        zongjia(piaojia, ranyou, Y);
                                    })
                                }
                            }
                        }
                    }
                })
                var changyongCJRT = true;
                $(".changyongCJRT").click(function() {
                    if (changyongCJRT) {
                        $(".changyongCJRTC").stop().animate({ "height": 197 })
                        changyongCJRT = false;
                    } else {
                        $(".changyongCJRTC").stop().animate({ "height": 0 })
                        changyongCJRT = true;
                    }
                })
            })
    }

    var picture = getSessionstorage("picture")
    var AirCode = getSessionstorage("AirCode")
    var Y = getSessionstorage("Y")
    var aircom = getSessionstorage("aircom")
    var chufadi = getSessionstorage("chufadi")
    var cityType = getSessionstorage("cityType")
    var daodadi = getSessionstorage("daodadi")
    var date = getSessionstorage("date")
    var endCityH = getSessionstorage("endCityH")
    var eport = getSessionstorage("eport")
    var etime = getSessionstorage("etime")
    var jixing = getSessionstorage("jixing")
    var piaojia = getSessionstorage("piaojia")
    var ranyou = getSessionstorage("ranyou")
    var sport = getSessionstorage("sport")
    var startCityH = getSessionstorage("startCityH")
    var stime = getSessionstorage("stime")
    var tuigai = getSessionstorage("tuigai")
    var type = getSessionstorage("type")
    var zhuanji = getSessionstorage("zhuanji");
    var guoneihangxian = '<div class="personal-ticketairjixing"><img src="' + picture + '" alt="">' + aircom + '&nbsp;&nbsp;&nbsp;' + AirCode + '&nbsp;&nbsp;&nbsp;机型：' + jixing + '</div>\
                            <div class="personal-ticketTime">\
                                <span>出发时间</span><b>到达时间</b>\
                            </div>\
                            <div class="personal-ticketTime1">\
                                <span>' + stime.substring(3) + '</span><b>' + etime.substring(3) + '</b>\
                            </div>\
                            <div class="personal-ticketTime2">\
                                <span>' + sport + '</span><img src="@@imgpath/line_01.png"><b>' + eport + '</b>\
                            </div>'
    $(".personal-ticket").eq(0).append(guoneihangxian)

    $(".piaojia").html(piaojia + "元");
    $(".jijian").html(ranyou + "元")
    $(".zonggong").html(parseInt(piaojia) + parseInt(ranyou) + 20 + "元")


    window.chengren = 1;
    window.ertong = 0;
    window.yinger = 0;
    $(".maibaoxian").change(function() {
        $(".baoxian").html(baoxianshu() * 20 + "元")
        zongjia(piaojia, ranyou, Y);
    })

    var PERSON_MORE = '';
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
        var num = $(".parent").length;
        if (num < 8) {
            PERSON_MORE = '<div class="person-info chengjiren"><a href="javascript:;" class="btn-close Personparent">\
                                <input type="hidden" value="1" />\
                                <img src="@@imgpath/btn-close.png" alt="">\
                            </a>\
                             <div class="personList">\
                                <span>乘客姓名:</span>\
                                <div class="peopleType">成人</div>\
                                <input type="text">\
                                <p>该信息不能为空</p>\
                            </div>\
                            <div class="personList">\
                                <span>证件信息:</span>\
                                <select>\
                                    <option>身份证</option>\
                                    <option>护照</option>\
                                    <option>军人证</option>\
                                    <option>港澳通行证</option>\
                                </select>\
                                <input type="text">\
                                <p>该信息不能为空</p>\
                            </div>\
                            <div class="personList">\
                                <span>里程卡号:</span>\
                                <input type="text" class="lichengkahao">\
                                <p>该信息不能为空</p>\
                            </div>\
                            <div class="personList">\
                                <span>购买保险:</span>\
                                <select class="maibaoxian">\
                                    <option>1份</option>\
                                    <option>2份</option>\
                                    <option>3份</option>\
                                </select>\
                                <b>每份20元</b>\
                            </div>\
                           </div>  ';
            $('#person_box').append(PERSON_MORE);
        }
        window.chengren += 1;
        $(".Personparent").unbind("click").on("click", function() {
            delParent($(this))
            window.chengren -= 1;
            zongjia(piaojia, ranyou, Y);
            $(".baoxian").html(baoxianshu() * 20 + "元")
        })
        zongjia(piaojia, ranyou, Y);
        addPersonInfo = true;
        $addPersonInfoCP.stop().animate({ "opacity": 0 }, 100, function() {
            $addPersonInfoCP.hide();
        })
        $(".maibaoxian").change(function() {
            $(".baoxian").html(baoxianshu() * 20 + "元")
            zongjia(piaojia, ranyou, Y);
        })
    })
    


    var $xingming = false;
    $(".xingming").blur(function() {
        var $this = $(this);
        if ($this.val() == "") {
            $this.css("borderColor", "red")
            $this.siblings("p").show();
            $xingming = false;
        } else {
            $this.css("borderColor", "green")
            $this.siblings("p").hide();
            $xingming = true;
        }
    })
    var $shenfenzheng = false;
    $(".shenfenzheng").blur(function() {
        var $this = $(this);
        if ($this.val() == "") {
            $this.css("borderColor", "red")
            $this.siblings("p").show();
            $shenfenzheng = false;
        } else {
            $this.css("borderColor", "green")
            $this.siblings("p").hide();
            $shenfenzheng = true;
        }
    })



    var userID = getSessionstorage("userID");
    if (userID != null && userID != "null") {
        var cbigbtn = 0;
        $(".cbigbtn").click(function() {
            if (cbigbtn == 0) {
                cbigbtn++;
                $(this).addClass("active").val("提交中····");
                var isturn = "";
                var sfz = $(".shenfenzheng").val();
                var xingm = $(".xingming").val();
                if (sfz != "" && xingm != "") {
                    isturn = true;
                } else {
                    isturn = false;
                    cbigbtn = 0;
                    $(this).removeClass("active").val("提交订单");
                }
                if (isturn) {
                    var userID = getSessionstorage("userID");
                    var chengjiren = [];
                    $(".chengjiren").each(function() {
                        var chengren = $(this).children(".personList").eq(0).children('.peopleType').html();
                        if (chengren == "成人") {
                            chengjiren.push(parseInt(piaojia) + parseInt(ranyou));
                        } else if (chengren == "儿童") {
                            chengjiren.push(Y * 0.5)
                        } else if (chengren == "婴儿") {
                            chengjiren.push(Y * 0.1)
                        }
                        var xingming = $(this).children(".personList").eq(0).children('input').val();
                        var shenfenzheng = $(this).children(".personList").eq(1).children('select').val();
                        var haoma = $(this).children(".personList").eq(1).children('input').val();
                        var baoxianshu = $(this).children(".personList").eq(3).children('select').val().substring(0, 1);
                        var lichengkahao = $(this).children(".personList").eq(2).children('input').val();
                        chengjiren.push(chengren);
                        chengjiren.push(xingming);
                        chengjiren.push(shenfenzheng);
                        chengjiren.push(haoma);
                        chengjiren.push(baoxianshu);
                        chengjiren.push(lichengkahao);
                    })
                    var Mobile = $("#phone").val();
                    $.ajax({
                            url: '@@apispath/AdminLunhuan',
                            type: 'post',
                            dataType: 'text',
                            data: {
                                "Mobile": Mobile,
                                "userID": userID
                            }
                        })
                        .done(function(data) {
                            var CLNAME = data;
                            var OrderCode = randomNum(0, 9) + "" + randomNum(0, 9) + "" + randomNum(0, 9) + "" + randomNum(0, 9) + "" + randomNum(0, 9) + "" + randomNum(0, 9);
                            var OrderPrice = $(".zonggong").html().substring(0, $(".zonggong").html().length - 1);
                            var OrderType = 1;
                            var OrderState = "处理中";
                            var FKState = 0;
                            var AirType = "国内";
                            var yidenglu = 0;
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
                                        "Email": Email
                                    },
                                    error: function() {
                                        alert("网络错误，请刷新重试，或联系管理员")
                                    }
                                })
                                .done(function(data) {
                                    var OrderID = data;
                                    var AirCode = getSessionstorage("AirCode").substring(2)
                                    var ShortName = getSessionstorage("AirCode").substring(0, 2);
                                    var StartTime = getSessionstorage("stime").substring(3);
                                    var EndTime = getSessionstorage("etime").substring(3);
                                    var StartCity = getSessionstorage("chufadi");
                                    var EndCity = getSessionstorage("daodadi");
                                    var StartDate = getSessionstorage("date");
                                    var ReturnDate = "yyyy-mm-ss";
                                    var AirCW = getSessionstorage("AirCW");
                                    var AirPortName = getSessionstorage("sport") + "-" + getSessionstorage("eport");
                                    var PNR = "";
                                    var GS = "";
                                    var TGQ = getSessionstorage("tuigai");
                                    var ZK = getSessionstorage("zhekou");
                                    var QJ = getSessionstorage("piaojia");
                                    var piaojiaaaa=$(".piaojia").html().substring(0,$(".piaojia").html().length-1);
                                    GS = piaojiaaaa + " + " + getSessionstorage("ranyou") + " + " + "20";
                                    $.ajax({
                                            url: '@@apispath/AddGndetail',
                                            type: 'get',
                                            dataType: 'text',
                                            data: {
                                                "OrderID": OrderID,
                                                "AirCode": AirCode,
                                                "ShortName": ShortName,
                                                "StartTime": StartTime,
                                                "EndTime": EndTime,
                                                "StartCity": StartCity,
                                                "EndCity": EndCity,
                                                "StartDate": StartDate,
                                                "ReturnDate": ReturnDate,
                                                "AirCW": AirCW,
                                                "AirPortName": AirPortName,
                                                "GS": GS,
                                                "TGQ": TGQ,
                                                "ZK": ZK,
                                                "QJ": QJ
                                            },
                                            error: function() {
                                                alert("网络错误，请刷新重试，或联系管理员")
                                            }
                                        })
                                        .done(function(data) {
                                            if (data == "1") {
                                                var yidenglu = 0;
                                                if (userID == null || userID == "null") {
                                                    var Mobile = $("#phone").val();
                                                    var pas = $(".pass").val();
                                                    var Contact = $("#contacts").val();
                                                    var Email = $(".email").val();
                                                    yidenglu = "weidenglu";
                                                } else {
                                                    yidenglu = "yidenglu";
                                                }
                                                $.ajax({
                                                        url: '@@apispath/AddGndetail',
                                                        type: 'post',
                                                        dataType: 'text',
                                                        traditional: true,
                                                        data: {
                                                            "chengjiren": chengjiren,
                                                            "OrderID": OrderID,
                                                            "userID": userID,
                                                            "Mobile": Mobile,
                                                            "pas": pas,
                                                            "Contact": Contact,
                                                            "Email": Email,
                                                            "yidenglu": yidenglu

                                                        },
                                                        error: function() {
                                                            alert("网络错误，请刷新重试，或联系管理员")
                                                        }
                                                    })
                                                    .done(function(data) {
                                                        if (data == "0") {
                                                            alert("网络错误，请刷新重试，或联系管理员")
                                                        } else {
                                                            alert("订单提交成功，即将跳转到个人中心");
                                                            setSessionstorage("userID", data);
                                                            window.location.href = "@@pagepath/personalHomePage.html";
                                                        }
                                                    })
                                            } else {
                                                alert("网络错误，请刷新重试，或联系管理员")
                                            }
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
        });
    } else  {
        $(".phone").blur(function() {
            var $emall = false;
            var $contacts = false;
            var ishuiyuan = 0;
            var $phone = false;
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
                        var $nohuiyuan=$(".nohuiyuan");
                        var $ishuiyuan=$(".ishuiyuan");
                        var $contacts=$(".contacts");
                        var $zhushi=$(".zhushi");
                        var $wangjima=$(".wangjima");
                        if (data == "1") {
                            $nohuiyuan.hide();
                            $ishuiyuan.show();
                            ishuiyuan = 1;
                            $contacts.children('.pi-item').eq(1).hide();
                            $contacts.children('.pi-item').eq(2).hide();
                            $contacts.children('.pi-item').eq(3).find('span').html("登陆密码");
                            $zhushi.addClass("active");
                            $zhushi.hide();
                            $wangjima.addClass("active");
                            $wangjima.show();
                            $emall = true;
                            $contacts = true;
                        } else {
                            $nohuiyuan.show();
                            $ishuiyuan.hide();
                            ishuiyuan = 2;
                            $contacts.children('.pi-item').eq(1).show();
                            $contacts.children('.pi-item').eq(2).show();
                            $zhushi.removeClass("active")
                            $wangjima.removeClass("active");
                            $wangjima.hide();
                            $("#contacts").blur(function() {
                                var $this = $(this);
                                if ($this.val() == "") {
                                    $this.css("borderColor", "red")
                                    $this.siblings("p").show();
                                    $contacts = false;
                                } else {
                                    $this.css("borderColor", "green")
                                    $this.siblings("p").hide();
                                    $contacts = true;
                                }
                            })
                            $(".email").blur(function() {
                                var $this = $(this);
                                if (!emall($this.val())) {
                                    $this.css("borderColor", "red")
                                    $this.siblings("p").show();
                                    $emall = false;
                                } else {
                                    $this.css("borderColor", "green")
                                    $this.siblings("p").hide();
                                    $emall = true;
                                }
                            })
                        }
                        var $pass = false;
                        $(".pass").blur(function() {
                            var $this = $(this);
                            var Mobile = $("#phone").val();
                            var password = $this.val();
                            if (ishuiyuan == 1) {
                                if (password == "" || password.length > 12) {
                                    $this.css("borderColor", "red")
                                    $this.siblings("p").show();
                                    $pass = false;
                                } else {
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
                                                $this.siblings("p").show();
                                                $pass = false;
                                            } else {
                                                $this.css("borderColor", "green")
                                                $this.siblings("p").hide();
                                                $pass = true;
                                            }
                                        })
                                }
                            } else if (ishuiyuan == 2) {
                                if (password == "") {
                                    $this.css("borderColor", "red")
                                    $this.siblings("p").show();
                                    $pass = false;
                                } else {
                                    $this.css("borderColor", "green")
                                    $this.siblings("p").hide();
                                    $pass = true;
                                }
                            }
                        })

                        var cbigbtn = 0;
                        $(".cbigbtn").click(function() {
                            if (cbigbtn == 0) {
                                cbigbtn++;
                                $(this).addClass("active").val("提交中····");
                                var isturn = "";
                                var userID = getSessionstorage("userID");
                                if (userID == null || userID == "null") {
                                    isturn = $phone && $pass && $contacts && $emall;
                                } else {
                                    var sfz = $(".shenfenzheng").val();
                                    var xingm = $(".xingming").val();
                                    if (sfz != "" && xingm != "") {
                                        isturn = true;
                                    } else {
                                        isturn = false;
                                        cbigbtn = 0;
                                        $(this).removeClass("active").val("提交订单");
                                    }
                                }
                                if (isturn) {
                                    var userID = getSessionstorage("userID");
                                    var chengjiren = [];
                                    $(".chengjiren").each(function() {
                                        var chengren = $(this).children(".personList").eq(0).children('.peopleType').html();
                                        if (chengren == "成人") {
                                            chengjiren.push(parseInt(piaojia) + parseInt(ranyou));
                                        } else if (chengren == "儿童") {
                                            chengjiren.push(Y * 0.5)
                                        } else if (chengren == "婴儿") {
                                            chengjiren.push(Y * 0.1)
                                        }
                                        var xingming = $(this).children(".personList").eq(0).children('input').val();
                                        var shenfenzheng = $(this).children(".personList").eq(1).children('select').val();
                                        var haoma = $(this).children(".personList").eq(1).children('input').val();
                                        var baoxianshu = $(this).children(".personList").eq(3).children('select').val().substring(0, 1);
                                        var lichengkahao = $(this).children(".personList").eq(2).children('input').val();
                                        chengjiren.push(chengren);
                                        chengjiren.push(xingming);
                                        chengjiren.push(shenfenzheng);
                                        chengjiren.push(haoma);
                                        chengjiren.push(baoxianshu);
                                        chengjiren.push(lichengkahao);
                                    })
                                    var Mobile = $("#phone").val();
                                    $.ajax({
                                            url: '@@apispath/AdminLunhuan',
                                            type: 'post',
                                            dataType: 'text',
                                            data: {
                                                "Mobile": Mobile,
                                                "userID": userID
                                            }
                                        })
                                        .done(function(data) {
                                            var CLNAME = data;
                                            var OrderCode = randomNum(0, 9) + "" + randomNum(0, 9) + "" + randomNum(0, 9) + "" + randomNum(0, 9) + "" + randomNum(0, 9) + "" + randomNum(0, 9);
                                            var OrderPrice = $(".zonggong").html().substring(0, $(".zonggong").html().length - 1);
                                            var OrderType = 1;
                                            var OrderState = "处理中";
                                            var FKState = 0;
                                            var AirType = "国内";
                                            var yidenglu = 0;
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
                                                        "Email": Email
                                                    },
                                                    error: function() {
                                                        alert("网络错误，请刷新重试，或联系管理员")
                                                    }
                                                })
                                                .done(function(data) {
                                                    var OrderID = data;
                                                    var AirCode = getSessionstorage("AirCode").substring(2);
                                                    var ShortName = getSessionstorage("AirCode").substring(0, 2);
                                                    var StartTime = getSessionstorage("stime").substring(3);
                                                    var EndTime = getSessionstorage("etime").substring(3);
                                                    var StartCity = getSessionstorage("chufadi");
                                                    var EndCity = getSessionstorage("daodadi");
                                                    var StartDate = getSessionstorage("date");
                                                    var ReturnDate = "yyyy-mm-ss";
                                                    var AirCW = getSessionstorage("AirCW");
                                                    var AirPortName = getSessionstorage("sport") + "-" + getSessionstorage("eport");
                                                    var PNR = "";
                                                    var GS = "";
                                                    var TGQ = getSessionstorage("tuigai");
                                                    var ZK = getSessionstorage("zhekou");
                                                    var QJ = getSessionstorage("piaojia");
                                                    var piaojiaaaa=$(".piaojia").html().substring(0,$(".piaojia").html().length-1);
                                    				GS = piaojiaaaa + " + " + getSessionstorage("ranyou") + " + " + "0";
                                                    $.ajax({
                                                            url: '@@apispath/AddGndetail',
                                                            type: 'get',
                                                            dataType: 'text',
                                                            data: {
                                                                "OrderID": OrderID,
                                                                "AirCode": AirCode,
                                                                "ShortName": ShortName,
                                                                "StartTime": StartTime,
                                                                "EndTime": EndTime,
                                                                "StartCity": StartCity,
                                                                "EndCity": EndCity,
                                                                "StartDate": StartDate,
                                                                "ReturnDate": ReturnDate,
                                                                "AirCW": AirCW,
                                                                "AirPortName": AirPortName,
                                                                "GS": GS,
                                                                "TGQ": TGQ,
                                                                "ZK": ZK,
                                                                "QJ": QJ
                                                            },
                                                            error: function() {
                                                                alert("网络错误，请刷新重试，或联系管理员")
                                                            }
                                                        })
                                                        .done(function(data) {
                                                            if (data == "1") {
                                                                var yidenglu = 0;
                                                                if (userID == null || userID == "null") {
                                                                    var Mobile = $("#phone").val();
                                                                    var pas = $(".pass").val();
                                                                    var Contact = $("#contacts").val();
                                                                    var Email = $(".email").val();
                                                                    yidenglu = "weidenglu";
                                                                } else {
                                                                    yidenglu = "yidenglu";
                                                                }
                                                                $.ajax({
                                                                        url: '@@apispath/AddGndetail',
                                                                        type: 'post',
                                                                        dataType: 'text',
                                                                        traditional: true,
                                                                        data: {
                                                                            "chengjiren": chengjiren,
                                                                            "OrderID": OrderID,
                                                                            "userID": userID,
                                                                            "Mobile": Mobile,
                                                                            "pas": pas,
                                                                            "Contact": Contact,
                                                                            "Email": Email,
                                                                            "yidenglu": yidenglu

                                                                        },
                                                                        error: function() {
                                                                            alert("网络错误，请刷新重试，或联系管理员")
                                                                        }
                                                                    })
                                                                    .done(function(data) {
                                                                        if (data == "0") {
                                                                            alert("网络错误，请刷新重试，或联系管理员")
                                                                        } else {
                                                                            alert("订单提交成功，即将跳转到个人中心");
                                                                            setSessionstorage("userID", data);
                                                                            window.location.href = "@@pagepath/personalHomePage.html";
                                                                        }
                                                                    })
                                                            } else {
                                                                alert("网络错误，请刷新重试，或联系管理员")
                                                            }
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
                        });
                        $(".wangjima").click(function() {
                            var phonee = function(phone) { //手机号
                                var mobileRegex = /^(((1[3456789][0-9]{1})|(15[0-9]{1}))+\d{8})$/;
                                if (mobileRegex.test(phone)) {
                                    return true;
                                } else {
                                    return false;
                                }
                            }
                            var phone = $("#phone").val();
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
                    })
            }
        })
    }
})

function delParent(obj) { //点击删除按钮 删除父节点
    obj.parent().remove();
}

function getSessionstorage(key) {
    return window.sessionStorage.getItem(key);
}

function baoxianshu() {
    var baoxian = 0;
    $(".maibaoxian").each(function() {
        baoxian += parseInt($(this).val())
    })
    return baoxian;
}

function zongjia(piaojia, ranyou, Y) {
    var chengren = window.chengren;
    var ertong = window.ertong;
    var yinger = window.yinger;
    var chengrenjiage = piaojia * chengren + ranyou * chengren;
    var ertongjiage = ertong * Y * 0.5;
    var yingerjiage = yinger * Y * 0.1;
    var baoxian = baoxianshu() * 20;
    $(".zonggong").html(chengrenjiage + ertongjiage + yingerjiage + baoxian + "元")
}

function randomNum(min, max) {
    return Math.floor(min + Math.random() * (max - min));
}

function setSessionstorage(key, value) {
    window.sessionStorage.setItem(key, value);
}