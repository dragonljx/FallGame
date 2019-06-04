//import { ThreeBSP } from '../Game/OtherScript/threebsp.js';

export function ResourceLoading(action){
    loadModel();
    function loadModel (){
        var allGeometry = new Array()
        var loader = new THREE.FBXLoader();
        loader.load("/Game/Models/BaseModel.fbx",
        function(obj){ 
            obj.traverse(function(child){
                
                if(child.isGroup){
                    
                    for (let i = 0; i < child.children.length; i++) {
                        var geometry = child.children[i].geometry;
                        geometry.scale(0.01,0.01,0.01);
                        allGeometry.push(geometry);

                    }
                }

            });
            action(allGeometry)

            // var mesha = new THREE.Mesh( allGeometry[0]);
            // mesha.name = "A";
            // mesha.scale.set(0.01,0.01,0.01);
            // //scene.add( mesha );

            // var meshb = new THREE.Mesh( allGeometry[1]);
            // meshb.name = "B";
            // meshb.position.y = 1;
            // meshb.scale.set(0.005,0.005,0.005);
            //scene.add( meshb );


            // var mesha = new THREE.Geometry().fromBufferGeometry(allGeometry[0]);


            
            // var meshb = new THREE.Geometry().fromBufferGeometry(allGeometry[1]);
            // meshb.scale(0.5,1,0.5);

            
            // var aBSP = new ThreeBSP(mesha);
            // var bBSP = new ThreeBSP(meshb);
            // var meshA = aBSP.toMesh();
 
            // meshA.position.x = 5;
            // scene.add(meshA);

            // var meshB = bBSP.toMesh();
 
            // meshB.position.x = -5;
            // scene.add(meshB);
            
            // var resultBSP = aBSP.subtract(bBSP);
            // var result = resultBSP.toMesh();
            // result.geometry.computeFaceNormals();
            // result.geometry.computeVertexNormals();

            // var ma = new THREE.MeshPhongMaterial({ color: 0xdddddd, specular: 0x009900, shininess: 30, flatShading: true } );
            // result.material = ma;
            // scene.add(result);
        });
        
        
        
    }
   
    
}


