var bnr=setInterval(bnr, 2000);
var inter=true;
var idx=2;

function bnr(){
    $(".bnr ul").animate({
        "left":-300*idx+"px"
    }, 300);

    $(".th ul li").eq(idx-1).addClass("on").siblings().removeClass("on");
    idx++;
    if(idx > $(".bnr ul li").length-3){
        $(".bnr ul").animate({
            "left":0
        }, 0);
        idx=0;
    }
}

$(".bnr , .th").hover(function(){
    if(inter==true){
        clearInterval(slide);
        inter=false;
    }   
}, function(){
    if(inter==false){
        slide=setInterval(bnr, 2000);
        inter=true;
    }
});

$(".th ul li").on('click', function(){
    $(this).addClass("on").siblings().removeClass("on");
    idx=$(this).index()+1;
    $(".th ul").animate({
        "left":-300*idx+"px"
    }, 1000);
});