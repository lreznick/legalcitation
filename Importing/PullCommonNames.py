
import codecs
import xlrd #http://scienceoss.com/read-excel-files-from-python/
import re
import unicodedata

f = open("WikipediaCommonNames.txt")

Countries = []

Com = []
Off = []


common_one = re.compile("[\w\s]+(?=\]\]\s?<br />)")
common_two = re.compile("[\w\s]+(?=\]\]''' \(common, English\))")
common_three = re.compile("[\w\s]+(?=''' \(common, English\))")
#common_four = re.compile("[\w\s]+(?=\]\]\s?<br />\(shortened form\))")

for line in f:
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
	#	print match_four.group()

		

