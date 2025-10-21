import EventEmitter from 'events';
const _emiitter = new EventEmitter();
_emiitter.setMaxListeners(0); // unlimited listeners

export const emitter = _emiitter;
