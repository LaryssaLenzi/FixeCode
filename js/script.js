let currentLevel = 0;
let totalQuestions = 0;
let currentLevelsArray = [];
let canCheck = true;

const easyLevels = [
    {
        title: 'Fase 1: Estrutura HTML',
        description: 'Complete as tags que definem o cabeçalho e o corpo do documento.',
        code: '&lt;!DOCTYPE html>\n&lt;html lang="pt-br">\n&lt;____>\n    &lt;meta charset="UTF-8">\n    &lt;title>Página&lt;/title>\n&lt;/head>\n&lt;____>\n    &lt;h1>Conteúdo&lt;/h1>\n&lt;/body>\n&lt;/html>',
        answer: ['head', 'body']
    },
    {
        title: 'Fase 2: Tag de Parágrafo',
        description: 'Complete a tag para criar um parágrafo de texto.',
        code: '&lt;____>Este é um parágrafo.&lt;/p>',
        answer: ['p']
    },
    {
        title: 'Fase 3: Tag de Imagem',
        description: 'Complete a tag para exibir uma imagem no site.',
        code: '&lt;____ src="img/logo.png" alt="logo">',
        answer: ['img']
    },
    {
        title: 'Fase 4: Tag de Link',
        description: 'Complete a tag para criar um link clicável.',
        code: '&lt;____ href="https://www.google.com">Google&lt;/a>',
        answer: ['a']
    },
    {
        title: 'Fase 5: Atributo `src`',
        description: 'Qual atributo na tag `<img>` define o caminho da imagem?',
        code: '&lt;img ____="caminho/da/imagem.jpg">',
        answer: ['src']
    },
    {
        title: 'Fase 6: Atributo `href`',
        description: 'Qual atributo na tag `<a>` define o destino do link?',
        code: '&lt;a ____="https://site.com">Site&lt;/a>',
        answer: ['href']
    },
    {
        title: 'Fase 7: Tag de Botão',
        description: 'Complete a tag para criar um botão clicável.',
        code: '&lt;____>Clique Aqui&lt;/button>',
        answer: ['button']
    },
    {
        title: 'Fase 8: Propriedade `id`',
        description: 'Complete a propriedade para dar um identificador único a um elemento.',
        code: '&lt;p ____="paragrafo1">Olá&lt;/p>',
        answer: ['id']
    },
    {
        title: 'Fase 9: Tag de Título 2',
        description: 'Complete a tag para um título de nível 2.',
        code: '&lt;____>Subtítulo&lt;/h2>',
        answer: ['h2']
    },
    {
        title: 'Fase 10: Estrutura básica HTML',
        description: 'Qual a primeira linha de código em um documento HTML5?',
        code: '&lt;!____>',
        answer: ['DOCTYPE html']
    },
    {
        title: 'Fase 11: Propriedade `alt`',
        description: 'Complete a propriedade que fornece um texto alternativo para uma imagem.',
        code: '&lt;img src="img.jpg" ____="Descrição">',
        answer: ['alt']
    },
    {
        title: 'Fase 12: Tag para CSS',
        description: 'Qual a tag que usamos para estilizar diretamente no HTML?',
        code: '&lt;____> body { color: red; } &lt;/style>',
        answer: ['style']
    },
    {
        title: 'Fase 13: Símbolo de Copyright',
        description: 'Complete a entidade HTML para exibir o símbolo de copyright (©).',
        code: '&lt;p>Direitos Autorais ____;&lt;/p>',
        answer: ['&copy']
    },
    {
        title: 'Fase 14: Tag de Lista',
        description: 'Qual a tag usada para uma lista não ordenada?',
        code: '&lt;____>\n    &lt;li>Item 1&lt;/li>\n&lt;/ul>',
        answer: ['ul']
    },
    {
        title: 'Fase 15: Tag de Item de Lista',
        description: 'Qual a tag para um item de lista?',
        code: '&lt;ul>\n    &lt;____>Item&lt;/li>\n&lt;/ul>',
        answer: ['li']
    },
    {
        title: 'Fase 16: Tag de Tabela',
        description: 'Qual a tag usada para criar uma tabela em HTML?',
        code: '&lt;____>\n    \n&lt;/table>',
        answer: ['table']
    },
    {
        title: 'Fase 17: Tag de Linha de Tabela',
        description: 'Qual a tag para uma linha de uma tabela?',
        code: '&lt;table>\n    &lt;____>\n        &lt;td>Célula&lt;/td>\n    &lt;/tr>\n&lt;/table>',
        answer: ['tr']
    },
    {
        title: 'Fase 18: Tag de Formulário',
        description: 'Qual tag usamos para criar um formulário para coletar dados?',
        code: '&lt;____ action="/submit-form">',
        answer: ['form']
    },
    {
        title: 'Fase 19: Tag de Input',
        description: 'Qual a tag usada para criar um campo de entrada em um formulário?',
        code: '&lt;____ type="text">',
        answer: ['input']
    },
    {
        title: 'Fase 20: Comentário em HTML',
        description: 'Complete a sintaxe para inserir um comentário em HTML.',
        code: '&lt;!-- ____ -->',
        answer: ['comentário']
    }
];

