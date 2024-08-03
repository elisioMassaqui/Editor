import os

def get_documents_folder():
    """Retorna o caminho para a pasta Documentos do usuário."""
    if os.name == 'nt':  # Windows
        return os.path.join(os.environ['USERPROFILE'], 'Documents')
    else:  # macOS e Linux
        return os.path.join(os.environ['HOME'], 'Documents')

def get_code_file_path():
    """Retorna o caminho completo para o arquivo de código."""
    return os.path.join(get_documents_folder(), 'wandi-studio', 'wandicode', 'wandicode.ino')
