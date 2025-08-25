let currentLevel = 0;
let totalQuestions = 0;
let currentLevelsArray = [];
let allLevelsArray = [];
let canCheck = true;
let score = 0;
let userName = 'Anônimo';
let currentDifficulty = '';
let gameHistory = JSON.parse(localStorage.getItem('gameHistory')) || [];
let currentAnswersHistory = [];
let correctAnswersCount = 0;
let userEmblems = JSON.parse(localStorage.getItem('userEmblems')) || [];
let incorrectAttempts = 0; // Novo contador de tentativas incorretas

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
        explanation: 'A tag <p> é utilizada para definir um parágrafo. O fechamento da tag é </p>.'
    },
    {
        title: 'Questão 3: Link Externo',
        description: 'Complete a tag para criar um link.',
        code: '<____ href="https://www.google.com">Google</a>',
        answer: ['a'],
        explanation: 'A tag <a> é usada para criar um hiperlink. O atributo href especifica o URL de destino do link.'
    },
    {
        title: 'Questão 4: Imagem',
        description: 'Complete a tag para exibir a imagem.',
        code: '<____ src="logo.png" alt="Logo da Empresa">',
        answer: ['img'],
        explanation: 'A tag <img> é usada para incorporar uma imagem em uma página HTML. O atributo src especifica o caminho da imagem.'
    },
    {
        title: 'Questão 5: Título de Nível 1',
        description: 'Complete a tag para criar o título principal de uma página.',
        code: '<____>Título da Página</h1>',
        answer: ['h1'],
        explanation: 'A tag <h1> é a mais importante para títulos e cabeçalhos, representando o título principal de um documento.'
    },
    {
        title: 'Questão 6: Adicionando Ícone',
        description: 'Complete a tag para adicionar um ícone a uma página, referenciando o arquivo "calc.png".',
        code: '<link rel="icon" type="icon/png" href="img/____">',
        answer: ['calc.png'],
        explanation: 'A tag <link> com o atributo rel="icon" é usada para adicionar um ícone à aba do navegador.'
    },
    {
        title: 'Questão 7: Conectando CSS',
        description: 'Complete a tag para conectar um arquivo CSS.',
        code: '<____ rel="stylesheet" href="css/style.css">',
        answer: ['link'],
        explanation: 'A tag <link> é usada para vincular um arquivo CSS externo ao documento HTML.'
    },
    {
        title: 'Questão 8: Estilizando uma classe',
        description: 'Complete o seletor CSS para aplicar um estilo a todos os elementos.',
        code: '_img-perfil { border: 2px solid black; }',
        answer: ['.img'],
        explanation: 'O ponto (.) é usado em CSS para selecionar elementos pela sua classe.'
    },
    {
        title: 'Questão 9: Borda Arredondada',
        description: 'Complete a propriedade CSS para fazer uma borda com cantos arredondados.',
        code: '.img-perfil { ____: 50%; }',
        answer: ['border-radius'],
        explanation: 'A propriedade border-radius é usada para arredondar os cantos das bordas de um elemento.'
    },
    {
        title: 'Questão 10: Adicionando fonte externa',
        description: 'Complete o link para adicionar uma fonte externa do Google Fonts.',
        code: '<link href="____.com/css2?family=Roboto&display=swap" rel="stylesheet">',
        answer: ['google'],
        explanation: 'A tag <link> com o atributo href é usada para carregar fontes externas de serviços como o Google Fonts.'
    },
    {
        title: 'Questão 11: Tag de Tabela',
        description: 'Qual a tag de fechamento para a criação de uma tabela? `<table>...`',
        code: 'A tag é <`____`>',
        answer: ['/table'],
        explanation: 'A tag `<table>` é usada para criar uma tabela e a tag de fechamento é `</table>`.'
    },
    {
        title: 'Questão 12: Tag de Linha de Tabela',
        description: 'Qual a tag usada para criar uma linha em uma tabela?',
        code: 'A tag é <`____`>',
        answer: ['tr'],
        explanation: 'A tag `<tr>` (table row) é usada para criar uma linha em uma tabela.'
    },
    {
        title: 'Questão 13: Tag de Célula de Tabela',
        description: 'Qual a tag usada para criar uma célula de dados em uma linha de tabela?',
        code: 'A tag é <`____`>',
        answer: ['td'],
        explanation: 'A tag `<td>` (table data) é usada para criar uma célula de dados dentro de uma linha.'
    },
    {
        title: 'Questão 14: Tag de Formulário',
        description: 'Qual a tag usada para criar um formulário para coletar dados do usuário?',
        code: 'A tag é <`____`>',
        answer: ['form'],
        explanation: 'A tag `<form>` é usada para criar um formulário HTML.'
    },
    {
        title: 'Questão 15: Entrada de Texto',
        description: 'Complete a tag para criar uma caixa de entrada de texto.',
        code: '<input type="____">',
        answer: ['text'],
        explanation: 'O atributo `type="text"` na tag `<input>` cria uma caixa de texto simples.'
    },
    {
        title: 'Questão 16: Input',
        description: 'Complete o atributo para adicionar um texto de dica dentro de um campo de entrada.',
        code: '<input type="text" ____="Digite seu nome">',
        answer: ['placeholder'],
        explanation: 'O atributo `placeholder` adiciona um texto de dica dentro de um campo de entrada.'
    },
    {
        title: 'Questão 17: Seletor de ID',
        description: 'Complete o seletor CSS para estilizar um elemento com o ID.',
        code: '_main-title { color: blue; }',
        answer: ['#'],
        explanation: 'O sinal de cerquilha (#) é usado em CSS para selecionar um elemento pelo seu ID.'
    },
    {
        title: 'Questão 18: Seletor de Atributo',
        description: 'Complete o seletor CSS para estilizar todos os `input` com o tipo `text`.',
        code: 'input[____="text"] { color: green; }',
        answer: ['type'],
        explanation: 'Seletores de atributo permitem selecionar elementos com base em seus atributos e valores.'
    },
    {
        title: 'Questão 19: Propriedade de Cor de Fundo',
        description: 'Complete a propriedade CSS para definir a cor de fundo de um elemento.',
        code: 'body { ____: #f0f0f0; }',
        answer: ['background-color'],
        explanation: 'A propriedade `background-color` é usada para definir a cor de fundo de um elemento.'
    },
    {
        title: 'Questão 20: Pseudoclasse',
        description: 'Complete a pseudoclasse para estilizar um botão quando o mouse está sobre ele.',
        code: 'button:___ { background-color: #555; }',
        answer: ['hover'],
        explanation: 'A pseudoclasse `:hover` é ativada quando o usuário passa o mouse sobre o elemento.'
    }
];

