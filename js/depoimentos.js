// Gerenciamento do carrossel de depoimentos
class CarrosselDepoimentos {
    constructor() {
        this.track = document.getElementById('depoimentos-track');
        this.indicators = document.getElementById('depoimentos-indicators');
        this.prevBtn = document.getElementById('prev-depoimento');
        this.nextBtn = document.getElementById('next-depoimento');
        this.currentSlide = 0;
        this.totalSlides = dadosDepoimentos.length;
        this.autoPlayInterval = null;
        this.autoPlayDelay = 8000; // 8 segundos
        
        this.inicializar();
    }

    inicializar() {
        this.criarSlides();
        this.criarIndicadores();
        this.adicionarEventListeners();
        this.mostrarSlide(0);
        this.iniciarAutoPlay();
    }

    criarSlides() {
        this.track.innerHTML = '';
        
        dadosDepoimentos.forEach((depoimento, index) => {
            const slide = document.createElement('div');
            slide.className = 'depoimento-slide';
            slide.innerHTML = `
                <div class="depoimento-content">
                    <div class="depoimento-video-container">
                        <iframe class="depoimento-video" 
                                src="${depoimento.video}" 
                                frameborder="0" 
                                allowfullscreen>
                        </iframe>
                    </div>
                    <div class="depoimento-info">
                        <blockquote class="depoimento-texto">
                            "${depoimento.texto}"
                        </blockquote>
                        <div class="depoimento-autor-info">
                            <div class="autor-principal">
                                <strong class="depoimento-autor">${depoimento.nome}</strong>
                                <span class="depoimento-idade">, ${depoimento.idade} anos</span>
                            </div>
                            <div class="autor-detalhes">
                                <span class="depoimento-profissao">${depoimento.profissao}</span>
                                <span class="depoimento-local">${depoimento.local}</span>
                            </div>
                            <div class="solucao-tag">
                                <span class="tag-label">Solução:</span>
                                <span class="tag-value">${depoimento.solucao}</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            this.track.appendChild(slide);
        });
    }

    criarIndicadores() {
        this.indicators.innerHTML = '';
        
        for (let i = 0; i < this.totalSlides; i++) {
            const indicator = document.createElement('div');
            indicator.className = 'indicator';
            indicator.addEventListener('click', () => {
                this.mostrarSlide(i);
                this.pararAutoPlay();
                this.iniciarAutoPlay();
            });
            this.indicators.appendChild(indicator);
        }
    }

    adicionarEventListeners() {
        this.prevBtn.addEventListener('click', () => {
            this.slideAnterior();
            this.pararAutoPlay();
            this.iniciarAutoPlay();
        });

        this.nextBtn.addEventListener('click', () => {
            this.proximoSlide();
            this.pararAutoPlay();
            this.iniciarAutoPlay();
        });

        // Pausar autoplay quando o mouse estiver sobre o carrossel
        const carousel = document.querySelector('.depoimentos-carousel');
        carousel.addEventListener('mouseenter', () => {
            this.pararAutoPlay();
        });

        carousel.addEventListener('mouseleave', () => {
            this.iniciarAutoPlay();
        });

        // Suporte para navegação por teclado
        document.addEventListener('keydown', (e) => {
            if (this.isCarouselVisible()) {
                if (e.key === 'ArrowLeft') {
                    this.slideAnterior();
                    this.pararAutoPlay();
                    this.iniciarAutoPlay();
                } else if (e.key === 'ArrowRight') {
                    this.proximoSlide();
                    this.pararAutoPlay();
                    this.iniciarAutoPlay();
                }
            }
        });
    }

    mostrarSlide(index) {
        this.currentSlide = index;
        const translateX = -index * 100;
        this.track.style.transform = `translateX(${translateX}%)`;
        
        // Atualizar indicadores
        document.querySelectorAll('.indicator').forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
    }

    proximoSlide() {
        const nextIndex = (this.currentSlide + 1) % this.totalSlides;
        this.mostrarSlide(nextIndex);
    }

    slideAnterior() {
        const prevIndex = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.mostrarSlide(prevIndex);
    }

    iniciarAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.proximoSlide();
        }, this.autoPlayDelay);
    }

    pararAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    isCarouselVisible() {
        const carousel = document.querySelector('.depoimentos-carousel');
        const rect = carousel.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
    }
}

// Adicionar estilos específicos para os depoimentos
const estilosDepoimentos = `
    <style>
        .depoimento-content {
            display: flex;
            align-items: center;
            gap: 40px;
            max-width: 1000px;
            margin: 0 auto;
        }
        
        .depoimento-video-container {
            flex: 0 0 400px;
        }
        
        .depoimento-video {
            width: 100%;
            height: 225px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        
        .depoimento-info {
            flex: 1;
            text-align: left;
        }
        
        .depoimento-texto {
            font-size: 1.2rem;
            font-style: italic;
            line-height: 1.8;
            margin-bottom: 25px;
            position: relative;
            padding-left: 30px;
        }
        
        .depoimento-texto::before {
            content: '"';
            position: absolute;
            left: 0;
            top: -10px;
            font-size: 3rem;
            opacity: 0.3;
            font-family: serif;
        }
        
        .depoimento-autor-info {
            background: rgba(255, 255, 255, 0.1);
            padding: 20px;
            border-radius: 15px;
            backdrop-filter: blur(10px);
        }
        
        .autor-principal {
            margin-bottom: 8px;
        }
        
        .depoimento-autor {
            font-size: 1.2rem;
            font-weight: 600;
        }
        
        .depoimento-idade {
            font-size: 1rem;
            opacity: 0.8;
        }
        
        .autor-detalhes {
            margin-bottom: 12px;
        }
        
        .depoimento-profissao {
            display: block;
            font-size: 1rem;
            opacity: 0.9;
            margin-bottom: 4px;
        }
        
        .depoimento-local {
            font-size: 0.95rem;
            opacity: 0.8;
        }
        
        .solucao-tag {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-top: 15px;
            padding-top: 15px;
            border-top: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .tag-label {
            font-size: 0.9rem;
            opacity: 0.8;
        }
        
        .tag-value {
            background: rgba(255, 255, 255, 0.2);
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 500;
        }
        
        @media (max-width: 768px) {
            .depoimento-content {
                flex-direction: column;
                gap: 25px;
                text-align: center;
            }
            
            .depoimento-video-container {
                flex: none;
                width: 100%;
                max-width: 350px;
            }
            
            .depoimento-video {
                height: 200px;
            }
            
            .depoimento-info {
                text-align: center;
            }
            
            .depoimento-texto {
                font-size: 1.1rem;
                padding-left: 20px;
            }
            
            .autor-detalhes {
                text-align: center;
            }
            
            .solucao-tag {
                justify-content: center;
            }
        }
        
        @media (max-width: 480px) {
            .depoimento-slide {
                padding: 30px 15px;
            }
            
            .depoimento-video {
                height: 180px;
            }
            
            .depoimento-texto {
                font-size: 1rem;
                padding-left: 15px;
            }
        }
    </style>
`;

// Adicionar estilos ao head
document.head.insertAdjacentHTML('beforeend', estilosDepoimentos);

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    new CarrosselDepoimentos();
});

