/** 
 * Script do Funil Gamificado (Elite Concursos)
 * Lógica pura em JavaScript para rodar no GitHub Pages
 */

// 1. DATA DAS QUESTÕES (Sincronizado com quizData.ts)
const quizData = {
    Policial: [
        { enunciado: "No tocante aos Direitos e Garantias Fundamentais, é correto afirmar que a casa é asilo inviolável do indivíduo, ninguém nela podendo penetrar sem consentimento do morador, salvo:", alternativas: ["Apenas durante o dia, por ordem judicial.", "Apenas para prestar socorro, em qualquer horário.", "Em caso de flagrante delito ou desastre, ou para prestar socorro, ou, durante o dia, por determinação judicial.", "Apenas durante a noite, em caso de flagrante delito."], correta: 2 },
        { enunciado: "O crime de homicídio qualificado é considerado:", alternativas: ["Crime culposo.", "Crime hediondo.", "Crime de menor potencial ofensivo.", "Crime inafiançável e imprescritível em qualquer hipótese."], correta: 1 },
        { enunciado: "Considere a frase: 'O policial interceptou o suspeito'. No plural, mantendo a concordância, temos:", alternativas: ["Os policiais interceptaram os suspeitos.", "Os policias interceptou os suspeitos.", "As policiais interceptaram a suspeita.", "Os policiais interceptaram o suspeito."], correta: 0 },
        { enunciado: "Em uma diligência, 3 viaturas percorrem 60km em 1 hora. Quantos km 5 viaturas percorreriam no mesmo tempo se mantivessem a mesma velocidade individual?", alternativas: ["60km", "100km", "120km", "300km"], correta: 1 },
        { enunciado: "O inquérito policial é um procedimento:", alternativas: ["Judicial e contraditório.", "Administrativo, inquisitivo e preparatório.", "Facultativo para o Ministério Público.", "Público em todas as suas fases."], correta: 1 },
        { enunciado: "De acordo com a CF/88, a segurança pública é exercida para a preservação da ordem pública e da incolumidade das pessoas e do patrimônio, através dos seguintes órgãos, EXCETO:", alternativas: ["Polícia Federal.", "Polícia Rodoviária Federal.", "Guarda Municipal (como órgão de segurança pública principal).", "Polícias Militares e Corpos de Bombeiros Militares."], correta: 2 },
        { enunciado: "A negação lógica da proposição 'Todo policial é herói' é:", alternativas: ["Nenhum policial é herói.", "Pelo menos um policial não é herói.", "Todo herói é policial.", "Algum policial é herói."], correta: 1 },
        { enunciado: "Qual destes é um princípio fundamental da República Federativa do Brasil?", alternativas: ["Dignidade da pessoa humana.", "Defesa da paz.", "Prevalência dos direitos humanos.", "Cooperação entre os povos."], correta: 0 }
    ],
    Fiscal: [
      { enunciado: "Sobre a competência tributária, é correto afirmar que:", alternativas: ["É delegável por lei ordinária.", "É indelegável, salvo a atribuição das funções de arrecadar ou fiscalizar.", "Pode ser renunciada pelo ente federativo.", "O não exercício da competência tributária a transfere para a União."], correta: 1 },
      { enunciado: "Na contabilidade, o registro de um fato administrativo que altera apenas a composição do patrimônio, sem modificar o PL, é chamado de:", alternativas: ["Fato Permutativo.", "Fato Modificativo Aumentativo.", "Fato Misto.", "Fato Modificativo Diminutivo."], correta: 0 },
      { enunciado: "Um capital de R$ 1.000,00 aplicado a juros simples de 10% ao mês, resultará ao final de 3 meses em um montante de:", alternativas: ["R$ 1.300,00", "R$ 1.331,00", "R$ 1.100,00", "R$ 1.200,00"], correta: 0 },
      { enunciado: "O tributo cujo fato gerador é uma situação independente de qualquer atividade estatal específica, relativa ao contribuinte, denomina-se:", alternativas: ["Taxa.", "Contribuição de Melhoria.", "Imposto.", "Empréstimo Compulsório."], correta: 2 },
      { enunciado: "Assinale a classe gramatical da palavra destacada: 'O auditor fiscal estudou MUITO'.", alternativas: ["Adjetivo.", "Advérbio de intensidade.", "Substantivo.", "Conjunção."], correta: 1 },
      { enunciado: "No Balanço Patrimonial, as dívidas que devem ser pagas no exercício seguinte são classificadas no:", alternativas: ["Ativo Circulante.", "Passivo Circulante.", "Passivo Não Circulante.", "Patrimônio Líquido."], correta: 1 },
      { enunciado: "Qual princípio constitucional veda a União de instituir tributo que não seja uniforme em todo o território nacional?", alternativas: ["Princípio da Uniformidade Geográfica.", "Princípio da Isonomia.", "Princípio da Irretroatividade.", "Princípio da Anterioridade."], correta: 0 },
      { enunciado: "Se 15 auditores analisam 300 processos em 5 dias, quantos processos 10 auditores analisariam em 3 dias?", alternativas: ["120 processos.", "180 processos.", "200 processos.", "100 processos."], correta: 0 }
    ],
    Administrativa: [
        { enunciado: "São princípios explícitos da Administração Pública (Art. 37 da CF/88):", alternativas: ["Legalidade, Impessoalidade, Moralidade, Publicidade e Eficiência.", "Legalidade, Ética, Moralidade, Publicidade e Proporcionalidade.", "Impessoalidade, Publicidade, Autotutela e Razoabilidade.", "Moralidade, Eficácia, Descentralização e Eficiência."], correta: 0 },
        { enunciado: "O ato administrativo que pode ser revogado por razões de interesse público é baseado no princípio da:", alternativas: ["Legalidade.", "Continuidade do Serviço Público.", "Autotutela.", "Publicidade."], correta: 2 },
        { enunciado: "No Windows, qual atalho é utilizado para alternar entre janelas abertas?", alternativas: ["Ctrl + C", "Alt + Tab", "Windows + L", "Ctrl + Alt + Del"], correta: 1 },
        { enunciado: "No Word, para deixar um texto com uma linha embaixo, utilizamos a função:", alternativas: ["Negrito.", "Itálico.", "Sublinhado.", "Subscrito."], correta: 2 },
        { enunciado: "Assinale a alternativa que apresenta um substantivo abstrato:", alternativas: ["Mesa.", "Computador.", "Justiça.", "Papel."], correta: 2 },
        { enunciado: "O servidor público que recebe vantagem econômica para tolerar o funcionamento de cassino ilegal comete:", alternativas: ["Ato de improbidade administrativa.", "Erro administrativo escusável.", "Fato atípico.", "Apenas falta disciplinar ética."], correta: 0 },
        { enunciado: "Qual a negação lógica da frase: 'O assistente é pontual e o chefe é exigente'?", alternativas: ["O assistente não é pontual e o chefe não é exigente.", "O assistente não é pontual ou o chefe não é exigente.", "O assistente é pontual ou o chefe não é exigente.", "O assistente não é pontual e o chefe é exigente."], correta: 1 },
        { enunciado: "Na Administração Pública, a forma de Estado adotada pelo Brasil é:", alternativas: ["Federação.", "República.", "Presidencialismo.", "Democracia."], correta: 0 }
    ],
    Bancária: [
        { enunciado: "O Conselho Monetário Nacional (CMN) é um órgão do Sistema Financeiro Nacional classificado como:", alternativas: ["Órgão Executivo.", "Órgão Normativo.", "Órgão Operacional.", "Órgão Fiscalizador das Cooperativas."], correta: 1 },
        { enunciado: "O Banco Central do Brasil (BCB) tem como uma de suas principais funções:", alternativas: ["Executar o orçamento aprovado pelo Congresso.", "Emitir papel-moeda e moeda metálica.", "Vender seguro de vida diretamente ao público.", "Fiscalizar a bolsa de valores (CVM)."], correta: 1 },
        { enunciado: "Em matemática financeira, o que é a taxa SELIC?", alternativas: ["Taxa máxima de juros cobrada pelos bancos.", "Taxa básica de juros da economia brasileira.", "Taxa de inflação oficial medida pelo IBGE.", "Taxa de câmbio entre real e dólar."], correta: 1 },
        { enunciado: "No atendimento bancário, agir com empatia significa:", alternativas: ["Ter pressa para atender o próximo cliente.", "Colocar-se no lugar do cliente para entender suas necessidades.", "Oferecer todos os produtos do banco, mesmo sem necessidade.", "Seguir rigidamente o manual sem exceções."], correta: 1 },
        { enunciado: "Assinale a alternativa com erro de ortografia:", alternativas: ["Análise.", "Exceção.", "Cansasso.", "Privilégio."], correta: 2 },
        { enunciado: "O Copom (Comitê de Política Monetária) reúne-se periodicamente para:", alternativas: ["Definir a meta da taxa Selic.", "Aprovar novos bancos digitais.", "Calcular o PIB do país.", "Imprimir novas notas de real."], correta: 0 },
        { enunciado: "O que caracteriza o Spread Bancário?", alternativas: ["Diferença entre a taxa que o banco paga ao captar e a que cobra ao emprestar.", "O lucro líquido somado aos impostos do banco.", "A taxa de manutenção de conta corrente.", "O limite do cartão de crédito."], correta: 0 },
        { enunciado: "Se você aplicar R$ 500,00 e após um mês tiver R$ 510,00, qual foi a taxa de juros?", alternativas: ["1%", "2%", "5%", "10%"], correta: 1 }
    ],
    Tribunais: [
        { enunciado: "O princípio que garante que ninguém será privado da liberdade ou bens sem o devido processo legal é o:", alternativas: ["Contraditório.", "Ampla Defesa.", "Due Process of Law.", "Celeridade Processual."], correta: 2 },
        { enunciado: "A citação é o ato pelo qual:", alternativas: ["O juiz decide o processo.", "Convoca-se o réu para juízo a fim de se defender.", "O escrivão anota o andamento.", "A testemunha é ouvida."], correta: 1 },
        { enunciado: "No âmbito administrativo, o poder que permite à Administração punir seus próprios servidores é o:", alternativas: ["Poder de Polícia.", "Poder Hierárquico.", "Poder Disciplinar.", "Poder Regulamentar."], correta: 2 },
        { enunciado: "Qual o prazo padrão para interpor Recurso de Apelação no Processo Civil?", alternativas: ["5 dias.", "10 dias.", "15 dias.", "30 dias."], correta: 2 },
        { enunciado: "Complete a frase corretamente: 'Iremos ____ sala de reuniões agora'.", alternativas: ["a", "à", "há", "ah"], correta: 1 },
        { enunciado: "De acordo com a CF/88, o Supremo Tribunal Federal (STF) é composto por:", alternativas: ["9 ministros.", "11 ministros.", "15 ministros.", "33 ministros."], correta: 1 },
        { enunciado: "Para garantir o acesso à informação pública, utiliza-se o remédio constitucional:", alternativas: ["Habeas Corpus.", "Habeas Data.", "Mandado de Segurança.", "Ação Popular."], correta: 1 },
        { enunciado: "No Excel, qual função é usada para somar um intervalo de células?", alternativas: ["=TOTAL()", "=SUM()", "=SOMA()", "=ADD()"], correta: 2 }
    ],
    Educação: [
        { enunciado: "De acordo com a LDB, a educação básica é composta por:", alternativas: ["Apenas Ensino Fundamental.", "Educação Infantil, Ensino Fundamental e Ensino Médio.", "Ensino Fundamental, Médio e Superior.", "Creche e Pré-escola apenas."], correta: 1 },
        { enunciado: "O Plano Nacional de Educação (PNE) tem duração de:", alternativas: ["4 anos.", "5 anos.", "10 anos.", "Indeterminada."], correta: 2 },
        { enunciado: "A fase em que a criança começa a usar o raciocínio lógico e entende a conservação (Piaget) é:", alternativas: ["Sensório-motor.", "Pré-operatório.", "Operatório concreto.", "Operatório formal."], correta: 2 },
        { enunciado: "O Estatuto da Criança e do Adolescente (ECA) considera adolescente a pessoa entre:", alternativas: ["10 e 18 anos.", "12 e 18 anos.", "12 e 21 anos.", "13 e 18 anos."], correta: 1 },
        { enunciado: "Qual a função social da escola na perspectiva crítica?", alternativas: ["Apenas transmitir conteúdos técnicos.", "Manter a ordem social vigente.", "Promover a formação integral do cidadão e a transformação social.", "Preparar exclusivamente para o mercado."], correta: 2 },
        { enunciado: "Assinale a alternativa que apresenta concordância verbal INCORRETA:", alternativas: ["Fazem dez anos que sou professor.", "Faz dez anos que sou professor.", "Houve muitos aprovados no concurso.", "Eram cinco horas quando saímos."], correta: 0 },
        { enunciado: "O aprendizado por descoberta e foco na experiência é típico da tendência:", alternativas: ["Tradicional.", "Tecnicista.", "Escola Nova (Renovada).", "Crítico-social."], correta: 2 },
        { enunciado: "A avaliação que ocorre durante todo o processo para reorientar o ensino é a:", alternativas: ["Somativa.", "Diagnóstica.", "Formativa.", "Classificatória."], correta: 2 }
    ],
    Saúde: [
        { enunciado: "O Sistema Único de Saúde (SUS) tem como um de seus princípios doutrinários:", alternativas: ["Centralização do poder.", "Universalidade de acesso.", "Atendimento exclusivo a trabalhadores.", "Pagamento de taxas."], correta: 1 },
        { enunciado: "A participação da comunidade no SUS é garantida por qual dispositivo legal?", alternativas: ["Lei 8.080/90.", "Lei 8.142/90.", "Constituição de 1967.", "NOB de 1991."], correta: 1 },
        { enunciado: "A Biossegurança em saúde visa:", alternativas: ["Aumentar o lucro hospitalar.", "Prevenir riscos biológicos aos profissionais e pacientes.", "Apenas o descarte de lixo comum.", "Substituir medicamentos."], correta: 1 },
        { enunciado: "A Política Nacional de Humanização (PNH) é também conhecida como:", alternativas: ["SUS Legal.", "HumanizaSUS.", "Saúde Família.", "Brasil Sorridente."], correta: 1 },
        { enunciado: "O princípio de tratar desigualmente os desiguais para atingir a justiça social é:", alternativas: ["Universalidade.", "Equidade.", "Integralidade.", "Descentralização."], correta: 1 },
        { enunciado: "Assinale a alternativa que contém apenas doenças de transmissão respiratória:", alternativas: ["Tuberculose e Gripe.", "Dengue e Zika.", "Cólera e Giardíase.", "Tétano e Raiva."], correta: 0 },
        { enunciado: "Ações que proporcionam o conhecimento e a prevenção de riscos à saúde coletiva é a:", alternativas: ["Vigilância Sanitária.", "Vigilância Epidemiológica.", "Vigilância Ambiental.", "Saúde do Trabalhador."], correta: 1 },
        { enunciado: "No termo 'paciente HIPOTENSO', o prefixo 'hipo' significa:", alternativas: ["Muito.", "Abaixo/Pouco.", "Acima/Muito.", "Normal."], correta: 1 }
    ]
};

