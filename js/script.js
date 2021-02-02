/*
focuses the name field when the page is loaded.
*/

const nameFieldFocus = () => {
  const namefield = document.querySelector('#name');
  namefield.focus();
}


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
/*
A large method that does all of our form validations, it checks to make sure that a form element is check, and that input added is valid
*/
const formSubmitValidation = () => {
  const form = document.querySelector('.container').firstElementChild;
  
  form.addEventListener('submit', e => {
    const name = document.querySelector('#name');
    const email = document.querySelector('#email');
    const activities = document.querySelector('#activities-box');
    const paymentSelector = document.querySelector('#payment')
    const ccNumber =document.querySelector('#cc-num');
    const zipCode = document.querySelector('#zip');
    const cvvCode = document.querySelector('#cvv');
    if (!name.value || !isValidName(name.value)) {
      addErrorMessage(name, e);
    }
    if(name.value && isValidName(name.value)) {
      validatedInput(name);
    }
    if(!email.value || !isValidEmail(email.value)) {
      addErrorMessage(email, e);
    }
    if (email.value && isValidEmail(email.value)) {
      validatedInput(email)
    }
    if (!checkActivites()) {
      addFormErrorMessage(activities, e);
    }
    if(checkActivites()) {
      validateForm(activities);
    }
    if(paymentSelector.value === 'credit-card') {
      if (!isValidCardNumber(ccNumber.value)) {
        addErrorMessage(ccNumber, e);
      }

      if (isValidCardNumber(ccNumber.value)) {
        validatedInput(ccNumber);
      }

      if(!isValidZip(zipCode.value)) {
        addErrorMessage(zipCode, e);
      }
      if(isValidZip(zipCode.value)) {
        validatedInput(zipCode)
      }

      if(!isValidCVV(cvvCode.value)) {
        addErrorMessage(cvvCode, e);
      }
      if(isValidCVV(cvvCode.value)) {
        validatedInput(cvvCode);
      }
    }
    
    
  });
}

/*
Key up event to validate the name field while user is typing into it. In theory we should make one for all event form validation
*/
const nameKeyUp = () => {
  const name = document.querySelector('#name');
  name.addEventListener('keyup', e => {
    if (isValidName(name.value)) {
      validatedInput(name,e)
    }
    if (containsSpecialCharacters(name.value)) {
      name.parentElement.lastElementChild.textContent = 'Name cannot contain any special characters';
      addErrorMessage(name,e);
    }
    if (containsNumbers(name.value)) {
      name.parentElement.lastElementChild.textContent = 'Cannot contain a number';
      addErrorMessage(name, e)
    }
    

  })
}

/*
Creating a fuction for all of our regex tests so that it can be passed into RegEx
validation fuctions.
@Param regex {regex} a regex expression that we want to test or replace
@Param text {string} string that we want to test for a match with the regex
*/
const regexTester = (regex, text) => {
  return regex.test(text);
}
/*
Checks if valid name, only one or more letter should return a match
@Param text {String} regex string we are comparing for a match
*/
const isValidName = (text) => {
  return regexTester(/[a-z]{1,}/i, text);
  
}
/*
Checks if valid email, taken from the treehouse Course by Joel Kraft. 
@Param text {String} regex string we are comparing for a match
*/
const isValidEmail = (text) => {
  return regexTester(/^[^@]+@[^@.]+\.\w+$/i, text);
  
}
/*
Checks if valid cc-Number, Should only match a string that starts and ends with 13 or more letters
@Param text {String} regex string we are comparing for a match
*/
const isValidCardNumber = (text) => {
  return regexTester(/^\d{13,16}$/, text);
  
}
/*
Checks if valid zipcode, Should only match a 5 digit number
@Param text {String} regex string we are comparing for a match
*/
const isValidZip = (text) => {
  return regexTester(/\d{5}/, text);
}
/*
Checks if valid cvv dode, Should only match a 3 digit number
@Param text {String} regex string we are comparing for a match
*/
const isValidCVV = (text) => {
  return regexTester(/\d{3}/, text);
}
/*
Checks if the text to test contains numbers. We use use when validating the name keyup event
@Param text {String} regex string we are comparing for a match
*/
const containsNumbers = text => {
  return regexTester(/\d/, text);
}
/*
Checks if the text to test contains special characters. We use use when validating the name keyup event
@Param text {String} regex string we are comparing for a match
*/
const containsSpecialCharacters = (text) => {
  return regexTester(/\W/, text);
}

