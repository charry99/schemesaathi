/* SchemeSaathi UI flow. Renders into #app using DOM nodes and textContent only. */
'use strict';

const STORE_DOCS = 'schemesaathi.docs';
const STORE_APPS = 'schemesaathi.applications';

// Quick-answer options. Each maps onto profile fields.
const COURSE_OPTS = [
  { key: 'courseClass6to10', level: 'school', course: 'Class 6-10' },
  { key: 'courseIntermediate', level: 'intermediate', course: 'Class 12' },
  { key: 'courseITI', level: 'UG', course: 'ITI' },
  { key: 'courseDegree', level: 'UG', course: 'Degree' },
  { key: 'courseBtech', level: 'UG', course: 'B.Tech' },
  { key: 'coursePG', level: 'PG', course: 'PG' }
];
const INCOME_OPTS = [
  { key: 'incomeUnder1L', value: 80000 },
  { key: 'income1to25L', value: 180000 },
  { key: 'income25to5L', value: 375000 },
  { key: 'incomeAbove5L', value: 600000 }
];
const CATEGORIES = ['SC', 'ST', 'BC', 'OC', 'EWS'];
const DISTRICTS = [
  'Srikakulam', 'Vizianagaram', 'Parvathipuram Manyam', 'Visakhapatnam',
  'Alluri Sitharama Raju', 'Anakapalli', 'Kakinada', 'East Godavari',
  'Konaseema', 'West Godavari', 'Eluru', 'NTR', 'Krishna', 'Guntur',
  'Palnadu', 'Bapatla', 'Prakasam', 'Sri Potti Sriramulu Nellore',
  'YSR Kadapa', 'Kurnool', 'Nandyal', 'Anantapur', 'Sri Sathya Sai',
  'Chittoor', 'Tirupati', 'Annamayya'
];
const SPECIAL_KEYS = ['disability', 'singleParent', 'orphan', 'firstGen'];

// Sample students for one-tap demo.
const SAMPLES = {
  lakshmi: {
    studyingNow: true, level: 'intermediate', course: 'Class 12', income: 110000,
    category: 'SC', district: 'Guntur', marks: 78
  },
  ravi: {
    studyingNow: true, level: 'UG', course: 'B.Tech', income: 220000,
    category: 'BC', district: 'Visakhapatnam', marks: 65
  },
  ayesha: {
    studyingNow: true, level: 'UG', course: 'Degree', income: 80000,
    category: 'BC', district: 'Kurnool', singleParent: true,
    minorityBelonging: true, marks: 70
  }
};

function defaultProfile() {
  return {
    studyingNow: null, level: null, course: null, income: null,
    category: null, district: null,
    disability: false, singleParent: false, orphan: false, firstGen: false,
    minorityBelonging: null, exServicemanWard: null, marks: null, freeText: ''
  };
}

const state = {
  view: 'home',        // home | ask | results | apps | reminders
  tab: 'find',
  step: 0,             // index into stepList() during ask flow
  hint: false,         // show "please answer" hint
  profile: defaultProfile(),
  applyOpen: null      // scheme id whose date picker is open
};
let docs = {};
let apps = {};

/* ---------- helpers ---------- */

// Create an element. props: attributes, or {on:{event:fn}}; kids: nodes, strings, arrays, or falsy.
function el(tag, props, ...kids) {
  const node = document.createElement(tag);
  for (const k in (props || {})) {
    const v = props[k];
    if (k === 'on') {
      for (const ev in v) node.addEventListener(ev, v[ev]);
    } else if (k === 'value' || k === 'checked' || k === 'selected' || k === 'disabled') {
      node[k] = v;
    } else {
      node.setAttribute(k, String(v));
    }
  }
  kids.flat(Infinity).forEach(function (c) {
    if (c === null || c === undefined || c === false) return;
    node.appendChild(c instanceof Node ? c : document.createTextNode(String(c)));
  });
  return node;
}

function loadJSON(key) {
  try {
    const v = JSON.parse(localStorage.getItem(key));
    return v && typeof v === 'object' ? v : {};
  } catch (e) {
    return {};
  }
}

function saveJSON(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* storage full or blocked */ }
}

function isTe() { return getLang() === 'te'; }

