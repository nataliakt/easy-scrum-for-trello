var t = TrelloPowerUp.iframe();

window.points.addEventListener('submit', function(event){
  event.preventDefault();
  
  t.set('card', 'shared', 'real', window.real.value);
  t.set('card', 'shared', 'current', window.current.value);
  
  return t.set('card', 'shared', 'estimate', window.estimate.value)
  .then(function(){
    t.closePopup();
  });
});

t.render(function(){
  return t.get('card', 'shared', 'estimate')
  .then(function(estimate){
    window.estimate.value = estimate;
    
    t.get('card', 'shared', 'real')
    .then(function(real){
      window.real.value = real;
    });
    
    t.get('card', 'shared', 'current')
    .then(function(current){
      window.current.value = current;
    });
    
  })
  .then(function(){
    t.sizeTo('#points').done();
  });
});
