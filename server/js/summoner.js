import $ from "jquery";

let flag = true;
let hoverflag = true;


class Hover {
  constructor(options, reverse) {
    this.options = options;
    this.reverse = reverse;
    this.flag = true;

    this.run = this.run.bind(this);
  }

  run(event){
    if(this.flag){
      this.flag = false;
      $(event.currentTarget).animate(
        this.options,
        270,
        "linear",
        () => {
          $(event.currentTarget).animate(
            this.reverse,
            270,
            "linear",
            () => {
              this.flag = true;
            }
          );
        }
      );
    }
  }
};

class MinMax {
  constructor(object, options, styleout, reverse, stylein, hover) {
    this.options = options;
    this.reverse = reverse;
    this.styleout = styleout;
    this.stylein = stylein;
    this.flag = true;
    this.hover = hover;
    this.object = object;

    this.minimize = this.minimize.bind(this);
    this.maximize = this.maximize.bind(this);
  }

  maximize(event){
    if(this.flag){
      this.flag = false;
      this.styleout(event);
      $(event.currentTarget).animate(
        this.options,
        500,
        "linear",
        () => {
          this.object.off("mouseover", this.hover.run);
          this.object.off("click", this.maximize);
          this.object.on("click", this.minimize);
          this.flag = true;
        }
      );
    }
  }

  minimize(event){
    if(this.flag){
      this.flag = false;
      this.stylein(event);
      $(event.currentTarget).animate(
        this.reverse,
        500,
        "linear",
        () => {
          this.object.on("mouseover", this.hover.run);
          this.object.off("click", this.minimize);
          this.object.on("click", this.maximize);
          this.flag = true;
        }
      );
    }
  }
};

let hoverTop = new Hover({position: "relative", top: "-=30px"}, {top: "+=30px"});
let hoverLeft = new Hover({position: "relative", left: "-=30px"}, {left: "+=30px"});
let hoverRight = new Hover({position: "relative", right: "-=30px"}, {right: "+=30px"});
let minmaxLeft = new MinMax(
  $("div.leftBox"),
  {
    width: "55.2vw",
    left: "+=22.4vw"
  },
  (event) => {
    $(event.currentTarget).css("border-left", "2px solid #181865");
    $(event.currentTarget).css("border-radius", "20px 20px 20px 20px");
    $("div.leftBox div.innerWrapper").css("width", "32%");
    $("div.leftBox div.innerWrapper").css("margin-left", "0%");
    $("div.leftBox div.innerWrapper:nth-of-type(3n+1)").css("margin-left", "2.75%");
    $("div.leftBox").css("zIndex", "2");
    $("div.rightBox").css("zIndex", "1");
  },
  {
    width: "21.5258%",
    left: "-=22.4vw"
  },
  (event) => {
    $(event.currentTarget).css("border-left", "none");
    $(event.currentTarget).css("border-radius", "0px 20px 20px 0px");
    $("div.leftBox div.innerWrapper").css("width", "90%");
    $("div.leftBox div.innerWrapper").css("margin-left", "12.79%");
  },
  hoverLeft
);

let minmaxRight = new MinMax(
  $("div.rightBox"),
  {
    width: "55.2vw",
    right: "+=22.4vw"
  },
  (event) => {
    $(event.currentTarget).css("border-right", "2px solid #FF6400");
    $(event.currentTarget).css("border-radius", "20px 20px 20px 20px");
    $("div.rightBox div.innerWrapper").css("width", "32%");
    $("div.rightBox div.innerWrapper").css("margin-left", "0%");
    $("div.rightBox div.innerWrapper:nth-of-type(3n+1)").css("margin-left", "2.75%");
    $("div.rightBox").css("zIndex", "2");
    $("div.leftBox").css("zIndex", "1");
  },
  {
    width: "21.5258%",
    right: "-=22.4vw"
  },
  (event) => {
    $(event.currentTarget).css("border-right", "none");
    $(event.currentTarget).css("border-radius", "20px 0px 0px 20px");
    $("div.rightBox div.innerWrapper").css("width", "90%");
    $("div.rightBox div.innerWrapper").css("margin-left", "12.79%");
  },
  hoverRight
);

let minmaxLeftMobi = new MinMax(
  $("div.leftBox"),
  {
    width: "83.1%",
    left: "+=8.4vw"
  },
  (event) => {
    $(event.currentTarget).css("border-left", "2px solid #181865");
    $(event.currentTarget).css("border-radius", "20px 20px 20px 20px");
    $("div.leftBox div.innerWrapper").css("width", "47%");
    $("div.leftBox div.innerWrapper").css("margin-left", "1%");
    $("div.leftBox div.innerWrapper:nth-of-type(2n+1)").css("margin-left", "2.75%");
    $("div.leftBox").css("zIndex", "2");
    $("div.rightBox").css("zIndex", "1");
  },
  {
    width: "8.73109%",
    left: "-=8.4vw"
  },
  (event) => {
    $(event.currentTarget).css("border-left", "none");
    $(event.currentTarget).css("border-radius", "0px 20px 20px 0px");
    $("div.leftBox div.innerWrapper").css("width", "90%");
    $("div.leftBox div.innerWrapper").css("margin-left", "12.79%");
  },
  hoverLeft
);

