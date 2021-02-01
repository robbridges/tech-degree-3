const namefield = document.querySelector('#name');
namefield.focus();


/*
We are simply hiding the 'other' text input asking users to manually field in their job role if other is selected, otherwise that text field should not appear. 
*/
const hideJobRoleField= () => {
  const jobRole = document.querySelector('#title');
  const otherJobRoleField = document.querySelector('.other-job-role');
  otherJobRoleField.style.display = 'none';
  jobRole.addEventListener('change', e => {
    if(e.target.value === 'other') {
      otherJobRoleField.style.display = '';
    } else {
      otherJobRoleField.style.display ='none';
    }
    
  });
}

const tShirtSelection = () => {
  const tShirtDesignSelector = document.querySelector('#design');
  const tShirtColorSelector = document.querySelector('.shirt-colors');
  const tShirtOptions = tShirtColorSelector.lastElementChild.children
  const colorSelector = document.querySelector('#color');
  tShirtColorSelector.setAttribute('hidden', true);
  

  tShirtDesignSelector.addEventListener('change', e => {
    tShirtColorSelector.removeAttribute('hidden');
    for (let i = 1; i < tShirtOptions.length; i++) {
      if (e.target.value === 'js puns') {
            colorSelector.selectedIndex = '1';
            tShirtOptions[i].removeAttribute('hidden');
            if (tShirtOptions[i].attributes['data-theme'].value !== 'js puns') {
              tShirtOptions[i].setAttribute('hidden', true);
            }

      } else {
        colorSelector.selectedIndex = '4';
        tShirtOptions[i].removeAttribute('hidden');
        if (tShirtOptions[i].attributes['data-theme'].value !== 'heart js') {
          tShirtOptions[i].setAttribute('hidden', true);
        }
      }
    }
  });
}

const RegisterActivities = () => {
  const activities = document.querySelector('.activities');
  const activitiesTotal = document.querySelector('#activities-cost')
  let total = 0;
  activities.addEventListener('change', e => {
    if (e.target.checked) {
      total += parseInt(e.target.attributes['data-cost'].value);
    } else {
      total -= parseInt(e.target.attributes['data-cost'].value);
    }
    activitiesTotal.textContent = `Total: $${total}`
  });
}



hideJobRoleField();
tShirtSelection();
RegisterActivities();