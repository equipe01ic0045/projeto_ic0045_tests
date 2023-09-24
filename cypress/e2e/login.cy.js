describe('Login', () => {
    beforeEach(() => {
        //ir para a tela de login
        cy.visit('http://localhost:4400/')
    })

    context('Cadastro', () => {
        it.only('Cadastrar novo usuário', () => {
            //ir para a tela de cadastro
            cy.get('a > .chakra-text').click()
            cy.url().should('include', '/registration')
    
            //cadastrar usuário
            cy.get('[placeholder="email"]').type("test@test.com.br")
            cy.get('[placeholder="confirme o email"]').type("test@test.com.br")
            cy.get('[placeholder="senha"]').type("admin")
            cy.get('[placeholder="confirme a senha "]').type("admin")
            cy.get('button').click()
            //Verificar mensagem de cadastro
            cy.get('#toast-1', {timeout:3000}).should('be.visible').invoke('text').should('contains', 'registro completo')
        })
    });

    context('Login', () => {
        it.only('Logar com usuário válido', () => {
            //logar como um usuário válido
            cy.get('input[name="email"]').type("test@test.com.br")
            cy.get('input[name="password"]').type("admin")
            cy.get('button').click()
            //Verificar mensagem de login
            cy.get('#toast-1', {timeout:3000}).should('be.visible').invoke('text').should('contains', 'login falhou')
        })
    
        it.only('Tentar logar com usuário inválido', () => {
            //logar como um usuário inválido
            cy.get('input[name="email"]').type("invalido@test.com.br")
            cy.get('input[name="password"]').type("invalido")
            cy.get('button').click()
            //Verificar mensagem de erro
            cy.get('#toast-1', {timeout:3000}).should('be.visible').invoke('text').should('contains', 'login falhou')
        })
    })
})