window.addEventListener("load", function () {

    var openReason = "installed";
    if (window.location.hash === "#update") {
        openReason = "updated";
    }
    window.document.getElementById('openReason').innerHTML = openReason;
});