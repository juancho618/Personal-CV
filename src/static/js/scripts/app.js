/**
 * Created by Juancho on 2/19/2017.
 */
var app = angular.module("myCVApp", ['ngAnimate']);

app.controller('mainCtrl', function ($scope, $http) {
    // Initial values

    $scope.asideMenu = true;
    $scope.showMainBlock = true;
    $scope.menuBtn = true;
    $scope.mainBlock = "col-md-10 main-block";
    $scope.classAside = "col-md-2";
    $scope.toggleStatus = function (status) {
        if (status == 'hide') {
            $scope.menuBtn = false;
            $scope.showMainBlock = false;
            $scope.asideMenu = false;
            $scope.mainBlock = "col-md-12 main-block";
            $scope.showMainBlock = true;
        } else {
            $scope.menuBtn = true;
            $scope.asideMenu = true;
            $scope.mainBlock = "col-md-10 main-block";
        }
    }
    $scope.randomFact = function () {
        var facts =[ "My favorite color is green (as you can notice in my web site 😝)",
            "I named my Dog Pythagoras",
            "Enjoy the sound of the rain",
            "I am 1,93 meters tall",
            "My favorite cocktail is Mojito",
            "I used to play Underwater Rugby",
            "The first programming language that I learnt is C++",
            "I found once a golden ring in the ocean",
            "My favorite animal is the spider",
            "I don't like pineapple in my pizza",
            "I enjoy sour candies",
            "My favorite coffee method is the Chemex",
            "O.o"];
        var picked = facts[Math.floor(Math.random()*facts.length)];
        $scope.fact = picked;
    }
    $scope.randomFact();

});
/*
app.controller('contactController', function ($scope, $http) {


});*/