"use strict";

class Waterfall{
    constructor (container) {
        container.style.position = "relative";
        this.cont = container;
        this.colInfo = {
            left:[],
            height:[]
        };
        this.urls = [];
        this.boxs = [];
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
        aBox.className = "box";
        let pic = document.createElement("div");
        pic.className = "pic";
        let img = document.createElement("img");
        pic.appendChild(img)
        aBox.appendChild(pic);
        this.cont.appendChild(aBox);
        this.boxs.push(aBox);
        img.setAttribute("src", url);
        img.onload = (e)=>{
            let elem = e.target.parentNode.parentNode;
            this.adjustPos(elem, this.colInfo);
            elem.style.visibility = "visible";
        };
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