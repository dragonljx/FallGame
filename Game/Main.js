import  {ResourceLoading}  from '../Game/ResourceLoading.js';
import { CreateGame } from '../Game/CreateGame.js';
import { GameManager } from '../Game/GameManager.js';


var game,manager,start;
//常量参数
var speed = 0.5;


function main(){
    game = new CreateGame();
    game.Start();
    var loading = new ResourceLoading(GetModels);
    //按键触发
    document.addEventListener('keydown', CreateKeyEvent, false);
    window.scene =  game.scene;
    //将需要执行update的方法添加入
    update();
    // var jj = new THREE.Mesh();
    // jj.setRotationFromEuler()


}
function GetModels(models){
    manager = new GameManager();
    manager.Start(models,speed);

}

function update(time){
    var progress = (time - start)*0.002;
    start = time;

    if (manager!=null) {
        
        manager.Update(progress);
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

