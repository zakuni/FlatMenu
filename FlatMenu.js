$(function(){
    var barr = $("#barr");
    var menuu = $("#menuu");
    var scroll_start = 0;
    var scroll_now;

    
    // あかさたなの初期位置
    var start = new Array(10);

    start[0] = $('div#a').offset().top
    start[1] = $('div#ka').offset().top
    start[2] = $('div#sa').offset().top
    start[3] = $('div#ta').offset().top
    start[4] = $('div#na').offset().top
    start[5] = $('div#ha').offset().top
    start[6] = $('div#ma').offset().top
    start[7] = $('div#ya').offset().top
    start[8] = $('div#ra').offset().top
    start[9] = $('div#wa').offset().top    

    var start_reverse = $($(start).get().reverse()); // startを逆順にした配列
  
    $('#position_a').text('あ: '+start[0]);
    $('#position_ka').text('か: '+start[1]);      


    barr.mousedown(function(){
	scroll_start = barr.scrollTop();  // スクロール開始位置
        console.log('scroll_start:' + scroll_start);
    });

    barr.scroll(function(){
	scroll_now = barr.scrollTop()  // 現在のスクロール位置
        console.log('scroll_now:' + scroll_now);

	scroll_amount = scroll_now - scroll_start // スクロール量
	console.log('scroll_amount:' + scroll_amount);

	// 一つ後のあかさたな要素までスナップ
	if(scroll_amount > 100){
	    $(start).each(
		function(i){
		    if(scroll_now < start[i]){
			console.log(start[i+1]);
			menuu.scrollTop(start[i+1]);
			return false; // breakの代わりにこう書く
		    }
		}
	    );
	}
	// 一つ前のあかさたな要素までスナップ
	else if(scroll_amount < -100){
	    start_reverse.each(
		function(i){
		    if(scroll_now > start_reverse[i]){
			console.log(start_reverse[i+1]);
			menuu.scrollTop(start_reverse[i+1]);
			return false;
		    }
		}
	    );
	}
	else if(scroll_amount != 0){
            menuu.scrollTop(scroll_now);
	}
	
        $('#position_a').text('あ: '+$('div#a').offset().top);
        $('#position_ka').text('か: '+$('div#ka').offset().top);
    });
});