;(() => {
    let uid = _.getItem('userID')
    if (uid) {
        $('.txts-box').hide()
    } else {
        $('#txt_phone').on('blur', function () {
            let p = $(this).val().trim()
            if (!_.checkTel(p)) {
                $(this).css('border-color', '#de1721')
            } else {
                $(this).css('border-color', '#888')
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
                            $('#div_name,#div_email').hide()
                            $('#sp_pass').text('登录密码')
                            if ($('.book-dingzhi').find('.dz-tip').length > 0) {
                                $('.book-dingzhi').find('.dz-tip').show()
                            } else {
                                $('#btn_submit').before('<div class="dz-tip">系统检测到您已是会员！</div>')
                            }
                        } else {
                            $('#div_name,#div_email').show()
                            $('#sp_pass').text('设置订单查询密码')
                            $('.book-dingzhi').find('.dz-tip').hide()
                        }
                    }
                })
            }
        })
    }
})()