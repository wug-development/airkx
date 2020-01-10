const apiurl = '@@apispath'
const _ = {
    /*
    * startdate: 开始时间
    * NYear: N年
    * */
    getAfterNDate : function (startdate, n, type) {
        var date = new Date();
        var number = 0;
        if((typeof startdate === "object" || typeof startdate === "string") && typeof n === "number"){
            date = new Date(startdate);
            number = n;
        }else if(typeof startdate === "number"){
            number = startdate;
        }
        type = type || n;
        switch (type) {
            case "y": {
                date.setFullYear(date.getFullYear() + number);
                break;
            }
            case "q": {
                date.setMonth(date.getMonth() + number * 3);
                break;
            }
            case "m": {
                date.setMonth(date.getMonth() + number);
            }
            case "w": {
                date.setDate(date.getDate() + number * 7);
                break;
            }
            case "d": {
                date.setDate(date.getDate() + number);
                break;
            }
            case "h": {
                date.setHours(date.getHours() + number);
                break;
            }
            case "m": {
                date.setMinutes(date.getMinutes() + number);
                break;
            }
            case "s": {
                date.setSeconds(date.getSeconds() + number);
                break;
            }
            default: {
                date.setDate(date.getDate() + number);
                break;
            }
        }
        return date;
    },
    /*
    * d: date
    * fmt: yyyy-MM-dd
    * fmt: yyyy-MM-dd HH:mm:ss
    * */
    dateFormat : function (d, fmt) {
        var t = new Date();
        if(!fmt){ fmt = d; }
        else if(typeof d === "string"){ t = new Date(d.replace(/-/g,'/')) }
        else { t = d  }
        var o = {
            "M+": t.getMonth() + 1, //月份
            "d+": t.getDate(), //日
            "h+": t.getHours(), //小时
            "m+": t.getMinutes(), //分
            "s+": t.getSeconds(), //秒
            "q+": Math.floor((t.getMonth() + 3) / 3), //季度
            "S": t.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (t.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    },
    /**
     * 日期比大小
     *  */
    dateTab : function(date1,date2){
        var oDate1 = new Date(date1);
        var oDate2 = new Date(date2);
        return oDate1.getTime() > oDate2.getTime()    
    }, 
    /*
    * 获取本地存储数据
    * */
    getItem : function (key) {
        return sessionStorage.getItem(key);
    },
    /*
    * 设置本地存储数据
    * */
    setItem : function (key, data) {
        sessionStorage.setItem(key,data);
    },
    /*
    * http 请求数据
    * */
    ajax : function(options, uri){	
        if(typeof jQuery === "function" && $ === jQuery || typeof Zepto === "function" && $ === Zepto){
            var _obj = {
                type: options.type || 'get',
                url: (uri || apiurl) + options.url,
                async: options.async || true,
                dataType: options.dataType || 'json',
                data: options.data || {},
                success: function(res){
                    if(typeof options.success === "function"){
                        options.success(res);
                    }
                },error:function(XMLHttpRequest, textStatus, errorThrown){
                    console.log("%c error : " + textStatus,"color:#f00");
                    console.log("%c "+ (apiurl || '') + options.url,"color:#f00");
                    if(typeof options.error === "function"){
                        options.error();
                    }
                },complete:function(XMLHttpRequest, status){
                    if(typeof options.complete === "function"){
                        options.complete(status);
                    }
                }					
            };
            $.ajax(_obj);
        }
    },
    http(options){
        return this.ajax(options, apiurl)
    },
    checkTel(val){
        return /^(((1[3456789][0-9]{1})|(15[0-9]{1}))+\d{8})$/.test(val)
    },
    checkEmail(v){
        return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(v);
    },
    englishName(name){
        return /^[a-zA-Z\/ ]{2,20}$/.test(name)
    },
    isNumber(v) {
        return new RegExp(/^\d+$/).test(v)
    },
    isEn(v){
        return new RegExp(/^[A-Za-z]+$/).test(v)
    },
    isCn(v){
        return new RegExp(/^[\u4e00-\u9fa5]+$/).test(v)
    },
    isNumberEn(v){
        return new RegExp(/^[A-Za-z0-9]+$/).test(v)
    },
    clearSpace(v){
        return v.replace(/ /g,'')
    },
    //渲染模板 ; 依赖doT.min.js
    render: function(tmplid, data, container) {
        var _html = tmplid;
        if(tmplid.indexOf('#') == 0 || tmplid.indexOf('.') == 0) {
            _html = $(tmplid).html();
        }
        var doTtmpl = doT.template(_html);
        var html = doTtmpl(data);
        if (typeof container == 'string') {
            $(container).html(html);
        }
        return html;
    },
    getUrlParams (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        return r? r[2] : null;
    },
    getAllCountry () {
        return [
            { key: '61', value: '澳大利亚' }, 
            { key: '82', value: '韩国' }, 
            { key: '1', value: '加拿大' }, 
            { key: '60', value: '马来西亚' }, 
            { key: '1', value: '美国' }, 
            { key: '81', value: '日本' }, 
            { key: '65', value: '新加坡' }, 
            { key: '44', value: '英国' }, 
            { key: '86', value: '中国' }, 
            { key: '852', value: '中国香港' }, 
            { key: '853', value: '中国澳门' }, 
            { key: '886', value: '中国台湾' }
        ]
    }
}

//提示框
window.alert = function(options){
    var _layer = document.createElement("div");
    var _html = "";
    if(typeof options === "object"){
        _html += "<div>";
        _html += "<p>";
        _html += options.text || "";
        _html += "</p>";
        _html += "<div class='btn' id='btn_alert_close'>Close</div>";
        _html += "</div>";
    }else{
        _html += "<div>";
        _html += "<p>";
        _html += options || "";
        _html += "</p>";
        _html += "<div class='btn' onclick='closealert();' >确定</div>";
        _html += "</div>";
    }
    _layer.className = "wg_layer wg_layer_alert";
    _layer.id = "wg_layer_alert";
    _layer.innerHTML = _html;
    document.body.appendChild(_layer);

    if(options.callfun && typeof options.callfun === 'function'){
        $("#btn_alert_close").on("click",function(){
            options.callfun();
            closealert();
        });
    }
};
function closealert(){
    var _layer = document.getElementById("wg_layer_alert");
    _layer.remove();
}