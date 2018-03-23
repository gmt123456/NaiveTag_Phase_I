function bindFakeInput() {
    $('input[id=dataSet]').change(function () {
        var paths = $(this).val().split('\\');
        $('#fakeFile').val(paths[paths.length - 1]);
        console.log("bind");
    })
}

$(function () {

    bindFakeInput();
    $('#uploadContainer').addClass('mid w-25');

    console.log(" upload.js");
})
