$(function(){
    var barr = $("#barr");
    var menuu = $("#menuu");

    
    //あかさたなの初期位置
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
        console.log(
            'top:' + barr.scrollTop() + '\n' +
		'height:' + barr.scrollLeft()
        )
    });

    barr.scroll(function(){
        console.log(
            'nowtop:' + barr.scrollTop() + '\n' +
		'nowheight:' + barr.scrollLeft())
        menuu.scrollTop(barr.scrollTop())
        $('#out').text('scrollTop: '+$(this).scrollTop());
        $('#position_a').text('あ: '+$('div#a').offset().top);
        $('#position_ka').text('か: '+$('div#ka').offset().top);
    });
});  //$(function())