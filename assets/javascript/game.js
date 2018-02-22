(function () {
    'use strict';

    $(document).ready(function () {
        var selectedChar = '';
        var $unselected = $('.unselected');
        var $enemySection = $('#enemy-list');
        var $targetEnemy = null, $enemy = null; 
        var $defenderSection = $('#defender-section');
        var selectionNdx = null;
        
        // initialize character array
        var characters = [
            { name: 'Luke Skywalker', hp: 120, isPlayerCharacter: false },
            { name: 'The Emperor', hp: 150, isPlayerCharacter: false },
            { name: 'Obi Wan Kenobi', hp: 130, isPlayerCharacter: false },
            { name: 'Darth Vader', hp: 140, isPlayerCharacter: false }
        ];

        // display character name
        $('.character-name-text').each(function (index, value) {
            $(value).text(characters[index].name);        
        });

        // display character hp
        $('.character-hp').each(function (index, value) {
            $(value).text(characters[index].hp);        
        });

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
            
        });
    });
    
})();