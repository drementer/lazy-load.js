import EventEmitter from '../src/core/eventEmitter.js';
const { log } = console;

describe('Event Emitter Test', () => {
  let emitter;

  beforeEach(() => (emitter = new EventEmitter()));

  it('Should add events', () => {
    emitter.on('Test Event', () => true);
    expect(emitter.events['Test Event']).toBeDefined();
  });

  it('Should add multiple callbacks to same event', () => {
    emitter.on('Test Event', () => true);
    emitter.on('Test Event', () => true);
    expect(emitter.events['Test Event'].length).toBe(2);
  });

  it('Should remove specific callback from event', () => {
    const callback1 = () => 'Callback 1';
    const callback2 = () => 'Callback 2';

    emitter.on('Test Event', callback1);
    emitter.on('Test Event', callback2);
    emitter.off('Test Event', callback1);

    expect(emitter.events['Test Event'].length).toBe(1);
    expect(emitter.events['Test Event']).toContain(callback2);
  });

  it('Should run once callback only one time', () => {
    let count = 0;
    emitter.once('Test Event', () => count++);

    emitter.emit('Test Event');
    emitter.emit('Test Event');
    emitter.emit('Test Event');

    expect(count).toBe(1);
  });
});
