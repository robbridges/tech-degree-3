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
    }
    
  });
}

const tShirtSelecion = () => {
  const tShirtDesignSelector = document.querySelector('#design');
  const tShirtColorSelector = document.querySelector('.shirt-colors');
  const tShirtOptions = tShirtColorSelector.lastElementChild.children
  tShirtColorSelector.style.display = 'none';
  tShirtDesignSelector.addEventListener('change', e => {
    
    tShirtColorSelector.style.display = '';
    //for (let i = 0; i < tShirtOptions.length; i++) {
      // if(e.target.value !== tShirtOptions[i].attributes['data-theme']);
      //   tShirtOptions[i].setAttribute('hidden', true);
    // }

      
    
  });

}

hideJobRoleField();
tShirtSelecion();