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