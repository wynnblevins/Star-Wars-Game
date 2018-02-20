(function () {
    'use strict';

    var $characterPics = $('.character-picture');
    $characterPics.click(function () {
        console.log($('.character-picture').index(this));   
    });
})();