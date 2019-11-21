console.log('Before');
getUser(1, gRepositories);
console.log('After');

/////////// Inline callback implementation with named functions ///////////
// use similar but different function names 
function gRepositories(user) {
    console.log('Got repos');
    getRepositories(user, gCommits);
}

function gCommits(repos) {
    console.log('Got commits');
    getCommits(repos[0], displayCommits);
}

function displayCommits(commits) {
    console.log('commits: ' + commits);
}


/////////// Async Functions ///////////
function getUser(id, callback) {
    setTimeout(() => {
        console.log('Reading a user from a database...');
        callback({ id: id, gitHubUsername: 'mosh' });
    }, 2000);
}

function getRepositories(username, callback) {
    setTimeout(() => {
        console.log('Fetching repos for user: ' + username.gitHubUsername);
        callback(['repo1', 'repo2', 'repo3']);
    }, 2000);

}

function getCommits(commits, callback) {
    setTimeout(() => {
        console.log('Fetching commits');
        callback(['commit1', 'commit2', 'commit3']);
    }, 2000);
}