// 2. ESTADO DA APP
let state = {
    stage: 'home',
    area: null,
    currentQuestion: 0,
    score: 0,
    onlineUsers: 143,
    midQuizMessage: null,
    isRedirecting: false
};

// 3. SISTEMA DE SOM (WEB AUDIO)
const sounds = {
    audioCtx: null,
    init() {
        if (!this.audioCtx) this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        if (this.audioCtx.state === 'suspended') this.audioCtx.resume();
    },
    playTone(f, t, d, v) {
        this.init();
        const osc = this.audioCtx.createOscillator();
        const g = this.audioCtx.createGain();
        osc.type = t;
        osc.frequency.setValueAtTime(f, this.audioCtx.currentTime);
        g.gain.setValueAtTime(v, this.audioCtx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + d);
        osc.connect(g); g.connect(this.audioCtx.destination);
        osc.start(); osc.stop(this.audioCtx.currentTime + d);
    },
    success() { this.playTone(523, 'sine', 0.1, 0.1); setTimeout(()=>this.playTone(659,'sine',0.2,0.1),100); },
    error() { this.playTone(220, 'square', 0.1, 0.05); setTimeout(()=>this.playTone(110,'square',0.2,0.05),100); },
    click() { this.playTone(800, 'sine', 0.05, 0.05); },
    finish() { [523,659,783,1046].forEach((f,i)=>setTimeout(()=>this.playTone(f,'sine',0.4,0.1),i*150)); }
};

