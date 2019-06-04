
export function CreateGame() {
    this.renderer;
    this.scene;
    var camera,lightAm;
    var controls,grid;
    this.Start = function(){
        this.CreateScene();
        this.CreateCamera();
        this.CreateAmbientLight();
        this.CreateGridHelper();
        this.CreateRenderer();
        //添加相机控制
        //controls = new THREE.OrbitControls(camera,this.renderer.domElement);
    }
    this.CreateScene = function(){
        console.log("场景");
        this.scene = new THREE.Scene();
        this.scene.name = "场景";
     
    }
    this.CreateCamera = function(){
        console.log("相机");
        var aspect = window.innerWidth/window.innerHeight;
        camera = new THREE.PerspectiveCamera(45,aspect,1,1000);
        camera.name = "相机";
        camera.position.z =20;
        camera.position.y = 20;
        camera.rotateX(THREE.Math.degToRad(-30));
        this.scene.add(camera);

       
    }
    this.CreateAmbientLight = function(){
        console.log("环境光");
        lightAm = new THREE.AmbientLight("#DFDFDF",1);
        lightAm.name = '环境光';
        this.scene.add(lightAm);
        
        var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
        directionalLight.name = "定向光";
        directionalLight.position.set(5,10,7.5);
        this.scene.add( directionalLight );

    }
    this.CreateGridHelper = function(){
        // console.log("网格助手");
        // grid = new THREE.GridHelper(20,20,'#000000','#aaaaaa');
        // grid.name = '网格助手';
        // this.scene.add(grid);
    }
    this.CreateRenderer = function(){
        console.log("渲染");
        this.renderer = new  THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth,window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
        //隐藏并进制滚动条
        document.documentElement.style.overflow = 'hidden';

    }

    this.Update = function(){
        this.renderer.setClearColor(0xb9d3ff,1.0);
        this.renderer.render(this.scene,camera);
    }

}