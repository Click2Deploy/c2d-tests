///<reference types="cypress"/>

import Api from "../../../PageObjects/Api";
import Backups from "../../../PageObjects/Backups";
import { branch_Settings } from "../../../PageObjects/BranchSettings";
import EnvironmentNavBar from "../../../PageObjects/EnvironmentNavBar";
import Navtab from "../../../PageObjects/NavTab";
import ProjectSetting from "../../../PageObjects/ProjectSetting";
import { Settings } from "../../../PageObjects/Settings";
import { dropdown_branchVersion } from "../../../support/branchConfig";

import { generateRandomString, NewUI_Add_Collabrator, NewUI_ADD_SubModule, NewUI_backup_Creation, NewUI_BuildValidation, NewUI_ConnectButtonValidation, NewUI_createBranchInDevelopment, NewUI_CreateBranchInStagging, NewUI_CreateNewProject, NewUI_CreateNewProject_till_Deploy_Button, NewUI_deleteBranch, NewUI_deleteproject, NewUI_dragto, NewUI_DroppedButtonValidation, NewUI_Editor_Verify_byOpening, NewUI_HistorySubModule, newui_install_Logs, NewUI_Logs, NewUI_Logs_FilterValidation, NewUI_MonitorValidation, NewUI_OpenProject, NewUI_OpenProjectbranch, NewUI_OpenSettings, NewUI_Shells_Verify_byOpening, NewUI_SuccessStatusValidation, NewUI_TabsValidationDevelopment, NewUI_TabsValidationProduction, NewUI_toastMessageValidation, oddopage_validation } from "../../../support/utilities";

let projectURL;
 let projectName;
// let projectName="versioer";
let branchName="main";

// let branchVersion="E-18";

// let Dev_branchName2=generateRandomString(5);  // not in used 

 let Dev_branchName=generateRandomString(2);
 let Stagging_branchName=generateRandomString(3);


// let Dev_branchName="pd";
// let Stagging_branchName="st";


const obj_EnvironmentNavBar= new EnvironmentNavBar();
const obj_navtab=new Navtab();
const obj_api=new Api();
const obj_projectsettings= new ProjectSetting();
const obj_backup= new Backups();
const obj_settings = new Settings();
const obj_branchSettings = new branch_Settings();




describe("Verify all Odoo version builds",()=>{
  beforeEach(() => {
    cy.NewUI_ForProdEnvironment().then((Url) => {
      projectURL = Url;
    });
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false;
    });
  });

it("verify Odoo build on version 13 community",()=>{
  const branchVersion_v13="13"
  const dropdown_branchVersion="13.0 Community"
  const projectName_V13  = NewUI_CreateNewProject(projectURL,branchVersion_v13,dropdown_branchVersion)
  NewUI_CreateBranchInStagging(projectName_V13,Stagging_branchName,branchVersion_v13,projectURL)
  NewUI_createBranchInDevelopment(projectName_V13,Dev_branchName,branchVersion_v13,projectURL)
  NewUI_dragto(Dev_branchName,obj_EnvironmentNavBar.selector_ProdEnvironment,branchVersion_v13)
  NewUI_ConnectButtonValidation(branchName,branchVersion_v13);
  NewUI_SuccessStatusValidation();
  NewUI_ConnectButtonValidation(Stagging_branchName,branchVersion_v13);
  NewUI_SuccessStatusValidation();
  NewUI_ConnectButtonValidation(Dev_branchName,branchVersion_v13);
  NewUI_SuccessStatusValidation();
  NewUI_deleteproject(projectURL,projectName_V13);
  cy.wait(2000)
})
it("verify Odoo build on version 13 Enterprise",()=>{
  const branchVersion_v13E_dropdown="13.0 Enterprise"
  const branchVersion_v13E="E-13"
  let projectName_V13E = generateRandomString(4)

  NewUI_CreateNewProject_till_Deploy_Button(projectURL,projectName_V13E,branchVersion_v13E_dropdown)
  NewUI_CreateBranchInStagging(projectName_V13E,Stagging_branchName,branchVersion_v13E,projectURL)
  NewUI_createBranchInDevelopment(projectName_V13E,Dev_branchName,branchVersion_v13E,projectURL)
  NewUI_dragto(Dev_branchName,obj_EnvironmentNavBar.selector_ProdEnvironment,branchVersion_v13E)
  NewUI_ConnectButtonValidation(branchName,branchVersion_v13E);
  NewUI_SuccessStatusValidation();
  NewUI_ConnectButtonValidation(Stagging_branchName,branchVersion_v13E);
  NewUI_SuccessStatusValidation();
  NewUI_ConnectButtonValidation(Dev_branchName,branchVersion_v13E);
  NewUI_SuccessStatusValidation();
  NewUI_deleteproject(projectURL,projectName_V13E);
  cy.wait(2000)
})

