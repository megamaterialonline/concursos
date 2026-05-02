/** 
 * Script do Funil Gamificado (Elite Concursos)
 * Lógica pura em JavaScript para rodar no GitHub Pages
 */

// 1. DATA DAS QUESTÕES
const quizData = {
    Policial: [
        { enunciado: "No tocante aos Direitos e Garantias Fundamentais, é correto afirmar que a casa é asilo inviolável, ninguém nela podendo penetrar sem consentimento, salvo:", alternativas: ["Apenas durante o dia, por ordem judicial.", "Apenas para prestar socorro.", "Em caso de flagrante delito ou desastre, ou para prestar socorro, ou, durante o dia, por determinação judicial.", "Apenas durante a noite, em flagrante."], correta: 2 },
        { enunciado: "O crime de homicídio qualificado é considerado:", alternativas: ["Crime culposo.", "Crime hediondo.", "Crime de menor potencial.", "Crime inafiançável sempre."], correta: 1 },
        { enunciado: "A negação lógica de 'Todo policial é herói' é:", alternativas: ["Nenhum policial é herói.", "Pelo menos um policial não é herói.", "Todo herói é policial.", "Algum policial é herói."], correta: 1 },
        { enunciado: "O inquérito policial é um procedimento:", alternativas: ["Judicial e contraditório.", "Administrativo, inquisitivo e preparatório.", "Facultativo para o MP.", "Público em todas as fases."], correta: 1 },
        { enunciado: "São órgãos da segurança pública na CF/88, EXCETO:", alternativas: ["Polícia Federal.", "Polícia Rodoviária Federal.", "Guarda Municipal (como principal).", "Polícias Militares."], correta: 2 },
        { enunciado: "Considere a frase: 'O policial interceptou o suspeito'. No plural temos:", alternativas: ["Os policiais interceptaram os suspeitos.", "Os policias interceptou os suspeitos.", "As policiais interceptaram a suspeita.", "Os policiais interceptaram o suspeito."], correta: 0 },
        { enunciado: "3 viaturas percorrem 60km em 1 hora. Quantos km 5 viaturas percorreriam no mesmo tempo com mesma velocidade individual?", alternativas: ["60km", "100km", "120km", "300km"], correta: 1 },
        { enunciado: "Princípio fundamental da República do Brasil:", alternativas: ["Dignidade da pessoa humana.", "Defesa da paz.", "Prevalência dos direitos humanos.", "Cooperação entre os povos."], correta: 0 }
    ],
    Fiscal: [
      { enunciado: "A competência tributária é:", alternativas: ["Delegável por lei.", "Indelegável, salvo funções de arrecadar.", "Pode ser renunciada.", "O não exercício transfere para a União."], correta: 1 },
      { enunciado: "Registro de fato que altera apenas a composição do patrimônio sem mudar o PL:", alternativas: ["Fato Permutativo.", "Fato Modificativo.", "Fato Misto.", "Fato Diminutivo."], correta: 0 },
      { enunciado: "Capital de R$ 1000 a juros simples de 10% am, após 3 meses:", alternativas: ["R$ 1300", "R$ 1331", "R$ 1100", "R$ 1200"], correta: 0 },
      { enunciado: "Imposto é um tributo:", alternativas: ["Vinculado a serviço.", "Dependente de atividade estatal específica.", "Independente de atividade estatal específica.", "Cobrado apenas em caso de melhoria."], correta: 2 },
      { enunciado: "'O auditor estudou MUITO'. MUITO é:", alternativas: ["Adjetivo.", "Advérbio de intensidade.", "Substantivo.", "Conjunção."], correta: 1 },
      { enunciado: "Dívidas pagas no próximo exercício ficam no:", alternativas: ["Ativo Circulante.", "Passivo Circulante.", "Passivo Não Circulante.", "Patrimônio Líquido."], correta: 1 },
      { enunciado: "Veda tributo não uniforme no território nacional:", alternativas: ["Uniformidade Geográfica.", "Isonomia.", "Irretroatividade.", "Anterioridade."], correta: 0 },
      { enunciado: "15 auditores veem 300 processos em 5 dias. 10 auditores em 3 dias veem:", alternativas: ["120 processos.", "180 processos.", "200 processos.", "100 processos."], correta: 0 }
    ]
    // ... Nota: Por brevidade no exemplo, adicionei 2 áreas. No arquivo final recomendo copiar dos dados que já criei acima no App.tsx
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
    const questions = quizData[state.area] || quizData.Policial; // Fallback
    const q = questions[state.currentQuestion];
    
    document.getElementById('question-counter').innerText = `Questão ${state.currentQuestion + 1} de 8`;
    document.getElementById('progress-percent').innerText = `${Math.round(((state.currentQuestion + 1) / 8) * 100)}%`;
    document.getElementById('progress-bar').style.width = `${((state.currentQuestion + 1) / 8) * 100}%`;
    document.getElementById('current-score').innerText = state.score;
    document.getElementById('question-text').innerText = q.enunciado;

    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    q.alternativas.forEach((alt, idx) => {
        const btn = document.createElement('button');
        btn.className = "option-button group relative flex items-center w-full p-4 rounded-2xl text-left border-2 transition-all duration-200 border-slate-100 hover:border-blue-300 hover:bg-blue-50";
        btn.innerHTML = `
            <div class="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg font-bold mr-4 bg-slate-100 text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600">
                ${String.fromCharCode(65 + idx)}
            </div>
            <span class="font-semibold text-slate-700">${alt}</span>
        `;
        btn.onclick = () => handleAnswer(idx);
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
    const questions = quizData[state.area] || quizData.Policial;
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
        buttons[q.correta].classList.add('correct');
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
            confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
            render();
        }
    }, 2000);
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
