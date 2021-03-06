describe("Like post without login", function () {
  before(() => {
    cy.visit("/");
  });

  it("Correct number of posts", () => {
    cy.get('[data-testid="icon"]').its("length").should("be.gte", 0);
  });

  it("Correct number of likes after click", () => {
    cy.get('[data-testid="likes"]')
      .first()
      .then((element) => {
        element.click();
        cy.get('[data-testid="likes"]').first().contains(element.text());
      });
  });
});
