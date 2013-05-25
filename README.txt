Important Information about the structure and use of the program

TESTING----------

 To run your application's tests, you would need to be above tests/ and this location I have above. So, if you try this:

$ cd tests/   # WRONG! WRONG! WRONG!
$ nosetests

----------------------------------------------------------------------
Ran 0 tests in 0.000s

OK
Then that is wrong! You have to be above tests, so assuming you made this mistake, you would fix it by doing:

$ cd ..   # get out of tests/
$ ls      # CORRECT! you are now in the right spot
NAME                bin             docs            setup.py        tests
$ nosetests
.
----------------------------------------------------------------------
Ran 1 test in 0.004s

OK
Remember this because people make this mistake quite frequently.
