import codecs
import xlrd #http://scienceoss.com/read-excel-files-from-python/
import re
import unicodedata


def safe_str(obj):
    """ return the byte string representation of obj """
    try:
        return str(obj)
    except UnicodeEncodeError:
        # obj is unicode
        return unicode(obj).encode('unicode_escape')
        
def chunks(l, n):
    """ Yield successive n-sized chunks from l.
    """
    for i in xrange(0, len(l), n):
        yield l[i:i+n]

Journals = []



wb = xlrd.open_workbook('journals.xlsx') # open in read mode
sh = wb.sheet_by_index(0)



for rownum in range(sh.nrows):
    Row = sh.row_values(rownum)
    Row[0] = safe_str(Row[0].strip())
    Row[1] = safe_str(Row[1].strip())
    print Row
    Journals.append(Row)




