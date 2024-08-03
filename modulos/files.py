import subprocess
import os
from flask import jsonify
import logging
from modulos.utils import get_code_file_path

# Configurações
ARDUINO_CLI_PATH = 'arduino-cli'
BOARD_FQBN = 'arduino:avr:uno'

def save_code(code):
    """Salva o código enviado no arquivo especificado."""
    if not code:
        return jsonify({"message": "Código não fornecido."}), 400
    
    # Força uso de \n como quebra de linha
    code = code.replace('\r\n', '\n')

    try:
        file_path = get_code_file_path()
        os.makedirs(os.path.dirname(file_path), exist_ok=True)
        with open(file_path, 'w', encoding='utf-8') as file:
            file.write(code)
        logging.info(f"Código salvo em {file_path}")
        return jsonify({"message": f"Código salvo com sucesso em {file_path}"})
    except Exception as e:
        logging.error(f"Erro ao salvar o código: {str(e)}")
        return jsonify({"message": f"Erro ao salvar o código: {str(e)}"}), 500

  
def load_code():
    """Carrega o código do arquivo salvo."""
    file_path = get_code_file_path()
    
    if not os.path.exists(file_path):
        return jsonify({"message": "Arquivo wandicode.ino não encontrado."}), 404

    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            code = file.read()
        return jsonify({"code": code})
    except Exception as e:
        logging.error(f"Erro ao ler o código: {str(e)}")
        return jsonify({"message": f"Erro ao ler o código: {str(e)}"}), 500