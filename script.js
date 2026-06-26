
// Capturando Elementos do Painel
const valUmidade = document.getElementById('val-umidade');
const valTemp = document.getElementById('val-temp');
const valBomba = document.getElementById('val-bomba');
const btnRegar = document.getElementById('btn-regar');
const btnRefresh = document.getElementById('btn-refresh');
const livePoint = document.getElementById('live-point');
const logConsole = document.getElementById('log-console');

let bombaAtiva = false;

// Função para registrar logs no painel
function adicionarLog(mensagem) {
    const agora = new Date();
    const horaFormatada = agora.toTimeString().split(' ')[0];
    
    const novoLog = document.createElement('p');
    novoLog.className = 'log-entry';
    novoLog.innerText = `[${horaFormatada}] ${mensagem}`;
    
    logConsole.appendChild(novoLog);
    logConsole.scrollTop = logConsole.scrollHeight; // Auto-scroll para o último log
}

// Leitura de Telemetria dos Sensores
function atualizarTelemetria() {
    // Simulação de cálculos de sensores estáveis
    const umidade = Math.floor(Math.random() * (72 - 48 + 1)) + 48; // Entre 48% e 72%
    const temperatura = (Math.random() * (28.5 - 21.0) + 21.0).toFixed(1); // Ex: 24.3°C

    valUmidade.innerText = `${umidade}%`;
    valTemp.innerText = `${temperatura}°C`;

    // Move o ponto do gráfico dinamicamente com base no valor da umidade
    livePoint.style.bottom = `${umidade}%`;

    adicionarLog(`Telemetria atualizada. Umidade: ${umidade}%, Temp: ${temperatura}°C.`);
}

// Lógica de Atuação da Irrigação
function gerenciarRega() {
    bombaAtiva = !bombaAtiva;

    if (bombaAtiva) {
        valBomba.innerText = "Ativa (Injetando...)";
        valBomba.className = "status-on";
        btnRegar.innerText = "Desativar Irrigação";
        btnRegar.classList.add('active');
        adicionarLog("⚠️ Comando de atuação enviado: BOMBA LIGADA.");
    } else {
        valBomba.innerText = "Inativa";
        valBomba.className = "status-off";
        btnRegar.innerText = "⚡ Acionar Irrigação";
        btnRegar.classList.remove('active');
        adicionarLog("✅ Comando de atuação enviado: BOMBA DESLIGADA.");
        
        // Simulação rápida pós rega
        valUmidade.innerText = "68%";
        livePoint.style.bottom = "68%";
        adicionarLog("🌱 Sensor reporta: Recuperação de umidade bem-sucedida (68%).");
    }
}

// Event Listeners
btnRegar.addEventListener('click', gerenciarRega);
btnRefresh.addEventListener('click', () => {
    adicionarLog("[USER] Forçando leitura manual de sensores...");
    atualizarTelemetria();
});

// Inicialização Automática
document.addEventListener("DOMContentLoaded", () => {
    atualizarTelemetria();
    // Atualização em background a cada 10 segundos
    setInterval(atualizarTelemetria, 10000);
});
