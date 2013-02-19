//Take the green out

var imageData = c.getImageData(0, 0, 500, 500);
var pixels = imageData.data;
for (var i = 0; i < pixels.length; i += 4) {
	var rMatches = pixels[i] >= 0 && pixels[i] <= 30;
	var gMatches = pixels[i + 1] >= 225 && pixels[i + 1] <= 255;
	var bMatches = pixels[i + 2] >= 0 && pixels[i + 2] <= 30;

	if (rMatches && gMatches && bMatches) {
		pixels[i] = 50;
		pixels[i + 1] = 50;
		pixels[i + 2] = 50;
		pixels[i + 3] = 0;
	}

}
c.putImageData(imageData, 0, 0);