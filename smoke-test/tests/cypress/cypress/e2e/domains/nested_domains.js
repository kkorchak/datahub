const domainName = "CypressNestedDomain";
const domainDescription = "CypressNestedDomainDescription";

describe("nested domains test", () => {
    it("create a domain, move under parent, remove domain", () => {
        //create a new domain without a parent
        cy.loginWithCredentials();
        cy.goToDomainList();
        cy.clickOptionWithText("New Domain");
        cy.waitTextVisible("Create New Domain");
        cy.get('[data-testid="create-domain-name"]').type(domainName);
        cy.get('#description').type(domainDescription);
        cy.clickOptionWithTestId("create-domain-button");
        cy.waitTextVisible("Created domain!");
        cy.waitTextVisible(domainName);
        //ensure the new domain has no parent in the navigation sidebar
        cy.waitTextVisible(domainDescription);
        //move a domain from the root level to be under a parent domain
        cy.clickOptionWithText(domainName);
        cy.openThreeDotDropdown();
        cy.clickOptionWithText("Move");
        cy.get('[role="dialog"]').contains("Marketing").click({force: true});
        cy.get('[role="dialog"]').contains("Marketing").should("be.visible");
        cy.get("button").contains("Move").click();
        cy.waitTextVisible("Moved Domain!").wait(5000);
        //ensure domain is no longer on the sidebar navigator at the top level but shows up under the parent
        cy.goToDomainList();
        cy.ensureTextNotPresent(domainName);
        cy.ensureTextNotPresent(domainDescription);
        cy.waitTextVisible("1 sub-domain");
        //move a domain from under a parent domain to the root level
        cy.contains("Marketing").prev().click();
        cy.clickOptionWithText(domainName);
        cy.openThreeDotDropdown();
        cy.clickOptionWithText("Move");
        cy.get("button").contains("Move").click();
        cy.waitTextVisible("Moved Domain!").wait(5000);
        cy.goToDomainList();
        cy.waitTextVisible(domainName);
        cy.waitTextVisible(domainDescription);
        //delete a domain
        cy.clickOptionWithText(domainName);
        cy.openThreeDotDropdown();
        cy.clickOptionWithText("Delete");
        cy.waitTextVisible(`Delete ${domainName}`);
        cy.get("button").contains("Yes").click();
        cy.waitTextVisible("Deleted Domain!").wait(5000);
        cy.ensureTextNotPresent(domainName);
        cy.ensureTextNotPresent(domainDescription);
    });
});