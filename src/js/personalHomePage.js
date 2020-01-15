$(function() {
    var head_menuLi = $("#head_menu li");
    var head_bottom_ul = $(".head-bottom ul");

    var userID = getSessionstorage("userID");
    if (userID == null || userID == "null") {
        alert("您还没登陆，请您登陆");
        window.location.href = "@@pagepath/login.html";
    } else {
        $(".yonghutuichu").hide();
        $(".yonghutuichu1").show();
        $(".yonghutuichu1").click(function() {
            window.location.href = "@@pagepath/login.html";
            deleteItem("userID");
        })
        $.ajax({
                url: '@@apispath/SendUserInfoServlet',
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

                $(".useName").html(data.UserName);
                var Mobile = data.Mobile;
                $(".right-xingming").val(data.UserName);
                $(".rightshouji").val(Mobile);
                $(".rightyouxiang").val(data.emall);
                $(".rightmima").val(data.Password);
                $(".rightFL").eq(0).find("span").html(data.jifen + "分");
                $(".rightFL").eq(1).find("span").html(data.jiangjin + "元");
                $(".useName").click(function() {
                    return false;
                })
                $.ajax({
                        url: '@@apispath/SendUserInfoServlet',
                        type: 'get',
                        dataType: 'json',
                        data: {
                            "Mobile": Mobile
                        },
                        error: function() {
                            alert("网络错误，请刷新重试")
                        }
                    })
                    .done(function(data) {
                        var html = '';
                        for (var i = 0; i < data.length; i++) {
                            html += '<div class="rightSI-list">\
                                            <div class="rightSI-list-title">\
                                                <span>' + data[i].CjrName + '</span>\
                                            </div>\
                                            <div class="rightSI-list-con">\
                                                <div class="rightSI-list-con-title"></div>\
                                                <div class="rightSI-list-con-con">\
                                                    <div class="rightSI-list-con-list">\
                                                        <span>姓名：</span>\
                                                        <p>' + data[i].CjrName + '</p>\
                                                    </div>\
                                                    <div class="rightSI-list-con-list">\
                                                        <span>证件号码：</span>\
                                                        <p>' + data[i].SFZ + '</p>\
                                                    </div>\
                                                    <div class="rightSI-list-con-list">\
                                                        <span>性别：</span>\
                                                        <p>' + data[i].Sex + '</p>\
                                                    </div>\
                                                    <div class="rightSI-list-con-list">\
                                                        <span>出生日期：</span>\
                                                        <p>' + data[i].CSRQ + '</p>\
                                                    </div>\
                                                    <div class="rightSI-list-con-list">\
                                                        <span>护照号码：</span>\
                                                        <p>' + data[i].HZH + '</p>\
                                                    </div>\
                                                    <div class="rightSI-list-con-list">\
                                                        <span>护照有效期：</span>\
                                                        <p>' + data[i].HZYXQ + '</p>\
                                                    </div>\
                                                </div>\
                                            </div>\
                                        </div>';
                        }
                        $('.rightSI').append(html);
                        $(".rightSI-list-title").click(function() {
                            var $this=$(this);
                            if ($this.siblings(".rightSI-list-con").height() < 1) {
                                $this.siblings(".rightSI-list-con").stop().animate({ "height": 165 });
                            } else {
                                $this.siblings(".rightSI-list-con").stop().animate({ "height": 0 });
                            }
                        })
                        $.ajax({
                                url: '@@apispath/OrderInfoServlet',
                                type: 'get',
                                dataType: 'json',
                                data: {
                                    "Mobile": Mobile
                                },
                                error: function() {
                                    alert("网络错误，请刷新重试")
                                }
                            })
                            .done(function(data) {
                                for (var i = 0; i < data.length; i++) {
                                    if (data[i].type == "国外") {
                                        if (data[i].xingcheng.length == 0) {
                                            data[i].StartDate = "待定";
                                            data[i].xingcheng = "待定";
                                        } else {
                                            if (data[i].xingcheng[0].StartDate == "") {
                                                data[i].StartDate = "待定";
                                                data[i].xingcheng = "待定";
                                            } else {
                                                data[i].StartDate = data[i].xingcheng[0].StartDate;
                                                data[i].xingcheng = data[i].xingcheng[0].StartCity + "-" + data[i].xingcheng[0].EndCity;
                                            }
                                        }
                                    }
                                }
                                var html = "";
                                var data = arrMin(data);
                                for (var i = 0; i < data.length; i++) {
                                    if (data[i].OrderState == "处理中") {
                                        data[i].OrderState = "处理中..."
                                    }
                                    html += '<div class="item-up">\
                                                <div>' + data[i].OrderCode + '</div>\
                                                <div class="red" title="' + data[i].xingcheng + '">' + data[i].xingcheng + '</div>\
                                                <div>' + data[i].StartDate + '</div>\
                                                <div>¥' + data[i].OrderPrice + '</div>\
                                                <div>' + data[i].OrderTime.substring(0, 10) + '</div>\
                                                <span>' + data[i].OrderState + '</span>\
                                                <input type="hidden" value="' + data[i].OrderID + '"/>\
                                            </div>'
                                }
                                var $text_wrap = $(".text-wrap");
                                $text_wrap.append(html);
                                $(".item-up").each(function() {
                                    if ($(this).children().eq(5).html() == "处理中...") {
                                        $(this).children().eq(5).css("color", "#f00000")
                                    }
                                })
                                $text_wrap.children(".item-up").click(function() {
                                    var OrderID = $(this).children("input").val();
                                    $.ajax({
                                            url: '@@apispath/OrderInfoServlet',
                                            type: 'post',
                                            dataType: 'json',
                                            data: {
                                                "OrderID": OrderID
                                            },
                                            error: function() {
                                                alert("网络错误，请刷新重试")
                                            }
                                        })
                                        .done(function(data) {
                                            if (data.FKFS == "" || data.FKFS == undefined) {
                                                data.FKFS = "未支付";
                                            }
                                            var zhifuHtml = '<div class="zhifu">\
                                                                <div class="zhifutitle">\
                                                                    <div class="fkxinxi">付款信息</div>\
                                                                    <div class="yingfujine">(应付金额 ￥<i>' + data.zongjia + '</i>)</div>\
                                                                    <div class="shiyongjiangjin">[使用奖金<i>' + data.shiyongjiangjin + '</i>元]</div>\
                                                                    <div class="shifujine">实付金额&nbsp;￥<i>' + data.shifujine + '</i></div>\
                                                                    <span>使用奖金需客服确认机位后进行！</span>\
                                                                </div>\
                                                                <div class="shiyongjiangjinDE">\
                                                                    <div class="jiangjindejine">可用奖金&nbsp;￥<i>' + data.jiangjin + '</i></div>\
                                                                    <div class="shurujiangjin">请输入使用金额&nbsp;\
                                                                        <input type="text">元</div>\
                                                                    <div class="jiangjinbeizhu">*不可大于奖金数</div>\
                                                                    <div class="quedingshiyong">确定</div>\
                                                                </div>\
                                                                <div class="fukuanfangshi">付款方式：<i>' + data.FKFS + '</i></div>\
                                                                <div class="zhifuDE">\
                                                                    <div class="zhifuDE-title">\
                                                                        <span class="active">在线支付</span>\
                                                                        <span>银行汇款</span>\
                                                                        <span>现金</span>\
                                                                        <span>上门刷卡</span>\
                                                                        <span>微信支付</span>\
                                                                        <span>支付宝转账</span>\
                                                                    </div>\
                                                                    <div class="zhifuDE-con">\
                                                                        <div class="qwe">\
                                                                            <div class="kazhifu-title">\
                                                                                <span style="margin-left:311px;">借记卡</span>\
                                                                                <span style="margin-left:103px;">信用卡</span>\
                                                                                <div class="underline1"></div>\
                                                                            </div>\
                                                                            <div class="kamen">\
                                                                                <div>\
                                                                                    <ul>\
                                                                                        <li>\
                                                                                            <input type="radio" name="selecBank" class="selecBank" value="ICBC-NET-B2C">\
                                                                                            <img src="./images/gongshangyinhang.png" alt="" title="工商银行">\
                                                                                        </li>\
                                                                                        <li>\
                                                                                            <input type="radio" name="selecBank" class="selecBank" value="CEB-NET-B2C">\
                                                                                            <img src="./images/guangdayinhang.png" alt="" title="光大银行">\
                                                                                        </li>\
                                                                                        <li>\
                                                                                            <input type="radio" name="selecBank" class="selecBank" value="ABC-NET-B2C">\
                                                                                            <img src="./images/nongyeyinhang.png" alt="" title="农业银行">\
                                                                                        </li>\
                                                                                        <li>\
                                                                                            <input type="radio" name="selecBank" class="selecBank" value="CCB-NET-B2C">\
                                                                                            <img src="./images/jiansheyinhang.png" alt="" title="建设银行">\
                                                                                        </li>\
                                                                                        <li>\
                                                                                            <input type="radio" name="selecBank" class="selecBank" value="HXB-NET-B2C">\
                                                                                            <img src="./images/huaxiayinhang.png" alt="" title="华夏银行">\
                                                                                        </li>\
                                                                                        <li>\
                                                                                            <input type="radio" name="selecBank" class="selecBank" value="SDB-NET-B2C">\
                                                                                            <img src="./images/shenzhenfazhanyinhang.png" alt="" title="深圳发展银行">\
                                                                                        </li>\
                                                                                        <li>\
                                                                                            <input type="radio" name="selecBank" class="selecBank" value="POST-NET-B2C">\
                                                                                            <img src="./images/youzhengyinhang.png" alt="" title="中国邮政储蓄">\
                                                                                        </li>\
                                                                                        <li>\
                                                                                            <input type="radio" name="selecBank" class="selecBank" value="ECITIC-NET-B2C">\
                                                                                            <img src="./images/zhongxinyinhang.png" alt="" title="中信银行">\
                                                                                        </li>\
                                                                                        <li>\
                                                                                            <input type="radio" name="selecBank" class="selecBank" value="SPDB-NET-B2C">\
                                                                                            <img src="./images/shanghaipudongyinhang.png" alt="" title="上海浦东发展银行">\
                                                                                        </li>\
                                                                                        <li>\
                                                                                            <input type="radio" name="selecBank" class="selecBank" value="CMBCHINA-NET-B2C">\
                                                                                            <img src="./images/zhaoshangyinhang.png" alt="" title="招商银行">\
                                                                                        </li>\
                                                                                        <li>\
                                                                                            <input type="radio" name="selecBank" class="selecBank" value="BOC-NET-B2C">\
                                                                                            <img src="./images/zhongguoyinhang.png" alt="" title="中国银行">\
                                                                                        </li>\
                                                                                        <li>\
                                                                                            <input type="radio" name="selecBank" class="selecBank" value="PINGANBANK-NET">\
                                                                                            <img src="./images/pinganyinhang.png" alt="" title="平安银行">\
                                                                                        </li>\
                                                                                    </ul>\
                                                                                </div>\
                                                                                <div>\
                                                                                    <ul>\
                                                                                        <li>\
                                                                                            <input type="radio" name="selecBank" class="selecBank" value="工商银行信用卡">\
                                                                                            <img src="./images/gongshangyinhang.png" alt="" title="工商银行信用卡">\
                                                                                        </li>\
                                                                                        <li>\
                                                                                            <input type="radio" name="selecBank" class="selecBank" value="招商银行信用卡">\
                                                                                            <img src="./images/zhaoshangyinhang.png" alt="" title="招商银行信用卡">\
                                                                                        </li>\
                                                                                        <li>\
                                                                                            <input type="radio" name="selecBank" class="selecBank" value="农业银行信用卡">\
                                                                                            <img src="./images/nongyeyinhang.png" alt="" title="农业银行信用卡">\
                                                                                        </li>\
                                                                                        <li>\
                                                                                            <input type="radio" name="selecBank" class="selecBank" value="建设银行信用卡">\
                                                                                            <img src="./images/jiansheyinhang.png" alt="" title="建设银行信用卡">\
                                                                                        </li>\
                                                                                        <li>\
                                                                                            <input type="radio" name="selecBank" class="selecBank" value="北京银行信用卡">\
                                                                                            <img src="./images/beijingyinhang.png" alt="" title="北京银行信用卡">\
                                                                                        </li>\
                                                                                        <li class="mgr0">\
                                                                                            <input type="radio" name="selecBank" class="selecBank" value="广发银行信用卡">\
                                                                                            <img src="./images/guangfayinhang.png" alt="" title="广发银行信用卡">\
                                                                                        </li>\
                                                                                        <li>\
                                                                                            <input type="radio" name="selecBank" class="selecBank" value="兴业银行信用卡">\
                                                                                            <img src="./images/xingyeyinhang.png" alt="" title="兴业银行信用卡">\
                                                                                        </li>\
                                                                                        <li>\
                                                                                            <input type="radio" name="selecBank" class="selecBank" value="华夏银行信用卡">\
                                                                                            <img src="./images/huaxiayinhang.png" alt="" title="华夏银行信用卡">\
                                                                                        </li>\
                                                                                        <li>\
                                                                                            <input type="radio" name="selecBank" class="selecBank" value="深圳发展银行信用卡">\
                                                                                            <img src="./images/shenzhenfazhanyinhang.png" alt="" title="深圳发展银行信用卡">\
                                                                                        </li>\
                                                                                        <li>\
                                                                                            <input type="radio" name="selecBank" class="selecBank" value="民生银行信用卡">\
                                                                                            <img src="./images/minshengyinhang.png" alt="" title="民生银行信用卡">\
                                                                                        </li>\
                                                                                        <li>\
                                                                                            <input type="radio" name="selecBank" class="selecBank" value="中国银行信用卡">\
                                                                                            <img src="./images/zhongguoyinhang.png" alt="" title="中国银行信用卡">\
                                                                                        </li>\
                                                                                        <li>\
                                                                                            <input type="radio" name="selecBank" class="selecBank" value="平安银行信用卡">\
                                                                                            <img src="./images/pinganyinhang.png" alt="" title="平安银行信用卡">\
                                                                                        </li>\
                                                                                        <li>\
                                                                                            <input type="radio" name="selecBank" class="selecBank" value="光大银行信用卡">\
                                                                                            <img src="./images/guangdayinhang.png" alt="" title="光大银行信用卡">\
                                                                                        </li>\
                                                                                        <li>\
                                                                                            <input type="radio" name="selecBank" class="selecBank" value="上海浦东发展银行信用卡">\
                                                                                            <img src="./images/shanghaipudongyinhang.png" alt="" title="上海浦东发展银行信用卡">\
                                                                                        </li>\
                                                                                        <li>\
                                                                                            <input type="radio" name="selecBank" class="selecBank" value="上海银行信用卡">\
                                                                                            <img src="./images/shanghaiyinhang.png" alt="" title="上海银行信用卡">\
                                                                                        </li>\
                                                                                        <li>\
                                                                                            <input type="radio" name="selecBank" class="selecBank" value="中信银行信用卡">\
                                                                                            <img src="./images/zhongxinyinhang.png" alt="" title="中信银行信用卡">\
                                                                                        </li>\
                                                                                        <li>\
                                                                                            <input type="radio" name="selecBank" class="selecBank" value="中国邮政储蓄信用卡">\
                                                                                            <img src="./images/youzhengyinhang.png" alt="" title="中国邮政储蓄信用卡">\
                                                                                        </li>\
                                                                                        <li>\
                                                                                            <input type="radio" name="selecBank" class="selecBank" value="包商银行信用卡">\
                                                                                            <img src="./images/baoshangyinhang.png" alt="" title="包商银行信用卡">\
                                                                                        </li>\
                                                                                        <li>\
                                                                                            <input type="radio" name="selecBank" class="selecBank" value="交通银行信用卡">\
                                                                                            <img src="./images/jiaotongyinhangxinyong.png" alt="" title="交通银行信用卡">\
                                                                                        </li>\
                                                                                    </ul>\
                                                                                </div>\
                                                                            </div>\
                                                                            <div class="quzhifu">\
                                                                                <div class="surezhifu">去支付</div>\
                                                                                <span>*在线支付——需客服确认机位后进行！</span>\
                                                                            </div>\
                                                                        </div>\
                                                                        <div class="qwe" style="padding-left: 20px;padding-top: 50px;">\
                                                                            <div class="yinhanghuikuan">\
                                                                                <input type="radio" name="yinhanghuikuan" value="北京银行">\
                                                                                <img src="./images/beijingyinhang.png" alt="" />\
                                                                                <div class="yinhanghuikuanxiangxi">\
                                                                                    <span>开户名称：北京凯行网航空服务有限公司</span>\
                                                                                    <span>开户银行：北京银行东直门支行</span>\
                                                                                    <span>账号：<i>01090377300120109723179</i></span>\
                                                                                </div>\
                                                                            </div>\
                                                                            <div class="yinhanghuikuan">\
                                                                                <input type="radio" name="yinhanghuikuan" value="中国银行">\
                                                                                <img src="./images/zhongguoyinhang.png" alt="" />\
                                                                                <div class="yinhanghuikuanxiangxi">\
                                                                                <span>开户银行：北京朝阳北路支行</span>\
                                                                                    <span>持卡人：赵坤</span>\
                                                                                    <span>账号：<i>6217 8601 0000 2786 250</i></span>\
                                                                                </div>\
                                                                            </div>\
                                                                            <div class="yinhanghuikuan">\
                                                                                <input type="radio" name="yinhanghuikuan" value="工商银行">\
                                                                                <img src="./images/gongshangyinhang.png" alt="" />\
                                                                                <div class="yinhanghuikuanxiangxi">\
                                                                                <span>开户银行：北京分行东城支行东城支营东直门内分理处</span>\
                                                                                    <span>持卡人：赵坤</span>\
                                                                                    <span>账号：<i>6222 0802 0002 5991 111</i></span>\
                                                                                </div>\
                                                                            </div>\
                                                                            <div class="yinhanghuikuan">\
                                                                                <input type="radio" name="yinhanghuikuan" value="建设银行">\
                                                                                <img src="./images/jiansheyinhang.png" alt="" />\
                                                                                <div class="yinhanghuikuanxiangxi">\
                                                                                <span> 开户银行;中国建设银行北京市分行东直门支行储蓄专柜</span>\
                                                                                    <span>持卡人：赵坤</span>\
                                                                                    <span>账号：<i>6214 9900 1020 8263</i></span>\
                                                                                </div>\
                                                                            </div>\
                                                                            <div class="yinhanghuikuan">\
                                                                                <input type="radio" name="yinhanghuikuan" value="农业银行">\
                                                                                <img src="./images/nongyeyinhang.png" alt="" />\
                                                                                <div class="yinhanghuikuanxiangxi">\
                                                                                <span>开户银行：中国农业银行东四十条支行</span>\
                                                                                    <span>持卡人：赵坤</span>\
                                                                                    <span>账号：<i>6228 4500 1804 4999 272</i></span>\
                                                                                </div>\
                                                                            </div>\
                                                                            <div class="yinhanghuikuan">\
                                                                                <input type="radio" name="yinhanghuikuan" value="浦发银行">\
                                                                                <img src="./images/shanghaipudongyinhang.png" alt="" />\
                                                                                <div class="yinhanghuikuanxiangxi">\
                                                                                <span>开户银行：北京朝阳北路支行</span>\
                                                                                    <span>持卡人：赵坤</span>\
                                                                                    <span>账号：<i>6217 9206 0416 8745</i></span>\
                                                                                </div>\
                                                                            </div>\
                                                                            <div class="yinhanghuikuan">\
                                                                                <input type="radio" name="yinhanghuikuan" value="交通银行">\
                                                                                <img src="./images/jiaotongyinhang.png" alt="" />\
                                                                                <div class="yinhanghuikuanxiangxi">\
                                                                                <span> 开户银行：交通银行北京市分行</span>\
                                                                                    <span>持卡人：赵坤</span>\
                                                                                    <span>账号：<i>6222 6209 1000 4051 755</i></span>\
                                                                                </div>\
                                                                            </div>\
                                                                            <div class="yinhanghuikuan">\
                                                                                <input type="radio" name="yinhanghuikuan" value="北京银行">\
                                                                                <img src="./images/beijingyinhang.png" alt="" />\
                                                                                <div class="yinhanghuikuanxiangxi">\
                                                                                <span>北京银行东直门支行</span>\
                                                                                    <span>持卡人：赵坤</span>\
                                                                                    <span>账号：<i>6231 1112 0209 8888</i></span>\
                                                                                </div>\
                                                                            </div>\
                                                                        </div>\
                                                                        <div class="qwe">\
                                                                            <div class="xianjinzhifu">\
                                                                                <div class="xianjinzhifu-dianhua">\
                                                                                    <span>联系电话:</span>\
                                                                                    <i>400-722-7722</i>\
                                                                                </div>\
                                                                                <div class="xianjinzhifu-dizhi">\
                                                                                    <span>付款地址:</span>\
                                                                                    <i>北京市东城区东直门南大街9号花普花园C座906</i>\
                                                                                </div>\
                                                                            </div>\
                                                                        </div>\
                                                                        <div class="qwe">\
                                                                            <div class="xianjinzhifu">\
                                                                                <div class="xianjinzhifu-dianhua">\
                                                                                    <span>联系电话:</span>\
                                                                                    <i>400-722-7722</i>\
                                                                                </div>\
                                                                                <div class="xianjinzhifu-dizhi">\
                                                                                    <span>付款地址:</span>\
                                                                                    <i>北京市东城区东直门南大街9号花普花园C座906</i>\
                                                                                </div>\
                                                                            </div>\
                                                                        </div>\
                                                                        <div class="qwe">\
                                                                            <div class="weixinzhifu">*为保证您的资金安全，请添加右上角管理员微信进行安全支付</div>\
                                                                        </div>\
                                                                        <div class="qwe">\
                                                                            <div class="zhifubaozhifu">\
                                                                                <span>支付宝账户名称：北京凯行网航空服务有限公司</span>\
                                                                                <span>支付宝账号：<i>sale@airkx.com</i></span>\
                                                                            </div>\
                                                                        </div>\
                                                                    </div>\
                                                                </div>\
                                                            </div>\
                                                            <div class="xingchengdan">\
                                                                <div class="xingcheng-title">选择行程单获得方式</div>\
                                                                <div class="xingchengdan-con">\
                                                                    <div class="quxingchengdan">\
                                                                        <input type="radio" name="xingchengdan" value="不需要" checked="checked" class="xingchengdantype1">\
                                                                        <p>不需要行程单-- </p>\
                                                                        <span>由于网上销售的机票为电子票，如您不需要报销，请凭有效证件直接办理乘机手续和登机即可。</span>\
                                                                    </div>\
                                                                    <div class="quxingchengdan">\
                                                                        <input type="radio" name="xingchengdan" value="自取" class="xingchengdantype1">\
                                                                        <p>自取行程单-- </p>\
                                                                        <span><i>北京市东城区东直门南大街9号华普花园C座906</i>，请最晚于航班起飞后七日之内领取，逾期将无法打印。</span>\
                                                                    </div>\
                                                                    <div class="quxingchengdan">\
                                                                        <input type="radio" name="xingchengdan"  value="邮寄" class="xingchengdantype">\
                                                                        <p>邮寄行程单-- </p>\
                                                                        <span>请仔细填写收件人信息</span>\
                                                                    </div>\
                                                                    <div class="xiangchengdanyouji">\
                                                                        <div>\
                                                                            <span>收件人姓名</span>\
                                                                            <input type="text">\
                                                                        </div>\
                                                                        <div>\
                                                                            <span>手机号码</span>\
                                                                            <input type="text">\
                                                                        </div>\
                                                                        <div>\
                                                                            <span>邮编</span>\
                                                                            <input type="text">\
                                                                        </div>\
                                                                        <div>\
                                                                            <span style="line-height: 52px;">邮寄地址</span>\
                                                                            <textarea cols="30" rows="10"></textarea>\
                                                                        </div>\
                                                                    </div>\
                                                                </div>\
                                                            </div>\
                                                            <div class="baocun">提交</div>\
                                                            <div class="quxiaodingdan1">取消订单</div>\
                                                            <div class="fanhui">返回</div>';

                                            var adminHtml = '<div class="admin">\
                                                                <img src="' + data.touxiang + '" class="adtouxiang">\
                                                                <div class="kefumingzi">您的客服专员:' + data.clname + '</div>\
                                                                <i></i>\
                                                                <div class="xinxiList">\
                                                                    <p>手机</p>\
                                                                    <span>' + data.GLphone + '</span>\
                                                                </div>\
                                                                <i></i>\
                                                                <div class="xinxiList">\
                                                                    <p>qq</p>\
                                                                    <span>' + data.qq + '</span>\
                                                                </div>\
                                                                <i></i>\
                                                                <div class="xinxiList" style="width: 150px;">\
                                                                    <p>座机</p>\
                                                                    <span>' + data.zuoji + '</span>\
                                                                </div>\
                                                                <i></i>\
                                                                <div class="xinxiList" style="width: 60px;">\
                                                                    <p>微信二维码</p>\
                                                                    <div class="erweimaanniu">\
                                                                    </div>\
                                                                </div>\
                                                            </div>\
                                                            <img src="' + data.erweima + '" class="erweima">';

                                            if (data.guo == "wai") {
                                                $(".zhifukaishiGN").empty();
                                                $(".zhifukaishiGW").empty();
                                                $(".zhifukaishiGW").append(zhifuHtml)
                                                $(".ADMIN").empty();
                                                $(".ADMIN").append(adminHtml);


                                                if (data.piaojia.indexOf("*") != -1) {
                                                    data.piaojia = data.piaojia.substring(0, data.piaojia.length - 2)
                                                }
                                                if (data.shuijin.indexOf("*") != -1) {
                                                    data.shuijin = data.shuijin.substring(0, data.shuijin.length - 2)
                                                }

                                                $(".dingdanhao").find("p").html(data.OrderCode);
                                                $(".piaojia").find("p").html("￥" + data.piaojia);
                                                $(".zhufuzuangtai").find("p").html(data.FKState == "0" ? "未支付" : "已支付");
                                                $(".jipiaohao").find("p").html(data.PH);
                                                $(".yudingshijian").find("p").html(data.OrderTime.substring(0, data.OrderTime.length - 3));
                                                $(".shuijin").find("p").html("￥" + data.shuijin);
                                                $(".dingdanzhuangtai").find("p").html(data.OrderState);
                                                $(".heji").find("p").html("￥" + data.zongjia);
                                                $(".beizhuT").html(data.xccCon);
                                                var CKhtml = '<ul style="background-color: #f7f7f7">\
                                                                <li>乘客姓名</li>\
                                                                <li>出生日期</li>\
                                                                <li>护照号码</li>\
                                                                <li>护照有效期</li>\
                                                                <li>性别</li>\
                                                                <li style="border-right: none;">修改</li>\
                                                            </ul>'
                                                for (var i = 0; i < data.chengke.length; i++) {
                                                    CKhtml += '<ul>\
                                                                    <li><input type="text" readonly="readonly" value="' + data.chengke[i].Pname + '"></li>\
                                                                    <li><input type="text" readonly="readonly" value="' + data.chengke[i].PBD + '"></li>\
                                                                    <li><input type="text" readonly="readonly" value=" ' + data.chengke[i].PHZ + '"></li>\
                                                                    <li><input type="text" readonly="readonly" value="' + data.chengke[i].PHZYXQ + '"></li>\
                                                                    <li><input type="text" readonly="readonly" value="' + data.chengke[i].PSEX + '"></li>\
                                                                    <div class="updateUL" title="">修改</div>\
                                                                    <input type="hidden" value="' + data.chengke[i].id + '"/>\
                                                                </ul>'
                                                }
                                                $(".guowaichengke").empty();
                                                $(".guowaichengke").append(CKhtml)
                                                var HBhtml = '<ul style="background-color: #eeeeee">\
                                                                <li>出发日期</li>\
                                                                <li>航班号</li>\
                                                                <li style="width: 215px;">起飞（城市）/时间</li>\
                                                                <li style="width: 215px;">到达（城市）/时间</li>\
                                                                <li>航站楼</li>\
                                                            </ul>';
                                                for (var i = 0; i < data.hangban.length; i++) {
                                                    HBhtml += '<ul>\
                                                                    <li>' + data.hangban[i].StartDate + '</li>\
                                                                    <li>' + data.hangban[i].AirCode + '</li>\
                                                                    <li style="width: 215px;">' + data.hangban[i].qifei + '</li>\
                                                                    <li style="width: 215px;">' + data.hangban[i].jiangluo + '</li>\
                                                                    <li>' + data.hangban[i].HZL + '</li>\
                                                                </ul>';
                                                }
                                                $(".hangbanxinxi").empty();
                                                $(".hangbanxinxi").append(HBhtml)
                                                $(".xianzhitiaojian").html(data.TGQ);

                                                $(".part-mode").show();
                                                $(".part-guonei").hide();
                                                $(".part-left").hide();
                                                $(".fanhui").click(function() {
                                                    $(".part-guonei").hide();
                                                    $(".part-mode").hide();
                                                    $(".part-left").show();
                                                    $(".guowaichengke").empty();
                                                    $(".hangbanxinxi").empty();
                                                })
                                                $(".updateUL").click(function() {
                                                    $(this).siblings("li").find("input").attr("readonly", false).each(function() {
                                                        $(this).focus();
                                                    })
                                                })
                                                /**
                                                 * 修改乘机人信息
                                                 */
                                                $(".updateUL").click(function(e) {
                                                    var $this = $(this);
                                                    var html = $this.html();
                                                    e = e || event;
                                                    e.stopPropagation();
                                                    if (html == "修改") {
                                                        $this.siblings("li").find("input").addClass("active").attr("readonly", false);
                                                        $this.html("保存")
                                                    } else {
                                                        var dingdanzhuangtai = $(".dingdanzhuangtai").find('p').html();
                                                        if (dingdanzhuangtai == "取消订单" || dingdanzhuangtai == "出票完成") {
                                                            alert("订单不允许修改")
                                                        } else {
                                                            //修改后台数据
                                                            var PID = $this.siblings("input").val();
                                                            var PName = $this.siblings("li").eq(0).children().val();
                                                            var PBD = $this.siblings("li").eq(1).children().val();
                                                            var PSEX = $this.siblings("li").eq(4).children().val();
                                                            var PHZ = $this.siblings("li").eq(2).children().val();
                                                            var PHZYXQ = $this.siblings("li").eq(3).children().val();

                                                            var BPName = true;
                                                            var BPBD = true;
                                                            var BPSEX = true;
                                                            var BPHZ = true;
                                                            var BPHZYXQ = true;
                                                            if (PName == "" || PName.length > 12) {
                                                                alert("姓名有误，请重新输入")
                                                                BPName = false;
                                                            }
                                                            if (PBD == "" || PBD.length > 12) {
                                                                alert("出生日期有误，请重新输入")
                                                                BPBD = false;
                                                            }
                                                            if (PSEX == "" || PSEX.length > 12) {
                                                                alert("性别有误，请重新输入")
                                                                BPSEX = false;
                                                            }
                                                            if (PHZ == "" || PHZ.length > 19) {
                                                                alert("护照号有误，请重新输入")
                                                                BPHZ = false;
                                                            }
                                                            if (PHZYXQ != "" && PHZYXQ.length > 19) {
                                                                alert("护照有效期有误，请重新输入")
                                                                BPHZYXQ = false;
                                                            }
                                                            if (BPName && BPBD && BPSEX && BPHZ && BPHZYXQ) {
                                                                $.ajax({
                                                                        url: '@@apispath/XGckServlet',
                                                                        type: 'post',
                                                                        dataType: 'json',
                                                                        data: {
                                                                            "PID": PID,
                                                                            "PName": PName,
                                                                            "PBD": PBD,
                                                                            "PSEX": PSEX,
                                                                            "PHZ": PHZ,
                                                                            "PHZYXQ": PHZYXQ
                                                                        },
                                                                        error: function() {
                                                                            alert("网络错误，请刷新重试")
                                                                        }
                                                                    })
                                                                    .done(function(data) {
                                                                        console.log("修改乘机人" + data)
                                                                    })
                                                            }
                                                        }
                                                        $this.html("修改");
                                                        $this.siblings("li").find("input").removeClass("active").attr("readonly", true);

                                                    }
                                                    $this.siblings("li").find("input").click(function(e) {
                                                        e = e || event;
                                                        e.stopPropagation();
                                                    })
                                                })

                                            } else if (data.guo == "nei") {
                                                $(".zhifukaishiGW").empty();
                                                $(".zhifukaishiGN").empty();
                                                $(".zhifukaishiGN").append(zhifuHtml)
                                                $(".ADMIN").empty();
                                                $(".ADMIN").append(adminHtml);
                                                $(".GNdingdanhao").find('p').html(data.OrderCode);
                                                $(".piaohao").find('p').html(data.PH);
                                                $(".zhifujine").find('p').html("￥" + data.zongjia);
                                                $(".GNyudingshijian").find('p').html(data.OrderTime.substring(0, data.OrderTime.length - 3));
                                                $(".GNzhifuzhuangtai").find('p').html(data.FKState == "0" ? "未支付" : "已支付");
                                                $(".danrenpiaojia").find('p').html(data.danren.split("+")[0] + "+" + "机建燃油费" + data.danren.split("+")[1] + "+" + "保险" + parseInt(data.chengke[0].baoxina) * 20);
                                                $(".GNdingdanzhuangtai").find('p').html(data.OrderState);
                                                $(".PNR").find('p').html(data.PNR);
                                                var ckHtml = '<ul style="background-color: #f7f7f7">\
                                                                    <li class="wd138">乘机人姓名</li>\
                                                                    <li class="wd108">证件类型</li>\
                                                                    <li class="wd194">证件号码</li>\
                                                                    <li class="wd123">联系电话</li>\
                                                                    <li class="wd176">里程卡号</li>\
                                                                </ul>';
                                                for (var i = 0; i < data.chengke.length; i++) {
                                                    ckHtml += ' <ul>\
                                                                    <li class="wd138">' + data.chengke[i].chengjiren + '</li>\
                                                                    <li class="wd108">' + data.chengke[i].ZJtype + '</li>\
                                                                    <li class="wd194">' + data.chengke[i].ZJhaoma + '</li>\
                                                                    <li class="wd123">' + data.chengke[i].phone + '</li>\
                                                                    <li class="wd176">' + data.chengke[i].lihceng + '</li>\
                                                                </ul>';
                                                }
                                                $(".line5").empty();
                                                $(".line5").append(ckHtml);
                                                $(".GNhangbanListhangbanhao").html(data.startDate);
                                                $(".GNhangbanListqifeishijian").html(data.city);
                                                $(".GNhangbanListjiangluoshijian").html(data.startTime + "-" + data.EndTime);
                                                $(".hangbanhao").html(data.hnagbanhao)
                                                $(".hangzhanlou").html(data.hzl);
                                                $(".cangwei").html(data.cangwei);
                                                $(".part-mode").hide();
                                                $(".part-guonei").show();
                                                $(".part-left").hide();
                                                $(".fanhui").click(function() {
                                                    $(".part-guonei").hide();
                                                    $(".part-mode").hide();
                                                    $(".part-left").show();
                                                    $(".line5").empty();
                                                })
                                            } else {
                                                alert("网络错误，请刷新重试")
                                            }

                                            var zhifuarr = ["在线支付", "银行汇款", "现金", "上门刷卡", "微信支付", "支付宝转账"];
                                            var zhifufs = data.FKFS;
                                            for (var i = 0; i < zhifuarr.length; i++) {
                                                if (zhifufs.indexOf(zhifuarr[i]) != -1) {
                                                    $(".zhifuDE-title").children().eq(i).addClass('active').siblings().removeClass('active')
                                                    $(".qwe").eq(i).show().stop().animate({ "opacity": 1 }).siblings().stop().animate({ "opacity": 0 }).hide();
                                                }
                                            }
                                            $(".shiyongjiangjin").click(function() {
                                                if (data.isOK == "0") {
                                                    $(".zhifutitle span").show();
                                                } else {
                                                    $(".zhifutitle span").hide();
                                                    var height = $(".shiyongjiangjinDE").height();
                                                    if (height == 0) {
                                                        $(".shiyongjiangjinDE").stop().animate({ "height": "63" });

                                                    } else {
                                                        $(".shiyongjiangjinDE").stop().animate({ "height": "0" });

                                                    }
                                                }


                                            })

                                            $(".zhifuDE-con").children().eq(0).show().css("opacity", 1);
                                            $(".zhifuDE-title span").click(function() {
                                                $(this).addClass("active").siblings().removeClass("active");
                                                $(".zhifuDE-con").children().eq($(this).index()).show().stop().animate({ "opacity": 1 }).siblings().stop().animate({ "opacity": 0 }).hide();
                                            })
                                            $(".kamen").children().eq(0).show().css("opacity", 1);
                                            $(".kazhifu-title span").click(function() {
                                                if ($(this).index() == 0) {
                                                    $(".underline1").stop().animate({ "left": 296 })
                                                    $(".kamen").children().eq(0).show().stop().animate({ "opacity": 1 }).siblings().stop().animate({ "opacity": 0 }).hide();
                                                } else {
                                                    $(".underline1").stop().animate({ "left": 440 })
                                                    $(".kamen").children().eq(1).show().stop().animate({ "opacity": 1 }).siblings().stop().animate({ "opacity": 0 }).hide();
                                                }
                                            })
                                            $(".xingchengdantype").click(function() {
                                                var $this=$(this);
                                                if ($this.attr("checked") == "checked") {
                                                    $(".xiangchengdanyouji").stop().animate({ "height": 0 });
                                                    $this.attr("checked", false);
                                                } else {
                                                    $(".xiangchengdanyouji").stop().animate({ "height": 85 });
                                                    $this.attr("checked", true);
                                                }
                                            })
                                            $(".xingchengdantype1").click(function() {
                                                $(".xingchengdantype").attr("checked", false);
                                                $(".xiangchengdanyouji").stop().animate({ "height": 0 });
                                            })
                                            zhifuFn(data, OrderID);
                                        })
                                })
                            })
                    })
            })
    }


    loginAfter();

    var docuClick = 0;
    var $right_xingming = $(".right-xingming");
    var $rightmima = $(".rightmima");
    var $rightyouxiang = $(".rightyouxiang");
    $(".right-update").click(function(e) {
        e = e || event;
        e.stopPropagation();
        $right_xingming.addClass("active");
        $right_xingming.removeAttr("readonly");
        $rightmima.addClass("active");
        $rightmima.removeAttr("readonly");
        $rightyouxiang.addClass("active");
        $rightyouxiang.removeAttr("readonly");
        docuClick = 1;
        $(document).click(function(e) {
            if (docuClick == 1) {
                e = e || event;
                e.stopPropagation();
                $right_xingming.removeClass("active");
                $right_xingming.attr("readonly", "readonly");
                $rightmima.removeClass("active");
                $rightmima.attr("readonly", "readonly");
                $rightyouxiang.removeClass("active");
                $rightyouxiang.attr("readonly", "readonly");
                docuClick = 0;

                var UserName = $(".right-xingming").val();
                var Mobile = $(".rightshouji").val();
                var emall = $(".rightyouxiang").val();
                var Password = $(".rightmima").val();
                var BUserName = true;
                var Bemall = true;
                var BPassword = true;
                if (UserName == "") {
                    alert("用户名不能为空")
                    BUserName = false;
                }
                if (UserName.length > 12) {
                    alert("用户名不能大于12位")
                    BUserName = false;
                }
                if (Password == "") {
                    alert("密码不能为空")
                    BPassword = false;
                }
                if (Password.length > 12) {
                    alert("密码不能大于12位")
                    BPassword = false;
                }
                var emallll = function(emall) { //emall
                    var mobileRegex = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
                    if (mobileRegex.test(emall)) {
                        return true;
                    } else {
                        return false;
                    }
                }
                if (!emallll(emall)) {
                    alert("邮箱格式错误")
                    Bemall = false;
                }
                if (BUserName && Bemall && BPassword) {
                    $.ajax({
                            url: '@@apispath/UpdatePasServlet',
                            type: 'post',
                            dataType: 'json',
                            data: {
                                "Mobile": Mobile,
                                "UserName": UserName,
                                "emall": emall,
                                "Password": Password
                            },
                            error: function() {
                                alert("网络错误，请刷新重试")
                            }
                        })
                        .done(function(data) {
                            console.log("修改用户信息" + data)
                        })
                }


            }
        })
        $(".rightTH-list").find("input").click(function(e) {
            e = e || event;
            e.stopPropagation();
        })
        $(".right-xingming").click(function(e) {
            e = e || event;
            e.stopPropagation();
        })
    })

    $(".rightO").find('span').click(function() {
        $(".part-guonei").hide();
        $(".part-mode").hide();
        $(".part-left").show();
        $(".guowaichengke").empty();
        $(".hangbanxinxi").empty();
    })



})

