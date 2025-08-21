let currentLevel = 0;
let totalQuestions = 0;
let currentLevelsArray = [];
let canCheck = true;
let score = 0;
let userName = 'Anônimo';
let currentDifficulty = '';
let gameHistory = JSON.parse(localStorage.getItem('gameHistory')) || [];
let currentAnswersHistory = [];
let correctAnswersCount = 0;
let userEmblems = JSON.parse(localStorage.getItem('userEmblems')) || [];

const easyLevels = [
    {
        title: 'Questão 1: Estrutura HTML',
        description: 'Complete as tags que definem o cabeçalho e o corpo do documento.',
        code: '<!DOCTYPE html>\n<html lang="pt-br">\n<____>\n    <meta charset="UTF-8">\n    <title>Página</title>\n</head>\n<____>\n    <h1>Conteúdo</h1>\n</body>\n</html>',
        answer: ['head', 'body'],
        explanation: 'A tag <head> contém metadados e informações sobre o documento, como o título e a codificação de caracteres. A tag <body> contém o conteúdo visível da página, como textos, imagens e links.'
    },
    {
        title: 'Questão 2: Tag de Parágrafo',
        description: 'Complete a tag para criar um parágrafo de texto.',
        code: '<____>Este é um parágrafo.</p>',
        answer: ['p'],
        explanation: 'A tag <p> é utilizada para definir um parágrafo. O fechamento da tag, </p>, marca o fim do parágrafo.'
    },
    {
        title: 'Questão 3: Tag de Imagem',
        description: 'Complete a tag para exibir uma imagem no site.',
        code: '<____ src="img/logo.png" alt="logo">',
        answer: ['img'],
        explanation: 'A tag <img> é usada para incorporar uma imagem em uma página HTML. Ela é uma tag de fechamento automático, ou seja, não precisa de uma tag de fechamento como </img>.'
    },
    {
        title: 'Questão 4: Tag de Link',
        description: 'Complete a tag para criar um link clicável.',
        code: '<____ href="https://www.google.com">Google</a>',
        answer: ['a'],
        explanation: 'A tag <a> é usada para criar hiperlinks. O atributo href (hiperlink reference) especifica o destino do link.'
    },
    {
        title: 'Questão 5: Atributo `src`',
        description: 'Qual atributo na tag `<img>` define o caminho da imagem?',
        code: '<img ____="caminho/da/imagem.jpg">',
        answer: ['src'],
        explanation: 'O atributo src (source) na tag <img> especifica o caminho para o arquivo de imagem que será exibido na página.'
    },
    {
        title: 'Questão 6: Atributo `href`',
        description: 'Qual atributo na tag `<a>` define o destino do link?',
        code: '<a ____="https://site.com">Site</a>',
        answer: ['href'],
        explanation: 'O atributo href (hyperlink reference) na tag <a> define a URL de destino para onde o link irá redirecionar o usuário.'
    },
    {
        title: 'Questão 7: Tag de Botão',
        description: 'Complete a tag para criar um botão clicável.',
        code: '<____>Clique Aqui</button>',
        answer: ['button'],
        explanation: 'A tag <button> é usada para criar um botão clicável em um formulário ou em qualquer lugar da página. É ideal para interações com o usuário via JavaScript.'
    },
    {
        title: 'Questão 8: Propriedade `id`',
        description: 'Complete a propriedade para dar um identificador único a um elemento.',
        code: '<p ____="paragrafo1">Olá</p>',
        answer: ['id'],
        explanation: 'O atributo id é usado para dar um identificador único a um elemento. Ele é útil para manipular um elemento específico com CSS ou JavaScript.'
    },
    {
        title: 'Questão 9: Tag de Título 2',
        description: 'Complete a tag para um título de nível 2.',
        code: '<____>Subtítulo</h2>',
        answer: ['h2'],
        explanation: 'As tags de título, de <h1> a <h6>, são usadas para definir títulos e subtítulos. A tag <h2> é utilizada para o segundo nível de importância, geralmente um subtítulo.'
    },
    {
        title: 'Questão 10: Estrutura básica HTML',
        description: 'Qual a primeira linha de código em um documento HTML5?',
        code: '<!____>',
        answer: ['DOCTYPE html'],
        explanation: 'A declaração <!DOCTYPE html> define que o documento é um documento HTML5. Essa declaração deve sempre ser a primeira linha de código no seu documento HTML.'
    },
    {
        title: 'Questão 11: Propriedade `alt`',
        description: 'Complete a propriedade que fornece um texto alternativo para uma imagem.',
        code: '<img src="img.jpg" ____="Descrição">',
        answer: ['alt'],
        explanation: 'O atributo alt (alternative text) fornece um texto alternativo para a imagem. Ele é importante para a acessibilidade, pois é lido por leitores de tela para usuários com deficiência visual. Também é exibido se a imagem não puder ser carregada.'
    },
    {
        title: 'Questão 12: Tag para CSS',
        description: 'Qual a tag que usamos para estilizar diretamente no HTML?',
        code: '<____> body { color: red; } </style>',
        answer: ['style'],
        explanation: 'A tag <style> é usada para incluir código CSS dentro do próprio arquivo HTML. O CSS dentro desta tag será aplicado à página.'
    },
    {
        title: 'Questão 13: Símbolo de Copyright',
        description: 'Complete a entidade HTML para exibir o símbolo de copyright (©).',
        code: '<p>Direitos Autorais ____;</p>',
        answer: ['&copy'],
        explanation: 'As entidades HTML são usadas para exibir caracteres especiais. A entidade &copy; representa o símbolo de copyright (©).'
    },
    {
        title: 'Questão 14: Tag de Lista',
        description: 'Qual a tag usada para uma lista não ordenada?',
        code: '<____>\n    <li>Item 1</li>\n</ul>',
        answer: ['ul'],
        explanation: 'A tag <ul> (unordered list) é utilizada para criar listas de itens sem uma ordem específica, normalmente apresentadas com marcadores.'
    },
    {
        title: 'Questão 15: Tag de Item de Lista',
        description: 'Qual a tag para um item de lista?',
        code: '<ul>\n    <____>Item</li>\n</ul>',
        answer: ['li'],
        explanation: 'A tag <li> (list item) é usada para definir um item individual dentro de uma lista ordenada (<ol>) ou não ordenada (<ul>).'
    },
    {
        title: 'Questão 16: Tag de Tabela',
        description: 'Qual a tag usada para criar uma tabela em HTML?',
        code: '<____>\n    \n</table>',
        answer: ['table'],
        explanation: 'A tag <table> é utilizada para criar uma tabela em HTML, que é uma estrutura de dados com linhas e colunas.'
    },
    {
        title: 'Questão 17: Tag de Linha de Tabela',
        description: 'Qual a tag para uma linha de uma tabela?',
        code: '<table>\n    <____>\n        <td>Célula</td>\n    </tr>\n</table>',
        answer: ['tr'],
        explanation: 'A tag <tr> (table row) define uma linha em uma tabela. Dentro de uma linha, as células são definidas com as tags <td> ou <th>.'
    },
    {
        title: 'Questão 18: Tag de Formulário',
        description: 'Qual tag usamos para criar um formulário para coletar dados?',
        code: '<____ action="/submit-form">',
        answer: ['form'],
        explanation: 'A tag <form> é um container que agrupa elementos de formulário, como caixas de texto, botões e caixas de seleção, para coletar dados do usuário.'
    },
    {
        title: 'Questão 19: Tag de Input',
        description: 'Qual a tag usada para criar um campo de entrada em um formulário?',
        code: '<____ type="text">',
        answer: ['input'],
        explanation: 'A tag <input> é usada para criar campos de entrada interativos em um formulário. O atributo type especifica o tipo de entrada, como texto, senha, e-mail, etc.'
    },
    {
        title: 'Questão 20: Comentário em HTML',
        description: 'Complete a sintaxe para inserir um comentário em HTML.',
        code: [''],
        explanation: 'Comentários em HTML começam com . Eles são ignorados pelo navegador e são úteis para adicionar anotações para outros desenvolvedores ou para si mesmo.'
    }
];