const mediumLevels = [
    {
        title: 'Questão 1: Tag de Script',
        description: 'Complete a tag para incluir um arquivo JavaScript chamado "script.js".',
        code: '<____ src="js/script.js"></script>',
        answer: ['script'],
        explanation: 'A tag <script> é usada para incorporar ou referenciar um script executável. O atributo src é usado para ligar a um arquivo de script externo.'
    },
    {
        title: 'Questão 2: Variável',
        description: 'Qual a palavra-chave usada para declarar uma variável que pode ter seu valor alterado?',
        code: 'A palavra-chave é ____',
        answer: ['let'],
        explanation: 'A palavra-chave `let` é usada para declarar uma variável cujo valor pode ser alterado.'
    },
    {
        title: 'Questão 3: Variável',
        description: 'Qual a palavra-chave usada para declarar uma variável cujo valor é fixo e não pode ser alterado?',
        code: 'A palavra-chave é ____',
        answer: ['const'],
        explanation: 'A palavra-chave `const` cria uma variável cujo valor é fixo e não pode ser alterado.'
    },
    {
        title: 'Questão 4: Obtendo um elemento por ID',
        description: 'Complete o código para obter um elemento HTML com o ID.',
        code: 'document.____("lblMensagem")',
        answer: ['getElementById'],
        explanation: 'O método `document.getElementById()` é usado para retornar o elemento que tem o atributo `ID` com o valor especificado.'
    },
    {
        title: 'Questão 5: Alterando conteúdo de um elemento',
        description: 'Complete o código para alterar o texto interno de um elemento para "Olá, mundo!".',
        code: 'elemento.____ = "Olá, mundo!";',
        answer: ['innerText'],
        explanation: 'A propriedade `innerText` é usada para definir ou retornar o conteúdo de texto visível de um nó.'
    },
    {
        title: 'Questão 6: Operador de Soma e Atribuição',
        description: 'Complete o operador para somar 5 ao valor atual da variável `pontuacao`.',
        code: 'pontuacao = 10; pontuacao ____ 5;',
        answer: ['+= '],
        explanation: 'O operador `+=` recebe o próprio valor e soma o novo valor.'
    },
    {
        title: 'Questão 7: Operador de Subtração e Atribuição',
        description: 'Complete o operador para subtrair 10 do valor atual da variável `saldo`.',
        code: 'saldo = 100; saldo ____ 10;',
        answer: ['-= '],
        explanation: 'O operador `-=` recebe o próprio valor e subtrai o novo valor.'
    },
    {
        title: 'Questão 8: Operador de Multiplicação e Atribuição',
        description: 'Complete o operador para multiplicar por 2 o valor atual da variável `total`.',
        code: 'total ____ 2;',
        answer: ['*= '],
        explanation: 'O operador `*=` recebe o próprio valor e multiplica pelo novo valor.'
    },
    {
        title: 'Questão 9: Operador de Divisão e Atribuição',
        description: 'Complete o operador para dividir por 4 o valor atual da variável `pontos`.',
        code: 'pontos ____ 4;',
        answer: ['/= '],
        explanation: 'O operador `/=` recebe o próprio valor e divide pelo novo valor.'
    },
    {
        title: 'Questão 10: Estrutura `if/else`',
        description: 'Complete a palavra-chave para iniciar a condição de negação em uma estrutura condicional.',
        code: 'if (idade > 18) { ... } ____ { ... }',
        answer: ['else'],
        explanation: 'A palavra-chave `else` é usada para executar um bloco de código se a condição `if` for falsa.'
    },
    {
        title: 'Questão 11: Declaração de String',
        description: 'Qual a maneira correta de declarar uma string em JavaScript com aspas duplas?',
        code: 'const nome = ____ "Ana";',
        answer: ['""'],
        explanation: 'Strings em JavaScript são textos escritos entre aspas duplas ou simples.'
    },
    {
        title: 'Questão 12: Declaração de String com Aspas Simples',
        description: 'Qual a maneira correta de declarar uma string em JavaScript com aspas simples?',
        code: 'const nome = ____ "João";',
        answer: ["''"],
        explanation: 'Strings em JavaScript podem ser escritas entre aspas simples.'
    },
    {
        title: 'Questão 13: Comentário de uma linha',
        description: 'Complete a sintaxe para criar um comentário de uma linha em JavaScript.',
        code: '____ Este é um comentário',
        answer: ['//'],
        explanation: 'Em JavaScript, `//` é usado para criar um comentário de uma única linha.'
    },
    {
        title: 'Questão 14: Comentário de múltiplas linhas',
        description: 'Complete a sintaxe para criar um comentário de múltiplas linhas em JavaScript.',
        code: '____\nEste é um comentário\nde múltiplas linhas\n____',
        answer: ['/*', '*/'],
        explanation: 'Em JavaScript, `/* ... */` é usado para criar um comentário de múltiplas linhas.'
    },
    {
        title: 'Questão 15: Função com Parâmetros',
        description: 'Complete a função para aceitar os parâmetros `a` e `b`.',
        code: 'function somar(____, ____) { ... }',
        answer: ['a', 'b'],
        explanation: 'Parâmetros são valores nomeados que uma função espera receber.'
    },
    {
        title: 'Questão 16: Retorno de uma Função',
        description: 'Complete a palavra-chave para que uma função retorne um valor.',
        code: 'function somar(a, b) { ____ a + b; }',
        answer: ['return'],
        explanation: 'A palavra-chave `return` é usada para especificar o valor que uma função deve retornar.'
    },
    {
        title: 'Questão 17: Variável `var`',
        description: 'Qual a palavra-chave mais antiga e que permite a redeclaração de variáveis?',
        code: 'A palavra-chave é ____',
        answer: ['var'],
        explanation: 'O tipo `var` é o mais antigo e permite que variáveis sejam redeclaradas.'
    },
    {
        title: 'Questão 18: Estrutura `switch`',
        description: 'Complete a palavra-chave para verificar um caso em uma estrutura `switch`.',
        code: 'switch (operador) {\n  ____ "+":\n    ... }',
        answer: ['case'],
        explanation: 'A palavra-chave `case` é usada para definir os diferentes casos a serem verificados em uma estrutura `switch`.'
    },
    {
        title: 'Questão 19: Saída no Console',
        description: 'Complete o código para exibir a mensagem "Olá!" no console do navegador.',
        code: '____.log("Olá!");',
        answer: ['console'],
        explanation: 'O método `console.log()` é usado para exibir dados no console do navegador.'
    },
    {
        title: 'Questão 20: Ponto e vírgula',
        description: 'Qual caractere é usado para separar as instruções em JavaScript?',
        code: 'O caractere é `____`',
        answer: [';'],
        explanation: 'O ponto e vírgula é usado para separar as instruções em JavaScript.'
    }
];

