//link to live version


Instructions:
-Warfare Tactics is a singleplayer/two player turn based strategy game that takes place on a 2D grid system.
-Each player is given a set of playable units with which they must use to move and attack the enemy player's units in a turn based fashion.
-The player that eliminates the opposing side's units first, wins the game.

-There are currently 3 different types of units that will be on a player's team (rifleman, sniper and RPG). Each unit type may have slightly different stats/attributes from each other (attack, health, defense, weapon type, items, movement)
-The playable units will alternate turns. The player can take action when it is one of their units turns.
-Each turn, the player can choose to move and/or attack with their unit (item usage and the defend mechanism have not yet been added)
-The player can hover over individual units with their mouse in order to display its attributes and current stats on the right side window.
-After selecting the move button, the player must move their unit to a valid square using the arrow keys. There will be a move counter displayed on the right that shows how many moves that unit has left. Once the counter reaches zero, the unit must either attack or end their turn.
-When selecting the attack button, the player will then be prompted to select an attack target. They must then click on an enemy unit within their unit's attack range.
-After a successful attack, the turn will end and go to the next.
-When a units health reaches 0, it is removed from the grid. When all the units on one side have been eliminated, the game will end.

![gameImages](https://i.imgur.com/lcPceFX.png)
![gameImages2](https://i.imgur.com/IhwsZW3.png)

Technologies/Libraries:
-Canvas
-Game Assets (tiles and character sprites) from craftpix (https://craftpix.net/product/tds-modern-soldiers-and-vehicles-sprites-2/?utm_source=facebook&utm_medium=social&utm_campaign=myself&fbclid=IwAR1jYFnz9pj71adgy14R8FHe96OM5cgRCA3SvoHttJgbf-vO69k9dQuID6A)

Technical Implementations:
-Units display stats on the side when hovered over (grid is also hoverable, but just doesnt display anythign yet)
-Turn counter and current units turn displayed on the top right.
-Attacking a unit lowers its health.
-Can move units with arrow keys.
-Can press buttons choosing between move, attack, and end turn.

ToDos/future features:
-Add attack animations
-Add walk and death animations
-Title screen
-Multiple levels with level selector screen
-Usage of items and defense mechanism
-Detect blocking objects on the grid when making an attack
-Better fonts/visuals
