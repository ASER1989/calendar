/**
 * Created by Lenovo on 2017/6/19.
 */
var zoom = function($){

    function calc( callback){
        callback = typeof callback=="function"?callback:function(){};

        var width =$(window).width();
        var pi = width/320;
        var fontSize = 16;

        var el = document.createElement("style");
        el.setAttribute("id","_html_font_size");
        el.innerHTML="html{ font-size:"+fontSize*pi+"px !important}";
        $("head").append(el);

        callback.call(null);
    }



    return{
        calc:calc,
        reSize:function(){
            {
                $("#_html_font_size").remove();
                calc();
            }
        }
    }
}