// Telugu month names, used only for the "Last verified" line.
const MONTHS_TE = {
  January: 'జనవరి', February: 'ఫిబ్రవరి', March: 'మార్చి', April: 'ఏప్రిల్',
  May: 'మే', June: 'జూన్', July: 'జూలై', August: 'ఆగస్టు',
  September: 'సెప్టెంబర్', October: 'అక్టోబర్', November: 'నవంబర్', December: 'డిసెంబర్'
};

// "November 2026" -> "నవంబర్ 2026" when Telugu is active; English otherwise.
function lastVerifiedText(value) {
  const parts = String(value).split(' ');
  if (isTe() && MONTHS_TE[parts[0]]) parts[0] = MONTHS_TE[parts[0]];
  return parts.join(' ');
}

// Pick a localised field: key+'Te' / key+'En' / key.
function loc(obj, key) {
  return (isTe() && obj[key + 'Te']) || obj[key + 'En'] || obj[key] || '';
}

function nameOf(s) { return loc(s, 'name'); }

function hasProfile() {
  return state.profile.studyingNow !== null || state.profile.level !== null;
}

function eligibleResults() {
  return Matcher.matchSchemes(state.profile, SCHEMES);
}

function daysBadge(days) {
  if (days === null || days === undefined) return null;
  if (days < 0) return el('span', { class: 'badge grey' }, t('deadlinePassed'));
  const cls = days <= 7 ? 'red' : (days <= 30 ? 'amber' : '');
  return el('span', { class: 'badge ' + cls }, days + ' ' + t('daysLeft'));
}

function deadlineRow(s) {
  if (!s.deadline) return null;
  return el('div', { class: 'meta' },
    el('span', null, t('deadline') + ': ' + s.deadline),
    daysBadge(Matcher.daysLeft(s.deadline)));
}

function schemeCard(s, opts) {
  opts = opts || {};
  const steps = s.steps;
  const list = Array.isArray(steps) ? steps : (steps ? [steps] : []);
  const stepsTe = Array.isArray(s.stepsTe) ? s.stepsTe : [];
  return el('section', { class: 'card scheme' },
    el('h3', null, nameOf(s)),
    opts.failed ? el('p', { class: 'failed' }, String(opts.failed)) : null,
    loc(s, 'benefit') ? el('p', null, el('strong', null, t('benefit') + ': '), loc(s, 'benefit')) : null,
    deadlineRow(s),
    opts.reasons && opts.reasons.length
      ? el('div', null, el('h4', null, t('reasons')),
          el('ul', null, opts.reasons.map(function (r) { return el('li', null, String(r)); })))
      : null,
    s.lastVerified ? el('p', { class: 'note' }, t('lastVerified') + ': ' + lastVerifiedText(s.lastVerified)) : null,
    list.length
      ? el('details', { class: 'apply' }, el('summary', null, t('howToApply')),
          el('ol', null, list.map(function (x, i) {
            return el('li', null, String(isTe() && stepsTe[i] ? stepsTe[i] : x));
          })))
      : null,
    s.officialUrl
      ? el('p', null, el('a', { class: 'btn outline', href: s.officialUrl, target: '_blank', rel: 'noopener' }, t('officialWebsite')))
      : null
  );
}

/* ---------- top-level render ---------- */

function setTab(name) {
  state.tab = name;
  if (name === 'find') {
    state.view = hasProfile() ? 'results' : 'home';
  } else {
    state.view = name === 'apps' ? 'apps' : 'reminders';
  }
  state.applyOpen = null;
  render();
}

function renderTabs() {
  const nav = document.getElementById('tabs');
  nav.hidden = state.view === 'ask';
  const map = { tabFind: 'find', tabApps: 'apps', tabReminders: 'reminders' };
  for (const id in map) {
    const btn = document.getElementById(id);
    btn.textContent = t(id === 'tabFind' ? 'tabFind' : id === 'tabApps' ? 'tabApps' : 'tabReminders');
    btn.className = 'tab' + (state.tab === map[id] ? ' active' : '');
    btn.onclick = function () { setTab(map[id]); };
  }
}

