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

        const user = document.querySelector('#name-holder') //name for nav bar
        user.innerHTML = foundUser.username

        const userRoleNav = document.querySelector('#name-roles') //roles for nav bar
        userRoleNav.innerHTML = foundUser.roles.role

        const studentsOnly = users.filter(person => person.roles.role === 'STUDENT') // THIS WILL be use in students database in frontend   

        studentsOnly.forEach(element => {
            const ul = document.querySelector('#new-stud-con') // container for the new stud

            const newStud = document.createElement('li') // made a li element
            newStud.classList.add('new-stud') // added the new made li element to an exisitning new-stud style in css

            const newStudName = document.createElement('div')
            newStudName.innerHTML = element.username

            const newStudCreated = document.createElement('div')
            newStudCreated.innerHTML = element.created

            const newStudRole = document.createElement('div')
            newStudRole.innerHTML = element.roles.role



            fetch('http://localhost:4000/addQuiz')
                .then((res) => {
                    if (!res.ok) throw new error('error line 79')
                    return res.json()
                })
                .then((res) => {
                    overAllWork = res.length

                    const newStudScore = document.createElement('div')
                    newStudScore.innerHTML = `${element.userScore} / ${overAllWork}`

                    newStud.appendChild(newStudName);
                    newStud.appendChild(newStudCreated);
                    newStud.appendChild(newStudRole);
                    newStud.appendChild(newStudScore)

                    ul.appendChild(newStud)

                })
                .catch(console.warn)



        });


    })
    .catch(console.warn)



