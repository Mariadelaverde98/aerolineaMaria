
async function getUserAsync(name) {
    let response = await fetch(`https://api.github.com/users/${name}`);
    let data = await response.json()
    return data;
}

getUserAsync('daviniathebridge')
    .then(data => console.log(data))
    .catch(error => console.log("hubo un error" + error));
