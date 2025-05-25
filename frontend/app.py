from flask import Flask, render_template_string, request, redirect
import sqlite3
import os

app = Flask(__name__)

# Função para carregar HTMLs da raiz manualmente
def carregar_html(nome_arquivo):
    with open(nome_arquivo, encoding='utf-8') as f:
        return f.read()

@app.route('/')
def index():
    return render_template_string(carregar_html('index.html'))

@app.route('/cadastro')
def cadastro():
    return render_template_string(carregar_html('cadastro.html'))

@app.route('/cadastrar', methods=['POST'])
def cadastrar():
    nome = request.form['nome']
    email = request.form['email']
    senha = request.form['senha']

    conn = sqlite3.connect('usuarios.db')
    cursor = conn.cursor()
    cursor.execute("INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)", (nome, email, senha))
    conn.commit()
    conn.close()

    return redirect('/')

@app.route('/home')
def home():
    return render_template_string(carregar_html('home.html'))

@app.route('/aprender')
def aprender():
    return render_template_string(carregar_html('aprender.html'))

@app.route('/textos')
def textos():
    return render_template_string(carregar_html('textos.html'))

# Permitir acesso aos arquivos da pasta imagens
@app.route('/imagens/<path:nome_arquivo>')
def imagens(nome_arquivo):
    return app.send_static_file(os.path.join('imagens', nome_arquivo))

if __name__ == '__main__':
    app.run(debug=True)
