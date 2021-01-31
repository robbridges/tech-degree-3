const namefield = document.querySelector('#name');
namefield.focus();


/*
We are simply hiding the 'other' text input asking users to manually field in their job role if other is selected, otherwise that text field should not appear. 
*/
const jobRoleFieldHidden = () => {
  const otherJobRoleField = document.querySelector('.other-job-role');
  otherJobRoleField.style.display = 'none';
  const jobRole = document.querySelector('#title');
  jobRole.addEventListener('change', e => {
    if(e.target.value === 'other') {
      otherJobRoleField.style.display = '';
    }
  });
}

jobRoleFieldHidden();