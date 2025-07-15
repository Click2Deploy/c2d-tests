export default class projectspage {

    click_project_having_name(projectName) {

      cy.get('.project-grid-card').then(($cards) => {
        if ($cards.length === 0) {
          cy.log('No Projects Found! All are deleted.');
          return;
        }
  
        cy.wrap($cards).each(($card) => {
          cy.wrap($card).find('h4.cursor-pointer').then(($title) => {
            const projectNameText = $title.text().trim();
  
            if (projectNameText.includes(projectName)) {
                cy.contains(projectName).click();
            } else 
            {
              
            }
          });
        });
      });
    }
  }
  