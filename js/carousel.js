let currentSlide = 0;

function moveSlide(direction) {
    const carouselContainer = document.querySelector('.carousel-container');
    const totalSlides = document.querySelectorAll('.carousel-item').length;

    currentSlide += direction * 3; // Altera o slide por três vezes para exibir 3 imagens por vez

    if (currentSlide >= totalSlides) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = totalSlides - 3; // Ajusta o limite inferior para exibir 3 imagens completas
    }

    const offset = -currentSlide * (100 / 3); // Calcula o deslocamento baseado em exibir 3 imagens por vez
    carouselContainer.style.transform = `translateX(${offset}%)`;
}

// Change slide every 3 seconds
setInterval(() => moveSlide(1), 3000);
