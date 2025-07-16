///<reference types="cypress"  />
import Navtab from "../PageObjects/NavTab";

import Backups from "../PageObjects/Backups";
import SubModuleClass from "../PageObjects/Submodule";
import history from "../PageObjects/History";
import EnvironmentNavBar from "../PageObjects/EnvironmentNavBar";
import projectspage from "../PageObjects/projectspage.cy";
import Api from "../PageObjects/Api";
import { Settings } from "../PageObjects/Settings";
import { constant } from "lodash";



// --------------------------------NEW UI -----------------------------------------------//
// --------------------------------NEW UI -----------------------------------------------//
// --------------------------------NEW UI -----------------------------------------------//
// --------------------------------NEW UI -----------------------------------------------//


const obj_EnvironmentNavBar= new EnvironmentNavBar();
const obj_navtab= new Navtab();

const obj_projectpage= new projectspage();
const obj_api= new Api();
const obj_settings = new Settings();
const obj_history = new history();

let branchVersion= Cypress.env("branchVersion");

export const generateRandomString = (length) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return "branch" + result;
}

export const NewUI_CreateNewProject = (projectURL,branchVersion,subscriptionCode) => {
  const projectlastname = generateRandomString(5);
  const uniqueNumber = Date.now();
//   const versions = [17]; //[15, 16, 17]
const versions = [branchVersion];  

  const randomVersion = versions[Math.floor(Math.random() * versions.length)];
  let projectName = `project${projectlastname}`;
//  let subscriptionCode;
//  let subscriptionCode="XNCEFPMLMJ5D";

  cy.visit(`${projectURL}/`);
   
// ===== subscription code ===//

// need to commint 
  // subscriptionCode_Generator(URL).then((code)=>{
  //   cy.log(`subscription code is = ${code}`)
  //   subscriptionCode=code;
  //   cy.log(`subscription code is ==== ${subscriptionCode}`)
  //   cy.visit(`${URL}`);  // to go back to projects screen from subscription code screen. 
    // ===== subscription code ===//

    cy.get("button[class='btn btn-primary btn-lg rounded-3 c2d-btn']").click();
    cy.get("input[name='repository']").type(projectName);
  
    cy.get("select[name='version']").select(`${randomVersion}`);

    // ===== subscription code ===//
   cy.get(`input[name='subscriptionCode']`).type(`${subscriptionCode}`);  // need to comment 
// ===== subscription code ===//

    cy.contains("div[class='d-flex align-items-center justify-content-center'] span", 'Deploy').click();

    // ===== subscription code ===//
  // })  // need to comment
// ===== subscription code ===//

 // cy.wait('@deployRequest', { timeout: 20000 }).its('response.statusCode').should('eq', 201);
  // cy.wait('@deployRequest',{ timeout : 20000 }).then((interception) => {
  //   if (interception.response.statusCode === 200) {
       
  //      cy.log('DeployRequest API call is successfull');
  //    } 
  //    else 
  //    {
  //      cy.reload();
  //      cy.get("button[class='btn btn-primary btn-lg rounded-3 c2d-btn']").click();
  //      cy.get("input[name='repository']").type(projectName);
  //      cy.contains("div[class='d-flex align-items-center justify-content-center'] span", 'Deploy').click();
  //    }
  //  });
   
  obj_api.post_deployRequest(projectName,projectURL);

  cy.get('.c2d-form > .row', { timeout: 10000 }).should('not.exist');

  // cy.wait('@getProjects', { timeout: 10000 }).its('response.statusCode').should('eq', 200);
  obj_api.get_getProjects(projectURL);
 
  cy.wait(1000);
  cy.contains('div', projectName).should('be.visible').click();
  cy.wait(2000)

  cy.get('body').then((body) => {
    if (body.find(`.branch.cursor-pointer`).length > 0)
       {
      cy.contains('div', 'Development').should('be.visible');
      cy.wait('@getBranches', { timeout: 10000 }).its('response.statusCode').should('eq', 200);
      cy.wait("@getProjectTracking",{ timeout : 20000 }).its('response.statusCode').should('eq',200);
      
     // cy.contains(`.branch.cursor-pointer`, 'main').should('be.visible');
        obj_EnvironmentNavBar.branch_shouldbe_visible("main",branchVersion);

      cy.log('Project Created');
     // cy.contains("div[draggable='true']", 'main').should('be.visible').click();
        obj_EnvironmentNavBar.click_on_branch("main",branchVersion);

    } else {
      cy.contains('div', projectName).should('be.visible').click({ force : true});
      cy.wait(2000)
      cy.wait('@getBranches', { timeout: 10000 }).its('response.statusCode').should('eq', 200);
      cy.wait("@getProjectTracking",{ timeout : 20000 }).its('response.statusCode').should('eq',200);
   
     // cy.contains(`.branch.cursor-pointer`, 'main').should('be.visible');
      obj_EnvironmentNavBar.branch_shouldbe_visible("main",branchVersion);
      cy.log('Project Created');
      // cy.contains("div[draggable='true']", 'main').should('be.visible').click({ force : true });
      obj_EnvironmentNavBar.click_on_branch("main",branchVersion);
    }
  });


  return projectName;
};

export const NewUI_CreateNewProject_till_Deploy_Button=(projectURL,projectName,branchVersion,subscriptionCode)=>{
  //   const projectlastname = generateRandomString(5);
  // const uniqueNumber = Date.now();
  // const versions = [17]; //[15, 16, 17]
const versions = [branchVersion];  

  const randomVersion = versions[Math.floor(Math.random() * versions.length)];
  // let projectName = `project${projectlastname}`;
//  let subscriptionCode;


  cy.visit(`${projectURL}/`);
   
// ===== subscription code ===//

// need to commint 
  // subscriptionCode_Generator(URL).then((code)=>{
  //   cy.log(`subscription code is = ${code}`)
  //   subscriptionCode=code;
  //   cy.log(`subscription code is ==== ${subscriptionCode}`)
  //   cy.visit(`${URL}`);  // to go back to projects screen from subscription code screen. 
    // ===== subscription code ===//

    cy.get("button[class='btn btn-primary btn-lg rounded-3 c2d-btn']").click();
    cy.get("input[name='repository']").type(projectName);
  
    cy.get("select[name='version']").select(`${randomVersion}`);

    // ===== subscription code ===//
   cy.get(`input[name='subscriptionCode']`).type(`${subscriptionCode}`);  // need to comment 
// ===== subscription code ===//

    cy.contains("div[class='d-flex align-items-center justify-content-center'] span", 'Deploy').click();
   obj_api.post_deployRequest(projectName,projectURL);

  cy.get('.c2d-form > .row', { timeout: 10000 }).should('not.exist');

  // cy.wait('@getProjects', { timeout: 10000 }).its('response.statusCode').should('eq', 200);
  obj_api.get_getProjects(projectURL);
 
  cy.wait(1000);
  cy.contains('div', projectName).should('be.visible').click();
  cy.wait(2000)

    // ===== subscription code ===//
  // })  // need to comment
// ===== subscription code ===//
}

