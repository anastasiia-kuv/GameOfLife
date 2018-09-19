class Controller {
  constructor(view, model){
    this.view = view;
    this.model = model;
    this.$body = $('body');
    this.initEvent();
  }
  
  initEvent(){
    this.$body.bind('changeSizeCanvas', (event) => {
      this.model.pause();
      this.model.setWidth(event.width);
      this.model.setHeight(event.height);
    });
  
    this.$body.bind('updateSizeCanvas', () => {
      this.model.pause();
      this.view.updateSizeCanvas(this.model.getWidth(), this.model.getHeight());
      this.model.initNewGame();
    });
  
    this.$body.bind('initNewGame', () => {
      this.model.pause();
      this.model.initNewGame();
    });
  
    this.$body.bind('сhangeСellStatus', (event) => {
      this.model.updateCellStatus(event.x, event.y);
    });
  
    this.$body.bind('updateField', () => {
      this.view.updateField(this.model.getCells(), this.model.getWidth(), this.model.getHeight());
    });
  
    this.$body.bind('startGame', () => {
      this.model.start();
    });
  
    this.$body.bind('pauseGame', () => {
      this.model.pause();
    });
  
    this.$body.bind('changeSpeed', (event) => {
      this.model.updateSpeedGame(event.speed);
    });
  }
}

export default Controller;
