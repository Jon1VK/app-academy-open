function Clock() {
  const date = new Date();
  this.hours = date.getHours();
  this.minutes = date.getMinutes();
  this.seconds = date.getSeconds();
  window.setInterval(() => this._tick(), 1000);
}

Clock.prototype._tick = function () {
  this.seconds++;
  this.seconds %= 60;

  if (this.seconds == 0) {
    this.minutes++;
    this.minutes %= 60;

    if (this.minutes == 0) {
      this.hours++;
      this.hours %= 24;
    }
  }

  this.printTime();
};

Clock.prototype.printTime = function () {
  const hoursStr = this.hours.toString().padStart(2, '0');
  const minutesStr = this.minutes.toString().padStart(2, '0');
  const secondsStr = this.seconds.toString().padStart(2, '0');
  console.log(`${hoursStr}:${minutesStr}:${secondsStr}`);
};

const clock = new Clock();
