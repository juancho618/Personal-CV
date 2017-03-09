/**
 * Created by Juancho on 2/19/2017.
 */
var app = angular.module("myCVApp", ['ngAnimate']);

app.controller('mainCtrl', function ($scope) {
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

});