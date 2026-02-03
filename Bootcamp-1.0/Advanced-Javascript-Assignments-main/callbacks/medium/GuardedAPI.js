// Problem Description – Async Initialization Gate

// You are required to design a mechanism for APIs that depend on an asynchronous initialization step. 
// Any calls made before initialization completes should wait and execute only after the initialization finishes. 
// Calls made after initialization should run immediately without waiting.
class GuardedAPI {
  constructor(initPromise) {
    this.initPromise = initPromise.catch(() =>{
      throw new Error("Initialization failed")
    });
  }

  async call(fn, ...args){
    await this.initPromise;
    return fn(...args);
  }
}

module.exports = GuardedAPI;
