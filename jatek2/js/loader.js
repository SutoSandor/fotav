////////////////////////////////////////////////////////////
// CANVAS LOADER
////////////////////////////////////////////////////////////

 /*!
 * 
 * START CANVAS PRELOADER - This is the function that runs to preload canvas asserts
 * 
 */
function initPreload(){
	toggleLoader(true);
	
	checkMobileEvent();
	
	$(window).resize(function(){
		resizeGameFunc();
	});
	resizeGameFunc();
	
	loader = new createjs.LoadQueue(false);
	manifest=[
			{src:'assets/background.png', id:'background'},
			{src:'assets/logo.png', id:'logo'},
			{src:'assets/instruction1.png', id:'instruction1'},
			{src:'assets/instruction2.png', id:'instruction2'},
			{src:'assets/button_pipe.png', id:'buttonPipe'},
			{src:'assets/button_pipe_opener.png', id:'buttonPipeOpener'},
			{src:'assets/pierce_block.png', id:'pierceBlock'},
			{src:'assets/pierce_start.png', id:'pierceEntrance'},
			{src:'assets/pierce_exit.png', id:'pierceExit'},
			{src:'assets/pierce_straight.png', id:'pierceStraight'},
			{src:'assets/pierce_slow.png', id:'pierceSlow'},
			{src:'assets/pierce_corner.png', id:'pierceCorner'},
			{src:'assets/pierce_hidden.png', id:'pierceHidden'},
			{src:'assets/stage.png', id:'stageDisplay'},
			{src:'assets/button_twitter.png', id:'buttonTwitter'},
			{src:'assets/button_google.png', id:'buttonGoogle'},
			{src:'assets/button_facebook.png', id:'buttonFacebook'}];
	
	soundOn = true;		
	if($.browser.mobile || isTablet){
		if(!enableMobileSound){
			soundOn=false;
		}
	}
	
	if(soundOn){
		manifest.push({src:'assets/sounds/basement.ogg', id:'musicBasement'});
		manifest.push({src:'assets/sounds/fail.ogg', id:'soundFail'});
		manifest.push({src:'assets/sounds/success.ogg', id:'soundSuccess'});
		manifest.push({src:'assets/sounds/handle.ogg', id:'soundHandle'});
		manifest.push({src:'assets/sounds/release.ogg', id:'soundRelease'});
		manifest.push({src:'assets/sounds/pipe1.ogg', id:'soundPipe1'});
		manifest.push({src:'assets/sounds/pipe2.ogg', id:'soundPipe2'});
		manifest.push({src:'assets/sounds/pipe3.ogg', id:'soundPipe3'});
		manifest.push({src:'assets/sounds/result.ogg', id:'soundResult'});
		manifest.push({src:'assets/sounds/open.ogg', id:'soundOpen'});
		
		createjs.Sound.alternateExtensions = ["mp3"];
		loader.installPlugin(createjs.Sound);
	}
	
	loader.addEventListener("complete", handleComplete);
	loader.addEventListener("fileload", fileComplete);
	loader.addEventListener("error",handleFileError);
	loader.on("progress", handleProgress, this);
	loader.loadManifest(manifest);
}

/*!
 * 
 * CANVAS FILE COMPLETE EVENT - This is the function that runs to update when file loaded complete
 * 
 */
function fileComplete(evt) {
	var item = evt.item;
	//console.log("Event Callback file loaded ", evt.item.id);
}

/*!
 * 
 * CANVAS FILE HANDLE EVENT - This is the function that runs to handle file error
 * 
 */
function handleFileError(evt) {
	console.log("error ", evt);
}

/*!
 * 
 * CANVAS PRELOADER UPDATE - This is the function that runs to update preloder progress
 * 
 */
function handleProgress() {
	$('#mainLoader span').html(Math.round(loader.progress/1*100)+' Betöltés');
}

/*!
 * 
 * CANVAS PRELOADER COMPLETE - This is the function that runs when preloader is complete
 * 
 */
function handleComplete() {
	toggleLoader(false);
	initMain();
};

/*!
 * 
 * TOGGLE LOADER - This is the function that runs to display/hide loader
 * 
 */
function toggleLoader(con){
	if(con){
		$('#mainLoader').show();
	}else{
		$('#mainLoader').hide();
	}
}