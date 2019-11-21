console.log('Before');
/*
getUser(1, (user) => {
    // Get the repositories
    getRepositories(user.gitHubUsername, (repos) => {
        // Get the commits
        getCommits(repos[0], (commits) => {
            console.log(commits);
        })
    })
});
*/

/*
getUser(1)
    .then(user => getRepositories(user.gitHubUsername))
    .then(repos => getCommits(repos[0]))
    .then(commits => console.log('Commits', commits))
    .catch(err => console.log('Error', err.message))
    ;
*/

// Async and Await
async function displayCommits() {
    try {
        const user = await getUser(1);
        const repos = await getRepositories(user.gitHubUsername);
        const commits = await getCommits(repos[0]);
        console.log(commits);   
    }
    catch(err) {
        console.log('Error', err.message);
    }

}
displayCommits();


console.log('After');


function getUser(id) {
    return new Promise((resolve, reject) => {
        // Kick off some async work
        setTimeout(() => {
            console.log('Reading an user from a database...');
            resolve({ id: id, gitHubUsername: 'mosh' });
        }, 2000);
    });
}

function getRepositories(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Fetching repos for user: ' + username);
            //resolve(['repo1', 'repo2', 'repo3']);
            reject(new Error('could not fetch repos!'));
        }, 2000);
    });
}

function getCommits(repo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Fetching commits: ');
            resolve(['commit1', 'commit2', 'commit3']);
        }, 2000);
    });
}