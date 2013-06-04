class Room(object):

    def __init__(self, name, description):
        self.name = name
        self.description = description
        self.paths = {}

    def go(self, direction):
        return self.paths.get(direction, None)

    def add_paths(self, paths):
        self.paths.update(paths)
        
    def addstuff(self,x):
        return x
    
def returnsame(x):
    return x

def Contains(list, string):
    for x in list:
        if x in string: return True
    return False    