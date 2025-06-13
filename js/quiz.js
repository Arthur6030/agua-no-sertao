// Gerenciamento do quiz educativo
class QuizEducativo {
    constructor() {
        this.startScreen = document.getElementById('quiz-start');
        this.gameScreen = document.getElementById('quiz-game');
        this.resultsScreen = document.getElementById('quiz-results');
        this.startBtn = document.getElementById('start-quiz-btn');
        this.restartBtn = document.getElementById('restart-quiz-btn');
        this.nextQuestionBtn = document.getElementById('next-question-btn');
        
        this.progressBar = document.getElementById('quiz-progress');
        this.questionCounter = document.getElementById('question-counter');
        this.questionText = document.getElementById('question-text');
        this.optionsContainer = document.getElementById('quiz-options');
        this.feedbackContainer = document.getElementById('quiz-feedback');
        this.feedbackTitle = document.getElementById('feedback-title');
        this.feedbackExplanation = document.getElementById('feedback-explanation');
        this.finalScore = document.getElementById('final-score');
        this.scoreMessage = document.getElementById('score-message');
        
        this.currentQuestion = 0;
        this.score = 0;
        this.questions = [...dadosQuiz]; // Cópia dos dados do quiz
        this.userAnswers = [];
        this.isAnswered = false;
        
        this.inicializar();
    }

    inicializar() {
        this.adicionarEventListeners();
        this.embaralharPerguntas();
    }

    adicionarEventListeners() {
        this.startBtn.addEventListener('click', () => {
            this.iniciarQuiz();
        });

        this.restartBtn.addEventListener('click', () => {
            this.reiniciarQuiz();
        });

        this.nextQuestionBtn.addEventListener('click', () => {
            this.proximaPergunta();
        });
    }

    embaralharPerguntas() {
        // Embaralhar array de perguntas para variar a experiência
        for (let i = this.questions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]];
        }
    }

    iniciarQuiz() {
        this.currentQuestion = 0;
        this.score = 0;
        this.userAnswers = [];
        this.embaralharPerguntas();
        
        this.startScreen.classList.add('hidden');
        this.gameScreen.classList.remove('hidden');
        this.resultsScreen.classList.add('hidden');
        
        this.mostrarPergunta();
    }

    mostrarPergunta() {
        const pergunta = this.questions[this.currentQuestion];
        this.isAnswered = false;
        
        // Atualizar contador e barra de progresso
        this.questionCounter.textContent = `${this.currentQuestion + 1} de ${this.questions.length}`;
        const progresso = ((this.currentQuestion + 1) / this.questions.length) * 100;
        this.progressBar.style.width = `${progresso}%`;
        
        // Mostrar pergunta
        this.questionText.textContent = pergunta.pergunta;
        
        // Criar opções
        this.optionsContainer.innerHTML = '';
        pergunta.opcoes.forEach((opcao, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'quiz-option';
            optionElement.textContent = opcao;
            optionElement.addEventListener('click', () => {
                this.selecionarOpcao(index, optionElement);
            });
            this.optionsContainer.appendChild(optionElement);
        });
        
        // Esconder feedback
        this.feedbackContainer.classList.add('hidden');
    }

    selecionarOpcao(selectedIndex, selectedElement) {
        if (this.isAnswered) return;
        
        this.isAnswered = true;
        const pergunta = this.questions[this.currentQuestion];
        const isCorrect = selectedIndex === pergunta.resposta;
        
        // Salvar resposta do usuário
        this.userAnswers.push({
            pergunta: pergunta.pergunta,
            respostaSelecionada: selectedIndex,
            respostaCorreta: pergunta.resposta,
            isCorrect: isCorrect
        });
        
        // Atualizar pontuação
        if (isCorrect) {
            this.score++;
        }
        
        // Mostrar feedback visual nas opções
        const options = this.optionsContainer.querySelectorAll('.quiz-option');
        options.forEach((option, index) => {
            if (index === pergunta.resposta) {
                option.classList.add('correct');
            } else if (index === selectedIndex && !isCorrect) {
                option.classList.add('incorrect');
            }
            option.style.pointerEvents = 'none';
        });
        
        // Mostrar feedback explicativo
        this.mostrarFeedback(isCorrect, pergunta.explicacao);
    }

    mostrarFeedback(isCorrect, explicacao) {
        this.feedbackTitle.textContent = isCorrect ? '✅ Correto!' : '❌ Incorreto';
        this.feedbackTitle.style.color = isCorrect ? '#27ae60' : '#e74c3c';
        this.feedbackExplanation.textContent = explicacao;
        
        this.feedbackContainer.classList.remove('hidden');
        
        // Atualizar texto do botão
        if (this.currentQuestion < this.questions.length - 1) {
            this.nextQuestionBtn.textContent = 'Próxima Pergunta';
        } else {
            this.nextQuestionBtn.textContent = 'Ver Resultados';
        }
    }

    proximaPergunta() {
        if (this.currentQuestion < this.questions.length - 1) {
            this.currentQuestion++;
            this.mostrarPergunta();
        } else {
            this.mostrarResultados();
        }
    }

    mostrarResultados() {
        this.gameScreen.classList.add('hidden');
        this.resultsScreen.classList.remove('hidden');
        
        // Mostrar pontuação final
        this.finalScore.textContent = this.score;
        
        // Determinar mensagem baseada na pontuação
        const porcentagem = (this.score / this.questions.length) * 100;
        let mensagem;
        
        if (porcentagem >= 90) {
            mensagem = '🏆 Excelente! Você é um expert em soluções hídricas para o semiárido!';
        } else if (porcentagem >= 70) {
            mensagem = '👏 Muito bom! Você tem um bom conhecimento sobre o tema.';
        } else if (porcentagem >= 50) {
            mensagem = '👍 Bom trabalho! Continue estudando para aprender ainda mais.';
        } else {
            mensagem = '📚 Continue explorando o site para aprender mais sobre as soluções para o semiárido.';
        }
        
        this.scoreMessage.textContent = mensagem;
        
        // Adicionar análise detalhada
        this.adicionarAnaliseDetalhada();
    }

    adicionarAnaliseDetalhada() {
        const analiseContainer = document.createElement('div');
        analiseContainer.className = 'quiz-analise';
        analiseContainer.innerHTML = `
            <h4>Análise Detalhada</h4>
            <div class="analise-stats">
                <div class="stat-item">
                    <span class="stat-number">${this.score}</span>
                    <span class="stat-label">Acertos</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">${this.questions.length - this.score}</span>
                    <span class="stat-label">Erros</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">${Math.round((this.score / this.questions.length) * 100)}%</span>
                    <span class="stat-label">Aproveitamento</span>
                </div>
            </div>
        `;
        
        // Inserir antes do botão de reiniciar
        this.resultsScreen.insertBefore(analiseContainer, this.restartBtn);
    }

    reiniciarQuiz() {
        // Limpar análise anterior se existir
        const analiseExistente = this.resultsScreen.querySelector('.quiz-analise');
        if (analiseExistente) {
            analiseExistente.remove();
        }
        
        this.resultsScreen.classList.add('hidden');
        this.startScreen.classList.remove('hidden');
        
        // Reset das variáveis
        this.currentQuestion = 0;
        this.score = 0;
        this.userAnswers = [];
        this.embaralharPerguntas();
    }
}

