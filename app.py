from flask import Flask, jsonify, request, send_from_directory
import threading
import webview
from modulos.arduino import detect_arduino_port
from modulos.codes import upload_code, compile_code
from modulos.files import save_code, load_code
from modulos.utils import get_documents_folder

# Inicializa o Flask
app = Flask(__name__, static_folder='static')

@app.route('/api/dados', methods=['GET'])
def get_dados():
    """Rota de teste para verificar se o backend está respondendo."""
    return jsonify({"message": "Olá do backend!"})

@app.route('/api/save', methods=['POST'])
def api_save_code():
    """Rota para salvar o código."""
    data = request.get_json()
    code = data.get('code', '')
    return save_code(code)

@app.route('/api/compile', methods=['POST'])
def api_compile_code():
    """Rota para compilar o código."""
    return compile_code()

@app.route('/api/upload', methods=['POST'])
def api_upload_code():
    """Rota para fazer upload do código."""
    return upload_code()

@app.route('/api/load', methods=['GET'])
def api_load_code():
    """Rota para carregar o código salvo."""
    return load_code()

@app.route('/api/ports', methods=['GET'])
def api_get_ports():
    """Rota para obter as portas onde Arduinos estão conectados."""
    ports = detect_arduino_port()
    if ports:
        return jsonify({"ports": ports})
    else:
        return jsonify({"message": "Nenhum Arduino detectado."}), 404

@app.route('/<path:path>')
def serve_static(path):
    """Serve arquivos estáticos."""
    return send_from_directory(app.static_folder, path)

def start_flask():
    """Inicia o servidor Flask."""
    app.run(port=3800)

if __name__ == '__main__':
    # Inicia o servidor Flask em uma thread separada
    flask_thread = threading.Thread(target=start_flask)
    flask_thread.daemon = True
    flask_thread.start()

    # Inicializa a webview
    window = webview.create_window('Wandi Code', 'http://localhost:3800/index.html', width=900, height=730, resizable=False, easy_drag=True, confirm_close=True)
    webview.start()