export const NewUI_CreateNewProject_till_Deploy_Button_phase3=(projectURL,projectName,branchVersion,subscriptionCode)=>{
  //   const projectlastname = generateRandomString(5);
  // const uniqueNumber = Date.now();
  // const versions = [17]; //[15, 16, 17]
const versions = [branchVersion];  

  const randomVersion = versions[Math.floor(Math.random() * versions.length)];
  // let projectName = `project${projectlastname}`;
//  let subscriptionCode;


  cy.visit(`${projectURL}/`);
   
// ===== subscription code ===//

// need to commint 
  // subscriptionCode_Generator(URL).then((code)=>{
  //   cy.log(`subscription code is = ${code}`)
  //   subscriptionCode=code;
  //   cy.log(`subscription code is ==== ${subscriptionCode}`)
  //   cy.visit(`${URL}`);  // to go back to projects screen from subscription code screen. 
    // ===== subscription code ===//

    cy.get("button[class='btn btn-primary btn-lg rounded-3 c2d-btn']").click();
    cy.get("input[name='repository']").type(projectName);
  
    cy.get("select[name='version']").select(`${randomVersion}`);

    // ===== subscription code ===//
   cy.get(`input[name='subscriptionCode']`).type(`${subscriptionCode}`);  // need to comment 
// ===== subscription code ===//

    cy.contains("div[class='d-flex align-items-center justify-content-center'] span", 'Deploy').click();
  //  obj_api.post_deployRequest(projectName,projectURL);

  // cy.get('.c2d-form > .row', { timeout: 10000 }).should('not.exist');

  // cy.wait('@getProjects', { timeout: 10000 }).its('response.statusCode').should('eq', 200);
  // obj_api.get_getProjects(projectURL);
 
  // cy.wait(1000);
  // cy.contains('div', projectName).should('be.visible').click();
  // cy.wait(2000)

    // ===== subscription code ===//
  // })  // need to comment
// ===== subscription code ===//
}


export const NewUI_HistoryValidation = () => {
  cy.get("span[class='cursor-pointer text-decoration-none hover:text-decoration-underline']")
    .should('be.visible')
    .then(($element) => {
      cy.log('Branch History :' + $element.text());
    });
};

export const NewUI_HistorySubModule = (text) => {
 cy.get("span[class='cursor-pointer text-decoration-none hover:text-decoration-underline']").should("contain.text",text)
};

export const NewUI_OpenProjectbranch = (projectName, branchName,branchVersion, ProjectURL) => {

  
  cy.visit(ProjectURL);
  // cy.intercept('GET', `https://api.click2deploy.com/api/v1/user/project').as('getProjects`);
  // cy.wait('@getProjects', { timeout: 20000 }).its('response.statusCode').should('eq', 200);
  obj_api.get_getProjects(ProjectURL);

   cy.contains('div', projectName).should('be.visible').click();

  // cy.wait('@getBranches', { timeout: 10000 }).its('response.statusCode').should('eq', 200);

  cy.get('body').then((body) => {
    if (body.find(`.branch.cursor-pointer`).length > 0) {
      cy.contains('div', 'Development').should('be.visible');

      cy.contains("div[draggable='true']", branchName).should('be.visible');
    } else {
      cy.visit(ProjectURL);
      // cy.wait('@getProjects', { timeout: 20000 }).its('response.statusCode').should('eq', 200);
      obj_api.get_getProjects(ProjectURL);

      cy.contains('div', projectName).should('be.visible').click();
      cy.wait('@getBranches', { timeout: 20000 }).its('response.statusCode').should('eq', 200);
     // cy.contains(`.branch.cursor-pointer`, branchName).should('be.visible');
     //let branchVersion=17;
        obj_EnvironmentNavBar.branch_shouldbe_visible(branchName,branchVersion);
       obj_EnvironmentNavBar.click_on_branch(branchName,branchVersion);
       
    }
  });

  // cy.contains('div', 'Development').should('be.visible');

  // cy.contains(`.branch.cursor-pointer`,branchName).should("be.visible");
  cy.contains(' .branch.cursor-pointer', branchName).click();
  cy.wait('@getProjectTracking', { timeout: 20000 }).its('response.statusCode').should('eq', 200);
  cy.wait(3000);
};

export const NewUI_CreateBranchInStagging = (projectName, branchName,branchVersion, ProjectURL) => {
  cy.clearLocalStorage();
  cy.visit(ProjectURL);
  // cy.wait('@getProjects', { timeout: 10000 }).its('response.statusCode').should('eq', 200);

  obj_api.get_getProjects(ProjectURL);

  cy.contains('div', projectName, { timeout: 10000 }).should('be.visible').click();
  cy.wait(2000)
  cy.get("body").then((body)=>{
    if(body.find(`.branch.cursor-pointer`).length > 0)
    {
      cy.wait(2000)
      cy.wait('@getBranches', { timeout: 10000 }).its('response.statusCode').should('eq', 200);
    }
    else
    {
      cy.contains('div', projectName).should('be.visible').click({ force : true });
      cy.wait(2000)
      cy.wait('@getBranches', { timeout: 10000 }).its('response.statusCode').should('eq', 200);

      // if still it re-directs - re open the project

      cy.get("body").then((body)=>{
        if(body.find(`.branch.cursor-pointer`).length > 0)
        {
          cy.wait(1000)
        }
        else
        {
          cy.contains('div', projectName).should('be.visible').click();
          cy.wait(2000)
          cy.wait('@getBranches', { timeout: 10000 }).its('response.statusCode').should('eq', 200);
        }
      })

    }
  })
  cy.wait(2000)
  cy.contains('.env-header h4', 'Staging').should('be.visible').click();
  cy.get(".environments-wrapper [style=''] select").select('main');
  cy.get(".environments-wrapper [style=''] select").find('option:selected').should('have.text', 'main');
  cy.get(
    'body > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > main:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > input:nth-child(2)',
  )
  .type(`${branchName}{enter}`, { force: true })
    .then(() => {
      cy.wait('@createBranch', { timeout: 20000 }).its('response.statusCode').should('eq', 201);
    });



    cy.get("body").then((body)=>{
      if(body.find(`.details-sidebar:contains("${branchName}")`).length > 0)
      {
        cy.wait('@getProjectTracking', { timeout: 20000 }).its('response.statusCode').should('eq', 200).wait(2000);
        cy.contains('span', 'In Progress').should('be.visible');
      }
      else
      {    cy.visit(ProjectURL);
        // cy.wait('@getProjects', { timeout: 20000 }).its('response.statusCode').should('eq', 200);
         obj_api.get_getProjects(ProjectURL)
        cy.contains('div', projectName).should('be.visible').click();
        cy.wait(2000)
      
        cy.get('body').then((body) => {
          if (body.find(`.details-sidebar:contains("${branchName}")`).length > 0)
             {
              
            cy.contains('div', 'Development').should('be.visible');
           // cy.wait('@getBranches', { timeout: 10000 }).its('response.statusCode').should('eq', 200);
          // cy.contains(`[data-testid='${branchName}-17']`,branchName).click();
          obj_EnvironmentNavBar.click_on_branch(branchName,branchVersion);
            cy.wait('@getProjectTracking', { timeout: 20000 }).its('response.statusCode').should('eq', 200).wait(2000);
            cy.contains('span', 'In Progress').should('be.visible');
            
          } else {
           
            cy.contains('div', projectName).should('be.visible').click();
            cy.wait(2000)
            cy.wait('@getBranches', { timeout: 10000 }).its('response.statusCode').should('eq', 200);
         
            cy.contains(`.branch.cursor-pointer`, 'main').should('be.visible');
            cy.contains(`[data-testid='${branchName}-${branchVersion}']`,branchName).click({force : true });
            // cy.contains('.details-sidebar', branchName).click();
            cy.wait('@getProjectTracking', { timeout: 20000 }).its('response.statusCode').should('eq', 200).wait(2000);
            cy.contains('span', 'In Progress').should('be.visible');
          }
        });
      }
    })




  //  NewUI_toastMessageValidationDual('Branch created successfully','Build fail with Error', 6000);
  // cy.wait('@getBranches', { timeout: 10000 }).its('response.statusCode').should('eq', 200);
  cy.contains('.details-sidebar', branchName).click();
  cy.wait('@getProjectTracking', { timeout: 10000 }).its('response.statusCode').should('eq', 200).wait(2000);
  // cy.contains('span', 'In Progress').should('be.visible');
};

