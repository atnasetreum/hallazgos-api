import { Injectable } from '@nestjs/common';

import * as process from 'node:process';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const cluster = require('cluster');

const numCPUs = parseInt(process.argv[2] || '1');

@Injectable()
export class ClusterService {
  static clusterize(callback: () => void): void {
    if (cluster.isMaster) {
      console.log(`MASTER SERVER (${process.pid}) IS RUNNING `);

      for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
      }

      cluster.on('exit', (worker) => {
        console.log(`worker ${worker.process.pid} died`);
      });
    } else {
      callback();
    }
  }
}
