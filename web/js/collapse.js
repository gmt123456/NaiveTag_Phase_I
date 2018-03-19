/**
 * @Author: 高梦婷
 * @Description: 由于元素众多，取id的过程比较杂乱，不要试图从代码中看懂这方面的问题:>
 * @Date: Created in 2018/3/18
 */
 
var cardbodyright = document.getElementById("card-right");
var cardbodyleft = document.getElementById("card-left");
var arrayright = new Array();//保存右方手风琴的每个collapse对象
var arrayleft = new Array();
var targetIndex;//被选中的card
var labelnum = 1;//接受的标签数量


function onclicklabelleft(id) {
	var label = document.getElementById(id).cloneNode(true)
	var TagHeadIndex = id.split("-")[3];
	var labelIndex = id.split("_")[0];
	var newID = "TagHead" + TagHeadIndex + "-" + labelIndex +"_block-card-right-" + targetIndex;
	label.setAttribute("id",newID);
	label.setAttribute("onclick","onclicklabelright(id)");
	arrayright[targetIndex].addTagLabel(label);
}

function onclicklabelright(id) {
	var del = id.split("_")[0].split("-")[1];
	var tagID = id.replace("-"+del,"");
	var tagHead = document.getElementById(tagID);
	var div = tagHead.getElementsByTagName("div")[0];
	div.innerHTML = "";
}

function onclickcollapse(id){
	for(var i = 0;i < arrayright.length;i++){
        arrayright[i].offLight();
	}

	var target = document.getElementById(id+"");
    target.setAttribute("style","box-shadow:0 0 8px rgba(2, 117,216,0.8);");
    targetIndex = id.split("-")[2];

}

function Label(name,id) {

	this.label = document.createElement("span");
	this.label.setAttribute("id", id);
	this.label.setAttribute("class","badge badge-default");

	this.text = document.createTextNode(name);

	this.label.appendChild(this.text);
}

function TagHead(type,id) {

    this.head = document.createElement("div");
    this.head.setAttribute("id", id);

    this.text = document.createTextNode(type+"：");
    this.div = document.createElement("div");
    this.div.appendChild(this.text);
    this.div.setAttribute("style","display:inline;");

    this.head.appendChild(this.text);
    this.head.appendChild(this.div);

    this.addlab = function (label) {
		//增加div后面的label
		if(this.div.getElementsByTagName("span").length < labelnum){
            this.div.appendChild(label);
		}
    }

    this.dellab = function () {
		//删除div后面的lable
		this.div.innerHTML = "";
    }
}

/**
 *
 * @param id 格式 = cardbodyID + "-" + id(数字);
 * @param cardbodyID
 * @constructor
 */
function Collapse(id, cardbodyID, name){
	var location = id.split("-");
	var right = false;
	if(location[1] == "right"){
		right = true;
	}

	this.name = name;

	this.tagArray = new Array();
	this.labelArray = new Array();

	this.id = id;
	
	this.card = document.createElement("div");
    this.card.setAttribute("class","card");
    this.card.setAttribute("id", id);
    if(right){
    	this.card.setAttribute("onclick","onclickcollapse(id)");
	}
	
	var header = document.createElement("div");
	header.setAttribute("class","card-header");
	
	var collapse = document.createElement("div");
	collapse.setAttribute("class","collapse show");
	collapse.setAttribute("id","card-element-" + id);
	
	var links = document.createElement("a");
    links.setAttribute("class","card-link");
    links.setAttribute("href","#card-element-" + id);
    links.setAttribute("data-toggle","collapse");
    links.setAttribute("data-parent","#"+ cardbodyID);

    var title;
    if(right){
    	var num = parseInt(id.split("-")[2]) + 1;
        title = document.createTextNode("#" + num + " " +name);
	}
	else{
    	title = document.createTextNode(name);
	}
    links.appendChild(title);
	
	var block = document.createElement("div");
	block.setAttribute("class","card-block");
	block.setAttribute("id","block-"+id);
	block.setAttribute("ondrop","drop(event)");
	block.setAttribute("ondragover","allowDrop(event)");

    this.card.appendChild(collapse);
    this.card.insertBefore(header,collapse);
	header.appendChild(links);
	collapse.appendChild(block);

    this.offLight = function () {
		//取消边框发光
        this.card.setAttribute("style","");
    }

	this.addLabel = function(name){
		//增加左方标签
		var id = this.labelArray.length;
		var labelID = "Label"+id+"_"+block.getAttribute("id");
		var label = new Label(name,labelID);
        label.label.setAttribute("onclick","onclicklabelleft(id)");
		block.appendChild(label.label);
        this.labelArray.push(label);
	}

	this.addTagLabel = function (label) {
		//增加右方标签
		var tagID = parseInt(label.getAttribute("id").split("_")[0].split("-")[0].replace("TagHead",""));
		var tag = this.tagArray[tagID];
		tag.addlab(label);
    }

	this.addTagHead= function(type) {
		//添加标记头
		var id = this.tagArray.length;
		var tagHeadID = "TagHead"+id+"_"+block.getAttribute("id");
		var tagHead = new TagHead(type,tagHeadID);
        block.appendChild(tagHead.head);
        this.tagArray.push(tagHead);
    }

}


function newCollapseLeft(typename, labelnamearray){
    var cardbodyID = cardbodyleft.getAttribute("id");
    var collapseID = cardbodyID + "-" + arrayleft.length;
    var collapse = new Collapse(collapseID, cardbodyID, typename+"");
    for(var value in labelnamearray){
        collapse.addLabel(labelnamearray[value]);
	}
    arrayleft.push(collapse);
    cardbodyleft.appendChild(collapse.card);
}

function pushCollapse(){
	//添加手风琴
	var cardbodyID = cardbodyright.getAttribute("id");
	var collapseID = cardbodyID + "-" + arrayright.length;
	var collapse = new Collapse(collapseID, cardbodyID,"");
	for(var i = 0;i < arrayleft.length;i++){
		var type = arrayleft[i].name;
        collapse.addTagHead(type);
	}

    cardbodyright.appendChild(collapse.card);
    arrayright.push(collapse);

    onclickcollapse(collapse.card.getAttribute("id"));
}

function popCollapse(){
	//删除手风琴
	var cards = cardbodyright.getElementsByClassName("card");
    var cardN = cards.length;
    if (cardN > 0){
		var delchild = document.getElementById(arrayright[arrayright.length-1].id);
        cardbodyright.removeChild(delchild);
        arrayright.pop();

	}
}

function delCollapse(){
	//清空手风琴
    cardbodyright.innerHTML = "";
	for (var card in arrayright){
        arrayright.pop();
	}
}
