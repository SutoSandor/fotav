////////////////////////////////////////////////////////////
// CANVAS
////////////////////////////////////////////////////////////
var stage
var canvasW=0;
var canvasH=0;

/*!
 * 
 * START GAME CANVAS - This is the function that runs to setup game canvas
 * 
 */
function initGameCanvas(w,h){
	var gameCanvas = document.getElementById("gameCanvas");
	gameCanvas.width = w;
	gameCanvas.height = h;
	
	canvasW=w;
	canvasH=h;
	stage = new createjs.Stage("gameCanvas");
	
	createjs.Touch.enable(stage);
	stage.enableMouseOver(20);
	stage.mouseMoveOutside = true;
	
	createjs.Ticker.setFPS(60);
	createjs.Ticker.addEventListener("tick", tick);	
}

var canvasContainer, mainContainer, gameContainer, piercesContainer, pipesContainer, stageContainer, resultContainer;
var background, logo, instruction1, instruction2, stageDisplay, stageTitleShadowTxt, stageTitleTxt, buttonPipeMain, buttonPipeOpenerMain, pierceBlock, pierceEntrance, pierceExit, pierceSlow, pierceStraight, pierceCorner, pierceHidden, pierceDrag, buttonPipeGame, buttonPipeOpenerGame, buttonPipeResult, buttonPipeOpenerResult, buttonFacebook, buttonTwitter, buttonGoogle, resultShareTxt, resultTitleTxt, resultTitleShadowTxt, resultScoreTxt, resultScoreShadowTxt;

/*!
 * 
 * BUILD GAME CANVAS ASSERTS - This is the function that runs to build game canvas asserts
 * 
 */
