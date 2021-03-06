describe("Lazy load posts", function () {
  before(() => {
    cy.visit("/");
  });

  it("Correct initial number of posts", () => {
    cy.get('[data-testid="post"]').should("have.length", 10);
  });

  it("Correct number of posts after server request", () => {
    cy.window().scrollTo("bottom");
    cy.get('[data-testid="post"]').should("have.length", 20);
  });
});
