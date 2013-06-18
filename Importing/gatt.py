import codecs
import xlrd #http://scienceoss.com/read-excel-files-from-python/
import re
import unicodedata
wb = xlrd.open_workbook('gatt.xls') # open in read mode
sh = wb.sheet_by_index(0)

GATT = []

def safe_str(obj):
    """ return the byte string representation of obj """
    try:
        return str(obj)
    except UnicodeEncodeError:
        # obj is unicode
        return unicode(obj).encode('unicode_escape')

for rownum in range(sh.nrows):
    Row = sh.row_values(rownum)
    Row = safe_str(Row[0])
    m = re.compile(r'^([a-zA-Z\'\s,]*)')
    result = m.search(Row)
    print Row
    print result.group(1)
    GATT.append(result.group(1).strip())
    
print GATT
    
    