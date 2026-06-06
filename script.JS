function get_cookie() {
    let cookies = document.cookie.split('; ')
    console.log(cookies)
    for (i=0; i < cookies.length; i++) {
        let cookie = cookies[i].split('=')
        console.log(cookie)
        if (cookie[0] == 'pixel-result') {
            return cookie[1]
        }
    }
    return '0' * 450
}

var CURRENT_COLOR = "red"
var DEFAUL_COLOR = "rgb(65, 65, 65)"
var IS_CLICKED = false;
var FILL_MODE = false;

var COLORS = [
    "rgb(65, 65, 65)",
    "red",
    "green",
    "blue",
    "yellow",
    "skyblue",
    "black",
    "pink"
]

var COLOR_MAP = {
    "red" : "red",
    "green" : "green",
    "blue" : "blue",
    "yellow" : "yellow",
    "skyblue" : "skyblue",
    "black" : "black",
    "pink" : "pink"
}

var IS_CLICKED = false;

document.addEventListener('mousedown', function() {
    IS_CLICKED = true;
})

document.addEventListener('mouseup', function() {
    IS_CLICKED = false;
})

let field = document.querySelector('.field')

for (i = 0; i < 450; i++) {
    let cell = document.createElement('div')
    cell.classList.add('cell')
    field.appendChild(cell)
}

let cells = document.querySelectorAll('.cell')
for (i = 0; i < cells.length; i++) {
    let cell = cells[i];
    cell.addEventListener('click', function() {
        cell.style.backgroundColor = CURRENT_COLOR;
    })

    cell.addEventListener('mouseover', function() {
        if (IS_CLICKED) {
            cell.style.backgroundColor = CURRENT_COLOR;
        }
    })

    cell.addEventListener('mouseover', function() {
        if (IS_CLICKED) {
            cell.style.backgroundColor = CURRENT_COLOR;
        }
    })
    cell.addEventListener('mousedown', function() {
        cell.style.backgroundColor = CURRENT_COLOR;
    })

    cell.addEventListener('mousedown', function() {
        if (FILL_MODE) {
            for (let j = 0; j < cells.lenght; j++) {
                cells[j].style.backgroundColor = CURRENT_COLOR;
            }
     } else {
        cell.style.backgroundColor = CURRENT_COLOR;
     }
    })
}

let color_cells = document.querySelectorAll('.color-cell')
for (i=0; i < color_cells.length; i++) {
    let color_cell = color_cells[i]
    color_cell.addEventListener('click', function() {
        let colorClass = "";
        if (color_cell.classList.contains("red")) colorClass = "red";
        else if (color_cell.classList.contains("green")) colorClass = "green";
        else if (color_cell.classList.contains("blue")) colorClass = "blue";
        else if (color_cell.classList.contains("yellow")) colorClass = "yellow";
        else if (color_cell.classList.contains("skyblue")) colorClass = "skyblue";
        else if (color_cell.classList.contains("black")) colorClass = "black";
        else if (color_cell.classList.contains("pink")) colorClass = "pink";

        CURRENT_COLOR = COLOR_MAP[colorClass]

        FILL_MODE = false;

        document.querySelector('.selected').classList.remove(`selected`)
        color_cell.classList.add('selected')
    })
}

document.querySelector('.eraser').addEventListener('click', function(){
    CURRENT_COLOR = DEFAUL_COLOR;

    document.querySelector('.selected').classList.remove('selected')
    this.classList.add('selected')
})

document.querySelector('.fill-tool').addEventListener('click',function() {
    FILL_MODE = true;

    document.querySelector('.selected').classList.remove('selected')
    this.classList.add('selected')
})

setInterval(function() {
    let result = '';
    let temp_cells = document.querySelectorAll('.cell');

    for (i=0; i < temp_cells.length; i++) {
        let cell = temp_cells[i]
        let color = cell.style.backgroundColor;

        let colorIndex = "0";
        for (j=0; j < COLORS.length; j++) {
         if (color == COLORS[j]) {
            colorIndex = j.toString();
            break;
          }
    }
    result += colorIndex
 }
    document.cookie = `pixel-result=${result};max-age=10000`
}, 60000)

document.querySelector('.save-tool').addEventListener('click', function() {
    domtoimage.toJpeg(field, {quality: 2})
    .then(function (dataUrl) {
        var img = new Image()
        img.src = dataUrl;
        let link = document.createElement('a');
        link.downloand = 'pixel.jpg';
        link.href = dataUrl;
        link.click();
    })
    .catch(function (error) {
        console.log('Не работает')
    })
})

document.querySelector('#start-button').addEventListener('click', function() {
    let main = document.querySelector('.main-page') 
    let editor = document.querySelector('.field-container')

    editor.style.display = "flex"
    main.style.display = "none"
})