function topBar() {
  const lang = getLang();
  const toggle = function (code, label) {
    return el('button', {
      class: 'btn small', type: 'button', 'aria-pressed': String(lang === code),
      'aria-label': t('chooseLanguage'),
      on: { click: function () { setLang(code); render(); } }
    }, label);
  };
  return el('header', { class: 'topbar' },
    el('span', { class: 'brand' }, t('appTitle')),
    el('div', { class: 'lang-toggle' }, toggle('en', 'English'), toggle('te', 'తెలుగు')));
}

function render() {
  document.documentElement.lang = isTe() ? 'te' : 'en';
  const views = { home: homeView, ask: askView, results: resultsView, apps: appsView, reminders: remindersView };
  const root = document.getElementById('app');
  root.replaceChildren(topBar(), (views[state.view] || homeView)());
  renderTabs();
  document.getElementById('footer').textContent = t('footerDisclaimer');
}

/* ---------- HOME ---------- */

function loadSample(key) {
  state.profile = Object.assign(defaultProfile(), SAMPLES[key]);
  state.view = 'results';
  state.tab = 'find';
  render();
}

function startAsk() {
  state.profile = defaultProfile();
  state.step = 0;
  state.hint = false;
  state.view = 'ask';
  render();
}

function homeView() {
  const sampleBtn = function (key, labelKey) {
    return el('button', {
      class: 'card sample', type: 'button',
      on: { click: function () { loadSample(key); } }
    }, t(labelKey));
  };
  return el('main', { class: 'page' },
    el('div', { class: 'hero' },
      el('h1', null, t('appTitle')),
      el('p', { class: 'tagline' }, t('tagline'))),
    el('p', { class: 'note' }, (SCHEMES_DISCLAIMER && SCHEMES_DISCLAIMER[getLang()]) || t('homeDisclaimer')),
    el('button', { class: 'btn primary big', type: 'button', on: { click: startAsk } }, t('startAsk')),
    el('h2', null, t('samples')),
    el('div', { class: 'sample-list' },
      sampleBtn('lakshmi', 'sampleLakshmi'),
      sampleBtn('ravi', 'sampleRavi'),
      sampleBtn('ayesha', 'sampleAyesha')));
}

/* ---------- ASK FLOW ---------- */

// Ordered list of question ids for the current answers.
function stepList() {
  const p = state.profile;
  const steps = ['free', 'studying'];
  if (p.studyingNow === false) return steps;
  steps.push('course', 'income', 'category', 'district', 'special');
  if (p.level === 'UG' || p.level === 'PG') steps.push('minority', 'exserv');
  return steps;
}

function answered(id) {
  const p = state.profile;
  switch (id) {
    case 'studying': return p.studyingNow !== null;
    case 'course': return p.course !== null;
    case 'income': return p.income !== null;
    case 'category': return !!p.category;
    case 'district': return !!p.district;
    case 'minority': return p.minorityBelonging !== null;
    case 'exserv': return p.exServicemanWard !== null;
    default: return true;
  }
}

function chip(label, selected, onPick) {
  return el('button', {
    class: 'chip' + (selected ? ' selected' : ''), type: 'button',
    'aria-pressed': String(selected),
    on: { click: function () { onPick(); render(); } }
  }, label);
}

function yesNo(getter, setter) {
  return el('div', { class: 'chips' },
    chip(t('yes'), getter() === true, function () { setter(true); }),
    chip(t('no'), getter() === false, function () { setter(false); }));
}