export const NewUI_SuccessStatusValidation = () => {
  // cy.contains('[style="display: flex; align-items: center;"] > .m-2', 'Success').should('be.visible');

  const history_obj=new history();
   history_obj.success_status();

  cy.log('Build succeeded');
};
export const NewUI_ConnectButtonValidation = (branchName,branchVersion) => {
 
  const retryInterval = 1 * 60 * 1000; // 1 minute in milliseconds
  const maxDuration = 20 * 60 * 1000; // 20 minutes in milliseconds
  let totalWaitTime = 0;

  function waitForButton() {
    // Reload the page on each attempt
    cy.reload();
    // cy.contains(`div[data-testid='${branchName}-17']`,branchName,{ timeout : 10000 }).click();
   // cy.contains(`div[data-testid='${branchName}-${branchVersion}']`, branchName, { timeout: 10000 }).should('be.visible').click();
   obj_EnvironmentNavBar.branch_shouldbe_visible(branchName,branchVersion);
   obj_EnvironmentNavBar.click_on_branch(branchName,branchVersion);
    cy.wait("@getProjectTracking",{ timeout : 20000 }).its('response.statusCode').should('eq',200);
    cy.wait(5000)
    cy.get('.history-wrapper > :nth-child(1)').then((body) => {
      if ( body.find( ".btn-success.connect" ).length > 0) {
       
       // cy.contains("button.btn-lg.btn-success","Connect", { timeout:5000 }).should('be.visible');
    //   cy.wrap(body).find('button.btn-lg.btn-success.connect').should('be.visible');
    cy.wrap(body).find(`.btn-success.connect`).should('be.visible');
        cy.log('Button is now visible!');
      } else {
        totalWaitTime += retryInterval;
        if (totalWaitTime < maxDuration) {
          cy.log(`Button not visible, retrying... (${totalWaitTime / 1000}s elapsed)`);
          cy.wait(retryInterval).then(() => {
            waitForButton();
          });
        } else {
          cy.log('Button did not become visible within 15 minutes');
        }
      }
    });
  }

  waitForButton();
 
  
  
  // NewUI_toastMessageValidationDual("Build is now ready to connect!","Build failed with errors",17*60*1000 );
// cy.get(".btn-success.connect", { timeout: time }).should('be.visible');
  // cy.get('.btn-success.connect', { timeout: 600000 }) // Wait for up to 600 seconds (10 minutes)
  //   .should('exist');
};
export const NewUI_ConnectButtonValidation_for_collabrator = (projectName,branchName) => {
 
  const retryInterval = 1 * 60 * 1000; // 1 minute in milliseconds
  const maxDuration = 15 * 60 * 1000; // 15 minutes in milliseconds
  let totalWaitTime = 0;

  function waitForButton() {
    // Reload the page on each attempt
    cy.reload();
   // cy.contains(`div[data-testid='${branchName}-17']`,branchName).click();
   obj_EnvironmentNavBar.click_on_branch(branchName,branchVersion);
    // cy.wait("@getProjectTracking",{ timeout : 20000 }).its('response.statusCode').should('eq',200);
    cy.contains(projectName).should("be.visible");
    cy.wait(5000)
    cy.get('.history-wrapper > :nth-child(1)').then((body) => {
      if ( body.find( ".btn-success.connect" ).length > 0) {
       
        cy.get("button.btn.btn-success.btn-sm.connect", { force: true }).should('be.visible');
        cy.log('Button is now visible!');
      } else {
        totalWaitTime += retryInterval;
        if (totalWaitTime < maxDuration) {
          cy.log(`Button not visible, retrying... (${totalWaitTime / 1000}s elapsed)`);
          cy.wait(retryInterval).then(() => {
            waitForButton();
          });
        } else {
          cy.log('Button did not become visible within 15 minutes');
        }
      }
    });
  }

  waitForButton();
 
  
  
  // NewUI_toastMessageValidationDual("Build is now ready to connect!","Build failed with errors",17*60*1000 );
// cy.get(".btn-success.connect", { timeout: time }).should('be.visible');
  // cy.get('.btn-success.connect', { timeout: 600000 }) // Wait for up to 600 seconds (10 minutes)
  //   .should('exist');
};
export const NewUI_ConnectButtonValidation_old = () => {

  cy.wait(6000)
  // NewUI_toastMessageValidationDual("Build is now ready to connect!","Build failed with errors",17*60*1000 );

 
  // cy.get(".btn-success.connect", { timeout: time }).should('be.visible');
  cy.get('.btn-success.connect', { timeout: 600000 }) // Wait for up to 600 seconds (10 minutes)
    .should('exist');
};
export const NewUI_ConnectButtonValidation_AlreadyCreatedBuilds = () => {

 
 
  // cy.get(".btn-success.connect", { timeout: time }).should('be.visible');
  cy.get('.btn-success.connect', { timeout: 600000 }) // Wait for up to 600 seconds (10 minutes)
    .should('exist');
};

export const NewUI_TabsValidationProduction = (Active_inActive_Status) => {
  // cy.wait(3000);
  // cy.contains('.details-header-navbar.w-100.d-flex.gap-1', 'SHELL').should('be.visible');
  // cy.log('SHELL is Active');
  // cy.contains('a.editor', 'EDITOR').should('be.visible');
  // cy.log('Editor is Active');
  // cy.contains('.details-header-navbar', 'BACKUPS').should('be.visible');
  // cy.log('Backups is Active');

  obj_navtab.shell_button_validation(Active_inActive_Status);
  obj_navtab.Editor_button_validation(Active_inActive_Status);
};

