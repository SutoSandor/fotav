<?php
$position = array("10","150","310","470","630","790","950","1110","1270","1430","1590","1750");
shuffle($position);
?>

<!doctype html>
<html lang="hu">
    <head>
        <meta charset="utf-8">
        <title>Mivel fűtünk? A hő előállításának anyagai</title>
        <link rel="stylesheet" href="js/jquery-ui.css">
        <style>
        
        @font-face {
            font-family: Hangyaboly;
            src: url(css/hangyaboly.ttf);
        }
        
            body{
                background-image: url("img/background_jatek2.png");
                background-repeat: no-repeat;
                margin: 0;
                padding: 0;
                font-family: "Helvetica";
                overflow: hidden;
            }

            #draggable01 {
                position: fixed;
                bottom: 20px;
                left: <?php echo $position[0]; ?>px;
                width: 150px;
                height: 114px;
                background-image: url("img/biomassza.png");
            }

            #draggable02 {
                position: fixed;
                bottom: 20px;
                left: <?php echo $position[1]; ?>px;
                width: 150px;
                height: 87px;
                background-image: url("img/szen.png");
            }

            #draggable03 {
                position: fixed;
                bottom: 20px;
                left: <?php echo $position[2]; ?>px;
                width: 100px;
                height: 134px;
                background-image: url("img/olaj.png");
            }

            #draggable04 {
                position: fixed;
                bottom: 20px;
                left: <?php echo $position[3]; ?>px;
                width: 150px;
                height: 82px;
                background-image: url("img/gaz.png");
            }

            #draggable05 {
                position: fixed;
                bottom: 20px;
                left: <?php echo $position[4]; ?>px;
                width: 130px;
                height: 144px;
                background-image: url("img/hulladekegetes.png");
            }

            #draggable06 {
                position: fixed;
                bottom: 20px;
                left: <?php echo $position[5]; ?>px;
                width: 150px;
                height: 73px;
                background-image: url("img/fa.png");
            }

            #draggable07 {
                position: fixed;
                bottom: 20px;
                left: <?php echo $position[6]; ?>px;
                width: 150px;
                height: 88px;
                background-image: url("img/szel.png");
            }

            #draggable08 {
                position: fixed;
                bottom: 20px;
                left: <?php echo $position[7]; ?>px;
                width: 130px;
                height: 133px;
                background-image: url("img/nap.png");
            }

            #draggable09 {
                position: fixed;
                bottom: 20px;
                left: <?php echo $position[8]; ?>px;
                width: 150px;
                height: 141px;
                background-image: url("img/geotermikus.png");
            }

            #draggable10 {
                position: fixed;
                bottom: 20px;
                left: <?php echo $position[9]; ?>px;
                width: 100px;
                height: 133px;
                background-image: url("img/pakura.png");
            }

            #draggable11 {
                position: fixed;
                bottom: 20px;
                left: <?php echo $position[10]; ?>px;
                width: 150px;
                height: 99px;
                background-image: url("img/biogaz.png");
            }

            #draggable12 {
                position: fixed;
                bottom: 20px;
                left: <?php echo $position[11]; ?>px;
                width: 130px;
                height: 124px;
                background-image: url("img/gumiabroncs.png");
            }

            #dropZone1, #dropZone2, #dropZone3 {
                position: fixed;
                top: 350px;
                width: 530px;
                height: 400px;
                color: #fff;
                padding: 10px;
            }

            .drop1{
                left: 42px;
            }

            .drop2{
                left: 686px;
            }

            .drop3{
                left: 1330px;
            }

            #vissza{
                position: fixed;
                width: 200px;
                height: 170px;
            }

            #home{
                position: fixed;
                right: 0;
                width: 300px;
                height: 170px;
            }

            .ui-state-highlight, .ui-widget-content .ui-state-highlight, .ui-widget-header .ui-state-highlight {
                border: 0px;
                background: none;
            }

            #helpText {
                position: fixed;
                bottom: 140px;
                width: 1730px;
                display: block;
                color: #b6c932;
                font-size: 45px;
                font-weight: bold;
                font-style: italic;
                text-align: center;
                opacity: 1;
            }
