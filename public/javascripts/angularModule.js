/**
 * Created by Chris on 5/18/2015.
 */

angular.module('myApp.menu', []).controller('MenuController', function ($scope, $http){
    $scope.profile = {};
    $scope.getProfile = function(){
        $http.get('/auth/profile').success(function (data, status, headers) {
            if(data) console.log(data);
        });
    }

    $scope.editProfile = function(){
        $('#editProfile').modal('show');
    }

    $scope.postProfile = function(){
        $http.post('/auth/profile', $scope.profile).success(function (data, status, headers) {
            if(data) console.log(data);
        });
        $scope.profile = {};
        $('#editProfile').modal('hide');

    };
});