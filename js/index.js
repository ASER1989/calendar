/**
 * Created by Lenovo on 2017/11/28.
 */

    //全局的年月日，适用于任何时候获取今天的年月日。（很重要）
var sev_m, sev_y, sev_d, active = 3, sev_week, sev_topyue;
var mySwiper = new Swiper('.swiper-container', {
    initialSlide: 1,
    loop: true,
    speed: 400,

    followFinger: false,
    prevButton: '.js_prev',
    nextButton: '.js_next',
    onSlideChangeStart: function (swiper) {
        //swiper.params.allowSwipeToPrev = false;
        swiper.lockSwipes();

    },

    onSlideChangeEnd: function (swiper) {

        var nows = $(".swiper-slide-active").find("table").attr("id");
        if (nows == 'now2')
            return;
        nows = parseInt(nows.substr(1, 1));
        //console.log(active,nows);
        if (nows == active)
            return;
        if (active == 4 && nows == 5) {
            var fors = 1;

            sev_m++;
            if (sev_m > 12) {
                sev_m = 1;
                sev_y++;
            }
            var nowweak = new Date(sev_y, sev_m - 1, 1).getDay();
            get_first(nowweak, sev_y, sev_m, 0, "d2");

            var lastm = sev_m - 1;
            var lasty = sev_y;
            if (lastm < 1) {
                lastm = 12;
                lasty--;
            }

            var nm = sev_m + 1;
            var ny = sev_y;
            if (nm > 12) {
                nm = 1;
                ny++;
            }
            var nowweak = new Date(ny, nm - 1, 1).getDay();
            var lastweek = new Date(lasty, lastm - 1, 1).getDay();
            get_first(lastweek, lasty, lastm, 0, "d" + fors);
            get_first(nowweak, ny, nm, 0, "d3");
            $("#appDate").val(sev_y + "年" + sev_m + "月");
            active = 5;
        } else if (active == 2 && nows == 1) {
            var fors = 5;

            var nextweak = new Date(sev_y, sev_m - 1, 1).getDay();
            get_first(nextweak, sev_y, sev_m, 0, "d" + fors);
            sev_m--;
            if (sev_m < 1) {
                sev_m = 12;
                sev_y--;
            }
            var nowweak = new Date(sev_y, sev_m - 1, 1).getDay();
            get_first(nowweak, sev_y, sev_m, 0, "d4");

            var nm = sev_m - 1;
            var ny = sev_y;
            if (nm < 1) {
                nm = 12;
                ny--;
            }
            var nowweak = new Date(ny, nm - 1, 1).getDay();
            //get_first(nowweak, ny, nm, 0, "d4");
            get_first(nowweak, ny, nm, 0, "d3");
            $("#appDate").val(sev_y + "年" + sev_m + "月");
            active = 1;
        } else if (active == 5 && nows == 3) {
            var fors = 4;

            var lastm = sev_m;
            var lasty = sev_y;

            sev_m++;
            if (sev_m > 12) {
                sev_m = 1;
                sev_y++;
            }

            var nm = sev_m + 1;
            var ny = sev_y;
            if (nm > 12) {
                nm = 1;
                ny++;
            }
            var nowweak = new Date(ny, nm - 1, 1).getDay();
            get_first(nowweak, ny, nm, 0, "d" + fors);
            var nowweak = new Date(lasty, lastm - 1, 1).getDay();
            get_first(nowweak, lasty, lastm, 0, "d2");
            $("#appDate").val(sev_y + "年" + sev_m + "月");
            active = 3;
        } else if (active == 1 && nows == 3) {
            var fors = 2;

            var lastm = sev_m;
            var lasty = sev_y;

            sev_m--;
            if (sev_m < 1) {
                sev_m = 12;
                sev_y--;
            }

            var nm = sev_m - 1;
            var ny = sev_y;
            if (nm < 1) {
                nm = 12;
                ny--;
            }
            var nowweak = new Date(ny, nm - 1, 1).getDay();
            get_first(nowweak, ny, nm, 0, "d" + fors);
            var nowweak = new Date(lasty, lastm - 1, 1).getDay();
            get_first(nowweak, lasty, lastm, 0, "d4");
            $("#appDate").val(sev_y + "年" + sev_m + "月");
            active = 3;
        } else if (active == 1 && nows == 5) {
            var fors = 3;

            var lastm = sev_m;
            var lasty = sev_y;

            sev_m++;
            if (sev_m > 12) {
                sev_m = 1;
                sev_y++;
            }

            var nm = sev_m + 1;
            var ny = sev_y;
            if (nm > 12) {
                nm = 1;
                ny++;
            }
            var nowweak = new Date(ny, nm - 1, 1).getDay();
            get_first(nowweak, ny, nm, 0, "d" + fors);
            $("#appDate").val(sev_y + "年" + sev_m + "月");
            active = 5;
        } else if (active == 5 && nows == 1) {
            var fors = 3;


            sev_m--;
            if (sev_m < 1) {
                sev_m = 12;
                sev_y--;
            }
            var lastm = sev_m;
            var lasty = sev_y;

            var nm = sev_m - 1;
            var ny = sev_y;
            if (nm < 1) {
                nm = 12;
                ny--;
            }
            var nowweak = new Date(ny, nm - 1, 1).getDay();
            var lastweak = new Date(lasty, sev_m - 1, 1).getDay();
            get_first(nowweak, ny, nm, 0, "d" + fors);
            console.log(lasty, lastm)
            get_first(lastweak, lasty, sev_m, 0, "d4");
            $("#appDate").val(sev_y + "年" + sev_m + "月");
            active = 1;
        } else if (active > nows) {
            var fors = nows - 1;
            if (fors < 1)
                fors = 5;

            sev_m--;
            if (sev_m < 1) {
                sev_m = 12;
                sev_y--;
            }

            var nm = sev_m - 1;
            var ny = sev_y;
            if (nm < 1) {
                nm = 12;
                ny--;
            }
            var nowweak = new Date(ny, nm - 1, 1).getDay();
            get_first(nowweak, ny, nm, 0, "d" + fors);
            $("#appDate").val(sev_y + "年" + sev_m + "月");
            active = nows;
        } else if (active < nows) {
            var fors = nows + 1;
            if (fors > 5)
                fors = 1;

            sev_m++;
            if (sev_m > 12) {
                sev_m = 1;
                sev_y++;
            }

            var nm = sev_m + 1;
            var ny = sev_y;
            if (nm > 12) {
                nm = 1;
                ny++;
            }
            var nowweak = new Date(ny, nm - 1, 1).getDay();
            get_first(nowweak, ny, nm, 0, "d" + fors);
            $("#appDate").val(sev_y + "年" + sev_m + "月");
            active = nows;
        }
        $("#appDateText").html($("#appDate").val());
        var trLength = $("#d" + nows).find("tr").length;
        if (trLength == 6) {
            $(".swiper-container").css("paddingBottom", ".45rem");
        } else {
            $(".swiper-container").css("paddingBottom", "");

        }
        swiper.unlockSwipes();
    }

});

