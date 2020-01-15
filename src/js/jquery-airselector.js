(function($) {
    var getCity = function() {
        var arr = [],
            obj = null,
            i;
        if (arguments.length === 3) {
            obj = arguments[2];
            for (i in obj) {
                if (obj[i].type == arguments[0] && obj[i].hot == arguments[1]) {
                    arr.push(obj[i]);
                }
            }

        } else if (arguments.length === 4) {
            obj = arguments[3];
            for (i in obj) {
                if (obj[i].type == arguments[0] && obj[i].state == arguments[2]) {
                    arr.push(obj[i]);
                }
            }
        }
        return arr;
    }

    //城市列表显示隐藏事件
    var setCity = function(_that,options) {
        $(".city").off().on("click", function(e) {
            if (e.target.nodeName === "LI") {
                _that.css("color", "#1D3245").val($(e.target).html());
                $(".selector-box").hide();
                options();
            }
        });
    }

    //热门城市滑动门事件
    var createCityLI = function(data) {
        var html = "";
        for (var i in data) {
            html += "<li>" + data[i].city + "</li>";
        }
        return html;
    }
    var createChinaCityLI = function(type, obj) {
        var arr = [
            ["A", "B", "C", "D", "E"],
            ["F", "G", "H", "I", "J"],
            ["K", "L", "M", "N", "O"],
            ["P", "Q", "R", "S", "T"],
            ["U", "V", "W", "X", "Y", "Z"]
        ];
        var html = "";
        for (var i = 0; i < arr[type].length; i++) {
            var data = getCity(2, 1, arr[type][i], obj);
            if (data.length > 0) {
                var subHTML = "";
                for (var j in data) {
                    subHTML += "<a>" + data[j].city + "</a>";
                }
                html += "<li><span>" + arr[type][i] + "</span>" + subHTML + "</li>"
            }
        }
        return html;
    }
    var updateTab = function(type, sub, obj) {
        var dataItem = "";
        if (type === 1) {
            switch (sub) {
                case 0:
                    dataItem = createCityLI(getCity(1, 1, obj));
                    break;
                case 1:
                    dataItem = createCityLI(getCity(1, 1, 1, obj));
                    break;
                case 2:
                    dataItem = createCityLI(getCity(1, 1, 2, obj));
                    break;
                case 3:
                    dataItem = createCityLI(getCity(1, 1, 3, obj));
                    break;
                case 4:
                    dataItem = createCityLI(getCity(1, 1, 4, obj));
                    break;
            }
        } else if (type === 2) {
            switch (sub) {
                case 0:
                    $("#gn").removeClass().addClass("city");
                    dataItem = createCityLI(getCity(2, 1, obj));
                    break;
                case 1:
                    dataItem = createChinaCityLI(0, obj);
                    break;
                case 2:
                    dataItem = createChinaCityLI(1, obj);
                    break;
                case 3:
                    dataItem = createChinaCityLI(2, obj);
                    break;
                case 4:
                    dataItem = createChinaCityLI(3, obj);
                    break;
                case 5:
                    dataItem = createChinaCityLI(4, obj);
                    break;
            }
        }
        return dataItem;
    }

    $.fn.citySelectorGN = function(options) {
        var defaults = {

        }
        var settings = $.extend({}, defaults, options);
        var _that = this;
        this.on("click", function(e) {
        	if($.trim(_that.val()).length>0){ 
        		$('.history1').hide();
        		_that.keyup();
        	}else{
        		$('.history,.history1').hide();
	            var selectorHTML = "<div class=\"selector-box\">" +
	                "<h3>热门城市(可直接输入中文名/拼音/英文)</h3>" +
	
	                "<div class=\"group\">" +
	                "<ul class=\"group-tab\">" +
	                "<li class=\"on\">国内热门</li>" +
	                "<li>ABCDE</li>" +
	                "<li>FGHIJ</li>" +
	                "<li>KLMNO</li>" +
	                "<li>PQRST</li>" +
	                "<li>UVWXYZ</li>" +
	                "</ul>" +
	                "<ul class=\"city\" id=\"gn\"></ul>" +
	                "</div>" +
	                "</div>";
	            //生成热门城市列表
	            $(".selector-box").remove();
	            $("body").prepend(selectorHTML);
	            var obj = object.data
	            var gnresult = getCity(2, 1, obj);
	            var gjhtml = "";
	            var gnhtml = "";
	
	            for (var i = 0, max = gnresult.length; i < max; i++) {
	                gnhtml += "<li>" + gnresult[i].city + "</li>";
	            }
	            $("#gj").html(gjhtml);
	            $("#gn").html(gnhtml);
	
	            $(".group-tab").click(function(e) {
	                if (e.target.nodeName === "LI") {
	                    $(this).children().each(function(i, o) {
	                        $(o).removeClass();
	                        if (i === $(e.target).index()) {
	                            $(o).addClass("on");
	                            var type = $(e.target).parent().parent().index();
	                            if (type === 2) {
	                                $("#gj").html(updateTab(1, i, obj));
	                                options();
	                            } else if (type === 1) {
	                                $("#gn").removeClass().addClass("city-groups").html(updateTab(2, i, obj));
	                                $(".city-groups").on("click", function(e) {
	                                    if (e.target.nodeName === "A") {
	                                        _that.css("color", "#1D3245").val($(e.target).html());
	                                        $(".selector-box").hide();
	                                        options();
	                                    }
	                                    options();
	                                });
	                                options();
	                            }
	                        }
	                    });
	                }
	            });
	
	            $(".selector-box").css({
	                left: _that.offset().left,
	                top: _that.offset().top + _that.outerHeight() + 1
	            }).show().click(function(e) {
	                e.stopPropagation();
	            });
	            setCity(_that,options);
	            e.stopPropagation();
        	}
            $(document).click(function() {
                $(".selector-box").hide();
                $(this).off("click");
            });
        });
    }
    $.fn.citySelectorGW = function(options) {
        var defaults = {

        }
        var settings = $.extend({}, defaults, options);
        var _that = this;
        this.on("click", function(e) {        	
        	if($.trim(_that.val()).length>0){
        		$('.history').hide();
        		_that.keyup();
    		}else{ 
        		$('.history,.history1').hide();
	            var selectorHTML = "<div class=\"selector-box\">" +
	                "<h3>热门城市(可直接输入中文名/拼音/英文)</h3>" +
	                "<div class=\"group\">" +
	                "<ul class=\"group-tab\">" +
	                "<li class=\"on\">国际·港澳台</li>" +
	                "<li>美洲</li>" +
	                "<li>亚洲/大洋洲</li>" +
	                "<li>欧洲</li>" +
	                "<li>非洲</li>" +
	                "</ul>" +
	                "<ul class=\"city\" id=\"gj\"></ul>" +
	                "</div>" +
	
	                "</div>";
	            //生成热门城市列表
	            $(".selector-box").remove();
	            $("body").prepend(selectorHTML);
	            var obj = object.data
	            var gjresult = getCity(1, 1, obj);
	            var gnresult = getCity(2, 1, obj);
	            var gjhtml = "";
	            var gnhtml = "";
	            for (var i = 0, max = gjresult.length; i < max; i++) {
	                gjhtml += "<li>" + gjresult[i].city + "</li>";
	            }
	            for (var i = 0, max = gnresult.length; i < max; i++) {
	                gnhtml += "<li>" + gnresult[i].city + "</li>";
	            }
	            $("#gj").html(gjhtml);
	            $("#gn").html(gnhtml);
	
	            $(".group-tab").click(function(e) {
	                if (e.target.nodeName === "LI") {
	                    $(this).children().each(function(i, o) {
	                        $(o).removeClass();
	                        if (i === $(e.target).index()) {
	                            $(o).addClass("on");
	                            var type = $(e.target).parent().parent().index();
	                            if (type === 1) {
	                                $("#gj").html(updateTab(1, i, obj));
	                            } else if (type === 2) {
	                                $("#gn").removeClass().addClass("city-groups").html(updateTab(2, i, obj));
	                                $(".city-groups").on("click", function(e) {
	                                    if (e.target.nodeName === "A") {
	                                        _that.css("color", "#1D3245").val($(e.target).html());
	                                        $(".selector-box").hide();
	                                        options();
	                                    }
	                                    options();
	                                });
	                                options();
	                            }
	                        }
	                        options();
	                    });
	                    options();
	                }
	            });
	
	            $(".selector-box").css({
	                left: _that.offset().left,
	                top: _that.offset().top + _that.outerHeight() + 1
	            }).show().click(function(e) {
	                e.stopPropagation();
	            });
	            setCity(_that,options);
	            e.stopPropagation();        		
        	}
            $(document).click(function() {
                $(".selector-box").hide();
                $(this).off("click");
            });
        });
    }
})($);
(function($){
    $.fn.hoverDelay = function(options){
        var defaults = {
            hoverDuring: 200,
            outDuring: 200,
            hoverEvent: function(){
                $.noop();
            },
            outEvent: function(){
                $.noop();    
            }
        };
        var sets = $.extend(defaults,options || {});
        var hoverTimer, outTimer, that = this;
        return $(this).each(function(){
            $(this).hover(function(){
                clearTimeout(outTimer);
                hoverTimer = setTimeout(function(){sets.hoverEvent.apply(that)}, sets.hoverDuring);
            },function(){
                clearTimeout(hoverTimer);
                outTimer = setTimeout(function(){sets.outEvent.apply(that)}, sets.outDuring);
            });    
        });
    }      
})($);
$(function() {
    $.ajax({
            url: '@@apispath/CityinternationalServlet',
            type: 'post',
            dataType: 'json',
        })
        .done(function(data) {
            window.cityData = data;
            var $startCityIndex=$("#startCityIndex");
            var $endCityIndex=$("#endCityIndex");
            var $history=$(".history");
            var $history1=$(".history1");

            var $startCityGW=$("#startCityGW");
            var $endCityGW=$("#endCityGW");

            var $startCityGN=$("#startCityGN");
            var $endCityGN=$("#endCityGN");
            $startCityIndex.keyup(function() {
            	$(".history1").hide();
            	if($.trim($startCityIndex.val()).length>0){
            		$(".selector-box").hide();
            	}
                
                var val = $(this).val().toLocaleUpperCase();
                var shtml = getDataLong(val, cityData, 2)
                $history.html(shtml)
                $history.show();
                if($history.find("dl").length==0){
                    $history.height(25)
                }else{
                    $history.height(209)
                }
                $history.find("dl").find('dd').click(function() {
                	$startCityIndex.parent().css('border','1px solid #a0a0a0');
                    var html = $(this).children("i").eq(0).html()+$(this).children("i").eq(3).html();
                    $startCityIndex.val(html);
                    $history.empty();
                    $history.hide();
                    $startCityIndex.siblings('input[type=hidden]').val($(this).children("i").eq(3).html().substring(1,4 ))
                })
            });
            $endCityIndex.keyup(function() {
            	$(".history").hide();
            	if($.trim($endCityIndex.val()).length>0){
            		$(".selector-box").hide();
            	}
                var val = $(this).val().toLocaleUpperCase();
                var shtml = getDataLong(val, cityData, 1)
                $history1.html(shtml)
                $history1.show();
                if($history1.find("dl").length==0){
                    $history1.height(25)
                }else{
                    $history1.height(209)
                }
                $history1.find("dl").find('dd').click(function() {
                	$endCityIndex.parent().css('border','1px solid #a0a0a0');
                    var html = $(this).children("i").eq(0).html()+$(this).children("i").eq(3).html();
                    $endCityIndex.val(html);
                    $history1.empty();
                    $history1.hide();
                    $endCityIndex.siblings('input[type=hidden]').val($(this).find("input").val()+"$"+$(this).children("i").eq(3).html().substring(1,4 ));
                })
            });
            /*$startCityIndex.citySelectorGN(function(){
                var val = $startCityIndex.val();
                var shtml = getDataLong(val, data, 2)
                $history.html(shtml)
                $history.show();
                if($history.find("dl").length==0){
                    $history.height(25)
                }else{
                    $history.height(209)
                }
                $history.find("dl").find('dd').click(function() {
                	$startCityIndex.parent().css('border','1px solid #a0a0a0');
                    var html = $(this).children("i").eq(0).html()+$(this).children("i").eq(3).html();
                    $startCityIndex.val(html);
                    $history.empty();
                    $history.hide();
                    $startCityIndex.siblings('input[type=hidden]').val($(this).children("i").eq(3).html().substring(1,4 ))
                })
            })
            $endCityIndex.citySelectorGW(function(){
                var val = $endCityIndex.val();
                var shtml = getDataLong(val, data, 1)
                $history1.html(shtml);
                $history1.show();
                if($history1.find("dl").length==0){
                    $history1.height(25)
                }else{
                    $history1.height(209)
                }
                $history1.find("dl").find('dd').click(function() {
                	$endCityIndex.parent().css('border','1px solid #a0a0a0');
                    var html = $(this).children("i").eq(0).html();
                    $endCityIndex.val(html);
                    $history1.empty();
                    $history1.hide();
                   $endCityIndex.siblings('input[type=hidden]').val($(this).find("input").val()+"$"+$(this).children("i").eq(3).html().substring(1,4 ));
                })
            })*/

            $startCityGW.keyup(function() {
                $(".selector-box").hide();
                var val = $(this).val().toLocaleUpperCase();
                var shtml = getData(val, data, 2)
                $history.html(shtml)
                $history.show();
                if($history.find("dl").length==0){
                    $history.height(25)
                }else{
                    $history.height(209)
                }
                $history.find("dl").find('dd').click(function() {
                    var html = $(this).children("p").html()+"("+$(this).children("b").html()+")";
                    $startCityGW.val(html);
                    $history.empty();
                    $history.hide();
                    $startCityGW.siblings('input[type=hidden]').val($(this).children("b").html())
                })
            });
            $endCityGW.keyup(function() {
                $(".selector-box").hide();
                var val = $(this).val().toLocaleUpperCase();
                var shtml = getData(val, data, 1)
                $history1.html(shtml)
                $history1.show();
                if($history1.find("dl").length==0){
                    $history1.height(25)
                }else{
                    $history1.height(209)
                }
                $history1.find("dl").find('dd').click(function() {
                    var html = $(this).children("p").html()+"("+$(this).children("b").html()+")";
                    $endCityGW.val(html);
                    $history1.empty();
                    $history1.hide();
                    $endCityGW.siblings('input[type=hidden]').val($(this).find("input").val()+"$"+$(this).children("b").html());
                })
            });
            /*$startCityGW.click(function() {
                $history.empty();
            })
            $endCityGW.click(function() {
                $history1.empty();
            })
            $startCityGW.citySelectorGN(function(){
                var val = $startCityGW.val();
                var shtml = getData(val, data, 2)
                $history.html(shtml)
                $history.show();
                if($history.find("dl").length==0){
                    $history.height(25)
                }else{
                    $history.height(209)
                }
                $history.find("dl").find('dd').click(function() {
                    var html = $(this).children("p").html()+"("+$(this).children("b").html()+")";
                    $startCityGW.val(html);
                    $history.empty();
                    $history.hide();
                    $startCityGW.siblings('input[type=hidden]').val($(this).children("b").html())
                })
            })
            $endCityGW.citySelectorGW(function(){
                var val = $endCityGW.val();
                var shtml = getData(val, data, 1)
                $history1.html(shtml);
                $history1.show();
                if($history1.find("dl").length==0){
                    $history1.height(25)
                }else{
                    $history1.height(209)
                }
                $history1.find("dl").find('dd').click(function() {
                    var html = $(this).children("p").html()
                    $endCityGW.val(html);
                    $history1.empty();
                    $history1.hide();
                    $endCityGW.siblings('input[type=hidden]').val($(this).find("input").val()+"$"+$(this).children("b").html());
                })
            })*/

            $startCityGN.keyup(function() {
                $(".selector-box").hide();
                var val = $(this).val().toLocaleUpperCase();
                var shtml = getData(val, data, 2)
                $history.html(shtml)
                $history.show();
                if($history.find("dl").length==0){
                    $history.height(25)
                }else{
                    $history.height(209)
                }
                $history.find("dl").find('dd').click(function() {
                    var html = $(this).children("p").html()+"("+$(this).children("b").html()+")";
                    $startCityGN.val(html);
                    $history.empty();
                    $history.hide();
                    $startCityGN.siblings('input[type=hidden]').val($(this).children("b").html())
                })
            });
            $endCityGN.keyup(function() {
                $(".selector-box").hide();
                var val = $(this).val().toLocaleUpperCase();
                var shtml = getData(val, data, 2)
                $history1.html(shtml)
                $history1.show();
                if($history1.find("dl").length==0){
                    $history1.height(25)
                }else{
                    $history1.height(209)
                }
                $history1.find("dl").find('dd').click(function() {
                    var html = $(this).children("p").html()+"("+$(this).children("b").html()+")";
                    $endCityGN.val(html);
                    $history1.empty();
                    $history1.hide();
                    $endCityGN.siblings('input[type=hidden]').val($(this).find("input").val()+"$"+$(this).children("b").html());
                })
            });
            /*$startCityGN.click(function() {
                $history.empty();
            })
            $endCityGN.click(function() {
                $history1.empty();
            })
            $startCityGN.citySelectorGN(function(){
                var val = $startCityGN.val();
                var shtml = getData(val, data, 2)
                $history.html(shtml)
                $history.show();
                if($history.find("dl").length==0){
                    $history.height(25)
                }else{
                    $history.height(209)
                }
                $history.find("dl").find('dd').click(function() {
                    var html = $(this).children("p").html()+"("+$(this).children("b").html()+")";
                    $startCityGN.val(html);
                    $history.empty();
                    $history.hide();
                    $startCityGN.siblings('input[type=hidden]').val($(this).children("b").html())
                })
            })
            $endCityGN.citySelectorGN(function(){
                var val = $endCityGN.val();
                var shtml = getData(val, data, 2)
                $history1.html(shtml);
                $history1.show();
                if($history1.find("dl").length==0){
                    $history1.height(25)
                }else{
                    $history1.height(209)
                }
                $history1.find("dl").find('dd').click(function() {
                    var html = $(this).children("p").html()+"("+$(this).children("b").html()+")";
                    $endCityGN.val(html);
                    $history1.empty();
                    $history1.hide();
                    $endCityGN.siblings('input[type=hidden]').val($(this).find("input").val()+"$"+$(this).children("b").html());
                })
            })*/

            $("#startCityIndex,#startCityGW,#startCityGN").on({
                'click':function(){
                    $(this).keyup();
                },'blur':function(){
                    var _that = $(this);
                    setTimeout(function(){ 
                        var _v = _that.siblings('input[type=hidden]').val();
                        if (!_v || $.trim(_v).length<1) {
                            _that.val("");
                        }
                    },100)
                }
            });            
            $("#endCityIndex,#endCityGW,#endCityGN").on({
                'click':function(){
                    $(this).keyup();
                },'blur':function(){
                    var _that = $(this);
                    setTimeout(function(){ 
                        var _v = _that.siblings('input[type=hidden]').val().split("$")[1];
                        if (!_v || $.trim(_v).length<1) {
                            _that.val("");
                        }
                    },100)
                }
            });

            // $("#startCityGW").on({
            //     'click':function(){
            //         $(this).keyup();
            //     },'blur':function(){
            //         var _that = $(this);
            //         setTimeout(function(){ 
            //             var _v = _that.siblings('input[type=hidden]').val();
            //             if (!_v || $.trim(_v).length<1) {
            //                 _that.val("");
            //             }
            //         },100)
            //     }
            // });
            // $("#endCityGW").on({
            //     'click':function(){
            //         $(this).keyup();
            //     },'blur':function(){
            //         var _that = $(this);
            //         setTimeout(function(){ 
            //             var _v = _that.siblings('input[type=hidden]').val().split("$")[1];
            //             if (!_v || $.trim(_v).length<1) {
            //                 _that.val("");
            //             }
            //         },100)
            //     }
            // });

            
})

    function getData(val, data, type) {
        var arr = [];
        if (val != "") {
            for (var i = 0; i < data.length; i++) {
                if (data[i].Display.indexOf(val) != -1) {
                    arr.push(data[i]);
                }
                if (data[i].EngName.indexOf(val) != -1) {
                    arr.push(data[i]);
                }
                if (data[i].Pinyin.indexOf(val) != -1) {
                    arr.push(data[i]);
                }
                if (data[i].city.split("(")[0].indexOf(val) != -1) {
                    arr.push(data[i]);
                }
            }
        }else{
            arr = data;
        }
        var TarGetData = arrquchong(arr);
        if (type == 2) {
            for (var i = 0; i < TarGetData.length; i++) {
                if (TarGetData[i].type == 1) {
                    TarGetData.splice(i, 1);
                    i--;
                }
            }
        }
        if (type == 1) {
            for (var i = 0; i < TarGetData.length; i++) {
                if (TarGetData[i].type == 2) {
                    TarGetData.splice(i, 1);
                    i--;
                }
            }
        }
        var shtml = '';
        for (var k = 0; k < TarGetData.length; k++) {
            if (TarGetData[k] != undefined) {
                shtml += '<dl>\
                            <dt><span>' + TarGetData[k].country + '</span><span>,</span><span>' + TarGetData[k].city + '</span></dt>\
                            <dd><p>' + TarGetData[k].Portname + '</p><b>' + TarGetData[k].Display + '</b><input type="hidden" value="'+TarGetData[k].type+'" /></dd>\
                        </dl>'
            }
        }
        return shtml;
    }
    function getDataLong(val, data, type){
    	var arr = [];
        if (val != "") {
            for (var i = 0; i < data.length; i++) {
                if (data[i].Display.indexOf(val) != -1) {
                    arr.push(data[i]);
                }
                if (data[i].EngName.indexOf(val) != -1) {
                    arr.push(data[i]);
                }
                if (data[i].Pinyin.indexOf(val) != -1) {
                    arr.push(data[i]);
                }
                if (data[i].city.split("(")[0].indexOf(val) != -1) {
                    arr.push(data[i]);
                }
            }
        }else{
            arr = data;
        }
        var TarGetData = arrquchong(arr);
        if (type == 2) {
            for (var i = 0; i < TarGetData.length; i++) {
                if (TarGetData[i].type == 1) {
                    TarGetData.splice(i, 1);
                    i--;
                }
            }
        }
        if (type == 1) {
            for (var i = 0; i < TarGetData.length; i++) {
                if (TarGetData[i].type == 2) {
                    TarGetData.splice(i, 1);
                    i--;
                }
            }
        }
        var shtml = '<div class="selectCityTitle">按机场名 (城市) 英文 三字码 国家</div>';
        for (var k = 0; k < TarGetData.length; k++) {
            if (TarGetData[k] != undefined) {
                shtml += '<dl>\
                            <dd><i>' + TarGetData[k].Portname + '</i><i>' + TarGetData[k].city + '</i><i>' + TarGetData[k].EngName + '</i><i>(' + TarGetData[k].Display + ')</i><i>' + TarGetData[k].country + '</i><input type="hidden" value="'+TarGetData[k].type+'" /></dd>\
                        </dl>'
            }
        }
        return shtml;
    }
    function arrquchong(array) {
        var r = [];
        for (var i = 0, l = array.length; i < l; i++) {
            for (var j = i + 1; j < l; j++) {
                if (array[i].Display === array[j].Display) {
                    j = ++i;
                }
            }
            r.push(array[i]);
        }
        return r;
    }

    laydate.render({
        elem: "#startTime",
        min: 0,
        max: 365
    });
    laydate.render({
        elem: "#endTime",
        min: 0,
        max: 365
    });
})

function getDateString(num){
	var date = new Date();
	if(num){
		date.setDate(date.getDate()+num);//设置天数
	}
	var _m = (date.getMonth() + 1);
	if(_m<10){
		_m = '0'+_m;
	}
	var _d = date.getDate();
	if(_d<10){
		_d = '0'+_d;
	}
	return date.getFullYear() + "-" + _m + "-" + _d;
}
function compareDate(d1,d2){
	if(typeof(d1) == "string"){
		d1 = new Date(d1);  
	}if(typeof(d2) == "string") {
		d2 = new Date(d2);
	}
	return d1.getTime() > d2.getTime();
}