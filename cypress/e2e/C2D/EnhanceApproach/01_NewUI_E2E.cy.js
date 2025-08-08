///<reference types="cypress"/>

import Api from "../../../PageObjects/Api";
import Backups from "../../../PageObjects/Backups";
import { branch_Settings } from "../../../PageObjects/BranchSettings";
import EnvironmentNavBar from "../../../PageObjects/EnvironmentNavBar";
import Navtab from "../../../PageObjects/NavTab";
import ProjectSetting from "../../../PageObjects/ProjectSetting";
import { Settings } from "../../../PageObjects/Settings";
import { branchVersion, dropdown_branchVersion } from "../../../support/branchConfig";
import { generateRandomString, NewUI_Add_Collabrator, NewUI_ADD_SubModule, NewUI_backup_Creation, NewUI_BuildValidation, NewUI_ConnectButtonValidation, NewUI_createBranchInDevelopment, NewUI_CreateBranchInStagging, NewUI_CreateNewProject, NewUI_CreateNewProject_till_Deploy_Button, NewUI_CreateNewProject_till_Deploy_Button_phase3, NewUI_deleteBranch, NewUI_deleteproject, NewUI_dragto, NewUI_DroppedButtonValidation, NewUI_Editor_Verify_byOpening, NewUI_HistorySubModule, newui_install_Logs, NewUI_Logs, NewUI_Logs_FilterValidation, NewUI_MonitorValidation, NewUI_OpenProject, NewUI_OpenProjectbranch, NewUI_OpenSettings, NewUI_Shells_Verify_byOpening, NewUI_SuccessStatusValidation, NewUI_TabsValidationDevelopment, NewUI_TabsValidationProduction, NewUI_toastMessageValidation, oddopage_validation } from "../../../support/utilities";

let projectURL;
let projectName;
// let projectName="BRV-3";
let branchName = "main";


// let Dev_branchName2=generateRandomString(5);  // not in used 

let Dev_branchName = generateRandomString(2);
let Stagging_branchName = generateRandomString(3);


// let Dev_branchName="bn";
// let Stagging_branchName="kl";
let subscriptionCode;


const obj_EnvironmentNavBar = new EnvironmentNavBar();
const obj_navtab = new Navtab();
const obj_api = new Api();
const obj_projectsettings = new ProjectSetting();
const obj_backup = new Backups();
const obj_settings = new Settings();
const obj_branchSettings = new branch_Settings();