const mediumLevels = [
    {
        title: 'Questão 1: Funções em JS',
        description: 'Complete a sintaxe para declarar uma função em JavaScript.',
        code: '____ minhaFuncao() {\n    // código aqui\n}',
        answer: ['function'],
        explanation: 'A palavra-chave function é usada para declarar uma função em JavaScript. Funções são blocos de código que podem ser reutilizados.'
    },
    {
        title: 'Questão 2: Operador de Atribuição Aditiva',
        description: 'Complete a linha para somar 5 ao valor de `x`.',
        code: 'let x = 10;\nx ____ 5;',
        answer: ['+='],
        explanation: 'O operador += é um operador de atribuição aditiva. Ele adiciona o valor à direita ao valor da variável à esquerda e atribui o resultado a essa variável (x = x + 5).'
    },
    {
        title: 'Questão 3: Operador de Atribuição Subtrativa',
        description: 'Complete a linha para subtrair 3 do valor de `y`.',
        code: 'let y = 20;\ny ____ 3;',
        answer: ['-='],
        explanation: 'O operador -= é um operador de atribuição subtrativa. Ele subtrai o valor à direita do valor da variável à esquerda e atribui o resultado a essa variável (y = y - 3).'
    },
    {
        title: 'Questão 4: Operador de Atribuição Multiplicativa',
        description: 'Complete a linha para multiplicar o valor de `z` por 2.',
        code: 'let z = 5;\nz ____ 2;',
        answer: ['*='],
        explanation: 'O operador *= é um operador de atribuição multiplicativa. Ele multiplica o valor da variável à esquerda pelo valor à direita e atribui o resultado a essa variável (z = z * 2).'
    },
    {
        title: 'Questão 5: Operador de Atribuição Divisiva',
        description: 'Complete a linha para dividir o valor de `w` por 4.',
        code: 'let w = 16;\nw ____ 4;',
        answer: ['/='],
        explanation: 'O operador /= é um operador de atribuição divisiva. Ele divide o valor da variável à esquerda pelo valor à direita e atribui o resultado a essa variável (w = w / 4).'
    },
    {
        title: 'Questão 6: DOM - Manipulando Conteúdo',
        description: 'Use a propriedade correta para mudar o texto dentro de um elemento HTML.',
        code: 'document.getElementById("titulo").____ = "Novo Título";',
        answer: ['innerText'],
        explanation: 'A propriedade innerText de um elemento HTML retorna ou define o conteúdo de texto de um elemento. É uma forma comum de manipular o conteúdo da página com JavaScript.'
    },
    {
        title: 'Questão 7: DOM - Alterando Imagem',
        description: 'Complete a propriedade para mudar o atributo `src` de uma imagem.',
        code: 'document.getElementById("img-lampada").____ = "nova-lampada.jpg";',
        answer: ['src'],
        explanation: 'O atributo src de um elemento <img> pode ser acessado e alterado diretamente com JavaScript. Ao mudar o valor de element.src, a imagem exibida na página é atualizada.'
    },
    {
        title: 'Questão 8: Linkando CSS',
        description: 'Complete a tag para linkar um arquivo CSS externo ao seu HTML.',
        code: '<link rel="stylesheet" ____="style.css">',
        answer: ['href'],
        explanation: 'O atributo href na tag <link> especifica a localização do arquivo a ser linkado, neste caso, o arquivo de estilo CSS.'
    },
    {
        title: 'Questão 9: Linkando JavaScript',
        description: 'Complete a tag para incluir um arquivo JavaScript no seu HTML.',
        code: '<script ____="script.js"></script>',
        answer: ['src'],
        explanation: 'O atributo src (source) na tag <script> especifica o caminho para o arquivo JavaScript externo. É a maneira padrão de incluir scripts em uma página HTML.'
    },
    {
        title: 'Questão 10: Estrutura da Página com Tags Semânticas',
        description: 'Complete a tag para o rodapé de uma página.',
        code: '<main>\n    \n</main>\n<____>\n    \n</footer>',
        answer: ['footer'],
        explanation: 'A tag semântica <footer> representa o rodapé da seção pai ou da página. Geralmente contém informações sobre o autor, direitos autorais, links para documentos relacionados, etc.'
    },
    {
        title: 'Questão 11: Tag de Lista',
        description: 'Qual a tag usada para uma lista não ordenada?',
        code: '<____>\n    <li>Item 1</li>\n</ul>',
        answer: ['ul'],
        explanation: 'A tag <ul> (unordered list) é utilizada para criar listas de itens sem uma ordem específica, normalmente apresentadas com marcadores.'
    },
    {
        title: 'Questão 12: Tag de Item de Lista',
        description: 'Qual a tag para um item de lista?',
        code: '<ul>\n    <____>Item</li>\n</ul>',
        answer: ['li'],
        explanation: 'A tag <li> (list item) é usada para definir um item individual dentro de uma lista ordenada (<ol>) ou não ordenada (<ul>).'
    },
    {
        title: 'Questão 13: Funções com Parâmetros',
        description: 'Complete a função para aceitar um argumento `nome`.',
        code: 'function saudacao(____) {\n    console.log("Olá, " + nome);\n}',
        answer: ['nome'],
        explanation: 'Parâmetros são variáveis listadas na definição da função. Eles servem para que a função possa receber dados externos. O parâmetro nome permite que a função saudacao use o nome passado como argumento para construir a mensagem.'
    },
    {
        title: 'Questão 14: Funções com Retorno',
        description: 'Complete a linha para que a função retorne o resultado da soma.',
        code: 'function somar(a, b) {\n    ____ a + b;\n}',
        answer: ['return'],
        explanation: 'A palavra-chave return finaliza a execução de uma função e especifica um valor a ser retornado a quem chamou a função. Neste caso, ela retorna o resultado da soma de a e b.'
    },
    {
        title: 'Questão 15: Condicionais (if)',
        description: 'Complete a sintaxe para um condicional `if`.',
        code: 'if (idade > 18) {\n    // código aqui\n}',
        answer: ['if'],
        explanation: 'A declaração if é a estrutura de controle mais básica, usada para executar um bloco de código se a condição especificada for verdadeira.'
    },
    {
        title: 'Questão 16: Condicionais (else)',
        description: 'Complete a sintaxe para o bloco `else` de um condicional.',
        code: 'if (dia == "domingo") {\n    // código aqui\n} ____ {\n    // outro código\n}',
        answer: ['else'],
        explanation: 'O bloco else é usado em conjunto com a declaração if para especificar um bloco de código que será executado se a condição do if for falsa.'
    },
    {
        title: 'Questão 17: Estrutura de pasta',
        description: 'Onde o arquivo CSS do bootstrap é adicionado no HTML?',
        code: '<link href="bootstrap.css" rel="stylesheet">\nNo ____ da página.',
        answer: ['head'],
        explanation: 'Os arquivos CSS devem ser linkados dentro da tag <head> para que os estilos sejam carregados antes do conteúdo da página, garantindo que a página seja renderizada corretamente.'
    },
    {
        title: 'Questão 18: JavaScript no HTML',
        description: 'Onde o arquivo JavaScript é adicionado para carregar o site mais rápido?',
        code: 'No final do ____.',
        answer: ['body'],
        explanation: 'É uma boa prática incluir arquivos JavaScript no final da tag <body>. Isso permite que a página HTML seja carregada e exibida antes que o script seja executado, melhorando a velocidade de carregamento visível para o usuário.'
    },
    {
        title: 'Questão 19: Objeto `document`',
        description: 'Qual objeto JavaScript representa o documento HTML?',
        code: '____.getElementById("elemento")',
        answer: ['document'],
        explanation: 'O objeto document representa a página web carregada no navegador. É o ponto de entrada para acessar o conteúdo da página, incluindo elementos HTML, e manipulá-lo usando o DOM (Document Object Model).'
    },
    {
        title: 'Questão 20: JavaScript - Case Sensitive',
        description: 'JavaScript é sensível a letras maiúsculas e minúsculas. O termo para isso é "____ sensitive".',
        code: 'JavaScript é ____ sensitive.',
        answer: ['case'],
        explanation: 'A sensibilidade a maiúsculas e minúsculas, ou "case sensitive", significa que o JavaScript diferencia entre letras maiúsculas e minúsculas. Por exemplo, a variável "nome" é diferente de "Nome".'
    }
];

