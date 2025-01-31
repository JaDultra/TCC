// Função para rastrear cliques em categorias (Exemplo: Masculino)
function trackCategoryClick(category) {
    gtag('event', 'clique_categoria', {
        'event_category': 'Categoria',
        'event_label': category
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Botão de salvar nos favoritos
    const favoriteBtn = document.getElementById('favorite-btn');
    if (favoriteBtn) {
        favoriteBtn.addEventListener('click', () => {
            gtag('event', 'botao_salvar_favorito', {
                'event_category': 'Interação',
                'event_label': 'Salvar nos Favoritos'
            });
        });
    }

    // Link do WhatsApp
    const whatsappLink = document.querySelector('.whatsapp-link');
    if (whatsappLink) {
        whatsappLink.addEventListener('click', () => {
            gtag('event', 'compartilhar_whatsapp', {
                'event_category': 'Interação',
                'event_label': 'Compartilhar no WhatsApp'
            });
        });
    }

    // Botão Masculino
    const masculine = document.querySelector('.masculine');
    if (masculine) {
        masculine.addEventListener('click', () => {
            gtag('event', 'botao_masculino', {
                'event_category': 'Categoria',
                'event_label': 'Masculino'
            });
        });
    }

    // Adiciona comportamento ao botão do carrinho
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

            // Rastreia o clique no botão de adicionar ao carrinho
            gtag('event', 'botao_adicionar_ao_carrinho', {
                'event_category': 'Carrinho',
                'event_label': 'Adicionar Produto'
            });

            window.location.href = 'checkout.html';
        });
    }

    // Adiciona rastreamento ao clique no link Masculino
    const masculinoLink = document.querySelector('a[href="masculine.html"]');
    if (masculinoLink) {
        masculinoLink.addEventListener('click', () => {
            trackCategoryClick('Masculino');
            // Rastreia o clique no link Masculino
            gtag('event', 'botao_masculino', {
                'event_category': 'Categoria',
                'event_label': 'Masculino'
            });
        });
    }

    // Adiciona rastreamento ao clique no botão de benefícios
    const beneficiosCheckbox = document.getElementById('beneficios');
    if (beneficiosCheckbox) {
        beneficiosCheckbox.addEventListener('change', () => {
            gtag('event', 'botao_beneficios', {
                'event_category': 'Interação',
                'event_label': 'Benefícios',
                'value': beneficiosCheckbox.checked ? 'expandido' : 'recolhido'
            });
        });
    }

    // Botão de finalizar compra
    const finalizarBtn = document.querySelector('.btn-finalizar');
    if (finalizarBtn) {
        finalizarBtn.addEventListener('click', () => {
            gtag('event', 'botao_finalizar_compra', {
                'event_category': 'Carrinho',
                'event_label': 'Finalizar Compra'
            });
        });
    }

    // Fecha o alerta customizado ao clicar no botão
    const alertCloseBtn = document.getElementById('alert-close-btn');
    if (alertCloseBtn) {
        alertCloseBtn.addEventListener('click', () => {
            document.getElementById('custom-alert').style.display = 'none';
        });
    }
});
