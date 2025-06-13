// Gerenciamento das soluções tecnológicas
class GerenciadorSolucoes {
    constructor() {
        this.modal = document.getElementById("solucao-modal");
        this.modalBody = document.getElementById("modal-body");
        this.closeBtn = document.querySelector(".modal-close");
        this.inicializar();
    }

    inicializar() {
        // Adicionar event listeners para os cards
        document.querySelectorAll(".solucao-card").forEach(card => {
            card.addEventListener("click", (e) => {
                const solucaoId = card.dataset.solucao;
                this.abrirModal(solucaoId);
            });
        });

        // Event listener para fechar modal
        this.closeBtn.addEventListener("click", () => {
            this.fecharModal();
        });

        // Fechar modal clicando fora dele
        this.modal.addEventListener("click", (e) => {
            if (e.target === this.modal) {
                this.fecharModal();
            }
        });

        // Fechar modal com ESC
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && this.modal.style.display === "block") {
                this.fecharModal();
            }
        });
    }

    abrirModal(solucaoId) {
        const solucao = dadosSolucoes[solucaoId];
        if (!solucao) return;

        const conteudo = this.criarConteudoModal(solucao);
        this.modalBody.innerHTML = conteudo;
        this.modal.style.display = "block";
        document.body.style.overflow = "hidden";

        // Adicionar animação de entrada
        setTimeout(() => {
            this.modal.querySelector(".modal-content").style.transform = "scale(1)";
            this.modal.querySelector(".modal-content").style.opacity = "1";
        }, 10);
    }

    fecharModal() {
        this.modal.style.display = "none";
        document.body.style.overflow = "auto";
    }

    criarConteudoModal(solucao) {
        // Definir vídeos para cada solução
        const videos = {
            cisternas: "https://www.youtube.com/embed/j20yFzZNYso",
            pocos: "https://www.youtube.com/embed/jBUhne8ocGg", 
            'carros-pipa': "https://www.youtube.com/watch?v=f67nPgy8AzQ",
            dessalinizadores: "https://www.youtube.com/embed/RyJM0B473Uk"
        };

        const videoId = Object.keys(dadosSolucoes).find(key => dadosSolucoes[key] === solucao);
        const videoUrl = videos[videoId];

        return `
            <div class="modal-header">
                <div class="modal-icon">${solucao.icone}</div>
                <h2>${solucao.titulo}</h2>
                <p class="modal-resumo">${solucao.resumo}</p>
            </div>
            
            <div class="modal-content-body">
                <div class="modal-section">
                    <h3>📹 Vídeo Explicativo</h3>
                    <div class="video-container">
                        <iframe src="${videoUrl}" 
                                title="Vídeo explicativo sobre ${solucao.titulo}"
                                frameborder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowfullscreen>
                        </iframe>
                    </div>
                </div>

                <div class="modal-section">
                    <h3>📋 Descrição</h3>
                    <p>${solucao.descricao}</p>
                </div>
                
                <div class="modal-section">
                    <h3>⚙️ Como Funciona</h3>
                    <p>${solucao.funcionamento}</p>
                </div>
                
                <div class="modal-section">
                    <div class="vantagens-desvantagens">
                        <div class="vantagens">
                            <h4>✅ Vantagens</h4>
                            <ul>
                                ${solucao.vantagens.map(v => `<li>${v}</li>`).join("")}
                            </ul>
                        </div>
                        <div class="desvantagens">
                            <h4>⚠️ Desvantagens</h4>
                            <ul>
                                ${solucao.desvantagens.map(d => `<li>${d}</li>`).join("")}
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div class="modal-section">
                    <h3>📊 Dados Técnicos</h3>
                    <div class="dados-tecnicos">
                        ${Object.entries(solucao.dados).map(([chave, valor]) => `
                            <div class="dado-item">
                                <span class="dado-label">${this.formatarLabel(chave)}:</span>
                                <span class="dado-valor">${valor}</span>
                            </div>
                        `).join("")}
                    </div>
                </div>
            </div>
        `;
    }

    formatarLabel(chave) {
        const labels = {
            "capacidade": "Capacidade",
            "atendimento": "Atendimento",
            "custo": "Custo Médio",
            "durabilidade": "Durabilidade",
            "profundidade": "Profundidade",
            "vazao": "Vazão",
            "frequencia": "Frequência",
            "producao": "Produção",
            "eficiencia": "Eficiência"
        };
        return labels[chave] || chave;
    }
}

