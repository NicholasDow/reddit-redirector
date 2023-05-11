function getRedirects() {
  json = localStorage.getItem('redirects') || '[]'; 
  return JSON.parse(json);
}

function setRedirects(list) {
  localStorage.setItem('redirects', JSON.stringify(list));
  storageUpdate();
}
// This uses a lot of jquery
function add() {
  var $from = $('#from');
  var $to = $('#to');
  redirects = getRedirects();
  redirects.push([$from.val(), $to.val()]);
  setRedirects(redirects);
  $from.val('');
  $to.val('');
}

function remove() {
  redirects = getRedirects();
  redirects.splice(this.value, 1);
  setRedirects(redirects);
}

function editHolder(fromInput, toInput) {
  return function edit() {
    redirects = getRedirects();
    if (!redirects) {
      storageUpdate();
      return;
    }
    var from = redirects[this.value][0];
    var to = redirects[this.value][1];
    redirects[this.value][0] = fromInput.val();
    redirects[this.value][1] = toInput.val();
    setRedirects(redirects);
  }
}

function storageUpdate() {
  var redirects = getRedirects();
  var $tbody = $('#redirects table tbody');
  $tbody.html('');
  $('#redirects').toggle(redirects.length>0);
  for (var i=0; i<redirects.length; i++) {
    addToTable(i, redirects[i][0], redirects[i][1]);
  }
}

function tmpl(id, context) {
  var tmpl = $('#'+id).html()
  for (var v in context) {
    var pattern = '{{'+v+'}}';
    while(tmpl.match(new RegExp(pattern))) {
      tmpl = tmpl.replace(pattern, context[v]);
    }
  }
  return $(tmpl);
}

function addToTable(id, from, to) {
  var $row = tmpl('table_row_tpl', {
    'id': id,
    'from': from,
    'to': to
  });
      
  $row.find('button.remove').on('click', remove);
  $row.find('button.edit').on('click', editHolder(
      $row.find('input.from'),
      $row.find('input.to'))
  );
  $row.appendTo($('#redirects table tbody'));
}


$(document).ready(function(){
  $('#add').on('click', add);
  storageUpdate();
});
