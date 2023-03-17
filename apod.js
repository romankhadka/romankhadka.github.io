$(document).ready(
    function () {
        $("#view_button").click(getPicture);
        document.querySelector('#date').max = new Date().toLocaleDateString('fr-ca')
    });
function getPicture () {
    $.ajax({
        url: "https://api.nasa.gov/planetary/apod",
        type: "GET",
        data: { api_key: "DEMO_KEY",
            date: $("#date").val() },
        dataType: "json",
        "success": handleData,
        "error": noPicture
    });
};

function handleData(data) {
    showPicture(data.url);
    setTitle(data.title);
}

function setTitle(title) {
    $('#title').html(title);
}
function showPicture(url) {
    $("#pic").attr("src", url);
};
function noPicture(error) {
    alert(error.responseText);
};