# Intro to Python / Python Control Flow - Work Based Problem

![The Scenario](./assets/banner-scenario.png)

The startup you work for, Triangle, produces software for restaurants and cafes that help cashiers calculate the bill for customers, including sales tax. 

Today, the CEO of the company sent out a company-wide email. He just came back from some symposium or another and heard that Python is the Hot New Thing:tm:, and JavaScript, in which your sofware is written, is not cool anymore.

"Henceforth, all software development in the company will be switching from JavaScript to Python, effective immediately. And we'll be rewriting all the existing code as well!".

You roll your eyes, having seen this debate play out a thousand times before. Your existing code already works great! Why rewrite it? It never ends well for any company that tries to do this, but you resign yourself to getting started.

![Requirements](./assets/banner-requirements.png)

- Basic Python syntax, including:
  - Variable declaration
  - Output to the terminal
  - Accepting input from the terminal
  - Determining the length of a list (i.e. array in JS)
  - String interpolation using `f`-strings
  - Basic type conversion
  - Writing `if` statements
  - Conditional expressions (i.e. ternary operator in JS)
  - Basic mathematical operations and comparisons

![coding practice](./assets/banner-coding.png)

#### Preparation Steps:

- Fork and clone [this](https://github.com/SEB-10-Bahrain/M4L2-intro-to-python-python-control-flow-wbp) repository. 
- Navigate (`cd`) into the repository folder in your console.
- In your terminal, navigate into the `js` directory -- this directory contains the working Javascript program.
  - Run the command `npm i` -- this will install the modules necessary for the automated tests to run.
- Run the automated tests with `npm test`. You should see every test passing, like the following:
  ```
  % npm test

  > intro-to-python-python-control-flow-wbp@0.0.0 test
  > jest

   PASS  test/main.test.js
    The main program
      ✓ should calculate change correctly (4 ms)
      ✓ should allow change to be kept as tip (1 ms)
      ✓ should detect insufficient payment
      ✓ should detect exact payments (1 ms)

  Test Suites: 1 passed, 1 total
  Tests:       4 passed, 4 total
  Snapshots:   0 total
  Time:        0.162 s, estimated 1 s
  Ran all test suites.
  ```
- Open up `js/src/main.js`. This file contains the working **Bill Calculator** code in Javascript.
  - Take time to read over and understand the current working code.
- Next, run the program with `node src/main.js`. Play with it and understand its operation.

#### Step 1:

- Now, navigate to the `python` directory in your terminal. 
- Now, open up `python/src/main.py`. This blank file is where you will write the Python version of the Bill Calculator.
- To complete this step, translate the code from `js/src/main.js` to `python/src/main.py`  line-by-line.
  - Stay as faithful as you can to the original Javascript, and try to figure out the exact Python equivalent code.
  - Use what you've learned in the **Intro to Python** and **Control Flow in Python** classes!
  - Some hints are provided below, if you get stuck!
- You can run your program at any time with the terminal command `python src/main.py`
- Build your program up bit by bit and make sure it runs correctly! Run it often!
- To check that you did everything right, you should:
  - Ensure that you are in the `python` directory in your terminal
  - Run `python -m unittest`
  - You should see:
  ```
  % python -m unittest
  ....
  ----------------------------------------------------------------------
  Ran 4 tests in 0.003s

  OK
  ```

<details>
<summary>Hint 1 - User Input</summary>

You do not need `prompt-sync` in Python, as Python already has prompting built in. So these lines do not need to be translated to Python

```js
const promptSync = require('prompt-sync');
const prompt = promptSync({ sigint: true });
```

How do you prompt a user in Python? That was covered in the **Control Flow in Python** lesson!
</details>

<details>
<summary>Hint 2 - Type Conversion</summary>

In Javascript, the [`parseFloat()` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseFloat) converts a string into a floating point number.

In Python, you can easily convert to float as well. Check your course notes! That was covered in the **Intro to Python** lesson.
</details>

<details>
<summary>Hint 3 - Rounding numbers</summary>

In Javascript, the [`toFixed()` method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed) converts a number into a string with the number of significat digits specified in the argument.

You can do the same in Python using the [`round()` function](https://docs.python.org/3/library/functions.html#round). (It's a function, not method!)
</details>

<details>
<summary>Hint 4 - String Interpolation</summary>

In Javascript, string interpolation is performed using [template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals).

In Python, string interpolation is done with [`f`-strings](https://docs.python.org/3/reference/lexical_analysis.html#f-strings). Check your notes from the **Intro to Python** lesson!
</details>

<details>
<summary>Hint 5 - Ternary Expressions</summary>

Recall that in JS there is a ternary operator `a ? b : c` -- This is used in the Bill Calculator program somewhere. What's the Python equivalent again? Check your course notes! That was covered in the **Intro to Python** lesson. 
</details>

<details>
<summary>Hint 6 - Absolute Value</summary>

This one will be a freebie. The Python equivalent of the Javascript [`Math.abs()` method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/abs) is simply... the [`abs()` function](https://docs.python.org/3/library/functions.html#abs).

</details>

## Tests

- If your Python tests are running successfully, you're done!