var yl = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
window.onload = function () {
    $("#now3").attr("id", "d1");
    $("#now1").attr("id", "d2");
    $("#now2").attr("id", "d3");
    $("#now3").attr("id", "d4");
    $("#now1").attr("id", "d5");
    var globledate = new Date();
    var y = globledate.getFullYear();
    var m = globledate.getMonth() + 1;
    var d = globledate.getDate();
    sev_m = m;
    sev_y = y;
    sev_d = d;
    var nowweak = new Date(y, m - 1, 1).getDay();
    if (nowweak == 7) nowweak = 0;
    get_first(nowweak, y, m, d, "d3");
    set_top(0);

    m = m + 1;
    if (m > 12) {
        m = 1;
        y += 1;
    }
    nowweak = new Date(y, m - 1, 1).getDay();
    get_first(nowweak, y, m, 0, "d4");

    m = sev_m - 1;
    if (m < 1) {
        m = 12;
        y = sev_y - 1;
    }
    nowweak = new Date(y, m - 1, 1).getDay();
    get_first(nowweak, y, m, 0, "d2");
    $("#appDate").val(sev_y + "年" + sev_m + "月");
    $("#appDateText").html($("#appDate").val());

    $(".js_jin").click(function () {
        active = 3;
        var globledate = new Date();
        var y = globledate.getFullYear();
        var m = globledate.getMonth() + 1;
        var d = globledate.getDate();
        sev_m = m;
        sev_y = y;
        sev_d = d;
        var nowweak = new Date(y, m - 1, 1).getDay();
        if (nowweak == 7) nowweak = 0;
        get_first(nowweak, y, m, d, "d3");
        set_top(0);

        m = m + 1;
        if (m > 12) {
            m = 1;
            y += 1;
        }
        nowweak = new Date(y, m - 1, 1).getDay();
        get_first(nowweak, y, m, 0, "d4");

        m = sev_m - 1;
        if (m < 1) {
            m = 12;
            y = sev_y - 1;
        }
        nowweak = new Date(y, m - 1, 1).getDay();
        get_first(nowweak, y, m, 0, "d2");
        $("#appDate").val(sev_y + "年" + sev_m + "月");
        $("#appDateText").html($("#appDate").val());
        mySwiper.slideTo(2, 500, false);
    });
    mySwiper.unlockSwipes();
};

function jump(yyyy, mm, dd) {
    sev_y = parseInt(yyyy);
    sev_m = parseInt(mm);
    sev_d = parseInt(dd);

    active = 3;
    var globledate = new Date(yyyy, parseInt(mm) - 1, parseInt(dd));
    //var nowweak = globledate.getDay();
    var y = globledate.getFullYear();
    var m = globledate.getMonth() + 1;
    var d = globledate.getDate();
    //console.log("globledate:",y,m,d);

    var sev_m_tmp = m;
    var sev_y_tmp = y;
    var sev_d_tmp = d;
    var nowweak = new Date(y, m - 1, 1).getDay();
    if (nowweak == 7) nowweak = 0;
    get_first(nowweak, y, m, d, "d3");

    m = m + 1;
    if (m > 12) {
        m = 1;
        y += 1;
    }
    nowweak = new Date(y, m - 1, 1).getDay();
    get_first(nowweak, y, m, 0, "d4");

    m = sev_m - 1;
    if (m < 1) {
        m = 12;
        y = sev_y - 1;
    }
    nowweak = new Date(y, m - 1, 1).getDay();
    get_first(nowweak, y, m, 0, "d2");
    $("#appDate").val(sev_y + "年" + sev_m + "月");
    $("#appDateText").html($("#appDate").val());
    $(".covers").hide();
    mySwiper.slideTo(2, 500, false);
    click_sev();

}

function click_sev() {
    $("#d3").find("td").each(function () {
        if ($(this).attr("data_y") == sev_y && $(this).attr("data_m") == sev_m && $(this).attr("data_d") == sev_d) {
            $(this).click();
        }
    });
}

