const InputHandler = require('./InputView');
const BridgeMaker = require('./BridgeMaker');
const MakeRandomValue = require('./BridgeRandomNumberGenerator');

class App {
  play() {
    let bridge = BridgeMaker.makeBridge(
      InputHandler.readBridgeSize(), MakeRandomValue.generate()
    );
  }

}

module.exports = App;
