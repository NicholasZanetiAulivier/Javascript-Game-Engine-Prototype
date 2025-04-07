
const Engine = {};

//Check if canvas exists
Engine.canvasExists = false;
Engine.canvas = null;

//Needs whole document to be loaded first
Engine.bindCanvas = function(canvas){
    Engine.canvas = canvas;
    Engine.canvasExists = true;
}

//Needs whole document to be loaded first
Engine.setCanvasSize = function(width , height){
    if (Engine.canvas) {
        Engine.canvas.width = width;
        Engine.canvas.height = height;
    }
    canvasWidth = width;
    canvasHeight = height;
}

//Needs whole document to be loaded first
Engine.createCanvas = function (parent , width= 400, height= 300){
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    Engine.canvas = canvas;
    parent.appendChild(canvas);
    Engine.canvasExists = true;
}

//To be called once every frame. Initialized in run()
Engine.draw = function(){};

//To be called once every frame.
Engine.update = function(){};

Engine.load = function(){};

//To be ran once whole document is loaded
Engine.run = async function(){
    console.log('ran');

    //Make a canvas in the html
    if (!Engine.canvasExists) Engine.createCanvas(document.body, 400 , 300);

    while(true){
        await new Promise(resolve => setTimeout(resolve,1000));
        console.log('cc');
        Engine.update();
        Engine.draw();
    }
};

Engine.error = function (err){
    console.log(err);
};

//ErrorHandler, Handles errors
Engine.errHandler = async function(run_func){
    try{
        await run_func();
    } catch(err){
        Engine.error(err);
    }
};

