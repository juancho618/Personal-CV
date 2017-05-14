
angular.module('myCVApp').controller('xorController', ['$scope', '$http', function($scope, $http) {
    $scope.bits={};

    $scope.submitForm = function (isValid) {
        if (isValid) {
            $http({
                method: 'post',
                url: '/nn',
                data: $scope.bits,
                headers: {'Content-Type': 'application/json'}
            }).then(function success(response) {
                $scope.bits.output = response.data;
                swal("Success!", "The predicted values is: " + response.data, "success");
            }, function error(response) {
                swal("Invalid Data!", "Please fill in the right information!", "error");
            });
        } else {
            swal("Invalid Data!", "Please fill in the right information!", "error");
        }
    }
}])

