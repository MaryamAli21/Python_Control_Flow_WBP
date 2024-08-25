import unittest
from unittest.mock import patch

# https://stackoverflow.com/a/34738440
import io
import sys

# So that `python test/test_main.py` works
# and `python test_main.py` works when in the 'test' directory
sys.path += ['src', '../src']

# As the code is main.py not in a function or a class, nor is it a proper
# module, some real pains have to be taken in order to run the code. 
# The importlib library is used here to dynamically load/reload and run the main.py file
import importlib
def load_main():
  if 'main' in sys.modules:
    # The sys.modules.get() is necessary to avoid an
    # "argument must be a module" error
    # https://bugs.python.org/msg385765
    importlib.reload(sys.modules.get('main'))
  else:
    importlib.import_module('main')

@patch('builtins.print')
class MainTest(unittest.TestCase):

  def setUp(self):
    self.captured = io.StringIO()
    sys.stdout = self.captured

  def tearDown(self):
    self.captured = None

  def test_should_calculate_change_correctly(self, mocked_print):
    prices = '100, 50, 25'
    payment = '200.0'
    keep_tip = ''
    inputs = f'{prices}\n{payment}\n{keep_tip}\n'

    sys.stdin = io.StringIO(inputs)
    load_main()

    self.assertEqual(mocked_print.call_args_list[1][0][0], 'The total bill for all 3 items (including tax) is: $186.38')
    self.assertEqual(mocked_print.call_args_list[2][0][0], 'Return $13.62 to the customer')

  def test_should_allow_change_to_be_kept_as_tip(self, mocked_print):
    prices = '100, 50,25.0'
    payment = '200'
    keep_tip = 'y'
    inputs = f'{prices}\n{payment}\n{keep_tip}\n'

    sys.stdin = io.StringIO(inputs)
    load_main()

    self.assertEqual(mocked_print.call_args_list[1][0][0], 'The total bill for all 3 items (including tax) is: $186.38')
    self.assertEqual(mocked_print.call_args_list[2][0][0], 'Return $0 to the customer')

  def test_should_detect_insufficient_payment(self, mocked_print):
    prices = '100,50,25'
    payment = '150.0'
    inputs = f'{prices}\n{payment}\n'

    sys.stdin = io.StringIO(inputs)
    load_main()

    self.assertEqual(mocked_print.call_args_list[1][0][0], 'The total bill for all 3 items (including tax) is: $186.38')
    self.assertEqual(mocked_print.call_args_list[2][0][0], 'The customer needs to pay $36.38 more')

  def test_should_detect_exact_payments(self, mocked_print):
    prices = '100,50.0,25'
    payment = '186.38'
    inputs = f'{prices}\n{payment}\n'

    sys.stdin = io.StringIO(inputs)
    load_main()

    self.assertEqual(mocked_print.call_args_list[1][0][0], 'The total bill for all 3 items (including tax) is: $186.38')
    self.assertEqual(mocked_print.call_args_list[2][0][0], 'Exact payment! Nice!')

if __name__ == '__main__':
  unittest.main()
