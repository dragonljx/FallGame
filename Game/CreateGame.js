
export function CreateGame() {
    this.renderer;
    this.scene;
    this.sceneA;
    this.sceneB;
    var camera,lightAm,gl,directionalLight;
    var isOpen = false;
    var controls,grid;
    this.Start = function(){
        this.CreateScene();
        this.CreateCamera();
        this.CreateAmbientLight();
        this.CreateGridHelper();
        this.CreateRenderer();
        //添加相机控制
        controls = new THREE.OrbitControls(camera,this.renderer.domElement);
    }
    this.CreateScene = function(){
        console.log("场景");
        this.scene = new THREE.Scene();
        this.scene.name = "场景";
        
        this.sceneA = new THREE.Scene();
        this.sceneA.name = "背景场景A";
        
        this.sceneB = new THREE.Scene();
        this.sceneB.name = "背景场景B";
    }
    this.CreateCamera = function(){
        console.log("相机");
        var aspect = window.innerWidth/window.innerHeight;
        camera = new THREE.PerspectiveCamera(45,aspect,1,1000);
        camera.name = "相机";
        camera.position.z =20;
        camera.position.y = 20;
        camera.rotateX(THREE.Math.degToRad(-30));
       
    }
    this.CreateAmbientLight = function(){
        console.log("环境光");
        lightAm = new THREE.AmbientLight("#DFDFDF",0.5);
        lightAm.name = '环境光';
        this.scene.add(lightAm);
        this.sceneA.add(lightAm.clone());
        this.sceneB.add(lightAm.clone());
        directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
        directionalLight.name = "定向光";
        directionalLight.position.set(5,10,7.5);
        // this.scene.add( directionalLight );
        // this.sceneA.add(directionalLight.clone());
        // this.sceneB.add(directionalLight.clone());
    }
    this.CreateGridHelper = function(){
        // console.log("网格助手");
        // grid = new THREE.GridHelper(20,20,'#000000','#aaaaaa');
        // grid.name = '网格助手';
        // this.sceneB.add(grid);
    }
    this.CreateRenderer = function(){
        console.log("渲染");
        this.renderer = new  THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth,window.innerHeight);
        this.renderer.autoClear = false;
        this.renderer.sortObjects = false;
        document.body.appendChild(this.renderer.domElement);
        //隐藏并进制滚动条
        document.documentElement.style.overflow = 'hidden';
        gl = this.renderer.context;
        gl.enable(gl.STENCIL_TEST);
    }
var allControl;
    this.Open=function(goAllControl){
       console.log("启动渲染");
       allControl = goAllControl;
       console.log(allControl);
       for (let i = 0; i < allControl.length; i++) {
            for (let j = 0; j < allControl[i].scenes.length; j++) {

                allControl[i].scenes[j].add(directionalLight.clone());
                allControl[i].scenes[j].add(directionalLight.clone());
            }
    
    }
       isOpen = true;
    }
    this.Update = function(){
        
        this.renderer.clear();
        this.renderer.setClearColor(0xaaaaaa);

        if (isOpen) {
            for (let i = 0; i < allControl.length; i++) {
                this.renderer.render(allControl[i].scenes[1],camera);
                this.renderer.render(allControl[i].scenes[2],camera);
                this.renderer.render(allControl[i].scenes[0],camera);
            
            }
        }

        // gl.stencilFunc(gl.ALWAYS, 1, 0xFF );
        // gl.stencilOp(gl.KEEP, gl.KEEP, gl.REPLACE);
        this.renderer.render(this.sceneA,camera);//顶盖
        
        // gl.stencilFunc(gl.EQUAL, 1, 0xFF );
        // gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP);
        this.renderer.render(this.sceneB,camera);//边缘带

        // gl.stencilFunc(gl.NOTEQUAL, 1, 0xFF );
        // gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP);
        this.renderer.render(this.scene,camera);

        // gl.stencilFunc(gl.ALWAYS, 1, 0xFF );
        // gl.stencilOp(gl.KEEP, gl.KEEP, gl.REPLACE);
        // this.renderer.render(this.sceneA,camera);//顶盖
        
        // gl.stencilFunc(gl.EQUAL, 1, 0xFF );
        // gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP);
        // this.renderer.render(this.sceneB,camera);//边缘带

        // gl.stencilFunc(gl.NOTEQUAL, 1, 0xFF );
        // gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP);
        // this.renderer.render(this.scene,camera);

        
        // gl.stencilFunc(gl.ALWAYS, 1, 0xFF );
        // gl.stencilOp(gl.KEEP, gl.KEEP, gl.REPLACE);
        // this.renderer.render(this.sceneA,camera);//顶盖
        
        // gl.stencilFunc(gl.EQUAL, 1, 0xFF );
        // gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP);
        // this.renderer.render(this.sceneB,camera);//边缘带

        // gl.stencilFunc(gl.NOTEQUAL, 1, 0xFF );
        // gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP);
        // this.renderer.render(this.scene,camera);

        
        
        
        //console.log(this.sceneA);
        
    }

}