#Very important!!! Remember to start all definitions that you wish to test with 
# test_ so on so forth.
from nose.tools import *

#from legal.server.CanadianCase import Contains
from legal.testyface2 import *


def test_room():
    gold = Room("GoldRoom",
                """This room has gold in it you can grab. There's a
                door to the north.""")
    assert_equal(gold.name, "GoldRoom")
    assert_equal(gold.paths, {})

def test_room_paths():
    center = Room("Center", "Test room in the center.")
    north = Room("North", "Test room in the north.")
    south = Room("South", "Test room in the south.")

    center.add_paths({'north': north, 'south': south})
    assert_equal(center.go('north'), north)
    assert_equal(center.go('south'), south)

def test_map():
    start = Room("Start", "You can go west and down a hole.")
    west = Room("Trees", "There are trees here, you can go east.")
    down = Room("Dungeon", "It's dark down here, you can go up.")

    start.add_paths({'west': west, 'down': down})
    west.add_paths({'east': start})
    down.add_paths({'up': start})

    assert_equal(start.go('west'), west)
    assert_equal(start.go('west').go('east'), start)
    assert_equal(start.go('down').go('up'), start)

def test_stuffsss():
    start = Room("Start", "You can go west and down a hole.")
 
    assert_equal(start.addstuff(2),2)
    
def test_newstuffs():
    assert_equal(returnsame(2),2)

def test_contains():
    list = ["hi", "you", "sup", "pew pew"]
    assert_equal(Contains(list,"hi"),True)
    assert_equal(Contains(list,"hzii"),False)
    assert_equal(Contains(list,"hiiiiiiiiii"),True)
 #   assert_raises(TypeError,Contains(1234,"hi"))
    
    
    

#def test_first():
  #  assert_equal(Contains(["hi","yo","sup"],"hi"),True)
    
'''   
def setup():
    print "SETUP!"

def teardown():
    print "TEAR DOWN!"

def test_basic():
    print "I RAN!"
'''