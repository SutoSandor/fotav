////////////////////////////////////////////////////////////
// GAME
////////////////////////////////////////////////////////////

/*!
 * 
 * GAME SETTING CUSTOMIZATION START
 * 
 */
var pierceFillColour = '#ff0202'; //'#02afff'; //water colour
var pierceBackgroundColour = '#9EB7B7'; // #b79e9e background colour

var resultTitleText = 'Eredmény:'; //text for result page title
var resultScoreText = '[NUMBER]. szint'; //text for result page score

var levels_arr = {speed:10, //water tween speed
					speedIncrease:1, //water tween speed increase
					speedUpdateCount:2, //level update count (complete 2 stages to increase speed)
					block:3, //total block pierce
					blockIncrease:2, //total block pierce increase
					blockUpdateCount:3,
					hidden:10, //total hidden pierce in percent
					hiddenIncrease:10, //total hidden pierce in percent increase
					hiddenUpdateCount:1}; //level update count (complete 1 stages to increase hidden pierce)

//Social share, [SCORE] will replace with game score
var shareEnable = false;
var shareText ='share your score'; //text for share instruction
var shareTitle = 'Highscore on Plumber Pipe Game is Stage [SCORE]';//social share score title
var shareMessage = 'Stage [SCORE] is mine new highscore on Plumber Pipe Game! Try it now!'; //social share score message


/*!
 *
 * GAME SETTING CUSTOMIZATION END
 *
 */
var gameData = {speed:15, hidden:0, level:0, end:false, speedUpdateCount:0, speedUpdateCountNum:0, blockUpdateCount:0, blockUpdateCountNum:0, hiddenUpdateCount:0, hiddenUpdateCountNum:0, try:0};
var pierceData = {column:8, row:5, width:100, block:5, slow:3, array:[], hidden_arr:[], grid:'', path:[], blockCount:0, slowCount:0, start:{pierce:'', x:0,y:0}, end:{pierce:'', x:0,y:0}, targetDrag:'', dragX:'', dragY:'', dragging:false, release:false};
var animateData = {x:0, y:0, targetPierce:''};
var switchRange = 50;

/*!
 * 
 * GAME BUTTONS - This is the function that runs to setup button event
 * 
 */
function buildGameButton(){
	buttonPipeOpenerMain.cursor = "pointer";
	buttonPipeOpenerMain.addEventListener("click", function(evt) {
		releaseWaterMain();
	});
	
	instruction1.cursor = "pointer";
	instruction1.addEventListener("click", function(evt) {
		toggleInstruction(2);
	});
	
	instruction2.cursor = "pointer";
	instruction2.addEventListener("click", function(evt) {
		var touchX = (evt.stageX / scalePercent);
		if(touchX < canvasW/2){
			toggleInstruction(1);
		}else{
			startReleaseWater();	
		}
	});
	
	buttonPipeOpenerGame.cursor = "pointer";
	buttonPipeOpenerGame.addEventListener("click", function(evt) {
		releaseWater();
	});
	/*
	buttonFacebook.cursor = "pointer";
	buttonFacebook.addEventListener("click", function(evt) {
		share('facebook');
	});
    buttonTwitter.cursor = "pointer";
	buttonTwitter.addEventListener("click", function(evt) {
		share('twitter');
	});
	buttonGoogle.cursor = "pointer";
	buttonGoogle.addEventListener("click", function(evt) {
		share('google');
	});
    */
	
	buttonPipeOpenerResult.cursor = "pointer";
	buttonPipeOpenerResult.addEventListener("click", function(evt) {
		releaseWaterResult();
	});
}

/*!
 * 
 * DISPLAY PAGES - This is the function that runs to display pages
 * 
 */
var curPage=''
function goPage(page){
	curPage=page;
	
	mainContainer.visible=false;
	gameContainer.visible=false;
	resultContainer.visible=false;
	
	var targetContainer = ''
	switch(page){
		case 'main':
			targetContainer = mainContainer;
			buttonPipeOpenerMain.rotation = 0;
		break;
		
		case 'game':
			targetContainer = gameContainer;
			startGame();
		break;
		
		case 'result':
			targetContainer = resultContainer;
			buttonPipeOpenerResult.rotation = 0;
			playSound('soundResult');
			stopGame();
			saveGame(gameData.level);
		break;
	}
	
	targetContainer.alpha=0;
	targetContainer.visible=true;
	$(targetContainer)
	.clearQueue()
	.stop(true,true)
	.animate({ alpha:1 }, 500);
}

/*!
 * 
 * START GAME - This is the function that runs to start play game
 * 
 */
function startGame(){
	toggleStageDisplay(false);
	gameData.level = 1;
	gameData.speed = levels_arr.speed;
	gameData.speedUpdateCount = levels_arr.speedUpdateCount;
	gameData.speedUpdateCountNum = 0;
	pierceData.block = levels_arr.block;
	gameData.blockUpdateCount = levels_arr.blockUpdateCount;
	gameData.blockUpdateCountNum = 0;
	gameData.hidden = levels_arr.hidden;
	gameData.hiddenUpdateCount = levels_arr.hiddenUpdateCount;
	gameData.hiddenUpdateCountNum = 0;
	
	gameData.end = false;
	pierceData.dragging = false;
	
	toggleInstruction(1);
	gameData.try = 0;
	generateGrid();
}

function toggleInstruction(page){
	instruction1.visible = false;
	instruction2.visible = false;
	
	if(page == 1){
		instruction1.visible = true;
	}else if(page == 2){
		instruction2.visible = true;	
	}
}

