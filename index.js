const fs = require('fs');
const color_indexes = {
    0: 'black',
    1: 'red',
    2: 'green',
    3: 'yellow',
    4: 'blue',
    5: 'magenta',
    6: 'cyan',
    7: 'white',
    8: 'lightBlack',
    9: 'lightRed',
    10: 'lightGreen',
    11: 'lightYellow',
    12: 'lightBlue',
    13: 'lightMagenta',
    14: 'lightCyan',
    15: 'lightWhite'
};
const setColor = function(data, count, colors) {
    colors[color_indexes[count]] = data;
};
const getWalColorConfig = function(input, setColor, config) {
    var lines = input.toString().split('\n'),
        colors = config.colors;
    for (var i = 0; i < lines.length; i++) {
        setColor(lines[i], i, colors);
    }

    var backgroundColor = colors.black,
        foregroundColor = colors.lightWhite,
        cursorColor = foregroundColor,
        borderColor = backgroundColor;

    return Object.assign({}, config, {
        foregroundColor, // foreground color
        backgroundColor, // background color
        borderColor, // border color
        cursorColor, // cursor color
        colors,
        css: `
          ${config.css || ''}
          body, .shape_1oxq, .tab_1nfg, .active_fqd {
            color: ${foregroundColor};
          }
          .closeWindow_ohv:hover {
            color: ${colors.red};
          }
          .tabs_list {
            background-color: rgba(0, 0, 0, 0.1)!important;
          }
          .tab_tab {
            border-left: 1px solid rgba(0, 0, 0, 0.1)!important;
            border-top: 1px solid rgba(0, 0, 0, 0.1)!important;
            border-right: 1px solid rgba(255, 255, 255, 0.1)!important;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1)!important;
          }
          .tab_tab.tab_active {
            background-color: rgba(255, 255, 255, 0.1)!important;
            border-left: 1px solid rgba(255, 255, 255, 0.1)!important;
            border-top: 1px solid rgba(255, 255, 255, 0.1)!important;
            border-right: 1px solid rgba(0, 0, 0, 0.1)!important;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1)!important;
          }
        `
    })
};
const file_path = require('os').homedir() + '/.cache/wal/colors';
const input = fs.existsSync(file_path) ? fs.readFileSync(file_path) : null;

exports.decorateConfig = config => {
    if (input) {
        return getWalColorConfig(input, setColor, config);
    } else {
        console.log('Couldn\'t find wal cached colors. Run wal first.');
        return Object.assign({}, config, {});
    }
};
