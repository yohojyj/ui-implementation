var time;
var $carouselLi;
var carouselCount;
var currentIndex;
var caInterval;
var imgW;

$(document).ready(function(){
	carouselInit(4000);
});

$(window).resize(function(){
	carousel_setImgPosition();
});

function carouselInit(t){
	time=t;
	$carouselLi=$("#carousel_section>ul>li");
	carouselCount=$carouselLi.length;
	currentIndex=0;
	carousel_setImgPosition();
	carousel();
}

function carousel_setImgPosition(){
    imgW = $carouselLi.width();
	for(var i = 0; i < carouselCount; i++){
		if( i == currentIndex){
			$carouselLi.eq(i).css("left", 0);
		}
		else{
			$carouselLi.eq(i).css("left", imgW);
		}
	}
}

function carousel(){
	caInterval = setInterval(function(){
		var left = "-" + imgW;

		$carouselLi.eq(currentIndex).animate({ left: left }, function(){
			$carouselLi.eq(currentIndex).css("left", imgW);

			if(currentIndex == (carouselCount-1)){
				currentIndex = 0;
			}
			else{
				currentIndex ++;
			}
		});


		if(currentIndex==(carouselCount-1)){
			$carouselLi.eq(0).animate({ left: 0 });
		}
		else{
			$carouselLi.eq(currentIndex + 1).animate({ left: 0 });
		}
	}, time);
}