function toggleStageDisplay(con){
    //stageTitleShadowTxt.text = stageTitleTxt.text = resultScoreText.replace('[NUMBER]',gameData.level);
	stageTitleTxt.text = resultScoreText.replace('[NUMBER]',gameData.level);
	stageContainer.visible = con;
	
	var alpha = con == true ? 1 : 0;
	stageContainer.alpha = con == true ? 0 : 1;
	TweenMax.to(stageContainer, .5, {alpha:alpha, overwrite:true});
}

 /*!
 * 
 * STOP GAME - This is the function that runs to stop play game
 * 
 */
function stopGame(){
	clearGrid();
}


function saveGame(score){
	/*$.ajax({
      type: "POST",
      url: 'saveResults.php',
      data: {score:score},
      success: function (result) {
          console.log(result);
      }
    });*/
}

function endGame(){
	resultScoreTxt.text = resultScoreShadowTxt.text = resultScoreText.replace('[NUMBER]',gameData.level);
	
	TweenMax.to(gameContainer, .5, {overwrite:true, onComplete:function(){
		playSound('soundFail');
		TweenMax.to(gameContainer, 2, {overwrite:true, onComplete:function(){
			goPage('result');
		}});
	}});
}

 /*!
 * 
 * GAME LOOP - This is the function that runs to loop game
 * 
 */
function updateGame(){
	
}

/*!
 * 
 * GENERATE GRID - This is the function that runs to generate grid
 * 
 */
function generateGrid(){
	if(gameData.try > 5){
		alert('infinite loop');
		return;	
	}
	
	gameData.try++;
	clearGrid();
	gameData.end = false;
	pierceData.release = false;
	pierceData.blockCount = pierceData.block;
	pierceData.slowCount = pierceData.slow;

	pierceData.array = [];
	pierceData.grid = new PF.Grid(pierceData.column, pierceData.row);
	
	var startX = (canvasW/2) - ((pierceData.column * pierceData.width) / 2);
	var startY = (canvasH/2) - ((pierceData.row * pierceData.width) / 2);
	startX += pierceData.width/2;
	startY += pierceData.width/2;
	var posX = startX;
	var posY = startY;
	
	for(r = 0; r < pierceData.row; r++){
		pierceData.array[r] = [];
		posX = startX;
		for(c = 0; c < pierceData.column; c++){
			createPierce(r, c, posX, posY);
			posX += pierceData.width;
		}
		posY += pierceData.width;
	}
	
	if(randomBoolean()){
		pierceData.start.x = 0;
		pierceData.start.y = Math.floor(Math.random()*pierceData.row);
		pierceData.end.x = pierceData.column-1;
		pierceData.end.y = Math.floor(Math.random()*pierceData.row);	
	}else{
		pierceData.end.x = 0;
		pierceData.end.y = Math.floor(Math.random()*pierceData.row);
		pierceData.start.x = pierceData.column-1;
		pierceData.start.y = Math.floor(Math.random()*pierceData.row);	
	}
	
	createPierceExtra();
	generateBlock();
	
}

function clearGrid(){
	TweenMax.killAll();
	piercesContainer.removeAllChildren();
	pipesContainer.removeAllChildren();
}

/*!
 * 
 * CREATE PIERCE - This is the function that runs to setup pierce
 * 
 */
function createPierce(r, c, x, y){
	var pierce = new createjs.Shape();
	var fill = new createjs.Shape();
	pierceData.array[r][c] = pierce;
	
	pierce.row = r;
	pierce.column = c;
	pierce.x = x;
	pierce.y = y;
	
	fill.x = x;
	fill.y = y;
	pierce.fill = fill;
	pierce.fillPercent = 0;
	pierce.walkable = true;
	
	pierce.graphics.beginFill(pierceBackgroundColour);
	pierce.graphics.moveTo(-(pierceData.width/2), -(pierceData.width/2));
	pierce.graphics.lineTo((pierceData.width/2), -(pierceData.width/2));
	pierce.graphics.lineTo((pierceData.width/2), (pierceData.width/2));
	pierce.graphics.lineTo(-(pierceData.width/2), (pierceData.width/2));
	pierce.graphics.lineTo(-(pierceData.width/2), -(pierceData.width/2));
	pierce.graphics.endFill();
	
	piercesContainer.addChild(pierce, fill);
	
	pierce.cursor = "pointer";
	pierce.addEventListener("click", function(evt) {
		console.log(evt.target.directionFrom+' '+evt.target.directionTo);
	});
}

