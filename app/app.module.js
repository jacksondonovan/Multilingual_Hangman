var app = angular.module('hang',[]);

app.controller('hangCTRL',function($scope){
  $scope.play = true;
  $scope.answer = ""
  $scope.language;
  $scope.totalGuess = 6;
  $scope.correctGuesses = [];
  $scope.incorrectGuesses = [];
  $scope.wordBank = ['jack','boxes','three','lingo','hanger','queen','mouse','foolish','wolf','background','number'];
  $scope.wordBankSP = ['hola','uno','denada','taco','rojo','ocho','delicioso'];
  $scope.wordBankFR = ['bonjour','huit','cravate','chapeau','grenouille','chaise','plague','homme','maison'];

  if(!$scope.language){
    $scope.language = 'EN'
    $scope.currentWord = $scope.wordBank[Math.floor(Math.random()*$scope.wordBank.length)];
  }
  $scope.languageSelectEN = function(){
    $scope.language = 'EN'
    $scope.currentWord = $scope.wordBank[Math.floor(Math.random()*$scope.wordBank.length)];
    $scope.reset();
  }
  $scope.languageSelectSP = function(){
    $scope.language = 'SP'
    $scope.currentWord = $scope.wordBankSP[Math.floor(Math.random()*$scope.wordBankSP.length)];
    $scope.reset();
  }
  $scope.languageSelectFR = function(){
    $scope.language = 'FR'
    $scope.currentWord = $scope.wordBankFR[Math.floor(Math.random()*$scope.wordBankFR.length)];
    $scope.reset();
  }
  // $scope.currentWord = $scope.wordBank[Math.floor(Math.random()*$scope.wordBank.length)];
  $scope.appear = $scope.currentWord.split('');
  $scope.disappear = function(word){
    var brokenUpWord = word.split('');
    for(var i = 0; i < brokenUpWord.length; i++){
      brokenUpWord[i] = '_';
    }
    return brokenUpWord.join('');
  }
  $scope.goneWord = $scope.disappear($scope.currentWord);
  $scope.submitGuess = function(){
    if($scope.totalGuess > 0 && $scope.play){
      var splitter = $scope.currentWord.split('');
      var splitterGone = $scope.goneWord.split('');
      var counter = 0;
      for(var i = 0; i < splitter.length; i++){
        if(splitter[i] === $scope.guess){
          splitterGone[i] = $scope.guess;
          counter++;
        }
      }
      if(counter === 0){
        $scope.incorrectGuesses.push($scope.guess);
        $scope.totalGuess--;
      } else {
        $scope.correctGuesses.push($scope.guess)
      }
      $scope.guess = "";
      $scope.goneWord = splitterGone.join('')
      if(splitter.join('') === splitterGone.join('')){
        $scope.endingMsg = 'YOU WIN';
        $scope.play = false;
        $scope.answer = 'Correct Answer: ' + $scope.currentWord;
      };
      if($scope.totalGuess === 0){
        $scope.endingMsg = 'YOU LOSE'
        $scope.answer = 'Correct Answer: ' + $scope.currentWord;
      }
    }
  }

  $scope.reset = function(){
    if($scope.language === "EN"){
      $scope.currentWord = $scope.wordBank[Math.floor(Math.random()*$scope.wordBank.length)];
    }
    if($scope.language === "SP"){
      $scope.currentWord = $scope.wordBankSP[Math.floor(Math.random()*$scope.wordBankSP.length)];
    }
    if($scope.language === "FR"){
      $scope.currentWord = $scope.wordBankFR[Math.floor(Math.random()*$scope.wordBankFR.length)];
    }
    $scope.goneWord = $scope.disappear($scope.currentWord);
    $scope.guess = "";
    $scope.totalGuess = 6;
    $scope.play = true;
    $scope.endingMsg = "";
    $scope.correctGuesses = [];
    $scope.incorrectGuesses = [];
    $scope.answer = ""
  }
})
