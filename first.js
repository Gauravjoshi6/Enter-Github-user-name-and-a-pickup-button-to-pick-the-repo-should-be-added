

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
