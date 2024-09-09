document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item button');

    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            const answer = item.nextElementSibling;
            answer.style.display = (answer.style.display === 'block') ? 'none' : 'block';
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    document.querySelector(".chat-input button").addEventListener("click", sendMessage);
    document.querySelector("#user-input").addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });
});

let currentStep = "menu";  // Variável para rastrear o estágio da conversa

function sendMessage() {
    var userInput = document.getElementById("user-input").value.trim();
    if (userInput === "") return;

    addMessage(userInput, "user-message");

    var botResponse = getBotResponse(userInput);
    setTimeout(function() {
        addMessage(botResponse, "bot-message", true);  // Define true para usar innerHTML
    }, 1000);

    document.getElementById("user-input").value = "";
}

function addMessage(text, className, isHTML = false) {
    var chatBody = document.getElementById("chat-body");
    var messageDiv = document.createElement("div");
    messageDiv.className = className;

    if (isHTML) {
        messageDiv.innerHTML = text;  // Interpreta o conteúdo como HTML
    } else {
        messageDiv.textContent = text;  // Usa textContent para texto puro
    }

    chatBody.appendChild(messageDiv);
    chatBody.scrollTop = chatBody.scrollHeight; // Rolagem automática para o final do chat
}

function getBotResponse(input) {
    input = input.toLowerCase();

    if (currentStep === "menu") {
        currentStep = "option";
        return `
            <p>Por favor, escolha uma das opções:</p>
            <div class="bot-menu">
                <button onclick="handleOption(1)">Registro de Imóveis</button>
                <button onclick="handleOption(2)">Certidões</button>
                <button onclick="handleOption(3)">Horário de Funcionamento</button>
                <button onclick="handleOption(4)">Falar com um atendente</button>
                <button onclick="handleOption(5)">Baixar Formulários</button>
                <button onclick="handleOption(6)">Dúvidas Frequentes</button> <!-- Nova opção -->
            </div>
        `;
    }

    return "Desculpe, não entendi. Pode reformular a pergunta?";
}

function handleOption(option) {
    let botResponse;

    switch(option) {
        case 1:
            botResponse = "Você escolheu Registro de Imóveis. Em que posso te ajudar com isso?";
            break;
        case 2:
            botResponse = "Você escolheu Certidões. Qual tipo de certidão você precisa?";
            break;
        case 3:
            botResponse = "Nosso horário de funcionamento é de segunda a sexta, das 9:00hrs às 15:00hrs.";
            break;
        case 4:
            botResponse = "Por favor, aguarde enquanto conectamos você a um atendente.";
            break;
        case 5:
            botResponse = "Baixando o formulário...";  // Aqui você pode adicionar lógica para download do arquivo
            downloadFile('documentos.docx');
            break;
        case 6:  // Opção de Dúvidas Frequentes
            botResponse = getFAQs();
            break;
        default:
            botResponse = "Opção inválida.";
    }

    addMessage(botResponse, "bot-message", true);  // Adiciona a resposta do bot
    currentStep = "menu";  // Retorna ao menu principal após processar a opção
}

function getFAQs() {
    return `
        <h3>Dúvidas Frequentes:</h3>
        <ul>
            <li><strong>O que é uma Matrícula e uma Matrícula Mãe?</strong><br>A Matrícula é a especialização, a individualização, a personificação definitiva de todos os dados legalmente exigidos que deve assegurar-se a um imóvel. A Matrícula mãe compreende o empreendimento no seu todo (incorporações e/ou especificações de condomínio, loteamentos).</li>
            <li><strong>O que é uma Certidão Negativa de Propriedade?</strong><br>É uma certidão que afirma a inexistência de propriedade de bem imóvel acerca de determinada pessoa.</li>
            <li><strong>O que é uma Certidão de Propriedade com Negativa de Ônus?</strong><br>É uma certidão que afirma não constar ônus de espécie alguma sobre o imóvel, ou, em relação ao seu proprietário.</li>
            <li><strong>O que é uma Certidão de Inteiro Teor?</strong><br>É o documento completo, alusivo a determinado ato, extraído ou da transcrição, da matrícula, registro e ainda de outras anotações existentes no Ofício que digam respeito ao bem imóvel ou ao seu proprietário.</li>
            <li><strong>O que é uma Certidão Vintenária?</strong><br>É uma Certidão que relata tudo o que ocorreu sobre o imóvel no período dos últimos 20 anos.</li>
            <li><strong>IPTU/Censo Imobiliário é o mesmo que a Matrícula do Imóvel?</strong><br>Não. A inscrição ou o IPTU são cadastros referentes à prefeitura, enquanto a Matrícula é o número correspondente ao documento com os registros realizados pelas Serventias de Registro de Imóveis.</li>
        </ul>
    `;
}

function downloadFile(fileUrl) {
    var link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileUrl.split('/').pop();  // Define o nome do arquivo para download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);  // Remove o link após o download
}


 
    
