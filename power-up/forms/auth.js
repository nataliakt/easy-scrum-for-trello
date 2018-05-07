var t = window.TrelloPowerUp.iframe();

t.render(function() {
  return t.sizeTo('#content');
})

var oauthUrl = window.TrelloPowerUp.util.relativeUrl('../auth/authorize.html');

var authBtn = document.getElementById('authorize');
authBtn.addEventListener('click', function() {
  t.authorize(oauthUrl)
  .then(function(token) {
    return t.set('member', 'private', 'authToken', token)
  })
  .then(function() {
    return t.closePopup();
  });
});
