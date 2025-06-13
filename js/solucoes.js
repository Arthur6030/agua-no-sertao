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
        return `
            <div class="modal-header">
                <div class="modal-icon">${solucao.icone}</div>
                <h2>${solucao.titulo}</h2>
                <p class="modal-resumo">${solucao.resumo}</p>
            </div>
            
            <div class="modal-content-body">
                <div class="modal-section">
                    <h3>Descrição</h3>
                    <p>${solucao.descricao}</p>
                </div>
                
                <div class="modal-section">
                    <h3>Como Funciona</h3>
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
                    <h3>Dados Técnicos</h3>
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
        }
        
        .modal-icon {
            font-size: 4rem;
            margin-bottom: 20px;
        }
        
        .modal-header h2 {
            font-size: 2rem;
            margin-bottom: 10px;
            font-weight: 600;
        }
        
        .modal-resumo {
            font-size: 1.1rem;
            opacity: 0.9;
        }
        
        .modal-content-body {
            padding: 30px 40px 40px;
            max-height: 60vh;
            overflow-y: auto;
        }
        
        .modal-section {
            margin-bottom: 30px;
        }
        
        .modal-section h3 {
            color: #2c3e50;
            font-size: 1.3rem;
            margin-bottom: 15px;
            font-weight: 600;
        }
        
        .modal-section h4 {
            color: #34495e;
            font-size: 1.1rem;
            margin-bottom: 10px;
            font-weight: 500;
        }
        
        .modal-section p {
            color: #666;
            line-height: 1.6;
            margin-bottom: 15px;
        }
        
        .video-container {
            position: relative;
            width: 100%;
            height: 0;
            padding-bottom: 56.25%; /* 16:9 aspect ratio */
            margin-bottom: 20px;
        }
        
        .video-container iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 10px;
        }
        
        .vantagens-desvantagens {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
            margin-top: 20px;
        }
        
        .vantagens ul, .desvantagens ul {
            list-style: none;
            padding: 0;
        }
        
        .vantagens li, .desvantagens li {
            padding: 8px 0;
            border-bottom: 1px solid #eee;
            color: #555;
        }
        
        .vantagens li:last-child, .desvantagens li:last-child {
            border-bottom: none;
        }
        
        .dados-tecnicos {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin-top: 15px;
        }
        
        .dado-item {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 10px;
            border-left: 4px solid #667eea;
        }
        
        .dado-label {
            display: block;
            font-weight: 600;
            color: #2c3e50;
            margin-bottom: 5px;
        }
        
        .dado-valor {
            color: #666;
            font-size: 0.95rem;
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