const hardLevels = [
    {
        title: 'Questão 1: DOM',
        description: 'Qual o acrônimo para "Modelo de Objeto de Documento"?',
        code: 'O acrônimo é ____',
        answer: ['DOM'],
        explanation: 'DOM é a sigla para Document Object Model.'
    },
    {
        title: 'Questão 2: DOM como estrutura de árvore',
        description: 'O DOM representa um documento HTML como qual tipo de estrutura?',
        code: 'O DOM representa um documento como uma estrutura de ____',
        answer: ['árvore'],
        explanation: 'O DOM organiza a estrutura de uma página web em um formato de árvore.'
    },
    {
        title: 'Questão 3: Finalidade do DOM',
        description: 'O DOM permite aos desenvolvedores acessar, modificar e interagir com os elementos da página web usando o ____.',
        code: 'O DOM permite a interação com o ____',
        answer: ['JavaScript'],
        explanation: 'O DOM permite que os desenvolvedores usem JavaScript para manipular a página dinamicamente.'
    },
    {
        title: 'Questão 4: Funções do DOM',
        description: 'O DOM permite que o JavaScript possa ____, remover ou editar conteúdo, alterar estilos e reagir a eventos do usuário.',
        code: 'O JavaScript pode ____ conteúdo',
        answer: ['adicionar'],
        explanation: 'O DOM permite que os desenvolvedores usem JavaScript para adicionar, remover ou editar conteúdo.'
    },
    {
        title: 'Questão 5: Exibição com `document.write`',
        description: 'Qual método JavaScript é usado para escrever na saída HTML?',
        code: 'O método é `document.____()`',
        answer: ['write'],
        explanation: 'O método `document.write()` é usado para escrever na saída HTML.'
    },
    {
        title: 'Questão 6: Exibição com `innerHTML`',
        description: 'Qual propriedade é usada para escrever em um elemento HTML, incluindo o HTML dentro dele?',
        code: 'A propriedade é `____`',
        answer: ['innerHTML'],
        explanation: 'A propriedade `innerHTML` é usada para escrever em um elemento HTML.'
    },
    {
        title: 'Questão 7: Caixa de Alerta',
        description: 'Qual método é usado para exibir dados em uma caixa de alerta?',
        code: 'O método é `window.____()`',
        answer: ['alert'],
        explanation: 'O método `window.alert()` é usado para exibir dados em uma caixa de alerta.'
    },
    {
        title: 'Questão 8: `let` vs `const`',
        description: 'Variáveis definidas com `let` podem ser redeclaradas? (sim/não)',
        code: 'Elas ____ podem ser redeclaradas',
        answer: ['não'],
        explanation: 'Variáveis definidas com `let` não podem ser redeclaradas.'
    },
    {
        title: 'Questão 9: Imutabilidade de `const`',
        description: 'O valor de uma variável `const` é imutável? (sim/não)',
        code: 'O valor ____ é imutável, apenas a variável não pode ser alterada',
        answer: ['não'],
        explanation: 'Uma variável `const` não pode ser alterada ou retribuída, mas seu valor pode não ser imutável.'
    },
    {
        title: 'Questão 10: Estrutura `switch`',
        description: 'Qual palavra-chave encerra a execução de um caso em um `switch`?',
        code: 'A palavra-chave é `____`',
        answer: ['break'],
        explanation: 'A palavra-chave `break` é usada para sair da estrutura `switch` após um caso ser executado.'
    },
    {
        title: 'Questão 11: `switch` sem `break`',
        description: 'Se um `break` for omitido em um `switch`, qual será o comportamento?',
        code: 'A execução continuará para o ____ caso',
        answer: ['próximo'],
        explanation: 'Se o `break` for omitido, a execução "cairá" para o próximo `case`.'
    },
    {
        title: 'Questão 12: `switch` `default`',
        description: 'Qual palavra-chave é usada para definir o código a ser executado se nenhum dos casos corresponder?',
        code: 'A palavra-chave é `____`',
        answer: ['default'],
        explanation: 'A palavra-chave `default` define o bloco de código que será executado se nenhum `case` for encontrado.'
    },
    {
        title: 'Questão 13: Funções do `switch`',
        description: 'A função `Calcular` do documento usa uma estrutura `switch` para qual finalidade?',
        code: 'Para selecionar o ____ matemático',
        answer: ['operador'],
        explanation: 'O `switch` na função `Calcular` é usado para selecionar a operação matemática a ser executada com base no valor do operador.'
    },
    {
        title: 'Questão 14: JavaScript `case sensitive`',
        description: 'O JavaScript é sensível a letras maiúsculas e minúsculas? (sim/não)',
        code: 'O JavaScript é ____ `case sensitive`',
        answer: ['sim'],
        explanation: 'O JavaScript é uma linguagem case sensitive.'
    },
    {
        title: 'Questão 15: Tipo de Variável Antigo',
        description: 'Qual é o tipo de variável mais antigo em JavaScript?',
        code: 'O tipo é `____`',
        answer: ['var'],
        explanation: 'O tipo de variável `var` é o mais antigo em JavaScript.'
    },
    {
        title: 'Questão 16: Onde inserir JavaScript',
        description: 'Onde é recomendado inserir o JavaScript em uma página HTML para um carregamento mais rápido?',
        code: 'No final do `____`',
        answer: ['body'],
        explanation: 'É recomendável adicionar o script ao final do `<body>` para que o site carregue mais rápido.'
    },
    {
        title: 'Questão 17: Padrão de Arquitetura',
        description: 'Qual padrão de arquitetura de software divide uma aplicação em Modelo, Visão e Controlador?',
        code: 'O padrão é `____`',
        answer: ['MVC'],
        explanation: 'MVC (Modelo-Visão-Controlador) é um padrão de arquitetura de software que divide a aplicação em três partes.'
    },
    {
        title: 'Questão 18: Função do Modelo (MVC)',
        description: 'No padrão MVC, qual componente é responsável por manipular e acessar os dados da aplicação?',
        code: 'O componente é o `____`',
        answer: ['Modelo'],
        explanation: 'O Modelo representa os dados da aplicação e é responsável por manipular e acessar dados.'
    },
    {
        title: 'Questão 19: Função da Visão (MVC)',
        description: 'No padrão MVC, qual componente é a interface do usuário, responsável por exibir informações?',
        code: 'O componente é a `____`',
        answer: ['Visão'],
        explanation: 'A Visão é a interface do usuário, responsável por apresentar informações.'
    },
    {
        title: 'Questão 20: Função do Controlador (MVC)',
        description: 'No padrão MVC, qual componente atua como intermediário entre o Modelo e a Visão, processando as requisições do usuário?',
        code: 'O componente é o `____`',
        answer: ['Controlador'],
        explanation: 'O Controlador age como um intermediário entre o Modelo e a Visão, processando as requisições do usuário.'
    }
];

