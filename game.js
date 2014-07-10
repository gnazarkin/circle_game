function Game(circleCount, duration){
	this.score = 0;
	this.circles = [];
	this.duration = (duration || 10) * 1000;
	this.circleCount = circleCount || 10;


	this.start= function(){
		for (var i = 0; i < this.circleCount; i++){
			this.circles.push(new Circle());
			this.circles[i].render();
			this.circles[i].move();
		}

		$('#score').text(this.score);
		var _this = this;
		setTimeout(_this.stop, _this.duration);
	}

	this.stop = function() {
    alert("GAME OVER!");
    for (var i=0; i < window.game.circleCount; i++) {
      window.game.circles[i].$me.remove();
    }
  };
}

function Circle(){
	this.x = Math.random() * 450;
	this.y = Math.random() * 450;
	this.diameter = 30 + Math.random() * 50;
	this.speed = 500 + Math.random() * 1500;


	this.render = function() {
    var _this = this;

    this.$me = $('<div class="circle"></div>')
      .css('left', this.x)
      .css('top', this.y)
      .css('height', this.diameter)
      .css('width', this.diameter)
      .on('click', function(){
        _this.kill();
      });

    $('#game').append(this.$me);
  };

	this.move = function() {
		var _this = this;
		this.$me.animate({
			top: Math.random() * 450,
			left: Math.random() * 450
		}, {
			duration: this.speed,
			complete: function() {
				_this.move();
			}
		});
	};

	this.kill = function() {
    this.$me.css('background-color', 'red')
      .effect({
        effect: 'explode',
        duration: 100,
        complete: function() {
          $(this).remove();
          $('#score').text(window.game.score += 100);
        },
        queue: false
    });
  };
}

$(document).ready(function(){
	window.game = new Game();
	window.game.start(10, 10);
})