const mediumLevels = [
    {
        title: 'Fase 1: Funções em JS',
        description: 'Complete a sintaxe para declarar uma função em JavaScript.',
        code: '____ minhaFuncao() {\n    // código aqui\n}',
        answer: ['function']
    },
    {
        title: 'Fase 2: Operador de Atribuição Aditiva',
        description: 'Complete a linha para somar 5 ao valor de `x`.',
        code: 'let x = 10;\nx ____ 5;',
        answer: ['+=']
    },
    {
        title: 'Fase 3: Operador de Atribuição Subtrativa',
        description: 'Complete a linha para subtrair 3 do valor de `y`.',
        code: 'let y = 20;\ny ____ 3;',
        answer: ['-=']
    },
    {
        title: 'Fase 4: Operador de Atribuição Multiplicativa',
        description: 'Complete a linha para multiplicar o valor de `z` por 2.',
        code: 'let z = 5;\nz ____ 2;',
        answer: ['*=']
    },
    {
        title: 'Fase 5: Operador de Atribuição Divisiva',
        description: 'Complete a linha para dividir o valor de `w` por 4.',
        code: 'let w = 16;\nw ____ 4;',
        answer: ['/=']
    },
    {
        title: 'Fase 6: DOM - Manipulando Conteúdo',
        description: 'Use a propriedade correta para mudar o texto dentro de um elemento HTML.',
        code: 'document.getElementById("titulo").____ = "Novo Título";',
        answer: ['innerText']
    },
    {
        title: 'Fase 7: DOM - Alterando Imagem',
        description: 'Complete a propriedade para mudar o atributo `src` de uma imagem.',
        code: 'document.getElementById("img-lampada").____ = "nova-lampada.jpg";',
        answer: ['src']
    },
    {
        title: 'Fase 8: Linkando CSS',
        description: 'Complete a tag para linkar um arquivo CSS externo ao seu HTML.',
        code: '&lt;link rel="stylesheet" ____="style.css">',
        answer: ['href']
    },
    {
        title: 'Fase 9: Linkando JavaScript',
        description: 'Complete a tag para incluir um arquivo JavaScript no seu HTML.',
        code: '&lt;script ____="script.js">&lt;/script>',
        answer: ['src']
    },
    {
        title: 'Fase 10: Estrutura da Página com Tags Semânticas',
        description: 'Complete a tag para o rodapé de uma página.',
        code: '&lt;main>\n    \n&lt;/main>\n&lt;____>\n    \n&lt;/footer>',
        answer: ['footer']
    },
    {
        title: 'Fase 11: Tag de Lista',
        description: 'Qual a tag usada para uma lista não ordenada?',
        code: '&lt;____>\n    &lt;li>Item 1&lt;/li>\n&lt;/ul>',
        answer: ['ul']
    },
    {
        title: 'Fase 12: Tag de Item de Lista',
        description: 'Qual a tag para um item de lista?',
        code: '&lt;ul>\n    &lt;____>Item&lt;/li>\n&lt;/ul>',
        answer: ['li']
    },
    {
        title: 'Fase 13: Funções com Parâmetros',
        description: 'Complete a função para aceitar um argumento `nome`.',
        code: 'function saudacao(____) {\n    console.log("Olá, " + nome);\n}',
        answer: ['nome']
    },
    {
        title: 'Fase 14: Funções com Retorno',
        description: 'Complete a linha para que a função retorne o resultado da soma.',
        code: 'function somar(a, b) {\n    ____ a + b;\n}',
        answer: ['return']
    },
    {
        title: 'Fase 15: Condicionais (if)',
        description: 'Complete a sintaxe para um condicional `if`.',
        code: 'if (idade > 18) {\n    // código aqui\n}',
        answer: ['if']
    },
    {
        title: 'Fase 16: Condicionais (else)',
        description: 'Complete a sintaxe para o bloco `else` de um condicional.',
        code: 'if (dia == "domingo") {\n    // código aqui\n} ____ {\n    // outro código\n}',
        answer: ['else']
    },
    {
        title: 'Fase 17: Estrutura de pasta',
        description: 'Onde o arquivo CSS do bootstrap é adicionado no HTML?',
        code: '&lt;link href="bootstrap.css" rel="stylesheet">\nNo ____ da página.',
        answer: ['head']
    },
    {
        title: 'Fase 18: JavaScript no HTML',
        description: 'Onde o arquivo JavaScript é adicionado para carregar o site mais rápido?',
        code: 'No final do ____.',
        answer: ['body']
    },
    {
        title: 'Fase 19: Objeto `document`',
        description: 'Qual objeto JavaScript representa o documento HTML?',
        code: '____.getElementById("elemento")',
        answer: ['document']
    },
    {
        title: 'Fase 20: JavaScript - Case Sensitive',
        description: 'JavaScript é sensível a letras maiúsculas e minúsculas. O termo para isso é "____ sensitive".',
        code: 'JavaScript é ____ sensitive.',
        answer: ['case']
    }
];

