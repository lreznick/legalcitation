
import codecs
import xlrd #http://scienceoss.com/read-excel-files-from-python/
import re
import unicodedata

f = open("WikipediaCommonNames.txt")

Countries = []

Com = []
Off = []


common_one = re.compile("[\w\s]+(?=\]\] <br />\(common, English\))")


for line in f:
	match = common_one.search(line)
	if match:
		print line
		print match.group()

		

