// Inicialização do mapa interativo
let mapa;
let marcadores = [];

function inicializarMapa() {
    // Criar o mapa centrado no semiárido
    mapa = L.map('mapa-sertao').setView(dadosMapa.centro, dadosMapa.zoom);

    // Adicionar camada de tiles (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(mapa);

    // Adicionar marcadores para cada ponto
    dadosMapa.pontos.forEach(ponto => {
        adicionarMarcador(ponto);
    });
}

function adicionarMarcador(ponto) {
    // Definir ícone baseado no tipo
    let iconeConfig = {
        iconSize: [25, 25],
        iconAnchor: [12, 25],
        popupAnchor: [0, -25]
    };

    let corIcone;
    switch(ponto.tipo) {
        case 'cidade':
            corIcone = '#e74c3c';
            break;
        case 'projeto':
            corIcone = '#3498db';
            break;
        case 'bacia':
            corIcone = '#2ecc71';
            break;
        default:
            corIcone = '#95a5a6';
    }

    // Criar ícone personalizado
    const icone = L.divIcon({
        className: 'marcador-customizado',
        html: `<div style="background-color: ${corIcone}; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10]
    });

    // Criar marcador
    const marcador = L.marker(ponto.coordenadas, { icon: icone }).addTo(mapa);

    // Criar conteúdo do popup
    const conteudoPopup = `
        <div class="popup-mapa">
            <h3>${ponto.nome}</h3>
            <p><strong>População/Abrangência:</strong> ${ponto.populacao}</p>
            <p><strong>Descrição:</strong> ${ponto.descricao}</p>
            <p><strong>Principais Desafios:</strong> ${ponto.desafios}</p>
            <p><strong>Projetos e Soluções:</strong> ${ponto.projetos}</p>
        </div>
    `;

    // Adicionar popup ao marcador
    marcador.bindPopup(conteudoPopup, {
        maxWidth: 300,
        className: 'popup-customizado'
    });

    // Adicionar evento de clique
    marcador.on('click', function() {
        mapa.setView(ponto.coordenadas, 8);
    });

    marcadores.push(marcador);
}

// Função para centralizar o mapa em um ponto específico
function centralizarMapa(pontoId) {
    const ponto = dadosMapa.pontos.find(p => p.id === pontoId);
    if (ponto) {
        mapa.setView(ponto.coordenadas, 8);
        // Encontrar e abrir o popup do marcador correspondente
        const marcador = marcadores.find(m => 
            m.getLatLng().lat === ponto.coordenadas[0] && 
            m.getLatLng().lng === ponto.coordenadas[1]
        );
        if (marcador) {
            marcador.openPopup();
        }
    }
}

// Adicionar estilos CSS para os popups personalizados
const estilosPopup = `
    <style>
        .popup-mapa {
            font-family: 'Poppins', sans-serif;
            max-width: 280px;
        }
        
        .popup-mapa h3 {
            color: #2c3e50;
            margin-bottom: 10px;
            font-size: 1.1rem;
            font-weight: 600;
        }
        
        .popup-mapa p {
            margin-bottom: 8px;
            font-size: 0.9rem;
            line-height: 1.4;
        }
        
        .popup-mapa strong {
            color: #34495e;
        }
        
        .popup-customizado .leaflet-popup-content-wrapper {
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }
        
        .popup-customizado .leaflet-popup-tip {
            background: white;
        }
        
        .marcador-customizado {
            background: transparent;
            border: none;
        }
    </style>
`;

// Adicionar estilos ao head do documento
document.head.insertAdjacentHTML('beforeend', estilosPopup);

// Inicializar o mapa quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    // Aguardar um pouco para garantir que o elemento do mapa existe
    setTimeout(inicializarMapa, 100);
});

