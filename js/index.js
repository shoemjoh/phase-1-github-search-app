document.addEventListener('DOMContentLoaded', function () {

    // Grab the html elements
    const searchForm = document.getElementById('github-form')
    const userList = document.getElementById('user-list')
    const repoList = document.getElementById('repos-list')
    let repoItems = [];

    // Add Event Listeners
    searchForm.addEventListener('submit', handleSubmit)





    // Add event handlers
    function handleSubmit(e) {
        e.preventDefault();
        const searchName = document.getElementById('search').value;
        console.log(searchName)

        fetch(`https://api.github.com/search/users?q=${searchName}`, {
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        })
            .then(res => res.json())
            .then(data => {
                displayUsers(data.items)
            })
            .catch(error => console.error('Error:', error));
    }

    // Add users to the DOM
    function displayUsers(users) {
        userList.innerHTML = '';
        users.forEach(user => {
            const userDiv = document.createElement('div');
            userDiv.innerHTML = `
            <img src="${user.avatar_url}" alt="${user.login}">
            <p>Username: ${user.login} <br /><br />
            <button class="user-repo-btn">Get Repos!</button>
            </p>
            
          `;
            userList.appendChild(userDiv);
            document.querySelector('.user-repo-btn').addEventListener('click', () => {
                fetch(`https://api.github.com/users/${user.login}/repos`)
                    .then(res => res.json())
                    .then(data => {
                        data.forEach(obj => {
                            showRepos(obj.name)
                        })
                    }
                    )
            })
        })
    }

    function showRepos(name) {
        let repoItem = document.createElement('li');
        repoItem.innerHTML = `<span class="repo-item"> ${name} </span>`;
        repoList.appendChild(repoItem);
    }


})