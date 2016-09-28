var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;

window.onload = function() {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
        canvas.width = WINDOW_WIDTH;
        canvas.height = WINDOW_HEIGHT;

        render(context);

    function render(context) {
        var hours = 12,
            minutes = 34,
            seconds = 56;

        renderDigit(0, 0, parseInt(hours/10), context);
    }

    function renderDigit(x, y, num, context) {
        context.fillStyle = "rgb(1, 102, 153)";

        for(var i=0; i<digit[num].length; i++) {
            for(var j = 0; j < digit[num][j].length; j++) {
                if(digit[num][i][j]) {
                //    绘制球
                    context.beginPath();
                    context.arc(

                    );
                    context.closePath();
                    context.fill();
                }
            }
        }

    }
};