import os
from flask import Flask, render_template, request, jsonify
from dotenv import load_dotenv
from openai import OpenAI

# Configuração do OpenAI
load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

app = Flask(__name__)

# Rota principal (HTML)
@app.route("/")
def index():
    return render_template("index.html")

# Rota para gerar conteúdo com a IA
@app.route("/gerar", methods=["POST"])
def gerar():
    data = request.get_json()

    # Monta as respostas do professor
    respostas = f"""
Disciplina/Unidade Curricular: {data.get('disciplina')}
Tema: {data.get('tema')}
Duração: {data.get('duracao')}
Nível da turma: {data.get('nivel')}
Perfil dos alunos: {data.get('perfil')}

Objetivos de aprendizagem: {data.get('objetivos')}
Produto final esperado: {data.get('produto')}

Conteúdos necessários: {data.get('conteudos')}
Metodologia desejada: {data.get('metodologia')}
Recursos disponíveis: {data.get('recursos')}

Sugerir metodologias ativas: {'Sim' if data.get('suggestActiveMethods') else 'Não'}
Sugerir materiais externos: {'Sim' if data.get('suggestExternalMaterials') else 'Não'}
Incluir bibliografia: {'Sim' if data.get('includeBibliography') else 'Não'}

Incluir estratégias para neurodivergentes: {'Sim' if data.get('hasNeurodivergent') else 'Não'}
Estratégias inclusivas específicas: {data.get('specificInclusiveStrategies', 'Não especificadas')}

Saídas desejadas:
- Plano de Aula: {'Sim' if data.get('generateLessonPlan') else 'Não'}
- Slides: {'Sim' if data.get('generateSlides') else 'Não'}
- Situação-Problema Teórica: {'Sim' if data.get('generateTheoreticalProblem') else 'Não'}
- Situação-Problema Prática: {'Sim' if data.get('generatePracticalProblem') else 'Não'}
"""

    # Lê o Prompt Mestre do arquivo externo
    with open("prompt.txt", "r", encoding="utf-8") as f:
        prompt_mestre = f.read()

    # Adiciona instruções específicas sobre neurodivergência se solicitado
    if data.get('hasNeurodivergent'):
        prompt_mestre += f"""

ATENÇÃO ESPECIAL: O professor solicitou estratégias para alunos neurodivergentes. 
OBRIGATORIAMENTE inclua em TODOS os componentes gerados (Plano de Aula, Slides, Situações-Problema) estratégias específicas para:
- TDAH e Déficit de Atenção
- Hiperatividade  
- Autismo
- Estratégias universais de inclusão

{f"Estratégias específicas solicitadas pelo professor: {data.get('specificInclusiveStrategies')}" if data.get('specificInclusiveStrategies') else ""}
"""

    # Monta a entrada final para o GPT
    entrada = f"{prompt_mestre}\n\nDADOS DO PROFESSOR:\n{respostas}"

    # Chamada ao GPT-4o
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": "Você é uma IA educacional inclusiva especializada em gerar planos de aula completos e acessíveis. SEMPRE gere todos os 4 componentes solicitados: Plano de Aula, Slides, Situação-Problema Teórica e Situação-Problema Prática."},
            {"role": "user", "content": entrada}
        ]
    )

    resultado = response.choices[0].message.content
    return jsonify({"resultado": resultado})

if __name__ == "__main__":
    app.run(debug=True)
