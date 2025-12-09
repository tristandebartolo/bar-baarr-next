"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Club;
const AuthForm_1 = __importDefault(require("@/components/Auth/AuthForm"));
function Club() {
    return (<main className="flex min-h-(--main-height) w-full flex-col items-center justify-center">
      <AuthForm_1.default />
    </main>);
}