// 4. LÓGICA DE INTERFACE
function render() {
    // Esconder/Mostrar telas
    document.getElementById('stage-home').classList.toggle('hidden', state.stage !== 'home');
    document.getElementById('stage-quiz').classList.toggle('hidden', state.stage !== 'quiz');
    document.getElementById('stage-result').classList.toggle('hidden', state.stage !== 'result');

    if (state.stage === 'home') renderHome();
    if (state.stage === 'quiz') renderQuiz();
    if (state.stage === 'result') renderResult();
    
    lucide.createIcons();
}

function renderHome() {
    const container = document.getElementById('area-buttons');
    container.innerHTML = '';
    const areas = ["Policial", "Fiscal", "Administrativa", "Bancária", "Tribunais", "Educação", "Saúde"];
    const icons = { Policial: 'shield-check', Fiscal: 'calculator', Administrativa: 'briefcase', Bancária: 'landmark', Tribunais: 'scale', Educação: 'graduation-cap', Saúde: 'stethoscope' };

    areas.forEach(area => {
        const btn = document.createElement('button');
        btn.className = "group flex items-center w-full p-4 bg-slate-50 hover:bg-blue-600 hover:text-white rounded-2xl transition-all duration-300 transform hover:scale-[1.02] border border-slate-100 text-left";
        btn.innerHTML = `
            <div class="p-2 bg-white text-blue-600 rounded-xl mr-4 group-hover:bg-blue-500 group-hover:text-white transition-colors shadow-sm">
                <i data-lucide="${icons[area]}" class="w-5 h-5"></i>
            </div>
            <span class="flex-1 font-semibold">Área ${area}</span>
            <i data-lucide="chevron-right" class="w-5 h-5 opacity-40 group-hover:opacity-100"></i>
        `;
        btn.onclick = () => selectArea(area);
        container.appendChild(btn);
    });
}