const hardLevels = [
    {
        title: 'Questão 1: Formulários - Método GET',
        description: 'Complete o atributo `method` para enviar dados de formulário visíveis na URL.',
        code: '<form ____="GET">\n    \n</form>',
        answer: ['method'],
        explanation: 'O atributo method="GET" no formulário indica que os dados serão enviados na URL como parâmetros, sendo visíveis e com um limite de caracteres. É ideal para buscas ou dados não sensíveis.'
    },
    {
        title: 'Questão 2: Formulários - Método POST',
        description: 'Complete o atributo `method` para enviar dados de formulário de forma invisível.',
        code: '<form ____="POST">\n    \n</form>',
        answer: ['method'],
        explanation: 'O atributo method="POST" envia os dados no corpo da requisição HTTP, de forma invisível para o usuário e sem limite de tamanho. É o método recomendado para envio de dados sensíveis, como senhas.'
    },
    {
        title: 'Questão 3: Tag Semântica `header`',
        description: 'Qual a tag semântica para a parte superior de uma página?',
        code: '<____>\n    \n</header>',
        answer: ['header'],
        explanation: 'A tag semântica <header> representa a parte introdutória de um documento ou de uma seção. Geralmente contém o título, subtítulos, logos e a barra de navegação.'
    },
    {
        title: 'Questão 4: Tag Semântica `section`',
        description: 'Qual a tag usada para agrupar conteúdo tematicamente?',
        code: '<____>\n    \n</section>',
        answer: ['section'],
        explanation: 'A tag semântica <section> é usada para agrupar conteúdo relacionado, como capítulos, tópicos ou outras seções da página. Ajuda a estruturar o documento de forma lógica e acessível.'
    },
    {
        title: 'Questão 5: Atributo `alt` da Imagem',
        description: 'O que o atributo `alt` representa na tag `<img>`?',
        code: '<img src="image.jpg" ____="Texto alternativo">',
        answer: ['alt'],
        explanation: 'O atributo alt (alternative text) é crucial para acessibilidade e SEO. Ele fornece um texto descritivo para a imagem que é lida por leitores de tela ou exibida caso a imagem não possa ser carregada.'
    },
    {
        title: 'Questão 6: Atributo `id` vs. `name`',
        description: 'Qual atributo é usado para identificar um elemento de forma única em HTML?',
        code: '<input type="text" ____="usuario">',
        answer: ['id'],
        explanation: 'O atributo id deve ser único em toda a página HTML. Ele é a forma mais precisa de selecionar um único elemento com JavaScript ou aplicar estilos CSS a um elemento específico.'
    },
    {
        title: 'Questão 7: Auto-indentação em VS Code',
        description: 'Qual o atalho de teclado para auto-indenter o código?',
        code: '____+SHIFT+F',
        answer: ['ALT'],
        explanation: 'O atalho Alt + Shift + F (no Windows) ou Option + Shift + F (no Mac) formata o código automaticamente no VS Code, organizando a indentação e a estrutura para uma melhor legibilidade.'
    },
    {
        title: 'Questão 8: O que é um `datacenter`?',
        description: 'Local onde fica vários ____',
        code: 'Local onde fica vários ____',
        answer: ['servidores'],
        explanation: 'Um datacenter é uma instalação física que abriga servidores e outros equipamentos de computação e telecomunicações. É o coração de qualquer serviço online, como sites e aplicativos.'
    },
    {
        title: 'Questão 9: Atributo `lang`',
        description: 'Qual atributo na tag `<html>` define o idioma da página?',
        code: '<html ____="pt-br">',
        answer: ['lang'],
        explanation: 'O atributo lang (language) na tag <html> especifica o idioma do conteúdo da página. Isso é importante para motores de busca (SEO) e para leitores de tela (acessibilidade).'
    },
    {
        title: 'Questão 10: Tag de Navegação',
        description: 'Qual tag semântica é usada para menus de navegação?',
        code: '<____>\n    <ul>\n        <li><a href="#">Home</a></li>\n    </ul>\n</nav>',
        answer: ['nav'],
        explanation: 'A tag semântica <nav> é usada para agrupar links de navegação. Ela indica aos navegadores e tecnologias assistivas que o conteúdo é uma área de navegação principal.'
    },
    {
        title: 'Questão 11: Endereço do Servidor Local',
        description: 'Qual endereço de IP representa o servidor local?',
        code: 'O endereço de IP 127.0.0.1 também pode ser chamado de ____.',
        answer: ['localhost'],
        explanation: 'O endereço 127.0.0.1 é conhecido como "localhost" e se refere ao seu próprio computador. Ele é usado para acessar serviços de servidor que estão rodando na sua máquina local.'
    },
    {
        title: 'Questão 12: Funções de `console`',
        description: 'Qual comando em JavaScript exibe dados no console do navegador?',
        code: '____.log("Olá, mundo");',
        answer: ['console'],
        explanation: 'O objeto console fornece acesso ao console de depuração do navegador. O método console.log() é usado para imprimir mensagens de texto, variáveis e objetos para fins de depuração.'
    },
    {
        title: 'Questão 13: Modelo MVC',
        description: 'Complete a sigla do modelo que separa as preocupações de banco de dados, visualização e controle.',
        code: 'M - Model\nV - ____\nC - Controller',
        answer: ['View'],
        explanation: 'O padrão de arquitetura MVC (Model-View-Controller) separa a aplicação em três partes: o Model (dados e lógica de negócios), a View (interface do usuário) e o Controller (lógica de controle que gerencia a interação entre Model e View).'
    },
    {
        title: 'Questão 14: Porta Criptografada',
        description: 'Qual é a porta geral usada para comunicação criptografada?',
        code: 'A porta criptografada é a ____.',
        answer: ['443'],
        explanation: 'A porta 443 é a porta padrão para o tráfego HTTPS, que é a versão criptografada e segura do protocolo HTTP. O HTTPS utiliza SSL/TLS para garantir que os dados transmitidos sejam seguros.'
    },
    {
        title: 'Questão 15: Atributo `type` do input',
        description: 'Qual atributo na tag `<input>` define o tipo de campo?',
        code: '<input ____="text">',
        answer: ['type'],
        explanation: 'O atributo type na tag <input> especifica o tipo de entrada, como "text", "password", "submit", "checkbox", etc.'
    },
    {
        title: 'Questão 16: CSS Grid',
        description: 'Qual a propriedade para definir um container como um grid?',
        code: 'display: ____;',
        answer: ['grid'],
        explanation: 'A propriedade CSS display: grid; transforma um elemento em um container de grade (grid), permitindo o uso de todas as propriedades do CSS Grid para criar layouts complexos e responsivos.'
    },
    {
        title: 'Questão 17: Flexbox - Eixo Principal',
        description: 'Qual propriedade define a direção do eixo principal em um container flexbox?',
        code: 'flex-direction: ____;',
        answer: ['row'],
        explanation: 'A propriedade flex-direction em um container flexbox define a direção dos itens flex. O valor padrão, flex-direction: row;, alinha os itens horizontalmente (da esquerda para a direita).'
    },
    {
        title: 'Questão 18: Box Model - Propriedade de Espaço Externo',
        description: 'Qual propriedade do CSS cria espaço fora da borda de um elemento?',
        code: '____: 10px;',
        answer: ['margin'],
        explanation: 'A propriedade margin do CSS é usada para criar espaço ao redor dos elementos, fora de qualquer borda definida. Ela separa um elemento de outros elementos ao redor.'
    },
    {
        title: 'Questão 19: JavaScript - Módulos',
        description: 'Complete a sintaxe para exportar uma função para uso em outros arquivos.',
        code: 'export ____ minhaFuncao() { ... }',
        answer: ['function'],
        explanation: 'A declaração export é usada para exportar funções, objetos ou valores de um módulo JavaScript, permitindo que eles sejam importados e utilizados por outros scripts.'
    },
    {
        title: 'Questão 20: Event Listeners',
        description: 'Complete a sintaxe para adicionar um "ouvinte" de evento a um botão.',
        code: 'meuBotao.addEventListener("click", ____);',
        answer: ['minhaFuncao'],
        explanation: 'O método addEventListener() anexa um manipulador de eventos a um elemento. Ele espera o nome do evento ("click", "mouseover", etc.) e a função a ser executada quando o evento ocorrer.'
    }
];

