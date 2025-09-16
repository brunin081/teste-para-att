document.addEventListener("DOMContentLoaded", () => {
    const steps = document.querySelectorAll(".step");
    const stepContents = document.querySelectorAll(".step-content");
    let currentStep = 0;

    function updateStep() {
        steps.forEach((step, idx) => {
            step.classList.toggle("active", idx === currentStep);
        });
        stepContents.forEach((content, idx) => {
            content.classList.toggle("active", idx === currentStep);
        });
    }

    // Navegação entre steps
    window.nextBtn = function() {
        if (currentStep < stepContents.length - 1) {
            currentStep++;
            if (currentStep === 3) generateLessonPlan();
            updateStep();
        }
    };

    window.prevBtn = function() {
        if (currentStep > 0) {
            currentStep--;
            updateStep();
        }
    };

    // Navegação entre conteúdos no step 5
    const navBtns = document.querySelectorAll('.nav-btn');
    const contentSections = document.querySelectorAll('.content-section');

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetContent = btn.getAttribute('data-content');
            
            // Remove active class from all buttons and sections
            navBtns.forEach(b => b.classList.remove('active'));
            contentSections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked button and corresponding section
            btn.classList.add('active');
            document.getElementById(`content-${targetContent}`).classList.add('active');
        });
    });

    async function generateLessonPlan() {
        const data = {
            disciplina: document.getElementById("subject").value,
            tema: document.getElementById("lessonTitle").value,
            duracao: document.getElementById("duration").value,
            nivel: document.getElementById("gradeLevel").value,
            perfil: document.getElementById("studentProfile").value,
            objetivos: document.getElementById("learningObjectives").value,
            produto: document.getElementById("finalProduct").value,
            conteudos: document.getElementById("necessaryTopics").value,
            metodologia: document.getElementById("methodology").value,
            recursos: document.getElementById("resources").value,
            hasNeurodivergent: document.getElementById("hasNeurodivergent").checked,
            suggestActiveMethods: document.getElementById("suggestActiveMethods").checked,
            suggestExternalMaterials: document.getElementById("suggestExternalMaterials").checked,
            includeBibliography: document.getElementById("includeBibliography").checked,
            specificInclusiveStrategies: document.getElementById("specificInclusiveStrategies").value,
            generateLessonPlan: document.getElementById("generateLessonPlan").checked,
            generateSlides: document.getElementById("generateSlides").checked,
            generateTheoreticalProblem: document.getElementById("generateTheoreticalProblem").checked,
            generatePracticalProblem: document.getElementById("generatePracticalProblem").checked,
            saidas: {
                plano: document.getElementById("generateLessonPlan").checked,
                slides: document.getElementById("generateSlides").checked,
                teorica: document.getElementById("generateTheoreticalProblem").checked,
                pratica: document.getElementById("generatePracticalProblem").checked
            }
        };

        try {
            const response = await fetch("/gerar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            
            // Parse the result to separate sections
            const content = result.resultado;
            const sections = parseContent(content);
            
            // Update content sections
            document.getElementById("content-plano").innerHTML = sections.plano || "<p>Plano de aula não foi gerado</p>";
            document.getElementById("content-slides").innerHTML = sections.slides || "<p>Slides não foram gerados</p>";
            document.getElementById("content-teorica").innerHTML = sections.teorica || "<p>Situação-problema teórica não foi gerada</p>";
            document.getElementById("content-pratica").innerHTML = sections.pratica || "<p>Situação-problema prática não foi gerada</p>";
            
            // Update preview info
            document.getElementById("resultTitle").textContent = data.tema;
            document.getElementById("resultDescription").textContent = "Pacote de aula gerado com sucesso!";
            
        } catch (e) {
            console.error("Erro:", e);
            document.getElementById("content-plano").innerHTML = "<p>Erro de conexão com backend</p>";
        }
    }

    function parseContent(content) {
        const sections = {
            plano: "",
            slides: "",
            teorica: "",
            pratica: ""
        };

        // Split content by section markers
        const planoMatch = content.match(/=== PLANO DE AULA ===([\s\S]*?)(?:=== |$)/);
        const slidesMatch = content.match(/=== SLIDES ===([\s\S]*?)(?:=== |$)/);
        const teoricaMatch = content.match(/=== SITUAÇÃO-PROBLEMA TEÓRICA ===([\s\S]*?)(?:=== |$)/);
        const praticaMatch = content.match(/=== SITUAÇÃO-PROBLEMA PRÁTICA ===([\s\S]*?)(?:=== |$)/);

        if (planoMatch) sections.plano = formatText(planoMatch[1].trim());
        if (slidesMatch) sections.slides = formatText(slidesMatch[1].trim());
        if (teoricaMatch) sections.teorica = formatText(teoricaMatch[1].trim());
        if (praticaMatch) sections.pratica = formatText(praticaMatch[1].trim());

        return sections;
    }

    function formatText(text) {
        // Convert plain text to HTML with proper formatting
        return text
            .replace(/\n\n/g, '</p><p>')
            .replace(/\n/g, '<br>')
            .replace(/^/, '<p>')
            .replace(/$/, '</p>');
    }

    // Initialize first step
    updateStep();
});