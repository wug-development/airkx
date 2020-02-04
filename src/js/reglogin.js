$(function() {
    /**
     * 登陆
     */
    var $height = $(window).height();
    var $head = $(".log-wrap").outerHeight()
    var $bar = $(".red-bar").outerHeight()
    var $foot = $(".foot").outerHeight()
    var $content = $height - $head - $bar - $foot;
    // $(".r-cont").height($content);

    var denglu=true;
    $("#loginBtn").click(function() {
        if(denglu){
            var Mobile = $("#phone").val();
            var password = $("#password").val();
            var boo = _.checkTel(Mobile);
            if (password == "") {
                alert("密码不能为空")
            } else {
                if (boo) {
                    denglu=false;
                    _.http({
                        url: '/IsLogin',
                        type: 'post',
                        dataType: 'json',
                        data: {
                            "Mobile": Mobile,
                            "password": password
                        },
                        error: function() {
                            alert("网络错误，请刷新重试")
                            denglu=true;
                        },success: function (data) {
                            if (data == "-1") {
                                alert("用户名或密码错误，请您重新登陆")
                                denglu=true;
                            } else {
                                alert("登陆成功");
                                setSessionstorage("userID", data);
                                window.location.href = "@@pagepath/personalHomePage.html";
                            }
                        }
                    })
                } else {
                    alert("您输入的手机号有误，请重新输入")
                }
            }
        }
    })
    $("#password").keyup(function(event) {
        if (event.keyCode == 13) {
        	$("#loginBtn").click();
        }
    })
    

    function setSessionstorage(key, value) {
        window.sessionStorage.setItem(key, value);
    }

    /**
     * 注册
     */
    var $height1 = $(window).height();
    var $head1 = $(".header").outerHeight();
    var $foot1 = $(".foot").outerHeight()
    var $content1 = $height1 - $head1 - $foot1;
    $(".r-cont.r-cont1").height($content);
    var zhuce = true;
    $("#registerBtn").click(function() {
        if (zhuce) {
            var Mobile = $("#phoneNew").val();
            var password = $("#passNew").val();
            var password1 = $("#passNew1").val();
            var emall = $("#email").val();
            var contact = $("#lianxiren").val();
            var bMobile = false;
            var bpassword = true;
            var checkB = false;
            var lianxirenB = false;
            if (_.checkTel(Mobile)) {
                bMobile = true;
            } else {
                alert("您输入的手机号有误，请重新输入");
                bMobile = false;
                return false;
            }
            if (password == "" || password1 == "") {
                alert("密码不能为空");
                bpassword = false;
                return false;
            }
            if (password.length > 12) {
                alert("密码长度小于12位");
                bpassword = false;
                return false;
            }
            if (password != password1) {
                alert("两次输入密码不一致，请您重新输入")
                bpassword = false;
                return false;
            }
            if ($("#check").is(':checked')) {
                checkB = true;
            } else {
                checkB = false;
                alert("请阅读服务条款")
                return false;
            }
            if (contact != "") {
                lianxirenB = true;
            } else {
                lianxirenB = false;
                alert("联系人不能为空")
                return false;
            }
            if (bMobile && bpassword && checkB) {
                zhuce = false;
                _.http({
                    url: '/RegisterServlet',
                    type: 'post',
                    dataType: 'json',
                    data: {
                        "Mobile": Mobile,
                        "password": password,
                        "emall": emall,
                        "contact": contact
                    },
                    error: function() {
                        alert("网络错误，请刷新重试");
                        zhuce = true;
                    },
                    success: function (data) {
                        if (data == "0") {
                            alert("该手机号已被注册，请您直接登陆或重新注册")
                            zhuce = true;
                        } else if (data == "-1") {
                            alert("注册失败，请您稍后重试或直接联系客服人员")
                            zhuce = true;
                        } else {
                            alert("注册成功");
                            setSessionstorage("userID", data);
                            window.location.href = "@@pagepath/personalHomePage.html";
                        }
                    }
                })
            }
        }

    })


    $(".forget-pass").click(function() {
        var phone = $("#phone").val();
        if (_.checkTel(phone)) {
            _.http({
                url: '/Wangjimima',
                type: 'post',
                dataType: 'json',
                data: {
                    "phone": phone
                },
                error: function() {
                    alert("网络错误，请刷新重试")
                },
                success: function (data) {
                    if (data == "-1") {
                        alert("您还不是凯兴网的会员，请先注册")
                    } else if (data == "0") {
                        alert("短信发送失败，请联系服务人员")
                    } else if (data == "1") {
                        alert("您的密码已经发送到您的手机，请注意查收")
                    }
                }
            })
        } else {
            alert("请输入正确的手机号")
        }
    })
    

    $('#phoneNew').on('blur', function () {
        let p = $(this).val().trim()
        if (!_.checkTel(p)) {
            alert('请输入正确的手机号码')
        } else {
            _.ajax({
                url: '/FindLoginServlet',
                type: 'post',
                dataType: 'json',
                data: {
                    "Mobile": p
                },
                error: function() {
                    alert("网络错误，请刷新重试")
                },
                success: function (data) {
                    if (data == "1") {
                        alert({text: '账号已存在，请登录！', callfun: function () {
                            location.href = '@@pagepath/login.html'
                        }})
                    }
                }
            })
        }
    })
})