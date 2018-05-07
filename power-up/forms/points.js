var t = TrelloPowerUp.iframe();

window.points.addEventListener('submit', function(event){
  event.preventDefault();
  
  return t.set('card', 'shared', 'estimate', window.estimate.value)
  .then(function(){
    
    return t.set('card', 'shared', 'real', window.real.value)
    .then(function(){
      
      return t.set('card', 'shared', 'current', window.current.value)
      .then(function() {
        t.closePopup();
      });
    });
  });
});

t.render(function(){
  return t.get('card', 'shared', 'estimate')
  .then(function(estimate){
    window.estimate.value = estimate || '';
    
    t.get('card', 'shared', 'real')
    .then(function(real){
      window.current.max = real || estimate || 0;
      window.real.value = real || estimate || '';
    });
    
    t.get('card', 'shared', 'current')
    .then(function(current){
      window.current.value = current || 0;
      window.currentSpan.innerHTML = current || 0;
    });
    
    window.estimate.oninput = function() {
      if (window.real.value == '') {
        window.current.max = this.value;
      }
    }
    
    window.real.oninput = function() {
      if (window.real.value != '') {
        window.current.max = this.value;
      }
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
