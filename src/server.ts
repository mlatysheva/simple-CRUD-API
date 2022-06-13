#! /usr/bin/env node
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import http from 'http';

// process.once('SIGUSR2', function () {
//   process.kill(process.pid, 'SIGUSR2');
// });

// process.on('SIGINT', function () {
  // this is only called on ctrl+c, not restart
//   process.kill(process.pid, 'SIGINT');
// });

const server = http.createServer((req, res) => {console.log(req + 'request received', res + 'response sent')});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default { server };
//# sourceMappingURL=server.js.map