const proLevels = [
    {
        title: 'Questão 1: `switch` com `break`',
        description: 'No código da calculadora, o que o `break` faz no `case "+":`?',
        code: 'Ele ____ o `switch` após a operação ser concluída',
        answer: ['encerra'],
        explanation: 'O `break` encerra a execução do `switch` para que o código não continue para o próximo `case`.'
    },
    {
        title: 'Questão 2: Raiz Quadrada',
        description: 'No código da calculadora, como a raiz quadrada é calculada?',
        code: 'Com o operador `____`',
        answer: ['**1/2'],
        explanation: 'A raiz quadrada é calculada usando o operador de exponenciação com o expoente 1/2.'
    },
    {
        title: 'Questão 3: Erro de Divisão',
        description: 'No código da calculadora, qual é a mensagem de erro se a divisão for por zero?',
        code: 'A mensagem é "____: não é possivel dividir por zero!"',
        answer: ['Erro'],
        explanation: 'A mensagem de erro para divisão por zero é "Erro: não é possivel dividir por zero!".'
    },
    {
        title: 'Questão 4: Funções `parseFloat`',
        description: 'O que a função `parseFloat()` faz no código da calculadora?',
        code: 'Ela converte um valor de `____` para um número de ponto flutuante',
        answer: ['string'],
        explanation: 'A função `parseFloat()` analisa um argumento string e retorna um número de ponto flutuante.'
    },
    {
        title: 'Questão 5: Obtendo Valor de Input',
        description: 'No código da calculadora, qual propriedade é usada para obter o valor de um campo de entrada (input)?',
        code: 'A propriedade é `.____`',
        answer: ['value'],
        explanation: 'A propriedade `.value` é usada para obter o valor de um elemento de formulário, como um `<input>`.'
    },
    {
        title: 'Questão 6: `onclick` no HTML',
        description: 'No documento, o que o atributo `onclick` em um botão faz?',
        code: 'Ele chama uma ____ do JavaScript quando o botão é clicado',
        answer: ['função'],
        explanation: 'O atributo `onclick` é usado para executar código JavaScript quando o elemento é clicado.'
    },
    {
        title: 'Questão 7: Ordem de Prioridade',
        description: 'No JavaScript, qual é a ordem de prioridade na linha do código?',
        code: 'O JavaScript dá a prioridade para o que está na ____ do código',
        answer: ['linha'],
        explanation: 'O JavaScript dá prioridade para o que está na linha do código.'
    },
    {
        title: 'Questão 8: `if` com `includes`',
        description: 'No código da lâmpada, o que o método `src.includes(\'aces\')` verifica?',
        code: 'Verifica se a string "aces" está ____ na URL da imagem',
        answer: ['incluída'],
        explanation: 'O método `.includes()` verifica se uma string contém uma substring.'
    },
    {
        title: 'Questão 9: `if/else` da lâmpada',
        description: 'No código da lâmpada, se a URL da imagem contiver "aces", para qual imagem ela muda?',
        code: 'Ela muda para `img/lampada-____.avif`',
        answer: ['apag'],
        explanation: 'A lógica `if` muda a imagem para `lampada-apag.avif` se a string "aces" for encontrada na URL.'
    },
    {
        title: 'Questão 10: `getElementById` e `innerText`',
        description: 'Qual trecho de código é usado para mudar o texto interno de um elemento com um ID específico?',
        code: '`document.____(\'ID\').innerText=\'texto\'`',
        answer: ['getElementById'],
        explanation: '`document.getElementById()` é usado para selecionar um elemento e `.innerText` para mudar o texto.'
    },
    {
        title: 'Questão 11: Mudar Imagem com JavaScript',
        description: 'No código da Serena e da Blair, qual propriedade é usada para mudar a imagem exibida?',
        code: 'A propriedade é `.____`',
        answer: ['src'],
        explanation: 'A propriedade `.src` de um elemento `<img>` é usada para definir a fonte (source) da imagem.'
    },
    {
        title: 'Questão 12: `addEventListener`',
        description: 'No código da calculadora, o que o `addEventListener` faz?',
        code: 'Ele adiciona um ____ de clique a um elemento',
        answer: ['evento'],
        explanation: 'O método `addEventListener` anexa um manipulador de eventos a um elemento.'
    },
    {
        title: 'Questão 13: MVC Antigo vs. Atual',
        description: 'Qual é a principal diferença entre o padrão MVC antigo e o atual?',
        code: 'No MVC atual é possível a ligação direta entre o ____ e a ____',
        answer: ['Modelo', 'Visão'],
        explanation: 'No MVC atual é possível a ligação entre o Modelo e a Visão, o que não era possível no antigo.'
    },
    {
        title: 'Questão 14: Vantagem do MVC',
        description: 'Uma das vantagens do MVC é a separação de preocupações. O que isso facilita?',
        code: 'Facilita a ____ e o desenvolvimento',
        answer: ['manutenção'],
        explanation: 'A separação de preocupações no MVC facilita a manutenção e o desenvolvimento da aplicação.'
    },
    {
        title: 'Questão 15: Desvantagem do MVC',
        description: 'Qual é uma desvantagem do MVC em aplicações pequenas?',
        code: 'Pode adicionar ____ desnecessária',
        answer: ['complexidade'],
        explanation: 'Em aplicações pequenas, o MVC pode adicionar complexidade desnecessária.'
    },
    {
        title: 'Questão 16: `const` e atribuição',
        description: 'Uma variável `const` deve receber um valor quando é declarada? (sim/não)',
        code: 'Ela ____ receber um valor',
        answer: ['deve'],
        explanation: 'Variáveis `const` devem receber um valor quando são declaradas.'
    },
    {
        title: 'Questão 17: Ponto de Entrada do DOM',
        description: 'No diagrama do DOM, qual é o elemento raiz, superior a todos os outros?',
        code: 'O elemento é o `<____>`',
        answer: ['html'],
        explanation: 'O elemento `<html`>` é o elemento raiz no diagrama do DOM.'
    },
    {
        title: 'Questão 18: `switch` com `default`',
        description: 'No código da calculadora, o que acontece se o `operador` não for "+", "-", "*" ou "/"?',
        code: 'A execução vai para o `____`',
        answer: ['default'],
        explanation: 'O `default` no `switch` da calculadora trata o caso em que o operador não corresponde a nenhum dos `cases`.'
    },
    {
        title: 'Questão 19: Propriedade `id`',
        description: 'Qual atributo é usado para dar um identificador único a um elemento HTML?',
        code: 'O atributo é `____`',
        answer: ['id'],
        explanation: 'O atributo `id` é usado para dar um identificador único a um elemento, que pode ser acessado com `getElementById`.'
    },
    {
        title: 'Questão 20: `parseInt`',
        description: 'Qual função é usada para converter um valor para um número inteiro?',
        code: 'A função é `____()`',
        answer: ['parseInt'],
        explanation: 'A função `parseInt()` analisa um argumento de string e retorna um número inteiro.'
    }
];