// Adicionar estilos específicos para o quiz
const estilosQuiz = `
    <style>
        .quiz-analise {
            margin: 30px 0;
            padding: 25px;
            background: #f8f9fa;
            border-radius: 15px;
            text-align: center;
        }
        
        .quiz-analise h4 {
            color: #2c3e50;
            margin-bottom: 20px;
            font-size: 1.2rem;
        }
        
        .analise-stats {
            display: flex;
            justify-content: space-around;
            gap: 20px;
        }
        
        .stat-item {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        
        .stat-number {
            font-size: 2rem;
            font-weight: 700;
            color: #667eea;
            margin-bottom: 5px;
        }
        
        .stat-label {
            font-size: 0.9rem;
            color: #666;
            font-weight: 500;
        }
        
        .quiz-option {
            transition: all 0.3s ease;
            cursor: pointer;
        }
        
        .quiz-option:hover:not(.correct):not(.incorrect) {
            transform: translateX(5px);
            border-color: #667eea;
            background: #f0f4ff;
        }
        
        .quiz-option.correct {
            animation: correctAnswer 0.5s ease;
        }
        
        .quiz-option.incorrect {
            animation: incorrectAnswer 0.5s ease;
        }
        
        @keyframes correctAnswer {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        @keyframes incorrectAnswer {
            0% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
            100% { transform: translateX(0); }
        }
        
        .quiz-feedback {
            animation: slideInUp 0.3s ease;
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @media (max-width: 768px) {
            .analise-stats {
                flex-direction: column;
                gap: 15px;
            }
            
            .stat-item {
                flex-direction: row;
                justify-content: space-between;
                padding: 10px 0;
                border-bottom: 1px solid #eee;
            }
            
            .stat-item:last-child {
                border-bottom: none;
            }
            
            .stat-number {
                font-size: 1.5rem;
                margin-bottom: 0;
            }
        }
    </style>
`;

// Adicionar estilos ao head
document.head.insertAdjacentHTML('beforeend', estilosQuiz);

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    new QuizEducativo();
});

