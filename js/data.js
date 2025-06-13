// Dados do mapa - coordenadas e informações dos pontos de interesse
const dadosMapa = {
    centro: [-9.5, -40.5], // Centro aproximado do semiárido
    zoom: 6,
    pontos: [
        {
            id: 'petrolina',
            tipo: 'cidade',
            coordenadas: [-9.3891, -40.5030],
            nome: 'Petrolina - PE',
            populacao: '343.219 habitantes',
            descricao: 'Importante polo de fruticultura irrigada no Vale do São Francisco.',
            desafios: 'Dependência da irrigação e gestão sustentável dos recursos hídricos.',
            projetos: 'Projeto de irrigação do Vale do São Francisco, dessalinizadores comunitários.'
        },
        {
            id: 'juazeiro',
            tipo: 'cidade',
            coordenadas: [-9.4111, -40.4986],
            nome: 'Juazeiro - BA',
            populacao: '220.253 habitantes',
            descricao: 'Centro econômico do norte da Bahia, conhecido pela agricultura irrigada.',
            desafios: 'Escassez hídrica em períodos de seca prolongada.',
            projetos: 'Cisternas de placas, poços artesianos, projeto de transposição.'
        },
        {
            id: 'campina_grande',
            tipo: 'cidade',
            coordenadas: [-7.2306, -35.8811],
            nome: 'Campina Grande - PB',
            populacao: '413.830 habitantes',
            descricao: 'Importante centro tecnológico e educacional do Nordeste.',
            desafios: 'Abastecimento irregular durante períodos de estiagem.',
            projetos: 'Programa Um Milhão de Cisternas, tecnologias de captação de água da chuva.'
        },
        {
            id: 'caruaru',
            tipo: 'cidade',
            coordenadas: [-8.2839, -35.9761],
            nome: 'Caruaru - PE',
            populacao: '361.118 habitantes',
            descricao: 'Capital do forró e importante centro comercial do agreste pernambucano.',
            desafios: 'Gestão de recursos hídricos em região de transição climática.',
            projetos: 'Cisternas familiares, barragens subterrâneas, dessalinização.'
        },
        {
            id: 'sobral',
            tipo: 'projeto',
            coordenadas: [-3.6861, -40.3500],
            nome: 'Projeto Sobral - CE',
            populacao: 'Atende 15.000 famílias',
            descricao: 'Projeto piloto de dessalinização e distribuição de água potável.',
            desafios: 'Manutenção dos equipamentos e sustentabilidade energética.',
            projetos: 'Dessalinizadores solares, sistema de distribuição comunitária.'
        },
        {
            id: 'transposicao',
            tipo: 'projeto',
            coordenadas: [-9.0, -38.5],
            nome: 'Transposição do São Francisco',
            populacao: 'Beneficia 12 milhões de pessoas',
            descricao: 'Maior projeto de infraestrutura hídrica do país.',
            desafios: 'Impactos ambientais e gestão sustentável dos recursos.',
            projetos: 'Canais de irrigação, reservatórios, sistemas de bombeamento.'
        },
        {
            id: 'asa_cisterna',
            tipo: 'projeto',
            coordenadas: [-8.5, -37.0],
            nome: 'Programa ASA - Cisternas',
            populacao: 'Mais de 1 milhão de cisternas construídas',
            descricao: 'Programa de construção de cisternas para captação de água da chuva.',
            desafios: 'Manutenção e capacitação das comunidades.',
            projetos: 'Cisternas de placas, cisternas-calçadão, barragens subterrâneas.'
        },
        {
            id: 'bacia_sao_francisco',
            tipo: 'bacia',
            coordenadas: [-10.5, -38.0],
            nome: 'Bacia do São Francisco',
            populacao: 'Abrange 521 municípios',
            descricao: 'Principal bacia hidrográfica da região, fonte de vida para o semiárido.',
            desafios: 'Redução do volume de água e poluição.',
            projetos: 'Revitalização da bacia, reflorestamento, controle de poluição.'
        }
    ]
};

