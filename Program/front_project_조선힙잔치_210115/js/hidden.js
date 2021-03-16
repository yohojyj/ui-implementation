$(document).ready(function(){
    $(window).scroll(function(){
        $(".hidden").each(function(i){
            var bottomOfObject=$(this).offset().top+$(this).outerHeight();
            var bottomOfWindow=$(window).scrollTop()+$(window).height();

            if(bottomOfWindow > bottomOfObject/1.1){
                $(this).animate({"opacity":"1"}, 500);
            }
        })
    })
})