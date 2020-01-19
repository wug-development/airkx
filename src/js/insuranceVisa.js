$(function() {
    var head_menuLi = $("#head_menu li").eq(1);
    var head_bottom_ul = $(".head-bottom ul");


    head_menuLi.addClass('active-bji');
    head_bottom_ul.eq(1).addClass('active')
    head_bottom_ul.children().eq(5).addClass('active-borb').children().children().addClass('active')


    // $(".head-wrap").mouseleave(function() {
    //     head_menuLi.addClass('active-bji').siblings().removeClass('active-bji')
    //     head_bottom_ul.eq(1).addClass('active').siblings().removeClass('active')
    //     head_bottom_ul.children().eq(5).addClass('active-borb').siblings().removeClass('active-borb')
    //     head_bottom_ul.children().children().children().removeClass('active')
    //     head_bottom_ul.children().eq(5).children().children().addClass('active')
    // })




    var insdet_title = $(".insdet-title");
    var insdet_title1 = $(".insdet-title1");

    insdet_title.find("ul").find('li').click(function() {
        $(this).addClass('liactive').siblings().removeClass('liactive')
        insdet_title1.find("ul").find('li').eq($(this).index()).addClass('liactive').siblings().removeClass('liactive')
    })
    insdet_title1.find("ul").find('li').click(function() {
        $(this).addClass('liactive').siblings().removeClass('liactive')
        insdet_title.find("ul").find('li').eq($(this).index()).addClass('liactive').siblings().removeClass('liactive')
    })


    $(window).scroll(function() {
        var scrollTop = $(document).scrollTop()
        if (scrollTop > 1490) {
            insdet_title1.addClass("active")
        } else {
            insdet_title1.removeClass("active")
        }
    })

    $(window).scroll(function() {
        setTimeout(function() {
            var scrollTop = $(document).scrollTop()
            if (scrollTop < 1450) {
                insdet_title1.find("ul").find('li').eq(0).addClass('liactive').siblings().removeClass('liactive')
                insdet_title.find("ul").find('li').eq(0).addClass('liactive').siblings().removeClass('liactive')
            } else if (scrollTop > 1450 && scrollTop < 1730) {
                insdet_title1.find("ul").find('li').eq(1).addClass('liactive').siblings().removeClass('liactive')
                insdet_title.find("ul").find('li').eq(1).addClass('liactive').siblings().removeClass('liactive')
            } else if (scrollTop > 1740 && scrollTop < 2130) {
                insdet_title1.find("ul").find('li').eq(2).addClass('liactive').siblings().removeClass('liactive')
                insdet_title.find("ul").find('li').eq(2).addClass('liactive').siblings().removeClass('liactive')
            } else if (scrollTop > 2140 && scrollTop < 2550) {
                insdet_title1.find("ul").find('li').eq(3).addClass('liactive').siblings().removeClass('liactive')
                insdet_title.find("ul").find('li').eq(3).addClass('liactive').siblings().removeClass('liactive')
            } else if (scrollTop > 2690) {
                insdet_title1.find("ul").find('li').eq(4).addClass('liactive').siblings().removeClass('liactive')
                insdet_title.find("ul").find('li').eq(4).addClass('liactive').siblings().removeClass('liactive')
            }
        }, 400)

    })


    insdet_title1.find("ul").find('li').eq(0).click(function() {
        $('body,html').animate({ scrollTop: 1200 });
    })

    insdet_title1.find("ul").find('li').eq(1).click(function() {
        $('body,html').animate({ scrollTop: 1480 });
    })
    insdet_title1.find("ul").find('li').eq(2).click(function() {
        $('body,html').animate({ scrollTop: 1810 });
    })
    insdet_title1.find("ul").find('li').eq(3).click(function() {
        $('body,html').animate({ scrollTop: 2290 });
    })
    insdet_title1.find("ul").find('li').eq(4).click(function() {
        $('body,html').animate({ scrollTop: 2700 });
    })

    insdet_title.find("ul").find('li').eq(0).click(function() {
        $('body,html').animate({ scrollTop: 1200 });
    })

    insdet_title.find("ul").find('li').eq(1).click(function() {
        $('body,html').animate({ scrollTop: 1480 });
    })
    insdet_title.find("ul").find('li').eq(2).click(function() {
        $('body,html').animate({ scrollTop: 1810 });
    })
    insdet_title.find("ul").find('li').eq(3).click(function() {
        $('body,html').animate({ scrollTop: 2290 });
    })
    insdet_title.find("ul").find('li').eq(4).click(function() {
        $('body,html').animate({ scrollTop: 2700 });
    })
})