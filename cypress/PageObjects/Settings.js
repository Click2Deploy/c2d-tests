export class Settings
{
    clickon_setting_button_to_open_setting_page()
    {
        cy.get("svg[data-name='SvgIcon--CustomSetting']").click();
        cy.contains("h3","Project Settings",{ timeout : 50000}).should("be.visible");
    }

    admin_role_drop_down_should_be_disable()
    {
        cy.get("select.c2d-select",{ timeout : 50000}).should("be.disabled");

    }
}