const emblems = {
    'bronze': { name: 'Emblema de Bronze', description: 'Complete 2 questões corretas em uma única partida.', path: 'https://i.ibb.co/60Vv1h2/newbie.png' },
    'silver': { name: 'Emblema de Prata', description: 'Complete 4 questões corretas em uma única partida.', path: 'https://i.ibb.co/p3M6bYx/developer.png' },
    'gold': { name: 'Emblema de Ouro', description: 'Complete 6 questões corretas em uma única partida.', path: 'https://i.ibb.co/N1p08kS/ninja.png' },
    'diamond': { name: 'Emblema de Diamante', description: 'Complete 10 questões corretas em uma única partida.', path: 'https://i.ibb.co/hK7JqR4/master.png' },
    'master': { name: 'Emblema de Mestre', description: 'Complete 15 questões corretas em uma única partida.', path: 'https://i.ibb.co/mHq36b7/sage.png' },
    'legend': { name: 'Emblema de Lenda', description: 'Complete 20 questões corretas em uma única partida.', path: 'https://i.ibb.co/3sX80s7/legendary.png' },
};

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function resetGameState() {
    currentLevel = 0;
    score = 0;
    currentAnswersHistory = [];
    correctAnswersCount = 0;
    updateScoreDisplay();
}

function showScreen(screenId) {
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('name-screen').classList.add('hidden');
    document.getElementById('difficulty-screen').classList.add('hidden');
    document.getElementById('game-container').classList.add('hidden');
    document.getElementById('end-screen').classList.add('hidden');
    document.getElementById('history-screen').classList.add('hidden');
    document.getElementById('emblem-album').classList.add('hidden');
    document.getElementById(screenId).classList.remove('hidden');
}

