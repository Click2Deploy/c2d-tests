class SubModuleClass
{
    submodule_blue_Btn()
    {
        cy.contains('[type="button"]','Add Submodule').click();
    }
    add_Repository_textbox(text)
    {
        cy.get(`input[name="repositoryUrl"]`).type(`${text}`)
    }
    Proceed_btn()
    {
        cy.contains('[type="button"]',"proceed").click();
    }
    Add_Submodule_btn()
    {
        cy.contains("button.btn-primary.w-100[type='button']","Add Submodule").click();
    }

}
export default SubModuleClass