describe('End to End testing', () => {
  beforeEach('', () => {

    cy.NewUI_ForProdEnvironment().then((Url) => {
      projectURL = Url;
    });

    Cypress.on('uncaught:exception', (err, runnable) => {
      return false;
    });
    
  });
  it('Project Creation', () => {
    projectName = NewUI_CreateNewProject(projectURL, branchVersion, dropdown_branchVersion);
  });
  it('Create Branch in Dev', () => {
    NewUI_OpenProjectbranch(projectName, branchName, branchVersion, projectURL);
    NewUI_createBranchInDevelopment(projectName, Dev_branchName, branchVersion, projectURL);
  });
  it('Create Branch in Stagging', () => {
    NewUI_OpenProject(projectName, projectURL);
    NewUI_CreateBranchInStagging(projectName, Stagging_branchName, branchVersion, projectURL);
  });
  it('Drag Branch from dev to Production', () => {
    NewUI_OpenProjectbranch(projectName, Dev_branchName, branchVersion, projectURL);
    NewUI_dragto(Dev_branchName, obj_EnvironmentNavBar.selector_ProdEnvironment, branchVersion);
  });
  it('ValidateSpinner on inprogress branch', () => {
    NewUI_OpenProjectbranch(projectName, Dev_branchName, branchVersion, projectURL);
    cy.get('.branch div.spinner-border').first().should('be.visible');
  });
  it('Prod should have one branch only', () => {
    NewUI_OpenProjectbranch(projectName, branchName, branchVersion, projectURL);
    cy.contains(`[data-testid='${branchName}-${branchVersion}']`, branchName).dragTo(`${obj_EnvironmentNavBar.selector_ProdEnvironment}`);
    cy.get('.btn-primary').click();
    NewUI_toastMessageValidation("Stage: Only one branch is allowed in the 'production' stage.", 6 * 1000);
    cy.wait(2000);
  });
  it('Validate Connect button in Dev', () => {
    NewUI_OpenProjectbranch(projectName, branchName, branchVersion, projectURL);
    NewUI_ConnectButtonValidation(branchName, branchVersion);
    NewUI_SuccessStatusValidation();
  });

  it('Validate Connect button in Stagging', () => {
    NewUI_OpenProjectbranch(projectName, Stagging_branchName, branchVersion, projectURL);
    NewUI_ConnectButtonValidation(Stagging_branchName, branchVersion);
    NewUI_SuccessStatusValidation();
  });
  it('Validate Connect button in Production', () => {
    NewUI_OpenProjectbranch(projectName, Dev_branchName, branchVersion, projectURL);
    NewUI_ConnectButtonValidation(Dev_branchName, branchVersion);
    NewUI_SuccessStatusValidation();
  });
  it('Tabs Validation in Dev (Logs, Backups, Monitor, Upgrade, Settings) should not be enable', () => {
    NewUI_OpenProjectbranch(projectName, branchName, branchVersion, projectURL);
    obj_navtab.Logs_Btn_Enable_Click('Active');
    obj_navtab.Backup_Btn_Disable();
    obj_navtab.Monitor_click(projectName, branchName, 'InActive');
    // obj_navtab.Upgrade_Enable();
    obj_navtab.Setting_Enable();
  });
  it('Tabs Validation in Stagging (Logs, Backups, Monitor, Upgrade, Settings)', () => {
    NewUI_OpenProjectbranch(projectName, Stagging_branchName, branchVersion, projectURL);
    obj_navtab.Logs_Btn_Enable_Click('Active');
    obj_navtab.Backup_Btn_Enable_Visible();
    obj_navtab.Monitor_click(projectName, Stagging_branchName, 'Active');
    // obj_navtab.Upgrade_Enable();
    obj_navtab.Setting_Enable();
  });
  it('Tabs Validation in Production (Logs, Backups, Monitor, Upgrade, Settings)', () => {
    NewUI_OpenProjectbranch(projectName, Dev_branchName, branchVersion, projectURL);
    obj_navtab.Logs_Btn_Enable_Click('Active');
    obj_navtab.Backup_Btn_Enable_Visible();
    obj_navtab.Monitor_click(projectName, Dev_branchName, 'Active');
    // obj_navtab.Upgrade_Enable();
    obj_navtab.Setting_Enable();
  });

  it('Validate previous build has been dropped', () => {
    NewUI_OpenProjectbranch(projectName, Dev_branchName, branchVersion, projectURL);
    NewUI_DroppedButtonValidation();
  });
  it('Shell & Editor tab Should Not be Enable in Dev', () => {
    NewUI_OpenProjectbranch(projectName, branchName, branchVersion, projectURL);
    NewUI_TabsValidationDevelopment('InActive');
  });
  it('Shell & Editor tab are Visible in Stagging', () => {
    NewUI_OpenProjectbranch(projectName, Stagging_branchName, branchVersion, projectURL);
    NewUI_TabsValidationProduction('Active');
  });
  it('Shell & Editor tab are Visible in Prod', () => {
    NewUI_OpenProjectbranch(projectName, Dev_branchName, branchVersion, projectURL);
    NewUI_TabsValidationProduction('Active');
  });

  it('Logs validation is Stagging', () => {
    NewUI_OpenProjectbranch(projectName, Stagging_branchName, branchVersion, projectURL);
    NewUI_Logs(projectName, Stagging_branchName, 'Active');
  });
  it('Logs Validation in Production', () => {
    NewUI_OpenProjectbranch(projectName, Dev_branchName, branchVersion, projectURL);
    NewUI_Logs(projectName, Dev_branchName, 'Active');
  });
  it('backup creation in stagging should be disable', () => {
    NewUI_OpenProjectbranch(projectName, Stagging_branchName, branchVersion, projectURL);
    // NewUI_backup_Creation();
    obj_navtab.Backup_Btn_Enable_Click();
    obj_backup.create_backup_button_disable();
  });
  it('Create backup in production', () => {
    NewUI_OpenProjectbranch(projectName, Dev_branchName, branchVersion, projectURL);
    NewUI_backup_Creation();
  });
  // it.skip('Restore backup into production branch', () => {});
  // it.skip('Download backup ', () => {});
  // it.skip('Import backup', () => {});
  // it.skip('Delete Backup', () => {});

  it('Monitors should show graps in stagging', () => {
    NewUI_OpenProjectbranch(projectName, Stagging_branchName, branchVersion, projectURL);
    NewUI_MonitorValidation(projectName, Stagging_branchName, 'Active');
  });
  it('Monitors should show graps in production', () => {
    NewUI_OpenProjectbranch(projectName, Dev_branchName, branchVersion, projectURL);
    NewUI_MonitorValidation(projectName, Dev_branchName, 'Active');
  });

  // it.skip('Adding subModule in dev', () => {
  //   NewUI_OpenProjectbranch(projectName, branchName, branchVersion, projectURL);
  //   let text = 'git@github.com:pucar15sahiwal/git-public-repo.git';
  //   NewUI_ADD_SubModule(text);
  // });
  // it.skip('Adding subModule in stagging', () => {
  //   NewUI_OpenProjectbranch(projectName, Stagging_branchName, branchVersion, projectURL);
  //   let text = 'git@github.com:pucar15sahiwal/git-public-repo.git';
  //   NewUI_ADD_SubModule(text);
  // });

  it('Adding subModule in production', () => {
    NewUI_OpenProjectbranch(projectName, Dev_branchName, branchVersion, projectURL);
    let text = 'git@github.com:HDDevBuild/privt_module_fork.git';  //git@github.com:harrycdProd/civic10.git
    NewUI_ADD_SubModule(text);
  });

  // it.skip('Histor of subModule in dev', () => {
  //   NewUI_OpenProjectbranch(projectName, branchName, branchVersion, projectURL);
  //   let text = '[ADD] submodule pucar15sahiwal/git-public-repo';
  //   NewUI_HistorySubModule(text);
  // });
  // it.skip('Histor of subModule in stagging', () => {
  //   NewUI_OpenProjectbranch(projectName, Stagging_branchName, branchVersion, projectURL);
  //   let text = '[ADD] submodule pucar15sahiwal/git-public-repo';
  //   NewUI_HistorySubModule(text);
  // });
  it('Histor of subModule in production', () => {
    NewUI_OpenProjectbranch(projectName, Dev_branchName, branchVersion, projectURL);
    let text = '[ADD] submodule HDDevBuild/privt_module_fork';
    NewUI_HistorySubModule(text);
  });
  // it.skip('Install logs should be visible in stagging', () => {
  //   NewUI_OpenProjectbranch(projectName, Stagging_branchName, branchVersion, projectURL);
  //   newui_install_Logs();
  // });

  it('Collabrator ', () => {
    NewUI_OpenProject(projectName, projectURL);
    NewUI_Add_Collabrator(projectURL, projectName);
  });
  it('Editor for Stagging', () => {
    NewUI_OpenProjectbranch(projectName, Stagging_branchName, branchVersion, projectURL);
    NewUI_Editor_Verify_byOpening();
  });
  it('Editor for Production', () => {
    NewUI_OpenProjectbranch(projectName, Dev_branchName, branchVersion, projectURL);
    NewUI_Editor_Verify_byOpening();
  });
  it('Shells for Stagging', () => {
    NewUI_OpenProjectbranch(projectName, Stagging_branchName, branchVersion, projectURL);
    NewUI_Shells_Verify_byOpening();
  });
  it('Shells for Production', () => {
    NewUI_OpenProjectbranch(projectName, Dev_branchName, branchVersion, projectURL);
    NewUI_Shells_Verify_byOpening();
  });
  it('branch cant move from prod to dev staging', () => {
    NewUI_OpenProjectbranch(projectName, branchName, branchVersion, projectURL);

    obj_EnvironmentNavBar.drag_branch(Dev_branchName, branchVersion, 'div#Development');
    cy.get('.btn-primary').click();
    NewUI_toastMessageValidation('You can not change stage of Production branch.', 6 * 1000);
  });
  it("Should not be able to Delete Production branch", () => {
    NewUI_OpenProjectbranch(projectName, Dev_branchName, branchVersion, projectURL);
    NewUI_deleteBranch(projectName, Dev_branchName, branchVersion, "InActive");
  })

  it('cant_merge_branches_having_same_revision', () => {
    NewUI_OpenProjectbranch(projectName, Stagging_branchName, branchVersion, projectURL);
    cy.contains(`[data-testid='${branchName}-${branchVersion}']`, `${branchName}`).dragTo(
      `[data-testid='${Stagging_branchName}-${branchVersion}']`,
    );

    cy.get(".btn-primary[type='button']").click();
    NewUI_toastMessageValidation(
      `Failed to create pull request, Validation Failed: No commits between ${Stagging_branchName} and ${branchName}`,
      6 * 1000,
    );
    cy.get("h5[class='modal-title d-flex align-items-center ']", { timeout: 40000 }).should("not.exist");
    //  cy.contains("div[class='environments-wrapper']", Stagging_branchName).click();
    obj_EnvironmentNavBar.click_on_branch(Stagging_branchName, branchVersion)
  });

  // it.skip('App and Db pod name issue', () => {
  //   NewUI_OpenProjectbranch(projectName, branchName, branchVersion, projectURL);
  //   NewUI_createBranchInDevelopment_without_Main(projectName, Dev_branchName2, projectURL);

  //   //cy.contains(`[data-testid='${Dev_branchName2}-${branchVersion}']`,Dev_branchName2).dragTo("div#Staging");
  //   NewUI_dragto(Dev_branchName2, obj_EnvironmentNavBar.selector_StaggingEnvironment, branchVersion);
  //   cy.get('.btn-primary').click();

  //   cy.wait(1000);
  //   cy.reload();
  //   //cy.wait('@getBranches', { timeout: 10000 }).its('response.statusCode').should('eq', 200);
  //   obj_api.getBranches(10000);
  //   //cy.wait('@getProjectTracking', { timeout: 20000 }).its('response.statusCode').should('eq', 200).wait(2000);
  //   obj_api.get_getProjects(projectURL);
  //   //  cy.contains(`[data-testid='${Dev_branchName2}-17']`,branchName2).click();
  //   obj_EnvironmentNavBar.click_on_branch(Dev_branchName2, branchVersion);
  //   NewUI_ConnectButtonValidation(Dev_branchName2);
  //   NewUI_SuccessStatusValidation();
  //   newui_install_Logs();
  //   NewUI_BuildValidation(Dev_branchName2);
  // });

  it.skip('Validating User Perviliges', () => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.window().then((win) => {
      win.sessionStorage.clear();
    });

    // cy.NewUI_LoginToDev_Pucar15_Sahiwal();
    cy.NewUI_LoginToProd_jamie();
    cy.APIs(`https://api.click2deploy.com/api/v1`);
    NewUI_OpenProject(projectName, projectURL);
    obj_EnvironmentNavBar.click_on_development();
    obj_EnvironmentNavBar.select_branch_From_Dropdown(branchName);
    obj_EnvironmentNavBar.enter_branch_name_input_field_InActive();
    // NewUI_dragto("main","#Staging",branchVersion);
    obj_EnvironmentNavBar.drag_branch(branchName, branchVersion, obj_EnvironmentNavBar.selector_StaggingEnvironment);
    obj_EnvironmentNavBar.Popup_message_heading_validation('You are not authorized to Change Stage');
    obj_EnvironmentNavBar.click_on_project_setting_button();
    obj_projectsettings.ProjectName_Input_field('disable');
    obj_projectsettings.click_cross_button();

    NewUI_deleteBranch(projectName, Dev_branchName, branchVersion, 'In-Active');
    obj_navtab.shell_button_visible_invisible('Inactive');
    obj_navtab.Editor_button_visible_invisible('inactive');

    //  NewUI_ConnectButtonValidation_for_collabrator(projectName,branchName);
    //  NewUI_SuccessStatusValidation();
    let status = 'Active';
    //  NewUI_Logs(projectName,branchName,status);
    //  NewUI_deleteproject_button_not_exist(projectURL,projectName);
  });

  it('Logs_Search_Filter', () => {
    NewUI_OpenProjectbranch(projectName, Dev_branchName, branchVersion, projectURL);
    NewUI_Logs_FilterValidation(projectName, Dev_branchName);
  });
 
 

  it('Validate Connect button in Production (Devbuild in Prod)', () => {
    NewUI_OpenProjectbranch(projectName, Dev_branchName, branchVersion, projectURL);
    NewUI_ConnectButtonValidation(Dev_branchName, branchVersion);
    NewUI_SuccessStatusValidation();
  });
  it('Install logs should be visible in production', () => {
    NewUI_OpenProjectbranch(projectName, Dev_branchName, branchVersion, projectURL);
    newui_install_Logs();
  });
 


});

