const { MissionUtils } = require("@woowacourse/mission-utils");

/**
 * 사용자로부터 입력을 받는 역할을 한다.
 */
const InputView = {
  /**
   * 다리의 길이를 입력받는다.
   */
  readBridgeSize() {
    let result;
    MissionUtils.Console.readline("다리의 길이를 입력해주세요.", (input) => {
      let TEMP = parseInt(input)
      if (TEMP < 3 | TEMP > 20) {
        throw new Error("[Error] 다리의 크기는 3 ~ 20 사이의 숫자만 가능합니다.");
      }
      result = TEMP;
    });

    return result;
  },

  /**
   * 사용자가 이동할 칸을 입력받는다.
   */
  readMoving() {
    let result = "";
    MissionUtils.Console.readline("이동할 칸을 선택해주세요. (위: U, 아래: D)", 
    (input) => {
      if (input != "U" | input != "D") {
        throw new Error("[Error] 이동시 U 혹은 D를 입력해주세요.")
      }
      result = input;
    });

    return result;
  },

  /**
   * 사용자가 게임을 다시 시도할지 종료할지 여부를 입력받는다.
   */
  readGameCommand() {
    let result = "";
    MissionUtils.Console.readline("게임을 다시 시도할지 여부를 입력해주세요. (재시도: R, 종료: Q)", 
    (input) => {
      if (input != "R" | input != "Q") {
        throw new Error("[Error] 재시작시 R 혹은 Q를 입력해주세요.")
      }
      result = input;
    });

    return result;
  },
};

module.exports = InputView;