function get_first(a, b, c, d, e) {
    var str = '<tr>';
    if ((c - 2) < 0) {
        var ldays = 31;
        var lm = 12;
        var lb = b - 1;
    } else {
        var ldays = yl[c - 2];
        var lm = c - 1;
        var lb = b;
    }

    if (c == 12) {
        var xdays = 31;
        var xm = 1;
        var xb = b + 1;
    } else {
        var xdays = yl[c];
        var xm = c + 1;
        var xb = b;
    }

    if (ldays == 28) {
        if ((lb % 4 == 0 && lb % 100 != 0) || (lb % 100 == 0 && lb % 400 == 0)) {
            ldays = 29;
        }
    }

    if (xdays == 28) {
        if ((xb % 4 == 0 && xb % 100 != 0) || (xb % 100 == 0 && xb % 400 == 0)) {
            xdays = 29;
        }
    }
    var dd;
    if (yl[c - 1] == 28) {
        if ((b % 4 == 0 && b % 100 != 0) || (b % 100 == 0 && b % 400 == 0)) {
            dd = 29;
        } else {
            dd = 28;
        }
    } else {
        dd = yl[c - 1];
    }

    var num = 1;

    for (var i = a; i > 0; i--) {
        var bday = ldays - i + 1;
        var lyjosn = calendar.solar2lunar(lb, lm, bday);
        var ly = lyjosn.IDayCn;
        var jq = lyjosn.Term;
        var gjq = getgjq(lb, lm, bday)
        if (gjq) {
            jq = gjq;
        }
        if (jq) {
            //ly = '<font color="#00b7ec">' + jq;
            ly = '<font color="#fff">' + jq;
        }
        var ldd = lyjosn.isLestDay ? 0 : lyjosn.lDay;
        var ljq = getljq(lyjosn.lYear, lyjosn.lMonth, ldd);
        if (ljq) {
            //ly = '<font color="#00b7ec">' + ljq;
            ly = '<font color="#fff">' + ljq;
        }
        var jqcs = "";//getjqcss(lb, lm, bday)
        var jd = "";
        var hb = lb + "-" + lm + "-" + bday;
        str += ' <td data_y="' + lb + '" data_m="' + lm + '" data_d="' + bday + '" class="list ' + jqcs + ' not_this js_up"><i s>' + bday + '</i><em>' + ly + '</em>' + jd + '</td>';
        if (num % 7 == 0) {
            str += '</tr><tr>';
        }
        num++;
    }

    for (var i = 1; i <= dd; i++) {
        var bday = ldays - i + 1;
        var lyjosn = calendar.solar2lunar(b, c, i);
        var ly = lyjosn.IDayCn;
        var jq = lyjosn.Term;
        var gjq = getgjq(b, c, i)
        if (gjq) {
            jq = gjq;
        }
        if (jq) {
            ly = '<font color="#00b7ec">' + jq;
        }
        var ldd = lyjosn.isLestDay ? 0 : lyjosn.lDay;
        var ljq = getljq(lyjosn.lYear, lyjosn.lMonth, ldd);
        if (ljq) {
            ly = '<font color="#00b7ec">' + ljq;
        }
        var jqcs = getjqcss(b, c, i)

        var jd = "";
        var hb = b + "-" + c + "-" + i;
        if (new Date().getDate() == i && b == new Date().getFullYear() && c == (new Date().getMonth() + 1)) {
            str += ' <td data_y="' + b + '" data_m="' + c + '" data_d="' + i + '" class="list ' + jqcs + ' xuanzhong"><i>' + i + '</i><em>' + ly + '</em>' + jd + '</td>';
        } else {
            str += ' <td data_y="' + b + '" data_m="' + c + '" data_d="' + i + '" class="list ' + jqcs + '"><i>' + i + '</i><em>' + ly + '</em>' + jd + '</td>';
        }

        if (num % 7 == 0) {
            str += '</tr><tr>';
        }
        num++;
    }

    var last = 42 - a - dd;
    if (last <= 6) {

        for (var i = 1; i <= last; i++) {
            var lyjosn = calendar.solar2lunar(xb, xm, i);
            var ly = lyjosn.IDayCn;
            var jq = lyjosn.Term;
            var gjq = getgjq(xb, xm, i)
            if (gjq) {
                jq = gjq;
            }
            if (jq) {
                //ly = '<font color="#00b7ec">' + jq;
                ly = '<font color="#FFF">' + jq;
            }
            var ldd = lyjosn.isLestDay ? 0 : lyjosn.lDay;
            var ljq = getljq(lyjosn.lYear, lyjosn.lMonth, ldd);
            if (ljq) {
                // ly = '<font color="#00b7ec">' + ljq;
                ly = '<font color="#FFF">' + ljq;
            }
            var jqcs = "";//getjqcss(xb, xm, i)
            var jd = "";
            var hb = xb + "-" + xm + "-" + i;
            str += ' <td data_y="' + xb + '" data_m="' + xm + '" data_d="' + i + '" class="list ' + jqcs + ' not_this js_down"><i>' + i + '</i><em>' + ly + '</em>' + jd + '</td>';
            if (num % 7 == 0) {
                str += '</tr><tr>';
            }
            num++;
        }
    }
    if (str.substring(str.length - 4, str.length) == "<tr>") {
        str = str.substring(0, str.length - 4);
    }
    //var regex = new RegExp("</tr>", 'g'); // 使用g表示整个字符串都要匹配
    //var result = str.match(regex);
    //var count = !result ? 0 : result.length;
    //if (count < 6) {
    //    str += '<tr>'
    //    str += '<td></td><td></td><td></td>'
    //    str += '<td></td><td></td><td></td><td></td>'
    //    str += '</tr>'
    //}
    document.getElementById(e).innerHTML = str;
    bind_click(e);
}

function bind_click(a) {
    $("#" + a).find("td").unbind("click");
    $("#" + a).find("td").each(function () {
        if ($(this).hasClass('not_this')) {
            $(this).click(function () {
                return;
                jump($(this).attr('data_y'), $(this).attr('data_m'), $(this).attr('data_d'));
            });
        } else {
            $(this).click(function () {
                set_top($(this));
                console.log(1)
            });
        }
        touch.on($(this), 'hold', $(this), function (e) {
            var el = $(this).is("td") ? $(this) : $(this).parents('td');

            var y = el.attr('data_y');
            var m = el.attr("data_m");
            var d = el.attr("data_d");
            console.log(" %c " + y + "-" + m + "-" + d, "color:red")
        })


    });
}


function set_top(a) {
    if (!a) {
        var weeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
        var data = new Date();
        // console.log(data.getDay())
        var weekk = weeks[data.getDay()];
        var ms = data.getMonth();
        var ljson = calendar.solar2lunar(data.getFullYear(), ms + 1, data.getDate())
        var yue = ljson.IMonthCn + ljson.IDayCn;
        var shu = data.getDate();
        document.getElementById("top_shu").innerHTML = shu;
        sev_d = parseInt(shu);
        document.getElementById("top_week").innerHTML = weekk;
        document.getElementById("top_yue").innerHTML = yue;
        sev_week = weekk;
        sev_topyue = yue;
    } else {
        var weeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
        var y = a.attr("data_y");
        var m = parseInt(a.attr("data_m")) - 1;
        if (m < 0) m = 11;
        var d = parseInt(a.attr("data_d"));
        var weekk = weeks[new Date(y, m, d).getDay()];
        var ms = parseInt(a.attr("data_m"));
        var ljson = calendar.solar2lunar(y, ms, d)
        var yue = ljson.IMonthCn + ljson.IDayCn;
        ;
        document.getElementById("top_shu").innerHTML = d;
        sev_d = parseInt(d);
        document.getElementById("top_week").innerHTML = weekk;
        document.getElementById("top_yue").innerHTML = yue;
        sev_week = weekk;
        sev_topyue = yue;

        $(".xuanzhong").removeClass('xuanzhong');
        a.addClass("xuanzhong");
    }
}

