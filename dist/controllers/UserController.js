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
const UserModel_1 = __importDefault(require("../models/UserModel"));
const UserController = {
    getUsers(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield UserModel_1.default.findAll();
            return res.json(users);
        });
    },
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.id;
            //💥OTRO ANY POR AQUÍII
            console.log(userId);
            const user = yield UserModel_1.default.findByPk(userId);
            return res.json(user);
        });
    },
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.id;
            const bodyData = req.body;
            const result = yield UserModel_1.default.update(bodyData, { where: { id: userId } });
            return res.json(result);
        });
    },
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.id;
            const result = yield UserModel_1.default.destroy({ where: { id: userId } });
            return res.json(result);
        });
    },
};
exports.default = UserController;
