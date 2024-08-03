import subprocess
import os
from flask import jsonify
import logging
from modulos.utils import get_code_file_path

# Configurações
ARDUINO_CLI_PATH = 'arduino-cli'
BOARD_FQBN = 'arduino:avr:uno'

def detect_arduino_port():
    """Detecta a porta onde o Arduino está conectado."""
    try:
        result = subprocess.run([ARDUINO_CLI_PATH, 'board', 'list'], capture_output=True, text=True)
        if result.returncode == 0:
            ports = []
            for line in result.stdout.splitlines():
                if 'Arduino' in line:
                    port = line.split()[0]
                    ports.append(port)
            if ports:
                logging.info(f"Portas Arduino detectadas: {ports}")
                return ports
        else:
            logging.error(f"Erro ao detectar a porta Arduino: {result.stderr}")
            return None
    except FileNotFoundError:
        logging.error("Arduino CLI não encontrado.")
        return None
    except Exception as e:
        logging.error(f"Erro ao detectar a porta Arduino: {str(e)}")
        return None