function stepNodes(id) {
  const p = state.profile;
  switch (id) {
    case 'free':
      return [
        el('h2', { class: 'q' }, t('aboutYou')),
        el('label', { class: 'field' }, t('freeTextLabel'),
          el('textarea', {
            rows: '4', placeholder: t('freeTextPlaceholder'), value: p.freeText,
            on: { input: function (e) { p.freeText = e.target.value; } }
          }))
      ];
    case 'studying':
      return [
        el('h2', { class: 'q' }, t('q1Studying')),
        yesNo(function () { return p.studyingNow; }, function (v) { p.studyingNow = v; })
      ];
    case 'course':
      return [
        el('h2', { class: 'q' }, t('q2Course')),
        el('div', { class: 'chips' }, COURSE_OPTS.map(function (o) {
          return chip(t(o.key), p.course === o.course, function () { p.level = o.level; p.course = o.course; });
        })),
        el('label', { class: 'field' }, t('marksLabel'),
          el('input', {
            type: 'number', min: '0', max: '100', inputmode: 'numeric',
            value: p.marks === null ? '' : String(p.marks),
            on: { input: function (e) { p.marks = e.target.value === '' ? null : Number(e.target.value); } }
          }))
      ];
    case 'income':
      return [
        el('h2', { class: 'q' }, t('q3Income')),
        el('div', { class: 'chips' }, INCOME_OPTS.map(function (o) {
          return chip(t(o.key), p.income === o.value, function () { p.income = o.value; });
        }))
      ];
    case 'category':
      return [
        el('h2', { class: 'q' }, t('q4Category')),
        el('div', { class: 'chips' }, CATEGORIES.map(function (c) {
          return chip(c, p.category === c, function () { p.category = c; });
        })),
        el('p', { class: 'note' }, t('categoryNote'))
      ];
    case 'district':
      return [
        el('h2', { class: 'q' }, t('q5District')),
        el('select', {
          class: 'select',
          on: { change: function (e) { p.district = e.target.value || null; } }
        },
          el('option', { value: '', selected: !p.district }, t('selectDistrict')),
          DISTRICTS.map(function (d) {
            return el('option', { value: d, selected: p.district === d }, d);
          }))
      ];
    case 'special':
      return [
        el('h2', { class: 'q' }, t('q6Special')),
        SPECIAL_KEYS.map(function (k) {
          return el('label', { class: 'check' },
            el('input', {
              type: 'checkbox', checked: !!p[k],
              on: { change: function (e) { p[k] = e.target.checked; } }
            }),
            t(k));
        })
      ];
    case 'minority':
      return [
        el('h2', { class: 'q' }, t('q7Minority')),
        yesNo(function () { return p.minorityBelonging; }, function (v) { p.minorityBelonging = v; })
      ];
    case 'exserv':
      return [
        el('h2', { class: 'q' }, t('q8ExServiceman')),
        yesNo(function () { return p.exServicemanWard; }, function (v) { p.exServicemanWard = v; })
      ];
    default:
      return [];
  }
}

function askNext() {
  const steps = stepList();
  if (!answered(steps[state.step])) {
    state.hint = true;
    render();
    return;
  }
  state.hint = false;
  state.step++;
  if (state.step >= stepList().length) {
    state.step = 0;
    state.view = 'results';
    state.tab = 'find';
  }
  render();
}

function askBack() {
  state.hint = false;
  if (state.step === 0) {
    state.view = 'home';
  } else {
    state.step--;
  }
  render();
}

function askView() {
  const steps = stepList();
  const id = steps[state.step] || 'free';
  const isLast = state.step >= steps.length - 1;
  return el('main', { class: 'page' },
    el('p', { class: 'step-count' }, (state.step + 1) + ' / ' + steps.length),
    el('section', { class: 'card' },
      stepNodes(id),
      state.hint && !answered(id) ? el('p', { class: 'warn' }, t('pleaseAnswer')) : null),
    el('div', { class: 'row' },
      el('button', { class: 'btn ghost', type: 'button', on: { click: askBack } }, t('back')),
      el('button', { class: 'btn primary', type: 'button', on: { click: askNext } },
        isLast ? t('seeResults') : t('next'))));
}

/* ---------- RESULTS ---------- */

// English document name -> Telugu name, built from SCHEMES (display only).
function docTeLookup() {
  const map = Object.create(null);
  SCHEMES.forEach(function (s) {
    (s.documents || []).forEach(function (d, i) {
      if (s.documentsTe && s.documentsTe[i] && !(d in map)) map[d] = s.documentsTe[i];
    });
  });
  return map;
}

function checklistCard(eligible) {
  const items = Matcher.mergeChecklist(eligible) || [];
  const teDocs = isTe() ? docTeLookup() : {};
  return el('section', { class: 'card' },
    el('h2', null, t('docChecklist')),
    el('p', { class: 'note' }, t('docChecklistSub')),
    items.map(function (it) {
      const names = (it.forSchemes || []).map(function (s) {
        return typeof s === 'string' ? s : nameOf(s);
      });
      return el('label', { class: 'check' },
        el('input', {
          type: 'checkbox', checked: docs[it.document] === true,
          on: { change: function (e) { docs[it.document] = e.target.checked; saveJSON(STORE_DOCS, docs); } }
        }),
        el('span', null,
          el('span', { class: 'doc-name' }, String(teDocs[it.document] || it.document)),
          el('span', { class: 'for' }, names.join(', '))));
    }));
}

