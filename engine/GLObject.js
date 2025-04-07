class GLObject {
    #canvas;
    #p;
    #frameTime = 1000/60;
    #running =false;
    gl;
    #triangles = [];

    constructor(doc, id){
        this.#canvas = doc.querySelector(`#${id}`);
        this.gl = this.getCanvas().getContext('webgl');
        this.gl.viewport(0,0,this.gl.canvas.width,this.gl.canvas.height);
        if (this.gl === null){
            alert("fuck");
        }
        this.gl.enable(this.gl.BLEND);
        this.gl.blendFunc(this.gl.SRC_ALPHA,this.gl.ONE_MINUS_SRC_ALPHA);
    }

    getGL(){
        return this.gl;
    }

    getCanvas(){
        return this.#canvas;
    }

    getProgram(){
        return this.#p;
    }

    setProgram(v,f){
        this.#p = this.gl.createProgram();
        const vSh = this.gl.createShader(this.gl.VERTEX_SHADER);
        const fSh = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        this.gl.shaderSource(vSh,v);
        this.gl.shaderSource(fSh,f);
        this.gl.compileShader(vSh);
        this.gl.compileShader(fSh);
        this.gl.attachShader(this.#p,vSh);
        this.gl.attachShader(this.#p,fSh);
        this.gl.linkProgram(this.#p);

        const success = this.gl.getProgramParameter(this.#p, this.gl.LINK_STATUS);
        if (!success){
            console.log(this.gl.getProgramInfoLog(this.#p));
            console.log(this.gl.getShaderInfoLog(vSh));
            console.log(this.gl.getShaderInfoLog(fSh));
            this.gl.deleteProgram(this.#p);
            this.gl.deleteShader(vSh);
            this.gl.deleteShader(fSh);
        } else {
            console.log('success');
            this.gl.useProgram(this.#p);
            const screenSizePointer = this.gl.getUniformLocation(this.#p,'screenSize');
            this.gl.uniform2f(screenSizePointer,this.gl.canvas.width,this.gl.canvas.height);
        }
    }

    setFPS(n){
        if (n > 0){
            this.#frameTime = 1000/n;
        }
    }

    getFPS(){
        return 1000/this.#frameTime;
    }

    async run(){
        this.#running = true;
        const counter = document.querySelector('#fps-counter');
        let i = 0;
        let before = Date.now();
        do{
            await new Promise(resolve => setTimeout(resolve,this.#frameTime));
            this.update();
            this.draw();
            this.postProcess();
            
            i++;
            if(Date.now()-before >= 1000){
                counter.innerHTML = String(i);
                before = Date.now();
                i= 0;
            }
        
        
        } while(this.#running);
    }

    addTriangle(arr){
        this.#triangles.push(arr);
    }

    exit() {
        this.#running = false;
    }

    //Draw random triangles every frame
    drawTest(){
        const buffer = this.gl.createBuffer();
        const vertexPointer = this.gl.getAttribLocation(this.#p,'vertices');
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER,buffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array(this.vertices),this.gl.DYNAMIC_DRAW);
        this.gl.vertexAttribPointer(
            vertexPointer,
            3,
            this.gl.FLOAT,
            false,
            0,
            0,
        );
        this.gl.enableVertexAttribArray(vertexPointer);
        this.gl.drawArrays(this.gl.TRIANGLES,0,this.vertices.length/3);
        this.gl.disableVertexAttribArray(vertexPointer);
    }
    /*
    Entity updates
     */
    update(){
        const tri = [];
        for (let j = 0 ; j < 3 ; j++){
            for (const i of [600,400,1]){
                tri.push(Math.random()*i);
            }
        }
        this.addTriangle(tri);
    }

    /*
    draw updates
    */
    draw(){
        //Process needed triangles
        this.vertices = [];
        for (const i of this.#triangles){
            for (const coords of i){
                this.vertices.push(coords);
            }
        };
        this.gl.clearColor(0.9,0.9,0.9,1);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        this.drawTest();
    }

    /*
    Post Processing updates
    */
    postProcess(){};

    
}