it("verify Odoo build on version 14 community",()=>{
  const branchVersion_v="14"
  const dropdown_branchVersion="14.0 Community"
  const projectName_v  = NewUI_CreateNewProject(projectURL,branchVersion_v,dropdown_branchVersion)
  NewUI_CreateBranchInStagging(projectName_v,Stagging_branchName,branchVersion_v,projectURL)
  NewUI_createBranchInDevelopment(projectName_v,Dev_branchName,branchVersion_v,projectURL)
  NewUI_dragto(Dev_branchName,obj_EnvironmentNavBar.selector_ProdEnvironment,branchVersion_v)
  NewUI_ConnectButtonValidation(branchName,branchVersion_v);
  NewUI_SuccessStatusValidation();
  NewUI_ConnectButtonValidation(Stagging_branchName,branchVersion_v);
  NewUI_SuccessStatusValidation();
  NewUI_ConnectButtonValidation(Dev_branchName,branchVersion_v);
  NewUI_SuccessStatusValidation();
  NewUI_deleteproject(projectURL,projectName_v);
  cy.wait(2000)
})
it("verify Odoo build on version 14 Enterprise",()=>{
  const branchVersion_vE_dropdown="14.0 Enterprise"
  const branchVersion_vE="E-14"
  let projectName_vE = generateRandomString(4)

  NewUI_CreateNewProject_till_Deploy_Button(projectURL,projectName_vE,branchVersion_vE_dropdown)
  // const projectName_V13E  = NewUI_CreateNewProject(projectURL,branchVersion_v13E)
  NewUI_CreateBranchInStagging(projectName_vE,Stagging_branchName,branchVersion_vE,projectURL)
  NewUI_createBranchInDevelopment(projectName_vE,Dev_branchName,branchVersion_vE,projectURL)
  NewUI_dragto(Dev_branchName,obj_EnvironmentNavBar.selector_ProdEnvironment,branchVersion_vE)
  NewUI_ConnectButtonValidation(branchName,branchVersion_vE);
  NewUI_SuccessStatusValidation();
  NewUI_ConnectButtonValidation(Stagging_branchName,branchVersion_vE);
  NewUI_SuccessStatusValidation();
  NewUI_ConnectButtonValidation(Dev_branchName,branchVersion_vE);
  NewUI_SuccessStatusValidation();
  NewUI_deleteproject(projectURL,projectName_vE);
  cy.wait(2000)
})

