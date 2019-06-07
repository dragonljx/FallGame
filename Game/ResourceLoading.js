//import { ThreeBSP } from '../Game/OtherScript/threebsp.js';

export function ResourceLoading(action){
    loadModel();
    function loadModel (){
        var allGeometry = new Array()
        var loader = new THREE.FBXLoader();
        loader.load("/Game/Models/BaseModelX.fbx",
        function(obj){ 
            obj.traverse(function(child){

                if(child.isGroup){
                    var length = 0;
                    var meshChart = Array();
                    for (let i = 0; i < child.children.length; i++) {

                        var geometry = child.children[i].geometry;
                        geometry.name = child.children[i].name;
                        geometry.scale(0.01,0.01,0.01);
                        
                        var index = geometry.name.split("_");
                        if(!allGeometry.hasOwnProperty(index[0])){

                            allGeometry[index[0]] = [geometry];
                            meshChart[length] = index[0];
                            length++;
                        }else{
                            if(index[1] == "0"){

                                allGeometry[index[0]].unshift(geometry);
                            }else{
                                allGeometry[index[0]].push(geometry);
                                
                            }
                        }

                    }
                    allGeometry["chart"] = meshChart;
                }

            });
            action(allGeometry)
        });
        
        
        
    }
   
    
}


