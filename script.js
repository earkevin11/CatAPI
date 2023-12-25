function getCatInfo() {
    var breed = document.getElementById('breed').value;
    var apiUrl = `https://api.thecatapi.com/v1/breeds/search?q=${breed}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            var resultDiv = document.getElementById('result');
            var catImage = document.getElementById('catImage');

            if (data.length > 0) {
                var breedInfo = data[0];
                resultDiv.innerHTML = `
                    <p>Breed: ${breedInfo.name}</p>
                    <p>Life Span: ${breedInfo.life_span}</p>
                    <p>Weight: ${breedInfo.weight.metric} kg</p>
                    <p>Origin: ${breedInfo.origin}</p>
                    <p>Temperament: ${breedInfo.temperament}</p>
                    <p>Description: ${breedInfo.description}</p>
                `;

                // Fetch and display the cat image
                fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedInfo.id}`)
                    .then(response => response.json())
                    .then(imageData => {
                        if (imageData.length > 0) {
                            catImage.src = imageData[0].url;
                        }
                    })
                    .catch(error => console.error('Failed to fetch cat image:', error));
            } else {
                resultDiv.innerHTML = `Information not found for breed: ${breed}`;
                catImage.src = ''; // Clear the image if breed information is not found
            }
        })
        .catch(error => {
            var resultDiv = document.getElementById('result');
            resultDiv.innerHTML = `Failed to fetch breed information. Error: ${error.message}`;
        });
}