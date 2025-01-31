// Função para rastrear cliques em categorias (Exemplo: Masculino)
function trackCategoryClick(category) {
    gtag('event', 'click', {
        'event_category': 'Categoria',
        'event_label': category
    });
}

// Função para rastrear eventos de favoritos
function trackFavoriteClick() {
    gtag('event', 'botao_salvar_favorito', {
        'event_category': 'interacao',
        'event_label': 'favoritar_item'
    });
}

// Função para rastrear eventos no WhatsApp
function trackWhatsappShare() {
    gtag('event', 'compartilhar_whatsapp', {
        'event_category': 'interacao',
        'event_label': 'compartilhar_link_whatsapp'
    });
}

// Função para rastrear eventos de carrinho
function trackAddToCart() {
    gtag('event', 'botao_adicionar_ao_carrinho', {
        'event_category': 'interacao',
        'event_label': 'adicionar_ao_carrinho'
    });
}

// Função para rastrear interação com o botão Masculino
function trackMasculinoClick() {
    gtag('event', 'botao_masculino', {
        'event_category': 'interacao',
        'event_label': 'clicar_masculino'
    });
}

// Função para rastrear interação com os benefícios
function trackToggleBenefits(checked) {
    gtag('event', 'botao_beneficios', {
        'event_category': 'interacao',
        'event_label': checked ? 'expandir_beneficios' : 'recolher_beneficios',
        'value': checked ? 'expandido' : 'recolhido'
    });
}

// Função para rastrear a finalização da compra
function trackFinalizePurchase() {
    gtag('event', 'botao_finalizar_compra', {
        'event_category': 'interacao',
        'event_label': 'finalizar_compra'
    });
}

// Função para mostrar a imagem principal
function Show(file) {
    var ShowPhoto = document.getElementById('img-grande');
    newPhoto = `assets/${atualColor}-${file}.jpg`; // Usa a cor selecionada
    ShowPhoto.src = newPhoto;
}

// Função para mudar a cor do tênis
function Shoes(color) {
    var tenis = 1;
    var mudaCor = color;
    while (tenis <= 8) {
        var thumbs = `/assets/thumbs/${mudaCor}-${tenis}.jpg`;
        var novaCor = document.getElementById(tenis);
        novaCor.src = thumbs;
        tenis++;
    }
    atualColor = mudaCor;
    localStorage.setItem('selectedColor', mudaCor); // Salva a cor no localStorage
    Show('1');
}

document.addEventListener('DOMContentLoaded', () => {
    const favoriteBtn = document.getElementById('favorite-btn');
    const heartIcon = document.getElementById('heart-icon');
    
    // Rastrear clique no botão de favoritos
    if (favoriteBtn && heartIcon) {
        favoriteBtn.addEventListener('click', (e) => {
            e.preventDefault();
            trackFavoriteClick();
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

    // Rastrear interação no botão Masculino
    const masculinoLink = document.querySelector('a[href="masculine.html"]');
    if (masculinoLink) {
        masculinoLink.addEventListener('click', () => {
            trackMasculinoClick();
        });
    }

    // Rastrear o clique no botão de carrinho
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
            trackAddToCart();

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

    // Rastrear interação com os benefícios
    const beneficiosCheckbox = document.getElementById('beneficios');
    if (beneficiosCheckbox) {
        beneficiosCheckbox.addEventListener('change', () => {
            trackToggleBenefits(beneficiosCheckbox.checked);
        });
    }

    // Rastrear a finalização da compra
    const finalizarBtn = document.querySelector('.btn-finalizar');
    if (finalizarBtn) {
        finalizarBtn.addEventListener('click', () => {
            trackFinalizePurchase();
        });
    }

    // Fecha a aba quando o usuário clicar no botão
    document.querySelector('.btn-fechar').addEventListener('click', function() {
        window.close();
    });

    // Verifica se há uma cor de tênis salva no localStorage e atualiza a imagem
    const savedColor = localStorage.getItem('selectedColor');
    if (savedColor) {
        atualColor = savedColor;
        Show('1'); // Atualiza a imagem do tênis
    }
});

// Função para exibir o alerta customizado
function showCustomAlert(message) {
    const customAlert = document.getElementById('custom-alert');
    if (customAlert) {
        const alertMessage = document.querySelector('.custom-alert-content p');
        alertMessage.textContent = message;
        customAlert.style.display = 'flex';
    }
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