function selectArea(area) {
    sounds.click();
    state.area = area;
    state.stage = 'quiz';
    state.currentQuestion = 0;
    state.score = 0;
    render();
}

function renderQuiz() {
    const questions = quizData[state.area] || quizData["Policial"]; 
    const q = questions[state.currentQuestion];
    
    if (!q) {
        state.stage = 'home';
        render();
        return;
    }

    document.getElementById('question-counter').innerText = `Questão ${state.currentQuestion + 1} de 8`;
    document.getElementById('progress-percent').innerText = `${Math.round(((state.currentQuestion + 1) / 8) * 100)}%`;
    document.getElementById('progress-bar').style.width = `${((state.currentQuestion + 1) / 8) * 100}%`;
    document.getElementById('current-score').innerText = state.score;
    document.getElementById('question-text').innerText = q.enunciado;

    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    q.alternativas.forEach((alt, idx) => {
        const btn = document.createElement('button');
        btn.className = "option-button group relative flex items-center w-full p-4 rounded-2xl text-left border-2 transition-all duration-200 border-slate-100 bg-white";
        btn.innerHTML = `
            <div class="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg font-bold mr-4 bg-slate-100 text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600">
                ${String.fromCharCode(65 + idx)}
            </div>
            <span class="font-semibold text-slate-700">${alt}</span>
        `;
        btn.onclick = () => {
            if (btn.disabled) return;
            handleAnswer(idx);
        };
        optionsContainer.appendChild(btn);
    });

    // Mensagem dinâmica
    const notification = document.getElementById('quiz-notification');
    if (state.currentQuestion === 2) showNotif("Você está indo melhor que muitos candidatos, continue.");
    else if (state.currentQuestion === 4) showNotif("Essa questão costuma derrubar muita gente.");
    else if (state.currentQuestion === 6) showNotif("Seu desempenho está sendo analisado...");
    else notification.classList.add('hidden');
}

