export async function evaluateCustomDataset(payload) {
  console.log("Mock payload:", payload);

  // Simulate delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return {
    success: true,
    data: {
      summary: {
        total: 2,
        passed: 1,
        failed: 1,
        accuracy: 50,
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
          modelOutput: "The capital is Paris.",
          passed: false,
        },
      ],
    },
  };
}

export async function testBenchmark(payload) {
  console.log("Mock benchmark payload:", payload);

  await new Promise((resolve) => setTimeout(resolve, 1500));

  return {
    success: true,
    data: {
      benchmarkType: payload.benchmarkType,
      overall: {
        total: 10,
        passed: 7,
        accuracy: 70,
        averageScore: 7.8,
      },
      byCategory: {
        algebra: { total: 3, passed: 3, accuracy: 100 },
        geometry: { total: 4, passed: 2, accuracy: 50 },
        number_theory: { total: 3, passed: 2, accuracy: 66.7 },
      },
    },
  };
}

export async function getEvaluationRuns() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    success: true,
    data: {
      runs: [
        {
          _id: "run_1",
          runName: "GPT-4 Baseline",
          status: "completed",
          progress: { completed: 10, total: 10 },
          createdAt: "2026-03-01",
        },
        {
          _id: "run_2",
          runName: "Phi-2 Adversarial Test",
          status: "running",
          progress: { completed: 5, total: 10 },
          createdAt: "2026-03-02",
        },
        {
          _id: "run_3",
          runName: "Qwen Benchmark",
          status: "pending",
          progress: { completed: 0, total: 10 },
          createdAt: "2026-03-03",
        },
      ],
    },
  };
}

export async function getDashboardStats() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    success: true,
    data: {
      totalRuns: 24,
      completedRuns: 18,
      activeRuns: 3,
      averageAccuracy: 72,
      trend: [
        { name: "Mon", accuracy: 65 },
        { name: "Tue", accuracy: 70 },
        { name: "Wed", accuracy: 75 },
        { name: "Thu", accuracy: 68 },
        { name: "Fri", accuracy: 80 },
      ],
    },
  };
}

export async function generateVariants(payload) {
  console.log("Mock generator payload:", payload);

  await new Promise((resolve) => setTimeout(resolve, 1500));

  return {
    success: true,
    data: [
      {
        _id: "tc_1",
        prompt: "What is the capital?",
        generationType: "ambiguity",
      },
      {
        _id: "tc_2",
        prompt: "What is the capital of France, which is not Paris?",
        generationType: "contradiction",
      },
      {
        _id: "tc_3",
        prompt: "What is NOT the capital of France?",
        generationType: "negation",
      },
    ],
  };
}

export async function judgeResponse(payload) {
  console.log("Mock judge payload:", payload);

  await new Promise((resolve) => setTimeout(resolve, 1500));

  return {
    success: true,
    data: {
      score: 8.5,
      passed: true,
      reasoning:
        "The response demonstrates strong understanding with minor gaps.",
      criteria: {
        accuracy: 9,
        relevance: 8,
        coherence: 9,
        completeness: 8,
      },
      feedback:
        "Excellent explanation. Consider adding one more real-world example.",
    },
  };
}

export async function compareModels() {
  await new Promise((resolve) => setTimeout(resolve, 1200));

  return {
    success: true,
    data: [
      {
        name: "GPT-4",
        accuracy: 85,
        categories: {
          algebra: 90,
          geometry: 80,
          number_theory: 85,
        },
      },
      {
        name: "Claude",
        accuracy: 78,
        categories: {
          algebra: 75,
          geometry: 82,
          number_theory: 77,
        },
      },
      {
        name: "Qwen",
        accuracy: 70,
        categories: {
          algebra: 65,
          geometry: 72,
          number_theory: 73,
        },
      },
    ],
  };
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