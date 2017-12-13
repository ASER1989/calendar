/**
 * Created by Lenovo on 2017/12/5.
 */
window._config = __config = {
    // resHost: "http://jz.023qx.net/",
    // host: "http://jz.023qx.net/api/",
    host: "http://m3.bjzjxf.com/api/",
    resHost: "http://m3.bjzjxf.com/",

}
window.GetQueryStr = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    return r != null ? decodeURIComponent(r[2]) : null;
}
var store = {
    set: function (key, val) {
        localStorage.setItem(key, val)
    },
    get: function (key, def) {
        def = def || null;
        return key == null ? def : localStorage.getItem(key);
    },
    remove: function (key) {
        key != null && localStorage.removeItem(key);
    },
    removeAll:function () {
        localStorage.clear();
    }
}
require.libCallback.push(
    function () {
        $.ajax = function (base) {
            return function (opt) {
                if (opt) {
                    opt.url = opt.islocal == true ? opt.url : __config.host + opt.url;
                    //openid配置
                    opt.data = opt.data || {};
                }
                if (opt.success) {
                    opt.success = function (successfn) {
                        return function (res) {
                            try{
                                res = Object.prototype.toString.call(res) == "[object String]" ? JSON.parse(res) : res;
                            }catch (e){}

                            successfn.call(null, res);
                        }
                    }(opt.success);
                }
                base.call(null, opt);
            }
        }($.ajax);
    }
)