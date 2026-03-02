import { api } from "./api";

export async function evaluateCustomDataset(payload) {
  // send payload to backend custom evaluation endpoint
  try {
    const res = await api.post("/api/eval/custom", payload);
    return res.data;
  } catch (err) {
    console.error("evaluateCustomDataset error", err);
    // return a standardized error object
    return {
      success: false,
      error: err.response?.data || err.message || "Unknown error",
    };
  }
}

export async function testBenchmark(payload) {
  try {
    const res = await api.post("/api/eval/benchmark", payload);
    return res.data;
  } catch (err) {
    console.error("testBenchmark error", err);
    return { success: false, error: err.response?.data || err.message };
  }
}

export async function getEvaluationRuns() {
  try {
    const res = await api.get("/api/runs");
    return res.data;
  } catch (err) {
    console.error("getEvaluationRuns error", err);
    return { success: false, error: err.response?.data || err.message };
  }
}

export async function getDashboardStats() {
  try {
    const res = await api.get("/api/dashboard");
    return res.data;
  } catch (err) {
    console.warn("dashboard endpoint missing, computing from runs", err);
    // fallback: fetch runs and compute basic stats
    try {
      const runsRes = await api.get("/api/runs");
      const runs = runsRes.data?.data?.runs || [];
      const totalRuns = runs.length;
      const completedRuns = runs.filter(r => r.status === "completed").length;
      const activeRuns = runs.filter(r => r.status === "running").length;
      const averageAccuracy = runs.reduce((sum, r) => sum + (r.accuracy||0), 0) / (totalRuns || 1);
      return {
        success: true,
        data: {
          totalRuns,
          completedRuns,
          activeRuns,
          averageAccuracy: Math.round(averageAccuracy),
          trend: []
        }
      };
    } catch (e) {
      console.error("failed to compute dashboard from runs", e);
      return { success: false, error: e.response?.data || e.message };
    }
  }
}

export async function generateVariants(payload) {
  try {
    const res = await api.post("/api/generate", payload);
    return res.data;
  } catch (err) {
    console.error("generateVariants error", err);
    return { success: false, error: err.response?.data || err.message };
  }
}

export async function judgeResponse(payload) {
  try {
    const res = await api.post("/api/judge", payload);
    return res.data;
  } catch (err) {
    console.error("judgeResponse error", err);
    return { success: false, error: err.response?.data || err.message };
  }
}

export async function compareModels() {
  try {
    const res = await api.get("/api/compare");
    return res.data;
  } catch (err) {
    console.error("compareModels error", err);
    return { success: false, error: err.response?.data || err.message };
  }
}

export async function comprehensiveTest(payload) {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return {
    success: true,
    data: {
      overallAccuracy: 76,
      generatedTests: {
        total: 5,
        passed: 4,
      },
      benchmarks: {
        aime: 80,
        mmlu: 72,
      },
    },
  };
}

export async function createRun(payload) {
  await new Promise((r) => setTimeout(r, 1000));
  return {
    success: true,
    data: {
      _id: "run_new_1",
      runName: payload.runName,
      status: "pending",
      createdAt: "2026-03-05",
    },
  };
}

export async function getRunById(id) {
  await new Promise((r) => setTimeout(r, 1000));
  return {
    success: true,
    data: {
      _id: id,
      runName: "GPT-4 Baseline",
      status: "running",
      progress: { completed: 6, total: 10 },
      benchmarkStats: {
        aime: 80,
        mmlu: 70,
      },
    },
  };
}

export async function startRun(id) {
  await new Promise((r) => setTimeout(r, 1000));
  return { success: true };
}

export async function deleteRun(id) {
  await new Promise((r) => setTimeout(r, 800));
  return { success: true };
}

let mockTestcases = [
  {
    _id: "tc_1",
    prompt: "What is AI?",
    expectedOutput: "Artificial Intelligence...",
    generationType: "manual",
  },
  {
    _id: "tc_2",
    prompt: "What is NOT the capital of France?",
    expectedOutput: "Berlin",
    generationType: "negation",
  },
];

export async function getTestcases() {
  await new Promise((r) => setTimeout(r, 800));
  return { success: true, data: mockTestcases };
}

export async function createTestcase(payload) {
  await new Promise((r) => setTimeout(r, 800));
  const newTc = { ...payload, _id: Date.now().toString() };
  mockTestcases.push(newTc);
  return { success: true, data: newTc };
}

export async function updateTestcase(id, payload) {
  await new Promise((r) => setTimeout(r, 800));
  mockTestcases = mockTestcases.map((tc) =>
    tc._id === id ? { ...tc, ...payload } : tc
  );
  return { success: true };
}

export async function deleteTestcase(id) {
  await new Promise((r) => setTimeout(r, 800));
  mockTestcases = mockTestcases.filter((tc) => tc._id !== id);
  return { success: true };
}

export async function getJudgementStats(runId) {
  await new Promise((r) => setTimeout(r, 1000));

  return {
    success: true,
    data: {
      totalJudgements: 10,
      passed: 7,
      failed: 3,
      passRate: 70,
      averageScore: 7.2,
      scoreDistribution: {
        "0-2": 0,
        "3-5": 3,
        "6-8": 5,
        "9-10": 2,
      },
      averageCriteria: {
        accuracy: 7.5,
        relevance: 7.1,
        coherence: 7.0,
        completeness: 7.2,
      },
      judgements: [
        { id: "j1", score: 8, passed: true },
        { id: "j2", score: 6, passed: true },
        { id: "j3", score: 4, passed: false },
      ],
    },
  };
}

export async function getRunResults(id) {
  await new Promise((r) => setTimeout(r, 1000));

  return {
    success: true,
    data: {
      summary: {
        total: 10,
        passed: 7,
        failed: 3,
        accuracy: 70,
      },
      results: [
        {
          input: "What is 2+2?",
          expected: "4",
          modelOutput: "4",
          passed: true,
        },
        {
          input: "Capital of France?",
          expected: "Paris",
          modelOutput: "Berlin",
          passed: false,
        },
      ],
    },
  };
}

export async function getJudgementById(id) {
  await new Promise((r) => setTimeout(r, 800));

  return {
    success: true,
    data: {
      id,
      score: 8,
      passed: true,
      reasoning: "Strong reasoning and clarity.",
    },
  };
}

export async function getTestcaseJudgements(id) {
  await new Promise((r) => setTimeout(r, 800));
  return {
    success: true,
    data: [
      { id: "j1", score: 7, passed: true },
      { id: "j2", score: 5, passed: false },
    ],
  };
}