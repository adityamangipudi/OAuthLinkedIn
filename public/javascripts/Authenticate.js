/**
 * Created by adityamangipudi1 on 5/15/15.
 */
$(function(){

    $('button').click(function(e){
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/auth/linkedin');
        xhr.send();
    });

});
