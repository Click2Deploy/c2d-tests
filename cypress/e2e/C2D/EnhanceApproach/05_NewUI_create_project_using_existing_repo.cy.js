import {  generateRandomString, NewUI_ConnectButtonValidation, NewUI_CreateBranchInStagging, NewUI_CreateNewProjectUsingExistingRepo, NewUI_deleteBranch, NewUI_deleteproject, NewUI_dragto, NewUI_OpenProject, NewUI_OpenProjectbranch, NewUI_SuccessStatusValidation } from "../../../support/utilities";
let projectURL;
let projectName;
let branchName= generateRandomString(2);
let branchVersion= Cypress.env("branchVersion");
let existig_branch="main";


// let projectName="Ciciv13"
// let branchName= "main";

describe('(Existing Project)', () => {
  

    beforeEach(()=>{
        
        cy.NewUI_ForProdEnvironment().then((url)=>{
            projectURL=url;
        })

        Cypress.on("uncaught:exception",(err,runnable)=>{
            return false;
        })

    })

    it("(Existing Project)Create_project_using_existing_repository",()=>{
        NewUI_CreateNewProjectUsingExistingRepo(projectURL);
        cy.get('@projectName').then((projectNameA) => {

            projectName = projectNameA;
        })
    })

    it('(Existing Project)Build should be succeed on Creating new branch', () => {
    //    NewUI_CreateNewProjectUsingExistingRepo(projectURL);
    //    cy.get('@projectName').then((projectNameA) => {

    //     projectName = projectNameA;
    //     cy.log("Project name for 32 number test case:", projectName);
    
        // Now you can use the projectName in subsequent function calls
        NewUI_OpenProjectbranch(projectName,existig_branch,branchVersion,projectURL);
        NewUI_CreateBranchInStagging(projectName, branchName,branchVersion, projectURL);
        NewUI_ConnectButtonValidation(branchName,branchVersion);
        NewUI_SuccessStatusValidation();
    //  });

    })

    it('(Existing Project)Project should have no builds after creation', () => {
      cy.wrap(projectName).should('exist');

      NewUI_OpenProjectbranch(projectName,existig_branch,branchVersion,projectURL);
      cy.contains('span', 'Dropped').should('exist');
     
    })

    it('(Existing Project) Build should be created successfully after its environment change', () => {

     NewUI_OpenProject(projectName,projectURL)
      NewUI_dragto(existig_branch,"#Production",branchVersion);
      NewUI_OpenProjectbranch(projectName,existig_branch,branchVersion,projectURL);
      NewUI_ConnectButtonValidation(existig_branch,branchVersion);
      NewUI_SuccessStatusValidation();
    })
    it("(Existing Project) Delete Created branch in stagging",()=>{
        NewUI_OpenProjectbranch(projectName,branchName,branchVersion,projectURL);
        NewUI_deleteBranch(projectName,branchName,branchVersion,"Active");
    })

    it("(Existing Project) Delete Project ",()=>{
        NewUI_deleteproject(projectURL,projectName);
    })
})
