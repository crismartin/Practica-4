/*

  Requisitos:

  El objetivo de este prototipo es añadir al juego naves enemigas. Las
  naves se añadirán al tablero de juegos (objeto GameBoard) al igual
  que el resto de los elementos del juego (nave del jugador y
  misiles).

  Cada nave enemiga debe tener un patrón de movimiento que exhibirá
  desde que entra por la parte superior del canvas hasta que
  desaparece por la parte inferior. En este prototipo las naves
  enemigos no interaccionan con el resto de los elementos del juego:
  los disparos de la nave del jugador no les afectan. La nave del
  jugador tampoco se ve afectada por la colisión con una nave enemiga.


  Especificación:

  1. El patrón de movimiento lo dictan las ecuaciones que se
     utilizarán para calcular las componentes vx e vy de su velocidad.
     Los parámetros de las ecuaciones que definen vx e vy determinan
     el patrón de comportamiento:

     vx = A + B * sin (C * t + D) 
     vy = E + F * sin (G * t + H)

     siendo t la edad de un enemigo, calculada como el tiempo que ha
     pasado desde que se creó la nave.

     A: componente constante de la velocidad horizontal
     B: fuerza de la velocidad horizontal sinusoidal
     C: periodo de la velocidad horizontal sinusoidal
     D: desplazamiento en el tiempo de la velocidad horizontal
        sinusoidal

     E: componente constante de la velocidad vertical
     F: fuerza de la velocidad vertical sinusoidal
     G: periodo de la velocidad vertical sinusoidal
     H: desplazamiento en el tiempo de la velocidad vertical
        sinusoidal

     Todos estos parámetros tendrán un valor por defecto de 0
     (definido en la variable baseParameters en el constructor), que
     puede ser substituido por otro valor cuando se crea la nave.


  2. Se creará un nuevo constructor/clase Enemy. Los enemigos se
     diferenciarán sólo en su posición inicial, en el sprite que
     utilizan y en el patrón de movimiento (parámetros A..H de la
     velocidad), pero todos serán de la misma clase: Enemy.

     Para definir diferentes tipos de enemigos se pasará al
     constructor una plantilla con valores para las propiedades (x, y,
     sprite, A..H).

     Para poder definir fácilmente enemigos parecidos creados a partir
     de una misma plantilla, se pasará un segundo argumento al
     constructor con valores alternativos para algunas de las
     propiedades de la plantilla.

*/


describe ("Clase Enemy", function (){

  // comprobamos si el canvas esta definido
  var canvas, ctx;
  var enemigo, basic;

  beforeEach(function(){

    loadFixtures('index.html');

    canvas = $('#game')[0];
    expect(canvas).toExist();

    ctx = canvas.getContext('2d');
    expect(ctx).toBeDefined();

    // declaramos propiedades basicas del enemigo
    basic = { x: 100, y: -50, sprite: 'enemy_circle', B: 100, C: 2 , E: 100 };
    override = {A:10, B: -10};

    Sprite_Sheet = {
      map : {enemy_circle: { sx: 158, sy: 0, w: 32, h: 33, frames: 1 }}
    };

    enemigo = new Enemy(basic, override);

  });


  it ("Constructor ()", function (){

    // comprobamos si se ha creado el bicho
    expect (enemigo).toBeDefined();
    expect (enemigo.w).toEqual(SpriteSheet.map[enemigo.sprite].w);
    expect (enemigo.h).toEqual(SpriteSheet.map[enemigo.sprite].h);
    expect (enemigo.t).toEqual(0);

  });

  it ("step ()", function (){

    // probamos si se llama la funcion step con dt = 1.0
    spyOn (enemigo, "step");

    enemigo.step(1.0);

    expect(enemigo.step).toHaveBeenCalled();

  });


  it ("draw ()", function (){

    // probamos si se llama la funcion draw
    spyOn(enemigo, "draw");

    enemigo.draw(ctx);

    expect(enemigo.draw).toHaveBeenCalled();

  });
  
});