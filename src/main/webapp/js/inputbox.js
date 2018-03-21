/**
 * @Author: 高梦婷
 * @Description:
 * @Date: Created in 2018/3/21
 */

function InputBox(description, idNum) {
    this.description = description;
    this.inputbox = document.createElement("form");
    this.inputbox.setAttribute("role", "form");
    var div = document.createElement("div");
    div.setAttribute("class", "form-group");
    var label = document.createElement("label");
    label.setAttribute("for", "InputDescription_" + idNum);
    var text = document.createTextNode(description);
    label.appendChild(text);
    var input = document.createElement("input");
    input.setAttribute("class", "form-control");
    input.setAttribute("id", label.getAttribute("for"));

    this.inputbox.appendChild(div);
    div.appendChild(label);
    div.appendChild(input);
}

function addInputBox() {
    //在右方增加一个描述输入框
    var inputbox = new InputBox("Description", 0);
    cardbodyright.appendChild(inputbox.inputbox);
}