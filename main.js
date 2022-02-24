const nameInput = document.querySelector('#nameinput');
const birthdayInput = document.querySelector('#bdinput');
const emailInput = document.querySelector('#emailinput');
const emailForm = document.querySelector('#emailForm');

function submitRewardsUser (e) {
  e.preventDefault();

  axios
    .post('/api/rewards/users'), {
    name: nameInput.value,
    birthday: birthdayInput.value,
    email: emailInput.value
  }
    .then(res => {
      console.log(res);
    })
    .catch(err => console.log(err))
}

emailForm.addEventListener('submit', submitRewardsUser);