function loginAfter() {
    var $join_kx=$(".join-kx");
    $(".head-wrap").css("border-color", "#f00000");
    $join_kx.css("background-image", "url(./images/bj_red_01.png)")
    $join_kx.children('span').eq(0).hide();
    $join_kx.children('span').eq(1).show();
}

function getSessionstorage(key) {
    return window.sessionStorage.getItem(key);
}

function quchuhoumiansanwei(data) {
    data = data.substring(data.length - 3, data.length - 1);
    return data;
}

function loginOver() {
    var userID = getSessionstorage("userID");
    if (userID == null || userID == "null" || userID == -1) {

    } else {
        $.ajax({
                url: '@@apispath/SendUserInfoServlet',
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
                $(".useName").html(data.UserName);
                $(".head-wrap").css("border-color", "#f00000");
                var $join_kx=$(".join-kx");
                $join_kx.css("background-image", "url(./images/bj_red_01.png)")
                $join_kx.children('span').eq(0).hide();
                $join_kx.children('span').eq(1).show();
            })
    }
}

function arrMin(arr) {
    for (var j = 0; j < arr.length - 1; j++) {
        //两两比较，如果前一个比后一个大，则交换位置。
        for (var i = 0; i < arr.length - 1 - j; i++) {
            if (arr[i].OrderID < arr[i + 1].OrderID) {
                var temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
            }
        }
    }
    return arr;
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

function deleteItem(item) {
    sessionStorage.removeItem(item);
}

function setSessionstorage(key, value) {
    window.sessionStorage.setItem(key, value);
}

function zhifuFn(data, OrderID) {
    if (data.OrderState == "出票完成" || data.OrderState == "取消订单") {
        $(".quzhifu").hide();
        $(".baocun").hide();
        $(".quxiaodingdan1").hide();
    }
    if (data.FKState == "0") {
        $(".quedingshiyong").click(function() {
            var val = $(".shurujiangjin").find("input").val();
            var reg = /^[0-9]+.?[0-9]*$/g;
            if (reg.test(val)) {
                if (parseInt(val) <= parseInt(data.jiangjin)) {
                    var zongjia = data.zongjia - val;
                    $(".shifujine").find("i").html(zongjia);
                    $(".shiyongjiangjinDE").stop().animate({ "height": 0 })
                    $(".shiyongjiangjin").find("i").html(val)
                } else {
                    alert("请输入正确的使用奖金数")
                }
            } else {
                alert("请输入正确的使用奖金数")
            }
        })
        if (data.isOK == "0") {
            $(".surezhifu").addClass("active");
        } else {
            $(".surezhifu").click(function() {
                var zffss = $('input:radio[name="selecBank"]:checked').val();
                if (zffss == undefined) {
                    alert("您还没有选择具体付款方式")
                } else {
                    var zffs = "";
                    if (zffss.indexOf("信用卡") != -1) {
                        zffs = "EPOS-NET";
                    } else {
                        zffs = $('input:radio[name="selecBank"]:checked').val();
                    }
                    var p2_Order = data.OrderCode;
                    var p3_Amt = $(".shifujine").find("i").html();
                    var pd_FrpId = zffs;
                    var zhifufangshi = $(".fukuanfangshi").find("i").html();
                    var shiyongjiangjin = $(".shiyongjiangjin").find("i").html();
                    $.ajax({
                            url: '@@apispath/PayServlet',
                            type: 'get',
                            dataType: 'text',
                            data: {
                                "p2_Order": OrderID,
                                "p3_Amt": p3_Amt,
                                "pd_FrpId": pd_FrpId,
                                "zhifufangshi": zhifufangshi,
                                "OrderID": OrderID,
                                "shiyongjiangjin": shiyongjiangjin
                            },
                            error: function(data) {
                                console.log(data)
                            }
                        })
                        .done(function(data) {
                            console.log(data)
                            location.href = data;
                        })
                }

            })
        }
        $(".zhifuDE-title").children().click(function() {
            $(".fukuanfangshi").find("i").html($(this).html());
            $('input[type=radio][name=selecBank]').attr("checked", false);
        })
        $('input[type=radio][name=yinhanghuikuan]').change(function() {
            $(".fukuanfangshi").find("i").html("银行汇款");
        })
        $('input[type=radio][name=selecBank]').change(function() {
            $(".fukuanfangshi").find("i").html("在线支付");
        })
    } else {
        $(".quzhifu").hide();
        $(".quxiaodingdan1").hide();
    }
    $(".baocun").click(function() {
        var zfzt = data.FKState;
        if (zfzt == "1") {
            var shiyongjianjin = $(".shiyongjiangjin").find("i").html();
            var shifujine = $(".shifujine").find("i").html();
            var fkfs = $(".fukuanfangshi").find("i").html();
            var xingchengdanFS = $('input:radio[name="xingchengdan"]:checked').val();
            var xingchengdanBZ = "";
            var bl = false;
            if (xingchengdanFS == "邮寄") {
                var $xiangchengdanyouji=$(".xiangchengdanyouji");
                var shoujianren = $xiangchengdanyouji.children().eq(0).find('input').val();
                var shoujihao = $xiangchengdanyouji.children().eq(1).find('input').val();
                var youbian = $xiangchengdanyouji.children().eq(2).find('input').val();
                var dizhi = $xiangchengdanyouji.children().eq(3).find('textarea').val();
                var shoujianrenB = true;
                var shoujihaoB = true;
                var youbianB = true;
                var dizhiB = true;
                var phone = function(phone) { //手机号
                    var mobileRegex = /^(((1[3456789][0-9]{1})|(15[0-9]{1}))+\d{8})$/;
                    if (mobileRegex.test(phone)) {
                        return true;
                    } else {
                        return false;
                    }
                }
                if (shoujianren == "") {
                    alert("请输入收件人")
                    shoujianrenB = false;
                }
                if (!phone(shoujihao)) {
                    alert("请输入正确的手机号")
                    shoujihaoB = false;
                }
                if (youbian == "") {
                    alert("请输入正确的邮编")
                    youbianB = false;
                }
                if (dizhi == "") {
                    alert("请输入正确的地址")
                    dizhiB = false;
                }
                if (shoujianrenB && shoujihaoB && youbianB && dizhiB) {
                    xingchengdanBZ = shoujianren + "$" + shoujihao + "$" + youbian + "$" + dizhi;
                    bl = true;
                }
            } else {
                bl = true;
            }
            if (bl) {
                $.ajax({
                        url: '@@apispath/OrderZFservlet',
                        type: 'get',
                        dataType: 'json',
                        data: {
                            "OrderID": OrderID,
                            "shiyongjianjin": shiyongjianjin,
                            "shifujine": shifujine,
                            "fkfs": fkfs,
                            "xingchengdanFS": xingchengdanFS,
                            "xingchengdanBZ": xingchengdanBZ
                        },
                        error: function() {
                            alert("网络错误，请刷新重试")
                        }
                    })
                    .done(function(data) {
                        if (data == "1") {
                            alert("提交成功");
                            location.reload();
                        } else {
                            alert("提交失败，请刷新重试或联系管理员")
                        }
                    })
            }
        } else {
            var shiyongjianjin = $(".shiyongjiangjin").find("i").html();
            var shifujine = $(".shifujine").find("i").html();
            var fkfs = $(".fukuanfangshi").find("i").html();
            var fk1 = true;
            var fk2 = true;
            var fk3 = true;
            if (fkfs.indexOf("在线支付") != -1) {
                alert("请选择其他支付方式或点击去付款");
                fk1 = false;
            }
            if (fkfs == "未支付") {
                alert("请选择支付方式");
                fk3 = false;
            }
            if (fk1 && fk2 && fk3) {
                var xingchengdanFS = $('input:radio[name="xingchengdan"]:checked').val();
                var xingchengdanBZ = "";
                var bl = false;
                if (xingchengdanFS == "邮寄") {
                    var $xiangchengdanyouji=$(".xiangchengdanyouji");
                    var shoujianren = $xiangchengdanyouji.children().eq(0).find('input').val();
                    var shoujihao = $xiangchengdanyouji.children().eq(1).find('input').val();
                    var youbian = $xiangchengdanyouji.children().eq(2).find('input').val();
                    var dizhi = $xiangchengdanyouji.children().eq(3).find('textarea').val();
                    var shoujianrenB = true;
                    var shoujihaoB = true;
                    var youbianB = true;
                    var dizhiB = true;
                    var phone = function(phone) { //手机号
                        var mobileRegex = /^(((1[3456789][0-9]{1})|(15[0-9]{1}))+\d{8})$/;
                        if (mobileRegex.test(phone)) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                    if (shoujianren == "") {
                        alert("请输入收件人")
                        shoujianrenB = false;
                    }
                    if (!phone(shoujihao)) {
                        alert("请输入正确的手机号")
                        shoujihaoB = false;
                    }
                    if (youbian == "") {
                        alert("请输入正确的邮编")
                        youbianB = false;
                    }
                    if (dizhi == "") {
                        alert("请输入正确的地址")
                        dizhiB = false;
                    }
                    if (shoujianrenB && shoujihaoB && youbianB && dizhiB) {
                        xingchengdanBZ = shoujianren + "$" + shoujihao + "$" + youbian + "$" + dizhi;
                        bl = true;
                    }
                } else {
                    bl = true;
                }
                if (bl) {
                    $.ajax({
                            url: '@@apispath/OrderZFservlet',
                            type: 'get',
                            dataType: 'json',
                            data: {
                                "OrderID": OrderID,
                                "shiyongjianjin": shiyongjianjin,
                                "shifujine": shifujine,
                                "fkfs": fkfs,
                                "xingchengdanFS": xingchengdanFS,
                                "xingchengdanBZ": xingchengdanBZ
                            },
                            error: function() {
                                alert("网络错误，请刷新重试")
                            }
                        })
                        .done(function(data) {
                            if (data == "1") {
                                alert("提交成功");
                                location.reload();
                            } else {
                                alert("提交失败，请刷新重试或联系管理员")
                            }
                        })
                }
            }
        }
    })

    if (data.SPFS == "不需要") {
        $("input[type=radio][name=xingchengdan]").eq(0).attr("checked", true);
    } else if (data.SPFS == "自取") {
        $("input[type=radio][name=xingchengdan]").eq(1).attr("checked", true);
    } else if (data.SPFS == "邮寄") {
        var $xiangchengdanyouji=$(".xiangchengdanyouji");
        $("input[type=radio][name=xingchengdan]").eq(2).attr("checked", true);
        $xiangchengdanyouji.css("height", "85")
        $xiangchengdanyouji.children().eq(0).find('input').val(data.SPBZ.split("$")[0]);
        $xiangchengdanyouji.children().eq(1).find('input').val(data.SPBZ.split("$")[1]);
        $xiangchengdanyouji.children().eq(2).find('input').val(data.SPBZ.split("$")[2]);
        $xiangchengdanyouji.children().eq(3).find('textarea').val(data.SPBZ.split("$")[3]);
    }
    $(".quxiaodingdan1").click(function() {
        $(".quxiaodingdan").show();
        $(".selectFW").click(function() {
            $(this).addClass("active").siblings().removeClass("active");
        })
        $(".quxiaoquxiao").click(function() {
            $(".quxiaodingdan").hide();
        })
        $(".quedingquxiao").unbind("click").on("click", function() {
            var quxiaoyuanyin = "";
            $(".selectFW").each(function() {
                if ($(this).is(".active")) {
                    quxiaoyuanyin = $(this).attr("title")
                }
            })
            $.ajax({
                    url: '@@apispath/CancelDD',
                    type: 'get',
                    dataType: 'json',
                    data: {
                        "OrderID": OrderID,
                        "quxiaoyuanyin": quxiaoyuanyin
                    },
                    error: function() {
                        alert("网络错误，请刷新重试")
                    }
                })
                .done(function(data) {
                    if (data == "1") {
                        alert("提交成功");
                        location.reload();
                    } else {
                        alert("提交失败")
                    }
                })
        })
    })
}