(function () {
    'use strict';

    var selectedChar = '';
    var $characterBoxes = $('.character-box');
    
    $characterBoxes.click(function () {
        var selectedCharacter = this;
        var $charBox = $('.character-box');
        var selectionNdx = $charBox.index(this);
        var characterSelector = 'ul#your-character-list';
        var $selectedChild= $(characterSelector).children().eq(selectionNdx);
        var numOfCharacters = $(characterSelector).children().length;

        // remove all characters except selected character from character choice section
        for (var currCharacterNdx = 0; currCharacterNdx <= numOfCharacters; ++currCharacterNdx) {
            if (currCharacterNdx !== selectionNdx) {
                $charBox.eq(currCharacterNdx).remove();    
            }
        }
    });
})();