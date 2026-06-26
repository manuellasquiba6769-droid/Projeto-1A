
/* Configurações Gerais */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

body {
    background-color: #f4f7f5;
    color: #333;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

/* Cabeçalho */
header {
    background-color: #2e7d32;
    color: white;
    text-align: center;
    padding: 2rem 1rem;
}

header h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
}

/* Conteúdo Principal */
.container {
    max-width: 800px;
    margin: 2rem auto;
    padding: 0 1rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    flex: 1;
}

/* Cards */
.card {
    background: white;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-top: 5px solid #4caf50;
}

.card h2 {
    color: #2e7d32;
    margin-bottom: 1rem;
    font-size: 1.3rem;
}

.info p {
    margin: 0.5rem 0;
    font-size: 1.1rem;
}

.status-bom {
    color: #2e7d32;
    font-weight: bold;
    margin-top: 1rem;
}

/* Botão */
.btn {
    background-color: #1976d2;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 1rem;
    transition: background 0.2s;
    width: 100%;
}

.btn:hover {
    background-color: #115293;
}

.btn.ativo {
    background-color: #d32f2f;
}

/* Rodapé */
footer {
    text-align: center;
    padding: 1rem;
    background-color: #333;
    color: #fff;
    font-size: 0.9rem;
}
