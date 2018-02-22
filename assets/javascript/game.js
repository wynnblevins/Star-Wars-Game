(function () {
    'use strict';

    $(document).ready(function () {
        var selectedChar = '';
        var $unselected = $('.unselected');
        var $enemySection = $('#enemy-list');
        var $targetEnemy = null, $enemy = null; 
        var $defenderSection = $('#defender-section');
        var selectionNdx = null;
        

        $unselected.click(function () {
            var selectedCharacter = this;
            var $charBox = $('.unselected');
            selectionNdx = $charBox.index(this);
            var characterSelector = 'div#character-list';
            var $selectedChild = $(characterSelector).children().eq(selectionNdx);
            var numOfCharacters = $(characterSelector).children().length;
            
            for (var currCharacterNdx = 0; currCharacterNdx < numOfCharacters; ++currCharacterNdx) {
                if (currCharacterNdx !== selectionNdx) {
                    $enemy = $charBox.eq(currCharacterNdx).detach();
                    $enemy.addClass('available-enemy');
                    $enemySection.append($enemy);
                }
            }

            // remove unselected css class and unselected event handler
            $charBox.removeClass('unselected');
            $('.unselected').off();
        });

        // user has clicked on an enemy character
        $($enemySection).delegate(".available-enemy", "click", function(){
            
            var $charBox = $('.available-enemy');
            selectionNdx = $charBox.index(this);
            var $selectedChild = $($enemySection).children().eq(selectionNdx);
            $selectedChild.detach();
            $selectedChild.removeClass('available-enemy');
            $selectedChild.addClass('defender');
            $($defenderSection).append($selectedChild);
        });

        $('#attack-button').click(function () {
            console.log('hello world!');    
        });
    });
    
})();