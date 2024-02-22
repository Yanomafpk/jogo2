// Configurações gerais do jogo
var config = {
  type: Phaser.AUTO,
  width: 650,
  height: 300,
  physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 0 },
          debug: false
      }
  },
  // Define a cena do jogo
  scene: {
  preload: preload,
  create: create,
  update: update
 }
};

// Cria o jogo com as configurações definidas
var game = new Phaser.Game(config);

  // Função para carregar os recursos do jogo
  function preload() {
      // carregar ponto de exclamação
      this.load.spritesheet('exclamacao', 'imagens/pontoExclamacao.png', { frameWidth: 350, frameHeight: 320 });
      // carregar o fundo do jogo
      this.load.image('back', 'imagens/mapa.png');
      // carregar a ambulância
      this.load.spritesheet('ambulancia', 'imagens/ambulancia.png', { frameWidth: 480, frameHeight: 480 });
      // carregar a imagem do botão
      this.load.image('botao', 'imagens/ponteiro.png');
  }

  // Função para configurar os elementos do jogo
  function create() {
      
      // adicionar o fundo
      this.add.sprite(400, 335, 'back').setScale(1.3);

      // adicionar a ambulância e guardar em uma variável
      this.player = this.physics.add.sprite(100, 300, 'ambulancia').setScale(0.2);

      this.map = this.physics.add.sprite('back')

      // Criar animação para a ambulância
      this.anims.create({
          key: 'sirene',
          frames: this.anims.generateFrameNumbers('ambulancia', { start: 0, end: 1 }),
          frameRate: 2,
          repeat: -1
      });

      // Adiciona um ponto de exclamação animado
      this.exclamacao = this.add.sprite(635, 66, 'exclamacao').setScale(0.13);
      this.anims.create({
          key: 'exclamar',
          frames: this.anims.generateFrameNumbers('exclamacao', { start: 0, end: 1 }),
          frameRate: 2,
          repeat: -1
      });
      this.exclamacao.anims.play('exclamar', true);

      // Tocar a animação da ambulância
      this.player.anims.play('sirene', true);

      // configurar colisão com os limites do mundo
      this.player.setCollideWorldBounds(true);

      // criar cursores para capturar eventos de teclado
      this.cursors = this.input.keyboard.createCursorKeys();
      // Configura a tecla de seta para a direita para ser pressionada
      this.seta = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

      // Adiciona um botão
      var button = this.add.image(100, this.sys.game.config.height - 130, 'botao').setScale(0.3)
          .setInteractive()
          .on('pointerdown', () => {
              // Ao clicar no botão, comece a mover a ambulância para a direita continuamente
              this.seta.isDown = true;
          })
          .on('pointerup', () => {
              // Quando o botão é solto, pare de mover a ambulância
              this.seta.isDown = false;
          });

      // Centraliza o botão
      button.setOrigin(0.5);

      // Adiciona uma área de interação para esconder a exclamação quando a ambulância colidir com ela
      this.interactionArea = this.physics.add.sprite(700, 300, null).setScale(1.5);
      this.interactionArea.visible = false;
      this.physics.add.overlap(this.player, this.interactionArea, () => {
          this.exclamacao.visible = false;
          setTimeout(() => {
              window.location.href = "desafios/pergunta1.html";
          }, 800); // 800 milissegundos = 0,8 segundo
        
      });
      
      //código da camera
      const camera = this.cameras.main
      camera.startFollow(this.player)
      
  }

  // Função que atualiza o estado do jogo
  function update() {
      // mover a ambulância de acordo com as teclas pressionadas ou o botão
      if (this.cursors.right.isDown || this.seta.isDown) {
          this.player.setVelocityX(100);
      } else if (this.cursors.left.isDown) {
          this.player.setVelocityX(-100);
      } else {
          this.player.setVelocityX(0);
      }

  }

var cenaPrincipal = new Phaser.Scene('Principal');

cenaPrincipal.preload = function() {

};

cenaPrincipal.create = function() {

};

cenaPrincipal.update = function() {

  if (chegouAoLugarX()) {}
};