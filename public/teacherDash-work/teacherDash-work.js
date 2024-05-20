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
    })
    .catch(console.warn)


const submit = document.querySelector('#submit')
submit.addEventListener('click', (e) => {
    e.preventDefault()

    const question = document.querySelector('#questions')
    const choice1 = document.querySelector('#choice1')
    const choice2 = document.querySelector('#choice2')
    const choice3 = document.querySelector('#choice3')
    const correctAnswer = document.querySelector('#correctAnswer')

    if(!question.value) return alert('question is empty')
    if(!choice1.value) return alert('choice1 is empty')
    if(!choice2.value) return alert('choice2 is empty')
    if(!choice3.value) return alert('choice3 is empty')
    if(!correctAnswer.value) return alert('correct answer is empty')

    alert('questions added successfully')
    
    const url = 'http://localhost:4000/addQuiz'
    const req = new Request(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            "question": question.value,
            "choice1": choice1.value,
            "choice2": choice2.value,
            "choice3": choice3.value,
            "correctAnswer": correctAnswer.value
        })
    })

    fetch(req)
    .then(res => {
        if(!res.ok) throw new error({"error" : "line 95"})
        return res.json()
    })
    .catch(error)
})


