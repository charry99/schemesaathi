'use strict';
// Node check script for the SchemeSaathi matcher. No npm dependencies.
const fs = require('fs');
const path = require('path');
const vm = require('vm');

function load(rel) {
  return fs.readFileSync(path.join(__dirname, '..', rel), 'utf8');
}

// Browser-like sandbox: no `module`, so matcher.js sets window.Matcher.
const sandbox = { window: {}, module: undefined };
vm.runInNewContext(load('data/schemes.js'), sandbox);
vm.runInNewContext(load('js/matcher.js'), sandbox);

const SCHEMES = sandbox.window.SCHEMES;
const Matcher = sandbox.window.Matcher;
const today = new Date('2026-11-15T00:00:00Z');

const profiles = [
  {
    name: 'Lakshmi',
    p: {
      studyingNow: true, level: 'intermediate', course: 'Class 12', income: 110000,
      category: 'SC', district: 'Guntur', disability: false, singleParent: false,
      orphan: false, firstGen: false, minorityBelonging: false, exServicemanWard: false,
      marks: 78
    }
  },
  {
    name: 'Ravi',
    p: {
      studyingNow: true, level: 'UG', course: 'B.Tech', income: 220000,
      category: 'BC', district: 'Visakhapatnam', marks: 65,
      disability: false, singleParent: false, orphan: false, firstGen: false,
      minorityBelonging: false, exServicemanWard: false
    }
  },
  {
    name: 'Ayesha',
    p: {
      studyingNow: true, level: 'UG', course: 'Degree', income: 80000,
      category: 'BC', district: 'Kurnool', singleParent: true, minorityBelonging: true,
      marks: 70, disability: false, orphan: false, firstGen: false, exServicemanWard: false
    }
  }
];

for (const { name, p } of profiles) {
  const res = Matcher.matchSchemes(p, SCHEMES, today);
  console.log('\n== ' + name + ' ==');
  console.log('Eligible: ' + res.eligible.length);
  console.log('Near-miss: ' + res.nearMiss.length);
  for (const r of res.eligible) {
    console.log('  + ' + r.scheme.name);
    for (const reason of r.reasons) console.log('      - ' + reason);
  }
  for (const r of res.nearMiss) {
    console.log('  ~ ' + r.scheme.name);
    console.log('      failed: ' + r.failedRule);
  }
}

process.exitCode = 0;
