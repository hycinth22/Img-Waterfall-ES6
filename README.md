# Notice

Still Immature

# Usage

HTML

    <div id="mainContainer"></div>

JS

    var waterfall =  new Waterfall(document.getElementById("mainContainer"));
    waterfall.addUrls([
        "http://pic1...",
        "http://pic2...",
        "http://pic3..."
    ]);
    waterfall.create();
    waterfall.addImg("http:://../");
    waterfall.addImg("http:://../");
    

    
如果需要保证显示顺序与插入顺序一致，只要将构造对象第二个参数设为true，
即`new Waterfall(cont, true);`

# Demo

[Demo Page](https://inkedawn.github.io/Img-Waterfall-ES6/demo.html)