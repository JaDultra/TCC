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

        // Verifica a classe atual do ícone e altera o HTML e estilo conforme necessário
        if (heartIcon.classList.contains('fa-regular')) {
            heartIcon.classList.remove('fa-regular');
            heartIcon.classList.add('fa-solid');
            heartIcon.style.color = '#ff0000';
        } else {
            heartIcon.classList.remove('fa-solid');
            heartIcon.classList.add('fa-regular');
            heartIcon.style.color = ''; // Remove a cor definida
        }

        // Adiciona e remove a classe de animação
        heartIcon.classList.add('animate');
        setTimeout(() => {
            heartIcon.classList.remove('animate');
        }, 600); // Duração da animação
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const cartBtn = document.getElementById('cart-btn');
    const cartIcon = document.getElementById('cart-icon');

    // Evento para mudar a cor e inclinar o ícone ao passar o mouse por cima
    cartBtn.addEventListener('mouseover', (e) => {
        cartIcon.style.color = '#00ff11'; // Altere para a cor desejada
        cartIcon.style.transform = 'rotate(-30deg)'; // Inclinação de -30°
    });

    // Evento para retornar à cor original e remover a inclinação ao tirar o mouse
    cartBtn.addEventListener('mouseout', (e) => {
        cartIcon.style.color = ''; // Remove a cor definida e volta ao padrão
        cartIcon.style.transform = 'rotate(0deg)'; // Remove a inclinação
    });

    cartBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Impede o link de navegar para outra página

        // Adiciona a classe de animação
        cartIcon.classList.add('rotate');
        
        setTimeout(() => {
            cartIcon.classList.remove('rotate');
        }, 600);

        // Animação de bounce no botão
        cartBtn.classList.add('bounce');
        setTimeout(() => {
            cartBtn.classList.remove('bounce');
        }, 300); // Duração da animação
    });
});





document.addEventListener('DOMContentLoaded', () => {
    const cartBtn = document.getElementById('cart-btn');
    const sizeInputs = document.querySelectorAll('input[name="tamanho"]');
    let selectedSize = null;

    // Captura o tamanho selecionado
    sizeInputs.forEach(input => {
        input.addEventListener('change', (e) => {
            selectedSize = e.target.id; // Armazena o tamanho selecionado
        });
    });

    cartBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Impede o link de navegar para outra página

        // Verifica se o usuário selecionou um tamanho
        if (!selectedSize) {
            showCustomAlert("Por favor, selecione um tamanho antes de adicionar ao carrinho.");
            return;
        }

        // Se um tamanho foi selecionado, armazena as informações no localStorage
        const selectedColor = atualColor; // Cor atual do tênis
        localStorage.setItem('selectedColor', selectedColor);
        localStorage.setItem('selectedSize', selectedSize);

        // Redireciona para a página de checkout
        window.location.href = 'checkout.html';
    });
});

//new 
document.addEventListener('DOMContentLoaded', () => {
    // Recupera as informações do localStorage
    const selectedColor = localStorage.getItem('selectedColor');
    const selectedSize = localStorage.getItem('selectedSize');

    // Atualiza somente se as informações existirem
    if (selectedColor && selectedSize) {
        const productImage = document.getElementById('produto-carrinho-img');
        productImage.src = `assets/${selectedColor}-1.jpg`; // Atualiza a imagem de acordo com a cor escolhida

        const productSize = document.getElementById('produto-tamanho');
        productSize.textContent = `Tamanho: ${selectedSize}`;
    } else {
        // Ao invés de redirecionar, apenas avisa no console e oculta o conteúdo
        console.warn("Nenhum produto adicionado ao carrinho.");
        document.querySelector('.checkout').style.display = 'none';
    }
});

/* checkout */

