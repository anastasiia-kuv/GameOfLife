class EventObserver {
  constructor(){
    this.observers = [];
  }

  subscribe(fn) {
    this.observers.push(fn);
  }

  unsubscribe(fn) {
    this.observers.slice(this.observers.indexOf(fn), 1);
  }

  notify(name, ...data){
    if(name.hasOwnProperty) {
      this.observers.forEach(subscriber => subscriber[`${name}`](...data));
    }
  }
}

export default EventObserver;
