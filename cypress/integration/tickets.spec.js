/// <reference types="cypress" />

describe("Tickets", () => {
  beforeEach(() => cy.visit("https://bit.ly/2XSuwCW"));

  it("fills all the text input fields", () => {
    const name = "Moisés";
    const lastName = "Inácio";

    cy.get("#first-name").type(name);
    cy.get("#last-name").type(lastName);
    cy.get("#requests").type("Aprendendo Cypress");
    cy.get(".signature").type(`${name} ${lastName}`);
  });

  it("select two tickets", () => {
    cy.get("#ticket-quantity").select("2").should("have.value", "2");
  });

  it("select 'vip' ticket type", () => {
    cy.get("#vip").check();
  });

  it("select 'social media' checkbox", () => {
    cy.get('input[type="checkbox"]').check();
    cy.get('[name="agreement"]').uncheck();
    cy.get("#publication").uncheck();
  });
  it("has TICKETBOX header´s heading", () => {
    cy.get("header h1").should("contain", "TICKETBOX");
  });
  it("alerts on invalid email", () => {
    cy.get("#email").as("email").type("talkingabouttesting-gmail.com");

    cy.get("#email.invalid").as("invalidEmail").should("exist");

    cy.get("@email").clear().type("talkingabouttesting@gmail.com");

    cy.get("#email.invalid").should("not.exist");
  });

  it("fill and reset the form", () => {
    const firtName = "Moisés";
    const lastName = "Inácio";
    const fullName = `${firtName} ${lastName}`;

    cy.get('button[type="submit"]').as("btnConfirm").should("be.disabled");
    cy.get("#first-name").type(firtName);
    cy.get("#last-name").type(lastName);
    cy.get("#email").type("talkingabouttesting@gmail.com");
    cy.get("#ticket-quantity").select("2");
    cy.get("#vip").check();
    cy.get("#publication").check();
    cy.get("#requests").type("IPA beeer");
    cy.get(".agreement p").should(
      "contain",
      `I, ${fullName}, wish to buy 2 VIP tickets.`
    );

    cy.get("#agree").check();

    cy.get("#signature").type(fullName);

    cy.get("@btnConfirm").should("be.enabled");

    cy.get('button[type="reset"]').as("btnReset").click();

    cy.get("@btnConfirm").should("be.disabled");
  });

  it("fills mandatory fiels using support command", () => {
    const customer = {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
    };

    cy.fillMandatoryFields(customer);

    cy.get('button[type="submit"]').as('btnConfirm').should("not.be.disabled");

    cy.get("#agree").uncheck()

    cy.get("@btnConfirm").should("be.disabled")

  });
});