function createPierceExtra(){
	var pierceStart = new createjs.Shape();
	var fillStart = new createjs.Shape();
	var pierceEnd = new createjs.Shape();
	var fillEnd = new createjs.Shape();
	var targetPierceStart = pierceData.array[pierceData.start.y][pierceData.start.x];
	var targetPierceEnd = pierceData.array[pierceData.end.y][pierceData.end.x];
	
	if(pierceData.start.x == 0){
		pierceStart.x = targetPierceStart.x - (pierceData.width);
	}else{
		pierceStart.x = targetPierceStart.x + (pierceData.width);
	}
	if(pierceData.end.x == 0){
		pierceEnd.x = targetPierceEnd.x - (pierceData.width);
	}else{
		pierceEnd.x = targetPierceEnd.x + (pierceData.width);
	}
	pierceStart.y = targetPierceStart.y;
	pierceEnd.y = targetPierceEnd.y;
	
	fillStart.x = pierceStart.x;
	fillStart.y = pierceStart.y;
	pierceStart.fill = fillStart;
	pierceStart.fillPercent = 0;
	
	fillEnd.x = pierceEnd.x;
	fillEnd.y = pierceEnd.y;
	pierceEnd.fill = fillEnd;
	pierceEnd.fillPercent = 0;
	
	pierceStart.graphics.beginFill(pierceBackgroundColour);
	pierceStart.graphics.moveTo(-(pierceData.width/2), -(pierceData.width/2));
	pierceStart.graphics.lineTo((pierceData.width/2), -(pierceData.width/2));
	pierceStart.graphics.lineTo((pierceData.width/2), (pierceData.width/2));
	pierceStart.graphics.lineTo(-(pierceData.width/2), (pierceData.width/2));
	pierceStart.graphics.lineTo(-(pierceData.width/2), -(pierceData.width/2));
	pierceStart.graphics.endFill();
	
	pierceEnd.graphics.beginFill(pierceBackgroundColour);
	pierceEnd.graphics.moveTo(-(pierceData.width/2), -(pierceData.width/2));
	pierceEnd.graphics.lineTo((pierceData.width/2), -(pierceData.width/2));
	pierceEnd.graphics.lineTo((pierceData.width/2), (pierceData.width/2));
	pierceEnd.graphics.lineTo(-(pierceData.width/2), (pierceData.width/2));
	pierceEnd.graphics.lineTo(-(pierceData.width/2), -(pierceData.width/2));
	pierceEnd.graphics.endFill();
	
	pierceData.start.pierce = pierceStart;
	pierceData.end.pierce = pierceEnd;
	
	piercesContainer.addChild(pierceStart, fillStart, pierceEnd, fillEnd);
}

/*!
 * 
 * GENERATE PIPES - This is the function that runs to generate pipes
 * 
 */
function generatePipes(){
	pierceData.hidden_arr = [];
	for(r = 0; r < pierceData.row; r++){
		for(c = 0; c < pierceData.column; c++){
			createPipe(r, c);
		}
	}
	
	shuffle(pierceData.hidden_arr);
	
	var totalPierce = pierceData.row*pierceData.column;
	var totalHidden = Math.floor(gameData.hidden * totalPierce / 100);
	totalHidden = totalHidden > totalPierce ? totalPierce : totalHidden;
	for(n=0;n<totalHidden;n++){
		pierceData.hidden_arr[n].visible = true;
	}
	
	createPipeExtra();
}

/*!
 * 
 * CREATE PIPE - This is the function that runs to create pipe
 * 
 */
function createPipe(r, c){
	var pipeType_arr = ['straight','corner'];
	var direction_arr = ['up','right','down','left'];
	
	var pierce = pierceData.array[r][c];
	if(pierce.type == undefined){
		pierce.type = pipeType_arr[Math.floor(Math.random()*pipeType_arr.length)];
	}
	
	if(pierce.directionFrom == undefined){
		pierce.directionFrom = direction_arr[Math.floor(Math.random()*direction_arr.length)];
	}
	
	if(pierce.directionTo == undefined){
		if(pierce.type == 'straight' || pierce.type == 'slow'){
			if(pierce.directionFrom == 'up'){
				pierce.directionTo = 'down';
			}else if(pierce.directionFrom == 'right'){
				pierce.directionTo = 'left';
			}else if(pierce.directionFrom == 'down'){
				pierce.directionTo = 'up';
			}else if(pierce.directionFrom == 'left'){
				pierce.directionTo = 'right';
			}
		}else if(pierce.type == 'corner'){
			var side = randomBoolean();
			if(pierce.directionFrom == 'up'){
				if(side){
					pierce.directionTo = 'right';
				}else{
					pierce.directionTo = 'left';	
				}
			}else if(pierce.directionFrom == 'right'){
				if(side){
					pierce.directionTo = 'up';
				}else{
					pierce.directionTo = 'down';	
				}
			}else if(pierce.directionFrom == 'down'){
				if(side){
					pierce.directionTo = 'right';
				}else{
					pierce.directionTo = 'left';	
				}
			}else if(pierce.directionFrom == 'left'){
				if(side){
					pierce.directionTo = 'up';
				}else{
					pierce.directionTo = 'down';	
				}
			}
		}
	}
	
	var pipe = getPipeType(pierce.type, pierce.directionFrom, pierce.directionTo);
	pipe.x = pierce.x;
	pipe.y = pierce.y;
	pierce.pipe = pipe;
	pierce.fill.rotation = pipe.rotation;
	pierce.fill.scaleX = pipe.scaleX;
	
	pipesContainer.addChild(pipe);
	buildDragAndDrop(pipe);
	
	var hidden = pierceHidden.clone();
	hidden.x = pierce.x;
	hidden.y = pierce.y;
	hidden.visible = false;
	pipesContainer.addChild(hidden);
	
	hidden.cursor = "pointer";
	hidden.addEventListener("click", function(evt) {
		playSound('soundOpen');
		evt.target.visible = false;
	});
	
	pierceData.hidden_arr.push(hidden);
	pierce.hidden = hidden;
}

