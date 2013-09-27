/*
 * Autor: Renan Vaz
 * http://renanvaz.com.br
 */
 
(function($){
    
	
	
    $.fn.content_slider = function(params){

        var defaults = {
            direction: 'x',
            easing:  'easeInOutExpo',
            speed:  700, 
            timeout: 0, 
            pager:  null,
            next:   null, 
            prev:   null,
            index: 0
        };
        
        var p = $.extend(defaults, params);
        
        return $(this).data('content_slider_params', p).each(function(){
            var $SELF = $(this);
            var W = $(this).innerWidth();
            var H = $(this).innerHeight();
           
            $(this).css({
                position: $(this).css('position') == 'static' ? 'relative' : $(this).css('position'),
                overflow: 'hidden'
            });
           
            $(this).children().css({
                position: 'absolute',
                top: 0,
                left: 0,
                display: 'none'
            });
            
			
            if(p.pager){
                for(var i = 1; i <= $(this).children().length; i++){
                    var page = $('<li><a href="#">'+i+'</a></li>').bind('click', function(){
                        goto_slide($SELF, $(this).index());
                        return false;
                    })
                    $(p.pager).append(page);
                }
            }
            
            if(p.prev){
                $(p.prev).bind('click', function(){
                    goto_slide($SELF, $SELF.data('content_slider_index') - 1);
                    return false;
                });
            }
            
            if(p.next){
                $(p.next).bind('click', function(){
                    goto_slide($SELF, $SELF.data('content_slider_index') + 1);
                    return false;
                });
            }
            
            goto_slide($SELF, p.index);
            //if(p.timeout)
            //$SELF.data('content_slider_to', setTimeout(function(){ goto_slide($SELF, $SELF.data('content_slider_index') + 1); }, p.timeout));
        });
    }
    
    $.fn.content_slider_goto = function(n){
		goto_slide($(this), n);
	}
	
    function goto_slide($SELF, n){
		var direction_right = n > $SELF.data('content_slider_index');
		
        if(n < 0){
            var _n = Math.floor(n/$SELF.children().length);
            n = (n - $SELF.children().length * _n)%$SELF.children().length;
        }else{
            n = n%$SELF.children().length;
        }

        var index = $SELF.data('content_slider_index');

        if(n !== index){
            clearTimeout($SELF.data('content_slider_to'));
            var p = $SELF.data('content_slider_params');
            var W = $SELF.innerWidth();
            var H = $SELF.innerHeight();
			console.log('height '+H);
            
            if(index === undefined){
                $SELF.children(':eq('+n+')').show();
            }else{

                if(p.direction == 'x'){
                    if(direction_right){
                        $SELF.children(':eq('+n+')').stop().css({left: W}).show().animate({left: 0}, p.speed, p.easing);
                        $SELF.children(':eq('+index+')').stop().animate({left: -W}, p.speed, p.easing, function(){ $(this).hide() });
                    }else{
                        $SELF.children(':eq('+n+')').stop().css({left: -W}).show().animate({left: 0}, p.speed, p.easing);
                        $SELF.children(':eq('+index+')').stop().animate({left: W}, p.speed, p.easing, function(){ $(this).hide() });
                    }
                }else if(p.direction == 'y'){
                    if(index < n){
                        $SELF.children(':eq('+n+')').stop().css({top: H}).show().animate({top: 0}, p.speed, p.easing);
                        $SELF.children(':eq('+index+')').stop().animate({top: -H}, p.speed, p.easing, function(){ $(this).hide() });
                    }else{
                        $SELF.children(':eq('+n+')').stop().css({top: -H}).show().animate({top: 0}, p.speed, p.easing);
                        $SELF.children(':eq('+index+')').stop().animate({top: H}, p.speed, p.easing, function(){ $(this).hide() });
                    }
                }
            }
            
			
            if(p.pager){
                if(index === undefined){
                    $(p.pager).children(':eq('+n+')').children().addClass('current');    
                }else{
                    $(p.pager).children(':eq('+index+')').children().removeClass('current');
                    $(p.pager).children(':eq('+n+')').children().addClass('current');
                }
            }
            
			
            $SELF.data('content_slider_index', n);
			
			//EVENT
			$SELF.trigger('content_slider_goto');
			
            //if(p.timeout)
            //$SELF.data('content_slider_to', setTimeout(function(){ goto_slide($SELF, $SELF.data('content_slider_index') + 1); }, p.timeout));
        }
        
    }
})(jQuery)