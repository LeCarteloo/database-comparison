interface PerformanceResult {
  result: any;
  time: number;
  memory?: NodeJS.MemoryUsage;
}

const checkPerformance = async (
  callback: Function,
): Promise<PerformanceResult> => {
  const start = performance.now();
  const memoryStart = process.memoryUsage();
  const result = await callback();
  const memoryEnd = process.memoryUsage();
  const end = performance.now();

  const memory = Object.keys(memoryEnd).reduce((a, k) => {
    a[k as keyof typeof memoryEnd] =
      Math.round(
        ((memoryEnd[k as keyof typeof memoryEnd] -
          memoryStart[k as keyof typeof memoryEnd]) /
          1024 /
          1024) *
          100,
      ) / 100;
    return a;
  }, {} as NodeJS.MemoryUsage);

  return {
    result: result,
    time: end - start,
    memory: memory,
  };
};

export default checkPerformance;
