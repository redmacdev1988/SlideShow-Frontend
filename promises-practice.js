

var isMomHappy = false;

// CREATE the Promise
var willIGetNewPhone = new Promise(
   function (resolve, reject) {

       if (isMomHappy) {
           var phone = {
               brand: 'Apple',
               color: 'Red'
           };
           resolve(phone); // fulfilled
       } else {
           var reason = new Error('mom is not happy');
           reject(reason); // reject
       }

   } // Promise function
); //Promise

// CONSUME THE Promise

var askMom = function () {
   willIGetNewPhone // call our promise variable
       .then(function (fulfilled) {
           console.log(fulfilled);
       })
       .catch(function (error) {
           console.log(error.message);
       });
};

askMom(); // run the promise consumption
