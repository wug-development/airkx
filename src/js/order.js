(function () {
    $('#btn-createOrder').on('click', function () {
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
            getQrCode(data.orderno);
        });
    });
    $('#btn-close-qr').on('click', function () {
        var no = $('.pay-layer').data('orderno');
        $('.pay-layer').hide();
        getIsPay(no);
    })
}());

function getIsPay(orderno) {
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
            $('#div_bookhtml').append(getHtml());
            $('#btn-createOrder').hide();
        }
    });
}

function getQrCode(orderno) {
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
        $('.pay-layer').data('orderno', orderno).show();
    });
}
