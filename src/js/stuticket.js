let bindEven = () => {
    $('.stu-item').on('click', function () {
        let _id = $(this).data('id')
        let arr = flightArr.filter(x => x.Id.toString() === _id.toString())
        let obj = arr[0]
        _.setItem('tinfo', JSON.stringify(obj))
        window.location.href = '@@pagepath/ticketinfo.html'
    })
}

const loadHtml = () => {
    let _d = [], data = []
    for (let item of flightArr) {
        if (!_d.includes(item.Zhou)) {
            _d.push(item.Zhou)
        }
    }
    for (let m of _d) {
        data.push({
            name: m,
            children: flightArr.filter((x) => x.Zhou === m)
        })
    }
    $('#div-list').html(_.render('#tmpList', data))
    bindEven()
}

let isLoad = false

const checkBook = () => {
    let userID = getSessionstorage("userID")
    let content = $('#txt-content').val().trim()
    let phone = $('#txt_phone').val().trim()
    let name = $('#txt_name').val().trim()
    let email = $('#txt_email').val().trim()
    let pass = $('#txt_pass').val().trim()
    if (content == '') {
        alert('请输入出行信息!')
        return;
    } else if (phone == '') {
        alert('请输入手机号!')
        return;
    } else if (!userID) {
        if (name == '') {
            alert('请输入联系人!')
            return;
        } else if (email == '') {
            alert('请输入邮箱!')
            return;
        } else if (pass == '') {
            alert('请输入密码!')
            return;
        }
    }
    isLoad = true
    _.http({
        url: '/AdminLunhuan',
        type: 'post',
        dataType: 'text',
        data: {
            "Mobile": Mobile,
            "userID": userID
        },
        error: function() {
            alert("网络错误，请刷新重试，或联系管理员")
        },
        success: function (data) {
            var CLNAME = data;
            var navInfo = "";
            var qudao = "studentTicket.html";
            //获取userAgent信息
            if(navigator && navigator.userAgent){
                navInfo=navigator.userAgent;
            }
            _.http({
                url: '/ZdyOrderServlet',
                data: {
                    "xingmingxingming": xingmingxingming,
                    "phone": phone,
                    "emall": email,
                    "mima": pass,
                    "xinxi": name,
                    "OrderCode": randomNum(100000,999999).toString(),
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
                        setSessionstorage("userID", data);
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

const submitBook = () => {
    $('#btn_submit').on('click', function () {
        if (!isLoad) {
            checkBook()
        } else {
            alert('提交中...')
        }
    })
}

;(()=>{
    if ($('#div-list').length > 0) {
        _.http({
            url: '/ListOverseasServlet',
            dataType: 'json',
            success: function (res) {
                if (res && res.length > 0) {
                    window.flightArr = res
                    loadHtml()
                }
            }
        })
    } else {
        let _d = _.getItem('tinfo')
        if (_d) {
            let obj = JSON.parse(_d)
            $('#txt_title').text(obj.Biaoti)
            $('#txt_aircom').text(obj.HKGS)
            $('#txt_scity').text(obj.sCity)
            $('#txt_ecity').text(obj.eCity)
            $('#txt_sdate').text(obj.sTime)
            $('#txt_price').text(obj.Paiojia)
            $('#txt_limit').text(obj.BZ)
        }
        submitBook()
    }
})()

function randomNum (min, max) {
    return Math.floor(min + Math.random() * (max - min))
}
