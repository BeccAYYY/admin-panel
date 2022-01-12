export const url = "http://127.0.0.1/API/API/core.php"

export async function formSubmit(formName, values) {
    return await fetch(url + "?action=" + formName, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
        .then(response => ({
            data: response.json(),
            code: response.code,
            ok: response.ok
        }))
}