function createPipeExtra(){
	var pierceStart = pierceData.start.pierce;
	var pierceEnd = pierceData.end.pierce;
	
	pierceStart.type = 'entrance';
	pierceEnd.type = 'exit';
	
	if(pierceData.start.x == 0){
		pierceStart.directionFrom = 'left';
		pierceStart.directionTo = 'right';
	}else{
		pierceStart.directionFrom = 'right';
		pierceStart.directionTo = 'left';
	}
	if(pierceData.end.x == 0){
		pierceEnd.directionFrom = 'right';
		pierceEnd.directionTo = 'left';
	}else{
		pierceEnd.directionFrom = 'left';
		pierceEnd.directionTo = 'right';
	}
	
	var pipeStart = getPipeType(pierceStart.type, pierceStart.directionFrom);
	pipeStart.x = pierceStart.x;
	pipeStart.y = pierceStart.y;
	pierceStart.pipe = pipeStart;
	pierceStart.fill.rotation = pipeStart.rotation;
	pierceStart.fill.scaleX = pipeStart.scaleX;
	
	var pipeEnd = getPipeType(pierceEnd.type, pierceEnd.directionFrom);
	pipeEnd.x = pierceEnd.x;
	pipeEnd.y = pierceEnd.y;
	pierceEnd.pipe = pipeEnd;
	pierceEnd.fill.rotation = pipeEnd.rotation;
	pierceEnd.fill.scaleX = pipeEnd.scaleX;
	
	pipesContainer.addChild(pipeStart, pipeEnd);
	buttonPipeGame.x = pierceStart.x;
	
	if(pierceStart.y > canvasH/2){
		buttonPipeGame.y = pierceStart.y - 155;
	}else{
		buttonPipeGame.y = pierceStart.y + 155;
	}
	
	buttonPipeOpenerGame.x = buttonPipeGame.x;
	buttonPipeOpenerGame.y = buttonPipeGame.y;
	buttonPipeOpenerGame.rotation = 0;
}

/*!
 * 
 * DRAG AND DROP EVENTS - This is the function that runs to setup drag and drop events
 * 
 */
function buildDragAndDrop(obj){
	obj.cursor = "pointer";
	obj.addEventListener("mousedown", function(evt) {
		getDragPierce(evt.target);
		if(pierceData.array[pierceData.dragY][pierceData.dragX].type != 'block' && pierceData.array[pierceData.dragY][pierceData.dragX].fillPercent == 0 && !gameData.end){
			playSound('soundDrag');
			toggleDragEvent(evt, 'drag');
		}
	});
	obj.addEventListener("pressmove", function(evt) {
		if(pierceData.array[pierceData.dragY][pierceData.dragX].type != 'block' && pierceData.array[pierceData.dragY][pierceData.dragX].fillPercent == 0 && pierceData.dragging && !gameData.end){
			toggleDragEvent(evt, 'move');
		}
	});
	obj.addEventListener("pressup", function(evt) {
		if(pierceData.array[pierceData.dragY][pierceData.dragX].type != 'block' && pierceData.array[pierceData.dragY][pierceData.dragX].fillPercent == 0 && pierceData.dragging && !gameData.end){
			playSound('soundDrop');
			toggleDragEvent(evt, 'release');
		}
	});	
}

function toggleDragEvent(obj, con){
	switch(con){
		case 'drag':
			var pipeNum = Math.floor(Math.random()*2)+1;
			playSound('soundPipe'+pipeNum);
			
			pipesContainer.addChild(pierceDrag);
			pierceDrag.x = obj.target.x;
			pierceDrag.y = obj.target.y;
			
			obj.target.parent.addChild(obj.target);
			obj.target.offset = {x:obj.target.x-obj.stageX, y:obj.target.y-obj.stageY};
			obj.target.oldX = obj.target.x;
			obj.target.oldY = obj.target.y;
			pierceData.targetDrag = obj.target;
			pierceData.dragging = true;
		break;
		
		case 'move':
			obj.target.x = obj.stageX + obj.target.offset.x;
			obj.target.y = obj.stageY + obj.target.offset.y;
			pierceDrag.x = obj.target.x;
			pierceDrag.y = obj.target.y;
		break;
		
		case 'release':
			checkHitPierce();
		break;
	}
}

function getDragPierce(obj){
	for(r = 0; r < pierceData.row; r++){
		for(c = 0; c < pierceData.column; c++){
			var targetPierce = pierceData.array[r][c];
			if(targetPierce.pipe == obj){
				pierceData.dragX = c;
				pierceData.dragY = r;
			}
		}	
	}
}

function checkHitPierce(){
	var hitCon = false;
	for(r = 0; r < pierceData.row; r++){
		for(c = 0; c < pierceData.column; c++){
			var targetPierce = pierceData.array[r][c];
			var pointPierce = pierceData.targetDrag.globalToLocal(targetPierce.x, targetPierce.y);
			if(pierceData.targetDrag.hitTest(pointPierce.x, pointPierce.y)){
				
				if(targetPierce.pipe != pierceData.targetDrag && !targetPierce.hidden.visible && targetPierce.fillPercent == 0 && targetPierce.type != 'block'){
					if(pierceData.targetDrag.x >= targetPierce.x - (switchRange/2) && pierceData.targetDrag.x <= targetPierce.x + (switchRange/2)){
						if(pierceData.targetDrag.y >= targetPierce.y - (switchRange/2) && pierceData.targetDrag.y <= targetPierce.y + (switchRange/2)){
							hitCon = true;
							releasePierce();
							
							var currentPierce = pierceData.array[pierceData.dragY][pierceData.dragX];
							pierceData.array[r][c] = currentPierce;
							pierceData.array[pierceData.dragY][pierceData.dragX] = targetPierce;
							
							var holdX = pierceData.array[pierceData.dragY][pierceData.dragX].x;
							var holdY = pierceData.array[pierceData.dragY][pierceData.dragX].y;
							
							//change to new position
							pierceData.array[pierceData.dragY][pierceData.dragX].x = pierceData.array[pierceData.dragY][pierceData.dragX].fill.x = pierceData.array[pierceData.dragY][pierceData.dragX].pipe.x = pierceData.array[r][c].x;
							pierceData.array[pierceData.dragY][pierceData.dragX].y = pierceData.array[pierceData.dragY][pierceData.dragX].fill.y = pierceData.array[pierceData.dragY][pierceData.dragX].pipe.y = pierceData.array[r][c].y;
							
							pierceData.array[r][c].x = pierceData.array[r][c].fill.x = pierceData.array[r][c].pipe.x = holdX;
							pierceData.array[r][c].y = pierceData.array[r][c].fill.y = pierceData.array[r][c].pipe.y = holdY;
						}	
					}
				}
			};
		}
	}
	
	if(!hitCon){
		releasePierce();
	}
}