/*
Checks to make sure at least one of the selected activities is checked.
*/
const checkActivites = () => {
  const activitiesList = document.querySelectorAll('input'); 
  for (let i =0; i < activitiesList.length; i++) {
    if(activitiesList[i].checked) {
      return true;
    }
  }
  return false;
}



/*
A fuction that we use to set the error label and css values to a input that did not validate correctly. We then have to change the style of the display 
@Param element {element} and HTML element that we are trying updating the class of, and also inserting into the page
@Param event {event} standard event object also being passed as we want to prevent default of the page if there's an error
*/
const addErrorMessage = (element, event) => {
  event.preventDefault();
  element.parentElement.className = 'not-valid';
  element.parentElement.classList.remove('valid');
  element.parentElement.lastElementChild.setAttribute('style', 'display: block;');
}
/*
A fuction that we use to set add a validated class to the input's label, and remove the not valid css styleization 
@Param element {element} and HTML element that we are trying updating the class of, and also inserting into the page
*/
const validatedInput = (element) => {
  element.parentElement.className = 'valid';
  element.parentElement.classList.remove('not-valid');
  element.parentElement.lastElementChild.setAttribute('style', 'display: none;');
}
/*
The form had a different family tree than the input fields, this method below targets those
elements particiulary
*/
const addFormErrorMessage =(element, event) => {
  event.preventDefault();
  element.parentElement.firstElementChild.className = 'not-valid';
  element.parentElement.lastElementChild.setAttribute('style', 'display: block;');
}
/*
Special method to remove the css styleization added when the form was not correct. 
*/
const validateForm =(element) => {
  element.parentElement.firstElementChild.className = 'valid';
  element.parentElement.firstElementChild.classList.remove('not-vald');
  element.parentElement.lastElementChild.setAttribute('style', 'display: none;');
}
/*
We are looping over each input element and adding an event listenter to them so that they
can focus in and out when we tab through them. 
*/
/*
Simple function that adds event listers to every input type that is a checkbox.
The listeners add and remove a focus when tabbing through the list. 
*/
const activititiesFocus = () => {
  let activitiesList = document.querySelectorAll('input[type="checkbox"]');
  activitiesList.addEventListener
  for (let i = 0; i < activitiesList.length; i++) {
    activitiesList[i].addEventListener('focus', e => {
      activitiesList[i].parentElement.className = 'focus';
    });

    activitiesList[i].addEventListener('blur', e => {
      activitiesList[i].parentElement.className = '';
    });

  }
}

/*
We are checking to see if the actity that was selected is scheduled at the same time
of other activities, if so we are disabling that activity so that users cannot schedule
themselves for both
*/
const activityDisable = () => {
  let activitiesList = document.querySelectorAll('input[type="checkbox"]');

  for (let i = 0; i < activitiesList.length; i++) {
    activitiesList[i].addEventListener('change', e => {
      
      for (let i = 1; i < activitiesList.length; i++) {
        if (e.target.checked && activitiesList[i] !== e.target && e.target.attributes['data-day-and-time'].value 
          === activitiesList[i].attributes['data-day-and-time'].value) {
            
            activitiesList[i].parentElement.className ='disabled';
          } else if (!e.target.checked && e.target.attributes['data-day-and-time'].value
            === activitiesList[i].attributes['data-day-and-time'].value ) {
              activitiesList[i].parentElement.className = '';
          }
      }
    });
  }
}  





/*
We are just calling all of our functions real effort was put into this project to not be reliant on global variables. 
*/
nameFieldFocus();
hideJobRoleField();
tShirtSelection();
RegisterActivities();
PaymentScreen();
formSubmitValidation();
nameKeyUp();
activititiesFocus();
activityDisable();