const button = document.querySelector('#button')

button.addEventListener('click', (e) => {
    e.preventDefault()

    const url = 'http://localhost:4000/login'

    const username = document.querySelector('#username')
    const password = document.querySelector('#password')




    username.addEventListener('input', (e) => {
        const username = document.querySelector('#username')

        if (!username.value.trim()) {
            username.style.border = 'red 1px solid';
        } else {
            username.style.border = 'lightgrey 1px solid';
        }
    })

    password.addEventListener('input', (e) => {
        const password = document.querySelector('#password')

        if (!password.value.trim()) {
            password.style.border = 'red 1px solid';
        } else {
            password.style.border = 'lightgrey 1px solid';
        }
    })

    const req = new Request(url,{
        method : 'POST',
        headers : {
            'Content-type' : 'application/json'
        },
        body : JSON.stringify({"user" : username.value , "pwd" : password.value})
    })

    fetch(req)
    .then(res => {
        if (!res.ok) {
            return res.json().then(errorData => {
                throw new Error(errorData.error);
            });
        }
        return res.json();
    })
    .then((data) => {
            const url = 'http://localhost:4000/users'

            const req = new Request(url,{
                method : 'GET',
                headers : {
                    'Content-type' : 'application/json'
                }
            })

            fetch(req)
            .then((res) => {
                if(!res.ok) throw new Error('ERROR')
                return res.json()
            })
            .then((data)=> {


                const userFound = data.find(person => person.username === username.value)

                console.log(userFound)

                // if(userFound.roles.role === 'STUDENT'){
                //     setTimeout(() => {
                //         window.location.href = 'http://localhost:4000/verifiedRoutes/studentDash';
                //     }, 500);
                // }

                // if(userFound.roles.role === 'TEACHER'){

                //     setTimeout(() => {
                //         window.location.href = 'http://localhost:4000/verifiedRoutes/teacherDash';
                //     }, 500);
                   
                // }

                



            })
            .catch(console.warn)
            
        
    })
    .catch((error) => {
        alert(`ERROR : ${error}`);
    });

})