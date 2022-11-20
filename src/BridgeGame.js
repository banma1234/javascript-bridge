/**
 * 다리 건너기 게임을 관리하는 클래스
 */
const InputHandler = require('./InputView');
const OutputHandler = require('./OutputView');

class BridgeGame {
  #bridge;
  #userInput = "";
  #COUNT = 1;

  constructor(bridge) {
    this.#bridge = bridge;
  }
  /**
   * 사용자가 칸을 이동할 때 사용하는 메서드
   * <p>
   * 이동을 위해 필요한 메서드의 반환 값(return value), 인자(parameter)는 자유롭게 추가하거나 변경할 수 있다.
   */
  move() {}

  /**
   * 사용자가 게임을 다시 시도할 때 사용하는 메서드
   * <p>
   * 재시작을 위해 필요한 메서드의 반환 값(return value), 인자(parameter)는 자유롭게 추가하거나 변경할 수 있다.
   */
  retry() {}

  template() {
    this.#bridge.forEach(item => {
      this.#userInput = InputHandler.readMoving();
      this.matchBridge(item);
    });
  }

  matchBridge(item) {
    if (item != this.#userInput) {
      OutputHandler.printMap(this.#userInput, false);
      this.retry();
    }
    OutputHandler.printMap(this.#userInput, true);
  }
}

module.exports = BridgeGame;