let minmaxRightMobi = new MinMax(
  $("div.rightBox"),
  {
    width: "83.1%",
    right: "+=8.4vw"
  },
  (event) => {
    $(event.currentTarget).css("border-right", "2px solid #FF6400");
    $(event.currentTarget).css("border-radius", "20px 20px 20px 20px");
    $("div.rightBox div.innerWrapper").css("width", "47%");
    $("div.rightBox div.innerWrapper").css("margin-left", "1%");
    $("div.rightBox div.innerWrapper:nth-of-type(2n+1)").css("margin-left", "2.75%");
    $("div.rightBox").css("zIndex", "2");
    $("div.leftBox").css("zIndex", "1");
  },
  {
    width: "8.73109%",
    right: "-=8.4vw"
  },
  (event) => {
    $(event.currentTarget).css("border-right", "none");
    $(event.currentTarget).css("border-radius", "20px 0px 0px 20px");
    $("div.rightBox div.innerWrapper").css("width", "90%");
    $("div.rightBox div.innerWrapper").css("margin-left", "12.79%");
  },
  hoverRight
);

let minmaxLeftTab = new MinMax(
  $("div.leftBox"),
  {
    width: "56.3vw",
    left: "+=21.8vw"
  },
  (event) => {
    $(event.currentTarget).css("border-left", "2px solid #181865");
    $(event.currentTarget).css("border-radius", "20px 20px 20px 20px");
    $("div.leftBox div.innerWrapper").css("width", "47%");
    $("div.leftBox div.innerWrapper").css("margin-left", "0%");
    $("div.leftBox div.innerWrapper:nth-of-type(2n+1)").css("margin-left", "5.25%");
    $("div.leftBox").css("zIndex", "2");
    $("div.rightBox").css("zIndex", "1");
  },
  {
    width: "21.5258%",
    left: "-=21.8vw"
  },
  (event) => {
    $(event.currentTarget).css("border-left", "none");
    $(event.currentTarget).css("border-radius", "0px 20px 20px 0px");
    $("div.leftBox div.innerWrapper").css("width", "90%");
    $("div.leftBox div.innerWrapper").css("margin-left", "12.79%");
  },
  hoverLeft
);

let minmaxRightTab = new MinMax(
  $("div.rightBox"),
  {
    width: "56.3vw",
    right: "+=21.8vw"
  },
  (event) => {
    $(event.currentTarget).css("border-right", "2px solid #FF6400");
    $(event.currentTarget).css("border-radius", "20px 20px 20px 20px");
    $("div.rightBox div.innerWrapper").css("width", "47%");
    $("div.rightBox div.innerWrapper").css("margin-left", "0%");
    $("div.rightBox div.innerWrapper:nth-of-type(2n+1)").css("margin-left", "5.25%");
    $("div.rightBox").css("zIndex", "2");
    $("div.leftBox").css("zIndex", "1");
  },
  {
    width: "21.5258%",
    right: "-=21.8vw"
  },
  (event) => {
    $(event.currentTarget).css("border-right", "none");
    $(event.currentTarget).css("border-radius", "20px 0px 0px 20px");
    $("div.rightBox div.innerWrapper").css("width", "90%");
    $("div.rightBox div.innerWrapper").css("margin-left", "12.79%");
  },
  hoverRight
);

function suggested(event){
  this.parentNode.submit();
};

function handlers(){
  if($("div.headingBox h1").css("font-size") === "35px"){
    $("div.leftBox").off("click", minmaxLeftTab.maximize);
    $("div.rightBox").off("click", minmaxRightTab.maximize);
    $("div.leftBox").off("click", minmaxLeft.maximize);
    $("div.rightBox").off("click", minmaxRight.maximize);
    $("div.leftBox").on("click", minmaxLeftMobi.maximize);
    $("div.rightBox").on("click", minmaxRightMobi.maximize);
  }
  else if ($("img.Logo").css("margin-top") === "70px") {
    $("div.leftBox").off("click", minmaxLeftMobi.maximize);
    $("div.rightBox").off("click", minmaxRightMobi.maximize);
    $("div.leftBox").off("click", minmaxLeft.maximize);
    $("div.rightBox").off("click", minmaxRight.maximize);
    $("div.leftBox").on("click", minmaxLeftTab.maximize);
    $("div.rightBox").on("click", minmaxRightTab.maximize);
  }
  else {
    $("div.leftBox").off("click", minmaxLeftTab.maximize);
    $("div.rightBox").off("click", minmaxRightTab.maximize);
    $("div.leftBox").off("click", minmaxLeftMobi.maximize);
    $("div.rightBox").off("click", minmaxRightMobi.maximize);
    $("div.leftBox").on("click", minmaxLeft.maximize);
    $("div.rightBox").on("click", minmaxRight.maximize);
  }
  $("div.suggestedBox").on("click", suggested);
}

$("div.leftBox").on("mouseover", hoverLeft.run);
$("div.rightBox").on("mouseover", hoverRight.run);
handlers();
$(window).resize(handlers);
