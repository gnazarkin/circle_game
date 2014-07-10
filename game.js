function Circle(){
	this.x = Math.random() * 450;
	this.y = Math.random() * 450;
	this.diameter = 30 + Math.random() * 50;
	this.speed = 500 + Math.random() * 1500;

	this.render = function() {
		this.$me = $('<div class="circle"></div>')
			.css('left', this.x)
			.css('top', this.y)
			.css('height', this.diameter)
			.css('width', this.diameter)

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
		this.$me.css('background-color','red')
			.effect({
				effect: 'explode',
				duration: 100,
				complete: function() {
					$(this).remove();
				},
				queue: false
			})
	}
}

$(document).ready(function(){

	var circles = [];

	for (var i = 0; i < 10; i++){
		circles.push(new Circle());
		circles[i].render();
		circles[i].move();
	}

})

