(()=>{
    loadSwiper({autoplay: 3000});

    var NUM_OLD = 918300; //第一个最大数
    var NUM_NEW = 918397; //最后数据
    var NUM_PERNEW = 0; //百分数初始值
    var NUM_PEROLD = 98.8; //百分数最后数据
    var NUM_MIDNEW = 5000; //初始计算值
    var NUM_MIDOLD = 5118;
    var NUM_BFB = 0;
    var NUM_YS = 0.0;
    var NUM_BFBNEW = 99;
    var timer = setInterval(function() {
        if (NUM_OLD < NUM_NEW) {
            NUM_OLD++;
            $('#big_num').text(NUM_OLD.toLocaleString());
        } else {
            NUM_OLD = NUM_NEW;                
        }

        if (NUM_PERNEW < NUM_PEROLD) {
            NUM_PERNEW += 1.1;
            $('#percentage').text(parseFloat(NUM_PERNEW).toFixed(1))
        }

        if (NUM_MIDNEW < NUM_MIDOLD) {
            NUM_MIDNEW++;
            $('#mid_num').text(NUM_MIDNEW.toLocaleString());
        }
        if (NUM_BFB < NUM_BFBNEW) {
            NUM_BFB++;
            if(parseInt(NUM_BFB)%10 == 0 && NUM_YS<=0.7){
                NUM_YS+=0.1;
            }
            $('#percentage_two').text(NUM_BFB+NUM_YS);
        }
        if(NUM_MIDNEW>=5118){
            clearInterval(timer)
        }

    }, 25);
})()
