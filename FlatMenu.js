$(function(){
    var barr = $("#barr");
    var menuu = $("#menuu");
    var scroll_start_position = 0;

    function SortByName(x,y) {
      return ((x.item == y.item) ? 0 : ((x.item > y.item) ? 1 : -1 ));
    }

    var menu_position;
    var snapping_points = new Array(11);
    var reverse_snapping_points;
    
    $.getJSON('data.json', function(data){
        // Call Sort By Name
        data.sort(SortByName);
        
        // 項目をメニューに挿入
        for(var i in data){
            $("#" + data[i].id + " .left").append("<a href='" + data[i].link + "'>" + data[i].left + "</a><br>");
            $("#" + data[i].id + " .right").append("<a href='" + data[i].link + "'>" +  data[i].right +"<br>");
        }
        
        menu_position = $('div#menuu').offset().top;
        
        // あかさたなの初期位置
        snapping_points[0]  = $('div#az').offset().top;
        snapping_points[1]  = $('div#a' ).offset().top;
        snapping_points[2]  = $('div#k' ).offset().top;
        snapping_points[3]  = $('div#s' ).offset().top;
        snapping_points[4]  = $('div#t' ).offset().top;
        snapping_points[5]  = $('div#n' ).offset().top;
        snapping_points[6]  = $('div#h' ).offset().top;
        snapping_points[7]  = $('div#m' ).offset().top;
        snapping_points[8]  = $('div#y' ).offset().top;
        snapping_points[9]  = $('div#r' ).offset().top;
        snapping_points[10] = $('div#w' ).offset().top;    
        
        reverse_snapping_points = $($(snapping_points).get().reverse()); // startを逆順にした配列
    });
    
    barr.mousedown(function(){
        scroll_start_position = barr.scrollTop();  // スクロール開始位置
    });

    barr.scroll(function(){
        var current_position = barr.scrollTop();  // 現在のスクロール位置
        var scroll_amount = current_position - scroll_start_position; // スクロール量
        
        // 一つ後のあかさたな要素までスナップ
        if(scroll_amount > 200){
            $(snapping_points).each(
                function(i){
                    if(current_position < snapping_points[i]){
                        menuu.scrollTop(snapping_points[i+1] - menu_position);
                        return false; // breakの代わりにこう書く
                    }
                }
            );
        }
        // 一つ前のあかさたな要素までスナップ
        else if(scroll_amount < -200){
            $(reverse_snapping_points).each(
                function(i){
                    if(current_position > reverse_snapping_points[i]){
                        menuu.scrollTop(reverse_snapping_points[i] - menu_position);
                        return false;
                    }
                }
            );
        }
        // 普通にスクロール
        else if(scroll_amount != 0){
            menuu.scrollTop(current_position);
        }
    });
});