function showStartScreen() {
    resetGameState();
    showScreen('start-screen');
    document.getElementById('username-input').value = '';
    document.getElementById('name-feedback').innerText = '';
}

function playAnonymously() {
    userName = 'Anônimo';
    showDifficultyScreen();
}

function showNameInput() {
    showScreen('name-screen');
}

function setNameAndShowDifficulty() {
    const usernameInput = document.getElementById('username-input');
    const nameFeedback = document.getElementById('name-feedback');
    if (usernameInput.value.trim() !== '') {
        userName = usernameInput.value.trim();
        showDifficultyScreen();
        nameFeedback.innerText = '';
    } else {
        nameFeedback.innerText = 'Por favor, digite um nome para continuar.';
        nameFeedback.style.color = '#dc3545';
    }
}

function showDifficultyScreen() {
    showScreen('difficulty-screen');
    document.getElementById('num-questions-feedback').innerText = ''; // Limpa a mensagem de feedback
}

function startGame(difficulty) {
    const numQuestionsInput = document.getElementById('num-questions');
    const numQuestions = parseInt(numQuestionsInput.value);
    const feedback = document.getElementById('num-questions-feedback');

    if (isNaN(numQuestions) || numQuestions < 1 || numQuestions > 20) {
        feedback.innerText = 'Por favor, digite um número entre 1 e 20.';
        feedback.style.color = '#dc3545';
        return; // Impede que a função continue se o número for inválido
    }

    currentDifficulty = difficulty;
    totalQuestions = numQuestions;
    feedback.innerText = ''; // Limpa a mensagem de feedback se o número for válido

    showScreen('game-container');
    
    let allLevels = [];
    if (difficulty === 'easy') {
        allLevels = easyLevels;
    } else if (difficulty === 'medium') {
        allLevels = mediumLevels;
    } else if (difficulty === 'hard') {
        allLevels = hardLevels;
    }
    
    // Embaralha todas as questões disponíveis
    shuffleArray(allLevels);

    // Seleciona o número de questões desejado
    currentLevelsArray = allLevels.slice(0, totalQuestions);

    resetGameState();
    loadLevel();
}

