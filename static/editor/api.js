// Função para salvar o código
function saveCode(code) {
    return fetch('/api/save', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code: code })
    })
    .then(response => response.json());
}

// Função para compilar o código
function compileCode() {
    return fetch('/api/compile', {
        method: 'POST'
    })
    .then(response => response.json());
}

// Função para fazer upload do código
function uploadCode() {
    return fetch('/api/upload', {
        method: 'POST'
    })
    .then(response => response.json());
}

// Função para carregar o código salvo
function loadCode() {
    return fetch('/api/load')
    .then(response => response.json());
}

// Função para obter as portas onde Arduinos estão conectados
function getArduinoPorts() {
    return fetch('/api/ports')
    .then(response => response.json());
}

// Disponibiliza as funções globalmente para main.js
window.api = {
    saveCode,
    compileCode,
    uploadCode,
    loadCode,
    getArduinoPorts
};