it("verify Odoo build on version 15 community",()=>{
  const branchVersion_v="15"
  const dropdown_branchVersion="15.0 Community"
  const projectName_v  = NewUI_CreateNewProject(projectURL,branchVersion_v,dropdown_branchVersion)
  NewUI_CreateBranchInStagging(projectName_v,Stagging_branchName,branchVersion_v,projectURL)
  NewUI_createBranchInDevelopment(projectName_v,Dev_branchName,branchVersion_v,projectURL)
  NewUI_dragto(Dev_branchName,obj_EnvironmentNavBar.selector_ProdEnvironment,branchVersion_v)
  NewUI_ConnectButtonValidation(branchName,branchVersion_v);
  NewUI_SuccessStatusValidation();
  NewUI_ConnectButtonValidation(Stagging_branchName,branchVersion_v);
  NewUI_SuccessStatusValidation();
  NewUI_ConnectButtonValidation(Dev_branchName,branchVersion_v);
  NewUI_SuccessStatusValidation();
  NewUI_deleteproject(projectURL,projectName_v);
  cy.wait(2000)
})
it("verify Odoo build on version 15 Enterprise",()=>{
  const branchVersion_vE_dropdown="15.0 Enterprise"
  const branchVersion_vE="E-15"
  let projectName_vE = generateRandomString(4)

  NewUI_CreateNewProject_till_Deploy_Button(projectURL,projectName_vE,branchVersion_vE_dropdown)
  // const projectName_V13E  = NewUI_CreateNewProject(projectURL,branchVersion_v13E)
  NewUI_CreateBranchInStagging(projectName_vE,Stagging_branchName,branchVersion_vE,projectURL)
  NewUI_createBranchInDevelopment(projectName_vE,Dev_branchName,branchVersion_vE,projectURL)
  NewUI_dragto(Dev_branchName,obj_EnvironmentNavBar.selector_ProdEnvironment,branchVersion_vE)
  NewUI_ConnectButtonValidation(branchName,branchVersion_vE);
  NewUI_SuccessStatusValidation();
  NewUI_ConnectButtonValidation(Stagging_branchName,branchVersion_vE);
  NewUI_SuccessStatusValidation();
  NewUI_ConnectButtonValidation(Dev_branchName,branchVersion_vE);
  NewUI_SuccessStatusValidation();
  NewUI_deleteproject(projectURL,projectName_vE);
  cy.wait(2000)
})

it("verify Odoo build on version 16 community",()=>{
  const branchVersion_v="16"
  const dropdown_branchVersion="16.0 Community"
  const projectName_v  = NewUI_CreateNewProject(projectURL,branchVersion_v,dropdown_branchVersion)
  NewUI_CreateBranchInStagging(projectName_v,Stagging_branchName,branchVersion_v,projectURL)
  NewUI_createBranchInDevelopment(projectName_v,Dev_branchName,branchVersion_v,projectURL)
  NewUI_dragto(Dev_branchName,obj_EnvironmentNavBar.selector_ProdEnvironment,branchVersion_v)
  NewUI_ConnectButtonValidation(branchName,branchVersion_v);
  NewUI_SuccessStatusValidation();
  NewUI_ConnectButtonValidation(Stagging_branchName,branchVersion_v);
  NewUI_SuccessStatusValidation();
  NewUI_ConnectButtonValidation(Dev_branchName,branchVersion_v);
  NewUI_SuccessStatusValidation();
  NewUI_deleteproject(projectURL,projectName_v);
  cy.wait(2000)
})
it("verify Odoo build on version 16 Enterprise",()=>{
  const branchVersion_vE_dropdown="16.0 Enterprise"
  const branchVersion_vE="E-16"
  let projectName_vE = generateRandomString(4)

  NewUI_CreateNewProject_till_Deploy_Button(projectURL,projectName_vE,branchVersion_vE_dropdown)
  // const projectName_V13E  = NewUI_CreateNewProject(projectURL,branchVersion_v13E)
  NewUI_CreateBranchInStagging(projectName_vE,Stagging_branchName,branchVersion_vE,projectURL)
  NewUI_createBranchInDevelopment(projectName_vE,Dev_branchName,branchVersion_vE,projectURL)
  NewUI_dragto(Dev_branchName,obj_EnvironmentNavBar.selector_ProdEnvironment,branchVersion_vE)
  NewUI_ConnectButtonValidation(branchName,branchVersion_vE);
  NewUI_SuccessStatusValidation();
  NewUI_ConnectButtonValidation(Stagging_branchName,branchVersion_vE);
  NewUI_SuccessStatusValidation();
  NewUI_ConnectButtonValidation(Dev_branchName,branchVersion_vE);
  NewUI_SuccessStatusValidation();
  NewUI_deleteproject(projectURL,projectName_vE);
  cy.wait(2000)
})

