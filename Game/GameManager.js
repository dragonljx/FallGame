

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
    ]
    //启动游戏 生成模型 
    //操作下落规则
    this.Start = function(models){
        allGeometry = models;
        console.log("启动游戏");
        AddBase();
        
        
    }
    this.Update = function(){
        if (allControl.length>0) {
            for (let i = 0; i < allControl.length; i++) {
                allControl[i].gameobject.rotateY(allControl[i].direction*0.01);
            }
        }

    }
    this.Down=function(){
        
        var coords = allControl[0].gameobject.position;
        var tween = new TWEEN.Tween(coords)
        .to(new THREE.Vector3(0,7,0),500)
        
        .start();



    }
    function AddBase(){
        
        for (let i = 0; i < 5; i++) {
            var mesh;
            var material = new THREE.MeshPhongMaterial({ color: colors[index%colors.length], flatShading: true } );
            index++;
            var control = new BaseControl();
            
            control.currentMesh = allGeometry[GetRndInteger(0, allGeometry.length)]
            allControl.push(control);
            control.direction = index%2?1:-1;
            if (i==0) {

                mesh = GetMesh(control.currentMesh,material);

            }else{

                control.inlayObject = allControl[allControl.length-2].currentMesh;
                
                mesh = GetHollowMesh(control.currentMesh,control.inlayObject,material);
                mesh.scale.set(i*2,1,i*2);
            }
            control.gameobject = mesh;
            mesh.name = i+"底座";
            mesh.position.y=10-i*3;
            
            //console.log(mesh.scale);
            scene.add(mesh);
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
    var inlayObject;//嵌入的模型
    var currentMesh;//当前模型
    var direction;
}