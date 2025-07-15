import Navtab from "./NavTab";

class Backups{

    create_backup_btn="button.btn-lg.btn-primary";
    create_btn="span[style='margin-right: 10px;']";
    backup_delete_Btn=".btn-danger";
    delete_Btn="div[class='d-flex align-items-center justify-content-center'] span";
    selector_backup_delete_confirmation_button="button.btn-lg.btn-primary";

    NTobj=new Navtab();
    
    create_backup_button_click()
    {
        cy.contains(this.create_backup_btn,"Create backup").click();
    }
    create_backup_button_disable()
    {
        cy.get("button.btn-primary",{ timeout: 5000 }).contains("Create backup").should("have.attr","aria-disabled","true");
    }

    create_button_click()
    {
        cy.contains(this.create_btn,"Create").click();
    }
    toast_message_cross_Btn()
    {
        cy.get("path[d='M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z'][fill-rule='evenodd']")
        .click({ multiple: true, force: true });
    }
    delete_Backup_Btn()
    {
        cy.get(this.backup_delete_Btn).first().invoke('show').click({force : true});
    }
    delete_Btn_click()
    {
        cy.get(this.delete_Btn).click();
    }
    create_backup_popup_should_Be_appear()
    {
        cy.contains("h5#create-backup","Create Backup", { timeout:5000 }).should("be.visible");
    }
    backup_restore_button_click()
    {
        cy.get(".btn-primary[type='button']").eq(1).click({force:true});
    }
    restore_popup_should_be_appear()
    {
        cy.get("h5.align-items-center",{ timeout:5000 }).should("be.visible");
    }
    branches_selection_dropdown(branchName,dev_branchName,stagging_branchName)
    {
        
        cy.get("[aria-label='backup-selection']").should("not.contain.text", branchName); 
        cy.get("[aria-label='backup-selection']").should("contain.text", dev_branchName);
        cy.get("[aria-label='backup-selection']").should("contain.text", stagging_branchName);
        
    }
    backup_delete_confirmation_button()
    {
        cy.contains(this.selector_backup_delete_confirmation_button,"Delete").click();
    }
    backup_download_button_click(index)
    {
        cy.contains("button.btn.btn-primary.c2d-btn","Download",{timeout:60*1000*8}).eq(index).click({ force:true })
    }
    download_Data_Base_dump_popup_shouldbe_appear()
    {
        cy.contains("h5#download-a-database-dump","Download a database dump",{timeout:60*1000}).should("be.visible");
    }
    checkbox_without_filestore()
    {
        cy.get("input#without_filestore").check({ force: true });

    }
    download_btn_on_toast_message()
    {
        cy.contains("button.btn.btn-success","Download").first().click();
    }
    download_start_btn_click()
    {
        cy.contains("button.btn-primary","Start").click();
    }


}

export default Backups;