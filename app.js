const APP_STORAGE_KEY = "capple-farm-state-v5";
const PREVIOUS_STATE_KEY = "capple-farm-state-v4";
const LEGACY_RECORD_KEY = "capple-farm-records-v1";
const LAST_BACKUP_AT_KEY = "capple-farm-last-backup-at";

/*
const sampleMasters = {
  orchards: [
    { id: "orchard-north", name: "北園地", managementCode: "O-01", latitude: 40.760812, longitude: 140.467915, note: "主力�Eふじ中忁E },
    { id: "orchard-east", name: "東園地", managementCode: "O-02", latitude: 40.762734, longitude: 140.475901, note: "つがる中忁E�E園地" },
    { id: "orchard-south", name: "南園地", managementCode: "O-03", latitude: 40.754329, longitude: 140.469842, note: "傾斜があり作業量が多い" }
  ],
  plots: [
    { id: "plot-north-a1", orchardId: "orchard-north", name: "A-1", managementCode: "K-01", note: "防風ネット沿ぁE },
    { id: "plot-north-a2", orchardId: "orchard-north", name: "A-2", managementCode: "K-02", note: "更新樹あり" },
    { id: "plot-east-b1", orchardId: "orchard-east", name: "B-1", managementCode: "K-03", note: "若木中忁E },
    { id: "plot-south-c1", orchardId: "orchard-south", name: "C-1", managementCode: "K-04", note: "傾斜強めE }
  ],
  varieties: [
    { id: "variety-fuji", name: "ふぁE, note: "晩生�E主力品種" },
    { id: "variety-tsugaru", name: "つがる", note: "早生で着色が早ぁE },
    { id: "variety-ourin", name: "王林", note: "香りの良ぁE��E��品種" }
  ],
  groups: [
    { id: "group-1", name: "第1班", sortOrder: 1, description: "摘果と葉摘み中忁E, isActive: true },
    { id: "group-2", name: "第2班", sortOrder: 2, description: "受粉と見回り中忁E, isActive: true },
    { id: "group-support", name: "応援班", sortOrder: 3, description: "繁忙期の応援作業", isActive: false }
  ],
  workers: [
    { id: "worker-family-taro", fullName: "田中 太郁E, displayName: "太郁E, primaryGroupId: "group-1", category: "家旁E, hourlyRate: 0, isActive: true },
    { id: "worker-employee-yui", fullName: "佐藤 結衣", displayName: "結衣", primaryGroupId: "group-2", category: "社員", hourlyRate: 1500, isActive: true },
    { id: "worker-part-ken", fullName: "高橁E健", displayName: "健", primaryGroupId: "group-1", category: "パ�EチE, hourlyRate: 1200, isActive: true },
    { id: "worker-other-guest", fullName: "応援スタチE��", displayName: "応援", primaryGroupId: "group-support", category: "そ�E仁E, hourlyRate: 1300, isActive: false }
  ],
  workerGroupMemberships: [
    { id: "membership-taro-1", workerId: "worker-family-taro", groupId: "group-1", isPrimary: true },
    { id: "membership-taro-2", workerId: "worker-family-taro", groupId: "group-2", isPrimary: false },
    { id: "membership-yui-1", workerId: "worker-employee-yui", groupId: "group-2", isPrimary: true },
    { id: "membership-ken-1", workerId: "worker-part-ken", groupId: "group-1", isPrimary: true },
    { id: "membership-ken-2", workerId: "worker-part-ken", groupId: "group-support", isPrimary: false },
    { id: "membership-guest-1", workerId: "worker-other-guest", groupId: "group-support", isPrimary: true }
  ],
  fixedTeamSets: [
    {
      id: "team-set-pruning-a",
      name: "剪定班A",
      groupId: "group-1",
      workerIds: ["worker-family-taro", "worker-part-ken"]
    },
    {
      id: "team-set-fruit-thin-b",
      name: "摘果班B",
      groupId: "group-2",
      workerIds: ["worker-employee-yui", "worker-family-taro"]
    }
  ]
};

const sampleRecords = [
  {
    id: "record-1",
    workDate: "2026-04-05",
    orchardId: "orchard-north",
    plotId: "plot-north-a1",
    varietyId: "variety-fuji",
    taskType: "摘果",
    workTypes: ["摘果"],
    workHours: 2.5,
    dailyGroupId: "group-1",
    dailyGroupName: "第1班",
    fixedTeamSetId: "team-set-pruning-a",
    fixedTeamSetName: "剪定班A",
    workerCount: 2,
    workerId: "worker-family-taro",
    assignedWorkers: [{ workerId: "worker-family-taro" }, { workerId: "worker-part-ken" }],
    workerIds: ["worker-family-taro", "worker-part-ken"],
    workerName: "田中 太郁E,
    workerNames: ["太郁E, "健"],
    workerDisplayName: "太郁E,
    workerCategory: "家旁E,
    workerHourlyRate: 0,
    startTime: "07:30",
    endTime: "10:00",
    temperatureC: 18,
    weather: "晴めE,
    materials: "摘果用はさみ 2本",
    notes: "混み合ってぁE��枝を優先して整琁E��E,
    updatedAt: "2026-04-05T09:00:00.000Z"
  },
  {
    id: "record-2",
    workDate: "2026-04-06",
    orchardId: "orchard-east",
    plotId: "plot-east-b1",
    varietyId: "variety-tsugaru",
    taskType: "受粁E,
    workTypes: ["受粁E],
    workHours: 1.5,
    dailyGroupId: "group-2",
    dailyGroupName: "第2班",
    fixedTeamSetId: "team-set-fruit-thin-b",
    fixedTeamSetName: "摘果班B",
    workerCount: 1,
    workerId: "worker-employee-yui",
    assignedWorkers: [{ workerId: "worker-employee-yui" }],
    workerIds: ["worker-employee-yui"],
    workerName: "佐藤 結衣",
    workerNames: ["結衣"],
    workerDisplayName: "結衣",
    workerCategory: "社員",
    workerHourlyRate: 1500,
    startTime: "08:00",
    endTime: "09:30",
    temperatureC: 21.5,
    weather: "くもめE,
    materials: "",
    notes: "開花が進んでぁE��列を先に対応、E,
    updatedAt: "2026-04-06T05:30:00.000Z"
  },
  {
    id: "record-3",
    workDate: "2026-04-07",
    orchardId: "orchard-south",
    plotId: "plot-south-c1",
    varietyId: "variety-ourin",
    taskType: "葉摘み",
    workTypes: ["葉摘み"],
    workHours: 3,
    dailyGroupId: "group-1",
    dailyGroupName: "第1班",
    fixedTeamSetId: "team-set-pruning-a",
    fixedTeamSetName: "剪定班A",
    workerCount: 2,
    workerId: "worker-part-ken",
    assignedWorkers: [{ workerId: "worker-part-ken" }, { workerId: "worker-family-taro" }],
    workerIds: ["worker-part-ken", "worker-family-taro"],
    workerName: "高橁E健",
    workerNames: ["健", "太郁E],
    workerDisplayName: "健",
    workerCategory: "パ�EチE,
    workerHourlyRate: 1200,
    startTime: "05:30",
    endTime: "08:30",
    temperatureC: 24.5,
    weather: "晴めE,
    materials: "作業手袁E3絁E,
    notes: "南面の着色を見ながら実施、E,
    updatedAt: "2026-04-07T02:15:00.000Z"
  }
];

const sampleTeamPlans = [
  {
    id: "team-plan-1",
    workDate: "2026-04-07",
    groupId: "group-1",
    fixedTeamSetId: "team-set-pruning-a",
    fixedTeamSetName: "剪定班A",
    workerIds: ["worker-family-taro", "worker-part-ken"],
    updatedAt: "2026-04-07T00:30:00.000Z"
  },
  {
    id: "team-plan-2",
    workDate: "2026-04-07",
    groupId: "group-2",
    fixedTeamSetId: "team-set-fruit-thin-b",
    fixedTeamSetName: "摘果班B",
    workerIds: ["worker-employee-yui", "worker-family-taro"],
    updatedAt: "2026-04-07T00:45:00.000Z"
  }
];

*/

const sampleMasters = {
  orchards: [
    { id: "orchard-north", name: "\u5317\u5712\u5730", managementCode: "O-01", latitude: 40.760812, longitude: 140.467915, note: "\u4e3b\u756a\u5730\u306e\u3075\u3058\u4e2d\u5fc3" },
    { id: "orchard-east", name: "\u6771\u5712\u5730", managementCode: "O-02", latitude: 40.762734, longitude: 140.475901, note: "\u3064\u304c\u308b\u4e2d\u5fc3\u306e\u5712\u5730" },
    { id: "orchard-south", name: "\u5357\u5712\u5730", managementCode: "O-03", latitude: 40.754329, longitude: 140.469842, note: "\u50be\u659c\u5730\u3067\u4f5c\u696d\u91cf\u304c\u591a\u3044" }
  ],
  plots: [
    { id: "plot-north-a1", orchardId: "orchard-north", name: "A-1", managementCode: "K-01", note: "\u526a\u5b9a\u30a8\u30ea\u30a2" },
    { id: "plot-north-a2", orchardId: "orchard-north", name: "A-2", managementCode: "K-02", note: "\u66f4\u65b0\u6a39\u3042\u308a" },
    { id: "plot-east-b1", orchardId: "orchard-east", name: "B-1", managementCode: "K-03", note: "\u5e73\u5766\u5730\u533a\u753b" },
    { id: "plot-south-c1", orchardId: "orchard-south", name: "C-1", managementCode: "K-04", note: "\u5357\u5074\u659c\u9762" }
  ],
  varieties: [
    { id: "variety-fuji", name: "\u3075\u3058", note: "\u665a\u751f\u4e3b\u529b\u54c1\u7a2e" },
    { id: "variety-tsugaru", name: "\u3064\u304c\u308b", note: "\u65e9\u751f\u3067\u7740\u8272\u304c\u65e9\u3044" },
    { id: "variety-ourin", name: "\u738b\u6797", note: "\u9999\u308a\u304c\u5f37\u3044\u9ec4\u7dd1\u54c1\u7a2e" }
  ],
  groups: [
    { id: "group-1", name: "\u7b2c1\u73ed", sortOrder: 1, description: "\u526a\u5b9a\u3068\u6574\u67dd\u304c\u4e2d\u5fc3", isActive: true },
    { id: "group-2", name: "\u7b2c2\u73ed", sortOrder: 2, description: "\u6458\u679c\u3068\u898b\u56de\u308a\u304c\u4e2d\u5fc3", isActive: true },
    { id: "group-support", name: "\u5fdc\u63f4\u73ed", sortOrder: 3, description: "\u7e41\u5fd9\u671f\u306e\u5fdc\u63f4\u4f5c\u696d", isActive: false }
  ],
  workers: [
    { id: "worker-family-taro", fullName: "\u7530\u4e2d \u592a\u90ce", displayName: "\u592a\u90ce", primaryGroupId: "group-1", category: "\u5bb6\u65cf", hourlyRate: 0, isActive: true },
    { id: "worker-employee-yui", fullName: "\u9ad8\u6a4b \u7d50\u8863", displayName: "\u7d50\u8863", primaryGroupId: "group-2", category: "\u793e\u54e1", hourlyRate: 1500, isActive: true },
    { id: "worker-part-ken", fullName: "\u4f50\u85e4 \u5065", displayName: "\u5065", primaryGroupId: "group-1", category: "\u30d1\u30fc\u30c8", hourlyRate: 1200, isActive: true },
    { id: "worker-other-guest", fullName: "\u5fdc\u63f4\u30b9\u30bf\u30c3\u30d5", displayName: "\u5fdc\u63f4", primaryGroupId: "group-support", category: "\u305d\u306e\u4ed6", hourlyRate: 1300, isActive: false }
  ],
  workerGroupMemberships: [
    { id: "membership-taro-1", workerId: "worker-family-taro", groupId: "group-1", isPrimary: true },
    { id: "membership-taro-2", workerId: "worker-family-taro", groupId: "group-2", isPrimary: false },
    { id: "membership-yui-1", workerId: "worker-employee-yui", groupId: "group-2", isPrimary: true },
    { id: "membership-ken-1", workerId: "worker-part-ken", groupId: "group-1", isPrimary: true },
    { id: "membership-ken-2", workerId: "worker-part-ken", groupId: "group-support", isPrimary: false },
    { id: "membership-guest-1", workerId: "worker-other-guest", groupId: "group-support", isPrimary: true }
  ],
  fixedTeamSets: [
    {
      id: "team-set-pruning-a",
      name: "\u526a\u5b9a\u73edA",
      groupId: "group-1",
      workerIds: ["worker-family-taro", "worker-part-ken"]
    },
    {
      id: "team-set-fruit-thin-b",
      name: "\u6458\u679c\u73edB",
      groupId: "group-2",
      workerIds: ["worker-employee-yui", "worker-family-taro"]
    }
  ]
};

const sampleRecords = [
  {
    id: "record-1",
    workDate: "2026-04-05",
    orchardId: "orchard-north",
    plotId: "plot-north-a1",
    varietyId: "variety-fuji",
    taskType: "\u6458\u679c",
    workTypes: ["\u6458\u679c"],
    workHours: 7.5,
    manualWorkHours: null,
    calculatedWorkHours: 7.5,
    breakMinutes: 120,
    nonCountedMinutes: 120,
    shiftType: "full-day",
    workShiftType: "full-day",
    dailyGroupId: "group-1",
    dailyGroupName: "\u7b2c1\u73ed",
    fixedTeamSetId: "team-set-pruning-a",
    fixedTeamSetName: "\u526a\u5b9a\u73edA",
    workerCount: 2,
    workerId: "worker-part-ken",
    assignedWorkers: [{ workerId: "worker-family-taro" }, { workerId: "worker-part-ken" }],
    workerIds: ["worker-family-taro", "worker-part-ken"],
    workerName: "\u4f50\u85e4 \u5065",
    workerNames: ["\u592a\u90ce", "\u5065"],
    workerDisplayName: "\u5065",
    workerCategory: "\u30d1\u30fc\u30c8",
    workerHourlyRate: 1200,
    startTime: "07:30",
    endTime: "17:00",
    timeStart: "07:30",
    timeEnd: "17:00",
    temperatureC: 18,
    weather: "\u6674\u308c",
    materials: "\u6458\u679c\u30cf\u30b5\u30df 2\u672c",
    notes: "\u5357\u5074\u306f\u82b1\u82bd\u304c\u591a\u3044\u305f\u3081\u8abf\u6574\u4f5c\u696d\u5b9f\u65bd",
    updatedAt: "2026-04-05T09:00:00.000Z"
  },
  {
    id: "record-2",
    workDate: "2026-04-06",
    orchardId: "orchard-east",
    plotId: "plot-east-b1",
    varietyId: "variety-tsugaru",
    taskType: "\u6458\u82b1",
    workTypes: ["\u6458\u82b1"],
    workHours: 3.75,
    manualWorkHours: null,
    calculatedWorkHours: 3.75,
    breakMinutes: 15,
    nonCountedMinutes: 15,
    shiftType: "morning",
    workShiftType: "morning",
    dailyGroupId: "group-2",
    dailyGroupName: "\u7b2c2\u73ed",
    fixedTeamSetId: "team-set-fruit-thin-b",
    fixedTeamSetName: "\u6458\u679c\u73edB",
    workerCount: 1,
    workerId: "worker-employee-yui",
    assignedWorkers: [{ workerId: "worker-employee-yui" }],
    workerIds: ["worker-employee-yui"],
    workerName: "\u9ad8\u6a4b \u7d50\u8863",
    workerNames: ["\u7d50\u8863"],
    workerDisplayName: "\u7d50\u8863",
    workerCategory: "\u793e\u54e1",
    workerHourlyRate: 1500,
    startTime: "07:30",
    endTime: "11:30",
    timeStart: "07:30",
    timeEnd: "11:30",
    temperatureC: 21.5,
    weather: "\u304f\u3082\u308a",
    materials: "",
    notes: "\u96e8\u524d\u3067\u5c11\u3057\u6e7f\u3063\u3066\u3044\u305f",
    updatedAt: "2026-04-06T05:30:00.000Z"
  },
  {
    id: "record-3",
    workDate: "2026-04-07",
    orchardId: "orchard-south",
    plotId: "plot-south-c1",
    varietyId: "variety-ourin",
    taskType: "\u958b\u8459",
    workTypes: ["\u958b\u8459"],
    workHours: 3.75,
    manualWorkHours: null,
    calculatedWorkHours: 3.75,
    breakMinutes: 15,
    nonCountedMinutes: 15,
    shiftType: "afternoon",
    workShiftType: "afternoon",
    dailyGroupId: "group-1",
    dailyGroupName: "\u7b2c1\u73ed",
    fixedTeamSetId: "team-set-pruning-a",
    fixedTeamSetName: "\u526a\u5b9a\u73edA",
    workerCount: 2,
    workerId: "worker-part-ken",
    assignedWorkers: [{ workerId: "worker-part-ken" }, { workerId: "worker-family-taro" }],
    workerIds: ["worker-part-ken", "worker-family-taro"],
    workerName: "\u4f50\u85e4 \u5065",
    workerNames: ["\u5065", "\u592a\u90ce"],
    workerDisplayName: "\u5065",
    workerCategory: "\u30d1\u30fc\u30c8",
    workerHourlyRate: 1200,
    startTime: "13:00",
    endTime: "17:00",
    timeStart: "13:00",
    timeEnd: "17:00",
    temperatureC: 24.5,
    weather: "\u6674\u308c",
    materials: "\u958b\u8459\u30c8\u30ec\u30a4 3\u7bb1",
    notes: "\u82b1\u7c89\u4f5c\u696d\u306e\u6e96\u5099\u3092\u5b9f\u65bd",
    updatedAt: "2026-04-07T02:15:00.000Z"
  }
];

const sampleTeamPlans = [
  {
    id: "team-plan-1",
    workDate: "2026-04-07",
    groupId: "group-1",
    fixedTeamSetId: "team-set-pruning-a",
    fixedTeamSetName: "\u526a\u5b9a\u73edA",
    workerIds: ["worker-family-taro", "worker-part-ken"],
    updatedAt: "2026-04-07T00:30:00.000Z"
  },
  {
    id: "team-plan-2",
    workDate: "2026-04-07",
    groupId: "group-2",
    fixedTeamSetId: "team-set-fruit-thin-b",
    fixedTeamSetName: "\u6458\u679c\u73edB",
    workerIds: ["worker-employee-yui", "worker-family-taro"],
    updatedAt: "2026-04-07T00:45:00.000Z"
  }
];

const defaultCompanySettings = {
  fiscalClosingMonth: 3,
  fiscalClosingDay: 31,
  degreeDayBaseTemperatureC: 10,
  workdayStartTime: "07:30",
  workdayEndTime: "17:00",
  workdayBreakMinutes: 120,
  payrollTimeUnitMinutes: 30
};
const MORNING_WORK_END_TIME = "11:30";
const AFTERNOON_WORK_START_TIME = "13:00";
const HALF_DAY_BREAK_MINUTES = 15;
const WORK_SHIFT_TYPE = Object.freeze({
  FULL_DAY: "full-day",
  MORNING: "morning",
  AFTERNOON: "afternoon",
  CUSTOM: "custom",
  MANUAL: "manual"
});
/*
const FIXED_WEATHER_SOURCE = {
  locationName: "弘前币E,
  latitude: 40.6031,
  longitude: 140.4639
};
const WEATHER_FETCH_BUTTON_TEXT = `${FIXED_WEATHER_SOURCE.locationName}の天気を取得`;
const WEATHER_FETCH_HINT_TEXT = `、E{WEATHER_FETCH_BUTTON_TEXT}」を押すと、現在気温を�E動�E力できます。`;
const WORK_TYPE_SEPARATOR = " / ";
const WORK_TYPE_CATEGORIES = [
  {
    key: "pruning",
    label: "剪定�E枝�E琁E,
    items: ["剪宁E, "剪定枝雁E��", "剪定枝焼却", "剪定枝破码E, "支柱雁E��"]
  },
  {
    key: "soil",
    label: "土づくり・肥培管琁E,
    items: ["施肥", "たい肥散币E, "土壌改良", "潁E��"]
  },
  {
    key: "grass",
    label: "草�E地面管琁E,
    items: ["草�EめE, "芝集めE, "蒔き雁E��"]
  },
  {
    key: "tree",
    label: "樹体管琁E,
    items: ["摘花", "摘花�E�花粉！E, "開葯", "摘果", "葉取めE, "チE��回し", "シルバ�E作業", "袋掛ぁE]
  },
  {
    key: "protection",
    label: "防除・痁E��虫対筁E,
    items: ["防除", "見回めE, "痁E��虫確誁E, "捕殺", "トラチE�E確誁E]
  },
  {
    key: "fruit",
    label: "果実�E園地管琁E,
    items: ["落ち実拾ぁE, "収穫準備", "収穫", "運搬", "選果補助"]
  },
  {
    key: "facility",
    label: "設備�E賁E��・そ�E仁E,
    items: ["賁E��運搬", "機械整傁E, "牁E��け", "渁E��", "そ�E仁E]
  }
];
const WORK_TYPE_RECENT_SECTION_LABEL = "最近使った作業";
const WORK_TYPE_UNKNOWN_SECTION_LABEL = "既存頁E���E�互換�E�E;
const WORK_TYPE_RECENT_LIMIT = 8;
const WORK_TYPE_SEARCH_ALIASES = {
  "開葯": ["かいめE��"]
};

*/
const FIXED_WEATHER_SOURCE = {
  locationName: "\u5f18\u524d\u5e02",
  latitude: 40.6031,
  longitude: 140.4639
};
const WEATHER_FETCH_BUTTON_TEXT = `${FIXED_WEATHER_SOURCE.locationName}\u306e\u5929\u6c17\u3092\u53d6\u5f97`;
const WEATHER_FETCH_HINT_TEXT = `\u300c${WEATHER_FETCH_BUTTON_TEXT}\u300d\u3092\u62bc\u3059\u3068\u3001\u73fe\u5728\u6c17\u6e29\u3092\u81ea\u52d5\u5165\u529b\u3067\u304d\u307e\u3059\u3002`;
const WORK_TYPE_SEPARATOR = " / ";
const WORK_TYPE_CATEGORIES = [
  {
    key: "pruning",
    label: "\u526a\u5b9a\u30fb\u679d\u51e6\u7406",
    items: ["\u526a\u5b9a", "\u526a\u5b9a\u679d\u96c6\u3081", "\u526a\u5b9a\u679d\u713c\u5374", "\u526a\u5b9a\u679d\u7834\u7815", "\u652f\u67f1\u96c6\u3081"]
  },
  {
    key: "soil",
    label: "\u571f\u3065\u304f\u308a\u30fb\u80a5\u57f9\u7ba1\u7406",
    items: ["\u65bd\u80a5", "\u305f\u3044\u80a5\u6563\u5e03", "\u571f\u58cc\u6539\u826f", "\u6f45\u6c34"]
  },
  {
    key: "grass",
    label: "\u8349\u30fb\u5730\u9762\u7ba1\u7406",
    items: ["\u8349\u5208\u308a", "\u829d\u96c6\u3081", "\u8494\u304d\u96c6\u3081"]
  },
  {
    key: "tree",
    label: "\u6a39\u4f53\u7ba1\u7406",
    items: [
      "\u6458\u82b1",
      "\u6458\u82b1\uff08\u82b1\u7c89\uff09",
      "\u958b\u8459",
      "\u6458\u679c",
      "\u8449\u53d6\u308a",
      "\u30c4\u30eb\u56de\u3057",
      "\u30b7\u30eb\u30d0\u30fc\u4f5c\u696d",
      "\u888b\u639b\u3051"
    ]
  },
  {
    key: "protection",
    label: "\u9632\u9664\u30fb\u75c5\u5bb3\u866b\u5bfe\u7b56",
    items: ["\u9632\u9664", "\u898b\u56de\u308a", "\u75c5\u5bb3\u866b\u78ba\u8a8d", "\u6355\u6bba", "\u30c8\u30e9\u30c3\u30d7\u78ba\u8a8d"]
  },
  {
    key: "fruit",
    label: "\u679c\u5b9f\u30fb\u5712\u5730\u7ba1\u7406",
    items: ["\u843d\u3061\u5b9f\u62fe\u3044", "\u53ce\u7a6b\u6e96\u5099", "\u53ce\u7a6b", "\u904b\u642c", "\u9078\u679c\u88dc\u52a9"]
  },
  {
    key: "facility",
    label: "\u8a2d\u5099\u30fb\u8cc7\u6750\u30fb\u305d\u306e\u4ed6",
    items: ["\u8cc7\u6750\u904b\u642c", "\u6a5f\u68b0\u6574\u5099", "\u7247\u4ed8\u3051", "\u6e05\u6383", "\u305d\u306e\u4ed6"]
  }
];
const WORK_TYPE_RECENT_SECTION_LABEL = "\u6700\u8fd1\u4f7f\u3063\u305f\u4f5c\u696d";
const WORK_TYPE_UNKNOWN_SECTION_LABEL = "\u65e2\u5b58\u30c7\u30fc\u30bf\u7531\u6765\u306e\u4f5c\u696d";
const WORK_TYPE_RECENT_LIMIT = 8;
const WORK_TYPE_SEARCH_ALIASES = {
  "\u958b\u8459": ["\u304b\u3044\u3084\u304f"],
  "\u6458\u82b1\uff08\u82b1\u7c89\uff09": ["\u82b1\u7c89"],
  "\u526a\u5b9a\u679d\u713c\u5374": ["\u526a\u5b9a"],
  "\u526a\u5b9a\u679d\u7834\u7815": ["\u526a\u5b9a"],
  "\u65bd\u80a5": ["\u65bd"],
  "\u30b7\u30eb\u30d0\u30fc\u4f5c\u696d": ["\u30b7\u30eb\u30d0\u30fc"]
};

const form = document.getElementById("recordForm");
const recordIdInput = document.getElementById("recordId");
const formMode = document.getElementById("formMode");
const workDateInput = document.getElementById("workDate");
const orchardSelect = document.getElementById("orchardSelect");
const plotSelect = document.getElementById("plotSelect");
const qrScanButton = document.getElementById("qrScanButton");
const varietySelect = document.getElementById("varietySelect");
const taskTypeInput = document.getElementById("taskType");
const taskTypeSearchInput = document.getElementById("taskTypeSearch");
const taskTypeList = document.getElementById("taskTypeList");
const taskTypeSummary = document.getElementById("taskTypeSummary");
const taskTypePicker = document.getElementById("taskTypePicker");
const clearTaskTypesButton = document.getElementById("clearTaskTypesButton");
const workHoursInput = document.getElementById("workHours");
const groupSelect = document.getElementById("groupSelect");
const workerCountInput = document.getElementById("workerCount");
const selectedWorkerCount = document.getElementById("selectedWorkerCount");
const workerPickerHint = document.getElementById("workerPickerHint");
const workerSelectionList = document.getElementById("workerSelectionList");
const applyCommonTimeToWorkersButton = document.getElementById("applyCommonTimeToWorkersButton");
const workerTimeDetailList = document.getElementById("workerTimeDetailList");
let workShiftTypeInput = document.getElementById("workShiftType");
const startTimeInput = document.getElementById("startTime");
const endTimeInput = document.getElementById("endTime");
const breakMinutesInput = document.getElementById("breakMinutes");
const calculatedWorkHoursInput = document.getElementById("calculatedWorkHours");
const applyStandardWorkTimeButton = document.getElementById("applyStandardWorkTimeButton");
const timeHint = document.getElementById("timeHint");
const temperatureInput = document.getElementById("temperatureC");
const weatherInput = document.getElementById("weather");
const fetchWeatherButton = document.getElementById("fetchWeatherButton");
const weatherFetchStatus = document.getElementById("weatherFetchStatus");
const weatherTempAvgInput = document.getElementById("weatherTempAvg");
const weatherTempMaxInput = document.getElementById("weatherTempMax");
const weatherTempMinInput = document.getElementById("weatherTempMin");
const weatherPrecipitationInput = document.getElementById("weatherPrecipitation");
const weatherHumidityInput = document.getElementById("weatherHumidity");
const weatherWindSpeedInput = document.getElementById("weatherWindSpeed");
const weatherCodeInput = document.getElementById("weatherCode");
const observationDiseaseInput = document.getElementById("obsDiseaseObserved");
const observationPestInput = document.getElementById("obsPestObserved");
const observationSprayInput = document.getElementById("obsSprayApplied");
const observationDamageLevelInput = document.getElementById("obsDamageLevel");
const observationWetnessInput = document.getElementById("obsWetness");
const observationMuddyInput = document.getElementById("obsMuddy");
const observationWorkDifficultyInput = document.getElementById("obsWorkDifficulty");
const observationMemoInput = document.getElementById("fieldObservationMemo");
const materialsInput = document.getElementById("materials");
const notesInput = document.getElementById("notes");
const orchardFilterInput = document.getElementById("orchardFilter");
const varietyFilterInput = document.getElementById("varietyFilter");
const taskFilterInput = document.getElementById("taskFilter");
const workerFilterInput = document.getElementById("workerFilter");
const historyCalendarMonthLabel = document.getElementById("historyCalendarMonthLabel");
const historyCalendarPrevButton = document.getElementById("historyCalendarPrevButton");
const historyCalendarNextButton = document.getElementById("historyCalendarNextButton");
const historyCalendarTodayButton = document.getElementById("historyCalendarTodayButton");
const historyCalendarGrid = document.getElementById("historyCalendarGrid");
const historySelectedDateLabel = document.getElementById("historySelectedDateLabel");
const recordList = document.getElementById("recordList");
const resetButton = document.getElementById("resetButton");
const exportButton = document.getElementById("exportButton");
const dailyReportDateInput = document.getElementById("dailyReportDate");
const dailyReportPreviewButton = document.getElementById("dailyReportPreviewButton");
const dailyReportPdfButton = document.getElementById("dailyReportPdfButton");
const dailyReportShareButton = document.getElementById("dailyReportShareButton");
const monthlyReportMonthInput = document.getElementById("monthlyReportMonth");
const monthlyReportPreviewButton = document.getElementById("monthlyReportPreviewButton");
const monthlyReportPdfButton = document.getElementById("monthlyReportPdfButton");
const monthlyReportShareButton = document.getElementById("monthlyReportShareButton");
const monthlyReportExportButton = document.getElementById("monthlyReportExportButton");
const payrollTargetMonthInput = document.getElementById("payrollTargetMonth");
const payrollCloseTypeInput = document.getElementById("payrollCloseType");
const payrollWorkerScopeInput = document.getElementById("payrollWorkerScope");
const payrollRefreshButton = document.getElementById("payrollRefreshButton");
const payrollExportButton = document.getElementById("payrollExportButton");
const payrollPrintButton = document.getElementById("payrollPrintButton");
const payrollPdfButton = document.getElementById("payrollPdfButton");
const payrollCustomRange = document.getElementById("payrollCustomRange");
const payrollFromDateInput = document.getElementById("payrollFromDate");
const payrollToDateInput = document.getElementById("payrollToDate");
const payrollPeriodInfo = document.getElementById("payrollPeriodInfo");
const payrollSummaryCards = document.getElementById("payrollSummaryCards");
const payrollList = document.getElementById("payrollList");
const payrollDetail = document.getElementById("payrollDetail");
const worktimePeriodModeInput = document.getElementById("worktimePeriodMode");
const worktimeQuickButtons = Array.from(document.querySelectorAll("[data-worktime-period]"));
const worktimeTabButtons = Array.from(document.querySelectorAll("[data-worktime-tab]"));
const worktimeWorkerRow = document.getElementById("worktimeWorkerRow");
const worktimeWorkerSelect = document.getElementById("worktimeWorkerSelect");
const worktimeCustomRange = document.getElementById("worktimeCustomRange");
const worktimeFromDateInput = document.getElementById("worktimeFromDate");
const worktimeToDateInput = document.getElementById("worktimeToDate");
const worktimePeriodInfo = document.getElementById("worktimePeriodInfo");
const worktimeSummaryCards = document.getElementById("worktimeSummaryCards");
const worktimeComparisonList = document.getElementById("worktimeComparisonList");
const worktimeBreakdownTitle = document.getElementById("worktimeBreakdownTitle");
const worktimeBreakdownList = document.getElementById("worktimeBreakdownList");
const worktimePrintButton = document.getElementById("worktimePrintButton");
const worktimePdfButton = document.getElementById("worktimePdfButton");
const worktimePersonalCsvButton = document.getElementById("worktimePersonalCsvButton");
const worktimeOverallCsvButton = document.getElementById("worktimeOverallCsvButton");
const backupButton = document.getElementById("backupButton");
const restoreButton = document.getElementById("restoreButton");
const restoreInput = document.getElementById("restoreInput");
const restoreModeInput = document.getElementById("restoreMode");
const resetAllDataButton = document.getElementById("resetAllDataButton");
const backupTimestamp = document.getElementById("backupTimestamp");
const backupMessage = document.getElementById("backupMessage");
const backupOrchardCount = document.getElementById("backupOrchardCount");
const backupPlotCount = document.getElementById("backupPlotCount");
const backupVarietyCount = document.getElementById("backupVarietyCount");
const backupWorkerCount = document.getElementById("backupWorkerCount");
const backupGroupCount = document.getElementById("backupGroupCount");
const backupTeamPlanCount = document.getElementById("backupTeamPlanCount");
const backupRecordCount = document.getElementById("backupRecordCount");
const totalCount = document.getElementById("totalCount");
const monthlyCount = document.getElementById("monthlyCount");
const totalHours = document.getElementById("totalHours");
const activeWorkerCount = document.getElementById("activeWorkerCount");
const todayTotalPersonHours = document.getElementById("todayTotalPersonHours");
const todayTotalLaborCost = document.getElementById("todayTotalLaborCost");
const todayTeamPlanCount = document.getElementById("todayTeamPlanCount");
const homePanel = document.getElementById("homePanel");
const recordFormPanel = document.getElementById("recordFormPanel");
const teamPlanPanel = document.getElementById("teamPlanPanel");
const recordListPanel = document.getElementById("recordListPanel");
const analyticsPanel = document.getElementById("analyticsPanel");
const masterPanel = document.getElementById("masterPanel");
const qrPanel = document.getElementById("qrPanel");
const settingsTitle = document.getElementById("settingsTitle");
const settingsLead = document.getElementById("settingsLead");
const settingsTopMenu = document.getElementById("settingsTopMenu");
const settingsPageNav = document.getElementById("settingsPageNav");
const settingsMasterGrid = document.getElementById("settingsMasterGrid");
const settingsSectionCards = Array.from(document.querySelectorAll("[data-settings-section]"));
const settingsMenuButtons = Array.from(document.querySelectorAll("[data-settings-target]"));
const settingsNavButtons = Array.from(document.querySelectorAll("[data-settings-nav]"));
const settingsMenuCompanyButton = document.getElementById("settingsMenuCompanyButton");
const summaryTitle = document.getElementById("summaryTitle");
const summaryLead = document.getElementById("summaryLead");
const summaryTopMenu = document.getElementById("summaryTopMenu");
const summaryPageNav = document.getElementById("summaryPageNav");
const summaryAnalyticsGrid = document.getElementById("summaryAnalyticsGrid");
const summarySectionCards = Array.from(document.querySelectorAll("[data-summary-section]"));
const summaryMenuButtons = Array.from(document.querySelectorAll("[data-summary-target]"));
const summaryNavButtons = Array.from(document.querySelectorAll("[data-summary-nav]"));
const summaryMenuDailyButton = document.getElementById("summaryMenuDailyButton");
const bottomNav = document.getElementById("bottomNav");
const bottomNavButtons = bottomNav
  ? Array.from(bottomNav.querySelectorAll("[data-view-target],[data-app-view]"))
  : [];
const appViewPanelMap = {
  home: ["homePanel"],
  record: ["recordFormPanel"],
  team: ["teamPlanPanel"],
  records: ["recordListPanel"],
  summary: ["analyticsPanel"],
  settings: ["masterPanel", "qrPanel"]
};
const appViewKeys = Object.keys(appViewPanelMap);
const appViewOptionalPanelIds = [
  "payrollPanel",
  "backupPanel"
];
const appViewManagedPanelIds = Array.from(
  new Set([
    ...appViewKeys.flatMap((viewKey) => appViewPanelMap[viewKey]),
    ...appViewOptionalPanelIds
  ])
);
const appViewPanels = Array.from(
  new Set(
    [
      ...appViewManagedPanelIds.map((panelId) => document.getElementById(panelId)),
      ...Array.from(document.querySelectorAll("[data-mobile-tab-panel]"))
    ]
      .filter(Boolean)
  )
);
let activeAppViewKey = "home";
let activeSettingsSection = "top";
let activeSummarySection = "top";
let activeWorktimeTab = "personal";
let activeWorktimeWorkerId = "";
let hasBoundViewTargetDelegation = false;
const shortcutRecordFormButton = document.getElementById("shortcutRecordFormButton");
const shortcutTeamPlanButton = document.getElementById("shortcutTeamPlanButton");
const shortcutDailyReportButton = document.getElementById("shortcutDailyReportButton");
const shortcutMonthlyReportButton = document.getElementById("shortcutMonthlyReportButton");
const shortcutAnnualReportButton = document.getElementById("shortcutAnnualReportButton");
const cardTemplate = document.getElementById("recordCardTemplate");
const teamPlanForm = document.getElementById("teamPlanForm");
const teamPlanIdInput = document.getElementById("teamPlanId");
const teamPlanDateInput = document.getElementById("teamPlanDate");
const teamPlanGroupInput = document.getElementById("teamPlanGroup");
const teamSetSelectInput = document.getElementById("teamSetSelect");
const teamSetHint = document.getElementById("teamSetHint");
const teamPlanSelectedCount = document.getElementById("teamPlanSelectedCount");
const teamPlanHint = document.getElementById("teamPlanHint");
const teamPlanWorkerList = document.getElementById("teamPlanWorkerList");
const teamPlanLoadSetButton = document.getElementById("teamPlanLoadSetButton");
const teamPlanCopyButton = document.getElementById("teamPlanCopyButton");
const teamPlanApplyButton = document.getElementById("teamPlanApplyButton");
const teamPlanResetButton = document.getElementById("teamPlanResetButton");
const teamPlanList = document.getElementById("teamPlanList");
const todayMemberGroupFilterInput = document.getElementById("todayMemberGroupFilter");
const todayMemberStatusDate = document.getElementById("todayMemberStatusDate");
const todayMemberStatusSummary = document.getElementById("todayMemberStatusSummary");
const todayMemberStatusList = document.getElementById("todayMemberStatusList");
const monthlyCountList = document.getElementById("monthlyCountList");
const monthlyHoursList = document.getElementById("monthlyHoursList");
const monthlyAverageTemperatureList = document.getElementById("monthlyAverageTemperatureList");
const monthlyDegreeDayList = document.getElementById("monthlyDegreeDayList");
const orchardHoursList = document.getElementById("orchardHoursList");
const orchardPersonHoursList = document.getElementById("orchardPersonHoursList");
const orchardLaborCostList = document.getElementById("orchardLaborCostList");
const plotHoursList = document.getElementById("plotHoursList");
const plotPersonHoursList = document.getElementById("plotPersonHoursList");
const plotLaborCostList = document.getElementById("plotLaborCostList");
const taskHoursList = document.getElementById("taskHoursList");
const workerTotalHoursList = document.getElementById("workerTotalHoursList");
const groupWorkerHoursList = document.getElementById("groupWorkerHoursList");
const primaryGroupHoursList = document.getElementById("primaryGroupHoursList");
const groupCountList = document.getElementById("groupCountList");
const groupHoursList = document.getElementById("groupHoursList");
const groupPersonHoursList = document.getElementById("groupPersonHoursList");
const groupLaborCostList = document.getElementById("groupLaborCostList");
const varietyHoursList = document.getElementById("varietyHoursList");
const comparisonPeriodInput = document.getElementById("comparisonPeriod");
const comparisonSortMetricInput = document.getElementById("comparisonSortMetric");
const comparisonSortOrderInput = document.getElementById("comparisonSortOrder");
const comparisonFromDateInput = document.getElementById("comparisonFromDate");
const comparisonToDateInput = document.getElementById("comparisonToDate");
const comparisonRangeRow = document.getElementById("comparisonRangeRow");
const comparisonInfo = document.getElementById("comparisonInfo");
const orchardCumulativeList = document.getElementById("orchardCumulativeList");
const plotCumulativeList = document.getElementById("plotCumulativeList");
const comparisonExportButton = document.getElementById("comparisonExportButton");
const taskReportPeriodInput = document.getElementById("taskReportPeriod");
const taskReportSortMetricInput = document.getElementById("taskReportSortMetric");
const taskReportSortOrderInput = document.getElementById("taskReportSortOrder");
const taskReportFromDateInput = document.getElementById("taskReportFromDate");
const taskReportToDateInput = document.getElementById("taskReportToDate");
const taskReportRangeRow = document.getElementById("taskReportRangeRow");
const taskReportInfo = document.getElementById("taskReportInfo");
const taskTypeReportList = document.getElementById("taskTypeReportList");
const taskReportPreviewButton = document.getElementById("taskReportPreviewButton");
const taskReportExportButton = document.getElementById("taskReportExportButton");
const varietyReportPeriodInput = document.getElementById("varietyReportPeriod");
const varietyReportSortMetricInput = document.getElementById("varietyReportSortMetric");
const varietyReportSortOrderInput = document.getElementById("varietyReportSortOrder");
const varietyReportFromDateInput = document.getElementById("varietyReportFromDate");
const varietyReportToDateInput = document.getElementById("varietyReportToDate");
const varietyReportRangeRow = document.getElementById("varietyReportRangeRow");
const varietyReportInfo = document.getElementById("varietyReportInfo");
const varietyTypeReportList = document.getElementById("varietyTypeReportList");
const varietyReportPreviewButton = document.getElementById("varietyReportPreviewButton");
const varietyReportExportButton = document.getElementById("varietyReportExportButton");
const annualReportSortMetricInput = document.getElementById("annualReportSortMetric");
const annualReportSortOrderInput = document.getElementById("annualReportSortOrder");
const annualReportPreviewButton = document.getElementById("annualReportPreviewButton");
const annualReportPdfButton = document.getElementById("annualReportPdfButton");
const annualReportShareButton = document.getElementById("annualReportShareButton");
const annualReportExportButton = document.getElementById("annualReportExportButton");
const annualReportInfo = document.getElementById("annualReportInfo");
const annualReportSummary = document.getElementById("annualReportSummary");
const annualReportList = document.getElementById("annualReportList");
const qrCodeList = document.getElementById("qrCodeList");
const qrScannerDialog = document.getElementById("qrScannerDialog");
const qrScannerVideo = document.getElementById("qrScannerVideo");
const qrScannerMessage = document.getElementById("qrScannerMessage");
const qrManualInput = document.getElementById("qrManualInput");
const qrManualApplyButton = document.getElementById("qrManualApplyButton");
const qrScannerCloseButton = document.getElementById("qrScannerCloseButton");
const openOrchardQrSheetButton = document.getElementById("openOrchardQrSheetButton");
const openPlotQrSheetButton = document.getElementById("openPlotQrSheetButton");
const openOrchardQrSimpleSheetButton = document.getElementById("openOrchardQrSimpleSheetButton");
const openPlotQrSimpleSheetButton = document.getElementById("openPlotQrSimpleSheetButton");
const openOrchardQrSheetPdfButton = document.getElementById("openOrchardQrSheetPdfButton");
const openPlotQrSheetPdfButton = document.getElementById("openPlotQrSheetPdfButton");
const openOrchardQrSimpleSheetPdfButton = document.getElementById("openOrchardQrSimpleSheetPdfButton");
const openPlotQrSimpleSheetPdfButton = document.getElementById("openPlotQrSimpleSheetPdfButton");
const qrFilterOrchardInput = document.getElementById("qrFilterOrchard");
const qrFilterPlotInput = document.getElementById("qrFilterPlot");
const qrFilterVarietyInput = document.getElementById("qrFilterVariety");
const qrFilterCodeInput = document.getElementById("qrFilterCode");
const qrFilterTypeInput = document.getElementById("qrFilterType");
const orchardForm = document.getElementById("orchardForm");
const orchardIdInput = document.getElementById("orchardId");
const orchardNameInput = document.getElementById("orchardName");
const orchardCodeInput = document.getElementById("orchardCode");
const orchardLatitudeInput = document.getElementById("orchardLatitude");
const orchardLongitudeInput = document.getElementById("orchardLongitude");
const orchardNoteInput = document.getElementById("orchardNote");
const orchardList = document.getElementById("orchardList");
const orchardCount = document.getElementById("orchardCount");
const orchardResetButton = document.getElementById("orchardResetButton");
const plotForm = document.getElementById("plotForm");
const plotIdInput = document.getElementById("plotId");
const plotOrchardInput = document.getElementById("plotOrchardId");
const plotNameInput = document.getElementById("plotName");
const plotCodeInput = document.getElementById("plotCode");
const plotNoteInput = document.getElementById("plotNote");
const plotList = document.getElementById("plotList");
const plotCount = document.getElementById("plotCount");
const plotResetButton = document.getElementById("plotResetButton");
const varietyForm = document.getElementById("varietyForm");
const varietyIdInput = document.getElementById("varietyId");
const varietyNameInput = document.getElementById("varietyName");
const varietyNoteInput = document.getElementById("varietyNote");
const varietyList = document.getElementById("varietyList");
const varietyCount = document.getElementById("varietyCount");
const varietyResetButton = document.getElementById("varietyResetButton");
const groupForm = document.getElementById("groupForm");
const groupIdInput = document.getElementById("groupId");
const groupNameInput = document.getElementById("groupName");
const groupSortOrderInput = document.getElementById("groupSortOrder");
const groupDescriptionInput = document.getElementById("groupDescription");
const groupIsActiveInput = document.getElementById("groupIsActive");
const groupMemberSelectedCount = document.getElementById("groupMemberSelectedCount");
const groupMemberHint = document.getElementById("groupMemberHint");
const groupMemberList = document.getElementById("groupMemberList");
const groupList = document.getElementById("groupList");
const groupMasterCount = document.getElementById("groupMasterCount");
const groupResetButton = document.getElementById("groupResetButton");
const teamSetForm = document.getElementById("teamSetForm");
const teamSetIdInput = document.getElementById("teamSetId");
const teamSetNameInput = document.getElementById("teamSetName");
const teamSetGroupIdInput = document.getElementById("teamSetGroupId");
const teamSetSelectedCount = document.getElementById("teamSetSelectedCount");
const teamSetWorkerHint = document.getElementById("teamSetWorkerHint");
const teamSetWorkerList = document.getElementById("teamSetWorkerList");
const teamSetCount = document.getElementById("teamSetCount");
const teamSetResetButton = document.getElementById("teamSetResetButton");
const teamSetList = document.getElementById("teamSetList");
const workerForm = document.getElementById("workerForm");
const workerIdInput = document.getElementById("workerId");
const workerFullNameInput = document.getElementById("workerFullName");
const workerDisplayNameInput = document.getElementById("workerDisplayName");
const workerCategoryInput = document.getElementById("workerCategory");
const workerHourlyRateInput = document.getElementById("workerHourlyRate");
const workerIsActiveInput = document.getElementById("workerIsActive");
const workerList = document.getElementById("workerList");
const workerMasterCount = document.getElementById("workerMasterCount");
const workerResetButton = document.getElementById("workerResetButton");
const workerSearchInput = document.getElementById("workerSearchInput");
const workerGroupFilterInput = document.getElementById("workerGroupFilter");
const workerStatusDateLabel = document.getElementById("workerStatusDateLabel");
const membershipForm = document.getElementById("membershipForm");
const membershipWorkerIdInput = document.getElementById("membershipWorkerId");
const membershipSelectedCount = document.getElementById("membershipSelectedCount");
const membershipHint = document.getElementById("membershipHint");
const membershipGroupList = document.getElementById("membershipGroupList");
const membershipPrimaryGroupIdInput = document.getElementById("membershipPrimaryGroupId");
const membershipList = document.getElementById("membershipList");
const membershipCount = document.getElementById("membershipCount");
const membershipResetButton = document.getElementById("membershipResetButton");
const companySettingsForm = document.getElementById("companySettingsForm");
const fiscalClosingMonthInput = document.getElementById("fiscalClosingMonth");
const fiscalClosingDayInput = document.getElementById("fiscalClosingDay");
const degreeDayBaseTemperatureInput = document.getElementById("degreeDayBaseTemperature");
const workdayStartTimeInput = document.getElementById("workdayStartTime");
const workdayEndTimeInput = document.getElementById("workdayEndTime");
const workdayBreakMinutesInput = document.getElementById("workdayBreakMinutes");
const payrollTimeUnitMinutesInput = document.getElementById("payrollTimeUnitMinutes");
const companyFiscalYearPreview = document.getElementById("companyFiscalYearPreview");

/*
function ensureWorkShiftTypeInput() {
  if (workShiftTypeInput) return workShiftTypeInput;
  const startInput = document.getElementById("startTime");
  const firstTimeRow = startInput?.closest(".form-row");
  const worktimeSection = firstTimeRow?.parentElement;
  if (!firstTimeRow || !worktimeSection) return null;

  const row = document.createElement("div");
  row.className = "form-row";
  const label = document.createElement("label");
  label.textContent = "勤務区刁E;
  const select = document.createElement("select");
  select.id = "workShiftType";
  [
    { value: WORK_SHIFT_TYPE.FULL_DAY, label: "1日勤勁E },
    { value: WORK_SHIFT_TYPE.MORNING, label: "午前勤勁E },
    { value: WORK_SHIFT_TYPE.AFTERNOON, label: "午後勤勁E },
    { value: WORK_SHIFT_TYPE.CUSTOM, label: "変則勤勁E }
  ].forEach((optionItem) => {
    const option = document.createElement("option");
    option.value = optionItem.value;
    option.textContent = optionItem.label;
    select.appendChild(option);
  });
  label.appendChild(select);
  row.appendChild(label);
  worktimeSection.insertBefore(row, firstTimeRow);
  workShiftTypeInput = select;
  return workShiftTypeInput;
}

ensureWorkShiftTypeInput();

function resetLabelText(labelElement, text) {
  if (!labelElement) return;
  const childElements = Array.from(labelElement.children);
  labelElement.textContent = text;
  childElements.forEach((child) => labelElement.appendChild(child));
}

function applyWorktimeUiText() {
  resetLabelText(startTimeInput?.closest("label"), "開始時刻");
  resetLabelText(endTimeInput?.closest("label"), "終亁E��刻");
  resetLabelText(breakMinutesInput?.closest("label"), "控除時間�E�休�E・昼休み�E�E);
  resetLabelText(calculatedWorkHoursInput?.closest("label"), "自動計算された実労働時間（時間！E);
  resetLabelText(workHoursInput?.closest("label"), "実労働時間を手�E力で上書き（任意！E);
  if (breakMinutesInput) {
    breakMinutesInput.placeholder = "侁E 120";
  }
  if (workHoursInput) {
    workHoursInput.placeholder = "侁E 7.5";
  }
  const worktimeSection = startTimeInput?.closest(".worktime-subsection");
  const hintNodes = worktimeSection ? worktimeSection.querySelectorAll(".form-hint") : [];
  if (hintNodes[0]) {
    hintNodes[0].textContent = "通常勤務�E昼休み90刁E��休�E30刁E��E20刁E��控除します。半日勤務�E休�E15刁E��控除します。変則勤務�E場合�E控除時間を調整してください、E;
  }
  if (timeHint) {
    timeHint.textContent = "開始�E終亁E�E控除時間から、給与計算に使ぁE��労働時間を自動計算します、E;
  }
}

applyWorktimeUiText();
*/

function ensureWorkShiftTypeInput() {
  if (workShiftTypeInput) return workShiftTypeInput;
  const startInput = document.getElementById("startTime");
  const firstTimeRow = startInput?.closest(".form-row");
  const worktimeSection = firstTimeRow?.parentElement;
  if (!firstTimeRow || !worktimeSection) return null;

  const row = document.createElement("div");
  row.className = "form-row";
  const label = document.createElement("label");
  label.textContent = "\u52e4\u52d9\u533a\u5206";
  const select = document.createElement("select");
  select.id = "workShiftType";
  [
    { value: WORK_SHIFT_TYPE.FULL_DAY, label: "\u6a19\u6e96\u0031\u65e5" },
    { value: WORK_SHIFT_TYPE.MORNING, label: "\u5348\u524d\u306e\u307f" },
    { value: WORK_SHIFT_TYPE.AFTERNOON, label: "\u5348\u5f8c\u306e\u307f" },
    { value: WORK_SHIFT_TYPE.CUSTOM, label: "\u6642\u9593\u6307\u5b9a" },
    { value: WORK_SHIFT_TYPE.MANUAL, label: "\u624b\u5165\u529b" }
  ].forEach((optionItem) => {
    const option = document.createElement("option");
    option.value = optionItem.value;
    option.textContent = optionItem.label;
    select.appendChild(option);
  });
  label.appendChild(select);
  row.appendChild(label);
  worktimeSection.insertBefore(row, firstTimeRow);
  workShiftTypeInput = select;
  return workShiftTypeInput;
}

ensureWorkShiftTypeInput();

function applyWorktimeUiText() {
  resetLabelText(startTimeInput?.closest("label"), "\u958b\u59cb\u6642\u523b");
  resetLabelText(endTimeInput?.closest("label"), "\u7d42\u4e86\u6642\u523b");
  resetLabelText(breakMinutesInput?.closest("label"), "\u63a7\u9664\u6642\u9593\uff08\u4f11\u61a9\u30fb\u663c\u4f11\u307f\uff09");
  resetLabelText(calculatedWorkHoursInput?.closest("label"), "\u81ea\u52d5\u8a08\u7b97\u3055\u308c\u305f\u5b9f\u52b4\u50cd\u6642\u9593\uff08\u6642\u9593\uff09");
  resetLabelText(workHoursInput?.closest("label"), "\u5b9f\u52b4\u50cd\u6642\u9593\u3092\u624b\u5165\u529b\u3067\u4e0a\u66f8\u304d\uff08\u4efb\u610f\uff09");
  if (breakMinutesInput) {
    breakMinutesInput.placeholder = "\u4f8b: 120";
  }
  if (workHoursInput) {
    workHoursInput.placeholder = "\u4f8b: 7.5";
  }
  const worktimeSection = startTimeInput?.closest(".worktime-subsection");
  const hintNodes = worktimeSection ? worktimeSection.querySelectorAll(".form-hint") : [];
  if (hintNodes[0]) {
    hintNodes[0].textContent = "\u6a19\u6e96\u0031\u65e5\u52e4\u52d9\u306f7:30\u301c17:00\u3001\u663c\u4f11\u307f\u30fb\u4f11\u61a9\u3068120\u5206\u3092\u63a7\u9664\u3057\u307e\u3059\u3002\u5348\u524d\u306e\u307f\u30fb\u5348\u5f8c\u306e\u307f\u306f15\u5206\u63a7\u9664\u3067\u3059\u3002\u6642\u9593\u6307\u5b9a\u3068\u624b\u5165\u529b\u306f\u5fc5\u8981\u306b\u5fdc\u3058\u3066\u8abf\u6574\u3057\u3066\u304f\u3060\u3055\u3044\u3002";
  }
  if (timeHint) {
    timeHint.textContent = "\u958b\u59cb\u30fb\u7d42\u4e86\u30fb\u63a7\u9664\u6642\u9593\u304b\u3089\u3001\u7d66\u4e0e\u8a08\u7b97\u7528\u306e\u5b9f\u52b4\u50cd\u6642\u9593\u3092\u81ea\u52d5\u8a08\u7b97\u3057\u307e\u3059\u3002";
  }
}

applyWorktimeUiText();

const today = getTodayString();
workDateInput.value = today;
if (dailyReportDateInput) {
  dailyReportDateInput.value = today;
}
if (monthlyReportMonthInput) {
  monthlyReportMonthInput.value = today.slice(0, 7);
}
if (payrollTargetMonthInput) {
  payrollTargetMonthInput.value = today.slice(0, 7);
}
const defaultMonthRange = getCurrentMonthRange(today);
comparisonFromDateInput.value = defaultMonthRange.from;
comparisonToDateInput.value = defaultMonthRange.to;
if (payrollFromDateInput && payrollToDateInput) {
  payrollFromDateInput.value = defaultMonthRange.from;
  payrollToDateInput.value = defaultMonthRange.to;
}
if (taskReportFromDateInput && taskReportToDateInput) {
  taskReportFromDateInput.value = defaultMonthRange.from;
  taskReportToDateInput.value = defaultMonthRange.to;
}
if (varietyReportFromDateInput && varietyReportToDateInput) {
  varietyReportFromDateInput.value = defaultMonthRange.from;
  varietyReportToDateInput.value = defaultMonthRange.to;
}
if (worktimeFromDateInput && worktimeToDateInput) {
  worktimeFromDateInput.value = defaultMonthRange.from;
  worktimeToDateInput.value = defaultMonthRange.to;
}
if (worktimePeriodModeInput) {
  worktimePeriodModeInput.value = "week";
}
let selectedWorkerIds = [];
let workerTimeDetailsDraft = {};
let selectedTaskTypes = [];
let selectedMembershipGroupIds = [];
let selectedGroupMemberWorkerIds = [];
let selectedTeamPlanWorkerIds = [];
let selectedTeamSetWorkerIds = [];
let recordAppliedTeamSetId = "";
let recordAppliedTeamSetName = "";
let recordWeatherInfo = null;
let historySelectedDate = today;
let historyVisibleMonth = today.slice(0, 7);
let qrScannerStream = null;
let qrScanFrameId = 0;
let qrDetector = null;

let state = loadState();
let records = state.records;
let masters = state.masters;
let teamPlans = state.teamPlans || [];
let companySettings = state.companySettings || { ...defaultCompanySettings };
let payrollAdjustments = Array.isArray(state.payrollAdjustments) ? state.payrollAdjustments : [];
let activePayrollWorkerId = "";

function getTodayString() {
  const now = new Date();
  const adjusted = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  return adjusted.toISOString().slice(0, 10);
}

function createId(prefix) {
  return `${prefix}-${crypto.randomUUID()}`;
}

function normalizeText(value) {
  return String(value || "").trim();
}

function normalizeSearchText(value) {
  return normalizeText(value).toLocaleLowerCase("ja-JP");
}

function getWorkTypeSearchTexts(workType) {
  const label = normalizeText(workType);
  const aliases = Array.isArray(WORK_TYPE_SEARCH_ALIASES[label]) ? WORK_TYPE_SEARCH_ALIASES[label] : [];
  return [label, ...aliases].map((value) => normalizeSearchText(value)).filter(Boolean);
}

function matchesWorkTypeQuery(workType, query) {
  if (!query) return true;
  return getWorkTypeSearchTexts(workType).some((text) => text.includes(query));
}

function normalizeShiftType(value, fallback = WORK_SHIFT_TYPE.FULL_DAY) {
  const normalized = normalizeSearchText(value).replace(/\s+/g, "");
  if (!normalized) return fallback;
  if ([WORK_SHIFT_TYPE.FULL_DAY, "full", "day", "daily", "1day", "allday", "1\u65e5", "\u4e00\u65e5", "\u901a\u5e38", "\u901a\u5e38\u52e4\u52d9", "\u6a19\u6e96\u0031\u65e5", "\u6a19\u6e96\u0031\u65e5\u52e4\u52d9"].includes(normalized)) {
    return WORK_SHIFT_TYPE.FULL_DAY;
  }
  if ([WORK_SHIFT_TYPE.MORNING, "am", "morning", "\u5348\u524d", "\u5348\u524d\u306e\u307f"].includes(normalized)) {
    return WORK_SHIFT_TYPE.MORNING;
  }
  if ([WORK_SHIFT_TYPE.AFTERNOON, "pm", "afternoon", "\u5348\u5f8c", "\u5348\u5f8c\u306e\u307f"].includes(normalized)) {
    return WORK_SHIFT_TYPE.AFTERNOON;
  }
  if ([WORK_SHIFT_TYPE.CUSTOM, "custom", "irregular", "\u5909\u5247", "\u6642\u9593\u6307\u5b9a", "\u6642\u9593\u6307\u5b9a\u52e4\u52d9"].includes(normalized)) {
    return WORK_SHIFT_TYPE.CUSTOM;
  }
  if ([WORK_SHIFT_TYPE.MANUAL, "manual", "\u624b\u5165\u529b", "\u6642\u9593\u624b\u5165\u529b"].includes(normalized)) {
    return WORK_SHIFT_TYPE.MANUAL;
  }
  return fallback;
}

/*
function getShiftTypeLabel(shiftType) {
  const normalized = normalizeShiftType(shiftType, WORK_SHIFT_TYPE.CUSTOM);
  if (normalized === WORK_SHIFT_TYPE.MORNING) return "午前";
  if (normalized === WORK_SHIFT_TYPE.AFTERNOON) return "午征E;
  if (normalized === WORK_SHIFT_TYPE.CUSTOM) return "変則";
  return "1日";
}

*/
function getShiftTypeLabel(shiftType) {
  const normalized = normalizeShiftType(shiftType, WORK_SHIFT_TYPE.CUSTOM);
  if (normalized === WORK_SHIFT_TYPE.MORNING) return "\u5348\u524d\u306e\u307f";
  if (normalized === WORK_SHIFT_TYPE.AFTERNOON) return "\u5348\u5f8c\u306e\u307f";
  if (normalized === WORK_SHIFT_TYPE.CUSTOM) return "\u6642\u9593\u6307\u5b9a";
  if (normalized === WORK_SHIFT_TYPE.MANUAL) return "\u624b\u5165\u529b";
  return "\u6a19\u6e96\u0031\u65e5";
}

/*
function normalizeWorkTypeList(values, fallbackValue = "") {
  const list = Array.isArray(values)
    ? values
    : (normalizeText(values)
      ? String(values).split(/__legacy_disabled__/g)
/*
      : []);
  if (!list.length && normalizeText(fallbackValue)) {
    return normalizeWorkTypeList(String(fallbackValue));
  }
  return Array.from(
    new Set(
      list
        .map((value) => normalizeText(value))
        .filter(Boolean)
    )
  );
}

function getRecordWorkTypes(record, options = {}) {
  const { includeUnset = false } = options;
  const workTypes = normalizeWorkTypeList(record?.workTypes, record?.taskType);
  if (workTypes.length) return workTypes;
  return includeUnset ? ["未設宁E] : [];
}

function getRecordTaskTypeText(record, fallback = "未設宁E) {
  const workTypes = getRecordWorkTypes(record);
  return workTypes.length ? workTypes.join(WORK_TYPE_SEPARATOR) : fallback;
}

*/
function normalizeWorkTypeList(values, fallbackValue = "") {
  const list = Array.isArray(values)
    ? values
    : (normalizeText(values)
      ? String(values).split(/\s*(?:\/|・|,)\s*/g)
      : []);
  if (!list.length && normalizeText(fallbackValue)) {
    return normalizeWorkTypeList(String(fallbackValue));
  }
  return Array.from(
    new Set(
      list
        .map((value) => normalizeText(value))
        .filter(Boolean)
    )
  );
}

function getRecordWorkTypes(record, options = {}) {
  const { includeUnset = false } = options;
  const workTypes = normalizeWorkTypeList(record?.workTypes, record?.taskType);
  if (workTypes.length) return workTypes;
  return includeUnset ? ["\u672a\u8a2d\u5b9a"] : [];
}

function getRecordTaskTypeText(record, fallback = "\u672a\u8a2d\u5b9a") {
  const workTypes = getRecordWorkTypes(record);
  return workTypes.length ? workTypes.join(WORK_TYPE_SEPARATOR) : fallback;
}

function getBaseWorkTypeOptions() {
  const options = [];
  const exists = new Set();
  WORK_TYPE_CATEGORIES.forEach((category) => {
    category.items.forEach((item) => {
      const normalized = normalizeText(item);
      if (!normalized || exists.has(normalized)) return;
      exists.add(normalized);
      options.push(normalized);
    });
  });
  return options;
}

function getWorkTypeCategoryMap() {
  const categoryMap = new Map();
  WORK_TYPE_CATEGORIES.forEach((category) => {
    category.items.forEach((item) => {
      const normalized = normalizeText(item);
      if (!normalized || categoryMap.has(normalized)) return;
      categoryMap.set(normalized, category.key);
    });
  });
  return categoryMap;
}

function getKnownWorkTypeOptions(extraValues = []) {
  const options = [...getBaseWorkTypeOptions()];
  const exists = new Set(options);
  const append = (value) => {
    const normalized = normalizeText(value);
    if (!normalized || exists.has(normalized)) return;
    exists.add(normalized);
    options.push(normalized);
  };
  records.forEach((record) => {
    getRecordWorkTypes(record).forEach(append);
  });
  extraValues.forEach(append);
  return options;
}

function getWorkTypeBaseOrderMap() {
  return new Map(getBaseWorkTypeOptions().map((workType, index) => [workType, index]));
}

function setTaskTypeValidationState(isInvalid) {
  if (!taskTypePicker) return;
  taskTypePicker.dataset.invalid = isInvalid ? "true" : "false";
}

function setSelectedTaskTypes(values) {
  selectedTaskTypes = normalizeWorkTypeList(values);
  if (taskTypeInput) {
    taskTypeInput.value = selectedTaskTypes[0] || "";
  }
  if (clearTaskTypesButton) {
    clearTaskTypesButton.disabled = selectedTaskTypes.length === 0;
  }
}

function getRecentWorkTypeRankMap() {
  const rankMap = new Map();
  const sortedRecords = [...records].sort((a, b) => {
    const byDate = String(b.workDate || "").localeCompare(String(a.workDate || ""));
    if (byDate !== 0) return byDate;
    return new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0);
  });
  sortedRecords.forEach((record) => {
    getRecordWorkTypes(record).forEach((workType) => {
      if (!rankMap.has(workType)) {
        rankMap.set(workType, rankMap.size + 1);
      }
    });
  });
  return rankMap;
}

function sortWorkTypeOptions(items, selectedSet, recentRankMap, baseOrderMap) {
  return [...items].sort((a, b) => {
    const aSelected = selectedSet.has(a) ? 1 : 0;
    const bSelected = selectedSet.has(b) ? 1 : 0;
    if (aSelected !== bSelected) return bSelected - aSelected;
    const aRecent = recentRankMap.get(a) ?? Number.POSITIVE_INFINITY;
    const bRecent = recentRankMap.get(b) ?? Number.POSITIVE_INFINITY;
    if (aRecent !== bRecent) return aRecent - bRecent;
    const aBase = baseOrderMap.get(a) ?? Number.POSITIVE_INFINITY;
    const bBase = baseOrderMap.get(b) ?? Number.POSITIVE_INFINITY;
    if (aBase !== bBase) return aBase - bBase;
    return a.localeCompare(b, "ja");
  });
}

function appendTaskTypeGroup(container, title, items, selectedSet) {
  const section = document.createElement("section");
  section.className = "task-type-group";
  const heading = document.createElement("h4");
  heading.className = "task-type-group__title";
  heading.textContent = title;
  const itemGrid = document.createElement("div");
  itemGrid.className = "task-type-group__items";

  items.forEach((workType) => {
    const label = document.createElement("label");
    label.className = "task-type-item";
    if (selectedSet.has(workType)) {
      label.classList.add("is-selected");
    }

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = workType;
    checkbox.checked = selectedSet.has(workType);
    checkbox.addEventListener("change", () => {
      const nextValues = checkbox.checked
        ? [...selectedTaskTypes, workType]
        : selectedTaskTypes.filter((value) => value !== workType);
      setSelectedTaskTypes(nextValues);
      setTaskTypeValidationState(false);
      renderTaskTypeChecklist();
    });

    const text = document.createElement("span");
    text.textContent = workType;

    label.append(checkbox, text);
    itemGrid.appendChild(label);
  });

  section.append(heading, itemGrid);
  container.appendChild(section);
}

function updateTaskTypeSummary(visibleCount, totalCount, query) {
  if (!taskTypeSummary) return;
  if (selectedTaskTypes.length) {
    taskTypeSummary.textContent = `選択中: ${selectedTaskTypes.join(WORK_TYPE_SEPARATOR)} / 表示 ${visibleCount}/${totalCount} 件`;
    return;
  }
  if (query) {
    taskTypeSummary.textContent = `検索結果: ${visibleCount}件（部分一致）`;
    return;
  }
  taskTypeSummary.textContent = "最近使った作業項目を上に表示します。1つ以上選択してください。";
}

function renderTaskTypeChecklist() {
  if (!taskTypeList) return;
  const query = normalizeSearchText(taskTypeSearchInput?.value || "");
  const selectedSet = new Set(selectedTaskTypes);
  const baseOrderMap = getWorkTypeBaseOrderMap();
  const recentRankMap = getRecentWorkTypeRankMap();
  const allWorkTypeOptions = getKnownWorkTypeOptions(selectedTaskTypes);
  const visibleWorkTypeOptions = allWorkTypeOptions
    .filter((workType) => {
      if (!query) return true;
      const matches = matchesWorkTypeQuery(workType, query);
      return matches || selectedSet.has(workType);
    });
  taskTypeList.innerHTML = "";

  if (!visibleWorkTypeOptions.length) {
    taskTypeList.appendChild(buildEmptyState("該当する作業項目はありません。"));
    updateTaskTypeSummary(0, allWorkTypeOptions.length, query);
    setSelectedTaskTypes(selectedTaskTypes);
    return;
  }

  const visibleSet = new Set(visibleWorkTypeOptions);
  const recentOptions = sortWorkTypeOptions(
    visibleWorkTypeOptions.filter((workType) => recentRankMap.has(workType)),
    selectedSet,
    recentRankMap,
    baseOrderMap
  ).slice(0, WORK_TYPE_RECENT_LIMIT);
  const recentSet = new Set(recentOptions);
  if (recentOptions.length) {
    appendTaskTypeGroup(taskTypeList, WORK_TYPE_RECENT_SECTION_LABEL, recentOptions, selectedSet);
  }

  WORK_TYPE_CATEGORIES.forEach((category) => {
    const categoryOptions = sortWorkTypeOptions(
      category.items.filter((workType) => visibleSet.has(workType) && !recentSet.has(workType)),
      selectedSet,
      recentRankMap,
      baseOrderMap
    );
    if (!categoryOptions.length) return;
    appendTaskTypeGroup(taskTypeList, category.label, categoryOptions, selectedSet);
  });

  const categoryMap = getWorkTypeCategoryMap();
  const unknownOptions = sortWorkTypeOptions(
    visibleWorkTypeOptions.filter((workType) => !categoryMap.has(workType) && !recentSet.has(workType)),
    selectedSet,
    recentRankMap,
    baseOrderMap
  );
  if (unknownOptions.length) {
    appendTaskTypeGroup(taskTypeList, WORK_TYPE_UNKNOWN_SECTION_LABEL, unknownOptions, selectedSet);
  }

  setSelectedTaskTypes(selectedTaskTypes);
  updateTaskTypeSummary(visibleWorkTypeOptions.length, allWorkTypeOptions.length, query);
}

function renderTaskFilterOptions(selectedValue = "") {
  if (!taskFilterInput) return;
  const selected = normalizeText(selectedValue);
  const options = getKnownWorkTypeOptions(selected ? [selected] : []);
  taskFilterInput.innerHTML = "";
  taskFilterInput.appendChild(createOption("", "すべて"));
  options.forEach((workType) => taskFilterInput.appendChild(createOption(workType, workType)));
  taskFilterInput.value = selected;
  if (taskFilterInput.value !== selected) {
    taskFilterInput.value = "";
  }
}

function normalizeManagementCode(value) {
  return normalizeText(value).toUpperCase();
}

function normalizeTimeText(value, fallback = "00:00") {
  const text = normalizeText(value);
  if (!/^\d{2}:\d{2}$/.test(text)) return fallback;
  const [hourText, minuteText] = text.split(":");
  const hour = Number(hourText);
  const minute = Number(minuteText);
  if (!Number.isFinite(hour) || !Number.isFinite(minute)) return fallback;
  if (hour < 0 || hour > 23 || minute < 0 || minute > 59) return fallback;
  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

function normalizeBoolean(value, fallback = true) {
  if (typeof value === "boolean") {
    return value;
  }
  if (value === "false" || value === 0) {
    return false;
  }
  if (value === "true" || value === 1) {
    return true;
  }
  return fallback;
}

function normalizeOptionalNumber(value) {
  if (value === "" || value === null || value === undefined) return null;
  const numberValue = Number(value);
  return Number.isFinite(numberValue) ? numberValue : null;
}

function normalizeLatitude(value) {
  const numberValue = normalizeOptionalNumber(value);
  if (!Number.isFinite(numberValue)) return null;
  if (numberValue < -90 || numberValue > 90) return null;
  return Number(numberValue.toFixed(6));
}

function normalizeLongitude(value) {
  const numberValue = normalizeOptionalNumber(value);
  if (!Number.isFinite(numberValue)) return null;
  if (numberValue < -180 || numberValue > 180) return null;
  return Number(numberValue.toFixed(6));
}

function normalizeRecordWeatherInfo(rawInfo, fallback = {}) {
  if (!rawInfo || typeof rawInfo !== "object") return null;
  const currentTemp = normalizeOptionalNumber(
    rawInfo.currentTemp ??
    rawInfo.currentTemperatureC ??
    rawInfo.temperatureC ??
    rawInfo.temperature
  );
  const tempAvg = normalizeOptionalNumber(
    rawInfo.tempAvg ??
    rawInfo.averageTemperatureC ??
    rawInfo.dailyAverageTemperatureC ??
    rawInfo.meanTemperatureC
  );
  const tempMax = normalizeOptionalNumber(
    rawInfo.tempMax ??
    rawInfo.maxTemperatureC ??
    rawInfo.temperatureMaxC ??
    rawInfo.highTemperatureC
  );
  const tempMin = normalizeOptionalNumber(
    rawInfo.tempMin ??
    rawInfo.minTemperatureC ??
    rawInfo.temperatureMinC ??
    rawInfo.lowTemperatureC
  );
  const precipitation = normalizeOptionalNumber(
    rawInfo.precipitation ??
    rawInfo.precipitationMm ??
    rawInfo.rainMm
  );
  const humidity = normalizeOptionalNumber(
    rawInfo.humidity ??
    rawInfo.relativeHumidity ??
    rawInfo.relativeHumidityPercent
  );
  const windSpeed = normalizeOptionalNumber(
    rawInfo.windSpeed ??
    rawInfo.windSpeedMs ??
    rawInfo.windSpeedMps
  );
  const latitude = normalizeLatitude(rawInfo.latitude ?? rawInfo.lat);
  const longitude = normalizeLongitude(rawInfo.longitude ?? rawInfo.lng ?? rawInfo.lon);
  const weatherCodeRaw = normalizeOptionalNumber(rawInfo.weatherCode);
  const weatherCode = Number.isFinite(weatherCodeRaw) ? Math.trunc(weatherCodeRaw) : null;
  const weatherText = normalizeText(
    rawInfo.weatherText ??
    rawInfo.weatherLabel ??
    rawInfo.weather ??
    rawInfo.condition
  );
  const source = normalizeText(rawInfo.source ?? rawInfo.provider);
  const fetchedAt = normalizeText(rawInfo.fetchedAt ?? rawInfo.observedAt ?? rawInfo.retrievedAt);
  const targetDate = normalizeText(rawInfo.targetDate ?? rawInfo.workDate ?? rawInfo.date);
  const locationName = normalizeText(rawInfo.locationName ?? rawInfo.location ?? rawInfo.city ?? fallback.locationName);
  const orchardId = normalizeText(rawInfo.orchardId ?? fallback.orchardId);
  const orchardName = normalizeText(rawInfo.orchardName ?? fallback.orchardName);

  const hasNumbers = [
    currentTemp,
    tempAvg,
    tempMax,
    tempMin,
    precipitation,
    humidity,
    windSpeed,
    latitude,
    longitude
  ].some((value) => Number.isFinite(value));

  if (!hasNumbers && weatherCode === null && !weatherText && !source && !fetchedAt && !targetDate && !orchardId && !orchardName) {
    return null;
  }

  const normalizedCurrentTemp = Number.isFinite(currentTemp)
    ? currentTemp
    : (Number.isFinite(tempAvg) ? tempAvg : null);
  const normalizedTempAvg = Number.isFinite(tempAvg)
    ? tempAvg
    : (Number.isFinite(tempMax) && Number.isFinite(tempMin) ? Number(((tempMax + tempMin) / 2).toFixed(1)) : null);

  return {
    currentTemp: normalizedCurrentTemp,
    tempAvg: normalizedTempAvg,
    tempMax,
    tempMin,
    precipitation,
    humidity,
    windSpeed,
    latitude,
    longitude,
    weatherCode,
    weatherText,
    source,
    fetchedAt,
    targetDate,
    locationName,
    orchardId,
    orchardName,
    // Legacy aliases kept for backward compatibility with previous code paths.
    currentTemperatureC: normalizedCurrentTemp,
    maxTemperatureC: tempMax,
    minTemperatureC: tempMin,
    precipitationMm: precipitation,
    location: locationName,
    weatherLabel: weatherText
  };
}

function normalizeFieldObservation(rawObservation) {
  const source = rawObservation && typeof rawObservation === "object" ? rawObservation : {};
  return {
    diseaseObserved: normalizeBoolean(source.diseaseObserved, false),
    pestObserved: normalizeBoolean(source.pestObserved, false),
    sprayApplied: normalizeBoolean(source.sprayApplied, false),
    damageLevel: normalizeText(source.damageLevel),
    wetness: normalizeText(source.wetness),
    muddy: normalizeText(source.muddy),
    workDifficulty: normalizeText(source.workDifficulty),
    memo: normalizeText(source.memo)
  };
}

function normalizeRecordEnvironment(record) {
  const conditions = record?.conditions && typeof record.conditions === "object" ? record.conditions : {};
  const temperatureRaw =
    record?.temperatureC ??
    record?.temperature ??
    conditions.temperatureC ??
    conditions.temperature;
  const weatherRaw = record?.weather ?? conditions.weather;
  const weatherTextRaw =
    weatherRaw && typeof weatherRaw === "object"
      ? (weatherRaw.weatherText ?? weatherRaw.weatherLabel ?? weatherRaw.condition ?? "")
      : weatherRaw;
  const weatherInfoRaw =
    conditions.weatherInfo ??
    conditions.weatherData ??
    conditions.weatherMetrics ??
    record?.weatherInfo ??
    record?.weatherData ??
    record?.weatherMetrics;
  const weatherInfo = normalizeRecordWeatherInfo(weatherInfoRaw, {
    orchardId: record?.orchardId,
    orchardName: record?.orchardName
  });
  const temperatureC = normalizeOptionalNumber(temperatureRaw);
  const weatherText = normalizeText(weatherTextRaw);
  return {
    temperatureC: Number.isFinite(temperatureC)
      ? temperatureC
      : (weatherInfo?.currentTemp ?? weatherInfo?.currentTemperatureC ?? weatherInfo?.tempAvg ?? null),
    weather: weatherText || weatherInfo?.weatherText || weatherInfo?.weatherLabel || "",
    weatherInfo
  };
}

function getRecordTemperatureC(record) {
  const environment = normalizeRecordEnvironment(record);
  const averageTemperature = normalizeOptionalNumber(environment.weatherInfo?.tempAvg);
  if (Number.isFinite(averageTemperature)) return averageTemperature;
  return environment.temperatureC;
}

function getDegreeDayBaseTemperature(settings = companySettings) {
  const normalized = normalizeCompanySettings(settings || companySettings);
  return Number(normalized.degreeDayBaseTemperatureC);
}

function calculateDegreeDay(averageTemperatureC, baseTemperatureC = getDegreeDayBaseTemperature()) {
  const average = normalizeOptionalNumber(averageTemperatureC);
  const base = normalizeOptionalNumber(baseTemperatureC);
  if (!Number.isFinite(average) || !Number.isFinite(base)) return 0;
  return Math.max(0, average - base);
}

function getDailyTemperatureStats(sourceRecords = records) {
  const byDate = new Map();
  sourceRecords.forEach((record) => {
    const workDate = normalizeText(record?.workDate);
    if (!workDate) return;
    const temperatureC = getRecordTemperatureC(record);
    if (!Number.isFinite(temperatureC)) return;
    const current = byDate.get(workDate) || { workDate, count: 0, sumTemperatureC: 0 };
    current.count += 1;
    current.sumTemperatureC += temperatureC;
    byDate.set(workDate, current);
  });
  return Array.from(byDate.values())
    .map((item) => ({
      workDate: item.workDate,
      count: item.count,
      averageTemperatureC: item.count ? Number((item.sumTemperatureC / item.count).toFixed(2)) : null
    }))
    .sort((a, b) => a.workDate.localeCompare(b.workDate));
}

function getMonthlyTemperatureStats(sourceRecords = records) {
  const byMonth = new Map();
  sourceRecords.forEach((record) => {
    const workDate = normalizeText(record?.workDate);
    if (!workDate || !workDate.includes("-")) return;
    const monthKey = workDate.slice(0, 7);
    const temperatureC = getRecordTemperatureC(record);
    if (!Number.isFinite(temperatureC)) return;
    const current = byMonth.get(monthKey) || { month: monthKey, count: 0, sumTemperatureC: 0 };
    current.count += 1;
    current.sumTemperatureC += temperatureC;
    byMonth.set(monthKey, current);
  });
  return Array.from(byMonth.values())
    .map((item) => ({
      month: item.month,
      count: item.count,
      averageTemperatureC: item.count ? Number((item.sumTemperatureC / item.count).toFixed(2)) : null
    }))
    .sort((a, b) => a.month.localeCompare(b.month));
}

function getDailyDegreeDayStats(sourceRecords = records, baseTemperatureC = getDegreeDayBaseTemperature()) {
  return getDailyTemperatureStats(sourceRecords).map((item) => ({
    ...item,
    degreeDay: Number(calculateDegreeDay(item.averageTemperatureC, baseTemperatureC).toFixed(2))
  }));
}

function getMonthlyDegreeDayStats(sourceRecords = records, baseTemperatureC = getDegreeDayBaseTemperature()) {
  const byMonth = new Map();
  getDailyDegreeDayStats(sourceRecords, baseTemperatureC).forEach((item) => {
    if (!item.workDate || !item.workDate.includes("-")) return;
    const monthKey = item.workDate.slice(0, 7);
    const current = byMonth.get(monthKey) || { month: monthKey, degreeDay: 0 };
    current.degreeDay += Number(item.degreeDay || 0);
    byMonth.set(monthKey, current);
  });
  return Array.from(byMonth.values())
    .map((item) => ({ month: item.month, degreeDay: Number(item.degreeDay.toFixed(2)) }))
    .sort((a, b) => a.month.localeCompare(b.month));
}

function getTemperatureAnalyticsSnapshot(sourceRecords = records, settings = companySettings) {
  const baseTemperatureC = getDegreeDayBaseTemperature(settings);
  const dailyAverage = getDailyTemperatureStats(sourceRecords);
  const monthlyAverage = getMonthlyTemperatureStats(sourceRecords);
  const dailyDegreeDays = getDailyDegreeDayStats(sourceRecords, baseTemperatureC);
  const monthlyDegreeDays = getMonthlyDegreeDayStats(sourceRecords, baseTemperatureC);
  const totalDegreeDays = Number(
    dailyDegreeDays.reduce((sum, item) => sum + Number(item.degreeDay || 0), 0).toFixed(2)
  );
  return {
    baseTemperatureC,
    dailyAverage,
    monthlyAverage,
    dailyDegreeDays,
    monthlyDegreeDays,
    totalDegreeDays
  };
}

function normalizeCompanySettings(settings) {
  const month = Number(settings?.fiscalClosingMonth ?? defaultCompanySettings.fiscalClosingMonth);
  const day = Number(settings?.fiscalClosingDay ?? defaultCompanySettings.fiscalClosingDay);
  const baseTemperature = normalizeOptionalNumber(
    settings?.degreeDayBaseTemperatureC ?? settings?.baseTemperatureC ?? defaultCompanySettings.degreeDayBaseTemperatureC
  );
  const startTime = normalizeTimeText(settings?.workdayStartTime, defaultCompanySettings.workdayStartTime);
  const endTime = normalizeTimeText(settings?.workdayEndTime, defaultCompanySettings.workdayEndTime);
  const breakMinutesRaw = Number(settings?.workdayBreakMinutes ?? defaultCompanySettings.workdayBreakMinutes);
  const timeUnitRaw = Number(settings?.payrollTimeUnitMinutes ?? defaultCompanySettings.payrollTimeUnitMinutes);
  const normalizedBaseTemperature = Number.isFinite(baseTemperature)
    ? Math.min(60, Math.max(-30, Number(baseTemperature)))
    : defaultCompanySettings.degreeDayBaseTemperatureC;
  const normalizedBreakMinutes = Number.isFinite(breakMinutesRaw)
    ? Math.min(300, Math.max(0, Math.round(breakMinutesRaw)))
    : defaultCompanySettings.workdayBreakMinutes;
  const normalizedTimeUnitMinutes = [15, 30].includes(timeUnitRaw) ? timeUnitRaw : defaultCompanySettings.payrollTimeUnitMinutes;
  const startMinutes = parseTimeToMinutes(startTime);
  const endMinutes = parseTimeToMinutes(endTime);
  const normalizedStartTime = startMinutes !== null ? startTime : defaultCompanySettings.workdayStartTime;
  const normalizedEndTime = endMinutes !== null && startMinutes !== null && endMinutes > startMinutes
    ? endTime
    : defaultCompanySettings.workdayEndTime;
  return {
    fiscalClosingMonth: Number.isFinite(month) ? Math.min(12, Math.max(1, Math.trunc(month))) : defaultCompanySettings.fiscalClosingMonth,
    fiscalClosingDay: Number.isFinite(day) ? Math.min(31, Math.max(1, Math.trunc(day))) : defaultCompanySettings.fiscalClosingDay,
    degreeDayBaseTemperatureC: normalizedBaseTemperature,
    workdayStartTime: normalizedStartTime,
    workdayEndTime: normalizedEndTime,
    workdayBreakMinutes: normalizedBreakMinutes,
    payrollTimeUnitMinutes: normalizedTimeUnitMinutes
  };
}

function normalizeMasterItems(items, mapper) {
  return Array.isArray(items) ? items.map(mapper).filter(Boolean) : [];
}

function normalizePayrollCloseType(value) {
  const normalized = normalizeText(value);
  return ["monthly", "half-first", "half-second", "custom"].includes(normalized) ? normalized : "monthly";
}

function buildPayrollAdjustmentKey(workerId, closeType, from, to) {
  return [normalizeText(workerId), normalizePayrollCloseType(closeType), normalizeText(from), normalizeText(to)].join("|");
}

function normalizePayrollAdjustment(adjustment, index) {
  const workerId = normalizeText(adjustment?.workerId);
  const periodFrom = normalizeText(adjustment?.periodFrom || adjustment?.from);
  const periodTo = normalizeText(adjustment?.periodTo || adjustment?.to);
  if (!workerId || !periodFrom || !periodTo) {
    return null;
  }
  const closeType = normalizePayrollCloseType(adjustment?.closeType || adjustment?.periodType);
  const allowance = Number(adjustment?.allowance ?? 0);
  const deduction = Number(adjustment?.deduction ?? 0);
  const key = buildPayrollAdjustmentKey(workerId, closeType, periodFrom, periodTo);
  return {
    id: String(adjustment?.id || `payroll-adjustment-${index + 1}`),
    key,
    workerId,
    closeType,
    periodFrom,
    periodTo,
    allowance: Number.isFinite(allowance) ? allowance : 0,
    deduction: Number.isFinite(deduction) ? deduction : 0,
    updatedAt: String(adjustment?.updatedAt || new Date().toISOString())
  };
}

function normalizeWorker(worker, index) {
  const fullName = normalizeText(worker.fullName || worker.name || worker.workerName);
  const displayName = normalizeText(worker.displayName || fullName);
  const category = ["家旁E, "社員", "パ�EチE, "そ�E仁E].includes(worker.category) ? worker.category : "そ�E仁E;
  const hourlyRate = Number(worker.hourlyRate ?? worker.rate ?? 0);
  if (!fullName || !displayName) {
    return null;
  }
  return {
    id: String(worker.id || `worker-${index + 1}`),
    fullName,
    displayName,
    primaryGroupId: normalizeText(worker.primaryGroupId || worker.groupId),
    category,
    hourlyRate: Number.isFinite(hourlyRate) ? hourlyRate : 0,
    isActive: normalizeBoolean(worker.isActive, true)
  };
}

function normalizeGroup(group, index) {
  const name = normalizeText(group.name || group.groupName);
  if (!name) {
    return null;
  }
  const sortOrder = Number(group.sortOrder ?? group.displayOrder ?? index + 1);
  return {
    id: String(group.id || `group-${index + 1}`),
    name,
    sortOrder: Number.isFinite(sortOrder) ? sortOrder : index + 1,
    description: normalizeText(group.description || group.note),
    isActive: normalizeBoolean(group.isActive, true)
  };
}

function normalizeMembership(membership, index) {
  const workerId = normalizeText(membership.workerId);
  const groupId = normalizeText(membership.groupId);
  if (!workerId || !groupId) {
    return null;
  }
  return {
    id: String(membership.id || `membership-${index + 1}`),
    workerId,
    groupId,
    isPrimary: normalizeBoolean(membership.isPrimary, false)
  };
}

function normalizeTeamSet(teamSet, index) {
  const name = normalizeText(teamSet.name || teamSet.setName);
  const groupId = normalizeText(teamSet.groupId);
  const workerIds = Array.isArray(teamSet.workerIds) ? teamSet.workerIds.map((id) => normalizeText(id)).filter(Boolean) : [];
  if (!name || !groupId) {
    return null;
  }
  return {
    id: String(teamSet.id || `team-set-${index + 1}`),
    name,
    groupId,
    workerIds
  };
}

function normalizeTeamPlan(plan, index) {
  const workDate = normalizeText(plan.workDate);
  const groupId = normalizeText(plan.groupId);
  const workerIds = Array.isArray(plan.workerIds) ? plan.workerIds.map((id) => normalizeText(id)).filter(Boolean) : [];
  if (!workDate || !groupId) {
    return null;
  }
  return {
    id: String(plan.id || `team-plan-${index + 1}`),
    workDate,
    groupId,
    fixedTeamSetId: normalizeText(plan.fixedTeamSetId),
    fixedTeamSetName: normalizeText(plan.fixedTeamSetName || plan.teamSetName),
    workerIds,
    updatedAt: String(plan.updatedAt || new Date().toISOString())
  };
}

function normalizeRecord(record) {
  const assignedWorkers = Array.isArray(record.assignedWorkers)
    ? record.assignedWorkers.map((item) => ({ workerId: normalizeText(item?.workerId || item) })).filter((item) => item.workerId)
    : [];
  const workerId = normalizeText(record.workerId || assignedWorkers[0]?.workerId || "");
  const normalizedAssignedWorkers = workerId && !assignedWorkers.length ? [{ workerId }] : assignedWorkers;
  const normalizedSettings = normalizeCompanySettings(defaultCompanySettings);
  const environment = normalizeRecordEnvironment(record);
  const fieldObservation = normalizeFieldObservation(
    record.fieldObservation ??
    record.observation ??
    record.conditions?.fieldObservation
  );
  const workTypes = getRecordWorkTypes(record);
  const primaryTaskType = workTypes[0] || normalizeText(record.taskType);
  const startTime = getRecordStartTime(record);
  const endTime = getRecordEndTime(record);
  const breakMinutes = getRecordBreakMinutes(record, normalizedSettings);
  const shiftType = inferRecordShiftType(record, normalizedSettings);
  const calculatedWorkHours = calculateHoursFromRange(startTime, endTime, normalizedSettings, breakMinutes);
  const manualWorkHours = normalizeManualHours(
    record.manualWorkHours ?? record.manualHours,
    normalizedSettings
  );
  const resolvedWorkHours = getRecordResolvedWorkHours(record, normalizedSettings);
  const rawWorkerTimeDetails = record?.workerTimeDetails && typeof record.workerTimeDetails === "object"
    ? record.workerTimeDetails
    : {};
  const workerTimeFallback = {
    workType: shiftType,
    shiftType,
    startTime,
    endTime,
    breakMinutes,
    payrollHours: resolvedWorkHours,
    workHours: resolvedWorkHours
  };
  const workerTimeDetails = normalizedAssignedWorkers.reduce((acc, item) => {
    const detail = normalizeWorkerTimeDetailEntry(
      rawWorkerTimeDetails[item.workerId] || {},
      workerTimeFallback,
      normalizedSettings
    );
    acc[item.workerId] = detail;
    return acc;
  }, {});
  return {
    id: String(record.id || createId("record")),
    workDate: String(record.workDate || today),
    orchardId: normalizeText(record.orchardId),
    orchardName: normalizeText(record.orchardName || record.fieldName),
    plotId: normalizeText(record.plotId),
    plotName: normalizeText(record.plotName),
    varietyId: normalizeText(record.varietyId),
    varietyName: normalizeText(record.varietyName || record.variety),
    taskType: primaryTaskType,
    workTypes,
    workHours: resolvedWorkHours,
    payrollHours: resolvedWorkHours,
    manualWorkHours,
    manualHours: manualWorkHours,
    calculatedWorkHours: Number.isFinite(calculatedWorkHours) ? calculatedWorkHours : null,
    breakMinutes,
    timeBreakMinutes: breakMinutes,
    nonCountedMinutes: breakMinutes,
    nonWorkingMinutes: breakMinutes,
    shiftType,
    workShiftType: shiftType,
    dailyGroupId: normalizeText(record.dailyGroupId || record.groupId),
    dailyGroupName: normalizeText(record.dailyGroupName || record.groupName),
    fixedTeamSetId: normalizeText(record.fixedTeamSetId),
    fixedTeamSetName: normalizeText(record.fixedTeamSetName || record.teamSetName),
    workerCount: Number(record.workerCount || normalizedAssignedWorkers.length || 0),
    workerId,
    assignedWorkers: normalizedAssignedWorkers,
    workerIds: normalizedAssignedWorkers.map((item) => item.workerId),
    workerName: normalizeText(record.workerName),
    workerNames: Array.isArray(record.workerNames) ? record.workerNames.map((item) => normalizeText(item)).filter(Boolean) : [],
    workerDisplayName: normalizeText(record.workerDisplayName),
    workerCategory: normalizeText(record.workerCategory),
    workerHourlyRate: Number(record.workerHourlyRate || 0),
    timeStart: startTime,
    timeEnd: endTime,
    startTime,
    endTime,
    workerTimeDetails,
    temperatureC: environment.temperatureC,
    weather: environment.weather,
    weatherData: environment.weatherInfo,
    weatherMetrics: environment.weatherInfo,
    weatherInfo: environment.weatherInfo,
    fieldObservation,
    conditions: {
      temperatureC: environment.temperatureC,
      weather: environment.weather,
      weatherData: environment.weatherInfo,
      weatherInfo: environment.weatherInfo,
      fieldObservation
    },
    materials: normalizeText(record.materials),
    notes: normalizeText(record.notes),
    updatedAt: String(record.updatedAt || new Date().toISOString())
  };
}

function normalizeState(rawState) {
  return {
    companySettings: normalizeCompanySettings(rawState?.companySettings),
    masters: {
      orchards: normalizeMasterItems(rawState?.masters?.orchards, (item, index) => {
        const name = normalizeText(item.name);
        return name
          ? {
              id: String(item.id || `orchard-${index + 1}`),
              name,
              managementCode: normalizeManagementCode(item.managementCode),
              latitude: normalizeLatitude(item.latitude),
              longitude: normalizeLongitude(item.longitude),
              note: normalizeText(item.note)
            }
          : null;
      }),
      plots: normalizeMasterItems(rawState?.masters?.plots, (item, index) => {
        const name = normalizeText(item.name);
        return name
          ? {
              id: String(item.id || `plot-${index + 1}`),
              orchardId: normalizeText(item.orchardId),
              name,
              managementCode: normalizeManagementCode(item.managementCode),
              note: normalizeText(item.note)
            }
          : null;
      }),
      varieties: normalizeMasterItems(rawState?.masters?.varieties, (item, index) => {
        const name = normalizeText(item.name);
        return name ? { id: String(item.id || `variety-${index + 1}`), name, note: normalizeText(item.note) } : null;
      }),
      groups: normalizeMasterItems(rawState?.masters?.groups, normalizeGroup),
      workers: normalizeMasterItems(rawState?.masters?.workers, normalizeWorker),
      workerGroupMemberships: normalizeMasterItems(rawState?.masters?.workerGroupMemberships, normalizeMembership),
      fixedTeamSets: normalizeMasterItems(rawState?.masters?.fixedTeamSets, normalizeTeamSet)
    },
    records: Array.isArray(rawState?.records) ? rawState.records.map(normalizeRecord) : [],
    teamPlans: normalizeMasterItems(rawState?.teamPlans, normalizeTeamPlan),
    payrollAdjustments: normalizeMasterItems(rawState?.payrollAdjustments, normalizePayrollAdjustment)
  };
}

function createSeedState() {
  return normalizeState({
    companySettings: structuredClone(defaultCompanySettings),
    masters: structuredClone(sampleMasters),
    records: structuredClone(sampleRecords),
    teamPlans: structuredClone(sampleTeamPlans)
  });
}

function hydrateWorkerRelations(normalizedState) {
  const groups = normalizedState.masters.groups.length ? normalizedState.masters.groups : structuredClone(sampleMasters.groups);
  let memberships = normalizedState.masters.workerGroupMemberships.slice();
  let fixedTeamSets = normalizedState.masters.fixedTeamSets.slice();

  if (!memberships.length) {
    memberships = normalizedState.masters.workers
      .filter((worker) => worker.primaryGroupId)
      .map((worker) => ({
        id: createId("membership"),
        workerId: worker.id,
        groupId: worker.primaryGroupId,
        isPrimary: true
      }));
  }

  normalizedState.masters.groups = groups;
  normalizedState.masters.workerGroupMemberships = memberships;
  fixedTeamSets = fixedTeamSets
    .map((set) => ({
      ...set,
      workerIds: set.workerIds.filter((workerId) => normalizedState.masters.workers.some((worker) => worker.id === workerId))
    }))
    .filter((set) => groups.some((group) => group.id === set.groupId));
  normalizedState.masters.fixedTeamSets = fixedTeamSets;
  normalizedState.masters.workers = normalizedState.masters.workers.map((worker) => {
    const workerMemberships = memberships.filter((membership) => membership.workerId === worker.id);
    const primaryMembership = workerMemberships.find((membership) => membership.isPrimary) || workerMemberships[0];
    return {
      ...worker,
      primaryGroupId: worker.primaryGroupId || primaryMembership?.groupId || ""
    };
  });

  normalizedState.records = normalizedState.records.map((record) => {
    const primaryWorker = normalizedState.masters.workers.find((worker) => worker.id === record.workerId);
    const dailyGroup = groups.find((group) => group.id === record.dailyGroupId);
    const fixedTeamSet = fixedTeamSets.find((set) => set.id === record.fixedTeamSetId);
    return {
      ...record,
      dailyGroupId: record.dailyGroupId || primaryWorker?.primaryGroupId || "",
      dailyGroupName: record.dailyGroupName || dailyGroup?.name || "",
      fixedTeamSetName: record.fixedTeamSetName || fixedTeamSet?.name || "",
      workerIds: record.workerIds.length ? record.workerIds : record.assignedWorkers.map((item) => item.workerId)
    };
  });

  normalizedState.teamPlans = normalizedState.teamPlans.map((plan) => {
    const fixedTeamSet = fixedTeamSets.find((set) => set.id === plan.fixedTeamSetId);
    return {
      ...plan,
      fixedTeamSetName: plan.fixedTeamSetName || fixedTeamSet?.name || "",
      workerIds: plan.workerIds.filter((workerId) => normalizedState.masters.workers.some((worker) => worker.id === workerId))
    };
  });

  return normalizedState;
}

function migrateLegacyRecords(legacyRecords) {
  const orchardMap = new Map();
  const varietyMap = new Map();
  const groupMap = new Map();
  const workerMap = new Map();
  const memberships = [];
  const fallbackGroupName = "未所属グループ";

  groupMap.set(fallbackGroupName, {
    id: createId("group"),
    name: fallbackGroupName,
    sortOrder: 999,
    description: "旧データから移行",
    isActive: true
  });

  const migratedRecords = legacyRecords.map((record) => {
    const orchardName = normalizeText(record.fieldName) || "移行済み園地";
    const varietyName = normalizeText(record.variety);
    const workerName = normalizeText(record.workerName) || "未登録作業者";

    if (!orchardMap.has(orchardName)) {
      orchardMap.set(orchardName, { id: createId("orchard"), name: orchardName, note: "旧データから移行" });
    }
    if (varietyName && !varietyMap.has(varietyName)) {
      varietyMap.set(varietyName, { id: createId("variety"), name: varietyName, note: "旧データから移行" });
    }
    if (!workerMap.has(workerName)) {
      const worker = {
        id: createId("worker"),
        fullName: workerName,
        displayName: workerName,
        primaryGroupId: groupMap.get(fallbackGroupName).id,
        category: "その他",
        hourlyRate: 0,
        isActive: true
      };
      workerMap.set(workerName, worker);
      memberships.push({
        id: createId("membership"),
        workerId: worker.id,
        groupId: worker.primaryGroupId,
        isPrimary: true
      });
    }

    const orchard = orchardMap.get(orchardName);
    const variety = varietyName ? varietyMap.get(varietyName) : null;
    const group = groupMap.get(fallbackGroupName);
    const worker = workerMap.get(workerName);

    return normalizeRecord({
      ...record,
      orchardId: orchard.id,
      orchardName,
      plotId: "",
      plotName: "",
      varietyId: variety ? variety.id : "",
      varietyName,
      dailyGroupId: group.id,
      dailyGroupName: group.name,
      workerId: worker.id,
      workerName: worker.fullName,
      workerNames: [worker.displayName],
      workerDisplayName: worker.displayName,
      workerCategory: worker.category,
      workerHourlyRate: worker.hourlyRate,
      assignedWorkers: [{ workerId: worker.id }]
    });
  });

  return hydrateWorkerRelations(normalizeState({
    masters: {
      orchards: Array.from(orchardMap.values()),
      plots: [],
      varieties: Array.from(varietyMap.values()),
      groups: Array.from(groupMap.values()),
      workers: Array.from(workerMap.values()),
      workerGroupMemberships: memberships
    },
    records: migratedRecords
  }));
}

function migratePreviousState(rawState) {
  return hydrateWorkerRelations(normalizeState(rawState));
}

function loadState() {
  try {
    const currentValue = localStorage.getItem(APP_STORAGE_KEY);
    if (currentValue) {
      return hydrateWorkerRelations(normalizeState(JSON.parse(currentValue)));
    }
    const previousValue = localStorage.getItem(PREVIOUS_STATE_KEY);
    if (previousValue) {
      const migrated = migratePreviousState(JSON.parse(previousValue));
      localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(migrated));
      return migrated;
    }
    const legacyValue = localStorage.getItem(LEGACY_RECORD_KEY);
    if (legacyValue) {
      const migrated = migrateLegacyRecords(JSON.parse(legacyValue));
      localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(migrated));
      return migrated;
    }
    const initialState = hydrateWorkerRelations(createSeedState());
    localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(initialState));
    return initialState;
  } catch (error) {
    console.error("保存データの読み込みに失敗しました", error);
    return hydrateWorkerRelations(createSeedState());
  }
}

function saveState() {
  state = { companySettings, masters, records, teamPlans, payrollAdjustments };
  localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(state));
}

function getStateCounts(targetState) {
  const targetMasters = targetState?.masters || {};
  return {
    orchards: Array.isArray(targetMasters.orchards) ? targetMasters.orchards.length : 0,
    plots: Array.isArray(targetMasters.plots) ? targetMasters.plots.length : 0,
    varieties: Array.isArray(targetMasters.varieties) ? targetMasters.varieties.length : 0,
    workers: Array.isArray(targetMasters.workers) ? targetMasters.workers.length : 0,
    groups: Array.isArray(targetMasters.groups) ? targetMasters.groups.length : 0,
    teamPlans: Array.isArray(targetState?.teamPlans) ? targetState.teamPlans.length : 0,
    records: Array.isArray(targetState?.records) ? targetState.records.length : 0
  };
}

function formatCountsSummary(counts) {
  return [
    `園地数: ${counts.orchards}件`,
    `区画数: ${counts.plots}件`,
    `品種数: ${counts.varieties}件`,
    `作業老E��: ${counts.workers}件`,
    `グループ数: ${counts.groups}件`,
    `日別チ�Eム編成数: ${counts.teamPlans}件`,
    `作業記録数: ${counts.records}件`
  ].join("\n");
}

function renderBackupSummary(counts) {
  backupOrchardCount.textContent = `${counts.orchards}件`;
  backupPlotCount.textContent = `${counts.plots}件`;
  backupVarietyCount.textContent = `${counts.varieties}件`;
  backupWorkerCount.textContent = `${counts.workers}件`;
  backupGroupCount.textContent = `${counts.groups}件`;
  backupTeamPlanCount.textContent = `${counts.teamPlans}件`;
  backupRecordCount.textContent = `${counts.records}件`;
}

function setBackupMessage(text) {
  backupMessage.textContent = text;
}

/*
/*
function updateBackupTimestamp(value) {
  if (!value) {
    backupTimestamp.textContent = "未実衁E;
    // marker removed
    window.alert("CSV出力できる作業記録がありません、E);
    return;
  }
  backupTimestamp.textContent = new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}
*/

/*
function updateBackupTimestamp(value) {
  if (!value) {
    backupTimestamp.textContent = "未実衁E;
    return;
  }
  backupTimestamp.textContent = new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}
*/

function updateBackupTimestamp(value) {
  if (!value) {
    backupTimestamp.textContent = "\u672a\u5b9f\u884c";
    return;
  }
  backupTimestamp.textContent = new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}

function mergeItemsById(currentItems, incomingItems) {
  const map = new Map(currentItems.map((item) => [item.id, item]));
  incomingItems.forEach((item) => {
    map.set(item.id, item);
  });
  return Array.from(map.values());
}

function mergePayrollAdjustmentsByKey(currentItems, incomingItems) {
  const mergedMap = new Map();
  [...(currentItems || []), ...(incomingItems || [])]
    .map((item, index) => normalizePayrollAdjustment(item, index))
    .filter(Boolean)
    .forEach((item) => {
      mergedMap.set(item.key, item);
    });
  return Array.from(mergedMap.values());
}

function mergeStateForAppend(currentState, incomingState) {
  return {
    companySettings: normalizeCompanySettings(incomingState.companySettings || currentState.companySettings),
    masters: {
      orchards: mergeItemsById(currentState.masters.orchards, incomingState.masters.orchards),
      plots: mergeItemsById(currentState.masters.plots, incomingState.masters.plots),
      varieties: mergeItemsById(currentState.masters.varieties, incomingState.masters.varieties),
      groups: mergeItemsById(currentState.masters.groups, incomingState.masters.groups),
      workers: mergeItemsById(currentState.masters.workers, incomingState.masters.workers),
      workerGroupMemberships: mergeItemsById(currentState.masters.workerGroupMemberships, incomingState.masters.workerGroupMemberships),
      fixedTeamSets: mergeItemsById(currentState.masters.fixedTeamSets || [], incomingState.masters.fixedTeamSets || [])
    },
    records: mergeItemsById(currentState.records, incomingState.records),
    teamPlans: mergeItemsById(currentState.teamPlans || [], incomingState.teamPlans || []),
    payrollAdjustments: mergePayrollAdjustmentsByKey(currentState.payrollAdjustments || [], incomingState.payrollAdjustments || [])
  };
}

function parseRestorePayload(payload) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    throw new Error("JSONの形式が不正です。バックアップファイルを確認してください。");
  }
  const hasStateLikeData = Boolean(payload.data) || Boolean(payload.companySettings) || Boolean(payload.masters) || Boolean(payload.records) || Boolean(payload.teamPlans) || Boolean(payload.payrollAdjustments);
  if (!hasStateLikeData) {
    throw new Error("JSONの形式が不正です。必要なデータ項目が見つかりません。");
  }
  const restoredRaw = payload?.data ?? payload;
  const normalized = normalizeState(restoredRaw);
  return hydrateWorkerRelations(normalized);
}

function formatDate(value) {
  if (!value) return "日付未設定";
  return new Intl.DateTimeFormat("ja-JP", { year: "numeric", month: "long", day: "numeric" }).format(new Date(value));
}

function formatDateYmd(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}/${month}/${day}`;
}

const WEEKDAY_LABELS_JA = ["日", "月", "火", "水", "木", "金", "土"];

function getWeekdayLabelJa(dateString) {
  if (!dateString) return "";
  const date = new Date(`${dateString}T00:00:00`);
  if (Number.isNaN(date.getTime())) return "";
  return WEEKDAY_LABELS_JA[date.getDay()] || "";
}

function formatDateWithWeekdayJa(dateString) {
  const ymd = formatDateYmd(dateString);
  if (!ymd) return "";
  const weekday = getWeekdayLabelJa(dateString);
  return weekday ? `${ymd}（${weekday}）` : ymd;
}

function formatHoursQuarter(value) {
  const numeric = Number(value || 0);
  if (!Number.isFinite(numeric)) return "0時間";
  return `${numeric.toFixed(2).replace(/\.?0+$/, "")}時間`;
}

function getComparisonPeriodLabel(mode) {
  if (mode === "month") return "今月";
  if (mode === "fiscal") return "決算年度";
  if (mode === "custom") return "任意期間";
  return "全期間";
}

function formatMonth(value) {
  if (!value) return "未設定";
  const [year, month] = value.split("-");
  return `${year}年${Number(month)}月`;
}

function formatCurrency(value) {
  return `${Number(value || 0).toLocaleString("ja-JP")}円`;
}

function formatHours(value) {
  return `${Number(value || 0).toFixed(1)}時間`;
}

function formatTemperature(value) {
  if (value === null || value === undefined || value === "") return "未入力";
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) return "未入力";
  return `${numericValue.toFixed(1).replace(/\.0$/, "")}℃`;
}

function formatPrecipitationMm(value) {
  if (value === null || value === undefined || value === "") return "未入力";
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) return "未入力";
  return `${numericValue.toFixed(1).replace(/\.0$/, "")}mm`;
}

function formatCoordinate(value) {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) return "未設定";
  return numericValue.toFixed(6).replace(/\.?0+$/, "");
}

function formatWeatherInfoSummary(weatherInfo, includeCurrent = false) {
  const normalized = normalizeRecordWeatherInfo(weatherInfo);
  if (!normalized) return "";
  const parts = [];
  if (includeCurrent && Number.isFinite(normalized.currentTemp)) {
    parts.push(`現在 ${formatTemperature(normalized.currentTemp)}`);
  }
  if (Number.isFinite(normalized.tempAvg)) {
    parts.push(`平均 ${formatTemperature(normalized.tempAvg)}`);
  }
  if (Number.isFinite(normalized.tempMax)) {
    parts.push(`最高 ${formatTemperature(normalized.tempMax)}`);
  }
  if (Number.isFinite(normalized.tempMin)) {
    parts.push(`最低 ${formatTemperature(normalized.tempMin)}`);
  }
  if (Number.isFinite(normalized.precipitation)) {
    parts.push(`降水 ${formatPrecipitationMm(normalized.precipitation)}`);
  }
  if (Number.isFinite(normalized.humidity)) {
    parts.push(`湿度 ${Math.round(normalized.humidity)}%`);
  }
  if (Number.isFinite(normalized.windSpeed)) {
    parts.push(`風速 ${Number(normalized.windSpeed).toFixed(1).replace(/\.0$/, "")}m/s`);
  }
  return parts.join(" / ");
}

function formatFieldObservationSummary(observation) {
  const normalized = normalizeFieldObservation(observation);
  const parts = [];
  if (normalized.diseaseObserved) parts.push("病害あり");
  if (normalized.pestObserved) parts.push("害虫あり");
  if (normalized.sprayApplied) parts.push("散币E��施");
  if (normalized.damageLevel) parts.push(`痁E��/食害: ${normalized.damageLevel}`);
  if (normalized.wetness) parts.push(`濡めE ${normalized.wetness}`);
  if (normalized.muddy) parts.push(`ぬかるみ: ${normalized.muddy}`);
  if (normalized.workDifficulty) parts.push(`作業性: ${normalized.workDifficulty}`);
  if (normalized.memo) parts.push(`現場メモ: ${normalized.memo}`);
  return parts.join(" / ");
}

function formatPersonHours(value) {
  return `${Number(value || 0).toFixed(1)}人時`;
}

function formatCount(value) {
  return `${Number(value || 0)}件`;
}

function formatDays(value) {
  return `${Number(value || 0)}日`;
}

function formatPeople(value) {
  return `${Number(value || 0)}人`;
}

function buildLocationQrPayload(orchardId, plotId = "") {
  return `capple-location:v1:${orchardId}:${plotId}`;
}

function parseLocationQrPayload(rawValue) {
  const value = normalizeText(rawValue);
  if (!value) return null;
  const parts = value.split(":");
  if (parts.length < 3) return null;
  if (parts[0] !== "capple-location" || parts[1] !== "v1") return null;
  const orchardId = normalizeText(parts[2]);
  const plotId = parts.length > 3 ? normalizeText(parts.slice(3).join(":")) : "";
  return orchardId ? { orchardId, plotId } : null;
}

function parseTimeToMinutes(value) {
  if (!value || !value.includes(":")) return null;
  const [hours, minutes] = value.split(":").map(Number);
  if (Number.isNaN(hours) || Number.isNaN(minutes)) return null;
  return hours * 60 + minutes;
}

function formatMinutesToTimeText(totalMinutes) {
  const safeMinutes = Math.max(0, Math.floor(Number(totalMinutes) || 0));
  const hours = Math.floor(safeMinutes / 60);
  const minutes = safeMinutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

function roundMinutesByTimeUnit(minutes, timeUnitMinutes = 30) {
  const normalizedUnit = [15, 30].includes(Number(timeUnitMinutes)) ? Number(timeUnitMinutes) : 30;
  return Math.round(minutes / normalizedUnit) * normalizedUnit;
}

function calculateWorkHoursByRange(startTime, endTime, breakMinutes = 0, timeUnitMinutes = 30) {
  const start = parseTimeToMinutes(startTime);
  const end = parseTimeToMinutes(endTime);
  if (start === null || end === null || end <= start) return null;
  const rawMinutes = Math.max(0, end - start - Math.max(0, Number(breakMinutes || 0)));
  const roundedMinutes = roundMinutesByTimeUnit(rawMinutes, timeUnitMinutes);
  return Number((roundedMinutes / 60).toFixed(2));
}

function calculateBoundHoursByRange(startTime, endTime) {
  const start = parseTimeToMinutes(startTime);
  const end = parseTimeToMinutes(endTime);
  if (start === null || end === null || end <= start) return null;
  return Number(((end - start) / 60).toFixed(2));
}

function getDefaultWorkHours(settings = companySettings) {
  const normalized = normalizeCompanySettings(settings);
  const effectiveTimeUnitMinutes = normalized.payrollTimeUnitMinutes === 30 ? 15 : normalized.payrollTimeUnitMinutes;
  const hours = calculateWorkHoursByRange(
    normalized.workdayStartTime,
    normalized.workdayEndTime,
    normalized.workdayBreakMinutes,
    effectiveTimeUnitMinutes
  );
  return Number.isFinite(hours) ? hours : 8;
}

function normalizeHoursByTimeUnit(hours, settings = companySettings) {
  const numericHours = Number(hours);
  if (!Number.isFinite(numericHours) || numericHours <= 0) return 0;
  const normalized = normalizeCompanySettings(settings);
  const effectiveTimeUnitMinutes = normalized.payrollTimeUnitMinutes === 30 ? 15 : normalized.payrollTimeUnitMinutes;
  const roundedMinutes = roundMinutesByTimeUnit(numericHours * 60, effectiveTimeUnitMinutes);
  return Number((Math.max(0, roundedMinutes) / 60).toFixed(2));
}

function normalizeBreakMinutes(minutes, fallbackMinutes = 0) {
  const numeric = Number(minutes);
  if (!Number.isFinite(numeric)) {
    return Math.max(0, Math.round(Number(fallbackMinutes || 0)));
  }
  return Math.max(0, Math.min(600, Math.round(numeric)));
}

function normalizeManualHours(hours, settings = defaultCompanySettings) {
  const numeric = Number(hours);
  if (!Number.isFinite(numeric) || numeric <= 0) return null;
  return normalizeHoursByTimeUnit(numeric, settings);
}

function calculateHoursFromRange(startTime, endTime, settings = companySettings, breakMinutesOverride = null) {
  const normalized = normalizeCompanySettings(settings);
  const breakMinutes = normalizeBreakMinutes(
    breakMinutesOverride,
    normalized.workdayBreakMinutes
  );
  const effectiveTimeUnitMinutes = normalized.payrollTimeUnitMinutes === 30 ? 15 : normalized.payrollTimeUnitMinutes;
  return calculateWorkHoursByRange(
    startTime,
    endTime,
    breakMinutes,
    effectiveTimeUnitMinutes
  );
}

function normalizeLegacyDurationToHours(durationValue, settings = defaultCompanySettings) {
  const duration = Number(durationValue);
  if (!Number.isFinite(duration) || duration <= 0) return null;
  const normalizedHours = duration > 24 ? duration / 60 : duration;
  if (!Number.isFinite(normalizedHours) || normalizedHours <= 0) return null;
  return normalizeHoursByTimeUnit(normalizedHours, settings);
}

function getRecordStartTime(record) {
  return normalizeTimeText(record?.timeStart || record?.startTime, "");
}

function getRecordEndTime(record) {
  return normalizeTimeText(record?.timeEnd || record?.endTime, "");
}

function getShiftPreset(shiftType, settings = companySettings) {
  const normalizedSettings = normalizeCompanySettings(settings);
  const normalizedShiftType = normalizeShiftType(shiftType, WORK_SHIFT_TYPE.FULL_DAY);
  if (normalizedShiftType === WORK_SHIFT_TYPE.MORNING) {
    return {
      shiftType: WORK_SHIFT_TYPE.MORNING,
      startTime: normalizedSettings.workdayStartTime,
      endTime: MORNING_WORK_END_TIME,
      breakMinutes: HALF_DAY_BREAK_MINUTES
    };
  }
  if (normalizedShiftType === WORK_SHIFT_TYPE.AFTERNOON) {
    return {
      shiftType: WORK_SHIFT_TYPE.AFTERNOON,
      startTime: AFTERNOON_WORK_START_TIME,
      endTime: normalizedSettings.workdayEndTime,
      breakMinutes: HALF_DAY_BREAK_MINUTES
    };
  }
  if (normalizedShiftType === WORK_SHIFT_TYPE.CUSTOM) {
    return {
      shiftType: WORK_SHIFT_TYPE.CUSTOM,
      startTime: "",
      endTime: "",
      breakMinutes: 0
    };
  }
  if (normalizedShiftType === WORK_SHIFT_TYPE.MANUAL) {
    return {
      shiftType: WORK_SHIFT_TYPE.MANUAL,
      startTime: "",
      endTime: "",
      breakMinutes: 0
    };
  }
  return {
    shiftType: WORK_SHIFT_TYPE.FULL_DAY,
    startTime: normalizedSettings.workdayStartTime,
    endTime: normalizedSettings.workdayEndTime,
    breakMinutes: normalizedSettings.workdayBreakMinutes
  };
}

function inferShiftTypeFromTimes(startTime, endTime, settings = companySettings) {
  if (!startTime || !endTime) return WORK_SHIFT_TYPE.CUSTOM;
  const normalizedSettings = normalizeCompanySettings(settings);
  if (
    startTime === normalizedSettings.workdayStartTime
    && endTime === normalizedSettings.workdayEndTime
  ) {
    return WORK_SHIFT_TYPE.FULL_DAY;
  }
  if (
    startTime === normalizedSettings.workdayStartTime
    && endTime === MORNING_WORK_END_TIME
  ) {
    return WORK_SHIFT_TYPE.MORNING;
  }
  if (
    startTime === AFTERNOON_WORK_START_TIME
    && endTime === normalizedSettings.workdayEndTime
  ) {
    return WORK_SHIFT_TYPE.AFTERNOON;
  }
  return WORK_SHIFT_TYPE.CUSTOM;
}

function inferRecordShiftType(record, settings = companySettings) {
  const explicit = normalizeShiftType(
    record?.shiftType ?? record?.workShiftType ?? record?.workSession ?? record?.workPeriod ?? "",
    ""
  );
  if (explicit) return explicit;
  const startTime = getRecordStartTime(record);
  const endTime = getRecordEndTime(record);
  return inferShiftTypeFromTimes(startTime, endTime, settings);
}

function getDefaultBreakMinutesForShiftType(shiftType, settings = companySettings) {
  return getShiftPreset(shiftType, settings).breakMinutes;
}

function getRecordBreakMinutes(record, settings = companySettings) {
  const normalized = normalizeCompanySettings(settings);
  const rawBreakMinutes = record?.breakMinutes ?? record?.timeBreakMinutes ?? record?.nonCountedMinutes ?? record?.nonWorkingMinutes;
  if (rawBreakMinutes !== undefined && rawBreakMinutes !== null && normalizeText(rawBreakMinutes) !== "") {
    return normalizeBreakMinutes(rawBreakMinutes, normalized.workdayBreakMinutes);
  }
  const inferredShiftType = inferRecordShiftType(record, normalized);
  const inferredBreak = getDefaultBreakMinutesForShiftType(inferredShiftType, normalized);
  return normalizeBreakMinutes(
    inferredBreak,
    inferredBreak
  );
}

function getRecordResolvedWorkHours(record, settings = companySettings) {
  const normalizedSettings = normalizeCompanySettings(settings);
  const manualHours = normalizeManualHours(record?.manualWorkHours, normalizedSettings);
  if (manualHours !== null) return manualHours;

  const startTime = getRecordStartTime(record);
  const endTime = getRecordEndTime(record);
  const breakMinutes = getRecordBreakMinutes(record, normalizedSettings);
  const calculatedFromTimes = calculateHoursFromRange(startTime, endTime, normalizedSettings, breakMinutes);
  if (Number.isFinite(calculatedFromTimes)) return calculatedFromTimes;

  const payrollHours = normalizeManualHours(record?.payrollHours, normalizedSettings);
  if (payrollHours !== null) return payrollHours;

  const explicitHours = normalizeManualHours(record?.workHours, normalizedSettings);
  if (explicitHours !== null) return explicitHours;

  const storedCalculatedHours = normalizeManualHours(record?.calculatedWorkHours, normalizedSettings);
  if (storedCalculatedHours !== null) return storedCalculatedHours;

  const legacyDurationHours = normalizeLegacyDurationToHours(
    record?.duration ?? record?.workDurationMinutes ?? record?.durationMinutes ?? record?.durationHours,
    normalizedSettings
  );
  if (legacyDurationHours !== null) return legacyDurationHours;

  const rawWorkerTimeDetails = record?.workerTimeDetails && typeof record.workerTimeDetails === "object"
    ? Object.values(record.workerTimeDetails)
    : [];
  if (rawWorkerTimeDetails.length) {
    const detailHours = rawWorkerTimeDetails
      .map((entry) => {
        const manual = normalizeManualHours(entry?.manualHours ?? entry?.manualWorkHours, normalizedSettings);
        if (manual !== null) return manual;
        return normalizeManualHours(
          entry?.payrollHours ?? entry?.workHours ?? entry?.resolvedHours ?? entry?.calculatedHours,
          normalizedSettings
        );
      })
      .filter((value) => Number.isFinite(value) && value > 0);
    if (detailHours.length) {
      return Number(Math.max(...detailHours).toFixed(2));
    }
  }

  return getDefaultWorkHours(normalizedSettings);
}

function normalizeWorkerTimeDetailEntry(rawDetail, fallbackDetail, settings = companySettings) {
  const normalizedSettings = normalizeCompanySettings(settings);
  const fallback = fallbackDetail || {};
  const workType = normalizeShiftType(
    rawDetail?.workType ?? rawDetail?.shiftType ?? fallback.workType ?? fallback.shiftType ?? "",
    WORK_SHIFT_TYPE.CUSTOM
  );
  const preset = getShiftPreset(workType, normalizedSettings);

  const startTime = normalizeTimeText(
    rawDetail?.startTime || rawDetail?.timeStart,
    fallback.startTime || preset.startTime || ""
  );
  const endTime = normalizeTimeText(
    rawDetail?.endTime || rawDetail?.timeEnd,
    fallback.endTime || preset.endTime || ""
  );
  const breakMinutes = normalizeBreakMinutes(
    rawDetail?.breakMinutes ?? rawDetail?.timeBreakMinutes,
    fallback.breakMinutes ?? preset.breakMinutes ?? normalizedSettings.workdayBreakMinutes
  );
  const calculatedHoursRaw = calculateHoursFromRange(startTime, endTime, normalizedSettings, breakMinutes);
  const calculatedHours = Number.isFinite(calculatedHoursRaw)
    ? calculatedHoursRaw
    : (workType === WORK_SHIFT_TYPE.MANUAL ? null : null);
  const manualHours = normalizeManualHours(
    rawDetail?.manualHours ?? rawDetail?.manualWorkHours,
    normalizedSettings
  );
  const explicitPayrollHours = normalizeManualHours(rawDetail?.payrollHours, normalizedSettings);
  const fallbackResolvedHours = normalizeManualHours(
    fallback.payrollHours ?? fallback.workHours ?? fallback.resolvedHours,
    normalizedSettings
  );
  const payrollHours = manualHours !== null
    ? manualHours
    : (Number.isFinite(calculatedHours) ? calculatedHours : (explicitPayrollHours ?? fallbackResolvedHours ?? null));
  const resolvedHours = payrollHours;

  return {
    workType,
    shiftType: workType,
    startTime,
    endTime,
    breakMinutes,
    calculatedHours: Number.isFinite(calculatedHours) ? calculatedHours : null,
    manualHours,
    manualWorkHours: manualHours,
    payrollHours,
    workHours: resolvedHours,
    resolvedHours: payrollHours
  };
}

function getRecordWorkerTimeDetails(record, settings = companySettings) {
  const normalizedSettings = normalizeCompanySettings(settings);
  const assignedWorkers = getAssignedWorkers(record);
  if (!assignedWorkers.length) return {};
  const rawDetails = record?.workerTimeDetails && typeof record.workerTimeDetails === "object"
    ? record.workerTimeDetails
    : {};
  const commonFallback = {
    workType: inferRecordShiftType(record, normalizedSettings),
    shiftType: inferRecordShiftType(record, normalizedSettings),
    startTime: getRecordStartTime(record),
    endTime: getRecordEndTime(record),
    breakMinutes: getRecordBreakMinutes(record, normalizedSettings),
    payrollHours: getRecordResolvedWorkHours(record, normalizedSettings),
    workHours: getRecordResolvedWorkHours(record, normalizedSettings)
  };

  return assignedWorkers.reduce((acc, worker) => {
    const rawDetail = rawDetails?.[worker.id] || {};
    acc[worker.id] = normalizeWorkerTimeDetailEntry(rawDetail, commonFallback, normalizedSettings);
    return acc;
  }, {});
}

function getWorkerHoursForRecord(record, workerId, settings = companySettings) {
  if (!workerId) return getRecordResolvedWorkHours(record, settings);
  const detail = getRecordWorkerTimeDetails(record, settings)?.[workerId];
  if (!detail) return getRecordResolvedWorkHours(record, settings);
  if (Number.isFinite(detail.payrollHours)) return detail.payrollHours;
  if (Number.isFinite(detail.manualHours)) return detail.manualHours;
  if (Number.isFinite(detail.calculatedHours)) return detail.calculatedHours;
  if (Number.isFinite(detail.resolvedHours)) return detail.resolvedHours;
  return getRecordResolvedWorkHours(record, settings);
}

function applyDefaultWorkScheduleToForm(force = false, options = {}) {
  const normalized = normalizeCompanySettings(companySettings);
  const requestedShiftType = normalizeShiftType(
    options.shiftType ?? workShiftTypeInput?.value,
    WORK_SHIFT_TYPE.FULL_DAY
  );
  const preset = getShiftPreset(requestedShiftType, normalized);

  if (workShiftTypeInput && (force || !normalizeText(workShiftTypeInput.value))) {
    workShiftTypeInput.value = requestedShiftType;
  }

  if (requestedShiftType === WORK_SHIFT_TYPE.CUSTOM || requestedShiftType === WORK_SHIFT_TYPE.MANUAL) {
    if (startTimeInput && force) {
      startTimeInput.value = "";
    }
    if (endTimeInput && force) {
      endTimeInput.value = "";
    }
    if (breakMinutesInput && (force || !normalizeText(breakMinutesInput.value))) {
      breakMinutesInput.value = "0";
    }
    return;
  }

  if (startTimeInput && (force || !startTimeInput.value)) {
    startTimeInput.value = preset.startTime;
  }
  if (endTimeInput && (force || !endTimeInput.value)) {
    endTimeInput.value = preset.endTime;
  }
  if (breakMinutesInput && (force || !normalizeText(breakMinutesInput.value))) {
    breakMinutesInput.value = String(preset.breakMinutes);
  }
}

function applyShiftPresetToForm(shiftType, force = true) {
  const normalizedShiftType = normalizeShiftType(shiftType, WORK_SHIFT_TYPE.FULL_DAY);
  if (workShiftTypeInput) {
    workShiftTypeInput.value = normalizedShiftType;
  }
  applyDefaultWorkScheduleToForm(force, { shiftType: normalizedShiftType });
}

function buildEmptyState(message) {
  const empty = document.createElement("div");
  empty.className = "empty-state";
  empty.textContent = message;
  return empty;
}

function createOption(value, label) {
  const option = document.createElement("option");
  option.value = value;
  option.textContent = label;
  return option;
}

function sortGroups(items) {
  return [...items].sort((a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name, "ja"));
}

function getOrchardById(id) {
  return masters.orchards.find((item) => item.id === id) || null;
}

function getPlotById(id) {
  return masters.plots.find((item) => item.id === id) || null;
}

function getVarietyById(id) {
  return masters.varieties.find((item) => item.id === id) || null;
}

function getWeatherLabelFromCode(weatherCode) {
  if (!Number.isFinite(weatherCode)) return "";
  const snowCodes = new Set([71, 73, 75, 77, 85, 86]);
  const rainCodes = new Set([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99]);
  if (snowCodes.has(weatherCode)) return "雪";
  if (rainCodes.has(weatherCode)) return "雨";
  if (weatherCode === 0) return "晴れ";
  return "くもり";
}

function setWeatherFetchStatus(message = WEATHER_FETCH_HINT_TEXT, state = "") {
  if (!weatherFetchStatus) return;
  weatherFetchStatus.textContent = message;
  if (state) weatherFetchStatus.dataset.state = state;
  else delete weatherFetchStatus.dataset.state;
}

function setWeatherFetchLoading(isLoading) {
  if (!fetchWeatherButton) return;
  fetchWeatherButton.disabled = isLoading;
  fetchWeatherButton.textContent = isLoading ? "取得中…" : WEATHER_FETCH_BUTTON_TEXT;
}

function clearWeatherDetailInputs(options = {}) {
  const keepCurrentTemp = options.keepCurrentTemp === true || options.keepAverage === true;
  const keepWeatherText = options.keepWeatherText === true;
  if (!keepCurrentTemp && temperatureInput) temperatureInput.value = "";
  if (!keepWeatherText && weatherInput) weatherInput.value = "";
  if (weatherTempAvgInput) weatherTempAvgInput.value = "";
  if (weatherTempMaxInput) weatherTempMaxInput.value = "";
  if (weatherTempMinInput) weatherTempMinInput.value = "";
  if (weatherPrecipitationInput) weatherPrecipitationInput.value = "";
  if (weatherHumidityInput) weatherHumidityInput.value = "";
  if (weatherWindSpeedInput) weatherWindSpeedInput.value = "";
  if (weatherCodeInput) weatherCodeInput.value = "";
}

function getWeatherFetchTarget() {
  return {
    locationName: FIXED_WEATHER_SOURCE.locationName,
    latitude: FIXED_WEATHER_SOURCE.latitude,
    longitude: FIXED_WEATHER_SOURCE.longitude
  };
}

async function fetchOpenMeteoWeather({ latitude, longitude, locationName = FIXED_WEATHER_SOURCE.locationName }) {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current: "temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code",
    daily: "temperature_2m_mean,temperature_2m_max,temperature_2m_min,precipitation_sum",
    timezone: "Asia/Tokyo",
    forecast_days: "1",
    wind_speed_unit: "ms"
  });
  const endpoint = `https://api.open-meteo.com/v1/forecast?${params.toString()}`;
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetch(endpoint, { method: "GET", cache: "no-store", signal: controller.signal });
    if (!response.ok) {
      throw new Error(`Open-Meteo API error: ${response.status}`);
    }
    const payload = await response.json();
    const current = payload?.current && typeof payload.current === "object" ? payload.current : {};
    const daily = payload?.daily && typeof payload.daily === "object" ? payload.daily : {};
    const weatherCodeRaw = normalizeOptionalNumber(current.weather_code);
    const weatherCode = Number.isFinite(weatherCodeRaw) ? Math.trunc(weatherCodeRaw) : null;
    const currentTempRaw = normalizeOptionalNumber(current.temperature_2m);
    const tempAvgRaw = Array.isArray(daily.temperature_2m_mean) ? daily.temperature_2m_mean[0] : null;
    const maxTemperatureRaw = Array.isArray(daily.temperature_2m_max) ? daily.temperature_2m_max[0] : null;
    const minTemperatureRaw = Array.isArray(daily.temperature_2m_min) ? daily.temperature_2m_min[0] : null;
    const precipitationRaw = Array.isArray(daily.precipitation_sum) ? daily.precipitation_sum[0] : null;
    const targetDateRaw = Array.isArray(daily.time) ? daily.time[0] : "";
    return normalizeRecordWeatherInfo({
      source: "open-meteo",
      fetchedAt: new Date().toISOString(),
      targetDate: normalizeText(targetDateRaw),
      locationName,
      latitude,
      longitude,
      currentTemp: currentTempRaw,
      tempAvg: normalizeOptionalNumber(tempAvgRaw),
      tempMax: normalizeOptionalNumber(maxTemperatureRaw),
      tempMin: normalizeOptionalNumber(minTemperatureRaw),
      precipitation: normalizeOptionalNumber(precipitationRaw),
      humidity: normalizeOptionalNumber(current.relative_humidity_2m),
      windSpeed: normalizeOptionalNumber(current.wind_speed_10m),
      weatherCode,
      weatherText: getWeatherLabelFromCode(weatherCode)
    });
  } finally {
    window.clearTimeout(timeoutId);
  }
}

function applyFetchedWeatherToForm(weatherInfo) {
  if (!weatherInfo) return;
  if (Number.isFinite(weatherInfo.currentTemp) && temperatureInput) {
    temperatureInput.value = String(Number(weatherInfo.currentTemp.toFixed(1)));
  }
  if (weatherTempAvgInput) weatherTempAvgInput.value = weatherInfo.tempAvg ?? "";
  if (weatherTempMaxInput) weatherTempMaxInput.value = weatherInfo.tempMax ?? "";
  if (weatherTempMinInput) weatherTempMinInput.value = weatherInfo.tempMin ?? "";
  if (weatherPrecipitationInput) weatherPrecipitationInput.value = weatherInfo.precipitation ?? "";
  if (weatherHumidityInput) weatherHumidityInput.value = weatherInfo.humidity ?? "";
  if (weatherWindSpeedInput) weatherWindSpeedInput.value = weatherInfo.windSpeed ?? "";
  if (weatherCodeInput) weatherCodeInput.value = weatherInfo.weatherCode ?? "";
  const mappedWeather = normalizeText(weatherInfo.weatherText);
  if (mappedWeather && weatherInput) {
    weatherInput.value = mappedWeather;
    if (weatherInput.value !== mappedWeather) {
      weatherInput.value = "";
    }
  }
}

async function handleFetchWeatherClick() {
  const weatherTarget = getWeatherFetchTarget();
  setWeatherFetchLoading(true);
  setWeatherFetchStatus("取得中…", "loading");
  try {
    const fetched = await fetchOpenMeteoWeather(weatherTarget);
    if (!fetched || !Number.isFinite(fetched.currentTemp)) {
      throw new Error("Current temperature not available");
    }
    const merged = normalizeRecordWeatherInfo({
      ...(recordWeatherInfo || {}),
      ...fetched,
      locationName: weatherTarget.locationName
    });
    recordWeatherInfo = merged;
    applyFetchedWeatherToForm(merged);
    const summary = formatWeatherInfoSummary(merged, true);
    const locationLabel = merged?.locationName || weatherTarget.locationName;
    setWeatherFetchStatus(summary ? `${locationLabel} 取得完亁E ${summary}` : `${locationLabel}の天気情報を取得しました。`, "success");
  } catch (error) {
    console.error(error);
    setWeatherFetchStatus(`${weatherTarget.locationName}の天気取得に失敗しました。手入力で続けてください。`, "error");
  } finally {
    setWeatherFetchLoading(false);
  }
}

function resolveWeatherInfoForRecord(environment, orchard, manualWeather = {}) {
  const baseInfo = normalizeRecordWeatherInfo(recordWeatherInfo, {
    orchardId: orchard?.id,
    orchardName: orchard?.name,
    locationName: FIXED_WEATHER_SOURCE.locationName
  });
  const manualInfo = normalizeRecordWeatherInfo(manualWeather, {
    orchardId: orchard?.id,
    orchardName: orchard?.name,
    locationName: FIXED_WEATHER_SOURCE.locationName
  });
  if (!baseInfo && !manualInfo && !Number.isFinite(environment.temperatureC) && !environment.weather) return null;
  if (orchard?.id && baseInfo?.orchardId && baseInfo.orchardId !== orchard.id) {
    return manualInfo || normalizeRecordWeatherInfo({
      ...manualWeather,
      currentTemp: Number.isFinite(environment.temperatureC) ? environment.temperatureC : null,
      weatherText: environment.weather,
      locationName: FIXED_WEATHER_SOURCE.locationName
    }, {
      orchardId: orchard?.id,
      orchardName: orchard?.name,
      locationName: FIXED_WEATHER_SOURCE.locationName
    });
  }
  return normalizeRecordWeatherInfo({
    ...(baseInfo || {}),
    ...(manualInfo || {}),
    ...manualWeather,
    orchardId: orchard?.id || baseInfo?.orchardId || "",
    orchardName: orchard?.name || baseInfo?.orchardName || "",
    locationName: manualInfo?.locationName || baseInfo?.locationName || FIXED_WEATHER_SOURCE.locationName,
    currentTemp: Number.isFinite(environment.temperatureC)
      ? environment.temperatureC
      : (manualInfo?.currentTemp ?? baseInfo?.currentTemp ?? baseInfo?.currentTemperatureC ?? null),
    tempAvg: manualInfo?.tempAvg ?? baseInfo?.tempAvg ?? null,
    weatherText: environment.weather || manualInfo?.weatherText || baseInfo?.weatherText || ""
  });
}

function getGroupById(id) {
  return masters.groups.find((item) => item.id === id) || null;
}

function getWorkerById(id) {
  return masters.workers.find((item) => item.id === id) || null;
}

function getTeamSetById(id) {
  return masters.fixedTeamSets.find((item) => item.id === id) || null;
}

function getTeamSetsByGroupId(groupId) {
  return masters.fixedTeamSets.filter((item) => item.groupId === groupId);
}

function getMembershipsByWorkerId(workerId) {
  return masters.workerGroupMemberships.filter((item) => item.workerId === workerId);
}

function getMembershipsByGroupId(groupId) {
  return masters.workerGroupMemberships.filter((item) => item.groupId === groupId);
}

function getWorkerPrimaryGroup(worker) {
  return worker ? getGroupById(worker.primaryGroupId) : null;
}

function getTeamPlan(workDate, groupId) {
  return teamPlans.find((plan) => plan.workDate === workDate && plan.groupId === groupId) || null;
}

function getLatestPreviousTeamPlan(workDate, groupId) {
  return teamPlans
    .filter((plan) => plan.groupId === groupId && plan.workDate < workDate)
    .sort((a, b) => b.workDate.localeCompare(a.workDate) || new Date(b.updatedAt) - new Date(a.updatedAt))[0] || null;
}

function getPrimaryWorker(record) {
  const firstWorkerId = record.workerId || record.assignedWorkers?.[0]?.workerId || "";
  return getWorkerById(firstWorkerId);
}

function getAssignedWorkers(record) {
  const workerIds = Array.isArray(record.assignedWorkers) ? record.assignedWorkers.map((item) => item.workerId).filter(Boolean) : [];
  const uniqueIds = [...new Set(workerIds.length ? workerIds : (record.workerId ? [record.workerId] : []))];
  return uniqueIds.map((workerId) => getWorkerById(workerId)).filter(Boolean);
}

function getRecordMetrics(record) {
  const hours = getRecordResolvedWorkHours(record, companySettings);
  const assignedWorkers = getAssignedWorkers(record);
  const workerTimeDetails = getRecordWorkerTimeDetails(record, companySettings);
  const workerCount = Number(record.workerCount || 0) || assignedWorkers.length || Object.keys(workerTimeDetails).length;
  const personHoursFromDetails = assignedWorkers.reduce((sum, worker) => {
    return sum + Number(getWorkerHoursForRecord(record, worker.id, companySettings) || 0);
  }, 0);
  const additionalWorkerCount = Math.max(0, workerCount - assignedWorkers.length);
  const personHours = personHoursFromDetails > 0
    ? personHoursFromDetails + (additionalWorkerCount * hours)
    : hours * workerCount;
  const laborCostFromDetails = assignedWorkers.reduce((sum, worker) => {
    const workerHours = Number(getWorkerHoursForRecord(record, worker.id, companySettings) || 0);
    const fallbackHours = personHoursFromDetails > 0
      ? workerHours
      : hours;
    return sum + (fallbackHours * Number(worker.hourlyRate || 0));
  }, 0);
  const fallbackHourlyRate = Number(record.workerHourlyRate || 0);
  const laborCost = laborCostFromDetails > 0
    ? laborCostFromDetails + (additionalWorkerCount * hours * fallbackHourlyRate)
    : (hours * fallbackHourlyRate * Math.max(1, workerCount));
  return {
    hours,
    workerCount,
    personHours,
    laborCost
  };
}

function getFiscalYearRange(baseDate = today) {
  {
    const target = new Date(baseDate || today);
    if (Number.isNaN(target.getTime())) {
      return getFiscalYearRange(today);
    }
    const normalizedSettings = normalizeCompanySettings(companySettings);
    const closingMonth = normalizedSettings.fiscalClosingMonth;
    const closingDayBase = normalizedSettings.fiscalClosingDay;
    const targetYear = target.getFullYear();
    const getClosingDate = (year) => {
      const maxDay = new Date(year, closingMonth, 0).getDate();
      const closingDay = Math.min(closingDayBase, maxDay);
      return new Date(year, closingMonth - 1, closingDay);
    };
    const currentYearClosing = getClosingDate(targetYear);
    const fiscalClosingDate = target <= currentYearClosing ? currentYearClosing : getClosingDate(targetYear + 1);
    const previousFiscalClosingDate = getClosingDate(fiscalClosingDate.getFullYear() - 1);
    const fiscalStartDate = new Date(previousFiscalClosingDate);
    fiscalStartDate.setDate(fiscalStartDate.getDate() + 1);
    const toIsoDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };
    return {
      from: toIsoDate(fiscalStartDate),
      to: toIsoDate(fiscalClosingDate)
    };
  }
  const [yearText, monthText] = String(baseDate || today).split("-");
  const year = Number(yearText || new Date().getFullYear());
  const month = Number(monthText || 1);
  const fiscalStartYear = month >= 4 ? year : year - 1;
  return {
    from: `${fiscalStartYear}-04-01`,
    to: `${fiscalStartYear + 1}-03-31`
  };
}

function getCurrentMonthRange(baseDate = today) {
  const [yearText, monthText] = String(baseDate || today).split("-");
  const year = Number(yearText || new Date().getFullYear());
  const month = Number(monthText || 1);
  const from = `${yearText}-${String(month).padStart(2, "0")}-01`;
  const lastDay = new Date(year, month, 0).getDate();
  const to = `${yearText}-${String(month).padStart(2, "0")}-${String(lastDay).padStart(2, "0")}`;
  return { from, to };
}

function parseYmdToDate(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const [yearText, monthText, dayText] = value.split("-");
  const year = Number(yearText);
  const month = Number(monthText);
  const day = Number(dayText);
  if (!Number.isFinite(year) || !Number.isFinite(month) || !Number.isFinite(day)) return null;
  const date = new Date(year, month - 1, day);
  return Number.isNaN(date.getTime()) ? null : date;
}

function toYmdString(date) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) return "";
  return buildDateString(date.getFullYear(), date.getMonth() + 1, date.getDate());
}

function getCurrentWeekRange(baseDate = today) {
  const normalizedDate = normalizeDateString(baseDate, today);
  const target = parseYmdToDate(normalizedDate);
  if (!target) {
    return getCurrentWeekRange(today);
  }
  const dayOfWeek = target.getDay();
  const offsetToMonday = (dayOfWeek + 6) % 7;
  const fromDate = new Date(target);
  fromDate.setDate(fromDate.getDate() - offsetToMonday);
  const toDate = new Date(fromDate);
  toDate.setDate(toDate.getDate() + 6);
  return {
    from: toYmdString(fromDate),
    to: toYmdString(toDate)
  };
}

function getCurrentYearRange(baseDate = today) {
  const normalizedDate = normalizeDateString(baseDate, today);
  const [yearText] = normalizedDate.split("-");
  const year = Number(yearText);
  if (!Number.isFinite(year)) {
    return getCurrentYearRange(today);
  }
  return {
    from: `${year}-01-01`,
    to: `${year}-12-31`
  };
}

function normalizeDateString(value, fallback = today) {
  if (typeof value !== "string") return fallback;
  const trimmed = value.trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return trimmed;
  return fallback;
}

function normalizeMonthString(value, fallback = today.slice(0, 7)) {
  if (typeof value !== "string") return fallback;
  const trimmed = value.trim();
  if (/^\d{4}-\d{2}$/.test(trimmed)) return trimmed;
  return fallback;
}

function shiftMonthString(monthString, amount) {
  const [yearText, monthText] = normalizeMonthString(monthString).split("-");
  const year = Number(yearText);
  const month = Number(monthText);
  const date = new Date(year, month - 1, 1);
  date.setMonth(date.getMonth() + amount);
  const nextYear = date.getFullYear();
  const nextMonth = String(date.getMonth() + 1).padStart(2, "0");
  return `${nextYear}-${nextMonth}`;
}

function buildDateString(year, month, day) {
  return `${String(year).padStart(4, "0")}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function getSelectedHistoryDateLabel() {
  return `${formatDate(historySelectedDate)} の履歴`;
}

function renderHistoryCalendar() {
  if (!historyCalendarGrid || !historyCalendarMonthLabel) return;

  historySelectedDate = normalizeDateString(historySelectedDate);
  historyVisibleMonth = normalizeMonthString(historyVisibleMonth, historySelectedDate.slice(0, 7));
  const selectedMonth = historySelectedDate.slice(0, 7);
  if (!historyVisibleMonth) {
    historyVisibleMonth = selectedMonth || today.slice(0, 7);
  }

  const [yearText, monthText] = historyVisibleMonth.split("-");
  const year = Number(yearText);
  const month = Number(monthText);
  if (!Number.isFinite(year) || !Number.isFinite(month)) return;

  historyCalendarMonthLabel.textContent = `${year}年${month}朁E;
  historyCalendarGrid.innerHTML = "";
  if (historySelectedDateLabel) {
    historySelectedDateLabel.textContent = getSelectedHistoryDateLabel();
  }

  const monthStartDay = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();
  const totalCellCount = Math.ceil((monthStartDay + daysInMonth) / 7) * 7;
  const recordDateSet = new Set(getFilteredRecords().map((record) => record.workDate));

  for (let index = 0; index < totalCellCount; index += 1) {
    const day = index - monthStartDay + 1;
    if (day < 1 || day > daysInMonth) {
      const blank = document.createElement("div");
      blank.className = "history-calendar__blank";
      blank.setAttribute("aria-hidden", "true");
      historyCalendarGrid.appendChild(blank);
      continue;
    }

    const dateKey = buildDateString(year, month, day);
    const dayButton = document.createElement("button");
    dayButton.type = "button";
    dayButton.className = "history-calendar__day";
    dayButton.textContent = String(day);
    dayButton.dataset.date = dateKey;
    dayButton.setAttribute("role", "gridcell");

    const hasRecord = recordDateSet.has(dateKey);
    if (hasRecord) {
      dayButton.classList.add("has-record");
      dayButton.setAttribute("aria-label", `${day}日�E�記録あり�E�`);
    } else {
      dayButton.setAttribute("aria-label", `${day}日`);
    }

    if (dateKey === today) {
      dayButton.classList.add("is-today");
    }
    if (dateKey === historySelectedDate) {
      dayButton.classList.add("is-selected");
      dayButton.setAttribute("aria-current", "date");
    }

    dayButton.addEventListener("click", () => {
      historySelectedDate = dateKey;
      historyVisibleMonth = dateKey.slice(0, 7);
      renderRecords();
    });
    historyCalendarGrid.appendChild(dayButton);
  }
}

function getComparisonPeriodConfig() {
  const mode = comparisonPeriodInput.value || "all";
  const label = getComparisonPeriodLabel(mode);
  if (mode === "all") {
    return { mode, label, from: "", to: "", rangeText: "全期間", isValid: true };
  }
  if (mode === "month") {
    const range = getCurrentMonthRange(today);
    return {
      mode,
      label,
      ...range,
      rangeText: `${formatDateYmd(range.from)}〜${formatDateYmd(range.to)}`,
      isValid: true
    };
  }
  if (mode === "fiscal") {
    const range = getFiscalYearRange(today);
    return {
      mode,
      label,
      ...range,
      rangeText: `${formatDateYmd(range.from)}〜${formatDateYmd(range.to)}`,
      isValid: true
    };
  }
  const from = comparisonFromDateInput.value;
  const to = comparisonToDateInput.value;
  if (!from || !to) {
    return { mode, label, from, to, isValid: false, error: "任意期間では開始日と終了日を入力してください。" };
  }
  if (from > to) {
    return { mode, label, from, to, isValid: false, error: "任意期間の終了日は開始日以降にしてください。" };
  }
  return {
    mode,
    label,
    from,
    to,
    rangeText: `${formatDateYmd(from)}〜${formatDateYmd(to)}`,
    isValid: true
  };
}

function filterRecordsByPeriod(config) {
  if (!config.isValid) return [];
  if (!config.from || !config.to) return records.slice();
  return records.filter((record) => record.workDate >= config.from && record.workDate <= config.to);
}

function getPayrollCloseTypeLabel(closeType) {
  if (closeType === "half-first") return "半月締め（前半）";
  if (closeType === "half-second") return "半月締め（後半）";
  if (closeType === "custom") return "任意期間";
  return "月締め";
}

function getPayrollWorkerScopeLabel(scope) {
  return scope === "all" ? "全作業者" : "パートのみ";
}

function isPartTimeWorker(worker) {
  if (!worker) return false;
  const category = normalizeText(worker.category).toLocaleLowerCase("ja-JP");
  const workerId = normalizeText(worker.id).toLocaleLowerCase("ja-JP");
  return category.includes("パート") || category.includes("part") || workerId.includes("part");
}

function getPayrollPeriodConfig() {
  const closeType = normalizePayrollCloseType(payrollCloseTypeInput?.value || "monthly");
  const closeLabel = getPayrollCloseTypeLabel(closeType);
  const workerScope = payrollWorkerScopeInput?.value === "all" ? "all" : "part";
  const targetMonth = normalizeMonthString(payrollTargetMonthInput?.value || today.slice(0, 7), today.slice(0, 7));

  if (closeType === "custom") {
    const from = normalizeDateString(payrollFromDateInput?.value || "", "");
    const to = normalizeDateString(payrollToDateInput?.value || "", "");
    if (!from || !to) {
      return {
        closeType,
        closeLabel,
        workerScope,
        targetMonth,
        from,
        to,
        rangeText: "",
        isValid: false,
        error: "任意期間では開始日と終了日を入力してください。"
      };
    }
    if (from > to) {
      return {
        closeType,
        closeLabel,
        workerScope,
        targetMonth,
        from,
        to,
        rangeText: "",
        isValid: false,
        error: "任意期間の終了日は開始日以降にしてください。"
      };
    }
    return {
      closeType,
      closeLabel,
      workerScope,
      targetMonth,
      from,
      to,
      rangeText: `${formatDateYmd(from)}〜${formatDateYmd(to)}`,
      isValid: true
    };
  }

  if (!/^\d{4}-\d{2}$/.test(targetMonth)) {
    return {
      closeType,
      closeLabel,
      workerScope,
      targetMonth,
      from: "",
      to: "",
      rangeText: "",
      isValid: false,
      error: "対象年月を指定してください。"
    };
  }

  const [yearText, monthText] = targetMonth.split("-");
  const year = Number(yearText);
  const month = Number(monthText);
  const lastDay = new Date(year, month, 0).getDate();
  const fromDay = closeType === "half-second" ? 16 : 1;
  const toDay = closeType === "half-first" ? 15 : lastDay;
  const from = buildDateString(year, month, fromDay);
  const to = buildDateString(year, month, toDay);

  return {
    closeType,
    closeLabel,
    workerScope,
    targetMonth,
    from,
    to,
    rangeText: `${formatDateYmd(from)}〜${formatDateYmd(to)}`,
    isValid: true
  };
}

function getPayrollAdjustment(workerId, periodConfig) {
  const key = buildPayrollAdjustmentKey(workerId, periodConfig.closeType, periodConfig.from, periodConfig.to);
  return payrollAdjustments.find((item) => item.key === key) || null;
}

function upsertPayrollAdjustment(workerId, periodConfig, allowance, deduction) {
  const key = buildPayrollAdjustmentKey(workerId, periodConfig.closeType, periodConfig.from, periodConfig.to);
  const currentIndex = payrollAdjustments.findIndex((item) => item.key === key);
  const normalizedAllowance = Number.isFinite(Number(allowance)) ? Number(allowance) : 0;
  const normalizedDeduction = Number.isFinite(Number(deduction)) ? Number(deduction) : 0;

  if (normalizedAllowance === 0 && normalizedDeduction === 0) {
    if (currentIndex >= 0) {
      payrollAdjustments.splice(currentIndex, 1);
      saveState();
    }
    return;
  }

  const candidate = normalizePayrollAdjustment({
    id: currentIndex >= 0 ? payrollAdjustments[currentIndex].id : createId("payroll-adjustment"),
    key,
    workerId,
    closeType: periodConfig.closeType,
    periodFrom: periodConfig.from,
    periodTo: periodConfig.to,
    allowance: normalizedAllowance,
    deduction: normalizedDeduction,
    updatedAt: new Date().toISOString()
  }, currentIndex >= 0 ? currentIndex : payrollAdjustments.length);

  if (!candidate) return;
  if (currentIndex >= 0) {
    payrollAdjustments[currentIndex] = candidate;
  } else {
    payrollAdjustments.push(candidate);
  }
  saveState();
}

function buildPayrollRows(periodConfig) {
  const filteredRecords = records.filter((record) => record.workDate >= periodConfig.from && record.workDate <= periodConfig.to);
  const dayMap = new Map();

  filteredRecords.forEach((record) => {
    const assignedWorkers = getAssignedWorkers(record);
    if (!assignedWorkers.length) return;
    const workerTimeDetails = getRecordWorkerTimeDetails(record, companySettings);
    const fallbackStartTime = getRecordStartTime(record);
    const fallbackEndTime = getRecordEndTime(record);
    const fallbackBreakMinutes = getRecordBreakMinutes(record, companySettings);
    const workTypes = getRecordWorkTypes(record, { includeUnset: true });

    assignedWorkers.forEach((worker) => {
      if (!worker) return;
      if (periodConfig.workerScope === "part" && !isPartTimeWorker(worker)) return;

      const dayKey = `${worker.id}|${record.workDate}`;
      const current = dayMap.get(dayKey) || {
        worker,
        workDate: record.workDate,
        totalHours: 0,
        totalBreakMinutes: 0,
        workTypeSet: new Set(),
        earliestStartMinutes: null,
        latestEndMinutes: null,
        timeRangeSet: new Set(),
        timeRanges: [],
        startTime: "",
        endTime: ""
      };
      const workerHours = Number(getWorkerHoursForRecord(record, worker.id, companySettings) || 0);
      if (!Number.isFinite(workerHours) || workerHours <= 0) return;

      const detail = workerTimeDetails?.[worker.id] || {};
      const startTime = normalizeTimeText(detail.startTime || fallbackStartTime, "");
      const endTime = normalizeTimeText(detail.endTime || fallbackEndTime, "");
      const breakMinutes = normalizeBreakMinutes(
        detail.breakMinutes,
        fallbackBreakMinutes
      );

      const startMinutes = parseTimeToMinutes(startTime);
      if (startMinutes !== null && (current.earliestStartMinutes === null || startMinutes < current.earliestStartMinutes)) {
        current.earliestStartMinutes = startMinutes;
        current.startTime = startTime;
      }

      const endMinutes = parseTimeToMinutes(endTime);
      if (endMinutes !== null && (current.latestEndMinutes === null || endMinutes > current.latestEndMinutes)) {
        current.latestEndMinutes = endMinutes;
        current.endTime = endTime;
      }
      if (startTime && endTime) {
        const timeRangeText = `${startTime}〜${endTime}`;
        if (!current.timeRangeSet.has(timeRangeText)) {
          current.timeRangeSet.add(timeRangeText);
          current.timeRanges.push({
            text: timeRangeText,
            startMinutes: startMinutes === null ? 9999 : startMinutes,
            endMinutes: endMinutes === null ? 9999 : endMinutes
          });
        }
      }

      workTypes.forEach((workType) => current.workTypeSet.add(workType));
      current.totalBreakMinutes += breakMinutes;
      current.totalHours += workerHours;
      dayMap.set(dayKey, current);
    });
  });

  const workerMap = new Map();
  Array.from(dayMap.values()).forEach((dayEntry) => {
    const resolvedDayHours = normalizeHoursByTimeUnit(dayEntry.totalHours, companySettings);
    if (!Number.isFinite(resolvedDayHours) || resolvedDayHours <= 0) return;
    const hourlyRate = Number(dayEntry.worker.hourlyRate || 0);
    const dayPay = Math.round(resolvedDayHours * hourlyRate);

    const current = workerMap.get(dayEntry.worker.id) || {
      worker: dayEntry.worker,
      attendanceDates: new Set(),
      totalHours: 0,
      totalBreakMinutes: 0,
      dailyDetails: []
    };
    current.attendanceDates.add(dayEntry.workDate);
    current.totalHours += resolvedDayHours;
    current.totalBreakMinutes += Math.max(0, Math.round(dayEntry.totalBreakMinutes || 0));
    current.dailyDetails.push({
      workDate: dayEntry.workDate,
      weekdayLabel: getWeekdayLabelJa(dayEntry.workDate),
      workTypes: Array.from(dayEntry.workTypeSet),
      workTypeText: Array.from(dayEntry.workTypeSet).join("、"),
      timeRangeText: dayEntry.timeRanges
        .slice()
        .sort((a, b) => a.startMinutes - b.startMinutes || a.endMinutes - b.endMinutes)
        .map((item) => item.text)
        .join(" / "),
      startTime: dayEntry.startTime || "",
      endTime: dayEntry.endTime || "",
      breakMinutes: Math.max(0, Math.round(dayEntry.totalBreakMinutes || 0)),
      workHours: resolvedDayHours,
      hourlyRate,
      dayPay
    });
    workerMap.set(dayEntry.worker.id, current);
  });

  const rows = Array.from(workerMap.values()).map((item) => {
    const sortedDailyDetails = [...item.dailyDetails].sort((a, b) => a.workDate.localeCompare(b.workDate, "ja"));
    const adjustment = getPayrollAdjustment(item.worker.id, periodConfig);
    const hourlyRate = Number(item.worker.hourlyRate || 0);
    const totalHours = Number(sortedDailyDetails.reduce((sum, entry) => sum + Number(entry.workHours || 0), 0).toFixed(2));
    const totalBreakMinutes = sortedDailyDetails.reduce((sum, entry) => sum + Number(entry.breakMinutes || 0), 0);
    const attendanceDays = item.attendanceDates.size;
    const basicPay = sortedDailyDetails.reduce((sum, entry) => sum + Math.round(Number(entry.dayPay || 0)), 0);
    const allowance = Number(adjustment?.allowance || 0);
    const deduction = Number(adjustment?.deduction || 0);
    const netPay = basicPay + allowance - deduction;
    return {
      workerId: item.worker.id,
      fullName: item.worker.fullName || item.worker.displayName || "未設定",
      displayName: item.worker.displayName || item.worker.fullName || "未設定",
      category: item.worker.category || "",
      attendanceDays,
      totalHours,
      totalBreakMinutes,
      hourlyRate,
      basicPay,
      allowance,
      deduction,
      netPay,
      dailyDetails: sortedDailyDetails
    };
  }).sort((a, b) => a.displayName.localeCompare(b.displayName, "ja"));

  const summary = rows.reduce((acc, row) => {
    acc.workerCount += 1;
    acc.attendanceDays += row.attendanceDays;
    acc.totalHours += row.totalHours;
    acc.totalBreakMinutes += row.totalBreakMinutes;
    acc.basicPay += row.basicPay;
    acc.allowance += row.allowance;
    acc.deduction += row.deduction;
    acc.netPay += row.netPay;
    return acc;
  }, {
    workerCount: 0,
    attendanceDays: 0,
    totalHours: 0,
    totalBreakMinutes: 0,
    basicPay: 0,
    allowance: 0,
    deduction: 0,
    netPay: 0
  });

  return {
    filteredRecords,
    rows,
    summary
  };
}

function getPayrollData(periodConfig = getPayrollPeriodConfig()) {
  const normalizedConfig = periodConfig || getPayrollPeriodConfig();
  if (!normalizedConfig.isValid) {
    return {
      periodConfig: normalizedConfig,
      rows: [],
      filteredRecords: [],
      summary: {
        workerCount: 0,
        attendanceDays: 0,
        totalHours: 0,
        totalBreakMinutes: 0,
        basicPay: 0,
        allowance: 0,
        deduction: 0,
        netPay: 0
      }
    };
  }
  const result = buildPayrollRows(normalizedConfig);
  return {
    periodConfig: normalizedConfig,
    ...result
  };
}

function normalizeWorktimePeriodMode(value) {
  return ["week", "month", "year", "custom"].includes(value) ? value : "week";
}

function getWorktimePeriodLabel(mode) {
  if (mode === "month") return "今月";
  if (mode === "year") return "今年";
  if (mode === "custom") return "任意期閁E;
  return "今週";
}

function getWorktimePeriodConfig() {
  const mode = normalizeWorktimePeriodMode(worktimePeriodModeInput?.value || "week");
  if (mode === "custom") {
    const from = normalizeDateString(worktimeFromDateInput?.value || "", "");
    const to = normalizeDateString(worktimeToDateInput?.value || "", "");
    const label = getWorktimePeriodLabel(mode);
    if (!from || !to) {
      return {
        mode,
        label,
        from: "",
        to: "",
        rangeText: "",
        isValid: false,
        error: "任意期間を雁E��するには開始日と終亁E��を�E力してください、E
      };
    }
    if (from > to) {
      return {
        mode,
        label,
        from,
        to,
        rangeText: `${formatDateYmd(from)}、E{formatDateYmd(to)}`,
        isValid: false,
        error: "任意期間�E終亁E��は開始日以降にしてください、E
      };
    }
    return {
      mode,
      label,
      from,
      to,
      rangeText: `${formatDateYmd(from)}、E{formatDateYmd(to)}`,
      isValid: true
    };
  }

  const range = mode === "week"
    ? getCurrentWeekRange(today)
    : mode === "month"
      ? getCurrentMonthRange(today)
      : getCurrentYearRange(today);
  return {
    mode,
    label: getWorktimePeriodLabel(mode),
    from: range.from,
    to: range.to,
    rangeText: `${formatDateYmd(range.from)}、E{formatDateYmd(range.to)}`,
    isValid: true
  };
}

function applyWorktimeControlState() {
  const mode = normalizeWorktimePeriodMode(worktimePeriodModeInput?.value || "week");
  worktimeQuickButtons.forEach((button) => {
    const buttonMode = normalizeWorktimePeriodMode(button.dataset.worktimePeriod || "");
    const isActive = buttonMode === mode;
    button.classList.toggle("is-active", isActive);
    button.classList.toggle("button--view", isActive);
    button.classList.toggle("button--settings", !isActive);
    button.setAttribute("aria-pressed", isActive ? "true" : "false");
  });
  worktimeTabButtons.forEach((button) => {
    const isActive = (button.dataset.worktimeTab || "personal") === activeWorktimeTab;
    button.classList.toggle("is-active", isActive);
    button.classList.toggle("button--view", isActive);
    button.classList.toggle("button--settings", !isActive);
    button.setAttribute("aria-selected", isActive ? "true" : "false");
  });
  if (worktimeCustomRange) {
    worktimeCustomRange.hidden = mode !== "custom";
  }
  if (worktimeWorkerRow) {
    worktimeWorkerRow.hidden = activeWorktimeTab !== "personal";
  }
}

function renderWorktimeWorkerOptions() {
  if (!worktimeWorkerSelect) return;
  const workers = [...masters.workers].sort((a, b) => (a.displayName || "").localeCompare(b.displayName || "", "ja"));
  worktimeWorkerSelect.innerHTML = "";
  if (!workers.length) {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "作業老E��未登録でぁE;
    worktimeWorkerSelect.appendChild(option);
    worktimeWorkerSelect.disabled = true;
    activeWorktimeWorkerId = "";
    return;
  }
  worktimeWorkerSelect.disabled = false;
  workers.forEach((worker) => {
    const option = document.createElement("option");
    option.value = worker.id;
    option.textContent = `${worker.displayName || worker.fullName}${worker.isActive ? "" : " (無効)"}`;
    worktimeWorkerSelect.appendChild(option);
  });
  if (!workers.some((worker) => worker.id === activeWorktimeWorkerId)) {
    const preferredWorker = workers.find((worker) => worker.isActive) || workers[0];
    activeWorktimeWorkerId = preferredWorker.id;
  }
  worktimeWorkerSelect.value = activeWorktimeWorkerId;
}

function buildWorktimeWorkerDayEntries(sourceRecords = records) {
  const entryMap = new Map();
  sourceRecords.forEach((record) => {
    const workDate = normalizeDateString(record.workDate, "");
    if (!workDate) return;
    const assignedWorkers = getAssignedWorkers(record);
    assignedWorkers.forEach((worker) => {
      if (!worker) return;
      const hours = Number(getWorkerHoursForRecord(record, worker.id, companySettings) || 0);
      if (!Number.isFinite(hours) || hours <= 0) return;
      const key = `${worker.id}|${workDate}`;
      const current = entryMap.get(key) || {
        workerId: worker.id,
        worker,
        workDate,
        hours: 0
      };
      current.hours += hours;
      entryMap.set(key, current);
    });
  });
  return Array.from(entryMap.values()).map((item) => ({
    ...item,
    hours: Number(item.hours.toFixed(2))
  }));
}

function filterWorktimeEntriesByRange(entries, from, to) {
  return entries.filter((item) => item.workDate >= from && item.workDate <= to);
}

function summarizePersonalWorktime(entries, workerId) {
  const workerEntries = entries.filter((entry) => entry.workerId === workerId);
  const totalHours = Number(workerEntries.reduce((sum, entry) => sum + Number(entry.hours || 0), 0).toFixed(2));
  const attendanceDays = workerEntries.length;
  const averageHours = attendanceDays ? Number((totalHours / attendanceDays).toFixed(2)) : 0;
  return {
    totalHours,
    attendanceDays,
    averageHours
  };
}

function summarizeOverallWorktime(entries) {
  const totalHours = Number(entries.reduce((sum, entry) => sum + Number(entry.hours || 0), 0).toFixed(2));
  const attendanceDays = entries.length;
  const workerCount = new Set(entries.map((entry) => entry.workerId)).size;
  const averageHoursPerWorker = workerCount ? Number((totalHours / workerCount).toFixed(2)) : 0;
  return {
    totalHours,
    attendanceDays,
    workerCount,
    averageHoursPerWorker
  };
}

function getDateSpanDays(from, to) {
  const fromDate = parseYmdToDate(from);
  const toDate = parseYmdToDate(to);
  if (!fromDate || !toDate) return 0;
  const diff = toDate.getTime() - fromDate.getTime();
  return diff >= 0 ? Math.floor(diff / 86400000) + 1 : 0;
}

function getWeekRangeFromDateString(dateString) {
  const normalized = normalizeDateString(dateString, "");
  if (!normalized) return { from: "", to: "" };
  return getCurrentWeekRange(normalized);
}

function getWorktimeComparisonRows(allEntries, tab, workerId) {
  const periodRanges = [
    { key: "week", label: "今週", range: getCurrentWeekRange(today) },
    { key: "month", label: "今月", range: getCurrentMonthRange(today) },
    { key: "year", label: "今年", range: getCurrentYearRange(today) }
  ];
  return periodRanges.map((period) => {
    const periodEntries = filterWorktimeEntriesByRange(allEntries, period.range.from, period.range.to);
    const stats = tab === "personal"
      ? summarizePersonalWorktime(periodEntries, workerId)
      : summarizeOverallWorktime(periodEntries);
    return {
      key: period.key,
      label: period.label,
      rangeText: `${formatDateYmd(period.range.from)}、E{formatDateYmd(period.range.to)}`,
      stats
    };
  });
}

function buildWorktimeBreakdownRows(periodEntries, tab, workerId, periodConfig) {
  const filteredEntries = tab === "personal"
    ? periodEntries.filter((entry) => entry.workerId === workerId)
    : periodEntries.slice();
  if (!filteredEntries.length) {
    return {
      title: "期間冁E�E冁E��",
      rows: []
    };
  }

  const spanDays = getDateSpanDays(periodConfig.from, periodConfig.to);
  let granularity = "day";
  if (periodConfig.mode === "year" || (periodConfig.mode === "custom" && spanDays >= 90)) {
    granularity = "month";
  } else if (periodConfig.mode === "month" || (periodConfig.mode === "custom" && spanDays >= 21)) {
    granularity = "week";
  }

  const rowsMap = new Map();
  filteredEntries.forEach((entry) => {
    let key = "";
    let label = "";
    if (granularity === "month") {
      key = entry.workDate.slice(0, 7);
      label = formatMonth(key);
    } else if (granularity === "week") {
      const weekRange = getWeekRangeFromDateString(entry.workDate);
      key = weekRange.from;
      label = `${formatDateYmd(weekRange.from)}、E{formatDateYmd(weekRange.to)}`;
    } else {
      key = entry.workDate;
      label = formatDateYmd(entry.workDate);
    }
    const current = rowsMap.get(key) || {
      key,
      label,
      totalHours: 0,
      attendanceDays: 0,
      workerIds: new Set()
    };
    current.totalHours += Number(entry.hours || 0);
    current.attendanceDays += 1;
    current.workerIds.add(entry.workerId);
    rowsMap.set(key, current);
  });

  const rows = Array.from(rowsMap.values())
    .sort((a, b) => b.key.localeCompare(a.key))
    .map((row) => {
      const totalHours = Number(row.totalHours.toFixed(2));
      const averageHours = row.attendanceDays ? Number((totalHours / row.attendanceDays).toFixed(2)) : 0;
      const averagePerWorker = row.workerIds.size ? Number((totalHours / row.workerIds.size).toFixed(2)) : 0;
      return {
        label: row.label,
        totalHours,
        attendanceDays: row.attendanceDays,
        workerCount: row.workerIds.size,
        averageHours,
        averagePerWorker
      };
    });

  const title = granularity === "month"
    ? "期間冁E�E月別冁E��"
    : granularity === "week"
      ? "期間冁E�E週別冁E��"
      : "期間冁E�E日別冁E��";
  return { title, rows };
}

function getWorktimeAverageValue(stats, tab) {
  if (!stats) return 0;
  return tab === "personal"
    ? Number(stats.averageHours || 0)
    : Number(stats.averageHoursPerWorker || 0);
}

function buildWorktimeAnalysisSnapshot(tab = activeWorktimeTab) {
  const normalizedTab = tab === "overall" ? "overall" : "personal";
  const periodConfig = getWorktimePeriodConfig();
  if (!periodConfig.isValid) {
    return {
      isValid: false,
      tab: normalizedTab,
      periodConfig,
      error: periodConfig.error || "期間条件を確認してください、E
    };
  }

  const workers = [...masters.workers].sort((a, b) => (a.displayName || "").localeCompare(b.displayName || "", "ja"));
  const fallbackWorker = workers.find((worker) => worker.isActive) || workers[0] || null;
  const workerId = normalizedTab === "personal"
    ? (
      workers.some((worker) => worker.id === activeWorktimeWorkerId)
        ? activeWorktimeWorkerId
        : (fallbackWorker?.id || "")
    )
    : "";
  const selectedWorker = normalizedTab === "personal" ? getWorkerById(workerId) : null;
  const targetName = normalizedTab === "personal"
    ? (selectedWorker?.displayName || "未選抁E)
    : "全佁E;
  const allEntries = buildWorktimeWorkerDayEntries(records);
  const periodEntries = filterWorktimeEntriesByRange(allEntries, periodConfig.from, periodConfig.to);
  const selectedStats = normalizedTab === "personal"
    ? summarizePersonalWorktime(periodEntries, workerId)
    : summarizeOverallWorktime(periodEntries);
  const comparisonRows = getWorktimeComparisonRows(allEntries, normalizedTab, workerId);
  const breakdown = buildWorktimeBreakdownRows(periodEntries, normalizedTab, workerId, periodConfig);

  return {
    isValid: true,
    tab: normalizedTab,
    workerId,
    selectedWorker,
    targetName,
    periodConfig,
    allEntries,
    periodEntries,
    selectedStats,
    comparisonRows,
    breakdown
  };
}

function renderWorktimeSummaryCards(data) {
  if (!worktimeSummaryCards) return;
  const { tab, selectedStats, selectedWorker, periodLabel, comparisonRows } = data;
  const weekStats = comparisonRows.find((item) => item.key === "week")?.stats;
  const monthStats = comparisonRows.find((item) => item.key === "month")?.stats;
  const yearStats = comparisonRows.find((item) => item.key === "year")?.stats;

  const cards = tab === "personal"
    ? [
        { label: "対象作業老E, value: selectedWorker?.displayName || "未選抁E },
        { label: `${periodLabel}の労働時間`, value: formatHours(selectedStats.totalHours) },
        { label: `${periodLabel}の出勤日数`, value: formatDays(selectedStats.attendanceDays) },
        { label: "平坁E��働時閁E, value: formatHours(selectedStats.averageHours) },
        { label: "今週の労働時閁E, value: formatHours(weekStats?.totalHours || 0) },
        { label: "今月の労働時閁E, value: formatHours(monthStats?.totalHours || 0) },
        { label: "今年の労働時閁E, value: formatHours(yearStats?.totalHours || 0) }
      ]
    : [
        { label: "対象作業老E��", value: formatPeople(selectedStats.workerCount || 0) },
        { label: `${periodLabel}の全体労働時間`, value: formatHours(selectedStats.totalHours) },
        { label: `${periodLabel}の全体�E勤日数`, value: formatDays(selectedStats.attendanceDays) },
        { label: "1人あたり平坁E��働時閁E, value: formatHours(selectedStats.averageHoursPerWorker) },
        { label: "全体�E今週労働時閁E, value: formatHours(weekStats?.totalHours || 0) },
        { label: "全体�E今月労働時閁E, value: formatHours(monthStats?.totalHours || 0) },
        { label: "全体�E今年労働時閁E, value: formatHours(yearStats?.totalHours || 0) }
      ];

  worktimeSummaryCards.innerHTML = "";
  cards.forEach((item) => {
    const card = document.createElement("article");
    card.className = "summary-card payroll-summary-card";
    const label = document.createElement("span");
    label.className = "summary-card__label";
    label.textContent = item.label;
    const value = document.createElement("strong");
    value.textContent = item.value;
    card.append(label, value);
    worktimeSummaryCards.appendChild(card);
  });
}

function renderWorktimeComparisonRows(data) {
  if (!worktimeComparisonList) return;
  const entries = data.comparisonRows.map((item) => {
    const value = data.tab === "personal"
      ? `${formatHours(item.stats.totalHours)} / ${formatDays(item.stats.attendanceDays)} / 平坁E${formatHours(item.stats.averageHours)}`
      : `${formatHours(item.stats.totalHours)} / ${formatDays(item.stats.attendanceDays)} / 1人平坁E${formatHours(item.stats.averageHoursPerWorker)}`;
    return [`${item.label}�E�E{item.rangeText}�E�`, value];
  });
  buildSummaryRows(
    worktimeComparisonList,
    entries,
    (value) => String(value),
    "比輁E��きる労働時間データがありません、E
  );
}

function renderWorktimeBreakdownRows(data) {
  if (!worktimeBreakdownList) return;
  if (worktimeBreakdownTitle) {
    worktimeBreakdownTitle.textContent = data.breakdown.title;
  }
  const entries = data.breakdown.rows.map((row) => {
    const value = data.tab === "personal"
      ? `${formatHours(row.totalHours)} / ${formatDays(row.attendanceDays)} / 平坁E${formatHours(row.averageHours)}`
      : `${formatHours(row.totalHours)} / ${formatDays(row.attendanceDays)} / 1人平坁E${formatHours(row.averagePerWorker)}`;
    return [row.label, value];
  });
  buildSummaryRows(
    worktimeBreakdownList,
    entries,
    (value) => String(value),
    "期間冁E�E冁E��チE�Eタがありません、E
  );
}

function renderWorktimeAnalysis() {
  if (!worktimePeriodInfo || !worktimeSummaryCards || !worktimeComparisonList || !worktimeBreakdownList) return;
  applyWorktimeControlState();
  renderWorktimeWorkerOptions();

  const snapshot = buildWorktimeAnalysisSnapshot(activeWorktimeTab);
  if (!snapshot.isValid) {
    worktimePeriodInfo.textContent = snapshot.error || "期間条件を確認してください、E;
    worktimeSummaryCards.innerHTML = "";
    worktimeComparisonList.innerHTML = "";
    worktimeBreakdownList.innerHTML = "";
    worktimeSummaryCards.appendChild(buildEmptyState("雁E��条件を指定すると労働時間サマリーを表示できます、E));
    worktimeComparisonList.appendChild(buildEmptyState("比輁E��ータを表示できません、E));
    worktimeBreakdownList.appendChild(buildEmptyState("冁E��チE�Eタを表示できません、E));
    return;
  }

  if (activeWorktimeTab === "personal" && snapshot.workerId && snapshot.workerId !== activeWorktimeWorkerId) {
    activeWorktimeWorkerId = snapshot.workerId;
    if (worktimeWorkerSelect && worktimeWorkerSelect.value !== snapshot.workerId) {
      worktimeWorkerSelect.value = snapshot.workerId;
    }
  }
  worktimePeriodInfo.textContent = `${snapshot.periodConfig.label} / ${snapshot.periodConfig.rangeText} / 対象: ${snapshot.targetName}`;

  renderWorktimeSummaryCards({
    tab: snapshot.tab,
    selectedStats: snapshot.selectedStats,
    selectedWorker: snapshot.selectedWorker,
    periodLabel: snapshot.periodConfig.label,
    comparisonRows: snapshot.comparisonRows
  });
  renderWorktimeComparisonRows({
    tab: snapshot.tab,
    comparisonRows: snapshot.comparisonRows
  });
  renderWorktimeBreakdownRows({
    tab: snapshot.tab,
    breakdown: snapshot.breakdown
  });
}

function sortEntriesByMetric(entries, metric = "hours", sortOrder = "desc") {
  const direction = sortOrder === "asc" ? 1 : -1;
  const metricValue = (entry) => {
    if (metric === "count") return Number(entry.count || 0);
    if (metric === "personHours") return Number(entry.personHours || 0);
    if (metric === "laborCost") return Number(entry.laborCost || 0);
    return Number(entry.hours || 0);
  };
  return [...entries].sort((a, b) => {
    const byMetric = (metricValue(a) - metricValue(b)) * direction;
    if (byMetric !== 0) return byMetric;
    const byHours = (Number(a.hours || 0) - Number(b.hours || 0)) * direction;
    if (byHours !== 0) return byHours;
    const byCount = (Number(a.count || 0) - Number(b.count || 0)) * direction;
    if (byCount !== 0) return byCount;
    return String(a.label || "").localeCompare(String(b.label || ""), "ja");
  });
}

function sortComparisonEntries(entries) {
  const metric = comparisonSortMetricInput.value || "hours";
  const sortOrder = comparisonSortOrderInput.value === "asc" ? "asc" : "desc";
  return sortEntriesByMetric(entries, metric, sortOrder);
}

function buildCumulativeEntries(sourceRecords, type) {
  const map = new Map();
  sourceRecords.forEach((record) => {
    const names = getRecordDisplay(record);
    const metrics = getRecordMetrics(record);
    const key = type === "orchard" ? (record.orchardId || names.orchardName) : (record.plotId || `${names.orchardName}/${names.plotName}`);
    const label = type === "orchard" ? names.orchardName : `${names.orchardName} / ${names.plotName}`;
    const current = map.get(key) || { label, count: 0, hours: 0, personHours: 0, laborCost: 0 };
    current.count += 1;
    current.hours += metrics.hours;
    current.personHours += metrics.personHours;
    current.laborCost += metrics.laborCost;
    map.set(key, current);
  });
  return sortComparisonEntries(Array.from(map.values()));
}

function renderCumulativeComparisonRows(container, entries, emptyMessage) {
  container.innerHTML = "";
  if (!entries.length) {
    container.appendChild(buildEmptyState(emptyMessage));
    return;
  }
  entries.forEach((entry) => {
    const row = document.createElement("article");
    row.className = "comparison-row";
    const title = document.createElement("h5");
    title.textContent = entry.label;
    const metrics = document.createElement("div");
    metrics.className = "comparison-row__metrics";
    metrics.innerHTML = `
      <span>件数: <strong>${formatCount(entry.count)}</strong></span>
      <span>時間: <strong>${formatHours(entry.hours)}</strong></span>
      <span>延べ人晁E <strong>${formatPersonHours(entry.personHours)}</strong></span>
      <span>概算人件費: <strong>${formatCurrency(entry.laborCost)}</strong></span>
    `;
    row.append(title, metrics);
    container.appendChild(row);
  });
}

function getCumulativeComparisonData() {
  const periodConfig = getComparisonPeriodConfig();
  const filteredRecords = filterRecordsByPeriod(periodConfig);
  return {
    periodConfig,
    filteredRecords,
    orchardEntries: buildCumulativeEntries(filteredRecords, "orchard"),
    plotEntries: buildCumulativeEntries(filteredRecords, "plot")
  };
}

function renderCumulativeComparison() {
  const config = getComparisonPeriodConfig();
  comparisonRangeRow.hidden = config.mode !== "custom";
  if (!config.isValid) {
    comparisonInfo.textContent = config.error;
    renderCumulativeComparisonRows(orchardCumulativeList, [], "条件を満たす園地別比輁E�Eありません、E);
    renderCumulativeComparisonRows(plotCumulativeList, [], "条件を満たす区画別比輁E�Eありません、E);
    return;
  }
  const comparisonData = getCumulativeComparisonData();
  const metricLabelMap = {
    count: "件数基溁E,
    hours: "総作業時間基溁E,
    personHours: "延べ人時基溁E,
    laborCost: "概算人件費基溁E
  };
  const metricLabel = metricLabelMap[comparisonSortMetricInput.value] || "総作業時間基溁E;
  const sortLabel = comparisonSortOrderInput.value === "asc" ? "少なぁE��E : "多い頁E;
  const periodRangeText = comparisonData.periodConfig.rangeText ? ` / 期間篁E��: ${comparisonData.periodConfig.rangeText}` : "";
  comparisonInfo.textContent = `比輁E��閁E ${comparisonData.periodConfig.label}${periodRangeText} / 並び替え基溁E ${metricLabel} / 並び頁E ${sortLabel} / 対象記録: ${comparisonData.filteredRecords.length}件`;
  renderCumulativeComparisonRows(orchardCumulativeList, comparisonData.orchardEntries, "条件を満たす園地別比輁E�Eありません、E);
  renderCumulativeComparisonRows(plotCumulativeList, comparisonData.plotEntries, "条件を満たす区画別比輁E�Eありません、E);
}

function getSortMetricLabel(metric) {
  const metricLabelMap = {
    count: "件数基溁E,
    hours: "総作業時間基溁E,
    personHours: "延べ人時基溁E,
    laborCost: "概算人件費基溁E
  };
  return metricLabelMap[metric] || "総作業時間基溁E;
}

function getTaskReportPeriodConfig() {
  const mode = taskReportPeriodInput?.value || "month";
  if (mode === "month") {
    const range = getCurrentMonthRange(today);
    return {
      mode,
      label: getComparisonPeriodLabel(mode),
      ...range,
      rangeText: `${formatDateYmd(range.from)}、E{formatDateYmd(range.to)}`,
      isValid: true
    };
  }
  if (mode === "fiscal") {
    const range = getFiscalYearRange(today);
    return {
      mode,
      label: getComparisonPeriodLabel(mode),
      ...range,
      rangeText: `${formatDateYmd(range.from)}、E{formatDateYmd(range.to)}`,
      isValid: true
    };
  }
  const from = taskReportFromDateInput?.value || "";
  const to = taskReportToDateInput?.value || "";
  if (!from || !to) {
    return { mode, label: getComparisonPeriodLabel(mode), from, to, isValid: false, error: "任意期間では開始日と終亁E��を�E力してください、E };
  }
  if (from > to) {
    return { mode, label: getComparisonPeriodLabel(mode), from, to, isValid: false, error: "任意期間�E終亁E��は開始日以降を持E��してください、E };
  }
  return {
    mode,
    label: getComparisonPeriodLabel(mode),
    from,
    to,
    rangeText: `${formatDateYmd(from)}、E{formatDateYmd(to)}`,
    isValid: true
  };
}

function buildTaskTypeReportData() {
  const periodConfig = getTaskReportPeriodConfig();
  const metric = taskReportSortMetricInput?.value || "hours";
  const sortOrder = taskReportSortOrderInput?.value === "asc" ? "asc" : "desc";
  const filteredRecords = filterRecordsByPeriod(periodConfig);
  const taskMap = new Map();

  const getMetricBucket = (map, key, label) => {
    const current = map.get(key) || { label, count: 0, hours: 0, personHours: 0, laborCost: 0 };
    map.set(key, current);
    return current;
  };

  filteredRecords.forEach((record) => {
    const names = getRecordDisplay(record);
    const metrics = getRecordMetrics(record);
    const taskLabels = getRecordWorkTypes(record, { includeUnset: true });

    taskLabels.forEach((taskLabel) => {
      const taskKey = taskLabel;
      const taskEntry = taskMap.get(taskKey) || {
        label: taskLabel,
        count: 0,
        hours: 0,
        personHours: 0,
        laborCost: 0,
        orchardMap: new Map(),
        plotMap: new Map(),
        groupMap: new Map(),
        workerHourMap: new Map()
      };

      taskEntry.count += 1;
      taskEntry.hours += metrics.hours;
      taskEntry.personHours += metrics.personHours;
      taskEntry.laborCost += metrics.laborCost;

      const orchardKey = record.orchardId || names.orchardName;
      const orchardLabel = names.orchardName || "園地未設宁E;
      const orchardEntry = getMetricBucket(taskEntry.orchardMap, orchardKey, orchardLabel);
      orchardEntry.count += 1;
      orchardEntry.hours += metrics.hours;
      orchardEntry.personHours += metrics.personHours;
      orchardEntry.laborCost += metrics.laborCost;

      const plotKey = record.plotId || `${names.orchardName}/${names.plotName}`;
      const plotLabel = `${names.orchardName || "園地未設宁E} / ${names.plotName || "区画未設宁E}`;
      const plotEntry = getMetricBucket(taskEntry.plotMap, plotKey, plotLabel);
      plotEntry.count += 1;
      plotEntry.hours += metrics.hours;
      plotEntry.personHours += metrics.personHours;
      plotEntry.laborCost += metrics.laborCost;

      const groupKey = record.dailyGroupId || names.dailyGroupName;
      const groupLabel = names.dailyGroupName || "未設宁E;
      const groupEntry = getMetricBucket(taskEntry.groupMap, groupKey, groupLabel);
      groupEntry.count += 1;
      groupEntry.hours += metrics.hours;
      groupEntry.personHours += metrics.personHours;
      groupEntry.laborCost += metrics.laborCost;

      getAssignedWorkers(record).forEach((worker) => {
        const workerKey = worker.id || worker.displayName;
        const workerLabel = worker.displayName || "未設宁E;
        const workerEntry = taskEntry.workerHourMap.get(workerKey) || { label: workerLabel, hours: 0 };
        workerEntry.hours += metrics.hours;
        taskEntry.workerHourMap.set(workerKey, workerEntry);
      });

      taskMap.set(taskKey, taskEntry);
    });
  });

  const workerSortDirection = sortOrder === "asc" ? 1 : -1;
  const taskEntries = sortEntriesByMetric(Array.from(taskMap.values()), metric, sortOrder).map((entry) => ({
    label: entry.label,
    count: entry.count,
    hours: entry.hours,
    personHours: entry.personHours,
    laborCost: entry.laborCost,
    orchardEntries: sortEntriesByMetric(Array.from(entry.orchardMap.values()), metric, sortOrder),
    plotEntries: sortEntriesByMetric(Array.from(entry.plotMap.values()), metric, sortOrder),
    groupEntries: sortEntriesByMetric(Array.from(entry.groupMap.values()), metric, sortOrder),
    workerEntries: Array.from(entry.workerHourMap.values()).sort((a, b) => {
      const byHours = (a.hours - b.hours) * workerSortDirection;
      if (byHours !== 0) return byHours;
      return a.label.localeCompare(b.label, "ja");
    })
  }));

  return {
    periodConfig,
    metric,
    sortOrder,
    filteredRecords,
    summary: getDailyReportSummary(filteredRecords),
    taskEntries
  };
}

function buildTaskTypeMetricRowsHtml(entries, emptyMessage) {
  if (!entries.length) {
    return `<tr><td class="empty-cell" colspan="5">${escapeHtml(emptyMessage)}</td></tr>`;
  }
  return entries.map((entry) => `
    <tr>
      <th>${escapeHtml(entry.label)}</th>
      <td>${escapeHtml(formatCount(entry.count))}</td>
      <td>${escapeHtml(formatHours(entry.hours))}</td>
      <td>${escapeHtml(formatPersonHours(entry.personHours))}</td>
      <td>${escapeHtml(formatCurrency(entry.laborCost))}</td>
    </tr>
  `).join("");
}

function buildTaskTypeWorkerRowsHtml(entries, emptyMessage) {
  if (!entries.length) {
    return `<tr><td class="empty-cell" colspan="2">${escapeHtml(emptyMessage)}</td></tr>`;
  }
  return entries.map((entry) => `
    <tr>
      <th>${escapeHtml(entry.label)}</th>
      <td>${escapeHtml(formatHours(entry.hours))}</td>
    </tr>
  `).join("");
}

function renderTaskTypeReport() {
  if (!taskTypeReportList || !taskReportInfo || !taskReportRangeRow) return;
  const periodConfig = getTaskReportPeriodConfig();
  taskReportRangeRow.hidden = periodConfig.mode !== "custom";
  if (!periodConfig.isValid) {
    taskReportInfo.textContent = periodConfig.error || "条件を確認してください、E;
    taskTypeReportList.innerHTML = "";
    taskTypeReportList.appendChild(buildEmptyState("条件を満たす作業区刁E��レポ�Eト�Eありません、E));
    return;
  }

  const reportData = buildTaskTypeReportData();
  const metricLabel = getSortMetricLabel(reportData.metric);
  const sortLabel = reportData.sortOrder === "asc" ? "少なぁE��E : "多い頁E;
  const rangeText = reportData.periodConfig.rangeText ? ` / 期間篁E��: ${reportData.periodConfig.rangeText}` : "";
  taskReportInfo.textContent = `対象期間: ${reportData.periodConfig.label}${rangeText} / 並び替え基溁E ${metricLabel} / 並び頁E ${sortLabel} / 対象記録: ${reportData.filteredRecords.length}件 / 作業区刁E��: ${reportData.taskEntries.length}件`;

  taskTypeReportList.innerHTML = "";
  if (!reportData.taskEntries.length) {
    taskTypeReportList.appendChild(buildEmptyState("条件を満たす作業区刁E��レポ�Eト�Eありません、E));
    return;
  }

  reportData.taskEntries.forEach((taskEntry, index) => {
    const card = document.createElement("details");
    card.className = "task-report-card";
    if (index < 2) card.open = true;
    card.innerHTML = `
      <summary>
        <h4 class="task-report-card__title">${escapeHtml(taskEntry.label)}</h4>
        <div class="task-report-card__summary">
          <span>件数: <strong>${escapeHtml(formatCount(taskEntry.count))}</strong></span>
          <span>総作業時間: <strong>${escapeHtml(formatHours(taskEntry.hours))}</strong></span>
          <span>延べ人晁E <strong>${escapeHtml(formatPersonHours(taskEntry.personHours))}</strong></span>
          <span>概算人件費: <strong>${escapeHtml(formatCurrency(taskEntry.laborCost))}</strong></span>
        </div>
      </summary>
      <div class="task-report-card__body">
        <section class="task-report-breakdown">
          <h5>園地別冁E��</h5>
          <div class="task-report-table-wrap">
            <table class="task-report-table">
              <thead>
                <tr><th>園地</th><th>件数</th><th>総作業時間</th><th>延べ人晁E/th><th>概算人件費</th></tr>
              </thead>
              <tbody>${buildTaskTypeMetricRowsHtml(taskEntry.orchardEntries, "園地別チE�Eタはありません、E)}</tbody>
            </table>
          </div>
        </section>
        <section class="task-report-breakdown">
          <h5>区画別冁E��</h5>
          <div class="task-report-table-wrap">
            <table class="task-report-table">
              <thead>
                <tr><th>区画</th><th>件数</th><th>総作業時間</th><th>延べ人晁E/th><th>概算人件費</th></tr>
              </thead>
              <tbody>${buildTaskTypeMetricRowsHtml(taskEntry.plotEntries, "区画別チE�Eタはありません、E)}</tbody>
            </table>
          </div>
        </section>
        <section class="task-report-breakdown">
          <h5>作業グループ別雁E��E/h5>
          <div class="task-report-table-wrap">
            <table class="task-report-table">
              <thead>
                <tr><th>作業グルーチE/th><th>件数</th><th>総作業時間</th><th>延べ人晁E/th><th>概算人件費</th></tr>
              </thead>
              <tbody>${buildTaskTypeMetricRowsHtml(taskEntry.groupEntries, "作業グループ別チE�Eタはありません、E)}</tbody>
            </table>
          </div>
        </section>
        <section class="task-report-breakdown">
          <h5>作業老E��総作業時間</h5>
          <div class="task-report-table-wrap">
            <table class="task-report-table">
              <thead>
                <tr><th>作業老E/th><th>総作業時間</th></tr>
              </thead>
              <tbody>${buildTaskTypeWorkerRowsHtml(taskEntry.workerEntries, "作業老E��チE�Eタはありません、E)}</tbody>
            </table>
          </div>
        </section>
      </div>
    `;
    taskTypeReportList.appendChild(card);
  });
}

function getVarietyReportPeriodConfig() {
  const mode = varietyReportPeriodInput?.value || "month";
  if (mode === "month") {
    const range = getCurrentMonthRange(today);
    return {
      mode,
      label: getComparisonPeriodLabel(mode),
      ...range,
      rangeText: `${formatDateYmd(range.from)}、E{formatDateYmd(range.to)}`,
      isValid: true
    };
  }
  if (mode === "fiscal") {
    const range = getFiscalYearRange(today);
    return {
      mode,
      label: getComparisonPeriodLabel(mode),
      ...range,
      rangeText: `${formatDateYmd(range.from)}、E{formatDateYmd(range.to)}`,
      isValid: true
    };
  }
  const from = varietyReportFromDateInput?.value || "";
  const to = varietyReportToDateInput?.value || "";
  if (!from || !to) {
    return { mode, label: getComparisonPeriodLabel(mode), from, to, isValid: false, error: "任意期間では開始日と終亁E��を�E力してください、E };
  }
  if (from > to) {
    return { mode, label: getComparisonPeriodLabel(mode), from, to, isValid: false, error: "任意期間�E終亁E��は開始日以降を持E��してください、E };
  }
  return {
    mode,
    label: getComparisonPeriodLabel(mode),
    from,
    to,
    rangeText: `${formatDateYmd(from)}、E{formatDateYmd(to)}`,
    isValid: true
  };
}

function buildVarietyTypeReportData() {
  const periodConfig = getVarietyReportPeriodConfig();
  const metric = varietyReportSortMetricInput?.value || "hours";
  const sortOrder = varietyReportSortOrderInput?.value === "asc" ? "asc" : "desc";
  const filteredRecords = filterRecordsByPeriod(periodConfig);
  const varietyMap = new Map();

  const getMetricBucket = (map, key, label) => {
    const current = map.get(key) || { label, count: 0, hours: 0, personHours: 0, laborCost: 0 };
    map.set(key, current);
    return current;
  };

  filteredRecords.forEach((record) => {
    const names = getRecordDisplay(record);
    const metrics = getRecordMetrics(record);
    const varietyKey = record.varietyId || names.varietyName;
    const varietyLabel = names.varietyName || "品種未設宁E;
    const varietyEntry = varietyMap.get(varietyKey) || {
      label: varietyLabel,
      count: 0,
      hours: 0,
      personHours: 0,
      laborCost: 0,
      orchardMap: new Map(),
      plotMap: new Map(),
      taskMap: new Map(),
      groupMap: new Map(),
      workerHourMap: new Map()
    };

    varietyEntry.count += 1;
    varietyEntry.hours += metrics.hours;
    varietyEntry.personHours += metrics.personHours;
    varietyEntry.laborCost += metrics.laborCost;

    const orchardKey = record.orchardId || names.orchardName;
    const orchardLabel = names.orchardName || "園地未設宁E;
    const orchardEntry = getMetricBucket(varietyEntry.orchardMap, orchardKey, orchardLabel);
    orchardEntry.count += 1;
    orchardEntry.hours += metrics.hours;
    orchardEntry.personHours += metrics.personHours;
    orchardEntry.laborCost += metrics.laborCost;

    const plotKey = record.plotId || `${names.orchardName}/${names.plotName}`;
    const plotLabel = `${names.orchardName || "園地未設宁E} / ${names.plotName || "区画未設宁E}`;
    const plotEntry = getMetricBucket(varietyEntry.plotMap, plotKey, plotLabel);
    plotEntry.count += 1;
    plotEntry.hours += metrics.hours;
    plotEntry.personHours += metrics.personHours;
    plotEntry.laborCost += metrics.laborCost;

    getRecordWorkTypes(record, { includeUnset: true }).forEach((taskLabel) => {
      const taskEntry = getMetricBucket(varietyEntry.taskMap, taskLabel, taskLabel);
      taskEntry.count += 1;
      taskEntry.hours += metrics.hours;
      taskEntry.personHours += metrics.personHours;
      taskEntry.laborCost += metrics.laborCost;
    });

    const groupKey = record.dailyGroupId || names.dailyGroupName;
    const groupLabel = names.dailyGroupName || "未設宁E;
    const groupEntry = getMetricBucket(varietyEntry.groupMap, groupKey, groupLabel);
    groupEntry.count += 1;
    groupEntry.hours += metrics.hours;
    groupEntry.personHours += metrics.personHours;
    groupEntry.laborCost += metrics.laborCost;

    getAssignedWorkers(record).forEach((worker) => {
      const workerKey = worker.id || worker.displayName;
      const workerLabel = worker.displayName || "未設宁E;
      const workerEntry = varietyEntry.workerHourMap.get(workerKey) || { label: workerLabel, hours: 0 };
      workerEntry.hours += metrics.hours;
      varietyEntry.workerHourMap.set(workerKey, workerEntry);
    });

    varietyMap.set(varietyKey, varietyEntry);
  });

  const workerSortDirection = sortOrder === "asc" ? 1 : -1;
  const varietyEntries = sortEntriesByMetric(Array.from(varietyMap.values()), metric, sortOrder).map((entry) => ({
    label: entry.label,
    count: entry.count,
    hours: entry.hours,
    personHours: entry.personHours,
    laborCost: entry.laborCost,
    orchardEntries: sortEntriesByMetric(Array.from(entry.orchardMap.values()), metric, sortOrder),
    plotEntries: sortEntriesByMetric(Array.from(entry.plotMap.values()), metric, sortOrder),
    taskEntries: sortEntriesByMetric(Array.from(entry.taskMap.values()), metric, sortOrder),
    groupEntries: sortEntriesByMetric(Array.from(entry.groupMap.values()), metric, sortOrder),
    workerEntries: Array.from(entry.workerHourMap.values()).sort((a, b) => {
      const byHours = (a.hours - b.hours) * workerSortDirection;
      if (byHours !== 0) return byHours;
      return a.label.localeCompare(b.label, "ja");
    })
  }));

  return {
    periodConfig,
    metric,
    sortOrder,
    filteredRecords,
    summary: getDailyReportSummary(filteredRecords),
    varietyEntries
  };
}

function renderVarietyTypeReport() {
  if (!varietyTypeReportList || !varietyReportInfo || !varietyReportRangeRow) return;
  const periodConfig = getVarietyReportPeriodConfig();
  varietyReportRangeRow.hidden = periodConfig.mode !== "custom";
  if (!periodConfig.isValid) {
    varietyReportInfo.textContent = periodConfig.error || "条件を確認してください、E;
    varietyTypeReportList.innerHTML = "";
    varietyTypeReportList.appendChild(buildEmptyState("条件を満たす品種別レポ�Eト�Eありません、E));
    return;
  }

  const reportData = buildVarietyTypeReportData();
  const metricLabel = getSortMetricLabel(reportData.metric);
  const sortLabel = reportData.sortOrder === "asc" ? "少なぁE��E : "多い頁E;
  const rangeText = reportData.periodConfig.rangeText ? ` / 期間篁E��: ${reportData.periodConfig.rangeText}` : "";
  varietyReportInfo.textContent = `対象期間: ${reportData.periodConfig.label}${rangeText} / 並び替え基溁E ${metricLabel} / 並び頁E ${sortLabel} / 対象記録: ${reportData.filteredRecords.length}件 / 品種数: ${reportData.varietyEntries.length}件`;

  varietyTypeReportList.innerHTML = "";
  if (!reportData.varietyEntries.length) {
    varietyTypeReportList.appendChild(buildEmptyState("条件を満たす品種別レポ�Eト�Eありません、E));
    return;
  }

  reportData.varietyEntries.forEach((varietyEntry, index) => {
    const card = document.createElement("details");
    card.className = "task-report-card";
    if (index < 2) card.open = true;
    card.innerHTML = `
      <summary>
        <h4 class="task-report-card__title">${escapeHtml(varietyEntry.label)}</h4>
        <div class="task-report-card__summary">
          <span>件数: <strong>${escapeHtml(formatCount(varietyEntry.count))}</strong></span>
          <span>総作業時間: <strong>${escapeHtml(formatHours(varietyEntry.hours))}</strong></span>
          <span>延べ人晁E <strong>${escapeHtml(formatPersonHours(varietyEntry.personHours))}</strong></span>
          <span>概算人件費: <strong>${escapeHtml(formatCurrency(varietyEntry.laborCost))}</strong></span>
        </div>
      </summary>
      <div class="task-report-card__body">
        <section class="task-report-breakdown">
          <h5>園地別冁E��</h5>
          <div class="task-report-table-wrap">
            <table class="task-report-table">
              <thead>
                <tr><th>園地</th><th>件数</th><th>総作業時間</th><th>延べ人晁E/th><th>概算人件費</th></tr>
              </thead>
              <tbody>${buildTaskTypeMetricRowsHtml(varietyEntry.orchardEntries, "園地別チE�Eタはありません、E)}</tbody>
            </table>
          </div>
        </section>
        <section class="task-report-breakdown">
          <h5>区画別冁E��</h5>
          <div class="task-report-table-wrap">
            <table class="task-report-table">
              <thead>
                <tr><th>区画</th><th>件数</th><th>総作業時間</th><th>延べ人晁E/th><th>概算人件費</th></tr>
              </thead>
              <tbody>${buildTaskTypeMetricRowsHtml(varietyEntry.plotEntries, "区画別チE�Eタはありません、E)}</tbody>
            </table>
          </div>
        </section>
        <section class="task-report-breakdown">
          <h5>作業区刁E��冁E��</h5>
          <div class="task-report-table-wrap">
            <table class="task-report-table">
              <thead>
                <tr><th>作業区刁E/th><th>件数</th><th>総作業時間</th><th>延べ人晁E/th><th>概算人件費</th></tr>
              </thead>
              <tbody>${buildTaskTypeMetricRowsHtml(varietyEntry.taskEntries, "作業区刁E��チE�Eタはありません、E)}</tbody>
            </table>
          </div>
        </section>
        <section class="task-report-breakdown">
          <h5>作業グループ別雁E��E/h5>
          <div class="task-report-table-wrap">
            <table class="task-report-table">
              <thead>
                <tr><th>作業グルーチE/th><th>件数</th><th>総作業時間</th><th>延べ人晁E/th><th>概算人件費</th></tr>
              </thead>
              <tbody>${buildTaskTypeMetricRowsHtml(varietyEntry.groupEntries, "作業グループ別チE�Eタはありません、E)}</tbody>
            </table>
          </div>
        </section>
        <section class="task-report-breakdown">
          <h5>作業老E��総作業時間</h5>
          <div class="task-report-table-wrap">
            <table class="task-report-table">
              <thead>
                <tr><th>作業老E/th><th>総作業時間</th></tr>
              </thead>
              <tbody>${buildTaskTypeWorkerRowsHtml(varietyEntry.workerEntries, "作業老E��チE�Eタはありません、E)}</tbody>
            </table>
          </div>
        </section>
      </div>
    `;
    varietyTypeReportList.appendChild(card);
  });
}

function getAnnualReportData() {
  const fiscalRange = getFiscalYearRange(today);
  const metric = annualReportSortMetricInput?.value || "hours";
  const sortOrder = annualReportSortOrderInput?.value === "asc" ? "asc" : "desc";
  const filteredRecords = records.filter((record) => record.workDate >= fiscalRange.from && record.workDate <= fiscalRange.to);
  const recordsWithMetrics = filteredRecords.map((record) => ({
    record,
    names: getRecordDisplay(record),
    metrics: getRecordMetrics(record)
  }));

  const buildMetricEntries = (getKey, getLabel) => {
    const map = new Map();
    recordsWithMetrics.forEach((item) => {
      const key = getKey(item) || "unset";
      const label = getLabel(item) || "未設宁E;
      const current = map.get(key) || { label, count: 0, hours: 0, personHours: 0, laborCost: 0 };
      current.count += 1;
      current.hours += item.metrics.hours;
      current.personHours += item.metrics.personHours;
      current.laborCost += item.metrics.laborCost;
      map.set(key, current);
    });
    return sortEntriesByMetric(Array.from(map.values()), metric, sortOrder);
  };

  const orchardEntries = buildMetricEntries(
    (item) => item.record.orchardId || item.names.orchardName,
    (item) => item.names.orchardName || "園地未設宁E
  );
  const plotEntries = buildMetricEntries(
    (item) => item.record.plotId || `${item.names.orchardName}/${item.names.plotName}`,
    (item) => `${item.names.orchardName || "園地未設宁E} / ${item.names.plotName || "区画未設宁E}`
  );
  const taskEntries = (() => {
    const map = new Map();
    recordsWithMetrics.forEach((item) => {
      getRecordWorkTypes(item.record, { includeUnset: true }).forEach((taskLabel) => {
        const current = map.get(taskLabel) || { label: taskLabel, count: 0, hours: 0, personHours: 0, laborCost: 0 };
        current.count += 1;
        current.hours += item.metrics.hours;
        current.personHours += item.metrics.personHours;
        current.laborCost += item.metrics.laborCost;
        map.set(taskLabel, current);
      });
    });
    return sortEntriesByMetric(Array.from(map.values()), metric, sortOrder);
  })();
  const varietyEntries = buildMetricEntries(
    (item) => item.record.varietyId || item.names.varietyName,
    (item) => item.names.varietyName || "品種未設宁E
  );
  const groupEntries = buildMetricEntries(
    (item) => item.record.dailyGroupId || item.names.dailyGroupName,
    (item) => item.names.dailyGroupName || "未設宁E
  );

  const workerSortDirection = sortOrder === "asc" ? 1 : -1;
  const workerHoursEntries = Array.from(
    filteredRecords.reduce((map, record) => {
      getAssignedWorkers(record).forEach((worker) => {
        const hours = Number(getWorkerHoursForRecord(record, worker.id, companySettings) || 0);
        if (!Number.isFinite(hours) || hours <= 0) return;
        const key = worker.id || worker.displayName;
        const current = map.get(key) || { label: worker.displayName || "未設宁E, hours: 0 };
        current.hours += hours;
        map.set(key, current);
      });
      return map;
    }, new Map()).values()
  ).sort((a, b) => {
    const byHours = (a.hours - b.hours) * workerSortDirection;
    if (byHours !== 0) return byHours;
    return a.label.localeCompare(b.label, "ja");
  });

  return {
    fiscalRange,
    periodLabel: `${formatDateYmd(fiscalRange.from)}、E{formatDateYmd(fiscalRange.to)}`,
    metric,
    sortOrder,
    filteredRecords,
    summary: getDailyReportSummary(filteredRecords),
    orchardEntries,
    plotEntries,
    taskEntries,
    varietyEntries,
    groupEntries,
    workerHoursEntries
  };
}

function renderAnnualReport() {
  if (!annualReportInfo || !annualReportSummary || !annualReportList) return;
  const data = getAnnualReportData();
  const metricLabel = getSortMetricLabel(data.metric);
  const sortLabel = data.sortOrder === "asc" ? "少なぁE��E : "多い頁E;
  annualReportInfo.textContent = `対象決算年度: ${data.periodLabel} / 並び替え基溁E ${metricLabel} / 並び頁E ${sortLabel} / 対象記録: ${data.filteredRecords.length}件`;

  annualReportSummary.innerHTML = `
    <div class="annual-report-summary__item"><span>対象決算年度</span><strong>${escapeHtml(data.periodLabel)}</strong></div>
    <div class="annual-report-summary__item"><span>総作業件数</span><strong>${escapeHtml(formatCount(data.summary.count))}</strong></div>
    <div class="annual-report-summary__item"><span>総作業時間</span><strong>${escapeHtml(formatHours(data.summary.hours))}</strong></div>
    <div class="annual-report-summary__item"><span>総延べ人晁E/span><strong>${escapeHtml(formatPersonHours(data.summary.personHours))}</strong></div>
    <div class="annual-report-summary__item"><span>総概算人件費</span><strong>${escapeHtml(formatCurrency(data.summary.laborCost))}</strong></div>
  `;

  const metricSection = (title, labelColumn, entries, emptyMessage) => `
    <section class="task-report-breakdown">
      <h5>${escapeHtml(title)}</h5>
      <div class="task-report-table-wrap">
        <table class="task-report-table">
          <thead>
            <tr><th>${escapeHtml(labelColumn)}</th><th>件数</th><th>総作業時間</th><th>延べ人晁E/th><th>概算人件費</th></tr>
          </thead>
          <tbody>${buildTaskTypeMetricRowsHtml(entries, emptyMessage)}</tbody>
        </table>
      </div>
    </section>
  `;
  const workerSection = `
    <section class="task-report-breakdown">
      <h5>作業老E��年間総作業時間</h5>
      <div class="task-report-table-wrap">
        <table class="task-report-table">
          <thead>
            <tr><th>作業老E/th><th>総作業時間</th></tr>
          </thead>
          <tbody>${buildTaskTypeWorkerRowsHtml(data.workerHoursEntries, "作業老E��チE�Eタはありません、E)}</tbody>
        </table>
      </div>
    </section>
  `;

  annualReportList.innerHTML = `
    <article class="task-report-card">
      <div class="task-report-card__body">
        ${metricSection("園地別年間集訁E, "園地", data.orchardEntries, "園地チE�Eタはありません、E)}
        ${metricSection("区画別年間集訁E, "区画", data.plotEntries, "区画チE�Eタはありません、E)}
        ${metricSection("作業区刁E��年間集訁E, "作業区刁E, data.taskEntries, "作業区刁E��ータはありません、E)}
        ${metricSection("品種別年間集訁E, "品種", data.varietyEntries, "品種チE�Eタはありません、E)}
        ${metricSection("グループ別年間集訁E, "作業グルーチE, data.groupEntries, "グループデータはありません、E)}
        ${workerSection}
      </div>
    </article>
  `;
}

function getWorkerNameList(record) {
  const assignedWorkers = getAssignedWorkers(record);
  if (assignedWorkers.length) return assignedWorkers.map((worker) => worker.displayName);
  if (Array.isArray(record.workerNames) && record.workerNames.length) return record.workerNames;
  if (record.workerDisplayName) return [record.workerDisplayName];
  return record.workerName ? [record.workerName] : [];
}

function getWorkerDisplay(worker) {
  if (!worker) return "未登録";
  const primaryGroup = getWorkerPrimaryGroup(worker);
  return `${worker.displayName} (${worker.category}${primaryGroup ? ` / 主所屁E${primaryGroup.name}` : ""})`;
}

function getRecordDisplay(record) {
  const orchard = getOrchardById(record.orchardId);
  const plot = getPlotById(record.plotId);
  const variety = getVarietyById(record.varietyId);
  const dailyGroup = getGroupById(record.dailyGroupId);
  const fixedTeamSet = getTeamSetById(record.fixedTeamSetId);
  const primaryWorker = getPrimaryWorker(record);
  const primaryGroup = getWorkerPrimaryGroup(primaryWorker);
  return {
    orchardName: orchard?.name || record.orchardName || "園地未設宁E,
    plotName: plot?.name || record.plotName || "区画未設宁E,
    varietyName: variety?.name || record.varietyName || "品種未設宁E,
    dailyGroupName: dailyGroup?.name || record.dailyGroupName || "未設宁E,
    fixedTeamSetName: fixedTeamSet?.name || record.fixedTeamSetName || "未使用",
    workerName: primaryWorker?.displayName || record.workerDisplayName || record.workerName || "未登録",
    workerListText: getWorkerNameList(record).join("、E) || "未登録",
    workerFullName: primaryWorker?.fullName || record.workerName || "未登録",
    workerCategory: primaryWorker?.category || record.workerCategory || "未設宁E,
    workerHourlyRate: Number(primaryWorker?.hourlyRate ?? record.workerHourlyRate ?? 0),
    primaryGroupName: primaryGroup?.name || "未設宁E
  };
}

function renderSelectOptions(select, items, config) {
  const { placeholder, allowBlank = false, value = "", labelBuilder = (item) => item.name } = config;
  select.innerHTML = "";
  select.appendChild(createOption("", placeholder));
  items.forEach((item) => select.appendChild(createOption(item.id, labelBuilder(item))));
  if (!allowBlank && !items.length) {
    select.disabled = true;
    select.value = "";
    return;
  }
  select.disabled = false;
  select.value = items.some((item) => item.id === value) ? value : "";
}

function getActiveWorkers() {
  return masters.workers.filter((worker) => worker.isActive);
}

function getEligibleWorkersByGroup(groupId) {
  if (!groupId) return [];
  const eligibleIds = new Set(getMembershipsByGroupId(groupId).map((item) => item.workerId));
  return getActiveWorkers().filter((worker) => eligibleIds.has(worker.id));
}

function getSelectableWorkers(selectedIds = [], dailyGroupId = "") {
  const eligibleWorkers = getEligibleWorkersByGroup(dailyGroupId);
  if (!selectedIds.length) return eligibleWorkers;
  const selectedWorkers = selectedIds.map((id) => getWorkerById(id)).filter((worker) => worker && getMembershipsByGroupId(dailyGroupId).some((item) => item.workerId === worker.id));
  const merged = [...eligibleWorkers];
  selectedWorkers.forEach((worker) => {
    if (!merged.some((item) => item.id === worker.id)) merged.push(worker);
  });
  return merged;
}

function getSelectedFormShiftType() {
  return normalizeShiftType(workShiftTypeInput?.value, WORK_SHIFT_TYPE.FULL_DAY);
}

function getFormBreakMinutes(settings = companySettings) {
  const normalized = normalizeCompanySettings(settings);
  const selectedShiftType = getSelectedFormShiftType();
  const fallbackBreakMinutes = selectedShiftType === WORK_SHIFT_TYPE.MANUAL
    ? 0
    : getDefaultBreakMinutesForShiftType(selectedShiftType, normalized);
  return normalizeBreakMinutes(
    breakMinutesInput?.value,
    fallbackBreakMinutes
  );
}

function getFormManualWorkHours(settings = companySettings) {
  return normalizeManualHours(workHoursInput?.value, settings);
}

function getFormCalculatedWorkHours(settings = companySettings) {
  const breakMinutes = getFormBreakMinutes(settings);
  return calculateHoursFromRange(
    startTimeInput?.value,
    endTimeInput?.value,
    settings,
    breakMinutes
  );
}

function getResolvedWorkHoursFromForm(settings = companySettings) {
  const normalizedSettings = normalizeCompanySettings(settings);
  const shiftType = getSelectedFormShiftType();
  const manualHours = getFormManualWorkHours(settings);
  if (manualHours !== null) return manualHours;
  if (shiftType === WORK_SHIFT_TYPE.MANUAL) return 0;
  const calculatedHours = getFormCalculatedWorkHours(settings);
  if (Number.isFinite(calculatedHours)) return calculatedHours;
  const standardByInputBreak = calculateHoursFromRange(
    normalizedSettings.workdayStartTime,
    normalizedSettings.workdayEndTime,
    normalizedSettings,
    getFormBreakMinutes(normalizedSettings)
  );
  if (Number.isFinite(standardByInputBreak)) return standardByInputBreak;
  return getDefaultWorkHours(normalizedSettings);
}

function pruneWorkerTimeDetailsDraft() {
  const selectedSet = new Set(selectedWorkerIds);
  Object.keys(workerTimeDetailsDraft).forEach((workerId) => {
    if (!selectedSet.has(workerId)) {
      delete workerTimeDetailsDraft[workerId];
    }
  });
}

function applyCommonTimeToSelectedWorkers() {
  if (!selectedWorkerIds.length) return;
  const commonManualHours = getFormManualWorkHours(companySettings);
  const commonDetail = {
    workType: getSelectedFormShiftType(),
    startTime: normalizeTimeText(startTimeInput?.value, ""),
    endTime: normalizeTimeText(endTimeInput?.value, ""),
    breakMinutes: getFormBreakMinutes(companySettings),
    manualHours: commonManualHours,
    manualWorkHours: commonManualHours
  };
  selectedWorkerIds.forEach((workerId) => {
    workerTimeDetailsDraft[workerId] = { ...commonDetail };
  });
  renderWorkerTimeDetailList();
}

function renderWorkerTimeDetailList() {
  if (!workerTimeDetailList) return;
  workerTimeDetailList.innerHTML = "";
  if (!selectedWorkerIds.length) {
    workerTimeDetailList.appendChild(buildEmptyState("作業者を選ぶと、ここで個別の勤務時間を調整できます。"));
    return;
  }
  const normalizedSettings = normalizeCompanySettings(companySettings);
  const commonDetail = {
    workType: getSelectedFormShiftType(),
    startTime: normalizeTimeText(startTimeInput?.value, ""),
    endTime: normalizeTimeText(endTimeInput?.value, ""),
    breakMinutes: getFormBreakMinutes(normalizedSettings),
    payrollHours: getResolvedWorkHoursFromForm(normalizedSettings),
    workHours: getResolvedWorkHoursFromForm(normalizedSettings)
  };

  selectedWorkerIds.forEach((workerId) => {
    const worker = getWorkerById(workerId);
    if (!worker) return;
    const normalizedDetail = normalizeWorkerTimeDetailEntry(
      workerTimeDetailsDraft[workerId] || {},
      commonDetail,
      normalizedSettings
    );
    workerTimeDetailsDraft[workerId] = {
      workType: normalizedDetail.workType,
      shiftType: normalizedDetail.workType,
      startTime: normalizedDetail.startTime,
      endTime: normalizedDetail.endTime,
      breakMinutes: normalizedDetail.breakMinutes,
      manualHours: normalizedDetail.manualHours,
      manualWorkHours: normalizedDetail.manualWorkHours,
      payrollHours: normalizedDetail.payrollHours
    };

    const card = document.createElement("article");
    card.className = "worker-time-detail-card";

    const header = document.createElement("div");
    header.className = "worker-time-detail-card__header";
    const title = document.createElement("strong");
    title.textContent = `${worker.displayName} の勤務時間`;
    const rate = document.createElement("span");
    rate.textContent = formatCurrency(worker.hourlyRate || 0);
    header.append(title, rate);

    const row = document.createElement("div");
    row.className = "form-row form-row--triple";

    const shiftLabel = document.createElement("label");
    shiftLabel.textContent = "勤務区分";
    const shiftInput = document.createElement("select");
    [
      { value: WORK_SHIFT_TYPE.FULL_DAY, label: "標準1日" },
      { value: WORK_SHIFT_TYPE.MORNING, label: "午前のみ" },
      { value: WORK_SHIFT_TYPE.AFTERNOON, label: "午後のみ" },
      { value: WORK_SHIFT_TYPE.CUSTOM, label: "時間指定" },
      { value: WORK_SHIFT_TYPE.MANUAL, label: "手入力" }
    ].forEach((optionItem) => {
      const option = document.createElement("option");
      option.value = optionItem.value;
      option.textContent = optionItem.label;
      shiftInput.appendChild(option);
    });
    shiftInput.value = normalizeShiftType(normalizedDetail.workType, WORK_SHIFT_TYPE.CUSTOM);
    shiftInput.addEventListener("change", () => {
      const nextWorkType = normalizeShiftType(shiftInput.value, WORK_SHIFT_TYPE.CUSTOM);
      const preset = getShiftPreset(nextWorkType, normalizedSettings);
      const previous = workerTimeDetailsDraft[workerId] || {};
      const nextDraft = {
        ...previous,
        workType: nextWorkType,
        shiftType: nextWorkType
      };
      if (nextWorkType === WORK_SHIFT_TYPE.MANUAL) {
        nextDraft.startTime = "";
        nextDraft.endTime = "";
        nextDraft.breakMinutes = 0;
      } else if (nextWorkType === WORK_SHIFT_TYPE.CUSTOM) {
        nextDraft.breakMinutes = normalizeBreakMinutes(previous.breakMinutes, 0);
      } else {
        nextDraft.startTime = preset.startTime;
        nextDraft.endTime = preset.endTime;
        nextDraft.breakMinutes = preset.breakMinutes;
      }
      workerTimeDetailsDraft[workerId] = nextDraft;
      renderWorkerTimeDetailList();
    });
    shiftLabel.appendChild(shiftInput);

    const startLabel = document.createElement("label");
    startLabel.textContent = "開始";
    const startInput = document.createElement("input");
    startInput.type = "time";
    startInput.value = normalizedDetail.startTime;
    startInput.disabled = normalizedDetail.workType === WORK_SHIFT_TYPE.MANUAL;
    startInput.addEventListener("change", () => {
      workerTimeDetailsDraft[workerId] = {
        ...workerTimeDetailsDraft[workerId],
        startTime: startInput.value
      };
      renderWorkerTimeDetailList();
    });
    startLabel.appendChild(startInput);

    const endLabel = document.createElement("label");
    endLabel.textContent = "終了";
    const endInput = document.createElement("input");
    endInput.type = "time";
    endInput.value = normalizedDetail.endTime;
    endInput.disabled = normalizedDetail.workType === WORK_SHIFT_TYPE.MANUAL;
    endInput.addEventListener("change", () => {
      workerTimeDetailsDraft[workerId] = {
        ...workerTimeDetailsDraft[workerId],
        endTime: endInput.value
      };
      renderWorkerTimeDetailList();
    });
    endLabel.appendChild(endInput);

    const breakLabel = document.createElement("label");
    breakLabel.textContent = "控除時間（分）";
    const breakInput = document.createElement("input");
    breakInput.type = "number";
    breakInput.min = "0";
    breakInput.max = "600";
    breakInput.step = "15";
    breakInput.inputMode = "numeric";
    breakInput.value = String(normalizedDetail.breakMinutes);
    breakInput.disabled = normalizedDetail.workType === WORK_SHIFT_TYPE.MANUAL;
    breakInput.addEventListener("change", () => {
      workerTimeDetailsDraft[workerId] = {
        ...workerTimeDetailsDraft[workerId],
        breakMinutes: breakInput.value
      };
      renderWorkerTimeDetailList();
    });
    breakLabel.appendChild(breakInput);

    const manualLabel = document.createElement("label");
    manualLabel.textContent = "実労働時間（手入力）";
    const manualInput = document.createElement("input");
    manualInput.type = "number";
    manualInput.min = "0";
    manualInput.max = "24";
    manualInput.step = "0.25";
    manualInput.inputMode = "decimal";
    manualInput.placeholder = "例: 4.0";
    manualInput.value = normalizedDetail.manualHours ?? "";
    manualInput.addEventListener("change", () => {
      workerTimeDetailsDraft[workerId] = {
        ...workerTimeDetailsDraft[workerId],
        manualHours: normalizeText(manualInput.value) ? manualInput.value : null,
        manualWorkHours: normalizeText(manualInput.value) ? manualInput.value : null
      };
      renderWorkerTimeDetailList();
    });
    manualLabel.appendChild(manualInput);

    row.append(shiftLabel, startLabel, endLabel);
    const row2 = document.createElement("div");
    row2.className = "form-row form-row--triple";
    row2.append(breakLabel, manualLabel);
    card.append(header, row, row2);

    const calcText = Number.isFinite(normalizedDetail.calculatedHours)
      ? `${normalizedDetail.calculatedHours.toFixed(2).replace(/\.?0+$/, "")}時間`
      : "-";
    const resolvedText = Number.isFinite(normalizedDetail.payrollHours)
      ? `${normalizedDetail.payrollHours.toFixed(2).replace(/\.?0+$/, "")}時間`
      : "-";
    const summary = document.createElement("p");
    summary.className = "worker-time-detail-card__calc";
    summary.textContent = `勤務区分: ${getShiftTypeLabel(normalizedDetail.workType)} / 自動計算: ${calcText} / 給与計算に使う時間: ${resolvedText}`;
    card.append(summary);

    workerTimeDetailList.appendChild(card);
  });
}

function syncWorkerCountFromSelection() {
  workerCountInput.value = selectedWorkerIds.length ? String(selectedWorkerIds.length) : "";
}

function renderWorkerSelectionList() {
  const teamPlan = getTeamPlan(workDateInput.value, groupSelect.value);
  if (teamPlan) {
    recordAppliedTeamSetId = teamPlan.fixedTeamSetId || "";
    recordAppliedTeamSetName = teamPlan.fixedTeamSetName || "";
  }
  if (teamPlan && !selectedWorkerIds.length) {
    selectedWorkerIds = teamPlan.workerIds.slice();
    syncWorkerCountFromSelection();
  }
  const selectableWorkers = teamPlan
    ? teamPlan.workerIds.map((workerId) => getWorkerById(workerId)).filter(Boolean)
    : getSelectableWorkers(selectedWorkerIds, groupSelect.value);
  workerSelectionList.innerHTML = "";

  if (!groupSelect.value) {
    selectedWorkerIds = [];
    workerTimeDetailsDraft = {};
    syncWorkerCountFromSelection();
    recordAppliedTeamSetId = "";
    recordAppliedTeamSetName = "";
    selectedWorkerCount.textContent = "0人選抁E;
    workerPickerHint.textContent = "先に当日グループを選択してください、E;
    workerSelectionList.appendChild(buildEmptyState("グループを選ぶと、そのグループに所属可能な作業老E��け表示されます、E));
    renderWorkerTimeDetailList();
    return;
  }

  if (!selectableWorkers.length) {
    selectedWorkerIds = [];
    workerTimeDetailsDraft = {};
    syncWorkerCountFromSelection();
    selectedWorkerCount.textContent = "0人選抁E;
    workerPickerHint.textContent = "こ�Eグループに所属可能な有効作業老E��ぁE��せん、E;
    workerSelectionList.appendChild(buildEmptyState("作業老E��属グループ設定で所属状況を確認してください、E));
    renderWorkerTimeDetailList();
    return;
  }

  selectedWorkerIds = selectedWorkerIds.filter((workerId) => selectableWorkers.some((worker) => worker.id === workerId));
  pruneWorkerTimeDetailsDraft();
  syncWorkerCountFromSelection();
  selectedWorkerCount.textContent = `${selectedWorkerIds.length}人選択`;
  workerPickerHint.textContent = "褁E��選択できます。選択人数は作業人数へ自動反映されますが、手入力で修正もできます、E;

  selectableWorkers.forEach((worker) => {
    const label = document.createElement("label");
    label.className = "worker-selection-item";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = worker.id;
    checkbox.checked = selectedWorkerIds.includes(worker.id);
    checkbox.addEventListener("change", () => {
      selectedWorkerIds = checkbox.checked
        ? [...new Set([...selectedWorkerIds, worker.id])]
        : selectedWorkerIds.filter((workerId) => workerId !== worker.id);
      pruneWorkerTimeDetailsDraft();
      selectedWorkerCount.textContent = `${selectedWorkerIds.length}人選択`;
      syncWorkerCountFromSelection();
      renderWorkerTimeDetailList();
    });

    const body = document.createElement("span");
    body.className = "worker-selection-item__body";
    const title = document.createElement("strong");
    title.textContent = worker.displayName;
    const primaryGroup = getWorkerPrimaryGroup(worker);
    const meta = document.createElement("span");
    meta.textContent = `${worker.fullName} ・ ${worker.category} ・ 主所屁E${primaryGroup?.name || "未設宁E} ・ ${formatCurrency(worker.hourlyRate)}`;
    body.append(title, meta);
    label.append(checkbox, body);
    workerSelectionList.appendChild(label);
  });
  renderWorkerTimeDetailList();
}

function renderTeamPlanWorkerList() {
  teamPlanWorkerList.innerHTML = "";
  const workDate = teamPlanDateInput.value;
  const groupId = teamPlanGroupInput.value;
  if (!workDate || !groupId) {
    renderSelectOptions(teamSetSelectInput, [], {
      placeholder: "先に作業グループを選択してください",
      allowBlank: true,
      value: ""
    });
    teamSetHint.textContent = "固定チームセチE��を呼び出すと、参加老E��一括で反映できます、E;
    teamPlanSelectedCount.textContent = "0人選抁E;
    teamPlanHint.textContent = "日付と作業グループを選択してください、E;
    teamPlanWorkerList.appendChild(buildEmptyState("所属老E��基本に、応援老E��含めてそ�E日の参加老E��決められます、E));
    renderTodayMemberStatusBoard();
    return;
  }

  const availableTeamSets = getTeamSetsByGroupId(groupId);
  const existingPlan = getTeamPlan(workDate, groupId);
  const preferredTeamSetId = existingPlan?.fixedTeamSetId || teamSetSelectInput.value;
  renderSelectOptions(teamSetSelectInput, availableTeamSets, {
    placeholder: availableTeamSets.length ? "固定チームセチE��を選択してください" : "こ�Eグループ�E固定セチE��はありません",
    allowBlank: true,
    value: preferredTeamSetId,
    labelBuilder: (teamSet) => teamSet.name
  });
  const selectedTeamSet = getTeamSetById(teamSetSelectInput.value);
  teamSetHint.textContent = selectedTeamSet
    ? `現在選択中: ${selectedTeamSet.name}�E�忁E��に応じて欠勤老E��外し、応援老E��追加できます）`
    : "固定チームセチE��を呼び出すと、参加老E��一括で反映できます、E;

  const memberships = getMembershipsByGroupId(groupId);
  const defaultMemberIds = memberships.map((membership) => membership.workerId);
  if (!selectedTeamPlanWorkerIds.length) {
    selectedTeamPlanWorkerIds = existingPlan?.workerIds?.length ? existingPlan.workerIds.slice() : defaultMemberIds.slice();
    teamPlanIdInput.value = existingPlan?.id || "";
  }

  const workers = getActiveWorkers();
  teamPlanSelectedCount.textContent = `${selectedTeamPlanWorkerIds.length}人選択`;
  teamPlanHint.textContent = "欠勤老E�E外し、他グループ所属�E応援老E��追加できます、E;

  workers.forEach((worker) => {
    const label = document.createElement("label");
    label.className = "worker-selection-item";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = selectedTeamPlanWorkerIds.includes(worker.id);
    checkbox.addEventListener("change", () => {
      selectedTeamPlanWorkerIds = checkbox.checked
        ? [...new Set([...selectedTeamPlanWorkerIds, worker.id])]
        : selectedTeamPlanWorkerIds.filter((workerId) => workerId !== worker.id);
      teamPlanSelectedCount.textContent = `${selectedTeamPlanWorkerIds.length}人選択`;
    });

    const body = document.createElement("span");
    body.className = "worker-selection-item__body";
    const title = document.createElement("strong");
    const supportFlag = defaultMemberIds.includes(worker.id) ? "" : " / 応援候裁E;
    title.textContent = `${worker.displayName}${supportFlag}`;
    const meta = document.createElement("span");
    meta.textContent = `${renderWorkerMembershipSummary(worker)} ・ ${worker.category}`;
    body.append(title, meta);
    label.append(checkbox, body);
    teamPlanWorkerList.appendChild(label);
  });
  renderTodayMemberStatusBoard();
}

function renderTeamSetWorkerList() {
  teamSetWorkerList.innerHTML = "";
  const groupId = teamSetGroupIdInput.value;
  const workers = getActiveWorkers();
  if (!groupId) {
    teamSetSelectedCount.textContent = "0人選抁E;
    teamSetWorkerHint.textContent = "先に作業グループを選択してください、E;
    teamSetWorkerList.appendChild(buildEmptyState("作業グループを選択すると、セチE��作業老E��選べます、E));
    return;
  }
  if (!workers.length) {
    teamSetSelectedCount.textContent = "0人選抁E;
    teamSetWorkerHint.textContent = "有効作業老E��ぁE��せん、E;
    teamSetWorkerList.appendChild(buildEmptyState("作業老E�Eスターで有効な作業老E��登録してください、E));
    return;
  }

  teamSetSelectedCount.textContent = `${selectedTeamSetWorkerIds.length}人選択`;
  teamSetWorkerHint.textContent = "セチE��に登録した後も、日別編成で欠勤老E��外�E応援老E��加ができます、E;
  workers.forEach((worker) => {
    const label = document.createElement("label");
    label.className = "worker-selection-item";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = selectedTeamSetWorkerIds.includes(worker.id);
    checkbox.addEventListener("change", () => {
      selectedTeamSetWorkerIds = checkbox.checked
        ? [...new Set([...selectedTeamSetWorkerIds, worker.id])]
        : selectedTeamSetWorkerIds.filter((workerId) => workerId !== worker.id);
      teamSetSelectedCount.textContent = `${selectedTeamSetWorkerIds.length}人選択`;
    });
    const body = document.createElement("span");
    body.className = "worker-selection-item__body";
    const title = document.createElement("strong");
    title.textContent = worker.displayName;
    const meta = document.createElement("span");
    meta.textContent = `${renderWorkerMembershipSummary(worker)} ・ ${worker.category}`;
    body.append(title, meta);
    label.append(checkbox, body);
    teamSetWorkerList.appendChild(label);
  });
}

function applyTeamPlanToRecordForm(plan) {
  if (!plan) {
    return;
  }
  workDateInput.value = plan.workDate;
  groupSelect.value = plan.groupId;
  recordAppliedTeamSetId = plan.fixedTeamSetId || "";
  recordAppliedTeamSetName = plan.fixedTeamSetName || getTeamSetById(plan.fixedTeamSetId)?.name || "";
  selectedWorkerIds = plan.workerIds.slice();
  syncWorkerCountFromSelection();
  renderWorkerSelectionList();
}

function syncMembershipPrimaryOptions() {
  const selectedGroupItems = sortGroups(masters.groups.filter((group) => selectedMembershipGroupIds.includes(group.id)));
  renderSelectOptions(membershipPrimaryGroupIdInput, selectedGroupItems, {
    placeholder: selectedGroupItems.length ? "主所属グループを選択してください" : "先に所属グループを選択してください",
    value: membershipPrimaryGroupIdInput.value
  });
}

function renderMembershipGroupList() {
  membershipGroupList.innerHTML = "";
  const workerId = membershipWorkerIdInput.value;
  if (!workerId) {
    membershipSelectedCount.textContent = "0件選抁E;
    membershipHint.textContent = "先に作業老E��選択してください、E;
    membershipGroupList.appendChild(buildEmptyState("作業老E��選ぶと所属グループ設定が表示されます、E));
    syncMembershipPrimaryOptions();
    return;
  }

  const groups = sortGroups(masters.groups);
  const existingMemberships = getMembershipsByWorkerId(workerId);
  if (!selectedMembershipGroupIds.length) {
    selectedMembershipGroupIds = existingMemberships.map((membership) => membership.groupId);
    const primary = existingMemberships.find((membership) => membership.isPrimary);
    membershipPrimaryGroupIdInput.value = primary?.groupId || selectedMembershipGroupIds[0] || "";
  }

  membershipSelectedCount.textContent = `${selectedMembershipGroupIds.length}件選択`;
  membershipHint.textContent = "褁E��所属できます。主所属グループ�E1つだけ設定してください、E;

  groups.forEach((group) => {
    const label = document.createElement("label");
    label.className = "worker-selection-item";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = group.id;
    checkbox.checked = selectedMembershipGroupIds.includes(group.id);
    checkbox.addEventListener("change", () => {
      selectedMembershipGroupIds = checkbox.checked
        ? [...new Set([...selectedMembershipGroupIds, group.id])]
        : selectedMembershipGroupIds.filter((groupId) => groupId !== group.id);
      membershipSelectedCount.textContent = `${selectedMembershipGroupIds.length}件選択`;
      if (!selectedMembershipGroupIds.includes(membershipPrimaryGroupIdInput.value)) {
        membershipPrimaryGroupIdInput.value = selectedMembershipGroupIds[0] || "";
      }
      syncMembershipPrimaryOptions();
    });

    const body = document.createElement("span");
    body.className = "worker-selection-item__body";
    const title = document.createElement("strong");
    title.textContent = `${group.sortOrder}. ${group.name}`;
    const meta = document.createElement("span");
    meta.textContent = `${group.description || "説明なぁE}${group.isActive ? "" : " ・ 無効"}`;
    body.append(title, meta);
    label.append(checkbox, body);
    membershipGroupList.appendChild(label);
  });

  syncMembershipPrimaryOptions();
}

function getMembershipWorkerIdsByGroupId(groupId) {
  if (!groupId) return [];
  return getMembershipsByGroupId(groupId).map((membership) => membership.workerId);
}

function syncWorkerPrimaryGroupsFromMemberships(previousPrimaryByWorkerId = null) {
  const membershipMap = new Map();
  masters.workerGroupMemberships.forEach((membership) => {
    if (!membershipMap.has(membership.workerId)) {
      membershipMap.set(membership.workerId, []);
    }
    membershipMap.get(membership.workerId).push(membership);
  });

  masters.workers = masters.workers.map((worker) => {
    const memberships = membershipMap.get(worker.id) || [];
    let primaryGroupId = normalizeText(worker.primaryGroupId);
    const previousPrimary = normalizeText(previousPrimaryByWorkerId?.get(worker.id));
    if (previousPrimary && memberships.some((membership) => membership.groupId === previousPrimary)) {
      primaryGroupId = previousPrimary;
    } else if (!primaryGroupId || !memberships.some((membership) => membership.groupId === primaryGroupId)) {
      primaryGroupId = memberships[0]?.groupId || "";
    }
    return {
      ...worker,
      primaryGroupId
    };
  });

  masters.workerGroupMemberships = masters.workerGroupMemberships.map((membership) => {
    const worker = getWorkerById(membership.workerId);
    return {
      ...membership,
      isPrimary: membership.groupId === (worker?.primaryGroupId || "")
    };
  });
}

function renderGroupMemberList() {
  if (!groupMemberList || !groupMemberHint || !groupMemberSelectedCount) return;
  groupMemberList.innerHTML = "";
  const workers = [...masters.workers].sort((a, b) => (a.displayName || "").localeCompare((b.displayName || ""), "ja"));
  const currentGroupId = normalizeText(groupIdInput?.value);
  if (currentGroupId && !selectedGroupMemberWorkerIds.length) {
    selectedGroupMemberWorkerIds = getMembershipWorkerIdsByGroupId(currentGroupId);
  }

  if (!workers.length) {
    selectedGroupMemberWorkerIds = [];
    groupMemberSelectedCount.textContent = "0人選抁E;
    groupMemberHint.textContent = "先に作業老E��登録してください、E;
    groupMemberList.appendChild(buildEmptyState("登録済み作業老E��ありません、E));
    return;
  }

  selectedGroupMemberWorkerIds = selectedGroupMemberWorkerIds.filter((workerId) => workers.some((worker) => worker.id === workerId));
  groupMemberSelectedCount.textContent = `${selectedGroupMemberWorkerIds.length}人選択`;
  groupMemberHint.textContent = currentGroupId
    ? "チェチE��した作業老E��こ�Eグループに所属させます、E
    : "新しいグループを保存すると、チェチE��した作業老E��所属させます、E;

  workers.forEach((worker) => {
    const label = document.createElement("label");
    label.className = "worker-selection-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = worker.id;
    checkbox.checked = selectedGroupMemberWorkerIds.includes(worker.id);
    checkbox.addEventListener("change", () => {
      selectedGroupMemberWorkerIds = checkbox.checked
        ? [...new Set([...selectedGroupMemberWorkerIds, worker.id])]
        : selectedGroupMemberWorkerIds.filter((workerId) => workerId !== worker.id);
      groupMemberSelectedCount.textContent = `${selectedGroupMemberWorkerIds.length}人選択`;
    });

    const body = document.createElement("span");
    body.className = "worker-selection-item__body";
    const title = document.createElement("strong");
    title.textContent = worker.displayName;
    const primaryGroupName = getGroupById(worker.primaryGroupId)?.name || "未設宁E;
    const meta = document.createElement("span");
    meta.textContent = `${worker.fullName} ・ ${worker.category} ・ 主所屁E${primaryGroupName} ・ ${worker.isActive ? "出勤対象" : "対象夁E}`;
    body.append(title, meta);

    label.append(checkbox, body);
    groupMemberList.appendChild(label);
  });
}

function renderMasterSelects() {
  const selectedOrchardId = orchardSelect.value;
  const selectedPlotId = plotSelect.value;
  const selectedVarietyId = varietySelect.value;
  const selectedDailyGroupId = groupSelect.value;
  const selectedPlotFormOrchardId = plotOrchardInput.value;
  const selectedOrchardFilter = orchardFilterInput.value;
  const selectedVarietyFilter = varietyFilterInput.value;
  const selectedTaskFilter = taskFilterInput?.value || "";
  const selectedWorkerFilter = workerFilterInput.value;
  const selectedWorkerGroupFilter = workerGroupFilterInput?.value || "";
  const selectedTodayMemberGroupFilter = todayMemberGroupFilterInput?.value || "";
  const selectedMembershipWorkerId = membershipWorkerIdInput.value;
  const selectedTeamPlanGroupId = teamPlanGroupInput.value;
  const selectedTeamSetGroupId = teamSetGroupIdInput.value;
  const sortedGroups = sortGroups(masters.groups);
  const activeGroups = sortedGroups.filter((group) => group.isActive);

  renderSelectOptions(orchardSelect, masters.orchards, {
    placeholder: "園地を選択してください",
    value: selectedOrchardId
  });
  renderSelectOptions(plotOrchardInput, masters.orchards, {
    placeholder: masters.orchards.length ? "所属園地を選択してください" : "先に園地を登録してください",
    value: selectedPlotFormOrchardId
  });
  renderSelectOptions(orchardFilterInput, masters.orchards, {
    placeholder: "すべての園地",
    allowBlank: true,
    value: selectedOrchardFilter
  });
  renderSelectOptions(varietySelect, masters.varieties, {
    placeholder: masters.varieties.length ? "品種を選択してください" : "先に品種を登録してください",
    value: selectedVarietyId
  });
  renderSelectOptions(varietyFilterInput, masters.varieties, {
    placeholder: "すべての品種",
    allowBlank: true,
    value: selectedVarietyFilter
  });
  renderTaskFilterOptions(selectedTaskFilter);
  renderSelectOptions(groupSelect, activeGroups, {
    placeholder: activeGroups.length ? "当日グループを選択してください" : "有効なグループを登録してください",
    value: selectedDailyGroupId,
    labelBuilder: (group) => `${group.sortOrder}. ${group.name}`
  });
  renderSelectOptions(teamPlanGroupInput, activeGroups, {
    placeholder: activeGroups.length ? "作業グループを選択してください" : "有効なグループを登録してください",
    value: selectedTeamPlanGroupId,
    labelBuilder: (group) => `${group.sortOrder}. ${group.name}`
  });
  renderSelectOptions(teamSetGroupIdInput, activeGroups, {
    placeholder: activeGroups.length ? "作業グループを選択してください" : "有効なグループを登録してください",
    value: selectedTeamSetGroupId,
    labelBuilder: (group) => `${group.sortOrder}. ${group.name}`
  });
  renderSelectOptions(workerFilterInput, masters.workers, {
    placeholder: "すべての作業老E,
    allowBlank: true,
    value: selectedWorkerFilter,
    labelBuilder: (worker) => `${worker.displayName}${worker.isActive ? "" : " (無効)"}`
  });
  if (workerGroupFilterInput) {
    renderSelectOptions(workerGroupFilterInput, sortedGroups, {
      placeholder: "すべてのグルーチE,
      allowBlank: true,
      value: selectedWorkerGroupFilter,
      labelBuilder: (group) => `${group.sortOrder}. ${group.name}${group.isActive ? "" : " (無効)"}`
    });
  }
  if (todayMemberGroupFilterInput) {
    renderSelectOptions(todayMemberGroupFilterInput, sortedGroups, {
      placeholder: "すべてのグルーチE,
      allowBlank: true,
      value: selectedTodayMemberGroupFilter,
      labelBuilder: (group) => `${group.sortOrder}. ${group.name}${group.isActive ? "" : " (無効)"}`
    });
  }
  renderSelectOptions(membershipWorkerIdInput, masters.workers, {
    placeholder: masters.workers.length ? "作業老E��選択してください" : "先に作業老E��登録してください",
    value: selectedMembershipWorkerId,
    labelBuilder: (worker) => `${worker.displayName} / ${worker.fullName}`
  });

  renderPlotOptions(selectedOrchardId, selectedPlotId);
  renderTaskTypeChecklist();
  renderWorkerSelectionList();
  renderGroupMemberList();
  renderMembershipGroupList();
  renderTeamSetWorkerList();
  renderTeamPlanWorkerList();
}

function renderPlotOptions(orchardId, selectedPlotId = "") {
  const plotItems = masters.plots.filter((plot) => plot.orchardId === orchardId);
  renderSelectOptions(plotSelect, plotItems, {
    placeholder: orchardId ? (plotItems.length ? "区画を選択してください" : "こ�E園地には区画がありません") : "先に園地を選択してください",
    value: selectedPlotId
  });
}

function getFormData() {
  const orchard = getOrchardById(orchardSelect.value);
  const plot = getPlotById(plotSelect.value);
  const variety = getVarietyById(varietySelect.value);
  const workTypes = selectedTaskTypes.slice();
  const dailyGroup = getGroupById(groupSelect.value);
  const assignedWorkers = selectedWorkerIds.map((workerId) => getWorkerById(workerId)).filter(Boolean);
  const primaryWorker = assignedWorkers[0] || null;
  const normalizedSettings = normalizeCompanySettings(companySettings);
  const shiftType = getSelectedFormShiftType();
  const commonStartTime = normalizeTimeText(startTimeInput?.value, "");
  const commonEndTime = normalizeTimeText(endTimeInput?.value, "");
  const commonBreakMinutes = getFormBreakMinutes(normalizedSettings);
  const autoHours = calculateHoursFromRange(
    commonStartTime,
    commonEndTime,
    normalizedSettings,
    commonBreakMinutes
  );
  const manualHours = getFormManualWorkHours(normalizedSettings);
  let resolvedWorkHours;
  if (manualHours !== null) {
    resolvedWorkHours = manualHours;
  } else if (shiftType === WORK_SHIFT_TYPE.MANUAL) {
    resolvedWorkHours = 0;
  } else if (Number.isFinite(autoHours)) {
    resolvedWorkHours = autoHours;
  } else {
    resolvedWorkHours = getDefaultWorkHours(normalizedSettings);
  }
  const workerTimeFallback = {
    workType: shiftType,
    shiftType,
    startTime: commonStartTime,
    endTime: commonEndTime,
    breakMinutes: commonBreakMinutes,
    payrollHours: resolvedWorkHours,
    workHours: resolvedWorkHours
  };
  const workerTimeDetails = assignedWorkers.reduce((acc, worker) => {
    const draft = workerTimeDetailsDraft[worker.id] || {};
    const normalizedDetail = normalizeWorkerTimeDetailEntry(draft, workerTimeFallback, normalizedSettings);
    acc[worker.id] = normalizedDetail;
    return acc;
  }, {});
  const workerCountValue = Number(workerCountInput.value || 0);
  const teamPlan = getTeamPlan(workDateInput.value, groupSelect.value);
  const appliedTeamSetId = teamPlan?.fixedTeamSetId || recordAppliedTeamSetId;
  const appliedTeamSet = getTeamSetById(appliedTeamSetId);
  const appliedTeamSetName = teamPlan?.fixedTeamSetName || appliedTeamSet?.name || recordAppliedTeamSetName;
  const environment = normalizeRecordEnvironment({
    temperatureC: temperatureInput?.value,
    weather: weatherInput.value
  });
  const manualWeather = {
    locationName: FIXED_WEATHER_SOURCE.locationName,
    currentTemp: temperatureInput?.value,
    tempAvg: weatherTempAvgInput?.value,
    tempMax: weatherTempMaxInput?.value,
    tempMin: weatherTempMinInput?.value,
    precipitation: weatherPrecipitationInput?.value,
    humidity: weatherHumidityInput?.value,
    windSpeed: weatherWindSpeedInput?.value,
    weatherCode: weatherCodeInput?.value,
    weatherText: weatherInput?.value
  };
  const weatherInfo = resolveWeatherInfoForRecord(environment, orchard, manualWeather);
  const fieldObservation = normalizeFieldObservation({
    diseaseObserved: observationDiseaseInput?.checked,
    pestObserved: observationPestInput?.checked,
    sprayApplied: observationSprayInput?.checked,
    damageLevel: observationDamageLevelInput?.value,
    wetness: observationWetnessInput?.value,
    muddy: observationMuddyInput?.value,
    workDifficulty: observationWorkDifficultyInput?.value,
    memo: observationMemoInput?.value
  });

  return {
    id: recordIdInput.value || createId("record"),
    workDate: workDateInput.value,
    orchardId: orchard?.id || "",
    orchardName: orchard?.name || "",
    plotId: plot?.id || "",
    plotName: plot?.name || "",
    varietyId: variety?.id || "",
    varietyName: variety?.name || "",
    taskType: workTypes[0] || "",
    workTypes,
    workHours: resolvedWorkHours,
    payrollHours: resolvedWorkHours,
    manualWorkHours: manualHours,
    manualHours,
    calculatedWorkHours: Number.isFinite(autoHours) ? autoHours : null,
    breakMinutes: commonBreakMinutes,
    timeBreakMinutes: commonBreakMinutes,
    nonCountedMinutes: commonBreakMinutes,
    nonWorkingMinutes: commonBreakMinutes,
    shiftType,
    workShiftType: shiftType,
    dailyGroupId: dailyGroup?.id || "",
    dailyGroupName: dailyGroup?.name || "",
    fixedTeamSetId: appliedTeamSetId || "",
    fixedTeamSetName: appliedTeamSetName || "",
    workerCount: workerCountValue || assignedWorkers.length,
    workerId: primaryWorker?.id || "",
    assignedWorkers: assignedWorkers.map((worker) => ({ workerId: worker.id })),
    workerIds: assignedWorkers.map((worker) => worker.id),
    workerName: primaryWorker?.fullName || "",
    workerNames: assignedWorkers.map((worker) => worker.displayName),
    workerDisplayName: primaryWorker?.displayName || "",
    workerCategory: primaryWorker?.category || "",
    workerHourlyRate: Number(primaryWorker?.hourlyRate || 0),
    timeStart: commonStartTime,
    timeEnd: commonEndTime,
    startTime: commonStartTime,
    endTime: commonEndTime,
    workerTimeDetails,
    temperatureC: environment.temperatureC,
    weather: environment.weather,
    weatherData: weatherInfo,
    weatherMetrics: weatherInfo,
    weatherInfo,
    fieldObservation,
    conditions: {
      temperatureC: environment.temperatureC,
      weather: environment.weather,
      weatherData: weatherInfo,
      weatherInfo,
      fieldObservation
    },
    materials: materialsInput.value.trim(),
    notes: notesInput.value.trim(),
    updatedAt: new Date().toISOString()
  };
}

function renderSummary() {
  const todayValue = getTodayString();
  const currentMonth = todayValue.slice(0, 7);
  const todayRecords = records.filter((record) => record.workDate === todayValue);
  const monthlyRecords = records.filter((record) => record.workDate.startsWith(currentMonth));
  const todaySummary = getDailyReportSummary(todayRecords);
  const todayPlans = teamPlans.filter((plan) => plan.workDate === todayValue);

  if (totalCount) totalCount.textContent = formatCount(todaySummary.count);
  if (totalHours) totalHours.textContent = formatHours(todaySummary.hours);
  if (todayTotalPersonHours) todayTotalPersonHours.textContent = formatPersonHours(todaySummary.personHours);
  if (todayTotalLaborCost) todayTotalLaborCost.textContent = formatCurrency(todaySummary.laborCost);
  if (todayTeamPlanCount) todayTeamPlanCount.textContent = formatCount(todayPlans.length);

  if (monthlyCount) monthlyCount.textContent = String(monthlyRecords.length);
  if (activeWorkerCount) activeWorkerCount.textContent = String(masters.workers.filter((worker) => worker.isActive).length);
}

function scrollToElement(element) {
  if (!element) return;
  element.scrollIntoView({ behavior: "smooth", block: "start" });
}

function getAppViewForPanelId(panelId) {
  if (!panelId) return null;
  const matchedView = appViewKeys.find((viewKey) => appViewPanelMap[viewKey]?.includes(panelId));
  return matchedView || null;
}

const settingsSectionMeta = {
  top: {
    title: "設宁E,
    lead: "設定トチE�Eから忁E��な頁E��だけ開ぁE��ください、E
  },
  company: {
    title: "会社設宁E,
    lead: "決算締月�E決算締日を設定します、E
  },
  orchard: {
    title: "園地設宁E,
    lead: "園地、区画、品種を管琁E��ます、E
  },
  worker: {
    title: "作業老E��宁E,
    lead: "作業老E��録、グループ�Eけ、当日の状態確認ができます、E
  },
  backup: {
    title: "バックアチE�E",
    lead: "件数を確認してJSONバックアチE�Eを保存できます、E
  },
  advanced: {
    title: "くわしい設宁E,
    lead: "CSV、復允E���E期化など管琁E��E��け操作です、E
  },
  qr: {
    title: "QRコーチE,
    lead: "QR一覧・印刷を管琁E��ます、E
  }
};

const settingsSectionCardMap = {
  top: [],
  company: ["company"],
  orchard: ["orchard", "plot", "variety"],
  worker: ["group", "teamSet", "worker", "membership"],
  backup: ["backup"],
  advanced: ["advanced"]
};

function getSettingsSectionKey(sectionKey) {
  return Object.prototype.hasOwnProperty.call(settingsSectionMeta, sectionKey) ? sectionKey : "top";
}

function getSettingsSectionFocus(sectionKey) {
  switch (sectionKey) {
    case "company":
      return fiscalClosingMonthInput;
    case "orchard":
      return orchardNameInput;
    case "worker":
      return workerSearchInput || workerFullNameInput;
    case "backup":
      return backupButton;
    case "advanced":
      return exportButton;
    case "qr":
      return qrFilterOrchardInput;
    default:
      return settingsMenuCompanyButton;
  }
}

function focusElementLater(element) {
  if (!element || typeof element.focus !== "function") return;
  window.setTimeout(() => {
    element.focus({ preventScroll: true });
  }, 260);
}

function applySettingsSectionState() {
  const inSettingsView = activeAppViewKey === "settings";
  const normalizedSection = getSettingsSectionKey(activeSettingsSection);
  activeSettingsSection = normalizedSection;
  const isQrSection = normalizedSection === "qr";

  if (masterPanel) {
    masterPanel.hidden = !inSettingsView || isQrSection;
  }
  if (qrPanel) {
    qrPanel.hidden = !inSettingsView || !isQrSection;
  }
  if (settingsTopMenu) {
    settingsTopMenu.hidden = !inSettingsView || isQrSection || normalizedSection !== "top";
  }
  if (settingsPageNav) {
    settingsPageNav.hidden = !inSettingsView || isQrSection || normalizedSection === "top";
  }
  if (settingsMasterGrid) {
    const showMasterGrid = normalizedSection === "company" || normalizedSection === "orchard" || normalizedSection === "worker";
    settingsMasterGrid.hidden = !inSettingsView || isQrSection || !showMasterGrid;
  }
  if (settingsTitle && !isQrSection) {
    settingsTitle.textContent = settingsSectionMeta[normalizedSection].title;
  }
  if (settingsLead && !isQrSection) {
    settingsLead.textContent = settingsSectionMeta[normalizedSection].lead;
  }

  const visibleSectionKeys = new Set(settingsSectionCardMap[normalizedSection] || []);
  settingsSectionCards.forEach((card) => {
    const sectionKey = card.dataset.settingsSection;
    card.hidden = !inSettingsView || isQrSection || !visibleSectionKeys.has(sectionKey);
  });

  if (document?.body) {
    if (inSettingsView) {
      document.body.dataset.settingsSection = normalizedSection;
    } else {
      delete document.body.dataset.settingsSection;
    }
  }
}

function setSettingsSection(sectionKey, options = {}) {
  const { scrollIntoView = true, focusElement = null, switchToSettingsView = false } = options;
  const normalizedSection = getSettingsSectionKey(sectionKey);
  activeSettingsSection = normalizedSection;
  const resolvedFocus = focusElement || getSettingsSectionFocus(normalizedSection);

  if (switchToSettingsView && activeAppViewKey !== "settings") {
    setAppView("settings", { scrollIntoView, focusElement: resolvedFocus });
    return;
  }

  if (activeAppViewKey !== "settings") return;

  applySettingsSectionState();
  if (scrollIntoView) {
    const settingsPanel = normalizedSection === "qr" ? qrPanel : masterPanel;
    if (settingsPanel) {
      scrollToElement(settingsPanel);
    }
  }
  focusElementLater(resolvedFocus);
}

const summarySectionMeta = {
  top: {
    title: "まとめを見る",
    lead: "見たぁE��とめを選んでください、E
  },
  daily: {
    title: "日報",
    lead: "持E��日の作業日報を確認�E印刷できます、E
  },
  monthly: {
    title: "月報",
    lead: "持E��した月の結果を確認�E保存できます、E
  },
  annual: {
    title: "年度レポ�EチE,
    lead: "決算年度ベ�Eスの総合レポ�Eトを確認できます、E
  },
  comparison: {
    title: "比輁E��",
    lead: "累積比輁E��刁E��結果を確認できます、E
  },
  payroll: {
    title: "簡易給与�E細",
    lead: "作業記録から、月締め�E半月締め�E任意期間�E簡易�E細を作�Eできます、E
  },
  worktime: {
    title: "労働時間�E极E,
    lead: "個人別・全体�E労働時間を週・月�E年で見える化できます、E
  }
};

const summarySectionCardMap = {
  top: [],
  daily: ["daily"],
  monthly: ["monthly"],
  annual: ["annual"],
  comparison: ["comparison"],
  payroll: ["payroll"],
  worktime: ["worktime"]
};

function getSummarySectionKey(sectionKey) {
  return Object.prototype.hasOwnProperty.call(summarySectionMeta, sectionKey) ? sectionKey : "top";
}

function getSummarySectionFocus(sectionKey) {
  switch (sectionKey) {
    case "daily":
      return dailyReportDateInput;
    case "monthly":
      return monthlyReportMonthInput;
    case "annual":
      return annualReportSortMetricInput;
    case "comparison":
      return comparisonPeriodInput;
    case "payroll":
      return payrollTargetMonthInput || payrollCloseTypeInput;
    case "worktime":
      return worktimeQuickButtons[0] || worktimeWorkerSelect || summaryMenuDailyButton;
    default:
      return summaryMenuDailyButton;
  }
}

function applySummarySectionState() {
  const inSummaryView = activeAppViewKey === "summary";
  const normalizedSection = getSummarySectionKey(activeSummarySection);
  activeSummarySection = normalizedSection;

  if (summaryTopMenu) {
    summaryTopMenu.hidden = !inSummaryView || normalizedSection !== "top";
  }
  if (summaryPageNav) {
    summaryPageNav.hidden = !inSummaryView || normalizedSection === "top";
  }
  if (summaryAnalyticsGrid) {
    const showAnalyticsGrid = normalizedSection === "monthly" || normalizedSection === "comparison" || normalizedSection === "annual" || normalizedSection === "payroll" || normalizedSection === "worktime";
    summaryAnalyticsGrid.hidden = !inSummaryView || !showAnalyticsGrid;
  }
  if (summaryTitle) {
    summaryTitle.textContent = summarySectionMeta[normalizedSection].title;
  }
  if (summaryLead) {
    summaryLead.textContent = summarySectionMeta[normalizedSection].lead;
  }

  const visibleSectionKeys = new Set(summarySectionCardMap[normalizedSection] || []);
  summarySectionCards.forEach((card) => {
    const sectionKey = card.dataset.summarySection;
    card.hidden = !inSummaryView || !visibleSectionKeys.has(sectionKey);
  });

  if (document?.body) {
    if (inSummaryView) {
      document.body.dataset.summarySection = normalizedSection;
    } else {
      delete document.body.dataset.summarySection;
    }
  }
}

function setSummarySection(sectionKey, options = {}) {
  const { scrollIntoView = true, focusElement = null, switchToSummaryView = false } = options;
  const normalizedSection = getSummarySectionKey(sectionKey);
  activeSummarySection = normalizedSection;
  const resolvedFocus = focusElement || getSummarySectionFocus(normalizedSection);

  if (switchToSummaryView && activeAppViewKey !== "summary") {
    setAppView("summary", { scrollIntoView, focusElement: resolvedFocus });
    return;
  }

  if (activeAppViewKey !== "summary") return;

  applySummarySectionState();
  if (scrollIntoView && analyticsPanel) {
    scrollToElement(analyticsPanel);
  }
  focusElementLater(resolvedFocus);
}

function normalizeAppViewKey(viewKey) {
  const normalized = normalizeText(viewKey);
  if (normalized === "history") return "records";
  if (normalized === "analytics") return "summary";
  return normalized;
}

function setAppView(viewKey, options = {}) {
  const normalizedViewKey = normalizeAppViewKey(viewKey);
  if (!normalizedViewKey || !appViewPanelMap[normalizedViewKey] || !appViewPanels.length) return;
  const { scrollIntoView = true, focusElement = null } = options;
  activeAppViewKey = normalizedViewKey;

  appViewPanels.forEach((panel) => {
    if (!panel) return;
    panel.hidden = true;
    panel.classList.add("is-hidden");
  });

  const targetPanelIds = appViewPanelMap[normalizedViewKey] || [];
  targetPanelIds.forEach((panelId) => {
    const panel = document.getElementById(panelId);
    if (!panel) {
      console.warn("setAppView: パネルが見つかりません:", panelId);
      return;
    }
    panel.hidden = false;
    panel.classList.remove("is-hidden");
  });

  if (bottomNavButtons.length) {
    bottomNavButtons.forEach((button) => {
      const buttonView = normalizeAppViewKey(button.dataset.viewTarget || button.dataset.appView || "");
      const isActive = buttonView === normalizedViewKey;
      button.classList.toggle("is-active", isActive);
      if (isActive) {
        button.setAttribute("aria-current", "page");
      } else {
        button.removeAttribute("aria-current");
      }
    });
  }
  if (document?.body) {
    document.body.dataset.currentView = normalizedViewKey;
  }

  if (normalizedViewKey === "settings") {
    applySettingsSectionState();
    if (document?.body) {
      delete document.body.dataset.summarySection;
    }
  } else if (normalizedViewKey === "summary") {
    applySummarySectionState();
    if (document?.body) {
      delete document.body.dataset.settingsSection;
    }
  } else if (document?.body) {
    delete document.body.dataset.settingsSection;
    delete document.body.dataset.summarySection;
  }

  if (scrollIntoView) {
    let activePanel = null;
    if (normalizedViewKey === "settings") {
      activePanel = activeSettingsSection === "qr" ? qrPanel : masterPanel;
    } else if (normalizedViewKey === "summary") {
      activePanel = analyticsPanel;
    }
    if (!activePanel) {
      const firstPanelId = targetPanelIds[0];
      activePanel = document.getElementById(firstPanelId);
    }
    if (activePanel) {
      scrollToElement(activePanel);
    }
  }

  focusElementLater(focusElement);
}

function bindEvent(element, eventName, handler, options) {
  if (!element || typeof element.addEventListener !== "function") {
    console.warn("要素が見つかりません:", element);
    return null;
  }
  element.addEventListener(eventName, handler, options);
  return element;
}

function bindClick(id, handler) {
  const el = document.getElementById(id);
  if (!el) {
    console.warn("要素が見つかりません:", id);
    return null;
  }
  el.addEventListener("click", handler);
  return el;
}

function getDefaultFocusForView(viewKey) {
  const normalizedViewKey = normalizeAppViewKey(viewKey);
  if (normalizedViewKey === "record") return workDateInput;
  if (normalizedViewKey === "team") return teamPlanDateInput;
  if (normalizedViewKey === "records") return dailyReportDateInput || orchardFilterInput;
  if (normalizedViewKey === "summary") return summaryMenuDailyButton;
  if (normalizedViewKey === "settings") return settingsMenuCompanyButton;
  return shortcutRecordFormButton;
}

function handleViewTargetNavigation(rawViewKey, options = {}) {
  const normalizedViewKey = normalizeAppViewKey(rawViewKey);
  if (!normalizedViewKey || !appViewPanelMap[normalizedViewKey]) {
    console.warn("不明な画面キーです:", rawViewKey);
    return;
  }

  if (normalizedViewKey === "records" && dailyReportDateInput && !dailyReportDateInput.value) {
    dailyReportDateInput.value = getTodayString();
  }
  if (normalizedViewKey === "settings") {
    setSettingsSection("top", { scrollIntoView: false, focusElement: settingsMenuCompanyButton });
  } else if (normalizedViewKey === "summary") {
    setSummarySection("top", { scrollIntoView: false, focusElement: summaryMenuDailyButton });
  }

  const focusElement = options.focusElement || getDefaultFocusForView(normalizedViewKey);
  setAppView(normalizedViewKey, {
    scrollIntoView: options.scrollIntoView !== false,
    focusElement
  });
}

function bindViewTargetDelegation() {
  if (hasBoundViewTargetDelegation) return;
  hasBoundViewTargetDelegation = true;
  bindEvent(document, "click", (event) => {
    const trigger = event.target?.closest?.("[data-view-target],[data-app-view]");
    if (!trigger) return;
    const rawViewKey = trigger.dataset.viewTarget || trigger.dataset.appView || "";
    if (!rawViewKey) return;
    handleViewTargetNavigation(rawViewKey, {
      scrollIntoView: true
    });
  });
}
bindViewTargetDelegation();

function moveToShortcut(targetPanel, focusElement) {
  const targetViewKey = getAppViewForPanelId(targetPanel?.id);
  if (targetViewKey) {
    setAppView(targetViewKey, { scrollIntoView: true, focusElement });
    return;
  }
  scrollToElement(targetPanel);
}

function getFilteredRecords(options = {}) {
  const { workDate = "" } = options;
  const orchardId = orchardFilterInput.value;
  const varietyId = varietyFilterInput.value;
  const taskType = taskFilterInput.value;
  const workerId = workerFilterInput.value;

  return [...records]
    .sort((a, b) => {
      const dateCompare = new Date(b.workDate) - new Date(a.workDate);
      return dateCompare || new Date(b.updatedAt) - new Date(a.updatedAt);
    })
    .filter((record) => {
      const matchesDate = !workDate || record.workDate === workDate;
      const matchesOrchard = !orchardId || record.orchardId === orchardId;
      const matchesVariety = !varietyId || record.varietyId === varietyId;
      const matchesTask = !taskType || getRecordWorkTypes(record).includes(taskType);
      const matchesWorker = !workerId || record.assignedWorkers.some((item) => item.workerId === workerId);
      return matchesDate && matchesOrchard && matchesVariety && matchesTask && matchesWorker;
    });
}

function fillRecordForm(record) {
  const environment = normalizeRecordEnvironment(record);
  const observation = normalizeFieldObservation(record.fieldObservation);
  const normalizedSettings = normalizeCompanySettings(companySettings);
  const recordStartTime = getRecordStartTime(record);
  const recordEndTime = getRecordEndTime(record);
  const recordShiftType = inferRecordShiftType(record, normalizedSettings);
  const recordBreakMinutes = getRecordBreakMinutes(record, normalizedSettings);
  const recordCalculatedHours = Number.isFinite(Number(record.calculatedWorkHours))
    ? Number(record.calculatedWorkHours)
    : calculateHoursFromRange(recordStartTime, recordEndTime, normalizedSettings, recordBreakMinutes);
  const recordManualHours = normalizeManualHours(
    record.manualWorkHours ?? record.manualHours,
    normalizedSettings
  );
  const legacyManualHours = normalizeManualHours(record.workHours, normalizedSettings);
  const shouldUseLegacyManualHours = recordManualHours === null
    && !recordStartTime
    && !recordEndTime
    && legacyManualHours !== null;
  const displayManualHours = shouldUseLegacyManualHours ? legacyManualHours : recordManualHours;
  recordIdInput.value = record.id;
  workDateInput.value = record.workDate;
  orchardSelect.value = record.orchardId || "";
  renderPlotOptions(record.orchardId || "", record.plotId || "");
  varietySelect.value = record.varietyId || "";
  if (taskTypeSearchInput) {
    taskTypeSearchInput.value = "";
  }
  setSelectedTaskTypes(getRecordWorkTypes(record));
  renderTaskTypeChecklist();
  setTaskTypeValidationState(false);
  if (workShiftTypeInput) {
    workShiftTypeInput.value = recordShiftType;
  }
  workHoursInput.value = displayManualHours ?? "";
  groupSelect.value = record.dailyGroupId || "";
  recordAppliedTeamSetId = record.fixedTeamSetId || "";
  recordAppliedTeamSetName = record.fixedTeamSetName || "";
  workerCountInput.value = record.workerCount || "";
  selectedWorkerIds = getAssignedWorkers(record).map((worker) => worker.id);
  startTimeInput.value = recordStartTime;
  endTimeInput.value = recordEndTime;
  if (breakMinutesInput) {
    breakMinutesInput.value = String(recordBreakMinutes);
  }
  if (calculatedWorkHoursInput) {
    calculatedWorkHoursInput.value = Number.isFinite(recordCalculatedHours) ? String(recordCalculatedHours) : "";
  }
  const rawWorkerTimeDetails = record?.workerTimeDetails && typeof record.workerTimeDetails === "object"
    ? record.workerTimeDetails
    : {};
  const fallbackDetail = {
    workType: recordShiftType,
    shiftType: recordShiftType,
    startTime: recordStartTime,
    endTime: recordEndTime,
    breakMinutes: recordBreakMinutes,
    payrollHours: getRecordResolvedWorkHours(record, normalizedSettings),
    workHours: getRecordResolvedWorkHours(record, normalizedSettings)
  };
  workerTimeDetailsDraft = selectedWorkerIds.reduce((acc, workerId) => {
    const detail = normalizeWorkerTimeDetailEntry(
      rawWorkerTimeDetails[workerId] || {},
      fallbackDetail,
      normalizedSettings
    );
    acc[workerId] = {
      workType: detail.workType,
      shiftType: detail.shiftType,
      startTime: detail.startTime,
      endTime: detail.endTime,
      breakMinutes: detail.breakMinutes,
      manualHours: detail.manualHours,
      manualWorkHours: detail.manualWorkHours,
      payrollHours: detail.payrollHours
    };
    return acc;
  }, {});
  if (temperatureInput) {
    temperatureInput.value = environment.temperatureC ?? "";
  }
  weatherInput.value = environment.weather;
  recordWeatherInfo = environment.weatherInfo ? { ...environment.weatherInfo } : null;
  if (weatherTempAvgInput) weatherTempAvgInput.value = recordWeatherInfo?.tempAvg ?? "";
  if (weatherTempMaxInput) weatherTempMaxInput.value = recordWeatherInfo?.tempMax ?? "";
  if (weatherTempMinInput) weatherTempMinInput.value = recordWeatherInfo?.tempMin ?? "";
  if (weatherPrecipitationInput) weatherPrecipitationInput.value = recordWeatherInfo?.precipitation ?? "";
  if (weatherHumidityInput) weatherHumidityInput.value = recordWeatherInfo?.humidity ?? "";
  if (weatherWindSpeedInput) weatherWindSpeedInput.value = recordWeatherInfo?.windSpeed ?? "";
  if (weatherCodeInput) weatherCodeInput.value = recordWeatherInfo?.weatherCode ?? "";
  setWeatherFetchLoading(false);
  if (recordWeatherInfo) {
    const summary = formatWeatherInfoSummary(recordWeatherInfo, true);
    setWeatherFetchStatus(summary ? `保存済み: ${summary}` : "保存済みの天気情報があります。忁E��に応じて再取得してください、E, "success");
  } else {
    setWeatherFetchStatus(WEATHER_FETCH_HINT_TEXT);
  }
  materialsInput.value = record.materials;
  notesInput.value = record.notes;
  if (observationDiseaseInput) observationDiseaseInput.checked = observation.diseaseObserved;
  if (observationPestInput) observationPestInput.checked = observation.pestObserved;
  if (observationSprayInput) observationSprayInput.checked = observation.sprayApplied;
  if (observationDamageLevelInput) observationDamageLevelInput.value = observation.damageLevel;
  if (observationWetnessInput) observationWetnessInput.value = observation.wetness;
  if (observationMuddyInput) observationMuddyInput.value = observation.muddy;
  if (observationWorkDifficultyInput) observationWorkDifficultyInput.value = observation.workDifficulty;
  if (observationMemoInput) observationMemoInput.value = observation.memo;
  formMode.textContent = "編雁E��";
  renderWorkerSelectionList();
  updateTimeHint();
  if (displayManualHours !== null) {
    timeHint.textContent = `手�E力上書ぁE${displayManualHours} 時間を使用してぁE��す。`;
  }
  moveToShortcut(recordFormPanel, workDateInput);
}

function resetRecordForm() {
  form.reset();
  recordIdInput.value = "";
  formMode.textContent = "新規登録";
  workDateInput.value = today;
  if (workShiftTypeInput) {
    workShiftTypeInput.value = WORK_SHIFT_TYPE.FULL_DAY;
  }
  applyDefaultWorkScheduleToForm(true, { shiftType: WORK_SHIFT_TYPE.FULL_DAY });
  orchardSelect.value = "";
  varietySelect.value = "";
  if (taskTypeSearchInput) {
    taskTypeSearchInput.value = "";
  }
  setSelectedTaskTypes([]);
  renderTaskTypeChecklist();
  setTaskTypeValidationState(false);
  groupSelect.value = "";
  recordAppliedTeamSetId = "";
  recordAppliedTeamSetName = "";
  recordWeatherInfo = null;
  selectedWorkerIds = [];
  workerTimeDetailsDraft = {};
  if (workHoursInput) {
    workHoursInput.value = "";
  }
  if (breakMinutesInput) {
    breakMinutesInput.value = String(getDefaultBreakMinutesForShiftType(WORK_SHIFT_TYPE.FULL_DAY, companySettings));
  }
  if (calculatedWorkHoursInput) {
    calculatedWorkHoursInput.value = "";
  }
  if (weatherTempAvgInput) weatherTempAvgInput.value = "";
  if (weatherTempMaxInput) weatherTempMaxInput.value = "";
  if (weatherTempMinInput) weatherTempMinInput.value = "";
  if (weatherPrecipitationInput) weatherPrecipitationInput.value = "";
  if (weatherHumidityInput) weatherHumidityInput.value = "";
  if (weatherWindSpeedInput) weatherWindSpeedInput.value = "";
  if (weatherCodeInput) weatherCodeInput.value = "";
  if (observationDiseaseInput) observationDiseaseInput.checked = false;
  if (observationPestInput) observationPestInput.checked = false;
  if (observationSprayInput) observationSprayInput.checked = false;
  if (observationDamageLevelInput) observationDamageLevelInput.value = "";
  if (observationWetnessInput) observationWetnessInput.value = "";
  if (observationMuddyInput) observationMuddyInput.value = "";
  if (observationWorkDifficultyInput) observationWorkDifficultyInput.value = "";
  if (observationMemoInput) observationMemoInput.value = "";
  renderPlotOptions("");
  renderWorkerSelectionList();
  updateTimeHint();
  setWeatherFetchLoading(false);
  setWeatherFetchStatus(WEATHER_FETCH_HINT_TEXT);
}

function deleteRecord(id) {
  if (!window.confirm("こ�E作業記録を削除しますか�E�E)) return;
  records = records.filter((record) => record.id !== id);
  saveState();
  render();
}

function renderRecords() {
  recordList.innerHTML = "";
  historySelectedDate = normalizeDateString(historySelectedDate);
  historyVisibleMonth = normalizeMonthString(historyVisibleMonth, historySelectedDate.slice(0, 7));
  renderHistoryCalendar();
  const filteredRecords = getFilteredRecords({ workDate: historySelectedDate });
  if (!filteredRecords.length) {
    recordList.appendChild(buildEmptyState("こ�E日の記録はありません、E));
    return;
  }
  if (!filteredRecords.length && records.length < 0) {
    recordList.appendChild(buildEmptyState(records.length ? "条件に合う作業記録がありません。絞り込み条件を見直してください、E : "サンプルを参老E��、最初�E作業記録を登録してください、E));
    return;
  }

  filteredRecords.forEach((record) => {
    const names = getRecordDisplay(record);
    const metrics = getRecordMetrics(record);
    const environment = normalizeRecordEnvironment(record);
    const fragment = cardTemplate.content.cloneNode(true);
    const card = fragment.querySelector(".record-card");
    fragment.querySelector(".record-card__date").textContent = formatDate(record.workDate);
    fragment.querySelector(".record-card__task").textContent = getRecordTaskTypeText(record, "作業冁E��未設宁E);
    fragment.querySelector(".record-card__orchard").textContent = names.orchardName;
    fragment.querySelector(".record-card__plot").textContent = names.plotName;
    fragment.querySelector(".record-card__variety").textContent = names.varietyName;
    fragment.querySelector(".record-card__hours").textContent = metrics.hours ? formatHours(metrics.hours) : "未入劁E;
    fragment.querySelector(".record-card__workers").textContent = record.workerCount ? `${record.workerCount}人` : "未入劁E;
    fragment.querySelector(".record-card__person-hours").textContent = formatPersonHours(metrics.personHours);
    fragment.querySelector(".record-card__labor-cost").textContent = formatCurrency(metrics.laborCost);
    fragment.querySelector(".record-card__worker-name").textContent = names.workerName;
    fragment.querySelector(".record-card__worker-list").textContent = names.workerListText;
    fragment.querySelector(".record-card__group").textContent = names.dailyGroupName;
    fragment.querySelector(".record-card__team-set").textContent = names.fixedTeamSetName;
    fragment.querySelector(".record-card__worker-category").textContent = names.workerCategory;
    fragment.querySelector(".record-card__worker-rate").textContent = formatCurrency(names.workerHourlyRate);
    const startTime = getRecordStartTime(record);
    const endTime = getRecordEndTime(record);
    /*
    fragment.querySelector(".record-card__time-range").textContent = startTime && endTime ? `${startTime} - ${endTime}` : "未入劁E;
    */
    const boundHours = calculateBoundHoursByRange(startTime, endTime);
    const deductionMinutes = getRecordBreakMinutes(record, companySettings);
    const actualHoursText = formatHours(metrics.hours);
    /*
    const boundHoursText = Number.isFinite(boundHours) ? `${boundHours}時間` : " E;
    */
    const boundHoursText = Number.isFinite(boundHours) ? `${boundHours}h` : "-";
    if (startTime && endTime) {
      fragment.querySelector(".record-card__time-range").textContent = `${startTime} - ${endTime} / 拘束 ${boundHoursText} / 控除 ${deductionMinutes}刁E/ 実労僁E${actualHoursText}`;
    } else {
      fragment.querySelector(".record-card__time-range").textContent = `時刻未入劁E/ 控除 ${deductionMinutes}刁E/ 実労僁E${actualHoursText}`;
    }
    fragment.querySelector(".record-card__temperature").textContent = formatTemperature(environment.temperatureC);
    const weatherBaseLabel = environment.weather || environment.weatherInfo?.weatherText || "未入劁E;
    const weatherDetail = formatWeatherInfoSummary(environment.weatherInfo);
    fragment.querySelector(".record-card__weather").textContent = weatherDetail ? `${weatherBaseLabel} / ${weatherDetail}` : weatherBaseLabel;
    const observationSummary = formatFieldObservationSummary(record.fieldObservation);
    const observationNode = fragment.querySelector(".record-card__observation");
    if (observationNode) {
      observationNode.textContent = observationSummary || "未入劁E;
    }
    fragment.querySelector(".record-card__materials").textContent = record.materials || "未入劁E;
    fragment.querySelector(".record-card__notes").textContent = record.notes || "メモはありません、E;
    fragment.querySelector(".record-edit").addEventListener("click", () => fillRecordForm(record));
    fragment.querySelector(".record-delete").addEventListener("click", () => deleteRecord(record.id));
    recordList.appendChild(card);
  });
}

function createMasterRow(item, metaText, noteText, onEdit, onDelete) {
  const row = document.createElement("article");
  row.className = "master-item";
  const info = document.createElement("div");
  info.className = "master-item__info";
  const title = document.createElement("h4");
  title.textContent = item.title || item.name;
  info.appendChild(title);
  if (metaText) {
    const meta = document.createElement("p");
    meta.className = "master-item__meta";
    meta.textContent = metaText;
    info.appendChild(meta);
  }
  if (noteText) {
    const note = document.createElement("p");
    note.className = "master-item__note";
    note.textContent = noteText;
    info.appendChild(note);
  }
  const actions = document.createElement("div");
  actions.className = "master-item__actions";
  const editButton = document.createElement("button");
  editButton.type = "button";
  editButton.className = "button button--small button--ghost";
  editButton.textContent = "編雁E;
  editButton.addEventListener("click", onEdit);
  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "button button--small button--danger";
  deleteButton.textContent = "削除";
  deleteButton.addEventListener("click", onDelete);
  actions.append(editButton, deleteButton);
  row.append(info, actions);
  return row;
}

function resetOrchardForm() { orchardForm.reset(); orchardIdInput.value = ""; }
function resetPlotForm() { plotForm.reset(); plotIdInput.value = ""; }
function resetVarietyForm() { varietyForm.reset(); varietyIdInput.value = ""; }
function resetGroupForm() {
  groupForm.reset();
  groupIdInput.value = "";
  groupSortOrderInput.value = String(masters.groups.length + 1);
  groupIsActiveInput.checked = true;
  selectedGroupMemberWorkerIds = [];
}

function resetTeamSetForm() {
  teamSetForm.reset();
  teamSetIdInput.value = "";
  selectedTeamSetWorkerIds = [];
}

function resetWorkerForm() {
  workerForm.reset();
  workerIdInput.value = "";
  workerIsActiveInput.checked = true;
}

function resetMembershipForm() {
  membershipForm.reset();
  selectedMembershipGroupIds = [];
  membershipWorkerIdInput.value = "";
  membershipPrimaryGroupIdInput.value = "";
}

function resetTeamPlanForm() {
  teamPlanForm.reset();
  teamPlanIdInput.value = "";
  teamPlanDateInput.value = today;
  teamPlanGroupInput.value = "";
  teamSetSelectInput.value = "";
  teamSetHint.textContent = "固定チームセチE��を呼び出すと、参加老E��一括で反映できます、E;
  selectedTeamPlanWorkerIds = [];
}

function renderWorkerMembershipSummary(worker) {
  const memberships = getMembershipsByWorkerId(worker.id);
  if (!memberships.length) return "所属グループ未設宁E;
  return memberships.map((membership) => {
    const group = getGroupById(membership.groupId);
    return `${group?.name || "未設宁E}${membership.isPrimary ? " (主所屁E" : ""}`;
  }).join("、E);
}

const DAILY_WORKER_STATUS_META = {
  "出勤済み": { className: "status-badge--checked-in", priority: 1 },
  "未記録": { className: "status-badge--missing", priority: 2 },
  "出勤予宁E: { className: "status-badge--scheduled", priority: 3 },
  "応援": { className: "status-badge--support", priority: 4 },
  "早退": { className: "status-badge--early-leave", priority: 5 },
  "休み": { className: "status-badge--off", priority: 6 },
  "保留": { className: "status-badge--hold", priority: 7 }
};

function getStatusMeta(statusLabel) {
  return DAILY_WORKER_STATUS_META[statusLabel] || DAILY_WORKER_STATUS_META["保留"];
}

function getGroupSortOrder(groupId) {
  const group = getGroupById(groupId);
  return Number(group?.sortOrder || 9999);
}

function toReadableGroupNames(groupIds = []) {
  const names = [...new Set(groupIds)]
    .map((groupId) => getGroupById(groupId)?.name || "")
    .filter(Boolean);
  return names.length ? names.join("・") : "未設宁E;
}

function buildDailyWorkerActivityContext(targetDate = today) {
  const dateKey = normalizeDateString(targetDate, today);
  const plansForDate = teamPlans.filter((plan) => plan.workDate === dateKey);
  const recordsForDate = records.filter((record) => record.workDate === dateKey);
  const planByWorkerId = new Map();
  const recordByWorkerId = new Map();
  const recordedGroupIds = new Set();

  plansForDate.forEach((plan) => {
    plan.workerIds.forEach((workerId) => {
      const current = planByWorkerId.get(workerId) || { planCount: 0, groupIds: new Set() };
      current.planCount += 1;
      if (plan.groupId) current.groupIds.add(plan.groupId);
      planByWorkerId.set(workerId, current);
    });
  });

  recordsForDate.forEach((record) => {
    if (record.dailyGroupId) recordedGroupIds.add(record.dailyGroupId);
    const assignedWorkers = getAssignedWorkers(record);
    assignedWorkers.forEach((worker) => {
      if (!worker) return;
      const workerHours = Number(getWorkerHoursForRecord(record, worker.id, companySettings) || 0);
      if (!Number.isFinite(workerHours) || workerHours <= 0) return;
      const current = recordByWorkerId.get(worker.id) || { recordCount: 0, totalHours: 0, groupIds: new Set() };
      current.recordCount += 1;
      current.totalHours += workerHours;
      if (record.dailyGroupId) current.groupIds.add(record.dailyGroupId);
      recordByWorkerId.set(worker.id, current);
    });
  });

  return {
    dateKey,
    plansForDate,
    recordsForDate,
    planByWorkerId,
    recordByWorkerId,
    recordedGroupIds
  };
}

function resolveWorkerDailyStatus(worker, context) {
  const memberships = getMembershipsByWorkerId(worker.id);
  const membershipGroupIds = memberships.map((membership) => membership.groupId).filter(Boolean);
  const primaryGroupId = worker.primaryGroupId || membershipGroupIds[0] || "";
  const planEntry = context.planByWorkerId.get(worker.id);
  const recordEntry = context.recordByWorkerId.get(worker.id);
  const plannedGroupIds = planEntry ? [...planEntry.groupIds] : [];
  const recordedGroupIds = recordEntry ? [...recordEntry.groupIds] : [];
  const involvedGroupIds = [...new Set([...plannedGroupIds, ...recordedGroupIds])];
  const hasPlan = Boolean(planEntry?.planCount);
  const hasRecord = Boolean(recordEntry?.recordCount);
  const recordHours = Number(recordEntry?.totalHours || 0);
  const hasMembership = Boolean(membershipGroupIds.length);
  const supportGroupIds = involvedGroupIds.filter((groupId) => primaryGroupId && groupId && groupId !== primaryGroupId);
  const hasSupport = supportGroupIds.length > 0;

  if (!worker.isActive) {
    return {
      statusLabel: "休み",
      detail: "出勤対象夁E,
      plannedGroupIds,
      recordedGroupIds,
      involvedGroupIds,
      membershipGroupIds,
      primaryGroupId,
      planCount: Number(planEntry?.planCount || 0),
      recordCount: Number(recordEntry?.recordCount || 0),
      recordHours
    };
  }

  if (!hasMembership || !primaryGroupId) {
    return {
      statusLabel: "保留",
      detail: "所属グループを設定してください",
      plannedGroupIds,
      recordedGroupIds,
      involvedGroupIds,
      membershipGroupIds,
      primaryGroupId,
      planCount: Number(planEntry?.planCount || 0),
      recordCount: Number(recordEntry?.recordCount || 0),
      recordHours
    };
  }

  if (hasSupport && hasRecord) {
    return {
      statusLabel: "応援",
      detail: `応援允E ${toReadableGroupNames(supportGroupIds)}`,
      plannedGroupIds,
      recordedGroupIds,
      involvedGroupIds,
      membershipGroupIds,
      primaryGroupId,
      planCount: Number(planEntry?.planCount || 0),
      recordCount: Number(recordEntry?.recordCount || 0),
      recordHours
    };
  }

  if (hasRecord) {
    const defaultWorkHours = getDefaultWorkHours();
    const earlyLeaveThreshold = Math.max(1, Number((defaultWorkHours * 0.75).toFixed(2)));
    if (hasPlan && recordHours > 0 && recordHours < earlyLeaveThreshold) {
      return {
        statusLabel: "早退",
        detail: `記録: ${formatHours(recordHours)}`,
        plannedGroupIds,
        recordedGroupIds,
        involvedGroupIds,
        membershipGroupIds,
        primaryGroupId,
        planCount: Number(planEntry?.planCount || 0),
        recordCount: Number(recordEntry?.recordCount || 0),
        recordHours
      };
    }
    return {
      statusLabel: "出勤済み",
      detail: `${recordEntry.recordCount}件記録 / ${formatHours(recordHours)}`,
      plannedGroupIds,
      recordedGroupIds,
      involvedGroupIds,
      membershipGroupIds,
      primaryGroupId,
      planCount: Number(planEntry?.planCount || 0),
      recordCount: Number(recordEntry?.recordCount || 0),
      recordHours
    };
  }

  if (hasSupport) {
    return {
      statusLabel: "応援",
      detail: `応援予宁E ${toReadableGroupNames(supportGroupIds)}`,
      plannedGroupIds,
      recordedGroupIds,
      involvedGroupIds,
      membershipGroupIds,
      primaryGroupId,
      planCount: Number(planEntry?.planCount || 0),
      recordCount: Number(recordEntry?.recordCount || 0),
      recordHours
    };
  }

  if (hasPlan) {
    const hasProgressInPlannedGroups = plannedGroupIds.some((groupId) => context.recordedGroupIds.has(groupId));
    return {
      statusLabel: hasProgressInPlannedGroups ? "未記録" : "出勤予宁E,
      detail: hasProgressInPlannedGroups ? "編成あり�E記録未入劁E : "本日編成済み",
      plannedGroupIds,
      recordedGroupIds,
      involvedGroupIds,
      membershipGroupIds,
      primaryGroupId,
      planCount: Number(planEntry?.planCount || 0),
      recordCount: Number(recordEntry?.recordCount || 0),
      recordHours
    };
  }

  return {
    statusLabel: "休み",
    detail: "本日編成なぁE,
    plannedGroupIds,
    recordedGroupIds,
    involvedGroupIds,
    membershipGroupIds,
    primaryGroupId,
    planCount: Number(planEntry?.planCount || 0),
    recordCount: Number(recordEntry?.recordCount || 0),
    recordHours
  };
}

function createStatusBadge(statusLabel) {
  const meta = getStatusMeta(statusLabel);
  const badge = document.createElement("span");
  badge.className = `status-badge ${meta.className}`;
  badge.textContent = statusLabel;
  return badge;
}

function normalizeSearchKeyword(value) {
  return normalizeText(value).toLocaleLowerCase("ja-JP");
}

function getWorkerDisplayGroupId(worker, statusInfo) {
  if (statusInfo?.involvedGroupIds?.length) {
    return [...statusInfo.involvedGroupIds].sort((a, b) => getGroupSortOrder(a) - getGroupSortOrder(b))[0];
  }
  if (worker.primaryGroupId) return worker.primaryGroupId;
  if (statusInfo?.membershipGroupIds?.length) {
    return [...statusInfo.membershipGroupIds].sort((a, b) => getGroupSortOrder(a) - getGroupSortOrder(b))[0];
  }
  return "";
}

function workerMatchesGroupFilter(worker, statusInfo, groupId) {
  if (!groupId) return true;
  if (worker.primaryGroupId === groupId) return true;
  if (statusInfo?.membershipGroupIds?.includes(groupId)) return true;
  if (statusInfo?.involvedGroupIds?.includes(groupId)) return true;
  return false;
}

function workerMatchesSearch(worker, statusInfo, keyword) {
  if (!keyword) return true;
  const fields = [
    worker.fullName,
    worker.displayName,
    worker.category,
    renderWorkerMembershipSummary(worker),
    getGroupById(statusInfo?.primaryGroupId || worker.primaryGroupId)?.name || "",
    statusInfo?.statusLabel || "",
    statusInfo?.detail || ""
  ]
    .join(" ")
    .toLocaleLowerCase("ja-JP");
  return fields.includes(keyword);
}

function openWorkerEditor(worker) {
  workerIdInput.value = worker.id;
  workerFullNameInput.value = worker.fullName;
  workerDisplayNameInput.value = worker.displayName;
  workerCategoryInput.value = worker.category;
  workerHourlyRateInput.value = String(worker.hourlyRate);
  workerIsActiveInput.checked = worker.isActive;
  workerFullNameInput.focus();
}

function openMembershipEditorForWorker(workerId) {
  const worker = getWorkerById(workerId);
  if (!worker) return;
  membershipWorkerIdInput.value = worker.id;
  selectedMembershipGroupIds = getMembershipsByWorkerId(worker.id).map((membership) => membership.groupId);
  const primary = getMembershipsByWorkerId(worker.id).find((membership) => membership.isPrimary);
  membershipPrimaryGroupIdInput.value = primary?.groupId || selectedMembershipGroupIds[0] || "";
  renderMembershipGroupList();
  membershipWorkerIdInput.focus();
}

function createWorkerManagementCard(worker, statusInfo) {
  const card = document.createElement("article");
  card.className = "worker-management-card";

  const heading = document.createElement("div");
  heading.className = "worker-management-card__header";
  const title = document.createElement("h4");
  title.textContent = `${worker.displayName} / ${worker.fullName}`;
  const badges = document.createElement("div");
  badges.className = "worker-management-card__badges";
  badges.appendChild(createStatusBadge(statusInfo.statusLabel));
  const activeBadge = document.createElement("span");
  activeBadge.className = `status-badge ${worker.isActive ? "status-badge--target" : "status-badge--off"}`;
  activeBadge.textContent = worker.isActive ? "出勤対象" : "対象夁E;
  badges.appendChild(activeBadge);
  heading.append(title, badges);

  const metaGrid = document.createElement("dl");
  metaGrid.className = "worker-management-card__meta";
  const rows = [
    ["グルーチE, renderWorkerMembershipSummary(worker)],
    ["時給", formatCurrency(worker.hourlyRate)],
    ["所属区刁E, worker.category || "未設宁E],
    ["出勤対象", worker.isActive ? "対象" : "対象夁E],
    ["状慁E, `${statusInfo.statusLabel} / ${statusInfo.detail || "-"}`]
  ];
  rows.forEach(([label, value]) => {
    const row = document.createElement("div");
    const dt = document.createElement("dt");
    dt.textContent = label;
    const dd = document.createElement("dd");
    dd.textContent = value;
    row.append(dt, dd);
    metaGrid.appendChild(row);
  });

  const actions = document.createElement("div");
  actions.className = "worker-management-card__actions";
  const editButton = document.createElement("button");
  editButton.type = "button";
  editButton.className = "button button--small button--view";
  editButton.textContent = "編雁E;
  editButton.addEventListener("click", () => openWorkerEditor(worker));
  const membershipButton = document.createElement("button");
  membershipButton.type = "button";
  membershipButton.className = "button button--small button--settings";
  membershipButton.textContent = "グループ変更";
  membershipButton.addEventListener("click", () => openMembershipEditorForWorker(worker.id));
  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "button button--small button--danger";
  deleteButton.textContent = "削除";
  deleteButton.addEventListener("click", () => deleteWorker(worker.id));
  actions.append(editButton, membershipButton, deleteButton);

  card.append(heading, metaGrid, actions);
  return card;
}

function renderTodayMemberStatusBoard() {
  if (!todayMemberStatusList || !todayMemberStatusSummary) return;
  const targetDate = normalizeDateString(teamPlanDateInput?.value || today, today);
  const groupFilterId = normalizeText(todayMemberGroupFilterInput?.value);
  const context = buildDailyWorkerActivityContext(targetDate);
  const statusByWorkerId = new Map();

  masters.workers.forEach((worker) => {
    statusByWorkerId.set(worker.id, resolveWorkerDailyStatus(worker, context));
  });

  if (todayMemberStatusDate) {
    todayMemberStatusDate.textContent = `表示日: ${formatDate(targetDate)}`;
  }

  const filteredWorkers = masters.workers
    .filter((worker) => workerMatchesGroupFilter(worker, statusByWorkerId.get(worker.id), groupFilterId))
    .sort((a, b) => {
      const statusA = statusByWorkerId.get(a.id);
      const statusB = statusByWorkerId.get(b.id);
      const priorityA = getStatusMeta(statusA?.statusLabel).priority;
      const priorityB = getStatusMeta(statusB?.statusLabel).priority;
      if (priorityA !== priorityB) return priorityA - priorityB;
      const groupA = getWorkerDisplayGroupId(a, statusA);
      const groupB = getWorkerDisplayGroupId(b, statusB);
      const groupOrderDiff = getGroupSortOrder(groupA) - getGroupSortOrder(groupB);
      if (groupOrderDiff !== 0) return groupOrderDiff;
      return (a.displayName || "").localeCompare((b.displayName || ""), "ja");
    });

  const summaryCounts = filteredWorkers.reduce((acc, worker) => {
    const status = statusByWorkerId.get(worker.id)?.statusLabel || "保留";
    acc[status] = Number(acc[status] || 0) + 1;
    return acc;
  }, {});

  todayMemberStatusSummary.innerHTML = "";
  const summaryStatuses = ["出勤済み", "未記録", "出勤予宁E, "応援", "早退", "休み", "保留"];
  summaryStatuses.forEach((statusLabel) => {
    if (!summaryCounts[statusLabel]) return;
    const card = document.createElement("article");
    card.className = "today-status-summary-card";
    const label = createStatusBadge(statusLabel);
    const value = document.createElement("strong");
    value.textContent = `${summaryCounts[statusLabel]}人`;
    card.append(label, value);
    todayMemberStatusSummary.appendChild(card);
  });

  todayMemberStatusList.innerHTML = "";
  if (!filteredWorkers.length) {
    todayMemberStatusList.appendChild(buildEmptyState("該当する作業老E�EぁE��せん。グループ条件を見直してください、E));
    return;
  }

  const groupedMap = new Map();
  filteredWorkers.forEach((worker) => {
    const statusInfo = statusByWorkerId.get(worker.id);
    const groupId = groupFilterId || getWorkerDisplayGroupId(worker, statusInfo);
    const group = getGroupById(groupId);
    const groupLabel = group?.name || "未所屁E;
    const key = groupId || "__none__";
    const current = groupedMap.get(key) || { label: groupLabel, workers: [] };
    current.workers.push({ worker, statusInfo });
    groupedMap.set(key, current);
  });

  const groupedEntries = Array.from(groupedMap.entries()).sort((a, b) => {
    const orderA = a[0] === "__none__" ? 9999 : getGroupSortOrder(a[0]);
    const orderB = b[0] === "__none__" ? 9999 : getGroupSortOrder(b[0]);
    if (orderA !== orderB) return orderA - orderB;
    return a[1].label.localeCompare(b[1].label, "ja");
  });

  groupedEntries.forEach(([, groupData]) => {
    const section = document.createElement("section");
    section.className = "today-worker-group";
    const heading = document.createElement("h4");
    heading.textContent = `${groupData.label}�E�E{groupData.workers.length}人�E�`;
    section.appendChild(heading);

    groupData.workers.forEach(({ worker, statusInfo }) => {
      const row = document.createElement("article");
      row.className = "today-worker-item";
      const top = document.createElement("div");
      top.className = "today-worker-item__top";
      const name = document.createElement("strong");
      name.textContent = worker.displayName;
      const badgeArea = document.createElement("div");
      badgeArea.className = "today-worker-item__badges";
      badgeArea.appendChild(createStatusBadge(statusInfo.statusLabel));
      top.append(name, badgeArea);

      const meta = document.createElement("p");
      meta.className = "today-worker-item__meta";
      const primaryGroup = getGroupById(worker.primaryGroupId)?.name || "未設宁E;
      meta.textContent = `${worker.fullName} ・ 主所屁E${primaryGroup} ・ ${statusInfo.detail || "状態確誁E}`;

      row.append(top, meta);
      section.appendChild(row);
    });

    todayMemberStatusList.appendChild(section);
  });
}

function renderMasterLists() {
  orchardList.innerHTML = "";
  plotList.innerHTML = "";
  varietyList.innerHTML = "";
  groupList.innerHTML = "";
  workerList.innerHTML = "";
  membershipList.innerHTML = "";
  teamSetList.innerHTML = "";
  teamPlanList.innerHTML = "";

  orchardCount.textContent = `${masters.orchards.length}件`;
  plotCount.textContent = `${masters.plots.length}件`;
  varietyCount.textContent = `${masters.varieties.length}件`;
  groupMasterCount.textContent = `${masters.groups.length}件`;
  teamSetCount.textContent = `${masters.fixedTeamSets.length}件`;
  workerMasterCount.textContent = `${masters.workers.length}件`;
  membershipCount.textContent = `${masters.workerGroupMemberships.length}件`;

  if (!masters.orchards.length) {
    orchardList.appendChild(buildEmptyState("園地がありません。最初�E園地を登録してください、E));
  } else {
    masters.orchards.forEach((orchard) => {
      const plotTotal = masters.plots.filter((plot) => plot.orchardId === orchard.id).length;
      const codeLabel = orchard.managementCode ? orchard.managementCode : "未設定（要設定！E;
      const coordinateLabel = Number.isFinite(orchard.latitude) && Number.isFinite(orchard.longitude)
        ? `${formatCoordinate(orchard.latitude)}, ${formatCoordinate(orchard.longitude)}`
        : "未設宁E;
      orchardList.appendChild(createMasterRow(orchard, `管琁E��ーチE ${codeLabel} / 位置: ${coordinateLabel} / 登録区画数: ${plotTotal}件`, orchard.note, () => {
        orchardIdInput.value = orchard.id;
        orchardNameInput.value = orchard.name;
        orchardCodeInput.value = orchard.managementCode || "";
        if (orchardLatitudeInput) orchardLatitudeInput.value = orchard.latitude ?? "";
        if (orchardLongitudeInput) orchardLongitudeInput.value = orchard.longitude ?? "";
        orchardNoteInput.value = orchard.note;
        orchardNameInput.focus();
      }, () => deleteOrchard(orchard.id)));
    });
  }

  if (!masters.plots.length) {
    plotList.appendChild(buildEmptyState("区画がありません。園地を選んで区画を登録してください、E));
  } else {
    masters.plots.forEach((plot) => {
      const orchard = getOrchardById(plot.orchardId);
      const codeLabel = plot.managementCode ? plot.managementCode : "未設定（要設定！E;
      plotList.appendChild(createMasterRow(plot, `所属園地: ${orchard?.name || "未設宁E} / 管琁E��ーチE ${codeLabel}`, plot.note, () => {
        plotIdInput.value = plot.id;
        plotOrchardInput.value = plot.orchardId;
        plotNameInput.value = plot.name;
        plotCodeInput.value = plot.managementCode || "";
        plotNoteInput.value = plot.note;
        plotNameInput.focus();
      }, () => deletePlot(plot.id)));
    });
  }

  if (!masters.varieties.length) {
    varietyList.appendChild(buildEmptyState("品種がありません。最初�E品種を登録してください、E));
  } else {
    masters.varieties.forEach((variety) => {
      varietyList.appendChild(createMasterRow(variety, "作業記録で選択可能", variety.note, () => {
        varietyIdInput.value = variety.id;
        varietyNameInput.value = variety.name;
        varietyNoteInput.value = variety.note;
        varietyNameInput.focus();
      }, () => deleteVariety(variety.id)));
    });
  }

  if (!masters.groups.length) {
    groupList.appendChild(buildEmptyState("グループがありません。最初�Eグループを登録してください、E));
  } else {
    sortGroups(masters.groups).forEach((group) => {
      const memberCount = getMembershipsByGroupId(group.id).length;
      const status = group.isActive ? "有効" : "無効";
      groupList.appendChild(createMasterRow({ title: `${group.sortOrder}. ${group.name}` }, `所属可能作業老E ${memberCount}人 ・ ${status}`, group.description, () => {
        groupIdInput.value = group.id;
        groupNameInput.value = group.name;
        groupSortOrderInput.value = String(group.sortOrder);
        groupDescriptionInput.value = group.description;
        groupIsActiveInput.checked = group.isActive;
        selectedGroupMemberWorkerIds = getMembershipWorkerIdsByGroupId(group.id);
        renderGroupMemberList();
        groupNameInput.focus();
      }, () => deleteGroup(group.id)));
    });
  }

  const workerStatusTargetDate = normalizeDateString(teamPlanDateInput?.value || today, today);
  if (workerStatusDateLabel) {
    workerStatusDateLabel.textContent = `${formatDate(workerStatusTargetDate)}の状態を表示してぁE��す。`;
  }

  if (!masters.workers.length) {
    workerList.appendChild(buildEmptyState("作業老E��ありません。最初�E作業老E��登録してください、E));
  } else {
    const context = buildDailyWorkerActivityContext(workerStatusTargetDate);
    const groupFilterId = normalizeText(workerGroupFilterInput?.value);
    const keyword = normalizeSearchKeyword(workerSearchInput?.value);
    const statusByWorkerId = new Map();
    masters.workers.forEach((worker) => {
      statusByWorkerId.set(worker.id, resolveWorkerDailyStatus(worker, context));
    });

    const filteredWorkers = masters.workers
      .filter((worker) => {
        const statusInfo = statusByWorkerId.get(worker.id);
        if (!workerMatchesGroupFilter(worker, statusInfo, groupFilterId)) return false;
        if (!workerMatchesSearch(worker, statusInfo, keyword)) return false;
        return true;
      })
      .sort((a, b) => {
        const statusA = statusByWorkerId.get(a.id);
        const statusB = statusByWorkerId.get(b.id);
        const groupA = getWorkerDisplayGroupId(a, statusA);
        const groupB = getWorkerDisplayGroupId(b, statusB);
        const orderDiff = getGroupSortOrder(groupA) - getGroupSortOrder(groupB);
        if (orderDiff !== 0) return orderDiff;
        return (a.displayName || "").localeCompare((b.displayName || ""), "ja");
      });

    if (!filteredWorkers.length) {
      workerList.appendChild(buildEmptyState("条件に合う作業老E��ぁE��せん。検索条件めE��ループ条件を見直してください、E));
    } else {
      filteredWorkers.forEach((worker) => {
        workerList.appendChild(createWorkerManagementCard(worker, statusByWorkerId.get(worker.id)));
      });
    }
  }

  if (!masters.workers.length) {
    membershipList.appendChild(buildEmptyState("作業老E��登録すると所属グループ設定ができます、E));
  } else {
    masters.workers.forEach((worker) => {
      membershipList.appendChild(createMasterRow(
        { title: `${worker.displayName} / ${worker.fullName}` },
        renderWorkerMembershipSummary(worker),
        "主所属�E雁E���E「主所属別」に反映されます、E,
        () => openMembershipEditorForWorker(worker.id),
        () => deleteWorkerMembershipSettings(worker.id)
      ));
    });
  }

  if (!masters.fixedTeamSets.length) {
    teamSetList.appendChild(buildEmptyState("固定チームセチE��はまだありません、E));
  } else {
    masters.fixedTeamSets
      .slice()
      .sort((a, b) => (getGroupById(a.groupId)?.sortOrder || 999) - (getGroupById(b.groupId)?.sortOrder || 999) || a.name.localeCompare(b.name, "ja"))
      .forEach((teamSet) => {
        const group = getGroupById(teamSet.groupId);
        const workers = teamSet.workerIds.map((workerId) => getWorkerById(workerId)?.displayName).filter(Boolean).join("、E);
        teamSetList.appendChild(createMasterRow(
          { title: teamSet.name },
          `${group?.name || "未設定グルーチE} ・ ${teamSet.workerIds.length}人`,
          workers || "作業老E��設宁E,
          () => {
            teamSetIdInput.value = teamSet.id;
            teamSetNameInput.value = teamSet.name;
            teamSetGroupIdInput.value = teamSet.groupId;
            selectedTeamSetWorkerIds = teamSet.workerIds.slice();
            renderTeamSetWorkerList();
          },
          () => {
            if (!window.confirm("こ�E固定チームセチE��を削除しますか�E�E)) return;
            masters.fixedTeamSets = masters.fixedTeamSets.filter((item) => item.id !== teamSet.id);
            teamPlans = teamPlans.map((plan) => plan.fixedTeamSetId === teamSet.id ? { ...plan, fixedTeamSetId: "", fixedTeamSetName: "" } : plan);
            records = records.map((record) => record.fixedTeamSetId === teamSet.id ? { ...record, fixedTeamSetId: "", fixedTeamSetName: "" } : record);
            saveState();
            render();
          }
        ));
      });
  }

  if (!teamPlans.length) {
    teamPlanList.appendChild(buildEmptyState("日別チ�Eム編成�Eまだありません、E));
  } else {
    [...teamPlans]
      .sort((a, b) => b.workDate.localeCompare(a.workDate) || getGroupById(a.groupId)?.sortOrder - getGroupById(b.groupId)?.sortOrder)
      .forEach((plan) => {
        const group = getGroupById(plan.groupId);
        const names = plan.workerIds.map((workerId) => getWorkerById(workerId)?.displayName).filter(Boolean).join("、E);
        teamPlanList.appendChild(createMasterRow(
          { title: `${formatDate(plan.workDate)} / ${group?.name || "未設定グルーチE}` },
          `${plan.workerIds.length}人編戁E{plan.fixedTeamSetName ? ` ・ 固定セチE��:${plan.fixedTeamSetName}` : ""}`,
          names || "参加老E��ぁE,
          () => {
            teamPlanIdInput.value = plan.id;
            teamPlanDateInput.value = plan.workDate;
            teamPlanGroupInput.value = plan.groupId;
            teamSetSelectInput.value = plan.fixedTeamSetId || "";
            selectedTeamPlanWorkerIds = plan.workerIds.slice();
            renderTeamPlanWorkerList();
          },
          () => {
            if (!window.confirm("こ�E日別チ�Eム編成を削除しますか�E�E)) return;
            teamPlans = teamPlans.filter((item) => item.id !== plan.id);
            saveState();
            render();
          }
        ));
      });
  }
}

function deleteOrchard(id) {
  const relatedPlots = masters.plots.filter((plot) => plot.orchardId === id);
  if (!window.confirm(`こ�E園地を削除しますか�E�E関連する区画 ${relatedPlots.length} 件は未所属になります。`)) return;
  const relatedPlotIds = new Set(relatedPlots.map((plot) => plot.id));
  masters.orchards = masters.orchards.filter((orchard) => orchard.id !== id);
  masters.plots = masters.plots.filter((plot) => plot.orchardId !== id);
  records = records.map((record) => relatedPlotIds.has(record.plotId) ? { ...record, plotId: "", plotName: "" } : record)
    .map((record) => record.orchardId === id ? { ...record, orchardId: "", orchardName: "" } : record);
  saveState();
  render();
}

function deletePlot(id) {
  if (!window.confirm("こ�E区画を削除しますか�E�E)) return;
  masters.plots = masters.plots.filter((plot) => plot.id !== id);
  records = records.map((record) => record.plotId === id ? { ...record, plotId: "", plotName: "" } : record);
  saveState();
  render();
}

function deleteVariety(id) {
  if (!window.confirm("こ�E品種を削除しますか�E�E)) return;
  masters.varieties = masters.varieties.filter((variety) => variety.id !== id);
  records = records.map((record) => record.varietyId === id ? { ...record, varietyId: "", varietyName: "" } : record);
  saveState();
  render();
}

function deleteGroup(id) {
  const relatedMemberships = getMembershipsByGroupId(id).length;
  if (!window.confirm(`こ�Eグループを削除しますか�E�E所属設宁E${relatedMemberships} 件は解除されます。`)) return;
  const previousPrimaryByWorkerId = new Map(masters.workers.map((worker) => [worker.id, worker.primaryGroupId || ""]));
  masters.groups = masters.groups.filter((group) => group.id !== id);
  masters.workerGroupMemberships = masters.workerGroupMemberships.filter((membership) => membership.groupId !== id);
  const removedSetIds = masters.fixedTeamSets.filter((teamSet) => teamSet.groupId === id).map((teamSet) => teamSet.id);
  masters.fixedTeamSets = masters.fixedTeamSets.filter((teamSet) => teamSet.groupId !== id);
  syncWorkerPrimaryGroupsFromMemberships(previousPrimaryByWorkerId);
  records = records.map((record) => record.dailyGroupId === id ? { ...record, dailyGroupId: "", dailyGroupName: "" } : record);
  records = records.map((record) => removedSetIds.includes(record.fixedTeamSetId) ? { ...record, fixedTeamSetId: "", fixedTeamSetName: "" } : record);
  teamPlans = teamPlans.filter((plan) => plan.groupId !== id).map((plan) => removedSetIds.includes(plan.fixedTeamSetId) ? { ...plan, fixedTeamSetId: "", fixedTeamSetName: "" } : plan);
  saveState();
  render();
}

function deleteWorker(id) {
  const usedCount = records.filter((record) => record.assignedWorkers.some((item) => item.workerId === id)).length;
  if (!window.confirm(`こ�E作業老E��削除しますか�E�E既存記録 ${usedCount} 件には保存済みの作業老E��を残します。`)) return;
  const deletedWorker = getWorkerById(id);
  masters.workers = masters.workers.filter((worker) => worker.id !== id);
  masters.workerGroupMemberships = masters.workerGroupMemberships.filter((membership) => membership.workerId !== id);
  masters.fixedTeamSets = masters.fixedTeamSets.map((teamSet) => ({ ...teamSet, workerIds: teamSet.workerIds.filter((workerId) => workerId !== id) }));
  teamPlans = teamPlans.map((plan) => ({ ...plan, workerIds: plan.workerIds.filter((workerId) => workerId !== id) }));
  records = records.map((record) => (
    record.assignedWorkers.some((item) => item.workerId === id)
      ? {
          ...record,
          workerId: record.workerId === id ? "" : record.workerId,
          assignedWorkers: record.assignedWorkers.filter((item) => item.workerId !== id),
          workerIds: (record.workerIds || []).filter((workerId) => workerId !== id),
          workerNames: getWorkerNameList(record).filter((name) => name !== deletedWorker?.displayName && name !== deletedWorker?.fullName),
          workerTimeDetails: Object.fromEntries(
            Object.entries(record.workerTimeDetails || {}).filter(([workerId]) => workerId !== id)
          )
        }
      : record
  ));
  selectedWorkerIds = selectedWorkerIds.filter((workerId) => workerId !== id);
  saveState();
  render();
}

function deleteWorkerMembershipSettings(workerId) {
  if (!window.confirm("こ�E作業老E�E所属グループ設定を解除しますか�E�E)) return;
  masters.workerGroupMemberships = masters.workerGroupMemberships.filter((membership) => membership.workerId !== workerId);
  masters.workers = masters.workers.map((worker) => worker.id === workerId ? { ...worker, primaryGroupId: "" } : worker);
  saveState();
  render();
}

function buildSummaryRows(container, entries, valueFormatter, emptyMessage) {
  if (!container) return;
  container.innerHTML = "";
  if (!entries.length) {
    container.appendChild(buildEmptyState(emptyMessage));
    return;
  }
  entries.forEach(([label, value]) => {
    const row = document.createElement("div");
    row.className = "analytics-row";
    const title = document.createElement("span");
    title.className = "analytics-row__label";
    title.textContent = label;
    const result = document.createElement("strong");
    result.className = "analytics-row__value";
    result.textContent = valueFormatter(value);
    row.append(title, result);
    container.appendChild(row);
  });
}

function aggregateBy(items, getKey, getValue = () => 1) {
  const map = new Map();
  items.forEach((item) => {
    const key = getKey(item);
    const value = getValue(item);
    map.set(key, (map.get(key) || 0) + value);
  });
  return Array.from(map.entries());
}

function renderAnalytics() {
  const recordsWithMetrics = records.map((record) => ({
    record,
    names: getRecordDisplay(record),
    metrics: getRecordMetrics(record)
  }));
  const monthlyCountEntries = aggregateBy(records, (record) => record.workDate.slice(0, 7), () => 1).sort((a, b) => b[0].localeCompare(a[0]));
  const monthlyHourEntries = aggregateBy(recordsWithMetrics, (item) => item.record.workDate.slice(0, 7), (item) => item.metrics.hours).sort((a, b) => b[0].localeCompare(a[0]));
  const monthlyTemperatureEntries = getMonthlyTemperatureStats(records)
    .map((item) => [item.month, item.averageTemperatureC])
    .sort((a, b) => b[0].localeCompare(a[0]));
  const baseTemperatureC = getDegreeDayBaseTemperature(companySettings);
  const monthlyDegreeDayEntries = getMonthlyDegreeDayStats(records, baseTemperatureC)
    .map((item) => [item.month, item.degreeDay])
    .sort((a, b) => b[0].localeCompare(a[0]));
  buildSummaryRows(
    monthlyAverageTemperatureList,
    monthlyTemperatureEntries.map(([month, value]) => [formatMonth(month), value]),
    (value) => Number(value || 0).toFixed(1).replace(/\.0$/, "") + "\u2103",
    "\u6c17\u6e29\u30c7\u30fc\u30bf\u304c\u3042\u308a\u307e\u305b\u3093\u3002"
  );
  buildSummaryRows(
    monthlyDegreeDayList,
    monthlyDegreeDayEntries.map(([month, value]) => [formatMonth(month), value]),
    (value) => Number(value || 0).toFixed(1).replace(/\.0$/, "") + "\u2103\u65e5",
    "\u6c17\u6e29\u30c7\u30fc\u30bf\u304c\u3042\u308a\u307e\u305b\u3093\u3002"
  );
  const orchardEntries = aggregateBy(recordsWithMetrics, (item) => item.names.orchardName, (item) => item.metrics.hours).sort((a, b) => b[1] - a[1]);
  const orchardPersonHoursEntries = aggregateBy(recordsWithMetrics, (item) => item.names.orchardName, (item) => item.metrics.personHours).sort((a, b) => b[1] - a[1]);
  const orchardLaborCostEntries = aggregateBy(recordsWithMetrics, (item) => item.names.orchardName, (item) => item.metrics.laborCost).sort((a, b) => b[1] - a[1]);
  const plotEntries = aggregateBy(recordsWithMetrics, (item) => `${item.names.orchardName} / ${item.names.plotName}`, (item) => item.metrics.hours).sort((a, b) => b[1] - a[1]);
  const plotPersonHoursEntries = aggregateBy(recordsWithMetrics, (item) => `${item.names.orchardName} / ${item.names.plotName}`, (item) => item.metrics.personHours).sort((a, b) => b[1] - a[1]);
  const plotLaborCostEntries = aggregateBy(recordsWithMetrics, (item) => `${item.names.orchardName} / ${item.names.plotName}`, (item) => item.metrics.laborCost).sort((a, b) => b[1] - a[1]);
  const taskEntries = aggregateBy(
    records.flatMap((record) => getRecordWorkTypes(record, { includeUnset: true }).map((taskLabel) => ({ taskLabel, hours: getRecordResolvedWorkHours(record, companySettings) }))),
    (item) => item.taskLabel,
    (item) => item.hours
  ).sort((a, b) => b[1] - a[1]);
  const groupEntries = aggregateBy(recordsWithMetrics, (item) => item.names.dailyGroupName, (item) => item.metrics.hours).sort((a, b) => b[1] - a[1]);
  const groupCountEntries = aggregateBy(recordsWithMetrics, (item) => item.names.dailyGroupName, () => 1).sort((a, b) => b[1] - a[1]);
  const groupPersonHoursEntries = aggregateBy(recordsWithMetrics, (item) => item.names.dailyGroupName, (item) => item.metrics.personHours).sort((a, b) => b[1] - a[1]);
  const groupLaborCostEntries = aggregateBy(recordsWithMetrics, (item) => item.names.dailyGroupName, (item) => item.metrics.laborCost).sort((a, b) => b[1] - a[1]);
  const workerTotalEntries = aggregateBy(
    records.flatMap((record) => getAssignedWorkers(record).map((worker) => ({ worker, hours: Number(getWorkerHoursForRecord(record, worker.id, companySettings) || 0) }))),
    (item) => item.worker.displayName,
    (item) => item.hours
  ).sort((a, b) => b[1] - a[1]);
  const groupWorkerEntries = aggregateBy(
    records.flatMap((record) => getAssignedWorkers(record).map((worker) => ({ worker, hours: Number(getWorkerHoursForRecord(record, worker.id, companySettings) || 0), dailyGroupName: getRecordDisplay(record).dailyGroupName }))),
    (item) => `${item.dailyGroupName} / ${item.worker.displayName}`,
    (item) => item.hours
  ).sort((a, b) => b[1] - a[1]);
  const primaryGroupEntries = aggregateBy(
    records.flatMap((record) => getAssignedWorkers(record).map((worker) => ({ worker, hours: Number(getWorkerHoursForRecord(record, worker.id, companySettings) || 0) }))),
    (item) => getWorkerPrimaryGroup(item.worker)?.name || "主所属未設宁E,
    (item) => item.hours
  ).sort((a, b) => b[1] - a[1]);
  const varietyEntries = aggregateBy(records, (record) => getRecordDisplay(record).varietyName, (record) => getRecordResolvedWorkHours(record, companySettings)).sort((a, b) => b[1] - a[1]);

  buildSummaryRows(monthlyCountList, monthlyCountEntries.map(([month, value]) => [formatMonth(month), value]), (value) => `${value}件`, "作業記録がありません、E);
  buildSummaryRows(monthlyHoursList, monthlyHourEntries.map(([month, value]) => [formatMonth(month), value]), (value) => formatHours(value), "作業記録がありません、E);
  buildSummaryRows(orchardHoursList, orchardEntries, (value) => formatHours(value), "園地別雁E���Eまだありません、E);
  buildSummaryRows(orchardPersonHoursList, orchardPersonHoursEntries, (value) => formatPersonHours(value), "園地別雁E���Eまだありません、E);
  buildSummaryRows(orchardLaborCostList, orchardLaborCostEntries, (value) => formatCurrency(value), "園地別雁E���Eまだありません、E);
  buildSummaryRows(plotHoursList, plotEntries, (value) => formatHours(value), "区画別雁E���Eまだありません、E);
  buildSummaryRows(plotPersonHoursList, plotPersonHoursEntries, (value) => formatPersonHours(value), "区画別雁E���Eまだありません、E);
  buildSummaryRows(plotLaborCostList, plotLaborCostEntries, (value) => formatCurrency(value), "区画別雁E���Eまだありません、E);
  buildSummaryRows(taskHoursList, taskEntries, (value) => formatHours(value), "作業冁E��別雁E���Eまだありません、E);
  buildSummaryRows(workerTotalHoursList, workerTotalEntries, (value) => formatHours(value), "作業老E��雁E���Eまだありません、E);
  buildSummaryRows(groupWorkerHoursList, groupWorkerEntries, (value) => formatHours(value), "グループ別・作業老E��雁E���Eまだありません、E);
  buildSummaryRows(primaryGroupHoursList, primaryGroupEntries, (value) => formatHours(value), "主所属別雁E���Eまだありません、E);
  buildSummaryRows(groupCountList, groupCountEntries, (value) => `${value}件`, "グループ別雁E���Eまだありません、E);
  buildSummaryRows(groupHoursList, groupEntries, (value) => formatHours(value), "グループ別雁E���Eまだありません、E);
  buildSummaryRows(groupPersonHoursList, groupPersonHoursEntries, (value) => formatPersonHours(value), "グループ別雁E���Eまだありません、E);
  buildSummaryRows(groupLaborCostList, groupLaborCostEntries, (value) => formatCurrency(value), "グループ別雁E���Eまだありません、E);
  buildSummaryRows(varietyHoursList, varietyEntries, (value) => formatHours(value), "品種別雁E���Eまだありません、E);
}

/*
function updateTimeHint() {
  const settings = normalizeCompanySettings(companySettings);
  const breakMinutes = getFormBreakMinutes(settings);
  const autoHours = calculateHoursFromRange(startTimeInput.value, endTimeInput.value, settings, breakMinutes);
  const standardHoursByBreak = calculateHoursFromRange(
    settings.workdayStartTime,
    settings.workdayEndTime,
    settings,
    breakMinutes
  );
  const defaultHours = Number.isFinite(standardHoursByBreak)
    ? standardHoursByBreak
    : getDefaultWorkHours(settings);
  const manualHours = getFormManualWorkHours(settings);
  const breakText = `${Math.floor(breakMinutes / 60)}時間${String(breakMinutes % 60).padStart(2, "0")}刁E;
  if (calculatedWorkHoursInput) {
    calculatedWorkHoursInput.value = Number.isFinite(autoHours) ? String(autoHours) : "";
  }

  if (startTimeInput.value && endTimeInput.value && autoHours === null) {
    timeHint.textContent = "終亁E��刻は開始時刻より後に設定してください、E;
    return;
  }

  if (autoHours !== null) {
    if (manualHours !== null) {
      timeHint.textContent = `自動計算�E ${autoHours} 時間です。手入力上書ぁE${manualHours} 時間を採用します。`;
    } else {
      timeHint.textContent = `実労僁E${autoHours} 時間�E�控除 ${breakText}、E{settings.payrollTimeUnitMinutes}刁E��位で丸めE��を自動計算しました。`;
    }
    renderWorkerTimeDetailList();
    return;
  }

  if (!startTimeInput.value && !endTimeInput.value) {
    if (manualHours !== null) {
      timeHint.textContent = `作業時間 ${manualHours} 時間�E�E{settings.payrollTimeUnitMinutes}刁E��位で丸めた手�E力値�E�を使用します。`;
      renderWorkerTimeDetailList();
      return;
    }
    timeHint.textContent = `時刻未入力�Eため、標準勤勁E${settings.workdayStartTime}、E{settings.workdayEndTime}�E�休�E ${breakText}�E�E ${defaultHours} 時間で扱ぁE��す。`;
    renderWorkerTimeDetailList();
    return;
  }

  timeHint.textContent = "開始時刻と終亁E��刻をセチE��で入力すると、実働時間を�E動計算します、E;
  renderWorkerTimeDetailList();
}

function updateTimeHint() {
  const settings = normalizeCompanySettings(companySettings);
  const shiftType = getSelectedFormShiftType();
  const breakMinutes = getFormBreakMinutes(settings);
  const boundHours = calculateBoundHoursByRange(startTimeInput?.value || "", endTimeInput?.value || "");
  const autoHours = calculateHoursFromRange(startTimeInput?.value || "", endTimeInput?.value || "", settings, breakMinutes);
  const fullDayPreset = getShiftPreset(WORK_SHIFT_TYPE.FULL_DAY, settings);
  const defaultHours = calculateHoursFromRange(
    fullDayPreset.startTime,
    fullDayPreset.endTime,
    settings,
    fullDayPreset.breakMinutes
  ) ?? getDefaultWorkHours(settings);
  const manualHours = getFormManualWorkHours(settings);
  const deductionText = `${breakMinutes}刁E;
  const boundText = Number.isFinite(boundHours) ? `${boundHours}時間` : " E;
  const shiftLabel = getShiftTypeLabel(shiftType);

  if (calculatedWorkHoursInput) {
    calculatedWorkHoursInput.value = Number.isFinite(autoHours) ? String(autoHours) : "";
  }

  if (startTimeInput?.value && endTimeInput?.value && autoHours === null) {
    if (timeHint) {
      timeHint.textContent = "終亁E��刻は開始時刻より後に設定してください、E;
    }
    return;
  }

  if (autoHours !== null) {
    if (timeHint) {
      if (manualHours !== null) {
        timeHint.textContent = `勤務区刁E ${shiftLabel} / 拘束 ${boundText} / 控除 ${deductionText} / 自勁E${autoHours}時間�E�手入劁E${manualHours}時間を優先）`;
      } else {
        timeHint.textContent = `勤務区刁E ${shiftLabel} / 拘束 ${boundText} / 控除 ${deductionText} / 実労僁E${autoHours}時間`;
      }
    }
    renderWorkerTimeDetailList();
    return;
  }

  if (!startTimeInput?.value && !endTimeInput?.value) {
    if (timeHint) {
      if (manualHours !== null) {
        timeHint.textContent = `勤務区刁E ${shiftLabel} / 実労僁E${manualHours}時間�E�手入力を使用�E�`;
      } else {
        timeHint.textContent = `時刻未入力�Eため、標準勤勁E${settings.workdayStartTime}、E{settings.workdayEndTime}�E�控除 ${settings.workdayBreakMinutes}刁E��E ${defaultHours}時間で計算されます。`;
      }
    }
    renderWorkerTimeDetailList();
    return;
  }

  if (timeHint) {
    timeHint.textContent = "開始時刻と終亁E��刻をセチE��で入力してください、E;
  }
  renderWorkerTimeDetailList();
}
*/

function updateTimeHint() {
  const settings = normalizeCompanySettings(companySettings);
  const shiftType = getSelectedFormShiftType();
  const breakMinutes = getFormBreakMinutes(settings);
  const startTime = startTimeInput?.value || "";
  const endTime = endTimeInput?.value || "";
  const boundHours = calculateBoundHoursByRange(startTime, endTime);
  const autoHours = calculateHoursFromRange(startTime, endTime, settings, breakMinutes);
  const fullDayPreset = getShiftPreset(WORK_SHIFT_TYPE.FULL_DAY, settings);
  const defaultHours = calculateHoursFromRange(
    fullDayPreset.startTime,
    fullDayPreset.endTime,
    settings,
    fullDayPreset.breakMinutes
  ) ?? getDefaultWorkHours(settings);
  const manualHours = getFormManualWorkHours(settings);
  const shiftLabel = getShiftTypeLabel(shiftType);
  const boundText = Number.isFinite(boundHours) ? `${boundHours}\u6642\u9593` : "-";
  const deductionText = `${breakMinutes}\u5206`;

  if (calculatedWorkHoursInput) {
    calculatedWorkHoursInput.value = Number.isFinite(autoHours) ? String(autoHours) : "";
  }

  if (startTime && endTime && autoHours === null) {
    if (timeHint) {
      timeHint.textContent = "\u7d42\u4e86\u6642\u523b\u306f\u958b\u59cb\u6642\u523b\u3088\u308a\u5f8c\u306b\u8a2d\u5b9a\u3057\u3066\u304f\u3060\u3055\u3044\u3002";
    }
    return;
  }

  if (Number.isFinite(autoHours)) {
    if (timeHint) {
      if (manualHours !== null) {
        timeHint.textContent = `\u52e4\u52d9\u533a\u5206 ${shiftLabel} / \u62d8\u675f ${boundText} / \u63a7\u9664 ${deductionText} / \u81ea\u52d5 ${autoHours}\u6642\u9593\uff08\u624b\u5165\u529b ${manualHours}\u6642\u9593\u3092\u512a\u5148\uff09`;
      } else {
        timeHint.textContent = `\u52e4\u52d9\u533a\u5206 ${shiftLabel} / \u62d8\u675f ${boundText} / \u63a7\u9664 ${deductionText} / \u5b9f\u52b4\u50cd ${autoHours}\u6642\u9593`;
      }
    }
    renderWorkerTimeDetailList();
    return;
  }

  if (!startTime && !endTime) {
    if (timeHint) {
      if (manualHours !== null) {
        timeHint.textContent = `\u52e4\u52d9\u533a\u5206 ${shiftLabel} / \u5b9f\u52b4\u50cd ${manualHours}\u6642\u9593\uff08\u624b\u5165\u529b\u5024\u3092\u4f7f\u7528\uff09`;
      } else if (shiftType === WORK_SHIFT_TYPE.MANUAL) {
        timeHint.textContent = "\u52e4\u52d9\u533a\u5206 \u624b\u5165\u529b / \u5b9f\u52b4\u50cd\u6642\u9593\u3092\u76f4\u63a5\u5165\u529b\u3057\u3066\u304f\u3060\u3055\u3044\u3002";
      } else {
        timeHint.textContent = `\u6642\u523b\u672a\u5165\u529b\u306e\u305f\u3081\u3001\u6a19\u6e96\u52e4\u52d9 ${settings.workdayStartTime}\u301c${settings.workdayEndTime}\uff08\u63a7\u9664 ${settings.workdayBreakMinutes}\u5206\uff09= ${defaultHours}\u6642\u9593\u3067\u8a08\u7b97\u3057\u307e\u3059\u3002`;
      }
    }
    renderWorkerTimeDetailList();
    return;
  }

  if (timeHint) {
    timeHint.textContent = "\u958b\u59cb\u6642\u523b\u3068\u7d42\u4e86\u6642\u523b\u3092\u30bb\u30c3\u30c8\u3067\u5165\u529b\u3057\u3066\u304f\u3060\u3055\u3044\u3002";
  }
  renderWorkerTimeDetailList();
}

function downloadJsonBackup() {
  const currentState = { companySettings, masters, records, teamPlans, payrollAdjustments };
  const counts = getStateCounts(currentState);
  renderBackupSummary(counts);
  const confirmMessage = `JSONバックアチE�Eを保存します、En\n${formatCountsSummary(counts)}\n\nこ�E冁E��で保存しますか�E�`;
  if (!window.confirm(confirmMessage)) {
    setBackupMessage("JSON保存をキャンセルしました、E);
    return;
  }
  const exportedAt = new Date().toISOString();
  const backup = { exportedAt, version: 5, appStorageKey: APP_STORAGE_KEY, data: currentState };
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `taiseien-backup-${getTodayString()}.json`;
  link.click();
  URL.revokeObjectURL(url);
  localStorage.setItem(LAST_BACKUP_AT_KEY, exportedAt);
  updateBackupTimestamp(exportedAt);
  setBackupMessage(`JSON保存が完亁E��ました。件数サマリー: ${counts.records}件の作業記録 / ${counts.teamPlans}件の日別チ�Eム編成`);
}

function applyState(restoredState) {
  companySettings = normalizeCompanySettings(restoredState.companySettings);
  masters = restoredState.masters;
  records = restoredState.records;
  teamPlans = restoredState.teamPlans || [];
  payrollAdjustments = restoredState.payrollAdjustments || [];
  activePayrollWorkerId = "";
  saveState();
  resetRecordForm();
  resetOrchardForm();
  resetPlotForm();
  resetVarietyForm();
  resetGroupForm();
  resetTeamSetForm();
  resetWorkerForm();
  resetMembershipForm();
  resetTeamPlanForm();
  render();
}

function restoreFromBackupObject(payload, mode) {
  const incomingState = parseRestorePayload(payload);
  const merged = mode === "append"
    ? mergeStateForAppend({ companySettings, masters, records, teamPlans, payrollAdjustments }, incomingState)
    : incomingState;
  const restoredState = hydrateWorkerRelations(normalizeState(merged));
  applyState(restoredState);
  return restoredState;
}

function handleRestoreFile(event) {
  const [file] = event.target.files || [];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    const mode = restoreModeInput.value === "append" ? "append" : "replace";
    try {
      let parsed;
      try {
        parsed = JSON.parse(String(reader.result || "{}"));
      } catch (syntaxError) {
        throw new Error("JSON形式が不正です。ファイル冁E��を確認してください、E);
      }
      const incomingState = parseRestorePayload(parsed);
      const incomingCounts = getStateCounts(incomingState);
      const modeLabel = mode === "append" ? "追加復允E : "上書き復允E;
      const confirmMessage = `JSON復允E��実行します！E{modeLabel}�E�、En\n取込チE�Eタ件数:\n${formatCountsSummary(incomingCounts)}\n\nこ�E冁E��で復允E��ますか�E�`;
      if (!window.confirm(confirmMessage)) {
        setBackupMessage("JSON復允E��キャンセルしました、E);
        return;
      }
      const restoredState = restoreFromBackupObject(parsed, mode);
      const resultCounts = getStateCounts(restoredState);
      renderBackupSummary(resultCounts);
      setBackupMessage(`JSON復允E��完亁E��ました�E�E{modeLabel}�E�。`);
      window.alert(`JSON復允E��完亁E��ました、En\n${formatCountsSummary(resultCounts)}`);
    } catch (error) {
      console.error(error);
      setBackupMessage(error.message || "JSONファイルの読み込みに失敗しました、E);
      window.alert(error.message || "JSONファイルの読み込みに失敗しました、E);
    } finally {
      restoreInput.value = "";
    }
  };
  reader.readAsText(file, "utf-8");
}

function resetAllDataToSeedState() {
  const firstConfirm = window.confirm("初期チE�Eタに戻します。現在のチE�Eタは失われます、En\n先にバックアチE�E保存しましたか！E);
  if (!firstConfirm) return;
  const secondConfirm = window.confirm("本当に初期チE�Eタに戻しますか�E�E);
  if (!secondConfirm) return;

  const resetState = hydrateWorkerRelations(createSeedState());
  applyState(resetState);
  const counts = getStateCounts(resetState);
  renderBackupSummary(counts);
  setBackupMessage("初期チE�Eタに戻しました。忁E��に応じて再設定してください、E);
  localStorage.removeItem(LAST_BACKUP_AT_KEY);
  updateBackupTimestamp(localStorage.getItem(LAST_BACKUP_AT_KEY));
  setSettingsSection("backup", { switchToSettingsView: true, scrollIntoView: true, focusElement: backupButton });
  window.alert(`初期チE�Eタへの復允E��完亁E��ました、En\n${formatCountsSummary(counts)}`);
}

function renderBackupPanel() {
  renderBackupSummary(getStateCounts({ companySettings, masters, records, teamPlans }));
  updateBackupTimestamp(localStorage.getItem(LAST_BACKUP_AT_KEY));
}

const qrPrintImageCache = new Map();

function buildQrImageUrl(payload, size = 220) {
  const safeSize = Number(size) > 0 ? Number(size) : 220;
  return `https://api.qrserver.com/v1/create-qr-code/?size=${safeSize}x${safeSize}&data=${encodeURIComponent(payload)}`;
}

function loadImageElement(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.referrerPolicy = "no-referrer";
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("QR画像�E読み込みに失敗しました、E));
    image.src = src;
  });
}

function convertImageToPngDataUrl(image, size = 320) {
  const canvas = document.createElement("canvas");
  const drawSize = Number(size) > 0 ? Number(size) : 320;
  canvas.width = drawSize;
  canvas.height = drawSize;
  const context = canvas.getContext("2d");
  if (!context) return "";
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, drawSize, drawSize);
  context.drawImage(image, 0, 0, drawSize, drawSize);
  return canvas.toDataURL("image/png");
}

async function buildPrintableQrImageSourceFromUrl(sourceUrl, size = 320) {
  const cacheKey = `url:${size}:${sourceUrl}`;
  if (qrPrintImageCache.has(cacheKey)) {
    return qrPrintImageCache.get(cacheKey);
  }
  let printableSource = sourceUrl;
  try {
    const loadedImage = await loadImageElement(sourceUrl);
    const dataUrl = convertImageToPngDataUrl(loadedImage, size);
    if (dataUrl) {
      printableSource = dataUrl;
    }
  } catch (error) {
    console.warn(error);
  }
  qrPrintImageCache.set(cacheKey, printableSource);
  return printableSource;
}

async function buildPrintableQrImageSourceFromPayload(payload, size = 320) {
  const sourceUrl = buildQrImageUrl(payload, size);
  return buildPrintableQrImageSourceFromUrl(sourceUrl, size);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function isAndroidDevice() {
  if (typeof navigator === "undefined") return false;
  return /Android/i.test(navigator.userAgent || "");
}

function applyPlatformUiHints() {
  if (!document?.body) return;
  document.body.classList.toggle("platform-android", isAndroidDevice());
}

function openGeneratedDocumentWindow(html, options = {}) {
  const {
    width = 1200,
    height = 920,
    popupBlockedMessage = "画面を開けませんでした。ブラウザのポップアチE�E設定を確認してください、E
  } = options;
  const features = `width=${Math.max(480, width)},height=${Math.max(480, height)}`;
  let blobUrl = "";

  try {
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    blobUrl = URL.createObjectURL(blob);
    const blobWindow = window.open(blobUrl, "_blank", features);
    if (blobWindow) {
      window.setTimeout(() => {
        URL.revokeObjectURL(blobUrl);
      }, 180000);
      return blobWindow;
    }
    URL.revokeObjectURL(blobUrl);
    blobUrl = "";
  } catch (error) {
    if (blobUrl) {
      URL.revokeObjectURL(blobUrl);
    }
    console.warn("Blobプレビューの起動に失敗したためE��常モードへフォールバックします、E, error);
  }

  const fallbackWindow = window.open("", "_blank", features);
  if (!fallbackWindow) {
    window.alert(popupBlockedMessage);
    return null;
  }
  fallbackWindow.document.open();
  fallbackWindow.document.write(html);
  fallbackWindow.document.close();
  return fallbackWindow;
}

async function shareReportHtmlFromMainPage({ html, fileName, title, text }) {
  if (!navigator.share) {
    window.alert("こ�E端末では共有機�Eを利用できません、E);
    return;
  }
  try {
    let shared = false;
    if (typeof File !== "undefined" && navigator.canShare) {
      const file = new File([html], fileName, { type: "text/html" });
      if (navigator.canShare({ files: [file] })) {
        await navigator.share({
          title,
          text,
          files: [file]
        });
        shared = true;
      }
    }
    if (!shared) {
      await navigator.share({ title, text });
    }
  } catch (error) {
    if (error?.name === "AbortError") return;
    window.alert("共有に失敗しました。もぁE��度お試しください、E);
  }
}

function buildQrLabelSheetItems(type) {
  if (type === "orchard") {
    return masters.orchards.map((orchard) => {
      const code = normalizeManagementCode(orchard.managementCode);
      return {
        itemType: "orchard",
        typeLabel: "園地札",
        nameLine1: orchard.name || "園地名未設宁E,
        nameLine2: "",
        managementCode: code || "未設宁E,
        missingManagementCode: !code,
        idLabel: `園地ID: ${orchard.id}`,
        payload: buildLocationQrPayload(orchard.id, "")
      };
    });
  }
  return masters.plots.map((plot) => {
    const orchard = getOrchardById(plot.orchardId);
    const code = normalizeManagementCode(plot.managementCode);
    return {
      itemType: "plot",
      typeLabel: "区画札",
      nameLine1: plot.name || "区画名未設宁E,
      nameLine2: `園地: ${orchard?.name || "未設宁E}`,
      managementCode: code || "未設宁E,
      missingManagementCode: !code,
      idLabel: `園地ID: ${plot.orchardId} / 区画ID: ${plot.id}`,
      payload: buildLocationQrPayload(plot.orchardId, plot.id)
    };
  });
}

function buildQrLabelSheetHtml(type, labelItems, layoutMode = "standard", options = {}) {
  const isSimple = layoutMode === "simple";
  const preferredAction = options.preferredAction === "pdf" ? "pdf" : "print";
  const targetLabel = type === "orchard" ? "園地" : "区画";
  const title = isSimple
    ? `(株)大成園 ${targetLabel}QR簡易ラベル印刷`
    : `(株)大成園 ${targetLabel}QRラベル印刷`;
  const subtitle = isSimple
    ? `${targetLabel}の管琁E��ードを最優先で大きく表示する簡易ラベルです。管琁E��ード未設定時は警告表示されます。`
    : type === "orchard"
      ? "園地札用ラベルです。現場貼付前に園地IDを確認してください、E
      : "区画札用ラベルです。現場貼付前に園地ID・区画IDの両方を確認してください、E;

  const cardsHtml = labelItems.map((item) => {
    if (isSimple) {
      return `
        <article class="label-card label-card--simple label-card--${escapeHtml(item.itemType)}">
          <div class="label-card__head">
            <span class="label-card__kind label-card__kind--${escapeHtml(item.itemType)}">${escapeHtml(item.typeLabel)}</span>
            <p class="label-card__code label-card__code--simple ${item.missingManagementCode ? "label-card__code--warning" : ""}">${escapeHtml(item.managementCode)}</p>
            ${item.missingManagementCode ? '<p class="label-card__warning">管琁E��ード未設定（�Eスター設定が忁E��E��E/p>' : ""}
            <strong class="label-card__name label-card__name--simple">${escapeHtml(item.nameLine1)}</strong>
            ${item.nameLine2 ? `<span class="label-card__name-sub">${escapeHtml(item.nameLine2)}</span>` : ""}
          </div>
          <img class="label-card__qr" src="${escapeHtml(item.qrImageSrc || buildQrImageUrl(item.payload))}" alt="${escapeHtml(item.typeLabel)} QR">
          <p class="label-card__id label-card__id--tiny">${escapeHtml(item.idLabel)}</p>
        </article>
      `;
    }
    return `
      <article class="label-card label-card--${escapeHtml(item.itemType)}">
        <div class="label-card__head">
          <span class="label-card__kind label-card__kind--${escapeHtml(item.itemType)}">${escapeHtml(item.typeLabel)}</span>
          <strong class="label-card__name">${escapeHtml(item.nameLine1)}</strong>
          ${item.nameLine2 ? `<span class="label-card__name-sub">${escapeHtml(item.nameLine2)}</span>` : ""}
        </div>
        <p class="label-card__code ${item.missingManagementCode ? "label-card__code--warning" : ""}">管琁E��ーチE ${escapeHtml(item.managementCode)}</p>
        ${item.missingManagementCode ? '<p class="label-card__warning">管琁E��ード未設定（�Eスター設定が忁E��E��E/p>' : ""}
        <img class="label-card__qr" src="${escapeHtml(item.qrImageSrc || buildQrImageUrl(item.payload))}" alt="${escapeHtml(item.typeLabel)} QR">
        <p class="label-card__id">${escapeHtml(item.idLabel)}</p>
        <p class="label-card__payload">${escapeHtml(item.payload)}</p>
      </article>
    `;
  }).join("");

  return `
    <html lang="ja">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>${escapeHtml(title)}</title>
        <style>
          @page { size: A4 portrait; margin: 10mm; }
          * { box-sizing: border-box; }
          body { margin: 0; background: #f5f3ee; color: #222; font-family: "Yu Gothic", "Hiragino Kaku Gothic ProN", sans-serif; }
          .sheet-toolbar { position: sticky; top: 0; z-index: 10; display: flex; gap: 10px; align-items: center; justify-content: space-between; padding: 12px 16px; background: #ffffffee; border-bottom: 1px solid #d8d2c8; backdrop-filter: blur(6px); }
          .sheet-toolbar__title { margin: 0; font-size: 18px; }
          .sheet-toolbar__lead { margin: 4px 0 0; color: #5c5246; font-size: 13px; }
          .sheet-toolbar__lead--status { font-weight: 700; color: #3d5f2f; }
          .sheet-toolbar__actions { display: flex; gap: 8px; flex-wrap: wrap; }
          .sheet-button { border: 0; border-radius: 999px; min-height: 38px; padding: 8px 14px; font-size: 14px; cursor: pointer; }
          .sheet-button:disabled { opacity: 0.55; cursor: wait; }
          .sheet-button--print { background: #3f6f3f; color: #fff; }
          .sheet-button--pdf { background: #c6522f; color: #fff; }
          .sheet-button--share { background: #e8e2d5; color: #3f3529; }
          .sheet-button--close { background: #ece8de; color: #3c352f; }
          .sheet-body { width: min(210mm, 100%); margin: 0 auto; padding: 8mm 0 12mm; }
          .label-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 6mm; }
          .label-card { background: #fff; border: 1.2px dashed #85796b; border-radius: 5mm; min-height: 88mm; padding: 5mm; display: grid; grid-template-rows: auto auto auto auto auto; gap: 2.5mm; align-content: start; page-break-inside: avoid; break-inside: avoid; box-shadow: inset 0 0 0 0.6mm #fff; }
          .label-card--simple { grid-template-rows: auto auto auto auto; min-height: 94mm; }
          .label-card--orchard { border-color: #3f6f3f; }
          .label-card--plot { border-color: #8b6235; }
          .label-card--simple.label-card--orchard { background: #f4fbf4; }
          .label-card--simple.label-card--plot { background: #fff8ef; }
          .label-card__head { display: grid; gap: 1.8mm; }
          .label-card__kind { display: inline-block; width: fit-content; padding: 1mm 2mm; border-radius: 999px; background: #f2ead8; font-size: 11px; font-weight: 700; }
          .label-card__kind--orchard { background: #deefde; color: #205720; }
          .label-card__kind--plot { background: #f3e1c8; color: #724712; }
          .label-card--simple .label-card__kind { font-size: 13px; padding: 1.2mm 2.6mm; }
          .label-card__name { font-size: 16px; line-height: 1.3; }
          .label-card__name--simple { font-size: 20px; line-height: 1.2; letter-spacing: 0.03em; }
          .label-card__name-sub { font-size: 12px; color: #645a50; }
          .label-card__code { margin: 0; font-size: 15px; font-weight: 800; color: #2f2820; }
          .label-card__code--simple { font-size: 30px; line-height: 1.05; letter-spacing: 0.06em; text-align: center; padding: 2mm 2.4mm; border-radius: 3mm; background: #fff; border: 1px solid #d8ccb7; }
          .label-card__code--warning { color: #9f2d2d; background: #fde8e8; border-color: #e0b8b8; }
          .label-card__warning { margin: 0; font-size: 11px; color: #9f2d2d; font-weight: 700; }
          .label-card__qr { width: 100%; aspect-ratio: 1 / 1; object-fit: contain; border: 1px solid #ddd2bf; border-radius: 3mm; background: #fff; display: block !important; visibility: visible !important; opacity: 1 !important; }
          .label-card__id { margin: 0; font-size: 12px; font-weight: 700; color: #2f2820; }
          .label-card__id--tiny { font-size: 9px; font-weight: 500; color: #756a5e; }
          .label-card__payload { margin: 0; font-size: 10px; color: #756a5e; word-break: break-all; }
          @media (max-width: 900px) {
            .label-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          }
          @media (max-width: 640px) {
            .sheet-toolbar { position: static; }
            .sheet-toolbar__actions { width: 100%; }
            .sheet-button { flex: 1; }
            .sheet-body { width: 100%; padding: 12px; }
            .label-grid { grid-template-columns: 1fr; gap: 10px; }
            .label-card { min-height: auto; border-radius: 12px; padding: 10px; }
            .label-card--simple .label-card__name--simple { font-size: 23px; }
            .label-card__code--simple { font-size: 28px; }
          }
          @media print {
            body { background: #fff; }
            .sheet-toolbar { display: none; }
            .sheet-body { width: auto; margin: 0; padding: 0; }
            .label-card__payload { display: none; }
            .label-card__id { font-size: 8px; color: #85796b; }
            .label-card--simple .label-card__id--tiny { display: none; }
          }
        </style>
      </head>
      <body>
        <header class="sheet-toolbar">
          <div>
            <h1 class="sheet-toolbar__title">${escapeHtml(title)}</h1>
            <p class="sheet-toolbar__lead">${escapeHtml(subtitle)}</p>
            <p class="sheet-toolbar__lead sheet-toolbar__lead--status" id="sheetLoadStatus">QR画像を読み込み中でぁE..</p>
            <p class="sheet-toolbar__lead">Androidは「PDF保存」後に共有�Eアプリで印刷すると安定しめE��ぁE��す、E/p>
          </div>
          <div class="sheet-toolbar__actions">
            <button class="sheet-button sheet-button--print" id="sheetPrintButton" type="button" onclick="printAfterQrReady('print')" disabled>こ�E画面を印刷</button>
            <button class="sheet-button sheet-button--pdf" id="sheetPdfButton" type="button" onclick="printAfterQrReady('pdf')" disabled>PDF保孁E/button>
            <button class="sheet-button sheet-button--share" id="sheetShareButton" type="button">共朁E/button>
            <button class="sheet-button sheet-button--close" type="button" onclick="window.close()">閉じめE/button>
          </div>
        </header>
        <main class="sheet-body">
          <section class="label-grid">
            ${cardsHtml}
          </section>
        </main>
        <script>
          (function () {
            const images = Array.from(document.querySelectorAll(".label-card__qr"));
            const printButton = document.getElementById("sheetPrintButton");
            const pdfButton = document.getElementById("sheetPdfButton");
            const shareButton = document.getElementById("sheetShareButton");
            const status = document.getElementById("sheetLoadStatus");
            const preferredAction = "${preferredAction}";
            const waitForImage = (image) => new Promise((resolve) => {
              if (image.complete && image.naturalWidth > 0) {
                resolve(true);
                return;
              }
              const done = () => {
                cleanup();
                resolve(image.naturalWidth > 0);
              };
              const cleanup = () => {
                image.removeEventListener("load", done);
                image.removeEventListener("error", done);
              };
              image.addEventListener("load", done, { once: true });
              image.addEventListener("error", done, { once: true });
            });
            const waitForAllImages = async () => Promise.all(images.map(waitForImage));

            const syncButtons = (allReady) => {
              if (printButton) {
                printButton.disabled = !allReady;
                printButton.textContent = allReady ? "こ�E画面を印刷" : "QR読込中...";
              }
              if (pdfButton) {
                pdfButton.disabled = !allReady;
                pdfButton.textContent = allReady ? "PDF保孁E : "QR読込中...";
              }
            };

            window.printAfterQrReady = async function printAfterQrReady(triggerMode) {
              syncButtons(false);
              const results = await waitForAllImages();
              const allReady = results.every(Boolean);
              if (status) {
                status.textContent = allReady
                  ? "QR画像�E準備ができました。印刷できます、E
                  : "QR画像�E読み込みに失敗した頁E��があります。�E読み込みしてください、E;
              }
              syncButtons(allReady);
              if (allReady) {
                if (status) {
                  status.textContent = triggerMode === "pdf"
                    ? "PDF保存ダイアログを開きます。保存�Eを選択してください、E
                    : "印刷ダイアログを開きます、E;
                }
                window.print();
              }
            };

            if (shareButton) {
              if (!navigator.share) {
                shareButton.disabled = true;
                shareButton.textContent = "共有未対忁E;
              } else {
                shareButton.addEventListener("click", async () => {
                  try {
                    const html = "<!DOCTYPE html>\n" + document.documentElement.outerHTML;
                    let shared = false;
                    if (typeof File !== "undefined" && navigator.canShare) {
                      const file = new File([html], "taiseien-qr-labels.html", { type: "text/html" });
                      if (navigator.canShare({ files: [file] })) {
                        await navigator.share({
                          title: document.title,
                          text: "QRラベルを�E有しまぁE,
                          files: [file]
                        });
                        shared = true;
                      }
                    }
                    if (!shared) {
                      await navigator.share({
                        title: document.title,
                        text: "QRラベルを�E有しまぁE
                      });
                    }
                  } catch (error) {
                    if (error && error.name === "AbortError") return;
                    window.alert("共有に失敗しました、E);
                  }
                });
              }
            }

            waitForAllImages().then((results) => {
              const allReady = results.every(Boolean);
              if (status) {
                status.textContent = allReady
                  ? "QR画像�E準備ができました。印刷できます、E
                  : "QR画像�E読み込みに失敗した頁E��があります。�E読み込みしてください、E;
              }
              if (printButton) {
                printButton.disabled = !allReady;
                printButton.textContent = allReady ? "こ�E画面を印刷" : "QR読込エラー";
              }
              syncButtons(allReady);
              if (allReady && preferredAction === "pdf") {
                window.setTimeout(() => {
                  window.printAfterQrReady("pdf");
                }, 120);
              }
            });
          })();
        </script>
      </body>
    </html>
  `;
}

async function openQrLabelSheet(type, layoutMode = "standard", preferredAction = "print") {
  const items = buildQrLabelSheetItems(type);
  if (!items.length) {
    window.alert(type === "orchard" ? "園地チE�EタがなぁE��め印刷できません、E : "区画チE�EタがなぁE��め印刷できません、E);
    return;
  }
  const loadingHtml = `
    <html lang="ja">
      <head>
        <meta charset="utf-8">
        <title>QR印刷画面を準備中</title>
        <style>
          body { font-family: "Yu Gothic", "Hiragino Kaku Gothic ProN", sans-serif; margin: 0; padding: 28px; color: #2f2820; background: #fbf8f2; }
          h1 { margin: 0 0 10px; font-size: 20px; }
          p { margin: 0; color: #5f5549; }
        </style>
      </head>
      <body>
        <h1>QR印刷画面を準備してぁE��ぁE..</h1>
        <p>画像�E読み込みが終わるまでそ�Eままお征E��ください、E/p>
      </body>
    </html>
  `;
  const win = openGeneratedDocumentWindow(loadingHtml, {
    width: 1200,
    height: 920,
    popupBlockedMessage: "印刷画面を開けませんでした。ブラウザのポップアチE�E設定を確認してください、E
  });
  if (!win) return;
  try {
    const qrSize = layoutMode === "simple" ? 360 : 300;
    const printableItems = await Promise.all(items.map(async (item) => ({
      ...item,
      qrImageSrc: await buildPrintableQrImageSourceFromPayload(item.payload, qrSize)
    })));
    win.document.open();
    win.document.write(buildQrLabelSheetHtml(type, printableItems, layoutMode, { preferredAction }));
    win.document.close();
  } catch (error) {
    console.error(error);
    win.document.open();
    win.document.write(`
      <html lang="ja">
        <head>
          <meta charset="utf-8">
          <title>QR印刷画面エラー</title>
          <style>
            body { font-family: "Yu Gothic", "Hiragino Kaku Gothic ProN", sans-serif; margin: 0; padding: 28px; color: #2f2820; background: #fbf8f2; }
            h1 { margin: 0 0 10px; font-size: 20px; color: #9f2d2d; }
            p { margin: 0 0 8px; color: #5f5549; }
          </style>
        </head>
        <body>
          <h1>QR印刷画面の準備に失敗しました</h1>
          <p>通信環墁E��ご確認�EぁE��、もぁE��度お試しください、E/p>
          <p>問題が続く場合�E、一覧画面から画像保存して印刷してください、E/p>
        </body>
      </html>
    `);
    win.document.close();
  }
}

function getDailyReportRecords(targetDate) {
  return records
    .filter((record) => record.workDate === targetDate)
    .sort((a, b) => {
      const startA = parseTimeToMinutes(getRecordStartTime(a));
      const startB = parseTimeToMinutes(getRecordStartTime(b));
      if (startA !== null && startB !== null && startA !== startB) {
        return startA - startB;
      }
      const updatedA = new Date(a.updatedAt).getTime() || 0;
      const updatedB = new Date(b.updatedAt).getTime() || 0;
      return updatedA - updatedB;
    });
}

function getDailyReportSummary(dayRecords) {
  return dayRecords.reduce((acc, record) => {
    const metrics = getRecordMetrics(record);
    acc.count += 1;
    acc.hours += metrics.hours;
    acc.personHours += metrics.personHours;
    acc.laborCost += metrics.laborCost;
    return acc;
  }, { count: 0, hours: 0, personHours: 0, laborCost: 0 });
}

/*
function buildDailyReportRowsHtml(dayRecords) {
  return dayRecords.map((record, index) => {
    const names = getRecordDisplay(record);
    const metrics = getRecordMetrics(record);
    const startTime = record.startTime || " E;
    const endTime = record.endTime || " E;
    const weather = record.weather || " E;
    const materials = record.materials || " E;
    const notes = record.notes || " E;

    return `
      <article class="daily-report-card">
        <div class="daily-report-card__header">
          <span class="daily-report-card__index">No.${index + 1}</span>
          <h3>${escapeHtml(record.taskType || "未設宁E)}</h3>
          <span class="daily-report-card__group">${escapeHtml(names.dailyGroupName || "未設宁E)}</span>
        </div>
        <div class="daily-report-grid">
          <div class="daily-report-item"><span>作業日</span><strong>${escapeHtml(formatDateYmd(record.workDate))}</strong></div>
          <div class="daily-report-item"><span>園地吁E/span><strong>${escapeHtml(names.orchardName || "未設宁E)}</strong></div>
          <div class="daily-report-item"><span>区画吁E/span><strong>${escapeHtml(names.plotName || "未設宁E)}</strong></div>
          <div class="daily-report-item"><span>品種</span><strong>${escapeHtml(names.varietyName || "未設宁E)}</strong></div>
          <div class="daily-report-item"><span>作業区刁E/span><strong>${escapeHtml(record.taskType || "未設宁E)}</strong></div>
          <div class="daily-report-item"><span>作業グルーチE/span><strong>${escapeHtml(names.dailyGroupName || "未設宁E)}</strong></div>
          <div class="daily-report-item daily-report-item--full"><span>作業老E��覧</span><strong>${escapeHtml(names.workerListText || "未設宁E)}</strong></div>
          <div class="daily-report-item"><span>作業人数</span><strong>${escapeHtml(formatCount(metrics.workerCount))}</strong></div>
          <div class="daily-report-item"><span>開始時刻</span><strong>${escapeHtml(startTime)}</strong></div>
          <div class="daily-report-item"><span>終亁E��刻</span><strong>${escapeHtml(endTime)}</strong></div>
          <div class="daily-report-item"><span>作業時間</span><strong>${escapeHtml(formatHours(metrics.hours))}</strong></div>
          <div class="daily-report-item"><span>延べ人晁E/span><strong>${escapeHtml(formatPersonHours(metrics.personHours))}</strong></div>
          <div class="daily-report-item"><span>概算人件費</span><strong>${escapeHtml(formatCurrency(metrics.laborCost))}</strong></div>
          <div class="daily-report-item"><span>天氁E/span><strong>${escapeHtml(weather)}</strong></div>
          <div class="daily-report-item daily-report-item--full"><span>使用賁E��</span><strong>${escapeHtml(materials)}</strong></div>
          <div class="daily-report-item daily-report-item--full"><span>メモ</span><strong>${escapeHtml(notes)}</strong></div>
        </div>
      </article>
    `;
  }).join("");
}

function buildDailyReportHtml(targetDate, options = {}) {
  const dayRecords = getDailyReportRecords(targetDate);
  const summary = getDailyReportSummary(dayRecords);
  const rowsHtml = dayRecords.length
    ? buildDailyReportRowsHtml(dayRecords)
    : `<div class="daily-report-empty">持E��日の作業記録はありません、E/div>`;

  return `
    <html lang="ja">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>(株)大成園　作業記録アプリ 作業日報 ${escapeHtml(formatDateYmd(targetDate))}</title>
        <style>
          @page { size: A4 portrait; margin: 12mm; }
          * { box-sizing: border-box; }
          body { margin: 0; background: #f6f3ec; color: #2f2921; font-family: "Yu Gothic", "Hiragino Kaku Gothic ProN", sans-serif; }
          .report-toolbar { position: sticky; top: 0; z-index: 10; display: flex; gap: 10px; align-items: center; justify-content: space-between; padding: 12px 16px; border-bottom: 1px solid #d8d2c8; background: #ffffffee; backdrop-filter: blur(6px); }
          .report-toolbar h1 { margin: 0; font-size: 17px; }
          .report-toolbar p { margin: 4px 0 0; color: #5d5348; font-size: 13px; }
          .report-actions { display: flex; gap: 8px; flex-wrap: wrap; }
          .report-button { border: 0; border-radius: 999px; min-height: 38px; padding: 8px 14px; cursor: pointer; font-size: 14px; }
          .report-button--print { background: #3f6f3f; color: #fff; }
          .report-button--pdf { background: #c6522f; color: #fff; }
          .report-button--share { background: #ece4d7; color: #3e342a; }
          .report-button--close { background: #ece8de; color: #3c352f; }
          .report-toolbar__hint { margin-top: 6px; font-size: 12px; color: #7b6a58; }
          .report-body { width: min(210mm, 100%); margin: 0 auto; padding: 7mm 0 12mm; }
          .report-header { margin-bottom: 6mm; padding: 5mm; border-radius: 4mm; background: #fff; border: 1px solid #dfd8cd; }
          .report-app-name { margin: 0; font-size: 20px; line-height: 1.3; }
          .report-title { margin: 2mm 0 1mm; font-size: 18px; }
          .report-date { margin: 0; color: #5f564b; font-size: 13px; }
          .report-summary { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 2.8mm; margin-top: 4mm; }
          .report-summary__item { background: #fff; border: 1px solid #dfd8cd; border-radius: 3mm; padding: 2.5mm 3mm; display: grid; gap: 1.2mm; }
          .report-summary__item span { color: #61574b; font-size: 11px; }
          .report-summary__item strong { font-size: 15px; }
          .daily-report-list { display: grid; gap: 3.5mm; }
          .daily-report-card { background: #fff; border: 1px solid #dfd8cd; border-radius: 3.5mm; padding: 3.5mm; break-inside: avoid; page-break-inside: avoid; }
          .daily-report-card__header { display: flex; flex-wrap: wrap; gap: 1.5mm 3mm; align-items: center; margin-bottom: 2.6mm; }
          .daily-report-card__index { font-size: 11px; color: #5d5448; padding: 1mm 2mm; border-radius: 999px; background: #efe9dc; }
          .daily-report-card__header h3 { margin: 0; font-size: 15px; line-height: 1.3; }
          .daily-report-card__group { margin-left: auto; font-size: 11px; color: #4d4439; }
          .daily-report-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 2.1mm; }
          .daily-report-item { display: grid; gap: 0.8mm; padding: 2mm 2.2mm; border-radius: 2.5mm; background: #faf8f2; border: 1px solid #e3dccc; }
          .daily-report-item span { font-size: 10px; color: #6a5f50; }
          .daily-report-item strong { font-size: 12px; line-height: 1.35; word-break: break-word; }
          .daily-report-item--full { grid-column: 1 / -1; }
          .daily-report-empty { padding: 14mm 4mm; text-align: center; color: #5f564b; border: 1px dashed #b7ab9a; border-radius: 4mm; background: #fff; }
          @media (max-width: 920px) {
            .report-summary { grid-template-columns: repeat(2, minmax(0, 1fr)); }
            .daily-report-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          }
          @media (max-width: 640px) {
            .report-toolbar { position: static; padding: 10px 12px; }
            .report-actions { width: 100%; }
            .report-button { flex: 1; }
            .report-body { width: 100%; padding: 12px; }
            .report-summary, .daily-report-grid { grid-template-columns: 1fr; }
            .daily-report-card__group { margin-left: 0; }
          }
          @media print {
            body { background: #fff; }
            .report-toolbar { display: none; }
            .report-body { width: auto; margin: 0; padding: 0; }
          }
        </style>
      </head>
      <body>
        <header class="report-toolbar">
          <div>
            <h1>作業日報プレビュー</h1>
            <p>持E��日: ${escapeHtml(formatDateYmd(targetDate))}</p>
          </div>
          <div class="report-actions">
            <button class="report-button report-button--print" type="button" onclick="window.print()">こ�E画面を印刷</button>
            <button class="report-button report-button--close" type="button" onclick="window.close()">閉じめE/button>
          </div>
        </header>
        <main class="report-body">
          <section class="report-header">
            <p class="report-app-name">(株)大成園　作業記録アプリ</p>
            <h2 class="report-title">作業日報</h2>
            <p class="report-date">作業日: ${escapeHtml(formatDateYmd(targetDate))}</p>
            <div class="report-summary">
              <div class="report-summary__item"><span>当日の総作業件数</span><strong>${escapeHtml(formatCount(summary.count))}</strong></div>
              <div class="report-summary__item"><span>当日の総作業時間</span><strong>${escapeHtml(formatHours(summary.hours))}</strong></div>
              <div class="report-summary__item"><span>当日の総延べ人晁E/span><strong>${escapeHtml(formatPersonHours(summary.personHours))}</strong></div>
              <div class="report-summary__item"><span>当日の総概算人件費</span><strong>${escapeHtml(formatCurrency(summary.laborCost))}</strong></div>
            </div>
          </section>
          <section class="daily-report-list">
            ${rowsHtml}
          </section>
        </main>
        <script>
          (function () {
            const preferredAction = "${preferredAction}";
            const pdfButton = document.getElementById("reportPdfButton");
            const shareButton = document.getElementById("reportShareButton");
            if (shareButton) {
              if (!navigator.share) {
                shareButton.disabled = true;
                shareButton.textContent = "${text.shareUnavailable}";
              } else {
                shareButton.addEventListener("click", async () => {
                  try {
                    await navigator.share({
                      title: document.title,
                      text: "${text.shareText}"
                    });
                  } catch (error) {
                    if (error && error.name === "AbortError") return;
                    window.alert("${text.shareError}");
                  }
                });
              }
            }
            if (preferredAction === "pdf" && pdfButton) {
              window.setTimeout(() => pdfButton.click(), 120);
            }
          })();
        </script>
      </body>
    </html>
  `;
}

function openDailyReportWindow() {
  if (!dailyReportDateInput || !dailyReportDateInput.value) {
    window.alert("日報対象日を選択してください、E);
    return;
  }
  const targetDate = dailyReportDateInput.value;
  const win = window.open("", "_blank", "width=1200,height=920");
  if (!win) {
    window.alert("日報画面を開けませんでした。ブラウザのポップアチE�E設定を確認してください、E);
    return;
  }
  win.document.write(buildDailyReportHtml(targetDate));
  win.document.close();
}

*/

function buildDailyReportRowsHtml(dayRecords) {
  const text = {
    unset: "\u672a\u8a2d\u5b9a",
    none: "\u2015",
    workDate: "\u4f5c\u696d\u65e5",
    orchard: "\u5712\u5730\u540d",
    plot: "\u533a\u753b\u540d",
    variety: "\u54c1\u7a2e",
    taskCategory: "\u4f5c\u696d\u533a\u5206",
    group: "\u4f5c\u696d\u30b0\u30eb\u30fc\u30d7",
    workers: "\u4f5c\u696d\u8005\u4e00\u89a7",
    workerCount: "\u4f5c\u696d\u4eba\u6570",
    startTime: "\u958b\u59cb\u6642\u523b",
    endTime: "\u7d42\u4e86\u6642\u523b",
    workHours: "\u4f5c\u696d\u6642\u9593",
    personHours: "\u5ef6\u3079\u4eba\u6642",
    laborCost: "\u6982\u7b97\u4eba\u4ef6\u8cbb",
    temperature: "\u73fe\u5728\u6c17\u6e29\uff08\u2103\uff09",
    weather: "\u5929\u6c17",
    materials: "\u4f7f\u7528\u8cc7\u6750",
    notes: "\u30e1\u30e2"
  };

  return dayRecords.map((record, index) => {
    const names = getRecordDisplay(record);
    const metrics = getRecordMetrics(record);
    const environment = normalizeRecordEnvironment(record);
    const startTime = getRecordStartTime(record) || text.none;
    const endTime = getRecordEndTime(record) || text.none;
    const temperature = formatTemperature(environment.temperatureC);
    const weatherBase = environment.weather || text.none;
    const weatherDetail = formatWeatherInfoSummary(environment.weatherInfo);
    const weather = weatherDetail ? `${weatherBase} / ${weatherDetail}` : weatherBase;
    const materials = record.materials || text.none;
    const observationSummary = formatFieldObservationSummary(record.fieldObservation);
    const noteParts = [record.notes, observationSummary ? `現場確誁E ${observationSummary}` : ""].filter(Boolean);
    const notes = noteParts.length ? noteParts.join(" / ") : text.none;
    const workTypeText = getRecordTaskTypeText(record, text.unset);

    return `
      <article class="daily-report-card">
        <div class="daily-report-card__header">
          <span class="daily-report-card__index">No.${index + 1}</span>
          <h3>${escapeHtml(workTypeText)}</h3>
          <span class="daily-report-card__group">${escapeHtml(names.dailyGroupName || text.unset)}</span>
        </div>
        <div class="daily-report-grid">
          <div class="daily-report-item"><span>${text.workDate}</span><strong>${escapeHtml(formatDateYmd(record.workDate))}</strong></div>
          <div class="daily-report-item"><span>${text.orchard}</span><strong>${escapeHtml(names.orchardName || text.unset)}</strong></div>
          <div class="daily-report-item"><span>${text.plot}</span><strong>${escapeHtml(names.plotName || text.unset)}</strong></div>
          <div class="daily-report-item"><span>${text.variety}</span><strong>${escapeHtml(names.varietyName || text.unset)}</strong></div>
          <div class="daily-report-item"><span>${text.taskCategory}</span><strong>${escapeHtml(workTypeText)}</strong></div>
          <div class="daily-report-item"><span>${text.group}</span><strong>${escapeHtml(names.dailyGroupName || text.unset)}</strong></div>
          <div class="daily-report-item daily-report-item--full"><span>${text.workers}</span><strong>${escapeHtml(names.workerListText || text.unset)}</strong></div>
          <div class="daily-report-item"><span>${text.workerCount}</span><strong>${escapeHtml(formatCount(metrics.workerCount))}</strong></div>
          <div class="daily-report-item"><span>${text.startTime}</span><strong>${escapeHtml(startTime)}</strong></div>
          <div class="daily-report-item"><span>${text.endTime}</span><strong>${escapeHtml(endTime)}</strong></div>
          <div class="daily-report-item"><span>${text.workHours}</span><strong>${escapeHtml(formatHours(metrics.hours))}</strong></div>
          <div class="daily-report-item"><span>${text.personHours}</span><strong>${escapeHtml(formatPersonHours(metrics.personHours))}</strong></div>
          <div class="daily-report-item"><span>${text.laborCost}</span><strong>${escapeHtml(formatCurrency(metrics.laborCost))}</strong></div>
          <div class="daily-report-item"><span>${text.temperature}</span><strong>${escapeHtml(temperature)}</strong></div>
          <div class="daily-report-item"><span>${text.weather}</span><strong>${escapeHtml(weather)}</strong></div>
          <div class="daily-report-item daily-report-item--full"><span>${text.materials}</span><strong>${escapeHtml(materials)}</strong></div>
          <div class="daily-report-item daily-report-item--full"><span>${text.notes}</span><strong>${escapeHtml(notes)}</strong></div>
        </div>
      </article>
    `;
  }).join("");
}

function buildDailyReportHtml(targetDate, options = {}) {
  const text = {
    appName: "\u0028\u682a\u0029\u5927\u6210\u5712\u3000\u4f5c\u696d\u8a18\u9332\u30a2\u30d7\u30ea",
    reportTitle: "\u4f5c\u696d\u65e5\u5831",
    previewTitle: "\u4f5c\u696d\u65e5\u5831\u30d7\u30ec\u30d3\u30e5\u30fc",
    targetDate: "\u6307\u5b9a\u65e5",
    noRecords: "\u6307\u5b9a\u65e5\u306e\u4f5c\u696d\u8a18\u9332\u306f\u3042\u308a\u307e\u305b\u3093\u3002",
    print: "\u3053\u306e\u753b\u9762\u3092\u5370\u5237",
    savePdf: "\u0050\u0044\u0046\u4fdd\u5b58",
    share: "\u5171\u6709",
    shareUnavailable: "\u5171\u6709\u672a\u5bfe\u5fdc",
    shareError: "\u5171\u6709\u306b\u5931\u6557\u3057\u307e\u3057\u305f\u3002",
    shareText: "\u4f5c\u696d\u65e5\u5831\u3092\u5171\u6709\u3057\u307e\u3059",
    androidHint: "\u0041\u006e\u0064\u0072\u006f\u0069\u0064\u306f\u300c\u0050\u0044\u0046\u4fdd\u5b58\u300d\u2192\u300c\u5171\u6709\u300d\u3067\u5370\u5237\u30a2\u30d7\u30ea\u3078\u6e21\u3059\u3068\u5b89\u5b9a\u3057\u3084\u3059\u3044\u3067\u3059\u3002",
    close: "\u9589\u3058\u308b",
    totalCount: "\u5f53\u65e5\u306e\u7dcf\u4f5c\u696d\u4ef6\u6570",
    totalHours: "\u5f53\u65e5\u306e\u7dcf\u4f5c\u696d\u6642\u9593",
    totalPersonHours: "\u5f53\u65e5\u306e\u7dcf\u5ef6\u3079\u4eba\u6642",
    totalLaborCost: "\u5f53\u65e5\u306e\u7dcf\u6982\u7b97\u4eba\u4ef6\u8cbb",
    workDate: "\u4f5c\u696d\u65e5"
  };
  const preferredAction = options.preferredAction === "pdf" ? "pdf" : "print";

  const dayRecords = getDailyReportRecords(targetDate);
  const summary = getDailyReportSummary(dayRecords);
  const rowsHtml = dayRecords.length
    ? buildDailyReportRowsHtml(dayRecords)
    : `<div class="daily-report-empty">${text.noRecords}</div>`;

  return `
    <html lang="ja">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>${escapeHtml(text.appName)} ${escapeHtml(text.reportTitle)} ${escapeHtml(formatDateYmd(targetDate))}</title>
        <style>
          @page { size: A4 portrait; margin: 12mm; }
          * { box-sizing: border-box; }
          body { margin: 0; background: #f6f3ec; color: #2f2921; font-family: "Yu Gothic", "Hiragino Kaku Gothic ProN", sans-serif; }
          .report-toolbar { position: sticky; top: 0; z-index: 10; display: flex; gap: 10px; align-items: center; justify-content: space-between; padding: 12px 16px; border-bottom: 1px solid #d8d2c8; background: #ffffffee; backdrop-filter: blur(6px); }
          .report-toolbar h1 { margin: 0; font-size: 17px; }
          .report-toolbar p { margin: 4px 0 0; color: #5d5348; font-size: 13px; }
          .report-actions { display: flex; gap: 8px; flex-wrap: wrap; }
          .report-button { border: 0; border-radius: 999px; min-height: 38px; padding: 8px 14px; cursor: pointer; font-size: 14px; }
          .report-button--print { background: #3f6f3f; color: #fff; }
          .report-button--pdf { background: #c6522f; color: #fff; }
          .report-button--share { background: #ece4d7; color: #3e342a; }
          .report-button--close { background: #ece8de; color: #3c352f; }
          .report-toolbar__hint { margin-top: 6px; font-size: 12px; color: #7b6a58; }
          .report-body { width: min(210mm, 100%); margin: 0 auto; padding: 7mm 0 12mm; }
          .report-header { margin-bottom: 6mm; padding: 5mm; border-radius: 4mm; background: #fff; border: 1px solid #dfd8cd; }
          .report-app-name { margin: 0; font-size: 20px; line-height: 1.3; }
          .report-title { margin: 2mm 0 1mm; font-size: 18px; }
          .report-date { margin: 0; color: #5f564b; font-size: 13px; }
          .report-summary { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 2.8mm; margin-top: 4mm; }
          .report-summary__item { background: #fff; border: 1px solid #dfd8cd; border-radius: 3mm; padding: 2.5mm 3mm; display: grid; gap: 1.2mm; }
          .report-summary__item span { color: #61574b; font-size: 11px; }
          .report-summary__item strong { font-size: 15px; }
          .daily-report-list { display: grid; gap: 3.5mm; }
          .daily-report-card { background: #fff; border: 1px solid #dfd8cd; border-radius: 3.5mm; padding: 3.5mm; break-inside: avoid; page-break-inside: avoid; }
          .daily-report-card__header { display: flex; flex-wrap: wrap; gap: 1.5mm 3mm; align-items: center; margin-bottom: 2.6mm; }
          .daily-report-card__index { font-size: 11px; color: #5d5448; padding: 1mm 2mm; border-radius: 999px; background: #efe9dc; }
          .daily-report-card__header h3 { margin: 0; font-size: 15px; line-height: 1.3; }
          .daily-report-card__group { margin-left: auto; font-size: 11px; color: #4d4439; }
          .daily-report-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 2.1mm; }
          .daily-report-item { display: grid; gap: 0.8mm; padding: 2mm 2.2mm; border-radius: 2.5mm; background: #faf8f2; border: 1px solid #e3dccc; }
          .daily-report-item span { font-size: 10px; color: #6a5f50; }
          .daily-report-item strong { font-size: 12px; line-height: 1.35; word-break: break-word; }
          .daily-report-item--full { grid-column: 1 / -1; }
          .daily-report-empty { padding: 14mm 4mm; text-align: center; color: #5f564b; border: 1px dashed #b7ab9a; border-radius: 4mm; background: #fff; }
          @media (max-width: 920px) {
            .report-summary { grid-template-columns: repeat(2, minmax(0, 1fr)); }
            .daily-report-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          }
          @media (max-width: 640px) {
            .report-toolbar { position: static; padding: 10px 12px; }
            .report-actions { width: 100%; }
            .report-button { flex: 1; }
            .report-body { width: 100%; padding: 12px; }
            .report-summary, .daily-report-grid { grid-template-columns: 1fr; }
            .daily-report-card__group { margin-left: 0; }
          }
          @media print {
            body { background: #fff; }
            .report-toolbar { display: none; }
            .report-body { width: auto; margin: 0; padding: 0; }
          }
        </style>
      </head>
      <body>
        <header class="report-toolbar">
          <div>
            <h1>${text.previewTitle}</h1>
            <p>${text.targetDate}: ${escapeHtml(formatDateYmd(targetDate))}</p>
            <p class="report-toolbar__hint">${text.androidHint}</p>
          </div>
          <div class="report-actions">
            <button class="report-button report-button--print" type="button" onclick="window.print()">${text.print}</button>
            <button class="report-button report-button--pdf" id="reportPdfButton" type="button" onclick="window.print()">${text.savePdf}</button>
            <button class="report-button report-button--share" id="reportShareButton" type="button">${text.share}</button>
            <button class="report-button report-button--close" type="button" onclick="window.close()">${text.close}</button>
          </div>
        </header>
        <main class="report-body">
          <section class="report-header">
            <p class="report-app-name">${text.appName}</p>
            <h2 class="report-title">${text.reportTitle}</h2>
            <p class="report-date">${text.workDate}: ${escapeHtml(formatDateYmd(targetDate))}</p>
            <div class="report-summary">
              <div class="report-summary__item"><span>${text.totalCount}</span><strong>${escapeHtml(formatCount(summary.count))}</strong></div>
              <div class="report-summary__item"><span>${text.totalHours}</span><strong>${escapeHtml(formatHours(summary.hours))}</strong></div>
              <div class="report-summary__item"><span>${text.totalPersonHours}</span><strong>${escapeHtml(formatPersonHours(summary.personHours))}</strong></div>
              <div class="report-summary__item"><span>${text.totalLaborCost}</span><strong>${escapeHtml(formatCurrency(summary.laborCost))}</strong></div>
            </div>
          </section>
          <section class="daily-report-list">
            ${rowsHtml}
          </section>
        </main>
        <script>
          (function () {
            const preferredAction = "${preferredAction}";
            const pdfButton = document.getElementById("reportPdfButton");
            const shareButton = document.getElementById("reportShareButton");
            if (shareButton) {
              if (!navigator.share) {
                shareButton.disabled = true;
                shareButton.textContent = "${text.shareUnavailable}";
              } else {
                shareButton.addEventListener("click", async () => {
                  try {
                    await navigator.share({
                      title: document.title,
                      text: "${text.shareText}"
                    });
                  } catch (error) {
                    if (error && error.name === "AbortError") return;
                    window.alert("${text.shareError}");
                  }
                });
              }
            }
            if (preferredAction === "pdf" && pdfButton) {
              window.setTimeout(() => pdfButton.click(), 120);
            }
          })();
        </script>
      </body>
    </html>
  `;
}

function openDailyReportWindow(preferredAction = "print") {
  if (!dailyReportDateInput || !dailyReportDateInput.value) {
    window.alert("\u65e5\u5831\u5bfe\u8c61\u65e5\u3092\u9078\u629e\u3057\u3066\u304f\u3060\u3055\u3044\u3002");
    return;
  }
  const targetDate = dailyReportDateInput.value;
  const html = buildDailyReportHtml(targetDate, { preferredAction });
  openGeneratedDocumentWindow(html, {
    width: 1200,
    height: 920,
    popupBlockedMessage: "\u65e5\u5831\u753b\u9762\u3092\u958b\u3051\u307e\u305b\u3093\u3067\u3057\u305f\u3002\u30d6\u30e9\u30a6\u30b6\u306e\u30dd\u30c3\u30d7\u30a2\u30c3\u30d7\u8a2d\u5b9a\u3092\u78ba\u8a8d\u3057\u3066\u304f\u3060\u3055\u3044\u3002"
  });
}

async function shareDailyReportFromMainPage() {
  if (!dailyReportDateInput || !dailyReportDateInput.value) {
    window.alert("日報対象日を選択してください、E);
    return;
  }
  const targetDate = dailyReportDateInput.value;
  const html = buildDailyReportHtml(targetDate, { preferredAction: "print" });
  await shareReportHtmlFromMainPage({
    html,
    fileName: `taiseien-daily-report-${targetDate}.html`,
    title: "(株)大成園 作業日報",
    text: `${formatDateYmd(targetDate)} の作業日報を�E有します`
  });
}

function getMonthDateRangeFromMonth(targetMonth) {
  const value = String(targetMonth || "").trim();
  if (!/^\d{4}-\d{2}$/.test(value)) {
    const fallbackMonth = today.slice(0, 7);
    const fallbackRange = getCurrentMonthRange(today);
    return {
      targetMonth: fallbackMonth,
      from: fallbackRange.from,
      to: fallbackRange.to,
      monthLabel: `${fallbackMonth.slice(0, 4)}年${Number(fallbackMonth.slice(5, 7))}朁E
    };
  }
  const [yearText, monthText] = value.split("-");
  const year = Number(yearText);
  const month = Number(monthText);
  const lastDay = new Date(year, month, 0).getDate();
  return {
    targetMonth: value,
    from: `${yearText}-${monthText}-01`,
    to: `${yearText}-${monthText}-${String(lastDay).padStart(2, "0")}`,
    monthLabel: `${year}年${month}朁E
  };
}

function sortMetricEntries(entries) {
  return [...entries].sort((a, b) => {
    const byHours = b.hours - a.hours;
    if (byHours !== 0) return byHours;
    const byCount = b.count - a.count;
    if (byCount !== 0) return byCount;
    return a.label.localeCompare(b.label, "ja");
  });
}

function getMonthlyReportData(targetMonth) {
  const monthRange = getMonthDateRangeFromMonth(targetMonth);
  const fiscalRange = getFiscalYearRange(monthRange.from);
  const monthlyRecords = records.filter((record) => record.workDate >= monthRange.from && record.workDate <= monthRange.to);
  const summary = getDailyReportSummary(monthlyRecords);
  const recordsWithMetrics = monthlyRecords.map((record) => ({
    record,
    names: getRecordDisplay(record),
    metrics: getRecordMetrics(record)
  }));

  const buildMetricEntries = (getKey, getLabel) => {
    const map = new Map();
    recordsWithMetrics.forEach((item) => {
      const key = getKey(item) || "unset";
      const label = getLabel(item) || "未設宁E;
      const current = map.get(key) || { label, count: 0, hours: 0, personHours: 0, laborCost: 0 };
      current.count += 1;
      current.hours += item.metrics.hours;
      current.personHours += item.metrics.personHours;
      current.laborCost += item.metrics.laborCost;
      map.set(key, current);
    });
    return sortMetricEntries(Array.from(map.values()));
  };

  const orchardEntries = buildMetricEntries(
    (item) => item.record.orchardId || item.names.orchardName,
    (item) => item.names.orchardName || "未設宁E
  );
  const plotEntries = buildMetricEntries(
    (item) => item.record.plotId || `${item.names.orchardName}/${item.names.plotName}`,
    (item) => `${item.names.orchardName || "未設宁E} / ${item.names.plotName || "未設宁E}`
  );
  const taskEntries = (() => {
    const map = new Map();
    recordsWithMetrics.forEach((item) => {
      getRecordWorkTypes(item.record, { includeUnset: true }).forEach((taskLabel) => {
        const current = map.get(taskLabel) || { label: taskLabel, count: 0, hours: 0, personHours: 0, laborCost: 0 };
        current.count += 1;
        current.hours += item.metrics.hours;
        current.personHours += item.metrics.personHours;
        current.laborCost += item.metrics.laborCost;
        map.set(taskLabel, current);
      });
    });
    return sortMetricEntries(Array.from(map.values()));
  })();
  const groupEntries = buildMetricEntries(
    (item) => item.record.dailyGroupId || item.names.dailyGroupName,
    (item) => item.names.dailyGroupName || "未設宁E
  );

  const workerHoursEntries = Array.from(
    monthlyRecords.reduce((map, record) => {
      getAssignedWorkers(record).forEach((worker) => {
        const hours = Number(getWorkerHoursForRecord(record, worker.id, companySettings) || 0);
        if (!Number.isFinite(hours) || hours <= 0) return;
        const key = worker.id || worker.displayName;
        map.set(key, {
          label: worker.displayName || "未設宁E,
          hours: (map.get(key)?.hours || 0) + hours
        });
      });
      return map;
    }, new Map()).values()
  ).sort((a, b) => b.hours - a.hours || a.label.localeCompare(b.label, "ja"));

  return {
    targetMonth: monthRange.targetMonth,
    monthLabel: monthRange.monthLabel,
    from: monthRange.from,
    to: monthRange.to,
    fiscalFrom: fiscalRange.from,
    fiscalTo: fiscalRange.to,
    monthlyRecords,
    summary,
    orchardEntries,
    plotEntries,
    taskEntries,
    groupEntries,
    workerHoursEntries
  };
}

function buildMonthlyMetricsRowsHtml(entries, emptyMessage) {
  if (!entries.length) {
    return `<tr><td colspan="5" class="monthly-empty-cell">${escapeHtml(emptyMessage)}</td></tr>`;
  }
  return entries.map((entry) => `
    <tr>
      <th>${escapeHtml(entry.label)}</th>
      <td>${escapeHtml(formatCount(entry.count))}</td>
      <td>${escapeHtml(formatHours(entry.hours))}</td>
      <td>${escapeHtml(formatPersonHours(entry.personHours))}</td>
      <td>${escapeHtml(formatCurrency(entry.laborCost))}</td>
    </tr>
  `).join("");
}

function buildMonthlyWorkerRowsHtml(entries) {
  if (!entries.length) {
    return `<tr><td colspan="2" class="monthly-empty-cell">作業老E��ータはありません、E/td></tr>`;
  }
  return entries.map((entry) => `
    <tr>
      <th>${escapeHtml(entry.label)}</th>
      <td>${escapeHtml(formatHours(entry.hours))}</td>
    </tr>
  `).join("");
}

function buildMonthlyReportHtml(targetMonth, options = {}) {
  const data = getMonthlyReportData(targetMonth);
  const rangeText = `${formatDateYmd(data.from)}、E{formatDateYmd(data.to)}`;
  const fiscalText = `${formatDateYmd(data.fiscalFrom)}、E{formatDateYmd(data.fiscalTo)}`;
  const preferredAction = options.preferredAction === "pdf" ? "pdf" : "print";

  const renderSection = (title, entries, emptyMessage) => `
    <section class="monthly-section">
      <h3>${escapeHtml(title)}</h3>
      <div class="monthly-table-wrap">
        <table class="monthly-table">
          <thead>
            <tr>
              <th>区刁E/th>
              <th>件数</th>
              <th>総作業時間</th>
              <th>延べ人晁E/th>
              <th>概算人件費</th>
            </tr>
          </thead>
          <tbody>
            ${buildMonthlyMetricsRowsHtml(entries, emptyMessage)}
          </tbody>
        </table>
      </div>
    </section>
  `;

  return `
    <html lang="ja">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>(株)大成園　作業記録アプリ 月報 ${escapeHtml(data.monthLabel)}</title>
        <style>
          @page { size: A4 portrait; margin: 12mm; }
          * { box-sizing: border-box; }
          body { margin: 0; background: #f6f3ec; color: #2f2921; font-family: "Yu Gothic", "Hiragino Kaku Gothic ProN", sans-serif; }
          .monthly-toolbar { position: sticky; top: 0; z-index: 10; display: flex; gap: 10px; align-items: center; justify-content: space-between; padding: 12px 16px; border-bottom: 1px solid #d8d2c8; background: #ffffffee; backdrop-filter: blur(6px); }
          .monthly-toolbar h1 { margin: 0; font-size: 17px; }
          .monthly-toolbar p { margin: 4px 0 0; color: #5d5348; font-size: 13px; }
          .monthly-actions { display: flex; gap: 8px; flex-wrap: wrap; }
          .monthly-button { border: 0; border-radius: 999px; min-height: 38px; padding: 8px 14px; cursor: pointer; font-size: 14px; }
          .monthly-button--print { background: #3f6f3f; color: #fff; }
          .monthly-button--pdf { background: #c6522f; color: #fff; }
          .monthly-button--share { background: #ece4d7; color: #3f3529; }
          .monthly-button--close { background: #ece8de; color: #3c352f; }
          .monthly-toolbar__hint { margin-top: 6px; font-size: 12px; color: #7b6a58; }
          .monthly-body { width: min(210mm, 100%); margin: 0 auto; padding: 7mm 0 12mm; }
          .monthly-header { margin-bottom: 5mm; padding: 5mm; border-radius: 4mm; background: #fff; border: 1px solid #dfd8cd; }
          .monthly-app-name { margin: 0; font-size: 20px; line-height: 1.3; }
          .monthly-title { margin: 2mm 0 1mm; font-size: 18px; }
          .monthly-meta { margin: 0.8mm 0; font-size: 13px; color: #5f564b; }
          .monthly-summary { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 2.8mm; margin-top: 4mm; }
          .monthly-summary__item { background: #fff; border: 1px solid #dfd8cd; border-radius: 3mm; padding: 2.5mm 3mm; display: grid; gap: 1.2mm; }
          .monthly-summary__item span { color: #61574b; font-size: 11px; }
          .monthly-summary__item strong { font-size: 15px; }
          .monthly-section { margin-top: 4mm; padding: 3.5mm; border-radius: 3mm; background: #fff; border: 1px solid #dfd8cd; break-inside: avoid; page-break-inside: avoid; }
          .monthly-section h3 { margin: 0 0 2.5mm; font-size: 15px; }
          .monthly-table-wrap { overflow-x: auto; }
          .monthly-table { width: 100%; border-collapse: collapse; min-width: 620px; }
          .monthly-table th, .monthly-table td { border: 1px solid #ddd3c3; padding: 6px 8px; text-align: right; font-size: 12px; white-space: nowrap; }
          .monthly-table th:first-child, .monthly-table td:first-child { text-align: left; white-space: normal; }
          .monthly-table thead th { background: #f3eee3; font-size: 11px; }
          .monthly-empty-cell { text-align: center !important; color: #6a5f50; }
          @media (max-width: 920px) {
            .monthly-summary { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          }
          @media (max-width: 640px) {
            .monthly-toolbar { position: static; padding: 10px 12px; }
            .monthly-actions { width: 100%; }
            .monthly-button { flex: 1; }
            .monthly-body { width: 100%; padding: 12px; }
            .monthly-summary { grid-template-columns: 1fr; }
          }
          @media print {
            body { background: #fff; }
            .monthly-toolbar { display: none; }
            .monthly-body { width: auto; margin: 0; padding: 0; }
          }
        </style>
      </head>
      <body>
        <header class="monthly-toolbar">
          <div>
            <h1>月報プレビュー</h1>
            <p>対象年朁E ${escapeHtml(data.monthLabel)}</p>
            <p class="monthly-toolbar__hint">Androidは「PDF保存」�E「�E有」で印刷アプリへ渡すと安定しめE��ぁE��す、E/p>
          </div>
          <div class="monthly-actions">
            <button class="monthly-button monthly-button--print" type="button" onclick="window.print()">こ�E画面を印刷</button>
            <button class="monthly-button monthly-button--pdf" id="monthlyPdfButton" type="button" onclick="window.print()">PDF保孁E/button>
            <button class="monthly-button monthly-button--share" id="monthlyShareButton" type="button">共朁E/button>
            <button class="monthly-button monthly-button--close" type="button" onclick="window.close()">閉じめE/button>
          </div>
        </header>
        <main class="monthly-body">
          <section class="monthly-header">
            <p class="monthly-app-name">(株)大成園　作業記録アプリ</p>
            <h2 class="monthly-title">月次レポ�Eト（月報�E�E/h2>
            <p class="monthly-meta">対象年朁E ${escapeHtml(data.monthLabel)}</p>
            <p class="monthly-meta">雁E��期閁E ${escapeHtml(rangeText)}</p>
            <p class="monthly-meta">該当決算年度: ${escapeHtml(fiscalText)}</p>
            <div class="monthly-summary">
              <div class="monthly-summary__item"><span>月間総作業件数</span><strong>${escapeHtml(formatCount(data.summary.count))}</strong></div>
              <div class="monthly-summary__item"><span>月間総作業時間</span><strong>${escapeHtml(formatHours(data.summary.hours))}</strong></div>
              <div class="monthly-summary__item"><span>月間総延べ人晁E/span><strong>${escapeHtml(formatPersonHours(data.summary.personHours))}</strong></div>
              <div class="monthly-summary__item"><span>月間総概算人件費</span><strong>${escapeHtml(formatCurrency(data.summary.laborCost))}</strong></div>
            </div>
          </section>
          ${renderSection("園地別の月間雁E��E, data.orchardEntries, "園地チE�Eタはありません、E)}
          ${renderSection("区画別の月間雁E��E, data.plotEntries, "区画チE�Eタはありません、E)}
          ${renderSection("作業区刁E��の月間雁E��E, data.taskEntries, "作業区刁E��ータはありません、E)}
          ${renderSection("作業グループ別の月間雁E��E, data.groupEntries, "作業グループデータはありません、E)}
          <section class="monthly-section">
            <h3>作業老E��の月間総作業時間</h3>
            <div class="monthly-table-wrap">
              <table class="monthly-table">
                <thead>
                  <tr>
                    <th>作業老E/th>
                    <th>総作業時間</th>
                  </tr>
                </thead>
                <tbody>
                  ${buildMonthlyWorkerRowsHtml(data.workerHoursEntries)}
                </tbody>
              </table>
            </div>
          </section>
        </main>
        <script>
          (function () {
            const preferredAction = "${preferredAction}";
            const pdfButton = document.getElementById("monthlyPdfButton");
            const shareButton = document.getElementById("monthlyShareButton");
            if (shareButton) {
              if (!navigator.share) {
                shareButton.disabled = true;
                shareButton.textContent = "共有未対忁E;
              } else {
                shareButton.addEventListener("click", async () => {
                  try {
                    await navigator.share({
                      title: document.title,
                      text: "月報を�E有しまぁE
                    });
                  } catch (error) {
                    if (error && error.name === "AbortError") return;
                    window.alert("共有に失敗しました、E);
                  }
                });
              }
            }
            if (preferredAction === "pdf" && pdfButton) {
              window.setTimeout(() => pdfButton.click(), 120);
            }
          })();
        </script>
      </body>
    </html>
  `;
}

function openMonthlyReportWindow(preferredAction = "print") {
  if (!monthlyReportMonthInput || !monthlyReportMonthInput.value) {
    window.alert("月報対象年月を選択してください、E);
    return;
  }
  const targetMonth = monthlyReportMonthInput.value;
  const html = buildMonthlyReportHtml(targetMonth, { preferredAction });
  openGeneratedDocumentWindow(html, {
    width: 1280,
    height: 920,
    popupBlockedMessage: "月報画面を開けませんでした。ブラウザのポップアチE�E設定を確認してください、E
  });
}

async function shareMonthlyReportFromMainPage() {
  if (!monthlyReportMonthInput || !monthlyReportMonthInput.value) {
    window.alert("月報対象年月を選択してください、E);
    return;
  }
  const targetMonth = monthlyReportMonthInput.value;
  const html = buildMonthlyReportHtml(targetMonth, { preferredAction: "print" });
  await shareReportHtmlFromMainPage({
    html,
    fileName: `taiseien-monthly-report-${targetMonth}.html`,
    title: "(株)大成園 月報",
    text: `${targetMonth} の月報を�E有します`
  });
}

function exportMonthlyReportCsv() {
  if (!monthlyReportMonthInput || !monthlyReportMonthInput.value) {
    window.alert("月報対象年月を選択してください、E);
    return;
  }
  const data = getMonthlyReportData(monthlyReportMonthInput.value);
  const rangeText = `${formatDateYmd(data.from)}、E{formatDateYmd(data.to)}`;
  const fiscalText = `${formatDateYmd(data.fiscalFrom)}、E{formatDateYmd(data.fiscalTo)}`;

  const rows = [
    ["雁E��区刁E, "名称", "件数", "総作業時間", "延べ人晁E, "概算人件費", "対象年朁E, "雁E��期閁E, "該当決算年度"],
    ["月間合訁E, "全佁E, data.summary.count, data.summary.hours, data.summary.personHours, data.summary.laborCost, data.monthLabel, rangeText, fiscalText]
  ];

  const pushMetricRows = (sectionLabel, entries) => {
    entries.forEach((entry) => {
      rows.push([sectionLabel, entry.label, entry.count, entry.hours, entry.personHours, entry.laborCost, data.monthLabel, rangeText, fiscalText]);
    });
  };

  pushMetricRows("園地別", data.orchardEntries);
  pushMetricRows("区画別", data.plotEntries);
  pushMetricRows("作業区刁E��", data.taskEntries);
  pushMetricRows("作業グループ別", data.groupEntries);
  data.workerHoursEntries.forEach((entry) => {
    rows.push(["作業老E��", entry.label, "", entry.hours, "", "", data.monthLabel, rangeText, fiscalText]);
  });

  const csv = rows.map((row) => row.map(escapeCsvValue).join(",")).join("\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `taiseien-monthly-report-${data.targetMonth}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

function buildTaskTypeReportHtml() {
  const reportData = buildTaskTypeReportData();
  const config = reportData.periodConfig;
  const metricLabel = getSortMetricLabel(reportData.metric);
  const sortLabel = reportData.sortOrder === "asc" ? "少なぁE��E : "多い頁E;
  const periodRangeText = config.rangeText || `${formatDateYmd(config.from)}、E{formatDateYmd(config.to)}`;

  const renderMetricSection = (title, entries, emptyMessage, labelColumn) => `
    <section class="task-type-section">
      <h4>${escapeHtml(title)}</h4>
      <div class="task-type-table-wrap">
        <table class="task-type-table">
          <thead>
            <tr>
              <th>${escapeHtml(labelColumn)}</th>
              <th>件数</th>
              <th>総作業時間</th>
              <th>延べ人晁E/th>
              <th>概算人件費</th>
            </tr>
          </thead>
          <tbody>
            ${buildTaskTypeMetricRowsHtml(entries, emptyMessage)}
          </tbody>
        </table>
      </div>
    </section>
  `;

  const renderWorkerSection = (entries) => `
    <section class="task-type-section">
      <h4>作業老E��総作業時間</h4>
      <div class="task-type-table-wrap">
        <table class="task-type-table">
          <thead>
            <tr>
              <th>作業老E/th>
              <th>総作業時間</th>
            </tr>
          </thead>
          <tbody>
            ${buildTaskTypeWorkerRowsHtml(entries, "作業老E��チE�Eタはありません、E)}
          </tbody>
        </table>
      </div>
    </section>
  `;

  const taskSectionHtml = reportData.taskEntries.map((entry) => `
    <section class="task-type-card">
      <header class="task-type-card__header">
        <h3>${escapeHtml(entry.label)}</h3>
        <div class="task-type-card__summary">
          <span>件数: <strong>${escapeHtml(formatCount(entry.count))}</strong></span>
          <span>総作業時間: <strong>${escapeHtml(formatHours(entry.hours))}</strong></span>
          <span>延べ人晁E <strong>${escapeHtml(formatPersonHours(entry.personHours))}</strong></span>
          <span>概算人件費: <strong>${escapeHtml(formatCurrency(entry.laborCost))}</strong></span>
        </div>
      </header>
      ${renderMetricSection("園地別冁E��", entry.orchardEntries, "園地別チE�Eタはありません、E, "園地")}
      ${renderMetricSection("区画別冁E��", entry.plotEntries, "区画別チE�Eタはありません、E, "区画")}
      ${renderMetricSection("作業グループ別雁E��E, entry.groupEntries, "作業グループ別チE�Eタはありません、E, "作業グルーチE)}
      ${renderWorkerSection(entry.workerEntries)}
    </section>
  `).join("");

  return `
    <html lang="ja">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>(株)大成園　作業記録アプリ 作業区刁E��レポ�EチE/title>
        <style>
          @page { size: A4 portrait; margin: 12mm; }
          * { box-sizing: border-box; }
          body { margin: 0; background: #f6f3ec; color: #2f2921; font-family: "Yu Gothic", "Hiragino Kaku Gothic ProN", sans-serif; }
          .task-type-toolbar { position: sticky; top: 0; z-index: 10; display: flex; justify-content: space-between; align-items: center; gap: 10px; padding: 12px 16px; border-bottom: 1px solid #d8d2c8; background: #ffffffee; backdrop-filter: blur(6px); }
          .task-type-toolbar h1 { margin: 0; font-size: 17px; }
          .task-type-toolbar p { margin: 4px 0 0; color: #5d5348; font-size: 13px; }
          .task-type-actions { display: flex; gap: 8px; flex-wrap: wrap; }
          .task-type-button { border: 0; border-radius: 999px; min-height: 38px; padding: 8px 14px; cursor: pointer; font-size: 14px; }
          .task-type-button--print { background: #3f6f3f; color: #fff; }
          .task-type-button--close { background: #ece8de; color: #3c352f; }
          .task-type-body { width: min(210mm, 100%); margin: 0 auto; padding: 7mm 0 12mm; }
          .task-type-header { margin-bottom: 5mm; padding: 5mm; border-radius: 4mm; background: #fff; border: 1px solid #dfd8cd; }
          .task-type-app { margin: 0; font-size: 20px; line-height: 1.3; }
          .task-type-title { margin: 2mm 0 1mm; font-size: 18px; }
          .task-type-meta { margin: 0.8mm 0; font-size: 13px; color: #5f564b; }
          .task-type-summary { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 2.8mm; margin-top: 4mm; }
          .task-type-summary__item { background: #fff; border: 1px solid #dfd8cd; border-radius: 3mm; padding: 2.5mm 3mm; display: grid; gap: 1.2mm; }
          .task-type-summary__item span { color: #61574b; font-size: 11px; }
          .task-type-summary__item strong { font-size: 15px; }
          .task-type-card { margin-top: 4mm; padding: 3.5mm; border-radius: 3mm; background: #fff; border: 1px solid #dfd8cd; break-inside: avoid; page-break-inside: avoid; }
          .task-type-card__header { margin-bottom: 2.5mm; }
          .task-type-card__header h3 { margin: 0; font-size: 16px; }
          .task-type-card__summary { margin-top: 1.5mm; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1mm 2.5mm; color: #5d5348; font-size: 12px; }
          .task-type-section { margin-top: 2mm; }
          .task-type-section h4 { margin: 0 0 1.5mm; font-size: 14px; }
          .task-type-table-wrap { overflow-x: auto; }
          .task-type-table { width: 100%; border-collapse: collapse; min-width: 620px; }
          .task-type-table th, .task-type-table td { border: 1px solid #ddd3c3; padding: 6px 8px; text-align: right; font-size: 12px; white-space: nowrap; }
          .task-type-table th:first-child, .task-type-table td:first-child { text-align: left; white-space: normal; }
          .task-type-table thead th { background: #f3eee3; font-size: 11px; }
          .task-type-table .empty-cell { text-align: center !important; color: #6a5f50; }
          @media (max-width: 920px) {
            .task-type-summary { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          }
          @media (max-width: 640px) {
            .task-type-toolbar { position: static; padding: 10px 12px; }
            .task-type-actions { width: 100%; }
            .task-type-button { flex: 1; }
            .task-type-body { width: 100%; padding: 12px; }
            .task-type-summary { grid-template-columns: 1fr; }
            .task-type-card__summary { grid-template-columns: 1fr; }
          }
          @media print {
            body { background: #fff; }
            .task-type-toolbar { display: none; }
            .task-type-body { width: auto; margin: 0; padding: 0; }
          }
        </style>
      </head>
      <body>
        <header class="task-type-toolbar">
          <div>
            <h1>作業区刁E��レポ�EチE/h1>
            <p>対象期間: ${escapeHtml(config.label)} / ${escapeHtml(periodRangeText)}</p>
          </div>
          <div class="task-type-actions">
            <button class="task-type-button task-type-button--print" type="button" onclick="window.print()">こ�E画面を印刷</button>
            <button class="task-type-button task-type-button--close" type="button" onclick="window.close()">閉じめE/button>
          </div>
        </header>
        <main class="task-type-body">
          <section class="task-type-header">
            <p class="task-type-app">(株)大成園　作業記録アプリ</p>
            <h2 class="task-type-title">作業区刁E��レポ�EチE/h2>
            <p class="task-type-meta">比輁E��閁E ${escapeHtml(config.label)}</p>
            <p class="task-type-meta">期間篁E��: ${escapeHtml(periodRangeText)}</p>
            <p class="task-type-meta">並び替え基溁E ${escapeHtml(metricLabel)} / 並び頁E ${escapeHtml(sortLabel)}</p>
            <div class="task-type-summary">
              <div class="task-type-summary__item"><span>総作業件数</span><strong>${escapeHtml(formatCount(reportData.summary.count))}</strong></div>
              <div class="task-type-summary__item"><span>総作業時間</span><strong>${escapeHtml(formatHours(reportData.summary.hours))}</strong></div>
              <div class="task-type-summary__item"><span>総延べ人晁E/span><strong>${escapeHtml(formatPersonHours(reportData.summary.personHours))}</strong></div>
              <div class="task-type-summary__item"><span>総概算人件費</span><strong>${escapeHtml(formatCurrency(reportData.summary.laborCost))}</strong></div>
            </div>
          </section>
          ${taskSectionHtml || `<section class="task-type-card"><p>条件を満たす作業区刁E��チE�Eタはありません、E/p></section>`}
        </main>
      </body>
    </html>
  `;
}

function openTaskTypeReportWindow() {
  const config = getTaskReportPeriodConfig();
  if (!config.isValid) {
    window.alert(config.error || "比輁E��件を確認してください、E);
    return;
  }
  openGeneratedDocumentWindow(buildTaskTypeReportHtml(), {
    width: 1280,
    height: 920,
    popupBlockedMessage: "作業区刁E��レポ�Eト画面を開けませんでした。ブラウザのポップアチE�E設定を確認してください、E
  });
}

function exportTaskTypeReportCsv() {
  const reportData = buildTaskTypeReportData();
  const config = reportData.periodConfig;
  if (!config.isValid) {
    window.alert(config.error || "比輁E��件を確認してください、E);
    return;
  }
  const periodRangeText = config.rangeText || `${formatDateYmd(config.from)}、E{formatDateYmd(config.to)}`;
  const metricLabel = getSortMetricLabel(reportData.metric);
  const sortLabel = reportData.sortOrder === "asc" ? "少なぁE��E : "多い頁E;

  const rows = [
    ["レポ�Eト区刁E, "作業区刁E, "冁E��区刁E, "名称", "件数", "総作業時間", "総延べ人晁E, "総概算人件費", "比輁E��閁E, "期間篁E��", "並び替え基溁E, "並び頁E],
    ["期間合訁E, "全作業区刁E, "-", "全佁E, reportData.summary.count, reportData.summary.hours, reportData.summary.personHours, reportData.summary.laborCost, config.label, periodRangeText, metricLabel, sortLabel]
  ];

  reportData.taskEntries.forEach((taskEntry) => {
    rows.push(["作業区刁E��", taskEntry.label, "合訁E, taskEntry.label, taskEntry.count, taskEntry.hours, taskEntry.personHours, taskEntry.laborCost, config.label, periodRangeText, metricLabel, sortLabel]);
    taskEntry.orchardEntries.forEach((entry) => {
      rows.push(["作業区刁E��", taskEntry.label, "園地別冁E��", entry.label, entry.count, entry.hours, entry.personHours, entry.laborCost, config.label, periodRangeText, metricLabel, sortLabel]);
    });
    taskEntry.plotEntries.forEach((entry) => {
      rows.push(["作業区刁E��", taskEntry.label, "区画別冁E��", entry.label, entry.count, entry.hours, entry.personHours, entry.laborCost, config.label, periodRangeText, metricLabel, sortLabel]);
    });
    taskEntry.groupEntries.forEach((entry) => {
      rows.push(["作業区刁E��", taskEntry.label, "作業グループ別", entry.label, entry.count, entry.hours, entry.personHours, entry.laborCost, config.label, periodRangeText, metricLabel, sortLabel]);
    });
    taskEntry.workerEntries.forEach((entry) => {
      rows.push(["作業区刁E��", taskEntry.label, "作業老E��時間", entry.label, "", entry.hours, "", "", config.label, periodRangeText, metricLabel, sortLabel]);
    });
  });

  const csv = rows.map((row) => row.map(escapeCsvValue).join(",")).join("\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  const fileSuffix = config.mode === "custom" ? `${config.from}_${config.to}` : config.mode;
  link.download = `taiseien-task-type-report-${fileSuffix}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

function buildVarietyTypeReportHtml() {
  const reportData = buildVarietyTypeReportData();
  const config = reportData.periodConfig;
  const metricLabel = getSortMetricLabel(reportData.metric);
  const sortLabel = reportData.sortOrder === "asc" ? "少なぁE��E : "多い頁E;
  const periodRangeText = config.rangeText || `${formatDateYmd(config.from)}、E{formatDateYmd(config.to)}`;

  const renderMetricSection = (title, entries, emptyMessage, labelColumn) => `
    <section class="variety-type-section">
      <h4>${escapeHtml(title)}</h4>
      <div class="variety-type-table-wrap">
        <table class="variety-type-table">
          <thead>
            <tr>
              <th>${escapeHtml(labelColumn)}</th>
              <th>件数</th>
              <th>総作業時間</th>
              <th>延べ人晁E/th>
              <th>概算人件費</th>
            </tr>
          </thead>
          <tbody>
            ${buildTaskTypeMetricRowsHtml(entries, emptyMessage)}
          </tbody>
        </table>
      </div>
    </section>
  `;

  const renderWorkerSection = (entries) => `
    <section class="variety-type-section">
      <h4>作業老E��総作業時間</h4>
      <div class="variety-type-table-wrap">
        <table class="variety-type-table">
          <thead>
            <tr>
              <th>作業老E/th>
              <th>総作業時間</th>
            </tr>
          </thead>
          <tbody>
            ${buildTaskTypeWorkerRowsHtml(entries, "作業老E��チE�Eタはありません、E)}
          </tbody>
        </table>
      </div>
    </section>
  `;

  const varietySectionHtml = reportData.varietyEntries.map((entry) => `
    <section class="variety-type-card">
      <header class="variety-type-card__header">
        <h3>${escapeHtml(entry.label)}</h3>
        <div class="variety-type-card__summary">
          <span>件数: <strong>${escapeHtml(formatCount(entry.count))}</strong></span>
          <span>総作業時間: <strong>${escapeHtml(formatHours(entry.hours))}</strong></span>
          <span>延べ人晁E <strong>${escapeHtml(formatPersonHours(entry.personHours))}</strong></span>
          <span>概算人件費: <strong>${escapeHtml(formatCurrency(entry.laborCost))}</strong></span>
        </div>
      </header>
      ${renderMetricSection("園地別冁E��", entry.orchardEntries, "園地別チE�Eタはありません、E, "園地")}
      ${renderMetricSection("区画別冁E��", entry.plotEntries, "区画別チE�Eタはありません、E, "区画")}
      ${renderMetricSection("作業区刁E��冁E��", entry.taskEntries, "作業区刁E��チE�Eタはありません、E, "作業区刁E)}
      ${renderMetricSection("作業グループ別雁E��E, entry.groupEntries, "作業グループ別チE�Eタはありません、E, "作業グルーチE)}
      ${renderWorkerSection(entry.workerEntries)}
    </section>
  `).join("");

  return `
    <html lang="ja">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>(株)大成園　作業記録アプリ 品種別レポ�EチE/title>
        <style>
          @page { size: A4 portrait; margin: 12mm; }
          * { box-sizing: border-box; }
          body { margin: 0; background: #f6f3ec; color: #2f2921; font-family: "Yu Gothic", "Hiragino Kaku Gothic ProN", sans-serif; }
          .variety-type-toolbar { position: sticky; top: 0; z-index: 10; display: flex; justify-content: space-between; align-items: center; gap: 10px; padding: 12px 16px; border-bottom: 1px solid #d8d2c8; background: #ffffffee; backdrop-filter: blur(6px); }
          .variety-type-toolbar h1 { margin: 0; font-size: 17px; }
          .variety-type-toolbar p { margin: 4px 0 0; color: #5d5348; font-size: 13px; }
          .variety-type-actions { display: flex; gap: 8px; flex-wrap: wrap; }
          .variety-type-button { border: 0; border-radius: 999px; min-height: 38px; padding: 8px 14px; cursor: pointer; font-size: 14px; }
          .variety-type-button--print { background: #3f6f3f; color: #fff; }
          .variety-type-button--close { background: #ece8de; color: #3c352f; }
          .variety-type-body { width: min(210mm, 100%); margin: 0 auto; padding: 7mm 0 12mm; }
          .variety-type-header { margin-bottom: 5mm; padding: 5mm; border-radius: 4mm; background: #fff; border: 1px solid #dfd8cd; }
          .variety-type-app { margin: 0; font-size: 20px; line-height: 1.3; }
          .variety-type-title { margin: 2mm 0 1mm; font-size: 18px; }
          .variety-type-meta { margin: 0.8mm 0; font-size: 13px; color: #5f564b; }
          .variety-type-summary { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 2.8mm; margin-top: 4mm; }
          .variety-type-summary__item { background: #fff; border: 1px solid #dfd8cd; border-radius: 3mm; padding: 2.5mm 3mm; display: grid; gap: 1.2mm; }
          .variety-type-summary__item span { color: #61574b; font-size: 11px; }
          .variety-type-summary__item strong { font-size: 15px; }
          .variety-type-card { margin-top: 4mm; padding: 3.5mm; border-radius: 3mm; background: #fff; border: 1px solid #dfd8cd; break-inside: avoid; page-break-inside: avoid; }
          .variety-type-card__header { margin-bottom: 2.5mm; }
          .variety-type-card__header h3 { margin: 0; font-size: 16px; }
          .variety-type-card__summary { margin-top: 1.5mm; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1mm 2.5mm; color: #5d5348; font-size: 12px; }
          .variety-type-section { margin-top: 2mm; }
          .variety-type-section h4 { margin: 0 0 1.5mm; font-size: 14px; }
          .variety-type-table-wrap { overflow-x: auto; }
          .variety-type-table { width: 100%; border-collapse: collapse; min-width: 620px; }
          .variety-type-table th, .variety-type-table td { border: 1px solid #ddd3c3; padding: 6px 8px; text-align: right; font-size: 12px; white-space: nowrap; }
          .variety-type-table th:first-child, .variety-type-table td:first-child { text-align: left; white-space: normal; }
          .variety-type-table thead th { background: #f3eee3; font-size: 11px; }
          .variety-type-table .empty-cell { text-align: center !important; color: #6a5f50; }
          @media (max-width: 920px) {
            .variety-type-summary { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          }
          @media (max-width: 640px) {
            .variety-type-toolbar { position: static; padding: 10px 12px; }
            .variety-type-actions { width: 100%; }
            .variety-type-button { flex: 1; }
            .variety-type-body { width: 100%; padding: 12px; }
            .variety-type-summary { grid-template-columns: 1fr; }
            .variety-type-card__summary { grid-template-columns: 1fr; }
          }
          @media print {
            body { background: #fff; }
            .variety-type-toolbar { display: none; }
            .variety-type-body { width: auto; margin: 0; padding: 0; }
          }
        </style>
      </head>
      <body>
        <header class="variety-type-toolbar">
          <div>
            <h1>品種別レポ�EチE/h1>
            <p>対象期間: ${escapeHtml(config.label)} / ${escapeHtml(periodRangeText)}</p>
          </div>
          <div class="variety-type-actions">
            <button class="variety-type-button variety-type-button--print" type="button" onclick="window.print()">こ�E画面を印刷</button>
            <button class="variety-type-button variety-type-button--close" type="button" onclick="window.close()">閉じめE/button>
          </div>
        </header>
        <main class="variety-type-body">
          <section class="variety-type-header">
            <p class="variety-type-app">(株)大成園　作業記録アプリ</p>
            <h2 class="variety-type-title">品種別レポ�EチE/h2>
            <p class="variety-type-meta">比輁E��閁E ${escapeHtml(config.label)}</p>
            <p class="variety-type-meta">期間篁E��: ${escapeHtml(periodRangeText)}</p>
            <p class="variety-type-meta">並び替え基溁E ${escapeHtml(metricLabel)} / 並び頁E ${escapeHtml(sortLabel)}</p>
            <div class="variety-type-summary">
              <div class="variety-type-summary__item"><span>総作業件数</span><strong>${escapeHtml(formatCount(reportData.summary.count))}</strong></div>
              <div class="variety-type-summary__item"><span>総作業時間</span><strong>${escapeHtml(formatHours(reportData.summary.hours))}</strong></div>
              <div class="variety-type-summary__item"><span>総延べ人晁E/span><strong>${escapeHtml(formatPersonHours(reportData.summary.personHours))}</strong></div>
              <div class="variety-type-summary__item"><span>総概算人件費</span><strong>${escapeHtml(formatCurrency(reportData.summary.laborCost))}</strong></div>
            </div>
          </section>
          ${varietySectionHtml || `<section class="variety-type-card"><p>条件を満たす品種別チE�Eタはありません、E/p></section>`}
        </main>
      </body>
    </html>
  `;
}

function openVarietyTypeReportWindow() {
  const config = getVarietyReportPeriodConfig();
  if (!config.isValid) {
    window.alert(config.error || "比輁E��件を確認してください、E);
    return;
  }
  openGeneratedDocumentWindow(buildVarietyTypeReportHtml(), {
    width: 1280,
    height: 920,
    popupBlockedMessage: "品種別レポ�Eト画面を開けませんでした。ブラウザのポップアチE�E設定を確認してください、E
  });
}

function exportVarietyTypeReportCsv() {
  const reportData = buildVarietyTypeReportData();
  const config = reportData.periodConfig;
  if (!config.isValid) {
    window.alert(config.error || "比輁E��件を確認してください、E);
    return;
  }
  const periodRangeText = config.rangeText || `${formatDateYmd(config.from)}、E{formatDateYmd(config.to)}`;
  const metricLabel = getSortMetricLabel(reportData.metric);
  const sortLabel = reportData.sortOrder === "asc" ? "少なぁE��E : "多い頁E;

  const rows = [
    ["レポ�Eト区刁E, "品種", "冁E��区刁E, "名称", "件数", "総作業時間", "総延べ人晁E, "総概算人件費", "比輁E��閁E, "期間篁E��", "並び替え基溁E, "並び頁E],
    ["期間合訁E, "全品種", "-", "全佁E, reportData.summary.count, reportData.summary.hours, reportData.summary.personHours, reportData.summary.laborCost, config.label, periodRangeText, metricLabel, sortLabel]
  ];

  reportData.varietyEntries.forEach((varietyEntry) => {
    rows.push(["品種別", varietyEntry.label, "合訁E, varietyEntry.label, varietyEntry.count, varietyEntry.hours, varietyEntry.personHours, varietyEntry.laborCost, config.label, periodRangeText, metricLabel, sortLabel]);
    varietyEntry.orchardEntries.forEach((entry) => {
      rows.push(["品種別", varietyEntry.label, "園地別冁E��", entry.label, entry.count, entry.hours, entry.personHours, entry.laborCost, config.label, periodRangeText, metricLabel, sortLabel]);
    });
    varietyEntry.plotEntries.forEach((entry) => {
      rows.push(["品種別", varietyEntry.label, "区画別冁E��", entry.label, entry.count, entry.hours, entry.personHours, entry.laborCost, config.label, periodRangeText, metricLabel, sortLabel]);
    });
    varietyEntry.taskEntries.forEach((entry) => {
      rows.push(["品種別", varietyEntry.label, "作業区刁E��冁E��", entry.label, entry.count, entry.hours, entry.personHours, entry.laborCost, config.label, periodRangeText, metricLabel, sortLabel]);
    });
    varietyEntry.groupEntries.forEach((entry) => {
      rows.push(["品種別", varietyEntry.label, "作業グループ別", entry.label, entry.count, entry.hours, entry.personHours, entry.laborCost, config.label, periodRangeText, metricLabel, sortLabel]);
    });
    varietyEntry.workerEntries.forEach((entry) => {
      rows.push(["品種別", varietyEntry.label, "作業老E��時間", entry.label, "", entry.hours, "", "", config.label, periodRangeText, metricLabel, sortLabel]);
    });
  });

  const csv = rows.map((row) => row.map(escapeCsvValue).join(",")).join("\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  const fileSuffix = config.mode === "custom" ? `${config.from}_${config.to}` : config.mode;
  link.download = `taiseien-variety-report-${fileSuffix}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

function buildAnnualReportHtml(options = {}) {
  const data = getAnnualReportData();
  const metricLabel = getSortMetricLabel(data.metric);
  const sortLabel = data.sortOrder === "asc" ? "少なぁE��E : "多い頁E;
  const preferredAction = options.preferredAction === "pdf" ? "pdf" : "print";

  const renderMetricSection = (title, entries, emptyMessage, labelColumn) => `
    <section class="annual-section">
      <h4>${escapeHtml(title)}</h4>
      <div class="annual-table-wrap">
        <table class="annual-table">
          <thead>
            <tr>
              <th>${escapeHtml(labelColumn)}</th>
              <th>件数</th>
              <th>総作業時間</th>
              <th>延べ人晁E/th>
              <th>概算人件費</th>
            </tr>
          </thead>
          <tbody>
            ${buildTaskTypeMetricRowsHtml(entries, emptyMessage)}
          </tbody>
        </table>
      </div>
    </section>
  `;

  return `
    <html lang="ja">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>(株)大成園　作業記録アプリ 年度レポ�Eト総合牁E/title>
        <style>
          @page { size: A4 portrait; margin: 12mm; }
          * { box-sizing: border-box; }
          body { margin: 0; background: #f6f3ec; color: #2f2921; font-family: "Yu Gothic", "Hiragino Kaku Gothic ProN", sans-serif; }
          .annual-toolbar { position: sticky; top: 0; z-index: 10; display: flex; justify-content: space-between; align-items: center; gap: 10px; padding: 12px 16px; border-bottom: 1px solid #d8d2c8; background: #ffffffee; backdrop-filter: blur(6px); }
          .annual-toolbar h1 { margin: 0; font-size: 17px; }
          .annual-toolbar p { margin: 4px 0 0; color: #5d5348; font-size: 13px; }
          .annual-actions { display: flex; gap: 8px; flex-wrap: wrap; }
          .annual-button { border: 0; border-radius: 999px; min-height: 38px; padding: 8px 14px; cursor: pointer; font-size: 14px; }
          .annual-button--print { background: #3f6f3f; color: #fff; }
          .annual-button--pdf { background: #c6522f; color: #fff; }
          .annual-button--share { background: #ece4d7; color: #3f3529; }
          .annual-button--close { background: #ece8de; color: #3c352f; }
          .annual-toolbar__hint { margin-top: 6px; font-size: 12px; color: #7b6a58; }
          .annual-body { width: min(210mm, 100%); margin: 0 auto; padding: 7mm 0 12mm; }
          .annual-header { margin-bottom: 5mm; padding: 5mm; border-radius: 4mm; background: #fff; border: 1px solid #dfd8cd; }
          .annual-app-name { margin: 0; font-size: 20px; line-height: 1.3; }
          .annual-title { margin: 2mm 0 1mm; font-size: 18px; }
          .annual-meta { margin: 0.8mm 0; font-size: 13px; color: #5f564b; }
          .annual-summary { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 2mm; margin-top: 4mm; }
          .annual-summary__item { background: #fff; border: 1px solid #dfd8cd; border-radius: 3mm; padding: 2.5mm 3mm; display: grid; gap: 1.2mm; }
          .annual-summary__item span { color: #61574b; font-size: 11px; }
          .annual-summary__item strong { font-size: 14px; }
          .annual-section { margin-top: 3.5mm; padding: 3.2mm; border-radius: 3mm; background: #fff; border: 1px solid #dfd8cd; break-inside: avoid; page-break-inside: avoid; }
          .annual-section h4 { margin: 0 0 2mm; font-size: 15px; }
          .annual-table-wrap { overflow-x: auto; }
          .annual-table { width: 100%; border-collapse: collapse; min-width: 620px; }
          .annual-table th, .annual-table td { border: 1px solid #ddd3c3; padding: 6px 8px; text-align: right; font-size: 12px; white-space: nowrap; }
          .annual-table th:first-child, .annual-table td:first-child { text-align: left; white-space: normal; }
          .annual-table thead th { background: #f3eee3; font-size: 11px; }
          .annual-table .empty-cell { text-align: center !important; color: #6a5f50; }
          @media (max-width: 920px) {
            .annual-summary { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          }
          @media (max-width: 640px) {
            .annual-toolbar { position: static; padding: 10px 12px; }
            .annual-actions { width: 100%; }
            .annual-button { flex: 1; }
            .annual-body { width: 100%; padding: 12px; }
            .annual-summary { grid-template-columns: 1fr; }
          }
          @media print {
            body { background: #fff; }
            .annual-toolbar { display: none; }
            .annual-body { width: auto; margin: 0; padding: 0; }
          }
        </style>
      </head>
      <body>
        <header class="annual-toolbar">
          <div>
            <h1>年度レポ�Eト総合牁E/h1>
            <p>対象決算年度: ${escapeHtml(data.periodLabel)}</p>
            <p class="annual-toolbar__hint">Androidは「PDF保存」�E「�E有」で印刷アプリへ渡すと安定しめE��ぁE��す、E/p>
          </div>
          <div class="annual-actions">
            <button class="annual-button annual-button--print" type="button" onclick="window.print()">こ�E画面を印刷</button>
            <button class="annual-button annual-button--pdf" id="annualPdfButton" type="button" onclick="window.print()">PDF保孁E/button>
            <button class="annual-button annual-button--share" id="annualShareButton" type="button">共朁E/button>
            <button class="annual-button annual-button--close" type="button" onclick="window.close()">閉じめE/button>
          </div>
        </header>
        <main class="annual-body">
          <section class="annual-header">
            <p class="annual-app-name">(株)大成園　作業記録アプリ</p>
            <h2 class="annual-title">年度レポ�Eト総合牁E/h2>
            <p class="annual-meta">対象決算年度: ${escapeHtml(data.periodLabel)}</p>
            <p class="annual-meta">並び替え基溁E ${escapeHtml(metricLabel)} / 並び頁E ${escapeHtml(sortLabel)}</p>
            <div class="annual-summary">
              <div class="annual-summary__item"><span>対象決算年度</span><strong>${escapeHtml(data.periodLabel)}</strong></div>
              <div class="annual-summary__item"><span>総作業件数</span><strong>${escapeHtml(formatCount(data.summary.count))}</strong></div>
              <div class="annual-summary__item"><span>総作業時間</span><strong>${escapeHtml(formatHours(data.summary.hours))}</strong></div>
              <div class="annual-summary__item"><span>総延べ人晁E/span><strong>${escapeHtml(formatPersonHours(data.summary.personHours))}</strong></div>
              <div class="annual-summary__item"><span>総概算人件費</span><strong>${escapeHtml(formatCurrency(data.summary.laborCost))}</strong></div>
            </div>
          </section>
          ${renderMetricSection("園地別年間集訁E, data.orchardEntries, "園地チE�Eタはありません、E, "園地")}
          ${renderMetricSection("区画別年間集訁E, data.plotEntries, "区画チE�Eタはありません、E, "区画")}
          ${renderMetricSection("作業区刁E��年間集訁E, data.taskEntries, "作業区刁E��ータはありません、E, "作業区刁E)}
          ${renderMetricSection("品種別年間集訁E, data.varietyEntries, "品種チE�Eタはありません、E, "品種")}
          ${renderMetricSection("グループ別年間集訁E, data.groupEntries, "グループデータはありません、E, "作業グルーチE)}
          <section class="annual-section">
            <h4>作業老E��年間総作業時間</h4>
            <div class="annual-table-wrap">
              <table class="annual-table">
                <thead>
                  <tr><th>作業老E/th><th>総作業時間</th></tr>
                </thead>
                <tbody>${buildTaskTypeWorkerRowsHtml(data.workerHoursEntries, "作業老E��チE�Eタはありません、E)}</tbody>
              </table>
            </div>
          </section>
        </main>
        <script>
          (function () {
            const preferredAction = "${preferredAction}";
            const pdfButton = document.getElementById("annualPdfButton");
            const shareButton = document.getElementById("annualShareButton");
            if (shareButton) {
              if (!navigator.share) {
                shareButton.disabled = true;
                shareButton.textContent = "共有未対忁E;
              } else {
                shareButton.addEventListener("click", async () => {
                  try {
                    await navigator.share({
                      title: document.title,
                      text: "年度レポ�Eト総合版を共有しまぁE
                    });
                  } catch (error) {
                    if (error && error.name === "AbortError") return;
                    window.alert("共有に失敗しました、E);
                  }
                });
              }
            }
            if (preferredAction === "pdf" && pdfButton) {
              window.setTimeout(() => pdfButton.click(), 120);
            }
          })();
        </script>
      </body>
    </html>
  `;
}

function openAnnualReportWindow(preferredAction = "print") {
  const html = buildAnnualReportHtml({ preferredAction });
  openGeneratedDocumentWindow(html, {
    width: 1280,
    height: 920,
    popupBlockedMessage: "年度レポ�Eト画面を開けませんでした。ブラウザのポップアチE�E設定を確認してください、E
  });
}

async function shareAnnualReportFromMainPage() {
  const html = buildAnnualReportHtml({ preferredAction: "print" });
  await shareReportHtmlFromMainPage({
    html,
    fileName: "taiseien-annual-report.html",
    title: "(株)大成園 年度レポ�Eト総合牁E,
    text: "年度レポ�Eト総合版を共有しまぁE
  });
}

function exportAnnualReportCsv() {
  const data = getAnnualReportData();
  const metricLabel = getSortMetricLabel(data.metric);
  const sortLabel = data.sortOrder === "asc" ? "少なぁE��E : "多い頁E;

  const rows = [
    ["レポ�Eト区刁E, "名称", "件数", "総作業時間", "延べ人晁E, "概算人件費", "対象決算年度", "並び替え基溁E, "並び頁E],
    ["年度総括", "全佁E, data.summary.count, data.summary.hours, data.summary.personHours, data.summary.laborCost, data.periodLabel, metricLabel, sortLabel]
  ];
  const pushMetricRows = (sectionLabel, entries) => {
    entries.forEach((entry) => {
      rows.push([sectionLabel, entry.label, entry.count, entry.hours, entry.personHours, entry.laborCost, data.periodLabel, metricLabel, sortLabel]);
    });
  };
  pushMetricRows("園地別年閁E, data.orchardEntries);
  pushMetricRows("区画別年閁E, data.plotEntries);
  pushMetricRows("作業区刁E��年閁E, data.taskEntries);
  pushMetricRows("品種別年閁E, data.varietyEntries);
  pushMetricRows("グループ別年閁E, data.groupEntries);
  data.workerHoursEntries.forEach((entry) => {
    rows.push(["作業老E��年間時閁E, entry.label, "", entry.hours, "", "", data.periodLabel, metricLabel, sortLabel]);
  });

  const csv = rows.map((row) => row.map(escapeCsvValue).join(",")).join("\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `taiseien-fiscal-annual-report-${data.fiscalRange.from}_${data.fiscalRange.to}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

function getWorktimeCsvPeriodLabel(key) {
  if (key === "week") return "週閁E;
  if (key === "month") return "月間";
  if (key === "year") return "年閁E;
  return "任意期閁E;
}

function buildWorktimeReportHtml(snapshot, options = {}) {
  const preferredAction = options.preferredAction === "pdf" ? "pdf" : "print";
  const scopeLabel = snapshot.tab === "personal" ? "個人別" : "全佁E;
  const averageLabel = snapshot.tab === "personal" ? "平坁E��働時閁E : "1人あたり平坁E��働時閁E;
  const comparisonRowsHtml = snapshot.comparisonRows.length
    ? snapshot.comparisonRows.map((row) => {
      const averageValue = getWorktimeAverageValue(row.stats, snapshot.tab);
      return `
        <tr>
          <th>${escapeHtml(getWorktimeCsvPeriodLabel(row.key))}</th>
          <td>${escapeHtml(row.rangeText)}</td>
          <td>${escapeHtml(formatHours(row.stats.totalHours))}</td>
          <td>${escapeHtml(formatDays(row.stats.attendanceDays))}</td>
          <td>${escapeHtml(formatHours(averageValue))}</td>
        </tr>
      `;
    }).join("")
    : `<tr><td colspan="5" class="worktime-empty-cell">比輁E��象チE�Eタがありません、E/td></tr>`;

  const breakdownRowsHtml = snapshot.breakdown.rows.length
    ? snapshot.breakdown.rows.map((row) => {
      if (snapshot.tab === "personal") {
        return `
          <tr>
            <th>${escapeHtml(row.label)}</th>
            <td>${escapeHtml(formatHours(row.totalHours))}</td>
            <td>${escapeHtml(formatDays(row.attendanceDays))}</td>
            <td>${escapeHtml(formatHours(row.averageHours))}</td>
          </tr>
        `;
      }
      return `
        <tr>
          <th>${escapeHtml(row.label)}</th>
          <td>${escapeHtml(formatHours(row.totalHours))}</td>
          <td>${escapeHtml(formatDays(row.attendanceDays))}</td>
          <td>${escapeHtml(formatPeople(row.workerCount))}</td>
          <td>${escapeHtml(formatHours(row.averagePerWorker))}</td>
        </tr>
      `;
    }).join("")
    : `<tr><td colspan="${snapshot.tab === "personal" ? "4" : "5"}" class="worktime-empty-cell">期間冁E�E冁E��チE�Eタがありません、E/td></tr>`;

  const selectedAverage = getWorktimeAverageValue(snapshot.selectedStats, snapshot.tab);

  return `
    <html lang="ja">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>(株)大成園　作業記録アプリ 労働時間�E极E/title>
        <style>
          @page { size: A4 portrait; margin: 12mm; }
          * { box-sizing: border-box; }
          body { margin: 0; background: #f6f3ec; color: #2f2921; font-family: "Yu Gothic", "Hiragino Kaku Gothic ProN", sans-serif; }
          .worktime-toolbar { position: sticky; top: 0; z-index: 10; display: flex; gap: 10px; align-items: center; justify-content: space-between; padding: 12px 16px; border-bottom: 1px solid #d8d2c8; background: #ffffffee; backdrop-filter: blur(6px); }
          .worktime-toolbar h1 { margin: 0; font-size: 17px; }
          .worktime-toolbar p { margin: 4px 0 0; color: #5d5348; font-size: 13px; }
          .worktime-actions { display: flex; gap: 8px; flex-wrap: wrap; }
          .worktime-button { border: 0; border-radius: 999px; min-height: 38px; padding: 8px 14px; cursor: pointer; font-size: 14px; }
          .worktime-button--print { background: #3f6f3f; color: #fff; }
          .worktime-button--pdf { background: #c6522f; color: #fff; }
          .worktime-button--close { background: #ece8de; color: #3c352f; }
          .worktime-toolbar__hint { margin-top: 6px; font-size: 12px; color: #7b6a58; }
          .worktime-body { width: min(210mm, 100%); margin: 0 auto; padding: 7mm 0 12mm; }
          .worktime-header { margin-bottom: 5mm; padding: 5mm; border-radius: 4mm; background: #fff; border: 1px solid #dfd8cd; }
          .worktime-app-name { margin: 0; font-size: 20px; line-height: 1.3; }
          .worktime-title { margin: 2mm 0 1mm; font-size: 18px; }
          .worktime-meta { margin: 0.8mm 0; font-size: 13px; color: #5f564b; }
          .worktime-summary { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 2.8mm; margin-top: 4mm; }
          .worktime-summary__item { background: #fff; border: 1px solid #dfd8cd; border-radius: 3mm; padding: 2.5mm 3mm; display: grid; gap: 1.2mm; }
          .worktime-summary__item span { color: #61574b; font-size: 11px; }
          .worktime-summary__item strong { font-size: 15px; }
          .worktime-section { margin-top: 4mm; padding: 3.5mm; border-radius: 3mm; background: #fff; border: 1px solid #dfd8cd; break-inside: avoid; page-break-inside: avoid; }
          .worktime-section h3 { margin: 0 0 2.5mm; font-size: 15px; }
          .worktime-table-wrap { overflow-x: auto; }
          .worktime-table { width: 100%; border-collapse: collapse; min-width: 620px; }
          .worktime-table th, .worktime-table td { border: 1px solid #ddd3c3; padding: 6px 8px; text-align: right; font-size: 12px; white-space: nowrap; }
          .worktime-table th:first-child, .worktime-table td:first-child { text-align: left; white-space: normal; }
          .worktime-table thead th { background: #f3eee3; font-size: 11px; }
          .worktime-empty-cell { text-align: center !important; color: #6a5f50; }
          @media (max-width: 920px) {
            .worktime-summary { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          }
          @media (max-width: 640px) {
            .worktime-toolbar { position: static; padding: 10px 12px; }
            .worktime-actions { width: 100%; }
            .worktime-button { flex: 1; }
            .worktime-body { width: 100%; padding: 12px; }
            .worktime-summary { grid-template-columns: 1fr; }
          }
          @media print {
            body { background: #fff; }
            .worktime-toolbar { display: none; }
            .worktime-body { width: auto; margin: 0; padding: 0; }
          }
        </style>
      </head>
      <body>
        <header class="worktime-toolbar">
          <div>
            <h1>労働時間�E析レポ�EチE/h1>
            <p>雁E��区刁E ${escapeHtml(scopeLabel)} / 対象: ${escapeHtml(snapshot.targetName)}</p>
            <p class="worktime-toolbar__hint">Androidは「PDF保存」後に共有�Eアプリで印刷すると安定しめE��ぁE��す、E/p>
          </div>
          <div class="worktime-actions">
            <button class="worktime-button worktime-button--print" type="button" onclick="window.print()">こ�E画面を印刷</button>
            <button class="worktime-button worktime-button--pdf" id="worktimePdfButtonInWindow" type="button" onclick="window.print()">PDF保孁E/button>
            <button class="worktime-button worktime-button--close" type="button" onclick="window.close()">閉じめE/button>
          </div>
        </header>
        <main class="worktime-body">
          <section class="worktime-header">
            <p class="worktime-app-name">(株)大成園　作業記録アプリ</p>
            <h2 class="worktime-title">労働時間�E极E/h2>
            <p class="worktime-meta">雁E��区刁E ${escapeHtml(scopeLabel)}</p>
            <p class="worktime-meta">期間: ${escapeHtml(snapshot.periodConfig.label)} / ${escapeHtml(snapshot.periodConfig.rangeText)}</p>
            <p class="worktime-meta">対象: ${escapeHtml(snapshot.targetName)}</p>
            <div class="worktime-summary">
              <div class="worktime-summary__item"><span>労働時閁E/span><strong>${escapeHtml(formatHours(snapshot.selectedStats.totalHours))}</strong></div>
              <div class="worktime-summary__item"><span>出勤日数</span><strong>${escapeHtml(formatDays(snapshot.selectedStats.attendanceDays))}</strong></div>
              <div class="worktime-summary__item"><span>${escapeHtml(averageLabel)}</span><strong>${escapeHtml(formatHours(selectedAverage))}</strong></div>
              <div class="worktime-summary__item"><span>${snapshot.tab === "personal" ? "対象作業老E : "対象作業老E��"}</span><strong>${escapeHtml(snapshot.tab === "personal" ? snapshot.targetName : formatPeople(snapshot.selectedStats.workerCount || 0))}</strong></div>
            </div>
          </section>

          <section class="worktime-section">
            <h3>週・月�E年の比輁E/h3>
            <div class="worktime-table-wrap">
              <table class="worktime-table">
                <thead>
                  <tr>
                    <th>期間区刁E/th>
                    <th>対象期間</th>
                    <th>労働時閁E/th>
                    <th>出勤日数</th>
                    <th>${escapeHtml(averageLabel)}</th>
                  </tr>
                </thead>
                <tbody>
                  ${comparisonRowsHtml}
                </tbody>
              </table>
            </div>
          </section>

          <section class="worktime-section">
            <h3>${escapeHtml(snapshot.breakdown.title)}</h3>
            <div class="worktime-table-wrap">
              <table class="worktime-table">
                <thead>
                  <tr>
                    <th>区刁E/th>
                    <th>労働時閁E/th>
                    <th>出勤日数</th>
                    ${snapshot.tab === "personal" ? "" : "<th>作業老E��</th>"}
                    <th>${escapeHtml(averageLabel)}</th>
                  </tr>
                </thead>
                <tbody>
                  ${breakdownRowsHtml}
                </tbody>
              </table>
            </div>
          </section>
        </main>
        <script>
          (function () {
            const preferredAction = "${preferredAction}";
            const pdfButton = document.getElementById("worktimePdfButtonInWindow");
            if (preferredAction === "pdf" && pdfButton) {
              window.setTimeout(() => pdfButton.click(), 120);
            }
          })();
        </script>
      </body>
    </html>
  `;
}

function openWorktimeReportWindow(preferredAction = "print", tab = activeWorktimeTab) {
  const snapshot = buildWorktimeAnalysisSnapshot(tab);
  if (!snapshot.isValid) {
    window.alert(snapshot.error || "労働時間�E析�E条件を確認してください、E);
    return;
  }
  const html = buildWorktimeReportHtml(snapshot, { preferredAction });
  openGeneratedDocumentWindow(html, {
    width: 1200,
    height: 920,
    popupBlockedMessage: "労働時間�E析画面を開けませんでした。ブラウザのポップアチE�E設定を確認してください、E
  });
}

function exportWorktimeAnalysisCsv(tab = activeWorktimeTab) {
  const snapshot = buildWorktimeAnalysisSnapshot(tab);
  if (!snapshot.isValid) {
    window.alert(snapshot.error || "労働時間�E析�E条件を確認してください、E);
    return;
  }
  const scopeLabel = snapshot.tab === "personal" ? "個人別" : "全佁E;
  const targetLabel = snapshot.targetName;
  const rows = [
    ["雁E��区刁E, "期間区刁E, "対象期間", "氏名また�E全佁E, "労働時閁E, "出勤日数", "平坁E��働時閁E]
  ];

  snapshot.comparisonRows.forEach((row) => {
    rows.push([
      scopeLabel,
      getWorktimeCsvPeriodLabel(row.key),
      row.rangeText,
      targetLabel,
      Number(row.stats.totalHours || 0),
      Number(row.stats.attendanceDays || 0),
      Number(getWorktimeAverageValue(row.stats, snapshot.tab) || 0)
    ]);
  });

  if (snapshot.periodConfig.mode === "custom") {
    rows.push([
      scopeLabel,
      getWorktimeCsvPeriodLabel("custom"),
      snapshot.periodConfig.rangeText,
      targetLabel,
      Number(snapshot.selectedStats.totalHours || 0),
      Number(snapshot.selectedStats.attendanceDays || 0),
      Number(getWorktimeAverageValue(snapshot.selectedStats, snapshot.tab) || 0)
    ]);
  }

  const csv = rows.map((row) => row.map(escapeCsvValue).join(",")).join("\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `taiseien-worktime-analysis-${snapshot.tab}-${snapshot.periodConfig.from}_${snapshot.periodConfig.to}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

function exportWorktimePersonalCsv() {
  exportWorktimeAnalysisCsv("personal");
}

function exportWorktimeOverallCsv() {
  exportWorktimeAnalysisCsv("overall");
}

async function printQrCard(title, meta, imageUrl) {
  const printableImageUrl = await buildPrintableQrImageSourceFromUrl(imageUrl, 360);
  const html = `
    <html lang="ja">
      <head>
        <meta charset="utf-8" />
        <title>${escapeHtml(title)}</title>
        <style>
          body { font-family: sans-serif; padding: 24px; }
          h1 { font-size: 20px; margin: 0 0 8px; }
          p { margin: 0 0 16px; color: #555; }
          img { width: 280px; height: 280px; border: 1px solid #ddd; border-radius: 10px; display: block !important; visibility: visible !important; opacity: 1 !important; }
          .status { margin-top: 10px; color: #3f6f3f; font-weight: 700; font-size: 13px; }
        </style>
      </head>
      <body>
        <h1>${escapeHtml(title)}</h1>
        <p>${escapeHtml(meta)}</p>
        <img id="qrPrintImage" src="${escapeHtml(printableImageUrl)}" alt="${escapeHtml(title)}" />
        <p class="status" id="qrPrintStatus">QR画像を確認中でぁE..</p>
        <script>
          (function () {
            const image = document.getElementById("qrPrintImage");
            const status = document.getElementById("qrPrintStatus");
            const runPrint = () => {
              if (status) {
                status.textContent = "QR画像�E準備ができました。印刷します、E;
              }
              window.setTimeout(() => window.print(), 120);
            };
            if (image && image.complete && image.naturalWidth > 0) {
              runPrint();
              return;
            }
            if (image) {
              image.addEventListener("load", runPrint, { once: true });
              image.addEventListener("error", () => {
                if (status) {
                  status.textContent = "QR画像�E読み込みに失敗しました。�E度お試しください、E;
                  status.style.color = "#9f2d2d";
                }
              }, { once: true });
            }
          })();
        </script>
      </body>
    </html>
  `;
  const win = openGeneratedDocumentWindow(html, {
    width: 520,
    height: 700,
    popupBlockedMessage: "印刷用ウィンドウを開けませんでした。�EチE�EアチE�E設定を確認してください、E
  });
  if (!win) return;
  win.focus();
}

function collectVarietyNamesByLocation({ orchardId, plotId = "" }) {
  const names = new Set();
  records.forEach((record) => {
    if (record.orchardId !== orchardId) return;
    if (plotId && record.plotId !== plotId) return;
    const variety = getVarietyById(record.varietyId);
    const varietyName = normalizeText(variety?.name || record.varietyName);
    if (varietyName) names.add(varietyName);
  });
  return [...names];
}

function buildQrListItems() {
  const orchardItems = masters.orchards.map((orchard) => {
    const code = normalizeManagementCode(orchard.managementCode);
    const codeLabel = code || "未設宁E;
    const warningText = code ? "" : "管琁E��ード未設定です。園地マスターで設定してください、E;
    const varietyNames = collectVarietyNamesByLocation({ orchardId: orchard.id });
    return {
      type: "orchard",
      title: `園地QR: ${orchard.name}${code ? ` (${code})` : "�E�管琁E��ード未設定！E}`,
      meta: `管琁E��ーチE ${codeLabel}${code ? "" : "�E�要設定！E} / 園地ID: ${orchard.id}`,
      detailText: varietyNames.length ? `品種: ${varietyNames.join("、E)}` : "品種: 該当記録なぁE,
      warningText,
      payload: buildLocationQrPayload(orchard.id, ""),
      orchardName: orchard.name,
      orchardCode: code,
      plotName: "",
      plotCode: "",
      codeSearch: codeLabel,
      varietyNames
    };
  });

  const plotItems = masters.plots.map((plot) => {
    const orchard = getOrchardById(plot.orchardId);
    const plotCode = normalizeManagementCode(plot.managementCode);
    const orchardCode = normalizeManagementCode(orchard?.managementCode);
    const plotCodeLabel = plotCode || "未設宁E;
    const warningText = plotCode ? "" : "管琁E��ード未設定です。区画マスターで設定してください、E;
    const varietyNames = collectVarietyNamesByLocation({ orchardId: plot.orchardId, plotId: plot.id });
    return {
      type: "plot",
      title: `区画QR: ${plot.name}${plotCode ? ` (${plotCode})` : "�E�管琁E��ード未設定！E}`,
      meta: `園地: ${orchard?.name || "未設宁E}${orchardCode ? ` (${orchardCode})` : ""} / 区画管琁E��ーチE ${plotCodeLabel}${plotCode ? "" : "�E�要設定！E} / 園地ID: ${plot.orchardId} / 区画ID: ${plot.id}`,
      detailText: varietyNames.length ? `品種: ${varietyNames.join("、E)}` : "品種: 該当記録なぁE,
      warningText,
      payload: buildLocationQrPayload(plot.orchardId, plot.id),
      orchardName: orchard?.name || "",
      orchardCode,
      plotName: plot.name,
      plotCode,
      codeSearch: [orchardCode, plotCodeLabel].filter(Boolean).join(" "),
      varietyNames
    };
  });

  return [...orchardItems, ...plotItems];
}

function createQrCard({ type, title, meta, detailText, warningText, payload }) {
  const card = document.createElement("article");
  card.className = `qr-card ${type === "plot" ? "qr-card--plot" : "qr-card--orchard"}`;
  const heading = document.createElement("h4");
  heading.textContent = title;
  const metaText = document.createElement("p");
  metaText.className = "qr-card__meta";
  metaText.textContent = meta;
  const detail = document.createElement("p");
  detail.className = "qr-card__meta";
  detail.textContent = detailText;
  let warning = null;
  if (warningText) {
    warning = document.createElement("p");
    warning.className = "qr-card__warning";
    warning.textContent = warningText;
  }
  const image = document.createElement("img");
  image.className = "qr-card__image";
  image.alt = `${title} QR`;
  image.src = buildQrImageUrl(payload);
  const payloadText = document.createElement("p");
  payloadText.className = "qr-card__meta";
  payloadText.textContent = `識別孁E ${payload}`;
  const actions = document.createElement("div");
  actions.className = "qr-card__actions";
  const saveLink = document.createElement("a");
  saveLink.className = "button button--ghost button--small";
  saveLink.href = image.src;
  saveLink.download = `${title.replace(/\s+/g, "-")}.png`;
  saveLink.textContent = "画像保孁E;
  saveLink.target = "_blank";
  saveLink.rel = "noopener";
  const printButton = document.createElement("button");
  printButton.type = "button";
  printButton.className = "button button--ghost button--small";
  printButton.textContent = "印刷";
  printButton.addEventListener("click", () => printQrCard(title, meta, image.src));
  actions.append(saveLink, printButton);
  if (warning) {
    card.append(heading, metaText, detail, warning, image, payloadText, actions);
  } else {
    card.append(heading, metaText, detail, image, payloadText, actions);
  }
  return card;
}

function renderQrCodeList() {
  qrCodeList.innerHTML = "";
  const qrItems = buildQrListItems();
  if (!qrItems.length) {
    qrCodeList.appendChild(buildEmptyState("園地・区画を登録するとQRコード一覧を表示できます、E));
    return;
  }

  const orchardKeyword = normalizeSearchText(qrFilterOrchardInput?.value);
  const plotKeyword = normalizeSearchText(qrFilterPlotInput?.value);
  const varietyKeyword = normalizeSearchText(qrFilterVarietyInput?.value);
  const codeKeyword = normalizeSearchText(qrFilterCodeInput?.value);
  const typeFilter = qrFilterTypeInput?.value || "all";
  const includesKeyword = (source, keyword) => !keyword || normalizeSearchText(source).includes(keyword);
  const filteredItems = qrItems.filter((item) => {
    if (typeFilter !== "all" && item.type !== typeFilter) return false;
    if (!includesKeyword(`${item.orchardName} ${item.orchardCode}`, orchardKeyword)) return false;
    if (plotKeyword) {
      if (item.type !== "plot") return false;
      if (!includesKeyword(`${item.plotName} ${item.plotCode}`, plotKeyword)) return false;
    }
    if (varietyKeyword) {
      const varietySource = item.varietyNames.join(" ");
      if (!includesKeyword(varietySource, varietyKeyword)) return false;
    }
    if (codeKeyword) {
      const codeSource = item.codeSearch || `${item.orchardCode || ""} ${item.plotCode || ""}`.trim();
      if (!includesKeyword(codeSource || "none", codeKeyword)) return false;
    }
    return true;
  });

  if (!filteredItems.length) {
    qrCodeList.appendChild(buildEmptyState("条件に一致するQRコードがありません。検索条件を見直してください、E));
    return;
  }

  filteredItems.forEach((item) => {
    qrCodeList.appendChild(createQrCard(item));
  });
}

function applyQrLocation({ orchardId, plotId }) {
  const orchard = getOrchardById(orchardId);
  if (!orchard) {
    window.alert("読み取ったQRコード�E園地IDが存在しません。�Eスターを確認してください、E);
    return false;
  }
  orchardSelect.value = orchard.id;
  renderPlotOptions(orchard.id, "");
  recordWeatherInfo = null;
  clearWeatherDetailInputs();
    setWeatherFetchStatus(`忁E��に応じて、E{WEATHER_FETCH_BUTTON_TEXT}」を押してください。`);
  if (plotId) {
    const plot = getPlotById(plotId);
    if (!plot || plot.orchardId !== orchard.id) {
      window.alert("読み取ったQRコード�E区画IDが存在しなぁE��、園地と一致しません、E);
      return false;
    }
    plotSelect.value = plot.id;
  }
  qrScannerMessage.textContent = `読み取り成功: ${orchard.name}${plotId ? ` / ${getPlotById(plotId)?.name || ""}` : ""}`;
  return true;
}

function handleQrDecodedValue(rawValue) {
  const parsed = parseLocationQrPayload(rawValue);
  if (!parsed) {
    window.alert("読み取ったコード�E対応してぁE��せん。園地・区画QRコードを使用してください、E);
    return false;
  }
  const applied = applyQrLocation(parsed);
  if (applied) {
    closeQrScanner();
  }
  return applied;
}

function stopQrScannerLoop() {
  if (qrScanFrameId) {
    cancelAnimationFrame(qrScanFrameId);
    qrScanFrameId = 0;
  }
}

function stopQrScannerStream() {
  stopQrScannerLoop();
  if (qrScannerStream) {
    qrScannerStream.getTracks().forEach((track) => track.stop());
    qrScannerStream = null;
  }
  qrScannerVideo.srcObject = null;
}

async function scanQrFrame() {
  if (!qrDetector || !qrScannerVideo.srcObject) return;
  try {
    const codes = await qrDetector.detect(qrScannerVideo);
    if (codes.length && codes[0].rawValue) {
      handleQrDecodedValue(codes[0].rawValue);
      return;
    }
  } catch (error) {
    console.error(error);
    qrScannerMessage.textContent = "QR読み取り中にエラーが発生しました。手入力を利用してください、E;
  }
  qrScanFrameId = requestAnimationFrame(scanQrFrame);
}

async function openQrScanner() {
  if (typeof qrScannerDialog.showModal !== "function") {
    window.alert("こ�Eブラウザでは読み取り画面を開けません。手入力を利用してください、E);
    return;
  }
  qrManualInput.value = "";
  qrScannerMessage.textContent = "カメラを起動してQRコードを読み取ってください、E;
  qrScannerDialog.showModal();
  if (!("BarcodeDetector" in window)) {
    qrScannerMessage.textContent = "こ�E端末ではカメラQR読み取りに未対応です。下�E手�E力を利用してください、E;
    return;
  }
  try {
    qrDetector = new window.BarcodeDetector({ formats: ["qr_code"] });
    qrScannerStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: { ideal: "environment" } },
      audio: false
    });
    qrScannerVideo.srcObject = qrScannerStream;
    await qrScannerVideo.play();
    stopQrScannerLoop();
    qrScanFrameId = requestAnimationFrame(scanQrFrame);
  } catch (error) {
    console.error(error);
    qrScannerMessage.textContent = "カメラを起動できませんでした。下�E手�E力を利用してください、E;
  }
}

function closeQrScanner() {
  stopQrScannerStream();
  if (qrScannerDialog.open) {
    qrScannerDialog.close();
  }
}

function renderLegacy() {
  renderMasterSelects();
  renderSummary();
  renderBackupPanel();
  renderRecords();
  renderAnalytics();
  renderPayrollSection();
  renderCumulativeComparison();
  renderQrCodeList();
  renderMasterLists();
}

function escapeCsvValue(value) {
  const text = String(value ?? "");
  if (text.includes(",") || text.includes('"') || text.includes("\n")) return `"${text.replace(/"/g, '""')}"`;
  return text;
}

/*
function exportCsv() {
  if (!records.length) {
    window.alert("CSV出力できる作業記録がありません、E);
    return;
  }
  const header = ["作業日", "園地", "区画", "品種", "作業冁E��", "当日グルーチE, "使用固定チームセチE��", "日別チ�Eム編戁E, "作業時間", "作業人数", "延べ人晁E, "概算人件費", "代表作業老E��", "作業老E��覧", "所属区刁E, "時給単価", "開始時刻", "終亁E��刻", "天氁E, "使用賁E��", "メモ"];
  const rows = records.slice().sort((a, b) => new Date(b.workDate) - new Date(a.workDate)).map((record) => {
    const names = getRecordDisplay(record);
    const metrics = getRecordMetrics(record);
    const teamPlan = getTeamPlan(record.workDate, record.dailyGroupId);
    const teamPlanText = teamPlan ? teamPlan.workerIds.map((workerId) => getWorkerById(workerId)?.displayName).filter(Boolean).join("、E) : "";
    return [record.workDate, names.orchardName, names.plotName, names.varietyName, record.taskType, names.dailyGroupName, names.fixedTeamSetName, teamPlanText, metrics.hours, metrics.workerCount, metrics.personHours, metrics.laborCost, names.workerFullName, names.workerListText, names.workerCategory, names.workerHourlyRate, record.startTime, record.endTime, record.weather, record.materials, record.notes];
  });
  const csv = [header, ...rows].map((row) => row.map(escapeCsvValue).join(",")).join("\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "taiseien-work-records-v5.csv";
  link.click();
  URL.revokeObjectURL(url);
}

*/
/*
function exportCumulativeComparisonCsvLegacy() {
  const comparisonData = getCumulativeComparisonData();
  if (!comparisonData.periodConfig.isValid) {
    window.alert(comparisonData.periodConfig.error || "比輁E��件を確認してください、E);
    return;
  }
  const metricLabelMap = {
    count: "件数基溁E,
    hours: "総作業時間基溁E,
    personHours: "延べ人時基溁E,
    laborCost: "概算人件費基溁E
  };
  const metricLabel = metricLabelMap[comparisonSortMetricInput.value] || "総作業時間基溁E;
  const sortLabel = comparisonSortOrderInput.value === "asc" ? "少なぁE��E : "多い頁E;
  const header = ["区刁E, "名称", "累積作業件数", "累積総作業時間", "累積延べ人晁E, "累積概算人件費", "比輁E��閁E, "並び替え基溁E, "並び頁E];
  const orchardRows = comparisonData.orchardEntries.map((entry) => ["園地", entry.label, entry.count, entry.hours, entry.personHours, entry.laborCost, comparisonData.periodConfig.label, metricLabel, sortLabel]);
  const plotRows = comparisonData.plotEntries.map((entry) => ["区画", entry.label, entry.count, entry.hours, entry.personHours, entry.laborCost, comparisonData.periodConfig.label, metricLabel, sortLabel]);
  const rows = [header, ...orchardRows, ...plotRows];
  const csv = rows.map((row) => row.map(escapeCsvValue).join(",")).join("\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "taiseien-cumulative-comparison.csv";
  link.click();
  URL.revokeObjectURL(url);
}
*/

/*
/*
function exportCsvWithTemperature() {
  if (!records.length) {
    // legacy-disabled
    window.alert("CSV出力できる作業記録がありません、E);
    return;
    // legacy-disabled-end
    window.alert("CSV出力できる作業記録がありません、E);
    return;
  }

  const header = [
    "作業日",
    "園地",
    "区画",
    "品種",
    "作業区刁E,
    "当日グルーチE,
    "使用固定チームセチE��",
    "日別チ�Eム編戁E,
    "作業時間",
    "作業人数",
    "延べ人晁E,
    "概算人件費",
    "代表作業老E��",
    "作業老E��覧",
    "所属区刁E,
    "時給単価",
    "開始時刻",
    "終亁E��刻",
    "現在気温�E�℃�E�E,
    "平坁E��温�E�℃�E�E,
    "天氁E,
    "使用賁E��",
    "メモ"
  ];

  const rows = records
    .slice()
    .sort((a, b) => new Date(b.workDate) - new Date(a.workDate))
    .map((record) => {
      const names = getRecordDisplay(record);
      const metrics = getRecordMetrics(record);
      const environment = normalizeRecordEnvironment(record);
      const teamPlan = getTeamPlan(record.workDate, record.dailyGroupId);
      const teamPlanText = teamPlan
        ? teamPlan.workerIds
            .map((workerId) => getWorkerById(workerId)?.displayName)
            .filter(Boolean)
            .join("、E)
        : "";

      return [
        record.workDate,
        names.orchardName,
        names.plotName,
        names.varietyName,
        record.taskType,
        names.dailyGroupName,
        names.fixedTeamSetName,
        teamPlanText,
        metrics.hours,
        metrics.workerCount,
        metrics.personHours,
        metrics.laborCost,
        names.workerFullName,
        names.workerListText,
        names.workerCategory,
        names.workerHourlyRate,
        record.startTime,
        record.endTime,
        environment.temperatureC ?? "",
        weatherInfo?.tempAvg ?? "",
        environment.weather,
        record.materials,
        record.notes
      ];
    });

  const csv = [header, ...rows].map((row) => row.map(escapeCsvValue).join(",")).join("\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "taiseien-work-records-v5.csv";
  link.click();
  URL.revokeObjectURL(url);
}

*/

function exportCsvWithTemperature() {
  if (!records.length) {
    window.alert("\u0043\u0053\u0056\u51fa\u529b\u3067\u304d\u308b\u4f5c\u696d\u8a18\u9332\u304c\u3042\u308a\u307e\u305b\u3093\u3002");
    return;
  }

  const header = [
    "作業日",
    "園地",
    "区画",
    "品種",
    "作業区刁E,
    "当日グルーチE,
    "使用固定チームセチE��",
    "日別チ�Eム編戁E,
    "作業時間",
    "作業人数",
    "延べ人晁E,
    "概算人件費",
    "代表作業老E��",
    "作業老E��覧",
    "所属区刁E,
    "時給単価",
    "開始時刻",
    "終亁E��刻",
    "カウントしなぁE��間（�E�E�E,
    "自動計算労働時閁E,
    "手�E力上書き労働時閁E,
    "作業老E��勤務詳細",
    "現在気温�E�℃�E�E,
    "平坁E��温�E�℃�E�E,
    "天氁E,
    "最高気温�E�℃�E�E,
    "最低気温�E�℃�E�E,
    "降水量！Em�E�E,
    "湿度�E�E�E�E,
    "風速！E/s�E�E,
    "天気コーチE,
    "天気取得時刻",
    "現場確認サマリー",
    "痁E��発甁E,
    "害虫発甁E,
    "薬剤散币E,
    "痁E��・食害",
    "葉枝の濡めE,
    "ぬかるみ",
    "作業しにくさ",
    "現場メモ",
    "使用賁E��",
    "メモ"
  ];

  const rows = records
    .slice()
    .sort((a, b) => new Date(b.workDate) - new Date(a.workDate))
    .map((record) => {
      const names = getRecordDisplay(record);
      const metrics = getRecordMetrics(record);
      const environment = normalizeRecordEnvironment(record);
      const weatherInfo = environment.weatherInfo || null;
      const observation = normalizeFieldObservation(record.fieldObservation);
      const observationSummary = formatFieldObservationSummary(observation);
      const workTypeText = getRecordTaskTypeText(record, "");
      const teamPlan = getTeamPlan(record.workDate, record.dailyGroupId);
      const teamPlanText = teamPlan
        ? teamPlan.workerIds.map((workerId) => getWorkerById(workerId)?.displayName).filter(Boolean).join("\u3001")
        : "";
      const recordStartTime = getRecordStartTime(record);
      const recordEndTime = getRecordEndTime(record);
      const recordBreakMinutes = getRecordBreakMinutes(record, companySettings);
      const recordCalculatedHours = Number.isFinite(Number(record.calculatedWorkHours))
        ? Number(record.calculatedWorkHours)
        : calculateHoursFromRange(recordStartTime, recordEndTime, companySettings, recordBreakMinutes);
      const recordManualHours = normalizeManualHours(record.manualWorkHours ?? record.manualHours, companySettings);
      const workerTimeDetailText = Object.entries(getRecordWorkerTimeDetails(record, companySettings))
        .map(([workerId, detail]) => {
          const worker = getWorkerById(workerId);
          const adoptedHours = Number.isFinite(detail.resolvedHours)
            ? detail.resolvedHours
            : (Number.isFinite(detail.manualHours) ? detail.manualHours : detail.calculatedHours);
          const adoptedText = Number.isFinite(adoptedHours) ? `${adoptedHours.toFixed(1)}h` : "-";
          return `${worker?.displayName || workerId}(${detail.startTime || "--"}-${detail.endTime || "--"} / 控除${detail.breakMinutes}刁E/ ${adoptedText})`;
        })
        .join(" / ");

      return [
        record.workDate,
        names.orchardName,
        names.plotName,
        names.varietyName,
        workTypeText,
        names.dailyGroupName,
        names.fixedTeamSetName,
        teamPlanText,
        metrics.hours,
        metrics.workerCount,
        metrics.personHours,
        metrics.laborCost,
        names.workerFullName,
        names.workerListText,
        names.workerCategory,
        names.workerHourlyRate,
        recordStartTime,
        recordEndTime,
        recordBreakMinutes,
        Number.isFinite(recordCalculatedHours) ? recordCalculatedHours : "",
        recordManualHours ?? "",
        workerTimeDetailText,
        environment.temperatureC ?? "",
        weatherInfo?.tempAvg ?? "",
        environment.weather,
        weatherInfo?.tempMax ?? "",
        weatherInfo?.tempMin ?? "",
        weatherInfo?.precipitation ?? "",
        weatherInfo?.humidity ?? "",
        weatherInfo?.windSpeed ?? "",
        weatherInfo?.weatherCode ?? "",
        weatherInfo?.fetchedAt ?? "",
        observationSummary,
        observation.diseaseObserved ? "\u3042\u308a" : "\u306a\u3057",
        observation.pestObserved ? "\u3042\u308a" : "\u306a\u3057",
        observation.sprayApplied ? "\u5b9f\u65bd" : "\u672a\u5b9f\u65bd",
        observation.damageLevel,
        observation.wetness,
        observation.muddy,
        observation.workDifficulty,
        observation.memo,
        record.materials,
        record.notes
      ];
    });

  const csv = [header, ...rows].map((row) => row.map(escapeCsvValue).join(",")).join("\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "taiseien-work-records-v5.csv";
  link.click();
  URL.revokeObjectURL(url);
}

function exportCsvWithTemperature() {
  if (!records.length) {
    window.alert("CSV出力できる作業記録がありません、E);
    return;
  }

  const header = [
    "作業日",
    "園地",
    "区画",
    "品種",
    "作業冁E��",
    "作業グルーチE,
    "作業老E��覧",
    "作業人数",
    "勤務区刁E,
    "開始時刻",
    "終亁E��刻",
    "拘束時間�E�時間！E,
    "控除時間�E��E�E�E,
    "実労働時間（時間！E,
    "延べ人晁E,
    "概算人件費",
    "現在気温�E�℃�E�E,
    "平坁E��温�E�℃�E�E,
    "天氁E,
    "最高気温�E�℃�E�E,
    "最低気温�E�℃�E�E,
    "降水量！Em�E�E,
    "湿度�E�E�E�E,
    "風速！E/s�E�E,
    "使用賁E��",
    "メモ"
  ];

  const rows = records
    .slice()
    .sort((a, b) => new Date(b.workDate) - new Date(a.workDate))
    .map((record) => {
      const names = getRecordDisplay(record);
      const metrics = getRecordMetrics(record);
      const environment = normalizeRecordEnvironment(record);
      const weatherInfo = environment.weatherInfo || null;
      const workTypeText = getRecordTaskTypeText(record, "");
      const recordStartTime = getRecordStartTime(record);
      const recordEndTime = getRecordEndTime(record);
      const recordBreakMinutes = getRecordBreakMinutes(record, companySettings);
      const recordBoundHours = calculateBoundHoursByRange(recordStartTime, recordEndTime);
      const shiftType = inferRecordShiftType(record, companySettings);

      return [
        record.workDate,
        names.orchardName,
        names.plotName,
        names.varietyName,
        workTypeText,
        names.dailyGroupName,
        names.workerListText,
        metrics.workerCount,
        getShiftTypeLabel(shiftType),
        recordStartTime,
        recordEndTime,
        Number.isFinite(recordBoundHours) ? recordBoundHours : "",
        recordBreakMinutes,
        metrics.hours,
        metrics.personHours,
        metrics.laborCost,
        environment.temperatureC ?? "",
        weatherInfo?.tempAvg ?? "",
        environment.weather,
        weatherInfo?.tempMax ?? "",
        weatherInfo?.tempMin ?? "",
        weatherInfo?.precipitation ?? "",
        weatherInfo?.humidity ?? "",
        weatherInfo?.windSpeed ?? "",
        record.materials,
        record.notes
      ];
    });

  const csv = [header, ...rows].map((row) => row.map(escapeCsvValue).join(",")).join("\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "taiseien-work-records-v7.csv";
  link.click();
  URL.revokeObjectURL(url);
}
*/

function exportCsvWithTemperature() {
  if (!records.length) {
    window.alert("\u0043\u0053\u0056\u51fa\u529b\u3067\u304d\u308b\u4f5c\u696d\u8a18\u9332\u304c\u3042\u308a\u307e\u305b\u3093\u3002");
    return;
  }

  const header = [
    "\u4f5c\u696d\u65e5",
    "\u5712\u5730",
    "\u533a\u753b",
    "\u54c1\u7a2e",
    "\u4f5c\u696d\u9805\u76ee",
    "\u4f5c\u696d\u30b0\u30eb\u30fc\u30d7",
    "\u4f5c\u696d\u8005\u4e00\u89a7",
    "\u4f5c\u696d\u4eba\u6570",
    "\u52e4\u52d9\u533a\u5206",
    "\u958b\u59cb\u6642\u523b",
    "\u7d42\u4e86\u6642\u523b",
    "\u62d8\u675f\u6642\u9593\uff08\u6642\u9593\uff09",
    "\u63a7\u9664\u6642\u9593\uff08\u5206\uff09",
    "\u5b9f\u52b4\u50cd\u6642\u9593\uff08\u6642\u9593\uff09",
    "\u5ef6\u3079\u4eba\u6642",
    "\u6982\u7b97\u4eba\u4ef6\u8cbb",
    "\u6c17\u6e29\uff08\u2103\uff09",
    "\u5e73\u5747\u6c17\u6e29\uff08\u2103\uff09",
    "\u6700\u9ad8\u6c17\u6e29\uff08\u2103\uff09",
    "\u6700\u4f4e\u6c17\u6e29\uff08\u2103\uff09",
    "\u964d\u6c34\u91cf\uff08mm\uff09",
    "\u6e7f\u5ea6\uff08\uff05\uff09",
    "\u98a8\u901f\uff08m/s\uff09",
    "\u5929\u6c17",
    "\u4f7f\u7528\u8cc7\u6750",
    "\u30e1\u30e2"
  ];

  const rows = records
    .slice()
    .sort((a, b) => new Date(b.workDate) - new Date(a.workDate))
    .map((record) => {
      const names = getRecordDisplay(record);
      const metrics = getRecordMetrics(record);
      const environment = normalizeRecordEnvironment(record);
      const weatherInfo = environment.weatherInfo || null;
      const workTypeText = getRecordTaskTypeText(record, "");
      const startTime = getRecordStartTime(record);
      const endTime = getRecordEndTime(record);
      const breakMinutes = getRecordBreakMinutes(record, companySettings);
      const boundHours = calculateBoundHoursByRange(startTime, endTime);
      const shiftType = inferRecordShiftType(record, companySettings);

      return [
        record.workDate,
        names.orchardName,
        names.plotName,
        names.varietyName,
        workTypeText,
        names.dailyGroupName,
        names.workerListText,
        metrics.workerCount,
        getShiftTypeLabel(shiftType),
        startTime,
        endTime,
        Number.isFinite(boundHours) ? boundHours : "",
        breakMinutes,
        metrics.hours,
        metrics.personHours,
        metrics.laborCost,
        environment.temperatureC ?? "",
        weatherInfo?.tempAvg ?? "",
        weatherInfo?.tempMax ?? "",
        weatherInfo?.tempMin ?? "",
        weatherInfo?.precipitation ?? "",
        weatherInfo?.humidity ?? "",
        weatherInfo?.windSpeed ?? "",
        environment.weather ?? "",
        record.materials ?? "",
        record.notes ?? ""
      ];
    });

  const csv = [header, ...rows].map((row) => row.map(escapeCsvValue).join(",")).join("\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "taiseien-work-records-v7.csv";
  link.click();
  URL.revokeObjectURL(url);
}

function getPayrollPeriodText(periodConfig) {
  if (!periodConfig) return "";
  return periodConfig.rangeText || `${formatDateYmd(periodConfig.from)}〜${formatDateYmd(periodConfig.to)}`;
}

function renderPayrollSummaryCards(data) {
  if (!payrollSummaryCards) return;
  const summary = data.summary || {};
  const cards = [
    { label: "\u5bfe\u8c61\u4eba\u6570", value: formatPeople(summary.workerCount || 0) },
    { label: "\u51fa\u52e4\u65e5\u6570\u5408\u8a08", value: formatDays(summary.attendanceDays || 0) },
    { label: "\u7dcf\u5b9f\u52b4\u50cd\u6642\u9593", value: formatHoursQuarter(summary.totalHours || 0) },
    { label: "\u7dcf\u63a7\u9664\u6642\u9593", value: `${Math.round(summary.totalBreakMinutes || 0)}\u5206` },
    { label: "\u57fa\u672c\u652f\u7d66\u984d\u5408\u8a08", value: formatCurrency(summary.basicPay || 0) },
    { label: "\u5dee\u5f15\u652f\u7d66\u984d\u5408\u8a08", value: formatCurrency(summary.netPay || 0) }
  ];
  payrollSummaryCards.innerHTML = "";
  cards.forEach((item) => {
    const card = document.createElement("article");
    card.className = "summary-card payroll-summary-card";
    const label = document.createElement("span");
    label.className = "summary-card__label";
    label.textContent = item.label;
    const value = document.createElement("strong");
    value.textContent = item.value;
    card.append(label, value);
    payrollSummaryCards.appendChild(card);
  });
}

function renderPayrollList(data) {
  if (!payrollList) return;
  payrollList.innerHTML = "";
  if (!data.rows.length) {
    payrollList.appendChild(buildEmptyState("\u5bfe\u8c61\u671f\u9593\u306b\u7d66\u4e0e\u96c6\u8a08\u30c7\u30fc\u30bf\u304c\u3042\u308a\u307e\u305b\u3093\u3002"));
    return;
  }
  data.rows.forEach((row) => {
    const card = document.createElement("article");
    card.className = "payroll-row";
    if (row.workerId === activePayrollWorkerId) card.classList.add("is-active");
    card.addEventListener("click", () => {
      activePayrollWorkerId = row.workerId;
      renderPayrollSection();
    });

    const header = document.createElement("div");
    header.className = "payroll-row__header";
    const heading = document.createElement("h4");
    heading.textContent = `${row.fullName}${row.category ? `(${row.category})` : ""}`;

    const actions = document.createElement("div");
    actions.className = "payroll-row__actions";

    const detailButton = document.createElement("button");
    detailButton.type = "button";
    detailButton.className = "button button--view button--small";
    detailButton.textContent = "\u660e\u7d30\u3092\u898b\u308b";
    detailButton.addEventListener("click", (event) => {
      event.stopPropagation();
      activePayrollWorkerId = row.workerId;
      renderPayrollSection();
    });

    const printButton = document.createElement("button");
    printButton.type = "button";
    printButton.className = "button button--save button--small";
    printButton.textContent = "\u5370\u5237";
    printButton.addEventListener("click", (event) => {
      event.stopPropagation();
      openPayrollIndividualReportWindow(row, data.periodConfig, "print");
    });

    const pdfButton = document.createElement("button");
    pdfButton.type = "button";
    pdfButton.className = "button button--save button--small";
    pdfButton.textContent = "PDF\u4fdd\u5b58";
    pdfButton.addEventListener("click", (event) => {
      event.stopPropagation();
      openPayrollIndividualReportWindow(row, data.periodConfig, "pdf");
    });

    actions.append(detailButton, printButton, pdfButton);
    header.append(heading, actions);

    const metrics = document.createElement("div");
    metrics.className = "payroll-row__metrics";
    metrics.innerHTML = `
      <span>\u51fa\u52e4\u65e5\u6570: <strong>${formatDays(row.attendanceDays)}</strong></span>
      <span>\u7dcf\u5b9f\u52b4\u50cd\u6642\u9593: <strong>${formatHoursQuarter(row.totalHours)}</strong></span>
      <span>\u7dcf\u63a7\u9664\u6642\u9593: <strong>${Math.round(row.totalBreakMinutes || 0)}\u5206</strong></span>
      <span>\u5dee\u5f15\u652f\u7d66\u984d: <strong>${formatCurrency(row.netPay)}</strong></span>
    `;

    card.append(header, metrics);
    payrollList.appendChild(card);
  });
}

function renderPayrollDetail(data) {
  if (!payrollDetail) return;
  if (!data.rows.length) {
    payrollDetail.innerHTML = "";
    payrollDetail.appendChild(buildEmptyState("\u500b\u5225\u660e\u7d30\u3092\u8868\u793a\u3067\u304d\u308b\u30c7\u30fc\u30bf\u304c\u3042\u308a\u307e\u305b\u3093\u3002"));
    return;
  }

  if (!data.rows.some((row) => row.workerId === activePayrollWorkerId)) {
    activePayrollWorkerId = data.rows[0].workerId;
  }
  const selectedRow = data.rows.find((row) => row.workerId === activePayrollWorkerId) || data.rows[0];
  const periodText = getPayrollPeriodText(data.periodConfig);
  const dailyDetails = Array.isArray(selectedRow.dailyDetails) ? selectedRow.dailyDetails : [];

  const dayRowsHtml = dailyDetails.length
    ? dailyDetails.map((day) => `
      <article class="payroll-day-card">
        <div class="payroll-day-card__header">
          <h5>${escapeHtml(formatDateWithWeekdayJa(day.workDate))}</h5>
          <strong>${escapeHtml(formatCurrency(day.dayPay))}</strong>
        </div>
        <div class="payroll-day-card__grid">
          <div><span>\u4f5c\u696d\u5185\u5bb9</span><strong>${escapeHtml(day.workTypeText || "\u672a\u8a2d\u5b9a")}</strong></div>
          <div><span>\u52e4\u52d9\u6642\u9593\u5e2f</span><strong>${escapeHtml(day.timeRangeText || `${day.startTime || "--"}\u301c${day.endTime || "--"}`)}</strong></div>
          <div><span>\u958b\u59cb\u6642\u523b</span><strong>${escapeHtml(day.startTime || "--")}</strong></div>
          <div><span>\u7d42\u4e86\u6642\u523b</span><strong>${escapeHtml(day.endTime || "--")}</strong></div>
          <div><span>\u7d66\u4e0e\u8a08\u7b97\u304b\u3089\u9664\u5916\u3057\u305f\u6642\u9593</span><strong>${escapeHtml(String(Math.round(day.breakMinutes || 0)))}\u5206</strong></div>
          <div><span>\u5b9f\u52b4\u50cd\u6642\u9593</span><strong>${escapeHtml(formatHoursQuarter(day.workHours))}</strong></div>
          <div><span>\u6642\u7d66</span><strong>${escapeHtml(formatCurrency(day.hourlyRate || 0))}</strong></div>
          <div><span>\u65e5\u5225\u8cc3\u91d1</span><strong>${escapeHtml(formatCurrency(day.dayPay || 0))}</strong></div>
        </div>
      </article>
    `).join("")
    : `<div class="empty-state">\u3053\u306e\u671f\u9593\u306e\u51fa\u52e4\u660e\u7d30\u306f\u3042\u308a\u307e\u305b\u3093\u3002</div>`;

  payrollDetail.innerHTML = `
    <article class="payroll-detail-card">
      <div class="payroll-detail-card__header">
        <h4>${escapeHtml(selectedRow.fullName)}</h4>
        <span class="chip chip--soft">${escapeHtml(selectedRow.category || "\u533a\u5206\u672a\u8a2d\u5b9a")}</span>
      </div>
      <div class="payroll-detail-grid">
        <div><span>\u5bfe\u8c61\u671f\u9593</span><strong>${escapeHtml(periodText)}</strong></div>
        <div><span>\u7de0\u3081\u533a\u5206</span><strong>${escapeHtml(data.periodConfig.closeLabel)}</strong></div>
        <div><span>\u51fa\u52e4\u65e5\u6570</span><strong>${escapeHtml(formatDays(selectedRow.attendanceDays))}</strong></div>
        <div><span>\u7dcf\u5b9f\u52b4\u50cd\u6642\u9593</span><strong>${escapeHtml(formatHoursQuarter(selectedRow.totalHours))}</strong></div>
        <div><span>\u7dcf\u63a7\u9664\u6642\u9593</span><strong>${escapeHtml(String(Math.round(selectedRow.totalBreakMinutes || 0)))}\u5206</strong></div>
        <div><span>\u6642\u7d66</span><strong>${escapeHtml(formatCurrency(selectedRow.hourlyRate))}</strong></div>
        <div><span>\u57fa\u672c\u652f\u7d66\u984d</span><strong>${escapeHtml(formatCurrency(selectedRow.basicPay))}</strong></div>
      </div>
      <h5 class="payroll-day-section-title">\u65e5\u5225\u660e\u7d30</h5>
      <section class="payroll-day-list">${dayRowsHtml}</section>
      <section class="payroll-total-summary">
        <h5>\u5408\u8a08</h5>
        <div class="payroll-total-summary__grid">
          <div><span>\u51fa\u52e4\u65e5\u6570</span><strong>${escapeHtml(formatDays(selectedRow.attendanceDays))}</strong></div>
          <div><span>\u7dcf\u52b4\u50cd\u6642\u9593</span><strong>${escapeHtml(formatHoursQuarter(selectedRow.totalHours))}</strong></div>
          <div><span>\u57fa\u672c\u652f\u7d66\u984d</span><strong>${escapeHtml(formatCurrency(selectedRow.basicPay))}</strong></div>
          <div><span>\u624b\u5f53</span><strong>${escapeHtml(formatCurrency(selectedRow.allowance))}</strong></div>
          <div><span>\u63a7\u9664</span><strong>${escapeHtml(formatCurrency(selectedRow.deduction))}</strong></div>
          <div><span>\u5dee\u5f15\u652f\u7d66\u984d</span><strong>${escapeHtml(formatCurrency(selectedRow.netPay))}</strong></div>
        </div>
      </section>
      <div class="payroll-adjustment-row">
        <label>\u624b\u5f53\uff08\u5186\uff09<input type="number" id="payrollAllowanceInput" min="0" step="1" value="${selectedRow.allowance}"></label>
        <label>\u63a7\u9664\uff08\u5186\uff09<input type="number" id="payrollDeductionInput" min="0" step="1" value="${selectedRow.deduction}"></label>
      </div>
      <p class="payroll-netpay">\u5dee\u5f15\u652f\u7d66\u984d <strong>${escapeHtml(formatCurrency(selectedRow.netPay))}</strong></p>
      <p class="form-hint">\u5dee\u5f15\u652f\u7d66\u984d = \u57fa\u672c\u652f\u7d66\u984d + \u624b\u5f53 - \u63a7\u9664</p>
      <div class="payroll-detail-actions">
        <button type="button" class="button button--save" id="payrollAdjustmentSaveButton">\u624b\u5f53\u30fb\u63a7\u9664\u3092\u4fdd\u5b58</button>
        <button type="button" class="button button--view" id="payrollIndividualPrintButton">\u3053\u306e\u4eba\u306e\u660e\u7d30\u3092\u5370\u5237</button>
        <button type="button" class="button button--save" id="payrollIndividualPdfButton">\u3053\u306e\u4eba\u306e\u660e\u7d30\u3092PDF\u4fdd\u5b58</button>
      </div>
    </article>
  `;

  const allowanceInput = document.getElementById("payrollAllowanceInput");
  const deductionInput = document.getElementById("payrollDeductionInput");
  const saveButton = document.getElementById("payrollAdjustmentSaveButton");
  const printButton = document.getElementById("payrollIndividualPrintButton");
  const pdfButton = document.getElementById("payrollIndividualPdfButton");
  if (!allowanceInput || !deductionInput || !saveButton || !printButton || !pdfButton) return;

  saveButton.addEventListener("click", () => {
    upsertPayrollAdjustment(selectedRow.workerId, data.periodConfig, Number(allowanceInput.value || 0), Number(deductionInput.value || 0));
    renderPayrollSection();
  });
  printButton.addEventListener("click", () => openPayrollIndividualReportWindow(selectedRow, data.periodConfig, "print"));
  pdfButton.addEventListener("click", () => openPayrollIndividualReportWindow(selectedRow, data.periodConfig, "pdf"));
}

function renderPayrollSection() {
  if (!payrollPeriodInfo || !payrollList || !payrollDetail) return;
  const periodConfig = getPayrollPeriodConfig();
  if (payrollCustomRange) payrollCustomRange.hidden = periodConfig.closeType !== "custom";

  if (!periodConfig.isValid) {
    payrollPeriodInfo.textContent = periodConfig.error || "\u7d66\u4e0e\u671f\u9593\u3092\u6b63\u3057\u304f\u8a2d\u5b9a\u3057\u3066\u304f\u3060\u3055\u3044\u3002";
    if (payrollSummaryCards) payrollSummaryCards.innerHTML = "";
    payrollList.innerHTML = "";
    payrollList.appendChild(buildEmptyState("\u671f\u9593\u3092\u8a2d\u5b9a\u3059\u308b\u3068\u7d66\u4e0e\u4e00\u89a7\u3092\u8868\u793a\u3057\u307e\u3059\u3002"));
    payrollDetail.innerHTML = "";
    payrollDetail.appendChild(buildEmptyState("\u500b\u5225\u660e\u7d30\u3092\u8868\u793a\u3067\u304d\u308b\u30c7\u30fc\u30bf\u304c\u3042\u308a\u307e\u305b\u3093\u3002"));
    return;
  }

  const data = getPayrollData(periodConfig);
  payrollPeriodInfo.textContent = `${periodConfig.closeLabel} / ${getPayrollPeriodText(periodConfig)} / \u5bfe\u8c61: ${getPayrollWorkerScopeLabel(periodConfig.workerScope)}`;
  renderPayrollSummaryCards(data);
  renderPayrollList(data);
  renderPayrollDetail(data);
}

function exportPayrollCsv() {
  const data = getPayrollData(getPayrollPeriodConfig());
  if (!data.periodConfig.isValid) {
    window.alert(data.periodConfig.error || "\u7d66\u4e0e\u671f\u9593\u3092\u6b63\u3057\u304f\u8a2d\u5b9a\u3057\u3066\u304f\u3060\u3055\u3044\u3002");
    return;
  }
  if (!data.rows.length) {
    window.alert("CSV\u51fa\u529b\u3067\u304d\u308b\u7d66\u4e0e\u30c7\u30fc\u30bf\u304c\u3042\u308a\u307e\u305b\u3093\u3002");
    return;
  }

  const periodText = getPayrollPeriodText(data.periodConfig);
  const csvRows = [["\u4f5c\u696d\u8005\u540d","\u65e5\u4ed8","\u66dc\u65e5","\u4f5c\u696d\u5185\u5bb9","\u958b\u59cb\u6642\u523b","\u7d42\u4e86\u6642\u523b","\u63a7\u9664\u6642\u9593(\u5206)","\u5b9f\u52b4\u50cd\u6642\u9593","\u6642\u7d66","\u65e5\u5225\u8cc3\u91d1","\u5bfe\u8c61\u671f\u9593","\u7de0\u3081\u533a\u5206","\u884c\u7a2e\u5225"]];

  data.rows.forEach((row) => {
    (row.dailyDetails || []).forEach((day) => {
      csvRows.push([
        row.fullName,
        formatDateYmd(day.workDate),
        day.weekdayLabel || getWeekdayLabelJa(day.workDate),
        day.workTypeText || "\u672a\u8a2d\u5b9a",
        day.startTime || "",
        day.endTime || "",
        Math.round(day.breakMinutes || 0),
        Number((day.workHours || 0).toFixed(2)),
        row.hourlyRate,
        Math.round(day.dayPay || 0),
        periodText,
        data.periodConfig.closeLabel,
        "\u65e5\u5225\u660e\u7d30"
      ]);
    });

    csvRows.push([
      row.fullName,
      "",
      "",
      "\u671f\u9593\u5408\u8a08",
      "",
      "",
      Math.round(row.totalBreakMinutes || 0),
      Number((row.totalHours || 0).toFixed(2)),
      row.hourlyRate,
      Math.round(row.basicPay || 0),
      periodText,
      data.periodConfig.closeLabel,
      "\u5408\u8a08"
    ]);
  });

  csvRows.push(["\u5168\u4f53\u5408\u8a08","","","","","",Math.round(data.summary.totalBreakMinutes || 0),Number((data.summary.totalHours || 0).toFixed(2)),"",Math.round(data.summary.basicPay || 0),periodText,data.periodConfig.closeLabel,"\u5168\u4f53"]);

  const csv = csvRows.map((row) => row.map(escapeCsvValue).join(",")).join("\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `taiseien-payroll-detail-${data.periodConfig.from}_${data.periodConfig.to}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

function buildPayrollWorkerDailyRowsHtml(dailyDetails) {
  if (!dailyDetails.length) return `<tr><td colspan="10">\u5bfe\u8c61\u671f\u9593\u306e\u660e\u7d30\u304c\u3042\u308a\u307e\u305b\u3093\u3002</td></tr>`;
  return dailyDetails.map((day) => `
    <tr>
      <td>${escapeHtml(formatDateYmd(day.workDate))}</td>
      <td>${escapeHtml(day.weekdayLabel || getWeekdayLabelJa(day.workDate))}</td>
      <td>${escapeHtml(day.workTypeText || "\u672a\u8a2d\u5b9a")}</td>
      <td>${escapeHtml(day.timeRangeText || `${day.startTime || "--"}\u301c${day.endTime || "--"}`)}</td>
      <td>${escapeHtml(day.startTime || "--")}</td>
      <td>${escapeHtml(day.endTime || "--")}</td>
      <td>${escapeHtml(String(Math.round(day.breakMinutes || 0)))}\u5206</td>
      <td>${escapeHtml(formatHoursQuarter(day.workHours))}</td>
      <td>${escapeHtml(formatCurrency(day.hourlyRate || 0))}</td>
      <td>${escapeHtml(formatCurrency(day.dayPay || 0))}</td>
    </tr>
  `).join("");
}

function buildPayrollReportHtml(data, preferredAction = "print") {
  const periodText = getPayrollPeriodText(data.periodConfig);
  const scopeLabel = getPayrollWorkerScopeLabel(data.periodConfig.workerScope);
  const workerSections = data.rows.map((row) => `
    <section class="sheet-section">
      <h3>${escapeHtml(row.fullName)}${row.category ? `(${escapeHtml(row.category)})` : ""}</h3>
      <h4 class="detail-subtitle">\u65e5\u5225\u660e\u7d30</h4>
      <table>
        <thead><tr><th>\u65e5\u4ed8</th><th>\u66dc</th><th>\u4f5c\u696d\u5185\u5bb9</th><th>\u52e4\u52d9\u6642\u9593\u5e2f</th><th>\u958b\u59cb</th><th>\u7d42\u4e86</th><th>\u7d66\u4e0e\u8a08\u7b97\u304b\u3089\u9664\u5916\u3057\u305f\u6642\u9593</th><th>\u5b9f\u52b4\u50cd</th><th>\u6642\u7d66</th><th>\u65e5\u5225\u8cc3\u91d1</th></tr></thead>
        <tbody>${buildPayrollWorkerDailyRowsHtml(row.dailyDetails || [])}</tbody>
        <tfoot><tr><td colspan="7">\u671f\u9593\u5408\u8a08</td><td>${escapeHtml(formatHoursQuarter(row.totalHours))}</td><td>${escapeHtml(formatCurrency(row.hourlyRate || 0))}</td><td>${escapeHtml(formatCurrency(row.basicPay || 0))}</td></tr></tfoot>
      </table>
      <p class="worker-adjustment">\u624b\u5f53: ${escapeHtml(formatCurrency(row.allowance || 0))} / \u63a7\u9664: ${escapeHtml(formatCurrency(row.deduction || 0))} / \u5dee\u5f15\u652f\u7d66\u984d: ${escapeHtml(formatCurrency(row.netPay || 0))}</p>
    </section>
  `).join("");

  return `
    <html lang="ja"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>(\u682a)\u5927\u6210\u5712 \u7c21\u6613\u7d66\u4e0e\u660e\u7d30</title>
    <style>
      @page { size: A4 portrait; margin: 12mm; } * { box-sizing: border-box; }
      body { margin: 0; font-family: "Yu Gothic", "Hiragino Kaku Gothic ProN", sans-serif; color: #2f2921; background: #f6f3ec; }
      .toolbar { position: sticky; top: 0; z-index: 10; display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 12px 16px; border-bottom: 1px solid #d8d2c8; background: #ffffffee; }
      .toolbar h1 { margin: 0; font-size: 16px; } .actions { display: flex; gap: 8px; flex-wrap: wrap; }
      .button { border: 0; border-radius: 999px; min-height: 38px; padding: 8px 14px; cursor: pointer; font-size: 14px; }
      .button--print { background: #3f6f3f; color: #fff; } .button--pdf { background: #c6522f; color: #fff; } .button--close { background: #ece8de; color: #3c352f; }
      .sheet { width: min(210mm, 100%); margin: 0 auto; padding: 8mm 0 12mm; }
      .header { border: 1px solid #dfd8cd; border-radius: 4mm; background: #fff; padding: 5mm; margin-bottom: 3mm; }
      .app { margin: 0; font-size: 18px; } .title { margin: 2mm 0 1mm; font-size: 18px; } .meta { margin: 1mm 0; color: #5f564b; font-size: 13px; }
      .summary { display: grid; gap: 2mm; grid-template-columns: repeat(2, minmax(0, 1fr)); margin-top: 2.4mm; }
      .summary div { border: 1px solid #dfd8cd; border-radius: 3mm; background: #fff; padding: 2.5mm 3mm; display: grid; gap: 1mm; }
      .summary span { font-size: 11px; color: #61574b; } .summary strong { font-size: 14px; }
      .sheet-section { border: 1px solid #dfd8cd; border-radius: 4mm; background: #fff; padding: 4mm; margin-bottom: 3mm; }
      .sheet-section h3 { margin: 0 0 2mm; font-size: 16px; }
      .detail-subtitle { margin: 0 0 2mm; font-size: 13px; color: #4f463b; }
      table { width: 100%; border-collapse: collapse; } th, td { border: 1px solid #ddd3c3; padding: 5px 6px; font-size: 11px; text-align: center; }
      th { background: #f3eee3; } td:nth-child(3), th:nth-child(3) { text-align: left; } tfoot td { background: #faf6ee; font-weight: 700; }
      .worker-adjustment { margin: 2mm 0 0; font-size: 12px; color: #5a4d40; }
      @media (max-width: 720px) { .toolbar { position: static; padding: 10px 12px; } .actions { width: 100%; } .button { flex: 1; } .sheet { width: 100%; padding: 12px; } .summary { grid-template-columns: 1fr; } }
      @media print { body { background: #fff; } .toolbar { display: none; } .sheet { width: auto; margin: 0; padding: 0; } }
    </style></head>
    <body>
      <header class="toolbar"><h1>\u7c21\u6613\u7d66\u4e0e\u660e\u7d30(\u4e00\u89a7)</h1><div class="actions"><button class="button button--print" type="button" onclick="window.print()">\u5370\u5237</button><button class="button button--pdf" type="button" onclick="window.print()">PDF\u4fdd\u5b58</button><button class="button button--close" type="button" onclick="window.close()">\u9589\u3058\u308b</button></div></header>
      <main class="sheet">
        <section class="header">
          <p class="app">(\u682a)\u5927\u6210\u5712\u3000\u4f5c\u696d\u8a18\u9332\u30a2\u30d7\u30ea</p>
          <h2 class="title">\u7c21\u6613\u7d66\u4e0e\u660e\u7d30(\u4e00\u89a7)</h2>
          <p class="meta">\u5bfe\u8c61\u671f\u9593: ${escapeHtml(periodText)}</p>
          <p class="meta">\u7de0\u3081\u533a\u5206: ${escapeHtml(data.periodConfig.closeLabel)} / \u5bfe\u8c61: ${escapeHtml(scopeLabel)}</p>
          <div class="summary">
            <div><span>\u5bfe\u8c61\u4eba\u6570</span><strong>${escapeHtml(formatPeople(data.summary.workerCount || 0))}</strong></div>
            <div><span>\u51fa\u52e4\u65e5\u6570\u5408\u8a08</span><strong>${escapeHtml(formatDays(data.summary.attendanceDays || 0))}</strong></div>
            <div><span>\u7dcf\u5b9f\u52b4\u50cd\u6642\u9593</span><strong>${escapeHtml(formatHoursQuarter(data.summary.totalHours || 0))}</strong></div>
            <div><span>\u7dcf\u63a7\u9664\u6642\u9593</span><strong>${escapeHtml(String(Math.round(data.summary.totalBreakMinutes || 0)))}\u5206</strong></div>
            <div><span>\u57fa\u672c\u652f\u7d66\u984d\u5408\u8a08</span><strong>${escapeHtml(formatCurrency(data.summary.basicPay || 0))}</strong></div>
            <div><span>\u5dee\u5f15\u652f\u7d66\u984d\u5408\u8a08</span><strong>${escapeHtml(formatCurrency(data.summary.netPay || 0))}</strong></div>
          </div>
        </section>
        ${workerSections}
      </main>
      <script>(function(){const preferredAction=${JSON.stringify(preferredAction)};if(preferredAction==="pdf"){window.setTimeout(()=>window.print(),140);}})();</script>
    </body></html>
  `;
}

function openPayrollReportWindow(preferredAction = "print") {
  const data = getPayrollData(getPayrollPeriodConfig());
  if (!data.periodConfig.isValid) {
    window.alert(data.periodConfig.error || "\u7d66\u4e0e\u671f\u9593\u3092\u6b63\u3057\u304f\u8a2d\u5b9a\u3057\u3066\u304f\u3060\u3055\u3044\u3002");
    return;
  }
  if (!data.rows.length) {
    window.alert("\u8868\u793a\u30fb\u5370\u5237\u3067\u304d\u308b\u7d66\u4e0e\u30c7\u30fc\u30bf\u304c\u3042\u308a\u307e\u305b\u3093\u3002");
    return;
  }
  openGeneratedDocumentWindow(buildPayrollReportHtml(data, preferredAction), {
    width: 1280,
    height: 920,
    popupBlockedMessage: "\u7d66\u4e0e\u660e\u7d30\u306e\u8868\u793a\u753b\u9762\u3092\u958b\u3051\u307e\u305b\u3093\u3067\u3057\u305f\u3002"
  });
}

function buildPayrollIndividualReportHtml(row, periodConfig, preferredAction = "print") {
  const periodText = getPayrollPeriodText(periodConfig);
  const dailyDetails = Array.isArray(row?.dailyDetails) ? row.dailyDetails : [];
  return `
    <html lang="ja"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>(\u682a)\u5927\u6210\u5712 \u500b\u4eba\u5225\u7c21\u6613\u7d66\u4e0e\u660e\u7d30</title>
    <style>
      @page { size: A4 portrait; margin: 12mm; } * { box-sizing: border-box; }
      body { margin: 0; font-family: "Yu Gothic", "Hiragino Kaku Gothic ProN", sans-serif; color: #2f2921; background: #f6f3ec; }
      .toolbar { position: sticky; top: 0; z-index: 10; display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 12px 16px; border-bottom: 1px solid #d8d2c8; background: #ffffffee; }
      .toolbar h1 { margin: 0; font-size: 16px; } .actions { display: flex; gap: 8px; flex-wrap: wrap; }
      .button { border: 0; border-radius: 999px; min-height: 38px; padding: 8px 14px; cursor: pointer; font-size: 14px; }
      .button--print { background: #3f6f3f; color: #fff; } .button--pdf { background: #c6522f; color: #fff; } .button--close { background: #ece8de; color: #3c352f; }
      .sheet { width: min(210mm, 100%); margin: 0 auto; padding: 8mm 0 12mm; }
      .header { border: 1px solid #dfd8cd; border-radius: 4mm; background: #fff; padding: 5mm; margin-bottom: 3mm; }
      .app { margin: 0; font-size: 18px; } .title { margin: 2mm 0 1mm; font-size: 18px; } .meta { margin: 1mm 0; color: #5f564b; font-size: 13px; }
      .detail-subtitle { margin: 0 0 2mm; font-size: 13px; color: #4f463b; }
      .summary { display: grid; gap: 2mm; grid-template-columns: repeat(2, minmax(0, 1fr)); margin: 2.4mm 0 3mm; }
      .summary div { border: 1px solid #dfd8cd; border-radius: 3mm; background: #fff; padding: 2.5mm 3mm; display: grid; gap: 1mm; }
      .summary span { font-size: 11px; color: #61574b; } .summary strong { font-size: 14px; }
      table { width: 100%; border-collapse: collapse; background: #fff; }
      th, td { border: 1px solid #ddd3c3; padding: 6px 7px; font-size: 12px; text-align: center; }
      th { background: #f3eee3; } td:nth-child(3), th:nth-child(3) { text-align: left; } tfoot td { background: #faf6ee; font-weight: 700; }
      .netpay { margin-top: 3mm; border: 1px solid #dcb49b; border-radius: 3mm; background: #fff5ef; padding: 2.8mm 3.4mm; display: flex; justify-content: space-between; align-items: center; gap: 10px; }
      .netpay span { color: #7a4a34; font-weight: 700; } .netpay strong { color: #8f351e; font-size: 20px; }
      @media (max-width: 720px) { .toolbar { position: static; padding: 10px 12px; } .actions { width: 100%; } .button { flex: 1; } .sheet { width: 100%; padding: 12px; } .summary { grid-template-columns: 1fr; } }
      @media print { body { background: #fff; } .toolbar { display: none; } .sheet { width: auto; margin: 0; padding: 0; } }
    </style></head>
    <body>
      <header class="toolbar"><h1>\u500b\u4eba\u5225\u7c21\u6613\u7d66\u4e0e\u660e\u7d30</h1><div class="actions"><button class="button button--print" type="button" onclick="window.print()">\u5370\u5237</button><button class="button button--pdf" type="button" onclick="window.print()">PDF\u4fdd\u5b58</button><button class="button button--close" type="button" onclick="window.close()">\u9589\u3058\u308b</button></div></header>
      <main class="sheet">
        <section class="header">
          <p class="app">(\u682a)\u5927\u6210\u5712\u3000\u4f5c\u696d\u8a18\u9332\u30a2\u30d7\u30ea</p>
          <h2 class="title">\u500b\u4eba\u5225\u7c21\u6613\u7d66\u4e0e\u660e\u7d30</h2>
          <p class="meta">\u4f5c\u696d\u8005\u540d: ${escapeHtml(row.fullName || "")}</p>
          <p class="meta">\u5bfe\u8c61\u671f\u9593: ${escapeHtml(periodText)}</p>
          <p class="meta">\u7de0\u3081\u533a\u5206: ${escapeHtml(periodConfig.closeLabel || "")}</p>
          <div class="summary">
            <div><span>\u51fa\u52e4\u65e5\u6570</span><strong>${escapeHtml(formatDays(row.attendanceDays || 0))}</strong></div>
            <div><span>\u7dcf\u5b9f\u52b4\u50cd\u6642\u9593</span><strong>${escapeHtml(formatHoursQuarter(row.totalHours || 0))}</strong></div>
            <div><span>\u57fa\u672c\u652f\u7d66\u984d</span><strong>${escapeHtml(formatCurrency(row.basicPay || 0))}</strong></div>
            <div><span>\u6642\u7d66</span><strong>${escapeHtml(formatCurrency(row.hourlyRate || 0))}</strong></div>
            <div><span>\u624b\u5f53</span><strong>${escapeHtml(formatCurrency(row.allowance || 0))}</strong></div>
            <div><span>\u63a7\u9664</span><strong>${escapeHtml(formatCurrency(row.deduction || 0))}</strong></div>
            <div><span>\u5dee\u5f15\u652f\u7d66\u984d</span><strong>${escapeHtml(formatCurrency(row.netPay || 0))}</strong></div>
          </div>
        </section>
        <h3 class="detail-subtitle">\u65e5\u5225\u660e\u7d30</h3>
        <table>
          <thead><tr><th>\u65e5\u4ed8</th><th>\u66dc</th><th>\u4f5c\u696d\u5185\u5bb9</th><th>\u52e4\u52d9\u6642\u9593\u5e2f</th><th>\u958b\u59cb</th><th>\u7d42\u4e86</th><th>\u7d66\u4e0e\u8a08\u7b97\u304b\u3089\u9664\u5916\u3057\u305f\u6642\u9593</th><th>\u5b9f\u52b4\u50cd</th><th>\u6642\u7d66</th><th>\u65e5\u5225\u8cc3\u91d1</th></tr></thead>
          <tbody>${buildPayrollWorkerDailyRowsHtml(dailyDetails)}</tbody>
          <tfoot><tr><td colspan="7">\u671f\u9593\u5408\u8a08</td><td>${escapeHtml(formatHoursQuarter(row.totalHours || 0))}</td><td>${escapeHtml(formatCurrency(row.hourlyRate || 0))}</td><td>${escapeHtml(formatCurrency(row.basicPay || 0))}</td></tr></tfoot>
        </table>
        <div class="netpay"><span>\u5dee\u5f15\u652f\u7d66\u984d</span><strong>${escapeHtml(formatCurrency(row.netPay || 0))}</strong></div>
      </main>
      <script>(function(){const preferredAction=${JSON.stringify(preferredAction)};if(preferredAction==="pdf"){window.setTimeout(()=>window.print(),140);}})();</script>
    </body></html>
  `;
}

function openPayrollIndividualReportWindow(row, periodConfig, preferredAction = "print") {
  if (!row || !periodConfig) return;
  openGeneratedDocumentWindow(buildPayrollIndividualReportHtml(row, periodConfig, preferredAction), {
    width: 1080,
    height: 920,
    popupBlockedMessage: "\u500b\u4eba\u5225\u660e\u7d30\u306e\u8868\u793a\u753b\u9762\u3092\u958b\u3051\u307e\u305b\u3093\u3067\u3057\u305f\u3002"
  });
}
bindEvent(form, "submit", (event) => {
  event.preventDefault();
  if (!orchardSelect.value || !plotSelect.value || !varietySelect.value) {
    window.alert("園地・区画・品種をすべて選択してください、E);
    return;
  }
  if (!selectedTaskTypes.length) {
    setTaskTypeValidationState(true);
    window.alert("作業冁E��めEつ以上選択してください、E);
    return;
  }
  setTaskTypeValidationState(false);
  if (!groupSelect.value) {
    window.alert("そ�E日に参加するグループを選択してください、E);
    return;
  }
  if (!selectedWorkerIds.length) {
    window.alert("作業老E��1人以上選択してください、E);
    return;
  }
  const breakMinutesValue = getFormBreakMinutes(companySettings);
  const selectedShiftType = getSelectedFormShiftType();
  const manualHoursValue = getFormManualWorkHours(companySettings);
  if (!Number.isFinite(breakMinutesValue) || breakMinutesValue < 0 || breakMinutesValue > 600) {
    window.alert("カウントしなぁE��間（�E�E��E0、E00で入力してください、E);
    return;
  }
  if ((startTimeInput.value && !endTimeInput.value) || (!startTimeInput.value && endTimeInput.value)) {
    window.alert("開始時刻と終亁E��刻はセチE��で入力してください、E);
    return;
  }
  if (
    startTimeInput.value &&
    endTimeInput.value &&
    calculateHoursFromRange(startTimeInput.value, endTimeInput.value, companySettings, breakMinutesValue) === null
  ) {
    window.alert("終亁E��刻は開始時刻より後に設定してください、E);
    return;
  }
  if (selectedShiftType === WORK_SHIFT_TYPE.MANUAL && manualHoursValue === null && !Object.keys(workerTimeDetailsDraft || {}).length) {
    window.alert("勤務区分が「手入力」の場合は、実労働時間（手入力）を入力してください。");
    return;
  }
  pruneWorkerTimeDetailsDraft();
  const record = getFormData();
  if (selectedShiftType === WORK_SHIFT_TYPE.MANUAL && Number(record.workHours || 0) <= 0) {
    window.alert("勤務区分が「手入力」の場合は、実労働時間（手入力）を入力してください。");
    return;
  }
  const missingWorkerPayroll = getAssignedWorkers(record).some((worker) => {
    const detail = record.workerTimeDetails?.[worker.id] || {};
    const payrollHours = Number(detail.payrollHours ?? detail.manualHours ?? detail.calculatedHours ?? 0);
    return !Number.isFinite(payrollHours) || payrollHours <= 0;
  });
  if (missingWorkerPayroll) {
    window.alert("作業者ごとの勤務時間が不足しています。各作業者の実労働時間を確認してください。");
    return;
  }
  const index = records.findIndex((item) => item.id === record.id);
  if (index >= 0) records[index] = record;
  else records.push(record);
  saveState();
  resetRecordForm();
  render();
});

bindEvent(orchardSelect, "change", () => {
  renderPlotOptions(orchardSelect.value);
  recordWeatherInfo = null;
  clearWeatherDetailInputs();
  if (orchardSelect.value) {
    setWeatherFetchStatus(`入力�E容が変わりました。忁E��に応じて、E{WEATHER_FETCH_BUTTON_TEXT}」を押してください。`);
  } else {
    setWeatherFetchStatus(WEATHER_FETCH_HINT_TEXT);
  }
});
if (fetchWeatherButton) {
  fetchWeatherButton.addEventListener("click", handleFetchWeatherClick);
}
bindEvent(workDateInput, "change", () => {
  const teamPlan = getTeamPlan(workDateInput.value, groupSelect.value);
  if (teamPlan) {
    selectedWorkerIds = teamPlan.workerIds.slice();
    recordAppliedTeamSetId = teamPlan.fixedTeamSetId || "";
    recordAppliedTeamSetName = teamPlan.fixedTeamSetName || "";
  } else {
    const eligibleIds = new Set(getEligibleWorkersByGroup(groupSelect.value).map((worker) => worker.id));
    selectedWorkerIds = selectedWorkerIds.filter((workerId) => eligibleIds.has(workerId));
    recordAppliedTeamSetId = "";
    recordAppliedTeamSetName = "";
  }
  syncWorkerCountFromSelection();
  renderWorkerSelectionList();
});
bindEvent(groupSelect, "change", () => {
  const teamPlan = getTeamPlan(workDateInput.value, groupSelect.value);
  if (teamPlan) {
    selectedWorkerIds = teamPlan.workerIds.slice();
    recordAppliedTeamSetId = teamPlan.fixedTeamSetId || "";
    recordAppliedTeamSetName = teamPlan.fixedTeamSetName || "";
  } else {
    const eligibleIds = new Set(getEligibleWorkersByGroup(groupSelect.value).map((worker) => worker.id));
    selectedWorkerIds = selectedWorkerIds.filter((workerId) => eligibleIds.has(workerId));
    recordAppliedTeamSetId = "";
    recordAppliedTeamSetName = "";
  }
  syncWorkerCountFromSelection();
  renderWorkerSelectionList();
});
bindEvent(startTimeInput, "change", updateTimeHint);
bindEvent(endTimeInput, "change", updateTimeHint);
if (breakMinutesInput) {
  breakMinutesInput.addEventListener("input", updateTimeHint);
}
bindEvent(workHoursInput, "input", updateTimeHint);
if (workShiftTypeInput) {
  workShiftTypeInput.addEventListener("change", () => {
    applyShiftPresetToForm(workShiftTypeInput.value, true);
    updateTimeHint();
  });
}
if (applyStandardWorkTimeButton) {
  applyStandardWorkTimeButton.addEventListener("click", () => {
    applyShiftPresetToForm(WORK_SHIFT_TYPE.FULL_DAY, true);
    updateTimeHint();
  });
}
if (applyCommonTimeToWorkersButton) {
  applyCommonTimeToWorkersButton.addEventListener("click", () => {
    applyCommonTimeToSelectedWorkers();
    updateTimeHint();
  });
}
if (taskTypeSearchInput) {
  taskTypeSearchInput.addEventListener("input", () => {
    renderTaskTypeChecklist();
  });
}
if (clearTaskTypesButton) {
  clearTaskTypesButton.addEventListener("click", () => {
    setSelectedTaskTypes([]);
    setTaskTypeValidationState(false);
    renderTaskTypeChecklist();
  });
}
bindEvent(resetButton, "click", resetRecordForm);
bindEvent(orchardFilterInput, "change", renderRecords);
bindEvent(varietyFilterInput, "change", renderRecords);
bindEvent(taskFilterInput, "change", renderRecords);
bindEvent(workerFilterInput, "change", renderRecords);
if (workerSearchInput) {
  workerSearchInput.addEventListener("input", renderMasterLists);
}
if (workerGroupFilterInput) {
  workerGroupFilterInput.addEventListener("change", renderMasterLists);
}
if (todayMemberGroupFilterInput) {
  todayMemberGroupFilterInput.addEventListener("change", renderTodayMemberStatusBoard);
}
if (historyCalendarPrevButton) {
  historyCalendarPrevButton.addEventListener("click", () => {
    historyVisibleMonth = shiftMonthString(historyVisibleMonth, -1);
    if (!historySelectedDate.startsWith(historyVisibleMonth)) {
      historySelectedDate = `${historyVisibleMonth}-01`;
    }
    renderRecords();
  });
}
if (historyCalendarNextButton) {
  historyCalendarNextButton.addEventListener("click", () => {
    historyVisibleMonth = shiftMonthString(historyVisibleMonth, 1);
    if (!historySelectedDate.startsWith(historyVisibleMonth)) {
      historySelectedDate = `${historyVisibleMonth}-01`;
    }
    renderRecords();
  });
}
if (historyCalendarTodayButton) {
  historyCalendarTodayButton.addEventListener("click", () => {
    historySelectedDate = today;
    historyVisibleMonth = today.slice(0, 7);
    renderRecords();
  });
}
bindEvent(exportButton, "click", exportCsvWithTemperature);
if (shortcutMonthlyReportButton) {
  shortcutMonthlyReportButton.addEventListener("click", () => {
    setSettingsSection("company", {
      switchToSettingsView: true,
      scrollIntoView: true,
      focusElement: fiscalClosingMonthInput
    });
  });
}
if (settingsMenuButtons.length) {
  settingsMenuButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetSection = button.dataset.settingsTarget;
      setSettingsSection(targetSection, {
        switchToSettingsView: true,
        scrollIntoView: true
      });
    });
  });
}
if (settingsNavButtons.length) {
  settingsNavButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.settingsNav;
      if (target === "home") {
        setAppView("home", { scrollIntoView: true, focusElement: shortcutRecordFormButton });
        return;
      }
      setSettingsSection("top", { switchToSettingsView: true, scrollIntoView: true, focusElement: settingsMenuCompanyButton });
    });
  });
}
if (summaryMenuButtons.length) {
  summaryMenuButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetSection = button.dataset.summaryTarget;
      setSummarySection(targetSection, {
        switchToSummaryView: true,
        scrollIntoView: true
      });
    });
  });
}
if (summaryNavButtons.length) {
  summaryNavButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.summaryNav;
      if (target === "home") {
        setAppView("home", { scrollIntoView: true, focusElement: shortcutRecordFormButton });
        return;
      }
      setSummarySection("top", { switchToSummaryView: true, scrollIntoView: true, focusElement: summaryMenuDailyButton });
    });
  });
}
if (dailyReportPreviewButton) {
  dailyReportPreviewButton.addEventListener("click", openDailyReportWindow);
}
if (dailyReportPdfButton) {
  dailyReportPdfButton.addEventListener("click", () => openDailyReportWindow("pdf"));
}
if (dailyReportShareButton) {
  dailyReportShareButton.addEventListener("click", shareDailyReportFromMainPage);
}
if (monthlyReportPreviewButton) {
  monthlyReportPreviewButton.addEventListener("click", openMonthlyReportWindow);
}
if (monthlyReportPdfButton) {
  monthlyReportPdfButton.addEventListener("click", () => openMonthlyReportWindow("pdf"));
}
if (monthlyReportShareButton) {
  monthlyReportShareButton.addEventListener("click", shareMonthlyReportFromMainPage);
}
if (monthlyReportExportButton) {
  monthlyReportExportButton.addEventListener("click", exportMonthlyReportCsv);
}
if (payrollRefreshButton) {
  payrollRefreshButton.addEventListener("click", renderPayrollSection);
}
if (payrollExportButton) {
  payrollExportButton.addEventListener("click", exportPayrollCsv);
}
if (payrollPrintButton) {
  payrollPrintButton.addEventListener("click", () => openPayrollReportWindow("print"));
}
if (payrollPdfButton) {
  payrollPdfButton.addEventListener("click", () => openPayrollReportWindow("pdf"));
}
if (taskReportPreviewButton) {
  taskReportPreviewButton.addEventListener("click", openTaskTypeReportWindow);
}
if (taskReportExportButton) {
  taskReportExportButton.addEventListener("click", exportTaskTypeReportCsv);
}
if (varietyReportPreviewButton) {
  varietyReportPreviewButton.addEventListener("click", openVarietyTypeReportWindow);
}
if (varietyReportExportButton) {
  varietyReportExportButton.addEventListener("click", exportVarietyTypeReportCsv);
}
if (annualReportPreviewButton) {
  annualReportPreviewButton.addEventListener("click", openAnnualReportWindow);
}
if (annualReportPdfButton) {
  annualReportPdfButton.addEventListener("click", () => openAnnualReportWindow("pdf"));
}
if (annualReportShareButton) {
  annualReportShareButton.addEventListener("click", shareAnnualReportFromMainPage);
}
if (annualReportExportButton) {
  annualReportExportButton.addEventListener("click", exportAnnualReportCsv);
}
if (worktimePrintButton) {
  worktimePrintButton.addEventListener("click", () => openWorktimeReportWindow("print", activeWorktimeTab));
}
if (worktimePdfButton) {
  worktimePdfButton.addEventListener("click", () => openWorktimeReportWindow("pdf", activeWorktimeTab));
}
if (worktimePersonalCsvButton) {
  worktimePersonalCsvButton.addEventListener("click", exportWorktimePersonalCsv);
}
if (worktimeOverallCsvButton) {
  worktimeOverallCsvButton.addEventListener("click", exportWorktimeOverallCsv);
}
bindEvent(comparisonExportButton, "click", exportCumulativeComparisonCsv);
bindEvent(qrScanButton, "click", openQrScanner);
if (openOrchardQrSheetButton) {
  openOrchardQrSheetButton.addEventListener("click", () => openQrLabelSheet("orchard"));
}
if (openPlotQrSheetButton) {
  openPlotQrSheetButton.addEventListener("click", () => openQrLabelSheet("plot"));
}
if (openOrchardQrSimpleSheetButton) {
  openOrchardQrSimpleSheetButton.addEventListener("click", () => openQrLabelSheet("orchard", "simple"));
}
if (openPlotQrSimpleSheetButton) {
  openPlotQrSimpleSheetButton.addEventListener("click", () => openQrLabelSheet("plot", "simple"));
}
if (openOrchardQrSheetPdfButton) {
  openOrchardQrSheetPdfButton.addEventListener("click", () => openQrLabelSheet("orchard", "standard", "pdf"));
}
if (openPlotQrSheetPdfButton) {
  openPlotQrSheetPdfButton.addEventListener("click", () => openQrLabelSheet("plot", "standard", "pdf"));
}
if (openOrchardQrSimpleSheetPdfButton) {
  openOrchardQrSimpleSheetPdfButton.addEventListener("click", () => openQrLabelSheet("orchard", "simple", "pdf"));
}
if (openPlotQrSimpleSheetPdfButton) {
  openPlotQrSimpleSheetPdfButton.addEventListener("click", () => openQrLabelSheet("plot", "simple", "pdf"));
}
if (qrFilterOrchardInput) {
  qrFilterOrchardInput.addEventListener("input", renderQrCodeList);
}
if (qrFilterPlotInput) {
  qrFilterPlotInput.addEventListener("input", renderQrCodeList);
}
if (qrFilterVarietyInput) {
  qrFilterVarietyInput.addEventListener("input", renderQrCodeList);
}
if (qrFilterCodeInput) {
  qrFilterCodeInput.addEventListener("input", renderQrCodeList);
}
if (qrFilterTypeInput) {
  qrFilterTypeInput.addEventListener("change", renderQrCodeList);
}
bindEvent(backupButton, "click", downloadJsonBackup);
bindEvent(restoreButton, "click", () => restoreInput?.click());
bindEvent(restoreInput, "change", handleRestoreFile);
if (resetAllDataButton) {
  resetAllDataButton.addEventListener("click", resetAllDataToSeedState);
}
bindEvent(comparisonPeriodInput, "change", renderCumulativeComparison);
bindEvent(comparisonSortMetricInput, "change", renderCumulativeComparison);
bindEvent(comparisonSortOrderInput, "change", renderCumulativeComparison);
bindEvent(comparisonFromDateInput, "change", renderCumulativeComparison);
bindEvent(comparisonToDateInput, "change", renderCumulativeComparison);
if (payrollCloseTypeInput) {
  payrollCloseTypeInput.addEventListener("change", renderPayrollSection);
}
if (payrollTargetMonthInput) {
  payrollTargetMonthInput.addEventListener("change", renderPayrollSection);
}
if (payrollWorkerScopeInput) {
  payrollWorkerScopeInput.addEventListener("change", renderPayrollSection);
}
if (payrollFromDateInput) {
  payrollFromDateInput.addEventListener("change", renderPayrollSection);
}
if (payrollToDateInput) {
  payrollToDateInput.addEventListener("change", renderPayrollSection);
}
if (worktimeQuickButtons.length) {
  worktimeQuickButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (!worktimePeriodModeInput) return;
      worktimePeriodModeInput.value = normalizeWorktimePeriodMode(button.dataset.worktimePeriod || "week");
      renderWorktimeAnalysis();
    });
  });
}
if (worktimeTabButtons.length) {
  worktimeTabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const nextTab = button.dataset.worktimeTab === "overall" ? "overall" : "personal";
      activeWorktimeTab = nextTab;
      renderWorktimeAnalysis();
    });
  });
}
if (worktimeWorkerSelect) {
  worktimeWorkerSelect.addEventListener("change", () => {
    activeWorktimeWorkerId = worktimeWorkerSelect.value;
    renderWorktimeAnalysis();
  });
}
if (worktimeFromDateInput) {
  worktimeFromDateInput.addEventListener("change", renderWorktimeAnalysis);
}
if (worktimeToDateInput) {
  worktimeToDateInput.addEventListener("change", renderWorktimeAnalysis);
}
if (taskReportPeriodInput) {
  taskReportPeriodInput.addEventListener("change", renderTaskTypeReport);
}
if (taskReportSortMetricInput) {
  taskReportSortMetricInput.addEventListener("change", renderTaskTypeReport);
}
if (taskReportSortOrderInput) {
  taskReportSortOrderInput.addEventListener("change", renderTaskTypeReport);
}
if (taskReportFromDateInput) {
  taskReportFromDateInput.addEventListener("change", renderTaskTypeReport);
}
if (taskReportToDateInput) {
  taskReportToDateInput.addEventListener("change", renderTaskTypeReport);
}
if (varietyReportPeriodInput) {
  varietyReportPeriodInput.addEventListener("change", renderVarietyTypeReport);
}
if (varietyReportSortMetricInput) {
  varietyReportSortMetricInput.addEventListener("change", renderVarietyTypeReport);
}
if (varietyReportSortOrderInput) {
  varietyReportSortOrderInput.addEventListener("change", renderVarietyTypeReport);
}
if (varietyReportFromDateInput) {
  varietyReportFromDateInput.addEventListener("change", renderVarietyTypeReport);
}
if (varietyReportToDateInput) {
  varietyReportToDateInput.addEventListener("change", renderVarietyTypeReport);
}
if (annualReportSortMetricInput) {
  annualReportSortMetricInput.addEventListener("change", renderAnnualReport);
}
if (annualReportSortOrderInput) {
  annualReportSortOrderInput.addEventListener("change", renderAnnualReport);
}
bindEvent(qrScannerCloseButton, "click", closeQrScanner);
bindEvent(qrScannerDialog, "close", stopQrScannerStream);
bindEvent(qrManualApplyButton, "click", () => {
  const value = qrManualInput.value.trim();
  if (!value) {
    window.alert("手�E力コードを入力してください、E);
    return;
  }
  handleQrDecodedValue(value);
});

bindEvent(orchardForm, "submit", (event) => {
  event.preventDefault();
  const id = orchardIdInput.value || createId("orchard");
  const name = orchardNameInput.value.trim();
  const managementCode = normalizeManagementCode(orchardCodeInput.value);
  const latitudeText = normalizeText(orchardLatitudeInput?.value);
  const longitudeText = normalizeText(orchardLongitudeInput?.value);
  const latitude = latitudeText ? normalizeLatitude(latitudeText) : null;
  const longitude = longitudeText ? normalizeLongitude(longitudeText) : null;
  const note = orchardNoteInput.value.trim();
  if (masters.orchards.some((item) => item.name === name && item.id !== id)) {
    window.alert("同じ園地名がすでに登録されてぁE��す、E);
    return;
  }
  if (managementCode && masters.orchards.some((item) => normalizeManagementCode(item.managementCode) === managementCode && item.id !== id)) {
    window.alert("同じ園地管琁E��ードがすでに登録されてぁE��す、E);
    return;
  }
  if (latitudeText && !Number.isFinite(latitude)) {
    window.alert("緯度は -90 、E90 の篁E��で入力してください、E);
    return;
  }
  if (longitudeText && !Number.isFinite(longitude)) {
    window.alert("経度は -180 、E180 の篁E��で入力してください、E);
    return;
  }
  const orchard = { id, name, managementCode, latitude, longitude, note };
  const index = masters.orchards.findIndex((item) => item.id === id);
  if (index >= 0) masters.orchards[index] = orchard;
  else masters.orchards.push(orchard);
  saveState();
  resetOrchardForm();
  render();
});

bindEvent(plotForm, "submit", (event) => {
  event.preventDefault();
  const id = plotIdInput.value || createId("plot");
  const orchardId = plotOrchardInput.value;
  const name = plotNameInput.value.trim();
  const managementCode = normalizeManagementCode(plotCodeInput.value);
  const note = plotNoteInput.value.trim();
  if (masters.plots.some((item) => item.orchardId === orchardId && item.name === name && item.id !== id)) {
    window.alert("同じ園地に同名の区画が登録されてぁE��す、E);
    return;
  }
  if (managementCode && masters.plots.some((item) => normalizeManagementCode(item.managementCode) === managementCode && item.id !== id)) {
    window.alert("同じ区画管琁E��ードがすでに登録されてぁE��す、E);
    return;
  }
  const plot = { id, orchardId, name, managementCode, note };
  const index = masters.plots.findIndex((item) => item.id === id);
  if (index >= 0) masters.plots[index] = plot;
  else masters.plots.push(plot);
  saveState();
  resetPlotForm();
  render();
});

bindEvent(varietyForm, "submit", (event) => {
  event.preventDefault();
  const id = varietyIdInput.value || createId("variety");
  const name = varietyNameInput.value.trim();
  const note = varietyNoteInput.value.trim();
  if (masters.varieties.some((item) => item.name === name && item.id !== id)) {
    window.alert("同じ品種名がすでに登録されてぁE��す、E);
    return;
  }
  const variety = { id, name, note };
  const index = masters.varieties.findIndex((item) => item.id === id);
  if (index >= 0) masters.varieties[index] = variety;
  else masters.varieties.push(variety);
  saveState();
  resetVarietyForm();
  render();
});

bindEvent(groupForm, "submit", (event) => {
  event.preventDefault();
  const id = groupIdInput.value || createId("group");
  const name = groupNameInput.value.trim();
  const sortOrder = Number(groupSortOrderInput.value || masters.groups.length + 1);
  const description = groupDescriptionInput.value.trim();
  const isActive = groupIsActiveInput.checked;
  const selectedMemberIds = [...new Set(selectedGroupMemberWorkerIds)].filter((workerId) => Boolean(getWorkerById(workerId)));
  if (masters.groups.some((item) => item.name === name && item.id !== id)) {
    window.alert("同じグループ名がすでに登録されてぁE��す、E);
    return;
  }
  const group = { id, name, sortOrder, description, isActive };
  const index = masters.groups.findIndex((item) => item.id === id);
  if (index >= 0) {
    masters.groups[index] = group;
    records = records.map((record) => record.dailyGroupId === id ? { ...record, dailyGroupName: group.name } : record);
  } else {
    masters.groups.push(group);
  }

  const previousPrimaryByWorkerId = new Map(masters.workers.map((worker) => [worker.id, worker.primaryGroupId || ""]));
  masters.workerGroupMemberships = masters.workerGroupMemberships.filter((membership) => membership.groupId !== id);
  selectedMemberIds.forEach((workerId) => {
    masters.workerGroupMemberships.push({
      id: createId("membership"),
      workerId,
      groupId: id,
      isPrimary: false
    });
  });
  syncWorkerPrimaryGroupsFromMemberships(previousPrimaryByWorkerId);

  saveState();
  resetGroupForm();
  render();
});

bindEvent(teamSetGroupIdInput, "change", () => {
  selectedTeamSetWorkerIds = selectedTeamSetWorkerIds.filter((workerId) => getWorkerById(workerId)?.isActive);
  renderTeamSetWorkerList();
});

bindEvent(teamSetForm, "submit", (event) => {
  event.preventDefault();
  const id = teamSetIdInput.value || createId("team-set");
  const name = teamSetNameInput.value.trim();
  const groupId = teamSetGroupIdInput.value;
  const workerIds = [...new Set(selectedTeamSetWorkerIds)];
  if (!name || !groupId) {
    window.alert("セチE��名と作業グループを入力してください、E);
    return;
  }
  if (!workerIds.length) {
    window.alert("固定チームセチE��には作業老E��1人以上登録してください、E);
    return;
  }
  if (masters.fixedTeamSets.some((item) => item.name === name && item.id !== id)) {
    window.alert("同じセチE��名がすでに登録されてぁE��す、E);
    return;
  }
  const teamSet = { id, name, groupId, workerIds };
  const index = masters.fixedTeamSets.findIndex((item) => item.id === id);
  if (index >= 0) masters.fixedTeamSets[index] = teamSet;
  else masters.fixedTeamSets.push(teamSet);
  teamPlans = teamPlans.map((plan) => plan.fixedTeamSetId === id ? { ...plan, fixedTeamSetName: name } : plan);
  records = records.map((record) => record.fixedTeamSetId === id ? { ...record, fixedTeamSetName: name } : record);
  saveState();
  resetTeamSetForm();
  render();
});

bindEvent(workerForm, "submit", (event) => {
  event.preventDefault();
  const id = workerIdInput.value || createId("worker");
  const fullName = workerFullNameInput.value.trim();
  const displayName = workerDisplayNameInput.value.trim();
  const category = workerCategoryInput.value;
  const hourlyRate = Number(workerHourlyRateInput.value || 0);
  const isActive = workerIsActiveInput.checked;
  if (masters.workers.some((item) => item.fullName === fullName && item.id !== id)) {
    window.alert("同じ氏名の作業老E��すでに登録されてぁE��す。重褁E��録しなぁE��用です、E);
    return;
  }
  const current = masters.workers.find((item) => item.id === id);
  const worker = { id, fullName, displayName, primaryGroupId: current?.primaryGroupId || "", category, hourlyRate, isActive };
  const index = masters.workers.findIndex((item) => item.id === id);
  if (index >= 0) masters.workers[index] = worker;
  else masters.workers.push(worker);
  saveState();
  resetWorkerForm();
  render();
});

bindEvent(membershipWorkerIdInput, "change", () => {
  selectedMembershipGroupIds = [];
  membershipPrimaryGroupIdInput.value = "";
  renderMembershipGroupList();
});

bindEvent(membershipForm, "submit", (event) => {
  event.preventDefault();
  const workerId = membershipWorkerIdInput.value;
  if (!workerId) {
    window.alert("作業老E��選択してください、E);
    return;
  }
  if (!selectedMembershipGroupIds.length) {
    window.alert("所属グループを1つ以上選択してください、E);
    return;
  }
  if (!membershipPrimaryGroupIdInput.value || !selectedMembershipGroupIds.includes(membershipPrimaryGroupIdInput.value)) {
    window.alert("主所属グループを選択してください、E);
    return;
  }

  masters.workerGroupMemberships = masters.workerGroupMemberships.filter((membership) => membership.workerId !== workerId);
  selectedMembershipGroupIds.forEach((groupId) => {
    masters.workerGroupMemberships.push({
      id: createId("membership"),
      workerId,
      groupId,
      isPrimary: groupId === membershipPrimaryGroupIdInput.value
    });
  });
  masters.workers = masters.workers.map((worker) => worker.id === workerId ? { ...worker, primaryGroupId: membershipPrimaryGroupIdInput.value } : worker);
  saveState();
  resetMembershipForm();
  render();
});

bindEvent(teamPlanDateInput, "change", () => {
  selectedTeamPlanWorkerIds = [];
  teamPlanIdInput.value = "";
  renderTeamPlanWorkerList();
});

bindEvent(teamPlanGroupInput, "change", () => {
  selectedTeamPlanWorkerIds = [];
  teamPlanIdInput.value = "";
  renderTeamPlanWorkerList();
});

bindEvent(teamSetSelectInput, "change", () => {
  const selected = getTeamSetById(teamSetSelectInput.value);
  teamSetHint.textContent = selected
    ? `現在選択中: ${selected.name}�E�忁E��に応じて欠勤老E��外し、応援老E��追加できます）`
    : "固定チームセチE��を呼び出すと、参加老E��一括で反映できます、E;
});

bindEvent(teamPlanForm, "submit", (event) => {
  event.preventDefault();
  if (!teamPlanDateInput.value || !teamPlanGroupInput.value) {
    window.alert("編成日と作業グループを選択してください、E);
    return;
  }
  const selectedTeamSet = getTeamSetById(teamSetSelectInput.value);
  const plan = {
    id: teamPlanIdInput.value || getTeamPlan(teamPlanDateInput.value, teamPlanGroupInput.value)?.id || createId("team-plan"),
    workDate: teamPlanDateInput.value,
    groupId: teamPlanGroupInput.value,
    fixedTeamSetId: selectedTeamSet?.id || "",
    fixedTeamSetName: selectedTeamSet?.name || "",
    workerIds: [...new Set(selectedTeamPlanWorkerIds)],
    updatedAt: new Date().toISOString()
  };
  const existingIndex = teamPlans.findIndex((item) => item.id === plan.id || (item.workDate === plan.workDate && item.groupId === plan.groupId));
  if (existingIndex >= 0) teamPlans[existingIndex] = plan;
  else teamPlans.push(plan);
  saveState();
  applyTeamPlanToRecordForm(plan);
  resetTeamPlanForm();
  render();
});

bindEvent(teamPlanCopyButton, "click", () => {
  if (!teamPlanDateInput.value || !teamPlanGroupInput.value) {
    window.alert("先に編成日と作業グループを選択してください、E);
    return;
  }
  const previousPlan = getLatestPreviousTeamPlan(teamPlanDateInput.value, teamPlanGroupInput.value);
  if (!previousPlan) {
    window.alert("コピ�Eできる前回編成がありません、E);
    return;
  }
  teamSetSelectInput.value = previousPlan.fixedTeamSetId || "";
  selectedTeamPlanWorkerIds = previousPlan.workerIds.slice();
  renderTeamPlanWorkerList();
});

bindEvent(teamPlanLoadSetButton, "click", () => {
  if (!teamPlanGroupInput.value) {
    window.alert("先に作業グループを選択してください、E);
    return;
  }
  const selectedTeamSet = getTeamSetById(teamSetSelectInput.value);
  if (!selectedTeamSet) {
    window.alert("呼び出す固定チームセチE��を選択してください、E);
    return;
  }
  selectedTeamPlanWorkerIds = selectedTeamSet.workerIds.slice();
  renderTeamPlanWorkerList();
});

bindEvent(teamPlanApplyButton, "click", () => {
  if (!teamPlanDateInput.value || !teamPlanGroupInput.value) {
    window.alert("先に編成日と作業グループを選択してください、E);
    return;
  }
  const selectedTeamSet = getTeamSetById(teamSetSelectInput.value);
  const plan = {
    id: teamPlanIdInput.value || createId("team-plan-preview"),
    workDate: teamPlanDateInput.value,
    groupId: teamPlanGroupInput.value,
    fixedTeamSetId: selectedTeamSet?.id || "",
    fixedTeamSetName: selectedTeamSet?.name || "",
    workerIds: selectedTeamPlanWorkerIds.slice(),
    updatedAt: new Date().toISOString()
  };
  applyTeamPlanToRecordForm(plan);
  moveToShortcut(recordFormPanel, workDateInput);
});

bindEvent(teamPlanResetButton, "click", () => {
  resetTeamPlanForm();
  renderTeamPlanWorkerList();
});

bindEvent(orchardResetButton, "click", resetOrchardForm);
bindEvent(plotResetButton, "click", resetPlotForm);
bindEvent(varietyResetButton, "click", resetVarietyForm);
bindEvent(groupResetButton, "click", () => {
  resetGroupForm();
  renderGroupMemberList();
});
bindEvent(teamSetResetButton, "click", () => {
  resetTeamSetForm();
  renderTeamSetWorkerList();
});
bindEvent(workerResetButton, "click", resetWorkerForm);
bindEvent(membershipResetButton, "click", () => {
  resetMembershipForm();
  renderMembershipGroupList();
});

if (companySettingsForm) {
  companySettingsForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const monthValue = Number(fiscalClosingMonthInput.value || 0);
    const dayValue = Number(fiscalClosingDayInput.value || 0);
    const baseTemperatureValue = normalizeOptionalNumber(
      degreeDayBaseTemperatureInput?.value ?? companySettings.degreeDayBaseTemperatureC
    );
    const startTimeValue = normalizeTimeText(workdayStartTimeInput?.value, "");
    const endTimeValue = normalizeTimeText(workdayEndTimeInput?.value, "");
    const breakMinutesValue = Number(workdayBreakMinutesInput?.value ?? companySettings.workdayBreakMinutes);
    const timeUnitMinutesValue = Number(payrollTimeUnitMinutesInput?.value ?? companySettings.payrollTimeUnitMinutes);
    if (!Number.isFinite(monthValue) || monthValue < 1 || monthValue > 12) {
      window.alert("決算締月�E1、E2で入力してください、E);
      return;
    }
    if (!Number.isFinite(dayValue) || dayValue < 1 || dayValue > 31) {
      window.alert("決算締日は1、E1で入力してください、E);
      return;
    }
    if (!Number.isFinite(baseTemperatureValue)) {
      window.alert("\u7a4d\u7b97\u6e29\u5ea6\u306e\u57fa\u6e96\u6e29\u5ea6\u3092\u6570\u5024\u3067\u5165\u529b\u3057\u3066\u304f\u3060\u3055\u3044\u3002");
      return;
    }
    if (!startTimeValue || !endTimeValue) {
      window.alert("標準�E勤時刻と標準退勤時刻を�E力してください、E);
      return;
    }
    if (parseTimeToMinutes(endTimeValue) <= parseTimeToMinutes(startTimeValue)) {
      window.alert("標準退勤時刻は標準�E勤時刻より後に設定してください、E);
      return;
    }
    if (!Number.isFinite(breakMinutesValue) || breakMinutesValue < 0 || breakMinutesValue > 300) {
      window.alert("休�E時間は0、E00刁E��入力してください、E);
      return;
    }
    if (![15, 30].includes(timeUnitMinutesValue)) {
      window.alert("時間計算�E丸め単位�E15刁E��た�E30刁E��選択してください、E);
      return;
    }
    companySettings = normalizeCompanySettings({
      fiscalClosingMonth: monthValue,
      fiscalClosingDay: dayValue,
      degreeDayBaseTemperatureC: baseTemperatureValue,
      workdayStartTime: startTimeValue,
      workdayEndTime: endTimeValue,
      workdayBreakMinutes: breakMinutesValue,
      payrollTimeUnitMinutes: timeUnitMinutesValue
    });
    saveState();
    applyDefaultWorkScheduleToForm(true);
    render();
  });

  const updatePreview = () => {
    const previewMonth = Number(fiscalClosingMonthInput.value || companySettings.fiscalClosingMonth);
    const previewDay = Number(fiscalClosingDayInput.value || companySettings.fiscalClosingDay);
    const previewBaseTemperature = normalizeOptionalNumber(
      degreeDayBaseTemperatureInput?.value ?? companySettings.degreeDayBaseTemperatureC
    );
    const previewStartTime = normalizeTimeText(workdayStartTimeInput?.value || companySettings.workdayStartTime, companySettings.workdayStartTime);
    const previewEndTime = normalizeTimeText(workdayEndTimeInput?.value || companySettings.workdayEndTime, companySettings.workdayEndTime);
    const previewBreakMinutes = Number(workdayBreakMinutesInput?.value ?? companySettings.workdayBreakMinutes);
    const previewTimeUnitMinutes = Number(payrollTimeUnitMinutesInput?.value ?? companySettings.payrollTimeUnitMinutes);
    const previewSettings = normalizeCompanySettings({
      fiscalClosingMonth: previewMonth,
      fiscalClosingDay: previewDay,
      degreeDayBaseTemperatureC: previewBaseTemperature,
      workdayStartTime: previewStartTime,
      workdayEndTime: previewEndTime,
      workdayBreakMinutes: previewBreakMinutes,
      payrollTimeUnitMinutes: previewTimeUnitMinutes
    });
    const currentSettings = companySettings;
    companySettings = previewSettings;
    const fiscalRange = getFiscalYearRange(today);
    companySettings = currentSettings;
    const baseTemperatureText = Number(previewSettings.degreeDayBaseTemperatureC).toFixed(1).replace(/\.0$/, "");
    const breakText = `${Math.floor(previewSettings.workdayBreakMinutes / 60)}時間${String(previewSettings.workdayBreakMinutes % 60).padStart(2, "0")}刁E;
    const defaultHours = getDefaultWorkHours(previewSettings);
    const effectiveTimeUnitMinutes = previewSettings.payrollTimeUnitMinutes === 30 ? 15 : previewSettings.payrollTimeUnitMinutes;
    companyFiscalYearPreview.textContent = `\u73fe\u5728\u306e\u6c7a\u7b97\u5e74\u5ea6: ${formatDateYmd(fiscalRange.from)}\u301c${formatDateYmd(fiscalRange.to)} / \u7a4d\u7b97\u6e29\u5ea6\u57fa\u6e96: ${baseTemperatureText}\u2103 / \u6a19\u6e96\u52e4\u52d9: ${previewSettings.workdayStartTime}\u301c${previewSettings.workdayEndTime}\uff08\u4f11\u61a9 ${breakText}\uff09= ${defaultHours}\u6642\u9593 / \u4e38\u3081: ${effectiveTimeUnitMinutes}\u5206`;
  };
  bindEvent(fiscalClosingMonthInput, "input", updatePreview);
  bindEvent(fiscalClosingDayInput, "input", updatePreview);
  if (degreeDayBaseTemperatureInput) {
    degreeDayBaseTemperatureInput.addEventListener("input", updatePreview);
  }
  if (workdayStartTimeInput) {
    workdayStartTimeInput.addEventListener("input", updatePreview);
  }
  if (workdayEndTimeInput) {
    workdayEndTimeInput.addEventListener("input", updatePreview);
  }
  if (workdayBreakMinutesInput) {
    workdayBreakMinutesInput.addEventListener("input", updatePreview);
  }
  if (payrollTimeUnitMinutesInput) {
    payrollTimeUnitMinutesInput.addEventListener("change", updatePreview);
  }
}

function renderCompanySettings() {
  if (!companySettingsForm) return;
  const normalized = normalizeCompanySettings(companySettings);
  fiscalClosingMonthInput.value = String(normalized.fiscalClosingMonth);
  fiscalClosingDayInput.value = String(normalized.fiscalClosingDay);
  if (degreeDayBaseTemperatureInput) {
    degreeDayBaseTemperatureInput.value = String(normalized.degreeDayBaseTemperatureC);
  }
  if (workdayStartTimeInput) {
    workdayStartTimeInput.value = normalized.workdayStartTime;
  }
  if (workdayEndTimeInput) {
    workdayEndTimeInput.value = normalized.workdayEndTime;
  }
  if (workdayBreakMinutesInput) {
    workdayBreakMinutesInput.value = String(normalized.workdayBreakMinutes);
  }
  if (payrollTimeUnitMinutesInput) {
    payrollTimeUnitMinutesInput.value = String(normalized.payrollTimeUnitMinutes);
  }
  const fiscalRange = getFiscalYearRange(today);
  const baseTemperatureText = Number(normalized.degreeDayBaseTemperatureC).toFixed(1).replace(/\.0$/, "");
  const breakText = `${Math.floor(normalized.workdayBreakMinutes / 60)}時間${String(normalized.workdayBreakMinutes % 60).padStart(2, "0")}刁E;
  const defaultHours = getDefaultWorkHours(normalized);
  const effectiveTimeUnitMinutes = normalized.payrollTimeUnitMinutes === 30 ? 15 : normalized.payrollTimeUnitMinutes;
  companyFiscalYearPreview.textContent = `\u73fe\u5728\u306e\u6c7a\u7b97\u5e74\u5ea6: ${formatDateYmd(fiscalRange.from)}\u301c${formatDateYmd(fiscalRange.to)} / \u7a4d\u7b97\u6e29\u5ea6\u57fa\u6e96: ${baseTemperatureText}\u2103 / \u6a19\u6e96\u52e4\u52d9: ${normalized.workdayStartTime}\u301c${normalized.workdayEndTime}\uff08\u4f11\u61a9 ${breakText}\uff09= ${defaultHours}\u6642\u9593 / \u4e38\u3081: ${effectiveTimeUnitMinutes}\u5206`;
  applyDefaultWorkScheduleToForm();
}

function exportCumulativeComparisonCsv() {
  const comparisonData = getCumulativeComparisonData();
  if (!comparisonData.periodConfig.isValid) {
    window.alert(comparisonData.periodConfig.error || "比輁E��件を確認してください、E);
    return;
  }
  const metricLabelMap = {
    count: "件数基溁E,
    hours: "総作業時間基溁E,
    personHours: "延べ人時基溁E,
    laborCost: "概算人件費基溁E
  };
  const metricLabel = metricLabelMap[comparisonSortMetricInput.value] || "総作業時間基溁E;
  const sortLabel = comparisonSortOrderInput.value === "asc" ? "少なぁE��E : "多い頁E;
  const periodModeLabel = getComparisonPeriodLabel(comparisonData.periodConfig.mode);
  const periodRangeLabel = comparisonData.periodConfig.rangeText || "";
  const header = ["種別", "名称", "累積作業件数", "累積総作業時間", "累積延べ人晁E, "累積概算人件費", "比輁E��閁E, "比輁E��間篁E��", "並び替え基溁E, "並び頁E];
  const orchardRows = comparisonData.orchardEntries.map((entry) => ["園地", entry.label, entry.count, entry.hours, entry.personHours, entry.laborCost, periodModeLabel, periodRangeLabel, metricLabel, sortLabel]);
  const plotRows = comparisonData.plotEntries.map((entry) => ["区画", entry.label, entry.count, entry.hours, entry.personHours, entry.laborCost, periodModeLabel, periodRangeLabel, metricLabel, sortLabel]);
  const rows = [header, ...orchardRows, ...plotRows];
  const csv = rows.map((row) => row.map(escapeCsvValue).join(",")).join("\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "taiseien-cumulative-comparison.csv";
  link.click();
  URL.revokeObjectURL(url);
}

function render() {
  renderMasterSelects();
  renderSummary();
  renderBackupPanel();
  renderRecords();
  renderAnalytics();
  renderPayrollSection();
  renderWorktimeAnalysis();
  renderCumulativeComparison();
  renderTaskTypeReport();
  renderVarietyTypeReport();
  renderAnnualReport();
  renderQrCodeList();
  renderMasterLists();
  renderTodayMemberStatusBoard();
  renderCompanySettings();
}

function registerPwaServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  const isSecure = location.protocol === "https:" || location.hostname === "localhost" || location.hostname === "127.0.0.1";
  if (!isSecure) return;
  window.addEventListener("load", () => {
    const swUrl = new URL("./sw.js", window.location.href);
    const scopeUrl = new URL("./", window.location.href);
    const forceActivate = (worker) => {
      if (!worker) return;
      worker.postMessage("SKIP_WAITING");
    };
    let hasReloadedBySwUpdate = false;

    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (hasReloadedBySwUpdate) return;
      hasReloadedBySwUpdate = true;
      window.location.reload();
    });

    navigator.serviceWorker.register(swUrl.href, {
      scope: scopeUrl.pathname,
      updateViaCache: "none"
    }).then((registration) => {
      forceActivate(registration.waiting);
      registration.addEventListener("updatefound", () => {
        const installing = registration.installing;
        if (!installing) return;
        installing.addEventListener("statechange", () => {
          if (installing.state === "installed" && navigator.serviceWorker.controller) {
            forceActivate(installing);
          }
        });
      });
    }).catch((error) => {
      console.error("Service Workerの登録に失敗しました。", error);
    });
  });
}

registerPwaServiceWorker();
applyPlatformUiHints();
applyDefaultWorkScheduleToForm();
updateTimeHint();
resetGroupForm();
resetTeamSetForm();
resetWorkerForm();
resetMembershipForm();
resetTeamPlanForm();
setAppView(activeAppViewKey, { scrollIntoView: false });
try {
  render();
} catch (error) {
  console.error("初期描画中にエラーが発生しました。", error);
} finally {
  setAppView(activeAppViewKey, { scrollIntoView: false });
}
setWeatherFetchStatus(WEATHER_FETCH_HINT_TEXT);

