var potentialFriends = require("../data/friends");

module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
    res.json(potentialFriends);
  });

  app.post("/api/friends", function(req, res) {
    var bestScore = Number.MAX_VALUE;
    var bestMatch;

    potentialFriends.forEach(function(element) {
      var userScores = req.body.scores;
      var friendScores = element.scores;
      var scoreDifference = 0;

      for (let i = 0; i < userScores.length - 1; i++) {
        scoreDifference += Math.abs(
          parseInt(userScores[i]) - parseInt(friendScores[i])
        );
      }

      if (scoreDifference < bestScore) {
        bestMatch = element;
        bestScore = scoreDifference;
      }
    });

    potentialFriends.push(req.body);

    res.json(bestMatch);
  });
};
