function playSound(game,som,config){
	var music = game.sound.add(som,config);
	music.play();
	return music
}