const hardLevels = [
    {
        title: 'Fase 1: Formulários - Método GET',
        description: 'Complete o atributo `method` para enviar dados de formulário visíveis na URL.',
        code: '&lt;form ____="GET">\n    \n&lt;/form>',
        answer: ['method']
    },
    {
        title: 'Fase 2: Formulários - Método POST',
        description: 'Complete o atributo `method` para enviar dados de formulário de forma invisível.',
        code: '&lt;form ____="POST">\n    \n&lt;/form>',
        answer: ['method']
    },
    {
        title: 'Fase 3: Tag Semântica `header`',
        description: 'Qual a tag semântica para a parte superior de uma página?',
        code: '&lt;____>\n    \n&lt;/header>',
        answer: ['header']
    },
    {
        title: 'Fase 4: Tag Semântica `section`',
        description: 'Qual a tag usada para agrupar conteúdo tematicamente?',
        code: '&lt;____>\n    \n&lt;/section>',
        answer: ['section']
    },
    {
        title: 'Fase 5: Atributo `alt` da Imagem',
        description: 'O que o atributo `alt` representa na tag `<img>`?',
        code: '&lt;img src="image.jpg" ____="Texto alternativo">',
        answer: ['alt']
    },
    {
        title: 'Fase 6: Atributo `id` vs. `name`',
        description: 'Qual atributo é usado para identificar um elemento de forma única em HTML?',
        code: '&lt;input type="text" ____="usuario">',
        answer: ['id']
    },
    {
        title: 'Fase 7: Auto-indentação em VS Code',
        description: 'Qual o atalho de teclado para auto-indenter o código?',
        code: '____+SHIFT+F',
        answer: ['ALT']
    },
    {
        title: 'Fase 8: O que é um `datacenter`?',
        description: 'Local onde fica vários ____',
        code: 'Local onde fica vários ____',
        answer: ['servidores']
    },
    {
        title: 'Fase 9: Atributo `lang`',
        description: 'Qual atributo na tag `<html>` define o idioma da página?',
        code: '&lt;html ____="pt-br">',
        answer: ['lang']
    },
    {
        title: 'Fase 10: Tag de Navegação',
        description: 'Qual tag semântica é usada para menus de navegação?',
        code: '&lt;____>\n    &lt;ul>\n        &lt;li>&lt;a href="#">Home&lt;/a>&lt;/li>\n    &lt;/ul>\n&lt;/nav>',
        answer: ['nav']
    },
    {
        title: 'Fase 11: Endereço do Servidor Local',
        description: 'Qual endereço de IP representa o servidor local?',
        code: 'O endereço de IP 127.0.0.1 também pode ser chamado de ____.',
        answer: ['localhost']
    },
    {
        title: 'Fase 12: Funções de `console`',
        description: 'Qual comando em JavaScript exibe dados no console do navegador?',
        code: '____.log("Olá, mundo");',
        answer: ['console']
    },
    {
        title: 'Fase 13: Modelo MVC',
        description: 'Complete a sigla do modelo que separa as preocupações de banco de dados, visualização e controle.',
        code: 'M - Model\nV - ____\nC - Controller',
        answer: ['View']
    },
    {
        title: 'Fase 14: Porta Criptografada',
        description: 'Qual é a porta geral usada para comunicação criptografada?',
        code: 'A porta criptografada é a ____.',
        answer: ['443']
    },
    {
        title: 'Fase 15: Atributo `type` do input',
        description: 'Complete o atributo para criar um campo de entrada de texto.',
        code: '&lt;input ____="text">',
        answer: ['type']
    },
    {
        title: 'Fase 16: Propriedade CSS `display`',
        description: 'Qual a propriedade CSS que ajuda a manipular elementos difíceis de mover?',
        code: 'Use `____:block;`',
        answer: ['display']
    },
    {
        title: 'Fase 17: Propriedade de URL',
        description: 'Complete a propriedade do objeto `document` que retorna a URL completa da página atual.',
        code: 'const url = document.____;',
        answer: ['URL']
    },
    {
        title: 'Fase 18: Como instalar o Bootstrap',
        description: 'Qual a tag utilizada para importar a folha de estilo do Bootstrap?',
        code: '&lt;____ href="bootstrap.min.css" rel="stylesheet">',
        answer: ['link']
    },
    {
        title: 'Fase 19: Comentário em CSS',
        description: 'Qual a sintaxe para um comentário em CSS?',
        code: '/* ____ */',
        answer: ['comentário']
    },
    {
        title: 'Fase 20: Propriedade `id` vs `class`',
        description: 'Qual atributo em HTML é usado para selecionar múltiplos elementos?',
        code: 'Para agrupar elementos, usamos o atributo ____.',
        answer: ['class']
    }
];

