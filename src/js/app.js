function loadSwiper (obj) {
    let _defualt = {
        box: '.swiper-container',
        loop: true,
        autoplay: 4000
    }
    if (obj) {
        _defualt = {
            box: obj.box || '.swiper-container',
            loop: obj.loop || true,
            autoplay: obj.autoplay || 4000
        }
    }

    var mySwiper = new Swiper(_defualt.box,{
        pagination: '.pagination',
        loop: _defualt.loop,
        autoplay: _defualt.autoplay,
        paginationClickable: true,
        onSlideChangeStart: function() {}
    });
}

(() => {
    if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
        window.location.href = "http://m.airkx.com";
    }

    let userID = sessionStorage.getItem("userID")
    if (userID) {
        $.ajax({
            url: '@@apispath/SendUserInfoServlet',
            type: 'post',
            dataType: 'json',
            data: {
                "userID":userID
            },
            error: function() {
                alert("网络错误，请刷新重试")
            }
        })
        .done(function(data) {
            if (location.href.indexOf('personalHomePage') > -1) {
                $('#login_info').show()
                $('#span_loginout').click(function () {
                    sessionStorage.removeItem('userID')
                    window.location.href = '@@pagepath/index.html'
                })
            } else {
                $('#login_after').show()
            }            
            $('.header_uname').text(data.UserName)
        })
    } else {
        $('#login_before').show()
    }

    //filter
    if (!Array.prototype.filter){
        Array.prototype.filter = function(fun){
            if (this === void 0 || this === null)
            throw new TypeError();

            var t = Object(this);
            var len = t.length >>> 0;
            if (typeof fun !== "function")
            throw new TypeError();

            var res = [];
            var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
            for (var i = 0; i < len; i++){
                if (i in t){
                    var val = t[i];
                    if (fun.call(thisArg, val, i, t))
                    res.push(val);
                }
            }
        return res;
    };
    }

    //map
    if (!Array.prototype.map) {
        Array.prototype.map = function(callback, thisArg) {
            var T, A, k;
            if (this == null) {
                throw new TypeError(" this is null or not defined");
            }
            var O = Object(this);
            var len = O.length >>> 0;
            if (typeof callback !== "function") {
                throw new TypeError(callback + " is not a function");
            }
            if (thisArg) {
                T = thisArg;
            }
            A = new Array(len);
            k = 0;
            while(k < len) {
                var kValue, mappedValue;
                if (k in O) {
                    kValue = O[ k ];
                    mappedValue = callback.call(T, kValue, k, O);
                    A[ k ] = mappedValue;
                }
                k++;
            }
            return A;
        };
    };
    if (!String.prototype.includes) {
        String.prototype.includes = function(search, start) {
            if (typeof start !== 'number') {
                start = 0;
            }            
            if (start + search.length > this.length) {
                return false;
            } else {
                return this.indexOf(search, start) !== -1;
            }
        }
    }
    if (!Object.assign) {
        Object.defineProperty(Object, 'assign', {
          enumerable: false,
          configurable: true,
          writable: true,
          value: function(target) {
            if (target === undefined || target === null) {
              throw new TypeError('Cannot convert first argument to object');
            }
      
            var to = Object(target);
            for (var i = 1; i < arguments.length; i++) {
              var nextSource = arguments[i];
              if (nextSource === undefined || nextSource === null) {
                continue;
              }
              nextSource = Object(nextSource);
      
              var keysArray = Object.keys(Object(nextSource));
              for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
                var nextKey = keysArray[nextIndex];
                var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                if (desc !== undefined && desc.enumerable) {
                  to[nextKey] = nextSource[nextKey];
                }
              }
            }
            return to;
          }
        });
    }
    if (!Array.prototype.includes) {
        Object.defineProperty(Array.prototype, 'includes', {
            value: function(valueToFind, fromIndex) {      
                if (this == null) {
                    throw new TypeError('"this" is null or not defined');
                }        
                // 1. Let O be ? ToObject(this value).
                var o = Object(this);        
                // 2. Let len be ? ToLength(? Get(O, "length")).
                var len = o.length >>> 0;        
                // 3. If len is 0, return false.
                if (len === 0) {
                    return false;
                }        
                // 4. Let n be ? ToInteger(fromIndex).
                //    (If fromIndex is undefined, this step produces the value 0.)
                var n = fromIndex | 0;
        
                // 5. If n ≥ 0, then
                //  a. Let k be n.
                // 6. Else n < 0,
                //  a. Let k be len + n.
                //  b. If k < 0, let k be 0.
                var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
        
                function sameValueZero(x, y) {
                    return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
                }        
                // 7. Repeat, while k < len
                while (k < len) {
                    // a. Let elementK be the result of ? Get(O, ! ToString(k)).
                    // b. If SameValueZero(valueToFind, elementK) is true, return true.
                    if (sameValueZero(o[k], valueToFind)) {
                        return true;
                    }
                    // c. Increase k by 1. 
                    k++;
                }        
                // 8. Return false
                return false;
            }
        });
    }

    if (sessionStorage && sessionStorage.getItem) {
        var _p = sessionStorage.getItem('jrzx');
        _p && $('#sp_header_phone').text(_p);
        var _img = sessionStorage.getItem('imgcode');
        _img && $('.img-code').find('img').attr('src', _img);
    }

    window.lessThenIE8 = function () {
	    var UA = navigator.userAgent,
	        isIE = UA.indexOf('MSIE') > -1,
	        v = isIE ? /\d+/.exec(UA.split(';')[1]) : 'no ie';
	    return v < 9;
    }();
	
	//小于ie9执行
	if(lessThenIE8){
        if (confirm("IE浏览器版本过低，请到指定网站去下载相关版本")) {
            window.location.href = "http://jiaoxueyun.com/download.jsp";
        } else {
            window.close();
        }
		$(window).ready(function(){thrid_codes();});
	}else{
		window.onload = thrid_codes;
	}
})()

function thrid_codes () {
    var _hmt = _hmt || [];
    (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?beb7b2efca8d11fd0c524903355d8969";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
    })();
}
