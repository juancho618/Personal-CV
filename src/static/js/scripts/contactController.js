/**
 * Created by Juancho on 4/16/2017.
 */

angular.module('myCVApp').controller('contactController', ['$scope', '$http', function($scope, $http) {
    $scope.contact={};
    $scope.submitForm = function (isValid) {
        console.log($scope.contact);


        if (isValid) {
            $http({
                method: 'post',
                url: '/contact',
                data: $scope.contact,
                headers: {'Content-Type': 'application/json'}
            }).then(function success(response) {
                swal("Thanks!", "I will reply you ASAP!", "success");
            }, function error(response) {
                swal("Invalid Data!", "Please fill in the right information!", "error");
            });
         } else {
            swal("Invalid Data!", "Please fill in the right information!", "error");
        }
    }
}])