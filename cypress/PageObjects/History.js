class history
{

    selector_Success_Status="span[class='d-flex align-items-center'] span span[class='m-2']";

    success_status()
    {
        cy.contains(this.selector_Success_Status,"Success").first().should("exist");
    }
    history_validate(text)
    {
        cy.contains("span[class^='cursor-pointer text-decoration-none hover:text-decoration-underline']",`${text}`).should('be.visible');
    }
    connectAS_click()
    {
        cy.get("button.btn-only-icon").click();
        cy.get("button.btn-success.dropdown-item",{timeout : 5000}).should("be.visible").click();
    }
    branch_title(branchTitle) {
        cy.get('.branch-name', { timeout: 10000 })
            .invoke('text')
            .then((fullText) => {
                const cleanedText = fullText.replace(/Add Submodule/i, '').trim().toLowerCase();
                expect(cleanedText).to.equal(branchTitle.toLowerCase());
            });



    }

}
export default history;