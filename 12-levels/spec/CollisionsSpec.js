/*

  Requisitos:

  El objetivo de este prototipo es que se detecten colisiones entre
  varios tipos de sprites:
  
  - Los misiles tienen ahora una nueva propiedad: el daño (damage) que
    infligen a una nave enemiga cuando colisionan con ella. Cuando un
    misil colisione con una nave enemiga le infligirá un daño de
    cierta cuantía (damage) a la nave enemiga con la que impacta, y
    desaparecerá.

  - Las naves enemigas tienen ahora una nueva propiedad: su salud
    (health).  El daño ocasionado a una nave enemiga por un misil hará
    que disminuya la salud de la nave enemiga, y cuando llegue a cero,
    la nave enemiga desaparecerá.

  - cuando una nave enemiga colisione con la nave del jugador, deberá
    desaparecer tanto la nave enemiga como la nave del jugador.



  Especificación:

  En el prototipo 07-gameboard se añadió el constructor GameBoard. El
  método overlap() de los objetos creados con GameBoard() ofrece
  funcionalidad para comprobar si los rectángulos que circunscriben a
  los sprites que se le pasan como parámetros tienen intersección no
  nula. El método collide() de GameBoard utiliza overlap() para
  detectar si el objeto que se le pasa como primer parámetro ha
  colisionado con algún objeto del tipo que se le pasa como segundo
  parámetro.

  En este prototipo se utilizará el método collide() para detectar los
  siguientes tipos de colisiones:

    a) detectar si un misil disparado por la nave del jugador
       colisiona con una nave enemiga

    b) detectar si una nave enemiga colisiona con la nave del jugador


  En el método step() de los objetos creados con PlayerMissile() y
  Enemy(), tras "moverse" a su nueva posición calculada, se comprobará
  si han colisionado con algún objeto del tipo correspondiente. 

  No interesa comprobar si se colisiona con cualquier otro objeto,
  sino sólo con los de ciertos tipos. El misil tiene que comprobar si
  colisiona con naves enemigas. Por otro lado, tras moverse una nave
  enemiga, ésta tiene que comprobar si colisiona con la nave del
  jugador. Para ello cada sprite tiene un tipo y cuando se comprueba
  si un sprite ha colisionado con otros, se pasa como segundo
  argumento a collide() el tipo de sprites con los que se quiere ver
  si ha colisionado el objeto que se pasa como primer argumento.

  Cuando un objeto detecta que ha colisionado con otro, llama al
  método hit() del objeto con el que ha colisionado. 


  Efectos de las colisiones de un misil con una nave enemiga:

    Cuando el misil llama al método hit() de una nave enemiga, pasa
    como parámetro el daño que provoca para que la nave enemiga pueda
    calcular la reducción de salud que conlleva la colisión. Cuando
    una nave enemiga recibe una llamada a su método .hit() realizada
    por un misil que ha detectado la colisión, la nave enemiga
    recalcula su salud reduciéndola en tantas unidades como el daño
    del misil indique, y si su salud llega a 0 desaparece del tablero
    de juegos, produciéndose en su lugar la animación de una
    explosión.

    El misil, tras informar llamando al métod hit() de la nave enemiga
    con la que ha detectado colisión, desaparece.


  Efectos de las colisiones de una nave enemiga con la nave del jugador:

    Cuando la nave del jugador recibe la llamada .hit() realizada por
    una nave enemiga que ha detectado la colisión, la nave del jugador
    desaparece del tablero.

    La nave enemiga, tras informar llamando a hit() de la nave del
    jugador, desaparece también.

*/


