"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testingRouter = void 0;
const express_1 = require("express");
const testingController_1 = require("./testingController");
exports.testingRouter = (0, express_1.Router)();
exports.testingRouter.delete('/all-data', testingController_1.testingController.deleteAllVideo);
