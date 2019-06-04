class CameraCreate extends Manager{
    Start(doName,scene){
        var aspect = window.innerWidth/window.innerHeight;
        var camera = new THREE.PerspectiveCamera(70,aspect,0.1,1000);
        camera.name=doName;
        //scene.add(camera);
        return camera;
    }
}