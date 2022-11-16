const MissionUtils = require("@woowacourse/mission-utils");
const BridgeMaker = require("../src/BridgeMaker");
const MakeRandomValue = require('../src/BridgeRandomNumberGenerator');

class Feature {
    play() {
        let bridge = this.inputUserValue();
    }

    inputUserValue() {
        let bridge = [];
        MissionUtils.Console.readline("다리크기 입력.", (INPUT) => {
            bridge = BridgeMaker.makeBridge(INPUT, MakeRandomValue.generate());
        })

        return bridge;
    }
}

// const app = new Feature();
// app.play();