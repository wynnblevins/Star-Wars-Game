(function () {
    'use strict';

    var selectedChar = '';
    var $characterPics = $('.character-picture');
    
    $characterPics.click(function () {
        var ndx = $('.character-picture').index(this);
        
        if (ndx === 0) {
            selectedChar = 'Luke Skywalker';
        } else if (ndx === 1) {
            selectedChar = 'The Emperor';
        } else if (ndx === 2) {
            selectedChar = 'Obi Wan Kenobi';
        } else if (ndx === 3) {
            selectedChar = 'Darth Vader';
        }

        console.log(selectedChar);
    });
})();