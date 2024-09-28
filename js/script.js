
var atualColor = "red"

function Show(file) {
    var ShowPhoto = document.getElementById('img-grande');
    newPhoto = "assets/" + atualColor + "-" + file + ".jpg"
    ShowPhoto.src = newPhoto
}

//---------------------------//

function Shoes(color) {
    var tenis = 1
    var mudaCor = color
    while (tenis <= 8) {
        var thumbs = `/assets/thumbs/${mudaCor}-${tenis}.jpg`
        var novaCor = document.getElementById(tenis)
        novaCor.src = thumbs
        tenis++
    }
    atualColor = mudaCor
    Show('1')
}

document.addEventListener('DOMContentLoaded', () => {
    const favoriteBtn = document.getElementById('favorite-btn');
    const heartIcon = document.getElementById('heart-icon');

    favoriteBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Impede o link de navegar para outra página

        if (heartIcon.classList.contains('fa-regular')) {
            heartIcon.classList.remove('fa-regular');
            heartIcon.classList.add('fa-solid');
            heartIcon.style.color = '#ff0000';
        } else {
            heartIcon.classList.remove('fa-solid');
            heartIcon.classList.add('fa-regular');
            heartIcon.style.color = ''; // Remove a cor definida
        }

        heartIcon.classList.add('animate');
        setTimeout(() => {
            heartIcon.classList.remove('animate');
        }, 600);
    });

    const cartBtn = document.getElementById('cart-btn');
    const cartIcon = document.getElementById('cart-icon');
    const sizeInputs = document.querySelectorAll('input[name="tamanho"]');
    let selectedSize = null;

    sizeInputs.forEach(input => {
        input.addEventListener('change', (e) => {
            selectedSize = e.target.id;
        });
    });

    cartBtn.addEventListener('mouseover', (e) => {
        cartIcon.style.color = '#00ff11';
        cartIcon.style.transform = 'rotate(-30deg)';
    });

    cartBtn.addEventListener('mouseout', (e) => {
        cartIcon.style.color = '';
        cartIcon.style.transform = 'rotate(0deg)';
    });

    cartBtn.addEventListener('click', (e) => {
        e.preventDefault();

        if (!selectedSize) {
            showCustomAlert("Por favor, selecione um tamanho antes de adicionar ao carrinho.");
            return;
        }

        const selectedColor = atualColor;
        localStorage.setItem('selectedColor', selectedColor);
        localStorage.setItem('selectedSize', selectedSize);

        window.location.href = 'checkout.html';
    });

    const closeModalBtn = document.getElementById("close-modal");
    if (closeModalBtn) {
        closeModalBtn.onclick = function() {
            document.getElementById("modal").style.display = "none";
        };
    }

    const alertCloseBtn = document.getElementById('alert-close-btn');
    if (alertCloseBtn) {
        alertCloseBtn.addEventListener('click', () => {
            document.getElementById('custom-alert').style.display = 'none';
        });
    }
});

// Checkout page behavior
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('checkout.html')) {
        const selectedColor = localStorage.getItem('selectedColor');
        const selectedSize = localStorage.getItem('selectedSize');

        if (selectedColor && selectedSize) {
            const productImage = document.getElementById('produto-carrinho-img');
            productImage.src = `assets/${selectedColor}-1.jpg`;

            const productSize = document.getElementById('produto-tamanho');
            productSize.textContent = `Tamanho: ${selectedSize}`;
        } else {
            document.querySelector('.checkout').innerHTML = `
                <h2>Seu carrinho está vazio</h2>
                <p>Adicione produtos ao carrinho para visualizar nesta página.</p>
                <a href="index.html" class="btn-voltar">Voltar às Compras</a>
            `;
        }
    }
});

function showCustomAlert(message) {
    const customAlert = document.getElementById('custom-alert');
    const alertMessage = document.querySelector('.custom-alert-content p');
    alertMessage.textContent = message;
    customAlert.style.display = 'flex';
}

function showConfetti() {
    confetti({
        particleCount: 200,
        spread: 70,
        origin: { y: 0.6 }
    });
}

function finalizarCompra() {
    showConfetti();
    document.getElementById('modal').style.display = 'flex';
}
