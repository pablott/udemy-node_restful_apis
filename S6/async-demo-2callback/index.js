console.log('Before');
getUser(1, (user) => {
    // Get the repositories
    getRepositories(user.gitHubUsername, (repos) => {
        // Get the commits
        getCommits(repos[0], (commits) => {
            console.log(commits);
        })
    })
});

console.log('After');

function getUser(id, callback) {
    setTimeout(() => {
        console.log('Reading an user from a database...');
        callback({ id: id, gitHubUsername: 'mosh' });
    }, 2000);
}

function getRepositories(username, callback) {
    setTimeout(() => {
        console.log('Fetching repos for user: ' + username);
        callback(['repo1', 'repo2', 'repo3']);
    }, 2000);
}

function getCommits(repo, callback) {
    setTimeout(() => {
        console.log('Fetching commits: ');
        callback(['commit1', 'commit2', 'commit3']);
    }, 2000);
}