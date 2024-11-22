import { ConsoleLogService } from "../../../src/infra/services/console-log.service";

describe("ConsoleLogService", () => {
  let consoleSpy: jest.SpyInstance;
  let logService: ConsoleLogService;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    logService = new ConsoleLogService();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it("should call console.log with the correct message", () => {
    const testMessage = "Test log message";

    logService.log(testMessage);

    expect(consoleSpy).toHaveBeenCalledWith(testMessage);
  });

  it("should handle non-string messages", () => {
    const testObject = { key: "value" };

    logService.log(testObject);

    expect(consoleSpy).toHaveBeenCalledWith(testObject);
  });
});
