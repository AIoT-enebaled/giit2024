export const pythonFundamentals = [
  {
    topic: "Introduction",
    question: "What is Python?",
    answer: "Python is a popular programming language used for a variety of applications, from web development to data analysis and artificial intelligence. It is known for its simple syntax and readability, making it an excellent choice for beginners."
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
  }
];
