"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testEmailConfiguration = exports.sendRegistrationEmail = void 0;
var browser_1 = __importDefault(require("@emailjs/browser"));
// Initialize EmailJS with your public key
var EMAILJS_PUBLIC_KEY = "j5lr-u1sKIncQiSNQ_xXzYw";
var EMAILJS_SERVICE_ID = "service_u40qh8e";
var EMAILJS_STUDENT_TEMPLATE_ID = "template_fis3lfw";
var EMAILJS_ADMIN_TEMPLATE_ID = "template_8jt9xba";
var ADMIN_EMAIL = "geniusinstitute2024@gmail.com";
// Initialize EmailJS
try {
    browser_1.default.init(EMAILJS_PUBLIC_KEY);
}
catch (error) {
    console.error('Failed to initialize EmailJS:', error);
}
// Verify EmailJS configuration
var verifyEmailJSConfig = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            console.log('Verifying EmailJS configuration...');
            console.log('Service ID:', EMAILJS_SERVICE_ID);
            console.log('Student Template ID:', EMAILJS_STUDENT_TEMPLATE_ID);
            console.log('Admin Template ID:', EMAILJS_ADMIN_TEMPLATE_ID);
            return [2 /*return*/, true];
        }
        catch (error) {
            console.error('EmailJS configuration verification failed:', error);
            throw error;
        }
        return [2 /*return*/];
    });
}); };
var sendRegistrationEmail = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var studentTemplateParams, studentEmailPromise, studentResponse, adminTemplateParams, adminEmailPromise, adminResponse, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                // Verify EmailJS configuration before sending
                return [4 /*yield*/, verifyEmailJSConfig()];
            case 1:
                // Verify EmailJS configuration before sending
                _a.sent();
                // Log the start of email sending process
                console.log('Starting email sending process...');
                // Validate required data
                if (!data.to_email || !data.to_name || !data.course_title) {
                    throw new Error('Missing required email data fields');
                }
                studentTemplateParams = {
                    to_name: data.to_name,
                    to_email: data.to_email,
                    course_title: data.course_title,
                    class_type: data.class_type,
                    class_mode: data.class_mode,
                    student_name: data.student_name || data.to_name,
                    student_age: data.student_age || 'Not specified',
                    parent_name: data.parent_name || 'Not specified',
                    contact: data.contact || data.to_email,
                    subject: "Course Registration Confirmation - ".concat(data.course_title),
                    reply_to: data.to_email
                };
                console.log('Sending student confirmation email with params:', studentTemplateParams);
                studentEmailPromise = Promise.race([
                    browser_1.default.send(EMAILJS_SERVICE_ID, EMAILJS_STUDENT_TEMPLATE_ID, studentTemplateParams),
                    new Promise(function (_, reject) {
                        return setTimeout(function () { return reject(new Error('Student email sending timeout')); }, 30000);
                    })
                ]);
                return [4 /*yield*/, studentEmailPromise];
            case 2:
                studentResponse = _a.sent();
                console.log('Student email sent successfully:', studentResponse);
                adminTemplateParams = {
                    to_name: 'GIIT Admin',
                    to_email: ADMIN_EMAIL,
                    course_title: data.course_title,
                    class_type: data.class_type,
                    class_mode: data.class_mode,
                    student_name: data.student_name || data.to_name,
                    student_age: data.student_age || 'Not specified',
                    parent_name: data.parent_name || 'Not specified',
                    contact: data.contact || data.to_email,
                    student_email: data.to_email,
                    subject: "New Course Registration - ".concat(data.course_title),
                    reply_to: data.to_email
                };
                console.log('Sending admin notification email with params:', adminTemplateParams);
                adminEmailPromise = Promise.race([
                    browser_1.default.send(EMAILJS_SERVICE_ID, EMAILJS_ADMIN_TEMPLATE_ID, adminTemplateParams),
                    new Promise(function (_, reject) {
                        return setTimeout(function () { return reject(new Error('Admin email sending timeout')); }, 30000);
                    })
                ]);
                return [4 /*yield*/, adminEmailPromise];
            case 3:
                adminResponse = _a.sent();
                console.log('Admin email sent successfully:', adminResponse);
                return [2 /*return*/, {
                        success: true,
                        studentResponse: studentResponse,
                        adminResponse: adminResponse
                    }];
            case 4:
                error_1 = _a.sent();
                console.error('Failed to send email:', error_1);
                // Enhanced error logging
                if (error_1 instanceof Error) {
                    console.error('Error details:', {
                        name: error_1.name,
                        message: error_1.message,
                        stack: error_1.stack,
                        timestamp: new Date().toISOString()
                    });
                }
                // Throw a more descriptive error
                throw new Error(error_1 instanceof Error
                    ? "Failed to send registration emails: ".concat(error_1.message)
                    : 'Failed to send registration emails. Please try again or contact support.');
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.sendRegistrationEmail = sendRegistrationEmail;
// Export the verification function for testing
var testEmailConfiguration = function () { return __awaiter(void 0, void 0, void 0, function () {
    var error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, verifyEmailJSConfig()];
            case 1:
                _a.sent();
                console.log('EmailJS configuration is valid');
                return [2 /*return*/, true];
            case 2:
                error_2 = _a.sent();
                console.error('EmailJS configuration test failed:', error_2);
                return [2 /*return*/, false];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.testEmailConfiguration = testEmailConfiguration;
