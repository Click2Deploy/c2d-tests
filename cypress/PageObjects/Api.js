import { time } from "console";
import { branchVersion } from "../support/branchConfig";


export default class Api
{
    getBranches(time)
    {
      cy.wait('@getBranches', { timeout: time }).its('response.statusCode').should('eq', 200);
    }
    getBackups(time)
    {
        cy.wait("@getBackups" ,{ timeout: time }).its("response.statusCode").should("eq", 200);
    }

    postBackup(time)
    {
        cy.wait('@postBackup', { timeout : time }).its("response.statusCode").should("eq", 201);
    }
    // getSubmodule(time)
    // {
    //     cy.wait("@Add_submodule",{ timeout : time }).its('response.statusCode').should("eq",200);
    // }
    // getSubmodule(time,text)  // for repeating if submodule api fails. 
    // {
    //     cy.wait("@Add_submodule",{ timeout : time }).then((intercept)=>{
    //       if(intercept.response.statusCode === 200)
    //       {
    //         cy.log('Submodule added successfull-- API works 200ok');
    //       }
    //       else
    //       {
    //         cy.log('Submodule failed to added -- we are Retrying.');
    //         const submodule_obj=new SubModuleClass();
    //         let api_obj=new Api();
    //        // let text="git@github.com:HDLearning/privt_module.git";
    //         // let text="git@github.com:pucar15sahiwal/git-public-repo.git";
    //         submodule_obj.submodule_blue_Btn();
    //         submodule_obj.add_Repository_textbox(text);
    //         submodule_obj.Proceed_btn();
    //         api_obj.getSubmodule(20000);
         
    //       }
    //     })
    // }
    getSubmodule(time)  // for repeating if submodule api fails. 
    {
        cy.wait("@Add_submodule",{ timeout : time }).then((intercept)=>{
          if(intercept.response.statusCode === 200)
          {
            cy.log(`✅ Submodule added successfully -- API works 200 OK`);
          }
          else
          {
            const errorMessage = `❌ Submodule API failed: Status ${intercept.response.statusCode}, Response: ${JSON.stringify(intercept.response.body)}`;
            cy.log(errorMessage); 
            throw new Error(errorMessage);
         
          }
        })
    }
    get_Install_logs(time)
    {
        cy.wait("@install_logs",{ timeout : time}).its('response.statusCode').should("eq",200);
    }
    get_ExistRepository()
    {
        cy.wait("@ExistRepository",{ timeout : 2*60*1000}).then((intercept)=>{
            if(intercept.response.statusCode === 200)
            {
                cy.log("Existing api response is successfull")
            }
            else
            {
                cy.log("Existing api response is Not-successfull, so reloading the page")
                cy.reload();
                cy.wait(4000);
                cy.get("button[class='btn btn-primary btn-lg rounded-3 c2d-btn']").click();
                cy.get("input[type='radio'][value='existing']").click();
                this.get_ExistRepository();
                cy.wait(1000);
            }
          })
    }
    get_getProjects(ProjectURL)
    {
      cy.wait(2000)

        cy.get('body',{ timeout : 10000 }).then((body)=>{               //.project-grid-card
          if(body.find('.project-grid-card').length > 0)                             //div.titles
          {
            cy.wait('@getProjects',{ timeout : 20000 }).then((interception) => {
              if (interception.response.statusCode === 200) {
                 
                 cy.log('GetProjects API call was successful');
               } 
               else 
               {
                 
                 cy.log(`GetProjects API failed with status code: ${interception.response.statusCode}`);
                 cy.visit(ProjectURL);
                 cy.log("reopening the project as we are not getting project api response ")
                 this.get_getProjects(ProjectURL);
               }
             });
          }
          else
          {
            cy.log(`Project are not visible so revisiting the page via url`);
            cy.visit(ProjectURL);
            cy.wait(1000)
            this.get_getProjects(ProjectURL);
          }
        })
       
    }
    post_deployRequest(projectName,projectURL)
    {
      cy.wait('@deployRequest',{ timeout : 20000 }).then((interception) => {
        if (interception.response.statusCode === 201) {
           
           cy.log('DeployRequest API call is successfull');
         } 
         else 
         {
           cy.log(`DeployRequest API failed with status code: ${interception.response.statusCode}`);
           cy.log('Revisiting via URL');
           cy.visit(`${projectURL}/`);
           cy.wait(2000)
           cy.get("button[class='btn btn-primary btn-lg rounded-3 c2d-btn']").click();
           cy.get("input[name='repository']").type(projectName);
           cy.get("select[name='version']").select(`${branchVersion}`);
           cy.contains("div[class='d-flex align-items-center justify-content-center'] span", 'Deploy').click();
           cy.wait('@getProjects', { timeout: 10000 }).its('response.statusCode').should('eq', 200);
         }
       });
    }
    get_branch_Settings(time)
    {
      cy.wait("@branchsetting",{ timeout : time }).its('response.statusCode').should('eq',200);
    }
    post_add_custom_domain(time)
    {
      cy.wait("@post_Add_Custom_domain",{ timeout : time}).its("response.statusCode").should("eq",200);
    }
        
        
}
