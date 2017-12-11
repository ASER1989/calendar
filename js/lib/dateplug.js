/**
 * Created by Lenovo on 2017/12/8.
 * link:http://www.html5tricks.com/html5-date-range-picker.html
 * http://www.jq22.com/jquery-info15986
 */
(function () {
    var $, Calendar, DAYS, DateRangePicker, MONTHS, TEMPLATE;

    $ = jQuery;

    DAYS = ['日', '一', '二', '三', '四', '五', '六'];

    MONTHS = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];

    TEMPLATE = "<div class='drp-popup-bg'> \n <div class=\"drp-popup\">\n   <div class=\"drp-calendars\">\n    <div class=\"drp-calendar drp-calendar-start\">\n      <div class=\"drp-month-picker\">\n        <div class=\"drp-arrow\"><</div>\n        <div class=\"drp-month-title\"></div>\n        <div class=\"drp-arrow drp-arrow-right\">></div>\n      </div>\n      <ul class=\"drp-day-headers\"></ul>\n      <ul class=\"drp-days\"></ul>\n        </div>\n  </div> <div class=\"drp-tip\"><span>确定</span></div>\n</div></div>";

    DateRangePicker = (function () {
        function DateRangePicker($select, config) {

            this.config = config || {};

            this.$select = $select;
            this.$dateRangePicker = $(TEMPLATE);
            // this.$select.attr('tabindex', '-1').before(this.$dateRangePicker);
            $('body').append(this.$dateRangePicker);
            this.isHidden = true;
            this.customOptionIndex = this.$select[0].length - 1;
            this.initBindings();
            // this.setRange(this.$select.val());
            this.setRange(5);
        }

        DateRangePicker.prototype.initBindings = function () {
            var self;
            self = this;
            this.$select.on('click focus mousedown', function (e) {
                self.isHidden && self.show();
                return false;
            });
            this.$dateRangePicker.click(function (evt) {
                return evt.stopPropagation();
            });
            $(".drp-popup").click(function (e) {
                e.stopPropagation();
            })
            $(".drp-tip").click(function () {
                var date = self.startCalendar;
                typeof self.config.onOk == "function" && self.config.onOk.call(null, date.visibleYear(), date.visibleMonth(), date.date.getDate(), showCal)
                return self.hide();
            })
            // this.$select.children().each(function () {
            //     return self.$dateRangePicker.find('.drp-timeline-presets').append($("<li class='" + ((this.selected && 'drp-selected') || '') + "'>" + ($(this).text()) + "<div class='drp-button'></div></li>"));
            // });
            return this.$dateRangePicker.find('.drp-timeline-presets li').click(function (evt) {
                var presetIndex;
                $(this).addClass('drp-selected').siblings().removeClass('drp-selected');
                presetIndex = $(this).index();
                self.$select[0].selectedIndex = presetIndex;
                // self.setRange(self.$select.val());
                self.setRange(5);
                if (presetIndex === self.customOptionIndex) {
                    return self.showCustomDate();
                }
            });
        };

        DateRangePicker.prototype.hide = function () {
            this.isHidden = true;
            return this.$dateRangePicker.hide();
        };

        DateRangePicker.prototype.show = function () {
            this.isHidden = false;
            return this.$dateRangePicker.show();
        };

        DateRangePicker.prototype.showCustomDate = function () {
            var text;
            this.$dateRangePicker.find('.drp-timeline-presets li:last-child').addClass('drp-selected').siblings().removeClass('drp-selected');
            text = this.formatDate(this.startDate()) + ' - ' + this.formatDate(this.endDate());
            this.$select.find('option:last-child').text(text);
            // return this.$select[0].selectedIndex = this.customOptionIndex;
        };

        DateRangePicker.prototype.formatDate = function (d) {
            return "" + d.getFullYear().toString() + '/' + (d.getMonth() + 1) + "/" + (d.getDate());
        };

        DateRangePicker.prototype.setRange = function (daysAgo) {
            var endDate, startDate;
            if (isNaN(daysAgo)) {
                return false;
            }
            daysAgo -= 1;
            // endDate = new Date();
            endDate = startDate = new Date();
            // startDate.setDate(endDate.getDate() - daysAgo);
            // startDate.setDate(1);

            this.endCalendar = this.startCalendar = new Calendar(this, this.$dateRangePicker.find('.drp-calendar:first-child'), startDate, true);
            // this.endCalendar = new Calendar(this, this.$dateRangePicker.find('.drp-calendar:last-child'), endDate, false);
            return this.draw();
        };

        DateRangePicker.prototype.endDate = function () {
            return this.endCalendar.date;
        };

        DateRangePicker.prototype.startDate = function () {
            return this.startCalendar.date;
        };

        DateRangePicker.prototype.draw = function () {
            this.startCalendar.draw();
            return this.endCalendar.draw();
        };

        return DateRangePicker;

    })();

    Calendar = (function () {
        function Calendar(dateRangePicker, $calendar, date, isStartCalendar) {
            var self;
            this.dateRangePicker = dateRangePicker;
            this.$calendar = $calendar;
            this.date = date;
            this.isStartCalendar = isStartCalendar;
            self = this;
            this.date.setHours(0, 0, 0, 0);
            this._visibleMonth = this.month();
            this._visibleYear = this.year();
            this.$title = this.$calendar.find('.drp-month-title');
            this.$dayHeaders = this.$calendar.find('.drp-day-headers');
            this.$days = this.$calendar.find('.drp-days');
            this.$dateDisplay = this.$calendar.find('.drp-calendar-date');
            $calendar.find('.drp-arrow').click(function (evt) {
                if ($(this).hasClass('drp-arrow-right')) {
                    self.showNextMonth();
                } else {
                    self.showPreviousMonth();
                }
                return false;
            });
        }

        Calendar.prototype.showPreviousMonth = function () {
            if (this._visibleMonth === 1) {
                this._visibleMonth = 12;
                this._visibleYear -= 1;
            } else {
                this._visibleMonth -= 1;
            }
            return this.draw();
        };

        Calendar.prototype.showNextMonth = function () {
            if (this._visibleMonth === 12) {
                this._visibleMonth = 1;
                this._visibleYear += 1;
            } else {
                this._visibleMonth += 1;
            }
            return this.draw();
        };

        Calendar.prototype.setDay = function (day) {
            this.setDate(this.visibleYear(), this.visibleMonth(), day);

            var config = this.dateRangePicker.config;
            this.dateRangePicker.hide();
            typeof config.onOk == "function" && config.onOk.call(null, this.visibleYear(), this.visibleMonth(), day, showCal);
        };

        Calendar.prototype.setDate = function (year, month, day) {
            this.date = new Date(year, month - 1, day);
            return this.dateRangePicker.draw();
        };

        Calendar.prototype.draw = function () {
            var day, _i, _len;
            this.$dayHeaders.empty();
            this.$title.text((this.visibleYear()) + "年" + (this.nameOfMonth(this.visibleMonth())));
            for (_i = 0, _len = DAYS.length; _i < _len; _i++) {
                day = DAYS[_i];
                this.$dayHeaders.append($("<li>" + (day.substr(0, 2)) + "</li>"));
            }
            this.drawDateDisplay();
            return this.drawDays();
        };

        Calendar.prototype.dateIsSelected = function (date) {
            return date.getTime() === this.date.getTime();
        };

        Calendar.prototype.dateIsInRange = function (date) {
            return date >= this.dateRangePicker.startDate() && date <= this.dateRangePicker.endDate();
        };

        Calendar.prototype.dayClass = function (day, firstDayOfMonth, lastDayOfMonth) {
            var classes, date;
            date = new Date(this.visibleYear(), this.visibleMonth() - 1, day);
            classes = '';
            if (this.dateIsSelected(date)) {
                classes = 'drp-day-selected';
            } else if (this.dateIsInRange(date)) {
                classes = 'drp-day-in-range';
                if (date.getTime() === this.dateRangePicker.endDate().getTime()) {
                    classes += ' drp-day-last-in-range';
                }
            } else if (this.isStartCalendar) {
                if (date > this.dateRangePicker.endDate()) {
                    // classes += ' drp-day-disabled';
                }
            } else if (date < this.dateRangePicker.startDate()) {
                // classes += ' drp-day-disabled';
            }
            if ((day + firstDayOfMonth - 1) % 7 === 0 || day === lastDayOfMonth) {
                classes += ' drp-day-last-in-row';
            }
            return classes;
        };

        Calendar.prototype.drawDays = function () {
            var firstDayOfMonth, i, lastDayOfMonth, self, _i, _j, _ref;
            self = this;
            this.$days.empty();
            firstDayOfMonth = this.firstDayOfMonth(this.visibleMonth(), this.visibleYear());
            lastDayOfMonth = this.daysInMonth(this.visibleMonth(), this.visibleYear());
            for (i = _i = 1, _ref = firstDayOfMonth - 1; _i <= _ref; i = _i += 1) {
                this.$days.append($("<li class='drp-day drp-day-empty'></li>"));
            }
            for (i = _j = 1; _j <= lastDayOfMonth; i = _j += 1) {
                this.$days.append($("<li class='drp-day " + (this.dayClass(i, firstDayOfMonth, lastDayOfMonth)) + "'>" + i + "</li>"));
            }
            return this.$calendar.find('.drp-day').click(function (evt) {

                var day;

                if ($(this).hasClass('drp-day-disabled')) {
                    return false;
                }
                day = parseInt($(this).text(), 10);
                if (isNaN(day)) {
                    return false;
                }

                return self.setDay(day);
            });
        };

        Calendar.prototype.drawDateDisplay = function () {
            // return this.$dateDisplay.text([this.month(), this.day(), this.year()].join('/'));
            var _that = this.dateRangePicker;
            var text = _that.formatDate(_that.startDate()) + ' — ' + _that.formatDate(_that.endDate());
            return this.$dateDisplay.text(text);
        };

        Calendar.prototype.month = function () {
            return this.date.getMonth() + 1;
        };

        Calendar.prototype.day = function () {
            return this.date.getDate();
        };

        Calendar.prototype.dayOfWeek = function () {
            return this.date.getDay() + 1;
        };

        Calendar.prototype.year = function () {
            return this.date.getFullYear();
        };

        Calendar.prototype.visibleMonth = function () {
            return this._visibleMonth;
        };

        Calendar.prototype.visibleYear = function () {
            return this._visibleYear;
        };

        Calendar.prototype.nameOfMonth = function (month) {
            return MONTHS[month - 1];
        };

        Calendar.prototype.firstDayOfMonth = function (month, year) {
            return new Date(year, month - 1, 1).getDay() + 1;
        };

        Calendar.prototype.daysInMonth = function (month, year) {
            month || (month = this.visibleMonth());
            year || (year = this.visibleYear());
            return new Date(year, month, 0).getDate();
        };

        return Calendar;

    })();

    function showCal(y, m, d) {
        var D = new Date(y, m, d);

        var yy = y;
        var mm = m;
        var dd = d;


        var ww = D.getDay();
        var ss = parseInt(D.getTime() / 1000);
        if (yy < 100) yy = "19" + yy;
        return GetLunarDay(yy, mm, dd);
    }

//定义全局变量
    var CalendarData = new Array(100);
    var madd = new Array(12);
    var tgString = "甲乙丙丁戊己庚辛壬癸";
    var dzString = "子丑寅卯辰巳午未申酉戌亥";
    var numString = "一二三四五六七八九十";
    var monString = "正二三四五六七八九十冬腊";
    var weekString = "日一二三四五六";
    var sx = "鼠牛虎兔龙蛇马羊猴鸡狗猪";
    var cYear, cMonth, cDay, TheDate;
    CalendarData = new Array(0xA4B, 0x5164B, 0x6A5, 0x6D4, 0x415B5, 0x2B6, 0x957, 0x2092F, 0x497, 0x60C96, 0xD4A, 0xEA5, 0x50DA9, 0x5AD, 0x2B6, 0x3126E, 0x92E, 0x7192D, 0xC95, 0xD4A, 0x61B4A, 0xB55, 0x56A, 0x4155B, 0x25D, 0x92D, 0x2192B, 0xA95, 0x71695, 0x6CA, 0xB55, 0x50AB5, 0x4DA, 0xA5B, 0x30A57, 0x52B, 0x8152A, 0xE95, 0x6AA, 0x615AA, 0xAB5, 0x4B6, 0x414AE, 0xA57, 0x526, 0x31D26, 0xD95, 0x70B55, 0x56A, 0x96D, 0x5095D, 0x4AD, 0xA4D, 0x41A4D, 0xD25, 0x81AA5, 0xB54, 0xB6A, 0x612DA, 0x95B, 0x49B, 0x41497, 0xA4B, 0xA164B, 0x6A5, 0x6D4, 0x615B4, 0xAB6, 0x957, 0x5092F, 0x497, 0x64B, 0x30D4A, 0xEA5, 0x80D65, 0x5AC, 0xAB6, 0x5126D, 0x92E, 0xC96, 0x41A95, 0xD4A, 0xDA5, 0x20B55, 0x56A, 0x7155B, 0x25D, 0x92D, 0x5192B, 0xA95, 0xB4A, 0x416AA, 0xAD5, 0x90AB5, 0x4BA, 0xA5B, 0x60A57, 0x52B, 0xA93, 0x40E95);
    madd[0] = 0;
    madd[1] = 31;
    madd[2] = 59;
    madd[3] = 90;
    madd[4] = 120;
    madd[5] = 151;
    madd[6] = 181;
    madd[7] = 212;
    madd[8] = 243;
    madd[9] = 273;
    madd[10] = 304;
    madd[11] = 334;

    function GetBit(m, n) {
        return (m >> n) & 1;
    }

//农历转换
    function e2c() {
        TheDate = (arguments.length != 3) ? new Date() : new Date(arguments[0], arguments[1], arguments[2]);
        var total, m, n, k;
        var isEnd = false;
        var tmp = TheDate.getYear();
        if (tmp < 1900) {
            tmp += 1900;
        }
        total = (tmp - 1921) * 365 + Math.floor((tmp - 1921) / 4) + madd[TheDate.getMonth()] + TheDate.getDate() - 38;

        if (TheDate.getYear() % 4 == 0 && TheDate.getMonth() > 1) {
            total++;
        }
        for (m = 0; ; m++) {
            k = (CalendarData[m] < 0xfff) ? 11 : 12;
            for (n = k; n >= 0; n--) {
                if (total <= 29 + GetBit(CalendarData[m], n)) {
                    isEnd = true;
                    break;
                }
                total = total - 29 - GetBit(CalendarData[m], n);
            }
            if (isEnd) break;
        }
        cYear = 1921 + m;
        cMonth = k - n + 1;
        cDay = total;
        if (k == 12) {
            if (cMonth == Math.floor(CalendarData[m] / 0x10000) + 1) {
                cMonth = 1 - cMonth;
            }
            if (cMonth > Math.floor(CalendarData[m] / 0x10000) + 1) {
                cMonth--;
            }
        }
    }

    function GetcDateString() {
        var tmp = "";
        /*显示农历年：（ 如：甲午(马)年 ）*/
        /*tmp+=tgString.charAt((cYear-4)%10);
         tmp+=dzString.charAt((cYear-4)%12);
         tmp+="(";
         tmp+=sx.charAt((cYear-4)%12);
         tmp+=")年 ";*/
        if (cMonth < 1) {
            tmp += "(闰)";
            tmp += monString.charAt(-cMonth - 1);
        } else {
            tmp += monString.charAt(cMonth - 1);
        }
        tmp += "月";
        tmp += (cDay < 11) ? "初" : ((cDay < 20) ? "十" : ((cDay < 30) ? "廿" : "三十"));
        if (cDay % 10 != 0 || cDay == 10) {
            tmp += numString.charAt((cDay - 1) % 10);
        }
        return tmp;
    }

    function GetLunarDay(solarYear, solarMonth, solarDay) {
        if (solarYear < 1921 || solarYear > 2020) {
            return "";
        } else {
            solarMonth = (parseInt(solarMonth) > 0) ? (solarMonth - 1) : 11;
            e2c(solarYear, solarMonth, solarDay);
            return GetcDateString();
        }
    }

    $.fn.dateRangePicker = function (config) {
        return new DateRangePicker(this, config);
    };

    // $('.custom-date').dateRangePicker();

}).call(this);