function loadLevel() {
    if (currentLevel < totalQuestions) {
        const level = currentLevelsArray[currentLevel];
        document.getElementById('level-title').innerText = level.title;
        document.getElementById('level-description').innerText = level.description;
        document.getElementById('code-snippet').innerText = level.code;
        
        const answerInputsContainer = document.getElementById('answer-inputs-container');
        answerInputsContainer.innerHTML = '';
        level.answer.forEach((answer, index) => {
            const input = document.createElement('input');
            input.type = 'text';
            input.id = `answer-input-${index}`;
            input.placeholder = `Resposta ${index + 1}`;
            answerInputsContainer.appendChild(input);
        });
        
        document.getElementById('feedback').innerText = '';
        document.getElementById('explanation').innerText = '';
        document.getElementById('check-button').classList.remove('hidden');
        document.getElementById('next-button').classList.add('hidden');
        
        updateScoreDisplay();
    } else {
        showEndScreen();
    }
}

function checkAnswer() {
    if (!canCheck) return;
    
    const level = currentLevelsArray[currentLevel];
    const userAnswers = [];
    level.answer.forEach((answer, index) => {
        const input = document.getElementById(`answer-input-${index}`);
        if (input) {
            userAnswers.push(input.value.trim());
        }
    });

    const feedbackElement = document.getElementById('feedback');
    const explanationElement = document.getElementById('explanation');
    const checkButton = document.getElementById('check-button');
    const nextButton = document.getElementById('next-button');

    const answerInfo = {
        question: level.title,
        userAnswer: userAnswers.join(', '),
        correct: false,
        correctAnswer: level.answer.join(', ') // Adicionado para histórico detalhado
    };

    const arraysEqual = (a, b) => a.length === b.length && a.every((val, index) => val.toLowerCase() === b[index].toLowerCase());

    if (arraysEqual(userAnswers, level.answer)) {
        feedbackElement.style.color = '#28a745';
        feedbackElement.innerText = 'Resposta correta!';
        explanationElement.style.color = '#fff';
        explanationElement.innerText = level.explanation;

        score++;
        correctAnswersCount++;
        unlockEmblem();
        answerInfo.correct = true;

        checkButton.classList.add('hidden');
        nextButton.classList.remove('hidden');
        canCheck = false;
    } else {
        feedbackElement.style.color = '#dc3545';
        feedbackElement.innerText = 'Resposta incorreta. Tente novamente.';
        explanationElement.innerText = ''; // Limpar explicação em caso de erro

        canCheck = true;
        checkButton.disabled = false;
    }

    currentAnswersHistory.push(answerInfo);
    updateScoreDisplay();
}

