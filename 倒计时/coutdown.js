var WINDOW_WIDTH = 1400;
var WINDOW_HEIGHT = 768;
var RADIUS = 8;
var MARGIN_TOP = 60;
var MARGIN_LEFT = 0;
//截止时间
//const endTime = new Date(2016, 9, 2, 00, 00, 00);
const endTime = new Date(2016, 11, 18, 00, 00, 00);
//剩余秒数
var curShowTimeSeconds = 0;
var balls = [];
var colors = ["#33B5E5", "#0099cc", "#AA66CC", "#9933CC", "#99CC00", "#669900", "#FFBB33", "#FF8800", "#FF4444", "#CC0000"];


// 就绪
window.onload = function() {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
        canvas.width = WINDOW_WIDTH;
        canvas.height = WINDOW_HEIGHT;
        curShowTimeSeconds = getCurrentShowTimeSeconds();

        setInterval(
            function() {
                //绘制
                render(context);
                //数据改变
                update();
            }, 50
        );

    //距结束时间剩余时间
    function getCurrentShowTimeSeconds() {
        //获取当前时间
        var curTime = new Date();
        //剩余时间(秒)
        var ret = Math.round((endTime.getTime() - curTime.getTime())/1000) ;
        return ret >= 0 ? ret : 0;
    }

    //绘制小球
    function render(context) {
        //防止图像叠加,进行刷新
        context.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);

        var days = parseInt( curShowTimeSeconds / (3600*24) ),
            hours = parseInt( (curShowTimeSeconds - days*3600*24) / 3600),
            minutes = parseInt( (curShowTimeSeconds - (days*3600*24 + hours*3600)) / 60),
            seconds = curShowTimeSeconds % 60;

        renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(days/10), context);
        renderDigit(MARGIN_LEFT + 15*(RADIUS+1), MARGIN_TOP, parseInt(days%10), context);
        renderDigit(MARGIN_LEFT + 30*(RADIUS+1), MARGIN_TOP, 10, context);//冒号

        renderDigit(MARGIN_LEFT + 39*(RADIUS+1), MARGIN_TOP, parseInt(hours/10), context);
        renderDigit(MARGIN_LEFT + 54*(RADIUS+1), MARGIN_TOP, parseInt(hours%10), context);
        renderDigit(MARGIN_LEFT + 69*(RADIUS+1), MARGIN_TOP, 10, context);//冒号

        renderDigit(MARGIN_LEFT + 78*(RADIUS+1), MARGIN_TOP, parseInt(minutes/10), context);
        renderDigit(MARGIN_LEFT + 93*(RADIUS+1), MARGIN_TOP, parseInt(minutes%10), context);
        renderDigit(MARGIN_LEFT + 108*(RADIUS+1), MARGIN_TOP, 10, context);//冒号

        renderDigit(MARGIN_LEFT + 117*(RADIUS+1), MARGIN_TOP, parseInt(seconds/10), context);
        renderDigit(MARGIN_LEFT + 132*(RADIUS+1), MARGIN_TOP, parseInt(seconds%10), context);

    //    小球的绘制
        for(var i=0; i<balls.length; i++) {
            context.fillStyle = balls[i].color;
            context.beginPath();
            context.arc(balls[i].x, balls[i].y, RADIUS, 0, 2*Math.PI, true);
            context.closePath();
            context.fill();
        }
    }

    function update() {
        var nextShowTimeSeconds = getCurrentShowTimeSeconds();

        var nextDays = parseInt(nextShowTimeSeconds/(3600*24)),
            nextHours = parseInt( (nextShowTimeSeconds - nextDays*3600*24) / 3600),
            nextMinutes = parseInt( (nextShowTimeSeconds - (nextDays*3600*24 + nextHours*3600) ) / 60),
            nextSeconds = nextShowTimeSeconds%60;

        var curDays = parseInt(curShowTimeSeconds / (3600*24)),
            curHours = parseInt( (curShowTimeSeconds - curDays*3600*24) / 3600),
            curMinutes = parseInt( (curShowTimeSeconds - (curDays*3600*24 + curHours*3600)) / 60),
            curSeconds = curShowTimeSeconds % 60;

    //    做时间比较是否相同
        if(nextSeconds != curSeconds) {
            //只对改变的数字给赋彩球

            //日期（十位）
            if(parseInt(curDays/10) != parseInt(curDays/10)) {
                //参数值表示改变数字所在位置及数字
                addBalls(MARGIN_LEFT + 0, MARGIN_TOP, parseInt(curDays/10));
            }
            //个位
            if(parseInt(curDays%10) != parseInt(curDays%10)) {
                addBalls(MARGIN_LEFT + 15*(RADIUS+1), MARGIN_TOP, parseInt(curDays/10));
            }
            //小时
            if(parseInt(curHours/10) != parseInt(nextHours/10)) {
                //参数值表示改变数字所在位置及数字
                addBalls(MARGIN_LEFT + 39, MARGIN_TOP, parseInt(curHours/10));
            }
            if(parseInt(curHours%10) != parseInt(nextHours%10)) {
                addBalls(MARGIN_LEFT + 54*(RADIUS+1), MARGIN_TOP, parseInt(curHours/10));
            }
            //分钟
            if(parseInt(curMinutes/10) != parseInt(nextMinutes/10)) {
                addBalls(MARGIN_LEFT + 78*(RADIUS+1), MARGIN_TOP, parseInt(curMinutes/10));
            }
            if(parseInt(curMinutes%10) != parseInt(nextMinutes%10)) {
                addBalls(MARGIN_LEFT + 93*(RADIUS+1), MARGIN_TOP, parseInt(curMinutes%10));
            }
            //秒钟
            if(parseInt(curSeconds/10) != parseInt(nextSeconds/10)) {
                addBalls(MARGIN_LEFT + 117*(RADIUS+1), MARGIN_TOP, parseInt(curSeconds/10));
            }
            if(parseInt(curSeconds%10) != parseInt(nextSeconds%10)) {
                addBalls(MARGIN_LEFT + 132*(RADIUS+1), MARGIN_TOP, parseInt(curSeconds%10));
            }

            curShowTimeSeconds = nextShowTimeSeconds;
        }
        updateBalls();
    }

    function updateBalls() {
        for(var i=0; i<balls.length; i++) {
            balls[i].x += balls[i].vx;
            balls[i].y += balls[i].vy;
            balls[i].vy += balls[i].g;
        //    地板碰撞检测
            if(balls[i].y >= WINDOW_HEIGHT - RADIUS) {
                balls[i].y = WINDOW_HEIGHT - RADIUS;
                balls[i].vy = -balls[i].vy*0.7;
            }
        }

        //可视区内的彩球个数
        var count = 0;
        for(var i=0; i<balls.length; i++) {
            //判断是否在可视区
            if(balls[i].x + RADIUS > 0 && balls[i].x - RADIUS < WINDOW_WIDTH) {
                balls[count++] = balls[i];
            }
        }
        while (balls.length > count){
            balls.pop();
        }
    }

    function addBalls(x, y, num) {
        for(var i=0; i<digit[num].length; i++) {
            for(var j=0; j<digit[num][i].length; j++) {
                if(digit[num][i][j] == 1) {
                    //x坐标，y坐标，加速度，x方向速度（-4 或 +4）,y方向速度（负数会有向上抛的作用），颜色
                    var aBall = {
                        x: x + j*2*(RADIUS+1) + (RADIUS+1),
                        y: y + i*2*(RADIUS+1) + (RADIUS+1),
                        g: 1.5 + Math.random(),
                        vx: Math.pow(-1, Math.ceil(Math.random()*1000)) * 4,
                        vy: -5,
                        color: colors[Math.floor(Math.random() * colors.length)]
                    };
                    balls.push(aBall);
                }
            }
        }
    }
    /*
     *
     * 画变化的数字
     * @param 数字所在的位置，左边距右边距，要画的数字，context对象
     *
    */
    function renderDigit(x, y, num, context) {
        context.fillStyle = "rgb(1, 102, 153)";
        for(var i=0; i<digit[num].length; i++) {
            for(var j = 0; j < digit[num][i].length; j++) {
                if(digit[num][i][j]) {
                //    绘制球
                    context.beginPath();
                    context.arc(
                        x+j*2*(RADIUS+1)+(RADIUS+1), y+i*2*(RADIUS+1)+(RADIUS+1),
                        RADIUS,
                        0, 2*Math.PI
                    );
                    context.closePath();
                    context.fill();
                }
            }
        }
    }
};