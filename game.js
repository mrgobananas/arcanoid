// Plsease play online here https://jsfiddle.net/aje9Lge0/
var CoordObj;
var Nleft;
var Ntop;
 
// Размер viewport по вертикали и горизонтали
var DispHeight = document.documentElement.clientHeight;
var DispWidth = document.documentElement.clientWidth;
 
//Случайно выбираем в какой угол запускать шар
var A =  Math.random();
if      (A >= 0    && A <= 0.25){ var Way = 1; }
else if (A >= 0.25 && A <= 0.5) { var Way = 2; }
else if (A >= 0.5  && A <= 0.75){ var Way = 3; }
else if (A >= 0.75 && A <= 1)   { var Way = 4; }
 
// Получим первоначальные координаты шара
CoordObj = layer2.getBoundingClientRect();
Top = CoordObj.top;
Left = CoordObj.left;
var angle = 35;
 
 
// Строим DIV
var DisplayWidth = document.documentElement.clientWidth;
var DisplayHeight = document.documentElement.clientHeight;
 
var Rows = 5; // Сколько строк
var Cols = 10; // Сколько колонок
var Blocks = Rows * Cols; // Сколько блоков всего
var Column = Math.floor(DisplayWidth/Cols); // Ширина одной колонки
    Column = +Column - 7;
 
var StartRow = []; var Add = ''; var i = ''; var reset = '';
for (i = 1; i < Rows; i++) {
    Add = Cols * i;
    StartRow.push(Add);
}
 
var FillDiv = '';
var Ot = 0.2; // Отступ между блоками в %
var OtPix = 6; // Отступ между блоками в px
var BlockHeight = 10; // Отступ между блоками в пикселях
var Of = 0; // Зададим переменную отступа между блоками
var topO = 0; // Зададим переменную отступа сверху
var Bl = 4; // Ширина одного блока в %
var Line = ''; // Номер линии сверху
var J = 0; // J - это номер блока в строчке для первого (нулевого) не отображается
 
// Цикл генерации блоков
for (i = 0; i < Blocks; i++) {
  //Проверка на сброс строки
  var tt = StartRow.indexOf(i);
 
  // Если есть то это новая строка
  if(tt != -1){ reset = 1;
    J = 0;
    topO = +topO + +BlockHeight +4; // это отступ сверху
  }
 
    if(J == 0){ Of = 0; }
    else{ Of = J*(+Column + +OtPix); }
 
  FillDiv+='<div id="tn'+i+'" style="position: absolute; top: '+topO+'px; left: '+Of+'px; width: '+Column+'px; height: '+BlockHeight+'px; border: solid 1px black; background: #FFCC33;"></div>';
  J++;
}
document.getElementById('area').innerHTML=FillDiv;
 
// Перемещение доски
var block;

// получим значение длины доски из CSS
block = document.getElementById("board");
var Width = window.getComputedStyle(block,null).getPropertyValue("width");
Width = Width.replace("px", "");

// слушаем мышку
document.addEventListener("mousemove", function()
{
    block = document.getElementById("board");
    var ThisMax = +event.clientX + +Width;
    if(ThisMax > DispWidth){
        var overhead = 'больше';
        block.style.left = +DispWidth - +60 +'px';
    }
    else{ block.style.left = event.clientX+'px'; }
});
 
 
 
// ИНТЕРВАЛ
var CoordBoard;
var timerId = setInterval(function() {
 
    if(Way == 1){Top -= Math.sin(angle * Math.PI / 180); Left -= Math.cos(angle * Math.PI / 180); GTop=3; GBok=2; }
    if(Way == 2){Top -= Math.sin(angle * Math.PI / 180); Left += Math.cos(angle * Math.PI / 180); GTop=4; GBok=1; }
    if(Way == 3){Top += Math.sin(angle * Math.PI / 180); Left -= Math.cos(angle * Math.PI / 180); GNiz=1; GBok=4; }
    if(Way == 4){Top += Math.sin(angle * Math.PI / 180); Left += Math.cos(angle * Math.PI / 180); GNiz=2; GBok=3; }
 
    // Заного снимаем координаты шарика
    CoordObj = layer2.getBoundingClientRect();
    Bottom = CoordObj.bottom;
    Right = CoordObj.right;
   
    if(Bottom >= DispHeight && Way == 3){ Way = 1; }
    if(Bottom >= DispHeight && Way == 4){ Way = 2; }
   
    if(Left <= 0 && Way == 1){ Way = 2; }
    if(Left <= 0 && Way == 3){ Way = 4; }
 
    if(Top <= 0 && Way == 2){ Way = 4; }
    if(Top <= 0 && Way == 1){ Way = 3; }
 
    if(Right >= DispWidth && Way == 2){ Way = 1; }
    if(Right >= DispWidth && Way == 4){ Way = 3; }
   
    // Заного снимаем координаты доски
    CoordBoard = board.getBoundingClientRect();

    // Назначаем размеры объектов для поиска коллизии
    var CBall = {x1: CoordObj.left, x2: CoordObj.right, x3: CoordObj.bottom, x4: CoordObj.top}
    var CBoar = {y1: CoordBoard.left, y2: CoordBoard.right, y3: CoordBoard.top}
 
    if(CBall.x2 >= CBoar.y1 && CBall.x1<=CBoar.y2)
    {  
        if(CBall.x3 >= CBoar.y3 && Way == 3){ Way = 1; }
        if(CBall.x3 >= CBoar.y3 && Way == 4){ Way = 2; }
    }
   
// Цикл проверки столкновения с блоками
for (i = 0; i < Blocks; i++) {
    IDblock = 'tn'+i;
    MicroBlock = window[IDblock].getBoundingClientRect();
 
    if(Way == 1 || Way == 2){
        if(CBall.x4 <= MicroBlock.bottom && CBall.x2 >= MicroBlock.left && CBall.x1 <= MicroBlock.right){
            //Way = 1;
            document.getElementById('c_test2').innerHTML='Столкновение снизу с шаром: '+i;
            Way = GTop;
            window[IDblock].style.left = '-200px';
            window[IDblock].style.top = '-200px';
        }
        else{ document.getElementById('collision_test1').innerHTML='ничего вверх'; }
    }
   
    if(Way == 3 || Way == 4){
        if(CBall.x3 >= MicroBlock.top && CBall.x2 >= MicroBlock.left && CBall.x1 <= MicroBlock.right && CBall.x4 < MicroBlock.top){
            document.getElementById('c_test2').innerHTML='Столкновение сверху с блоком: '+i;
            Way = GNiz;
        }
        else{ document.getElementById('collision_test1').innerHTML='ничего вниз'; }
    }
}
   
    document.getElementById('echo3').innerHTML='Правый край: '+DispWidth+' Правый шара '+Right;
 
    layer2.style.top = Top+'px';
    layer2.style.left = Left+'px';
 
}, 4);
 
 
// остановить повторы
  setTimeout(function() {
  clearInterval(timerId);
  document.getElementById('echo').innerHTML='стоп';
}, 3000000);