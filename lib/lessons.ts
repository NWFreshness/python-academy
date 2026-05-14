export type LessonLevel = 'beginner' | 'intermediate' | 'advanced' | 'project';

export type LessonBlock = {
  type: 'paragraph' | 'code' | 'callout' | 'list';
  content: string;
  items?: string[];
};

export type LessonValidation = {
  type: 'output-contains' | 'exact-output' | 'manual';
  value?: string;
};

export type Lesson = {
  slug: string;
  title: string;
  section: string;
  level: LessonLevel;
  objective: string;
  explanation: LessonBlock[];
  starterCode: string;
  solutionHint?: string;
  expectedOutput?: string;
  validation?: LessonValidation;
};

export type LessonSection = {
  title: string;
  level: LessonLevel;
  description: string;
  lessons: Lesson[];
};

const lessonCatalog = [
  {
    slug: "variables-and-types",
    title: "Variables and Types",
    section: "Python Foundations",
    level: "beginner" as const,
    objective: "Store values in variables and inspect Python types.",
    explanation: [
      {
        type: 'paragraph',
        content: "A variable is a name that points to a value in memory. You create one with assignment: the name goes on the left, one equals sign goes in the middle, and the value or expression goes on the right.",
      },
      {
        type: 'code',
        content: "name = \"Ada\"\nage = 36\nheight = 1.64\nactive = True\nnothing = None",
      },
      {
        type: 'paragraph',
        content: "Python is dynamically typed: you do not write the type beside the variable name. Instead, each value carries its own type at runtime. The same variable name can point to a different type later, but clear programs avoid changing meanings without a reason.",
      },
      {
        type: 'list',
        content: '',
        items: [
                "str: text, written with quotes, like \"Ada\" or \"hello\"",
                "int: whole numbers, like 36, -4, or 0",
                "float: decimal numbers, like 1.64 or 3.14",
                "bool: truth values, only True or False",
                "NoneType: the special value None, used for “no value yet”",
                "list: an ordered collection, like [\"Ada\", \"Grace\"]",
                "dict: keyed data, like {\"name\": \"Ada\", \"age\": 36}"
        ],
      },
      {
        type: 'code',
        content: "print(type(name).__name__)   # str\nprint(type(age).__name__)    # int\nprint(type(height).__name__) # float\nprint(type(active).__name__) # bool",
      },
      {
        type: 'callout',
        content: "Common trap: = assigns a value. == compares two values. Use name = \"Ada\" to store data, and name == \"Ada\" when asking a true/false question.",
      },
      {
        type: 'paragraph',
        content: "In the lab, try adding a new variable named language with the value \"Python\", then print its type with type(language).__name__.",
      }
    ],
    starterCode: "name = \"Ada\"\nage = 36\nprint(f\"{name} is {age} years old\")",
    expectedOutput: "Ada is 36 years old",
    validation: { type: "output-contains" as const, value: "Ada is 36 years old" },
  },
  {
    slug: "lists",
    title: "Lists",
    section: "Python Foundations",
    level: "beginner" as const,
    objective: "Collect ordered values and access them by index.",
    explanation: [
      {
        type: 'paragraph',
        content: "A list stores multiple values in one variable. Lists are ordered, so each item has a position. Python positions start at 0, not 1.",
      },
      {
        type: 'code',
        content: "skills = [\"syntax\", \"loops\", \"functions\"]\nprint(skills[0])  # first item\nprint(skills[1])  # second item",
      },
      {
        type: 'paragraph',
        content: "Lists are mutable, meaning you can change them after they are created. That makes them useful for growing task lists, collected results, and step-by-step data processing.",
      },
      {
        type: 'list',
        content: '',
        items: [
                "Access with square brackets: skills[0]",
                "Count items with len(skills)",
                "Add one item with skills.append(\"testing\")",
                "Replace an item with skills[1] = \"conditionals\"",
                "Get the last item with skills[-1]",
                "Loop through every item with for skill in skills:"
        ],
      },
      {
        type: 'code',
        content: "skills.append(\"testing\")\nprint(skills)\nprint(len(skills))",
      },
      {
        type: 'callout',
        content: "Common trap: an index that does not exist raises IndexError. If a list has 3 items, the valid positive indexes are 0, 1, and 2.",
      },
      {
        type: 'paragraph',
        content: "Use a list when order matters or when you expect to process every item one after another.",
      }
    ],
    starterCode: "skills = [\"syntax\", \"loops\", \"functions\"]\nprint(skills[0])\nprint(len(skills))",
    expectedOutput: "syntax\n3",
    validation: { type: "output-contains" as const, value: "syntax" },
  },
  {
    slug: "operators",
    title: "Operators",
    section: "Python Foundations",
    level: "beginner" as const,
    objective: "Use arithmetic, comparison, and boolean operators to transform values.",
    explanation: [
      {
        type: 'paragraph',
        content: "Operators are symbols and words that combine values into expressions. An expression is a piece of code that produces a value.",
      },
      {
        type: 'list',
        content: '',
        items: [
                "Arithmetic operators create numbers: +, -, *, /, //, %, **",
                "Comparison operators create booleans: ==, !=, >, <, >=, <=",
                "Boolean operators combine decisions: and, or, not",
                "String + joins text; number + adds numbers"
        ],
      },
      {
        type: 'code',
        content: "score = 7\nbonus = 3\nprint(score + bonus)  # 10\nprint(score > bonus)  # True\nprint(score > 5 and bonus > 0)  # True",
      },
      {
        type: 'paragraph',
        content: "Comparison operators do not change the original values. They answer a question with True or False, which is why they pair naturally with if statements.",
      },
      {
        type: 'code',
        content: "print(10 / 3)   # 3.333... normal division\nprint(10 // 3)  # 3 floor division\nprint(10 % 3)   # 1 remainder",
      },
      {
        type: 'callout',
        content: "Common trap: == means “is equal to?” while = means “store this value.” Writing if score = 10 is invalid Python because conditions need comparisons or boolean expressions.",
      },
      {
        type: 'paragraph',
        content: "In the lab, change score and bonus, then predict each printed result before running the code.",
      }
    ],
    starterCode: "score = 7\nbonus = 3\nprint(score + bonus)\nprint(score > bonus)",
    expectedOutput: "10\nTrue",
    validation: { type: "output-contains" as const, value: "True" },
  },
  {
    slug: "conditions",
    title: "Conditions",
    section: "Control Flow",
    level: "beginner" as const,
    objective: "Branch program behavior with if, elif, and else.",
    explanation: [
      {
        type: 'paragraph',
        content: "A conditional lets your program choose what to do based on a boolean expression. Python checks branches from top to bottom and runs the first branch whose condition is True.",
      },
      {
        type: 'code',
        content: "temperature = 72\nif temperature >= 80:\n    print(\"hot\")\nelif temperature >= 70:\n    print(\"comfortable\")\nelse:\n    print(\"cool\")",
      },
      {
        type: 'paragraph',
        content: "Indentation is part of Python syntax. The indented lines underneath if, elif, or else belong to that branch. When indentation returns to the left, the conditional block is over.",
      },
      {
        type: 'list',
        content: '',
        items: [
                "if starts the decision",
                "elif means “otherwise, if this condition is true”",
                "else catches everything that did not match earlier branches",
                "Only one branch in an if/elif/else chain runs",
                "Conditions usually use comparison operators or boolean variables"
        ],
      },
      {
        type: 'callout',
        content: "Common trap: order matters. If you check temperature >= 70 before temperature >= 80, then 90 degrees will match the >= 70 branch first and never reach the hotter branch.",
      },
      {
        type: 'paragraph',
        content: "Use conditions when your program needs rules: approve or reject input, choose a message, handle missing data, or select a different calculation.",
      }
    ],
    starterCode: "temperature = 72\nif temperature >= 70:\n    print(\"comfortable\")\nelse:\n    print(\"cool\")",
    expectedOutput: "comfortable",
    validation: { type: "exact-output" as const, value: "comfortable" },
  },
  {
    slug: "loops",
    title: "Loops",
    section: "Control Flow",
    level: "beginner" as const,
    objective: "Repeat work with for loops and ranges.",
    explanation: [
      {
        type: 'paragraph',
        content: "A loop repeats the same block of code for each item in a sequence. Instead of writing print three times, you describe the repeated pattern once.",
      },
      {
        type: 'code',
        content: "for number in range(3):\n    print(number)\n# prints 0, then 1, then 2",
      },
      {
        type: 'paragraph',
        content: "range(stop) creates numbers starting at 0 and stopping before stop. That “stop before” rule is common in Python and matches list indexing.",
      },
      {
        type: 'list',
        content: '',
        items: [
                "for item in sequence: repeats once per item",
                "The loop variable changes each round",
                "range(3) produces 0, 1, 2",
                "range(1, 4) produces 1, 2, 3",
                "break exits a loop early",
                "continue skips to the next round"
        ],
      },
      {
        type: 'code',
        content: "names = [\"Ada\", \"Grace\", \"Linus\"]\nfor name in names:\n    print(f\"Hello, {name}\")",
      },
      {
        type: 'callout',
        content: "Common trap: code only belongs to the loop if it is indented under the for line. Unindented code runs once after the loop finishes.",
      },
      {
        type: 'paragraph',
        content: "Loops are the foundation of automation: reading files line by line, processing API results, retrying tasks, and building reports.",
      }
    ],
    starterCode: "for number in range(3):\n    print(number)",
    expectedOutput: "0\n1\n2",
    validation: { type: "exact-output" as const, value: "0\n1\n2" },
  },
  {
    slug: "functions",
    title: "Functions",
    section: "Program Structure",
    level: "intermediate" as const,
    objective: "Package reusable behavior behind clear names and parameters.",
    explanation: [
      {
        type: 'paragraph',
        content: "A function is a named, reusable block of code. It can accept inputs called parameters and send back an output with return.",
      },
      {
        type: 'code',
        content: "def greet(name):\n    return f\"Hello, {name}\"\n\nmessage = greet(\"Ada\")\nprint(message)",
      },
      {
        type: 'paragraph',
        content: "Think of a function as a small machine: parameters go in, work happens inside, and a return value comes out. Printing displays a value to the user; returning gives a value back to the rest of the program.",
      },
      {
        type: 'list',
        content: '',
        items: [
                "def starts a function definition",
                "The function name should describe the job",
                "Parameters are placeholders listed in parentheses",
                "Arguments are the real values passed when calling the function",
                "return ends the function and hands back a result",
                "A function without return gives back None"
        ],
      },
      {
        type: 'code',
        content: "def add(a, b):\n    total = a + b\n    return total\n\nprint(add(2, 3))",
      },
      {
        type: 'callout',
        content: "Common trap: return is not the same as print. Use return when another part of your code needs the result. Use print when a human needs to see it.",
      },
      {
        type: 'paragraph',
        content: "Good functions are usually small, named clearly, and focused on one job. That makes them easier to test and reuse.",
      }
    ],
    starterCode: "def greet(name):\n    return f\"Hello, {name}\"\n\nprint(greet(\"Ada\"))",
    expectedOutput: "Hello, Ada",
    validation: { type: "exact-output" as const, value: "Hello, Ada" },
  },
  {
    slug: "dictionaries",
    title: "Dictionaries",
    section: "Program Structure",
    level: "intermediate" as const,
    objective: "Model keyed data with dictionaries.",
    explanation: [
      {
        type: 'paragraph',
        content: "A dictionary stores pairs of keys and values. Instead of remembering a position like list[0], you use a meaningful key like student[\"name\"].",
      },
      {
        type: 'code',
        content: "student = {\"name\": \"Ada\", \"track\": \"Python\", \"level\": 1}\nprint(student[\"track\"])",
      },
      {
        type: 'paragraph',
        content: "Dictionaries are ideal for record-shaped data: one thing with named attributes. API responses, configuration, user profiles, and JSON-like data often map naturally to dictionaries.",
      },
      {
        type: 'list',
        content: '',
        items: [
                "Keys are usually strings, but can be other immutable values",
                "Values can be any type: strings, numbers, lists, or even nested dictionaries",
                "Read with student[\"track\"] when the key must exist",
                "Read with student.get(\"track\") when the key might be missing",
                "Add or replace with student[\"level\"] = 2",
                "Loop with for key, value in student.items():"
        ],
      },
      {
        type: 'code',
        content: "student[\"completed\"] = True\nprint(student.get(\"missing\", \"not found\"))\nfor key, value in student.items():\n    print(key, value)",
      },
      {
        type: 'callout',
        content: "Common trap: student[\"missing\"] raises KeyError if the key is absent. Use .get() when missing data is normal and you want a fallback.",
      },
      {
        type: 'paragraph',
        content: "Use a dictionary when names matter more than order.",
      }
    ],
    starterCode: "student = {\"name\": \"Ada\", \"track\": \"Python\"}\nprint(student[\"track\"])",
    expectedOutput: "Python",
    validation: { type: "exact-output" as const, value: "Python" },
  },
  {
    slug: "classes-and-objects",
    title: "Classes and Objects",
    section: "Program Structure",
    level: "intermediate" as const,
    objective: "Bundle state and behavior with classes.",
    explanation: [
      {
        type: 'paragraph',
        content: "A class is a blueprint for creating objects. An object bundles state, the data it remembers, with behavior, the methods it can run.",
      },
      {
        type: 'code',
        content: "class Robot:\n    def __init__(self, name):\n        self.name = name\n\n    def introduce(self):\n        return f\"Unit {self.name} online\"",
      },
      {
        type: 'paragraph',
        content: "__init__ is the initializer that runs when you create a new object. self means “this specific object,” so self.name stores a name on each Robot instance.",
      },
      {
        type: 'list',
        content: '',
        items: [
                "Class: the blueprint, like Robot",
                "Object/instance: one concrete thing made from the class, like Robot(\"A1\")",
                "Attribute: data stored on an object, like self.name",
                "Method: a function attached to a class, like introduce",
                "self: the current object receiving the method call"
        ],
      },
      {
        type: 'code',
        content: "a = Robot(\"A1\")\nb = Robot(\"B2\")\nprint(a.introduce())\nprint(b.introduce())",
      },
      {
        type: 'callout',
        content: "Common trap: methods inside a class usually need self as the first parameter. You do not pass self manually; Python supplies it when you call object.method().",
      },
      {
        type: 'paragraph',
        content: "Use classes when several pieces of data and the functions that operate on that data belong together.",
      }
    ],
    starterCode: "class Robot:\n    def __init__(self, name):\n        self.name = name\n\n    def introduce(self):\n        return f\"Unit {self.name} online\"\n\nprint(Robot(\"A1\").introduce())",
    expectedOutput: "Unit A1 online",
    validation: { type: "exact-output" as const, value: "Unit A1 online" },
  },
  {
    slug: "decorators",
    title: "Decorators",
    section: "Advanced Python",
    level: "advanced" as const,
    objective: "Wrap functions to add reusable behavior without changing call sites.",
    explanation: [
      {
        type: 'paragraph',
        content: "A decorator is a function that takes another function and returns a replacement function. The replacement usually calls the original function, but adds behavior before, after, or around it.",
      },
      {
        type: 'code',
        content: "def loud(fn):\n    def wrapper():\n        result = fn()\n        return result.upper()\n    return wrapper",
      },
      {
        type: 'paragraph',
        content: "The @decorator syntax is shorthand. @loud above a function means: define the function, then replace it with loud(function).",
      },
      {
        type: 'code',
        content: "@loud\ndef message():\n    return \"decorators work\"\n\nprint(message())",
      },
      {
        type: 'list',
        content: '',
        items: [
                "Decorators are common for logging, timing, caching, authentication, validation, and retries",
                "The outer function receives the original function",
                "The inner wrapper controls what happens when the decorated function is called",
                "The decorator returns the wrapper function",
                "Call sites stay clean: message() still looks like message()"
        ],
      },
      {
        type: 'callout',
        content: "Common trap: a simple wrapper with no *args and **kwargs only works for functions with no parameters. Real decorators usually accept *args, **kwargs and forward them to the original function.",
      },
      {
        type: 'code',
        content: "def trace(fn):\n    def wrapper(*args, **kwargs):\n        print(f\"calling {fn.__name__}\")\n        return fn(*args, **kwargs)\n    return wrapper",
      },
      {
        type: 'paragraph',
        content: "Use decorators when the same cross-cutting behavior should apply to many functions without copying that behavior into each function body.",
      }
    ],
    starterCode: "def loud(fn):\n    def wrapper():\n        return fn().upper()\n    return wrapper\n\n@loud\ndef message():\n    return \"decorators work\"\n\nprint(message())",
    expectedOutput: "DECORATORS WORK",
    validation: { type: "exact-output" as const, value: "DECORATORS WORK" },
  },
  {
    slug: "apis-with-python",
    title: "APIs with Python",
    section: "Advanced Python",
    level: "advanced" as const,
    objective: "Understand the shape of API requests and responses.",
    explanation: [
      {
        type: 'paragraph',
        content: "An API is a boundary where one program asks another program for data or action. Most web APIs use HTTP requests and return structured responses, often JSON.",
      },
      {
        type: 'list',
        content: '',
        items: [
                "Method: the action, such as GET, POST, PUT, PATCH, or DELETE",
                "URL/endpoint: the address of the resource",
                "Headers: metadata such as authorization or content type",
                "Body: data sent with requests like POST",
                "Status code: numeric result like 200, 404, or 500",
                "Response body: the returned data, often decoded into a Python dictionary"
        ],
      },
      {
        type: 'code',
        content: "response = {\n    \"status\": 200,\n    \"data\": {\"language\": \"Python\"},\n    \"error\": None,\n}\nprint(response[\"data\"][\"language\"])",
      },
      {
        type: 'paragraph',
        content: "Status codes help your program decide what happened. A 2xx status usually means success, 4xx means the client request had a problem, and 5xx means the server failed.",
      },
      {
        type: 'code',
        content: "if response[\"status\"] == 200:\n    print(response[\"data\"][\"language\"])\nelse:\n    print(\"request failed\")",
      },
      {
        type: 'callout',
        content: "Common trap: do not assume every response has the happy-path shape. Error responses may not contain data, network calls can time out, and rate limits can return 429.",
      },
      {
        type: 'paragraph',
        content: "In real Python code, you often use the requests library or httpx. This browser lesson uses local dictionaries so you can learn the data shape before adding network access.",
      }
    ],
    starterCode: "response = {\"status\": 200, \"data\": {\"language\": \"Python\"}}\nprint(response[\"data\"][\"language\"])",
    expectedOutput: "Python",
    validation: { type: "exact-output" as const, value: "Python" },
  },
  {
    slug: "testing-with-pytest",
    title: "Testing with pytest",
    section: "Advanced Python",
    level: "advanced" as const,
    objective: "Write small tests that prove functions behave correctly.",
    explanation: [
      {
        type: 'paragraph',
        content: "A test is executable evidence that code behaves the way you expect. Instead of manually running a function and eyeballing the result every time, you write a check the computer can repeat.",
      },
      {
        type: 'code',
        content: "def add(a, b):\n    return a + b\n\ndef test_adds_two_numbers():\n    assert add(2, 3) == 5",
      },
      {
        type: 'paragraph',
        content: "pytest discovers functions whose names start with test_. Inside a test, assert states what must be true. If the expression after assert is false, pytest reports a failure.",
      },
      {
        type: 'list',
        content: '',
        items: [
                "Arrange: prepare inputs and state",
                "Act: call the function or behavior being tested",
                "Assert: check the result",
                "Test one behavior at a time when possible",
                "Give tests descriptive names that explain the expected behavior"
        ],
      },
      {
        type: 'code',
        content: "def test_add_handles_negative_numbers():\n    assert add(-2, 3) == 1",
      },
      {
        type: 'callout',
        content: "Common trap: a test that only prints a result is not really checking behavior. Prefer assert so the test can pass or fail automatically.",
      },
      {
        type: 'paragraph',
        content: "Good tests cover normal cases, edge cases, and bugs you fixed so they do not quietly come back later.",
      }
    ],
    starterCode: "def add(a, b):\n    return a + b\n\nprint(add(2, 3))",
    expectedOutput: "5",
    validation: { type: "exact-output" as const, value: "5" },
  },
  {
    slug: "async-python",
    title: "Async Python",
    section: "Advanced Python",
    level: "advanced" as const,
    objective: "Use async and await to model waiting without blocking.",
    explanation: [
      {
        type: 'paragraph',
        content: "Async Python helps one program manage many waiting tasks. It is useful when the slow part is waiting for I/O: network responses, files, timers, queues, or APIs.",
      },
      {
        type: 'code',
        content: "import asyncio\n\nasync def main():\n    await asyncio.sleep(0)\n    print(\"async ready\")\n\nasyncio.run(main())",
      },
      {
        type: 'paragraph',
        content: "async def creates a coroutine function. Calling it creates a coroutine object. await pauses the current coroutine until another awaitable finishes, giving the event loop a chance to run other tasks.",
      },
      {
        type: 'list',
        content: '',
        items: [
                "async def marks a function as asynchronous",
                "await pauses without blocking the whole event loop",
                "asyncio.run(main()) starts the event loop for a top-level coroutine",
                "asyncio.gather(...) waits for multiple async tasks",
                "Async does not make CPU-heavy work faster by itself; it mainly helps with waiting"
        ],
      },
      {
        type: 'code',
        content: "async def fetch_label(label):\n    await asyncio.sleep(0)\n    return f\"done: {label}\"\n\nasync def main():\n    results = await asyncio.gather(fetch_label(\"a\"), fetch_label(\"b\"))\n    print(results)",
      },
      {
        type: 'callout',
        content: "Common trap: forgetting await means you created a coroutine but did not run it. Python may warn that the coroutine was never awaited.",
      },
      {
        type: 'paragraph',
        content: "Use async when you have many operations that spend time waiting and you want the program to stay responsive or make progress on other work.",
      }
    ],
    starterCode: "import asyncio\n\nasync def main():\n    await asyncio.sleep(0)\n    print(\"async ready\")\n\nasyncio.run(main())",
    expectedOutput: "async ready",
    validation: { type: "exact-output" as const, value: "async ready" },
  },
  {
    slug: "capstone-cli-tool",
    title: "Capstone: CLI Tool",
    section: "Capstone Projects",
    level: "project" as const,
    objective: "Plan and assemble a small command-line project from the course concepts.",
    explanation: [
      {
        type: 'paragraph',
        content: "The capstone combines the course pieces into a tiny command-line tool. A CLI program reads input, transforms data, and prints a useful result in the terminal.",
      },
      {
        type: 'paragraph',
        content: "The goal is not a huge app. The goal is to practice connecting variables, lists, dictionaries, conditions, loops, functions, and error handling into one coherent script.",
      },
      {
        type: 'list',
        content: '',
        items: [
                "Variables hold the current state",
                "Lists collect tasks or records",
                "Dictionaries model structured records",
                "Conditions choose what command or rule applies",
                "Loops process each item",
                "Functions separate parsing, processing, and reporting",
                "Tests prove the important pieces still work"
        ],
      },
      {
        type: 'code',
        content: "tasks = []\ntasks.append(\"parse input\")\ntasks.append(\"print report\")\nfor task in tasks:\n    print(f\"TODO: {task}\")",
      },
      {
        type: 'paragraph',
        content: "A realistic CLI usually has three layers: input handling, core logic, and output formatting. Keeping those separate makes the tool easier to test and extend.",
      },
      {
        type: 'code',
        content: "def format_task(task):\n    return f\"TODO: {task}\"\n\nfor task in tasks:\n    print(format_task(task))",
      },
      {
        type: 'callout',
        content: "Common trap: putting everything at the top level works for tiny scripts but becomes hard to test. Move repeated or meaningful behavior into functions as the script grows.",
      },
      {
        type: 'paragraph',
        content: "Extension challenge: add a completed flag to each task with a dictionary, then print DONE or TODO depending on that flag.",
      }
    ],
    starterCode: "tasks = []\ntasks.append(\"parse input\")\ntasks.append(\"print report\")\nfor task in tasks:\n    print(f\"TODO: {task}\")",
    expectedOutput: "TODO: parse input\nTODO: print report",
    validation: { type: "output-contains" as const, value: "TODO: parse input" },
  },
] satisfies Lesson[];

