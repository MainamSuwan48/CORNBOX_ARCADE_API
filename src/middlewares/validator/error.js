module.exports = (err, req, res, next) => {
  const funnyMessages = [
    "Oops! Our servers are taking a nap.",
    "Oh no! Something went wrong, but it's not your fault.",
    "Our servers are having a bad day.",
    "We're experiencing technical difficulties... or maybe the problem is you?",
    "Error 404: Sanity not found.",
    "Our servers are currently lost in the digital void.",
    "We're sorry, our servers are just as confused as you are.",
    "Our servers are currently questioning their existence.",
    "Our servers are currently meditating. Please try again later.",
    "Our servers are currently on a coffee break.",
  ];
  const randomIndex = Math.floor(Math.random() * funnyMessages.length);
  const message = funnyMessages[randomIndex];
  res.status(500).send({ error: message });
};
