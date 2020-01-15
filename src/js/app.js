function loadSwiper (obj) {
    let _defualt = {
        box: '.swiper-container',
        loop: true,
        autoplay: 4000
    }
    Object.assign(_defualt, obj)
    var mySwiper = new Swiper(_defualt.box,{
        pagination: '.pagination',
        loop: _defualt.loop,
        autoplay: _defualt.autoplay,
        paginationClickable: true,
        onSlideChangeStart: function() {}
    });
}

// var _hmt = _hmt || [];
// (function() {
//     var hm = document.createElement("script");
//     hm.src = "https://hm.baidu.com/hm.js?beb7b2efca8d11fd0c524903355d8969";
//     var s = document.getElementsByTagName("script")[0];
//     s.parentNode.insertBefore(hm, s);
// })();