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
                        "Mobile": Mobile
                    },
                    error: function() {
                        alert("网络错误，请刷新重试")
                    },
                    success: function (data) {
                        if (data == "1") {
                            $('#div_name,#div_email').hide()
                        } else {
                            $('#div_name,#div_email').show()
                        }
                    }
                })
            }
        })
    }
})()