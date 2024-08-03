document.addEventListener('DOMContentLoaded', function() {
    // Carrega o código salvo ao inicializar
    api.loadCode().then(data => {
        if (data.code) {
            window.editor.setValue(data.code);
        }
    }).catch(error => updateConsole('Erro ao carregar o código salvo: ' + error));

    // Função para atualizar o console de mensagens
    function updateConsole(message) {
        const consoleDiv = document.getElementById('console');
        consoleDiv.textContent += message + "\n";
        consoleDiv.scrollTop = consoleDiv.scrollHeight; // Scroll para o final
    }

    // Configura os eventos dos botões
    document.getElementById('loadContentButton').addEventListener('click', function() {
        const newContent =  `// Código em C++ para Arduino...\n\n` +
                            `void setup() {\n` +
                            `    Serial.begin(9600);\n` +
                            `}\n\n` +
                            `void loop() {\n` +
                            `    Serial.println("Olá, Wandinho!");\n` +
                            `    delay(1000);\n` +
                            `}\n`;
        window.editor.setValue(newContent);
    });

    document.getElementById('saveButton').addEventListener('click', function() {
        const code = window.editor.getValue();
        api.saveCode(code)
            .then(data => updateConsole(data.message))
            .catch(error => updateConsole('Erro: ' + error));
    });

    document.getElementById('compileButton').addEventListener('click', function() {
        api.compileCode()
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
        api.uploadCode()
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
            window.editor.setValue(code);
            document.getElementById('fileName').textContent = `Wandicode: ${file.name}`;
        };

        reader.readAsText(file);
    });

    // Detecta automaticamente as portas Arduino
    api.getArduinoPorts()
        .then(data => {
            if (data.ports) {
                updateConsole(`Arduino conectado na porta: ${data.ports.join(', ')}`);
            } else {
                updateConsole(data.message);
            }
        })
        .catch(error => updateConsole('Erro ao detectar portas Arduino: ' + error));
});
