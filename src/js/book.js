const bindEvent = () => {
    /// 切换 单程 往返 定制
    $('.btn-way').on('click', function () {
        $(this).addClass('cur').siblings().removeClass('cur')
        let _type = $(this).data('type')
        if (_type == '1') {
            $('.book-form-box').show()
            $('.book-dingzhi').hide()
            $('.back-date').hide()
        } else if (_type == '2') {
            $('.book-form-box').show()
            $('.book-dingzhi').hide()
            $('.back-date').show()
        } else if (_type == '3') {
            $('.book-form-box').hide()
            $('.book-dingzhi').show()
        }
    })
    /// 显示更多舱位
    $('.ddl-more').on('click', function () {
        $('.ddl-cag-box').addClass('cur').find('li').off().on('click', function () {
            $(this).addClass('cur').siblings().removeClass('cur')
            $('#ddl_more').val($(this).text().trim())
        })
    })
    /// 切换由大陆出发还是境外始发
    $('.book-change-org .book-btn').on('click', function () {
        $(this).addClass('cur').siblings().removeClass('cur')
        let _t = $(this).data('type')
        if (_t == '1') {
            $('.ddl-start').data('type', '1')
            $('.ddl-end').data('type', '2')
        } else {
            $('.ddl-start').data('type', '2')
            $('.ddl-end').data('type', '1')
        }
    })
    /// 输入城市
    $('#txt_startCity,#txt_endCity').on('click', function () {
        let v = $(this).val().trim()
        if (v) {
            $(this).val('').attr('placeholder', v)
        }
    })
    $('#txt_startCity,#txt_endCity').on('blur', function () {
        let v = $(this).val().trim()
        if (v == '') {
            v = $(this).attr('placeholder')
            v = (v.indexOf('英文') == 0? '' : v)
            $(this).val(v)
        } else {
            let c = $(this).data('city')
            if (userTrip.scity != v) {
                let li = $(this).siblings('.ddl-city').find('li')
                if (li.length > 0) {
                    let data = $(li).data()
                    userTrip.scity = data.city
                    $(this).data('city', data.city)
                    $(this).val(data.portname + '(' + data.display + ')')
                } else {
                    v = $(this).attr('placeholder')
                    $(this).val(v)
                }
            }
        }
    })
    $('#txt_startCity,#txt_endCity').on('keyup', function () {
        let _v = $(this).val()
        let d = getfilterData(_v)
        bindEventHtml(d, $(this).parent())
    })
    /// 显示更多舱位
    $('.ddl-box').on('click', function () {
        let _t = $(this).data('type')
        let _data = getCityData(_t)
        bindEventHtml(_data, $(this))
    })
    /// 关闭下拉框
    $(window).click(function(e,f) {
        let cname = e.target.className
        if (cname.indexOf('ddl') === -1) {
            $('.ddl-cag-box').removeClass('cur')
        }
        if (cname.indexOf('sddl') === -1) {
            $('#ddl-scity').removeClass('cur')
        }
        if (cname.indexOf('eddl') === -1) {
            $('#ddl-ecity').removeClass('cur')
        }
    })
    /// 直飞
    $('#btn-direct').click(function () {
        if ($(this).hasClass('cur')) {
            $(this).removeClass('cur')
        } else {
            $(this).addClass('cur')
        }
    })
    /// 定制行程
    $('#btn_submit').click(function () {
        ///
    })
    /// 搜索航班
    $('#btn_search').click(function () {
        userTrip.cityType = ''
        userTrip.type = $('#choose_way').find('.cur').data('type') == 1? '单程' : '往返'
        userTrip.sTime = $('#txt_stime').val().trim()
        userTrip.eTime = $('#txt_etime').val().trim()
        if (userTrip.sCity == '') {
            alert('请选择出发城市')
        } else if (userTrip.eCity == '') {
            alert('请选择到达城市')
        } else if (userTrip.sTime == '') {
            alert('请选择出发日期')
        } else if (userTrip.type == '往返' && userTrip.eTime == '') {
            alert('请选择返回日期')
        } else {
            _.setItem('searchData', JSON.stringify(userTrip))
        }
    })
}
/// 获取城市下拉框模板转HTML
function getTmpToHtml (data) {
    return `${data.map(item => `
        <li data-city="${item.city}" data-pinyin="${item.Pinyin}" data-portname="${item.Portname}" data-display="${item.Display}" data-country="${item.country}">
            ${item.Portname} ${item.city} ${item.Pinyin} ${item.Display} ${item.country}
        </li> 
    `).join('')}`
}
/// 显示并绑定下拉框事件
function bindEventHtml (d, that) {
    let _html = getTmpToHtml(d)
    that.find('.ddl-city').html(_html)
    that.find('.ddl-city').addClass('cur').find('li').off().on('click', function () {
        $(this).addClass('cur').siblings().removeClass('cur')
        let obj = $(this).data()
        if ($(this).parent().className.includes('sddl')) {
            userTrip.scity = data.city
        } else {
            userTrip.ecity = data.city
        }
        let _v = obj.portname + '(' + obj.display + ')'
        $(this).parent().prev().val(_v).data('city', obj.city)
    })
}
/// 获取城市
function getCityData (v) {
    if (typeof cityData === 'object') {
        let _d = cityData.filter(e => {
            return e.type == v
        })
        return _d.sort((x, y) => {
            return Number(y.hot) - Number(x.hot)
        })
    } else {
        return [
            {"country":"摩洛哥","city":"卡萨布兰卡","Pinyin":"KASABULANKA","EngName":"CASABLANCA ","type":"1","Portname":"默罕默德机场","Display":"CMN"},
            {"country":"摩洛哥","city":"马拉喀什","Pinyin":"MALAKASHI","EngName":"MARRAKECH ","type":"1","Portname":"马拉喀什机场","Display":"RAK"}
        ]
    }
}
/// 获取筛选城市
function getfilterData (v) {
    let data = []
    if (typeof cityData === 'object') {
        let _d = cityData.filter(e => {
            return e.type == v
        })
        data = _d.sort((x, y) => {
            return Number(y.hot) - Number(x.hot)
        })
    } else {
        data = [
            {"country":"摩洛哥","city":"卡萨布兰卡","Pinyin":"KASABULANKA","EngName":"CASABLANCA ","type":"1","Portname":"默罕默德机场","Display":"CMN"},
            {"country":"摩洛哥","city":"马拉喀什","Pinyin":"MALAKASHI","EngName":"MARRAKECH ","type":"1","Portname":"马拉喀什机场","Display":"RAK"}
        ]
    }
    return data.filter(e => {
        return e.Display.includes(v.toUpperCase()) || e.city.includes(v) || e.EngName.includes(v.toUpperCase()) || e.Pinyin.includes(v.toUpperCase()) 
    })
}

(() => {
    _.ajax({
        url: '/CityinternationalServlet',
        type: 'post',
        dataType: 'json',
        success: res => {
            window.cityData = res
        }
    })

    bindEvent()

    window.userTrip = {
        sCity: '',
        eCity: '',
        cityType: '',
        sTime: '',
        eTime: '',
        type: ''   
    }
    let sdata = _.getItem('searchData')
    if (sdata) {
        Object.assign(userTrip, JSON.parse(sdata))
    }

    laydate.render({
        elem: "#txt_stime",
        min: 0,
        max: 365
    });
    laydate.render({
        elem: "#txt_etime",
        min: 0,
        max: 365
    });
})()