$(function(){
    var barr = $("#barr");
    var menuu = $("#menuu");
    var scroll_start = 0;
    var scroll_now = 0;


    function SortByName(x,y) {
      return ((x.item == y.item) ? 0 : ((x.item > y.item) ? 1 : -1 ));
    }


    var menu_position;
    var start = new Array(11);
    var start_reverse;
    
   $.getJSON('data.json', function(data){
	// Call Sort By Name
	data.sort(SortByName);

	for(var i in data){ // 項目をメニューに挿入
        $("#" + data[i].id + " .left").append("<a href='" + data[i].link + "'>" + data[i].left + "</a><br>");
        $("#" + data[i].id + " .right").append("<a href='" + data[i].link + "'>" +  data[i].right +"<br>");
	}

	menu_position = $('div#menuu').offset().top;
	// あかさたなの初期位置

	start[0] = $('div#az').offset().top;
	start[1] = $('div#a').offset().top;
	start[2] = $('div#k').offset().top;
	start[3] = $('div#s').offset().top;
	start[4] = $('div#t').offset().top;
	start[5] = $('div#n').offset().top;
	start[6] = $('div#h').offset().top;
	start[7] = $('div#m').offset().top;
	start[8] = $('div#y').offset().top;
	start[9] = $('div#r').offset().top;
	start[10] = $('div#w').offset().top;    

	start_reverse = $($(start).get().reverse()); // startを逆順にした配列
    });
    
    barr.mousedown(function(){
	scroll_start = barr.scrollTop();  // スクロール開始位置
    });

    barr.scroll(function(){
	scroll_now = barr.scrollTop();  // 現在のスクロール位置
	scroll_amount = scroll_now - scroll_start; // スクロール量

	// 一つ後のあかさたな要素までスナップ
	if(scroll_amount > 200){
        $(start).each(
		function(i){
            if(scroll_now < start[i]){
			menuu.scrollTop(start[i+1] - menu_position);
			return false; // breakの代わりにこう書く
            }
		}
        );
	}
	// 一つ前のあかさたな要素までスナップ
	else if(scroll_amount < -200){
        $(start_reverse).each(
		function(i){
            if(scroll_now > start_reverse[i]){
			menuu.scrollTop(start_reverse[i] - menu_position);
			return false;
            }
		}
        );
	}
	// 普通にスクロール
	else if(scroll_amount != 0){
            menuu.scrollTop(scroll_now);
	}
    });
});