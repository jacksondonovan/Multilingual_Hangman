var app = angular.module('hang',[]);

app.controller('hangCTRL',function($scope){
  $scope.play = true;
  $scope.totalGuess = 6;
  $scope.correctGuesses = [];
  $scope.incorrectGuesses = [];
  $scope.wordBank = ['jack','boxes','three','lingo','hanger','queen','mouse','foolish','wolf','background','number'];
  $scope.currentWord = $scope.wordBank[Math.floor(Math.random()*$scope.wordBank.length)];
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
      };
      if($scope.totalGuess === 0){
        $scope.endingMsg = 'YOU LOSE'
      }
    }
  }

  $scope.reset = function(){
    $scope.currentWord = $scope.wordBank[Math.floor(Math.random()*$scope.wordBank.length)];
    $scope.goneWord = $scope.disappear($scope.currentWord);
    $scope.guess = "";
    $scope.totalGuess = 6;
    $scope.play = true;
    $scope.endingMsg = "";
    $scope.correctGuesses = [];
    $scope.incorrectGuesses = [];
  }



})