function releasePierce(){
	var pipeNum = Math.floor(Math.random()*2)+1;
	playSound('soundPipe'+pipeNum);
			
	pierceData.dragging = false;
	pierceData.targetDrag.x = pierceData.targetDrag.oldX;
	pierceData.targetDrag.y = pierceData.targetDrag.oldY;
	pipesContainer.removeChild(pierceDrag);
}

/*!
 * 
 * GET TYPE OF PIPE - This is the function that runs to return type of pipe
 * 
 */
function getPipeType(type, from, to){
	var pipe;
	if(type == 'straight'){
		pipe = pierceStraight.clone();
	}else if(type == 'slow'){
		pipe = pierceSlow.clone();
	}else if(type == 'corner'){
		pipe = pierceCorner.clone();
	}else if(type == 'block'){
		pipe = pierceBlock.clone();
	}else if(type == 'entrance'){
		pipe = pierceEntrance.clone();
	}else if(type == 'exit'){
		pipe = pierceExit.clone();
	}
	
	if(from == 'up'){
		pipe.rotation = 0;
	}else if(from == 'right'){
		pipe.rotation = 90;
	}else if(from == 'down'){
		pipe.rotation = 180;
	}else if(from == 'left'){
		pipe.rotation = 270;
	}
	
	if(from == 'up'){
		if(to == 'left'){
			pipe.scaleX = -1;
		}
	}else if(from == 'right'){
		if(to == 'up'){
			pipe.scaleX = -1;
		}
	}else if(from == 'down'){
		if(to == 'right'){
			pipe.scaleX = -1;
		}
	}else if(from == 'left'){
		if(to == 'down'){
			pipe.scaleX = -1;
		}
	}
	return pipe;
}

/*!
 * 
 * GENERATE BLOCK PIPE - This is the function that runs to generate block
 * 
 */
function generateBlock(){
	if(pierceData.blockCount <= 0){
		generateSlow();
	}else{
		var randowColumn = Math.floor(Math.random()*pierceData.column);
		var randomRow = Math.floor(Math.random()*pierceData.row);
		
		if(pierceData.array[randomRow][randowColumn].walkable){
			pierceData.array[randomRow][randowColumn].type = 'block';
			pierceData.array[randomRow][randowColumn].directionFrom = '';
			pierceData.array[randomRow][randowColumn].directionTo = '';
			pierceData.array[randomRow][randowColumn].walkable = false;
			pierceData.grid.setWalkableAt(randowColumn, randomRow, false);
			pierceData.blockCount--;
		}
		generateBlock();
	}
}

/*!
 * 
 * GENERATE SLOW PIPE - This is the function that runs to generate slow pipe
 * 
 */
function generateSlow(){
	if(pierceData.slowCount <= 0){
		generatePath();
	}else{
		var randowColumn = Math.floor(Math.random()*pierceData.column);
		var randomRow = Math.floor(Math.random()*pierceData.row);
		
		if(pierceData.array[randomRow][randowColumn].walkable && pierceData.array[randomRow][randowColumn].type != 'slow'){
			pierceData.array[randomRow][randowColumn].type = 'slow';
			pierceData.slowCount--;
		}
		generateSlow();
	}
}

/*!
 * 
 * GENERATE PATH - This is the function that runs to generate path from entrance to exit
 * 
 */
function generatePath(){
	var finder = new PF.AStarFinder({
		allowDiagonal: false
	});
	
	pierceData.path = finder.findPath(pierceData.start.x, pierceData.start.y, pierceData.end.x, pierceData.end.y, pierceData.grid);
	if(pierceData.path.length == 0){
		generateGrid();
	}else{
		var type;
		var directionTo='';
		var directionFrom='right';
		var directionEnd='left';
		
		if(pierceData.start.x == 0){
			directionFrom = 'left';	
			directionEnd = 'right';
		}
		
		for (i=0; i<pierceData.path.length; i++) {
			var y = Number(pierceData.path[i][1]);
			var x = Number(pierceData.path[i][0]);
			var targetPierce = pierceData.array[y][x];
			
			if(i<pierceData.path.length-1){
				var ny = Number(pierceData.path[i+1][1]);
				var nx = Number(pierceData.path[i+1][0]);
			}
			
			if(i == pierceData.path.length-1){
				directionTo = directionEnd;
			}else{
				if(nx < x){
					directionTo = 'left';	
				}else if(nx > x){
					directionTo = 'right';	
				}
				if(ny < y){
					directionTo = 'up';	
				}else if(ny > y){
					directionTo = 'down';	
				}
			}
			
			if((directionFrom == 'left' && directionTo == 'right') || (directionFrom == 'right' && directionTo == 'left')){
				targetPierce.type = 'straight';
				targetPierce.directionFrom = directionFrom;
			}else if((directionFrom == 'up' && directionTo == 'down') || (directionFrom == 'down' && directionTo == 'up')){
				targetPierce.type = 'straight';
				targetPierce.directionFrom = directionFrom;
			}else{
				targetPierce.type = 'corner';
				targetPierce.directionFrom = directionFrom;
				targetPierce.directionTo = directionTo;
			}
			
			if(directionTo == 'up'){
				directionFrom = 'down';
			}else if(directionTo == 'right'){
				directionFrom = 'left';
			}else if(directionTo == 'down'){
				directionFrom = 'up';
			}else if(directionTo == 'left'){
				directionFrom = 'right';
			}
		}
		
		randomizePathPierces();
		generatePipes();
		//generateHidden();
		
		if(!instruction1.visible && !instruction2.visible){
			findNextAnimatePierce();	
		}
	}
}

