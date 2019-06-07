// function AAA(matMask, matBody, matSide, ID){
//     var self={}
//     var mask = matMask.clone()
//     var mask = matMask.clone()
//     var mask = matMask.clone()
//     var sceneA, sceneB,sceneC;
//     self.drawTop=function(){
//         gl.stencilFunc(gl.ALWAYS, 1<<ID, 0xFF );
//         gl.stencilOp(gl.KEEP, gl.KEEP, gl.REPLACE);
        
//         gl.stencilFunc(gl.ALWAYS, 1<<ID, 0xFF );
//         gl.stencilOp(gl.KEEP, gl.KEEP, gl.REPLACE);
        
//         gl.stencilFunc(gl.ALWAYS, 1<<ID, 0xFF );
//         gl.stencilOp(gl.KEEP, gl.KEEP, gl.REPLACE);
//     }
//     return self;
// }


// function update(){
//     foreach(jfsdiohjfoapsdhjfoipsdahj){
//          A.drawTo
//         // A.drawBody();
//         // A.drawSide();p();
//     }
// }


export function GameManager() {
    var allGeometry;
    var allControl = new Array();
    var index = 0;
    var colors = [
        "#DC143C",
        "#800080",
        "#483D8B",
        "#4169E1",
        "#00BFFF",
        "#DAA520",
    ];
    var speed;
    var rotateIndex = 0;
    var scene,sceneA,sceneB;
    //固定属性
    var spacing = 4;
    //启动游戏 生成模型 
    //操作下落规则
    this.Start = function(models,goSpeed,open){
        allGeometry = models;
        speed = goSpeed;
        
        // sceneA = goSceneA;//A为top场景
        // sceneB = goSceneB;//B为边缘场景
        // scene = goScene;
        console.log("启动游戏");
        for (let i = 0; i < 5; i++) {
            
            AddBase(i);
        }
        MeshUp();        
        open(allControl);

    }
    var open = true;
    this.Switch = function(goOpen){
        open = goOpen;
    }
    this.Update = function(time){

        // if (allControl.length>0&&open) {
        //     for (let i = rotateIndex; i < allControl.length; i++) {
        //         allControl[i].gameobject.rotateOnAxis(new THREE.Vector3(0,1,0),allControl[i].direction*time*speed);
        //     }
        // }
       
    }
    this.Down=function(){
        
        var coords = allControl[0].gameobject.position;
        
        if (GetAngle()<0.5) {
            
            var tween = new TWEEN.Tween(coords)
            .to(new THREE.Vector3(0,10-spacing,0),500)
            .easing(TWEEN.Easing.Back.Out)
            .onComplete(SuccessEndEven)
            .start();
            rotateIndex=2;

        }else{

            var tweenA = new TWEEN.Tween(coords)
            .to(new THREE.Vector3(0,10-spacing+1,0),250)
            .easing(TWEEN.Easing.Back.Out)
            var tweenB = new TWEEN.Tween(coords)
            .to(new THREE.Vector3(0,10,0),250)
            .easing(TWEEN.Easing.Back.Out)
            .onComplete(FailEndEven)

            tweenA.chain(tweenB);
            tweenA.start();
            rotateIndex=2;

        }

    }
    function SuccessEndEven(){
        rotateIndex = 0;
        var scale = allControl[0].gameobject.scale;
        var tween = new TWEEN.Tween(scale)
        .to(new THREE.Vector3(0,1,0),500)
        .onComplete(()=>{
            var delet = allControl.shift();
            scene.remove(delet.gameobject);
            AddBase(4);
            MeshUp();
        })
        .start();
        var scale = allControl[1].gameobject.scale;
        var tween = new TWEEN.Tween(scale)
        .to(new THREE.Vector3(1,1,1),250)
        .start();
        
    }
    function FailEndEven(){
        rotateIndex = 0;

        
    }
    function GetAngle(){
       
        var angle = (allControl[0].gameobject.rotation.y -allControl[1].gameobject.rotation.y)% allControl[0].angle;

        console.log("第一次："+angle);
        //取两次半值 获取正确区间 012 012 减去一次半值 -101 -101 取绝对值再减去一次半值 0-10 0-10 得到合适的区间值
        var half =  allControl[0].angle * 0.5;
        angle = Math.abs(angle - half);
        angle = Math.abs(angle - half);
        console.log("计算完毕："+angle);

        
        return angle;
    }
    function AddBase(i){       
        var mesh;
        var scenes = new Array();
        for (let j = 0; j < 3; j++) {
            var scene = new THREE.Scene();
            scene.name = i+"场景"+j;
            scenes.push(scene);
        }

        var material = new THREE.MeshPhongMaterial({ color: colors[index % colors.length], flatShading: true } );
        index++;
        var control = new BaseControl();
        control.scenes = scenes;
        var name = allGeometry["chart"][GetRndInteger(0, allGeometry["chart"].length)];
        control.currentMesh = allGeometry[name];
        //var name = control.currentMesh.name;
        if (name.toLowerCase().indexOf("san")) {
            
            control.angle = (Math.PI/4)*2;
        }else{
            control.angle = (Math.PI/3)*2;
        }
        
        allControl.push(control);
        control.direction = index%2?1:-1;
        if (i==0) {
            
            mesh = [GetMesh(control.currentMesh,[material],scenes[0])];
             
        }else{
            
            control.inlayMesh = allControl[allControl.length-2].currentMesh;
            
            mesh = GetHollowMesh(control.currentMesh,control.inlayMesh,material,i,scenes);
            
        }
        
        
        control.gameobject = mesh;
        for (let i = 0; i < mesh.length; i++) {
            for (let j = 0; j < mesh[i].length; j++) {
                for (let k = 0; k < mesh[i][j].length; k++) {
                    mesh[i][j][k].position.y = -8;
                }
            }
        }
        

    }


    function MeshUp(){
        for (let i = 0; i <allControl.length; i++) {
            // for (let i = 0; i <2; i++) {

            const meshs = allControl[i].gameobject;
            
            for (let j = 0; j < meshs.length; j++) {

                const pos = meshs[0][0][0].position;
                //坐标
                const tweenA = new TWEEN.Tween(pos)
                .to(new THREE.Vector3(0,(10-i*spacing),0),250)
                .onUpdate(()=>{
                    
                    for (let k = 0; k <  meshs[j].length; k++) {
                        for (let f = 0; f < meshs[j][k].length; f++) {
                            meshs[j][k][f].position.y = pos.y;
                        }
                     }
                })
                .start();

                var value;
                if(i<2){
                    
                    value = i*2==0?1:i*2;
                }else{
                     value = i*1.5==0?1:i*1.5;
                }
                if(j == 1){
                     value = i;
                }
                var sc = new THREE.Vector3(value,1,value);
                //缩放
                for (let k = 0; k <  meshs[j].length; k++) {
                        
                    for (let f = 0; f < meshs[j][k].length; f++) {
                        meshs[j][k][f].scale.set(sc.x,sc.y,sc.z);
                        
                    }
                 }

            }
        }
    }

    function GetHollowMesh(currentMesh,inlayMesh,material,index,scenes){

        var meshA = GetMesh(currentMesh,[material],scenes[0],index);

        var matA = new THREE.MeshPhongMaterial({ color: "#ffffff",transparent: true, flatShading: true,opacity: 0.0 } );
        matA.depthWrite = false;
        matA.colorWrite = false;
        var matB = material.clone();
        // matB.depthWrite = true;
        matB.side = 1;
        var meshB = GetMesh(inlayMesh, [matA,matB], scenes,index);

        return [meshA,meshB];
    }


    function GetMesh(geometry,material,scene,index){
        
        var array = new Array();
        for (let i = 0; i < geometry.length; i++) {
            (function(ID){
                var mesh;
                if (material.length == 1) {// BODY
                    mesh = new THREE.Mesh( geometry[i],material[0]);
                    mesh.onBeforeRender= function( renderer, scene, camera, geometry, material, group ) {
                        var gl = renderer.context;
                        gl.stencilFunc(gl.NOTEQUAL,  1<<ID, 0xFF );
                        gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP);
                    };
                    scene.add(mesh);
                }else{
                    if(i == 0){        // TOP      
                        mesh = new THREE.Mesh( geometry[i],material[0]);
                        mesh.onBeforeRender= function( renderer, scene, camera, geometry, material, group ) {           
                            var gl = renderer.context;
                            gl.stencilFunc(gl.ALWAYS, 1<<ID, 0xFF );
                            gl.stencilOp(gl.KEEP, gl.KEEP, gl.REPLACE);
                        
                        };
                        scene[1].add(mesh);
                    }else{ // SIDE
                        mesh = new THREE.Mesh( geometry[i],material[1]);
                        mesh.onBeforeRender= function( renderer, scene, camera, geometry, material, group ) {
                            var gl = renderer.context;
                            gl.stencilFunc(gl.EQUAL, 1<<ID, 0xFF );
                            gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP);
                        
                        };
                        scene[2].add(mesh);
                    }
                }

                array.push(mesh);
            })(index);
        }
        return [array];   
    }
    function GetRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
      }
}

 function BaseControl(){
    var gameobject;//当前对象
    var inlayMesh;//嵌入的模型
    var currentMesh;//当前模型
    var direction;//方向
    var angle;
    var scenes;//模型场景
}