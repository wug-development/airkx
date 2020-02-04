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
        $('#txt_startCity,#txt_endCity').val('')
        userTrip.sCity = ''
        userTrip.sPort = ''
        userTrip.eCity = ''
        userTrip.ePort = ''
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
            if (userTrip.sCity != v) {
                let li = $(this).siblings('.ddl-city').find('li')
                if (li.length > 0) {
                    let data = $(li).data()
                    if (this.id == 'txt_startCity') {
                        userTrip.sCity = data.display
                        userTrip.sPort = data.portname
                    } else {
                        userTrip.eCity = data.display
                        userTrip.ePort = data.portname
                    }
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
        let _t = $(this).parent().data('type')
        let d = getfilterData(_t, _v)
        bindEventHtml(d, $(this).parent())
    })
    /// 显示更多舱位
    $('.ddl-box').on('click', function () {
        let _t = $(this).data('type')
        if ($(this).find('.ddl-city').find('li').length < 1) {
            let _data = getfilterData(_t, '')
            if (_data.length < 1) {
                alert('城市加载中...')
            } else {
                bindEventHtml(_data, $(this))
            }
        } else {
            let _v = $(this).find('.txt').val().trim()
            if (_v == '') {
                _v = $(this).find('.txt').attr('placeholder')
                if (_v.indexOf('英文') > -1) {
                    _v = ''
                }
            }
            let _i = _v.indexOf('(')
            if (_i > -1) {
                _v = _v.substr(_i + 1, 3)
            }
            let _data = getfilterData(_t, _v)
            bindEventHtml(_data, $(this))
        }
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
    /// 搜索航班
    $('#btn_search').click(function () {
        userTrip.cityType = 1
        if (location.href.indexOf('inlandairticket') > 1) {
            userTrip.cityType = 2
        }
        userTrip.type = $('#choose_way').find('.cur').data('type') == 1? '单程' : '往返'
        userTrip.sTime = $('#txt_stime').val().trim()
        if (userTrip.type == '往返') {
            userTrip.eTime = $('#txt_etime').val().trim()
        }
        userTrip.direct = $('#btn-direct').hasClass('cur')
        if (userTrip.sCity == '') {
            alert('请选择出发城市')
        } else if (userTrip.eCity == '') {
            alert('请选择到达城市')
        } else if (userTrip.sTime == '') {
            alert('请选择出发日期')
        } else if (userTrip.type == '往返' && userTrip.eTime == '') {
            alert('请选择返回日期')
        } else if (userTrip.type == '往返' && _.dateDiff(userTrip.eTime, userTrip.sTime) < 1) {
            alert('返回日期最少比出发日期多一天')
        } else {
            let _search = `sCity=${userTrip.sCity}&eCity=${userTrip.eCity}&sTime=${userTrip.sTime}&eTime=${userTrip.eTime}`
            let _days = userTrip.type == '往返' ? _.dateDiff(userTrip.sTime, userTrip.eTime) : 0
            let _sdate = userTrip.sTime.split("-")[1];
            let url = ''
            // 国内
            if (userTrip.cityType == 2) {
                url = `@@pagepath/roundTripGN.html?${_search}&cityType=2`
                _.setItem('searchGNData', JSON.stringify(userTrip))
            } else {
                url = `@@pagepath/roundTrip.html?${_search}&EDay=${_days}&SDate=${_sdate}&cityType=1&zhifei=${userTrip.direct}`
                _.setItem('searchGJData', JSON.stringify(userTrip))
            }
            setData(userTrip)
            window.location.href = url
        }
    })
}
/// 存储数据
function setData (obj) {
    _.setItem('startCityH', `${obj.sPort}(${obj.sCity})`)
    _.setItem('endCityH', `${obj.ePort}(${obj.eCity})`)
    _.setItem('type', obj.type)
    _.setItem('cangwei', $('#ddl_more').val() || '经济舱')
}
/// 获取城市下拉框模板转HTML
function getTmpToHtml (data) {
    return `${data.map((item, i) => `
        <li data-city="${item.city}" id="li${i}" data-pinyin="${item.Pinyin}" data-portname="${item.Portname}" data-display="${item.Display}" data-country="${item.country}">
            ${item.Portname} ${item.city} ${item.Pinyin} ${item.Display} ${item.country}
        </li> 
    `).join('')}`
}
/// 显示并绑定下拉框事件
function bindEventHtml (d, that) {
    let _html = getTmpToHtml(d)
    that.find('.ddl-city').html(_html)
    that.find('.ddl-city').addClass('cur').on('click', function (e) {
        let obj = $(e.target).data()
        if (this.id == 'ddl-scity') {
            userTrip.sCity = obj.display
            userTrip.sPort = obj.portname
        } else {
            userTrip.eCity = obj.display
            userTrip.ePort = obj.portname
        }
        let _v = obj.portname + '(' + obj.display + ')'
        $(this).prev().val(_v).data('city', obj.city)
    })
}
/// 获取城市
function getCityData (v, data) {
    if (typeof data === 'object') {
        let _d = data.filter(e => {
            return e.type == v
        })
        return _d.sort((x, y) => {
            return Number(y.hot) - Number(x.hot)
        })
    } else {
        return []
    }
}
/// 获取筛选城市
function getfilterData (t, v) {
    let data = []
    if (t == '1') {
        data = gjData
    } else {
        data = gnData
    }
    if (v) {
        return data.filter(e => {
            return e.Display.includes(v.toUpperCase()) || e.city.includes(v) || e.EngName.includes(v.toUpperCase()) || e.Pinyin.includes(v.toUpperCase()) 
        })
    } else {
        return data
    }
}

(() => {
    _.ajax({
        url: '/CityinternationalServlet',
        type: 'post',
        dataType: 'json',
        success: res => {
            window.gjData = uniqueArray(getCityData('1', res), 'Display')
            window.gnData = uniqueArray(getCityData('2', res), 'Display')
        }
    })

    bindEvent()

    window.userTrip = {
        sCity: '',
        eCity: '',
        sPort: '',
        ePort: '',
        cityType: '',
        sTime: '',
        eTime: '',
        type: '',
        direct: false    
    }
    let sdata = ''
    if (location.href.indexOf('inlandairticket') > -1) {
        sdata = _.getItem('searchGNData') 
    } else {
        sdata = _.getItem('searchGJData')
    }
    if (sdata) {
        Object.assign(userTrip, JSON.parse(sdata))
        initData(JSON.parse(sdata))
    }
    window.gjData = []
    window.gnData = []

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

function initData (obj) {
    $('#txt_startCity').val(`${obj.sPort}(${obj.sCity})`)
    $('#txt_endCity').val(`${obj.ePort}(${obj.eCity})`)
    $('#txt_stime').val(obj.sTime)
    $('#txt_etime').val(obj.eTime)
}

function uniqueArray(array, key){
    var result = [array[0]];
    for(var i = 1; i < array.length; i++){
        var item = array[i];
        var repeat = false;
        for (var j = 0; j < result.length; j++) {
            if (item[key] == result[j][key]) {
                repeat = true;
                break;
            }
        }
        if (!repeat) {
            result.push(item);
        }
    }
    return result;
}