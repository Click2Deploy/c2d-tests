///<reference types="cypress" />
import { NewUI_ALL_project_Delete, NewUI_CreateNewProject, NewUI_deleteproject } from "../../../support/utilities";
import Api from "../../../PageObjects/Api";


let projectURL;
let projectName;
let branchVersion= Cypress.env("branchVersion");

describe("Delete All Project",()=>{
  
    beforeEach(()=>{

     cy.NewUI_ForProdEnvironment().then((url)=>{
      projectURL=url;
     });

     Cypress.on("uncaught:exception", (err, runnable) => {
        return false;
      });

    })

     it("Delete all Project",()=>{

      const projectNamesToSkip = ['BranchMergeProd', 'BranchMerge']; // Names of projects to skip
      NewUI_ALL_project_Delete(projectURL,projectNamesToSkip);
       

         
     })
   
})