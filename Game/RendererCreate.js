class RendererCreate extends Manager{
    Start(){
        var renderer = new  THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth,window.innerHeight);
        document.body.appendChild(renderer.domElement);
        return renderer;
    }

}
