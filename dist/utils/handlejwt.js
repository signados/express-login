"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.tokenSign = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const fs = __importStar(require("fs"));
// import { JWT_SECRET } from './config'
const config_1 = require("./config");
const PRIVATE_KEY = fs.readFileSync('./utils/jwt/private.pem', 'utf8');
const PUBLIC_KEY = fs.readFileSync('./utils/jwt/public.pem', 'utf8');
const tokenSign = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const sign = jwt.sign({
        id: user.id,
        role: user.role
    }, 
    //JWT_SECRET,
    { key: PRIVATE_KEY, passphrase: config_1.PRIVATE_KEY_SECRET }, {
        algorithm: "RS256", // Para clave privada y pública
        expiresIn: "2h",
    });
    return sign;
});
exports.tokenSign = tokenSign;
const verifyToken = (tokenJwt) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return jwt.verify(tokenJwt, PUBLIC_KEY, { algorithms: ["RS256"] }); // Usamos la clave pública para verificar
        // return jwt.verify(tokenJwt, JWT_SECRET)
    }
    catch (error) {
        return null;
    }
});
exports.verifyToken = verifyToken;
