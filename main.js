const nameInput = document.querySelector('#nameinput');
const birthdayInput = document.querySelector('#bdinput');
const emailInput = document.querySelector('#emailinput');
const emailForm = document.querySelector('#emailForm');

function submitRewardsUser (e) {
  e.preventDefault();

  const body = {
    name: nameInput.value,
    birthday: birthdayInput.value,
    email: emailInput.value
  }

  axios
    .post('/api/rewards/users', body)
    .then(res => {
      console.log(res);
    })
    .catch(err => console.log(err))

    nameInput.value = "";
    birthdayInput.value = "";
    emailInput.value = "";
}

emailForm.addEventListener('submit', submitRewardsUser);