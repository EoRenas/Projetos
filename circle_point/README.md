Resumo do Projeto
Esta aplicação React, desenvolvida em TypeScript, permite que o usuário crie círculos vermelhos na tela ao clicar em uma área definida. Cada clique captura as coordenadas (clientX e clientY) e renderiza um círculo nessa posição. Além disso, o projeto implementa funcionalidades de Undo e Redo:

Undo: Remove o último círculo adicionado e o armazena para possível restauração.
Redo: Restaura o último círculo removido, adicionando-o de volta à tela.
Tecnologias e Conceitos Utilizados
React & JSX: Criação de componentes funcionais e renderização dinâmica dos elementos.
TypeScript: Tipagem estática, incluindo definição de interfaces para as propriedades dos cliques.
useState: Gerenciamento do estado para armazenar os pontos clicados e os pontos desfeitos.
Manipulação de Eventos: Uso de eventos do mouse para capturar as coordenadas dos cliques.
Implementação de Undo/Redo: Lógica de manipulação de arrays (pilhas) para reverter e restaurar ações.
Este projeto serve como um ótimo exemplo para aprender a integrar TypeScript com React, gerenciar estados e implementar funcionalidades de desfazer/refazer ações de forma simples e eficaz.







