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
    slug: 'variables-and-types',
    title: 'Variables and Types',
    section: 'Python Foundations',
    level: 'beginner',
    objective: 'Store values in variables and inspect Python types.',
    explanation: [
      {
        type: 'paragraph',
        content: 'Variables are names attached to values. Python tracks the type of each value at runtime, so you can focus on modeling the idea first.',
      },
      {
        type: 'code',
        content: 'name = "Ada"\nage = 36\nactive = True\nprint(type(name).__name__)',
      },
    ],
    starterCode: 'name = "Ada"\nage = 36\nprint(f"{name} is {age} years old")',
    expectedOutput: 'Ada is 36 years old',
    validation: { type: 'output-contains', value: 'Ada is 36 years old' },
  },
  {
    slug: 'lists',
    title: 'Lists',
    section: 'Python Foundations',
    level: 'beginner',
    objective: 'Collect ordered values and access them by index.',
    explanation: [
      {
        type: 'paragraph',
        content: 'Lists hold ordered items. They are mutable, which means your code can add, remove, and replace values as a program runs.',
      },
    ],
    starterCode: 'skills = ["syntax", "loops", "functions"]\nprint(skills[0])\nprint(len(skills))',
    expectedOutput: 'syntax\n3',
    validation: { type: 'output-contains', value: 'syntax' },
  },
  {
    slug: 'operators',
    title: 'Operators',
    section: 'Python Foundations',
    level: 'beginner',
    objective: 'Use arithmetic, comparison, and boolean operators to transform values.',
    explanation: [
      {
        type: 'paragraph',
        content: 'Operators are the compact verbs of Python expressions. They combine values into new values or decisions.',
      },
    ],
    starterCode: 'score = 7\nbonus = 3\nprint(score + bonus)\nprint(score > bonus)',
    expectedOutput: '10\nTrue',
    validation: { type: 'output-contains', value: 'True' },
  },
  {
    slug: 'conditions',
    title: 'Conditions',
    section: 'Control Flow',
    level: 'beginner',
    objective: 'Branch program behavior with if, elif, and else.',
    explanation: [
      {
        type: 'paragraph',
        content: 'Conditionals let a program choose a path. The first true branch runs, then Python exits the conditional block.',
      },
    ],
    starterCode: 'temperature = 72\nif temperature >= 70:\n    print("comfortable")\nelse:\n    print("cool")',
    expectedOutput: 'comfortable',
    validation: { type: 'exact-output', value: 'comfortable' },
  },
  {
    slug: 'loops',
    title: 'Loops',
    section: 'Control Flow',
    level: 'beginner',
    objective: 'Repeat work with for loops and ranges.',
    explanation: [
      {
        type: 'paragraph',
        content: 'Loops apply the same block of code to each item in a sequence. They are the bridge from one-off examples to useful automation.',
      },
    ],
    starterCode: 'for number in range(3):\n    print(number)',
    expectedOutput: '0\n1\n2',
    validation: { type: 'exact-output', value: '0\n1\n2' },
  },
  {
    slug: 'functions',
    title: 'Functions',
    section: 'Program Structure',
    level: 'intermediate',
    objective: 'Package reusable behavior behind clear names and parameters.',
    explanation: [
      {
        type: 'paragraph',
        content: 'Functions turn repeated steps into a named tool. Good functions make code easier to read, test, and reuse.',
      },
    ],
    starterCode: 'def greet(name):\n    return f"Hello, {name}"\n\nprint(greet("Ada"))',
    expectedOutput: 'Hello, Ada',
    validation: { type: 'exact-output', value: 'Hello, Ada' },
  },
  {
    slug: 'dictionaries',
    title: 'Dictionaries',
    section: 'Program Structure',
    level: 'intermediate',
    objective: 'Model keyed data with dictionaries.',
    explanation: [
      {
        type: 'paragraph',
        content: 'Dictionaries connect keys to values. They are the natural shape for records, API payloads, and lookup tables.',
      },
    ],
    starterCode: 'student = {"name": "Ada", "track": "Python"}\nprint(student["track"])',
    expectedOutput: 'Python',
    validation: { type: 'exact-output', value: 'Python' },
  },
  {
    slug: 'classes-and-objects',
    title: 'Classes and Objects',
    section: 'Program Structure',
    level: 'intermediate',
    objective: 'Bundle state and behavior with classes.',
    explanation: [
      {
        type: 'paragraph',
        content: 'Classes define a blueprint. Objects are concrete instances that carry data and methods together.',
      },
    ],
    starterCode: 'class Robot:\n    def __init__(self, name):\n        self.name = name\n\n    def introduce(self):\n        return f"Unit {self.name} online"\n\nprint(Robot("A1").introduce())',
    expectedOutput: 'Unit A1 online',
    validation: { type: 'exact-output', value: 'Unit A1 online' },
  },
  {
    slug: 'decorators',
    title: 'Decorators',
    section: 'Advanced Python',
    level: 'advanced',
    objective: 'Wrap functions to add reusable behavior without changing call sites.',
    explanation: [
      {
        type: 'paragraph',
        content: 'A decorator is a function that receives a function and returns a replacement function. It is a powerful pattern for logging, validation, and timing.',
      },
    ],
    starterCode: 'def loud(fn):\n    def wrapper():\n        return fn().upper()\n    return wrapper\n\n@loud\ndef message():\n    return "decorators work"\n\nprint(message())',
    expectedOutput: 'DECORATORS WORK',
    validation: { type: 'exact-output', value: 'DECORATORS WORK' },
  },
  {
    slug: 'apis-with-python',
    title: 'APIs with Python',
    section: 'Advanced Python',
    level: 'advanced',
    objective: 'Understand the shape of API requests and responses.',
    explanation: [
      {
        type: 'paragraph',
        content: 'API work is mostly about structured data, error handling, and clear boundaries. This browser lesson uses local sample payloads before a backend runtime is added.',
      },
    ],
    starterCode: 'response = {"status": 200, "data": {"language": "Python"}}\nprint(response["data"]["language"])',
    expectedOutput: 'Python',
    validation: { type: 'exact-output', value: 'Python' },
  },
  {
    slug: 'testing-with-pytest',
    title: 'Testing with pytest',
    section: 'Advanced Python',
    level: 'advanced',
    objective: 'Write small tests that prove functions behave correctly.',
    explanation: [
      {
        type: 'paragraph',
        content: 'Tests are executable expectations. Even when the browser runner cannot execute pytest yet, the lesson teaches the structure and mindset.',
      },
    ],
    starterCode: 'def add(a, b):\n    return a + b\n\nprint(add(2, 3))',
    expectedOutput: '5',
    validation: { type: 'exact-output', value: '5' },
  },
  {
    slug: 'async-python',
    title: 'Async Python',
    section: 'Advanced Python',
    level: 'advanced',
    objective: 'Use async and await to model waiting without blocking.',
    explanation: [
      {
        type: 'paragraph',
        content: 'Async Python lets a program pause one task while another can continue. It is especially useful for network and I/O heavy automation.',
      },
    ],
    starterCode: 'import asyncio\n\nasync def main():\n    await asyncio.sleep(0)\n    print("async ready")\n\nasyncio.run(main())',
    expectedOutput: 'async ready',
    validation: { type: 'exact-output', value: 'async ready' },
  },
  {
    slug: 'capstone-cli-tool',
    title: 'Capstone: CLI Tool',
    section: 'Capstone Projects',
    level: 'project',
    objective: 'Plan and assemble a small command-line project from the course concepts.',
    explanation: [
      {
        type: 'paragraph',
        content: 'The capstone combines data structures, functions, control flow, and error handling into a realistic automation script.',
      },
    ],
    starterCode: 'tasks = []\ntasks.append("parse input")\ntasks.append("print report")\nfor task in tasks:\n    print(f"TODO: {task}")',
    expectedOutput: 'TODO: parse input\nTODO: print report',
    validation: { type: 'output-contains', value: 'TODO: parse input' },
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
