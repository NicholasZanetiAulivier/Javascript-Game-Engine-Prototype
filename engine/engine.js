
const Engine = {};

//Check if canvas exists
Engine.canvasExists = false;

//To be called once every frame. Initialized in run()
Engine.draw = function(){};

//To be called once every frame.
Engine.update = function(){};

Engine.load = function(){};

Engine.run = async function(){
    console.log('ran');

    //Make a canvas in the html

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


// export {Engine};