/*
            #winText {
                position: fixed;
                bottom: -240px;
                width: 1920px;
                overflow: hidden;
                display: block;
                color: #b6c932;
                font-weight: bold;
                text-align: center;
                font-size: 65px;
                opacity: 0;
                z-index: 9;
            }
*/

            #winText {
                width: 700px;
                margin: 0 auto 0 auto;
                display: block;
                color: #b6c932;
                font-weight: bold;
                text-align: center;
                font-size: 65px;
                opacity: 0;
                z-index: 9;
            }
            
            #winText a {
                color: #b6c932; font-weight:bold; font-size:24px; text-decoration:none; display:block; padding: 30px 0 30px 0;
            }
            
            #timer{
                padding: 0 0 0 100px;
            }

        </style>
        <script src="//code.jquery.com/jquery-1.12.4.js"></script>
        <script src="//code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    </head>
    <body>
        <a href="jatek.html"><div id="vissza"></div></a>
        <a href="index.html"><div id="home"></div></a>

        <div id="dropZone1" class="dropZone drop1"></div>
        <div id="dropZone2" class="dropZone drop2"></div>
        <div id="dropZone3" class="dropZone drop3"></div>

        <div id="draggable01" class="dropMe accept-zold"></div> <!-- biomassza zöld -->
        <div id="draggable02" class="dropMe accept-piros"></div> <!-- szén piros -->
        <div id="draggable03" class="dropMe accept-piros"></div> <!-- olaj piros -->
        <div id="draggable04" class="dropMe accept-piros"></div> <!-- gáz piros -->
        <div id="draggable05" class="dropMe accept-sarga"></div> <!-- hulladékégetés sárga -->
        <div id="draggable06" class="dropMe accept-piros"></div> <!-- fa piros -->
        <div id="draggable07" class="dropMe accept-zold"></div> <!-- szél zöld -->
        <div id="draggable08" class="dropMe accept-zold"></div> <!-- nap zöld -->
        <div id="draggable09" class="dropMe accept-zold"></div> <!-- geotermikus zöld -->
        <div id="draggable10" class="dropMe accept-piros"></div> <!-- pakura piros -->
        <div id="draggable11" class="dropMe accept-sarga"></div> <!-- biogáz sárga -->
        <div id="draggable12" class="dropMe accept-piros"></div> <!-- gumiabroncs piros -->

        <!--
        zöld: szél, nap, geotermikus, 
        környezetkímélő:hulladékégetés, biogáz
        káros: szén, olaj, gáz, fa, pakura, gumiabroncs
        -->

        <p id="winText"><span id="grat">Gratulálunk!</span>
            <a href="#" onclick="restartGame(1)">Játék újrakezdése</a>
        </p>
        
        <p id="helpText">Húzd a helyükre a fűtőanyagokat! <span id="timer">1:00</span></p>

        <script>

            function restartGame(isUserCanSeeIt) {
                gameDropped = [];
                location.reload();
                /*
                $('#winText').css({'opacity':0});
                gameDropped = shuffle(gameDropped);
                for (var i = 0; i < gameDropped.length; i++) {
                    var left = 10 + i * (110 + 30);
                    if (isUserCanSeeIt) {
                        
                        $('#'+gameDropped[i]).animate({ opacity:1, left: left + 'px', bottom: '20px'}, 1000);
                    } else {
                        $('#'+gameDropped[i]).css({ opacity:1, left: left + 'px', bottom: '20px'}, 1000);
                    }
                }
                gameDropped = [];
                return false;
                */
            }

            var gameDropped = [];

            var zoneCounter = {
                'dropZone1':  { left: 52, counter:0 },
                'dropZone2':  { left: 696, counter:0 },
                'dropZone3':  { left:1340, counter:0 }
            }

            var handleDragStart = function(event, ui)  {
            }

            var positionDropped = function(ui,landingId) {
                zoneCounter[landingId]['counter']++;
                var counter = zoneCounter[landingId]['counter'];
                var top = 400 + (Math.ceil(counter / 3) - 1) * (20 + 110) ;
                var left = zoneCounter[landingId]['left'] + ((counter - 1) % 3) * (110 + 20);
                $(ui.draggable).css({'top': top, 'left' : left});
            }

            var handleDrop = function( event, ui ) {
                var landingId = $(this).attr('id');
                positionDropped(ui,landingId);
                if ($.inArray( $(ui.draggable).attr('id') , gameDropped) == -1) {
                    gameDropped.push( $(ui.draggable).attr('id') );
                    if (gameDropped.length == 12) {
                        $('#helpText').css({'opacity':0})
                        $('#winText').css({'margin-top':'800px'})
                        $('#winText').css({'opacity':1})
                        //restartGame(1);
                    }
                }
            }

            $(function() {
                $( ".dropMe" ).draggable( { revert: "invalid", start : handleDragStart });
                $( "#dropZone1" ).droppable({ accept: ".accept-zold", drop: handleDrop });
                $( "#dropZone2" ).droppable({ accept: ".accept-sarga", drop: handleDrop });
                $( "#dropZone3" ).droppable({ accept: ".accept-piros", drop: handleDrop });
            });

            // helper
            function shuffle(array) {
                var currentIndex = array.length, temporaryValue, randomIndex;
                // While there remain elements to shuffle...
                while (0 !== currentIndex) {
                    // Pick a remaining element...
                    randomIndex = Math.floor(Math.random() * currentIndex);
                    currentIndex -= 1;
                    // And swap it with the current element.
                    temporaryValue = array[currentIndex];
                    array[currentIndex] = array[randomIndex];
                    array[randomIndex] = temporaryValue;
                }
                return array;
            }

var timeoutHandle;
function countdown(minutes) {
    var seconds = 60;
    var mins = minutes
    function tick() {
        var counter = document.getElementById("timer");
        var current_minutes = mins-1
        seconds--;
        counter.innerHTML =
        current_minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds);
        if( seconds > 0 ) {
            timeoutHandle=setTimeout(tick, 1000);
        } else {

            if(mins > 1){
               // countdown(mins-1);   never reach “00″ issue solved:Contributed by Victor Streithorst
               setTimeout(function () { countdown(mins - 1); }, 1000);
            }
            
            if(seconds == 0){
                document.getElementById("winText").style.opacity = "1";
                document.getElementById("helpText").style.opacity = "0";
                document.getElementById("winText").style.paddingTop = "800px";
                document.getElementById("grat").textContent="Lejárt az idő!";

                for (var f = 0; f < 13; f++) {
                    document.getElementsByClassName("dropMe")[f].style.display = "none";
                }

                /*
                var element = document.getElementById("draggable01");
                element.classList.remove("dropMe");
                */
                
                //alert("VÉGE");
            }
        }
    }
    tick();
}

countdown(1);
            
            
        </script>
    </body>
</html>