var $board = $('main'),
    $card = $('.card'),
    $itemCount = $('.score span'),
    $wins = $('.wins span'),
    $turns = $('.turns span'),
    $attempts = $('.attempts span'),
    $attemptsOverall = $('.attempts-overall span'),
    $success = $('.success'),
    $successMsg = $('.success-message'),
    $successIcon = $('.success-icon'),
    $btnContinue = $('.btn-continue'),
    $btnSound = $('.btn-sound'),
    selectedClass = 'is-selected',
    visibleClass = 'is-visible',
    playSoundClass = 'is-playing',
    scoreUpdateClass = 'is-updating',
    lastTurnClass = 'last-turn',
    dataMatch = 'data-matched',
    dataType = 'data-type',
    turnsCount = 2,
    winsCount = 0,
    attemptsCount = 0,
    attemptsOverallCount = 0,
    tooManyAttempts = 8,
    timeoutLength = 600,
    card1, card2, msg;

$(function(){
  $("#slideToggleBtn").on("click", function(){
    $("#nav").slideToggle("fast")
  });
});

// Shuffle up the deck
shuffleCards();

$card.on('click', function() {
  // Add selected class to a card only if it is not already matched
  if ($(this).attr(dataMatch) == 'false') {
    $(this).addClass(selectedClass);
  }

  var selectedCards = $('.' + selectedClass);

  // Check if cards match
  if (selectedCards.length == 2) {
    card1 = selectedCards.eq(0).attr(dataType);
    card2 = selectedCards.eq(1).attr(dataType);

    if (card1 == card2) {
      if ($btnSound.hasClass(playSoundClass)) {
        soundMatch.play(); 
      }
      selectedCards
        .attr(dataMatch, true)
        .removeClass(selectedClass)

    } else {
      if ($btnSound.hasClass(playSoundClass)) {
        soundNoMatch.play(); 
      }
      setTimeout(function() {
        turnsCount--;
        $turns
          .addClass(scoreUpdateClass)
          .html(turnsCount);
        selectedCards.removeClass(selectedClass);
      }, timeoutLength);

      if(turnsCount === 1) {
        setTimeout(function() {
          $turns.addClass(lastTurnClass);
        }, timeoutLength);
      }

      if(turnsCount <= 0) {
        setTimeout(function() {
          turnsCount = 2;
          $turns
            .removeClass(lastTurnClass)
            .html(turnsCount);
          $card.attr(dataMatch, false);
          attemptsCount += 1;
          $attempts
            .addClass(scoreUpdateClass)
            .html(attemptsCount);
        }, timeoutLength);
      }

    }
  }

  // Winner!
  if ($('[' + dataMatch + '="true"]').length == $card.length) {
    // Show success screen
    $success.addClass(visibleClass);
    if (attemptsCount <= tooManyAttempts) {
      setTimeout(function() {
        if ($btnSound.hasClass(playSoundClass)) {
          soundSuccess.play(); 
        }
      }, 600);
    }
    // 실수하지 않고 나온 개수 -> 코인이!!
    switch(true) {
      case (attemptsCount <= 2):
        msg = "+5,000원";
        $successIcon.attr(dataType, "gold-coin");
        break;
      case (attemptsCount > 2 && attemptsCount <= 5):
        msg = "+3,000원";
        $successIcon.attr(dataType, "silver-coin");
        break;
      case (attemptsCount > 5 && attemptsCount <= 8):
        msg = "+1,000원";
        $successIcon.attr(dataType, "bronze-coin");
        break;
      case (attemptsCount > tooManyAttempts):
        msg = "+500원";
        $successIcon.attr(dataType, "just-coin");
        break;
    }
    $successMsg.text(msg);

    setTimeout(function() {
      attemptsOverallCount += attemptsCount;
      $attemptsOverall
        .addClass(scoreUpdateClass)
        .html(attemptsOverallCount);
      winsCount += 1;
      $wins
        .addClass(scoreUpdateClass)
        .html(winsCount);
      $card.attr(dataMatch, false);
    }, 1200);
  }

});

// Remove the score update class after the animation completes
// $itemCount.on(
//   "webkitAnimationEnd oanimationend msAnimationEnd animationend",
//   function() {
//     $itemCount.removeClass(scoreUpdateClass);
//   }
// );

// 한 판 더!!
$btnContinue.on('click', function() {
  // $success.removeClass(visibleClass); -> success클래스의 visibleClass를 삭제 
  $success.removeClass(visibleClass);
  shuffleCards();
  setTimeout(function() {
    turnsCount = 2;
    $turns
      .removeClass(lastTurnClass)
      .html(turnsCount);
    attemptsCount = 0;
    $attempts.html(attemptsCount);
  }, 300);
});

// Card shuffle function
function shuffleCards() {
  var cards = $board.children();
  while (cards.length) {
    $board.append(cards.splice(Math.floor(Math.random() * cards.length), 1)[0]);
  }
}