var icon = "https://nataliakt.github.io/easy-scrum-for-trello/images/kitty.png";
var iconBlack = "https://nataliakt.github.io/easy-scrum-for-trello/images/kitty-black.png";
var iconWhite = "https://nataliakt.github.io/easy-scrum-for-trello/images/kitty-white.png";

var openBurndown = function (t) {
  t.modal({
    url: 'charts/burndown.html',
    args: { text: 'Hello' },
    accentColor: '',
    fullscreen: true,
    title: 'Burndown'
  });
};

var setTotalPoints = function () {
  var extras = document.getElementsByClassName("list-header-extras");
  console.log(extras);
}

setTotalPoints();

TrelloPowerUp.initialize({
  'card-buttons': function(t, options){
    return [{
      icon: icon,
      text: 'Points',
      callback: function(t){
        return t.popup({
          title: "Points",
          url: 'forms/points.html'
        });
      }
    }];
  },
  'card-badges': function(t, options) {
    return t.get('card', 'shared')
    .then(function(data) {
      console.log(options);
      var estimate = data.estimate;
      var real = data.real || estimate;
      var current = data.current || 0;

      var text = "";
      var image = null;
      var color = null;
      
      if (estimate) {
        text = current + "/" + real;
        image = iconWhite;
        if (real == current) {
          color = "green";
        } else {
          color = "blue";
        }
      }
      
      return [{
        icon: image,
        text: text,
        color: color,
      }];
    });
  },
  'card-detail-badges': function(t, options) {
    return t.get('card', 'shared')
    .then(function(data) {
      var estimate = data.estimate;
      var real = data.real || estimate;
      var current = data.current || 0;

      var text = 'Click to Estime';
      var color = null;
      
      if (estimate) {
        text = current + "/" + real;
        if (real == current) {
          color = "green";
        } else {
          color = "blue";
        }
      } else {
        color = "red";
      }
      
      return [{
        title: 'Points',
        text: text,
        color: color,
        callback: function(t) {
          return t.popup({
            title: "Points",
            url: 'forms/points.html',
          });
        }
      }]
    });
  },
  'board-buttons': function (t, opts) {
    return [{
      icon: {
        dark: iconWhite,
        light: iconBlack
      },
      text: 'Scrum Cat',
      callback: openBurndown,
      condition: 'edit'
    }];
  },
  'authorization-status': function(t, options){
    return t.get('member', 'private', 'authToken')
    .then(function(authToken) {
      return { authorized: authToken != null }
    });
  },
  'show-authorization': function(t, options){
    return t.popup({
      title: 'Authorize Account',
      url: 'forms/auth.html',
      //height: 140,
    });
  }
});
