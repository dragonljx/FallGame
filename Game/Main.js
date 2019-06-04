import  {ResourceLoading}  from '../Game/ResourceLoading.js';
import { CreateGame } from '../Game/CreateGame.js';
import { GameManager } from '../Game/GameManager.js';


var game,manager;

function main(){
    game = new CreateGame();
    game.Start();


    // var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    // var material = new THREE.MeshNormalMaterial();
    // material.flatShading = false;

    var loading = new ResourceLoading(GetModels);

    document.addEventListener('keydown', CreateKeyEvent, false);
    window.scene =  game.scene;
    //将需要执行update的方法添加入
    update();
    
}
function GetModels(models){
    manager = new GameManager();
    manager.Start(models);
}

function update(){
    //cube.rotateY(0.1);
    if (manager!=null) {
        
        manager.Update();
    }
    requestAnimationFrame(update);
    game.Update();
    TWEEN.update();
}
function CreateKeyEvent(e){
    var e = e || window.event;
    var keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
    switch (e.keyCode) {
        case 83:
           manager.Down();
            break;
    }
}
window.onload = main;

