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
    for (let item=0; item < flightArr.length; item++) {
        if (!_d.includes(flightArr[item].Zhou)) {
            _d.push(flightArr[item].Zhou)
        }
    }
    for (let m=0; m < _d.length; m++) {
        let _arr = []
        for (let f=0; f < flightArr.length; f++) {
            if (flightArr[f].Zhou === _d[m]) {
                _arr.push(flightArr[f])
            }
        }
        data.push({
            name: _d[m],
            children: _arr
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
    }
})()

function randomNum (min, max) {
    return Math.floor(min + Math.random() * (max - min))
}