const support_buildvalidation=(branchName,branchVersion)=>
{
  obj_EnvironmentNavBar.click_on_branch(branchName,branchVersion);
  cy.get('body').then((body)=>{
     if(body.find(`.branch-name:contains(${branchName.toUpperCase()})`).length > 0)
     {
       cy.wait("@getProjectTracking", { timeout : 20000 }).its("response.statusCode").should("eq",200);

     }
     else
     {

   obj_EnvironmentNavBar.click_on_branch(branchName,branchVersion);
     }
  })

  let openedUrl;
  cy.get('.btn-success.connect').should('be.visible');
  cy.window().then((win) => {
    cy.stub(win, 'open')
      .callsFake((url) => {
        openedUrl = url;
        return win.open.wrappedMethod.call(win, openedUrl, '_self');
      })
      .as('windowOpen');
  });

  cy.get('.btn-success.connect', { timeout: 6000 }) .should('exist');
  cy.get('.btn-success.connect').contains('Connect').click();

  cy.get('@windowOpen', { timeout: 20000 })
    .should((stub) => {
      expect(stub).to.have.been.called;
    })
.then((stub) => {
      const args = stub.args;
      if (args.length > 0) {
        openedUrl = args[0][0];
        if (openedUrl) {
          cy.log('Opened URL:', openedUrl);
          cy.visit(openedUrl, { timeout: 90000 });
        } else {
          cy.log('URL captured from window.open is null or undefined');
        }
      } else {
        cy.log('window.open stub has not been called');
      }
    })
    .then(() => {});

}
export const NewUI_BuildValidation = (branchName,branchVersion) => {

     support_buildvalidation(branchName,branchVersion);
cy.wait(5000)
    cy.get("body").then((body)=>{
      if(body.find('#login').length > 0) {

        cy.get(".border-top").should("not.have.text","Manage Database")
        cy.get('#login').type('admin');
        cy.get('#password').type('admin');
        cy.get("button[type='submit']").click();
      }
      else
      {
        cy.log("odoo page was not fount - Retrying again")
        support_buildvalidation(branchName,branchVersion);
        cy.get('#login').type('admin');
        cy.get('#password').type('admin');
        cy.get("button[type='submit']").click();
      }
    })
   

  // cy.get('#login').type('admin');
  // cy.get('#password').type('admin');
  // cy.get("button[type='submit']").click();
};

// let openedUrl;
// let windowOpenStubbed = false;

// const support_buildvalidation = (branchName) => {
//   obj_EnvironmentNavBar.click_on_branch(branchName, branchVersion);

//   cy.get('body').then((body) => {
//     if (body.find(`.branch-name:contains(${branchName.toUpperCase()})`).length > 0) {
//       cy.wait("@getProjectTracking", { timeout: 20000 })
//         .its("response.statusCode").should("eq", 200);
//     } else {
//       obj_EnvironmentNavBar.click_on_branch(branchName, branchVersion);
//     }
//   });

//   cy.get('.btn-success.connect').should('be.visible');

//   // ✅ Prevent re-wrapping window.open
//   if (!windowOpenStubbed) {
//     cy.window().then((win) => {
//       cy.stub(win, 'open')
//         .callsFake((url) => {
//           openedUrl = url;
//           return win.open.wrappedMethod.call(win, openedUrl, '_self');
//         })
//         .as('windowOpen');
//     });
//     windowOpenStubbed = true;
//   }

//   cy.get('.btn-success.connect', { timeout: 6000 }).should('exist');
//   cy.get('.btn-success.connect').first().click(); //button.btn-lg.btn-success

//   cy.get('@windowOpen', { timeout: 20000 })
//   .should((stub) => {
//     expect(stub).to.have.been.called;
//   }).then((stub) => {
//     const args = stub.args;
//     if (args.length > 0) {
//       openedUrl = args[0][0];
//       if (openedUrl) {
//         cy.log('Opened URL:', openedUrl);
//       //  cy.visit(openedUrl, { timeout: 90000 });
//       } else {
//         cy.log('URL captured from window.open is null or undefined');
//       }
//     } else {
//       cy.log('window.open stub has not been called');
//     }
//   });
// };

// export const NewUI_BuildValidation = (branchName) => {
//   support_buildvalidation(branchName);

//   cy.wait(5000);
//   cy.get("body").then((body) => {
//     if (body.find('#login').length > 0) {
//       cy.get(".border-top").should("not.have.text", "Manage Database");
//       cy.get('#login').type('admin');
//       cy.get('#password').type('admin');
//       cy.get("button[type='submit']").click();
//     } else {
//       cy.log("Odoo page was not found - Retrying again");
//       support_buildvalidation(branchName);
//       cy.get('#login').type('admin');
//       cy.get('#password').type('admin');
//       cy.get("button[type='submit']").click();
//     }
//   });
// };