export const lessons: Lesson[] = lessonCatalog;

export const sections: LessonSection[] = Array.from(
  lessons.reduce<Map<string, LessonSection>>((sectionMap, lesson) => {
    const existing = sectionMap.get(lesson.section);

    if (existing) {
      existing.lessons.push(lesson);
      return sectionMap;
    }

    sectionMap.set(lesson.section, {
      title: lesson.section,
      level: lesson.level,
      description: getSectionDescription(lesson.section),
      lessons: [lesson],
    });

    return sectionMap;
  }, new Map()).values(),
);

export function getLessonBySlug(slug: string): Lesson | undefined {
  return lessons.find((lesson) => lesson.slug === slug);
}

export function getAdjacentLessons(slug: string): { previous?: Lesson; next?: Lesson } {
  const index = lessons.findIndex((lesson) => lesson.slug === slug);

  if (index === -1) {
    return {};
  }

  return {
    previous: lessons[index - 1],
    next: lessons[index + 1],
  };
}

export function getProgressStats(completedSlugs: Iterable<string>): {
  completedLessons: number;
  totalLessons: number;
  percentComplete: number;
} {
  const knownSlugs = new Set(lessons.map((lesson) => lesson.slug));
  const completedLessons = new Set(
    Array.from(completedSlugs).filter((slug) => knownSlugs.has(slug)),
  ).size;
  const totalLessons = lessons.length;

  return {
    completedLessons,
    totalLessons,
    percentComplete: totalLessons === 0 ? 0 : Math.round((completedLessons / totalLessons) * 100),
  };
}

function getSectionDescription(section: string): string {
  switch (section) {
    case 'Python Foundations':
      return 'Core syntax, values, and collection basics for brand-new Python developers.';
    case 'Control Flow':
      return 'The branching and repetition tools that make programs respond to data.';
    case 'Program Structure':
      return 'Reusable functions, keyed data, and object-oriented building blocks.';
    case 'Advanced Python':
      return 'Higher-level language features used in real automation and application code.';
    case 'Capstone Projects':
      return 'Small end-to-end builds that combine the course into practical artifacts.';
    default:
      return 'Python lessons grouped by skill progression.';
  }
}
