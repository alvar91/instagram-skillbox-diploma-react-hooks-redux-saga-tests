describe("Redirect to Unsplash", function () {
  before(() => {
    cy.visit("/");
    cy.clearCookies();
  });

  it("Should have Login button", function () {
    cy.contains("Login").its("length").should("be.gte", 0);
  });

  it("Should redirect to Unsplash form", function () {
    cy.contains("Login").click();
    cy.url().should("include", "https://unsplash.com/login");
  });

  it("Should redirect to 422 page error", () => {
    cy.get("#user_email").type(Cypress.env("email"));
    cy.get("#user_password").type(Cypress.env("password"));
    cy.get("form").submit();
    cy.contains("422").its("length").should("be.gte", 0);
  });
});
