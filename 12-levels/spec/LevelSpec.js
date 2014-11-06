/*

  Requisitos:

    El objetivo de este prototipo es añadir niveles al juego. En cada
    nivel deberán ir apareciendo baterías de enemigos según avanza el
    tiempo.

    Cada nivel termina cuando no quedan enemigos por crear en ninguno
    de sus niveles, y cuando todos los enemigos del nivel han
    desaparecido del tablero de juegos (eliminados por misiles/bolas
    de fuego o desaparecidos por la parte de abajo de la pantalla).

    Cuando terminan todos los niveles sin que la nave haya colisionado
    termina el juego, ganando el jugador.

    Cuando la nave del jugador colisiona con un enemigo debe terminar
    el juego, perdiendo el jugador.


  Especificación:

    El constructor Level() recibirá como argumentos la definición del
    nivel y la función callback a la que llamar cuando termine el
    nivel.

    La definición del nivel tiene este formato:
      [ 
        [ parametros de bateria de enemigos ] , 
        [ parametros de bateria de enemigos ] , 
        ... 
      ]


      Los parámetros de cada batería de enemigos son estos:
           Comienzo (ms),  Fin (ms),   Frecuencia (ms),  Tipo,    Override
 Ejemplo:
         [ 0,              4000,       500,              'step',  { x: 100 } ]


    Cada vez que se llame al método step() del nivel éste comprobará:

      - si ha llegado ya el momento de añadir nuevos sprites de alguna
        de las baterías de enemigos.
    
      - si hay que eliminar alguna batería del nivel porque ya ha
        pasado la ventana de tiempo durante la que hay tiene que crear
        enemigos

      - si hay que terminar porque no quedan baterías de enemigos en
        el nivel ni enemigos en el tablero de juegos.

*/

describe ("Clase Level", function(){

  var canvas, ctx;
  var enemigos, level;
  var nivel_test;
  var game_test;

  beforeEach(function(){
    loadFixtures('index.html');
    canvas = $('#game')[0];
    expect(canvas).toExist();
    ctx = canvas.getContext('2d');
    expect(ctx).toBeDefined();


    level = [[0, 4000, 500, 'circle2'],
             [6000, 13000, 800, 'ltr']];

    dummyfunc = function (){};

    nivel_test = new Level(level, dummyfunc);


  });


  it ("constructor Level", function(){
    // comprobamos si el nivel esta definido
    expect(nivel_test).toBeDefined();
    // comprobamos el numero de datos del nivel
    expect(nivel_test.levelData.length).toEqual(level.length);
  });


  it ("step ()", function(){
    
    sprites = {map:{ship: { sx: 0, sy: 0, w: 37, h: 42, frames: 1 },
                    missile: { sx: 0, sy: 30, w: 2, h: 10, frames: 1 },
                    enemy_purple: { sx: 37, sy: 0, w: 42, h: 43, frames: 1 },
                    enemy_bee: { sx: 79, sy: 0, w: 37, h: 43, frames: 1 },
                    enemy_ship: { sx: 116, sy: 0, w: 42, h: 43, frames: 1 },
                    enemy_circle: { sx: 158, sy: 0, w: 32, h: 33, frames: 1 },
                    explosion: { sx: 0, sy: 64, w: 64, h: 64, frames: 12 },
                    fireball: { sx: 0, sy: 64, w: 64, h: 64, frames: 1 }}};

    var board_test = new GameBoard();
    board_test.add (nivel_test);

    spyOn (nivel_test.board, "add");

    nivel_test.step(1);
    // comprobamos si se agrega el nivel al board
    expect (nivel_test.board.add).toHaveBeenCalled();
    // miramos que tenemos un enemigo
    expect (nivel_test.board.add.callCount).toEqual(1);
    // hacemos que ahora siga la siguiente bateria de enemigos
    nivel_test.t = 6001;
    nivel_test.step(1);
    // comprobamos si se llama a add
    expect (nivel_test.board.add).toHaveBeenCalled();
    // miramos que tenemos un enemigo
    expect (nivel_test.board.add.callCount).toEqual(2);
  
  });

});