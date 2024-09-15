"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const reviewRoutes_1 = __importDefault(require("./routes/reviewRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const db_1 = __importDefault(require("./config/db"));
const adminRoute_1 = __importDefault(require("./routes/adminRoute"));
const dotenv_1 = __importDefault(require("dotenv"));
const enentRoute_1 = __importDefault(require("./routes/enentRoute"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const donationRoutes_1 = __importDefault(require("./routes/donationRoutes"));
const morgan_1 = __importDefault(require("morgan"));
const paymentRoutes_1 = __importDefault(require("./routes/paymentRoutes"));
const app = (0, express_1.default)();
dotenv_1.default.config();
// database connection
(0, db_1.default)();
// Middleware
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000', // Replace with your frontend URL
    credentials: true // Enable credentials (cookies, authorization headers)
}));
app.use((0, morgan_1.default)("dev"));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Routes
// app.use('/api/auth', authRoutes);
app.use('/api', reviewRoutes_1.default);
app.use('/donation', donationRoutes_1.default);
app.use('/api/payments', paymentRoutes_1.default);
app.use('/auth', authRoutes_1.default);
app.use('/event', enentRoute_1.default);
app.use('/admin', adminRoute_1.default);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
// video no. 10
