import type { Request, Response, NextFunction } from "express";
import { errorHandler, notFoundHandler } from "../middleware/error.middleware";

const mkRes = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res as unknown as Response;
};

describe("error middleware", () => {
  it("errorHandler responde 500 con shape esperado", () => {
    const err = new Error("boom");
    const res = mkRes();

    errorHandler(err, {} as Request, res, {} as NextFunction);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      error: "Internal server error",
    });
  });

  it("notFoundHandler responde 404 con shape esperado", () => {
    const res = mkRes();
    notFoundHandler({} as Request, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      error: "Route not found",
    });
  });
});