describe ("Clase Collision", function (){
  
  var canvas, ctx, enemies;

  beforeEach(function(){
    loadFixtures('index.html');

    canvas = $('#game')[0];
    expect(canvas).toExist();

    ctx = canvas.getContext('2d');
    expect(ctx).toBeDefined();

    enemies = {basic: { x: 10, y: 10, sprite: 'enemy_purple', B: 100, C: 4, E: 100, health: 20 }};

  });

  it ("Misil destruye a Nave Enemiga", function (){
    
    SpriteSheet = { map: {missile: { sx: 0, sy: 30, w: 2, h: 10, frames: 1 },
                          explosion: { sx: 0, sy: 64, w: 64, h: 64, frames: 12 },
                          enemy_purple: { sx: 37, sy: 0, w: 42, h: 43, frames: 1 }}
                  };

    var board_test = new GameBoard();
    var enemigo = new Enemy(enemies.basic, {});
    var misiles = new PlayerMissile(10, 20);
    misiles.damage = 20;

    board_test.add (misiles);
    board_test.add (enemigo);

    board_test.step (0.005);

    // comprobamos si hay una explosion en el board, ya que esto nos 
    // indicará que han colisionado el enemigo y los misiles
    expect(board_test.objects[0].sprite).toBe('explosion');

  });


  it ("Misil daña a nave pero no la destruye y esta desaparece", function (){

    SpriteSheet = { map: {missile: { sx: 0, sy: 30, w: 2, h: 10, frames: 1 },
                          explosion: { sx: 0, sy: 64, w: 64, h: 64, frames: 12 },
                          enemy_purple: { sx: 37, sy: 0, w: 42, h: 43, frames: 1 }}
                  };

    var board_test = new GameBoard();
    var enemigo = new Enemy(enemies.basic, {});
    var misiles = new PlayerMissile(10, 20);
    misiles.damage = 1;

    board_test.add (misiles);
    board_test.add (enemigo);

    board_test.step (0.005);

    // probamos si la vida del enemigo ha disminuido en 1, ya que este 
    // es el daño del misil
    expect(enemigo.health).toBe (19);
    // comprobamos si hay 1 objeto en el board
    expect(board_test.objects.length).toEqual(1);
    // comprobamos si ese objeto del board es el enemigo
    expect(board_test.objects[0]).toBe(enemigo);

  });


  it ("FireBall destruye nave enemiga, ella desaparece pero la bola no", function (){

    SpriteSheet = { map: {fireball: { sx: 0, sy: 64, w: 64, h: 64, frames: 1 },
                          explosion: { sx: 0, sy: 64, w: 64, h: 64, frames: 12 },
                          enemy_purple: { sx: 37, sy: 0, w: 42, h: 43, frames: 1 }}
                  };

    var board_test = new GameBoard();
    var enemigo = new Enemy(enemies.basic, {});
    var firebola = new FireBall(10, 20, "right");

    board_test.add (firebola);
    board_test.add (enemigo);

    board_test.step (0.005);

    // probamos si la vida del enemigo ha disminuido en 1, ya que este 
    // es el daño del misil
    expect(enemigo.health).toBe (0);
    // comprobamos si hay 2 objetos en el board (explosion y firebola)
    expect(board_test.objects.length).toEqual(2);
    // comprobamos si explosion y firebola estan en el board
    expect(board_test.objects[0]).toBe(firebola);
    expect(board_test.objects[1].sprite).toBe('explosion');
    
  });  


it ("Nave jugador y enemigo colisionan", function (){

    SpriteSheet = { map: {ship: { sx: 0, sy: 0, w: 37, h: 42, frames: 1 },            
                          enemy_purple: { sx: 37, sy: 0, w: 42, h: 43, frames: 1 }}
                  };

    var board_test = new GameBoard();
    
    var player = new PlayerShip();
    /*
    // usamos esto para obtener lo que vale 'player.x' y 'player.y'
    expect (player.x).toEqual(1); // obtenemos 141.5
    expect (player.y).toEqual(1); // obtenemos 428
    */
    var enemigo = new Enemy(enemies.basic, {});
    enemigo.x = 141.5;
    enemigo.y = 428;

    board_test.add(player);
    board_test.add (enemigo);

    board_test.step (0.005);

    // comprobamos que no hay ningun objeto en el board
    expect(board_test.objects.length).toBe(0);
    
  });    


});