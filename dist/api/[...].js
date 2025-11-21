"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
const main_1 = require("../src/main");
let app;
async function handler(req, res) {
    try {
        if (!app) {
            app = await (0, main_1.createApp)();
        }
        const expressApp = app.getHttpAdapter().getInstance();
        return expressApp(req, res);
    }
    catch (error) {
        console.error('Error in Vercel handler:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
//# sourceMappingURL=%5B...%5D.js.map