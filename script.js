function genQR() {
    var gApi = "https://chart.googleapis.com/chart?cht=qr&chs=";
    var myImg = document.getElementById('Img');
    var myText = document.getElementById('qrText').value;
    var mySize = document.getElementById('size').value;

    if (myText !== "") {
        myImg.src = generateQRCodeUrl(mySize, myText);
    } else {
        alert("Please Enter Text");
    }
}

function download() {
    var myText = document.getElementById('qrText').value;
    var mySize = document.getElementById('size').value;

    if (myText !== "") {
        var qrCodeUrl = generateQRCodeUrl(mySize, myText);

        fetch(qrCodeUrl)
            .then(response => response.blob())
            .then(blob => {
                var downloadLink = document.createElement('a');
                downloadLink.href = URL.createObjectURL(blob);
                downloadLink.download = 'qrcode.png';
                downloadLink.style.display = 'none';

                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
            })
            .catch(error => console.error('Error fetching the image:', error));
    } else {
        alert("Please Enter Text");
    }
}

function generateQRCodeUrl(size, text) {
    return "https://chart.googleapis.com/chart?cht=qr&chs=" + size + "x" + size + "&chl=" + text;
}