console.log("Easy Scrum");

TrelloPowerUp.initialize({
  'card-badges': function(t, options) {
    return [{
      //icon: estimate ? GREY_ROCKET_ICON : WHITE_ROCKET_ICON,
      text: getStringPoints(t),
      //color: estimate ? null : 'red',
    }];
  },
  'card-detail-badges': function(t, options) {
    return [{
      title: 'Points',
      text: estimate || '---',
      color: estimate ? null : 'red',
      callback: function(t) {
        return t.popup({
          title: "Points",
          url: 'forms/points.html',
        });
      }
    }]
  },
});


function getStringPoints(t) {  
  // Estimate Points
  var estimate = -1;
  t.get('card', 'shared', 'estimate')
  .then(function(value) {
    estimate = value || -1;
  });
  
  if (estimate == -1) {
    return '';
  }
  
  // Real Points
  var real = estimate;
  t.get('card', 'shared', 'real')
  .then(function(value) {
    real = value || estimate;
  });

  // Current Points
  var current = 0;
  t.get('card', 'shared', 'current')
  .then(function(value) {
    current = value || 0;
  });
  
  return current + "/" + real;
}
