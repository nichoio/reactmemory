import React from 'react';
import ReactDOM from 'react-dom';
import './bootstrap.css';
import './memory.css';


const images = {
    _blank: {
        a: require('./img/blank.jpg'),
        b: require('./img/blank.jpg')
    },
    Image1: {
        a: require('./img/path/here_1.jpg'),
        b: require('./img/path/here_2.jpg')
    },
    //Game is currently hard coded for 16 image pairs..
};

class Game extends React.Component {
  constructor(props) {
    super(props);    
    this.state = {
      team_a_score: 0,
      team_b_score: 0,
      field: init_field(),
      parent: "_blank",  //default img
      child: "a",
      parent2: "_blank",
      child2: "b",
      turn: "0",
      move: "0",
      current_card: null,
      finished: false,
    };
  }

  handleClick(i){
    var last_card = this.state.current_card;

    if (
      (last_card == i && this.state.move == 1) ||
      this.state.finished ||
      this.state.field[i]["status"] == "removed") {
      return;
    }

    this.changeField(i, "selected");

    this.setState({
      current_card: i,
    });

    if (this.state.move == 0) {
      this.setState({
        parent: this.state.field[i]["parent"],
        child: this.state.field[i]["child"],
        move: 1,
      });
    }
    else {
      this.setState({
        parent2: this.state.field[i]["parent"],
        child2: this.state.field[i]["child"],
        move: 0    
      }, () => {
        this.checkTurn(last_card, i);
      });
    }
  }

  checkTurn(i, last_card){
    var removed = null;

    if (
      this.state.parent == this.state.parent2 &&
      this.state.parent != "_blank"){

      if (this.state.turn == 0 ){
        this.setState({
          team_a_score: this.state.team_a_score + 1,  
        });
      }
      else {
        this.setState({
          team_b_score: this.state.team_b_score + 1,  
        });
      }

      this.changeField(i, "removed");
      this.changeField(last_card, "removed");
      removed = true;
    }
    else {
      this.setState({
        turn: this.state.turn == 0 ? 1 : 0,  
      });

      removed = false;
    }

  setTimeout(function(){
      checkWinner(this.state.field, this.state.team_a_score, this.state.team_b_score);

      this.setState({
        parent: "_blank",
        parent2: "_blank",
        child: "a",  
        child2: "b",  
      });

      if (removed == false) {
        this.changeField(i, "default");
        this.changeField(last_card, "default");
      }
    }.bind(this, i, last_card, removed), 2500);
  }

  changeField(i, status){
      const field = this.state.field.slice();
      field[i]["status"] = status;
      this.setState({field: field});
  }

  render() {
    var current_team = this.state.turn == "0" ? "A" : "B";

    return (
      <div className="game container">
      <div className="divider-horizontal"></div>
        <div className="score-board">
          <ScoreBoard
            score1={this.state.team_a_score}
            score2={this.state.team_b_score}
            current={current_team}
          />
        </div>
        <div className="divider-horizontal"></div>
          <div className="game-board">
            <div className="container">
              <div className="row justify-content-center">
                <Square squarestate={this.state.field[0]["status"]} value="0" onClick={() => this.handleClick("0")}/>
                <Square squarestate={this.state.field[1]["status"]} value="0" onClick={() => this.handleClick("1")}/>
                <Square squarestate={this.state.field[2]["status"]} value="0" onClick={() => this.handleClick("2")}/>
                <Square squarestate={this.state.field[3]["status"]} value="0" onClick={() => this.handleClick("3")}/>
                <Square squarestate={this.state.field[4]["status"]} value="0" onClick={() => this.handleClick("4")}/>
                <Square squarestate={this.state.field[5]["status"]} value="0" onClick={() => this.handleClick("5")}/>
                <Square squarestate={this.state.field[6]["status"]} value="0" onClick={() => this.handleClick("6")}/>
                <Square squarestate={this.state.field[7]["status"]} value="0" onClick={() => this.handleClick("7")}/>
              </div>
              <div className="row justify-content-center">
                <Square squarestate={this.state.field[8]["status"]} value="0" onClick={() => this.handleClick("8")}/>
                <Square squarestate={this.state.field[9]["status"]} value="0" onClick={() => this.handleClick("9")}/>
                <Square squarestate={this.state.field[10]["status"]} value="0" onClick={() => this.handleClick("10")}/>
                <Square squarestate={this.state.field[11]["status"]} value="0" onClick={() => this.handleClick("11")}/>
                <Square squarestate={this.state.field[12]["status"]} value="0" onClick={() => this.handleClick("12")}/>
                <Square squarestate={this.state.field[13]["status"]} value="0" onClick={() => this.handleClick("13")}/>
                <Square squarestate={this.state.field[14]["status"]} value="0" onClick={() => this.handleClick("14")}/>
                <Square squarestate={this.state.field[15]["status"]} value="0" onClick={() => this.handleClick("15")}/>
              </div>
              <div className="row justify-content-center">
                <Square squarestate={this.state.field[16]["status"]} value="0" onClick={() => this.handleClick("16")}/>
                <Square squarestate={this.state.field[17]["status"]} value="0" onClick={() => this.handleClick("17")}/>
                <Square squarestate={this.state.field[18]["status"]} value="0" onClick={() => this.handleClick("18")}/>
                <Square squarestate={this.state.field[19]["status"]} value="0" onClick={() => this.handleClick("19")}/>
                <Square squarestate={this.state.field[20]["status"]} value="0" onClick={() => this.handleClick("20")}/>
                <Square squarestate={this.state.field[21]["status"]} value="0" onClick={() => this.handleClick("21")}/>
                <Square squarestate={this.state.field[22]["status"]} value="0" onClick={() => this.handleClick("22")}/>
                <Square squarestate={this.state.field[23]["status"]} value="0" onClick={() => this.handleClick("23")}/>
              </div>
              <div className="row justify-content-center">
                <Square squarestate={this.state.field[24]["status"]} value="0" onClick={() => this.handleClick("24")}/>
                <Square squarestate={this.state.field[25]["status"]} value="0" onClick={() => this.handleClick("25")}/>
                <Square squarestate={this.state.field[26]["status"]} value="0" onClick={() => this.handleClick("26")}/>
                <Square squarestate={this.state.field[27]["status"]} value="0" onClick={() => this.handleClick("27")}/>
                <Square squarestate={this.state.field[28]["status"]} value="0" onClick={() => this.handleClick("28")}/>
                <Square squarestate={this.state.field[29]["status"]} value="0" onClick={() => this.handleClick("29")}/>
                <Square squarestate={this.state.field[30]["status"]} value="0" onClick={() => this.handleClick("30")}/>
                <Square squarestate={this.state.field[31]["status"]} value="0" onClick={() => this.handleClick("31")}/>
              </div>
            </div>
          </div>
        <div className="divider-horizontal"></div>
        <div className="current-turn">
          <CurrentTurn
            parent={this.state.parent}
            child={this.state.child}
            parent2={this.state.parent2}
            child2={this.state.child2}
          />
        </div>
      </div>
    );
  }
}

