
let isLoad = false

const checkBook = () => {
    let userID = _.getItem("userID")
    let content = $('#txt_content').val().trim()
    let phone = $('#txt_phone').val().trim()
    let name = $('#txt_name').val().trim()
    let email = $('#txt_email').val().trim()
    let pass = $('#txt_pass').val().trim()
    if (content == '') {
        alert('请输入出行信息!')
        return false;
    } else if (!userID) {
        if (phone == '') {
            alert('请输入手机号!')
            return false;
        } else if (!_.checkTel(phone)) {
            alert('请输入正确的手机号!')
            return false;
        } else if (name == '' && $('#div_name').css('display') != 'none') {
            alert('请输入联系人!')
            return false;
        } else if (email == '' && $('#div_email').css('display') != 'none') {
            alert('请输入邮箱!')
            return false;
        } else if (pass == '') {
            alert('请输入密码!')
            return false;
        }
    }
    isLoad = true
    _.ajax({
        url: '/AdminLunhuan',
        type: 'post',
        dataType: 'text',
        data: {
            "Mobile": phone,
            "userID": userID
        },
        error: function() {
            alert("网络错误，请刷新重试，或联系管理员")
        },
        success: function (data) {
            var CLNAME = data;
            var navInfo = "";
            var qudao = "index.js";
            if (location.href.indexOf('ticketinfo') > -1) {
                qudao = "studentTicket.html";
            }
            //获取userAgent信息
            if(navigator && navigator.userAgent){
                navInfo=navigator.userAgent;
            }
            _.ajax({
                url: '/ZdyOrderServlet',
                data: {
                    "xingmingxingming": name,
                    "phone": phone,
                    "emall": email,
                    "mima": pass,
                    "xinxi": content,
                    "OrderCode": _.randomNum(100000,999999).toString(),
                    "CLNAME": CLNAME,
                    "userID": userID,
                    "navInfo":navInfo,
                    "qudao":qudao
                },
                error: function() {
                    alert("网络错误，请刷新重试")
                },
                complete: function (res) {
                    isLoad = false
                },
                success: function (data) {
                    if (data == "-1") {
                        alert("您的手机或密码输入错误，请输入正确的信息")
                    } else if (data == "0") {
                        alert("提交失败，请刷新重试，或联系管理员")
                    } else {
                        _.setItem("userID", data);
                        alert({ text:"提交成功,请稍后", callfun: () => {
                            window.location.href = "@@pagepath/personalHomePage.html";
                        }});
                    }
                }
            })
        },
        complete: function (res) {
            if (res != 'success') {
                isLoad = false
            }
        }
    })
}

(() => {
    $('#btn_submit').on('click', function () {
        if (!isLoad) {
            checkBook()
        } else {
            alert('提交中...')
        }
    })

    $('#txt_phone').on('blur', function () {
        let phone = $(this).val().trim()
        if (!_.checkTel(phone)) { 
            $(this).css('border-color', '#de1721')
        } else {
            $(this).css('border-color', '#888')
            _.ajax({
                url: '/FindLoginServlet',
                type: 'post',
                dataType: 'json',
                data: {
                    "Mobile": phone
                },
                error: function() {
                    alert("网络错误，请刷新重试")
                },
                success: function(data) {
                    if (data == "1") {
                        $('#div_name,#div_email').hide()
                        $('.span_pass').text('登录密码：')
                        $('.div_pass').find('div').show()
                    } else {
                        $('#div_name,#div_email').show()
                        $('.span_pass').text('设置订单查询密码：')
                        $('.div_pass').find('div').hide()
                    }
                }
            })
        }
    });
    $('#span_forget').on('click', function () {
        let phone = $('#txt_phone').val().trim()
        _.ajax({
            url: '/Wangjimima',
            type: 'post',
            dataType: 'json',
            data: {
                "phone": phone
            },
            error: function() {
                alert("网络错误，请刷新重试")
            },success: function (data) {
                if (data == "-1") {
                    alert("您还不是凯行网的会员，请先注册")
                } else if (data == "0") {
                    alert("短信发送失败，请联系服务人员")
                } else if (data == "1") {
                    alert("您的密码已经发送到您的手机，请注意查收")
                }
            }
        })
    })

    let userID = _.getItem("userID")
    if (userID) {
        $('.txts-box,.txt-box').hide()
    }
})()