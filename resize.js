document.getElementById('imageInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image')) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.getElementById('imagePreview');
            img.src = e.target.result;
            document.getElementById('resizeButton').disabled = false;
        };
        reader.readAsDataURL(file);
    } else {
        alert('Please select an image file.');
    }
});

document.getElementById('resizeButton').addEventListener('click', function() {
    const width = parseInt(document.getElementById('width').value);
    const height = parseInt(document.getElementById('height').value);
    
    if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
        alert('Please enter valid width and height.');
        return;
    }

    const img = document.getElementById('imagePreview');
    const resizedCanvas = document.createElement('canvas');
    const ctx = resizedCanvas.getContext('2d');
    
    resizedCanvas.width = width;
    resizedCanvas.height = height;
    
    const tempImg = new Image();
    tempImg.src = img.src;
    tempImg.onload = function() {
        ctx.drawImage(tempImg, 0, 0, width, height);
        const resizedImageUrl = resizedCanvas.toDataURL();

        // Display resized image
        document.getElementById('resizedImage').src = resizedImageUrl;

        // Enable the download button
        const downloadLink = document.getElementById('downloadLink');
        downloadLink.href = resizedImageUrl;
        downloadLink.download = 'resized-image.png';  // Set the download filename

        // Enable the download button
        document.getElementById('downloadButton').disabled = false;
    };
});
