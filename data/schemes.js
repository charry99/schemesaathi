/* SchemeSaathi — scheme rules. This is the ONLY place scheme rules live.
   All values are illustrative demo values, not official figures. */

// Illustrative demo values
const SCHEMES = [
  {
    id: "post-matric-ap",
    name: "Post Matric Scholarship (Andhra Pradesh, via Jnanabhumi portal)",
    nameTe: "పోస్ట్ మెట్రిక్ స్కాలర్‌షిప్ (ఆంధ్రప్రదేశ్, జ్ఞానభూమి పోర్టల్ ద్వారా)",
    level: ["school", "intermediate", "UG"],
    whoItIsFor: "School and college students from families with income up to ₹2.5 lakh per year",
    incomeLimit: 250000,
    categories: [],
    minMarks: null,
    courses: ["any"],
    districts: "all",
    specialGroups: [],
    minorityOnly: false,
    benefitEn: "Up to ₹20,000 per year",
    benefitTe: "సంవత్సరానికి ₹20,000 వరకు",
    deadline: "2027-01-31",
    documents: [
      "Income certificate",
      "Caste certificate",
      "Bonafide certificate from college",
      "Bank passbook first page",
      "Ration card",
      "Previous year marksheet",
      "Fee receipt from college"
    ],
    documentsTe: [
      "ఆదాయ ధృవీకరణ పత్రం",
      "కుల ధృవీకరణ పత్రం",
      "కళాశాల నుండి బోనాఫైడ్ ధృవీకరణ పత్రం",
      "బ్యాంక్ పాస్‌బుక్ మొదటి పేజీ",
      "రేషన్ కార్డు",
      "గత సంవత్సరం మార్కుల జాబితా",
      "కళాశాల నుండి ఫీజు రసీదు"
    ],
    steps: [
      "Open the Jnanabhumi portal and register with your mobile number",
      "Fill in your personal, school or college and bank details",
      "Upload income certificate, caste certificate and bonafide certificate",
      "Submit the application and note the acknowledgement number",
      "Check the status on the portal after your college verifies it"
    ],
    stepsTe: [
      "మీ మొబైల్ నంబర్‌తో జ్ఞానభూమి పోర్టల్‌ను తెరిచి నమోదు చేసుకోండి",
      "మీ వ్యక్తిగత, పాఠశాల లేదా కళాశాల మరియు బ్యాంక్ వివరాలు నింపండి",
      "ఆదాయ ధృవీకరణ పత్రం, కుల ధృవీకరణ పత్రం మరియు బోనాఫైడ్ ధృవీకరణ పత్రాన్ని అప్‌లోడ్ చేయండి",
      "దరఖాస్తును సమర్పించి అంగీకార సంఖ్యను నోట్ చేసుకోండి",
      "మీ కళాశాల ధృవీకరించిన తర్వాత పోర్టల్‌లో స్థితిని తనిఖీ చేయండి"
    ],
    officialUrl: "https://jnanabhumi.ap.gov.in",
    lastVerified: "November 2026"
  },
  {
    id: "jvd-fee",
    name: "Jagananna Vidya Deevena — full fee reimbursement (AP)",
    nameTe: "జగనన్న విద్యా దీవెన — పూర్తి ఫీజు రీయింబర్స్‌మెంట్ (AP)",
    level: ["UG", "PG"],
    whoItIsFor: "Degree and postgraduate students whose families earn up to ₹2.5 lakh per year",
    incomeLimit: 250000,
    categories: [],
    minMarks: null,
    courses: ["any"],
    districts: "all",
    specialGroups: [],
    minorityOnly: false,
    benefitEn: "Course fee reimbursed as per government norms",
    benefitTe: "ప్రభుత్వ నిబంధనల ప్రకారం కోర్సు ఫీజు తిరిగి చెల్లింపు",
    deadline: "2027-02-28",
    documents: [
      "Income certificate",
      "Caste certificate",
      "Bonafide certificate from college",
      "Bank passbook first page",
      "Ration card",
      "Fee receipt from college"
    ],
    documentsTe: [
      "ఆదాయ ధృవీకరణ పత్రం",
      "కుల ధృవీకరణ పత్రం",
      "కళాశాల నుండి బోనాఫైడ్ ధృవీకరణ పత్రం",
      "బ్యాంక్ పాస్‌బుక్ మొదటి పేజీ",
      "రేషన్ కార్డు",
      "కళాశాల నుండి ఫీజు రసీదు"
    ],
    steps: [
      "Open the Jnanabhumi portal and register",
      "Enter your college, course and fee details",
      "Upload income and caste certificates",
      "Submit and keep the application number",
      "Track the fee reimbursement status on the portal"
    ],
    stepsTe: [
      "జ్ఞానభూమి పోర్టల్‌ను తెరిచి నమోదు చేసుకోండి",
      "మీ కళాశాల, కోర్సు మరియు ఫీజు వివరాలు నమోదు చేయండి",
      "ఆదాయ మరియు కుల ధృవీకరణ పత్రాలను అప్‌లోడ్ చేయండి",
      "దరఖాస్తును సమర్పించి దరఖాస్తు సంఖ్యను భద్రపరచుకోండి",
      "పోర్టల్‌లో ఫీజు రీయింబర్స్‌మెంట్ స్థితిని ట్రాక్ చేయండి"
    ],
    officialUrl: "https://jnanabhumi.ap.gov.in",
    lastVerified: "November 2026"
  },
  {
    id: "jvasd-hostel",
    name: "Jagananna Vasathi Deevena — hostel and mess charges (AP)",
    nameTe: "జగనన్న వసతి దీవెన — హాస్టల్ & మెస్ ఛార్జీలు (AP)",
    level: ["intermediate", "UG"],
    whoItIsFor: "Intermediate and degree students who stay in hostels, from families earning up to ₹2.5 lakh per year",
    incomeLimit: 250000,
    categories: [],
    minMarks: null,
    courses: ["any"],
    districts: "all",
    specialGroups: [],
    minorityOnly: false,
    benefitEn: "Up to ₹20,000 per year for hostel and mess",
    benefitTe: "హాస్టల్ & మెస్ కోసం సంవత్సరానికి ₹20,000 వరకు",
    deadline: "2027-03-15",
    documents: [
      "Income certificate",
      "Bonafide certificate from college",
      "Bank passbook first page",
      "Ration card"
    ],
    documentsTe: [
      "ఆదాయ ధృవీకరణ పత్రం",
      "కళాశాల నుండి బోనాఫైడ్ ధృవీకరణ పత్రం",
      "బ్యాంక్ పాస్‌బుక్ మొదటి పేజీ",
      "రేషన్ కార్డు"
    ],
    steps: [
      "Open the Jnanabhumi portal and register",
      "Select hostel-stay option and enter your college details",
      "Upload income certificate and bonafide certificate",
      "Submit the application and save the acknowledgement",
      "Check the payment status on the portal"
    ],
    stepsTe: [
      "జ్ఞానభూమి పోర్టల్‌ను తెరిచి నమోదు చేసుకోండి",
      "హాస్టల్ నివాస ఎంపికను ఎంచుకుని మీ కళాశాల వివరాలు నమోదు చేయండి",
      "ఆదాయ ధృవీకరణ పత్రం మరియు బోనాఫైడ్ ధృవీకరణ పత్రాన్ని అప్‌లోడ్ చేయండి",
      "దరఖాస్తును సమర్పించి అంగీకార పత్రాన్ని భద్రపరచుకోండి",
      "పోర్టల్‌లో చెల్లింపు స్థితిని తనిఖీ చేయండి"
    ],
    officialUrl: "https://jnanabhumi.ap.gov.in",
    lastVerified: "November 2026"
  },
  {
    id: "amma-vodi",
    name: "Amma Vodi — support to mothers of school students (AP)",
    nameTe: "అమ్మ ఒడి — పాఠశాల విద్యార్థుల తల్లులకు సహాయం (AP)",
    level: ["school"],
    whoItIsFor: "Mothers or guardians of school children from families earning up to ₹2.5 lakh per year",
    incomeLimit: 250000,
    categories: [],
    minMarks: null,
    courses: ["Class 6-10", "Class 1-5", "Class 12"],
    districts: "all",
    specialGroups: [],
    minorityOnly: false,
    benefitEn: "Up to ₹15,000 per year to the mother",
    benefitTe: "తల్లికి సంవత్సరానికి ₹15,000 వరకు",
    deadline: "2027-04-30",
    documents: [
      "Income certificate",
      "Ration card",
      "Bank passbook first page",
      "Bonafide certificate from college"
    ],
    documentsTe: [
      "ఆదాయ ధృవీకరణ పత్రం",
      "రేషన్ కార్డు",
      "బ్యాంక్ పాస్‌బుక్ మొదటి పేజీ",
      "కళాశాల నుండి బోనాఫైడ్ ధృవీకరణ పత్రం"
    ],
    steps: [
      "Visit the school or the Jnanabhumi portal",
      "Confirm the child's school and class details",
      "Link the mother's bank account",
      "Submit the form with your ration card details",
      "Check the payment status with your school"
    ],
    stepsTe: [
      "పాఠశాలకు లేదా జ్ఞానభూమి పోర్టల్‌కు వెళ్లండి",
      "పిల్లల పాఠశాల మరియు తరగతి వివరాలను నిర్ధారించండి",
      "తల్లి బ్యాంక్ ఖాతాను అనుసంధానించండి",
      "మీ రేషన్ కార్డు వివరాలతో ఫారమ్‌ను సమర్పించండి",
      "మీ పాఠశాలతో చెల్లింపు స్థితిని తనిఖీ చేయండి"
    ],
    officialUrl: "https://jnanabhumi.ap.gov.in",
    lastVerified: "November 2026"
  },
  {
    id: "central-sector",
    name: "Central Sector Scholarship for College and University Students (NSP)",
    nameTe: "కేంద్ర రంగ ఉపకార వేతనం (కళాశాల & విశ్వవిద్యాలయ విద్యార్థులు, NSP)",
    level: ["UG", "PG"],
    whoItIsFor: "Top-scoring college students from families earning up to ₹8 lakh per year",
    incomeLimit: 800000,
    categories: [],
    minMarks: 80,
    courses: ["any"],
    districts: "all",
    specialGroups: [],
    minorityOnly: false,
    benefitEn: "Up to ₹12,000 per year",
    benefitTe: "సంవత్సరానికి ₹12,000 వరకు",
    deadline: "2027-01-15",
    documents: [
      "Income certificate",
      "Caste certificate",
      "Bonafide certificate from college",
      "Bank passbook first page",
      "Previous year marksheet"
    ],
    documentsTe: [
      "ఆదాయ ధృవీకరణ పత్రం",
      "కుల ధృవీకరణ పత్రం",
      "కళాశాల నుండి బోనాఫైడ్ ధృవీకరణ పత్రం",
      "బ్యాంక్ పాస్‌బుక్ మొదటి పేజీ",
      "గత సంవత్సరం మార్కుల జాబితా"
    ],
    steps: [
      "Register on the National Scholarship Portal (NSP)",
      "Fill in your marks, course and college details",
      "Upload income certificate and previous year marksheet",
      "Submit and print the application",
      "Your college verifies the application online"
    ],
    stepsTe: [
      "జాతీయ స్కాలర్‌షిప్ పోర్టల్ (NSP)లో నమోదు చేసుకోండి",
      "మీ మార్కులు, కోర్సు మరియు కళాశాల వివరాలు నింపండి",
      "ఆదాయ ధృవీకరణ పత్రం మరియు గత సంవత్సరం మార్కుల జాబితాను అప్‌లోడ్ చేయండి",
      "దరఖాస్తును సమర్పించి ప్రింట్ తీసుకోండి",
      "మీ కళాశాల దరఖాస్తును ఆన్‌లైన్‌లో ధృవీకరిస్తుంది"
    ],
    officialUrl: "https://scholarships.gov.in",
    lastVerified: "November 2026"
  },
  {
    id: "pms-sc",
    name: "Post Matric Scholarship for SC Students (NSP)",
    nameTe: "SC విద్యార్థులకు పోస్ట్ మెట్రిక్ స్కాలర్‌షిప్ (NSP)",
    level: ["intermediate", "UG", "PG"],
    whoItIsFor: "SC students in intermediate, degree or postgraduate study from families earning up to ₹2.5 lakh per year",
    incomeLimit: 250000,
    categories: ["SC"],
    minMarks: null,
    courses: ["any"],
    districts: "all",
    specialGroups: [],
    minorityOnly: false,
    benefitEn: "Up to ₹15,000 per year",
    benefitTe: "సంవత్సరానికి ₹15,000 వరకు",
    deadline: "2027-02-10",
    documents: [
      "Income certificate",
      "Caste certificate",
      "Bonafide certificate from college",
      "Bank passbook first page",
      "Previous year marksheet",
      "Fee receipt from college"
    ],
    documentsTe: [
      "ఆదాయ ధృవీకరణ పత్రం",
      "కుల ధృవీకరణ పత్రం",
      "కళాశాల నుండి బోనాఫైడ్ ధృవీకరణ పత్రం",
      "బ్యాంక్ పాస్‌బుక్ మొదటి పేజీ",
      "గత సంవత్సరం మార్కుల జాబితా",
      "కళాశాల నుండి ఫీజు రసీదు"
    ],
    steps: [
      "Register on the National Scholarship Portal (NSP)",
      "Select the post matric scholarship for SC students",
      "Enter your caste, income and course details",
      "Upload caste certificate and income certificate",
      "Submit and wait for college and state verification"
    ],
    stepsTe: [
      "జాతీయ స్కాలర్‌షిప్ పోర్టల్ (NSP)లో నమోదు చేసుకోండి",
      "SC విద్యార్థులకు పోస్ట్ మెట్రిక్ స్కాలర్‌షిప్‌ను ఎంచుకోండి",
      "మీ కులం, ఆదాయం మరియు కోర్సు వివరాలు నమోదు చేయండి",
      "కుల ధృవీకరణ పత్రం మరియు ఆదాయ ధృవీకరణ పత్రాన్ని అప్‌లోడ్ చేయండి",
      "దరఖాస్తును సమర్పించి కళాశాల మరియు రాష్ట్ర ధృవీకరణ కోసం వేచి ఉండండి"
    ],
    officialUrl: "https://scholarships.gov.in",
    lastVerified: "November 2026"
  },
  {
    id: "minority-mcm",
    name: "Merit-cum-Means Scholarship for Minority Students (NSP)",
    nameTe: "మైనారిటీ విద్యార్థులకు మెరిట్-కమ్-మీన్స్ స్కాలర్‌షిప్ (NSP)",
    level: ["UG", "PG"],
    whoItIsFor: "Minority students with at least 50% marks from families earning up to ₹2.5 lakh per year",
    incomeLimit: 250000,
    categories: [],
    minMarks: 50,
    courses: ["any"],
    districts: "all",
    specialGroups: [],
    minorityOnly: true,
    benefitEn: "Up to ₹20,000 per year",
    benefitTe: "సంవత్సరానికి ₹20,000 వరకు",
    deadline: "2027-03-05",
    documents: [
      "Income certificate",
      "Bonafide certificate from college",
      "Bank passbook first page",
      "Previous year marksheet"
    ],
    documentsTe: [
      "ఆదాయ ధృవీకరణ పత్రం",
      "కళాశాల నుండి బోనాఫైడ్ ధృవీకరణ పత్రం",
      "బ్యాంక్ పాస్‌బుక్ మొదటి పేజీ",
      "గత సంవత్సరం మార్కుల జాబితా"
    ],
    steps: [
      "Register on the National Scholarship Portal (NSP)",
      "Enter your minority community, marks and course details",
      "Upload income certificate and previous year marksheet",
      "Submit the application and save the acknowledgement",
      "Your college verifies the application online"
    ],
    stepsTe: [
      "జాతీయ స్కాలర్‌షిప్ పోర్టల్ (NSP)లో నమోదు చేసుకోండి",
      "మీ మైనారిటీ సమాజం, మార్కులు మరియు కోర్సు వివరాలు నమోదు చేయండి",
      "ఆదాయ ధృవీకరణ పత్రం మరియు గత సంవత్సరం మార్కుల జాబితాను అప్‌లోడ్ చేయండి",
      "దరఖాస్తును సమర్పించి అంగీకార పత్రాన్ని భద్రపరచుకోండి",
      "మీ కళాశాల దరఖాస్తును ఆన్‌లైన్‌లో ధృవీకరిస్తుంది"
    ],
    officialUrl: "https://scholarships.gov.in",
    lastVerified: "November 2026"
  },
  {
    id: "pm-ex-servicemen",
    name: "Prime Minister's Scholarship Scheme (for wards of ex-servicemen)",
    nameTe: "ప్రధానమంత్రి స్కాలర్‌షిప్ పథకం (మాజీ సైనికుల పిల్లల కోసం)",
    level: ["UG", "PG"],
    whoItIsFor: "Children of ex-servicemen studying degree or postgraduate courses",
    incomeLimit: 800000,
    categories: [],
    minMarks: null,
    courses: ["any"],
    districts: "all",
    specialGroups: ["ex-servicemen wards"],
    minorityOnly: false,
    benefitEn: "Up to ₹36,000 per year",
    benefitTe: "సంవత్సరానికి ₹36,000 వరకు",
    deadline: "2027-01-20",
    documents: [
      "Ex-serviceman certificate of parent",
      "Income certificate",
      "Bonafide certificate from college",
      "Bank passbook first page",
      "Fee receipt from college"
    ],
    documentsTe: [
      "తల్లిదండ్రుల మాజీ సైనిక ఉద్యోగి ధృవీకరణ పత్రం",
      "ఆదాయ ధృవీకరణ పత్రం",
      "కళాశాల నుండి బోనాఫైడ్ ధృవీకరణ పత్రం",
      "బ్యాంక్ పాస్‌బుక్ మొదటి పేజీ",
      "కళాశాల నుండి ఫీజు రసీదు"
    ],
    steps: [
      "Register on the National Scholarship Portal (NSP)",
      "Select the scheme for wards of ex-servicemen",
      "Enter your parent's service details and course details",
      "Upload the ex-serviceman certificate of parent and income certificate",
      "Submit and track the application on the portal"
    ],
    stepsTe: [
      "జాతీయ స్కాలర్‌షిప్ పోర్టల్ (NSP)లో నమోదు చేసుకోండి",
      "మాజీ సైనికుల పిల్లల కోసం పథకాన్ని ఎంచుకోండి",
      "మీ తల్లిదండ్రుల సేవా వివరాలు మరియు కోర్సు వివరాలు నమోదు చేయండి",
      "తల్లిదండ్రుల మాజీ సైనిక ధృవీకరణ పత్రం మరియు ఆదాయ ధృవీకరణ పత్రాన్ని అప్‌లోడ్ చేయండి",
      "దరఖాస్తును సమర్పించి పోర్టల్‌లో ట్రాక్ చేయండి"
    ],
    officialUrl: "https://scholarships.gov.in",
    lastVerified: "November 2026"
  }
];

const SCHEMES_DISCLAIMER = {
  en: "Demo dataset for illustration. Always confirm on the official portal before applying.",
  te: "ఇది ఉదాహరణ కోసం మాత్రమే. దరఖాస్తు చేయడానికి ముందు ఎల్లప్పుడూ అధికారిక పోర్టల్‌లో నిర్ధారించుకోండి."
};

if (typeof window !== 'undefined') window.SCHEMES = SCHEMES;
