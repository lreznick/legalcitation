
import codecs
import xlrd #http://scienceoss.com/read-excel-files-from-python/
import re
import unicodedata

#f = open("WikipediaCommonNames.txt")

f = codecs.open("shortofficial.txt", encoding='utf-8')

begin = '<td valign="top"><span id'


Countries = []

Com = []
Off = []

official = re.compile("(?=;–)[\w\s]+(?=</)")
common = re.compile('(?= title\=")[\w\s]+(?=">)')


for line in f:
	if begin not in line: continue
	match_off = common.search(line)
	match_com = official.search(line)
	if match_off and match_com:
		Countries.append([match_off.group(), match_com.group()])

	





		

#common_one = re.compile("[\w\s]+(?=\]\]\s?<br />)")
#common_two = re.compile("[\w\s]+(?=\]\]''' \(common, English\))")
#common_three = re.compile("[\w\s]+(?=''' \(common, English\))")
##common_four = re.compile("[\w\s]+(?=\]\]\s?<br />\(shortened form\))")
'''
	if begin not in line: continue
	match_one = common_one.search(line)
	match_two = common_two.search(line)
	match_three = common_three.search(line)
	#match_four = common_four.search(line)
	if match_one:
		print match_one.group()
	if match_two:
		print match_two.group()
	if match_three:
		print match_three.group()
	#if match_four:
	#	print match_four.group()'''