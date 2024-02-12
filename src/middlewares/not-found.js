module.exports = (req, res, next) => {
  res.status(404).render({
    message:
      "This page is practicing its magic trick of invisibility. It's pretty good, isn't it?",
  });
};
