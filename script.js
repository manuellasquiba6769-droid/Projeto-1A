
// Mapeamento de Elementos do HTML
const txtUmidade = document.getElementById('txt-umidade');
const txtTemp = document.getElementById('txt-temp');
const btnRegar = document.getElementById('btn-regar');
const statusRega = document.getElementById('status-rega');
const btnAtualizar = document.getElementById('btn-atualizar');
const barraAtual = document.getElementById('barra-atual');
const painelAlerta = document.getElementById('painel-alerta');
const msgAlerta = document.getElementById('msg-alerta');

let irrigacaoAtiva = false;

// Função para simular a leitura dos sensores de forma dinâmica
function lerSensores() {
    // Gera valores aleatórios realistas
    const umidadeSorteada = Math.floor(Math.random() * (85 - 35 + 1)) + 35; // 35% a 85%
    const tempSorteada = Math.floor(Math.random() * (32 - 18 + 1)) + 18; // 18°C a 32°C

    // Atualiza a interface de texto
    txtUmidade.textContent = `${umidadeSorteada}%`;
    txtTemp.textContent = `${tempSorteada}°C`;

    // Atualiza a barra do gráfico dinamicamente via CSS Variable
    barraAtual.style.setProperty('--altura', `${umidadeSorteada}%`);
    barraAtual.querySelector('span').textContent = `${umidadeSorteada}%`;

    // Processa a lógica de alertas inteligentes baseada nas leituras
    analisarAlertas(umidadeSorteada);
}

// Analisa os dados para sugerir ações ou dar avisos
function analisarAlertas(umidade) {
    if (umidade < 45) {
        painelAlerta.className = "card alerta-card atencao";
        msgAlerta.innerHTML = "⚠️ <strong>Solo Seco!</strong> Recomenda-se ligar o sistema de irrigação.";
    } else if (umidade > 75) {
        painelAlerta.className = "card alerta-card atencao";
        msgAlerta.innerHTML = "💧 <strong>Solo muito encharcado!</strong> Desative qualquer irrigação programada.";
    } else {
        painelAlerta.className = "card alerta-card";
        msgAlerta.innerHTML = "✅ <strong>Horta Saudável!</strong> Todos os parâmetros estão na faixa ideal.";
    }
}

// Controla o botão liga/desliga da rega
function alternarIrrigacao() {
    irrigacaoAtiva = !irrigacaoAtiva;

    if (irrigacaoAtiva) {
        statusRega.textContent = "Ativa (Injetando água...)";
        statusRega.style.color = "#0288d1";
        btnRegar.textContent = "Desligar Irrigação";
        btnRegar.classList.add('ligado');
    } else {
        statusRega.textContent = "Desligada";
        statusRega.style.color = "#2c3e50";
        btnRegar.textContent = "Ligar Irrigação";
        btnRegar.classList.remove('ligado');
        // Ao desligar, simula que a terra ficou mais úmida devido à rega
        txtUmidade.textContent = "72%";
        barraAtual.style.setProperty('--altura', '72%');
        barraAtual.querySelector('span').textContent = "72%";
        analisarAlertas(72);
    }
}

// Eventos de clique dos botões
btnRegar.addEventListener('click', alternarIrrigacao);
btnAtualizar.addEventListener('click', lerSensores);

// Inicializa o sistema rodando uma leitura automática assim que abre a página
lerSensores();

// Loop automático: atualiza os sensores sozinho a cada 7 segundos para dar dinâmica
setInterval(lerSensores, 7000);
