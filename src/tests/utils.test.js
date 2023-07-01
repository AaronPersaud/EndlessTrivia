import { shuffle, getQuestions } from "../utils";
import axios from "axios";

jest.mock("axios");

describe("shuffle", () => {
  it("returns a list with the same length", () => {
    const testArr = [1, 2, 3, 4];
    const shuffled = shuffle(testArr);

    expect(shuffled.length).toEqual(testArr.length);
  });
  it("returns a list with the same elements", () => {
    const testArr = [5, 3, 2, 1, 6, 4];
    const shuffled = shuffle(testArr);

    shuffled.sort();
    testArr.sort();

    expect(shuffled).toEqual(testArr);
  });
});

describe("getQuestions", () => {
  it("fetches data successfully from thetriviaapi.com", async () => {
    const mockData = [
      {
        category: "Science",
        id: "624333a2cfaae40c129613f4",
        correctAnswer: "A Doe",
        incorrectAnswers: ["A Pen", "A Mare", "A Nanny"],
        question: "A female deer is known as what?",
        tags: ["science"],
        type: "Multiple Choice",
        difficulty: "easy",
        regions: [],
        isNiche: false,
      },
      {
        category: "Film & TV",
        id: "622a1c347cc59eab6f94fc16",
        correctAnswer: '"As God is my witness, I\'ll never be hungry again."',
        incorrectAnswers: [
          '"With great power comes great responsiblity."',
          '"Forget it, Jake, it\'s Chinatown."',
          '"I am Groot."',
        ],
        question:
          "Which of these quotes is from the film 'Gone with the Wind'?",
        tags: ["film", "quotes", "film_and_tv"],
        type: "Multiple Choice",
        difficulty: "hard",
        regions: [],
        isNiche: false,
      },
      {
        category: "Geography",
        id: "622a1c387cc59eab6f950916",
        correctAnswer: "Botswana",
        incorrectAnswers: ["Malawi", "Eswatini", "Lesotho"],
        question: "Which of these countries borders Zimbabwe?",
        tags: ["geography"],
        type: "Multiple Choice",
        difficulty: "hard",
        regions: [],
        isNiche: false,
      },
    ];

    axios.get.mockImplementationOnce(() => Promise.resolve({data: mockData}));

    const questions = await getQuestions(3);

    expect(questions).toEqual(mockData);

  });
  it("fetches data erroneously from thetriviaapi.com", async () => {
    const errorMessage = 'Something went wrong';

    axios.get.mockImplementationOnce(() => 
      Promise.reject(new Error(errorMessage))
    );

    const questions = await getQuestions(3);

    expect(questions).toEqual(undefined)
  })
});
