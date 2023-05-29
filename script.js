function fillOptions(elementID, nadArray, subElementID) {
    optionsArray = Object.keys(nadArray);
    var select = document.getElementById(elementID);
    select.innerHTML = "";

    for (var i = 0; i < optionsArray.length; i++) {
        var opt = optionsArray[i];
        select.innerHTML += "<option value=\"" + opt + "\">" + opt + "</option>";
    }

    fillSuboption(nadArray[optionsArray[0]], subElementID)
};

function fillSuboption(subArray, subElementID) {
    var select = document.getElementById(subElementID);
    select.innerHTML = "";

    for (var i = 0; i < subArray.length; i++) {
        var opt = subArray[i];
        select.innerHTML += "<option value=\"" + opt + "\">" + opt + "</option>";
    }
}

function selectImage() {
    var network = document.getElementById("network").value;
    var station = document.getElementById("station").value;

    var day = document.getElementById("day").value;
    var month = document.getElementById("month").value;
    var year = document.getElementById("year").value;



    var imagePath = "./" + year + "/" + network + "/" + station + "/" + month + "/" + day + ".png";
    //var imagePath = "./" + year + "/" + month + "/" + day + "/" + station + ".spec.png";

    var image = document.getElementById("selectedImage");
    var noImageText = document.getElementById("noImageText");

    image.src = imagePath;
    /* 
        image.onerror = function () {
            image.style.display = "none";
            noImageText.style.display = "block";
        };
    
        image.style.display = "block";
        noImageText.style.display = "none"; */

    document.date.setUTCFullYear(Number(document.getElementById("year").value))
    document.date.setUTCMonth(Number(document.getElementById("month").value) - 1)
    document.date.setUTCDate(Number(document.getElementById("day").value))

}

function handleKeyPress(event) {
    if (event.keyCode === 37) { // Left arrow key
        update(-1); // Move to the previous day
        selectImage();
    } else if (event.keyCode === 39) { // Right arrow key
        update(1); // Move to the next day
        selectImage();
    } else if (event.keyCode === 38) { // Up arrow key
        changeChannel(-1); // Move to the previous station
        selectImage();
    } else if (event.keyCode === 40) { // Down arrow key
        changeChannel(1); // Move to the next station
        selectImage();
    }

}


function changeChannel(direction) {
    var channelSelect = document.getElementById("station");
    var selectedIndex = channelSelect.selectedIndex;
    var newIndex = selectedIndex + direction;
    var optionsCount = channelSelect.options.length;

    if (newIndex < 0) {
        newIndex = optionsCount - 1; // Wrap to the last option
    } else if (newIndex >= optionsCount) {
        newIndex = 0; // Wrap to the first option
    }

    channelSelect.selectedIndex = newIndex;
    currentChannel = channelSelect.value;
    document.getElementById("station").value = currentChannel
}

function update(toadd) {
    document.date.setDate(document.date.getUTCDate() + toadd);
    document.getElementById("day").value = String(document.date.getUTCDate());
    document.getElementById("month").value = String(document.date.getUTCMonth() + 1);
    document.getElementById("year").value = String(document.date.getUTCFullYear());
}

function setDefaultImage() {
    document.date = new Date();
    update(-1);
    fillOptions("network", networks, 'station');
    selectImage(); // Select default image
}

document.addEventListener('keydown', handleKeyPress);
window.onload = setDefaultImage;

