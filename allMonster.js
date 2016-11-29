function Renderer(data, items) {
  this.items = items || new Array();
  this.data = data;
  //  this.renderMonsters = renderMonsters;
  //  this.renderMonster = renderMonster;
  var self = this;
}
Renderer.prototype.featuresToString = function (f) {
  return JSON.stringify(f);
}
Renderer.prototype.renderFeatures = function (m, features) {
  if ($.type(features) === 'object' || $.type(features) === 'array') {
    //this.items.push('<li class=\'feature copound ft-' + m.replace(/ /g, '-') + '\'><strong>' + m + '</strong> : </li>');
    this.items.push('<div class=\'feature copound ft-' + m + '\'><strong>' + m + '</strong>');
    this.items.push('<div>');
    $.each(features, $.proxy(this.renderFeatures, this))
    this.items.push('</div>');
    this.items.push('</div>');
  } else {
    //this.items.push('<li class=\'feature ft-' + m.replace(/ /g, '-') + '\'>' + '<strong>' + m + '</strong> : ' + features + '</li>');
    this.items.push('<div class=\'feature ft-' + m + '\'>' + '<strong>' + m + '</strong> : ' + features + '</div>');
  }
}
Renderer.prototype.coolMonsterName = function (m, features) {
  if(features.awaken && (features.awaken + '').toLowerCase() === m) return features.awaken;
  if(features.name && features.element) return features.name + ' of ' + features.element;
  return m;
}
Renderer.prototype.rateAndCoolInfo = function (m, features) {
  var txt = '';
  if(features.ar) txt += features.ar + '/10 - ';
  if(features.txtBnA) txt += features.txtBnA.join(', ');
  return txt;
}

Renderer.prototype.renderMonster = function (m, features) {
  if (features.altK && this.data[features.altK]) {
    this.renderMonster(m, this.data[features.altK]);
  } else {
    this.items.push('<div class=\'monster lolight\' id=\'' + m + '\'>');
    this.items.push('<span class=\'coolName\'>' + this.coolMonsterName(m, features) + '</span>');
	this.items.push('<span class=\'coolInfo\'>' + this.rateAndCoolInfo(m, features) + '</span>');
    this.items.push('<div class=\'features invisible\' id=\'features-' + m + '\'>');
    //$.each(features, $.proxy(this.renderFeatures, this))
	var ft = 'name'
	if(features[ft]) this.renderFeatures(ft, features[ft]);
	ft = 'element'
	if(features[ft]) this.renderFeatures(ft, features[ft]);
	ft = 'awaken'
	if(features[ft]) this.renderFeatures(ft, features[ft]);
	ft = 'runes'
	if(features[ft]) this.renderFeatures(ft, features[ft]);
    this.items.push('</div>');
    this.items.push('</div>');
  }
}
Renderer.prototype.renderMonsters = function () {
  var keys = Object.keys(this.data);
  keys.sort();
  this.items.push('<div class=\'all-monsters\'>');
  //$.each(this.data, $.proxy(this.renderMonster, this));
  for(var k in keys){
    this.renderMonster(keys[k], this.data[keys[k]]);
  }
  this.items.push('</div>');
  $('<div/>', {
    'class': 'my-new-list',
    html: this.items.join('')
  }).appendTo('body');
  $('.monster').each(function () {
    $(this).click(clickOnMonster)
  })
}
function exploitData(data) {
  var r = new Renderer(data);
  r.renderMonsters();
}
function getMonsters() {
  $.getJSON('allMonster.json', exploitData);
}
function cbSwitchVisible() {
  switchVisible($(this));
}
function switchVisible(elt) {
  elt.toggleClass('visible');
  elt.toggleClass('invisible');
}
function cbSwitchHilight() {
  switchHilight($(this));
}
function switchHilight(elt) {
  elt.toggleClass('hilight');
  elt.toggleClass('lolight');
}
function clickOnMonster(event) {
  $('.hilight').each(cbSwitchHilight);
  switchHilight($(this));
  $('.visible').each(cbSwitchVisible);
  switchVisible($(this).children('.features'));
}






Renderer.prototype.renderFeaturesSv = function (m, features) {
  if ($.type(features) === 'object' || $.type(features) === 'array') {
    //this.items.push('<li class=\'feature copound ft-' + m.replace(/ /g, '-') + '\'><strong>' + m + '</strong> : </li>');
    this.items.push('<li class=\'feature copound ft-' + m + '\'><strong>' + m + '</strong>');
    this.items.push('<ul>');
    $.each(features, $.proxy(this.renderFeatures, this))
    this.items.push('</ul>');
    this.items.push('</li>');
  } else {
    //this.items.push('<li class=\'feature ft-' + m.replace(/ /g, '-') + '\'>' + '<strong>' + m + '</strong> : ' + features + '</li>');
    this.items.push('<li class=\'feature ft-' + m + '\'>' + '<strong>' + m + '</strong> : ' + features + '</li>');
  }
}
Renderer.prototype.renderMonsterSv = function (m, features) {
  if (features.altK && this.data[features.altK]) {
    this.renderMonster(m, this.data[features.altK]);
  } else {
    this.items.push('<li class=\'monster lolight\' id=\'' + m + '\'><strong>' + m + '</strong>');
    this.items.push('<ul class=\'features invisible\' id=\'features-' + m + '\'>');
    $.each(features, $.proxy(this.renderFeatures, this))
    this.items.push('</ul>');
    this.items.push('</li>');
  }
}
Renderer.prototype.renderMonstersSv = function () {
  this.items.push('<ul class=\'all-monsters\'>');
  $.each(this.data, $.proxy(this.renderMonster, this));
  this.items.push('</ul>');
  $('<div/>', {
    'class': 'my-new-list',
    html: this.items.join('')
  }).appendTo('body');
  $('.monster').each(function () {
    $(this).click(clickOnMonster)
  })
}

