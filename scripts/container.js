var TemperatureApp =  React.createClass ({
  getInitialState: function () {
    return {
      doShowModal : false,
      data: " ",
      doDisplay: false,
    }
  },


  componentDidMount: function() {
    this.requestTemp();
    document.body.addEventListener('click', this.hideModal);
  },

  requestTemp: function() {
    var that = this;

    var url = "http://api.openweathermap.org";
    var queryStr = "/data/2.5/weather?q=Moscow,ru&units=metric&appid=9ee78c781589a2018c97c102abdcdd4c"

    function reqListener () {
      var temperature = JSON.parse(this.responseText).main.temp;
      that.setData(temperature);
    }

    function reqFailed(e){
      console.error(e);
    }

    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", reqListener);
    oReq.addEventListener("error", reqFailed);
    oReq.open("GET", url+queryStr);
    oReq.send();
  },

  setData: function(data){
    this.setState({
      data: data,
    })
  },

  showModal: function() {
    this.requestTemp();
    this.setState({
      doShowModal : true,
    })
  },

  hideModal: function() {
    this.setState({
      doShowModal : false,
    })
  },

  hideReadings: function(){
    this.setState({
      doDisplay: false,
    })
  },

  showReadings: function(){
    this.requestTemp();
    this.setState({
      doDisplay: true,
    })
  },

  render: function() {
    return (
      <div className="main">
       <DisplayWindow temperature = {this.state.doDisplay ? this.state.data: "--"} />
       <Button title="Показать"
               onClick={this.showReadings}
               />
       <Button title="Очистить"
               onClick={this.hideReadings}
               />
       <Button title="Показать в всплывающем окне"
               onClick={this.showModal}
               />
       <ModalWindow onClick = {this.hideModal}
                    isShown = {this.state.doShowModal}
                    temperature = {this.state.data}
                   />
      </div>
    )

  }
})

var DisplayWindow = React.createClass ({
  render: function(){
    return( <div>
      Температура в Москве {this.props.temperature} градусов
      </div>
    )
  }
})

var ModalWindow = React.createClass({
  render: function() {
    var classStr = this.props.isShown ? "modal" : "modal hide";
    return (
      <div onClick={this.props.onClick} className = {classStr}>
        <h1> Температура в Москве {this.props.temperature} градусов </h1>
      </div>
    )

  }
})

var Button = React.createClass ({
  render: function() {
    return (
      <button onClick={this.props.onClick} > {this.props.title} </button>
    )
  }
})



ReactDOM.render(
  <TemperatureApp url="/api/comments" />,
  document.getElementById('content')
);
