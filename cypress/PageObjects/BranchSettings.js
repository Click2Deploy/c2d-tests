export class branch_Settings{

   selector_custome_domain_Field="input.form-control[placeholder='www.your-domain-name.com']";
    selector_add_domain_btn=".input-group-text";
    selector_listed_custom_domain=".repo-rev";
    delete_btn_on_domain_listed = "[data-name='Material--DeleteOutline']";

    custom_domain_Textfield(text)
    {
        cy.get(this.selector_custome_domain_Field).type(text);
    }
    click_on_add_domain_btn()
    {
        cy.contains(this.selector_add_domain_btn,"Add domain").click();
    }
    delete_specific_domain_listed(domain)
    {
        cy.contains(this.selector_listed_custom_domain,domain).within(()=>{
            cy.get(this.delete_btn_on_domain_listed).click()
        })
    }

}