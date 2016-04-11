<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <script src="js/idb0.0.1.js"></script>
</head>
<body>


<script>


    function extend(destination, source){
/*        var property;
        for (property in source) {
            if (source[property] && source[property].constructor && source[property].constructor === Object) {
                destination[property] = destination[property] || {};
                extend(destination[property], source[property]);
            } else {
                destination[property] = source[property];
            }
        }
        return destination;*/

        //console.log(source.prototype);

        for(var key in source) {
            //console.log(key);
            if(source.hasOwnProperty(key) && key !== 'constructor'){
                destination[key] = source[key];
            }
            extend(destination.prototype, source.prototype)
        }
        return destination;
    }


    function Shape(x, y){
        this.x = x;
        this.y = y;
    }
    Shape.prototype.x = 0;
    Shape.prototype.y = 0;
    Shape.prototype.getPosition = function(){return {x:this.x, y:this.y}};
    Shape.prototype.setPosition = function(x, y){return {x:this.x = x, y:this.y = y}};
    Shape.prototype.constructor = Shape;
    Shape.xxx = 'xxx';

    function Rectangle(x, y, width, height){
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
    }
    Rectangle.prototype.width = 0;
    Rectangle.prototype.height = 0;

    extend(Rectangle, Shape);


    var shp = new Shape(150,350);
    var rec = new Rectangle(10,10,100,200);
/**/
    console.log(shp);
    console.log(shp.setPosition(155,355));
    console.log(shp.getPosition());


    console.log(rec);
    console.log(rec.setPosition(25,35));
    console.log(rec.getPosition());




















/*
    function Shape(x, y){
        this.x = x;
        this.y = y;
    }
    Shape.prototype.x = 0;
    Shape.prototype.y = 0;
    Shape.prototype.getPosition = function(){
        return {x:this.x, y:this.y};
    };

    function Rectangle(x, y, width, height){
        Shape.call(this, x, y);
        this.height = height;
        this.width = width;
    }

    Rectangle.prototype = Object.create(Shape.prototype);
    Rectangle.prototype.constructor = Rectangle;

    Rectangle.prototype.width = 0;
    Rectangle.prototype.height = 0;

    var rec = new Rectangle(10,10,100,200);
*/




    //



</script>
</body>
</html>