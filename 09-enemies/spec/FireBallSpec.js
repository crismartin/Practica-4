
describe ("Clase FireBall", function (){
	var canvas, ctx;
	var bola_fuego;
  	
  	beforeEach(function(){

		loadFixtures('index.html');
    	canvas = $('#game')[0];
    	expect(canvas).toExist();
    	ctx = canvas.getContext('2d');
    	expect(ctx).toBeDefined(); 

    	Sprite_Sheet = {
      		map : {explosion: {sx: 0, sy: 64, w: 64, h: 64, frames: 1}}
    	};

    	bola_fuego = new FireBall (300, 700, "right");
	});


	it ("Constructor ()", function (){
		expect(bola_fuego).toBeDefined();
	});


	it ("step ()", function (){
	
		spyOn(bola_fuego, "step");

		bola_fuego.step(2.0);

		expect(bola_fuego.step).toHaveBeenCalled();

	});

	it ("draw ()", function(){

		spyOn(bola_fuego, "draw");
		bola_fuego.draw(ctx);
		expect(bola_fuego.draw).toHaveBeenCalled();

	});