function showNotif(msg) {
    const el = document.getElementById('quiz-notification');
    el.innerText = msg;
    el.classList.remove('hidden');
    el.classList.add('show');
}

function handleAnswer(idx) {
    const questions = quizData[state.area] || quizData["Policial"];
    const q = questions[state.currentQuestion];
    const isCorrect = idx === q.correta;
    const buttons = document.querySelectorAll('.option-button');

    buttons.forEach(b => b.disabled = true);

    if (isCorrect) {
        state.score += 10;
        sounds.success();
        buttons[idx].classList.add('correct');
        document.getElementById('points-feedback').classList.remove('hidden');
    } else {
        sounds.error();
        buttons[idx].classList.add('error');
        if (buttons[q.correta]) buttons[q.correta].classList.add('correct');
    }

    buttons.forEach((b, i) => {
        if (i !== idx && i !== q.correta) b.classList.add('dimmed');
    });

    setTimeout(() => {
        document.getElementById('points-feedback').classList.add('hidden');
        if (state.currentQuestion < 7) {
            state.currentQuestion++;
            render();
        } else {
            state.stage = 'result';
            sounds.finish();
            if (window.confetti) confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
            render();
        }
    }, 1800);
}

function renderResult() {
    const pct = (state.score / 80) * 100;
    let classification = "Iniciante";
    let diagnosis = "";

    if (pct <= 30) {
        classification = "Iniciante";
        diagnosis = "Seu nível atual ainda está abaixo do necessário para competir de verdade. Isso mostra que precisa de um material direcionado.";
    } else if (pct <= 60) {
        classification = "Em preparação";
        diagnosis = "Você já tem uma base, mas ainda apresenta lacunas que podem custar pontos. Um curso focado acelerará sua evolução.";
    } else if (pct <= 80) {
        classification = "Competitivo";
        diagnosis = "Você tem bom potencial, mas precisa de revisão estratégica e simulados para chegar mais forte.";
    } else {
        classification = "Alto potencial";
        diagnosis = "Excelente desempenho! Mantenha o ritmo com revisões de alto nível para garantir sua vaga.";
    }

    document.getElementById('final-area-name').innerText = state.area;
    document.getElementById('final-score').innerText = state.score;
    document.getElementById('final-hits').innerText = `${state.score/10}/8`;
    document.getElementById('final-classification').innerText = classification;
    document.getElementById('final-diagnosis').innerText = diagnosis;
}

