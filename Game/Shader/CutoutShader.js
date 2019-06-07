ShaderFile = {
    uniforms:{

    },
    vert : "\
    void main() {\
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\
    }\
    ",
    frag : "\
        void main() {\
            gl_FragColor=diffuseColor;\
            //vec4(1,1.0,0.5,1);\
        }\
    ",

}