//	        var LunarDate = {
//	            /**
//* @1900-2100区间内的公历、农历互转
//* @charset UTF-8
//* @Author  Jea杨(JJonline@JJonline.Cn)
//* @Time    2014-7-21
//* @Time    2016-8-13 Fixed 2033hex、Attribution Annals
//* @Time    2016-9-25 Fixed lunar LeapMonth Param Bug
//* @Version 1.0.2
//* @公历转农历：calendar.solar2lunar(1987,11,01); //[you can ignore params of prefix 0]
//* @农历转公历：calendar.lunar2solar(1987,09,10); //[you can ignore params of prefix 0]
//*/
var calendar = {

    /**
     * 农历1900-2100的润大小信息表
     * @Array Of Property
     * @return Hex
     */
    lunarInfo: [0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2,//1900-1909
        0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977,//1910-1919
        0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970,//1920-1929
        0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,//1930-1939
        0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557,//1940-1949
        0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0,//1950-1959
        0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0,//1960-1969
        0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6,//1970-1979
        0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570,//1980-1989
        0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0,//1990-1999
        0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5,//2000-2009
        0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930,//2010-2019
        0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530,//2020-2029
        0x05aa0, 0x076a3, 0x096d0, 0x04afb, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45,//2030-2039
        0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0,//2040-2049
        /**Add By JJonline@JJonline.Cn**/
        0x14b63, 0x09370, 0x049f8, 0x04970, 0x064b0, 0x168a6, 0x0ea50, 0x06b20, 0x1a6c4, 0x0aae0,//2050-2059
        0x0a2e0, 0x0d2e3, 0x0c960, 0x0d557, 0x0d4a0, 0x0da50, 0x05d55, 0x056a0, 0x0a6d0, 0x055d4,//2060-2069
        0x052d0, 0x0a9b8, 0x0a950, 0x0b4a0, 0x0b6a6, 0x0ad50, 0x055a0, 0x0aba4, 0x0a5b0, 0x052b0,//2070-2079
        0x0b273, 0x06930, 0x07337, 0x06aa0, 0x0ad50, 0x14b55, 0x04b60, 0x0a570, 0x054e4, 0x0d160,//2080-2089
        0x0e968, 0x0d520, 0x0daa0, 0x16aa6, 0x056d0, 0x04ae0, 0x0a9d4, 0x0a2d0, 0x0d150, 0x0f252,//2090-2099
        0x0d520],//2100

    /**
     * 公历每个月份的天数普通表
     * @Array Of Property
     * @return Number
     */
    solarMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],

    /**
     * 天干地支之天干速查表
     * @Array Of Property trans["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"]
     * @return Cn string
     */
    Gan: ["\u7532", "\u4e59", "\u4e19", "\u4e01", "\u620a", "\u5df1", "\u5e9a", "\u8f9b", "\u58ec", "\u7678"],

    /**
     * 天干地支之地支速查表
     * @Array Of Property
     * @trans["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"]
     * @return Cn string
     */
    Zhi: ["\u5b50", "\u4e11", "\u5bc5", "\u536f", "\u8fb0", "\u5df3", "\u5348", "\u672a", "\u7533", "\u9149", "\u620c", "\u4ea5"],

    /**
     * 天干地支之地支速查表<=>生肖
     * @Array Of Property
     * @trans["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"]
     * @return Cn string
     */
    Animals: ["\u9f20", "\u725b", "\u864e", "\u5154", "\u9f99", "\u86c7", "\u9a6c", "\u7f8a", "\u7334", "\u9e21", "\u72d7", "\u732a"],

    /**
     * 24节气速查表
     * @Array Of Property
     * @trans["小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至"]
     * @return Cn string
     */
    solarTerm: ["\u5c0f\u5bd2", "\u5927\u5bd2", "\u7acb\u6625", "\u96e8\u6c34", "\u60ca\u86f0", "\u6625\u5206", "\u6e05\u660e", "\u8c37\u96e8", "\u7acb\u590f", "\u5c0f\u6ee1", "\u8292\u79cd", "\u590f\u81f3", "\u5c0f\u6691", "\u5927\u6691", "\u7acb\u79cb", "\u5904\u6691", "\u767d\u9732", "\u79cb\u5206", "\u5bd2\u9732", "\u971c\u964d", "\u7acb\u51ac", "\u5c0f\u96ea", "\u5927\u96ea", "\u51ac\u81f3"],

    /**
     * 1900-2100各年的24节气日期速查表
     * @Array Of Property
     * @return 0x string For splice
     */
    sTermInfo: ['9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c3598082c95f8c965cc920f',
        '97bd0b06bdb0722c965ce1cfcc920f', 'b027097bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
        '97bcf97c359801ec95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f', 'b027097bd097c36b0b6fc9274c91aa',
        '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f',
        'b027097bd097c36b0b6fc9274c91aa', '9778397bd19801ec9210c965cc920e', '97b6b97bd19801ec95f8c965cc920f',
        '97bd09801d98082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2', '9778397bd197c36c9210c9274c91aa',
        '97b6b97bd19801ec95f8c965cc920e', '97bd09801d98082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2',
        '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec95f8c965cc920e', '97bcf97c3598082c95f8e1cfcc920f',
        '97bd097bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec9210c965cc920e',
        '97bcf97c3598082c95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
        '97b6b97bd19801ec9210c965cc920e', '97bcf97c3598082c95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722',
        '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f',
        '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
        '97bcf97c359801ec95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
        '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd097bd07f595b0b6fc920fb0722',
        '9778397bd097c36b0b6fc9210c8dc2', '9778397bd19801ec9210c9274c920e', '97b6b97bd19801ec95f8c965cc920f',
        '97bd07f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c920e',
        '97b6b97bd19801ec95f8c965cc920f', '97bd07f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2',
        '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bd07f1487f595b0b0bc920fb0722',
        '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
        '97bcf7f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
        '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722',
        '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f531b0b0bb0b6fb0722',
        '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
        '97bcf7f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
        '97b6b97bd19801ec9210c9274c920e', '97bcf7f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722',
        '9778397bd097c36b0b6fc9210c91aa', '97b6b97bd197c36c9210c9274c920e', '97bcf7f0e47f531b0b0bb0b6fb0722',
        '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c920e',
        '97b6b7f0e47f531b0723b0b6fb0722', '7f0e37f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2',
        '9778397bd097c36b0b70c9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e37f1487f595b0b0bb0b6fb0722',
        '7f0e397bd097c35b0b6fc9210c8dc2', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721',
        '7f0e27f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
        '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722',
        '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722',
        '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721',
        '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
        '97b6b7f0e47f531b0723b0787b0721', '7f0e27f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722',
        '9778397bd097c36b0b6fc9210c91aa', '97b6b7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722',
        '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c8dc2', '977837f0e37f149b0723b0787b0721',
        '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f5307f595b0b0bc920fb0722', '7f0e397bd097c35b0b6fc9210c8dc2',
        '977837f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e37f1487f595b0b0bb0b6fb0722',
        '7f0e397bd097c35b0b6fc9210c8dc2', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
        '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '977837f0e37f14998082b0787b06bd',
        '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722',
        '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722',
        '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
        '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14998082b0787b06bd',
        '7f07e7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722',
        '977837f0e37f14998082b0723b06bd', '7f07e7f0e37f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722',
        '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b0721',
        '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f1487f595b0b0bb0b6fb0722', '7f0e37f0e37f14898082b0723b02d5',
        '7ec967f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f1487f531b0b0bb0b6fb0722',
        '7f0e37f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
        '7f0e37f1487f531b0b0bb0b6fb0722', '7f0e37f0e37f14898082b072297c35', '7ec967f0e37f14998082b0787b06bd',
        '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e37f0e37f14898082b072297c35',
        '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722',
        '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f149b0723b0787b0721',
        '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14998082b0723b06bd',
        '7f07e7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722', '7f0e37f0e366aa89801eb072297c35',
        '7ec967f0e37f14998082b0723b06bd', '7f07e7f0e37f14998083b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722',
        '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14898082b0723b02d5', '7f07e7f0e37f14998082b0787b0721',
        '7f07e7f0e47f531b0723b0b6fb0722', '7f0e36665b66aa89801e9808297c35', '665f67f0e37f14898082b0723b02d5',
        '7ec967f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e36665b66a449801e9808297c35',
        '665f67f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
        '7f0e36665b66a449801e9808297c35', '665f67f0e37f14898082b072297c35', '7ec967f0e37f14998082b0787b06bd',
        '7f07e7f0e47f531b0723b0b6fb0721', '7f0e26665b66a449801e9808297c35', '665f67f0e37f1489801eb072297c35',
        '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722'],

    /**
     * 数字转中文速查表
     * @Array Of Property
     * @trans ['日','一','二','三','四','五','六','七','八','九','十']
     * @return Cn string
     */
    nStr1: ["\u65e5", "\u4e00", "\u4e8c", "\u4e09", "\u56db", "\u4e94", "\u516d", "\u4e03", "\u516b", "\u4e5d", "\u5341"],

    /**
     * 日期转农历称呼速查表
     * @Array Of Property
     * @trans ['初','十','廿','卅']
     * @return Cn string
     */
    nStr2: ["\u521d", "\u5341", "\u5eff", "\u5345"],

    /**
     * 月份转农历称呼速查表
     * @Array Of Property
     * @trans ['正','一','二','三','四','五','六','七','八','九','十','冬','腊']
     * @return Cn string
     */
    nStr3: ["\u6b63", "\u4e8c", "\u4e09", "\u56db", "\u4e94", "\u516d", "\u4e03", "\u516b", "\u4e5d", "\u5341", "\u51ac", "\u814a"],

    /**
     * 返回农历y年一整年的总天数
     * @param lunar Year
     * @return Number
     * @eg:var count = calendar.lYearDays(1987) ;//count=387
     */
    lYearDays: function (y) {
        var i, sum = 348;
        for (i = 0x8000; i > 0x8; i >>= 1) {
            sum += (calendar.lunarInfo[y - 1900] & i) ? 1 : 0;
        }
        return (sum + calendar.leapDays(y));
    },

    /**
     * 返回农历y年闰月是哪个月；若y年没有闰月 则返回0
     * @param lunar Year
     * @return Number (0-12)
     * @eg:var leapMonth = calendar.leapMonth(1987) ;//leapMonth=6
     */
    leapMonth: function (y) { //闰字编码 \u95f0
        return (calendar.lunarInfo[y - 1900] & 0xf);
    },

    /**
     * 返回农历y年闰月的天数 若该年没有闰月则返回0
     * @param lunar Year
     * @return Number (0、29、30)
     * @eg:var leapMonthDay = calendar.leapDays(1987) ;//leapMonthDay=29
     */
    leapDays: function (y) {
        if (calendar.leapMonth(y)) {
            return ((calendar.lunarInfo[y - 1900] & 0x10000) ? 30 : 29);
        }
        return (0);
    },

    /**
     * 返回农历y年m月（非闰月）的总天数，计算m为闰月时的天数请使用leapDays方法
     * @param lunar Year
     * @return Number (-1、29、30)
     * @eg:var MonthDay = calendar.monthDays(1987,9) ;//MonthDay=29
     */
    monthDays: function (y, m) {
        if (m > 12 || m < 1) {
            return -1
        }//月份参数从1至12，参数错误返回-1
        return ( (calendar.lunarInfo[y - 1900] & (0x10000 >> m)) ? 30 : 29 );
    },

    /**
     * 返回公历(!)y年m月的天数
     * @param solar Year
     * @return Number (-1、28、29、30、31)
     * @eg:var solarMonthDay = calendar.leapDays(1987) ;//solarMonthDay=30
     */
    solarDays: function (y, m) {
        if (m > 12 || m < 1) {
            return -1
        } //若参数错误 返回-1
        var ms = m - 1;
        if (ms == 1) { //2月份的闰平规律测算后确认返回28或29
            return (((y % 4 == 0) && (y % 100 != 0) || (y % 400 == 0)) ? 29 : 28);
        } else {
            return (calendar.solarMonth[ms]);
        }
    },

    /**
     * 农历年份转换为干支纪年
     * @param  lYear 农历年的年份数
     * @return Cn string
     */
    toGanZhiYear: function (lYear) {
        var ganKey = (lYear - 3) % 10;
        var zhiKey = (lYear - 3) % 12;
        if (ganKey == 0) ganKey = 10;//如果余数为0则为最后一个天干
        if (zhiKey == 0) zhiKey = 12;//如果余数为0则为最后一个地支
        return calendar.Gan[ganKey - 1] + calendar.Zhi[zhiKey - 1];

    },

    /**
     * 公历月、日判断所属星座
     * @param  cMonth [description]
     * @param  cDay [description]
     * @return Cn string
     */
    toAstro: function (cMonth, cDay) {
        var s = "\u9b54\u7faf\u6c34\u74f6\u53cc\u9c7c\u767d\u7f8a\u91d1\u725b\u53cc\u5b50\u5de8\u87f9\u72ee\u5b50\u5904\u5973\u5929\u79e4\u5929\u874e\u5c04\u624b\u9b54\u7faf";
        var arr = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22];
        return s.substr(cMonth * 2 - (cDay < arr[cMonth - 1] ? 2 : 0), 2) + "\u5ea7";//座
    },

    /**
     * 传入offset偏移量返回干支
     * @param offset 相对甲子的偏移量
     * @return Cn string
     */
    toGanZhi: function (offset) {
        return calendar.Gan[offset % 10] + calendar.Zhi[offset % 12];
    },

    /**
     * 传入公历(!)y年获得该年第n个节气的公历日期
     * @param y公历年(1900-2100)；n二十四节气中的第几个节气(1~24)；从n=1(小寒)算起
     * @return day Number
     * @eg:var _24 = calendar.getTerm(1987,3) ;//_24=4;意即1987年2月4日立春
     */
    getTerm: function (y, n) {
        if (y < 1900 || y > 2100) {
            return -1;
        }
        if (n < 1 || n > 24) {
            return -1;
        }
        var _table = calendar.sTermInfo[y - 1900];
        var _info = [
            parseInt('0x' + _table.substr(0, 5)).toString(),
            parseInt('0x' + _table.substr(5, 5)).toString(),
            parseInt('0x' + _table.substr(10, 5)).toString(),
            parseInt('0x' + _table.substr(15, 5)).toString(),
            parseInt('0x' + _table.substr(20, 5)).toString(),
            parseInt('0x' + _table.substr(25, 5)).toString()
        ];
        var _calday = [
            _info[0].substr(0, 1),
            _info[0].substr(1, 2),
            _info[0].substr(3, 1),
            _info[0].substr(4, 2),

            _info[1].substr(0, 1),
            _info[1].substr(1, 2),
            _info[1].substr(3, 1),
            _info[1].substr(4, 2),

            _info[2].substr(0, 1),
            _info[2].substr(1, 2),
            _info[2].substr(3, 1),
            _info[2].substr(4, 2),

            _info[3].substr(0, 1),
            _info[3].substr(1, 2),
            _info[3].substr(3, 1),
            _info[3].substr(4, 2),

            _info[4].substr(0, 1),
            _info[4].substr(1, 2),
            _info[4].substr(3, 1),
            _info[4].substr(4, 2),

            _info[5].substr(0, 1),
            _info[5].substr(1, 2),
            _info[5].substr(3, 1),
            _info[5].substr(4, 2),
        ];
        return parseInt(_calday[n - 1]);
    },

    /**
     * 传入农历数字月份返回汉语通俗表示法
     * @param lunar month
     * @return Cn string
     * @eg:var cnMonth = calendar.toChinaMonth(12) ;//cnMonth='腊月'
     */
    toChinaMonth: function (m) { // 月 => \u6708
        if (m > 12 || m < 1) {
            return -1
        } //若参数错误 返回-1
        var s = calendar.nStr3[m - 1];
        s += "\u6708";//加上月字
        return s;
    },

    /**
     * 传入农历日期数字返回汉字表示法
     * @param lunar day
     * @return Cn string
     * @eg:var cnDay = calendar.toChinaDay(21) ;//cnMonth='廿一'
     */
    toChinaDay: function (d) { //日 => \u65e5
        var s;
        switch (d) {
            case 10:
                s = '\u521d\u5341';
                break;
            case 20:
                s = '\u4e8c\u5341';
                break;
                break;
            case 30:
                s = '\u4e09\u5341';
                break;
                break;
            default :
                s = calendar.nStr2[Math.floor(d / 10)];
                s += calendar.nStr1[d % 10];
        }
        return (s);
    },

    /**
     * 年份转生肖[!仅能大致转换] => 精确划分生肖分界线是“立春”
     * @param y year
     * @return Cn string
     * @eg:var animal = calendar.getAnimal(1987) ;//animal='兔'
     */
    getAnimal: function (y) {
        return calendar.Animals[(y - 4) % 12]
    },

    /**
     * 传入阳历年月日获得详细的公历、农历object信息 <=>JSON
     * @param y  solar year
     * @param m  solar month
     * @param d  solar day
     * @return JSON object
     * @eg:console.log(calendar.solar2lunar(1987,11,01));
     */
    solar2lunar: function (y, m, d) { //参数区间1900.1.31~2100.12.31
        if (y < 1900 || y > 2100) {
            return -1;
        }//年份限定、上限
        if (y == 1900 && m == 1 && d < 31) {
            return -1;
        }//下限
        if (!y) { //未传参  获得当天
            var objDate = new Date();
        } else {
            var objDate = new Date(y, parseInt(m) - 1, d)
        }
        var i, leap = 0, temp = 0;
        //修正ymd参数
        var y = objDate.getFullYear(), m = objDate.getMonth() + 1, d = objDate.getDate();
        var offset = (Date.UTC(objDate.getFullYear(), objDate.getMonth(), objDate.getDate()) - Date.UTC(1900, 0, 31)) / 86400000;
        for (i = 1900; i < 2101 && offset > 0; i++) {
            temp = calendar.lYearDays(i);
            offset -= temp;
        }
        if (offset < 0) {
            offset += temp;
            i--;
        }

        //是否今天
        var isTodayObj = new Date(), isToday = false;
        if (isTodayObj.getFullYear() == y && isTodayObj.getMonth() + 1 == m && isTodayObj.getDate() == d) {
            isToday = true;
        }
        //星期几
        var nWeek = objDate.getDay(), cWeek = calendar.nStr1[nWeek];
        if (nWeek == 0) {
            nWeek = 7;
        }//数字表示周几顺应天朝周一开始的惯例
        //农历年
        var year = i;

        var leap = calendar.leapMonth(i); //闰哪个月
        var isLeap = false;

        //效验闰月
        for (i = 1; i < 13 && offset > 0; i++) {
            //闰月
            if (leap > 0 && i == (leap + 1) && isLeap == false) {
                --i;
                isLeap = true;
                temp = calendar.leapDays(year); //计算农历闰月天数
            }
            else {
                temp = calendar.monthDays(year, i);//计算农历普通月天数
            }
            //解除闰月
            if (isLeap == true && i == (leap + 1)) {
                isLeap = false;
            }
            offset -= temp;
        }

        if (offset == 0 && leap > 0 && i == leap + 1)
            if (isLeap) {
                isLeap = false;
            } else {
                isLeap = true;
                --i;
            }
        if (offset < 0) {
            offset += temp;
            --i;
        }
        //农历月
        var month = i;
        //农历日
        var day = offset + 1;
        var isLestDay = day == temp ? true : false;//是否当月最后一天
        //天干地支处理
        var sm = m - 1;
        var gzY = calendar.toGanZhiYear(year);

        //月柱 1900年1月小寒以前为 丙子月(60进制12)
        var firstNode = calendar.getTerm(year, (m * 2 - 1));//返回当月「节」为几日开始
        var secondNode = calendar.getTerm(year, (m * 2));//返回当月「节」为几日开始

        //依据12节气修正干支月
        var gzM = calendar.toGanZhi((y - 1900) * 12 + m + 11);
        if (d >= firstNode) {
            gzM = calendar.toGanZhi((y - 1900) * 12 + m + 12);
        }

        //传入的日期的节气与否
        var isTerm = false;
        var Term = null;
        if (firstNode == d) {
            isTerm = true;
            Term = calendar.solarTerm[m * 2 - 2];
        }
        if (secondNode == d) {
            isTerm = true;
            Term = calendar.solarTerm[m * 2 - 1];
        }
        //日柱 当月一日与 1900/1/1 相差天数
        var dayCyclical = Date.UTC(y, sm, 1, 0, 0, 0, 0) / 86400000 + 25567 + 10;
        var gzD = calendar.toGanZhi(dayCyclical + d - 1);
        //该日期所属的星座
        var astro = calendar.toAstro(m, d);

        return {
            'lYear': year,
            'lMonth': month,
            'lDay': day,
            'Animal': calendar.getAnimal(year),
            'IMonthCn': (isLeap ? "\u95f0" : '') + calendar.toChinaMonth(month),
            'IDayCn': calendar.toChinaDay(day),
            'cYear': y,
            'cMonth': m,
            'cDay': d,
            'gzYear': gzY,
            'gzMonth': gzM,
            'gzDay': gzD,
            'isToday': isToday,
            'isLeap': isLeap,
            'nWeek': nWeek,
            'ncWeek': "\u661f\u671f" + cWeek,
            'isTerm': isTerm,
            'Term': Term,
            'astro': astro,
            'isLestDay': isLestDay
        };
    },

    /**
     * 传入农历年月日以及传入的月份是否闰月获得详细的公历、农历object信息 <=>JSON
     * @param y  lunar year
     * @param m  lunar month
     * @param d  lunar day
     * @param isLeapMonth  lunar month is leap or not.[如果是农历闰月第四个参数赋值true即可]
     * @return JSON object
     * @eg:console.log(calendar.lunar2solar(1987,9,10));
     */
    lunar2solar: function (y, m, d, isLeapMonth) {   //参数区间1900.1.31~2100.12.1
        var isLeapMonth = !!isLeapMonth;
        var leapOffset = 0;
        var leapMonth = calendar.leapMonth(y);
        var leapDay = calendar.leapDays(y);
        if (isLeapMonth && (leapMonth != m)) {
            return -1;
        }//传参要求计算该闰月公历 但该年得出的闰月与传参的月份并不同
        if (y == 2100 && m == 12 && d > 1 || y == 1900 && m == 1 && d < 31) {
            return -1;
        }//超出了最大极限值
        var day = calendar.monthDays(y, m);
        var _day = day;
        //bugFix 2016-9-25
        //if month is leap, _day use leapDays method
        if (isLeapMonth) {
            _day = calendar.leapDays(y, m);
        }
        if (y < 1900 || y > 2100 || d > _day) {
            return -1;
        }//参数合法性效验

        //计算农历的时间差
        var offset = 0;
        for (var i = 1900; i < y; i++) {
            offset += calendar.lYearDays(i);
        }
        var leap = 0, isAdd = false;
        for (var i = 1; i < m; i++) {
            leap = calendar.leapMonth(y);
            if (!isAdd) {//处理闰月
                if (leap <= i && leap > 0) {
                    offset += calendar.leapDays(y);
                    isAdd = true;
                }
            }
            offset += calendar.monthDays(y, i);
        }
        //转换闰月农历 需补充该年闰月的前一个月的时差
        if (isLeapMonth) {
            offset += day;
        }
        //1900年农历正月一日的公历时间为1900年1月30日0时0分0秒(该时间也是本农历的最开始起始点)
        var stmap = Date.UTC(1900, 1, 30, 0, 0, 0);
        var calObj = new Date((offset + d - 31) * 86400000 + stmap);
        var cY = calObj.getUTCFullYear();
        var cM = calObj.getUTCMonth() + 1;
        var cD = calObj.getUTCDate();

        return calendar.solar2lunar(cY, cM, cD);
    }
};


