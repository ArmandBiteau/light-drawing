
class Color {

    constructor(name, gradient) {

        this.name = name;
        this.gradient = gradient;

    }

}

module.exports = [
    new Color('blue', [
        0xF6F6F6, //white
        0x6238FF, //purple
        0x283BEF, //blue
        0x6238FF, //purple
        0x4890FF, //cyan
        0x4890FF, //cyan
        0x6DE49B  //green
    ]),
    new Color('green', [
        0xF6F6F6, //white
        0x4890FF, //cyan
        0x4890FF, //cyan
        0x6DE49B,  //green
        0x6DE49B,  //green
        0x6DE49B  //green
    ]),
    new Color('yellow', [
        0xF6F6F6, //white
        0xFFB47B,  //red
        0xF9C47B,  //red
        0x3FB47B  //red
    ])
];
