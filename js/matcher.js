/* SchemeSaathi — matching logic. Pure functions, no DOM access. */

var MATCHER_MS_PER_DAY = 86400000;

// Under Node (tests) take the translation helpers from i18n.js; in the browser they are
// globals, and i18n.js loads after this file, so they are only looked up at call time.
var MATCHER_I18N = (typeof module !== 'undefined' && typeof require === 'function') ? require('./i18n.js') : null;
// English-only fallback, used when neither i18n.js (Node) nor the browser globals are available.
var MATCHER_EN = {
  lakh: 'lakh', notGiven: 'not given',
  rStudying: 'You are currently studying',
  rNotStudying: 'You are not currently studying, which this scheme requires',
  rLevelOk: 'Your level ({level}) is covered',
  rLevelNo: 'Your level ({level}) is not covered; this scheme is for {levels} students',
  rLevelUnknown: 'Your education level is not known; this scheme is for {levels} students',
  rCourseOk: 'You are studying {course}, which this scheme covers',
  rAnyCourse: 'This scheme is open to any course',
  rCourseNo: 'Your course ({course}) is not covered; this scheme is for {courses}',
  rCourseUnknown: 'Your course is not known; this scheme is for {courses}',
  rIncomeMissing: 'Family income is not provided',
  rIncomeBelow: "Family income {income} is below this scheme's {limit} limit",
  rIncomeAt: "Family income {income} is at this scheme's {limit} limit",
  rIncomeAbove: "Family income {income} is above this scheme's {limit} limit",
  rAllCategories: 'Open to all categories',
  rCategoryOk: 'Your category ({category}) is covered',
  rCategoryNo: 'Your category ({category}) is not covered; this scheme is for {categories} students',
  rAllDistricts: 'Open to all districts',
  rDistrictOk: 'Your district ({district}) is covered',
  rDistrictNo: 'Your district ({district}) is not covered by this scheme',
  rGroupOk: 'You belong to a group this scheme covers ({groups})',
  rGroupNo: 'This scheme is for students in these groups: {groups}',
  rMinorityOk: 'You are a minority student, as this scheme requires',
  rMinorityNo: 'This scheme is only for minority students',
  rMarksOk: 'Your marks {marks}% meet the {minMarks}% minimum',
  rMarksNo: "Your marks {marks}% are below this scheme's {minMarks}% minimum"
};
function fillParams(s, params) {
  if (!params) return s;
  return s.replace(/\{(\w+)\}/g, function (m, k) {
    return Object.prototype.hasOwnProperty.call(params, k) ? String(params[k]) : m;
  });
}
function tx(key, params) {
  if (MATCHER_I18N) return MATCHER_I18N.tr(key, params);
  if (typeof tr === 'function') return tr(key, params);
  return fillParams(Object.prototype.hasOwnProperty.call(MATCHER_EN, key) ? MATCHER_EN[key] : key, params);
}
function tvx(value) {
  if (MATCHER_I18N) return MATCHER_I18N.tv(value);
  if (typeof tv === 'function') return tv(value);
  return value;
}
function listText(values) { return (values || []).map(tvx).join(', '); }


// Indian digit grouping for whole numbers: 80000 -> "80,000"
function groupIndian(x) {
  var s = String(x);
  if (s.length <= 3) return s;
  var head = s.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ',');
  return head + ',' + s.slice(-3);
}

// >= 1 lakh: "₹1.2 lakh"; otherwise "₹80,000"
function formatRupees(n) {
  var v = Number(n) || 0;
  var sign = v < 0 ? '-' : '';
  var abs = Math.abs(v);
  if (abs >= 100000) {
    var lakh = parseFloat((abs / 100000).toFixed(2));
    return sign + '₹' + lakh + ' lakh';
  }
  return sign + '₹' + groupIndian(Math.round(abs));
}

// formatRupees() with the lakh unit in the active language ("₹1.2 lakh" / "₹1.2 లక్ష").
function moneyText(n) {
  return formatRupees(n).replace(' lakh', ' ' + tvx('lakh'));
}

// Whole days from today to the ISO deadline (negative if passed).
// Uses UTC-midnight dates. Avoids instanceof Date so Dates from other realms work.
function daysLeft(deadlineIso, today) {
  var t = today && typeof today.getUTCFullYear === 'function' ? today : new Date();
  var todayUtc = Date.UTC(t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate());
  var parts = String(deadlineIso).split('-').map(Number);
  var deadlineUtc = Date.UTC(parts[0], parts[1] - 1, parts[2]);
  return Math.round((deadlineUtc - todayUtc) / MATCHER_MS_PER_DAY);
}

