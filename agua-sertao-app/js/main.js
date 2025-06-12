// Script principal - coordena todas as funcionalidades
document.addEventListener('DOMContentLoaded', function() {
    // Inicialização geral
    inicializarNavegacao();
    inicializarAnimacoes();
    inicializarScrollSuave();
    inicializarObservadorSecoes();
});

// Navegação suave entre seções
function inicializarNavegacao() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Compensar altura da nav
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animações de entrada para elementos
function inicializarAnimacoes() {
    // Animação para cards de soluções
    const solucaoCards = document.querySelectorAll('.solucao-card');
    solucaoCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    // Animação para cards de organizações
    const orgCards = document.querySelectorAll('.organizacao-card');
    orgCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        card.style.transitionDelay = `${index * 0.1}s`;
    });
}

// Scroll suave para toda a página
function inicializarScrollSuave() {
    // Adicionar comportamento suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Observador de interseção para animações ao scroll
function inicializarObservadorSecoes() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                
                // Animar cards de soluções
                if (target.classList.contains('solucoes-section')) {
                    const cards = target.querySelectorAll('.solucao-card');
                    cards.forEach(card => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    });
                }
                
                // Animar cards de organizações
                if (target.classList.contains('apoie-section')) {
                    const cards = target.querySelectorAll('.organizacao-card');
                    cards.forEach(card => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    });
                }
                
                // Animar títulos de seção
                const sectionTitle = target.querySelector('.section-title');
                if (sectionTitle) {
                    sectionTitle.style.opacity = '1';
                    sectionTitle.style.transform = 'translateY(0)';
                }
                
                // Animar descrições de seção
                const sectionDesc = target.querySelector('.section-description');
                if (sectionDesc) {
                    sectionDesc.style.opacity = '1';
                    sectionDesc.style.transform = 'translateY(0)';
                }
            }
        });
    }, observerOptions);

    // Observar todas as seções
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
        
        // Configurar estado inicial dos títulos e descrições
        const title = section.querySelector('.section-title');
        const desc = section.querySelector('.section-description');
        
        if (title) {
            title.style.opacity = '0';
            title.style.transform = 'translateY(20px)';
            title.style.transition = 'all 0.6s ease';
        }
        
        if (desc) {
            desc.style.opacity = '0';
            desc.style.transform = 'translateY(20px)';
            desc.style.transition = 'all 0.6s ease 0.2s';
        }
    });
}

// Função para destacar link ativo na navegação
function atualizarNavegacaoAtiva() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Adicionar listener para scroll
window.addEventListener('scroll', atualizarNavegacaoAtiva);

// Função para mostrar/esconder botão "voltar ao topo"
function inicializarBotaoVoltarTopo() {
    // Criar botão
    const botaoTopo = document.createElement('button');
    botaoTopo.innerHTML = '↑';
    botaoTopo.className = 'botao-topo';
    botaoTopo.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #667eea;
        color: white;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(botaoTopo);
    
    // Mostrar/esconder baseado no scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            botaoTopo.style.opacity = '1';
            botaoTopo.style.visibility = 'visible';
        } else {
            botaoTopo.style.opacity = '0';
            botaoTopo.style.visibility = 'hidden';
        }
    });
    
    // Ação do clique
    botaoTopo.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effect
    botaoTopo.addEventListener('mouseenter', () => {
        botaoTopo.style.background = '#5a6fd8';
        botaoTopo.style.transform = 'scale(1.1)';
    });
    
    botaoTopo.addEventListener('mouseleave', () => {
        botaoTopo.style.background = '#667eea';
        botaoTopo.style.transform = 'scale(1)';
    });
}

// Inicializar botão voltar ao topo
document.addEventListener('DOMContentLoaded', inicializarBotaoVoltarTopo);

// Função para melhorar a performance do scroll
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Aplicar throttle ao scroll
window.addEventListener('scroll', throttle(atualizarNavegacaoAtiva, 100));

// Adicionar estilos para navegação ativa
const estilosNavegacao = `
    <style>
        .nav-link.active {
            color: #667eea !important;
        }
        
        .nav-link.active::after {
            width: 100% !important;
        }
        
        /* Melhorias de acessibilidade */
        .nav-link:focus,
        .quiz-btn:focus,
        .card-expand-btn:focus,
        .org-link:focus {
            outline: 2px solid #667eea;
            outline-offset: 2px;
        }
        
        /* Indicador de carregamento para o mapa */
        .interactive-map::before {
            content: 'Carregando mapa...';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #666;
            font-size: 1.1rem;
            z-index: 1;
        }
        
        /* Animação de loading */
        @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
        }
        
        .loading {
            animation: pulse 1.5s infinite;
        }
    </style>
`;

// Adicionar estilos ao head
document.head.insertAdjacentHTML('beforeend', estilosNavegacao);

// Função para detectar se o usuário prefere movimento reduzido
function respeitarPreferenciasMovimento() {
    const prefereMovimentoReduzido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefereMovimentoReduzido) {
        // Desabilitar animações para usuários que preferem movimento reduzido
        const style = document.createElement('style');
        style.textContent = `
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// Aplicar preferências de movimento
document.addEventListener('DOMContentLoaded', respeitarPreferenciasMovimento);

// Log de inicialização
console.log('🌊 Água no Sertão - Aplicativo carregado com sucesso!');
console.log('📍 Mapa interativo inicializado');
console.log('🔧 Soluções tecnológicas carregadas');
console.log('👥 Depoimentos configurados');
console.log('🧠 Quiz educativo pronto');
console.log('✨ Todas as funcionalidades ativas!');

