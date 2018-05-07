var t = TrelloPowerUp.iframe();

window.points.addEventListener('submit', function(event){
  event.preventDefault();
  
  return t.set('card', 'shared', {
    'estimate': window.estimate.value,
    'real': window.real.value,
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
    var real = data.real;
    var current = data.current;
    
    window.estimate.value = estimate || '';
    
    window.current.max = real || estimate || 0;
    window.real.value = real || estimate || '';
    
    window.current.value = current || 0;
    window.currentSpan.innerHTML = current || 0;
    
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