// Dados das soluções tecnológicas
const dadosSolucoes = {
    cisternas: {
        titulo: 'Cisternas de Captação',
        icone: '💧',
        resumo: 'Sistemas de captação e armazenamento de água da chuva',
        descricao: 'As cisternas são reservatórios construídos para captar e armazenar água da chuva, sendo uma das principais tecnologias sociais para convivência com o semiárido. Elas garantem água potável para consumo humano durante os períodos de estiagem.',
        funcionamento: 'A água da chuva é coletada através de calhas instaladas nos telhados das casas e direcionada para a cisterna através de tubulações. O primeiro volume de água é descartado para garantir a qualidade, e o restante é armazenado para uso posterior.',
        vantagens: [
            'Baixo custo de construção e manutenção',
            'Tecnologia simples e acessível',
            'Autonomia hídrica para as famílias',
            'Redução da dependência de carros-pipa',
            'Melhoria na qualidade de vida'
        ],
        desvantagens: [
            'Dependente da regularidade das chuvas',
            'Capacidade limitada de armazenamento',
            'Necessita manutenção regular',
            'Qualidade da água pode ser comprometida sem cuidados adequados'
        ],
        dados: {
            capacidade: '16.000 litros (cisterna padrão)',
            atendimento: 'Família de 5 pessoas por 8 meses',
            custo: 'R$ 2.500 a R$ 4.000',
            durabilidade: '20 a 30 anos'
        },
        imagens: [
            'images/cisterna1.jpg',
            'images/cisterna2.jpg',
            'images/cisterna3.jpg'
        ]
    },
    pocos: {
        titulo: 'Poços Artesianos',
        icone: '🏗️',
        resumo: 'Perfuração profunda para acesso a águas subterrâneas',
        descricao: 'Os poços artesianos são perfurações profundas no solo que permitem o acesso a aquíferos subterrâneos. No semiárido, essa tecnologia é fundamental para garantir o abastecimento de água em comunidades rurais e urbanas.',
        funcionamento: 'Através de equipamentos de perfuração, são feitos furos profundos no solo até atingir os lençóis freáticos. A água é bombeada para a superfície através de bombas submersas ou sistemas de bombeamento solar.',
        vantagens: [
            'Fonte contínua de água',
            'Independente das chuvas',
            'Pode atender grandes comunidades',
            'Água geralmente de boa qualidade',
            'Investimento de longo prazo'
        ],
        desvantagens: [
            'Alto custo inicial de perfuração',
            'Necessita energia para bombeamento',
            'Pode haver salinização da água',
            'Risco de superexploração do aquífero',
            'Manutenção técnica especializada'
        ],
        dados: {
            profundidade: '50 a 300 metros',
            vazao: '1.000 a 10.000 litros/hora',
            custo: 'R$ 15.000 a R$ 50.000',
            durabilidade: '15 a 25 anos'
        },
        imagens: [
            'images/poco1.jpg',
            'images/poco2.jpg',
            'images/poco3.jpg'
        ]
    },
    'carros-pipa': {
        titulo: 'Carros-Pipa',
        icone: '🚛',
        resumo: 'Distribuição emergencial de água potável',
        descricao: 'Os carros-pipa são veículos especializados no transporte e distribuição de água potável para comunidades em situação de emergência hídrica. Representam uma solução imediata, mas temporária, para o abastecimento de água.',
        funcionamento: 'Caminhões equipados com tanques de água percorrem as comunidades rurais e urbanas distribuindo água potável. A água é fornecida gratuitamente pelo governo ou vendida a preços subsidiados.',
        vantagens: [
            'Solução imediata para emergências',
            'Flexibilidade de atendimento',
            'Pode chegar a locais remotos',
            'Não requer infraestrutura prévia',
            'Atendimento rápido em crises'
        ],
        desvantagens: [
            'Solução temporária e cara',
            'Dependência externa contínua',
            'Qualidade da água nem sempre garantida',
            'Impacto ambiental do transporte',
            'Não promove autonomia das comunidades'
        ],
        dados: {
            capacidade: '6.000 a 12.000 litros por viagem',
            atendimento: '50 a 100 famílias por viagem',
            custo: 'R$ 0,02 a R$ 0,05 por litro',
            frequencia: 'Semanal ou quinzenal'
        },
        imagens: [
            'images/carro-pipa1.jpg',
            'images/carro-pipa2.jpg',
            'images/carro-pipa3.jpg'
        ]
    },
    dessalinizadores: {
        titulo: 'Dessalinizadores',
        icone: '⚗️',
        resumo: 'Transformação de água salobra em água potável',
        descricao: 'Os dessalinizadores são equipamentos que removem o sal e outros minerais da água salobra, tornando-a própria para consumo humano. No semiárido, onde muitos poços produzem água com alta salinidade, essa tecnologia é essencial.',
        funcionamento: 'Através do processo de osmose reversa, a água salobra é forçada através de membranas semipermeáveis que retêm os sais e impurezas. O resultado é água potável de alta qualidade.',
        vantagens: [
            'Transforma água imprópria em potável',
            'Tecnologia confiável e eficiente',
            'Pode usar energia solar',
            'Produção contínua de água',
            'Qualidade da água controlada'
        ],
        desvantagens: [
            'Alto custo de instalação',
            'Necessita manutenção especializada',
            'Consome energia elétrica',
            'Produz rejeito salino',
            'Requer treinamento para operação'
        ],
        dados: {
            producao: '500 a 5.000 litros/dia',
            eficiencia: '40% a 60% de aproveitamento',
            custo: 'R$ 25.000 a R$ 100.000',
            durabilidade: '10 a 15 anos'
        },
        imagens: [
            'images/dessalinizador1.jpg',
            'images/dessalinizador2.jpg',
            'images/dessalinizador3.jpg'
        ]
    }
};

