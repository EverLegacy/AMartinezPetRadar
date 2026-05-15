"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer_1 = __importDefault(require("nodemailer"));
const envs_1 = require("../config/envs");
let EmailService = class EmailService {
    transporter = nodemailer_1.default.createTransport({
        service: envs_1.envs.MAILER_SERVICE,
        auth: {
            user: envs_1.envs.MAILER_EMAIL,
            pass: envs_1.envs.MAILER_PASSWORD
        }
    });
    async sendEmail(options) {
        try {
            await this.transporter.sendMail({
                to: options.to,
                subject: options.subject,
                html: options.html
            });
            return true;
        }
        catch (error) {
            console.error(error);
            return false;
        }
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)()
], EmailService);
//# sourceMappingURL=email.service.js.map