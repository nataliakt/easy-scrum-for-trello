console.log("Easy Scrum");

TrelloPowerUp.initialize({
  'card-buttons': function(t, options){
    return [{
      //icon: GREY_ROCKET_ICON,
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
    return [{
      //icon: estimate ? GREY_ROCKET_ICON : WHITE_ROCKET_ICON,
      text: getStringPoints(t),
      //color: estimate ? null : 'red',
    }];
  },
  'card-detail-badges': function(t, options) {
    return [{
      title: 'Points',
      text: getStringPoints(t) || '',
      //color: estimate ? null : 'red',
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
  return t.get('card', 'shared')
  .then(function(data) {
    var estimate = data.estimate;
    var real = data.real || estimate;
    var current = data.current || 0;

    console.log(data, data['estimate'], estimate);
    
    if (estimate) {
      return current + "/" + real;
    }
    return '';
  });
}