export const NewUI_createBranchInDevelopment = (projectName, branchName,branchVersion, ProjectURL) => {
 
  // cy.clearLocalStorage();
  // cy.wait('@getBranches', { timeout: 20000 }).its('response.statusCode').should('eq', 200);
   cy.contains('.env-header h4', 'Development').should('be.visible').click();

  cy.get(".environments-wrapper [style=''] select").select('main');
  cy.get(".environments-wrapper [style=''] select").find('option:selected').should('have.text', 'main');
  //.should("have.text","main")
  cy.get('.show input.form-control-lg').type(branchName, { force: true }).type('{enter}', { force: true });
  cy.wait('@createBranch', { timeout: 20000 }).its('response.statusCode').should('eq', 201);
  NewUI_toastMessageValidation('Branch created!', 3000);

  // cy.wait('@getBranches', { timeout: 20000 }).its('response.statusCode').should('eq', 200);
  cy.wait(3000)
 // cy.contains(`[data-testid='${branchName}-17']`,branchName).click();
  obj_EnvironmentNavBar.click_on_branch(branchName,branchVersion);
  cy.get("body").then((body)=>{
    if(body.find(`.details-sidebar:contains("${branchName}")`).length > 0)
    {
      cy.wait('@getProjectTracking', { timeout: 20000 }).its('response.statusCode').should('eq', 200).wait(2000);
      cy.contains('span', 'In Progress').should('be.visible');
    }
    else
    {    cy.visit(ProjectURL);
      cy.wait('@getProjects', { timeout: 20000 }).its('response.statusCode').should('eq', 200);
      cy.contains('div', projectName).should('be.visible').click();
      cy.wait(2000)
    
      cy.get('body').then((body) => {
        if (body.find(`.details-sidebar:contains("${branchName}")`).length > 0)
           {
            
          cy.contains('div', 'Development').should('be.visible');
         // cy.wait('@getBranches', { timeout: 10000 }).its('response.statusCode').should('eq', 200);
        // cy.contains(`[data-testid='${branchName}-17']`,branchName).click();
         obj_EnvironmentNavBar.click_on_branch(branchName,branchVersion);
          cy.wait('@getProjectTracking', { timeout: 20000 }).its('response.statusCode').should('eq', 200).wait(2000);
          cy.contains('span', 'In Progress').should('be.visible');
          
        } else {
         
          cy.contains('div', projectName).should('be.visible').click();
          cy.wait(2000)
          cy.wait('@getBranches', { timeout: 10000 }).its('response.statusCode').should('eq', 200);
       
          cy.contains(`.branch.cursor-pointer`, 'main').should('be.visible');
        //  cy.contains(`[data-testid='${branchName}-17']`,branchName).click();
        obj_EnvironmentNavBar.click_on_branch(branchName,branchVersion);
          // cy.contains('.details-sidebar', branchName).click();
          cy.wait('@getProjectTracking', { timeout: 20000 }).its('response.statusCode').should('eq', 200).wait(2000);
          cy.contains('span', 'In Progress').should('be.visible');
        }
      });
    }
  })

 
};
export const NewUI_createBranchInDevelopment_without_Main = (projectName, branchName, ProjectURL) => {
 
  // cy.clearLocalStorage();
  // cy.wait('@getBranches', { timeout: 20000 }).its('response.statusCode').should('eq', 200);
   cy.contains('.env-header h4', 'Development').should('be.visible').click();

  // cy.get(".environments-wrapper [style=''] select").select('main');
  // cy.get(".environments-wrapper [style=''] select").find('option:selected').should('have.text', 'main');
  //.should("have.text","main")
  cy.get('.show input.form-control-lg').type(branchName, { force: true }).type('{enter}', { force: true });
  cy.wait('@createBranch', { timeout: 20000 }).its('response.statusCode').should('eq', 201);
  NewUI_toastMessageValidation('Branch created!', 3000);

  // cy.wait('@getBranches', { timeout: 20000 }).its('response.statusCode').should('eq', 200);
  cy.wait(3000)
 // cy.contains(`[data-testid='${branchName}-17']`,branchName).click();
 obj_EnvironmentNavBar.click_on_branch(branchName,branchVersion);
  cy.get("body").then((body)=>{
    if(body.find(`.details-sidebar:contains("${branchName}")`).length > 0)
    {
      cy.wait('@getProjectTracking', { timeout: 20000 }).its('response.statusCode').should('eq', 200).wait(2000);
      cy.contains('span', 'In Progress').should('be.visible');
    }
    else
    {    cy.visit(ProjectURL);
      cy.wait('@getProjects', { timeout: 20000 }).its('response.statusCode').should('eq', 200);
      cy.contains('div', projectName).should('be.visible').click();
      cy.wait(2000)
    
      cy.get('body').then((body) => {
        if (body.find(`.details-sidebar:contains("${branchName}")`).length > 0)
           {
            
          cy.contains('div', 'Development').should('be.visible');
         // cy.wait('@getBranches', { timeout: 10000 }).its('response.statusCode').should('eq', 200);
       //  cy.contains(`[data-testid='${branchName}-17']`,branchName).click();
       obj_EnvironmentNavBar.click_on_branch(branchName,branchVersion);
          cy.wait('@getProjectTracking', { timeout: 20000 }).its('response.statusCode').should('eq', 200).wait(2000);
          cy.contains('span', 'In Progress').should('be.visible');
          
        } else {
         
          cy.contains('div', projectName).should('be.visible').click();
          cy.wait(2000)
          cy.wait('@getBranches', { timeout: 10000 }).its('response.statusCode').should('eq', 200);
       
          cy.contains(`.branch.cursor-pointer`, 'main').should('be.visible');
         // cy.contains(`[data-testid='${branchName}-17']`,branchName).click();
         obj_EnvironmentNavBar.click_on_branch(branchName,branchVersion);
          // cy.contains('.details-sidebar', branchName).click();
          cy.wait('@getProjectTracking', { timeout: 20000 }).its('response.statusCode').should('eq', 200).wait(2000);
          cy.contains('span', 'In Progress').should('be.visible');
        }
      });
    }
  })

  // cy.contains('.details-sidebar', branchName).click();
  // cy.wait('@getProjectTracking', { timeout: 20000 }).its('response.statusCode').should('eq', 200).wait(2000);
  // cy.contains('span', 'In Progress').should('be.visible');
};
export const NewUI_TabsValidationDevelopment = (Active_inActive_Status) => {
  // const tabs = ['SHELL', 'EDITOR', 'BACKUPS'];
  // tabs.forEach((tab) => {
  //   cy.get('div[style="font-weight: bold; color: lightgrey;"]').should('contain', tab);
  //   cy.log(`${tab} is Inactive`);
  // });
  obj_navtab.shell_button_validation(Active_inActive_Status);
  obj_navtab.Editor_button_validation(Active_inActive_Status);


};
export const NewUI_toastMessageValidation = (message, time) => {
  cy.contains("div[role='alert']", message,  { timeout: time }).should('exist');
};

export const NewUI_toastMessageValidation_notVisible = (message, time) => {
  cy.contains("div[role='alert']", message,  { timeout: time }).should('not.exist');
};

// export const NewUI_toastMessageValidationDual = (message1, message2, time) => {
//   cy.get('div[role="alert"]', { timeout: time }).then(($alert) => {
//     if ($alert.text().includes(message1)) {
//       cy.contains('div[role="alert"]', message1).should('be.visible');

//     } else if ($alert.text().includes(message2)) {
    
//       cy.contains('div[role="alert"]', message2).should('be.visible');
//       cy.log(`${message2} .. Failing the test.`)
//       throw new Error(`${message2} ... QA stop the test`)
//     } else {
     
//       cy.log(`Neither message1 nor message2 appeared. Appeared message is: ${$alert.text()}`);
//     }
//   });
// };

export const NewUI_toastMessageValidationDual = (message1, message2, time) => {
  function checkAlertMessage() {
    
    cy.get('div[role="alert"]', { timeout: time }).first().within(($alert) => {
      const alertText = $alert.text();

      if (alertText.includes(message1)) {
        cy.contains('div[role="alert"]', message1).should('be.visible');
      } else if (alertText.includes(message2)) {
        cy.contains('div[role="alert"]', message2).should('be.visible');
        cy.log(`${message2} .. Failing the test.`);
        throw new Error(`${message2} ... QA stop the test`);
      } else {
        cy.log(`Neither message1 nor message2 appeared. Retrying...`);
        cy.reload();
        retry();
      }
    });
  }

  // Retry mechanism
  function retry(attempts = 0, maxRetries = 7) {
    if (attempts < maxRetries) {
      cy.wait(3000); // Wait for 1 second before retrying
      checkAlertMessage();
    } else {
      cy.log('Maximum retries reached. Neither message1 nor message2 appeared.');
      throw new Error('Test failed: Neither message1 nor message2 appeared after maximum retries.');
    }
  }

  // Start the check
  checkAlertMessage();
};

export const NewUI_deleteproject = (projectURL, projectName) => {
  cy.visit(`${projectURL}/`);
  // cy.wait('@getProjects', { timeout: 20000 }).its('response.statusCode').should('eq', 200);
  obj_api.get_getProjects(projectURL);

  cy.get('.project-grid-card')
    .contains(`${projectName}`) // Locate the card with the specific text
    .parents('.project-grid-card') // Ensure you have the correct card
    .within(() => {
      cy.get('.btn-only-icon[type="button"]').click(); 
    });
  cy.wait(1000);

    // cy.get("button.btn-light.mt-2").click();  delete btton in production 
  cy.contains("Delete").click();

  cy.get(`input.form-control`).type(`${projectName}`);
  cy.get(".btn-danger").click();
  cy.wait(3000)
  cy.get('body').then((body)=>{
    if(body.find("h5").length > 0)
    {
      cy.visit(`${projectURL}/`);
      // cy.wait("@getProjects", { timeout : 20000 }).its("response.statusCode").should("eq",200);
      obj_api.get_getProjects(projectURL);
      if(body.find(`.project-grid-card`).length > 0)
      {
        cy.get('.project-grid-card').contains(`${projectName}`).should("not.exist");
      }
      else
      {
          cy.log("No Project Found! All are  deleted ")
      }
      
    }
    else{
      cy.wait("@getProjects", { timeout : 20000 }).its("response.statusCode").should("eq",200);
      if(body.find(`.project-grid-card`).length > 0)
        {
          cy.get('.project-grid-card').contains(`${projectName}`).should("not.exist");
        }
        else
        {
            cy.log("No Project Found! All are  deleted ")
        }
    }
  })

 
};
export const NewUI_deleteproject_button_not_exist = (projectURL, projectName) =>{
  cy.visit(`${projectURL}/`);
  // cy.wait('@getProjects', { timeout: 20000 }).its('response.statusCode').should('eq', 200);
  cy.contains(projectName, { timeout: 20000 }).should('be.visible');
  cy.get('.project-grid-card')
    .contains(`${projectName}`) // Locate the card with the specific text
    .parents('.project-grid-card') // Ensure you have the correct card
    .within(() => {
      cy.get('.btn-only-icon[type="button"]').click()
    });
    cy.wait(1000);

    cy.get("button.btn-light.mt-2").should('not.exist');
}

