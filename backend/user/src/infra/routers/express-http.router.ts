import express, { Router } from "express";
import { HttpRouter } from "../../core/domains/http-router.type";
import { MethodHandler } from "../../core/domains/types.type";

export class ExpressRouter implements HttpRouter<any> {
  router: Router;

  constructor() {
    this.router = express.Router();
  }

  get(path: string, handler: MethodHandler): void {
    this.router.get(path, handler as any);
  }

  post(path: string, handler: MethodHandler): void {
    this.router.post(path, handler as any);
  }

  put(path: string, handler: MethodHandler): void {
    this.router.put(path, handler as any);
  }

  delete(path: string, handler: MethodHandler): void {
    this.router.delete(path, handler as any);
  }

  get getRouter(): Router {
    return this.router;
  }
}