// Dados dos depoimentos
const dadosDepoimentos = [
    {
        id: 1,
        nome: 'Maria das Graças Silva',
        idade: 52,
        local: 'Juazeiro - BA',
        profissao: 'Agricultora',
        texto: 'Antes da cisterna, eu tinha que caminhar 3 quilômetros todos os dias para buscar água. Agora, com a água da chuva guardada, minha família tem água limpa o ano todo. Foi uma mudança que transformou nossa vida.',
        foto: 'images/maria-gracas.jpg',
        solucao: 'Cisterna de placas'
    },
    {
        id: 2,
        nome: 'João Batista Santos',
        idade: 45,
        local: 'Petrolina - PE',
        profissao: 'Presidente da Associação Comunitária',
        texto: 'O poço artesiano mudou nossa comunidade. Antes dependíamos dos carros-pipa, que nem sempre chegavam. Hoje temos água para beber, cozinhar e até para uma pequena horta comunitária.',
        foto: 'images/joao-batista.jpg',
        solucao: 'Poço artesiano comunitário'
    },
    {
        id: 3,
        nome: 'Ana Lúcia Ferreira',
        idade: 38,
        local: 'Sobral - CE',
        profissao: 'Professora',
        texto: 'O dessalinizador trouxe esperança para nossa escola. As crianças agora têm água potável durante todo o período letivo. Isso melhorou muito a frequência escolar e a saúde dos alunos.',
        foto: 'images/ana-lucia.jpg',
        solucao: 'Dessalinizador solar'
    },
    {
        id: 4,
        nome: 'Antônio Carlos Oliveira',
        idade: 60,
        local: 'Campina Grande - PB',
        profissao: 'Aposentado',
        texto: 'Vivi toda minha vida no sertão e vi muitas secas. Mas com as tecnologias que chegaram aqui, como as cisternas e os poços, a vida ficou mais digna. Não precisamos mais migrar nas secas.',
        foto: 'images/antonio-carlos.jpg',
        solucao: 'Múltiplas tecnologias'
    },
    {
        id: 5,
        nome: 'Francisca Alves Costa',
        idade: 29,
        local: 'Caruaru - PE',
        profissao: 'Enfermeira',
        texto: 'Como profissional de saúde, vejo diariamente o impacto da falta de água na saúde das pessoas. Os projetos de água potável reduziram drasticamente os casos de doenças relacionadas à água contaminada.',
        foto: 'images/francisca-alves.jpg',
        solucao: 'Sistema de tratamento comunitário'
    }
];

