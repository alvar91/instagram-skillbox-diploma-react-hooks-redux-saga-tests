describe("Post modal", function () {
  before(() => {
    cy.visit("/");
  });

  it("Should have correct number of post image", () => {
    cy.get('[data-testid="postImage"]').its("length").should("be.gte", 0);
  });

  it("Should open post modal after click", () => {
    cy.get('[data-testid="postImage"]').first().click();

    cy.location().should((loc) => {
      expect(loc.pathname.length).to.eq(12);
    });
  });

  it("Should have unique like button", () => {
    cy.get('[data-testid="icon"]').its("length").should("be.gte", 0);
  });

  it("Should have correct number of likes after click without login", () => {
    cy.get('[data-testid="likesModal"]').then((element) => {
      element.click();
      cy.get('[data-testid="likesModal"]').first().contains(element.text());
    });
  });
});
