// document.getElementById('search').addEventListener('click', function(){

//     const hello = document.querySelector("#hello").value;
//     const resultname = document.querySelector("#result");
//     if(hello){
//         const a = fetch('https://api.github.com/users/${login}')

//         a.then((response) =>{
//             if(!response.ok){
//                throw new Error('network response was not ok' + response.statusText);
//             }
//             return response.json();
//         }).then((value2)=>{
//             resultname.innerHTML = '<h2>${value2.name} (${value2.login}) </h2> <img src=$(value2.avatar_url) alt="value2.name" width="100"> <p>Follower: ${value2.folowers}</p> '
//              ;
//             console.log(value2);
//         }).catch((error) =>{
//             resultname.innerHTML = '<p> Error: ${error.massage}</p>';
//         });
   
        
//     } else{
//         resultname.innerHTML = '<p>please enter a Github</p>';
//     }
// });





// const a = fetch("https://api.github.com/repos/octocat/Hello-World");

// a.then((response) =>{
//     if(!response.ok){
//         return Promise.reject('user not found: ${reponse.status}');
//     }
//     return response.json()
// }).then((value2)=>{
//     hello.innerHTML = value2 ;
//     console.log(value2);
// })

// const kon = "https://api.github.com/repos/octocat/Hello-World"
// const xhr = new XMLHttpRequest()
// xhr.open('GET', kon);
// xhr.onreadystatechange = function(){
//     if(xhr.readyState === 4){
//         const data = JSON.parse(this.responseText);
//         console.log(data);
//         hello.innerHTML = data;
//     }
// }
// xhr.send()





async function fetchRepos() {
    const username = document.getElementById('username').value;
    const reponame = document.getElementById('reponame').value;

    let url = `https://api.github.com/users/${username}/repos`;

    if (reponame) {
        url = `https://api.github.com/repos/${username}/${reponame}`;
    }

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayRepos(data);
    } catch (error) {
        console.error('Error fetching repos:', error);
    }
}

function displayRepos(repos) {
    const repoList = document.getElementById('repo-list');
    repoList.innerHTML = '';

    if (Array.isArray(repos)) {
        repos.forEach(repo => createRepoElement(repo, repoList));
    } else {
        createRepoElement(repos, repoList);
    }
}

function createRepoElement(repo, repoList) {
    const repoDiv = document.createElement('div');
    repoDiv.className = 'repo';
    repoDiv.innerHTML = `
        <p><strong>${repo.full_name}</strong></p>
        <p>Watchers: ${repo.watchers_count}</p>
        <p>Open Issues: ${repo.open_issues_count}</p>
        <p>Forks: ${repo.forks_count}</p>
        <p>Language: ${repo.language}</p>
        <button onclick="pickRepo('${repo.full_name}', ${repo.watchers_count}, ${repo.open_issues_count}, ${repo.forks_count}, '${repo.language}')">Pick</button>
    `;
    repoList.appendChild(repoDiv);
}

function pickRepo(name, watchers, issues, forks, language) {
    const pickedRepos = document.getElementById('picked-repos');

    const pickedRepoDiv = document.createElement('div');
    pickedRepoDiv.className = 'picked';
    pickedRepoDiv.innerHTML = `
        <p><strong>${name}</strong></p>
        <p>Watchers: ${watchers}</p>
        <p>Open Issues: ${issues}</p>
        <p>Forks: ${forks}</p>
        <p>Language: ${language}</p>
    `;
    pickedRepos.appendChild(pickedRepoDiv);
}