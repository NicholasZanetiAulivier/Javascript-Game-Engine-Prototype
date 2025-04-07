const vertexSource = `
    attribute vec4 vertices;
    uniform vec2 screenSize;

    void main(){
        gl_Position = vec4(vertices.x/screenSize.x*2.0-1.0,vertices.y/screenSize.y*2.0-1.0,vertices.z*2.0-1.0,1);
    }
`;

const fragmentSource = `
    precision highp float;
    uniform vec2 screenSize;

    void main() {
        gl_FragColor =vec4(gl_FragCoord.x/screenSize.x,gl_FragCoord.y/screenSize.y,gl_FragCoord.z,gl_FragCoord.z);
    }
`;