// Dados do quiz
const dadosQuiz = [
    {
        id: 1,
        pergunta: 'Qual é a principal característica climática do semiárido nordestino?',
        opcoes: [
            'Chuvas abundantes durante todo o ano',
            'Chuvas irregulares e concentradas em poucos meses',
            'Ausência total de chuvas',
            'Chuvas constantes no inverno'
        ],
        resposta: 1,
        explicacao: 'O semiárido nordestino é caracterizado por chuvas irregulares e concentradas em poucos meses do ano, geralmente entre dezembro e maio, com longos períodos de estiagem.'
    },
    {
        id: 2,
        pergunta: 'Quantos litros de água uma cisterna padrão pode armazenar?',
        opcoes: [
            '8.000 litros',
            '12.000 litros',
            '16.000 litros',
            '20.000 litros'
        ],
        resposta: 2,
        explicacao: 'Uma cisterna padrão tem capacidade para armazenar 16.000 litros de água, o suficiente para abastecer uma família de 5 pessoas por aproximadamente 8 meses.'
    },
    {
        id: 3,
        pergunta: 'Qual tecnologia transforma água salobra em água potável?',
        opcoes: [
            'Cisterna',
            'Poço artesiano',
            'Dessalinizador',
            'Carro-pipa'
        ],
        resposta: 2,
        explicacao: 'O dessalinizador é a tecnologia que remove o sal e outros minerais da água salobra através do processo de osmose reversa, tornando-a própria para consumo.'
    },
    {
        id: 4,
        pergunta: 'Qual é o principal objetivo do Programa Um Milhão de Cisternas (P1MC)?',
        opcoes: [
            'Construir poços artesianos',
            'Distribuir carros-pipa',
            'Construir cisternas para captação de água da chuva',
            'Instalar dessalinizadores'
        ],
        resposta: 2,
        explicacao: 'O P1MC tem como objetivo construir cisternas para captação e armazenamento de água da chuva, promovendo a autonomia hídrica das famílias rurais do semiárido.'
    },
    {
        id: 5,
        pergunta: 'Qual é a profundidade média de um poço artesiano no semiárido?',
        opcoes: [
            '10 a 30 metros',
            '50 a 300 metros',
            '500 a 800 metros',
            '1000 metros ou mais'
        ],
        resposta: 1,
        explicacao: 'No semiárido, os poços artesianos geralmente têm profundidade entre 50 a 300 metros para atingir os aquíferos subterrâneos com água de qualidade.'
    },
    {
        id: 6,
        pergunta: 'Qual é a principal desvantagem dos carros-pipa como solução hídrica?',
        opcoes: [
            'Alto custo de manutenção',
            'Baixa capacidade de transporte',
            'Solução temporária que não promove autonomia',
            'Dificuldade de acesso às comunidades'
        ],
        resposta: 2,
        explicacao: 'A principal desvantagem dos carros-pipa é que são uma solução temporária e cara, que não promove a autonomia hídrica das comunidades, gerando dependência externa.'
    },
    {
        id: 7,
        pergunta: 'Qual bacia hidrográfica é fundamental para o semiárido nordestino?',
        opcoes: [
            'Bacia Amazônica',
            'Bacia do Paraná',
            'Bacia do São Francisco',
            'Bacia do Tocantins-Araguaia'
        ],
        resposta: 2,
        explicacao: 'A Bacia do Rio São Francisco é a principal bacia hidrográfica do semiárido, sendo vital para o abastecimento de água e o desenvolvimento da região.'
    },
    {
        id: 8,
        pergunta: 'O que é a dessalinização por osmose reversa?',
        opcoes: [
            'Processo de evaporação da água salgada',
            'Filtração da água através de membranas semipermeáveis',
            'Adição de produtos químicos para neutralizar o sal',
            'Congelamento da água para separar o sal'
        ],
        resposta: 1,
        explicacao: 'A osmose reversa é um processo de filtração que utiliza pressão para forçar a água através de membranas semipermeáveis que retêm os sais e impurezas, produzindo água potável.'
    },
    {
        id: 9,
        pergunta: 'Qual é a área aproximada do semiárido brasileiro?',
        opcoes: [
            '500 mil km²',
            '1 milhão de km²',
            '1,5 milhão de km²',
            '2 milhões de km²'
        ],
        resposta: 1,
        explicacao: 'O semiárido brasileiro ocupa aproximadamente 1 milhão de km², abrangendo partes de 10 estados, principalmente na região Nordeste.'
    },
    {
        id: 10,
        pergunta: 'Qual tecnologia social utiliza o princípio da "água que cai do céu é bênção"?',
        opcoes: [
            'Poços artesianos',
            'Cisternas de captação de água da chuva',
            'Dessalinizadores',
            'Carros-pipa'
        ],
        resposta: 1,
        explicacao: 'As cisternas de captação de água da chuva se baseiam no princípio de que "a água que cai do céu é bênção", aproveitando as precipitações para garantir água potável durante os períodos de estiagem.'
    }
];

// Garantir que as variáveis sejam globais
window.dadosMapa = dadosMapa;
window.dadosSolucoes = dadosSolucoes;
window.dadosDepoimentos = dadosDepoimentos;
window.dadosQuiz = dadosQuiz;
