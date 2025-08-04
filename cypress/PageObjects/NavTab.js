class Navtab
{
    navbar_selector=".btn.btn-sm.dh-nav-item";

    Backup_Btn_Disable()
    {
        cy.contains(this.navbar_selector,'Backups').should("have.attr",'aria-disabled','true');
    }
    Backup_Btn_Enable_Click()
    {
        cy.contains(this.navbar_selector,'Backups',{timeout:10000}).should("have.attr",'aria-disabled','false').click();
        cy.contains("Create backup",{ timeout: 5000 }).should("be.visible");
    }
    Backup_Btn_Enable_Visible()
    {
        cy.contains(this.navbar_selector,'Backups').should("have.attr",'aria-disabled','false').should("be.visible");
    }
    Logs_Btn_Enable_Click(status)
    {
        if(status==="Active")
        {
            cy.contains(this.navbar_selector,'Logs').click();
        }
        else
        {
            cy.contains(this.navbar_selector,'Logs').should('have.attr', 'aria-disabled', 'true');
        }
       
    }
    shell_button_validation(status)
    {
        if(status==="Active")
        {cy.contains('a[role="button"]', 'Shell')
            .should('not.have.class', 'disabled')}

        else
        {
          cy.contains('a[role="button"]', 'Shell')
            .should('have.attr', 'aria-disabled', 'true');
            
        }
        
    }
    Editor_button_validation(status)
    {if(status==="Active")
        {cy.contains(`a[role='button']`,`Editor`).should('not.have.class', 'disabled')}
        else
        {
            cy.contains('a[role="button"]', 'Editor')
            .should('have.attr', 'aria-disabled', 'true');
            
        }
    }
    shell_button_visible_invisible(status)
    {
        if(status === 'active')
        {
            cy.contains(`a[role='button']`,`Shell`).should("be.visible");
        }
        else
        {
            cy.contains(`a[role='button']`,`Shell`).should("not.exist");
        }
        
    }
    Editor_button_visible_invisible(status)
    {
        if(status === 'active')
        {
            cy.contains(`a[role='button']`,`Editor`).should("be.visible");
        }
        else
        {
            cy.contains(`a[role='button']`,`Editor`).should("not.exist");
        }
        
    }
    Monitor_click(projectName,branchName,status)
    {
        if(status==="Active")
        {
            cy.get(`[href="/project/${projectName}/branches/${branchName}/monitor"]`).click();
        }
        else
        {
            cy.contains(".dh-nav-item", 'Monitor')
            .should('have.attr', 'aria-disabled', 'true');
        }
        
    }
    Upgrade_Enable()
    {
      cy.contains(this.navbar_selector,"Upgrade").should("not.have.class","disabled").should("be.visible");
    }
    Setting_Enable()
    {
        cy.contains(this.navbar_selector,"Setting").should("not.have.class","disabled").should("be.visible");
    }
    Setting_Enable_click()
    {
        cy.contains(this.navbar_selector,"Setting").click();
        
    }

}

export default Navtab;