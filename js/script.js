var atualColor = "red"; // Cor padrão inicial

// Função para alterar a imagem principal com base na cor
function Show(file) {
    var ShowPhoto = document.getElementById('img-grande');
    newPhoto = "assets/" + atualColor + "-" + file + ".jpg";
    ShowPhoto.src = newPhoto;
}

// Função para alterar as miniaturas e a cor do tênis
function Shoes(color) {
    var tenis = 1;
    var mudaCor = color;
    while (tenis <= 8) {
        var thumbs = `/assets/thumbs/${mudaCor}-${tenis}.jpg`;
        var novaCor = document.getElementById(tenis);
        novaCor.src = thumbs;
        tenis++;
    }
    atualColor = mudaCor;  // Atualiza a cor global
    Show('1');  // Atualiza a imagem principal

    // Salva a cor no localStorage para persistir entre as páginas
    localStorage.setItem('selectedColor', mudaCor);
}

// Função que roda ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    // Recupera a cor salva no localStorage e atualiza a imagem
    const savedColor = localStorage.getItem('selectedColor');
    if (savedColor) {
        atualColor = savedColor; // Atualiza a cor com o valor armazenado
        Show('1');  // Atualiza a imagem principal

        // Atualiza as miniaturas com a cor salva
        const thumbs = document.querySelectorAll('.img-menor');
        thumbs.forEach((thumb, index) => {
            thumb.src = `assets/thumbs/${savedColor}-${index + 1}.jpg`;
        });
    }

    // Configura os cliques nas miniaturas para alterar a cor
    const colorButtons = document.querySelectorAll('.color-button');
    colorButtons.forEach(button => {
        button.addEventListener('click', () => {
            const color = button.dataset.color; // Assume que a cor está no atributo 'data-color'
            Shoes(color); // Troca a cor e as miniaturas
        });
    });

    // Adiciona o comportamento de favoritamento
    const favoriteBtn = document.getElementById('favorite-btn');
    const heartIcon = document.getElementById('heart-icon');

    if (favoriteBtn && heartIcon) {
        favoriteBtn.addEventListener('click', (e) => {
            e.preventDefault();

            if (heartIcon.classList.contains('fa-regular')) {
                heartIcon.classList.remove('fa-regular');
                heartIcon.classList.add('fa-solid');
                heartIcon.style.color = '#ff0000';
            } else {
                heartIcon.classList.remove('fa-solid');
                heartIcon.classList.add('fa-regular');
                heartIcon.style.color = '';
            }

            heartIcon.classList.add('animate');
            setTimeout(() => {
                heartIcon.classList.remove('animate');
            }, 600);
        });
    }

    // Comportamento do carrinho
    const cartBtn = document.getElementById('cart-btn');
    const cartIcon = document.getElementById('cart-icon');
    const sizeInputs = document.querySelectorAll('input[name="tamanho"]');
    let selectedSize = null;

    if (cartBtn && cartIcon) {
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
    }

    // Ações no checkout
    if (window.location.pathname.includes('checkout.html')) {
        handleCheckoutPage();
    }

    // Rastreia o clique na categoria Masculino
    const masculinoLink = document.querySelector('a[href="masculine.html"]');
    if (masculinoLink) {
        masculinoLink.addEventListener('click', () => {
            trackCategoryClick('Masculino');
        });
    }
});

// Função para manipular a página de checkout
function handleCheckoutPage() {
    const selectedColor = localStorage.getItem('selectedColor');
    const selectedSize = localStorage.getItem('selectedSize');

    if (selectedColor && selectedSize) {
        const productImage = document.getElementById('produto-carrinho-img');
        productImage.src = `assets/${selectedColor}-1.jpg`;

        const productSize = document.getElementById('produto-tamanho');
        productSize.textContent = `Tamanho: ${selectedSize}`;
    } else {
        const checkoutElement = document.querySelector('.checkout');
        if (checkoutElement) {
            checkoutElement.innerHTML = `
                <h2>Seu carrinho está vazio</h2>
                <p>Adicione produtos ao carrinho para visualizar nesta página.</p>
                <a href="index.html" class="btn-voltar">Voltar às Compras</a>
            `;
        }
    }
}

// Função para exibir o alerta customizado
function showCustomAlert(message) {
    const customAlert = document.getElementById('custom-alert');
    if (customAlert) {
        const alertMessage = document.querySelector('.custom-alert-content p');
        alertMessage.textContent = message;
        customAlert.style.display = 'flex';
    }
}

// Função para rastrear cliques em categorias
function trackCategoryClick(category) {
    gtag('event', 'click', {
        'event_category': 'Categoria',
        'event_label': category
    });
}

// Função para mostrar confetes
function showConfetti() {
    confetti({
        particleCount: 200,
        spread: 70,
        origin: { y: 0.6 }
    });
}

// Função para finalizar a compra
function finalizarCompra() {
    showConfetti();
    const modal = document.getElementById('modal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

// Função para fechar a aba no checkout
document.querySelector('.btn-fechar').addEventListener('click', function() {
    window.close(); // Tenta fechar a aba
});

// Função para selecionar cor e redirecionar para a página
function selecionarCor(cor) {
    localStorage.setItem('corSelecionada', cor); // Salva a cor no localStorage
    window.location.href = 'index.html'; // Redireciona para a página inicial
}

// Função que carrega a cor salva no localStorage
document.addEventListener('DOMContentLoaded', () => {
    const corSelecionada = localStorage.getItem('corSelecionada');
    if (corSelecionada) {
        // Atualiza a imagem principal
        const imgGrande = document.getElementById('img-grande');
        if (imgGrande) {
            imgGrande.src = `assets/${corSelecionada}-1.jpg`;
        }

        // Atualiza as miniaturas
        const miniaturas = document.querySelectorAll('.img-menor');
        miniaturas.forEach((miniatura, index) => {
            miniatura.src = `assets/thumbs/${corSelecionada}-${index + 1}.jpg`;
        });
    }
});
