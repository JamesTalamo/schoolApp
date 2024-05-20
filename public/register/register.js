const button = document.querySelector('#button')

button.addEventListener('click', (e) => {
    e.preventDefault();

    const url = 'http://localhost:4000/register'

    const username = document.querySelector('#username')
    const password = document.querySelector('#password')
    const cpassword = document.querySelector('#confirm-password')

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

    
    if (password.value === cpassword.value) {
        const req = new Request(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "user": username.value, "pwd": password.value })
        });
    
        fetch(req)
            .then((res) => {
                if (!res.ok) {
                    return res.json().then(errorData => {
                        throw new Error(errorData.error);
                    });
                }
                return res.json();
            })
            .then((data) => {
                alert("REGISTERED! Redirecting in seconds");
    
                setTimeout(() => {
                    window.location.href = 'http://localhost:4000/login';
                }, 2000);
            })
            .catch((error) => {
                alert(`ERROR : ${error}`);
            });
    } else {
        alert("Password does not match!");
    }
    
})