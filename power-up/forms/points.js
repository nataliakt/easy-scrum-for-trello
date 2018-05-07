var t = TrelloPowerUp.iframe();

window.points.addEventListener('submit', function(event){
  event.preventDefault();    
  return t.set('card', 'shared', {
    'estimate': window.estimate.value,
    'date': window.date.value,
    'current': window.current.value
  })
  .then(function(){
    t.closePopup();
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
