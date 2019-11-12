/// <reference types="cypress"/>

describe("Places App", () => {
  it("should initialize the App", () => {
    cy.visit(`${Cypress.env("CLIENT_SERVER")}`);
    cy.get(".search-input").should("have.value", "Park");
  });

  it("should initialize with Fake Data ", () => {
    cy.visit(`${Cypress.env("CLIENT_SERVER")}?fake=true`);
    cy.get("div[id^=box]").should("have.length", 5);
    cy.get("div[id^=box]")
      .contains("No Image")
      .should("have.length", 1);
  });
});
