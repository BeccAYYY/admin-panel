var url = "http://127.0.0.1/API/API/core.php"

export async function deleteUser(username) {
    var values = {username: username};
    await fetch(url + "?action=delete_user", {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
}