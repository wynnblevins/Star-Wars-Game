(function () {
    'use strict';

    $(document).ready(function () {
        var selectedChar = '';
        var $unselected = $('.unselected');
        var $enemySection = $('#enemy-list');
        var $targetEnemy = null, $enemy = null, $currentEnemy = null; 
        var $defenderSection = $('#defender-section');
        var selectionNdx = null;
        var baseAttackPower = 6;
        var $playerCharacter, $enemy = null;

        // initialize character array
        var characters = [
            { name: 'Luke Skywalker', hp: 120, isPlayerCharacter: false, attackPower: 6, counterAttackPower: 6 },
            { name: 'The Emperor', hp: 150, isPlayerCharacter: false, attackPower: 20, counterAttackPower: 12 },
            { name: 'Obi Wan Kenobi', hp: 130, isPlayerCharacter: false, attackPower: 10, counterAttackPower: 8 },
            { name: 'Darth Vader', hp: 140, isPlayerCharacter: false, attackPower: 15, counterAttackPower: 10 }
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
                } else {
                    $playerCharacter = $(characterSelector).children().eq(selectionNdx);
                    $playerCharacter.characterObject = characters[selectionNdx];
                    $playerCharacter.isPlayerCharacter = true;  
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

            characters[selectionNdx];

            $enemy = $($enemySection).children().eq(selectionNdx);
            $enemy.characterObject = characters[selectionNdx];
            $enemy.detach();
            $enemy.removeClass('available-enemy');
            $enemy.addClass('defender');
            $($defenderSection).append($enemy);
        });

        $('#attack-button').click(function () {            
            // subtract attack power from enemy hp
            
            // double players attack power
            $playerCharacter.characterObject.attackPower *= 2;

            // subtract enemy's counter attack power from player's hp
            $playerCharacter.characterObject.hp -= $enemy.characterObject.counterAttackPower;

            alert('Your HP: ' + $playerCharacter.characterObject.hp);
            alert('Enemy HP: ' + $enemy.characterObject.hp);
        });
    });
    
})();