// Evaluates every rule for one scheme. Returns passed reasons and failed rules.
// Sentences are built with tx()/tvx() at call time, so they use the active language.
function evaluateScheme(profile, s) {
  var passes = [];
  var fails = [];
  var levels = s.level || [];
  var courses = s.courses || [];
  var cats = s.categories || [];
  var groups = s.specialGroups || [];
  var anyCourse = courses.indexOf('any') !== -1;

  // (1) studying now
  if (profile.studyingNow === true) {
    passes.push(tx('rStudying'));
  } else {
    fails.push(tx('rNotStudying'));
  }

  // (2) education level
  if (profile.level && levels.indexOf(profile.level) !== -1) {
    passes.push(tx('rLevelOk', { level: tvx(profile.level) }));
  } else if (profile.level) {
    fails.push(tx('rLevelNo', { level: tvx(profile.level), levels: listText(levels) }));
  } else {
    fails.push(tx('rLevelUnknown', { levels: listText(levels) }));
  }

  // (3) course
  var courseMatch = !!profile.course && courses.indexOf(profile.course) !== -1;
  if (courseMatch) {
    passes.push(tx('rCourseOk', { course: tvx(profile.course) }));
  } else if (anyCourse) {
    passes.push(tx('rAnyCourse'));
  } else if (profile.course) {
    fails.push(tx('rCourseNo', { course: tvx(profile.course), courses: listText(courses) }));
  } else {
    fails.push(tx('rCourseUnknown', { courses: listText(courses) }));
  }

  // (4) income
  if (profile.income == null || isNaN(Number(profile.income))) {
    fails.push(tx('rIncomeMissing'));
  } else {
    var inc = Number(profile.income);
    if (inc <= s.incomeLimit) {
      var incKey = inc < s.incomeLimit ? 'rIncomeBelow' : 'rIncomeAt';
      passes.push(tx(incKey, { income: moneyText(inc), limit: moneyText(s.incomeLimit) }));
    } else {
      fails.push(tx('rIncomeAbove', { income: moneyText(inc), limit: moneyText(s.incomeLimit) }));
    }
  }

  // (5) category
  if (cats.length === 0) {
    passes.push(tx('rAllCategories'));
  } else if (profile.category && cats.indexOf(profile.category) !== -1) {
    passes.push(tx('rCategoryOk', { category: tvx(profile.category) }));
  } else {
    fails.push(tx('rCategoryNo', {
      category: profile.category ? tvx(profile.category) : tx('notGiven'),
      categories: listText(cats)
    }));
  }

  // (6) district
  if (s.districts === 'all') {
    passes.push(tx('rAllDistricts'));
  } else if (profile.district && s.districts.indexOf(profile.district) !== -1) {
    passes.push(tx('rDistrictOk', { district: tvx(profile.district) }));
  } else {
    fails.push(tx('rDistrictNo', { district: profile.district ? tvx(profile.district) : tx('notGiven') }));
  }

  // (7) special groups: any one matching flag is enough
  if (groups.length > 0) {
    var flags = [
      ['disability', profile.disability],
      ['single parent', profile.singleParent],
      ['orphan', profile.orphan],
      ['first-generation', profile.firstGen],
      ['ex-servicemen wards', profile.exServicemanWard]
    ];
    var held = flags
      .filter(function (f) { return f[1] === true && groups.indexOf(f[0]) !== -1; })
      .map(function (f) { return f[0]; });
    if (held.length > 0) {
      passes.push(tx('rGroupOk', { groups: listText(held) }));
    } else {
      fails.push(tx('rGroupNo', { groups: listText(groups) }));
    }
  }

  // (8) minority only
  if (s.minorityOnly === true) {
    if (profile.minorityBelonging === true) {
      passes.push(tx('rMinorityOk'));
    } else {
      fails.push(tx('rMinorityNo'));
    }
  }

  // (9) minimum marks: skipped when marks are unknown
  if (s.minMarks != null && profile.marks != null) {
    if (Number(profile.marks) >= s.minMarks) {
      passes.push(tx('rMarksOk', { marks: profile.marks, minMarks: s.minMarks }));
    } else {
      fails.push(tx('rMarksNo', { marks: profile.marks, minMarks: s.minMarks }));
    }
  }

  return { passes: passes, fails: fails };
}


function byDeadline(a, b) {
  var da = a.scheme.deadline;
  var db = b.scheme.deadline;
  return da < db ? -1 : da > db ? 1 : 0;
}

// Returns { eligible, nearMiss }. A scheme with more than one failed rule is dropped.
// `today` is accepted for callers; sorting uses each scheme's ISO deadline.
function matchSchemes(profile, schemes, today) {
  var eligible = [];
  var nearMiss = [];
  (schemes || []).forEach(function (s) {
    var ev = evaluateScheme(profile || {}, s);
    if (ev.fails.length === 0) {
      eligible.push({ scheme: s, reasons: ev.passes, failedRule: null });
    } else if (ev.fails.length === 1) {
      nearMiss.push({ scheme: s, reasons: ev.passes, failedRule: ev.fails[0] });
    }
  });
  eligible.sort(byDeadline);
  nearMiss.sort(byDeadline);
  return { eligible: eligible, nearMiss: nearMiss };
}

// Documents needed across the eligible schemes: [{ document, forSchemes: [name...] }], sorted by document.
function mergeChecklist(results) {
  var list = Array.isArray(results) ? results : ((results && results.eligible) || []);
  var map = {};
  list.forEach(function (r) {
    (r.scheme.documents || []).forEach(function (doc) {
      if (!map[doc]) map[doc] = [];
      if (map[doc].indexOf(r.scheme.name) === -1) map[doc].push(r.scheme.name);
    });
  });
  return Object.keys(map).sort().map(function (doc) {
    return { document: doc, forSchemes: map[doc] };
  });
}

const Matcher = { matchSchemes, mergeChecklist, daysLeft, formatRupees }; if (typeof module !== 'undefined') module.exports = Matcher; else window.Matcher = Matcher;
