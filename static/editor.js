require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.51.0-dev-20240628/min/vs' }});
require(['vs/editor/editor.main'], function() {
    // Cria o editor
    const editor = monaco.editor.create(document.getElementById('editor'), {
        value: '',  // Inicialmente vazio
        language: 'cpp',
        theme: 'vs-dark',
        contextmenu: true,
        minimap: {
            enabled: false, // Desabilitar minimap
        }
    });

    function updateConsole(message) {
        const consoleDiv = document.getElementById('console');
        consoleDiv.textContent += message + "\n";
        consoleDiv.scrollTop = consoleDiv.scrollHeight; // Scroll para o final
    }

    // Função para carregar as portas conectadas
    function loadPorts() {
        fetch('/api/ports')
        .then(response => response.json())
        .then(data => {
            if (data.ports) {
                updateConsole('Portas Arduino conectadas: ' + data.ports.join(', '));
            } else {
                updateConsole('Nenhum Arduino detectado.');
            }
        })
        .catch(error => updateConsole('Erro ao detectar portas: ' + error));
    }

    // Carrega as portas conectadas ao carregar a página
    loadPorts();

    // Outros manipuladores de eventos...
    document.getElementById('clear-btn').addEventListener('click', function() {
        document.getElementById('console').innerHTML = '';
    });

    document.getElementById('loadContentButton').addEventListener('click', function() {
        const newContent = `// Código em C++ para Arduino: Explore a programação no Arduino de maneira divertida e educativa com a Causa-Efeito, SINER.\n\n` +
        `void setup() {\n` +
        `    // Inicializa a comunicação serial\n` +
        `    Serial.begin(9600);\n` +
        `}\n\n` +
        `void loop() {\n` +
        `    // Imprime uma mensagem especial pela porta serial\n` +
        `    Serial.println("Olá, Wandinho! Bem-vindo ao universo do Arduino com a Causa-Efeito, SINER!");\n` +
        `\n` +
        `    // Aguarda um momento antes da próxima aventura\n` +
        `    delay(1000);\n` +
        `}\n`;
        editor.setValue(newContent);
    });

    document.getElementById('saveButton').addEventListener('click', function() {
        const code = editor.getValue();
        fetch('/api/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ code: code })
        })
        .then(response => response.json())
        .then(data => updateConsole(data.message))
        .then(document.getElementById('fileName').textContent = `Wandicode`)
        .catch(error => updateConsole('Erro: ' + error));
    });

    document.getElementById('compileButton').addEventListener('click', function() {
        fetch('/api/compile', {
            method: 'POST'
        })
        .then(response => response.json())
        .then(data => {
            updateConsole(data.message);
            if (data.output) {
                updateConsole('Saída:\n' + data.output);
            }
            if (data.error) {
                updateConsole('Erro:\n' + data.error);
            }
        })
        .catch(error => updateConsole('Erro: ' + error));
    });

    document.getElementById('uploadButton').addEventListener('click', function() {
        fetch('/api/upload', {
            method: 'POST'
        })
        .then(response => response.json())
        .then(data => {
            updateConsole(data.message);
            if (data.output) {
                updateConsole('Saída:\n' + data.output);
            }
            if (data.error) {
                updateConsole('Erro:\n' + data.error);
            }
        })
        .catch(error => updateConsole('Erro: ' + error));
    });

    document.getElementById('openFileButton').addEventListener('click', function() {
        const fileInput = document.getElementById('fileInput');
        if (fileInput.files.length === 0) {
            updateConsole('Por favor, selecione um arquivo.');
            return;
        }

        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = function(event) {
            const code = event.target.result;
            editor.setValue(code);
            document.getElementById('fileName').textContent = `Wandicode: ${file.name}`;
        };

        reader.readAsText(file);
    });

    // Função para carregar o código salvo anteriormente
    function loadSavedCode() {
        fetch('/api/load')
        .then(response => response.json())
        .then(data => {
            if (data.code) {
                editor.setValue(data.code);

            }
        })
        .catch(error => updateConsole('Erro ao carregar o código salvo: ' + error));
    }

    // Carrega o código salvo quando a página é carregada
    loadSavedCode();
});
