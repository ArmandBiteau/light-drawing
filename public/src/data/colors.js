
class Color {
    constructor(name, gradient) {
        this.name = name;
        this.gradient = gradient;
    }
}

module.exports = [
    new Color('blue', [
        0x4890FF,
        0x6238FF,
        0xF6F6F6,
        0x283BEF,
        0x6238FF,
        0xF6F6F6,
        0x4890FF,
        0x6DE49B
    ]),
    new Color('green', [
        0x6DE49B,
        0x4890FF,
        0x4FFF1C,
        0x4890FF,
        0xF6F6F6,
        0x6DE49B,
        0xF6F6F6,
        0x3F7F2D,
        0x6DE49B
    ]),
    new Color('yellow', [
        0xFFF6A5,
        0xCC8B18,
        0xF6F6F6,
        0xFFAE1E,
        0xF6F6F6,
        0xCCB700,
        0xFFF711,
        0xFFC610
    ]),
    new Color('red', [
        0xBF432C,
        0x7F2D1D,
        0xFF785F,
        0x40160F,
        0xFF785F,
        0xF6F6F6,
        0x40160F,
        0xE55134
    ]),
    new Color('purple', [
        0x4B277F,
        0xF0E5FF,
        0x964EFF,
        0xF6F6F6,
        0x5D467F,
        0xF783ECC,
        0xF6F6F6
    ])
];
