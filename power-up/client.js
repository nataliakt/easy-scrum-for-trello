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
    return t.get('card', 'shared')
    .then(function(data) {
      var estimate = data.estimate;
      var real = data.real || estimate;
      var current = data.current || 0;

      var text = "";
      
      if (estimate) {
        text = current + "/" + real;
      }
      return [{
        //icon: estimate ? GREY_ROCKET_ICON : WHITE_ROCKET_ICON,
        text: text,
        //color: estimate ? null : 'red',
      }];
    });
  },
  'card-detail-badges': function(t, options) {
    return t.get('card', 'shared')
    .then(function(data) {
      var estimate = data.estimate;
      var real = data.real || estimate;
      var current = data.current || 0;

      var text = '<span class="icon-sm icon-add"></span>';
      
      if (estimate) {
        text = current + "/" + real;
      }
      return [{
        title: 'Points',
        text: text,
        //color: estimate ? null : 'red',
        callback: function(t) {
          return t.popup({
            title: "Points",
            url: 'forms/points.html',
          });
        }
      }]
    });
  },
});