function nextLevel() {
    currentLevel++;
    canCheck = true;
    loadLevel();
}

function updateScoreDisplay() {
    const scoreElement = document.getElementById('score-display');
    if (scoreElement) {
        scoreElement.innerText = `Pontuação: ${score}/${totalQuestions} - Jogador: ${userName}`;
    }
}

document.addEventListener('keydown', function(event) {
    const nextButton = document.getElementById('next-button');
    if (event.key === 'Enter' && !nextButton.classList.contains('hidden') && document.getElementById('game-container').classList.contains('hidden') === false) {
        nextLevel();
    }
});

function showEndScreen() {
    showScreen('end-screen');
    document.getElementById('final-score').innerText = `Sua pontuação final é ${score} de ${totalQuestions}.`;
    document.getElementById('end-message').innerText = `Você completou ${score} de ${totalQuestions} questões com sucesso!`;

    const now = new Date();
    const formattedDate = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;

    gameHistory.push({
        userName: userName,
        date: formattedDate,
        difficulty: currentDifficulty,
        score: score,
        total: totalQuestions,
        answers: currentAnswersHistory
    });

    localStorage.setItem('gameHistory', JSON.stringify(gameHistory));
}

function showHistory() {
    showScreen('history-screen');

    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';

    if (gameHistory.length === 0) {
        historyList.innerHTML = '<p>Nenhum histórico de jogo encontrado. Jogue uma partida para registrar!</p>';
        return;
    }

    gameHistory.forEach((game, index) => {
        const historyItem = document.createElement('div');
        historyItem.classList.add('history-item');
        historyItem.innerHTML = `
            <div class="history-header">
                <h3>Jogo de ${game.userName} - ${game.date}</h3>
                <span>Dificuldade: ${game.difficulty}</span>
                <span>Pontuação: ${game.score}/${game.total}</span>
            </div>
            <ul>
                ${game.answers.map(answer => `
                    <li class="history-question ${answer.correct ? 'correct' : 'incorrect'}">
                        <strong>${answer.question}</strong>
                        - Sua resposta: "${answer.userAnswer}"
                        ${!answer.correct ? `| Resposta correta: "${answer.correctAnswer}"` : ''}
                    </li>
                `).join('')}
            </ul>
        `;
        historyList.appendChild(historyItem);
    });
}

