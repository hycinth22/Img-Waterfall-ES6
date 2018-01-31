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
    

    
默认优先加载完成的图片显示在前。
如果需要保证显示顺序与插入顺序一致，只要将构造对象第二个参数设为true，
即`new Waterfall(cont, true);` 但仍然需要等待先插入图片加载完成，后插入的图片才会显示，因为不加载完成便不能获取图片大小，不能决定后续图片位置。

注意：调用create()时需要保证元素可见性，即包括父级元素的css属性display不为none，否则无法准确排布图片位置。
在特殊情况下可以调用`waterfall.relayout()`重新排布图片（默认改变窗口大小会触发此方法）

# Demo

[Demo Page](https://inkedawn.github.io/Img-Waterfall-ES6/demo.html)
[Sorted Demo Page](https://inkedawn.github.io/Img-Waterfall-ES6/demo2.html)
