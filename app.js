const APP_STORAGE_KEY = "capple-farm-state-v5";
const PREVIOUS_STATE_KEY = "capple-farm-state-v4";
const LEGACY_RECORD_KEY = "capple-farm-records-v1";
const LAST_BACKUP_AT_KEY = "capple-farm-last-backup-at";

const sampleMasters = {
  orchards: [
    { id: "orchard-north", name: "北園地", managementCode: "O-01", latitude: 40.760812, longitude: 140.467915, note: "主力のふじ中心" },
    { id: "orchard-east", name: "東園地", managementCode: "O-02", latitude: 40.762734, longitude: 140.475901, note: "つがる中心の園地" },
    { id: "orchard-south", name: "南園地", managementCode: "O-03", latitude: 40.754329, longitude: 140.469842, note: "傾斜があり作業量が多い" }
  ],
  plots: [
    { id: "plot-north-a1", orchardId: "orchard-north", name: "A-1", managementCode: "K-01", note: "防風ネット沿い" },
    { id: "plot-north-a2", orchardId: "orchard-north", name: "A-2", managementCode: "K-02", note: "更新樹あり" },
    { id: "plot-east-b1", orchardId: "orchard-east", name: "B-1", managementCode: "K-03", note: "若木中心" },
    { id: "plot-south-c1", orchardId: "orchard-south", name: "C-1", managementCode: "K-04", note: "傾斜強め" }
  ],
  varieties: [
    { id: "variety-fuji", name: "ふじ", note: "晩生の主力品種" },
    { id: "variety-tsugaru", name: "つがる", note: "早生で着色が早い" },
    { id: "variety-ourin", name: "王林", note: "香りの良い黄色品種" }
  ],
  groups: [
    { id: "group-1", name: "第1班", sortOrder: 1, description: "摘果と葉摘み中心", isActive: true },
    { id: "group-2", name: "第2班", sortOrder: 2, description: "受粉と見回り中心", isActive: true },
    { id: "group-support", name: "応援班", sortOrder: 3, description: "繁忙期の応援作業", isActive: false }
  ],
  workers: [
    { id: "worker-family-taro", fullName: "田中 太郎", displayName: "太郎", primaryGroupId: "group-1", category: "家族", hourlyRate: 0, isActive: true },
    { id: "worker-employee-yui", fullName: "佐藤 結衣", displayName: "結衣", primaryGroupId: "group-2", category: "社員", hourlyRate: 1500, isActive: true },
    { id: "worker-part-ken", fullName: "高橋 健", displayName: "健", primaryGroupId: "group-1", category: "パート", hourlyRate: 1200, isActive: true },
    { id: "worker-other-guest", fullName: "応援スタッフ", displayName: "応援", primaryGroupId: "group-support", category: "その他", hourlyRate: 1300, isActive: false }
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
    workHours: 2.5,
    dailyGroupId: "group-1",
    dailyGroupName: "第1班",
    fixedTeamSetId: "team-set-pruning-a",
    fixedTeamSetName: "剪定班A",
    workerCount: 2,
    workerId: "worker-family-taro",
    assignedWorkers: [{ workerId: "worker-family-taro" }, { workerId: "worker-part-ken" }],
    workerIds: ["worker-family-taro", "worker-part-ken"],
    workerName: "田中 太郎",
    workerNames: ["太郎", "健"],
    workerDisplayName: "太郎",
    workerCategory: "家族",
    workerHourlyRate: 0,
    startTime: "07:30",
    endTime: "10:00",
    temperatureC: 18,
    weather: "晴れ",
    materials: "摘果用はさみ 2本",
    notes: "混み合っている枝を優先して整理。",
    updatedAt: "2026-04-05T09:00:00.000Z"
  },
  {
    id: "record-2",
    workDate: "2026-04-06",
    orchardId: "orchard-east",
    plotId: "plot-east-b1",
    varietyId: "variety-tsugaru",
    taskType: "受粉",
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
    weather: "くもり",
    materials: "",
    notes: "開花が進んでいる列を先に対応。",
    updatedAt: "2026-04-06T05:30:00.000Z"
  },
  {
    id: "record-3",
    workDate: "2026-04-07",
    orchardId: "orchard-south",
    plotId: "plot-south-c1",
    varietyId: "variety-ourin",
    taskType: "葉摘み",
    workHours: 3,
    dailyGroupId: "group-1",
    dailyGroupName: "第1班",
    fixedTeamSetId: "team-set-pruning-a",
    fixedTeamSetName: "剪定班A",
    workerCount: 2,
    workerId: "worker-part-ken",
    assignedWorkers: [{ workerId: "worker-part-ken" }, { workerId: "worker-family-taro" }],
    workerIds: ["worker-part-ken", "worker-family-taro"],
    workerName: "高橋 健",
    workerNames: ["健", "太郎"],
    workerDisplayName: "健",
    workerCategory: "パート",
    workerHourlyRate: 1200,
    startTime: "05:30",
    endTime: "08:30",
    temperatureC: 24.5,
    weather: "晴れ",
    materials: "作業手袋 3組",
    notes: "南面の着色を見ながら実施。",
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

const defaultCompanySettings = {
  fiscalClosingMonth: 3,
  fiscalClosingDay: 31,
  degreeDayBaseTemperatureC: 10,
  workdayStartTime: "07:30",
  workdayEndTime: "17:00",
  workdayBreakMinutes: 90,
  payrollTimeUnitMinutes: 30
};
const FIXED_WEATHER_SOURCE = {
  locationName: "弘前市",
  latitude: 40.6031,
  longitude: 140.4639
};
const WEATHER_FETCH_BUTTON_TEXT = `${FIXED_WEATHER_SOURCE.locationName}の天気を取得`;
const WEATHER_FETCH_HINT_TEXT = `「${WEATHER_FETCH_BUTTON_TEXT}」を押すと、現在気温を自動入力できます。`;

const form = document.getElementById("recordForm");
const recordIdInput = document.getElementById("recordId");
const formMode = document.getElementById("formMode");
const workDateInput = document.getElementById("workDate");
const orchardSelect = document.getElementById("orchardSelect");
const plotSelect = document.getElementById("plotSelect");
const qrScanButton = document.getElementById("qrScanButton");
const varietySelect = document.getElementById("varietySelect");
const taskTypeInput = document.getElementById("taskType");
const workHoursInput = document.getElementById("workHours");
const groupSelect = document.getElementById("groupSelect");
const workerCountInput = document.getElementById("workerCount");
const selectedWorkerCount = document.getElementById("selectedWorkerCount");
const workerPickerHint = document.getElementById("workerPickerHint");
const workerSelectionList = document.getElementById("workerSelectionList");
const startTimeInput = document.getElementById("startTime");
const endTimeInput = document.getElementById("endTime");
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
  ? Array.from(bottomNav.querySelectorAll("[data-app-view]"))
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
const appViewPanels = Array.from(
  new Set(
    appViewKeys
      .flatMap((viewKey) => appViewPanelMap[viewKey])
      .map((panelId) => document.getElementById(panelId))
      .filter(Boolean)
  )
);
let activeAppViewKey = "home";
let activeSettingsSection = "top";
let activeSummarySection = "top";
let activeWorktimeTab = "personal";
let activeWorktimeWorkerId = "";
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
let selectedMembershipGroupIds = [];
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
  const category = ["家族", "社員", "パート", "その他"].includes(worker.category) ? worker.category : "その他";
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
  const environment = normalizeRecordEnvironment(record);
  const fieldObservation = normalizeFieldObservation(
    record.fieldObservation ??
    record.observation ??
    record.conditions?.fieldObservation
  );
  return {
    id: String(record.id || createId("record")),
    workDate: String(record.workDate || today),
    orchardId: normalizeText(record.orchardId),
    orchardName: normalizeText(record.orchardName || record.fieldName),
    plotId: normalizeText(record.plotId),
    plotName: normalizeText(record.plotName),
    varietyId: normalizeText(record.varietyId),
    varietyName: normalizeText(record.varietyName || record.variety),
    taskType: normalizeText(record.taskType),
    workHours: Number(record.workHours || 0),
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
    startTime: normalizeText(record.startTime),
    endTime: normalizeText(record.endTime),
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
    `作業者数: ${counts.workers}件`,
    `グループ数: ${counts.groups}件`,
    `日別チーム編成数: ${counts.teamPlans}件`,
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
    backupTimestamp.textContent = "未実行";
    // marker removed
    window.alert("CSV出力できる作業記録がありません。");
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
    backupTimestamp.textContent = "未実行";
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
  if (normalized.diseaseObserved) parts.push("病気あり");
  if (normalized.pestObserved) parts.push("害虫あり");
  if (normalized.sprayApplied) parts.push("散布実施");
  if (normalized.damageLevel) parts.push(`病斑/食害: ${normalized.damageLevel}`);
  if (normalized.wetness) parts.push(`濡れ: ${normalized.wetness}`);
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

function getDefaultWorkHours(settings = companySettings) {
  const normalized = normalizeCompanySettings(settings);
  const hours = calculateWorkHoursByRange(
    normalized.workdayStartTime,
    normalized.workdayEndTime,
    normalized.workdayBreakMinutes,
    normalized.payrollTimeUnitMinutes
  );
  return Number.isFinite(hours) ? hours : 8;
}

function normalizeHoursByTimeUnit(hours, settings = companySettings) {
  const numericHours = Number(hours);
  if (!Number.isFinite(numericHours) || numericHours <= 0) return 0;
  const normalized = normalizeCompanySettings(settings);
  const roundedMinutes = roundMinutesByTimeUnit(numericHours * 60, normalized.payrollTimeUnitMinutes);
  return Number((Math.max(0, roundedMinutes) / 60).toFixed(2));
}

function calculateHoursFromRange(startTime, endTime, settings = companySettings) {
  const normalized = normalizeCompanySettings(settings);
  return calculateWorkHoursByRange(
    startTime,
    endTime,
    normalized.workdayBreakMinutes,
    normalized.payrollTimeUnitMinutes
  );
}

function applyDefaultWorkScheduleToForm(force = false) {
  const normalized = normalizeCompanySettings(companySettings);
  if (startTimeInput && (force || !startTimeInput.value)) {
    startTimeInput.value = normalized.workdayStartTime;
  }
  if (endTimeInput && (force || !endTimeInput.value)) {
    endTimeInput.value = normalized.workdayEndTime;
  }
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
    setWeatherFetchStatus(summary ? `${locationLabel} 取得完了: ${summary}` : `${locationLabel}の天気情報を取得しました。`, "success");
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
  const hours = Number(record.workHours || 0);
  const assignedWorkers = getAssignedWorkers(record);
  const workerCount = Number(record.workerCount || 0) || assignedWorkers.length;
  const totalHourlyRate = assignedWorkers.reduce((sum, worker) => sum + Number(worker.hourlyRate || 0), 0);
  return {
    hours,
    workerCount,
    personHours: hours * workerCount,
    laborCost: hours * totalHourlyRate
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

  historyCalendarMonthLabel.textContent = `${year}年${month}月`;
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
      dayButton.setAttribute("aria-label", `${day}日（記録あり）`);
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
  {
    if (mode === "all") {
      return { mode, label: getComparisonPeriodLabel(mode), from: "", to: "", rangeText: "全データ", isValid: true };
    }
    if (mode === "month") {
      const range = getCurrentMonthRange(today);
      return {
        mode,
        label: getComparisonPeriodLabel(mode),
        ...range,
        rangeText: `${formatDateYmd(range.from)}〜${formatDateYmd(range.to)}`,
        isValid: true
      };
    }
    if (mode === "fiscal") {
      const range = getFiscalYearRange(today);
      return {
        mode,
        label: getComparisonPeriodLabel(mode),
        ...range,
        rangeText: `${formatDateYmd(range.from)}〜${formatDateYmd(range.to)}`,
        isValid: true
      };
    }
    const customFrom = comparisonFromDateInput.value;
    const customTo = comparisonToDateInput.value;
    if (!customFrom || !customTo) {
      return { mode, label: getComparisonPeriodLabel(mode), from: customFrom, to: customTo, isValid: false, error: "任意期間では開始日と終了日を入力してください。" };
    }
    if (customFrom > customTo) {
      return { mode, label: getComparisonPeriodLabel(mode), from: customFrom, to: customTo, isValid: false, error: "任意期間の終了日は開始日以降を指定してください。" };
    }
    return {
      mode,
      label: getComparisonPeriodLabel(mode),
      from: customFrom,
      to: customTo,
      rangeText: `${formatDateYmd(customFrom)}〜${formatDateYmd(customTo)}`,
      isValid: true
    };
  }
  if (mode === "all") {
    return { mode, label: "全期間", from: "", to: "", isValid: true };
  }
  if (mode === "month") {
    const range = getCurrentMonthRange(today);
    return { mode, label: "今月", ...range, isValid: true };
  }
  if (mode === "fiscal") {
    const range = getFiscalYearRange(today);
    return { mode, label: `${range.from.slice(0, 4)}年度`, ...range, isValid: true };
  }
  const from = comparisonFromDateInput.value;
  const to = comparisonToDateInput.value;
  if (!from || !to) {
    return { mode, label: "任意期間", from, to, isValid: false, error: "任意期間では開始日と終了日を入力してください。" };
  }
  if (from > to) {
    return { mode, label: "任意期間", from, to, isValid: false, error: "任意期間の終了日は開始日以降を指定してください。" };
  }
  return { mode, label: `${formatDate(from)} ～ ${formatDate(to)}`, from, to, isValid: true };
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
        error: "任意期間の終了日は開始日以降の日付を指定してください。"
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
    assignedWorkers.forEach((worker) => {
      if (!worker) return;
      if (periodConfig.workerScope === "part" && !isPartTimeWorker(worker)) return;

      const dayKey = `${worker.id}|${record.workDate}`;
      const current = dayMap.get(dayKey) || {
        worker,
        workDate: record.workDate,
        recordCount: 0,
        manualWorkHours: 0,
        hasManualRange: false,
        minStartMinutes: null,
        maxEndMinutes: null
      };
      current.recordCount += 1;

      const manualHours = Number(record.workHours || 0);
      if (Number.isFinite(manualHours) && manualHours > 0) {
        current.manualWorkHours += manualHours;
      }

      const startMinutes = parseTimeToMinutes(record.startTime);
      const endMinutes = parseTimeToMinutes(record.endTime);
      if (startMinutes !== null && endMinutes !== null && endMinutes > startMinutes) {
        current.hasManualRange = true;
        current.minStartMinutes = current.minStartMinutes === null
          ? startMinutes
          : Math.min(current.minStartMinutes, startMinutes);
        current.maxEndMinutes = current.maxEndMinutes === null
          ? endMinutes
          : Math.max(current.maxEndMinutes, endMinutes);
      }
      dayMap.set(dayKey, current);
    });
  });

  const defaultDailyHours = getDefaultWorkHours();
  const workerMap = new Map();
  Array.from(dayMap.values()).forEach((dayEntry) => {
    let resolvedDayHours = defaultDailyHours;
    if (dayEntry.hasManualRange && dayEntry.minStartMinutes !== null && dayEntry.maxEndMinutes !== null) {
      const rangeHours = calculateHoursFromRange(
        formatMinutesToTimeText(dayEntry.minStartMinutes),
        formatMinutesToTimeText(dayEntry.maxEndMinutes)
      );
      if (Number.isFinite(rangeHours)) {
        resolvedDayHours = rangeHours;
      }
    } else if (dayEntry.recordCount === 1 && dayEntry.manualWorkHours > 0) {
      resolvedDayHours = normalizeHoursByTimeUnit(dayEntry.manualWorkHours);
    }

    const current = workerMap.get(dayEntry.worker.id) || {
      worker: dayEntry.worker,
      attendanceDates: new Set(),
      totalHours: 0
    };
    current.attendanceDates.add(dayEntry.workDate);
    current.totalHours += resolvedDayHours;
    workerMap.set(dayEntry.worker.id, current);
  });

  const rows = Array.from(workerMap.values()).map((item) => {
    const adjustment = getPayrollAdjustment(item.worker.id, periodConfig);
    const hourlyRate = Number(item.worker.hourlyRate || 0);
    const totalHours = Number(item.totalHours.toFixed(2));
    const attendanceDays = item.attendanceDates.size;
    const basicPay = totalHours * hourlyRate;
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
      hourlyRate,
      basicPay,
      allowance,
      deduction,
      netPay
    };
  }).sort((a, b) => a.displayName.localeCompare(b.displayName, "ja"));

  const summary = rows.reduce((acc, row) => {
    acc.workerCount += 1;
    acc.attendanceDays += row.attendanceDays;
    acc.totalHours += row.totalHours;
    acc.basicPay += row.basicPay;
    acc.allowance += row.allowance;
    acc.deduction += row.deduction;
    acc.netPay += row.netPay;
    return acc;
  }, {
    workerCount: 0,
    attendanceDays: 0,
    totalHours: 0,
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
  if (mode === "custom") return "任意期間";
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
        error: "任意期間を集計するには開始日と終了日を入力してください。"
      };
    }
    if (from > to) {
      return {
        mode,
        label,
        from,
        to,
        rangeText: `${formatDateYmd(from)}〜${formatDateYmd(to)}`,
        isValid: false,
        error: "任意期間の終了日は開始日以降にしてください。"
      };
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
    rangeText: `${formatDateYmd(range.from)}〜${formatDateYmd(range.to)}`,
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
    option.textContent = "作業者が未登録です";
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
    const hours = Number(record.workHours || 0);
    if (!workDate || !Number.isFinite(hours) || hours <= 0) return;
    const assignedWorkers = getAssignedWorkers(record);
    assignedWorkers.forEach((worker) => {
      if (!worker) return;
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
      rangeText: `${formatDateYmd(period.range.from)}〜${formatDateYmd(period.range.to)}`,
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
      title: "期間内の内訳",
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
      label = `${formatDateYmd(weekRange.from)}〜${formatDateYmd(weekRange.to)}`;
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
    ? "期間内の月別内訳"
    : granularity === "week"
      ? "期間内の週別内訳"
      : "期間内の日別内訳";
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
      error: periodConfig.error || "期間条件を確認してください。"
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
    ? (selectedWorker?.displayName || "未選択")
    : "全体";
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
        { label: "対象作業者", value: selectedWorker?.displayName || "未選択" },
        { label: `${periodLabel}の労働時間`, value: formatHours(selectedStats.totalHours) },
        { label: `${periodLabel}の出勤日数`, value: formatDays(selectedStats.attendanceDays) },
        { label: "平均労働時間", value: formatHours(selectedStats.averageHours) },
        { label: "今週の労働時間", value: formatHours(weekStats?.totalHours || 0) },
        { label: "今月の労働時間", value: formatHours(monthStats?.totalHours || 0) },
        { label: "今年の労働時間", value: formatHours(yearStats?.totalHours || 0) }
      ]
    : [
        { label: "対象作業者数", value: formatPeople(selectedStats.workerCount || 0) },
        { label: `${periodLabel}の全体労働時間`, value: formatHours(selectedStats.totalHours) },
        { label: `${periodLabel}の全体出勤日数`, value: formatDays(selectedStats.attendanceDays) },
        { label: "1人あたり平均労働時間", value: formatHours(selectedStats.averageHoursPerWorker) },
        { label: "全体の今週労働時間", value: formatHours(weekStats?.totalHours || 0) },
        { label: "全体の今月労働時間", value: formatHours(monthStats?.totalHours || 0) },
        { label: "全体の今年労働時間", value: formatHours(yearStats?.totalHours || 0) }
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
      ? `${formatHours(item.stats.totalHours)} / ${formatDays(item.stats.attendanceDays)} / 平均 ${formatHours(item.stats.averageHours)}`
      : `${formatHours(item.stats.totalHours)} / ${formatDays(item.stats.attendanceDays)} / 1人平均 ${formatHours(item.stats.averageHoursPerWorker)}`;
    return [`${item.label}（${item.rangeText}）`, value];
  });
  buildSummaryRows(
    worktimeComparisonList,
    entries,
    (value) => String(value),
    "比較できる労働時間データがありません。"
  );
}

function renderWorktimeBreakdownRows(data) {
  if (!worktimeBreakdownList) return;
  if (worktimeBreakdownTitle) {
    worktimeBreakdownTitle.textContent = data.breakdown.title;
  }
  const entries = data.breakdown.rows.map((row) => {
    const value = data.tab === "personal"
      ? `${formatHours(row.totalHours)} / ${formatDays(row.attendanceDays)} / 平均 ${formatHours(row.averageHours)}`
      : `${formatHours(row.totalHours)} / ${formatDays(row.attendanceDays)} / 1人平均 ${formatHours(row.averagePerWorker)}`;
    return [row.label, value];
  });
  buildSummaryRows(
    worktimeBreakdownList,
    entries,
    (value) => String(value),
    "期間内の内訳データがありません。"
  );
}

function renderWorktimeAnalysis() {
  if (!worktimePeriodInfo || !worktimeSummaryCards || !worktimeComparisonList || !worktimeBreakdownList) return;
  applyWorktimeControlState();
  renderWorktimeWorkerOptions();

  const snapshot = buildWorktimeAnalysisSnapshot(activeWorktimeTab);
  if (!snapshot.isValid) {
    worktimePeriodInfo.textContent = snapshot.error || "期間条件を確認してください。";
    worktimeSummaryCards.innerHTML = "";
    worktimeComparisonList.innerHTML = "";
    worktimeBreakdownList.innerHTML = "";
    worktimeSummaryCards.appendChild(buildEmptyState("集計条件を指定すると労働時間サマリーを表示できます。"));
    worktimeComparisonList.appendChild(buildEmptyState("比較データを表示できません。"));
    worktimeBreakdownList.appendChild(buildEmptyState("内訳データを表示できません。"));
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

function renderPayrollSummaryCards(data) {
  if (!payrollSummaryCards) return;
  const summary = data.summary;
  const cards = [
    { label: "対象者数", value: formatPeople(summary.workerCount) },
    { label: "総労働時間", value: formatHours(summary.totalHours) },
    { label: "基本支給額合計", value: formatCurrency(summary.basicPay) },
    { label: "差引支給額合計", value: formatCurrency(summary.netPay) }
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
    payrollList.appendChild(buildEmptyState("対象期間の給与集計データがありません。"));
    return;
  }

  data.rows.forEach((row) => {
    const card = document.createElement("article");
    card.className = "payroll-row";
    if (row.workerId === activePayrollWorkerId) {
      card.classList.add("is-active");
    }
    card.addEventListener("click", () => {
      activePayrollWorkerId = row.workerId;
      renderPayrollSection();
    });

    const header = document.createElement("div");
    header.className = "payroll-row__header";
    const heading = document.createElement("h4");
    heading.textContent = `${row.fullName}${row.category ? `（${row.category}）` : ""}`;
    const actions = document.createElement("div");
    actions.className = "payroll-row__actions";
    const detailButton = document.createElement("button");
    detailButton.type = "button";
    detailButton.className = "button button--view button--small";
    detailButton.textContent = "個別明細を開く";
    detailButton.addEventListener("click", (event) => {
      event.stopPropagation();
      activePayrollWorkerId = row.workerId;
      renderPayrollSection();
    });
    const printButton = document.createElement("button");
    printButton.type = "button";
    printButton.className = "button button--save button--small";
    printButton.textContent = "この人を印刷";
    printButton.addEventListener("click", (event) => {
      event.stopPropagation();
      openPayrollIndividualReportWindow(row, data.periodConfig);
    });
    actions.append(detailButton, printButton);
    header.append(heading, actions);

    const metrics = document.createElement("div");
    metrics.className = "payroll-row__metrics";
    metrics.innerHTML = `
      <span>出勤日数: <strong>${formatDays(row.attendanceDays)}</strong></span>
      <span>総労働時間: <strong>${formatHours(row.totalHours)}</strong></span>
      <span>基本支給額: <strong>${formatCurrency(row.basicPay)}</strong></span>
      <span>差引支給額: <strong>${formatCurrency(row.netPay)}</strong></span>
    `;

    card.append(header, metrics);
    payrollList.appendChild(card);
  });
}

function renderPayrollDetail(data) {
  if (!payrollDetail) return;
  if (!data.rows.length) {
    payrollDetail.innerHTML = "";
    payrollDetail.appendChild(buildEmptyState("個別明細を表示できるデータがありません。"));
    return;
  }

  if (!data.rows.some((row) => row.workerId === activePayrollWorkerId)) {
    activePayrollWorkerId = data.rows[0].workerId;
  }
  const selectedRow = data.rows.find((row) => row.workerId === activePayrollWorkerId) || data.rows[0];
  const periodText = data.periodConfig.rangeText || `${formatDateYmd(data.periodConfig.from)}〜${formatDateYmd(data.periodConfig.to)}`;

  payrollDetail.innerHTML = `
    <article class="payroll-detail-card">
      <div class="payroll-detail-card__header">
        <h4>${escapeHtml(selectedRow.fullName)}</h4>
        <span class="chip chip--soft">${escapeHtml(selectedRow.category || "区分未設定")}</span>
      </div>

      <div class="payroll-detail-grid">
        <div><span>対象期間</span><strong>${escapeHtml(periodText)}</strong></div>
        <div><span>締め区分</span><strong>${escapeHtml(data.periodConfig.closeLabel)}</strong></div>
        <div><span>出勤日数</span><strong>${escapeHtml(formatDays(selectedRow.attendanceDays))}</strong></div>
        <div><span>総労働時間</span><strong>${escapeHtml(formatHours(selectedRow.totalHours))}</strong></div>
        <div><span>時給</span><strong>${escapeHtml(formatCurrency(selectedRow.hourlyRate))}</strong></div>
        <div><span>基本支給額</span><strong>${escapeHtml(formatCurrency(selectedRow.basicPay))}</strong></div>
      </div>

      <div class="payroll-adjustment-row">
        <label>
          手当（円）
          <input type="number" id="payrollAllowanceInput" min="0" step="1" value="${selectedRow.allowance}">
        </label>
        <label>
          控除（円）
          <input type="number" id="payrollDeductionInput" min="0" step="1" value="${selectedRow.deduction}">
        </label>
      </div>

      <p class="payroll-netpay">差引支給額: <strong>${escapeHtml(formatCurrency(selectedRow.netPay))}</strong></p>
      <p class="form-hint">差引支給額 = 基本支給額 + 手当 - 控除（税金・社会保険の自動計算はしません）</p>
      <div class="payroll-detail-actions">
        <button type="button" class="button button--save" id="payrollAdjustmentSaveButton">手当・控除を保存</button>
        <button type="button" class="button button--view" id="payrollIndividualPrintButton">この人の明細を印刷</button>
      </div>
    </article>
  `;

  const allowanceInput = document.getElementById("payrollAllowanceInput");
  const deductionInput = document.getElementById("payrollDeductionInput");
  const saveButton = document.getElementById("payrollAdjustmentSaveButton");
  const printButton = document.getElementById("payrollIndividualPrintButton");
  if (!allowanceInput || !deductionInput || !saveButton || !printButton) return;

  saveButton.addEventListener("click", () => {
    const allowance = Number(allowanceInput.value || 0);
    const deduction = Number(deductionInput.value || 0);
    upsertPayrollAdjustment(selectedRow.workerId, data.periodConfig, allowance, deduction);
    renderPayrollSection();
  });
  printButton.addEventListener("click", () => {
    openPayrollIndividualReportWindow(selectedRow, data.periodConfig);
  });
}

function renderPayrollSection() {
  if (!payrollPeriodInfo || !payrollList || !payrollDetail) return;
  const periodConfig = getPayrollPeriodConfig();
  if (payrollCustomRange) {
    payrollCustomRange.hidden = periodConfig.closeType !== "custom";
  }

  if (!periodConfig.isValid) {
    payrollPeriodInfo.textContent = periodConfig.error || "給与集計の条件を設定してください。";
    if (payrollSummaryCards) payrollSummaryCards.innerHTML = "";
    payrollList.innerHTML = "";
    payrollList.appendChild(buildEmptyState("条件を設定すると給与一覧が表示されます。"));
    payrollDetail.innerHTML = "";
    payrollDetail.appendChild(buildEmptyState("個別明細を表示する対象がありません。"));
    return;
  }

  const data = getPayrollData(periodConfig);
  const scopeLabel = getPayrollWorkerScopeLabel(periodConfig.workerScope);
  const settings = normalizeCompanySettings(companySettings);
  const breakText = `${Math.floor(settings.workdayBreakMinutes / 60)}時間${String(settings.workdayBreakMinutes % 60).padStart(2, "0")}分`;
  const defaultHours = getDefaultWorkHours(settings);
  payrollPeriodInfo.textContent = `${periodConfig.closeLabel} / ${periodConfig.rangeText} / 対象: ${scopeLabel} / 集計記録: ${formatCount(data.filteredRecords.length)} / 標準勤務: ${settings.workdayStartTime}〜${settings.workdayEndTime}（休憩 ${breakText}）= ${defaultHours}時間`;

  renderPayrollSummaryCards(data);
  renderPayrollList(data);
  renderPayrollDetail(data);
}

function exportPayrollCsv() {
  const data = getPayrollData(getPayrollPeriodConfig());
  if (!data.periodConfig.isValid) {
    window.alert(data.periodConfig.error || "給与集計の条件を確認してください。");
    return;
  }
  if (!data.rows.length) {
    window.alert("CSV出力できる給与データがありません。");
    return;
  }

  const periodText = data.periodConfig.rangeText || `${formatDateYmd(data.periodConfig.from)}〜${formatDateYmd(data.periodConfig.to)}`;
  const rows = [
    ["氏名", "対象期間", "締め区分", "出勤日数", "総労働時間", "時給", "基本支給額", "手当", "控除", "差引支給額"]
  ];
  data.rows.forEach((row) => {
    rows.push([
      row.fullName,
      periodText,
      data.periodConfig.closeLabel,
      row.attendanceDays,
      row.totalHours,
      row.hourlyRate,
      row.basicPay,
      row.allowance,
      row.deduction,
      row.netPay
    ]);
  });

  rows.push([
    "合計",
    periodText,
    data.periodConfig.closeLabel,
    data.summary.attendanceDays,
    Number(data.summary.totalHours.toFixed(2)),
    "",
    Math.round(data.summary.basicPay),
    Math.round(data.summary.allowance),
    Math.round(data.summary.deduction),
    Math.round(data.summary.netPay)
  ]);

  const csv = rows.map((row) => row.map(escapeCsvValue).join(",")).join("\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `taiseien-simple-payroll-${data.periodConfig.from}_${data.periodConfig.to}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

function buildPayrollReportHtml(data) {
  const periodText = data.periodConfig.rangeText || `${formatDateYmd(data.periodConfig.from)}〜${formatDateYmd(data.periodConfig.to)}`;
  const scopeLabel = getPayrollWorkerScopeLabel(data.periodConfig.workerScope);
  const rowsHtml = data.rows.length
    ? data.rows.map((row) => `
      <tr>
        <td>${escapeHtml(row.fullName)}</td>
        <td>${escapeHtml(formatDays(row.attendanceDays))}</td>
        <td>${escapeHtml(formatHours(row.totalHours))}</td>
        <td>${escapeHtml(formatCurrency(row.hourlyRate))}</td>
        <td>${escapeHtml(formatCurrency(row.basicPay))}</td>
        <td>${escapeHtml(formatCurrency(row.allowance))}</td>
        <td>${escapeHtml(formatCurrency(row.deduction))}</td>
        <td>${escapeHtml(formatCurrency(row.netPay))}</td>
      </tr>
    `).join("")
    : `<tr><td colspan="8">対象データがありません。</td></tr>`;

  return `
    <html lang="ja">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>(株)大成園 作業記録アプリ 簡易給与明細</title>
        <style>
          @page { size: A4 portrait; margin: 12mm; }
          * { box-sizing: border-box; }
          body { margin: 0; background: #f6f3ec; color: #2f2921; font-family: "Yu Gothic", "Hiragino Kaku Gothic ProN", sans-serif; }
          .toolbar { position: sticky; top: 0; z-index: 10; display: flex; justify-content: space-between; gap: 8px; align-items: center; padding: 12px 16px; border-bottom: 1px solid #d8d2c8; background: #ffffffee; backdrop-filter: blur(6px); }
          .toolbar h1 { margin: 0; font-size: 16px; }
          .actions { display: flex; gap: 8px; flex-wrap: wrap; }
          .button { border: 0; border-radius: 999px; min-height: 38px; padding: 8px 14px; cursor: pointer; font-size: 14px; }
          .button--print { background: #3f6f3f; color: #fff; }
          .button--close { background: #ece8de; color: #3c352f; }
          .body { width: min(210mm, 100%); margin: 0 auto; padding: 7mm 0 12mm; }
          .header { padding: 5mm; border-radius: 4mm; background: #fff; border: 1px solid #dfd8cd; }
          .app { margin: 0; font-size: 20px; line-height: 1.3; }
          .title { margin: 2mm 0 1mm; font-size: 18px; }
          .meta { margin: 0.8mm 0; color: #5f564b; font-size: 13px; }
          .summary { margin-top: 3mm; display: grid; gap: 2mm; grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .summary div { border: 1px solid #dfd8cd; border-radius: 3mm; background: #fff; padding: 2.5mm 3mm; display: grid; gap: 1mm; }
          .summary span { color: #61574b; font-size: 11px; }
          .summary strong { font-size: 15px; }
          .table-wrap { margin-top: 4mm; overflow-x: auto; border: 1px solid #dfd8cd; border-radius: 3mm; background: #fff; }
          table { width: 100%; border-collapse: collapse; min-width: 760px; }
          th, td { border: 1px solid #ddd3c3; padding: 6px 8px; text-align: right; font-size: 12px; white-space: nowrap; }
          th:first-child, td:first-child { text-align: left; white-space: normal; }
          thead th { background: #f3eee3; font-size: 11px; }
          tfoot td { background: #faf6ee; font-weight: 700; }
          @media (max-width: 720px) {
            .toolbar { position: static; padding: 10px 12px; }
            .actions { width: 100%; }
            .button { flex: 1; }
            .body { width: 100%; padding: 12px; }
            .summary { grid-template-columns: 1fr; }
          }
          @media print {
            body { background: #fff; }
            .toolbar { display: none; }
            .body { width: auto; margin: 0; padding: 0; }
          }
        </style>
      </head>
      <body>
        <header class="toolbar">
          <h1>簡易給与明細</h1>
          <div class="actions">
            <button class="button button--print" type="button" onclick="window.print()">この画面を印刷</button>
            <button class="button button--close" type="button" onclick="window.close()">閉じる</button>
          </div>
        </header>
        <main class="body">
          <section class="header">
            <p class="app">(株)大成園　作業記録アプリ</p>
            <h2 class="title">簡易給与明細（一覧）</h2>
            <p class="meta">対象期間: ${escapeHtml(periodText)}</p>
            <p class="meta">締め区分: ${escapeHtml(data.periodConfig.closeLabel)} / 対象: ${escapeHtml(scopeLabel)}</p>
            <div class="summary">
              <div><span>対象者数</span><strong>${escapeHtml(formatPeople(data.summary.workerCount))}</strong></div>
              <div><span>総労働時間</span><strong>${escapeHtml(formatHours(data.summary.totalHours))}</strong></div>
              <div><span>基本支給額合計</span><strong>${escapeHtml(formatCurrency(data.summary.basicPay))}</strong></div>
              <div><span>差引支給額合計</span><strong>${escapeHtml(formatCurrency(data.summary.netPay))}</strong></div>
            </div>
          </section>

          <section class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>氏名</th>
                  <th>出勤日数</th>
                  <th>総労働時間</th>
                  <th>時給</th>
                  <th>基本支給額</th>
                  <th>手当</th>
                  <th>控除</th>
                  <th>差引支給額</th>
                </tr>
              </thead>
              <tbody>${rowsHtml}</tbody>
              <tfoot>
                <tr>
                  <td>合計</td>
                  <td>${escapeHtml(formatDays(data.summary.attendanceDays))}</td>
                  <td>${escapeHtml(formatHours(data.summary.totalHours))}</td>
                  <td>-</td>
                  <td>${escapeHtml(formatCurrency(data.summary.basicPay))}</td>
                  <td>${escapeHtml(formatCurrency(data.summary.allowance))}</td>
                  <td>${escapeHtml(formatCurrency(data.summary.deduction))}</td>
                  <td>${escapeHtml(formatCurrency(data.summary.netPay))}</td>
                </tr>
              </tfoot>
            </table>
          </section>
        </main>
      </body>
    </html>
  `;
}

function openPayrollReportWindow() {
  const data = getPayrollData(getPayrollPeriodConfig());
  if (!data.periodConfig.isValid) {
    window.alert(data.periodConfig.error || "給与集計の条件を確認してください。");
    return;
  }
  if (!data.rows.length) {
    window.alert("表示・印刷できる給与データがありません。");
    return;
  }
  openGeneratedDocumentWindow(buildPayrollReportHtml(data), {
    width: 1280,
    height: 920,
    popupBlockedMessage: "簡易給与明細の表示画面を開けませんでした。ブラウザのポップアップ設定を確認してください。"
  });
}

function buildPayrollIndividualReportHtml(row, periodConfig) {
  const periodText = periodConfig.rangeText || `${formatDateYmd(periodConfig.from)}〜${formatDateYmd(periodConfig.to)}`;
  const attendanceLabel = formatDays(row.attendanceDays);
  const hoursLabel = formatHours(row.totalHours);
  const hourlyRateLabel = formatCurrency(row.hourlyRate);
  const basicPayLabel = formatCurrency(row.basicPay);
  const allowanceLabel = formatCurrency(row.allowance);
  const deductionLabel = formatCurrency(row.deduction);
  const netPayLabel = formatCurrency(row.netPay);
  return `
    <html lang="ja">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>(株)大成園 作業記録アプリ 個人別簡易給与明細</title>
        <style>
          @page { size: A4 portrait; margin: 14mm; }
          * { box-sizing: border-box; }
          body { margin: 0; background: #f6f3ec; color: #2f2921; font-family: "Yu Gothic", "Hiragino Kaku Gothic ProN", sans-serif; }
          .toolbar { position: sticky; top: 0; z-index: 10; display: flex; justify-content: space-between; align-items: center; gap: 8px; padding: 12px 16px; border-bottom: 1px solid #d8d2c8; background: #ffffffee; backdrop-filter: blur(6px); }
          .toolbar h1 { margin: 0; font-size: 16px; }
          .actions { display: flex; gap: 8px; flex-wrap: wrap; }
          .button { border: 0; border-radius: 999px; min-height: 38px; padding: 8px 14px; cursor: pointer; font-size: 14px; }
          .button--print { background: #3f6f3f; color: #fff; }
          .button--close { background: #ece8de; color: #3c352f; }
          .sheet { width: min(210mm, 100%); margin: 0 auto; padding: 8mm 0 12mm; }
          .card { background: #fff; border: 1px solid #dfd8cd; border-radius: 4mm; padding: 6mm; }
          .app-name { margin: 0; font-size: 18px; line-height: 1.35; }
          .title { margin: 2mm 0 0; font-size: 20px; }
          .meta { margin: 1.2mm 0; color: #5f564b; font-size: 13px; }
          .name { margin-top: 3mm; font-size: 19px; font-weight: 700; }
          .grid { margin-top: 4mm; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 2.2mm; }
          .item { border: 1px solid #dfd8cd; border-radius: 3mm; background: #fff; padding: 2.8mm 3.2mm; display: grid; gap: 1.2mm; }
          .item span { color: #61574b; font-size: 12px; }
          .item strong { font-size: 16px; }
          .net { margin-top: 4mm; padding: 3.2mm 3.6mm; border-radius: 3mm; border: 1px solid #dcb49b; background: #fff5ef; display: flex; align-items: center; justify-content: space-between; gap: 10px; }
          .net span { color: #7a4a34; font-size: 13px; font-weight: 700; }
          .net strong { color: #8f351e; font-size: 22px; }
          .note { margin-top: 3mm; font-size: 11px; color: #6b5f52; }
          @media (max-width: 720px) {
            .toolbar { position: static; padding: 10px 12px; }
            .actions { width: 100%; }
            .button { flex: 1; }
            .sheet { width: 100%; padding: 12px; }
            .grid { grid-template-columns: 1fr; }
          }
          @media print {
            body { background: #fff; }
            .toolbar { display: none; }
            .sheet { width: auto; margin: 0; padding: 0; }
          }
        </style>
      </head>
      <body>
        <header class="toolbar">
          <h1>個人別 簡易給与明細</h1>
          <div class="actions">
            <button class="button button--print" type="button" onclick="window.print()">この明細を印刷</button>
            <button class="button button--close" type="button" onclick="window.close()">閉じる</button>
          </div>
        </header>
        <main class="sheet">
          <section class="card">
            <p class="app-name">(株)大成園　作業記録アプリ</p>
            <h2 class="title">個人別 簡易給与明細</h2>
            <p class="meta">対象期間: ${escapeHtml(periodText)}</p>
            <p class="meta">締め区分: ${escapeHtml(periodConfig.closeLabel)}</p>
            <p class="name">${escapeHtml(row.fullName)}${row.category ? `（${escapeHtml(row.category)}）` : ""}</p>

            <div class="grid">
              <div class="item"><span>出勤日数</span><strong>${escapeHtml(attendanceLabel)}</strong></div>
              <div class="item"><span>総労働時間</span><strong>${escapeHtml(hoursLabel)}</strong></div>
              <div class="item"><span>時給</span><strong>${escapeHtml(hourlyRateLabel)}</strong></div>
              <div class="item"><span>基本支給額</span><strong>${escapeHtml(basicPayLabel)}</strong></div>
              <div class="item"><span>手当</span><strong>${escapeHtml(allowanceLabel)}</strong></div>
              <div class="item"><span>控除</span><strong>${escapeHtml(deductionLabel)}</strong></div>
            </div>

            <div class="net">
              <span>差引支給額</span>
              <strong>${escapeHtml(netPayLabel)}</strong>
            </div>
            <p class="note">※ 簡易明細のため、税金・社会保険の計算は含みません。</p>
          </section>
        </main>
      </body>
    </html>
  `;
}

function openPayrollIndividualReportWindow(row, periodConfig) {
  if (!row || !periodConfig) return;
  openGeneratedDocumentWindow(buildPayrollIndividualReportHtml(row, periodConfig), {
    width: 1040,
    height: 900,
    popupBlockedMessage: "個人別明細の表示画面を開けませんでした。ブラウザのポップアップ設定を確認してください。"
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
      <span>延べ人時: <strong>${formatPersonHours(entry.personHours)}</strong></span>
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
    renderCumulativeComparisonRows(orchardCumulativeList, [], "条件を満たす園地別比較はありません。");
    renderCumulativeComparisonRows(plotCumulativeList, [], "条件を満たす区画別比較はありません。");
    return;
  }
  const comparisonData = getCumulativeComparisonData();
  const metricLabelMap = {
    count: "件数基準",
    hours: "総作業時間基準",
    personHours: "延べ人時基準",
    laborCost: "概算人件費基準"
  };
  const metricLabel = metricLabelMap[comparisonSortMetricInput.value] || "総作業時間基準";
  const sortLabel = comparisonSortOrderInput.value === "asc" ? "少ない順" : "多い順";
  const periodRangeText = comparisonData.periodConfig.rangeText ? ` / 期間範囲: ${comparisonData.periodConfig.rangeText}` : "";
  comparisonInfo.textContent = `比較期間: ${comparisonData.periodConfig.label}${periodRangeText} / 並び替え基準: ${metricLabel} / 並び順: ${sortLabel} / 対象記録: ${comparisonData.filteredRecords.length}件`;
  renderCumulativeComparisonRows(orchardCumulativeList, comparisonData.orchardEntries, "条件を満たす園地別比較はありません。");
  renderCumulativeComparisonRows(plotCumulativeList, comparisonData.plotEntries, "条件を満たす区画別比較はありません。");
}

function getSortMetricLabel(metric) {
  const metricLabelMap = {
    count: "件数基準",
    hours: "総作業時間基準",
    personHours: "延べ人時基準",
    laborCost: "概算人件費基準"
  };
  return metricLabelMap[metric] || "総作業時間基準";
}

function getTaskReportPeriodConfig() {
  const mode = taskReportPeriodInput?.value || "month";
  if (mode === "month") {
    const range = getCurrentMonthRange(today);
    return {
      mode,
      label: getComparisonPeriodLabel(mode),
      ...range,
      rangeText: `${formatDateYmd(range.from)}〜${formatDateYmd(range.to)}`,
      isValid: true
    };
  }
  if (mode === "fiscal") {
    const range = getFiscalYearRange(today);
    return {
      mode,
      label: getComparisonPeriodLabel(mode),
      ...range,
      rangeText: `${formatDateYmd(range.from)}〜${formatDateYmd(range.to)}`,
      isValid: true
    };
  }
  const from = taskReportFromDateInput?.value || "";
  const to = taskReportToDateInput?.value || "";
  if (!from || !to) {
    return { mode, label: getComparisonPeriodLabel(mode), from, to, isValid: false, error: "任意期間では開始日と終了日を入力してください。" };
  }
  if (from > to) {
    return { mode, label: getComparisonPeriodLabel(mode), from, to, isValid: false, error: "任意期間の終了日は開始日以降を指定してください。" };
  }
  return {
    mode,
    label: getComparisonPeriodLabel(mode),
    from,
    to,
    rangeText: `${formatDateYmd(from)}〜${formatDateYmd(to)}`,
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
    const taskLabel = normalizeText(record.taskType) || "未設定";
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
    const orchardLabel = names.orchardName || "園地未設定";
    const orchardEntry = getMetricBucket(taskEntry.orchardMap, orchardKey, orchardLabel);
    orchardEntry.count += 1;
    orchardEntry.hours += metrics.hours;
    orchardEntry.personHours += metrics.personHours;
    orchardEntry.laborCost += metrics.laborCost;

    const plotKey = record.plotId || `${names.orchardName}/${names.plotName}`;
    const plotLabel = `${names.orchardName || "園地未設定"} / ${names.plotName || "区画未設定"}`;
    const plotEntry = getMetricBucket(taskEntry.plotMap, plotKey, plotLabel);
    plotEntry.count += 1;
    plotEntry.hours += metrics.hours;
    plotEntry.personHours += metrics.personHours;
    plotEntry.laborCost += metrics.laborCost;

    const groupKey = record.dailyGroupId || names.dailyGroupName;
    const groupLabel = names.dailyGroupName || "未設定";
    const groupEntry = getMetricBucket(taskEntry.groupMap, groupKey, groupLabel);
    groupEntry.count += 1;
    groupEntry.hours += metrics.hours;
    groupEntry.personHours += metrics.personHours;
    groupEntry.laborCost += metrics.laborCost;

    getAssignedWorkers(record).forEach((worker) => {
      const workerKey = worker.id || worker.displayName;
      const workerLabel = worker.displayName || "未設定";
      const workerEntry = taskEntry.workerHourMap.get(workerKey) || { label: workerLabel, hours: 0 };
      workerEntry.hours += metrics.hours;
      taskEntry.workerHourMap.set(workerKey, workerEntry);
    });

    taskMap.set(taskKey, taskEntry);
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
    taskReportInfo.textContent = periodConfig.error || "条件を確認してください。";
    taskTypeReportList.innerHTML = "";
    taskTypeReportList.appendChild(buildEmptyState("条件を満たす作業区分別レポートはありません。"));
    return;
  }

  const reportData = buildTaskTypeReportData();
  const metricLabel = getSortMetricLabel(reportData.metric);
  const sortLabel = reportData.sortOrder === "asc" ? "少ない順" : "多い順";
  const rangeText = reportData.periodConfig.rangeText ? ` / 期間範囲: ${reportData.periodConfig.rangeText}` : "";
  taskReportInfo.textContent = `対象期間: ${reportData.periodConfig.label}${rangeText} / 並び替え基準: ${metricLabel} / 並び順: ${sortLabel} / 対象記録: ${reportData.filteredRecords.length}件 / 作業区分数: ${reportData.taskEntries.length}件`;

  taskTypeReportList.innerHTML = "";
  if (!reportData.taskEntries.length) {
    taskTypeReportList.appendChild(buildEmptyState("条件を満たす作業区分別レポートはありません。"));
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
          <span>延べ人時: <strong>${escapeHtml(formatPersonHours(taskEntry.personHours))}</strong></span>
          <span>概算人件費: <strong>${escapeHtml(formatCurrency(taskEntry.laborCost))}</strong></span>
        </div>
      </summary>
      <div class="task-report-card__body">
        <section class="task-report-breakdown">
          <h5>園地別内訳</h5>
          <div class="task-report-table-wrap">
            <table class="task-report-table">
              <thead>
                <tr><th>園地</th><th>件数</th><th>総作業時間</th><th>延べ人時</th><th>概算人件費</th></tr>
              </thead>
              <tbody>${buildTaskTypeMetricRowsHtml(taskEntry.orchardEntries, "園地別データはありません。")}</tbody>
            </table>
          </div>
        </section>
        <section class="task-report-breakdown">
          <h5>区画別内訳</h5>
          <div class="task-report-table-wrap">
            <table class="task-report-table">
              <thead>
                <tr><th>区画</th><th>件数</th><th>総作業時間</th><th>延べ人時</th><th>概算人件費</th></tr>
              </thead>
              <tbody>${buildTaskTypeMetricRowsHtml(taskEntry.plotEntries, "区画別データはありません。")}</tbody>
            </table>
          </div>
        </section>
        <section class="task-report-breakdown">
          <h5>作業グループ別集計</h5>
          <div class="task-report-table-wrap">
            <table class="task-report-table">
              <thead>
                <tr><th>作業グループ</th><th>件数</th><th>総作業時間</th><th>延べ人時</th><th>概算人件費</th></tr>
              </thead>
              <tbody>${buildTaskTypeMetricRowsHtml(taskEntry.groupEntries, "作業グループ別データはありません。")}</tbody>
            </table>
          </div>
        </section>
        <section class="task-report-breakdown">
          <h5>作業者別総作業時間</h5>
          <div class="task-report-table-wrap">
            <table class="task-report-table">
              <thead>
                <tr><th>作業者</th><th>総作業時間</th></tr>
              </thead>
              <tbody>${buildTaskTypeWorkerRowsHtml(taskEntry.workerEntries, "作業者別データはありません。")}</tbody>
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
      rangeText: `${formatDateYmd(range.from)}〜${formatDateYmd(range.to)}`,
      isValid: true
    };
  }
  if (mode === "fiscal") {
    const range = getFiscalYearRange(today);
    return {
      mode,
      label: getComparisonPeriodLabel(mode),
      ...range,
      rangeText: `${formatDateYmd(range.from)}〜${formatDateYmd(range.to)}`,
      isValid: true
    };
  }
  const from = varietyReportFromDateInput?.value || "";
  const to = varietyReportToDateInput?.value || "";
  if (!from || !to) {
    return { mode, label: getComparisonPeriodLabel(mode), from, to, isValid: false, error: "任意期間では開始日と終了日を入力してください。" };
  }
  if (from > to) {
    return { mode, label: getComparisonPeriodLabel(mode), from, to, isValid: false, error: "任意期間の終了日は開始日以降を指定してください。" };
  }
  return {
    mode,
    label: getComparisonPeriodLabel(mode),
    from,
    to,
    rangeText: `${formatDateYmd(from)}〜${formatDateYmd(to)}`,
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
    const varietyLabel = names.varietyName || "品種未設定";
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
    const orchardLabel = names.orchardName || "園地未設定";
    const orchardEntry = getMetricBucket(varietyEntry.orchardMap, orchardKey, orchardLabel);
    orchardEntry.count += 1;
    orchardEntry.hours += metrics.hours;
    orchardEntry.personHours += metrics.personHours;
    orchardEntry.laborCost += metrics.laborCost;

    const plotKey = record.plotId || `${names.orchardName}/${names.plotName}`;
    const plotLabel = `${names.orchardName || "園地未設定"} / ${names.plotName || "区画未設定"}`;
    const plotEntry = getMetricBucket(varietyEntry.plotMap, plotKey, plotLabel);
    plotEntry.count += 1;
    plotEntry.hours += metrics.hours;
    plotEntry.personHours += metrics.personHours;
    plotEntry.laborCost += metrics.laborCost;

    const taskKey = normalizeText(record.taskType) || "未設定";
    const taskEntry = getMetricBucket(varietyEntry.taskMap, taskKey, taskKey);
    taskEntry.count += 1;
    taskEntry.hours += metrics.hours;
    taskEntry.personHours += metrics.personHours;
    taskEntry.laborCost += metrics.laborCost;

    const groupKey = record.dailyGroupId || names.dailyGroupName;
    const groupLabel = names.dailyGroupName || "未設定";
    const groupEntry = getMetricBucket(varietyEntry.groupMap, groupKey, groupLabel);
    groupEntry.count += 1;
    groupEntry.hours += metrics.hours;
    groupEntry.personHours += metrics.personHours;
    groupEntry.laborCost += metrics.laborCost;

    getAssignedWorkers(record).forEach((worker) => {
      const workerKey = worker.id || worker.displayName;
      const workerLabel = worker.displayName || "未設定";
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
    varietyReportInfo.textContent = periodConfig.error || "条件を確認してください。";
    varietyTypeReportList.innerHTML = "";
    varietyTypeReportList.appendChild(buildEmptyState("条件を満たす品種別レポートはありません。"));
    return;
  }

  const reportData = buildVarietyTypeReportData();
  const metricLabel = getSortMetricLabel(reportData.metric);
  const sortLabel = reportData.sortOrder === "asc" ? "少ない順" : "多い順";
  const rangeText = reportData.periodConfig.rangeText ? ` / 期間範囲: ${reportData.periodConfig.rangeText}` : "";
  varietyReportInfo.textContent = `対象期間: ${reportData.periodConfig.label}${rangeText} / 並び替え基準: ${metricLabel} / 並び順: ${sortLabel} / 対象記録: ${reportData.filteredRecords.length}件 / 品種数: ${reportData.varietyEntries.length}件`;

  varietyTypeReportList.innerHTML = "";
  if (!reportData.varietyEntries.length) {
    varietyTypeReportList.appendChild(buildEmptyState("条件を満たす品種別レポートはありません。"));
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
          <span>延べ人時: <strong>${escapeHtml(formatPersonHours(varietyEntry.personHours))}</strong></span>
          <span>概算人件費: <strong>${escapeHtml(formatCurrency(varietyEntry.laborCost))}</strong></span>
        </div>
      </summary>
      <div class="task-report-card__body">
        <section class="task-report-breakdown">
          <h5>園地別内訳</h5>
          <div class="task-report-table-wrap">
            <table class="task-report-table">
              <thead>
                <tr><th>園地</th><th>件数</th><th>総作業時間</th><th>延べ人時</th><th>概算人件費</th></tr>
              </thead>
              <tbody>${buildTaskTypeMetricRowsHtml(varietyEntry.orchardEntries, "園地別データはありません。")}</tbody>
            </table>
          </div>
        </section>
        <section class="task-report-breakdown">
          <h5>区画別内訳</h5>
          <div class="task-report-table-wrap">
            <table class="task-report-table">
              <thead>
                <tr><th>区画</th><th>件数</th><th>総作業時間</th><th>延べ人時</th><th>概算人件費</th></tr>
              </thead>
              <tbody>${buildTaskTypeMetricRowsHtml(varietyEntry.plotEntries, "区画別データはありません。")}</tbody>
            </table>
          </div>
        </section>
        <section class="task-report-breakdown">
          <h5>作業区分別内訳</h5>
          <div class="task-report-table-wrap">
            <table class="task-report-table">
              <thead>
                <tr><th>作業区分</th><th>件数</th><th>総作業時間</th><th>延べ人時</th><th>概算人件費</th></tr>
              </thead>
              <tbody>${buildTaskTypeMetricRowsHtml(varietyEntry.taskEntries, "作業区分別データはありません。")}</tbody>
            </table>
          </div>
        </section>
        <section class="task-report-breakdown">
          <h5>作業グループ別集計</h5>
          <div class="task-report-table-wrap">
            <table class="task-report-table">
              <thead>
                <tr><th>作業グループ</th><th>件数</th><th>総作業時間</th><th>延べ人時</th><th>概算人件費</th></tr>
              </thead>
              <tbody>${buildTaskTypeMetricRowsHtml(varietyEntry.groupEntries, "作業グループ別データはありません。")}</tbody>
            </table>
          </div>
        </section>
        <section class="task-report-breakdown">
          <h5>作業者別総作業時間</h5>
          <div class="task-report-table-wrap">
            <table class="task-report-table">
              <thead>
                <tr><th>作業者</th><th>総作業時間</th></tr>
              </thead>
              <tbody>${buildTaskTypeWorkerRowsHtml(varietyEntry.workerEntries, "作業者別データはありません。")}</tbody>
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
      const label = getLabel(item) || "未設定";
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
    (item) => item.names.orchardName || "園地未設定"
  );
  const plotEntries = buildMetricEntries(
    (item) => item.record.plotId || `${item.names.orchardName}/${item.names.plotName}`,
    (item) => `${item.names.orchardName || "園地未設定"} / ${item.names.plotName || "区画未設定"}`
  );
  const taskEntries = buildMetricEntries(
    (item) => normalizeText(item.record.taskType) || "未設定",
    (item) => normalizeText(item.record.taskType) || "未設定"
  );
  const varietyEntries = buildMetricEntries(
    (item) => item.record.varietyId || item.names.varietyName,
    (item) => item.names.varietyName || "品種未設定"
  );
  const groupEntries = buildMetricEntries(
    (item) => item.record.dailyGroupId || item.names.dailyGroupName,
    (item) => item.names.dailyGroupName || "未設定"
  );

  const workerSortDirection = sortOrder === "asc" ? 1 : -1;
  const workerHoursEntries = Array.from(
    filteredRecords.reduce((map, record) => {
      const hours = Number(record.workHours || 0);
      getAssignedWorkers(record).forEach((worker) => {
        const key = worker.id || worker.displayName;
        const current = map.get(key) || { label: worker.displayName || "未設定", hours: 0 };
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
    periodLabel: `${formatDateYmd(fiscalRange.from)}〜${formatDateYmd(fiscalRange.to)}`,
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
  const sortLabel = data.sortOrder === "asc" ? "少ない順" : "多い順";
  annualReportInfo.textContent = `対象決算年度: ${data.periodLabel} / 並び替え基準: ${metricLabel} / 並び順: ${sortLabel} / 対象記録: ${data.filteredRecords.length}件`;

  annualReportSummary.innerHTML = `
    <div class="annual-report-summary__item"><span>対象決算年度</span><strong>${escapeHtml(data.periodLabel)}</strong></div>
    <div class="annual-report-summary__item"><span>総作業件数</span><strong>${escapeHtml(formatCount(data.summary.count))}</strong></div>
    <div class="annual-report-summary__item"><span>総作業時間</span><strong>${escapeHtml(formatHours(data.summary.hours))}</strong></div>
    <div class="annual-report-summary__item"><span>総延べ人時</span><strong>${escapeHtml(formatPersonHours(data.summary.personHours))}</strong></div>
    <div class="annual-report-summary__item"><span>総概算人件費</span><strong>${escapeHtml(formatCurrency(data.summary.laborCost))}</strong></div>
  `;

  const metricSection = (title, labelColumn, entries, emptyMessage) => `
    <section class="task-report-breakdown">
      <h5>${escapeHtml(title)}</h5>
      <div class="task-report-table-wrap">
        <table class="task-report-table">
          <thead>
            <tr><th>${escapeHtml(labelColumn)}</th><th>件数</th><th>総作業時間</th><th>延べ人時</th><th>概算人件費</th></tr>
          </thead>
          <tbody>${buildTaskTypeMetricRowsHtml(entries, emptyMessage)}</tbody>
        </table>
      </div>
    </section>
  `;
  const workerSection = `
    <section class="task-report-breakdown">
      <h5>作業者別年間総作業時間</h5>
      <div class="task-report-table-wrap">
        <table class="task-report-table">
          <thead>
            <tr><th>作業者</th><th>総作業時間</th></tr>
          </thead>
          <tbody>${buildTaskTypeWorkerRowsHtml(data.workerHoursEntries, "作業者別データはありません。")}</tbody>
        </table>
      </div>
    </section>
  `;

  annualReportList.innerHTML = `
    <article class="task-report-card">
      <div class="task-report-card__body">
        ${metricSection("園地別年間集計", "園地", data.orchardEntries, "園地データはありません。")}
        ${metricSection("区画別年間集計", "区画", data.plotEntries, "区画データはありません。")}
        ${metricSection("作業区分別年間集計", "作業区分", data.taskEntries, "作業区分データはありません。")}
        ${metricSection("品種別年間集計", "品種", data.varietyEntries, "品種データはありません。")}
        ${metricSection("グループ別年間集計", "作業グループ", data.groupEntries, "グループデータはありません。")}
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
  return `${worker.displayName} (${worker.category}${primaryGroup ? ` / 主所属:${primaryGroup.name}` : ""})`;
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
    orchardName: orchard?.name || record.orchardName || "園地未設定",
    plotName: plot?.name || record.plotName || "区画未設定",
    varietyName: variety?.name || record.varietyName || "品種未設定",
    dailyGroupName: dailyGroup?.name || record.dailyGroupName || "未設定",
    fixedTeamSetName: fixedTeamSet?.name || record.fixedTeamSetName || "未使用",
    workerName: primaryWorker?.displayName || record.workerDisplayName || record.workerName || "未登録",
    workerListText: getWorkerNameList(record).join("、") || "未登録",
    workerFullName: primaryWorker?.fullName || record.workerName || "未登録",
    workerCategory: primaryWorker?.category || record.workerCategory || "未設定",
    workerHourlyRate: Number(primaryWorker?.hourlyRate ?? record.workerHourlyRate ?? 0),
    primaryGroupName: primaryGroup?.name || "未設定"
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
    recordAppliedTeamSetId = "";
    recordAppliedTeamSetName = "";
    selectedWorkerCount.textContent = "0人選択";
    workerPickerHint.textContent = "先に当日グループを選択してください。";
    workerSelectionList.appendChild(buildEmptyState("グループを選ぶと、そのグループに所属可能な作業者だけ表示されます。"));
    return;
  }

  if (!selectableWorkers.length) {
    selectedWorkerIds = [];
    syncWorkerCountFromSelection();
    selectedWorkerCount.textContent = "0人選択";
    workerPickerHint.textContent = "このグループに所属可能な有効作業者がいません。";
    workerSelectionList.appendChild(buildEmptyState("作業者所属グループ設定で所属状況を確認してください。"));
    return;
  }

  selectedWorkerIds = selectedWorkerIds.filter((workerId) => selectableWorkers.some((worker) => worker.id === workerId));
  selectedWorkerCount.textContent = `${selectedWorkerIds.length}人選択`;
  workerPickerHint.textContent = "複数選択できます。選択人数は作業人数へ自動反映されますが、手入力で修正もできます。";

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
      selectedWorkerCount.textContent = `${selectedWorkerIds.length}人選択`;
      syncWorkerCountFromSelection();
    });

    const body = document.createElement("span");
    body.className = "worker-selection-item__body";
    const title = document.createElement("strong");
    title.textContent = worker.displayName;
    const primaryGroup = getWorkerPrimaryGroup(worker);
    const meta = document.createElement("span");
    meta.textContent = `${worker.fullName} ・ ${worker.category} ・ 主所属:${primaryGroup?.name || "未設定"} ・ ${formatCurrency(worker.hourlyRate)}`;
    body.append(title, meta);
    label.append(checkbox, body);
    workerSelectionList.appendChild(label);
  });
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
    teamSetHint.textContent = "固定チームセットを呼び出すと、参加者を一括で反映できます。";
    teamPlanSelectedCount.textContent = "0人選択";
    teamPlanHint.textContent = "日付と作業グループを選択してください。";
    teamPlanWorkerList.appendChild(buildEmptyState("所属者を基本に、応援者も含めてその日の参加者を決められます。"));
    return;
  }

  const availableTeamSets = getTeamSetsByGroupId(groupId);
  const existingPlan = getTeamPlan(workDate, groupId);
  const preferredTeamSetId = existingPlan?.fixedTeamSetId || teamSetSelectInput.value;
  renderSelectOptions(teamSetSelectInput, availableTeamSets, {
    placeholder: availableTeamSets.length ? "固定チームセットを選択してください" : "このグループの固定セットはありません",
    allowBlank: true,
    value: preferredTeamSetId,
    labelBuilder: (teamSet) => teamSet.name
  });
  const selectedTeamSet = getTeamSetById(teamSetSelectInput.value);
  teamSetHint.textContent = selectedTeamSet
    ? `現在選択中: ${selectedTeamSet.name}（必要に応じて欠勤者を外し、応援者を追加できます）`
    : "固定チームセットを呼び出すと、参加者を一括で反映できます。";

  const memberships = getMembershipsByGroupId(groupId);
  const defaultMemberIds = memberships.map((membership) => membership.workerId);
  if (!selectedTeamPlanWorkerIds.length) {
    selectedTeamPlanWorkerIds = existingPlan?.workerIds?.length ? existingPlan.workerIds.slice() : defaultMemberIds.slice();
    teamPlanIdInput.value = existingPlan?.id || "";
  }

  const workers = getActiveWorkers();
  teamPlanSelectedCount.textContent = `${selectedTeamPlanWorkerIds.length}人選択`;
  teamPlanHint.textContent = "欠勤者は外し、他グループ所属の応援者も追加できます。";

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
    const supportFlag = defaultMemberIds.includes(worker.id) ? "" : " / 応援候補";
    title.textContent = `${worker.displayName}${supportFlag}`;
    const meta = document.createElement("span");
    meta.textContent = `${renderWorkerMembershipSummary(worker)} ・ ${worker.category}`;
    body.append(title, meta);
    label.append(checkbox, body);
    teamPlanWorkerList.appendChild(label);
  });
}

function renderTeamSetWorkerList() {
  teamSetWorkerList.innerHTML = "";
  const groupId = teamSetGroupIdInput.value;
  const workers = getActiveWorkers();
  if (!groupId) {
    teamSetSelectedCount.textContent = "0人選択";
    teamSetWorkerHint.textContent = "先に作業グループを選択してください。";
    teamSetWorkerList.appendChild(buildEmptyState("作業グループを選択すると、セット作業者を選べます。"));
    return;
  }
  if (!workers.length) {
    teamSetSelectedCount.textContent = "0人選択";
    teamSetWorkerHint.textContent = "有効作業者がいません。";
    teamSetWorkerList.appendChild(buildEmptyState("作業者マスターで有効な作業者を登録してください。"));
    return;
  }

  teamSetSelectedCount.textContent = `${selectedTeamSetWorkerIds.length}人選択`;
  teamSetWorkerHint.textContent = "セットに登録した後も、日別編成で欠勤者除外・応援者追加ができます。";
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
    membershipSelectedCount.textContent = "0件選択";
    membershipHint.textContent = "先に作業者を選択してください。";
    membershipGroupList.appendChild(buildEmptyState("作業者を選ぶと所属グループ設定が表示されます。"));
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
  membershipHint.textContent = "複数所属できます。主所属グループは1つだけ設定してください。";

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
    meta.textContent = `${group.description || "説明なし"}${group.isActive ? "" : " ・ 無効"}`;
    body.append(title, meta);
    label.append(checkbox, body);
    membershipGroupList.appendChild(label);
  });

  syncMembershipPrimaryOptions();
}

function renderMasterSelects() {
  const selectedOrchardId = orchardSelect.value;
  const selectedPlotId = plotSelect.value;
  const selectedVarietyId = varietySelect.value;
  const selectedDailyGroupId = groupSelect.value;
  const selectedPlotFormOrchardId = plotOrchardInput.value;
  const selectedOrchardFilter = orchardFilterInput.value;
  const selectedVarietyFilter = varietyFilterInput.value;
  const selectedWorkerFilter = workerFilterInput.value;
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
    placeholder: "すべての作業者",
    allowBlank: true,
    value: selectedWorkerFilter,
    labelBuilder: (worker) => `${worker.displayName}${worker.isActive ? "" : " (無効)"}`
  });
  renderSelectOptions(membershipWorkerIdInput, masters.workers, {
    placeholder: masters.workers.length ? "作業者を選択してください" : "先に作業者を登録してください",
    value: selectedMembershipWorkerId,
    labelBuilder: (worker) => `${worker.displayName} / ${worker.fullName}`
  });

  renderPlotOptions(selectedOrchardId, selectedPlotId);
  renderWorkerSelectionList();
  renderMembershipGroupList();
  renderTeamSetWorkerList();
  renderTeamPlanWorkerList();
}

function renderPlotOptions(orchardId, selectedPlotId = "") {
  const plotItems = masters.plots.filter((plot) => plot.orchardId === orchardId);
  renderSelectOptions(plotSelect, plotItems, {
    placeholder: orchardId ? (plotItems.length ? "区画を選択してください" : "この園地には区画がありません") : "先に園地を選択してください",
    value: selectedPlotId
  });
}

function getFormData() {
  const orchard = getOrchardById(orchardSelect.value);
  const plot = getPlotById(plotSelect.value);
  const variety = getVarietyById(varietySelect.value);
  const dailyGroup = getGroupById(groupSelect.value);
  const assignedWorkers = selectedWorkerIds.map((workerId) => getWorkerById(workerId)).filter(Boolean);
  const primaryWorker = assignedWorkers[0] || null;
  const autoHours = calculateHoursFromRange(startTimeInput.value, endTimeInput.value);
  const manualHours = normalizeHoursByTimeUnit(workHoursInput.value);
  const resolvedWorkHours = Number.isFinite(autoHours)
    ? autoHours
    : (manualHours > 0 ? manualHours : getDefaultWorkHours());
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
    taskType: taskTypeInput.value,
    workHours: resolvedWorkHours,
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
    startTime: startTimeInput.value,
    endTime: endTimeInput.value,
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
    title: "設定",
    lead: "設定トップから必要な項目だけ開いてください。"
  },
  company: {
    title: "会社設定",
    lead: "決算締月・決算締日を設定します。"
  },
  orchard: {
    title: "園地設定",
    lead: "園地、区画、品種を管理します。"
  },
  worker: {
    title: "作業者設定",
    lead: "グループ、固定チームセット、作業者情報を管理します。"
  },
  backup: {
    title: "バックアップ",
    lead: "件数を確認してJSONバックアップを保存できます。"
  },
  advanced: {
    title: "くわしい設定",
    lead: "CSV、復元、初期化など管理者向け操作です。"
  },
  qr: {
    title: "QRコード",
    lead: "QR一覧・印刷を管理します。"
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
      return workerFullNameInput;
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
    lead: "見たいまとめを選んでください。"
  },
  daily: {
    title: "日報",
    lead: "指定日の作業日報を確認・印刷できます。"
  },
  monthly: {
    title: "月報",
    lead: "指定した月の結果を確認・保存できます。"
  },
  annual: {
    title: "年度レポート",
    lead: "決算年度ベースの総合レポートを確認できます。"
  },
  comparison: {
    title: "比較表",
    lead: "累積比較や分析結果を確認できます。"
  },
  payroll: {
    title: "簡易給与明細",
    lead: "作業記録から、月締め・半月締め・任意期間の簡易明細を作成できます。"
  },
  worktime: {
    title: "労働時間分析",
    lead: "個人別・全体の労働時間を週・月・年で見える化できます。"
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

function setAppView(viewKey, options = {}) {
  if (!viewKey || !appViewPanelMap[viewKey] || !appViewPanels.length) return;
  const { scrollIntoView = true, focusElement = null } = options;
  activeAppViewKey = viewKey;

  appViewPanels.forEach((panel) => {
    panel.hidden = !appViewPanelMap[viewKey].includes(panel.id);
  });

  if (bottomNavButtons.length) {
    bottomNavButtons.forEach((button) => {
      const isActive = button.dataset.appView === viewKey;
      button.classList.toggle("is-active", isActive);
      if (isActive) {
        button.setAttribute("aria-current", "page");
      } else {
        button.removeAttribute("aria-current");
      }
    });
  }
  if (document?.body) {
    document.body.dataset.currentView = viewKey;
  }

  if (viewKey === "settings") {
    applySettingsSectionState();
    if (document?.body) {
      delete document.body.dataset.summarySection;
    }
  } else if (viewKey === "summary") {
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
    if (viewKey === "settings") {
      activePanel = activeSettingsSection === "qr" ? qrPanel : masterPanel;
    } else if (viewKey === "summary") {
      activePanel = analyticsPanel;
    }
    if (!activePanel) {
      const firstPanelId = appViewPanelMap[viewKey][0];
      activePanel = document.getElementById(firstPanelId);
    }
    if (activePanel) {
      scrollToElement(activePanel);
    }
  }

  focusElementLater(focusElement);
}

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
      const matchesTask = !taskType || record.taskType === taskType;
      const matchesWorker = !workerId || record.assignedWorkers.some((item) => item.workerId === workerId);
      return matchesDate && matchesOrchard && matchesVariety && matchesTask && matchesWorker;
    });
}

function fillRecordForm(record) {
  const environment = normalizeRecordEnvironment(record);
  const observation = normalizeFieldObservation(record.fieldObservation);
  const hasManualRange = Boolean(record.startTime && record.endTime);
  const hasManualHoursOnly = !hasManualRange && Number(record.workHours || 0) > 0;
  recordIdInput.value = record.id;
  workDateInput.value = record.workDate;
  orchardSelect.value = record.orchardId || "";
  renderPlotOptions(record.orchardId || "", record.plotId || "");
  varietySelect.value = record.varietyId || "";
  taskTypeInput.value = record.taskType;
  workHoursInput.value = record.workHours || "";
  groupSelect.value = record.dailyGroupId || "";
  recordAppliedTeamSetId = record.fixedTeamSetId || "";
  recordAppliedTeamSetName = record.fixedTeamSetName || "";
  workerCountInput.value = record.workerCount || "";
  selectedWorkerIds = getAssignedWorkers(record).map((worker) => worker.id);
  startTimeInput.value = record.startTime || "";
  endTimeInput.value = record.endTime || "";
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
    setWeatherFetchStatus(summary ? `保存済み: ${summary}` : "保存済みの天気情報があります。必要に応じて再取得してください。", "success");
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
  formMode.textContent = "編集中";
  renderWorkerSelectionList();
  updateTimeHint();
  if (hasManualHoursOnly) {
    workHoursInput.value = String(Number(record.workHours || 0));
    timeHint.textContent = `作業時間 ${Number(record.workHours || 0)} 時間（手入力値）を使用しています。`;
  }
  moveToShortcut(recordFormPanel, workDateInput);
}

function resetRecordForm() {
  form.reset();
  recordIdInput.value = "";
  formMode.textContent = "新規登録";
  workDateInput.value = today;
  applyDefaultWorkScheduleToForm(true);
  orchardSelect.value = "";
  varietySelect.value = "";
  groupSelect.value = "";
  recordAppliedTeamSetId = "";
  recordAppliedTeamSetName = "";
  recordWeatherInfo = null;
  selectedWorkerIds = [];
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
  if (!window.confirm("この作業記録を削除しますか？")) return;
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
    recordList.appendChild(buildEmptyState("この日の記録はありません。"));
    return;
  }
  if (!filteredRecords.length && records.length < 0) {
    recordList.appendChild(buildEmptyState(records.length ? "条件に合う作業記録がありません。絞り込み条件を見直してください。" : "サンプルを参考に、最初の作業記録を登録してください。"));
    return;
  }

  filteredRecords.forEach((record) => {
    const names = getRecordDisplay(record);
    const metrics = getRecordMetrics(record);
    const environment = normalizeRecordEnvironment(record);
    const fragment = cardTemplate.content.cloneNode(true);
    const card = fragment.querySelector(".record-card");
    fragment.querySelector(".record-card__date").textContent = formatDate(record.workDate);
    fragment.querySelector(".record-card__task").textContent = record.taskType || "作業内容未設定";
    fragment.querySelector(".record-card__orchard").textContent = names.orchardName;
    fragment.querySelector(".record-card__plot").textContent = names.plotName;
    fragment.querySelector(".record-card__variety").textContent = names.varietyName;
    fragment.querySelector(".record-card__hours").textContent = record.workHours ? formatHours(record.workHours) : "未入力";
    fragment.querySelector(".record-card__workers").textContent = record.workerCount ? `${record.workerCount}人` : "未入力";
    fragment.querySelector(".record-card__person-hours").textContent = formatPersonHours(metrics.personHours);
    fragment.querySelector(".record-card__labor-cost").textContent = formatCurrency(metrics.laborCost);
    fragment.querySelector(".record-card__worker-name").textContent = names.workerName;
    fragment.querySelector(".record-card__worker-list").textContent = names.workerListText;
    fragment.querySelector(".record-card__group").textContent = names.dailyGroupName;
    fragment.querySelector(".record-card__team-set").textContent = names.fixedTeamSetName;
    fragment.querySelector(".record-card__worker-category").textContent = names.workerCategory;
    fragment.querySelector(".record-card__worker-rate").textContent = formatCurrency(names.workerHourlyRate);
    fragment.querySelector(".record-card__time-range").textContent = record.startTime && record.endTime ? `${record.startTime} - ${record.endTime}` : "未入力";
    fragment.querySelector(".record-card__temperature").textContent = formatTemperature(environment.temperatureC);
    const weatherBaseLabel = environment.weather || environment.weatherInfo?.weatherText || "未入力";
    const weatherDetail = formatWeatherInfoSummary(environment.weatherInfo);
    fragment.querySelector(".record-card__weather").textContent = weatherDetail ? `${weatherBaseLabel} / ${weatherDetail}` : weatherBaseLabel;
    const observationSummary = formatFieldObservationSummary(record.fieldObservation);
    const observationNode = fragment.querySelector(".record-card__observation");
    if (observationNode) {
      observationNode.textContent = observationSummary || "未入力";
    }
    fragment.querySelector(".record-card__materials").textContent = record.materials || "未入力";
    fragment.querySelector(".record-card__notes").textContent = record.notes || "メモはありません。";
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
  editButton.textContent = "編集";
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
  teamSetHint.textContent = "固定チームセットを呼び出すと、参加者を一括で反映できます。";
  selectedTeamPlanWorkerIds = [];
}

function renderWorkerMembershipSummary(worker) {
  const memberships = getMembershipsByWorkerId(worker.id);
  if (!memberships.length) return "所属グループ未設定";
  return memberships.map((membership) => {
    const group = getGroupById(membership.groupId);
    return `${group?.name || "未設定"}${membership.isPrimary ? " (主所属)" : ""}`;
  }).join("、");
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
    orchardList.appendChild(buildEmptyState("園地がありません。最初の園地を登録してください。"));
  } else {
    masters.orchards.forEach((orchard) => {
      const plotTotal = masters.plots.filter((plot) => plot.orchardId === orchard.id).length;
      const codeLabel = orchard.managementCode ? orchard.managementCode : "未設定（要設定）";
      const coordinateLabel = Number.isFinite(orchard.latitude) && Number.isFinite(orchard.longitude)
        ? `${formatCoordinate(orchard.latitude)}, ${formatCoordinate(orchard.longitude)}`
        : "未設定";
      orchardList.appendChild(createMasterRow(orchard, `管理コード: ${codeLabel} / 位置: ${coordinateLabel} / 登録区画数: ${plotTotal}件`, orchard.note, () => {
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
    plotList.appendChild(buildEmptyState("区画がありません。園地を選んで区画を登録してください。"));
  } else {
    masters.plots.forEach((plot) => {
      const orchard = getOrchardById(plot.orchardId);
      const codeLabel = plot.managementCode ? plot.managementCode : "未設定（要設定）";
      plotList.appendChild(createMasterRow(plot, `所属園地: ${orchard?.name || "未設定"} / 管理コード: ${codeLabel}`, plot.note, () => {
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
    varietyList.appendChild(buildEmptyState("品種がありません。最初の品種を登録してください。"));
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
    groupList.appendChild(buildEmptyState("グループがありません。最初のグループを登録してください。"));
  } else {
    sortGroups(masters.groups).forEach((group) => {
      const memberCount = getMembershipsByGroupId(group.id).length;
      const status = group.isActive ? "有効" : "無効";
      groupList.appendChild(createMasterRow({ title: `${group.sortOrder}. ${group.name}` }, `所属可能作業者: ${memberCount}人 ・ ${status}`, group.description, () => {
        groupIdInput.value = group.id;
        groupNameInput.value = group.name;
        groupSortOrderInput.value = String(group.sortOrder);
        groupDescriptionInput.value = group.description;
        groupIsActiveInput.checked = group.isActive;
        groupNameInput.focus();
      }, () => deleteGroup(group.id)));
    });
  }

  if (!masters.workers.length) {
    workerList.appendChild(buildEmptyState("作業者がありません。最初の作業者を登録してください。"));
  } else {
    masters.workers.forEach((worker) => {
      const status = worker.isActive ? "有効" : "無効";
      workerList.appendChild(createMasterRow({ title: `${worker.displayName} / ${worker.fullName}` }, `${renderWorkerMembershipSummary(worker)} ・ ${worker.category} ・ ${formatCurrency(worker.hourlyRate)} ・ ${status}`, "同じ人を別グループ用に重複登録しない運用です。", () => {
        workerIdInput.value = worker.id;
        workerFullNameInput.value = worker.fullName;
        workerDisplayNameInput.value = worker.displayName;
        workerCategoryInput.value = worker.category;
        workerHourlyRateInput.value = String(worker.hourlyRate);
        workerIsActiveInput.checked = worker.isActive;
        workerFullNameInput.focus();
      }, () => deleteWorker(worker.id)));
    });
  }

  if (!masters.workers.length) {
    membershipList.appendChild(buildEmptyState("作業者を登録すると所属グループ設定ができます。"));
  } else {
    masters.workers.forEach((worker) => {
      membershipList.appendChild(createMasterRow(
        { title: `${worker.displayName} / ${worker.fullName}` },
        renderWorkerMembershipSummary(worker),
        "主所属は集計の「主所属別」に反映されます。",
        () => {
          membershipWorkerIdInput.value = worker.id;
          selectedMembershipGroupIds = getMembershipsByWorkerId(worker.id).map((membership) => membership.groupId);
          const primary = getMembershipsByWorkerId(worker.id).find((membership) => membership.isPrimary);
          membershipPrimaryGroupIdInput.value = primary?.groupId || selectedMembershipGroupIds[0] || "";
          renderMembershipGroupList();
          membershipWorkerIdInput.focus();
        },
        () => deleteWorkerMembershipSettings(worker.id)
      ));
    });
  }

  if (!masters.fixedTeamSets.length) {
    teamSetList.appendChild(buildEmptyState("固定チームセットはまだありません。"));
  } else {
    masters.fixedTeamSets
      .slice()
      .sort((a, b) => (getGroupById(a.groupId)?.sortOrder || 999) - (getGroupById(b.groupId)?.sortOrder || 999) || a.name.localeCompare(b.name, "ja"))
      .forEach((teamSet) => {
        const group = getGroupById(teamSet.groupId);
        const workers = teamSet.workerIds.map((workerId) => getWorkerById(workerId)?.displayName).filter(Boolean).join("、");
        teamSetList.appendChild(createMasterRow(
          { title: teamSet.name },
          `${group?.name || "未設定グループ"} ・ ${teamSet.workerIds.length}人`,
          workers || "作業者未設定",
          () => {
            teamSetIdInput.value = teamSet.id;
            teamSetNameInput.value = teamSet.name;
            teamSetGroupIdInput.value = teamSet.groupId;
            selectedTeamSetWorkerIds = teamSet.workerIds.slice();
            renderTeamSetWorkerList();
          },
          () => {
            if (!window.confirm("この固定チームセットを削除しますか？")) return;
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
    teamPlanList.appendChild(buildEmptyState("日別チーム編成はまだありません。"));
  } else {
    [...teamPlans]
      .sort((a, b) => b.workDate.localeCompare(a.workDate) || getGroupById(a.groupId)?.sortOrder - getGroupById(b.groupId)?.sortOrder)
      .forEach((plan) => {
        const group = getGroupById(plan.groupId);
        const names = plan.workerIds.map((workerId) => getWorkerById(workerId)?.displayName).filter(Boolean).join("、");
        teamPlanList.appendChild(createMasterRow(
          { title: `${formatDate(plan.workDate)} / ${group?.name || "未設定グループ"}` },
          `${plan.workerIds.length}人編成${plan.fixedTeamSetName ? ` ・ 固定セット:${plan.fixedTeamSetName}` : ""}`,
          names || "参加者なし",
          () => {
            teamPlanIdInput.value = plan.id;
            teamPlanDateInput.value = plan.workDate;
            teamPlanGroupInput.value = plan.groupId;
            teamSetSelectInput.value = plan.fixedTeamSetId || "";
            selectedTeamPlanWorkerIds = plan.workerIds.slice();
            renderTeamPlanWorkerList();
          },
          () => {
            if (!window.confirm("この日別チーム編成を削除しますか？")) return;
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
  if (!window.confirm(`この園地を削除しますか？ 関連する区画 ${relatedPlots.length} 件は未所属になります。`)) return;
  const relatedPlotIds = new Set(relatedPlots.map((plot) => plot.id));
  masters.orchards = masters.orchards.filter((orchard) => orchard.id !== id);
  masters.plots = masters.plots.filter((plot) => plot.orchardId !== id);
  records = records.map((record) => relatedPlotIds.has(record.plotId) ? { ...record, plotId: "", plotName: "" } : record)
    .map((record) => record.orchardId === id ? { ...record, orchardId: "", orchardName: "" } : record);
  saveState();
  render();
}

function deletePlot(id) {
  if (!window.confirm("この区画を削除しますか？")) return;
  masters.plots = masters.plots.filter((plot) => plot.id !== id);
  records = records.map((record) => record.plotId === id ? { ...record, plotId: "", plotName: "" } : record);
  saveState();
  render();
}

function deleteVariety(id) {
  if (!window.confirm("この品種を削除しますか？")) return;
  masters.varieties = masters.varieties.filter((variety) => variety.id !== id);
  records = records.map((record) => record.varietyId === id ? { ...record, varietyId: "", varietyName: "" } : record);
  saveState();
  render();
}

function deleteGroup(id) {
  const relatedMemberships = getMembershipsByGroupId(id).length;
  if (!window.confirm(`このグループを削除しますか？ 所属設定 ${relatedMemberships} 件は解除されます。`)) return;
  masters.groups = masters.groups.filter((group) => group.id !== id);
  masters.workerGroupMemberships = masters.workerGroupMemberships.filter((membership) => membership.groupId !== id);
  const removedSetIds = masters.fixedTeamSets.filter((teamSet) => teamSet.groupId === id).map((teamSet) => teamSet.id);
  masters.fixedTeamSets = masters.fixedTeamSets.filter((teamSet) => teamSet.groupId !== id);
  masters.workers = masters.workers.map((worker) => ({ ...worker, primaryGroupId: worker.primaryGroupId === id ? "" : worker.primaryGroupId }));
  records = records.map((record) => record.dailyGroupId === id ? { ...record, dailyGroupId: "", dailyGroupName: "" } : record);
  records = records.map((record) => removedSetIds.includes(record.fixedTeamSetId) ? { ...record, fixedTeamSetId: "", fixedTeamSetName: "" } : record);
  teamPlans = teamPlans.filter((plan) => plan.groupId !== id).map((plan) => removedSetIds.includes(plan.fixedTeamSetId) ? { ...plan, fixedTeamSetId: "", fixedTeamSetName: "" } : plan);
  saveState();
  render();
}

function deleteWorker(id) {
  const usedCount = records.filter((record) => record.assignedWorkers.some((item) => item.workerId === id)).length;
  if (!window.confirm(`この作業者を削除しますか？ 既存記録 ${usedCount} 件には保存済みの作業者名を残します。`)) return;
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
          workerNames: getWorkerNameList(record).filter((name) => name !== deletedWorker?.displayName && name !== deletedWorker?.fullName)
        }
      : record
  ));
  selectedWorkerIds = selectedWorkerIds.filter((workerId) => workerId !== id);
  saveState();
  render();
}

function deleteWorkerMembershipSettings(workerId) {
  if (!window.confirm("この作業者の所属グループ設定を解除しますか？")) return;
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
  const taskEntries = aggregateBy(records, (record) => record.taskType || "未設定", (record) => Number(record.workHours || 0)).sort((a, b) => b[1] - a[1]);
  const groupEntries = aggregateBy(recordsWithMetrics, (item) => item.names.dailyGroupName, (item) => item.metrics.hours).sort((a, b) => b[1] - a[1]);
  const groupCountEntries = aggregateBy(recordsWithMetrics, (item) => item.names.dailyGroupName, () => 1).sort((a, b) => b[1] - a[1]);
  const groupPersonHoursEntries = aggregateBy(recordsWithMetrics, (item) => item.names.dailyGroupName, (item) => item.metrics.personHours).sort((a, b) => b[1] - a[1]);
  const groupLaborCostEntries = aggregateBy(recordsWithMetrics, (item) => item.names.dailyGroupName, (item) => item.metrics.laborCost).sort((a, b) => b[1] - a[1]);
  const workerTotalEntries = aggregateBy(
    records.flatMap((record) => getAssignedWorkers(record).map((worker) => ({ worker, hours: Number(record.workHours || 0) }))),
    (item) => item.worker.displayName,
    (item) => item.hours
  ).sort((a, b) => b[1] - a[1]);
  const groupWorkerEntries = aggregateBy(
    records.flatMap((record) => getAssignedWorkers(record).map((worker) => ({ worker, hours: Number(record.workHours || 0), dailyGroupName: getRecordDisplay(record).dailyGroupName }))),
    (item) => `${item.dailyGroupName} / ${item.worker.displayName}`,
    (item) => item.hours
  ).sort((a, b) => b[1] - a[1]);
  const primaryGroupEntries = aggregateBy(
    records.flatMap((record) => getAssignedWorkers(record).map((worker) => ({ worker, hours: Number(record.workHours || 0) }))),
    (item) => getWorkerPrimaryGroup(item.worker)?.name || "主所属未設定",
    (item) => item.hours
  ).sort((a, b) => b[1] - a[1]);
  const varietyEntries = aggregateBy(records, (record) => getRecordDisplay(record).varietyName, (record) => Number(record.workHours || 0)).sort((a, b) => b[1] - a[1]);

  buildSummaryRows(monthlyCountList, monthlyCountEntries.map(([month, value]) => [formatMonth(month), value]), (value) => `${value}件`, "作業記録がありません。");
  buildSummaryRows(monthlyHoursList, monthlyHourEntries.map(([month, value]) => [formatMonth(month), value]), (value) => formatHours(value), "作業記録がありません。");
  buildSummaryRows(orchardHoursList, orchardEntries, (value) => formatHours(value), "園地別集計はまだありません。");
  buildSummaryRows(orchardPersonHoursList, orchardPersonHoursEntries, (value) => formatPersonHours(value), "園地別集計はまだありません。");
  buildSummaryRows(orchardLaborCostList, orchardLaborCostEntries, (value) => formatCurrency(value), "園地別集計はまだありません。");
  buildSummaryRows(plotHoursList, plotEntries, (value) => formatHours(value), "区画別集計はまだありません。");
  buildSummaryRows(plotPersonHoursList, plotPersonHoursEntries, (value) => formatPersonHours(value), "区画別集計はまだありません。");
  buildSummaryRows(plotLaborCostList, plotLaborCostEntries, (value) => formatCurrency(value), "区画別集計はまだありません。");
  buildSummaryRows(taskHoursList, taskEntries, (value) => formatHours(value), "作業内容別集計はまだありません。");
  buildSummaryRows(workerTotalHoursList, workerTotalEntries, (value) => formatHours(value), "作業者別集計はまだありません。");
  buildSummaryRows(groupWorkerHoursList, groupWorkerEntries, (value) => formatHours(value), "グループ別・作業者別集計はまだありません。");
  buildSummaryRows(primaryGroupHoursList, primaryGroupEntries, (value) => formatHours(value), "主所属別集計はまだありません。");
  buildSummaryRows(groupCountList, groupCountEntries, (value) => `${value}件`, "グループ別集計はまだありません。");
  buildSummaryRows(groupHoursList, groupEntries, (value) => formatHours(value), "グループ別集計はまだありません。");
  buildSummaryRows(groupPersonHoursList, groupPersonHoursEntries, (value) => formatPersonHours(value), "グループ別集計はまだありません。");
  buildSummaryRows(groupLaborCostList, groupLaborCostEntries, (value) => formatCurrency(value), "グループ別集計はまだありません。");
  buildSummaryRows(varietyHoursList, varietyEntries, (value) => formatHours(value), "品種別集計はまだありません。");
}

function updateTimeHint() {
  const settings = normalizeCompanySettings(companySettings);
  const autoHours = calculateHoursFromRange(startTimeInput.value, endTimeInput.value, settings);
  const defaultHours = getDefaultWorkHours(settings);
  const manualHours = normalizeHoursByTimeUnit(workHoursInput.value, settings);
  const breakText = `${Math.floor(settings.workdayBreakMinutes / 60)}時間${String(settings.workdayBreakMinutes % 60).padStart(2, "0")}分`;
  if (startTimeInput.value && endTimeInput.value && autoHours === null) {
    timeHint.textContent = "終了時刻は開始時刻より後に設定してください。";
    return;
  }
  if (autoHours !== null) {
    workHoursInput.value = String(autoHours);
    timeHint.textContent = `実働 ${autoHours} 時間（休憩 ${breakText} を差し引き、${settings.payrollTimeUnitMinutes}分単位で丸め）を自動計算しました。`;
    return;
  }
  if (!startTimeInput.value && !endTimeInput.value) {
    if (manualHours > 0) {
      workHoursInput.value = String(manualHours);
      timeHint.textContent = `作業時間 ${manualHours} 時間（${settings.payrollTimeUnitMinutes}分単位で丸めた手入力値）を使用します。`;
      return;
    }
    workHoursInput.value = String(defaultHours);
    timeHint.textContent = `時刻未入力のため、標準勤務 ${settings.workdayStartTime}〜${settings.workdayEndTime}（休憩 ${breakText}）= ${defaultHours} 時間で扱います。`;
    return;
  }
  timeHint.textContent = "開始時刻と終了時刻をセットで入力すると、実働時間を自動計算します。";
}

function downloadJsonBackup() {
  const currentState = { companySettings, masters, records, teamPlans, payrollAdjustments };
  const counts = getStateCounts(currentState);
  renderBackupSummary(counts);
  const confirmMessage = `JSONバックアップを保存します。\n\n${formatCountsSummary(counts)}\n\nこの内容で保存しますか？`;
  if (!window.confirm(confirmMessage)) {
    setBackupMessage("JSON保存をキャンセルしました。");
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
  setBackupMessage(`JSON保存が完了しました。件数サマリー: ${counts.records}件の作業記録 / ${counts.teamPlans}件の日別チーム編成`);
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
        throw new Error("JSON形式が不正です。ファイル内容を確認してください。");
      }
      const incomingState = parseRestorePayload(parsed);
      const incomingCounts = getStateCounts(incomingState);
      const modeLabel = mode === "append" ? "追加復元" : "上書き復元";
      const confirmMessage = `JSON復元を実行します（${modeLabel}）。\n\n取込データ件数:\n${formatCountsSummary(incomingCounts)}\n\nこの内容で復元しますか？`;
      if (!window.confirm(confirmMessage)) {
        setBackupMessage("JSON復元をキャンセルしました。");
        return;
      }
      const restoredState = restoreFromBackupObject(parsed, mode);
      const resultCounts = getStateCounts(restoredState);
      renderBackupSummary(resultCounts);
      setBackupMessage(`JSON復元が完了しました（${modeLabel}）。`);
      window.alert(`JSON復元が完了しました。\n\n${formatCountsSummary(resultCounts)}`);
    } catch (error) {
      console.error(error);
      setBackupMessage(error.message || "JSONファイルの読み込みに失敗しました。");
      window.alert(error.message || "JSONファイルの読み込みに失敗しました。");
    } finally {
      restoreInput.value = "";
    }
  };
  reader.readAsText(file, "utf-8");
}

function resetAllDataToSeedState() {
  const firstConfirm = window.confirm("初期データに戻します。現在のデータは失われます。\n\n先にバックアップ保存しましたか？");
  if (!firstConfirm) return;
  const secondConfirm = window.confirm("本当に初期データに戻しますか？");
  if (!secondConfirm) return;

  const resetState = hydrateWorkerRelations(createSeedState());
  applyState(resetState);
  const counts = getStateCounts(resetState);
  renderBackupSummary(counts);
  setBackupMessage("初期データに戻しました。必要に応じて再設定してください。");
  localStorage.removeItem(LAST_BACKUP_AT_KEY);
  updateBackupTimestamp(localStorage.getItem(LAST_BACKUP_AT_KEY));
  setSettingsSection("backup", { switchToSettingsView: true, scrollIntoView: true, focusElement: backupButton });
  window.alert(`初期データへの復元が完了しました。\n\n${formatCountsSummary(counts)}`);
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
    image.onerror = () => reject(new Error("QR画像の読み込みに失敗しました。"));
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
    popupBlockedMessage = "画面を開けませんでした。ブラウザのポップアップ設定を確認してください。"
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
    console.warn("Blobプレビューの起動に失敗したため通常モードへフォールバックします。", error);
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
    window.alert("この端末では共有機能を利用できません。");
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
    window.alert("共有に失敗しました。もう一度お試しください。");
  }
}

function buildQrLabelSheetItems(type) {
  if (type === "orchard") {
    return masters.orchards.map((orchard) => {
      const code = normalizeManagementCode(orchard.managementCode);
      return {
        itemType: "orchard",
        typeLabel: "園地札",
        nameLine1: orchard.name || "園地名未設定",
        nameLine2: "",
        managementCode: code || "未設定",
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
      nameLine1: plot.name || "区画名未設定",
      nameLine2: `園地: ${orchard?.name || "未設定"}`,
      managementCode: code || "未設定",
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
    ? `${targetLabel}の管理コードを最優先で大きく表示する簡易ラベルです。管理コード未設定時は警告表示されます。`
    : type === "orchard"
      ? "園地札用ラベルです。現場貼付前に園地IDを確認してください。"
      : "区画札用ラベルです。現場貼付前に園地ID・区画IDの両方を確認してください。";

  const cardsHtml = labelItems.map((item) => {
    if (isSimple) {
      return `
        <article class="label-card label-card--simple label-card--${escapeHtml(item.itemType)}">
          <div class="label-card__head">
            <span class="label-card__kind label-card__kind--${escapeHtml(item.itemType)}">${escapeHtml(item.typeLabel)}</span>
            <p class="label-card__code label-card__code--simple ${item.missingManagementCode ? "label-card__code--warning" : ""}">${escapeHtml(item.managementCode)}</p>
            ${item.missingManagementCode ? '<p class="label-card__warning">管理コード未設定（マスター設定が必要）</p>' : ""}
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
        <p class="label-card__code ${item.missingManagementCode ? "label-card__code--warning" : ""}">管理コード: ${escapeHtml(item.managementCode)}</p>
        ${item.missingManagementCode ? '<p class="label-card__warning">管理コード未設定（マスター設定が必要）</p>' : ""}
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
            <p class="sheet-toolbar__lead sheet-toolbar__lead--status" id="sheetLoadStatus">QR画像を読み込み中です...</p>
            <p class="sheet-toolbar__lead">Androidは「PDF保存」後に共有先アプリで印刷すると安定しやすいです。</p>
          </div>
          <div class="sheet-toolbar__actions">
            <button class="sheet-button sheet-button--print" id="sheetPrintButton" type="button" onclick="printAfterQrReady('print')" disabled>この画面を印刷</button>
            <button class="sheet-button sheet-button--pdf" id="sheetPdfButton" type="button" onclick="printAfterQrReady('pdf')" disabled>PDF保存</button>
            <button class="sheet-button sheet-button--share" id="sheetShareButton" type="button">共有</button>
            <button class="sheet-button sheet-button--close" type="button" onclick="window.close()">閉じる</button>
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
                printButton.textContent = allReady ? "この画面を印刷" : "QR読込中...";
              }
              if (pdfButton) {
                pdfButton.disabled = !allReady;
                pdfButton.textContent = allReady ? "PDF保存" : "QR読込中...";
              }
            };

            window.printAfterQrReady = async function printAfterQrReady(triggerMode) {
              syncButtons(false);
              const results = await waitForAllImages();
              const allReady = results.every(Boolean);
              if (status) {
                status.textContent = allReady
                  ? "QR画像の準備ができました。印刷できます。"
                  : "QR画像の読み込みに失敗した項目があります。再読み込みしてください。";
              }
              syncButtons(allReady);
              if (allReady) {
                if (status) {
                  status.textContent = triggerMode === "pdf"
                    ? "PDF保存ダイアログを開きます。保存先を選択してください。"
                    : "印刷ダイアログを開きます。";
                }
                window.print();
              }
            };

            if (shareButton) {
              if (!navigator.share) {
                shareButton.disabled = true;
                shareButton.textContent = "共有未対応";
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
                          text: "QRラベルを共有します",
                          files: [file]
                        });
                        shared = true;
                      }
                    }
                    if (!shared) {
                      await navigator.share({
                        title: document.title,
                        text: "QRラベルを共有します"
                      });
                    }
                  } catch (error) {
                    if (error && error.name === "AbortError") return;
                    window.alert("共有に失敗しました。");
                  }
                });
              }
            }

            waitForAllImages().then((results) => {
              const allReady = results.every(Boolean);
              if (status) {
                status.textContent = allReady
                  ? "QR画像の準備ができました。印刷できます。"
                  : "QR画像の読み込みに失敗した項目があります。再読み込みしてください。";
              }
              if (printButton) {
                printButton.disabled = !allReady;
                printButton.textContent = allReady ? "この画面を印刷" : "QR読込エラー";
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
    window.alert(type === "orchard" ? "園地データがないため印刷できません。" : "区画データがないため印刷できません。");
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
        <h1>QR印刷画面を準備しています...</h1>
        <p>画像の読み込みが終わるまでそのままお待ちください。</p>
      </body>
    </html>
  `;
  const win = openGeneratedDocumentWindow(loadingHtml, {
    width: 1200,
    height: 920,
    popupBlockedMessage: "印刷画面を開けませんでした。ブラウザのポップアップ設定を確認してください。"
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
          <p>通信環境をご確認のうえ、もう一度お試しください。</p>
          <p>問題が続く場合は、一覧画面から画像保存して印刷してください。</p>
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
      const startA = parseTimeToMinutes(a.startTime);
      const startB = parseTimeToMinutes(b.startTime);
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
    const startTime = record.startTime || "―";
    const endTime = record.endTime || "―";
    const weather = record.weather || "―";
    const materials = record.materials || "―";
    const notes = record.notes || "―";

    return `
      <article class="daily-report-card">
        <div class="daily-report-card__header">
          <span class="daily-report-card__index">No.${index + 1}</span>
          <h3>${escapeHtml(record.taskType || "未設定")}</h3>
          <span class="daily-report-card__group">${escapeHtml(names.dailyGroupName || "未設定")}</span>
        </div>
        <div class="daily-report-grid">
          <div class="daily-report-item"><span>作業日</span><strong>${escapeHtml(formatDateYmd(record.workDate))}</strong></div>
          <div class="daily-report-item"><span>園地名</span><strong>${escapeHtml(names.orchardName || "未設定")}</strong></div>
          <div class="daily-report-item"><span>区画名</span><strong>${escapeHtml(names.plotName || "未設定")}</strong></div>
          <div class="daily-report-item"><span>品種</span><strong>${escapeHtml(names.varietyName || "未設定")}</strong></div>
          <div class="daily-report-item"><span>作業区分</span><strong>${escapeHtml(record.taskType || "未設定")}</strong></div>
          <div class="daily-report-item"><span>作業グループ</span><strong>${escapeHtml(names.dailyGroupName || "未設定")}</strong></div>
          <div class="daily-report-item daily-report-item--full"><span>作業者一覧</span><strong>${escapeHtml(names.workerListText || "未設定")}</strong></div>
          <div class="daily-report-item"><span>作業人数</span><strong>${escapeHtml(formatCount(metrics.workerCount))}</strong></div>
          <div class="daily-report-item"><span>開始時刻</span><strong>${escapeHtml(startTime)}</strong></div>
          <div class="daily-report-item"><span>終了時刻</span><strong>${escapeHtml(endTime)}</strong></div>
          <div class="daily-report-item"><span>作業時間</span><strong>${escapeHtml(formatHours(metrics.hours))}</strong></div>
          <div class="daily-report-item"><span>延べ人時</span><strong>${escapeHtml(formatPersonHours(metrics.personHours))}</strong></div>
          <div class="daily-report-item"><span>概算人件費</span><strong>${escapeHtml(formatCurrency(metrics.laborCost))}</strong></div>
          <div class="daily-report-item"><span>天気</span><strong>${escapeHtml(weather)}</strong></div>
          <div class="daily-report-item daily-report-item--full"><span>使用資材</span><strong>${escapeHtml(materials)}</strong></div>
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
    : `<div class="daily-report-empty">指定日の作業記録はありません。</div>`;

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
            <p>指定日: ${escapeHtml(formatDateYmd(targetDate))}</p>
          </div>
          <div class="report-actions">
            <button class="report-button report-button--print" type="button" onclick="window.print()">この画面を印刷</button>
            <button class="report-button report-button--close" type="button" onclick="window.close()">閉じる</button>
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
              <div class="report-summary__item"><span>当日の総延べ人時</span><strong>${escapeHtml(formatPersonHours(summary.personHours))}</strong></div>
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
    window.alert("日報対象日を選択してください。");
    return;
  }
  const targetDate = dailyReportDateInput.value;
  const win = window.open("", "_blank", "width=1200,height=920");
  if (!win) {
    window.alert("日報画面を開けませんでした。ブラウザのポップアップ設定を確認してください。");
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
    const startTime = record.startTime || text.none;
    const endTime = record.endTime || text.none;
    const temperature = formatTemperature(environment.temperatureC);
    const weatherBase = environment.weather || text.none;
    const weatherDetail = formatWeatherInfoSummary(environment.weatherInfo);
    const weather = weatherDetail ? `${weatherBase} / ${weatherDetail}` : weatherBase;
    const materials = record.materials || text.none;
    const observationSummary = formatFieldObservationSummary(record.fieldObservation);
    const noteParts = [record.notes, observationSummary ? `現場確認: ${observationSummary}` : ""].filter(Boolean);
    const notes = noteParts.length ? noteParts.join(" / ") : text.none;

    return `
      <article class="daily-report-card">
        <div class="daily-report-card__header">
          <span class="daily-report-card__index">No.${index + 1}</span>
          <h3>${escapeHtml(record.taskType || text.unset)}</h3>
          <span class="daily-report-card__group">${escapeHtml(names.dailyGroupName || text.unset)}</span>
        </div>
        <div class="daily-report-grid">
          <div class="daily-report-item"><span>${text.workDate}</span><strong>${escapeHtml(formatDateYmd(record.workDate))}</strong></div>
          <div class="daily-report-item"><span>${text.orchard}</span><strong>${escapeHtml(names.orchardName || text.unset)}</strong></div>
          <div class="daily-report-item"><span>${text.plot}</span><strong>${escapeHtml(names.plotName || text.unset)}</strong></div>
          <div class="daily-report-item"><span>${text.variety}</span><strong>${escapeHtml(names.varietyName || text.unset)}</strong></div>
          <div class="daily-report-item"><span>${text.taskCategory}</span><strong>${escapeHtml(record.taskType || text.unset)}</strong></div>
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
    window.alert("日報対象日を選択してください。");
    return;
  }
  const targetDate = dailyReportDateInput.value;
  const html = buildDailyReportHtml(targetDate, { preferredAction: "print" });
  await shareReportHtmlFromMainPage({
    html,
    fileName: `taiseien-daily-report-${targetDate}.html`,
    title: "(株)大成園 作業日報",
    text: `${formatDateYmd(targetDate)} の作業日報を共有します`
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
      monthLabel: `${fallbackMonth.slice(0, 4)}年${Number(fallbackMonth.slice(5, 7))}月`
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
    monthLabel: `${year}年${month}月`
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
      const label = getLabel(item) || "未設定";
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
    (item) => item.names.orchardName || "未設定"
  );
  const plotEntries = buildMetricEntries(
    (item) => item.record.plotId || `${item.names.orchardName}/${item.names.plotName}`,
    (item) => `${item.names.orchardName || "未設定"} / ${item.names.plotName || "未設定"}`
  );
  const taskEntries = buildMetricEntries(
    (item) => item.record.taskType || "未設定",
    (item) => item.record.taskType || "未設定"
  );
  const groupEntries = buildMetricEntries(
    (item) => item.record.dailyGroupId || item.names.dailyGroupName,
    (item) => item.names.dailyGroupName || "未設定"
  );

  const workerHoursEntries = Array.from(
    monthlyRecords.reduce((map, record) => {
      const hours = Number(record.workHours || 0);
      getAssignedWorkers(record).forEach((worker) => {
        const key = worker.id || worker.displayName;
        map.set(key, {
          label: worker.displayName || "未設定",
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
    return `<tr><td colspan="2" class="monthly-empty-cell">作業者データはありません。</td></tr>`;
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
  const rangeText = `${formatDateYmd(data.from)}〜${formatDateYmd(data.to)}`;
  const fiscalText = `${formatDateYmd(data.fiscalFrom)}〜${formatDateYmd(data.fiscalTo)}`;
  const preferredAction = options.preferredAction === "pdf" ? "pdf" : "print";

  const renderSection = (title, entries, emptyMessage) => `
    <section class="monthly-section">
      <h3>${escapeHtml(title)}</h3>
      <div class="monthly-table-wrap">
        <table class="monthly-table">
          <thead>
            <tr>
              <th>区分</th>
              <th>件数</th>
              <th>総作業時間</th>
              <th>延べ人時</th>
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
            <p>対象年月: ${escapeHtml(data.monthLabel)}</p>
            <p class="monthly-toolbar__hint">Androidは「PDF保存」→「共有」で印刷アプリへ渡すと安定しやすいです。</p>
          </div>
          <div class="monthly-actions">
            <button class="monthly-button monthly-button--print" type="button" onclick="window.print()">この画面を印刷</button>
            <button class="monthly-button monthly-button--pdf" id="monthlyPdfButton" type="button" onclick="window.print()">PDF保存</button>
            <button class="monthly-button monthly-button--share" id="monthlyShareButton" type="button">共有</button>
            <button class="monthly-button monthly-button--close" type="button" onclick="window.close()">閉じる</button>
          </div>
        </header>
        <main class="monthly-body">
          <section class="monthly-header">
            <p class="monthly-app-name">(株)大成園　作業記録アプリ</p>
            <h2 class="monthly-title">月次レポート（月報）</h2>
            <p class="monthly-meta">対象年月: ${escapeHtml(data.monthLabel)}</p>
            <p class="monthly-meta">集計期間: ${escapeHtml(rangeText)}</p>
            <p class="monthly-meta">該当決算年度: ${escapeHtml(fiscalText)}</p>
            <div class="monthly-summary">
              <div class="monthly-summary__item"><span>月間総作業件数</span><strong>${escapeHtml(formatCount(data.summary.count))}</strong></div>
              <div class="monthly-summary__item"><span>月間総作業時間</span><strong>${escapeHtml(formatHours(data.summary.hours))}</strong></div>
              <div class="monthly-summary__item"><span>月間総延べ人時</span><strong>${escapeHtml(formatPersonHours(data.summary.personHours))}</strong></div>
              <div class="monthly-summary__item"><span>月間総概算人件費</span><strong>${escapeHtml(formatCurrency(data.summary.laborCost))}</strong></div>
            </div>
          </section>
          ${renderSection("園地別の月間集計", data.orchardEntries, "園地データはありません。")}
          ${renderSection("区画別の月間集計", data.plotEntries, "区画データはありません。")}
          ${renderSection("作業区分別の月間集計", data.taskEntries, "作業区分データはありません。")}
          ${renderSection("作業グループ別の月間集計", data.groupEntries, "作業グループデータはありません。")}
          <section class="monthly-section">
            <h3>作業者別の月間総作業時間</h3>
            <div class="monthly-table-wrap">
              <table class="monthly-table">
                <thead>
                  <tr>
                    <th>作業者</th>
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
                shareButton.textContent = "共有未対応";
              } else {
                shareButton.addEventListener("click", async () => {
                  try {
                    await navigator.share({
                      title: document.title,
                      text: "月報を共有します"
                    });
                  } catch (error) {
                    if (error && error.name === "AbortError") return;
                    window.alert("共有に失敗しました。");
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
    window.alert("月報対象年月を選択してください。");
    return;
  }
  const targetMonth = monthlyReportMonthInput.value;
  const html = buildMonthlyReportHtml(targetMonth, { preferredAction });
  openGeneratedDocumentWindow(html, {
    width: 1280,
    height: 920,
    popupBlockedMessage: "月報画面を開けませんでした。ブラウザのポップアップ設定を確認してください。"
  });
}

async function shareMonthlyReportFromMainPage() {
  if (!monthlyReportMonthInput || !monthlyReportMonthInput.value) {
    window.alert("月報対象年月を選択してください。");
    return;
  }
  const targetMonth = monthlyReportMonthInput.value;
  const html = buildMonthlyReportHtml(targetMonth, { preferredAction: "print" });
  await shareReportHtmlFromMainPage({
    html,
    fileName: `taiseien-monthly-report-${targetMonth}.html`,
    title: "(株)大成園 月報",
    text: `${targetMonth} の月報を共有します`
  });
}

function exportMonthlyReportCsv() {
  if (!monthlyReportMonthInput || !monthlyReportMonthInput.value) {
    window.alert("月報対象年月を選択してください。");
    return;
  }
  const data = getMonthlyReportData(monthlyReportMonthInput.value);
  const rangeText = `${formatDateYmd(data.from)}〜${formatDateYmd(data.to)}`;
  const fiscalText = `${formatDateYmd(data.fiscalFrom)}〜${formatDateYmd(data.fiscalTo)}`;

  const rows = [
    ["集計区分", "名称", "件数", "総作業時間", "延べ人時", "概算人件費", "対象年月", "集計期間", "該当決算年度"],
    ["月間合計", "全体", data.summary.count, data.summary.hours, data.summary.personHours, data.summary.laborCost, data.monthLabel, rangeText, fiscalText]
  ];

  const pushMetricRows = (sectionLabel, entries) => {
    entries.forEach((entry) => {
      rows.push([sectionLabel, entry.label, entry.count, entry.hours, entry.personHours, entry.laborCost, data.monthLabel, rangeText, fiscalText]);
    });
  };

  pushMetricRows("園地別", data.orchardEntries);
  pushMetricRows("区画別", data.plotEntries);
  pushMetricRows("作業区分別", data.taskEntries);
  pushMetricRows("作業グループ別", data.groupEntries);
  data.workerHoursEntries.forEach((entry) => {
    rows.push(["作業者別", entry.label, "", entry.hours, "", "", data.monthLabel, rangeText, fiscalText]);
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
  const sortLabel = reportData.sortOrder === "asc" ? "少ない順" : "多い順";
  const periodRangeText = config.rangeText || `${formatDateYmd(config.from)}〜${formatDateYmd(config.to)}`;

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
              <th>延べ人時</th>
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
      <h4>作業者別総作業時間</h4>
      <div class="task-type-table-wrap">
        <table class="task-type-table">
          <thead>
            <tr>
              <th>作業者</th>
              <th>総作業時間</th>
            </tr>
          </thead>
          <tbody>
            ${buildTaskTypeWorkerRowsHtml(entries, "作業者別データはありません。")}
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
          <span>延べ人時: <strong>${escapeHtml(formatPersonHours(entry.personHours))}</strong></span>
          <span>概算人件費: <strong>${escapeHtml(formatCurrency(entry.laborCost))}</strong></span>
        </div>
      </header>
      ${renderMetricSection("園地別内訳", entry.orchardEntries, "園地別データはありません。", "園地")}
      ${renderMetricSection("区画別内訳", entry.plotEntries, "区画別データはありません。", "区画")}
      ${renderMetricSection("作業グループ別集計", entry.groupEntries, "作業グループ別データはありません。", "作業グループ")}
      ${renderWorkerSection(entry.workerEntries)}
    </section>
  `).join("");

  return `
    <html lang="ja">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>(株)大成園　作業記録アプリ 作業区分別レポート</title>
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
            <h1>作業区分別レポート</h1>
            <p>対象期間: ${escapeHtml(config.label)} / ${escapeHtml(periodRangeText)}</p>
          </div>
          <div class="task-type-actions">
            <button class="task-type-button task-type-button--print" type="button" onclick="window.print()">この画面を印刷</button>
            <button class="task-type-button task-type-button--close" type="button" onclick="window.close()">閉じる</button>
          </div>
        </header>
        <main class="task-type-body">
          <section class="task-type-header">
            <p class="task-type-app">(株)大成園　作業記録アプリ</p>
            <h2 class="task-type-title">作業区分別レポート</h2>
            <p class="task-type-meta">比較期間: ${escapeHtml(config.label)}</p>
            <p class="task-type-meta">期間範囲: ${escapeHtml(periodRangeText)}</p>
            <p class="task-type-meta">並び替え基準: ${escapeHtml(metricLabel)} / 並び順: ${escapeHtml(sortLabel)}</p>
            <div class="task-type-summary">
              <div class="task-type-summary__item"><span>総作業件数</span><strong>${escapeHtml(formatCount(reportData.summary.count))}</strong></div>
              <div class="task-type-summary__item"><span>総作業時間</span><strong>${escapeHtml(formatHours(reportData.summary.hours))}</strong></div>
              <div class="task-type-summary__item"><span>総延べ人時</span><strong>${escapeHtml(formatPersonHours(reportData.summary.personHours))}</strong></div>
              <div class="task-type-summary__item"><span>総概算人件費</span><strong>${escapeHtml(formatCurrency(reportData.summary.laborCost))}</strong></div>
            </div>
          </section>
          ${taskSectionHtml || `<section class="task-type-card"><p>条件を満たす作業区分別データはありません。</p></section>`}
        </main>
      </body>
    </html>
  `;
}

function openTaskTypeReportWindow() {
  const config = getTaskReportPeriodConfig();
  if (!config.isValid) {
    window.alert(config.error || "比較条件を確認してください。");
    return;
  }
  openGeneratedDocumentWindow(buildTaskTypeReportHtml(), {
    width: 1280,
    height: 920,
    popupBlockedMessage: "作業区分別レポート画面を開けませんでした。ブラウザのポップアップ設定を確認してください。"
  });
}

function exportTaskTypeReportCsv() {
  const reportData = buildTaskTypeReportData();
  const config = reportData.periodConfig;
  if (!config.isValid) {
    window.alert(config.error || "比較条件を確認してください。");
    return;
  }
  const periodRangeText = config.rangeText || `${formatDateYmd(config.from)}〜${formatDateYmd(config.to)}`;
  const metricLabel = getSortMetricLabel(reportData.metric);
  const sortLabel = reportData.sortOrder === "asc" ? "少ない順" : "多い順";

  const rows = [
    ["レポート区分", "作業区分", "内訳区分", "名称", "件数", "総作業時間", "総延べ人時", "総概算人件費", "比較期間", "期間範囲", "並び替え基準", "並び順"],
    ["期間合計", "全作業区分", "-", "全体", reportData.summary.count, reportData.summary.hours, reportData.summary.personHours, reportData.summary.laborCost, config.label, periodRangeText, metricLabel, sortLabel]
  ];

  reportData.taskEntries.forEach((taskEntry) => {
    rows.push(["作業区分別", taskEntry.label, "合計", taskEntry.label, taskEntry.count, taskEntry.hours, taskEntry.personHours, taskEntry.laborCost, config.label, periodRangeText, metricLabel, sortLabel]);
    taskEntry.orchardEntries.forEach((entry) => {
      rows.push(["作業区分別", taskEntry.label, "園地別内訳", entry.label, entry.count, entry.hours, entry.personHours, entry.laborCost, config.label, periodRangeText, metricLabel, sortLabel]);
    });
    taskEntry.plotEntries.forEach((entry) => {
      rows.push(["作業区分別", taskEntry.label, "区画別内訳", entry.label, entry.count, entry.hours, entry.personHours, entry.laborCost, config.label, periodRangeText, metricLabel, sortLabel]);
    });
    taskEntry.groupEntries.forEach((entry) => {
      rows.push(["作業区分別", taskEntry.label, "作業グループ別", entry.label, entry.count, entry.hours, entry.personHours, entry.laborCost, config.label, periodRangeText, metricLabel, sortLabel]);
    });
    taskEntry.workerEntries.forEach((entry) => {
      rows.push(["作業区分別", taskEntry.label, "作業者別時間", entry.label, "", entry.hours, "", "", config.label, periodRangeText, metricLabel, sortLabel]);
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
  const sortLabel = reportData.sortOrder === "asc" ? "少ない順" : "多い順";
  const periodRangeText = config.rangeText || `${formatDateYmd(config.from)}〜${formatDateYmd(config.to)}`;

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
              <th>延べ人時</th>
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
      <h4>作業者別総作業時間</h4>
      <div class="variety-type-table-wrap">
        <table class="variety-type-table">
          <thead>
            <tr>
              <th>作業者</th>
              <th>総作業時間</th>
            </tr>
          </thead>
          <tbody>
            ${buildTaskTypeWorkerRowsHtml(entries, "作業者別データはありません。")}
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
          <span>延べ人時: <strong>${escapeHtml(formatPersonHours(entry.personHours))}</strong></span>
          <span>概算人件費: <strong>${escapeHtml(formatCurrency(entry.laborCost))}</strong></span>
        </div>
      </header>
      ${renderMetricSection("園地別内訳", entry.orchardEntries, "園地別データはありません。", "園地")}
      ${renderMetricSection("区画別内訳", entry.plotEntries, "区画別データはありません。", "区画")}
      ${renderMetricSection("作業区分別内訳", entry.taskEntries, "作業区分別データはありません。", "作業区分")}
      ${renderMetricSection("作業グループ別集計", entry.groupEntries, "作業グループ別データはありません。", "作業グループ")}
      ${renderWorkerSection(entry.workerEntries)}
    </section>
  `).join("");

  return `
    <html lang="ja">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>(株)大成園　作業記録アプリ 品種別レポート</title>
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
            <h1>品種別レポート</h1>
            <p>対象期間: ${escapeHtml(config.label)} / ${escapeHtml(periodRangeText)}</p>
          </div>
          <div class="variety-type-actions">
            <button class="variety-type-button variety-type-button--print" type="button" onclick="window.print()">この画面を印刷</button>
            <button class="variety-type-button variety-type-button--close" type="button" onclick="window.close()">閉じる</button>
          </div>
        </header>
        <main class="variety-type-body">
          <section class="variety-type-header">
            <p class="variety-type-app">(株)大成園　作業記録アプリ</p>
            <h2 class="variety-type-title">品種別レポート</h2>
            <p class="variety-type-meta">比較期間: ${escapeHtml(config.label)}</p>
            <p class="variety-type-meta">期間範囲: ${escapeHtml(periodRangeText)}</p>
            <p class="variety-type-meta">並び替え基準: ${escapeHtml(metricLabel)} / 並び順: ${escapeHtml(sortLabel)}</p>
            <div class="variety-type-summary">
              <div class="variety-type-summary__item"><span>総作業件数</span><strong>${escapeHtml(formatCount(reportData.summary.count))}</strong></div>
              <div class="variety-type-summary__item"><span>総作業時間</span><strong>${escapeHtml(formatHours(reportData.summary.hours))}</strong></div>
              <div class="variety-type-summary__item"><span>総延べ人時</span><strong>${escapeHtml(formatPersonHours(reportData.summary.personHours))}</strong></div>
              <div class="variety-type-summary__item"><span>総概算人件費</span><strong>${escapeHtml(formatCurrency(reportData.summary.laborCost))}</strong></div>
            </div>
          </section>
          ${varietySectionHtml || `<section class="variety-type-card"><p>条件を満たす品種別データはありません。</p></section>`}
        </main>
      </body>
    </html>
  `;
}

function openVarietyTypeReportWindow() {
  const config = getVarietyReportPeriodConfig();
  if (!config.isValid) {
    window.alert(config.error || "比較条件を確認してください。");
    return;
  }
  openGeneratedDocumentWindow(buildVarietyTypeReportHtml(), {
    width: 1280,
    height: 920,
    popupBlockedMessage: "品種別レポート画面を開けませんでした。ブラウザのポップアップ設定を確認してください。"
  });
}

function exportVarietyTypeReportCsv() {
  const reportData = buildVarietyTypeReportData();
  const config = reportData.periodConfig;
  if (!config.isValid) {
    window.alert(config.error || "比較条件を確認してください。");
    return;
  }
  const periodRangeText = config.rangeText || `${formatDateYmd(config.from)}〜${formatDateYmd(config.to)}`;
  const metricLabel = getSortMetricLabel(reportData.metric);
  const sortLabel = reportData.sortOrder === "asc" ? "少ない順" : "多い順";

  const rows = [
    ["レポート区分", "品種", "内訳区分", "名称", "件数", "総作業時間", "総延べ人時", "総概算人件費", "比較期間", "期間範囲", "並び替え基準", "並び順"],
    ["期間合計", "全品種", "-", "全体", reportData.summary.count, reportData.summary.hours, reportData.summary.personHours, reportData.summary.laborCost, config.label, periodRangeText, metricLabel, sortLabel]
  ];

  reportData.varietyEntries.forEach((varietyEntry) => {
    rows.push(["品種別", varietyEntry.label, "合計", varietyEntry.label, varietyEntry.count, varietyEntry.hours, varietyEntry.personHours, varietyEntry.laborCost, config.label, periodRangeText, metricLabel, sortLabel]);
    varietyEntry.orchardEntries.forEach((entry) => {
      rows.push(["品種別", varietyEntry.label, "園地別内訳", entry.label, entry.count, entry.hours, entry.personHours, entry.laborCost, config.label, periodRangeText, metricLabel, sortLabel]);
    });
    varietyEntry.plotEntries.forEach((entry) => {
      rows.push(["品種別", varietyEntry.label, "区画別内訳", entry.label, entry.count, entry.hours, entry.personHours, entry.laborCost, config.label, periodRangeText, metricLabel, sortLabel]);
    });
    varietyEntry.taskEntries.forEach((entry) => {
      rows.push(["品種別", varietyEntry.label, "作業区分別内訳", entry.label, entry.count, entry.hours, entry.personHours, entry.laborCost, config.label, periodRangeText, metricLabel, sortLabel]);
    });
    varietyEntry.groupEntries.forEach((entry) => {
      rows.push(["品種別", varietyEntry.label, "作業グループ別", entry.label, entry.count, entry.hours, entry.personHours, entry.laborCost, config.label, periodRangeText, metricLabel, sortLabel]);
    });
    varietyEntry.workerEntries.forEach((entry) => {
      rows.push(["品種別", varietyEntry.label, "作業者別時間", entry.label, "", entry.hours, "", "", config.label, periodRangeText, metricLabel, sortLabel]);
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
  const sortLabel = data.sortOrder === "asc" ? "少ない順" : "多い順";
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
              <th>延べ人時</th>
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
        <title>(株)大成園　作業記録アプリ 年度レポート総合版</title>
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
            <h1>年度レポート総合版</h1>
            <p>対象決算年度: ${escapeHtml(data.periodLabel)}</p>
            <p class="annual-toolbar__hint">Androidは「PDF保存」→「共有」で印刷アプリへ渡すと安定しやすいです。</p>
          </div>
          <div class="annual-actions">
            <button class="annual-button annual-button--print" type="button" onclick="window.print()">この画面を印刷</button>
            <button class="annual-button annual-button--pdf" id="annualPdfButton" type="button" onclick="window.print()">PDF保存</button>
            <button class="annual-button annual-button--share" id="annualShareButton" type="button">共有</button>
            <button class="annual-button annual-button--close" type="button" onclick="window.close()">閉じる</button>
          </div>
        </header>
        <main class="annual-body">
          <section class="annual-header">
            <p class="annual-app-name">(株)大成園　作業記録アプリ</p>
            <h2 class="annual-title">年度レポート総合版</h2>
            <p class="annual-meta">対象決算年度: ${escapeHtml(data.periodLabel)}</p>
            <p class="annual-meta">並び替え基準: ${escapeHtml(metricLabel)} / 並び順: ${escapeHtml(sortLabel)}</p>
            <div class="annual-summary">
              <div class="annual-summary__item"><span>対象決算年度</span><strong>${escapeHtml(data.periodLabel)}</strong></div>
              <div class="annual-summary__item"><span>総作業件数</span><strong>${escapeHtml(formatCount(data.summary.count))}</strong></div>
              <div class="annual-summary__item"><span>総作業時間</span><strong>${escapeHtml(formatHours(data.summary.hours))}</strong></div>
              <div class="annual-summary__item"><span>総延べ人時</span><strong>${escapeHtml(formatPersonHours(data.summary.personHours))}</strong></div>
              <div class="annual-summary__item"><span>総概算人件費</span><strong>${escapeHtml(formatCurrency(data.summary.laborCost))}</strong></div>
            </div>
          </section>
          ${renderMetricSection("園地別年間集計", data.orchardEntries, "園地データはありません。", "園地")}
          ${renderMetricSection("区画別年間集計", data.plotEntries, "区画データはありません。", "区画")}
          ${renderMetricSection("作業区分別年間集計", data.taskEntries, "作業区分データはありません。", "作業区分")}
          ${renderMetricSection("品種別年間集計", data.varietyEntries, "品種データはありません。", "品種")}
          ${renderMetricSection("グループ別年間集計", data.groupEntries, "グループデータはありません。", "作業グループ")}
          <section class="annual-section">
            <h4>作業者別年間総作業時間</h4>
            <div class="annual-table-wrap">
              <table class="annual-table">
                <thead>
                  <tr><th>作業者</th><th>総作業時間</th></tr>
                </thead>
                <tbody>${buildTaskTypeWorkerRowsHtml(data.workerHoursEntries, "作業者別データはありません。")}</tbody>
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
                shareButton.textContent = "共有未対応";
              } else {
                shareButton.addEventListener("click", async () => {
                  try {
                    await navigator.share({
                      title: document.title,
                      text: "年度レポート総合版を共有します"
                    });
                  } catch (error) {
                    if (error && error.name === "AbortError") return;
                    window.alert("共有に失敗しました。");
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
    popupBlockedMessage: "年度レポート画面を開けませんでした。ブラウザのポップアップ設定を確認してください。"
  });
}

async function shareAnnualReportFromMainPage() {
  const html = buildAnnualReportHtml({ preferredAction: "print" });
  await shareReportHtmlFromMainPage({
    html,
    fileName: "taiseien-annual-report.html",
    title: "(株)大成園 年度レポート総合版",
    text: "年度レポート総合版を共有します"
  });
}

function exportAnnualReportCsv() {
  const data = getAnnualReportData();
  const metricLabel = getSortMetricLabel(data.metric);
  const sortLabel = data.sortOrder === "asc" ? "少ない順" : "多い順";

  const rows = [
    ["レポート区分", "名称", "件数", "総作業時間", "延べ人時", "概算人件費", "対象決算年度", "並び替え基準", "並び順"],
    ["年度総括", "全体", data.summary.count, data.summary.hours, data.summary.personHours, data.summary.laborCost, data.periodLabel, metricLabel, sortLabel]
  ];
  const pushMetricRows = (sectionLabel, entries) => {
    entries.forEach((entry) => {
      rows.push([sectionLabel, entry.label, entry.count, entry.hours, entry.personHours, entry.laborCost, data.periodLabel, metricLabel, sortLabel]);
    });
  };
  pushMetricRows("園地別年間", data.orchardEntries);
  pushMetricRows("区画別年間", data.plotEntries);
  pushMetricRows("作業区分別年間", data.taskEntries);
  pushMetricRows("品種別年間", data.varietyEntries);
  pushMetricRows("グループ別年間", data.groupEntries);
  data.workerHoursEntries.forEach((entry) => {
    rows.push(["作業者別年間時間", entry.label, "", entry.hours, "", "", data.periodLabel, metricLabel, sortLabel]);
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
  if (key === "week") return "週間";
  if (key === "month") return "月間";
  if (key === "year") return "年間";
  return "任意期間";
}

function buildWorktimeReportHtml(snapshot, options = {}) {
  const preferredAction = options.preferredAction === "pdf" ? "pdf" : "print";
  const scopeLabel = snapshot.tab === "personal" ? "個人別" : "全体";
  const averageLabel = snapshot.tab === "personal" ? "平均労働時間" : "1人あたり平均労働時間";
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
    : `<tr><td colspan="5" class="worktime-empty-cell">比較対象データがありません。</td></tr>`;

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
    : `<tr><td colspan="${snapshot.tab === "personal" ? "4" : "5"}" class="worktime-empty-cell">期間内の内訳データがありません。</td></tr>`;

  const selectedAverage = getWorktimeAverageValue(snapshot.selectedStats, snapshot.tab);

  return `
    <html lang="ja">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>(株)大成園　作業記録アプリ 労働時間分析</title>
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
            <h1>労働時間分析レポート</h1>
            <p>集計区分: ${escapeHtml(scopeLabel)} / 対象: ${escapeHtml(snapshot.targetName)}</p>
            <p class="worktime-toolbar__hint">Androidは「PDF保存」後に共有先アプリで印刷すると安定しやすいです。</p>
          </div>
          <div class="worktime-actions">
            <button class="worktime-button worktime-button--print" type="button" onclick="window.print()">この画面を印刷</button>
            <button class="worktime-button worktime-button--pdf" id="worktimePdfButtonInWindow" type="button" onclick="window.print()">PDF保存</button>
            <button class="worktime-button worktime-button--close" type="button" onclick="window.close()">閉じる</button>
          </div>
        </header>
        <main class="worktime-body">
          <section class="worktime-header">
            <p class="worktime-app-name">(株)大成園　作業記録アプリ</p>
            <h2 class="worktime-title">労働時間分析</h2>
            <p class="worktime-meta">集計区分: ${escapeHtml(scopeLabel)}</p>
            <p class="worktime-meta">期間: ${escapeHtml(snapshot.periodConfig.label)} / ${escapeHtml(snapshot.periodConfig.rangeText)}</p>
            <p class="worktime-meta">対象: ${escapeHtml(snapshot.targetName)}</p>
            <div class="worktime-summary">
              <div class="worktime-summary__item"><span>労働時間</span><strong>${escapeHtml(formatHours(snapshot.selectedStats.totalHours))}</strong></div>
              <div class="worktime-summary__item"><span>出勤日数</span><strong>${escapeHtml(formatDays(snapshot.selectedStats.attendanceDays))}</strong></div>
              <div class="worktime-summary__item"><span>${escapeHtml(averageLabel)}</span><strong>${escapeHtml(formatHours(selectedAverage))}</strong></div>
              <div class="worktime-summary__item"><span>${snapshot.tab === "personal" ? "対象作業者" : "対象作業者数"}</span><strong>${escapeHtml(snapshot.tab === "personal" ? snapshot.targetName : formatPeople(snapshot.selectedStats.workerCount || 0))}</strong></div>
            </div>
          </section>

          <section class="worktime-section">
            <h3>週・月・年の比較</h3>
            <div class="worktime-table-wrap">
              <table class="worktime-table">
                <thead>
                  <tr>
                    <th>期間区分</th>
                    <th>対象期間</th>
                    <th>労働時間</th>
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
                    <th>区分</th>
                    <th>労働時間</th>
                    <th>出勤日数</th>
                    ${snapshot.tab === "personal" ? "" : "<th>作業者数</th>"}
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
    window.alert(snapshot.error || "労働時間分析の条件を確認してください。");
    return;
  }
  const html = buildWorktimeReportHtml(snapshot, { preferredAction });
  openGeneratedDocumentWindow(html, {
    width: 1200,
    height: 920,
    popupBlockedMessage: "労働時間分析画面を開けませんでした。ブラウザのポップアップ設定を確認してください。"
  });
}

function exportWorktimeAnalysisCsv(tab = activeWorktimeTab) {
  const snapshot = buildWorktimeAnalysisSnapshot(tab);
  if (!snapshot.isValid) {
    window.alert(snapshot.error || "労働時間分析の条件を確認してください。");
    return;
  }
  const scopeLabel = snapshot.tab === "personal" ? "個人別" : "全体";
  const targetLabel = snapshot.targetName;
  const rows = [
    ["集計区分", "期間区分", "対象期間", "氏名または全体", "労働時間", "出勤日数", "平均労働時間"]
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
        <p class="status" id="qrPrintStatus">QR画像を確認中です...</p>
        <script>
          (function () {
            const image = document.getElementById("qrPrintImage");
            const status = document.getElementById("qrPrintStatus");
            const runPrint = () => {
              if (status) {
                status.textContent = "QR画像の準備ができました。印刷します。";
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
                  status.textContent = "QR画像の読み込みに失敗しました。再度お試しください。";
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
    popupBlockedMessage: "印刷用ウィンドウを開けませんでした。ポップアップ設定を確認してください。"
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
    const codeLabel = code || "未設定";
    const warningText = code ? "" : "管理コード未設定です。園地マスターで設定してください。";
    const varietyNames = collectVarietyNamesByLocation({ orchardId: orchard.id });
    return {
      type: "orchard",
      title: `園地QR: ${orchard.name}${code ? ` (${code})` : "（管理コード未設定）"}`,
      meta: `管理コード: ${codeLabel}${code ? "" : "（要設定）"} / 園地ID: ${orchard.id}`,
      detailText: varietyNames.length ? `品種: ${varietyNames.join("、")}` : "品種: 該当記録なし",
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
    const plotCodeLabel = plotCode || "未設定";
    const warningText = plotCode ? "" : "管理コード未設定です。区画マスターで設定してください。";
    const varietyNames = collectVarietyNamesByLocation({ orchardId: plot.orchardId, plotId: plot.id });
    return {
      type: "plot",
      title: `区画QR: ${plot.name}${plotCode ? ` (${plotCode})` : "（管理コード未設定）"}`,
      meta: `園地: ${orchard?.name || "未設定"}${orchardCode ? ` (${orchardCode})` : ""} / 区画管理コード: ${plotCodeLabel}${plotCode ? "" : "（要設定）"} / 園地ID: ${plot.orchardId} / 区画ID: ${plot.id}`,
      detailText: varietyNames.length ? `品種: ${varietyNames.join("、")}` : "品種: 該当記録なし",
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
  payloadText.textContent = `識別子: ${payload}`;
  const actions = document.createElement("div");
  actions.className = "qr-card__actions";
  const saveLink = document.createElement("a");
  saveLink.className = "button button--ghost button--small";
  saveLink.href = image.src;
  saveLink.download = `${title.replace(/\s+/g, "-")}.png`;
  saveLink.textContent = "画像保存";
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
    qrCodeList.appendChild(buildEmptyState("園地・区画を登録するとQRコード一覧を表示できます。"));
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
    qrCodeList.appendChild(buildEmptyState("条件に一致するQRコードがありません。検索条件を見直してください。"));
    return;
  }

  filteredItems.forEach((item) => {
    qrCodeList.appendChild(createQrCard(item));
  });
}

function applyQrLocation({ orchardId, plotId }) {
  const orchard = getOrchardById(orchardId);
  if (!orchard) {
    window.alert("読み取ったQRコードの園地IDが存在しません。マスターを確認してください。");
    return false;
  }
  orchardSelect.value = orchard.id;
  renderPlotOptions(orchard.id, "");
  recordWeatherInfo = null;
  clearWeatherDetailInputs();
    setWeatherFetchStatus(`必要に応じて「${WEATHER_FETCH_BUTTON_TEXT}」を押してください。`);
  if (plotId) {
    const plot = getPlotById(plotId);
    if (!plot || plot.orchardId !== orchard.id) {
      window.alert("読み取ったQRコードの区画IDが存在しないか、園地と一致しません。");
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
    window.alert("読み取ったコードは対応していません。園地・区画QRコードを使用してください。");
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
    qrScannerMessage.textContent = "QR読み取り中にエラーが発生しました。手入力を利用してください。";
  }
  qrScanFrameId = requestAnimationFrame(scanQrFrame);
}

async function openQrScanner() {
  if (typeof qrScannerDialog.showModal !== "function") {
    window.alert("このブラウザでは読み取り画面を開けません。手入力を利用してください。");
    return;
  }
  qrManualInput.value = "";
  qrScannerMessage.textContent = "カメラを起動してQRコードを読み取ってください。";
  qrScannerDialog.showModal();
  if (!("BarcodeDetector" in window)) {
    qrScannerMessage.textContent = "この端末ではカメラQR読み取りに未対応です。下の手入力を利用してください。";
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
    qrScannerMessage.textContent = "カメラを起動できませんでした。下の手入力を利用してください。";
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
    window.alert("CSV出力できる作業記録がありません。");
    return;
  }
  const header = ["作業日", "園地", "区画", "品種", "作業内容", "当日グループ", "使用固定チームセット", "日別チーム編成", "作業時間", "作業人数", "延べ人時", "概算人件費", "代表作業者名", "作業者一覧", "所属区分", "時給単価", "開始時刻", "終了時刻", "天気", "使用資材", "メモ"];
  const rows = records.slice().sort((a, b) => new Date(b.workDate) - new Date(a.workDate)).map((record) => {
    const names = getRecordDisplay(record);
    const metrics = getRecordMetrics(record);
    const teamPlan = getTeamPlan(record.workDate, record.dailyGroupId);
    const teamPlanText = teamPlan ? teamPlan.workerIds.map((workerId) => getWorkerById(workerId)?.displayName).filter(Boolean).join("、") : "";
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
    window.alert(comparisonData.periodConfig.error || "比較条件を確認してください。");
    return;
  }
  const metricLabelMap = {
    count: "件数基準",
    hours: "総作業時間基準",
    personHours: "延べ人時基準",
    laborCost: "概算人件費基準"
  };
  const metricLabel = metricLabelMap[comparisonSortMetricInput.value] || "総作業時間基準";
  const sortLabel = comparisonSortOrderInput.value === "asc" ? "少ない順" : "多い順";
  const header = ["区分", "名称", "累積作業件数", "累積総作業時間", "累積延べ人時", "累積概算人件費", "比較期間", "並び替え基準", "並び順"];
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
function exportCsvWithTemperature() {
  if (!records.length) {
    // legacy-disabled
    window.alert("CSV出力できる作業記録がありません。");
    return;
    // legacy-disabled-end
    window.alert("CSV出力できる作業記録がありません。");
    return;
  }

  const header = [
    "作業日",
    "園地",
    "区画",
    "品種",
    "作業区分",
    "当日グループ",
    "使用固定チームセット",
    "日別チーム編成",
    "作業時間",
    "作業人数",
    "延べ人時",
    "概算人件費",
    "代表作業者名",
    "作業者一覧",
    "所属区分",
    "時給単価",
    "開始時刻",
    "終了時刻",
    "現在気温（℃）",
    "平均気温（℃）",
    "天気",
    "使用資材",
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
            .join("、")
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
    "\u4f5c\u696d\u65e5",
    "\u5712\u5730",
    "\u533a\u753b",
    "\u54c1\u7a2e",
    "\u4f5c\u696d\u533a\u5206",
    "\u5f53\u65e5\u30b0\u30eb\u30fc\u30d7",
    "\u4f7f\u7528\u56fa\u5b9a\u30c1\u30fc\u30e0\u30bb\u30c3\u30c8",
    "\u65e5\u5225\u30c1\u30fc\u30e0\u7de8\u6210",
    "\u4f5c\u696d\u6642\u9593",
    "\u4f5c\u696d\u4eba\u6570",
    "\u5ef6\u3079\u4eba\u6642",
    "\u6982\u7b97\u4eba\u4ef6\u8cbb",
    "\u4ee3\u8868\u4f5c\u696d\u8005\u540d",
    "\u4f5c\u696d\u8005\u4e00\u89a7",
    "\u6240\u5c5e\u533a\u5206",
    "\u6642\u7d66\u5358\u4fa1",
    "\u958b\u59cb\u6642\u523b",
    "\u7d42\u4e86\u6642\u523b",
    "\u73fe\u5728\u6c17\u6e29\uff08\u2103\uff09",
    "\u5e73\u5747\u6c17\u6e29\uff08\u2103\uff09",
    "\u5929\u6c17",
    "\u6700\u9ad8\u6c17\u6e29\uff08\u2103\uff09",
    "\u6700\u4f4e\u6c17\u6e29\uff08\u2103\uff09",
    "\u964d\u6c34\u91cf\uff08mm\uff09",
    "\u6e7f\u5ea6\uff08%\uff09",
    "\u98a8\u901f\uff08m/s\uff09",
    "\u5929\u6c17\u30b3\u30fc\u30c9",
    "\u5929\u6c17\u53d6\u5f97\u6642\u523b",
    "\u73fe\u5834\u78ba\u8a8d\u30b5\u30de\u30ea\u30fc",
    "\u75c5\u6c17\u767a\u751f",
    "\u5bb3\u866b\u767a\u751f",
    "\u85ac\u5264\u6563\u5e03",
    "\u75c5\u6591\u30fb\u98df\u5bb3",
    "\u8449\u679d\u306e\u6ffe\u308c",
    "\u306c\u304b\u308b\u307f",
    "\u4f5c\u696d\u3057\u306b\u304f\u3055",
    "\u73fe\u5834\u30e1\u30e2",
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
      const observation = normalizeFieldObservation(record.fieldObservation);
      const observationSummary = formatFieldObservationSummary(observation);
      const teamPlan = getTeamPlan(record.workDate, record.dailyGroupId);
      const teamPlanText = teamPlan
        ? teamPlan.workerIds.map((workerId) => getWorkerById(workerId)?.displayName).filter(Boolean).join("\u3001")
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

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!orchardSelect.value || !plotSelect.value || !varietySelect.value) {
    window.alert("園地・区画・品種をすべて選択してください。");
    return;
  }
  if (!groupSelect.value) {
    window.alert("その日に参加するグループを選択してください。");
    return;
  }
  if (!selectedWorkerIds.length) {
    window.alert("作業者を1人以上選択してください。");
    return;
  }
  if ((startTimeInput.value && !endTimeInput.value) || (!startTimeInput.value && endTimeInput.value)) {
    window.alert("開始時刻と終了時刻はセットで入力してください。");
    return;
  }
  if (startTimeInput.value && endTimeInput.value && calculateHoursFromRange(startTimeInput.value, endTimeInput.value) === null) {
    window.alert("終了時刻は開始時刻より後に設定してください。");
    return;
  }
  const record = getFormData();
  const index = records.findIndex((item) => item.id === record.id);
  if (index >= 0) records[index] = record;
  else records.push(record);
  saveState();
  resetRecordForm();
  render();
});

orchardSelect.addEventListener("change", () => {
  renderPlotOptions(orchardSelect.value);
  recordWeatherInfo = null;
  clearWeatherDetailInputs();
  if (orchardSelect.value) {
    setWeatherFetchStatus(`入力内容が変わりました。必要に応じて「${WEATHER_FETCH_BUTTON_TEXT}」を押してください。`);
  } else {
    setWeatherFetchStatus(WEATHER_FETCH_HINT_TEXT);
  }
});
if (fetchWeatherButton) {
  fetchWeatherButton.addEventListener("click", handleFetchWeatherClick);
}
workDateInput.addEventListener("change", () => {
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
groupSelect.addEventListener("change", () => {
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
startTimeInput.addEventListener("change", updateTimeHint);
endTimeInput.addEventListener("change", updateTimeHint);
workHoursInput.addEventListener("input", updateTimeHint);
resetButton.addEventListener("click", resetRecordForm);
orchardFilterInput.addEventListener("change", renderRecords);
varietyFilterInput.addEventListener("change", renderRecords);
taskFilterInput.addEventListener("change", renderRecords);
workerFilterInput.addEventListener("change", renderRecords);
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
exportButton.addEventListener("click", exportCsvWithTemperature);
if (shortcutRecordFormButton) {
  shortcutRecordFormButton.addEventListener("click", () => moveToShortcut(recordFormPanel, workDateInput));
}
if (shortcutTeamPlanButton) {
  shortcutTeamPlanButton.addEventListener("click", () => moveToShortcut(teamPlanPanel, teamPlanDateInput));
}
if (shortcutDailyReportButton) {
  shortcutDailyReportButton.addEventListener("click", () => {
    if (dailyReportDateInput && !dailyReportDateInput.value) {
      dailyReportDateInput.value = getTodayString();
    }
    moveToShortcut(recordListPanel, dailyReportDateInput);
  });
}
if (shortcutMonthlyReportButton) {
  shortcutMonthlyReportButton.addEventListener("click", () => {
    setSettingsSection("company", {
      switchToSettingsView: true,
      scrollIntoView: true,
      focusElement: fiscalClosingMonthInput
    });
  });
}
if (shortcutAnnualReportButton) {
  shortcutAnnualReportButton.addEventListener("click", () => {
    setSummarySection("top", {
      switchToSummaryView: true,
      scrollIntoView: true,
      focusElement: summaryMenuDailyButton
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
if (bottomNavButtons.length) {
  const viewFocusMap = {
    record: workDateInput,
    team: teamPlanDateInput,
    records: orchardFilterInput,
    summary: summaryMenuDailyButton,
    settings: settingsMenuCompanyButton
  };
  bottomNavButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetView = button.dataset.appView;
      if (!targetView || !appViewPanelMap[targetView]) return;
      if (targetView === "settings") {
        setSettingsSection("top", { scrollIntoView: false, focusElement: settingsMenuCompanyButton });
      } else if (targetView === "summary") {
        setSummarySection("top", { scrollIntoView: false, focusElement: summaryMenuDailyButton });
      }
      setAppView(targetView, {
        scrollIntoView: true,
        focusElement: viewFocusMap[targetView] || null
      });
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
  payrollPrintButton.addEventListener("click", openPayrollReportWindow);
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
comparisonExportButton.addEventListener("click", exportCumulativeComparisonCsv);
qrScanButton.addEventListener("click", openQrScanner);
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
backupButton.addEventListener("click", downloadJsonBackup);
restoreButton.addEventListener("click", () => restoreInput.click());
restoreInput.addEventListener("change", handleRestoreFile);
if (resetAllDataButton) {
  resetAllDataButton.addEventListener("click", resetAllDataToSeedState);
}
comparisonPeriodInput.addEventListener("change", renderCumulativeComparison);
comparisonSortMetricInput.addEventListener("change", renderCumulativeComparison);
comparisonSortOrderInput.addEventListener("change", renderCumulativeComparison);
comparisonFromDateInput.addEventListener("change", renderCumulativeComparison);
comparisonToDateInput.addEventListener("change", renderCumulativeComparison);
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
qrScannerCloseButton.addEventListener("click", closeQrScanner);
qrScannerDialog.addEventListener("close", stopQrScannerStream);
qrManualApplyButton.addEventListener("click", () => {
  const value = qrManualInput.value.trim();
  if (!value) {
    window.alert("手入力コードを入力してください。");
    return;
  }
  handleQrDecodedValue(value);
});

orchardForm.addEventListener("submit", (event) => {
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
    window.alert("同じ園地名がすでに登録されています。");
    return;
  }
  if (managementCode && masters.orchards.some((item) => normalizeManagementCode(item.managementCode) === managementCode && item.id !== id)) {
    window.alert("同じ園地管理コードがすでに登録されています。");
    return;
  }
  if (latitudeText && !Number.isFinite(latitude)) {
    window.alert("緯度は -90 〜 90 の範囲で入力してください。");
    return;
  }
  if (longitudeText && !Number.isFinite(longitude)) {
    window.alert("経度は -180 〜 180 の範囲で入力してください。");
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

plotForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const id = plotIdInput.value || createId("plot");
  const orchardId = plotOrchardInput.value;
  const name = plotNameInput.value.trim();
  const managementCode = normalizeManagementCode(plotCodeInput.value);
  const note = plotNoteInput.value.trim();
  if (masters.plots.some((item) => item.orchardId === orchardId && item.name === name && item.id !== id)) {
    window.alert("同じ園地に同名の区画が登録されています。");
    return;
  }
  if (managementCode && masters.plots.some((item) => normalizeManagementCode(item.managementCode) === managementCode && item.id !== id)) {
    window.alert("同じ区画管理コードがすでに登録されています。");
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

varietyForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const id = varietyIdInput.value || createId("variety");
  const name = varietyNameInput.value.trim();
  const note = varietyNoteInput.value.trim();
  if (masters.varieties.some((item) => item.name === name && item.id !== id)) {
    window.alert("同じ品種名がすでに登録されています。");
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

groupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const id = groupIdInput.value || createId("group");
  const name = groupNameInput.value.trim();
  const sortOrder = Number(groupSortOrderInput.value || masters.groups.length + 1);
  const description = groupDescriptionInput.value.trim();
  const isActive = groupIsActiveInput.checked;
  if (masters.groups.some((item) => item.name === name && item.id !== id)) {
    window.alert("同じグループ名がすでに登録されています。");
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
  saveState();
  resetGroupForm();
  render();
});

teamSetGroupIdInput.addEventListener("change", () => {
  selectedTeamSetWorkerIds = selectedTeamSetWorkerIds.filter((workerId) => getWorkerById(workerId)?.isActive);
  renderTeamSetWorkerList();
});

teamSetForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const id = teamSetIdInput.value || createId("team-set");
  const name = teamSetNameInput.value.trim();
  const groupId = teamSetGroupIdInput.value;
  const workerIds = [...new Set(selectedTeamSetWorkerIds)];
  if (!name || !groupId) {
    window.alert("セット名と作業グループを入力してください。");
    return;
  }
  if (!workerIds.length) {
    window.alert("固定チームセットには作業者を1人以上登録してください。");
    return;
  }
  if (masters.fixedTeamSets.some((item) => item.name === name && item.id !== id)) {
    window.alert("同じセット名がすでに登録されています。");
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

workerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const id = workerIdInput.value || createId("worker");
  const fullName = workerFullNameInput.value.trim();
  const displayName = workerDisplayNameInput.value.trim();
  const category = workerCategoryInput.value;
  const hourlyRate = Number(workerHourlyRateInput.value || 0);
  const isActive = workerIsActiveInput.checked;
  if (masters.workers.some((item) => item.fullName === fullName && item.id !== id)) {
    window.alert("同じ氏名の作業者がすでに登録されています。重複登録しない運用です。");
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

membershipWorkerIdInput.addEventListener("change", () => {
  selectedMembershipGroupIds = [];
  membershipPrimaryGroupIdInput.value = "";
  renderMembershipGroupList();
});

membershipForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const workerId = membershipWorkerIdInput.value;
  if (!workerId) {
    window.alert("作業者を選択してください。");
    return;
  }
  if (!selectedMembershipGroupIds.length) {
    window.alert("所属グループを1つ以上選択してください。");
    return;
  }
  if (!membershipPrimaryGroupIdInput.value || !selectedMembershipGroupIds.includes(membershipPrimaryGroupIdInput.value)) {
    window.alert("主所属グループを選択してください。");
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

teamPlanDateInput.addEventListener("change", () => {
  selectedTeamPlanWorkerIds = [];
  teamPlanIdInput.value = "";
  renderTeamPlanWorkerList();
});

teamPlanGroupInput.addEventListener("change", () => {
  selectedTeamPlanWorkerIds = [];
  teamPlanIdInput.value = "";
  renderTeamPlanWorkerList();
});

teamSetSelectInput.addEventListener("change", () => {
  const selected = getTeamSetById(teamSetSelectInput.value);
  teamSetHint.textContent = selected
    ? `現在選択中: ${selected.name}（必要に応じて欠勤者を外し、応援者を追加できます）`
    : "固定チームセットを呼び出すと、参加者を一括で反映できます。";
});

teamPlanForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!teamPlanDateInput.value || !teamPlanGroupInput.value) {
    window.alert("編成日と作業グループを選択してください。");
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

teamPlanCopyButton.addEventListener("click", () => {
  if (!teamPlanDateInput.value || !teamPlanGroupInput.value) {
    window.alert("先に編成日と作業グループを選択してください。");
    return;
  }
  const previousPlan = getLatestPreviousTeamPlan(teamPlanDateInput.value, teamPlanGroupInput.value);
  if (!previousPlan) {
    window.alert("コピーできる前回編成がありません。");
    return;
  }
  teamSetSelectInput.value = previousPlan.fixedTeamSetId || "";
  selectedTeamPlanWorkerIds = previousPlan.workerIds.slice();
  renderTeamPlanWorkerList();
});

teamPlanLoadSetButton.addEventListener("click", () => {
  if (!teamPlanGroupInput.value) {
    window.alert("先に作業グループを選択してください。");
    return;
  }
  const selectedTeamSet = getTeamSetById(teamSetSelectInput.value);
  if (!selectedTeamSet) {
    window.alert("呼び出す固定チームセットを選択してください。");
    return;
  }
  selectedTeamPlanWorkerIds = selectedTeamSet.workerIds.slice();
  renderTeamPlanWorkerList();
});

teamPlanApplyButton.addEventListener("click", () => {
  if (!teamPlanDateInput.value || !teamPlanGroupInput.value) {
    window.alert("先に編成日と作業グループを選択してください。");
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

teamPlanResetButton.addEventListener("click", () => {
  resetTeamPlanForm();
  renderTeamPlanWorkerList();
});

orchardResetButton.addEventListener("click", resetOrchardForm);
plotResetButton.addEventListener("click", resetPlotForm);
varietyResetButton.addEventListener("click", resetVarietyForm);
groupResetButton.addEventListener("click", resetGroupForm);
teamSetResetButton.addEventListener("click", () => {
  resetTeamSetForm();
  renderTeamSetWorkerList();
});
workerResetButton.addEventListener("click", resetWorkerForm);
membershipResetButton.addEventListener("click", () => {
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
      window.alert("決算締月は1〜12で入力してください。");
      return;
    }
    if (!Number.isFinite(dayValue) || dayValue < 1 || dayValue > 31) {
      window.alert("決算締日は1〜31で入力してください。");
      return;
    }
    if (!Number.isFinite(baseTemperatureValue)) {
      window.alert("\u7a4d\u7b97\u6e29\u5ea6\u306e\u57fa\u6e96\u6e29\u5ea6\u3092\u6570\u5024\u3067\u5165\u529b\u3057\u3066\u304f\u3060\u3055\u3044\u3002");
      return;
    }
    if (!startTimeValue || !endTimeValue) {
      window.alert("標準出勤時刻と標準退勤時刻を入力してください。");
      return;
    }
    if (parseTimeToMinutes(endTimeValue) <= parseTimeToMinutes(startTimeValue)) {
      window.alert("標準退勤時刻は標準出勤時刻より後に設定してください。");
      return;
    }
    if (!Number.isFinite(breakMinutesValue) || breakMinutesValue < 0 || breakMinutesValue > 300) {
      window.alert("休憩時間は0〜300分で入力してください。");
      return;
    }
    if (![15, 30].includes(timeUnitMinutesValue)) {
      window.alert("時間計算の丸め単位は15分または30分を選択してください。");
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
    const breakText = `${Math.floor(previewSettings.workdayBreakMinutes / 60)}時間${String(previewSettings.workdayBreakMinutes % 60).padStart(2, "0")}分`;
    const defaultHours = getDefaultWorkHours(previewSettings);
    companyFiscalYearPreview.textContent = `\u73fe\u5728\u306e\u6c7a\u7b97\u5e74\u5ea6: ${formatDateYmd(fiscalRange.from)}\u301c${formatDateYmd(fiscalRange.to)} / \u7a4d\u7b97\u6e29\u5ea6\u57fa\u6e96: ${baseTemperatureText}\u2103 / \u6a19\u6e96\u52e4\u52d9: ${previewSettings.workdayStartTime}\u301c${previewSettings.workdayEndTime}\uff08\u4f11\u61a9 ${breakText}\uff09= ${defaultHours}\u6642\u9593 / \u4e38\u3081: ${previewSettings.payrollTimeUnitMinutes}\u5206`;
  };
  fiscalClosingMonthInput.addEventListener("input", updatePreview);
  fiscalClosingDayInput.addEventListener("input", updatePreview);
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
  const breakText = `${Math.floor(normalized.workdayBreakMinutes / 60)}時間${String(normalized.workdayBreakMinutes % 60).padStart(2, "0")}分`;
  const defaultHours = getDefaultWorkHours(normalized);
  companyFiscalYearPreview.textContent = `\u73fe\u5728\u306e\u6c7a\u7b97\u5e74\u5ea6: ${formatDateYmd(fiscalRange.from)}\u301c${formatDateYmd(fiscalRange.to)} / \u7a4d\u7b97\u6e29\u5ea6\u57fa\u6e96: ${baseTemperatureText}\u2103 / \u6a19\u6e96\u52e4\u52d9: ${normalized.workdayStartTime}\u301c${normalized.workdayEndTime}\uff08\u4f11\u61a9 ${breakText}\uff09= ${defaultHours}\u6642\u9593 / \u4e38\u3081: ${normalized.payrollTimeUnitMinutes}\u5206`;
  applyDefaultWorkScheduleToForm();
}

function exportCumulativeComparisonCsv() {
  const comparisonData = getCumulativeComparisonData();
  if (!comparisonData.periodConfig.isValid) {
    window.alert(comparisonData.periodConfig.error || "比較条件を確認してください。");
    return;
  }
  const metricLabelMap = {
    count: "件数基準",
    hours: "総作業時間基準",
    personHours: "延べ人時基準",
    laborCost: "概算人件費基準"
  };
  const metricLabel = metricLabelMap[comparisonSortMetricInput.value] || "総作業時間基準";
  const sortLabel = comparisonSortOrderInput.value === "asc" ? "少ない順" : "多い順";
  const periodModeLabel = getComparisonPeriodLabel(comparisonData.periodConfig.mode);
  const periodRangeLabel = comparisonData.periodConfig.rangeText || "";
  const header = ["種別", "名称", "累積作業件数", "累積総作業時間", "累積延べ人時", "累積概算人件費", "比較期間", "比較期間範囲", "並び替え基準", "並び順"];
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
  renderCompanySettings();
}

function registerPwaServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  const isSecure = location.protocol === "https:" || location.hostname === "localhost" || location.hostname === "127.0.0.1";
  if (!isSecure) return;
  window.addEventListener("load", () => {
    const swUrl = new URL("./sw.js", window.location.href);
    const scopeUrl = new URL("./", window.location.href);
    navigator.serviceWorker.register(swUrl.href, {
      scope: scopeUrl.pathname,
      updateViaCache: "none"
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
render();
setAppView(activeAppViewKey, { scrollIntoView: false });
setWeatherFetchStatus(WEATHER_FETCH_HINT_TEXT);
