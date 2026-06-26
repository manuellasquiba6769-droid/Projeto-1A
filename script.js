
// Gerenciador de Estado Global
const state = {
    umidade: 62,
    temperatura: 24.5,
    bateria: 98,
    modoClima: 'ideal',
    irrigacao: false,
    cobertura: false
};

// DOM Elements
const mainUmidade = document.getElementById('main-umidade');
const cardTemp = document.getElementById('card-temp');
const cardBateria = document.getElementById('card-bateria');
const switchRega = document.getElementById('switch-rega');
const switchCobertura = document.getElementById('switch-cobertura');
const terminalStream = document.getElementById('terminal-stream');
const aiText = document.getElementById('ai-text');
const toastContainer = document.getElementById('toast-container');

// Sistema de Notificação Ativa (Toast)
function emitirAviso(msg) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerText = msg;
    toastContainer.appendChild(toast);
    setTimeout(() => toast.remove(), 4000);
}

// Escrita no Terminal Fake IoT
function writeTerminal(origem, log) {
    const p = document.createElement('p');
    p.innerHTML = `<span style="color: var(--glow-blue)">[${origem}]</span> ${log}`;
    terminalStream.appendChild(p);
    terminalStream.scrollTop = terminalStream.scrollHeight;
}

// Engine de Simulação de Sensores Inteligentes
function rodarSensores() {
    // Altera tendências baseado no modo climático escolhido pelo usuário
    if (state.modoClima === 'ideal') {
        state.umidade += Math.random() > 0.5 ? 1 : -1;
        state.temperatura = parseFloat((24 + Math.random() * 2).toFixed(1));
    } else if (state.modoClima === 'seca') {
        state.umidade = Math.max(20, state.umidade - 3);
        state.temperatura = Math.min(42, state.temperatura + 0.8);
    } else if (state.modoClima === 'chuva') {
        state.umidade = Math.min(98, state.umidade + 4);
        state.temperatura = Math.max(16, state.temperatura - 0.5);
    }

    // Impacto mecânico das ações do usuário
    if (state.irrigacao) {
        state.umidade = Math.min(95, state.umidade + 6);
        writeTerminal('ACTUATOR', 'Bomba injetando fluxo hídrico...');
    }

    // Consumo natural de bateria do dispositivo IoT
    state.bateria = Math.max(1, state.bateria - (Math.random() > 0.8 ? 1 : 0));

    renderInterface();
}

// Inteligência Artificial Contextual
function processarIA() {
    if (state.umidade < 40) {
        aiText.innerText = "🚨 Alerta crítico: Estresse hídrico detectado. Ative a irrigação imediatamente para evitar morte celular das folhas.";
    } else if (state.umidade > 85) {
        aiText.innerText = "⚠️ Saturação: O solo atingiu capacidade de campo máxima. Risco de asfixia radicular. Evite qualquer rega.";
    } else {
        aiText.innerText = "🌿 Estável: Níveis ótimos de transpiração estomática detectados. Planta em perfeito ciclo de fotossíntese.";
    }
}

// Atualização de toda a Interface Gráfica
function renderInterface() {
    mainUmidade.innerText = `${state.umidade}%`;
    cardTemp.innerText = `${state.temperatura} °C`;
    cardBateria.innerText = `${state.bateria}%`;
    processarIA();
}

// Configuração dos Botões de Clima Interativos
document.querySelectorAll('.btn-climate').forEach(button => {
    button.addEventListener('click', (e) => {
        document.querySelector('.btn-climate.active').classList.remove('active');
        e.target.classList.add('active');
        state.modoClima = e.target.dataset.clima;
        
        emitirAviso(`Clima ambiental alterado para: ${state.modoClima.toUpperCase()}`);
        writeTerminal('SYSTEM', `Simulação alterada para perfil de ${state.modoClima}.`);
    });
});

// Eventos de Switches de Hardware
switchRega.addEventListener('change', (e) => {
    state.irrigacao = e.target.checked;
    emitirAviso(state.irrigacao ? "💦 Sistema de aspersão LIGADO" : "🛑 Sistema de aspersão DESLIGADO");
    writeTerminal('USER', `Comando de bomba invertido para: ${state.irrigacao}`);
});

switchCobertura.addEventListener('change', (e) => {
    state.cobertura = e.target.checked;
    emitirAviso(state.cobertura ? "🛡️ Escudo de Policarbonato Estendido" : "🔓 Escudo UV Recolhido");
});

// Relógio em Tempo Real
setInterval(() => {
    const agora = new Date();
    document.getElementById('clock').innerText = agora.toTimeString().split(' ')[0];
}, 1000);

// Loop de execução contínua
setInterval(rodarSensores, 4000);

// Execução inicial
writeTerminal('KERNEL', 'AgroHorta Pro OS inicializado com sucesso.');
renderInterface();
