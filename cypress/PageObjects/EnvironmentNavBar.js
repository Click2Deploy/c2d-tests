export default class EnvironmentNavBar
{
    selector_env_Development=".env-header h4";
    selector_select_branch_Dropdown=".environments-wrapper [style=''] select";
    selector_enter_branch_name_input_field=".show input.form-control-lg";
    selector_click_on_project_setting_button="svg[data-name='SvgIcon--CustomSetting']";
    selector_DevEnvironment="div#Development";
    selector_StaggingEnvironment="div#Staging";
    selector_ProdEnvironment="div#Production";
    
    
    click_on_development()
    {
        cy.contains(this.selector_env_Development, 'Development').should('be.visible').click();
    }

    select_branch_From_Dropdown(branchName_from_dropdown)
    {
        cy.get(this.selector_select_branch_Dropdown).select(branchName_from_dropdown);
        cy.get(this.selector_select_branch_Dropdown).find('option:selected').should('have.text', branchName_from_dropdown);
    }
    enter_branch_name_input_field_Active(branchName)
    {
        cy.get(this.selector_enter_branch_name_input_field).type(branchName, { force: true }).type('{enter}', { force: true });
    }
    enter_branch_name_input_field_InActive()
    {
        cy.get(this.selector_enter_branch_name_input_field).should('be.disabled');
        cy.log("Enter branch name input field is inactive. hence validated.")
    }
    Popup_message_heading_validation(message)
    {
        cy.contains("h5",message).should("be.visible");
        cy.log("Validated that user is not allow to change stage. ")
        cy.get("button.btn-close").click();
    }
    click_on_project_setting_button()
    {
        cy.get(this.selector_click_on_project_setting_button).click({force:true});
    }
    // click_on_branch(branchName)
    // {
    //     cy.contains(`div[data-testid='${branchName}-17']`,branchName).click({force :true});
    // }
    click_on_branch(branchName,branchVersion)
    {
        cy.contains(`div[data-testid='${branchName}-${branchVersion}']`,branchName).click({force :true});
    }
    branch_shouldbe_visible(branchName,branchVersion)
    {
        cy.contains(`div[data-testid='${branchName}-${branchVersion}']`,branchName,{timeout:10000}).should('exist');
    }

    drag_branch(branchName,version,To_selector)
    {
        cy.contains(`[data-testid='${branchName}-${version}']`,branchName).dragTo(`${To_selector}`);
    }
    getBranchSelector(branchName, branchVersion) {
        return `[data-testid='${branchName}-${branchVersion}']`;
    }

}