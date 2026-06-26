
// Objeto de Estado Local (Mapeia as variáveis do sistema)
const hortaState = {
    umidade: 58,
    temperatura: 23.4,
    bateria: 100,
    regarAtivo: false,
    luzAtiva: false
};

// Elementos DOM
const displayUmidade = document.getElementById('display-umidade');
const displayTemp = document.getElementById('display-temp');
const displayBateria = document.getElementById('display-bateria');
const toggleRega = document.getElementById('toggle-rega');
const toggleLuz = document.getElementById('toggle-luz');
const txtRega = document.getElementById('txt-status-rega');
const txtLuz = document.getElementById('txt-status-luz');
const terminalLog = document.getElementById('terminal-log');
const aiInsight = document.getElementById('ai-insight');
const toastContainer = document.getElementById('toast-container');

// Sistema de Alertas Toast Fáceis
function criarToast(mensagem) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerText = mensagem;
    toastContainer.appendChild(toast);
    setTimeout(() => toast.remove(), 3500);
}

// Escrita no terminal log interno
function registrarLog(origem, texto) {
    const agora = new Date();
    const timestamp = agora.toTimeString().split(' ')[0];
    const logItem = document.createElement('p');
    logItem.innerHTML = `<span style="color: var(--neon-blue)">[${timestamp}]</span> <strong style="color: #fff">${origem}:</strong> ${texto}`;
    terminalLog.appendChild(logItem);
    terminalLog.scrollTop = terminalLog.scrollHeight; // Mantém scroll no final
}

// Lógica de Telemetria Dinâmica Recorrente
function processarCicloSensores() {
    // Simula pequenas flutuações naturais no ambiente
    const flutuacaoTemp = (Math.random() * (0.4 - (-0.4)) + (-0.4));
    hortaState.temperatura = parseFloat((hortaState.temperatura + flutuacaoTemp).toFixed(1));

    // Se a rega estiver ligada, aumenta umidade. Se não, diminui lentamente
    if (hortaState.regarAtivo) {
        hortaState.umidade = Math.min(95, hortaState.umidade + 4);
    } else {
        hortaState.umidade = Math.max(15, hortaState.umidade - (Math.random() > 0.6 ? 1 : 0));
    }

    // Se as luzes estiverem ligadas, aquece um pouco o ambiente
    if (hortaState.luzAtiva) {
        hortaState.temperatura = parseFloat((hortaState.temperatura + 0.15).toFixed(1));
    }

    // Gasto progressivo da bateria do dispositivo simulado
    hortaState.bateria = Math.max(1, hortaState.bateria - (Math.random() > 0.8 ? 1 : 0));

    atualizarUI();
}

// Mecanismo de IA para análise contextual dos dados
function executarAnaliseIA() {
    if (hortaState.umidade < 40) {
        aiInsight.innerHTML = "💡 <strong>Sugestão da IA:</strong> Solo excessivamente seco detectado. Ative a irrigação por gotejamento para normalizar as raízes.";
        aiInsight.style.color = "var(--neon-yellow)";
    } else if (hortaState.umidade > 80) {
        aiInsight.innerHTML = "💡 <strong>Sugestão da IA:</strong> Saturação hídrica próxima do limite. Mantenha os irrigadores desligados.";
        aiInsight.style.color = "#ef4444";
    } else {
        aiInsight.innerHTML = "💡 <strong>Sugestão da IA:</strong> Ecossistema perfeitamente equilibrado. Ótima taxa de absorção de nutrientes.";
        aiInsight.style.color = "var(--text-primary)";
    }
}

// Atualização de Componentes de Tela
function atualizarUI() {
    displayUmidade.innerText = `${hortaState.umidade}%`;
    displayTemp.innerText = `${hortaState.temperatura} °C`;
    displayBateria.innerText = `${hortaState.bateria}%`;
    executarAnaliseIA();
}

// Event Listeners (Interatividade)
toggleRega.addEventListener('change', (e) => {
    hortaState.regarAtivo = e.target.checked;
    if (hortaState.regarAtivo) {
        txtRega.innerText = "Ativo (Injetando...)";
        txtRega.className = "status-enabled";
        criarToast("💦 Bomba de água acionada com sucesso.");
        registrarLog("ATUADOR", "Relé de irrigação fechado. Fluxo liberado.");
    } else {
        txtRega.innerText = "Desativado";
        txtRega.className = "status-disabled";
        criarToast("🛑 Irrigação interrompida.");
        registrarLog("ATUADOR", "Relé de irrigação aberto. Fluxo cortado.");
    }
});

toggleLuz.addEventListener('change', (e) => {
    hortaState.luzAtiva = e.target.checked;
    if (hortaState.luzAtiva) {
        txtLuz.innerText = "Ativada";
        txtLuz.className = "status-enabled";
        criarToast("💡 Iluminação UV ligada.");
        registrarLog("ATUADOR", "Painel de luz estufa ativado.");
    } else {
        txtLuz.innerText = "Apagada";
        txtLuz.className = "status-disabled";
        criarToast("🌑 Iluminação UV desligada.");
        registrarLog("ATUADOR", "Painel de luz estufa desativado.");
    }
});

// Relógio do Sistema em tempo real
setInterval(() => {
    const d = new Date();
    document.getElementById('clock').innerText = d.toTimeString().split(' ')[0];
}, 1000);

// Loops e inicializações automáticas
setInterval(processarCicloSensores, 3000); // Atualiza os dados a cada 3 segundos de forma assíncrona
registrarLog("SISTEMA", "AgroHorta OS v3 inicializado com sucesso.");
processarCicloSensores();
