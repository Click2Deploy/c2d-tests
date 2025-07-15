///<reference types="cypress" />

import Navtab from "../../PageObjects/NavTab";
import { NewUI_Backup_size_Validation, NewUI_ConnectButtonValidation, NewUI_Editor_Verify_byOpening, NewUI_Logs, NewUI_MonitorValidation, NewUI_OpenProjectbranch, NewUI_Shells_Verify_byOpening, NewUI_SuccessStatusValidation } from "../../support/utilities";



let projectURL;
let projectName="121Corp";
let branchName="produccion";
let branchVersion="E-15";

const obj_navtab=new Navtab();



describe.skip('121Crops_TestCases', () => {
  
    beforeEach(()=>{
        
        cy.NewUI_ForProdEnvironment_Click2Deploy().then((url)=>{
            projectURL=url;
        })

        Cypress.on("uncaught:exception",(err,runnable)=>{
            return false;
        })

    })

    it.skip('Verify logs',()=>{ 
      NewUI_OpenProjectbranch(projectName,branchName,branchVersion,projectURL);
      let status="Active";
      NewUI_Logs(projectName,branchName,status);
    })

    it.skip("Verify Main Branch Exists",()=>{
       NewUI_OpenProjectbranch(projectName,"master",branchVersion,projectURL);
    })

    it.skip("Verify Already existing branch",()=>{
      NewUI_OpenProjectbranch(projectName,"produccion",branchVersion,projectURL);
    })

    it.skip("Verify Editor & Shells are Avaliable on Production,Stagging,Dev",()=>{
      // NewUI_OpenProjectbranch(projectName,"produccion",15,projectURL);
      // obj_navtab.shell_button_validation("Active");
      // obj_navtab.Editor_button_validation("Active");

      NewUI_OpenProjectbranch(projectName,"produccion",branchVersion,projectURL);
      obj_navtab.shell_button_validation("Active");
      obj_navtab.Editor_button_validation("Active");
      NewUI_Editor_Verify_byOpening();
      NewUI_OpenProjectbranch(projectName,"produccion",branchVersion,projectURL);
      NewUI_Shells_Verify_byOpening();

      NewUI_OpenProjectbranch(projectName,"TESTMIG17",branchVersion,projectURL);
      obj_navtab.shell_button_validation("Active");
      obj_navtab.Editor_button_validation("Active");
      NewUI_Editor_Verify_byOpening();
      NewUI_OpenProjectbranch(projectName,"TESTMIG17",branchVersion,projectURL);
      NewUI_Shells_Verify_byOpening();

      NewUI_OpenProjectbranch(projectName,"12.0-fix-expenses",branchVersion,projectURL);
      obj_navtab.shell_button_validation("inActive");
      obj_navtab.Editor_button_validation("inActive");
      
      
    })

    it.skip("backup import export should be disable for dev branches",()=>{
      NewUI_OpenProjectbranch(projectName,"12.0-fix-expenses",branchVersion,projectURL);
      obj_navtab.Backup_Btn_Disable();
    })

    it.skip("Monitor page validation on dev/stagging/prod",()=>{
      NewUI_OpenProjectbranch(projectName,"12.0-fix-expenses",branchVersion,projectURL);
      NewUI_MonitorValidation(projectName,"12.0-fix-expenses","inActive");
      NewUI_OpenProjectbranch(projectName,"TESTMIG17",branchVersion,projectURL);
      NewUI_MonitorValidation(projectName,"TESTMIG17","Active");
      NewUI_OpenProjectbranch(projectName,"produccion",branchVersion,projectURL);
      NewUI_MonitorValidation(projectName,"produccion","Active");
    })

    it.skip("backup size validation on production branch",()=>{
      NewUI_OpenProjectbranch(projectName,"produccion",branchVersion,projectURL);
      obj_navtab.Backup_Btn_Enable_Click();
      NewUI_Backup_size_Validation();
    })
    
})
