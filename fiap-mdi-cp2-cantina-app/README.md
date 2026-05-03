# Bem Vindo(a) a Cantina-Virtual! 👋




## Integrantes do grupo:

- Ali Andrea Mamani Molle - 558052
- Guilherme Linard F.R Gozzi - 555768
- Lucas Vasquez Silva - 555159

# Sobre:

## Nome:

- Cantina Virtual FIAP

## Problema Escolhido:

- Fila e Incerteza na Cantina:
- Durante os dias de aula na FIAP, o tempo de intervalo é de apenas 15 minutos, o que gera grandes filas nas cantinas devido ao alto número de alunos. Muitas vezes, apenas a espera já consome metade ou todo o intervalo, obrigando os alunos a procurarem alternativas fora da faculdade, podendo causar atrasos para a aula seguinte.
- O aplicativo **Cantina Virtual FIAP** foi desenvolvido para solucionar esse problema, permitindo que os alunos visualizem o cardápio e realizem pedidos antecipadamente, reduzindo filas e otimizando o tempo de intervalo.




## Funcionalidades: 

- Visualizar o cardapio
- Adicionar produtos no carrinho
- Escolher forma de pagamento
- Pagar na hora
- Reservar pedido para pagamento presencial

# Como Rodar o Projeto:
## Pré-requisitos:
- Node.js
- Expo Go (Celular ou Emulador)
- Android Studio (Para emulador Android)
- Git (Opcional)
- Visual Studio Code (Opcional)

## Passo a Passo
1. Clonar o repositório

   ```bash
   git clone https://github.com/linard07/fiap-mdi-cp1-cantina-app.git
   ```

2. Entrar na pasta do projeto

   ```bash
   cd fiap-mdi-cp1-cantina-app
   ```
3. Instalar as dependências

   ```bash
   npm install
   ```

4. Iniciar o projeto

   ```bash
   npx expo start
   ```

5. Abrir no emulador Android

   ```bash
   Abra o Android Studio
   Inicie o emulador
   Pressione a no terminal
   ```

6. Abrir no Expo go
      ```bash
   Escanear o QR code gerado pelo celular
   ```

# Demonstração

https://youtube.com/shorts/PiSrS57ieDY?feature=share


# Decisões Técnicas:

## Estrutura do Projeto

O projeto foi estruturado separando as telas dentro da pasta "screens", facilitando a organização e manutenção do código.

Estrutura principal:

- App.js → Responsável pela navegação entre as telas
- screens/
  - HomeScreen.js → Tela inicial
  - MenuScreen.js → Tela de cardápio
  - CartScreen.js → Tela de carrinho

---

## Hooks Utilizados

Durante o desenvolvimento foram utilizados os seguintes hooks do React:

- useState → Utilizado para gerenciar estados como lista de produtos e carrinho de compras
- useState foi utilizado nas telas:
  - MenuScreen → Armazenar lista de produtos
  - CartScreen → Armazenar itens do carrinho
 
---

## Tecnologias Utilizadas

- React Native
- Expo
- React Navigation
- JavaScript


---

## Navegação

A navegação foi implementada utilizando React Navigation com Native Stack Navigator.

Foram criadas três telas principais:

- Home → Tela inicial do aplicativo
- Menu → Tela de visualização do cardápio
- Cart → Tela de carrinho de compras

A navegação foi configurada no arquivo App.js utilizando NavigationContainer e createNativeStackNavigator, permitindo a transição entre as telas do aplicativo.

Além disso, foram utilizados parâmetros de navegação para enviar dados entre as telas, como o envio do produto selecionado da tela Menu para a tela Cart.



# Próximos Passos:
- Melhorar a forma de organização do cardápio
- Implementar mais formas de pagamento
- Sistema de login com o perfil do aluno
- Implementar maneira de escolher mais de um item por vez
- Implementar histórico de compras
   



