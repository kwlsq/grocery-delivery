describe("ProductCard E2E Test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3001");
  });

  it("should open the drawer when clicked", () => {
    cy.get("[data-cy=product-card]").first().click();

    cy.get("[data-cy=product-detail]").should("be.visible");
  });

  it("should show the correct product details", () => {
    cy.get("[data-cy=product-card]").first().click();

    cy.get("[data-cy=product-name]").should("exist");
  });
});
