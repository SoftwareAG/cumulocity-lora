"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CumulocityCommandLine_1 = require("./cli/CumulocityCommandLine");
const cmd = new CumulocityCommandLine_1.CumulocityCommandLine(process.argv);
process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});
//# sourceMappingURL=cli.js.map