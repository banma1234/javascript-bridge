const MissionUtils = require("@woowacourse/mission-utils");
const Feature = require("../src/Feature");
const BridgeMaker = require("../src/BridgeMaker");

const mockQuestions = (answers) => {
  MissionUtils.Console.readLine = jest.fn();
  answers.reduce((acc, input) => {
    return acc.mockImplementationOnce((_, callback) => {
      callback(input);
    });
  }, MissionUtils.Console.readLine);
};

const mockRandoms = (numbers) => {
  MissionUtils.Random.pickNumberInRange = jest.fn();
  numbers.reduce((acc, number) => {
    return acc.mockReturnValueOnce(number);
  }, MissionUtils.Random.pickNumberInRange);
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, "print");
  logSpy.mockClear();
  return logSpy;
};

const getOutput = (logSpy) => {
  return [...logSpy.mock.calls].join("");
};

const runException = (inputs) => {
  mockQuestions(inputs);
  const logSpy = getLogSpy();
  const app = new Feature();

  app.play();

  expectLogContains(getOutput(logSpy), ["[ERROR]"]);
};

const expectLogContains = (received, logs) => {
  logs.forEach((log) => {
    expect(received).toEqual(expect.stringContaining(log));
  });
};

const expectBridgeOrder = (received, upside, downside) => {
  const upsideIndex = received.indexOf(upside);
  const downsideIndex = received.indexOf(downside);

  expect(upsideIndex).toBeLessThan(downsideIndex);
};


// ~~~~~~ testCode ~~~~~~


describe("다리 생성 테스트", () => {
  test("다리 생성", () => {
    const randomNumbers = ["1", "0", "0"];
    const mockGenerator = randomNumbers.reduce((acc, number) => {
      return acc.mockReturnValueOnce(number);
    }, jest.fn());

    const bridge = BridgeMaker.makeBridge(3, mockGenerator);
    expect(bridge).toEqual(["U", "D", "D"]);
  });

  test("예외처리 : size가 숫자가 아닌 경우", () => {
    const randomNumbers = ["1", "0", "0"];
    const mockGenerator = randomNumbers.reduce((acc, number) => {
      return acc.mockReturnValueOnce(number);
    }, jest.fn());

    expect(() => {
        BridgeMaker.makeBridge("string", mockGenerator)
    }).toThrow("[Error]");
  })
});

// describe("다리 건너기 테스트", () => {
//   test("다리 생성", () => {
//     const app = new Feature();
//     const randomNumbers = ["1", "0", "0"];
//     const mockGenerator = randomNumbers.reduce((acc, number) => {
//       return acc.mockReturnValueOnce(number);
//     }, jest.fn());

//     const bridge = BridgeMaker.makeBridge(3, mockGenerator);
//     expect(bridge).toEqual(["U", "D", "D"]);
//   });
// })

describe("다리 건너기 테스트", () => {
  test("기능 테스트", () => {
    const logSpy = getLogSpy();
    mockRandoms(["1", "0", "1"]);
    mockQuestions(["3", "U", "D", "U"]);

    const app = new Feature();
    app.play();

    const log = getOutput(logSpy);
    expectLogContains(log, [
      "성공여부 : 성공",
      "시도횟수 : 1",
    ]);
    expectBridgeOrder(log, "success");
  });

  // test("예외 테스트", () => {
  //   runException(["a"]);
  // });
});