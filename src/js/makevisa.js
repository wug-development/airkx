$(function() {
    var sum = 0;
    $(".btn button").click(function() {
        sum++;
        var addVisa = '<div class="fillcontext">\
        			<div class="btn-close"><img src="@@imgpath/btn-close.png" alt=""></div>\
                <div class="list">\
                    <div class="listl"><i>*</i>英文姓名:</div>\
                    <div class="listr">\
                        <input type="text" name="YWXM">\
                    </div>\
                </div>\
                <div class="list">\
                    <div class="listl"><i>*</i>护照号码:</div>\
                    <div class="listr">\
                        <input type="text" name="HZHM">\
                    </div>\
                </div>\
                <div class="list">\
                    <div class="listl"><i>*</i>护照有效期:</div>\
                    <div class="listr">\
                        <input type="text" name="HZYXQ">\
                    </div>\
                </div>\
                <div class="list">\
                    <div class="listl"><i>*</i>出发时间:</div>\
                    <div class="listr">\
                        <input type="text" name="CFSJ">\
                    </div>\
                </div>\
                <div class="list">\
                    <div class="listl"><i>*</i>性别:</div>\
                    <div class="listr">\
                        <input checked="checked" name="mel' + sum + '" type="radio" class="sex" value="男士">先生\
                        <input  name="mel' + sum + '" type="radio" class="sex" value="女士">女士\
                    </div>\
                </div>\
                <div class="list">\
                    <div class="listl"><i>*</i>出生日期:</div>\
                    <div class="listr">\
                        <input type="text" name="CSRQ">\
                    </div>\
                </div>\
                <div class="list">\
                    <div class="listl"><i>*</i>护照类型:</div>\
                    <div class="listr">\
                        <input type="text" name="HZLX">\
                    </div>\
                </div>\
                <div class="list">\
                    <div class="listl">停留期限:</div>\
                    <div class="listr">\
                        <input type="text" name="TLQX">\
                    </div>\
                </div>\
            </div>\
        </div>'
        $(".fill").append(addVisa)
        $(".btn-close").click(function() {
            delParent($(this))
        })
    })

    var selec0 = true;
    var selec1 = true;
    var selec2 = true;
    var $selectitle = $(".selectitle");
    var $seleccontext = $(".seleccontext");
    $selectitle.eq(0).click(function() {

        if (selec0) {
            $(this).find('img').addClass('active')
            $seleccontext.eq(0).stop().animate({ "height": "192" })
            selec0 = false;
        } else {
            $(this).find('img').removeClass('active')
            $seleccontext.eq(0).stop().animate({ "height": "0" })
            selec0 = true;
        }
    });
    $selectitle.eq(1).click(function() {
        if (selec1) {
            $(this).find('img').addClass('active')
            $seleccontext.eq(1).stop().animate({ "height": "96" })
            selec1 = false;
        } else {
            $(this).find('img').removeClass('active')
            $seleccontext.eq(1).stop().animate({ "height": "0" })
            selec1 = true;

        }
    });
    $selectitle.eq(2).click(function() {
        if (selec2) {
            $(this).find('img').addClass('active')
            $seleccontext.eq(2).stop().animate({ "height": "48" })
            selec2 = false;
        } else {
            $(this).find('img').removeClass('active')
            selec2 = true;
            $seleccontext.eq(2).stop().animate({ "height": "0" })
        }
    });


    var $need = $(".need");
    var $invoiceselectitle = $(".invoiceselectitle");
    var $sendlisttitle = $(".sendlisttitle");
    var $sendlistcontext = $(".sendlistcontext");

    $need.eq(1).addClass('active')
    $invoiceselectitle.eq(1).addClass('active')
    $need.click(function() {
        $(this).addClass('active').siblings().removeClass('active')
        $invoiceselectitle.eq($(this).index()).addClass('active').siblings().removeClass('active')
    });
    $sendlisttitle.eq(0).addClass('active')
    $sendlisttitle.click(function() {
        $sendlisttitle.removeClass('active');
        $(this).addClass('active')
    });
    $sendlisttitle.eq(0).click(function() {
        $sendlistcontext.eq(0).stop().animate({ "height": "56" })
        $sendlistcontext.eq(1).stop().animate({ "height": "0" })
        $sendlistcontext.eq(2).stop().animate({ "height": "0" })
    })
    $sendlisttitle.eq(1).click(function() {
        $sendlistcontext.eq(1).stop().animate({ "height": "140" })
        $sendlistcontext.eq(0).stop().animate({ "height": "0" })
        $sendlistcontext.eq(2).stop().animate({ "height": "0" })
    })
    $sendlisttitle.eq(2).click(function() {
        $sendlistcontext.eq(2).stop().animate({ "height": "140" })
        $sendlistcontext.eq(1).stop().animate({ "height": "0" })
        $sendlistcontext.eq(0).stop().animate({ "height": "0" })
    })

    var $remarksText = $(".remarks_text textarea")
    $remarksText.click(function(e) {
        e.stopPropagation();
        $(this).html("")
    })
    $(document).click(function(e) {
        e.stopPropagation()
        if ($remarksText.html() == "") {
            $remarksText.html("｜如果您其他备注要求请在此处填写")
        }
    })


    var name = getUrlParam("name");
    var $title = $(".title");
    _.ajax({
        url: '/ListVisaContentByNameServlet',
        type: 'get',
        dataType: 'json',
        data: { "name": name },
        success: function(data) {
            $title.find('h4').html(data[0].name)
            $title.find('i').html(data[0].price)
            $title.find('.validity').html(data[0].YXQ)
            $title.find('.stay').html(data[0].TLQ)
            $title.find('.time').html(data[0].BLSJ)
            $title.find('.invitation').html(data[0].YQH)
            $title.find('.interview').html(data[0].MS)
            $title.find('.invisa').html(data[0].RJGD)
            $title.find('b').html(data[0].SLFW)
            $title.find('img').attr("src",data[0].ImgUrl);
        }
    })
    
    $(".submit").click(function() {
    	console.log(123)
        $(this).css("backgroundColor", "#666").html("提交中")
        var $list = $(".list");
        var visaName = $title.find('h4').html();
        var price = $title.find('i').html();
        var BZXX = $(".BZXX").val();
        var SQRname = "";
        var SQRpassport = "";
        var SQRyxq = "";
        var SQRgotime = "";
        var SQRsex = "";
        var SQRbirth = "";
        var passType = "";
        var TLQ = "";
        $list.find('input[name=YWXM]').each(function() {
            var val = $(this).val();
            SQRname = SQRname + val + "|";
        });
        $list.find('input[name=HZHM]').each(function() {
            var val = $(this).val();
            SQRpassport = SQRpassport + val + "|";
        });
        $list.find('input[name=HZYXQ]').each(function() {
            var val = $(this).val();
            SQRyxq = SQRyxq + val + "|";
        });
        $list.find('input[name=CFSJ]').each(function() {
            var val = $(this).val();
            SQRgotime = SQRgotime + val + "|";
        });
        $list.find('.sex:radio:checked').each(function() {
            var val = $(this).val();
            SQRsex = SQRsex + val + "|";
        });
        $list.find('input[name=CSRQ]').each(function() {
            var val = $(this).val();
            SQRbirth = SQRbirth + val + "|";
        });
        $list.find('input[name=HZLX]').each(function() {
            var val = $(this).val();
            passType = passType + val + "|";
        });
        $list.find('input[name=TLQX]').each(function() {
            var val = $(this).val();
            TLQ = TLQ + val + "|";
        });
        var payType = $('.selecBank:radio:checked').val();
        var invoiceVal = $(".invoiceselectitle.active").children().eq(1).val();
        var invoice = "";
        if (invoiceVal) {
            invoice = invoiceVal
        } else {
            invoice = "不需要"
        }
        var YJFSval = $(".sendlisttitle.active").html()
        var YJFS = "";
        if (YJFSval == "自取签证") {
            YJFS = "自取签证";
        } else if (YJFSval == "快递邮寄") {
            YJFS = YJFSval;
            $(".KDYJ input").each(function() {
                var val = $(this).siblings('span').html() + $(this).val()
                YJFS = YJFS + "," + val
            })

        } else if (YJFSval == "市内配送(限北京市五环内)") {
            YJFS = YJFSval;
            $(".SNPS input").each(function() {
                var val = $(this).siblings('span').html() + $(this).val()
                YJFS = YJFS + "," + val
            })
        }
        var $contactplistr_input=$(".contactplistr input");
        var LXRphone = $contactplistr_input.eq(0).val();
        var LXRname = $contactplistr_input.eq(1).val();
        var LXRemail = $contactplistr_input.eq(2).val();
        var LXRtel = $contactplistr_input.eq(3).val();
      
        _.ajax({
            url: '/AddMakeVisaServlet',
            type: 'post',
            dataType: 'json',
            data: {
            	"visaName":visaName,
            	"price":price,
                "SQRname": SQRname,
                "SQRpassport": SQRpassport,
                "SQRyxq": SQRyxq,
                "SQRgotime": SQRgotime,
                "SQRsex": SQRsex,
                "SQRbirth": SQRbirth,
                "passType": passType,
                "TLQ": TLQ,
                "payType": payType,
                "invoice": invoice,
                "YJFS": YJFS,
                "LXRphone": LXRphone,
                "LXRname": LXRname,
                "LXRemail": LXRemail,
                "LXRtel": LXRtel,
                "BZXX": BZXX
            },
            success: function(data) {
                if (data == "1") {
                    alert("提交成功")
                    $(".submit").html("已提交")
                } else {
                    alert("失败")
                }
            }
        })

        $(this).unbind('click')

    })


})

function delParent(obj) { //点击删除按钮 删除父节点
    obj.parent().remove();
}

function getUrlParam(key) {
    // 获取参数
    var url = window.location.search;
    // 正则筛选地址栏
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    // 匹配目标参数
    var result = url.substr(1).match(reg);
    //返回参数值
    return result ? decodeURIComponent(result[2]) : null;
}