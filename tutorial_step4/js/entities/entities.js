/**
 * Player Entity
 */
game.PlayerEntity = me.ObjectEntity.extend(
{	
  
  /* -----

		constructor
		
	  ------			*/
	
	init:function (x, y, settings)
	{
		// call the constructor
		this.parent(x, y , settings);
		
		// set the default horizontal & vertical speed (accel vector)
		this.setVelocity(3, 15);
	 
        // update the collision shape rect
        this.shapes[0].pos.x = 8;
        this.shapes[0].resize(48, this.shapes[0].height);
		
		// set the display to follow our position on both axis
		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
		
	},

	/* -----

		update the player pos
		
	  ------			*/
	update : function (dt)
	{
			
		if (me.input.isKeyPressed('left'))
		{
			// flip the sprite on horizontal axis
			this.flipX(true);
			// update the entity velocity
			this.vel.x -= this.accel.x * me.timer.tick;
		}
		else if (me.input.isKeyPressed('right'))
		{
			// unflip the sprite
			this.flipX(false);
			// update the entity velocity
			this.vel.x += this.accel.x * me.timer.tick;
		}
		else
		{
			this.vel.x = 0;
		}
		if (me.input.isKeyPressed('jump'))
		{	
			if (!this.jumping && !this.falling) 
			{
				// set current vel to the maximum defined value
				// gravity will then do the rest
				this.vel.y = -this.maxVel.y * me.timer.tick;
				// set the jumping flag
				this.jumping = true;
			}
		}
		
		// check & update player movement
		updated = this.updateMovement();
			 
		// update animation
		if (this.vel.x!=0 || this.vel.y!=0)
		{
			// update object animation
			this.parent(dt);
			return true;
		}
		
		// else inform the engine we did not perform
		// any update (e.g. position, animation)
		return false;
	}

});
