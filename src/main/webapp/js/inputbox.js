/**
 * @Author: 高梦婷
 * @Description:
 * @Date: Created in 2018/3/21
 */

var boxArray = new Array();

function InputBox(description, idNum) {

    this.description = "#" + (idNum + 1) + " " + description;

    this.inputbox = document.createElement("form");
    this.inputbox.setAttribute("role", "form");
    this.inputbox.setAttribute("id", "inputBox_" + idNum);
    var div = document.createElement("div");
    div.setAttribute("class", "form-group");
    var label = document.createElement("label");
    label.setAttribute("for", "InputDescription_" + idNum);
    var text = document.createTextNode(this.description);
    if(onlyOnce||stopCollapse){
        specialtitle = document.createTextNode("描述");
        label.appendChild(specialtitle);
    }else {
        label.appendChild(text);
    }

    this.input = document.createElement("input");
    this.input.setAttribute("class", "form-control");
    this.input.setAttribute("id", label.getAttribute("for"));

    this.inputbox.appendChild(div);
    div.appendChild(label);
    div.appendChild(this.input);

}

function addInputBox() {
    //在右方增加一个描述输入框
    var id = boxArray.length;
    var inputbox = new InputBox("Description", id);
    cardbodyright.appendChild(inputbox.inputbox);
    boxArray.push(inputbox);
}

function popInputBox() {
    //删除一个描述框
    var delID = "#" + "inputBox_" + (boxArray.length - 1);
    $(delID).remove();
    boxArray.pop();
}

function delInputBox() {
    //删除全部输入框
    cardbodyright.innerHTML="";
    for(var i=0;i<=boxArray.length;i++){
        boxArray.pop();
    }
}