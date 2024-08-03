require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.51.0-dev-20240628/min/vs' }});

require(['vs/editor/editor.main'], function() {
    // Cria o editor
    const editor = monaco.editor.create(document.getElementById('editor'), {
        value: '',
        language: 'cpp',
        theme: 'vs-dark'
    });

    // Disponibiliza o editor globalmente
    window.editor = editor;
});
