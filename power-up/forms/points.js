var t = TrelloPowerUp.iframe();

window.points.addEventListener('submit', function(event){
  event.preventDefault();
  
  return t.get('board', 'shared', 'story-points')
  .then(function (storyPoints) {
    var points = {
      'estimate': window.estimate.value,
      'date': window.date.value,
      'current': window.current.value
    }
    JSON.parse(storyPoints)
    JSON.stringify(points)
    
    return t.set('card', 'shared', )
    .then(function(){
      t.closePopup();
    });
  });
});

t.render(function(){
  return t.get('card', 'shared')
  .then(function(data){
    var estimate = data.estimate;
    var date = data.date;
    var current = data.current;
    
    window.estimate.value = estimate || '';
    
    window.current.max = estimate || 0;
    window.date.value = '';
    
    window.current.value = current || 0;
    window.currentSpan.innerHTML = current || 0;
    
    window.estimate.oninput = function() {
      window.current.max = this.value;
    }
    
    window.current.oninput = function() {
      window.currentSpan.innerHTML = this.value;
      window.current.value = this.value;
    }
    
  })
  .then(function(){
    t.sizeTo('#points').done();
  });
});