export const NewUI_OpenProject = (projectName, ProjectURL) => {
  cy.visit(ProjectURL);
  obj_api.get_getProjects(ProjectURL);
  
  cy.wait(2000);
  cy.contains('div', projectName, { timeout: 20000 }).should('be.visible').click();
  
 cy.get("body").then((body)=>{
  if(body.find("div:contains('Development')").length>0)
  {
     cy.log("project open successfully")
  }
  else
  {
    cy.log("History page not loaded, now Retrying.")
    cy.visit(ProjectURL);
    obj_api.get_getProjects(ProjectURL);
    
    cy.wait(2000);
    cy.contains('div', projectName, { timeout: 20000 }).should('be.visible').click();
  }
 })
};

// export const NewUI_CreateNewProjectUsingExistingRepo = (projectURL) => {
//   const versions = [17]; //[15, 16, 17]
//   const randomVersion = versions[Math.floor(Math.random() * versions.length)];
//   // let projectName = `admin3`;
//   let projectName ;

//   cy.visit(`${projectURL}/`);

//   // subscriptionCode_Generator(URL).then((code)=>{
//   //   cy.log(`subscription code is = ${code}`)
//   //   subscriptionCode=code;
//   //   cy.log(`subscription code is ==== ${subscriptionCode}`)

//   cy.wait(4000);
//   cy.get("button[class='btn btn-primary btn-lg rounded-3 c2d-btn']").click();
//   cy.get("input[type='radio'][value='existing']").click();
//   cy.wait(4000);
//   cy.wait('@ExistRepository', { timeout: 2*60 * 1000 })
//     .its('response.statusCode')
//     .should('eq', 200);
//   // cy.get("select.second-field[name='repository']").select(projectName);

//   cy.get("select.second-field[name='repository']")
//     .select(2) // Select the third option (index 2)
//     .then(($selectedOption) => {
//       // Store the selected text
//       projectName = $selectedOption.text();
//       cy.log('Selected project name:', projectName);
//     });

// // Use the projectName variable later in your test
// cy.log('Selected project name:', projectName);

//   cy.get("select[name='version']").select(`${randomVersion}`);
//   // cy.get(`input[name='subscriptionCode']`).type(`${subscriptionCode}`);

//   // })

//   cy.contains("div[class='d-flex align-items-center justify-content-center'] span", 'Deploy').click();

//   cy.wait('@getProjects', { timeout: 10000 }).its('response.statusCode').should('eq', 200);
//   cy.get('#deploy-your-platform', { timeout: 30000 }).should('not.exist');

//   cy.log(projectName);

//   cy.contains('div', projectName).should('be.visible').click();
//   cy.contains('div', 'Development').should('be.visible');
//   cy.log('Project Created');
//   cy.contains("div[draggable='true']", 'main').should('be.visible').click();

//   return projectName;
// };

export const NewUI_CreateNewProjectUsingExistingRepo = (projectURL) => {
  const versions = [branchVersion]; // [15, 16, 17]
  const randomVersion = versions[Math.floor(Math.random() * versions.length)];

  cy.visit(`${projectURL}/`);

  obj_api.get_getProjects(projectURL);

  cy.wait(4000);
  cy.get("button[class='btn btn-primary btn-lg rounded-3 c2d-btn']").click();
  cy.get("input[type='radio'][value='existing']").click();
  cy.wait(4000);

    obj_api.get_ExistRepository();
 
  cy.get("select.second-field[name='repository']")
  .select(2)  
  .invoke('val')  
  .as('projectName2');  

// Wrap the projectName2 alias into @projectName for later usage
cy.get('@projectName2').then((projectName2) => {
  cy.wrap(projectName2).as('projectName');  // Store it as a reusable alias
});


  cy.get('@projectName').then((projectName) => {
    cy.log('Using project name:', projectName);

    cy.get("select[name='version']").select(`${randomVersion}`);
       cy.get(`input[name='subscriptionCode']`).type(`MYG8Y2FWFOJ2`); 

    cy.contains("div[class='d-flex align-items-center justify-content-center'] span", 'Deploy').click();
   // cy.wait('@getProjects', { timeout: 10000 }).its('response.statusCode').should('eq', 200);
    // obj_api.get_getProjects(projectURL);

    cy.get('#deploy-your-platform', { timeout: 30000 }).should('not.exist');

    cy.log('Project Name:', projectName); // Using projectName

    obj_api.get_getProjects(projectURL);
    cy.contains('div', projectName, { timeout : 20000 }).should('be.visible').click();


        //////
        cy.get('body').then((body) => {
          if (body.find(`.details-sidebar:dev("Development")`).length > 0)
             {
              cy.contains('div', 'Development',{ timeout : 20000 }).should('be.visible');
           
            
          } else {
            cy.visit(`${projectURL}/`);
            // cy.wait('@getProjects', { timeout: 10000 }).its('response.statusCode').should('eq', 200);
            obj_api.get_getProjects(projectURL)

            cy.contains('div', projectName, { timeout : 20000 }).should('be.visible').click();
            cy.contains('div', 'Development',{ timeout : 20000 }).should('be.visible');
          }
        });


      //////
    // cy.contains('div', 'Development',{ timeout : 20000 }).should('be.visible');
    cy.log('Project Created');
    cy.contains("div[draggable='true']", 'main').should('exist').click({ force: true});

    return cy.wrap(projectName)
  });
};


export const NewUI_DroppedButtonValidation = () => {
  let time = 10 * 60 * 1000;
  //toastMessageValidation('Build completed successfully', time);
  cy.reload();
  cy.wait(2000)
  cy.wait("@getProjectTracking", { timeout : 20000 }).its('response.statusCode').should('eq',200);
  // cy.contains('span', 'Dropped').should('be.visible');
  cy.contains('span', 'Dropped').should('exist');
  // cy.contains('span', 'Success').should('be.visible');
};

export const GoggarProjects = () => {
  cy.get('.logo').click();
  cy.get('button.btn-public').eq(1).click();
  //cy.wait("@getProjects").its("response.statusCode").eq(200);
};