// Adicione este código no final do seu script.js
// Substitua o objeto emblems existente por este:

const emblems = {
    'bronze': { 
        name: 'Emblema Bronze', 
        icon: `
            <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="bronzeGrad" cx="30%" cy="30%">
                        <stop offset="0%" style="stop-color:#E6B887;stop-opacity:1" />
                        <stop offset="70%" style="stop-color:#CD7F32;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#8B4513;stop-opacity:1" />
                    </radialGradient>
                </defs>
                <circle cx="50" cy="50" r="45" fill="url(#bronzeGrad)" stroke="#5D4037" stroke-width="2"/>
                <text x="50" y="60" text-anchor="middle" fill="#FFF" font-size="36" font-weight="bold">3</text>
                <circle cx="50" cy="20" r="8" fill="#FFD700"/>
                <polygon points="50,15 52,21 58,21 53,25 55,31 50,27 45,31 47,25 42,21 48,21" fill="#FFD700"/>
            </svg>
        `,
        requirement: '5+ acertos' 
    },
    'silver': { 
        name: 'Emblema Prata', 
        icon: `
            <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="silverGrad" cx="30%" cy="30%">
                        <stop offset="0%" style="stop-color:#F5F5F5;stop-opacity:1" />
                        <stop offset="70%" style="stop-color:#C0C0C0;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#808080;stop-opacity:1" />
                    </radialGradient>
                </defs>
                <circle cx="50" cy="50" r="45" fill="url(#silverGrad)" stroke="#616161" stroke-width="2"/>
                <text x="50" y="60" text-anchor="middle" fill="#424242" font-size="36" font-weight="bold">2</text>
                <circle cx="50" cy="20" r="8" fill="#FFD700"/>
                <polygon points="50,15 52,21 58,21 53,25 55,31 50,27 45,31 47,25 42,21 48,21" fill="#FFD700"/>
            </svg>
        `,
        requirement: '10+ acertos' 
    },
    'gold': { 
        name: 'Emblema Ouro', 
        icon: `
            <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="goldGrad" cx="30%" cy="30%">
                        <stop offset="0%" style="stop-color:#FFF700;stop-opacity:1" />
                        <stop offset="70%" style="stop-color:#FFD700;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#DAA520;stop-opacity:1" />
                    </radialGradient>
                </defs>
                <circle cx="50" cy="50" r="45" fill="url(#goldGrad)" stroke="#B8860B" stroke-width="2"/>
                <text x="50" y="60" text-anchor="middle" fill="#8B4513" font-size="36" font-weight="bold">1</text>
                <circle cx="50" cy="20" r="8" fill="#FFD700"/>
                <polygon points="50,15 52,21 58,21 53,25 55,31 50,27 45,31 47,25 42,21 48,21" fill="#FF6B35"/>
                <circle cx="30" cy="30" r="3" fill="#FFD700" opacity="0.8"/>
                <circle cx="70" cy="30" r="3" fill="#FFD700" opacity="0.8"/>
                <circle cx="30" cy="70" r="3" fill="#FFD700" opacity="0.8"/>
                <circle cx="70" cy="70" r="3" fill="#FFD700" opacity="0.8"/>
            </svg>
        `,
        requirement: '15+ acertos' 
    },
    'platinum': { 
        name: 'Emblema Platina', 
        icon: `
            <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="platinumGrad" cx="30%" cy="30%">
                        <stop offset="0%" style="stop-color:#F0F0F0;stop-opacity:1" />
                        <stop offset="70%" style="stop-color:#E5E4E2;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#C0C0C0;stop-opacity:1" />
                    </radialGradient>
                </defs>
                <polygon points="50,5 62,35 95,35 70,55 82,85 50,65 18,85 30,55 5,35 38,35" 
                         fill="url(#platinumGrad)" stroke="#9E9E9E" stroke-width="2"/>
                <text x="50" y="55" text-anchor="middle" fill="#424242" font-size="20" font-weight="bold">PT</text>
                <circle cx="50" cy="25" r="4" fill="#6C63FF"/>
                <circle cx="35" cy="45" r="2" fill="#6C63FF" opacity="0.7"/>
                <circle cx="65" cy="45" r="2" fill="#6C63FF" opacity="0.7"/>
            </svg>
        `,
        requirement: '20+ acertos' 
    },
    'diamond': { 
        name: 'Emblema Diamante', 
        icon: `
            <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="diamondGrad" cx="30%" cy="30%">
                        <stop offset="0%" style="stop-color:#E3F2FD;stop-opacity:1" />
                        <stop offset="70%" style="stop-color:#B3E5FC;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#4FC3F7;stop-opacity:1" />
                    </radialGradient>
                    <filter id="sparkle">
                        <feGaussianBlur stdDeviation="2"/>
                        <feColorMatrix values="1 1 1 0 0  1 1 1 0 0  1 1 1 0 0  0 0 0 1 0"/>
                    </filter>
                </defs>
                <polygon points="50,10 70,30 60,70 40,70 30,30" 
                         fill="url(#diamondGrad)" stroke="#0277BD" stroke-width="2"/>
                <polygon points="50,15 65,30 57,60 43,60 35,30" 
                         fill="#E1F5FE" opacity="0.6"/>
                <text x="50" y="50" text-anchor="middle" fill="#0277BD" font-size="16" font-weight="bold">💎</text>
                <circle cx="35" cy="25" r="1.5" fill="#FFF" filter="url(#sparkle)"/>
                <circle cx="65" cy="35" r="1" fill="#FFF" filter="url(#sparkle)"/>
                <circle cx="45" cy="65" r="1" fill="#FFF" filter="url(#sparkle)"/>
            </svg>
        `,
        requirement: '25+ acertos' 
    },
    'master': { 
        name: 'Emblema Mestre', 
        icon: `
            <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="masterGrad" cx="30%" cy="30%">
                        <stop offset="0%" style="stop-color:#E1BEE7;stop-opacity:1" />
                        <stop offset="70%" style="stop-color:#9C27B0;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#4A148C;stop-opacity:1" />
                    </radialGradient>
                </defs>
                <!-- Crown base -->
                <polygon points="20,60 25,30 35,35 50,20 65,35 75,30 80,60 70,65 30,65" 
                         fill="url(#masterGrad)" stroke="#6A1B9A" stroke-width="2"/>
                <!-- Crown gems -->
                <circle cx="30" cy="45" r="4" fill="#FFD700"/>
                <circle cx="50" cy="35" r="5" fill="#FF1744"/>
                <circle cx="70" cy="45" r="4" fill="#00E676"/>
                <!-- Crown details -->
                <rect x="25" y="55" width="50" height="8" fill="#7B1FA2" rx="2"/>
                <text x="50" y="80" text-anchor="middle" fill="#9C27B0" font-size="12" font-weight="bold">MESTRE</text>
            </svg>
        `,
        requirement: '30+ acertos' 
    },
    'legend': { 
        name: 'Emblema Lendário', 
        icon: `
            <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="legendGrad" cx="30%" cy="30%">
                        <stop offset="0%" style="stop-color:#FFE0B2;stop-opacity:1" />
                        <stop offset="50%" style="stop-color:#FF6B35;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#D84315;stop-opacity:1" />
                    </radialGradient>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="3"/>
                        <feColorMatrix values="1 0.5 0 0 0  1 0.8 0 0 0  1 1 0 0 0  0 0 0 1 0"/>
                    </filter>
                </defs>
                <!-- Outer ring -->
                <circle cx="50" cy="50" r="45" fill="url(#legendGrad)" stroke="#BF360C" stroke-width="3"/>
                <!-- Star shape -->
                <polygon points="50,15 55,35 75,35 60,47 65,67 50,55 35,67 40,47 25,35 45,35" 
                         fill="#FFD700" stroke="#FF8F00" stroke-width="2"/>
                <!-- Inner star -->
                <polygon points="50,25 53,37 62,37 55,43 57,55 50,49 43,55 45,43 38,37 47,37" 
                         fill="#FFF" opacity="0.8"/>
                <!-- Legendary text -->
                <text x="50" y="85" text-anchor="middle" fill="#FFF" font-size="10" font-weight="bold">LENDA</text>
                <!-- Sparkle effects -->
                <circle cx="25" cy="25" r="2" fill="#FFD700" filter="url(#glow)" opacity="0.8"/>
                <circle cx="75" cy="25" r="1.5" fill="#FFD700" filter="url(#glow)" opacity="0.6"/>
                <circle cx="75" cy="75" r="2" fill="#FFD700" filter="url(#glow)" opacity="0.8"/>
                <circle cx="25" cy="75" r="1.5" fill="#FFD700" filter="url(#glow)" opacity="0.6"/>
            </svg>
        `,
        requirement: '35+ acertos' 
    }
};

