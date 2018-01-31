"use strict";

class Waterfall{
    constructor (container, ordered=false) {
        container.style.position = "relative";
        this.cont = container;
        this.colInfo = {
            left:[],
            height:[]
        };
        this.urls = [];
        this.boxs = [];
        this.ordered = ordered;
        this.nextInsertOrder = 0;
        this.nextLoadOrder = 0;
    }
    create(){
        for (let imgSrc of this.urls){
            this.addImg(imgSrc);
        }
        window.onresize = (e)=>{
            this.colInfo = {
                left:[],
                height:[]
            };
            for (let elem of this.boxs)
            {
                this.adjustPos(elem);
            }
        };
    }
    addUrls(urls){
        this.urls = this.urls.concat(urls);
    }
    addImg(url){
        let aBox = document.createElement("div");
        aBox.style.visibility = "hidden";
        aBox.className = "waterfall-box";
        let pic = document.createElement("div");
        pic.className = "waterfall-pic";
        let img = document.createElement("img");
        img.className = "waterfall-img";
        pic.appendChild(img)
        aBox.appendChild(pic);
        this.cont.appendChild(aBox);
        this.boxs.push(aBox);
        img.setAttribute("src", url);
        img.setAttribute("data-order",  this.nextInsertOrder.toString());
        this.nextInsertOrder++;
        img.onload = (e)=>{
            let waterfall = this;
            let img = e.target;
            function tryLoad(){
                let order = Number(img.getAttribute("data-order"));
                console.log("Try loading" + order);
                if (waterfall.testShouldLoad(img))
                {
                    let elem = img.parentNode.parentNode;
                    waterfall.adjustPos(elem, waterfall.colInfo);
                    elem.style.visibility = "visible";
                    console.log("Loading img" + order);
                    waterfall.loadNext();
                }else{
                    let waitTime = (order - waterfall.nextLoadOrder)* 25;
                    console.log("Wait for retry loading" + order + " after" + waitTime);
                    setTimeout(tryLoad, waitTime);
                }
            }
            tryLoad();
        };
    }
    testShouldLoad(img){
        if (!this.ordered)
            return true;
        let order = Number(img.getAttribute("data-order"));
        return this.nextLoadOrder === order;
    }
    loadNext(){
        this.nextLoadOrder++;
    }

    getTopPosIndex(){
        if (this.colInfo.height.length < 4)
        {
            let i = this.colInfo.height.length;
            this.colInfo.left[i] = (this.cont.clientWidth*0.25)*i;
            this.colInfo.height[i] = 0;
            return i;
        }

        // find the min height and related left
        let height = this.colInfo.height[0];
        let index = 0;
        for (let i=1;i <this.colInfo.height.length;i++)
        {
            if (this.colInfo.height[i]<height)
            {
                index = i;
            }
        }
        return index;
    }
    adjustPos(elem){
        let i = this.getTopPosIndex(this.colInfo);
        elem.style.position = "absolute";
        elem.style.top = this.colInfo.height[i] + "px";
        elem.style.left = this.colInfo.left[i]  + "px";
        this.colInfo.height[i] += elem.offsetHeight;
        return {top: elem.style.top, left: elem.style.left};
    }
}