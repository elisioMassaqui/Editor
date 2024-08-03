A função webview.create_window oferece várias opções para personalizar a janela. Abaixo estão algumas das opções mais úteis que você pode usar:
```js
Parâmetros de webview.create_window
title: Título da janela.
url: URL a ser carregada na janela.
width: Largura inicial da janela.
height: Altura inicial da janela.
x: Posição x inicial da janela.
y: Posição y inicial da janela.
resizable: Permitir ou não redimensionamento da janela.
fullscreen: Abrir a janela em modo tela cheia.
min_size: Tamanho mínimo permitido para redimensionamento da janela.
hidden: Iniciar a janela oculta.
frameless: Abrir a janela sem bordas.
easy_drag: Permitir arrastar janelas sem bordas facilmente.
background_color: Cor de fundo da janela.
text_select: Permitir seleção de texto na janela.
confirm_close: Solicitar confirmação antes de fechar a janela.
```

# Configurações avançadas da janela
```py
window = webview.create_window(
    'Editor',
    'http://localhost:5000',
    width=800,
    height=600,
    x=100,
    y=100,
    resizable=True,
    fullscreen=False,
    min_size=(400, 300),
    hidden=False,
    frameless=False,
    easy_drag=True,
    background_color='#FFFFFF',
    text_select=True,
    confirm_close=True
)

# Função que será chamada antes de fechar a janela, se `confirm_close` for True
def on_close():
    return webview.windows[0].destroy()  # Fecha a janela

# Iniciar a janela
webview.start(on_close)
```

```cs
Explicação das Opções
x e y: Definem a posição inicial da janela na tela.
resizable: Define se a janela pode ser redimensionada pelo usuário.
fullscreen: Abre a janela em modo tela cheia.
min_size: Define o tamanho mínimo que a janela pode ter ao ser redimensionada.
hidden: Inicia a janela oculta; pode ser útil para realizar inicializações em segundo plano antes de mostrar a janela.
frameless: Remove a barra de título e bordas da janela, tornando-a sem bordas.
easy_drag: Permite arrastar uma janela sem bordas facilmente ao clicar e arrastar no corpo da janela.
background_color: Define a cor de fundo da janela.
text_select: Permite ou impede a seleção de texto dentro da janela.
confirm_close: Exibe um diálogo de confirmação antes de fechar a janela; requer uma função de callback.
```