function showScreen(screenId) {
    const screens = ['start-screen', 'name-screen', 'difficulty-screen', 'game-container', 'end-screen', 'history-screen', 'emblem-album'];
    screens.forEach(id => {
        const screen = document.getElementById(id);
        if (screen) {
            screen.classList.add('hidden');
        }
    });
    const selectedScreen = document.getElementById(screenId);
    if (selectedScreen) {
        selectedScreen.classList.remove('hidden');
    }
}

function playAnonymously() {
    showDifficultyScreen();
}

function showNameInput() {
    showScreen('name-screen');
    const usernameInput = document.getElementById('username-input');
    if (usernameInput) usernameInput.focus();
}

function setNameAndShowDifficulty() {
    const input = document.getElementById('username-input').value.trim();
    const feedback = document.getElementById('name-feedback');
    if (input.length > 2) {
        userName = input;
        feedback.textContent = '';
        showDifficultyScreen();
    } else {
        feedback.textContent = 'Nome deve ter pelo menos 3 caracteres.';
    }
}

function showStartScreen() {
    showScreen('start-screen');
}

function showDifficultyScreen() {
    showScreen('difficulty-screen');
}

function startGame(difficulty) {
    currentDifficulty = difficulty;
    let maxQuestions;
    switch (difficulty) {
        case 'facil':
            allLevelsArray = easyLevels;
            maxQuestions = easyLevels.length;
            break;
        case 'medio':
            allLevelsArray = mediumLevels;
            maxQuestions = mediumLevels.length;
            break;
        case 'dificil':
            allLevelsArray = hardLevels;
            maxQuestions = hardLevels.length;
            break;
        case 'especialista':
            allLevelsArray = proLevels;
            maxQuestions = proLevels.length;
            break;
    }
    const numQuestions = parseInt(document.getElementById('num-questions').value, 10);

    if (isNaN(numQuestions) || numQuestions < 1 || numQuestions > maxQuestions) {
        document.getElementById('num-questions-feedback').textContent = `Por favor, digite um número entre 1 e ${maxQuestions}.`;
        return;
    }

    totalQuestions = numQuestions;
    currentLevelsArray = getRandomQuestions(allLevelsArray, totalQuestions);

    currentAnswersHistory = [];
    correctAnswersCount = 0;
    score = 0;
    updateScoreDisplay();
    currentLevel = 0;
    showGameScreen();
}