//公历节日
// var sFtv = new Array(
//     "0101 元旦节", "0214 情人节", "0308 妇女节",
//     "0312 植树节", "0401 愚人节", "0501 劳动节",
//     "0504 青年节", "0601 儿童节", "0701 建党节",
//     "0801 建军节", "0910 教师节", "1001 国庆节", "1031 万圣节", "1111 光棍节",
//     "1224 平安夜", "1225 圣诞节")
var sFtv = [];
function getgjq(yy, mm, dd) {
    //公历节日
    for (i in sFtv) {
        if (sFtv[i].match(/^(\d{2})(\d{2})([\s\*])(.+)$/))
            if (Number(RegExp.$1) == mm && Number(RegExp.$2) == dd) {
                return RegExp.$4;

            }
    }
    var sDObj = new Date(yy, mm - 1, 1, 0, 0, 0, 0);    //当月一日日期
    var firstWeek = sDObj.getDay();    //公历当月1日星期几
    var Mlength = calendar.solarDays(yy, mm);    //公历当月天数
    //月周节日
    for (i in wFtv) {
        if (wFtv[i].match(/^(\d{2})(\d)(\d)([\s\*])(.+)$/))
            if (Number(RegExp.$1) == mm) {
                tmp1 = Number(RegExp.$2);
                tmp2 = Number(RegExp.$3);
                if (tmp1 < 5)
                    var tt = ((firstWeek > tmp2) ? 7 : 0) + 7 * (tmp1 - 1) + tmp2 - firstWeek + 1;
                if (tt == dd) {
                    return RegExp.$5;
                }
                else {

                    tmp1 -= 5;
                    tmp3 = (firstWeek + Mlength - 1) % 7; //当月最后一天星期?
                    var tt = Mlength - tmp3 - 7 * tmp1 + tmp2 - (tmp2 > tmp3 ? 7 : 0);
                    if (tt == dd) {
                        return RegExp.$5;
                    }
                }
            }
    }
}
//农历节日
var lFtv = new Array("0101 春节", "0115 元宵节", "0505 端午节", "0624 火把节", "0707 七夕节", "0715 中元节",
    "0815 中秋节", "0909 重阳节", "1208 腊八节", "1223 小年", "1200 除夕")
