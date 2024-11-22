import { ModuleRouter } from "../../../src/core/domains/module-router.type";
import { Module } from "../../../src/core/domains/module.type";

export class MockModule implements Partial<Module> {
  constructor() {}

  get route() {
    return "/";
  }

  get router() {
    return {} as ModuleRouter;
  }
}
