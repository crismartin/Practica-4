
describe ("Sprite", function (){

	var canvas, ctx;
	var nave;
	var sprite_aux;

    beforeEach(function(){
		loadFixtures('index.html');

		canvas = $('#game')[0];
		expect(canvas).toExist();

		ctx = canvas.getContext('2d');
		expect(ctx).toBeDefined();
	
		SpriteSheet = {map: {ship: { sx: 0, sy: 0, w: 37, h: 42, frames: 1 }}};

		nave = new PlayerShip ();

		sprite_aux = new Sprite();

	});

    it ("Constructor", function(){

    	expect(nave instanceof Sprite).toBeTruthy();
    });


    it ("setup ()", function(){

    	sprite_aux.setup('ship',{});
    	expect(sprite_aux.sprite).toBe('ship');

    	spyOn(sprite_aux, 'merge');
    	sprite_aux.merge({})

    	expect(sprite_aux.merge).toHaveBeenCalled();
    	expect(sprite_aux.w).toEqual(SpriteSheet.map['ship'].w);
    	expect(sprite_aux.h).toEqual(SpriteSheet.map['ship'].h);
    });


    it ("merge()", function (){

    	sprite_aux.merge({x: 100});
    	expect(sprite_aux.x).toEqual(100);

    });

    it ("draw()", function (){

    	spyOn(sprite_aux,"draw");
    	sprite_aux.draw(ctx);
    	expect(sprite_aux.draw).toHaveBeenCalled();

    });
});