function getljq(yyyy, mm, dd) {
    for (i in lFtv) {
        if (lFtv[i].match(/^(\d{2})(\d{2})([\s\*])(.+)$/))
            if (Number(RegExp.$1) == mm && Number(RegExp.$2) == dd) {
                return RegExp.$4;
            }
    }

}
function getjqcss(yyyy, mm, dd) {
    if (yyyy == 2017) {
        for (i in jFtv) {
            if (jFtv[i].match(/^(\d{4})(\d{2})(\d{2})([\s\*])$/))
                if (Number(RegExp.$1) == yyyy && Number(RegExp.$2) == mm && Number(RegExp.$3) == dd) {
                    if (RegExp.$4 == '*') {
                        return 'fjia'
                    } else {
                        return 'gjia'
                    }
                }
        }
    }
    return '';

}


//某月的第几个星期几
var wFtv = new Array(
    "0520 母亲节",
    "0530 助残日",
    "0630 父亲节",
    "1144 感恩节")

//国家规定假 *公司福利假
var jFtv = [];
new Array(
    "20170101 ",
    "20170102 ",
    "20170122*",
    "20170127 ",
    "20170128 ",
    "20170129 ",
    "20170130 ",
    "20170131 ",
    "20170201 ",
    "20170202 ",
    "20170203*",
    "20170204*",
    "20170401*",
    "20170402 ",
    "20170403 ",
    "20170404 ",
    "20170429 ",
    "20170430 ",
    "20170501 ",
    "20170527*",
    "20170528 ",
    "20170529 ",
    "20170530 ",
    "20170930*",
    "20171001 ",
    "20171002 ",
    "20171003 ",
    "20171004 ",
    "20171005 ",
    "20171006 ",
    "20171007 ",
    "20171008 ",
    "20171225*");