describe("phase 2", () => {
  beforeEach('', () => {
    cy.NewUI_ForProdEnvironment().then((Url) => {
      projectURL = Url;
    });
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false;
    });
  });

  it("Prevent restores on development branches", () => {
    NewUI_OpenProjectbranch(projectName, Dev_branchName, branchVersion, projectURL);

    // obj_navtab.Backup_Btn_Enable_Click();

    NewUI_backup_Creation()
    obj_backup.backup_restore_button_click();
    obj_backup.restore_popup_should_be_appear();
    obj_backup.branches_selection_dropdown(branchName, Dev_branchName, Stagging_branchName);


  })

  it("Delete backup and Validate delete backup notification", () => {
    // NewUI_OpenProjectbranch("civic10", "as", "E-15", projectURL);
    // NewUI_backup_Creation();

    NewUI_OpenProjectbranch(projectName, Dev_branchName, branchVersion, projectURL);
    obj_navtab.Backup_Btn_Enable_Click();
    obj_backup.delete_Backup_Btn();
    obj_backup.backup_delete_confirmation_button();
    NewUI_toastMessageValidation("Backup delete successfully", 2 * 60 * 1000)

  })

  it("Admin should not ab able to assign it self user rights.", () => {
    NewUI_OpenProjectbranch(projectName, Dev_branchName, branchVersion, projectURL);
    NewUI_OpenSettings();
    obj_settings.admin_role_drop_down_should_be_disable();
  })

  it.skip("User should be able to download backup without file store.", () => {
    NewUI_OpenProjectbranch(projectName, Dev_branchName, branchVersion, projectURL);
    // NewUI_backup_Creation();
    obj_navtab.Backup_Btn_Enable_Click();
    obj_backup.backup_download_button_click(0);
    obj_backup.download_Data_Base_dump_popup_shouldbe_appear();
    obj_backup.checkbox_without_filestore();
    obj_backup.download_start_btn_click();

    NewUI_toastMessageValidation("Database dump will be ready to download soon.", 5 * 1000 * 60)
    NewUI_toastMessageValidation("Database Dump is ready to download", 7 * 1000 * 60)
    obj_backup.download_btn_on_toast_message();
    cy.wait_for_file_to_appear_in_download();


  })
  it.skip("connectas functionality", () => {
    NewUI_OpenProjectbranch(projectName, Dev_branchName, branchVersion, projectURL);

  })

  it("odoo page validation for prod stages", () => {
    NewUI_OpenProjectbranch(projectName, Dev_branchName, branchVersion, projectURL);
   
    cy.visit(`${projectURL}/${projectName}/branches/${Dev_branchName}/history`, {
      onBeforeLoad(win) {
        cy.stub(win, 'open').as('windowOpen');
      }
    });

    cy.get('button.btn-lg.btn-success.connect').click();

    cy.get('@windowOpen', { timeout: 15000 }).should('be.called').then((stub) => {
      const url = stub.getCall(0).args[0];
      // cy.visit(url);
      cy.pingUrl(url);
    });
    // cy.wait(5000)
    // cy.get('body').then(($body) => {
    //   if ($body.find('.btn').length > 0) {
    //     cy.get('.btn').should('be.visible');
    //   } else if ($body.find('.dashboard-page-element').length > 0) {
    //     cy.get('.dashboard-page-element', { timeout: 10000 }).should('be.visible');
    //   }
    //   else if ($body.find('.o_home_menu').length > 0) {
    //     cy.get('.o_home_menu', { timeout: 10000 }).should('be.visible');
    //   }
    //   else {
    //     throw new Error('Neither Login nor Dashboard found!');
    //   }
    // });


  })
  it("odoo page validation for dev stages", () => {
    NewUI_OpenProjectbranch(projectName, branchName, branchVersion, projectURL);


    cy.visit(`${projectURL}/${projectName}/branches/${branchName}/history`, {
      onBeforeLoad(win) {
        cy.stub(win, 'open').as('windowOpen');
      }
    });

    cy.get('button.btn-lg.btn-success.connect').click();

    cy.get('@windowOpen', { timeout: 15000 }).should('be.called').then((stub) => {
      const url = stub.getCall(0).args[0];
      // cy.visit(url);
      cy.pingUrl(url);
    });
    // cy.wait(5000)
    // cy.get('body').then(($body) => {
    //   if ($body.find('.btn').length > 0) {
    //     cy.get('.btn').should('be.visible');
    //   } else if ($body.find('.dashboard-page-element').length > 0) {
    //     cy.get('.dashboard-page-element', { timeout: 10000 }).should('be.visible');
    //   }
    //   else if ($body.find('.o_home_menu').length > 0) {
    //     cy.get('.o_home_menu', { timeout: 10000 }).should('be.visible');
    //   }
    //   else {
    //     throw new Error('Neither Login nor Dashboard found!');
    //   }
    // });


  })
  it("odoo page validation for staging stages", () => {
    NewUI_OpenProjectbranch(projectName, Stagging_branchName, branchVersion, projectURL);


    cy.visit(`${projectURL}/${projectName}/branches/${Stagging_branchName}/history`, {
      onBeforeLoad(win) {
        cy.stub(win, 'open').as('windowOpen');
      }
    });

    cy.get('button.btn-lg.btn-success.connect').click();

    cy.get('@windowOpen', { timeout: 15000 }).should('be.called').then((stub) => {
      const url = stub.getCall(0).args[0];
      // cy.visit(url);
      cy.pingUrl(url);
    });
    // cy.wait(5000)
    // cy.get('body').then(($body) => {
    //   if ($body.find('.btn').length > 0) {
    //     cy.get('.btn').should('be.visible');
    //   } else if ($body.find('.dashboard-page-element').length > 0) {
    //     cy.get('.dashboard-page-element', { timeout: 10000 }).should('be.visible');
    //   }
    //   else if ($body.find('.o_home_menu').length > 0) {
    //     cy.get('.o_home_menu', { timeout: 10000 }).should('be.visible');
    //   }
    //   else {
    //     throw new Error('Neither Login nor Dashboard found!');
    //   }
    // });


  })

})

