$(function(){
    var barr = $("#barr");
    var menuu = $("#menuu");
    var scroll_start = 0;
    var scroll_now

    
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

    $('#position_a').text('あ: '+start[0]);
    $('#position_ka').text('か: '+start[1]);      


    barr.mousedown(function(){
	scroll_start = barr.scrollTop()  // スクロール開始位置
        console.log('scroll_start:' + scroll_start)
    });

    barr.scroll(function(){
	scroll_now = barr.scrollTop()  // 現在のスクロール位置
        console.log('scroll_now:' + scroll_now)

	scroll_amount = scroll_now - scroll_start // スクロール量
	console.log(scroll_amount)

	if(scroll_amount != 0){
            menuu.scrollTop(scroll_now)
	}
	
        $('#position_a').text('あ: '+$('div#a').offset().top);
        $('#position_ka').text('か: '+$('div#ka').offset().top);
    });
});