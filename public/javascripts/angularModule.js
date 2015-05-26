/**
 * Created by Chris on 5/18/2015.
 */

angular.module('myApp.menu', []).controller('MenuController', function ($scope, $http){
    $scope.profile = {};
    var navBar = document.querySelectorAll('ul.nav > li');

    $scope.getMain = function(){
        if(!$('#mainNav').hasClass('active')) {
            setActiveClass('#mainNav');
        }
    };

    $scope.getProfile = function() {
        var queries = ':(first-name,summary,specialties,positions)';
        //console.log('is authorized: ', IN.User.isAuthorized());
        //IN.User.refresh();
        // /companies/1337/updates?start=20&count=10&format=json/
        // people-search?keywords=Yap?format=json
        // /people/~
        /*IN.API.Raw('people/id=4mql1B9BA4').result(function(data){
            console.log('LinkedIn API Hard: ');
            console.log(data);
        });*/

        if(!$('#profileNav').hasClass('active')) {
            setActiveClass('#profileNav');
            $http.get('/auth/profile').success(function (data, status, headers) {
                if (data) {
                    console.log(data);
                    $scope.user = data;
                }
                IN.API.Raw('people/id='+ data['id']+ queries).result(function(data){
                    console.log('LinkedIn API: ');
                    console.log(data);
                });

            });
        }
    };

    $scope.editProfile = function(){
        if(!$('#editNav').hasClass('active')) {
            setActiveClass('#editNav');
        }
    };

    $scope.postProfile = function(){
        $http.post('/auth/profile', $scope.profile).success(function (data, status, headers) {
            if(data) console.log(data);
        });
        $scope.profile = {};
        $('#editProfile').modal('hide');
    };

    $scope.loggingOut = function(){
        console.log('logging out?');
        IN.User.logout(function (){
            window.location.replace("/");
            console.log('Good bye!');
        });

    };

    function setActiveClass(className){
        for(var i = 0; i< navBar.length; i++){
            navBar[i].className = '';
            navBar[i].firstElementChild.className = '';
        }
        $(className).attr('class', 'active').parent().attr('class', 'active');
    }
});