$(function () {

    $(".prorup").on("click", function () {
        $(".prorup").hide();
        $(".jie").hide();
        $(".layer").hide();
    });

    $(".jqclass").click(function () {
        var riziss = $(this).attr('data');
        var srt = riziss.split("-");
        $(".prorup").hide();
        $(".layer").hide();
        jump(srt[0], srt[1], srt[2]);
        $(".jie").hide();
    });
    // msgAutoScroll()
});
$('.jia').on('click', function () {
    $("#yyyyJia").html(sev_y);
    if (sev_y == 2017) {
        $("#jiabeizhu").show();
    } else {
        $("#jiabeizhu").hide();
    }
    ;
    $('.tc').show();
    $('.tc-innner-jia').show();

    tc();

});

var e = 1;

function tc() {
    var b, c, d;
    var myDate = new Date();

    if (e == 0) {
        b = myDate.getFullYear() - 1900;
        c = myDate.getMonth();
        d = myDate.getDate() - 1;

    } else {
        b = sev_y - 1900;
        c = sev_m - 1;
        d = sev_d - 1;


    }
    e = 1;
    var mySwiper = new Swiper('.swiper-container2', {
        direction: 'vertical',
        initialSlide: b,
        slidesPerView: 'auto',
        roundLengths: true,
        centeredSlides: true,

        watchSlidesProgress: true,
        watchSlidesVisibility: true,

        freeMode: true,
        freeModeMomentumRatio: 1,
        freeModeSticky: true,
        onTouchMove: function (swiper) {
            var b1 = $('.year').children('.swiper-slide-active').html();
            $('.i-year').html(b1);
        },
        onSlideChangeEnd: function (swiper) {
            var b1 = $('.year').children('.swiper-slide-active').html();
            $('.i-year').html(b1);
        },


    });
    var mySwiper = new Swiper('.swiper-container3', {
        direction: 'vertical',
        initialSlide: c,
        slidesPerView: 'auto',
        roundLengths: true,
        centeredSlides: true,

        watchSlidesProgress: true,
        watchSlidesVisibility: true,

        freeMode: true,
        freeModeMomentumRatio: 1,
        freeModeSticky: true,
        onTouchMove: function (swiper) {
            var b1 = $('.month').children('.swiper-slide-active').html();
            $('.i-month').html(b1);
        },
        onSlideChangeEnd: function (swiper) {
            var b1 = $('.month').children('.swiper-slide-active').html();
            $('.i-month').html(b1);
        },


    });
    var mySwiper = new Swiper('.swiper-container4', {
        direction: 'vertical',
        initialSlide: d,
        slidesPerView: 'auto',
        roundLengths: true,
        centeredSlides: true,

        watchSlidesProgress: true,
        watchSlidesVisibility: true,

        freeMode: true,
        freeModeMomentumRatio: 1,
        freeModeSticky: true,
        onTouchMove: function (swiper) {
            var b1 = $('.date').children('.swiper-slide-active').html();
            $('.i-date').html(b1);
        },
        onSlideChangeEnd: function (swiper) {
            var b1 = $('.date').children('.swiper-slide-active').html();
            $('.i-date').html(b1);
        },

    });
};

