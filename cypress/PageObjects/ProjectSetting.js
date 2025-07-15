export default class ProjectSetting
{
    ProjectName_Input_field()
    {
        cy.get("input[placeholder='c2d-playground']").should('have.attr', 'disabled');
        cy.log("validated that project name field is disable.")
    }
    click_cross_button()
    {
        cy.get('.btn-close').click();
        cy.contains('div', 'Development', { timeout: 20000 }).should('be.visible');
    }
    admin_role_field()
    {
      cy.get("select[aria-label='role-selection']").first().should("be.disabled");
    }
    admin_role_field_delete_btn()
    {
        cy.get(".btn-hover-shadow.btn-only-icon").first().should("be.disabled")
    }

}