# Site Educacional - Gerador de Pacotes de Aula

Este projeto é um site educacional que utiliza IA para gerar pacotes completos de aula, incluindo:
- Plano de Aula
- Slides
- Situação-Problema Teórica
- Situação-Problema Prática

## Funcionalidades Implementadas

### ✅ Correções Realizadas:
1. **Remoção de Markdown**: A IA agora gera conteúdo em texto simples, sem formatação Markdown
2. **Geração Completa**: Garantia de que todos os 4 componentes sejam sempre gerados
3. **Navegação por Abas**: Botões para alternar entre os diferentes componentes gerados
4. **Formulário Completo**: Todas as perguntas do PROMPT-FRONTEND foram implementadas
5. **Checkbox de Neurodivergência**: Opção para incluir estratégias inclusivas
6. **Backend Atualizado**: Processamento correto de todos os novos campos

### 🎯 Novas Funcionalidades:
- **Perguntas Completas**: Disciplina, nível da turma, perfil dos alunos, produto final, etc.
- **Metodologias Ativas**: Opção para sugerir metodologias automaticamente
- **Materiais Externos**: Sugestão de vídeos, imagens e materiais atualizados
- **Bibliografia**: Inclusão de referências técnicas atualizadas
- **Estratégias Inclusivas**: Suporte específico para alunos neurodivergentes
- **Seleção de Entregas**: Checkboxes para escolher quais componentes gerar

## Como Usar

### 1. Configuração do Ambiente

```bash
cd backend
pip install -r requirements.txt
```

### 2. Configuração da API OpenAI

Crie um arquivo `.env` na pasta `backend` baseado no `.env.example`:

```bash
cp .env.example .env
```

Edite o arquivo `.env` e adicione sua chave da API OpenAI:

```
OPENAI_API_KEY=sua_chave_aqui
```

### 3. Executar o Servidor

```bash
cd backend
python app.py
```

O site estará disponível em: http://localhost:5000

## Estrutura do Projeto

```
prot bit/
├── backend/
│   ├── app.py              # Servidor Flask principal
│   ├── prompt.txt          # Prompt da IA (atualizado)
│   ├── requirements.txt    # Dependências Python
│   ├── .env.example       # Exemplo de configuração
│   ├── static/
│   │   ├── script.js      # JavaScript (atualizado)
│   │   ├── style.css      # Estilos CSS (atualizado)
│   │   └── favicon.ico
│   └── templates/
│       └── index.html     # Interface HTML (atualizada)
```

## Navegação no Site

1. **Step 1**: Título e descrição da aula
2. **Step 2**: Definir objetivos de aprendizagem
3. **Step 3**: Configurações completas (disciplina, nível, recursos, etc.)
4. **Step 4**: Geração automática do conteúdo
5. **Step 5**: Visualização com navegação por abas:
   - Plano de Aula
   - Slides
   - Situação Problema - Teórica
   - Situação Problema - Prática

## Tecnologias Utilizadas

- **Backend**: Python Flask
- **Frontend**: HTML, CSS, JavaScript
- **IA**: OpenAI GPT-4o
- **Estilo**: CSS customizado com tema dark

## Melhorias Implementadas

### Prompt da IA:
- Instruções claras para não usar Markdown
- Estrutura obrigatória de resposta com separadores
- Garantia de geração de todos os 4 componentes
- Suporte específico para neurodivergência

### Interface:
- Formulário completo com todas as perguntas necessárias
- Navegação intuitiva por abas
- Design responsivo e moderno
- Feedback visual claro

### Backend:
- Processamento de todos os novos campos
- Lógica condicional para neurodivergência
- Parsing inteligente do conteúdo gerado
- Estrutura de dados organizada

## Suporte

Para dúvidas ou problemas, verifique:
1. Se a chave da API OpenAI está configurada corretamente
2. Se todas as dependências foram instaladas
3. Se o servidor está rodando na porta correta

O site agora está completamente funcional com todas as melhorias solicitadas!

