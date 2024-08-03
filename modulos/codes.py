import subprocess
import os
from flask import jsonify
import logging
from modulos.utils import get_code_file_path
from modulos.arduino import detect_arduino_port

# Configurações
ARDUINO_CLI_PATH = 'arduino-cli'
BOARD_FQBN = 'arduino:avr:uno'

def compile_code():
    """Compila o código usando o Arduino CLI."""
    file_path = get_code_file_path()
    
    if not os.path.exists(file_path):
        return jsonify({"message": "Arquivo wandicode.ino não encontrado."}), 404

    command = [ARDUINO_CLI_PATH, 'compile', '--fqbn', BOARD_FQBN, file_path, '-v']

    try:
        result = subprocess.run(command, capture_output=True, text=True)
        if result.returncode == 0:
            logging.info("Compilação bem-sucedida.")
            return jsonify({"message": "Compilação concluída com sucesso.", "output": result.stdout})
        else:
            logging.error(f"Erro na compilação: {result.stderr}")
            return jsonify({"message": "Erro na compilação.", "error": result.stderr}), 500
    except FileNotFoundError:
        logging.error("Arduino CLI não encontrado.")
        return jsonify({"message": "O comando arduino-cli não foi encontrado. Verifique se o Arduino CLI está instalado e no PATH."}), 500
    except Exception as e:
        logging.error(f"Erro ao compilar o código: {str(e)}")
        return jsonify({"message": f"Erro ao compilar o código: {str(e)}"}), 500

def upload_code():
    """Envia o código compilado para o dispositivo Arduino."""
    file_path = get_code_file_path()
    
    if not os.path.exists(file_path):
        return jsonify({"message": "Arquivo wandicode.ino não encontrado."}), 404

    upload_port = detect_arduino_port()
    if not upload_port:
        return jsonify({"message": "Porta Arduino não detectada ou não conectada."}), 404

    command = [
        ARDUINO_CLI_PATH, 'upload', '--fqbn', BOARD_FQBN, '-p', upload_port[0], file_path, '-v'
    ]

    try:
        result = subprocess.run(command, capture_output=True, text=True)
        if result.returncode == 0:
            logging.info("Upload bem-sucedido.")
            return jsonify({"message": "Envio concluído com sucesso.", "output": result.stdout})
        else:
            logging.error(f"Erro no upload: {result.stderr}")
            return jsonify({"message": "Erro no envio do binário.", "error": result.stderr}), 500
    except FileNotFoundError:
        logging.error("Arduino CLI não encontrado.")
        return jsonify({"message": "O comando arduino-cli não foi encontrado. Verifique se o Arduino CLI está instalado e no PATH."}), 500
    except Exception as e:
        logging.error(f"Erro ao enviar o código: {str(e)}")
        return jsonify({"message": f"Erro ao enviar o código: {str(e)}"}), 500
