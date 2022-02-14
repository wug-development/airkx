(function () {
    for (var i = 1; i <= 12; i++) {
        $('#div_bookhtml_' + i).append('<div class="booknotes-btn" data-index="' + i + '">付费阅读更多</div>');
    }
    $('.booknotes-btn').on('click', function () {
        var index = $(this).data('index');
        $.ajax({
            url: '@@apimpath/AddPayRecordservlet',
            type: 'post',
            dataType: 'json',
            data: {
                adminid: 7,
                adminname: '周科',
                name: '资讯',
                phone: '13810173310',
                price: 1,
                type: 2,
                other: '资讯',
            },
            error: function () {
                alert("网络错误，请刷新重试")
            }
        }).done(function (data) {
            getQrCode(data.orderno, index);
        });
    });
    $('#btn-close-qr').on('click', function () {
        var no = $('.pay-layer').data('orderno');
        var index = $('.pay-layer').data('index');
        $('.pay-layer').hide();
        getIsPay(no, index);
    })
}());

function getIsPay(orderno, index) {
    $.ajax({
        url: '@@apimpath/GetIsPayRecodeServlet',
        type: 'get',
        dataType: 'json',
        data: {
            orderno: orderno,
        },
        error: function () {
            alert("网络错误，请刷新重试")
        }
    }).done(function (data) {
        if (data.data === 1) {
            $('#div_bookhtml_' + index).append(getHtml(index));
            $('#div_bookhtml_' + index).find('.booknotes-btn').hide();
        }
    });
}

function getQrCode(orderno, index) {
    $.ajax({
        url: '@@apimpath/CreateQRCodeServlet',
        type: 'get',
        data: {
            paytype: 2,
            orderno: orderno,
        },
        error: function () {
            alert("网络错误，请刷新重试")
        }
    }).done(function (data) {
        $('#qrcode_img').attr('src', data);
        $('.pay-layer').data('orderno', orderno).data('index', index).show();
    });
}