$('.tc-bot-left').click(function () {
    e = 0;
    tc();
});
$('.tc-bot-right').click(function () {
    $('.tc').hide();
    $('.tc-innner-jia').hide();
    var yyyy = parseInt($('.year').children('.swiper-slide-active').html());
    var mm = parseInt($('.month').children('.swiper-slide-active').html());
    var dd = parseInt($('.date').children('.swiper-slide-active').html());
    if (mm != sev_m || yyyy != sev_y || dd != sev_d) {
        jump(yyyy, mm, dd);

    }
    ;


});
$(".tc").on("click", function () {
    $('.tc-innner-jia').hide();
    $(this).hide();

});
function SelectJiaqi(jq) {
    var mm = sev_m;
    var dd = sev_d;
    switch (jq) {
        case  '元旦':
            mm = 1;
            dd = 1
            break;
        case '除夕':
            var djson = calendar.lunar2solar(sev_y, 1, 1);
            var objdate = new Date(djson.cYear, djson.cMonth - 1, djson.cDay + 1)
            objdate.setDate(objdate.getDate() - 1);
            mm = objdate.getMonth() + 1;
            dd = objdate.getUTCDate();
            break;
        case '春节':
            var djson = calendar.lunar2solar(sev_y, 1, 1);
            mm = djson.cMonth;
            dd = djson.cDay;
            break;
        case '清明节':
            var offDate = new Date((31556925974.7 * (sev_y - 1900) + 128867 * 60000) + Date.UTC(1900, 0, 6, 2, 5));
            mm = offDate.getMonth() + 1;
            dd = offDate.getUTCDate()
            break;
        case  '劳动节':
            mm = 5;
            dd = 1
            break;
        case '端午节':
            var djson = calendar.lunar2solar(sev_y, 5, 5);
            mm = djson.cMonth;
            dd = djson.cDay;
            break;
        case '中秋节':
            var djson = calendar.lunar2solar(sev_y, 8, 15);
            mm = djson.cMonth;
            dd = djson.cDay;
            break;
        case  '国庆节':
            mm = 10;
            dd = 1
            break;
        default:
            break;
    }

    $('.tc').hide();
    $('.tc-innner-jia').hide();
    if (mm != sev_m || dd != sev_d) {
        jump(sev_y, mm, dd);

    }
    ;
}
$(function () {
    var currYear = (new Date()).getFullYear();
    var opt = {};
    opt.date = {preset: 'date'};
    //opt.datetime = { preset: 'datetime' };
    ////opt.time = { preset: 'time' };
    opt.default = {
        theme: 'android-ics light', //皮肤样式
        display: 'modal', //显示方式
        mode: 'scroller', //日期选择模式
        dateFormat: 'yy年mm月',
        lang: 'zh',
        showNow: false,
        showLabel: false,
        setText: '确定',
        cancelText: '取消',
        startYear: currYear - 10, //开始年份
        endYear: currYear + 10 //结束年份
        , headerText: function (valueText) { //自定义弹出框头部格式
            array = valueText.split('年');
            return array[0] + "年" + array[1];
        }
    };

    $("#appDate").mobiscroll($.extend(opt['date'], opt['default']));

});
function changeCld() {
    var y, m;
    var appDate = $("#appDate").val()
    var datas = appDate.split("年");
    if (datas.length > 1) {
        y = datas[0];
        var mms = datas[1].split("月")
        if (mms.length > 0) {
            m = mms[0];
            if (y != sev_y || m != sev_m) {
                jump(y, m, sev_d);
            }
        }
    }
    $("#appDateText").html(appDate);
    tipReady(y + '-' + m);
}

function msgAutoScroll() {

    var el = $(".day-right>div"),
        warpH = $(".day-right").height(),
        ctxH = $(".day-right>div").height(),
        itemH = $(".day-right>div>p").height();
    var offset = ctxH - warpH, transVal = 0;

    function atoscroll() {


        transVal = Math.abs(transVal) >= offset ? 0 : transVal - itemH;

        el.css({
            "transform": "translateY(" + transVal + 'px)',
            "-webkit-transform": "translateY(" + transVal + 'px)',
            "-moz-transform": "translateY(" + transVal + 'px)'
        });

        setTimeout(atoscroll, 3000);
    }

    if (offset > 0) {
        atoscroll();
    }

}
var idxCtrl = {
    to: function (page) {
        window.location = page + "?y=" + sev_y + '-' + sev_m + '-' + sev_d + '&week=' + sev_week + '&yue=' + sev_topyue;
    }
}