export const NewUI_Logs = (projectName,branchName,status) => {
  const  Navtab_obj=new Navtab();
  if(status==="Active")
  {
    Navtab_obj.Logs_Btn_Enable_Click(status);
    // cy.get(`[href="/project/${projectName}/branches/${branchName}/logs"]`).click();
    cy.get('.logs-header select.form-select').select('app.log').should('have.value', 'app');
    cy.wait("@applogs",{ timeout : 20000 }).its('response.statusCode').should('eq',200);
    cy.get('pre').should('contain.text', "Finished 'clean'");
  
    cy.get('.logs-header select.form-select').select('build.log').should('have.value', 'build');
    // cy.waitUntil(() => );
    cy.wait("@buildlogs",{ timeout : 20000 }).its('response.statusCode').should('eq',200);
    cy.get('pre').should('be.visible').and('contain.text', 'Running on CodeBuild On-demand');
  
    cy.get('.logs-header select.form-select').select('odoo.log').should('have.value', 'odoo');
    cy.wait("@odoologs",{ timeout : 20000 }).its('response.statusCode').should('eq',200);
    cy.get('pre').should('contain.text', 'odoo: Using configuration file at /etc/odoo/odoo.conf ');
  }
  else
  {
    Navtab_obj.Logs_Btn_Enable_Click(status);
  }
  
};

export const NewUI_deleteBranch = (projectName,branchName,branchVersion,status) =>{


 obj_EnvironmentNavBar.click_on_branch(branchName,branchVersion);
  cy.contains(`[href='/project/${projectName}/branches/${branchName}/settings']`,'Settings').click();
  cy.wait(2000);
  cy.get('.settings-wrapper').scrollIntoView();

  if (status === 'Active') {
    // Perform this if the status is 'active'
    cy.contains('Delete branch').click({ force: true });
    cy.get(`#test-suite`).type(branchName, { force: true });
    cy.get('.btn-outline-danger').click({ force: true });
    cy.wait(3000);
  } else {
    // Your next code if status is not 'active'
    cy.contains('Delete branch').should("not.exist");
    let version=branchVersion;
     obj_EnvironmentNavBar.click_on_branch(branchName,branchVersion);
  }

};

export const NewUI_backup_Creation =()=>{
  const nt_obj=new Navtab();
  const bk_obj=new Backups();
  const api_obj=new Api();
  nt_obj.Backup_Btn_Enable_Click();
  bk_obj.create_backup_button_click();
  bk_obj.create_button_click();
  let time=1*60*1000;
  api_obj.getBackups(time);
  api_obj.postBackup(time);
  api_obj.getBackups(time);
  NewUI_toastMessageValidation("Manual backup has been started!",6*60*1000);
  bk_obj.toast_message_cross_Btn();
  NewUI_toastMessageValidationDual("Database backup completed","Database backup failed with errors",6*60*1000);
}

export const NewUI_Backups_deletion =()=>{
  const bk2_obj=new Backups();
        bk2_obj.delete_Backup_Btn();
        bk2_obj.delete_Btn_click();
}

export const NewUI_ADD_SubModule =(text)=>{
  const submodule_obj=new SubModuleClass();
  let api_obj=new Api();
 // let text="git@github.com:HDLearning/privt_module.git";
  // let text="git@github.com:pucar15sahiwal/git-public-repo.git";
  submodule_obj.submodule_blue_Btn();
  submodule_obj.add_Repository_textbox(text);
  submodule_obj.Proceed_btn();
  api_obj.getSubmodule(20000);
  submodule_obj.Add_Submodule_btn();
  NewUI_toastMessageValidation("Submodule added successfully.",6*60*1000);
}
export const NewUI_ALL_project_Delete = (projectURL, projectNamesToSkip) => {
  cy.visit(`${projectURL}/`);


  // cy.wait('@getProjects', { timeout: 20000 }).its('response.statusCode').should('eq', 200);
  obj_api.get_getProjects(projectURL);

  // Function to delete projects
  const deleteProjects = () => {
    // Get all visible project cards
    cy.get('.project-grid-card').then(($cards) => {
      // If no project cards are present, log a message and return
      if ($cards.length === 0) {
        cy.log('No Projects Found! All are deleted.');
        return;
      }

      // Iterate through each project card
      cy.wrap($cards).each(($card) => {
        // Find the project title within the card (using the h4 with class 'cursor-pointer')
        cy.wrap($card).find('h4.cursor-pointer').then(($title) => {
          const projectNameText = $title.text().trim();

          // Check if the project name matches any in the skip list
          if (projectNamesToSkip.includes(projectNameText)) {
            cy.log(`Skipping project: ${projectNameText}`);
          } else {
            // If not, delete the project
            cy.wrap($card).within(() => {
              cy.get('.btn-only-icon[type="button"]').click(); // Click the delete button
            });

            cy.wait(1000);

            // Confirm deletion
            // cy.get("button.btn-light.mt-2").click();
            cy.contains("Delete").click();

            // Type the project name to confirm deletion
            cy.get(`.form-control[placeholder='type project name "${projectNameText}" in the box']`).type(`${projectNameText}`);
            
            // Confirm delete action
            cy.get(".btn-danger").click();

            // Wait for the deletion to complete
            cy.wait(3000);

            // Call the function again to check for any remaining projects
            deleteProjects();
          }
        });
      });
    });
  };

  // Start the deletion process
  deleteProjects();
};
export const NewUI_dragto =(branchName,To_selector,branchVersion)=>{
cy.contains(`[data-testid='${branchName}-${branchVersion}']`,branchName).dragTo(`${To_selector}`);
cy.get('.btn-primary').click();
//NewUI_toastMessageValidation("Branch stage changed",5*1000);
cy.wait(4000)
cy.reload();
cy.wait("@getProjectTracking", { timeout : 20000 }).its("response.statusCode").should("eq",200);
cy.contains(`[data-testid='${branchName}-${branchVersion}']`,branchName).click();
}

export const newui_install_Logs=()=>{
  const obj_logs=new Navtab();
  obj_logs.Logs_Btn_Enable_Click("Active");

  cy.get(`select[aria-label="logs-selection"]`).select("install.log").should("have.value","install");
  obj_api.get_Install_logs(20000);
  cy.get('pre').should('contain.text', 'odoo.modules.loading: init db');
  

}

export const subscriptionCode_Generator = (projectURL) => {
  return new Cypress.Promise((resolve) => {
    
    cy.get(`button[role="button"]`).click();
    cy.contains("a[class='dropdown-item']", "Configuration Codes").click();
    cy.wait("@configuration_codes", { timeout: 20000 }).its('response.statusCode').should('eq', 200);
    cy.contains(`button[class='btn btn-primary btn-lg c2d-btn']`, "Buy New CC").click();
    cy.contains(`button[type='submit']`, "Buy New Trial CC").click();
    cy.get('tbody tr').first().find('td').first()
      .invoke('text')
      .then((text) => {
        const subscriptionCode = text.trim();
        cy.log(`Generated subscription code: ${subscriptionCode}`);
        
        resolve(subscriptionCode);
      });
        // cy.visit(`${projectURL}`);
        // cy.wait('@getProjects', { timeout: 20000 }).its('response.statusCode').should('eq', 200);
  });

       
};