function buildGameCanvas(){
	canvasContainer = new createjs.Container();
	mainContainer = new createjs.Container();
	piercesContainer = new createjs.Container();
	pipesContainer = new createjs.Container();
	stageContainer = new createjs.Container();
	gameContainer = new createjs.Container();
	resultContainer = new createjs.Container();
	
	background = new createjs.Bitmap(loader.getResult('background'));
	
	logo = new createjs.Bitmap(loader.getResult('logo'));
	instruction1 = new createjs.Bitmap(loader.getResult('instruction1'));
	instruction2 = new createjs.Bitmap(loader.getResult('instruction2'));
	stageDisplay = new createjs.Bitmap(loader.getResult('stageDisplay'));
	
	stageTitleTxt = new createjs.Text();
    //stageTitleTxt.font = "80px impactedmedium";
	stageTitleTxt.font = "80px Helvetica";
	stageTitleTxt.color = "#D3D2D5";
	stageTitleTxt.text = resultScoreText;
	stageTitleTxt.textAlign = "center";
	stageTitleTxt.textBaseline='alphabetic';
	stageTitleTxt.x = canvasW/2;
	stageTitleTxt.y = canvasH/100*48;
	
	stageTitleShadowTxt = new createjs.Text();
    //stageTitleShadowTxt.font = "80px impactedmedium";
	stageTitleShadowTxt.font = "80px Helvetica";
	stageTitleShadowTxt.color = "#929291";
	stageTitleShadowTxt.text = "";
	stageTitleShadowTxt.textAlign = "center";
	stageTitleShadowTxt.textBaseline='alphabetic';
	stageTitleShadowTxt.x = canvasW/2;
	stageTitleShadowTxt.y = stageTitleTxt.y + 8;

	buttonPipeMain = new createjs.Bitmap(loader.getResult('buttonPipe'));
	centerReg(buttonPipeMain);
	buttonPipeOpenerMain = new createjs.Bitmap(loader.getResult('buttonPipeOpener'));
	centerReg(buttonPipeOpenerMain);
	createHitarea(buttonPipeOpenerMain);
	
	buttonPipeMain.x = canvasW/2;
	buttonPipeMain.y = canvasH/100 * 73;
	buttonPipeOpenerMain.x = buttonPipeMain.x;
	buttonPipeOpenerMain.y = buttonPipeMain.y;
	
	pierceBlock = new createjs.Bitmap(loader.getResult('pierceBlock'));
	centerReg(pierceBlock);
	pierceEntrance = new createjs.Bitmap(loader.getResult('pierceEntrance'));
	centerReg(pierceEntrance);
	pierceExit = new createjs.Bitmap(loader.getResult('pierceExit'));
	centerReg(pierceExit);
	pierceSlow = new createjs.Bitmap(loader.getResult('pierceSlow'));
	centerReg(pierceSlow);
	pierceStraight = new createjs.Bitmap(loader.getResult('pierceStraight'));
	centerReg(pierceStraight);
	pierceCorner = new createjs.Bitmap(loader.getResult('pierceCorner'));
	centerReg(pierceCorner);
	pierceHidden = new createjs.Bitmap(loader.getResult('pierceHidden'));
	centerReg(pierceHidden);
	
	pierceBlock.x = pierceEntrance.x = pierceExit.x = pierceSlow.x = pierceStraight.x = pierceCorner.x = pierceHidden.x = -100;
	
	pierceDrag = new createjs.Shape();
	pierceDrag.graphics.beginFill(pierceBackgroundColour);
	pierceDrag.graphics.moveTo(-(pierceData.width/2), -(pierceData.width/2));
	pierceDrag.graphics.lineTo((pierceData.width/2), -(pierceData.width/2));
	pierceDrag.graphics.lineTo((pierceData.width/2), (pierceData.width/2));
	pierceDrag.graphics.lineTo(-(pierceData.width/2), (pierceData.width/2));
	pierceDrag.graphics.lineTo(-(pierceData.width/2), -(pierceData.width/2));
	pierceDrag.graphics.endFill();
	
	buttonPipeGame = new createjs.Bitmap(loader.getResult('buttonPipe'));
	centerReg(buttonPipeGame);
	buttonPipeGame.rotation = 90;
	buttonPipeOpenerGame = new createjs.Bitmap(loader.getResult('buttonPipeOpener'));
	centerReg(buttonPipeOpenerGame);
	createHitarea(buttonPipeOpenerGame);
	
	buttonPipeGame.scaleX = buttonPipeGame.scaleY = buttonPipeOpenerGame.scaleX = buttonPipeOpenerGame.scaleY = .6;
	
	//result
	resultTitleTxt = new createjs.Text();
    //resultTitleTxt.font = "110px impactedmedium";
	resultTitleTxt.font = "110px Helvetica";
	resultTitleTxt.color = "#e3e6d4";
	resultTitleTxt.text = resultTitleText;
	resultTitleTxt.textAlign = "center";
	resultTitleTxt.textBaseline='alphabetic';
	resultTitleTxt.x = canvasW/2;
	resultTitleTxt.y = canvasH/100*27;

	resultTitleShadowTxt = new createjs.Text();
    //resultTitleShadowTxt.font = "110px impactedmedium";
	resultTitleShadowTxt.font = "110px Helvetica";
	resultTitleShadowTxt.color = "#b0b188";
	resultTitleShadowTxt.text = "";
	resultTitleShadowTxt.textAlign = "center";
	resultTitleShadowTxt.textBaseline='alphabetic';
	resultTitleShadowTxt.x = canvasW/2;
	resultTitleShadowTxt.y = resultTitleTxt.y + 10;

	resultScoreTxt = new createjs.Text();
    //resultScoreTxt.font = "160px impactedmedium";
	resultScoreTxt.font = "0px Helvetica";
	resultScoreTxt.color = "#b0b188";
	resultScoreTxt.text = "";
	resultScoreTxt.textAlign = "center";
	resultScoreTxt.textBaseline='alphabetic';
	resultScoreTxt.x = canvasW/2;
	resultScoreTxt.y = canvasH/100*44;
	
	resultScoreShadowTxt = new createjs.Text();
    //resultScoreShadowTxt.font = "160px impactedmedium";
	resultScoreShadowTxt.font = "160px Helvetica";
	resultScoreShadowTxt.color = "#888758";
	resultScoreShadowTxt.text = 100;
	resultScoreShadowTxt.textAlign = "center";
	resultScoreShadowTxt.textBaseline='alphabetic';
	resultScoreShadowTxt.x = canvasW/2;
	resultScoreShadowTxt.y = resultScoreTxt.y + 10;

	resultShareTxt = new createjs.Text();
	resultShareTxt.font = "45px Helvetica";
	resultShareTxt.color = "#e3e6d4";
	resultShareTxt.text = "";
	resultShareTxt.textAlign = "center";
	resultShareTxt.textBaseline='alphabetic';
	resultShareTxt.x = canvasW/2;
	resultShareTxt.y = canvasH/100*55;
	
      /*
	buttonFacebook = new createjs.Bitmap(loader.getResult('buttonFacebook'));
	buttonTwitter = new createjs.Bitmap(loader.getResult('buttonTwitter'));
	buttonGoogle = new createjs.Bitmap(loader.getResult('buttonGoogle'));
    centerReg(buttonFacebook);
	createHitarea(buttonFacebook);
	centerReg(buttonTwitter);
	createHitarea(buttonTwitter);
	centerReg(buttonGoogle);
	createHitarea(buttonGoogle);
	buttonFacebook.x = canvasW/100*42;
	buttonTwitter.x = canvasW/2;
	buttonGoogle.x = canvasW/100*58;
	buttonFacebook.y = buttonTwitter.y = buttonGoogle.y = canvasH/100 * 63;
	*/
	buttonPipeResult = new createjs.Bitmap(loader.getResult('buttonPipe'));
	centerReg(buttonPipeResult);
	buttonPipeOpenerResult = new createjs.Bitmap(loader.getResult('buttonPipeOpener'));
	centerReg(buttonPipeOpenerResult);
	createHitarea(buttonPipeOpenerResult);
	
	buttonPipeResult.x = canvasW/2;
	buttonPipeResult.y = canvasH/100 * 80;
	buttonPipeOpenerResult.x = buttonPipeResult.x;
	buttonPipeOpenerResult.y = buttonPipeResult.y;
	
	mainContainer.addChild(logo, buttonPipeMain, buttonPipeOpenerMain);
	stageContainer.addChild(stageDisplay, stageTitleShadowTxt, stageTitleTxt);
	gameContainer.addChild(pierceEntrance, pierceExit, pierceSlow, pierceStraight, pierceCorner, pierceHidden, piercesContainer, buttonPipeGame, buttonPipeOpenerGame, pipesContainer, stageContainer, instruction1, instruction2);
	resultContainer.addChild(resultShareTxt, buttonFacebook, buttonTwitter, buttonGoogle, resultTitleShadowTxt, resultTitleTxt, resultScoreShadowTxt, resultScoreTxt, buttonPipeResult, buttonPipeOpenerResult);
	if(shareEnable){
		resultContainer.addChild(resultShareTxt, buttonFacebook, buttonTwitter, buttonGoogle);	
	}
	canvasContainer.addChild(background, mainContainer, gameContainer, resultContainer);
	stage.addChild(canvasContainer);
	
	resizeCanvas();
}


/*!
 * 
 * RESIZE GAME CANVAS - This is the function that runs to resize game canvas
 * 
 */
function resizeCanvas(){
 	if(canvasContainer!=undefined){
		//scoreTxt.x = canvasW-offset.x;
		//scoreTxt.y = offset.y;
		//scoreTxt.x -= 20;
		//scoreTxt.y += 80;
	}
}

/*!
 * 
 * REMOVE GAME CANVAS - This is the function that runs to remove game canvas
 * 
 */
 function removeGameCanvas(){
	 stage.autoClear = true;
	 stage.removeAllChildren();
	 stage.update();
	 createjs.Ticker.removeEventListener("tick", tick);
	 createjs.Ticker.removeEventListener("tick", stage);
 }

/*!
 * 
 * CANVAS LOOP - This is the function that runs for canvas loop
 * 
 */ 
function tick(event) {
	updateGame();
	stage.update(event);
}

/*!
 * 
 * CANVAS MISC FUNCTIONS
 * 
 */
function centerReg(obj){
	obj.regX=obj.image.naturalWidth/2;
	obj.regY=obj.image.naturalHeight/2;
}

function createHitarea(obj){
	obj.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#000").drawRect(0, 0, obj.image.naturalWidth, obj.image.naturalHeight));	
}