describe("phase 3", () => {
  beforeEach('', () => {
    cy.NewUI_ForProdEnvironment().then((Url) => {
      projectURL = Url;
    });
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false;
    });
  });

  it("Validate proper error if project with same name already exists", () => {
    NewUI_CreateNewProject_till_Deploy_Button_phase3(projectURL, projectName, branchVersion,dropdown_branchVersion)
    NewUI_toastMessageValidation("Repository already exist on GitHub.", 6 * 1000)
  })
  it("Allow user to delete custom-domain", () => {

    const domain_name = "www.harry67.click2deploy.com"
    NewUI_OpenProjectbranch(projectName, Dev_branchName, branchVersion, projectURL);
    obj_navtab.Setting_Enable();
    obj_navtab.Setting_Enable_click();
    obj_api.get_branch_Settings(6000);
    obj_branchSettings.custom_domain_Textfield(domain_name);
    obj_branchSettings.click_on_add_domain_btn();
    obj_api.post_add_custom_domain(6000);
    obj_branchSettings.delete_specific_domain_listed(domain_name);
    NewUI_toastMessageValidation("Custom domain deleted successfully.", 6000)
  })
  it("Admin should not be able to change its role to user and delete admin role", () => {
    NewUI_OpenProjectbranch(projectName, branchName, branchVersion, projectURL)
    NewUI_OpenSettings();
    obj_projectsettings.admin_role_field();
    obj_projectsettings.admin_role_field_delete_btn();
  })
})

describe("phase 4", () => {
  beforeEach('', () => {
    cy.NewUI_ForProdEnvironment().then((Url) => {
      projectURL = Url;
    });
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false;
    });
  });

  it("Delete Project", () => {
    NewUI_deleteproject(projectURL,projectName);
  })
 
})