// Adicionar estilos específicos para o modal
const estilosModal = `
    <style>
        .modal-header {
            text-align: center;
            padding: 40px 40px 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-radius: 15px 15px 0 0;
        }
        
        .modal-icon {
            font-size: 4rem;
            margin-bottom: 20px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        
        .modal-header h2 {
            font-size: 2.2rem;
            margin-bottom: 15px;
            font-weight: 700;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
        }
        
        .modal-resumo {
            font-size: 1.2rem;
            opacity: 0.95;
            font-weight: 300;
            line-height: 1.4;
        }
        
        .modal-content-body {
            padding: 40px 40px 40px;
            max-height: 70vh;
            overflow-y: auto;
            background: linear-gradient(to bottom, #ffffff, #f8f9fa);
        }
        
        .modal-section {
            margin-bottom: 35px;
            padding: 25px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.08);
            border-left: 4px solid #667eea;
        }
        
        .modal-section h3 {
            color: #2c3e50;
            font-size: 1.4rem;
            margin-bottom: 20px;
            font-weight: 700;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .modal-section h3:before {
            content: "▶";
            color: #667eea;
            font-size: 0.8em;
        }
        
        .modal-section h4 {
            color: #34495e;
            font-size: 1.2rem;
            margin-bottom: 15px;
            font-weight: 600;
            padding: 10px 0;
            border-bottom: 2px solid #ecf0f1;
        }
        
        .modal-section p {
            color: #555;
            line-height: 1.8;
            margin-bottom: 20px;
            font-size: 1.05rem;
            text-align: justify;
        }
        
        .video-container {
            position: relative;
            width: 100%;
            height: 0;
            padding-bottom: 56.25%; /* 16:9 aspect ratio */
            margin: 25px 0;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }
        
        .video-container iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border: none;
            border-radius: 15px;
        }
        
        .vantagens-desvantagens {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
            margin-top: 25px;
        }
        
        .vantagens, .desvantagens {
            background: white;
            padding: 25px;
            border-radius: 12px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.08);
        }
        
        .vantagens {
            border-left: 5px solid #27ae60;
        }
        
        .desvantagens {
            border-left: 5px solid #e74c3c;
        }
        
        .vantagens h4 {
            color: #27ae60;
            border-bottom-color: #27ae60;
        }
        
        .desvantagens h4 {
            color: #e74c3c;
            border-bottom-color: #e74c3c;
        }
        
        .vantagens ul, .desvantagens ul {
            list-style: none;
            padding: 0;
        }
        
        .vantagens li, .desvantagens li {
            padding: 12px 0;
            border-bottom: 1px solid #ecf0f1;
            color: #555;
            position: relative;
            padding-left: 25px;
            font-size: 1.05rem;
            line-height: 1.6;
        }
        
        .vantagens li:before {
            content: "✓";
            position: absolute;
            left: 0;
            color: #27ae60;
            font-weight: bold;
            font-size: 1.2em;
        }
        
        .desvantagens li:before {
            content: "⚠";
            position: absolute;
            left: 0;
            color: #e74c3c;
            font-size: 1.1em;
        }
        
        .vantagens li:last-child, .desvantagens li:last-child {
            border-bottom: none;
        }
        
        .dados-tecnicos {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-top: 25px;
        }
        
        .dado-item {
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            padding: 20px;
            border-radius: 15px;
            border-left: 5px solid #667eea;
            box-shadow: 0 4px 15px rgba(0,0,0,0.08);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .dado-item:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }
        
        .dado-label {
            display: block;
            font-weight: 700;
            color: #2c3e50;
            margin-bottom: 8px;
            font-size: 1.1rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .dado-valor {
            color: #555;
            font-size: 1.05rem;
            font-weight: 500;
            line-height: 1.4;
        }
        
        @media (max-width: 768px) {
            .modal-content {
                width: 95%;
                margin: 10% auto;
            }
            
            .modal-header, .modal-content-body {
                padding: 20px;
            }
            
            .vantagens-desvantagens {
                grid-template-columns: 1fr;
                gap: 20px;
            }
            
            .dados-tecnicos {
                grid-template-columns: 1fr;
            }
        }
    </style>
`;

// Adicionar estilos ao head
document.head.insertAdjacentHTML("beforeend", estilosModal);

// Inicializar quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", function() {
    new GerenciadorSolucoes();
});