function startReleaseWater(){
	toggleInstruction(0);
	findNextAnimatePierce();
}

function generateHidden(){
	pierceData.hidden_arr = [];
	for(r = 0; r < pierceData.row; r++){
		for(c = 0; c < pierceData.column; c++){
			var targetPierce = pierceData.array[r][c];
			var hidden = pierceHidden.clone();
			hidden.x = targetPierce.x;
			hidden.y = targetPierce.y;
			hidden.visible = false;
			pipesContainer.addChild(hidden);
			
			hidden.cursor = "pointer";
			hidden.addEventListener("click", function(evt) {
				evt.target.visible = false;
			});
			
			pierceData.hidden_arr.push(hidden);
		}
	}
	
	shuffle(pierceData.hidden_arr);
	
	var totalPierce = pierceData.row*pierceData.column;
	var toatlHidden = Math.floor(gameData.hidden * totalPierce / 100);
	toatlHidden = toatlHidden > totalPierce ? totalPierce : toatlHidden;
	for(n=0;n<toatlHidden;n++){
		pierceData.hidden_arr[n].visible = true;	
	}
	
}

/*!
 * 
 * RANDOMIZE PATH PIERCES  - This is the function that runs to randomize path pierces
 * 
 */
function randomizePathPierces(){
	for (i=0; i<pierceData.path.length; i++) {
		var y = Number(pierceData.path[i][1]);
		var x = Number(pierceData.path[i][0]);
		var targetPierce = pierceData.array[y][x];
		
		var newX = Math.floor(Math.random()*pierceData.column);
		var newY = Math.floor(Math.random()*pierceData.row);
		var changePierce = pierceData.array[newY][newX];
		
		if(changePierce.type != 'block'){
			changePierce.column = x;
			changePierce.row = y;
			
			changePierce.column = newX;
			changePierce.row = newY;
			
			pierceData.array[y][x] = changePierce;
			pierceData.array[newY][newX] = targetPierce;
			
			var holdX = pierceData.array[newY][newX].x;
			var holdY = pierceData.array[newY][newX].y;
			
			//change to new position
			pierceData.array[newY][newX].x = pierceData.array[newY][newX].fill.x = pierceData.array[y][x].x;
			pierceData.array[newY][newX].y = pierceData.array[newY][newX].fill.y = pierceData.array[y][x].y;
			
			pierceData.array[y][x].x = pierceData.array[y][x].fill.x = holdX;
			pierceData.array[y][x].y = pierceData.array[y][x].fill.y = holdY;
		}
	}
}

/*!
 * 
 * FIND NEXT ANIMATE PIERCES  - This is the function that runs to find next animate pierces
 * 
 */
function findNextAnimatePierce(){
	var animateThrought = false;
	var oldDirection = '';
	if(pierceData.start.pierce.fillPercent == 0){
		//start
		animateData.x = pierceData.path[0][1];
		animateData.y = pierceData.path[0][0];
		animateData.targetPierce = pierceData.start.pierce;
		animateThrought = true;
	}else if(pierceData.array[animateData.x][animateData.y].fillPercent == 0){
		//start pierce
		oldDirection = animateData.targetPierce.directionTo;
		animateData.targetPierce = pierceData.array[animateData.x][animateData.y];
		if(checkConnectPipe(oldDirection, animateData.targetPierce)){
			animateThrought = true;
		}else{
			gameData.end = true;
			endGame();	
		}
	}else if(animateData.x == pierceData.path[pierceData.path.length-1][1] && animateData.y == pierceData.path[pierceData.path.length-1][0]){
		//last pierce
		oldDirection = animateData.targetPierce.directionTo;
		animateData.targetPierce = pierceData.end.pierce;
		if(animateData.targetPierce.fillPercent == 100){
			gameData.end = true;
			updateLevel();
		}else{
			if(checkConnectPipe(oldDirection, animateData.targetPierce)){
				animateThrought = true;
			}else{
				gameData.end = true;
				endGame();	
			}
		}
	}else{
		//next pierce
		oldDirection = animateData.targetPierce.directionTo;
		
		if(animateData.targetPierce.directionTo == 'up'){
			animateData.x--;		
		}else if(animateData.targetPierce.directionTo == 'right'){
			animateData.y++;
		}else if(animateData.targetPierce.directionTo == 'down'){
			animateData.x++;	
		}else if(animateData.targetPierce.directionTo == 'left'){
			animateData.y--;
		}
		
		if(animateData.x >= 0 && animateData.x < pierceData.row && animateData.y >= 0 && animateData.y < pierceData.column){
			animateData.targetPierce = pierceData.array[animateData.x][animateData.y];
			if(checkConnectPipe(oldDirection, animateData.targetPierce)){
				animateThrought = true;
			}else{
				console.log('stop');
				gameData.end = true;
				endGame();
			}
		}else{
			console.log('out range');
			gameData.end = true;
			endGame();
		}
	}
	
	if(animateThrought){
		animatePierce();
	}
}

 /*!
 * 
 * CHECK CONNECT PIPES - This is the function that runs to check and fix connect pipe
 * 
 */
