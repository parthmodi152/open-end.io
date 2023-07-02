"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentClient = exports.paymentMethods = exports.paymentPath = void 0;
exports.paymentPath = 'payment';
exports.paymentMethods = ['find', 'get', 'create', 'patch', 'remove'];
const paymentClient = (client) => {
    const connection = client.get('connection');
    client.use(exports.paymentPath, connection.service(exports.paymentPath), {
        methods: exports.paymentMethods
    });
};
exports.paymentClient = paymentClient;
//# sourceMappingURL=payment.shared.js.map