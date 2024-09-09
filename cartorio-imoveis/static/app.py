from flask import Flask, send_file

app = Flask(__name__)

@app.route('/download/<filename>')
def download(filename):
    # Certifique-se de que o arquivo existe no diretório correto
    return send_file(f'documentos.docx{filename}', as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True)