function checkConnectPipe(oldDirection, targetPierce){
	if(oldDirection == 'right' && targetPierce.directionFrom == 'left' && targetPierce.directionTo == 'right'){
		//linear
		return true;
	}else if(oldDirection == 'right' && targetPierce.directionFrom == 'right' && targetPierce.directionTo == 'left'){
		//linear
		targetPierce.directionFrom = 'left';
		targetPierce.directionTo = 'right';
		targetPierce.fill.rotation = 270;
		return true;
	}else if(oldDirection == 'left' && targetPierce.directionFrom == 'right' && targetPierce.directionTo == 'left'){
		//linear
		return true;
	}else if(oldDirection == 'left' && targetPierce.directionFrom == 'left' && targetPierce.directionTo == 'right'){
		//linear
		targetPierce.directionFrom = 'right';
		targetPierce.directionTo = 'left';
		targetPierce.fill.rotation = 90;
		return true;
	}else if(oldDirection == 'down' && targetPierce.directionFrom == 'up' && targetPierce.directionTo == 'down'){
		//linear
		return true;
	}else if(oldDirection == 'down' && targetPierce.directionFrom == 'down' && targetPierce.directionTo == 'up'){
		//linear
		targetPierce.directionFrom = 'up';
		targetPierce.directionTo = 'down';
		targetPierce.fill.rotation = 0;
		return true;
	}else if(oldDirection == 'up' && targetPierce.directionFrom == 'down' && targetPierce.directionTo == 'up'){
		//linear
		return true;
	}else if(oldDirection == 'up' && targetPierce.directionFrom == 'up' && targetPierce.directionTo == 'down'){
		//linear
		targetPierce.directionFrom = 'down';
		targetPierce.directionTo = 'up';
		targetPierce.fill.rotation = 180;
		return true;
	}else if(oldDirection == 'right' && targetPierce.directionFrom == 'left' && targetPierce.directionTo == 'up'){
		return true;
	}else if(oldDirection == 'right' && targetPierce.directionFrom == 'up' && targetPierce.directionTo == 'left'){
		targetPierce.directionFrom = 'left';
		targetPierce.directionTo = 'up';
		targetPierce.fill.scaleX = 1;
		targetPierce.fill.rotation = 270;
		return true;
	}else if(oldDirection == 'right' && targetPierce.directionFrom == 'left' && targetPierce.directionTo == 'down'){
		return true;
	}else if(oldDirection == 'right' && targetPierce.directionFrom == 'down' && targetPierce.directionTo == 'left'){
		targetPierce.directionFrom = 'left';
		targetPierce.directionTo = 'down';
		targetPierce.fill.scaleX = -1;
		targetPierce.fill.rotation = 270;
		return true;
	}else if(oldDirection == 'up' && targetPierce.directionFrom == 'down' && targetPierce.directionTo == 'right'){
		return true;
	}else if(oldDirection == 'up' && targetPierce.directionFrom == 'right' && targetPierce.directionTo == 'down'){
		targetPierce.directionFrom = 'down';
		targetPierce.directionTo = 'right';
		targetPierce.fill.scaleX = -1;
		targetPierce.fill.rotation = 180;
		return true;
	}else if(oldDirection == 'up' && targetPierce.directionFrom == 'down' && targetPierce.directionTo == 'left'){
		return true;
	}else if(oldDirection == 'up' && targetPierce.directionFrom == 'left' && targetPierce.directionTo == 'down'){
		targetPierce.directionFrom = 'down';
		targetPierce.directionTo = 'left';
		targetPierce.fill.scaleX = 1;
		targetPierce.fill.rotation = 180;
		return true;
	}else if(oldDirection == 'down' && targetPierce.directionFrom == 'up' && targetPierce.directionTo == 'right'){
		return true;
	}else if(oldDirection == 'down' && targetPierce.directionFrom == 'right' && targetPierce.directionTo == 'up'){
		targetPierce.directionFrom = 'up';
		targetPierce.directionTo = 'right';
		targetPierce.fill.scaleX = 1;
		targetPierce.fill.rotation = 0;
		return true;
	}else if(oldDirection == 'down' && targetPierce.directionFrom == 'up' && targetPierce.directionTo == 'left'){
		return true;
	}else if(oldDirection == 'down' && targetPierce.directionFrom == 'left' && targetPierce.directionTo == 'up'){
		targetPierce.directionFrom = 'up';
		targetPierce.directionTo = 'left';
		targetPierce.fill.scaleX = -1;
		targetPierce.fill.rotation = 0;
		return true;
	}else if(oldDirection == 'left' && targetPierce.directionFrom == 'right' && targetPierce.directionTo == 'up'){
		return true;
	}else if(oldDirection == 'left' && targetPierce.directionFrom == 'up' && targetPierce.directionTo == 'right'){
		targetPierce.directionFrom = 'right';
		targetPierce.directionTo = 'up';
		targetPierce.fill.scaleX = -1;
		targetPierce.fill.rotation = 90;
		return true;
	}else if(oldDirection == 'left' && targetPierce.directionFrom == 'right' && targetPierce.directionTo == 'down'){
		return true;
	}else if(oldDirection == 'left' && targetPierce.directionFrom == 'down' && targetPierce.directionTo == 'right'){
		targetPierce.directionFrom = 'right';
		targetPierce.directionTo = 'down';
		targetPierce.fill.scaleX = 1;
		targetPierce.fill.rotation = 90;
		return true;
	}else{
		return false;	
	}
}

 /*!
 * 
 * ANIMATE PIERCE - This is the function that runs to animate pierces
 * 
 */
function animatePierce(){
	var tweenSpeedNum = gameData.speed;
	if(animateData.targetPierce.type == 'slow'){
		tweenSpeedNum *= 1.5;	
	}
	
	if(pierceData.release){
		tweenSpeedNum = .1;
	}
	
	if(pierceData.dragging && animateData.targetPierce.pipe == pierceData.targetDrag){
		console.log('release');
		releasePierce();
	}
	
	TweenMax.to(animateData.targetPierce, tweenSpeedNum, {fillPercent:100, overwrite:true, ease:Linear.easeNone, onUpdate:updatePierceFill, onComplete:function(){
		findNextAnimatePierce();
	}});
}

