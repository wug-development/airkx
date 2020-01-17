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