function getRandomQuestions(array, num) {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
}

function showGameScreen() {
    showScreen('game-container');
    nextLevel();
}

function nextLevel() {
    if (currentLevel < totalQuestions) {
        const level = currentLevelsArray[currentLevel];
        document.getElementById('level-title').textContent = level.title;
        document.getElementById('level-description').textContent = level.description;
        document.getElementById('code-snippet').textContent = level.code;

        const answerInputsContainer = document.getElementById('answer-inputs-container');
        answerInputsContainer.innerHTML = '';
        level.answer.forEach((answer, index) => {
            const input = document.createElement('input');
            input.type = 'text';
            input.placeholder = 'Digite aqui';
            input.id = `answer-input-${index}`;
            input.classList.add('answer-input');
            answerInputsContainer.appendChild(input);
        });

        document.getElementById('feedback').textContent = '';
        document.getElementById('explanation').classList.add('hidden');
        document.getElementById('check-button').classList.remove('hidden');
        document.getElementById('next-button').classList.add('hidden');
        document.getElementById('skip-button').classList.add('hidden'); // Esconde o botão de pular

        canCheck = true;
        incorrectAttempts = 0; // Reseta o contador
        currentLevel++;
    } else {
        endGame();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Adiciona o event listener apenas no game-container
    const gameContainer = document.getElementById('game-container');
    gameContainer.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const checkButton = document.getElementById('check-button');
            const skipButton = document.getElementById('skip-button');
            const nextButton = document.getElementById('next-button');

            // Verifica qual botão está visível para determinar a ação
            if (checkButton && !checkButton.classList.contains('hidden')) {
                checkAnswer();
            } else if (nextButton && !nextButton.classList.contains('hidden')) {
                nextLevel();
            } else if (skipButton && !skipButton.classList.contains('hidden')) {
                skipLevel();
            }
        }
    });
});

