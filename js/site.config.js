/**
 * Created by Lenovo on 2017/12/5.
 */
window._config = __config = {
    host: "http://jz.023qx.net/api/",
    resHost: "http://jz.023qx.net/",

}
window.GetQueryStr = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    return r != null ? decodeURIComponent(r[2]) : null;
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
                            res = Object.prototype.toString.call(res) == "[object String]" ? JSON.parse(res) : res;
                            successfn.call(null, res);
                        }
                    }(opt.success);
                }
                base.call(null, opt);
            }
        }($.ajax);
    }
)