function speedAnimatePierce(){
	playSound('soundRelease');
	pierceData.release = true;
	TweenMax.killTweensOf(animateData.targetPierce);
	animatePierce();	
}

function updatePierceFill(){
	var targetPierce = animateData.targetPierce;
	targetPierce.fill.graphics.clear();
	targetPierce.fill.graphics.beginFill(pierceFillColour);
	
	var percent = Math.floor(targetPierce.fillPercent);
	if(targetPierce.type == 'straight' || targetPierce.type == 'slow' || targetPierce.type == 'entrance' || targetPierce.type == 'exit'){
		percent -= pierceData.width/2;
		targetPierce.fill.graphics.moveTo(-(pierceData.width/2), -(pierceData.width/2));
		targetPierce.fill.graphics.lineTo((pierceData.width/2), -(pierceData.width/2));
		targetPierce.fill.graphics.lineTo((pierceData.width/2), (percent));
		targetPierce.fill.graphics.lineTo(-(pierceData.width/2), (percent));
		targetPierce.fill.graphics.lineTo(-(pierceData.width/2), -(pierceData.width/2));
	}else{
		if(percent <= 50){
			percent = percent * 2;
			percent -= pierceData.width/2;
			targetPierce.fill.graphics.moveTo(-(pierceData.width/2), -(pierceData.width/2));
			targetPierce.fill.graphics.lineTo((pierceData.width/2), -(pierceData.width/2));
			targetPierce.fill.graphics.lineTo((pierceData.width/2), -(pierceData.width/2));
			targetPierce.fill.graphics.lineTo(-(pierceData.width/2), (percent));
			targetPierce.fill.graphics.lineTo(-(pierceData.width/2), -(pierceData.width/2));		
		}else{
			percent -= 50;
			targetPierce.fill.graphics.moveTo(-(pierceData.width/2), -(pierceData.width/2)); //tl
			targetPierce.fill.graphics.lineTo((pierceData.width/2), -(pierceData.width/2)); //tr
			targetPierce.fill.graphics.lineTo(-(pierceData.width/2) + (percent*2), (pierceData.width/2)); //br
			targetPierce.fill.graphics.lineTo(-(pierceData.width/2), (pierceData.width/2)); //bl
			targetPierce.fill.graphics.lineTo(-(pierceData.width/2), -(pierceData.width/2));	//tl	
		}
	}
	
	targetPierce.fill.graphics.endFill();
}

 /*!
 * 
 * RELEASE WATER ANIMATION - This is the function that runs to play release water animation
 * 
 */
function releaseWaterResult(){
	if(buttonPipeOpenerResult.rotation == 0){
		playSound('soundHandle');
		TweenMax.to(buttonPipeOpenerResult, .5, {rotation:360, overwrite:true, onComplete:function(){
			goPage('game');	
		}});	
	}	
}

function releaseWaterMain(){
	if(buttonPipeOpenerMain.rotation == 0){
		playSound('soundHandle');
		TweenMax.to(buttonPipeOpenerMain, .5, {rotation:360, overwrite:true, onComplete:function(){
			goPage('game');	
		}});	
	}	
}

function releaseWater(){
	if(!gameData.end){
		speedAnimatePierce();
	}
	
	if(buttonPipeOpenerGame.rotation == 0){
		playSound('soundHandle');
		TweenMax.to(buttonPipeOpenerGame, .5, {rotation:360, overwrite:true});	
	}
}

 /*!
 * 
 * UPDATE LEVEL - This is the function that runs to update level
 * 
 */
function updateLevel(){
	playSound('soundSuccess');
	
	TweenMax.to(gameContainer, 1, {overwrite:true, onComplete:function(){
		toggleStageDisplay(true);
		
		gameData.level++;
		gameData.speedUpdateCountNum++;
		gameData.blockUpdateCountNum++;
		gameData.hiddenUpdateCountNum++;
		
		if(gameData.speedUpdateCountNum >= gameData.speedUpdateCount){
			gameData.speedUpdateCountNum = 0;
			gameData.speed -= levels_arr.speedIncrease;
		}
		
		if(gameData.blockUpdateCountNum >= gameData.blockUpdateCount){
			gameData.blockUpdateCountNum = 0;
			pierceData.block += levels_arr.blockIncrease;
		}
		
		if(gameData.hiddenUpdateCountNum >= gameData.hiddenUpdateCount){
			gameData.hiddenUpdateCountNum = 0;
			gameData.hidden += levels_arr.hiddenIncrease;
		}
		
		TweenMax.to(gameContainer, 2, {overwrite:true, onComplete:function(){
			toggleStageDisplay(false);
			gameData.try = 0;
			generateGrid();
		}});
	}});
}


/*!
 * 
 * SHARE - This is the function that runs to open share url
 * 
 */
function share(action){
	var loc = location.href
	loc = loc.substring(0, loc.lastIndexOf("/") + 1);
	var title = '';
	var text = '';
	
	title = shareTitle.replace("[SCORE]", gameData.level);
	text = shareMessage.replace("[SCORE]", gameData.level);
	var shareurl = '';
	
	if( action == 'twitter' ) {
		shareurl = 'https://twitter.com/intent/tweet?url='+loc+'&text='+text;
	}else if( action == 'facebook' ){
		shareurl = 'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(loc+'share.php?desc='+text+'&title='+title+'&url='+loc+'&thumb='+loc+'share.jpg&width=590&height=300');
	}else if( action == 'google' ){
		shareurl = 'https://plus.google.com/share?url='+loc;
	}
	
	window.open(shareurl);
}