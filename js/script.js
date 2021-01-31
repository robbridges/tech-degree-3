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

const tShirtSelecion = () => {
  const tShirtDesignSelector = document.querySelector('#design');
  const tShirtColorSelector = document.querySelector('.shirt-colors');
  const tShirtOptions = tShirtColorSelector.lastElementChild.children
  const colorSelector = document.querySelector('#color');
  tShirtColorSelector.setAttribute('hidden', true);
  

  tShirtDesignSelector.addEventListener('change', e => {
    tShirtColorSelector.removeAttribute('hidden');
    for (let i = 1; i < tShirtOptions.length; i++) {
      // colorSelector.selectedIndex = '0';
      if (e.target.value === 'js puns') {
        colorSelector.selectedIndex = '1';
      } else if (e.target.value ='heart js') {
        colorSelector.selectedIndex = '4';
      }
      if (e.target.value === tShirtOptions[i].attributes['data-theme'].value) {
        tShirtOptions[i].removeAttribute('hidden');
     } else if(e.target.value !== tShirtOptions[i].attributes['data-theme'].value) {
       tShirtOptions[i].setAttribute('hidden', true);
     } 
    }
    

  });
  

}

hideJobRoleField();
tShirtSelecion();