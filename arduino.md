## Configuração e Comandos Principais do Arduino CLI

### Configuração Inicial

Antes de começar, é necessário inicializar e configurar o Arduino CLI. Aqui estão os passos básicos:

1. **Instalação:**
   - Baixe e instale o `arduino-cli` conforme as instruções para o seu sistema operacional [aqui](https://arduino.github.io/arduino-cli/latest/installation/).

2. **Inicialização:**
   - Execute `arduino-cli config init` para inicializar a configuração do `arduino-cli`.

3. **Versão Arduino CLI:**
   - Exibe a versão do `arduino-cli version`.

4. **Adicionar Suporte Placas:**
   - Adicione suporte a placas Arduino com `arduino-cli core update-index`.

3. **Instalar placas AVR:**
   - Instalar um pacote de core específico `arduino-cli core install arduino:avr`.

### Comandos Principais

Aqui estão alguns dos comandos principais que você pode usar com o Arduino CLI:

- **`arduino-cli version`**
  - Exibe a versão do `arduino-cli`.

- **`arduino-cli board list`**
  - Lista todas as placas compatíveis com Arduino que o `arduino-cli` reconhece.

- **`arduino-cli core update-index`**
  - Atualiza o índice de pacotes de cores disponíveis para placas Arduino.

- **`arduino-cli core install <core>`**
  - Instala um pacote de core específico para uma placa Arduino.

- **`arduino-cli sketch new <sketch_name>`**
  - Cria um novo sketch Arduino com o nome especificado.

- **`arduino-cli compile --fqbn arduino:avr:uno -p COM19 "C:\Users\Elisio\yes"`**
  - Compila um sketch Arduino para uma placa específica.

- **`arduino-cli upload --fqbn arduino:avr:uno -p COM19 "C:\Users\Elisio\yes"`**
  - Faz o upload de um sketch compilado para uma placa Arduino conectada.

- **`arduino-cli lib search <search_term>`**
  - Procura por bibliotecas Arduino disponíveis para instalação.

- **`arduino-cli lib install <library>`**
  - Instala uma biblioteca Arduino específica.

- **`arduino-cli lib list`**
  - Lista de bibliotecas instaladas.

- **`arduino-cli board details <board_name>`**
  - Exibe detalhes sobre uma placa Arduino específica, incluindo suas configurações suportadas.
