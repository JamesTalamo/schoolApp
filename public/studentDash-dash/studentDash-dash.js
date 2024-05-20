const logout = document.querySelector('#logoutButton')
logout.addEventListener('click', () => {
    const url = 'http://localhost:4000/logout'

    const req = new Request(url, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
    })

    fetch(req)
        .then((res) => {
            if (!res.ok) throw new Error('ERROR')
            return res.json()
        })
        .catch(console.warn)

    window.location.href = 'http://localhost:4000/login'
})


const userRequest = 'http://localhost:4000/users'
const userReq = new Request(userRequest, {
    method: 'GET',
    headers: {
        'Content-type': 'application/json'
    }
})

let users;

fetch(userReq)
    .then((res) => {
        if (!res.ok) throw new Error('USER REQ ERROR')
        return res.json()
    })
    .then((usersData) => {
        users = usersData
        const accessToken = 'http://localhost:4000/getCookie'
        return fetch(accessToken)
    })
    .then((accessTokenRes) => {
        if (!accessTokenRes.ok) throw new Error('ACCESS TOKEN RES ERROR')
        return accessTokenRes.json()
    })
    .then((accessTokenData) => {
        const token = accessTokenData.jwtAccessToken

        const foundUser = users.find(person => person.accessToken === token)
        console.log(foundUser)


        const user = document.querySelector('#name-holder') //name for nav bar
        user.innerHTML = foundUser.username

        const userRoleNav = document.querySelector('#name-roles') //roles for nav bar
        userRoleNav.innerHTML = foundUser.roles.role


        //
        const url = 'http://localhost:4000/addQuiz'

        const req = new Request(url, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        })

        fetch(req)
            .then((res) => {
                if (!res.ok) throw new Error('Error line 71')
                return res.json()
            })
            .then((data) => {


                let currentPosition = 0;

                const displayQuestion = () => {//will show the questions to the user

                    const container = document.querySelector('#questionCon');

                    container.innerHTML = '';

                    const element = data[currentPosition];
                    Object.keys(element).forEach(propertyName => {
                        if (propertyName !== 'correctAns') {
                            // console.log(`${propertyName} : ${element[propertyName]}`);

                            const choiceCreate = document.createElement('div');
                            choiceCreate.classList.add('items-questions');
                            choiceCreate.innerHTML = element[propertyName];

                            if (propertyName !== 'question') {

                                const radio = document.createElement('input');
                                radio.type = 'radio';
                                radio.classList.add('checkBoxClass');
                                radio.name = 'answer';
                                choiceCreate.appendChild(radio);
                            }
                            container.appendChild(choiceCreate);
                        }
                    });
                }

                let correctAnswer;
                const correctAnsEach = () => { // will show the user each correct answer for that question
                    const element = data[currentPosition]

                    Object.keys(element).forEach(propertyName => {
                        if(propertyName === 'correctAns'){
                            correctAnswer = element[propertyName]
                            // console.log(element[propertyName])
                        }
                    });
                }

                let userAnswer ;
                const checkCorrectAnswer = () => {
                    const allChoices = document.querySelectorAll('.items-questions');
                    const allCheckBox = document.querySelectorAll('.checkBoxClass')

                    let pick ;
                    for(let a =0; a < allCheckBox.length; a++){
                        allCheckBox[a].addEventListener('click', () => {
                            pick = allChoices[a+1].innerHTML
                            let split = pick.split('<')[0]
                            // console.log(split)
                            userAnswer = split
                        })
                        
                    }

                };
                
                correctAnsEach()
                displayQuestion()
                checkCorrectAnswer()



                const nextButton = document.querySelector('#next');
                const prevButton = document.querySelector('#prev');

                nextButton.addEventListener('click', () => {
                    currentPosition += 1;
                    if (currentPosition < data.length) {
                        correctAnsEach()
                        displayQuestion();
                        checkCorrectAnswer()
                    } else {
                        currentPosition = data.length - 1; // Prevent going beyond the last question
                    }
                });

                prevButton.addEventListener('click', () => {
                    currentPosition -= 1;
                    if (currentPosition >= 0) {
                        correctAnsEach()
                        displayQuestion();
                        checkCorrectAnswer()
                    } else {
                        currentPosition = 0; // Prevent going before the first question
                    }
                });

                const submitButton = document.querySelector('#submit')
                submitButton.addEventListener('click', () => {
                    console.log(correctAnswer)
                    console.log(userAnswer)
                    if(correctAnswer === userAnswer) {
                        console.log('+1')
                        // changing the user score from the database!
                        
                        const url = 'http://localhost:4000/getScore'
                        

                        fetch(url)
                        .then((res) => {
                            if(!res.ok) throw new Error('line 189')
                            return res.json()
                        })
                        .catch(console.warn)
                        

                        
                    }
                    alert('Done! Continue to next page!')
                })


            })
            .catch(console.warn)
    })
    .catch(console.warn)



