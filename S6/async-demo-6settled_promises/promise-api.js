//const p = Promise.resolve({id: 1});
//p.then(result => console.log(result));
// {id: 1}


const p = Promise.reject(new Error('reason for rejection'));
p.catch(error => console.log(error));
// Error object