it("verify Odoo build on version 17 community",()=>{
  const branchVersion_v="17"
  const dropdown_branchVersion="17.0 Community"
  const projectName_v  = NewUI_CreateNewProject(projectURL,branchVersion_v,dropdown_branchVersion)
  NewUI_CreateBranchInStagging(projectName_v,Stagging_branchName,branchVersion_v,projectURL)
  NewUI_createBranchInDevelopment(projectName_v,Dev_branchName,branchVersion_v,projectURL)
  NewUI_dragto(Dev_branchName,obj_EnvironmentNavBar.selector_ProdEnvironment,branchVersion_v)
  NewUI_ConnectButtonValidation(branchName,branchVersion_v);
  NewUI_SuccessStatusValidation();
  NewUI_ConnectButtonValidation(Stagging_branchName,branchVersion_v);
  NewUI_SuccessStatusValidation();
  NewUI_ConnectButtonValidation(Dev_branchName,branchVersion_v);
  NewUI_SuccessStatusValidation();
  NewUI_deleteproject(projectURL,projectName_v);
  cy.wait(2000)
})
it("verify Odoo build on version 17 Enterprise",()=>{
  const branchVersion_vE_dropdown="17.0 Enterprise"
  const branchVersion_vE="E-17"
  let projectName_vE = generateRandomString(4)

  NewUI_CreateNewProject_till_Deploy_Button(projectURL,projectName_vE,branchVersion_vE_dropdown)
  // const projectName_V13E  = NewUI_CreateNewProject(projectURL,branchVersion_v13E)
  NewUI_CreateBranchInStagging(projectName_vE,Stagging_branchName,branchVersion_vE,projectURL)
  NewUI_createBranchInDevelopment(projectName_vE,Dev_branchName,branchVersion_vE,projectURL)
  NewUI_dragto(Dev_branchName,obj_EnvironmentNavBar.selector_ProdEnvironment,branchVersion_vE)
  NewUI_ConnectButtonValidation(branchName,branchVersion_vE);
  NewUI_SuccessStatusValidation();
  NewUI_ConnectButtonValidation(Stagging_branchName,branchVersion_vE);
  NewUI_SuccessStatusValidation();
  NewUI_ConnectButtonValidation(Dev_branchName,branchVersion_vE);
  NewUI_SuccessStatusValidation();
  NewUI_deleteproject(projectURL,projectName_vE);
  cy.wait(2000)
})

it("verify Odoo build on version 18 community",()=>{
  const branchVersion_v="18"
  const dropdown_branchVersion="18.0 Community"
  const projectName_v  = NewUI_CreateNewProject(projectURL,branchVersion_v,dropdown_branchVersion)
  NewUI_CreateBranchInStagging(projectName_v,Stagging_branchName,branchVersion_v,projectURL)
  NewUI_createBranchInDevelopment(projectName_v,Dev_branchName,branchVersion_v,projectURL)
  NewUI_dragto(Dev_branchName,obj_EnvironmentNavBar.selector_ProdEnvironment,branchVersion_v)
  NewUI_ConnectButtonValidation(branchName,branchVersion_v);
  NewUI_SuccessStatusValidation();
  NewUI_ConnectButtonValidation(Stagging_branchName,branchVersion_v);
  NewUI_SuccessStatusValidation();
  NewUI_ConnectButtonValidation(Dev_branchName,branchVersion_v);
  NewUI_SuccessStatusValidation();
  NewUI_deleteproject(projectURL,projectName_v);
  cy.wait(2000)
})
it("verify Odoo build on version 18 Enterprise",()=>{
  const branchVersion_vE_dropdown="18.0 Enterprise"
  const branchVersion_vE="E-18"
  let projectName_vE = generateRandomString(4)

  NewUI_CreateNewProject_till_Deploy_Button(projectURL,projectName_vE,branchVersion_vE_dropdown)
  NewUI_CreateBranchInStagging(projectName_vE,Stagging_branchName,branchVersion_vE,projectURL)
  NewUI_createBranchInDevelopment(projectName_vE,Dev_branchName,branchVersion_vE,projectURL)
  NewUI_dragto(Dev_branchName,obj_EnvironmentNavBar.selector_ProdEnvironment,branchVersion_vE)
  NewUI_ConnectButtonValidation(branchName,branchVersion_vE);
  NewUI_SuccessStatusValidation();
  NewUI_ConnectButtonValidation(Stagging_branchName,branchVersion_vE);
  NewUI_SuccessStatusValidation();
  NewUI_ConnectButtonValidation(Dev_branchName,branchVersion_vE);
  NewUI_SuccessStatusValidation();
  NewUI_deleteproject(projectURL,projectName_vE);
  cy.wait(2000)
})

})