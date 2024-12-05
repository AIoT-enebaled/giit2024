export const pythonFundamentals = [
  {
    topic: "Python",
    question: "python",
    answer: "I'd be happy to help you learn Python! Python is a versatile programming language that's perfect for beginners and professionals alike.\n\nPopular uses include:\n1. Web Development\n2. Data Analysis\n3. Artificial Intelligence\n4. Automation\n5. Scientific Computing\n\nWould you like to:\n- Learn basic Python concepts?\n- Explore specific topics like lists or functions?\n- See some practical examples?\n- Get started with your first program?\n\nJust let me know what interests you most!"
  },
  {
    topic: "Lists",
    question: "what is a list",
    answer: "Let me explain Python lists in a way that's easy to understand!\n\nA list in Python is like a container that can hold multiple items - think of it as a shopping list or a to-do list. Here's what makes them special:\n\n1. Creating lists:\n   numbers = [1, 2, 3, 4, 5]\n   fruits = ['apple', 'banana', 'orange']\n\n2. Key features:\n   - Can store different types of data\n   - Items can be changed (mutable)\n   - Keep items in order\n   - Easy to add or remove items\n\n3. Common operations:\n   fruits.append('grape')     # Add item\n   fruits.remove('apple')     # Remove item\n   first_fruit = fruits[0]    # Get first item\n\nWould you like to:\n- See more examples?\n- Learn about list methods?\n- Try some list operations?\n\nI'm here to help you practice!"
  },
  {
    topic: "Lists",
    question: "lists",
    answer: "Let's dive into Python lists! They're one of the most useful features in Python.\n\n1. Creating lists:\n   empty_list = []              # Empty list\n   numbers = [1, 2, 3]          # List of numbers\n   mixed = [1, 'hello', True]    # Different types\n\n2. List operations:\n   # Adding items\n   numbers.append(4)      # Adds 4 to end\n   numbers.insert(0, 0)   # Adds 0 at start\n\n   # Removing items\n   numbers.pop()         # Removes last item\n   numbers.remove(2)     # Removes first 2\n\n   # Accessing items\n   first = numbers[0]    # First item\n   last = numbers[-1]    # Last item\n\nWant to try these out? I can help you practice with some examples!"
  },
  {
    topic: "Introduction",
    question: "What is Python?",
    answer: "Python is a versatile programming language known for its simplicity and readability. It's perfect for:\n\n1. Beginners learning to code\n2. Web development with frameworks like Django\n3. Data analysis with libraries like Pandas\n4. AI/ML with tools like TensorFlow\n\nKey features:\n- Easy to learn syntax\n- Large community support\n- Rich ecosystem of libraries\n- Cross-platform compatibility"
  },
  {
    topic: "Lists",
    question: "lists",
    answer: "Lists in Python are ordered collections that can store multiple items. They are created using square brackets []. For example:\n\nmy_list = [1, 2, 3, 'hello']\n\nKey features of lists:\n1. Can store different types of data (numbers, strings, etc.)\n2. Are mutable (can be modified)\n3. Support indexing (my_list[0] gets first item)\n4. Allow duplicates\n\nCommon list operations:\n- Add item: my_list.append(item)\n- Remove item: my_list.remove(item)\n- Get length: len(my_list)\n- Access item: my_list[index]"
  },
  {
    topic: "Lists",
    question: "What is a list",
    answer: "A list in Python is a built-in data structure that stores an ordered collection of items. Lists are:\n\n1. Created using square brackets: my_list = [1, 2, 3]\n2. Flexible: can store any type of data (numbers, strings, other lists)\n3. Mutable: you can change, add, or remove items\n4. Indexed: items can be accessed by position (starting at 0)\n\nExample:\nfruits = ['apple', 'banana', 'orange']\nprint(fruits[0])  # prints 'apple'\nfruits.append('grape')  # adds 'grape' to the list"
  },
  {
    topic: "Print Function",
    question: "print function in python",
    answer: "The print() function in Python is used to display output on the screen. Here's how to use it:\n\n1. Basic printing:\nprint('Hello World')\n\n2. Print multiple items:\nprint('Hello', 'World')  # prints: Hello World\n\n3. Print with variables:\nname = 'John'\nprint('Hello', name)  # prints: Hello John\n\n4. Print with formatting:\nage = 25\nprint(f'Age: {age}')  # prints: Age: 25\n\n5. Print with newlines:\\nprint('Line 1\\nLine 2')  # prints on separate lines"
  },
  {
    topic: "Operators",
    question: "What operators are there in Python?",
    answer: "Python has several types of operators:\n\nArithmetic Operators:\n- Addition (+)\n- Subtraction (-)\n- Multiplication (*)\n- Division (/)\n- Modulus (%) for remainder\n- Floor Division (//) for whole number division\n- Exponentiation (**)\n\nComparison Operators:\n- Equal to (==)\n- Not equal to (!=)\n- Greater than (>)\n- Less than (<)\n- Greater than or equal to (>=)\n- Less than or equal to (<=)\n\nLogical Operators:\n- and\n- or\n- not"
  },
  {
    topic: "Hello World",
    question: "How do I write a Hello World program in Python?",
    answer: "In Python, you can write a Hello World program with just one line of code:\n\nprint(\"Hello, World!\")\n\nThe print() function is used to display text on the screen."
  },
  {
    topic: "Data Types",
    question: "What are the main data types in Python?",
    answer: "Python has several basic data types:\n- Integers (int): whole numbers like 10\n- Floats: decimal numbers like 3.14\n- Strings: text in quotes like 'John' or \"Kayden\"\n- Booleans: True or False values\n- Lists: ordered collections like [1, 2, 3]\n- Tuples: immutable sequences like (4, 5)\n- Dictionaries: key-value pairs like {'name': 'John', 'age': 25}\n- Sets: unique collections like {1, 2, 3}"
  },
  {
    topic: "Variables",
    question: "How do variables work in Python?",
    answer: "Variables in Python are used to store values in memory. You can assign different data types to variables. For example:\n\nnum = 10          # Integer\npi = 3.14         # Float\nname = 'John'     # String\nis_true = True    # Boolean\n\nPython is dynamically typed, so you don't need to declare the type of variable."
  },
  {
    topic: "Conditional Statements",
    question: "How do conditional statements work in Python?",
    answer: "Python uses if, elif (else if), and else statements for conditional execution. Example:\n\nif condition1:\n    # code if condition1 is True\nelif condition2:\n    # code if condition2 is True\nelse:\n    # code if all conditions are False\n\nFor example:\nnum = 10\nif num > 15:\n    print('Greater than 15')\nelif num > 5:\n    print('Greater than 5 but less than or equal to 15')\nelse:\n    print('Less than or equal to 5')"
  },
  {
    topic: "Arithmetic Operations",
    question: "What are the basic arithmetic operations in Python?",
    answer: "Python supports these basic arithmetic operations:\n- Addition (+): num1 + num2\n- Subtraction (-): num1 - num2\n- Multiplication (*): num1 * num2\n- Division (/): num1 / num2\n- Modulus (%): num1 % num2 (gives remainder)\n\nExample:\nnum1 = 10\nnum2 = 4\nsum = num1 + num2      # 14\nproduct = num1 * num2  # 40\nquotient = num1 / num2 # 2.5\nremainder = num1 % num2 # 2"
  },
  {
    topic: "Loops",
    question: "How do loops work in Python?",
    answer: "Python has two main types of loops:\n\n1. For Loop - used to iterate over a sequence:\nfruits = ['apple', 'banana', 'cherry']\nfor fruit in fruits:\n    print(fruit)\n\n2. While Loop - repeats while a condition is True:\ncount = 0\nwhile count < 5:\n    print(count)\n    count += 1"
  },
  {
    topic: "Getting Started",
    question: "how do i start learning python",
    answer: "I'll help you get started with Python! Here's a beginner-friendly path:\n\n1. First Program:\n   print('Hello, World!')\n\n2. Basic Concepts to Learn:\n   - Variables and data types\n   - Basic operations\n   - Input and output\n   - Lists and loops\n\n3. Practice Projects:\n   - Calculator\n   - Number guessing game\n   - To-do list\n\nWould you like to:\n- Start with the basics?\n- See some example code?\n- Try a simple project?\n\nI can guide you through any of these steps!"
  },
  {
    topic: "Variables",
    question: "how do variables work in python",
    answer: "Let me explain Python variables in a simple way!\n\n1. Basic Usage:\n   name = 'John'              # String\n   age = 25                   # Integer\n   height = 1.75             # Float\n   is_student = True         # Boolean\n\n2. Key Points:\n   - No need to declare type\n   - Can change type anytime\n   - Case sensitive\n   - Use descriptive names\n\n3. Examples:\n   # Changing values\n   count = 1\n   count = count + 1    # Now count is 2\n\n   # Multiple assignment\n   x, y = 10, 20\n\nWould you like to:\n- See more examples?\n- Learn about naming rules?\n- Practice with variables?\n\nI'm here to help you understand!"
  },
  {
    topic: "Functions",
    question: "what are functions in python",
    answer: "Functions are like mini-programs that help organize and reuse code. Let me show you!\n\n1. Basic Function:\n   def greet(name):\n       return f'Hello, {name}!'\n\n   # Using the function\n   message = greet('Alice')    # Returns: Hello, Alice!\n\n2. Function Types:\n   # No parameters\n   def say_hello():\n       print('Hello!')\n\n   # Multiple parameters\n   def add(a, b):\n       return a + b\n\n   # Default parameters\n   def greet(name='Friend'):\n       print(f'Hi, {name}!')\n\nWant to:\n- Create your first function?\n- See more examples?\n- Learn about parameters?\n\nLet me know what interests you!"
  },
  {
    topic: "Loops",
    question: "how do loops work in python",
    answer: "Loops are super useful for repeating tasks. Let me show you Python's main loops!\n\n1. For Loops:\n   # Loop through a list\n   fruits = ['apple', 'banana', 'orange']\n   for fruit in fruits:\n       print(fruit)\n\n   # Loop with range\n   for i in range(5):\n       print(i)    # Prints 0 to 4\n\n2. While Loops:\n   # Count up to 5\n   count = 0\n   while count < 5:\n       print(count)\n       count += 1\n\nWant to:\n- Try some loop examples?\n- Learn about nested loops?\n- See practical applications?\n\nI can help you practice!"
  }
];