function unlockEmblem() {
    let emblemKey = '';
    if (correctAnswersCount === 2) emblemKey = 'bronze';
    else if (correctAnswersCount === 4) emblemKey = 'silver';
    else if (correctAnswersCount === 6) emblemKey = 'gold';
    else if (correctAnswersCount === 10) emblemKey = 'diamond';
    else if (correctAnswersCount === 15) emblemKey = 'master';
    else if (correctAnswersCount === 20) emblemKey = 'legend';

    if (emblemKey && !userEmblems.includes(emblemKey)) {
        userEmblems.push(emblemKey);
        localStorage.setItem('userEmblems', JSON.stringify(userEmblems));
        alert(`Parabéns! Você desbloqueou um novo emblema: ${emblems[emblemKey].name}!`);
    }
}

function showEmblemAlbum() {
    showScreen('emblem-album');
    const emblemContainer = document.getElementById('emblem-container');
    emblemContainer.innerHTML = '';
    Object.keys(emblems).forEach(key => {
        const emblem = emblems[key];
        const unlocked = userEmblems.includes(key);
        const emblemCard = document.createElement('div');
        emblemCard.classList.add('emblem-card');
        emblemCard.innerHTML = `
            <img src="${unlocked ? emblem.path : 'https://i.ibb.co/mD41VfW/locked.png'}" 
                 alt="${unlocked ? emblem.name : 'Emblema Bloqueado'}"
                 class="${unlocked ? '' : 'locked-emblem'}">
            <h3>${unlocked ? emblem.name : 'Emblema Bloqueado'}</h3>
            <p>${unlocked ? emblem.description : 'Jogue mais para desbloquear!'}</p>
        `;
        emblemContainer.appendChild(emblemCard);
    });
}

// Inicializa a tela inicial quando a página é carregada
document.addEventListener('DOMContentLoaded', showStartScreen);