export const NewUI_Logs_FilterValidation = (projectName, branchName) => {
  cy.get(`[href="/project/${projectName}/branches/${branchName}/logs"]`).click();
  cy.get('.logs-header select.form-select').select('app.log').should('have.value', 'app');
  cy.get('pre').should('contain.text', "Finished 'clean'");
  cy.get('.logs-header input.form-control').type('app');
  cy.get('pre').should('contain.text', "* Serving Flask app 'system_monitoring'");
  cy.get('.logs-header input.form-control').clear();

  cy.get('.logs-header select.form-select').select('build.log').should('have.value', 'build');
  // cy.waitUntil(() => );
  cy.get('pre').should('be.visible').and('contain.text', 'Running on CodeBuild On-demand');
  cy.get('.logs-header input.form-control').type('build');
  cy.get('pre').should('contain.text', 'Docker version');
  cy.get('.logs-header input.form-control').clear();

  cy.get('.logs-header select.form-select').select('odoo.log').should('have.value', 'odoo');
  cy.get('pre').should('contain.text', 'odoo: Using configuration file at /etc/odoo/odoo.conf ');
  cy.get('.logs-header input.form-control').type('odoo');
  cy.get('pre').should('contain.text', 'odoo: Using configuration file at /etc/odoo/odoo.conf ');
  cy.get('.logs-header input.form-control').clear();
};
export const NewUI_MonitorValidation = (projectName, branchName,status) => {
  if(status==="Active")
  {
    obj_navtab.Monitor_click(projectName,branchName,status);
    cy.get('div').should('not.contain.text', 'No build monitor data to show');
    cy.get('div').should('contain.text', 'Memory Usage');
  }
  else
  {
    obj_navtab.Monitor_click(projectName,branchName,status);
  }
  
};
export const NewUI_InstallLogValidation = (projectName, branchName) => {
  cy.get(`[href="/project/${projectName}/branches/${branchName}/logs"]`).click();
  cy.get('.logs-header select.form-select').select('install.log').should('have.value', 'install');
  cy.get('pre',{ timeout : 5000 }).should('contain.text',"odoo.modules.loading: init db");
 
};

export const NewUI_Add_Collabrator =( projectURL,projectName)=>{
  cy.get("[data-name='SvgIcon--CustomSetting']").click();
  cy.get("[placeholder='GitHub username']").type("jaimec2d{enter}")
  cy.get(".dropdown-item").should("be.visible");
  cy.get(".dropdown-item",{ timeout : 5000 }).contains("jaimec2d").click();
  cy.contains(".btn-hover-shadow.btn-primary[type='button']","Add").click();
  NewUI_toastMessageValidation("Collaborator added to the project.",5000);
  cy.wait(5000);
  cy.scrollTo("top");
 // cy.contains(".btn-close").click();
 cy.visit(`${projectURL}`);
 GoggarProjects();
  
  cy.get('.project-grid-card')
    .contains(projectName)
    .parents('.project-grid-card') // Ensure you have the correct card
    .within(() => {
      // Scope the following commands to this card
      cy.get('img.border').should('have.length', 2);
    });

}

export const NewUI_Editor_Verify_byOpening =()=>{
  cy.get("a.btn.btn-sm.dh-nav-item[rel='noopener'][role='button'][target='_blank']")
  .contains("Editor")               
  .should('be.visible')             
  .invoke("removeAttr", "target")   
  .click({force: true});                         

  cy.wait(10000);
 cy.get('.jp-BreadCrumbs-home',{ timeout : 60*1000 }).should("be.visible");
  // cy.get('.jp-BreadCrumbs-home').dblclick();
 // cy.wait(1000);
 // cy.get(':nth-child(2) > .jp-DirListing-itemName').should("be.visible");
  // cy.get(':nth-child(2) > .jp-DirListing-itemName').should('contain.text', 'src').dblclick();cy.wait(1000);
     // cy.get(':nth-child(1) > .jp-DirListing-itemText').should('contain.text', 'odoo').dblclick();cy.wait(1000);
      // cy.get('.jp-BreadCrumbs-home').dblclick();cy.wait(1000);
}

export const NewUI_Shells_Verify_byOpening =()=>{
  cy.get("a.btn.btn-sm.dh-nav-item[rel='noopener'][role='button'][target='_blank']")
      .contains('Shell')
      .should('be.visible')
      .invoke('removeAttr', 'target')
      .click({ force: true });

    cy.wait(5000);
    cy.get(`.xterm-link-layer`,{ timeout : 10000 }) // Replace with the unique selector of the shell
    .should('be.visible');

  // Optionally, validate shell content
    // cy.get(`.xterm-link-layer`, {timeout: 10000})
    // .contains('odoo@')
    // .should('exist');
    

    // cy.sendBashCommand('ls');
    // cy.sendBashCommand('cd src');
    // cy.sendBashCommand('ls');
    // cy.sendBashCommand('cd odoo');
    // cy.sendBashCommand('mkdir tt');
    // cy.sendBashCommand('ls');
    // cy.validateBashOutput('');
}

export const NewUI_Backup_size_Validation =()=>{
  cy.get('body > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > main:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(6)',)
          .invoke('text') // Get the text content
          .then((text) => {
            const number = parseFloat(text); // Extract the number (ignoring any non-numeric characters)
            expect(number).to.be.greaterThan(0); 
            // Assert that the number is greater than 0
          })
}

export const NewUI_OpenSettings =()=>{
  obj_settings.clickon_setting_button_to_open_setting_page();
}

export const NewUI_Connectas =()=>
{
  obj_history.connectAS_click();
  cy.get("h5#internal-users",{timeout : 5000}).should("be.visible")
}

export const oddopage_validation = (projectName,branchName,branchVersion,projectURL) => {
  NewUI_OpenProjectbranch(projectName, branchName, branchVersion, projectURL);
  
  cy.visit(`${projectURL}/${projectName}/branches/${branchName}/history`, {
    onBeforeLoad(win) {
      cy.stub(win, 'open').as('windowOpen');
    }
  });

  obj_EnvironmentNavBar.click_on_branch(branchName,branchVersion);
  obj_history.branch_title(branchName);
  
  cy.get('button.btn-lg.btn-success.connect').click();

  cy.get('@windowOpen', { timeout: 15000 }).should('be.called').then((stub) => {
    const url = stub.getCall(0).args[0];
    cy.visit(url);
  });

  cy.get('body').then(($body) => {
    if ($body.find('.btn').length > 0) {
      cy.get('.btn').should('be.visible');
    } else if ($body.find('.dashboard-page-element').length > 0) {
      cy.get('.dashboard-page-element').should('be.visible');
    } else {
      throw new Error('Neither Login nor Dashboard found!');
    }
  });
};

export const NewUI_MoveBranch_to_Branch=(branchName1,branchName2,branchVersion)=>{
   cy.contains(`[data-testid='${branchName1}-${branchVersion}']`,`${branchName1}`).dragTo(`[data-testid='${branchName2}-${branchVersion}']`, { force: true });
}
export const NewUI_MoveBranch_to_env=(branchName1,branchName2,branchVersion)=>{
   cy.contains(`[data-testid='${branchName1}-${branchVersion}']`,`${branchName1}`).dragTo(`[data-testid='${branchName2}-${branchVersion}']`, { force: true });
}