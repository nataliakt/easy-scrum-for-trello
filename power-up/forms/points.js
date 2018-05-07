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
    window.estimate.value = estimate || '';
    
    t.get('card', 'shared', 'real')
    .then(function(real){
      window.current.max = real || estimate || 0;
      window.real.value = real || estimate || '';
    });
    
    t.get('card', 'shared', 'current')
    .then(function(current){
      window.current.value = current || 0;
      window.estimateSpan.text = current || 0;
    });
    
  })
  .then(function(){
    t.sizeTo('#points').done();
  });
});

// Atualiza span do current
var slider = document.getElementById("current");
var output = document.getElementById("currentSpan");
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
}

// Atualiza slider
var slider = document.getElementById("current");
