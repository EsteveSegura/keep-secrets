class GarbageCollector {
  constructor({global}) {
    this.global = global;
  }

  run() {
    this.global.gc();
  }
}

module.exports = GarbageCollector;