function startOver() {
  state.profile = defaultProfile();
  state.view = 'home';
  state.tab = 'find';
  state.step = 0;
  render();
}

function resultsView() {
  if (!hasProfile()) return homeView();
  const res = eligibleResults();
  const eligible = res.eligible || [];
  const near = res.nearMiss || [];
  const nodes = [el('h2', null, t('likelyEligible') + ' (' + eligible.length + ')')];
  if (!eligible.length) {
    nodes.push(el('section', { class: 'card' },
      el('p', null, t('noMatches')),
      el('p', { class: 'note' }, t('noMatchesSub'))));
  }
  eligible.forEach(function (r) {
    nodes.push(schemeCard(r.scheme, { reasons: r.reasons }));
  });
  if (near.length) {
    nodes.push(el('h2', null, t('almostEligible')));
    nodes.push(el('p', { class: 'note' }, t('almostEligibleSub')));
    near.forEach(function (r) {
      nodes.push(schemeCard(r.scheme, { failed: r.failedRule }));
    });
  }
  if (eligible.length) nodes.push(checklistCard(eligible));
  nodes.push(el('button', { class: 'btn ghost big', type: 'button', on: { click: startOver } }, t('startOver')));
  return el('main', { class: 'page' }, nodes);
}

/* ---------- APPLICATIONS TAB ---------- */

function appsView() {
  const eligible = hasProfile() ? (eligibleResults().eligible || []) : [];
  if (!eligible.length) {
    return el('main', { class: 'page' }, el('section', { class: 'card' }, el('p', null, t('appsEmpty'))));
  }
  return el('main', { class: 'page' }, eligible.map(function (r) {
    const s = r.scheme;
    const id = s.id;
    const saved = apps[id];
    let action;
    if (saved) {
      action = el('div', null,
        el('p', null, t('appliedOn') + ': ' + saved.appliedOn),
        el('button', {
          class: 'btn small', type: 'button',
          on: { click: function () { delete apps[id]; saveJSON(STORE_APPS, apps); render(); } }
        }, t('remove')));
    } else if (state.applyOpen === id) {
      const dateInput = el('input', { type: 'date', value: new Date().toISOString().slice(0, 10), id: 'applyDate-' + id });
      action = el('div', { class: 'row' }, dateInput,
        el('button', {
          class: 'btn primary', type: 'button',
          on: { click: function () {
            apps[id] = { appliedOn: dateInput.value };
            saveJSON(STORE_APPS, apps);
            state.applyOpen = null;
            render();
          } }
        }, t('saveDate')));
    } else {
      action = el('button', {
        class: 'btn primary', type: 'button',
        on: { click: function () { state.applyOpen = id; render(); } }
      }, t('markApplied'));
    }
    return el('section', { class: 'card' },
      el('h3', null, nameOf(s)),
      deadlineRow(s),
      action);
  }));
}

/* ---------- REMINDERS TAB ---------- */

function remindersView() {
  const eligible = hasProfile() ? (eligibleResults().eligible || []) : [];
  const withDeadline = eligible.map(function (r) { return r.scheme; })
    .filter(function (s) { return !!s.deadline; })
    .sort(function (a, b) { return a.deadline < b.deadline ? -1 : (a.deadline > b.deadline ? 1 : 0); });
  if (!withDeadline.length) {
    return el('main', { class: 'page' }, el('section', { class: 'card' }, el('p', null, t('appsEmpty'))));
  }
  return el('main', { class: 'page' },
    el('h2', null, t('remindersTitle')),
    el('p', { class: 'note' }, t('remindersSub')),
    withDeadline.map(function (s) {
      return el('section', { class: 'card' },
        el('h3', null, nameOf(s)),
        deadlineRow(s));
    }));
}

/* ---------- init ---------- */

function init() {
  docs = loadJSON(STORE_DOCS);
  apps = loadJSON(STORE_APPS);
  render();
}

init();
