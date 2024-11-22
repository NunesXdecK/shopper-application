import { HttpRequestArgs } from "../../../src/core/domains/types.type";
import { HttpMethods } from "../../../src/core/enums/http-methods.enum";
import { FetchHttpService } from "../../../src/infra/services/fetch-http.service";

describe("FetchHttpService", () => {
  let fetchHttpService: FetchHttpService;

  beforeEach(() => {
    global.fetch = jest.fn();
    fetchHttpService = new FetchHttpService();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const testCases = [
    { httpMethod: HttpMethods.GET },
    { httpMethod: HttpMethods.PUT },
    { httpMethod: HttpMethods.POST },
    { httpMethod: HttpMethods.DELETE },
  ];

  testCases.forEach(({ httpMethod }) => {
    it(`should call fetch with correct arguments for ${httpMethod.toUpperCase()}`, async () => {
      const url = "https://test.test/";
      const args: HttpRequestArgs = {
        headers: { Authorization: "Bearer token" },
        body: JSON.stringify({ key: "value" }),
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue({ success: true }),
      });

      await fetchHttpService?.[httpMethod](url, args);

      expect(global.fetch).toHaveBeenCalledWith(
        url,
        expect.objectContaining({
          method: httpMethod,
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer token",
          },
          body: JSON.stringify({ key: "value" }),
        })
      );
    });
  });

  it("should return the response from fetch", async () => {
    const responseData = { data: "example" };
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue(responseData),
    });

    const result = await fetchHttpService.get(
      "https://test.test/"
    );

    expect(result).toEqual({
      ok: true,
      json: expect.any(Function),
    });
  });

  it("should handle fetch errors", async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(
      new Error("Network Error")
    );

    await expect(
      fetchHttpService.get("https://test.test/")
    ).rejects.toThrow("Network Error");
  });
});
