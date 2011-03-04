# -*- coding: utf-8 -*-
require "rubygems"
require "csv"
require "json"
require "nokogiri"
require "open-uri"
require "igo-ruby"

if ARGV[0].nil?
  ARGV[0] = "sample.csv"
end

tagger = Igo::Tagger.new('/usr/local/share/ipadic')  # 解析用辞書のディレクトリを指定

sentences = []
sentences.push('吾輩は猫である。名前はまだ無い。')
sentences.push('メロスは激怒した')
sentences.push('走れメロス')
sentences.push('夏目漱石')
sentences.push('出汁のとり方')

analyzed = []

sentences.each{|sentence|
  t = tagger.parse(sentence)
#  p sentence.split(//u).length  # UTF-8の文字数を返す
  t.each{|m|
#    puts("#{m.surface} #{m.feature} #{m.start}")
    analyzed.push("#{m.surface} #{m.feature} #{m.start}")
    if(m.feature =~ /^名詞|^動詞/)
      unless(m.start-1 < 0)
        print sentence.split(//u)[0..m.start-1] # 名詞までの文章を表示
        print(" ")
        print sentence.split(//u)[m.start..sentence.split(//u).length] # 名詞以降の文章を表示
        print("\n")
      end
    end
#    puts("#{m.surface} #{m.feature.split(",")[0]} #{m.feature.split(",")[-2]}")
  }
  puts sentence
}



menu = []

#CSV.open('list_person_all_extended.csv', 'r') do |row|
CSV.open(ARGV[0], 'r') do |row|
#CSV.open('safety.csv', 'r') do |row|
  if /\A[A-Za-z]/ =~ row[3]
    id = "az"
  elsif /\Aあ/ =~ row[3]
    id = "a"
  elsif /\Aい/ =~ row[3]
    id = "i"
  elsif /\Aう/ =~ row[3]
    id = "u"
  elsif /\Aえ/ =~ row[3]
    id = "e"
  elsif /\Aお/ =~ row[3]
    id = "o"
  elsif /\Aか|\Aき|\Aく|\Aけ|\Aこ/ =~ row[3]
    id = "k"
  elsif /\Aさ|\Aし|\Aす|\Aせ|\Aそ/ =~ row[3]
    id = "s"
  elsif /\Aた|\Aち|\Aつ|\Aて|\Aと/ =~ row[3]
    id = "t"
  elsif /\Aな|\Aに|\Aぬ|\Aね|\Aの/ =~ row[3]
    id = "n"
  elsif /\Aは|\Aひ|\Aふ|\Aへ|\Aほ/ =~ row[3]
    id = "h"
  elsif /\Aま|\Aみ|\Aむ|\Aめ|\Aも/ =~ row[3]
    id = "m"
  elsif /\Aや|\Aゆ|\Aよ/ =~ row[3]
    id = "y"
  elsif /\Aら|\Aり|\Aる|\Aれ|\Aろ/ =~ row[3]
    id = "r"
  elsif /\Aわ|\Aを|\Aん/ =~ row[3]
    id = "w"
  else
    id = "az"
  end

  if /\A[A-Za-z]/ =~ row[19]
    id2 = "az"
  elsif /\Aあ/ =~ row[19]
    id2 = "a"
  elsif /\Aい/ =~ row[19]
    id2 = "i"
  elsif /\Aう/ =~ row[19]
    id2 = "u"
  elsif /\Aえ/ =~ row[19]
    id2 = "e"
  elsif /\Aお/ =~ row[19]
    id2 = "o"
  elsif /\Aか|\Aき|\Aく|\Aけ|\Aこ/ =~ row[19]
    id2 = "k"
  elsif /\Aさ|\Aし|\Aす|\Aせ|\Aそ/ =~ row[19]
    id2 = "s"
  elsif /\Aた|\Aち|\Aつ|\Aて|\Aと/ =~ row[19]
    id2 = "t"
  elsif /\Aな|\Aに|\Aぬ|\Aね|\Aの/ =~ row[19]
    id2 = "n"
  elsif /\Aは|\Aひ|\Aふ|\Aへ|\Aほ/ =~ row[19]
    id2 = "h"
  elsif /\Aま|\Aみ|\Aむ|\Aめ|\Aも/ =~ row[19]
    id2 = "m"
  elsif /\Aや|\Aゆ|\Aよ/ =~ row[19]
    id2 = "y"
  elsif /\Aら|\Aり|\Aる|\Aれ|\Aろ/ =~ row[19]
    id2 = "r"
  elsif /\Aわ|\Aを|\Aん/ =~ row[19]
    id2 = "w"
  else
    id2 = "az"
  end
  
  # 作者名 + 作品名
  menu.push([[" " + row[19] + row[20] + row[3]], # 読み(ソート用)
             [row[15] + row[16] + " : " + row[1]], #item
             [" "], # left
             [" " + row[15] + row[16] + " : " + row[1]], # right
             [id2],# id
             [" " + row[50]]]) # link
  
  
  # 作品名
  menu.push([[" " + row[3] + row[19] + row[20]], # 読み(ソート用)
             [row[1] + " : " + row[15] + row[16]], # item
             [row[15] + row[16]], # left
             [" " + row[1]], # right
             [id], # id
             [" " + row[50]]]) # link
  

end

menu_sort = menu.sort


=begin
aozora_html = File.open("aozora.html", "w")    # 書き込み専用でファイルを開く（新規作成）
aozora_html.puts '<html><body>'
menu_sort.each do |elem|
  aozora_html.write(elem[2])
  aozora_html.print "<a href='"
  aozora_html.write(elem[5])
  aozora_html.print "'>"
  aozora_html.write(elem[3])
  aozora_html.puts "</a><br>"
#  aozora_html.write("<a href='" + elem[5] + "'>" + elem[3] + "</a>")
#  p elem[5]
end
aozora_html.puts '</body></html>'
aozora_html.close        # ファイルクローズ
=end


# Get a Nokogiri::HTML:Document for the page we’re interested in...

f=File.open('aozorabooks.html')
@doc = Nokogiri::HTML(f, nil, 'UTF-8')

nokogiritest = File.open("sample.html", "w") 

menu_sort.each do |elem|
  unless elem[4] == ""
    unless elem[5] == ""
      unless elem[3] == ""
        unless elem[2].nil?
          left = @doc.at_xpath('//div[@id="'+ elem[4].to_s + '"]/div[@class="left"]')
          left.add_child(elem[2].to_s)
          left.add_child("<br>")

          right = @doc.at_xpath('//div[@id="'+ elem[4].to_s + '"]/div[@class="right"]')
          right.add_child("<a href='" + elem[5].to_s + "' target=_blank>" + elem[3].to_s)
          right.add_child("<br>")

          barr = @doc.at_xpath('//div[@id="barr"]')
          barr.add_child("<br><br>")
        end
      end
    end
  end
end


nokogiritest = File.open("sample.html", "w")    # 書き込み専用でファイルを開く（新規作成）
nokogiritest.write(@doc.to_html)
nokogiritest.close        # ファイルクローズ

#print @doc.to_html
#puts menu_sort
puts menu_sort.length


