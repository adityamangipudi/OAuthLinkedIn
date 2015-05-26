/**
 * Created by adityamangipudi1 on 5/15/15.
 */
$(function(){
    console.log('doc',document.cookie);

    if(typeof(IN.User) !== 'undefined' && IN.User.isAuthorized()){
        //redirect with session
        console.log('Gucci');
    }

    $('button').click(function(e){
        //var xhr = new XMLHttpRequest();
        console.log('authorize: ', IN.User.isAuthorized());
        if(!IN.User.isAuthorized()){
            IN.User.authorize(function(){
                //instead of window replace, use post?
                console.log(IN.User);

                //window.location.replace("/auth/authenticated");
                console.log('success:', IN.User.isAuthorized());
            });
        }
        else window.location.replace("/auth/authenticated");
    });

});
