$.ajax({
    url: '@@apispath/ListServletJS',
    type: 'get',
    dataType: 'json',
    error: function() {
        alert("网络错误，请刷新重试")
    },success: function (data) {
        for (var i = 0; i < data.length; i++) {
            var DataSM = parseInt(data[i].DataS.split("-")[1]);
            var DataEM = parseInt(data[i].DataE.split("-")[1]);
            var eDay = DateMinus(data[i].DataE, data[i].DataS);
            if (data[i].Info.length != 0 || data[i].Info != undefined) {
                for (var k = 0; k < data[i].Info.length; k++) {
                    for (var j = 0; j < data[i].Info[k].Info1.length; j++) {
                        if (data[i].Type == "往返") {
                            if (parseInt(data[i].Info[k].Info1[j].StartM) > DataSM || parseInt(data[i].Info[k].Info1[j].EndM) < DataEM) {
                                data[i].Info[k].Info1.splice(j, 1);
                                j = 0;
                                k = 0;
                                i = 0;
                            }
                        } else {
                            if (parseInt(data[i].Info[k].Info1[j].StartM) > DataSM || parseInt(data[i].Info[k].Info1[j].EndM) < DataSM) {
                                data[i].Info[k].Info1.splice(j, 1);
                                j = 0;
                                k = 0;
                                i = 0;
                            }
                        }

                        if (data[i].Type == "往返" && parseInt(data[i].Info[k].Info1[j].WFTS) < parseInt(eDay)) {
                            data[i].Info[k].Info1.splice(j, 1);
                            j = 0;
                            k = 0;
                            i = 0;
                        }
                    }
                    if (data[i].Info[k].Info1.length == 0) {
                        data[i].Info.splice(k, 1);
                        j = 0;
                        k = 0;
                        i = 0;
                    }
                }
            }

        }
        for (var i = 0; i < data.length; i++) {
            for (var k = 0; k < data[i].Info.length; k++) {
                ArrSort(data[i].Info[k].Info1);
            }
        }
        for (var i = 0; i < data.length; i++) {
            for (var k = 0; k < data[i].Info.length; k++) {
                data[i].Info[k].TicketPrice = data[i].Info[k].Info1[0].TicketPrice;
                delete data[i].Info[k].Info1;
            }
        }
        for (var i = 0; i < data.length; i++) {
            ArrSort(data[i].Info);
        }
        for (var i = 0; i < data.length; i++) {
            data[i].TicketPrice = data[i].Info[0].TicketPrice;
            data[i].HKGS = data[i].Info[0].HKGS;
            delete data[i].Info;

        }
        var aircomArr = [];
        var sCode = [];
        var eCode = [];
        for (var i = 0; i < data.length; i++) {
            aircomArr.push(data[i].HKGS);
            sCode.push(data[i].StartCode);
            eCode.push(data[i].EndCode);
        }
        var oldData = data;
        $.ajax({
            url: '@@apispath/ListServletJS',
            type: 'post',
            dataType: 'json',
            error: function() {
                alert("网络错误，请刷新重试")
            },
            data: {
                "aircomArr": aircomArr,
                "sCode": sCode,
                "eCode": eCode
            },
            traditional: true,
            success: function (data) {
                console.log(data)
                for (var i = 0; i < oldData.length; i++) {
                    oldData[i].aircomName = data[0][i].aircomName;
                    oldData[i].aircomP = data[0][i].Picture;
                    oldData[i].sCity = data[1][i];
                    oldData[i].eCity = data[2][i];
                    oldData[i].sportName = data[3][i];
                    oldData[i].eportName = data[4][i];
                }
                $(".con-ten").empty();
                var html = "";
                for (var i = 0; i < oldData.length; i++) {
                    html += '<div class="con-list">\
                                <div class="listtitle" title="' + oldData[i].StartCode + "-" + oldData[i].EndCode + '">' + oldData[i].sCity + "-" + oldData[i].eCity + '</div>\
                                <img src="' + oldData[i].aircomP + '" alt="">\
                                <div class="aircompany">' + oldData[i].aircomName.substring(0, 5) + '</div>\
                                <div class="listdate">特价时段&nbsp;<span>' + oldData[i].DataS + "---" + oldData[i].DataE + '</span></div>\
                                <div class="price">¥' + oldData[i].TicketPrice + '<i>起</i></div>\
                                <div class="airType" title="' + oldData[i].sportName + "-" + oldData[i].eportName + '">(' + oldData[i].Type + ')</div>\
                            </div>'
                }
                $(".con-ten").append(html);
                $(".contact").show();
                $(".loading").hide();
                $(".con-list").click(function() {
                    var sCity = $(this).find(".listtitle").attr("title").split("-")[0];
                    var eCity = $(this).find(".listtitle").attr("title").split("-")[1];
                    var type = $(this).find(".airType").html().substring(1, 3);
                    var sTime = $(this).find(".listdate").find("span").html().split("---")[0];
                    var eTime = $(this).find(".listdate").find("span").html().split("---")[1];
                    var SDate = sTime.split("-")[1];
                    var EDay = DateMinus(eTime, sTime);
                    var cityType = 1;
                    var sportName = $(this).find(".airType").attr("title").split("-")[0];
                    var eportName = $(this).find(".airType").attr("title").split("-")[1];
                    setSessionstorage("startCityH", sportName+"("+sCity+")");
                    setSessionstorage("endCityH", eportName+"("+eCity+")");
                    setSessionstorage("type", type);
                    window.location.href = "roundTrip.html?sCity=" + sCity + "&eCity=" + eCity + "&sTime=" + sTime + "&EDay=" + EDay + "&SDate=" + SDate + "&cityType=" + cityType+ "&eTime=" + eTime;
                })
            }
        })
    }
})

function DateMinus(sDate, now) {　　
    var sdate = new Date(sDate.replace(/-/g, "/"));
    var now = 　new Date(now.replace(/-/g, "/"));
    var days = sdate.getTime() - now.getTime();　　
    var day = parseInt(days / (1000 * 60 * 60 * 24));　　
    return day;
}

function ArrSort(arr) {
    for (var j = 0; j < arr.length - 1; j++) {
        for (var i = 0; i < arr.length - 1 - j; i++) {
            if (parseInt(arr[i].TicketPrice) > parseInt(arr[i + 1].TicketPrice)) {
                var temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
            }
        }
    }
}
function setSessionstorage(key, value) {
    window.sessionStorage.setItem(key, value);
}