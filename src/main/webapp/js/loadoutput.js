function loadOutput(id) {

    var selectedFile = document.getElementById(id).files[0];
    var reader = new FileReader();
    reader.readAsText(selectedFile);

    reader.onload = function() {
        var object = JSON.parse(this.result);
        var taskCode = localStorage.taskCode;
        localStorage.history = object;
    }

}