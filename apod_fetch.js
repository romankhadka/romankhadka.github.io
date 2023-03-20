$(document).ready(
    function () {
        $("#view_button").click(getPicture);
        document.querySelector('#date').max = new Date().toLocaleDateString('fr-ca')
    });

function getPicture() {
    fetch("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=" + $("#date").val() + "")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            handleData(data);
        })
        .catch((err) => {
            noPicture(err);
        })
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