/// <reference types="cypress"/>
import "cypress-wait-until";

describe("Search Calls", () => {
  it("should handle fake response", () => {
    cy.server();
    cy.route({
      method: "GET",
      url: `https://api.foursquare.com/v2/venues/explore?client_id=5BN1BRUYVWKHUZWNFCUXBNS5LQWO2SDOLOVOWENTYKZ5ARXU&client_secret=ITAWSJXNZ2FFCXUQNVH4SBDDZZNKSDL12OWQGBZ1W3WRJKIV&v=20180323&ll=51.552841,0.20067138999999656&limit=15&query=Park&radius=5049&llAcc=1000`,
      response: "fixture:venues.json"
    });
    cy.visit(`${Cypress.env("CLIENT_SERVER")}`);
    cy.get("div[id^=box]").should("have.length", 5);
  });

  it("should handle fake response no venues", () => {
    cy.server();
    cy.route({
      method: "GET",
      url: `https://api.foursquare.com/v2/venues/explore?client_id=5BN1BRUYVWKHUZWNFCUXBNS5LQWO2SDOLOVOWENTYKZ5ARXU&client_secret=ITAWSJXNZ2FFCXUQNVH4SBDDZZNKSDL12OWQGBZ1W3WRJKIV&v=20180323&ll=51.552841,0.20067138999999656&limit=15&query=Park&radius=5049&llAcc=1000`,
      response: "fixture:novenues.json"
    });
    cy.visit(`${Cypress.env("CLIENT_SERVER")}`);
    cy.waitUntil(() => cy.get(".warningMsg").should("have.length", 1));
  });

  it("should handle venues search", () => {
    cy.server();
    cy.route({
      method: "GET",
      url: `https://api.foursquare.com/v2/venues/explore?client_id=5BN1BRUYVWKHUZWNFCUXBNS5LQWO2SDOLOVOWENTYKZ5ARXU&client_secret=ITAWSJXNZ2FFCXUQNVH4SBDDZZNKSDL12OWQGBZ1W3WRJKIV&v=20180323&ll=51.552841,0.20067138999999656&limit=15&query=Hotel&radius=5049&llAcc=1000`,
      response: "fixture:onevenues.json"
    });
    cy.visit(`${Cypress.env("CLIENT_SERVER")}`);
    cy.get(".search-input")
      .clear()
      .type("Hotel");
    cy.get("button")
      .contains("Search")
      .click();
    cy.waitUntil(() => cy.get("div[id^=box]").should("have.length", 1));
    cy.waitUntil(() => cy.get(".warningMsg").should("have.length", 1));
  });
});
