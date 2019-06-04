
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
    //固定属性
    var spacing = 4;
    //启动游戏 生成模型 
    //操作下落规则
    this.Start = function(models,goSpeed){
        allGeometry = models;
        speed = goSpeed;
        console.log("启动游戏");
        for (let i = 0; i < 5; i++) {
            AddBase(i);
        }
        MeshUp();
        console.log(allControl);
        
    }
    this.Update = function(time){
        if (allControl.length>0) {
            for (let i = rotateIndex; i < allControl.length; i++) {
                allControl[i].gameobject.rotateOnAxis(new THREE.Vector3(0,1,0),allControl[i].direction*time*speed);
            }
        }
       
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
            // console.log(GetAngle());
            
            // console.log( allControl[0]);
            // console.log( allControl[1]);
            
        }

    }
    function SuccessEndEven(){
        rotateIndex = 0;
        // allControl[0].gameobject.position.y = 10;
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
        console.log("A角度："+allControl[0].gameobject.rotation.y+"  B角度："+allControl[1].gameobject.rotation.y+"  角度值："+ allControl[0].angle);
        var angle = (allControl[0].gameobject.rotation.y - allControl[1].gameobject.rotation.y)% allControl[0].angle;
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
        var material = new THREE.MeshPhongMaterial({ color: colors[index%colors.length], flatShading: true } );
        index++;
        var control = new BaseControl();
        
        control.currentMesh = allGeometry[GetRndInteger(0, allGeometry.length)];
        var name = control.currentMesh.name;
        
        if (name.toLowerCase().indexOf("san")) {
            
            control.angle = (Math.PI/4)*2;
        }else{
            control.angle = (Math.PI/3)*2;
        }

        allControl.push(control);
        control.direction = index%2?1:-1;
        if (i==0) {

            mesh = GetMesh(control.currentMesh,material);

        }else{

            control.inlayMesh = allControl[allControl.length-2].currentMesh;
            
            mesh = GetHollowMesh(control.currentMesh,control.inlayMesh,material);
            // mesh.scale.set(i*2,1,i*2);
        }
        
        control.gameobject = mesh;
        mesh.name = index+"底座";
        mesh.position.y=-3;
        scene.add(mesh);
        

    }


    function MeshUp(){
        for (let i = 0; i < allControl.length; i++) {
            var coords = allControl[i].gameobject.position;
            var scale = allControl[i].gameobject.scale;

            //坐标
            var tweenA = new TWEEN.Tween(coords)
            .to(new THREE.Vector3(0,10-i*spacing,0),250)
            .start();
            var value 
            if(i<2){

                value = i*2==0?1:i*2;
            }else{
                value = i*1.5==0?1:i*1.5;
            }
            //缩放
            var tweenB = new TWEEN.Tween(scale)
            .to(new THREE.Vector3(value,1,value),250)
            .start();
        }
    }
    function GetHollowMesh(currentMesh,inlayMesh,material){
        var meshA = new THREE.Geometry().fromBufferGeometry(currentMesh);
        var meshB = new THREE.Geometry().fromBufferGeometry(inlayMesh);
        meshB.scale(0.5,1,0.5);

        var aBSP = new ThreeBSP(meshA);
        var bBSP = new ThreeBSP(meshB);
        meshA = aBSP.toMesh();
        meshB = bBSP.toMesh();

        var resultBSP = aBSP.subtract(bBSP);
        var result = resultBSP.toMesh();
        result.geometry.computeFaceNormals();
        result.geometry.computeVertexNormals();
        result.material = material;

        return result;
    }


    function GetMesh(geometry,material){
        var mesh = new THREE.Mesh( geometry,material);
        
        return mesh;   
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
}