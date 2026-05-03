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

### O que mudou:

- Foi Implementado um sistema de autenticação ultilizando AsyncStorage.
- Foi implementado duas novas telas nova (Tela de registro e Tela de login).
- Foi melhorado a tela de cardápio, colocando em prática um novo e melhorado design junto de uma barrra de pesquisa.
- Foi melhorado a tela de carrinho, agora estando com um design novo, opção de remover itens do carrinho e agora tendo uma nova mensagem de confirmação.
- Foi implementado o uso de Contexts.
  



## Funcionalidades: 

- Visualizar o cardapio.
- Adicionar e remover produtos no carrinho.
- Pesquisar por itens do cardápio
- Escolher forma de pagamento.
- Pagar na hora.
- Reservar pedido para pagamento presencial.
- Ver valor total da compra.
- Autenticação de usuario (cadastro e login).

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
   git clone https://github.com/AliAndrea1/fiap-mdi-cp2-cantina-app.git
   ```

2. Entrar na pasta do projeto

   ```bash
   cd fiap-mdi-cp2-cantina-app
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

https://www.youtube.com/shorts/2xerFegFgz4


## Tela de Login
<img width="250" height="550" alt="image" src="https://github.com/user-attachments/assets/f68142c4-4930-4304-b34d-440ad4fd8360" />

## Tela de Registro
<img width="250" height="550" alt="image" src="https://github.com/user-attachments/assets/1f055720-c9a6-4e61-9687-9df841aa2370" />

## Tela Inicial
<img width="250" height="550" alt="image" src="https://github.com/user-attachments/assets/16d24c8b-a1d1-4014-8f3b-005055e18e27" />

## Tela de Menu
<img width="250" height="550" alt="image" src="https://github.com/user-attachments/assets/99fb9a70-d4f7-46e6-9a1b-e56dc629412d" />

## Telas de Carrinho (Vazio, cheio, compra finalizada)
<img width="250" height="550" alt="image" src="https://github.com/user-attachments/assets/98fe9b37-944b-4a4c-a54c-116e1ee7ccfb" />
<img width="250" height="550" alt="image" src="https://github.com/user-attachments/assets/3f812213-fbe5-4cfd-b9f0-8ef1cd2f721c" />
<img width="250" height="550" alt="image" src="https://github.com/user-attachments/assets/75bcf4a0-8440-4588-bce2-25d258551f14" />


# Decisões Técnicas:

## Estrutura do Projeto

O projeto foi estruturado separando as telas dentro da pasta "screens", facilitando a organização e manutenção do código.

Estrutura principal:

- App.js → Responsável pela navegação entre as telas
- contexts/
  - AuthContext.js → Gerencia o que é relacionado à autenticaçào de usuário
  - CarthContext.js → Gerencia o estado do carrinho de compras
    
- screens/
  - HomeScreen.js → Tela inicial
  - MenuScreen.js → Tela de cardápio
  - CartScreen.js → Tela de carrinho
  - RegisterScreen.js → Tela de registro de usuario
  - LoginScreen.js → Tela de login de usuario

---
## Contexts Criados

*AuthContext*
Gerencia tudo relacionado à autenticação do usuário:
- user → objeto com nome e e-mail do usuário logado (ou null se não autenticado)
- loading → controla o splash de carregamento enquanto verifica a sessão salva
- login(email, password) → valida as credenciais contra os usuários salvos no AsyncStorage
- logout() → remove a sessão do AsyncStorage e limpa o estado
- register(name, email, password) → salva um novo usuário na lista persistida

*CartContext*
Gerencia o estado do carrinho de compras:
- cart → array com os itens adicionados pelo usuário
- addToCart(item) → adiciona um item ao carrinho com ID único via Date.now()
- removeFromCart(cartId) → remove um item específico pelo seu ID
- clearCart() → esvazia o carrinho após finalização do pedido
- total → valor calculado automaticamente como estado derivado do array cart
---
## Como a Autenticação foi Implementada

A autenticação é feita inteiramente no lado do cliente utilizando *AsyncStorage* como banco de dados local.

*Cadastro:*
1. O usuário preenche nome, e-mail, senha e confirmação de senha
2. Os campos são validados (formato de e-mail, mínimo de 6 caracteres, senhas iguais)
3. Se válido, o novo usuário é adicionado ao array de usuários salvo no AsyncStorage
4. Verifica se o e-mail já está cadastrado antes de salvar

*Login:*
1. O usuário informa e-mail e senha
2. O app busca no AsyncStorage a lista de usuários cadastrados
3. Compara as credenciais — se encontrado, salva a sessão e atualiza o estado global
4. O AuthContext atualiza o user, fazendo o App.js redirecionar automaticamente para o AppStack

*Sessão persistida:*
- Ao abrir o app, um useEffect no AuthContext verifica se há uma sessão salva
- Se houver, o usuário é restaurado sem precisar fazer login novamente
- Um ActivityIndicator é exibido enquanto essa verificação acontece

---
### Como o AsyncStorage foi Utilizado

| Chave | O que armazena | Quando é atualizado |
|-------|---------------|---------------------|
| @cantina:users | Array com todos os usuários cadastrados (nome, e-mail, senha) | A cada novo cadastro |
| @cantina:session | Objeto com nome e e-mail do usuário logado | No login e removido no logout |
| @cantina:cart | Array com os itens do carrinho | A cada adição, remoção ou limpeza do carrinho |

- A leitura dos dados acontece sempre no useEffect ao montar os contextos.
- A escrita acontece automaticamente via useEffect que observa mudanças no estado, garantindo que AsyncStorage e estado local estejam sempre sincronizados.

---
## Como a Navegação Protegida foi Implementada

A navegação é dividida em dois Stacks dentro do App.js:

*AuthStack* — acessível apenas para usuários não autenticados:
- LoginScreen
- RegisterScreen

*AppStack* — acessível apenas para usuários autenticados:
- HomeScreen
- MenuScreen
- CartScreen

O componente RootNavigator consome o AuthContext e decide qual Stack renderizar:

javascript
function RootNavigator() {
  const { user, loading } = useAuth();

  if (loading) return <ActivityIndicator />; // aguarda verificação de sessão

  return user ? <AppStack /> : <AuthStack />; // redireciona conforme estado
}


- Dessa forma, um usuário não autenticado nunca consegue acessar as telas principais do app 
- A proteção acontece no nível da navegação, não dentro de cada tela individualmente.

---

## Tecnologias Utilizadas

- React Native
- Expo
- React Navigation
- JavaScript
- AsyncStorage
- Context API

---

## Navegação

A navegação foi implementada utilizando React Navigation com Native Stack Navigator.

Foram criadas cinco telas principais:

- Home → Tela inicial do aplicativo
- Menu → Tela de visualização do cardápio
- Cart → Tela de carrinho de compras
- Login → Tela de login do usuário
- Register → Tela de registro do usuário

- A navegação foi configurada no arquivo App.js utilizando NavigationContainer e createNativeStackNavigator, permitindo a transição entre as telas do aplicativo.

- Além disso, foram utilizados parâmetros de navegação para enviar dados entre as telas, como o envio do produto selecionado da tela Menu para a tela Cart.



# Próximos Passos:
- Implementar historico de compras
- Modo claro e Modo escuro