// 5. REDIRECIONAMENTO WHATSAPP
document.getElementById('cta-whatsapp').onclick = () => {
    if (state.isRedirecting) return;
    state.isRedirecting = true;
    sounds.click();

    const btnText = document.getElementById('btn-text');
    btnText.innerText = "PREPARANDO ACESSO...";
    
    const pct = (state.score / 80) * 100;
    const classification = document.getElementById('final-classification').innerText;
    const text = `Olá! Fiz o teste e quero ADQUIRIR o curso preparatório para a área ${state.area}. Meu resultado foi ${classification} (${pct}% acertos). Como faço para pagar e receber o acesso agora?`;
    
    setTimeout(() => {
        window.open(`https://wa.me/5574988479461?text=${encodeURIComponent(text)}`, '_blank');
        state.isRedirecting = false;
        btnText.innerText = "QUERO ME PREPARAR DO JEITO CERTO AGORA";
    }, 800);
};

// 6. LOOP DE PROVA SOCIAL
setInterval(() => {
    state.onlineUsers += Math.floor(Math.random() * 5) - 2;
    if (state.onlineUsers < 80) state.onlineUsers = 80;
    if (state.onlineUsers > 220) state.onlineUsers = 220;
    document.getElementById('user-count').innerText = state.onlineUsers;
}, 4000);

// INICIALIZAR
window.onload = () => {
    render();
};
