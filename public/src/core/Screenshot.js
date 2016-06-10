

export default (domEl, roomName, author) => {

    return new Promise((resolve) => {

        let frameURL = domEl.toDataURL();

        let canvas = document.createElement('canvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        let ctx = canvas.getContext('2d');

        let img = new Image();

        img.onload = () => {
            // put three.js canvas
            ctx.drawImage(img, 0, 0, img.width,    img.height,      // source rectangle
                               0, 0, canvas.width, canvas.height);  // destination rectangle

            ctx.fillStyle = "#FFFFFF";

            ctx.font = 'normal normal 300 20px helveticaneue';
            ctx.fillText(roomName, 100, 100);

            ctx.font = 'italic normal 300 15px helveticaneue';
            ctx.fillText('By '+author, 100, 130);

            let link = document.createElement('a');
            link.setAttribute('download', 'screenshot.png');
            link.setAttribute('href', canvas.toDataURL("image/jpg"));
            link.click();

            resolve();

        };
        img.src = frameURL;

    });

};
