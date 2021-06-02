const p = new Promise((resolve, reject) => {
    //Kick off some async work
    // ...
    setTimeout(() => {
        //resolve(1); //resolved, fulfilled (also called pending)
        reject(new Error('message')); //if failed, it goes from pending to rejected
    }, 2000);

    //reject(new Error('message'));
});

p
    .then(result => console.log('Result', result))
    .catch(err => console.log('Error', err.message))