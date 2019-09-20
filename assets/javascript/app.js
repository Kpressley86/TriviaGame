// Array of Questions and Answers //
var questions = [
    {
      question: 'Which rapper did Jim Carrey send a letter to while in prison?',
      answers: [
        { answer: 'A. Tupac Shakur', value: true },
        { answer: 'B. R. Kelly', value: false },
        { answer: 'C. 2 Chainz', value: false },
        { answer: 'D. Suge Knight', value: false }
      ]
    },
    {
      question: 'What year did Jim Carrey become a U.S. citizen?',
      answers: [
        { answer: 'A. 2004', value: true },
        { answer: 'B. 1985', value: false },
        { answer: 'C. 1996', value: false },
        { answer: 'D. Still not a citizen', value: false }
      ]
    },
    {
      question: 'Which female actor calls Jim Carrey her "Best male friend"?',
      answers: [
        { answer: 'A. Nicole Kidman', value: true },
        { answer: 'B. Katie Holmes', value: false },
        { answer: 'C. Meryl Streep', value: false },
        { answer: 'D. Charlize Theron', value: false }
      ]
    },
    {
      question: 'Which Monty Python film is Jim Carrey\'s favorite?',
      answers: [
        { answer: 'A. Monty Python\'s Flying Circus (1969)', value: true },
        { answer: 'B. Monty Python and the Holy Grail (1975)', value: false },
        { answer: 'C. Monty Python\'s The Meaning of Life (1983)' , value: false },
        { answer: 'D. Monty Python\'s And Now For Something Completely Different (1971)', value: false }
      ]
    },
    {
      question: "In 1997 Jim Carrey was called what by People Magazine?",
      answers: [
        { answer: 'A. One of the 50 Most Beautiful People in the World', value: true },
        { answer: 'B. Most awkward man in Hollywood', value: false },
        { answer: 'C. Best commedian of the year', value: false },
        { answer: 'D. Worst hair', value: false }
      ]
    },
    {
      question: 'What age did Jim Carrey drop out of high school?',
      answers: [
        { answer: 'A. 16', value: true },
        { answer: 'B. 15', value: false },
        { answer: 'C. 18', value: false },
        { answer: 'D. Never dropped out!', value: false }
      ]
    },
    {
      question: 'Jim Carrey shares a birthday with?',
      answers: [
        { answer: 'A. All 3', value: true },
        { answer: 'B. Andy Rourke', value: false },
        { answer: 'C. Andy Kaufman', value: false },
        { answer: 'D. Michelle Obama', value: false }
      ]
    }
  ];
  
  // "Global" Variables //
  var game;
  var counter = 0;
  var clock;
  var timer = 20;
  var correctCounter = 0;
  var incorrectCounter = 0;
  var unansweredCounter = 0;
  
  $(document).ready(function() {

    // Start Game on CLICK//
    $('.answers').css('visibility', 'hidden');
    $('body').on('click', '#start', function(event) {
      event.preventDefault();
      startGame();
      $('.answers').css('visibility', 'visible');
    });
  
    $('body').on('click', '.answer', function(event) {
      
      chosenAnswer = $(this).text();
      var answerCounter = questions[counter].answers;
  
      var answer = $('.answer');
      for (var i = 0; i < answerCounter.length; i++) {
        if (chosenAnswer === answerCounter[i].answer && answerCounter[i].value === true) {
          clearInterval(clock);
          var right = $(this).attr('class', 'right-answer answer');
          rightAnswer();
        } else if (chosenAnswer === answerCounter[i].answer && answerCounter[i].value === false) {
          clearInterval(clock);
          $(this).attr('class', 'wrong-answer answer');
          $('.first-answer').css('background-color', 'green');
          $('.first-answer').css('color', 'white');
          wrongAnswer();
        }
      }
    });
  
    $('body').on('click', '.reset-button', function(event) {
      event.preventDefault();
      resetGame();
    });
  });
  
  function rightAnswer() {
    correctCounter++;
    $('.time').html(timer);
    $('.right').html('<p>Right answers: ' + correctCounter + '</p><br>');
    setTimeout(questionCounter, 2000);
  }
  
  function wrongAnswer() {
    incorrectCounter++;
    $('.time').html(timer);
    $('.wrong').html('<p>Wrong answers: ' + incorrectCounter + '</p>');
    setTimeout(questionCounter, 2000);
  }
  
  function unanswered() {
    unanswered++;
    $('.mainBox').append("<p class='times-up'>Time's up!</p>");
    $('.right-answer').css('background-color', 'green');
    $('.times-up')
      .delay(2000)
      .fadeOut(400);
    setTimeout(questionCounter, 2000);
  }
  
  // Start the game
  function startGame() {
    $('.start-page').css('display', 'none');
    $('.questions-page').css('visibility', 'visible');
    $('.timer').html('<p>Time remaining: <span class="time">20</span></p>');
  
    $('.question').html(questions[counter].question);
    var showingAnswers =
      '<p class="answer first-answer">' +
      questions[counter].answers[0].answer +
      '</p><p class="answer">' +
      questions[counter].answers[1].answer +
      '</p><p class="answer">' +
      questions[counter].answers[2].answer +
      '</p><p class="answer">' +
      questions[counter].answers[3].answer +
      '</p>';
  
    $('.answers').html(showingAnswers);
  
    timerHolder();
  }
  
  function questionCounter() {
    if (counter < 6) {
      counter++;
      startGame();
      timer = 20;
      timerHolder();
    } else {
      finishGame();
    }
  }
  
  // Timer function
  function timerHolder() {
    clearInterval(clock);
    clock = setInterval(seconds, 1000);
    function seconds() {
      if (timer === 0) {
        clearInterval(clock);
        unanswered();
      } else if (timer > 0) {
        timer--;
      }
      $('.time').html(timer);
    }
  }
  
  // Finishing the game
  function finishGame() {
    var final = $('.mainBox')
      .html("<p>Congratulations you finished!<p><br><br>")
      .append('<p>Correct Answers: ' + correctCounter + '</p><br>')
      .append('<p>Wrong Answers: ' + incorrectCounter + '</p>');
    $(final).attr('<div>');
    $(final).attr('class', 'final');
    $('.final').append('<p><a class="btn btn-primary btn-lg reset-button" href="#">Restart the game!</a></p>');
  }
  
  // Reset the game
  function resetGame() {
    counter = 0;
    correctCounter = 0;
    incorrectCounter = 0;
    unansweredCounter = 0;
    timer = 20;
    startGame();
    timerHolder();
  }