function ScoreBoard(props){
    return (
      <h1 className="text-center">
        Team A: {props.score1} Paare {'\u00A0'}-{'\u00A0'} Team B: {props.score2} Paare {'\u00A0'}{'\u00A0'}{'\u00A0'}Am Zug: {props.current}
      </h1>
    );
}

class CurrentTurn extends React.Component {
  render() {
    var name_left = this.props.parent != "_blank" ? this.props.parent : null;
    var name_right = this.props.parent2 != "_blank" ? this.props.parent2 : null;
    return (
      <div className="row">
        <h2 className="col-md m-2 text-right">
          {name_left}
        </h2>
        <div className="col img-col">
          <Img parent={this.props.parent} child={this.props.child}/>
        </div>
        <div className="col img-col">
          <Img parent={this.props.parent2} child={this.props.child2}/>
        </div>
        <h2 className="col-md m-2 text-left">
          {name_right}
        </h2>
      </div>
    );
  }
}

function Square(props){
    return (
      <div
        className={'col-md-1 m-2 ' + props.squarestate}
        id={props.value}
        onClick={props.onClick}
      >
        <div
          className="square"
        >
          &nbsp;
        </div>
      </div>
    );
}

function Img(props){
    return (
      <img src={images[props.parent][props.child]} height="300" width="300" alt="no img"/>  
    );
}

function init_field() {
  var field = [
       {"parent": "Image1", "child": "a", "status": "default"}, 
       {"parent": "Image1", "child": "b", "status": "default"},
       //... Game is currently hard coded for 16 image pairs
  ]

  console.log(field.length);
  shuffle(field);
  console.log(field.length);

  for (var i = field.length-1; i>0; i--) {
    console.log(field[i]);
  }

  return field;
}

function shuffle(array) {
  var j, x, i;
  for (var i = array.length-1; i>0; i--) {
    j = Math.floor(Math.random() * (i+1));
    x = array[i];
    array[i] = array[j];
    array[j] = x;
  }
  return array;
}


function checkWinner(field, score_a, score_b) {
  for (var i = 0; i < field.length; i++) { 
    if (field[i]["status"] != "removed"){
      return;
    }
  }

  var text = null;

  if (score_a > score_b) {
    text = "TEAM A wins";
  }
  else if (score_b > score_a) {
    text = "TEAM B wins";
  }
  else {
    text = "Tie. Everybody wins ;)";
  }

  // override with new body to display the winner
  document.body.innerHTML = "<h1 class=\"text-center\" style=\"margin-top:300px\">" + text + "</h1>";
}

ReactDOM.render(<Game />, document.getElementById('root'));