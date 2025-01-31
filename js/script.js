// Função para rastrear cliques em categorias (Exemplo: Masculino)
function trackCategoryClick(category) {
    gtag('event', 'clique_categoria', {
        'event_category': 'Categoria',
        'event_label': category
    });
}

var atualColor = "red";

function Show(file) {
    var ShowPhoto = document.getElementById('img-grande');
    newPhoto = "assets/" + atualColor + "-" + file + ".jpg";
    ShowPhoto.src = newPhoto;
}

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
    Show('1');
}

document.addEventListener('DOMContentLoaded', () => {
    const favoriteBtn = document.getElementById('favorite-btn');
    const heartIcon = document.getElementById('heart-icon');

    // Adiciona comportamento ao botão de favoritos
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

            // Rastreia o clique no botão de favoritos
            gtag('event', 'botao_favoritar', {
                'event_category': 'Favoritos',
                'event_label': 'Produto'
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

    // Fecha o modal quando o botão fechar for clicado
    const closeModalBtn = document.getElementById("close-modal");
    if (closeModalBtn) {
        closeModalBtn.onclick = function() {
            document.getElementById("modal").style.display = "none";
        };
    }

    // Fecha o alerta customizado ao clicar no botão
    const alertCloseBtn = document.getElementById('alert-close-btn');
    if (alertCloseBtn) {
        alertCloseBtn.addEventListener('click', () => {
            document.getElementById('custom-alert').style.display = 'none';
        });
    }

    // Verifica se está na página de checkout e executa apenas se for necessário
    if (window.location.pathname.includes('checkout.html')) {
        handleCheckoutPage();
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

    document.querySelector('.btn-fechar').addEventListener('click', function() {
        window.close(); // Tenta fechar a aba
    });
});

function selecionarCor(cor) {
    localStorage.setItem('corSelecionada', cor); // Salva a cor no localStorage
    window.location.href = 'index.html'; // Redireciona para a página inicial
}

document.addEventListener('DOMContentLoaded', () => {
    const corSelecionada = localStorage.getItem('corSelecionada');
    if (corSelecionada) {
        // Atualizar a imagem principal
        const imgGrande = document.getElementById('img-grande');
        if (imgGrande) {
            imgGrande.src = `assets/${corSelecionada}-1.jpg`;
        }

        // Atualizar as miniaturas
        const miniaturas = document.querySelectorAll('.img-menor'); // Seleciona as miniaturas
        miniaturas.forEach((miniatura, index) => {
            miniatura.src = `assets/thumbs/${corSelecionada}-${index + 1}.jpg`; // Ajusta os nomes conforme padrão
        });
    }
});
