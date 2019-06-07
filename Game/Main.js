import  {ResourceLoading}  from '../Game/ResourceLoading.js';
import { CreateGame } from '../Game/CreateGame.js';
import { GameManager } from '../Game/GameManager.js';

// for(var i=0;i<10;i++){
//     (function(j){
//         console.log(j);
        
//     })(i)
// }


var game,manager,start;
//常量参数
var speed = 0.5;


function main(){
    game = new CreateGame();
    game.Start();
    var loading = new ResourceLoading(GetModels);
    //按键触发
    document.addEventListener('keydown', CreateKeyEvent, false);
     //window.scene =  game.scene;
    //window.THREE =  THREE;
    //将需要执行update的方法添加入
    update();
    // var jj = new THREE.Mesh();
    // jj.setRotationFromEuler()
//      var ff = new  THREE.WebGLRenderer();
// var x = ff.context;
// x.stencilMask        
    
}
function GetModels(models){
    manager = new GameManager();
    manager.Start(models,speed,game.Open);
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
            manager.Switch(false);
            break;
        case 65:
            manager.Switch(true);
            break;

        case 32:
            manager.Down();
            break;

    }
}
window.onload = main;

