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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userProfile_schema_1 = __importDefault(require("../models/userProfile.schema")); // NEW
const router = express_1.default.Router();
// Create a new user profile
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('REQ.BODY:', req.body);
    try {
        const newProfile = new userProfile_schema_1.default(req.body);
        const saved = yield newProfile.save();
        return res.status(201).json(saved);
    }
    catch (err) {
        console.error('SAVE ERROR:', err);
        return res.status(400).json({ error: err.message });
    }
}));
// Update an existing profile
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedProfile = yield userProfile_schema_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProfile) {
            return res.status(404).json({ error: 'Profile not found' });
        }
        return res.json(updatedProfile); // add return here too
    }
    catch (error) {
        return res.status(400).json({ error: error.message }); // <-- this was missing
    }
}));
exports.default = router;
