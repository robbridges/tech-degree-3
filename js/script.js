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
/*
An event that modivies the T shirt selection aspect of our form, it first hides the color until a value is selected, then it only allows the select option that belong
to the correct shirt theme
*/
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
/*
Updates the cost field at the bottom based on the cost attribute of the selected input, it also reduces the value should the user unclick
*/
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
/*
Payment screen, it hides the content of other payment method instructions until they are selected
*/
const PaymentScreen = () => {
  const paymentSelector = document.querySelector('#payment')
  const payPalInfo = document.querySelector('#paypal');
  const bitcoinDiv = document.querySelector('#bitcoin');
  const creditCardDiv = document.querySelector('#credit-card')
  payPalInfo.setAttribute('hidden', true);
  bitcoinDiv.setAttribute('hidden', true);
  paymentSelector.selectedIndex = '1';
  paymentSelector.addEventListener('change', e => {
    if (e.target.value === 'paypal') {
      creditCardDiv.setAttribute('hidden', 'true');
      bitcoinDiv.setAttribute('hidden', true);
      payPalInfo.removeAttribute('hidden');
    }
    else if (e.target.value === 'bitcoin') {
      creditCardDiv.setAttribute('hidden', 'true');
      payPalInfo.setAttribute('hidden', true);
      bitcoinDiv.removeAttribute('hidden');
    }
    else if(e.target.value === 'credit-card') {
      payPalInfo.setAttribute('hidden', true);
      bitcoinDiv.setAttribute('hidden', true);
      creditCardDiv.removeAttribute('hidden');
    }
  });
}

const formSubmitValidation = () => {
  const form = document.querySelector('.container').firstElementChild;
  
  form.addEventListener('submit', e => {
    const name = document.querySelector('#name');
    if (!name.value) {
      
      addErrorMessage(name, e);
    }
    
  });


}

/*
A fuction that we use to set the error label and css values to a input that did not validate correctly. It is supposed to be unhiding the label but it doesn't seem to be. 
@Param element {element} and HTML element that we are trying updating the class of, and also inserting into the page
@Param e {event} standard event object also being passed as we want to prevent default of the page if there's an error
*/
const addErrorMessage = (element, e) => {
  e.preventDefault();
  element.parentElement.classList.add("not-valid");
  //element.parentElement.lastElementChild.removeAttribute('hidden'); TODO FIX THIS! It isn't display the element label
  //element.parentElement.lastElementChild.style.display = ''; //Also not working, it is correctly targeting the right element, it's just not making it visible
}







hideJobRoleField();
tShirtSelection();
RegisterActivities();
PaymentScreen();
formSubmitValidation();