document.addEventListener('DOMContentLoaded', () => {
    // Recupera as informações do localStorage
    const selectedColor = localStorage.getItem('selectedColor');
    const selectedSize = localStorage.getItem('selectedSize');

    // Verifica se os dados existem antes de tentar acessá-los
    if (selectedColor && selectedSize) {
        // Atualiza a imagem e o tamanho do produto na página de checkout
        const productImage = document.getElementById('produto-carrinho-img');
        productImage.src = `assets/${selectedColor}-1.jpg`; // Atualiza a imagem de acordo com a cor escolhida
        
        const productSize = document.getElementById('produto-tamanho');
        productSize.textContent = `Tamanho: ${selectedSize}`;
    } else {
        // Caso não haja produto no carrinho, simplesmente esconda os elementos, sem bloquear o acesso
        console.warn("Nenhum produto adicionado ao carrinho.");
    }
});

/* checkout */

document.addEventListener('DOMContentLoaded', () => {
    // Recupera as informações do localStorage
    const selectedColor = localStorage.getItem('selectedColor');
    const selectedSize = localStorage.getItem('selectedSize');

    // Verifica se os dados existem
    if (selectedColor && selectedSize) {
        // Atualiza a imagem e o tamanho do produto
        const productImage = document.getElementById('produto-carrinho-img');
        productImage.src = `assets/${selectedColor}-1.jpg`; // Atualiza a imagem de acordo com a cor escolhida
        
        const productSize = document.getElementById('produto-tamanho');
        productSize.textContent = `Tamanho: ${selectedSize}`;
    } else {
        alert("Nenhum produto adicionado ao carrinho.");
        window.location.href = 'index.html'; // Redireciona se não houver produto
    }
});

function showConfetti() {
    confetti({
        particleCount: 200,
        spread: 70,
        origin: { y: 0.6 }
    });
}

function finalizarCompra() {
    // Mostra confetes
    showConfetti();

    // Exibe o modal
    document.getElementById('modal').style.display = 'flex'; // Exibe o modal no centro
}

// Fecha o modal quando o botão "Fechar" for clicado
document.getElementById("close-modal").onclick = function() {
    document.getElementById("modal").style.display = "none";
};

// Função para exibir o alerta customizado
function showCustomAlert(message) {
    const customAlert = document.getElementById('custom-alert');
    const alertMessage = document.querySelector('.custom-alert-content p');
    
    alertMessage.textContent = message;
    customAlert.style.display = 'flex';
}

// Fecha o alerta customizado ao clicar no botão
document.getElementById('alert-close-btn').addEventListener('click', () => {
    document.getElementById('custom-alert').style.display = 'none';
});

//DADOS

// Função para registrar evento no Google Analytics
function registerClickEvent(eventCategory, eventLabel) {
    gtag('event', 'click', {
        'event_category': eventCategory,
        'event_label': eventLabel
    });
}

// Aguardando o carregamento do DOM
document.addEventListener('DOMContentLoaded', () => {
    // Rastreando cliques nas seções mencionadas

    // Tamanhos
    document.querySelector('.grade-numeros').addEventListener('click', function() {
        registerClickEvent('Tamanhos', 'grade-numeros');
    });

    // Botão de compra
    document.querySelector('.add-carrinho').addEventListener('click', function() {
        registerClickEvent('Botão de Compra', 'add-carrinho');
    });

    // Botão de favoritos
    document.querySelector('.salvar-fav').addEventListener('click', function() {
        registerClickEvent('Botão de Favoritos', 'salvar-fav');
    });

    // Link do WhatsApp
    document.querySelector('.whatsapp-link').addEventListener('click', function() {
        registerClickEvent('WhatsApp', 'whatsapp-link');
    });

    // Benefícios
    document.querySelector('.beneficios').addEventListener('click', function() {
        registerClickEvent('Benefícios', 'beneficios');
    });

    // Checkout - Botão Voltar
    if (document.querySelector('.btn-voltar')) {
        document.querySelector('.btn-voltar').addEventListener('click', function() {
            registerClickEvent('Voltar', 'btn-voltar');
        });
    }

    // Checkout - Botão Finalizar Compra
    if (document.querySelector('.btn-finalizar')) {
        document.querySelector('.btn-finalizar').addEventListener('click', function() {
            registerClickEvent('Finalizar Compra', 'btn-finalizar');
        });
    }
});
