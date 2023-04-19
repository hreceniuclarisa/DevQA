describe('TC1', () => {
  it('Verify that all header’s elements navigate to the correct page.', () => {
    cy.viewport(1920, 1080)

    cy.visit('https://iwanttohelp.bim.assistcloud.services/')

    //cy.get(".nav-link.router-link-exact-active.router-link-active").trigger('mousedown', {which: 1, force: true})

    //cy.get(".nav-link.router-link-exact-active.router-link-active").click()

    cy.get(".nav-link[href='/search']").click()

    cy.get(".nav-link[href='/needs_list']").click()

    cy.get(".nav-link[href='/about']").click()

    cy.get(".nav-link[href='/contact']").click()

    cy.get(".nav-link[href='/auth/register']").click()

    cy.get(".nav-link[href='/auth/login']").click()

  })
})


describe('TC2', () => {
  it('Verify that on “Top Voluntari” page the map and at least one volunteer is displayed.', () => {
    cy.viewport(1920, 1080)

    cy.visit("https://iwanttohelp.bim.assistcloud.services/")
    
    cy.get(".nav-link[href='/search']").click()

    cy.get(".col-md-6.d-none.d-sm-block.map-container").should('be.visible')

    cy.get("body > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1)").should('be.visible')
  })
})

describe('TC3', () =>{
  it("Verify the user is able to Zoom in or out the map", () => {
    cy.viewport(1920, 1080)

    cy.visit("https://iwanttohelp.bim.assistcloud.services/search")

    cy.get(".col-md-6.d-none.d-sm-block.map-container").should('be.visible')

    cy.get("button[title='Zoom in']").click()

    cy.get("button[title='Zoom out']").click()
  })
})

describe('TC4', () =>{
    it("Verify that Login functionality works with valid credentials.", () => {

      cy.viewport(1920, 1080)
  
      cy.visit("https://iwanttohelp.bim.assistcloud.services/auth/login")

      cy.get('[name="phone_number"]').type("0756325724")

      cy.get('[name="password"]').type("parola")
  
      cy.xpath("//button[normalize-space()='Autentificare']").click()

      cy.wait(1000)

      cy.visit("https://iwanttohelp.bim.assistcloud.services/dashboard")

    })
})

describe('TC5', () => {
  it("Verify that Login functionality works with invalid credentials.", () => {
    cy.viewport(1920, 1080)

    cy.visit("https://iwanttohelp.bim.assistcloud.services/dashboard")

    cy.get('[name="phone_number"]').type("075724")

    cy.get('[name="password"]').type("gresita")

    cy.xpath("//button[normalize-space()='Autentificare']").click()

    cy.wait(1000)

    cy.get("div[role='alert']").should('be.visible')

    cy.url().should('include', "/auth/login")
  })
})

describe('TC6', () => {
  it("Verify that a user is able to add a new Nevoie recomandata.", () => {

    cy.viewport(1920, 1080)
    
    cy.visit("https://iwanttohelp.bim.assistcloud.services/auth/login")

    cy.get('[name="phone_number"]').type("0756325724")

    cy.get('[name="password"]').type("parola")
  
    cy.xpath("//button[normalize-space()='Autentificare']").click()

    cy.xpath("//p[normalize-space()='Nevoi recomandate']").click()

    cy.get("button[title='Add new'").click()

    cy.get('[name="contact_first_name"]').type("Larisa")

    cy.get('[name="contact_last_name"]').type("Hreceniuc")

    cy.get('[name="contact_phone_number"]').type("0756325724")

    cy.get(".vs__actions").click()

    cy.get("input[type='search']").click()

    cy.get('#vs1__option-0').click()

    cy.get('[name="description"]').type("mancare")

    cy.get("input[placeholder='Nume strada, numar ...']").type("Strada Alexandru Macedonski, nr 46")

    cy.get('[name="details"]').type("etaj 1, apartament 23")

    cy.get("[name='county']").type("Suceava")

    cy.get('[name="city"]').type("Suceava")

    cy.get('[name="postal_code"]').type("720066")

    cy.get("button[type='submit']").click()

    cy.get("#app").should('be.visible')
  })
})

describe('TC7', () => {
  it("Verify that the Descriere field is required.", () => {
    cy.viewport(1920, 1080)
    
    cy.visit("https://iwanttohelp.bim.assistcloud.services/auth/login")

    cy.get('[name="phone_number"]').type("0756325724")

    cy.get('[name="password"]').type("parola")
  
    cy.xpath("//button[normalize-space()='Autentificare']").click()

    cy.xpath("//p[normalize-space()='Nevoi recomandate']").click()

    cy.get("button[title='Add new'").click()

    cy.get('[name="contact_first_name"]').type("Larisa")

    cy.get('[name="contact_last_name"]').type("Hreceniuc")

    cy.get('[name="contact_phone_number"]').type("0756325724")

    cy.get(".vs__actions").click()

    cy.get("input[type='search']").click()

    cy.get('#vs1__option-0').click()

    cy.get("input[placeholder='Nume strada, numar ...']").type("Strada Alexandru Macedonski, nr 46")

    cy.get('[name="details"]').type("etaj 1, apartament 23")

    cy.get("[name='county']").type("Suceava")

    cy.get('[name="city"]').type("Suceava")

    cy.get('[name="postal_code"]').type("111111")

    cy.get("button[type='submit']").click()

    cy.get(".text-left.text-danger").should('be.visible')
  })
})

