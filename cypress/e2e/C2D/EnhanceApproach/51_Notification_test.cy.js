///<reference types="cypress" />
import { NewUI_ALL_project_Delete, NewUI_CreateNewProject, NewUI_deleteproject } from "../../../support/utilities";
import Api from "../../../PageObjects/Api";


let projectURL;
let projectName;
let branchVersion= Cypress.env("branchVersion");

describe("Notification Test",()=>{
  
    beforeEach(()=>{

     cy.NewUI_ForProdEnvironment().then((url)=>{
      projectURL=url;
     });

     Cypress.on("uncaught:exception", (err, runnable) => {
        return false;
      });

    })

     it("Test 1",()=>{
         cy.visit(projectURL);

     })
      it("Test 2",()=>{
         cy.visit(projectURL);

     })
        it("Intentionally failed test",()=>{
         cy.visit(projectURL);
         cy.get("work").click();

     })
   
})