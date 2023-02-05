interface PerformanceResult {
  result: any;
  time: number;
  memory: number;
}

const checkPerformance = async (
  callback: Function,
): Promise<PerformanceResult> => {
  const start = performance.now();
  const memoryStart = process.memoryUsage();
  const result = await callback();
  const end = performance.now();

  const formatMemoryUsage = (data: any) =>
    Math.round((data / 1024 / 1024) * 100) / 100;

  return {
    result: result,
    time: end - start,
    memory: formatMemoryUsage(memoryStart.heapUsed),
  };
};

export default checkPerformance;
