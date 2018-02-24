(function () {
    "use strict";

    $(document).ready(function () {
        var $initialState = $(".initialState");
        var $enemySection = $("#enemy-list");
        var $enemy = null; 
        var $defenderSection = $("#defender-section");
        var selectionNdx = null;
        var $playerCharacter;
        var enemies = [];
        var $charBoxes = null;
        
        // initialize character array
        var characters = [
            { name: "Luke Skywalker", 
              hp: 100, 
              isPlayerCharacter: false, 
              attackPower: 8, 
              counterAttackPower: 6,
              listItemClass: '.lukeLi' },
            { name: "The Emperor", 
              hp: 150, 
              isPlayerCharacter: false, 
              attackPower: 22, 
              counterAttackPower: 20,
              listItemClass: '.emporerLi' },
            { name: "Obi Wan Kenobi", 
              hp: 120, 
              isPlayerCharacter: false, 
              attackPower: 15, 
              counterAttackPower: 13,
              listItemClass: '.obiwanLi' },
            { name: "Darth Vader", 
              hp: 180, 
              isPlayerCharacter: false, 
              attackPower: 30, 
              counterAttackPower: 25,
              listItemClass: '.vaderLi' }
        ];

        function characterIsDead(hp) {
            if (hp <= 0) {
                return true;
            }
            return false;
        }

        function allEnemiesAreDead() {
            if (enemies.length <= 0) {
                return true;
            }
            return false;
        }

        function setNewEnemy(selectionNdx) {
            var selectedEnemy = enemies[selectionNdx];
            enemies.splice(selectionNdx, 1);
            var enemyCharacter = selectedEnemy; 
                        
            $enemy.data("characterObject", selectedEnemy);
            $enemy.detach();

            // adjusting css classes for jquery to use as selectors later
            $enemy.removeClass("available-enemy");
            $enemy.addClass("defender");

            // add the character to the defender section
            $($defenderSection).append($enemy);
        }

        // display character name
        $(".character-name-text").each(function (index, value) {
            $(value).text(characters[index].name);        
        });

        // display character hp
        $(".character-hp").each(function (index, value) {
            $(value).text(characters[index].hp);        
        });

        $(".initialState").on("click", function () {
            // get all divs surrounding char boxes (should be 4 of them aka 0, 1, 2, 3)
            $charBoxes = $(".initialState");
            
            // get index of selected div if darth vader itll be 3 if luke itll be 0
            selectionNdx = $charBoxes.index(this);
            
            // get total number of characters, should be === to 4
            var numOfCharacters = $("div#character-list").children().length;
            var $charObjs = $("div#character-list").children();

            // loop through characters 
            for (var currCharacterNdx = 0; currCharacterNdx < numOfCharacters; ++currCharacterNdx) {
                // if the current character isnt the character we clicked on a.k.a. our hero
                if (currCharacterNdx !== selectionNdx) {
                    // remove the clicked element from the DOM its position as a possible hero
                    $enemy = $charBoxes.eq(currCharacterNdx).detach();
                    
                    // give the clicked element the appropriate css class
                    $enemy.addClass("available-enemy");
                    
                    // put the unclicked element in the possible enemies section
                    $enemySection.append($enemy);
                    
                    // add the element to the list of possible enemies
                    enemies.push(characters[currCharacterNdx]);            
                } else {  // this is the element we clicked a.k.a. our hero
                    $playerCharacter = $charObjs.children().eq(selectionNdx);
                    console.log('Selection NDX: ' + selectionNdx);
                    console.log('Character List Children: ' + $("div#character-list > div").children().length);
                    
                    var mycharacter = characters[selectionNdx];
                    $playerCharacter.data("characterObject", mycharacter);  
                }
            }

            // remove initialState css class and initialState event handler
            $initialState.off("click");
            $charBoxes.removeClass("initialState");
        });

        // user has selected a available enemy character
        $($enemySection).delegate(".available-enemy", "click", function(){
            var $enemyBoxes = $(".available-enemy");
            selectionNdx = $enemyBoxes.index(this);
        
            // remove enemy
            var $children = $($enemySection).children();
            $enemy = $children.eq(selectionNdx);
            
            setNewEnemy(selectionNdx);
        });

        $("#attack-button").click(function () {            
            $playerCharacter.data("characterObject").hp -= $enemy.data("characterObject").counterAttackPower;
            $enemy.data("characterObject").hp -= $playerCharacter.data("characterObject").attackPower;

            // number update values on screen
            var playerCharObj = $($playerCharacter.data("characterObject"));
            var playerLiId = playerCharObj[0].listItemClass;
            var enemyObj = $($enemy.data("characterObject"));
            var enemyLiId = enemyObj[0].listItemClass;     
            $(playerLiId + ' > p.character-hp').text($playerCharacter.data("characterObject").hp - $enemy.data("characterObject").counterAttackPower);
            $(enemyLiId + ' > p.character-hp').text($enemy.data("characterObject").hp - $playerCharacter.data("characterObject").counterAttackPower);

            // double player attack power
            $playerCharacter.data("characterObject").attackPower *= 2; 
            
            var playerHp = $playerCharacter.data("characterObject").hp;
            var enemyHp = $enemy.data("characterObject").hp;

            if (allEnemiesAreDead()) {
                document.location.href = './gameover.html';
            } else if (characterIsDead(playerHp)) {
                document.location.href = './gameover.html';          
            } else if (characterIsDead(enemyHp)) {
                alert($playerCharacter.data("characterObject").name + " defeated " 
                    + $enemy.data("characterObject").name);

                $enemy.detach();
            } 
        });
    });
})();