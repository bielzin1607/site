from flask import Flask, render_template, request
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv
import os

# Carrega as variáveis do arquivo .env
load_dotenv()

app = Flask(__name__)

# Agora as variáveis de ambiente estão disponíveis no código
EMAIL = os.getenv("EMAIL")
PASSWORD = os.getenv("PASSWORD")

TO_EMAIL = "gabrielsantanaa1607@gmail.com"

@app.route('/contato', methods=['GET', 'POST'])
def contato():
    if request.method == 'POST':
        nome = request.form['name']
        email = request.form['email']
        mensagem = request.form['message']

        # Preparando o e-mail
        msg = MIMEMultipart()
        msg['From'] = EMAIL
        msg['To'] = TO_EMAIL
        msg['Subject'] = f"Nova mensagem de {nome} ({email})"

        body = f"Nome: {nome}\nEmail: {email}\n\nMensagem:\n{mensagem}"
        msg.attach(MIMEText(body, 'plain'))

        # Enviando o e-mail via SMTP
        try:
            server = smtplib.SMTP('smtp.gmail.com', 587)
            server.starttls()
            server.login(EMAIL, PASSWORD)
            server.sendmail(EMAIL, TO_EMAIL, msg.as_string())
            server.quit()
            return "Mensagem enviada com sucesso!"
        except Exception as e:
            return f"Erro ao enviar a mensagem: {str(e)}"

    return render_template('contato.html')

if __name__ == '__main__':
    app.run(debug=True)