function normalizeAnswer(answer) {
    return answer.toLowerCase().replace(/[\s,\/]+/g, ',').split(',').sort().join(',');
}

function arraysEqual(a, b) {
    a = a.map(s => s.toLowerCase().trim()).sort();
    b = b.map(s => s.toLowerCase().trim()).sort();
    return a.length === b.length && a.every((val, index) => val === b[index]);
}

function startGame(difficulty) {
    const numQuestions = document.getElementById('num-questions').value;
    totalQuestions = numQuestions > 20 || numQuestions < 1 ? 20 : parseInt(numQuestions);

    if (difficulty === 'easy') {
        currentLevelsArray = easyLevels.slice(0, totalQuestions);
    } else if (difficulty === 'medium') {
        currentLevelsArray = mediumLevels.slice(0, totalQuestions);
    } else if (difficulty === 'hard') {
        currentLevelsArray = hardLevels.slice(0, totalQuestions);
    }
    document.querySelector('.start-screen').classList.add('hidden');
    document.querySelector('.game-container').classList.remove('hidden');
    currentLevel = 0;
    loadLevel();
}

function loadLevel() {
    if (currentLevel < currentLevelsArray.length) {
        const level = currentLevelsArray[currentLevel];
        document.getElementById('level-title').innerText = `${level.title} (${currentLevel + 1}/${totalQuestions})`;
        document.getElementById('level-description').innerText = level.description;
        document.getElementById('code-snippet').innerHTML = level.code.replace(/</g, '&lt;').replace(/>/g, '&gt;');

        const inputContainer = document.getElementById('answer-inputs-container');
        inputContainer.innerHTML = '';

        const numInputs = level.answer.length;
        for (let i = 0; i < numInputs; i++) {
            const input = document.createElement('input');
            input.type = 'text';
            input.placeholder = `Resposta ${i + 1}`;
            input.addEventListener('keydown', function (event) {
                if (event.key === 'Enter') {
                    checkAnswer();
                }
            });
            inputContainer.appendChild(input);
        }

        document.getElementById('feedback').innerText = '';
        document.getElementById('check-button').disabled = false;
    } else {
        document.querySelector('.game-container').innerHTML = '<h1>Parabéns!</h1><p>Você completou todas as fases deste nível! 🎉</p><button onclick="window.location.reload()">Voltar ao Início</button>';
    }
}

function checkAnswer() {
    if (!canCheck) return;
    canCheck = false;

    const inputElements = document.querySelectorAll('#answer-inputs-container input');
    const userAnswers = Array.from(inputElements).map(input => input.value.trim());

    const feedbackElement = document.getElementById('feedback');

    if (arraysEqual(userAnswers, currentLevelsArray[currentLevel].answer)) {
        feedbackElement.style.color = '#28a745';
        feedbackElement.innerText = 'Resposta correta! Avançando para a próxima fase...';
        setTimeout(() => {
            currentLevel++;
            canCheck = true;
            loadLevel();
        }, 1500);
    } else {
        feedbackElement.style.color = '#dc3545';
        feedbackElement.innerText = 'Resposta incorreta. Tente novamente.';
        canCheck = true;
        document.getElementById('check-button').disabled = false;
    }
}