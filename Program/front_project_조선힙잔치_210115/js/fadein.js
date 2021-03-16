$(document).ready(function(){
    $(window).scroll(function(){
        $(".fadein").each(function(i){
            var bottomOfElement=$(this).offset().top+(this).outerHeight();
            var bottomOfWindow=$(window).scrollTop()+$(window).height();

            if(bottomOfWindow > bottomOfElement){
                $(this).animate({"opacity":"1", "margin-left":"0px"}, 500);
            }
        });
    });
})