function checkAnswer() {
    // ... código existente
    const level = currentLevelsArray[currentLevel - 1];
    const userAnswers = [];
    let isCorrect = true;

    for (let i = 0; i < level.answer.length; i++) {
        const input = document.getElementById(`answer-input-${i}`);
        const userAnswer = input.value.trim().toLowerCase();

        // Adiciona esta verificação para garantir que o campo não está vazio
        if (userAnswer === '') {
            isCorrect = false;
            break; // Sai do loop se um campo estiver vazio
        }

        userAnswers.push(userAnswer);

        const normalizedUserAnswer = userAnswer.replace(/[^a-z0-9]/g, '');
        const normalizedCorrectAnswer = level.answer[i].toLowerCase().replace(/[^a-z0-9]/g, '');

        if (normalizedUserAnswer !== normalizedCorrectAnswer) {
            isCorrect = false;
        }
    }

    const feedback = document.getElementById('feedback');
    const explanation = document.getElementById('explanation');

    if (isCorrect) {
        feedback.textContent = 'Correto! 🎉';
        feedback.style.color = '#28a745';
        score += 10;
        correctAnswersCount++;
        addAnswerToHistory(level.title, userAnswers, true);
        explanation.textContent = level.explanation;
        explanation.classList.remove('hidden');
        document.getElementById('check-button').classList.add('hidden');
        document.getElementById('skip-button').classList.add('hidden'); // Esconde o botão de pular ao acertar
        document.getElementById('next-button').classList.remove('hidden');
        canCheck = false;
    } else {
        incorrectAttempts++; // Incrementa o contador de erros
        feedback.textContent = `Incorreto. Tente novamente!`;
        feedback.style.color = '#dc3545';
        addAnswerToHistory(level.title, userAnswers, false);
        if (incorrectAttempts >= 2) { // Mostra o botão após 2 erros
            document.getElementById('skip-button').classList.remove('hidden');
        }
    }

    updateScoreDisplay();
}

function skipLevel() {
    const level = currentLevelsArray[currentLevel - 1];
    addAnswerToHistory(level.title, ['(Pulado)'], false);
    document.getElementById('feedback').textContent = `Resposta correta: ${level.answer.join(', ')}`;
    document.getElementById('feedback').style.color = '#ffc107';
    document.getElementById('explanation').textContent = level.explanation;
    document.getElementById('explanation').classList.remove('hidden');
    document.getElementById('check-button').classList.add('hidden');
    document.getElementById('skip-button').classList.add('hidden');
    document.getElementById('next-button').classList.remove('hidden');
    canCheck = false;
}

function addAnswerToHistory(questionTitle, userAnswers, isCorrect) {
    currentAnswersHistory.push({
        question: questionTitle,
        answers: userAnswers,
        correct: isCorrect
    });
}

function updateScoreDisplay() {
    document.getElementById('score-display').textContent = `Pontuação: ${score} (${correctAnswersCount}/${totalQuestions})`;
}

function endGame() {
    showScreen('end-screen');
    const endMessage = document.getElementById('end-message');
    const finalScore = document.getElementById('final-score');
    endMessage.textContent = `Parabéns, ${userName}!`;
    finalScore.textContent = `Sua pontuação final foi de ${score}.`;

    const newEntry = {
        name: userName,
        date: new Date().toLocaleString(),
        difficulty: currentDifficulty,
        score: score,
        correct: correctAnswersCount, // Adicione esta linha
        total: totalQuestions,       // Adicione esta linha
        answers: currentAnswersHistory
    };
    gameHistory.push(newEntry);
    localStorage.setItem('gameHistory', JSON.stringify(gameHistory));

    checkEmblems();
}

function resetGameState() {
    currentLevel = 0;
    score = 0;
    userName = 'Anônimo';
    currentDifficulty = '';
    currentAnswersHistory = [];
    correctAnswersCount = 0;
    incorrectAttempts = 0;
}

function showHistory() {
    showScreen('history-screen');
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';

    if (gameHistory.length === 0) {
        historyList.innerHTML = '<p>Nenhum histórico encontrado.</p>';
        return;
    }

    gameHistory.forEach((game, index) => {
        const historyItem = document.createElement('div');
        historyItem.classList.add('history-item');
        historyItem.innerHTML = `
            <div class="history-header">
                <h3>Jogo ${gameHistory.length - index}</h3>
                <span class="game-date">${game.date}</span>
            </div>
            <p><strong>Nome:</strong> ${game.name}</p>
            <p><strong>Nível:</strong> ${game.difficulty}</p>
            <p><strong>Pontuação:</strong> ${game.score} (${game.correct}/${game.total})</p>
            <h4>Respostas:</h4>
            <ul>
                ${game.answers.map(answer => `
                    <li class="history-question ${answer.correct ? 'correct' : 'incorrect'}">
                        <strong>${answer.question}:</strong> ${answer.answers.join(', ')}
                        <span class="history-details">(${answer.correct ? 'Correto' : 'Incorreto'})</span>
                    </li>
                `).join('')}
            </ul>
        `;
        historyList.appendChild(historyItem);
    });
}

function checkEmblems() {
    let emblemKey = null;

    if (correctAnswersCount >= 35) {
        emblemKey = 'legend';
    } else if (correctAnswersCount >= 30) {
        emblemKey = 'master';
    } else if (correctAnswersCount >= 25) {
        emblemKey = 'diamond';
    } else if (correctAnswersCount >= 20) {
        emblemKey = 'platinum';
    } else if (correctAnswersCount >= 15) {
        emblemKey = 'gold';
    } else if (correctAnswersCount >= 10) {
        emblemKey = 'silver';
    } else if (correctAnswersCount >= 5) {
        emblemKey = 'bronze';
    }

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
        
        let emblemContent;
        if (unlocked) {
            // Se o emblema tiver uma propriedade 'icon', exibe o SVG
            if (emblem.icon) {
                emblemContent = `
                    <div class="emblem-svg-container">${emblem.icon}</div>
                    <h3>${emblem.name}</h3>
                    <p>${emblem.requirement}</p>
                `;
            } else {
                // Caso contrário, usa a tag <img> com a URL da imagem
                emblemContent = `
                    <img src="${emblem.path}" alt="${emblem.name}">
                    <h3>${emblem.name}</h3>
                    <p>${emblem.requirement}</p>
                `;
            }
        } else {
            // Emblema bloqueado
            emblemContent = `
                <img src="https://i.ibb.co/mD41VfW/locked.png" alt="Emblema Bloqueado" class="locked-emblem">
                <h3>Emblema Bloqueado</h3>
                <p>Resolva mais perguntas para desbloquear</p>
            `;
        }

        emblemCard.innerHTML = emblemContent;
        emblemContainer.appendChild(emblemCard);
    });
}