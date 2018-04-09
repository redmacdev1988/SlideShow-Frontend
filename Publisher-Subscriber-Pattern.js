
// global object of empty literal object
var pubsub = {};

// block scope created by IIFE.
// it takes in a parameter q
(function(q){

  // private literal object
  var topics = {};

  // private id
  var subUid = -1;

  // Different objects will want to subscribe and receive notifications.
  // 1) the objects will call subscribe. It will then pass in the topic
  // to which it wants to subscribe

  // It will pass in a callback to receive the data

  q.subscribe = function(topic, func) {
    // given key 'topic', if there is no value, we initialize empty array
    // for that key
    if (!topics[topic]) {
      topics[topic] = [];
    }

    // a very simple id generator
    var token = (++subUid).toString();

    // INSERT A SUBSCRIBER
    // the topic is the key property, Value is the literal object we push.
    topics[topic].push({
      token: token,   // token reps an id.
      func: func      // func is the functionality we decide to pass in
    });

    // return the key used for this object that's stored in in topics
    return token;
  };


  // we add a function property to the passed in global object pubsub
  q.publish = function(topic, args) {

      if (!topics[topic]) {
        console.log("Error, object with this topic NOT FOUND")
        return false;
      }


      //setTimeout(function() {
        var arrayOfSubscribers = topics[topic];
        // get # of subscribers
        var len = arrayOfSubscribers ? arrayOfSubscribers.length : 0;
        console.log(`# of subscribers: ${len}`)

        // go through # of subscribers and execute their callback
        while (len--) {
          //console.log(`Executing subscriber ${topic}, `)
          console.log(arrayOfSubscribers[len]);
          arrayOfSubscribers[len].func(topic, args, arrayOfSubscribers[len].token);
        }

      //}, 0);

      return true;
  };

  q.unsubscribe = function(token) {
    console.log(`unsubscribing subscriber with uid of ${token}`)
    // todo
    console.log(`Let's check out the topics available`);

    for (let m in topics) {
      console.log(`For topic ${m}, let's check for any subscribers with token ${token}`)

      let subscribers = topics[m];
      if (subscribers) {
          for (let i = 0; i < subscribers.length; i++) {
            if (subscribers[i].token === token) {
              console.log(`HO HO! FOUND A SUBSCRIBER with token ${token}. Let's remove it!`)
              subscribers.splice(i, 1); // remove 1 element at index i
              return token;
            }
          }
      }
    }
    return 0
  };

}(pubsub)); // we pass parameter pubsub into the IIFE

let toUnsubscribe;

pubsub.subscribe("JS", function(topic, args, token) {
  console.log("Ricky received " + topic + " content");
  console.log("The data is: " + args);
  console.log("Your subscription token is: " + token);
  toUnsubscribe = token;
});

pubsub.subscribe("JS", function(topic, args, token) {
  console.log("David received JS data: " + args);
  console.log("Your subscription token is: " + token);
});

pubsub.publish("JS", "Design Pattern of es6 JS");

if (pubsub.unsubscribe(toUnsubscribe)>0) {
  console.log("removed subscription")
}