describe('TC8', () => {
  it("Verify that the user is able to use “Vizualizeaza” functionality",() => {

    cy.viewport(1920, 1080)

    cy.visit("https://iwanttohelp.bim.assistcloud.services/auth/login")

    cy.get('[name="phone_number"]').type("0756325724")

    cy.get('[name="password"]').type("parola")
  
    cy.xpath("//button[normalize-space()='Autentificare']").click()

    cy.xpath("//p[normalize-space()='Nevoi recomandate']").click({ force: true })

    cy.xpath("(//i[@title='Vizualizeaza'])[1]").click()

    cy.get(".title").contains("Vizualizare nevoie recomandata")
    Cypress.on('uncaught:exception', (err, runnable) => {
      // log the error to the console
      console.error('Unhandled Exception:', err.message);
      // return false to prevent Cypress from failing the test
      return false;
    });
    cy.get(".text-warning").contains("Deschis")
  })
})

describe('TC9', () => {
  it('Verify that the user is able to use “Sterge” functionality',() => {
    cy.viewport(1920, 1080)

    cy.visit("https://iwanttohelp.bim.assistcloud.services/auth/login")

    cy.get('[name="phone_number"]').type("0756325724")

    cy.get('[name="password"]').type("parola")
  
    cy.xpath("//button[normalize-space()='Autentificare']").click()

    cy.xpath("//p[normalize-space()='Nevoi recomandate']").click()

    cy.xpath("(//i[contains(@title,'Sterge')])[1]").click()

    cy.get("button[class='btn btn btn-primary btn-secondary btn-sm']").click()
  })
})

describe('TC10', () => {
  it('Verify the search functionality ',() => {
    cy.viewport(1920, 1080)

    cy.visit("https://iwanttohelp.bim.assistcloud.services/auth/login")

    cy.get('[name="phone_number"]').type("0756325724")

    cy.get('[name="password"]').type("parola")
  
    cy.xpath("//button[normalize-space()='Autentificare']").click()

    cy.xpath("//p[normalize-space()='Nevoi recomandate']").click()

    cy.get("[name='Filter']").type("mancare")

    cy.xpath("//td[@data-label='Descriere']").should('exist')||("xpath", "//p[normalize-space()='Nu sunt inregistrari.']").should('not.exist')||('xpath',"//p[contains(text(),'Nu s-au gasit rezultate.')]").should('not.exist')
 
    cy.get("[name='Filter']").clear()

    cy.get("[name='Filter']").type("Larisa Hreceniuc")

    cy.xpath("//td[@data-label='Persoana contact']").should('exist')||("xpath", "//p[normalize-space()='Nu sunt inregistrari.']").should('not.exist')||('xpath',"//p[contains(text(),'Nu s-au gasit rezultate.')]").should('not.exist')

    cy.get("[name='Filter']").clear()

    cy.get("[name='Filter']").type("Strada Alexandru Macedonski, nr 46")

    cy.xpath("//td[@data-label='Adresa']").should('exist')||("xpath", "//p[normalize-space()='Nu sunt inregistrari.']").should('not.exist')||('xpath',"//p[contains(text(),'Nu s-au gasit rezultate.')]").should('not.exist')

    cy.get("[name='Filter']").clear()

    cy.get("[name='Filter']").type("0756325724")

    cy.xpath("//td[@data-label='Telefon']").should('exist')||("xpath", "//p[normalize-space()='Nu sunt inregistrari.']").should('not.exist')||('xpath',"//p[contains(text(),'Nu s-au gasit rezultate.')]").should('not.exist')

    cy.get("[name='Filter']").clear()

  })
})

describe('TC11', () => {
  it('Verify that the user is able to use “Vizualizeaza” functionality',() => {
    cy.visit("https://iwanttohelp.bim.assistcloud.services/auth/login")

    cy.get('[name="phone_number"]').type("0756325724")

    cy.get('[name="password"]').type("parola")
  
    cy.xpath("//button[normalize-space()='Autentificare']").click()

    cy.xpath("//p[normalize-space()='nevoi']").click()

    cy.xpath("(//i[@title='Vizualizeaza'])[26]").click()

    cy.xpath("//div[contains(@class,'main-panel')]//p[1]").contains("Deschis")
    })
})

describe('TC12', () => {
  it('Verify “Aplica” functionality ',() => {
    cy.visit("https://iwanttohelp.bim.assistcloud.services/auth/login")

    cy.get('[name="phone_number"]').type("0756325724")

    cy.get('[name="password"]').type("parola")
  
    cy.xpath("//button[normalize-space()='Autentificare']").click()

    cy.xpath("//p[normalize-space()='nevoi']").click()

    cy.xpath("(//i[contains(@title,'Aplica')])[26]").click()

    cy.xpath("(//button[normalize-space()='Confirma'])[1]").click()

  })
})

describe('TC13', () => {
  it('Verify “Completeaza” functionality',() => {
    cy.visit("https://iwanttohelp.bim.assistcloud.services/auth/login")

    cy.get('[name="phone_number"]').type("0756325724")

    cy.get('[name="password"]').type("parola")
  
    cy.xpath("//button[normalize-space()='Autentificare']").click()

    cy.xpath("//p[normalize-space()='nevoi']").click()

    cy.xpath("(//i[@title='Completeaza'])[1]").click()

    cy.xpath("(//*[name()='polygon'])[10]").click()

    cy.get("[name='comment']").type("Perfect!")

    cy.xpath("(//button[normalize-space()='Trimite'])[1]").click()
  })
})


describe('TC14', () => {
  it('Verify that the user is able to properly logout.',() => {
    cy.viewport(1920, 1080)

    cy.visit("https://iwanttohelp.bim.assistcloud.services/auth/login")

    cy.get('[name="phone_number"]').type("0756325724")

    cy.get('[name="password"]').type("parola")
  
    cy.xpath("//button[normalize-space()='Autentificare']").click()

    cy.xpath("//a[normalize-space()='Deconectare']").click()

    cy.get(".nav-link[href='/auth/login']").should('be.visible')
  })
})