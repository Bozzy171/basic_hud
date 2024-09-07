window.addEventListener("load", function () {
  $(".wrapper").css("display", "block");
});

window.addEventListener("message", function (e) {
  const message = e.data;

  if (message.action === "toggle") {
    if (message.enabled === true) {
      $(".wrapper").css("display", "block");
    } else {
      $(".wrapper").css("display", "none");
    }
  } else if (message.action === "updateStatusHud") {
    message.armour === 0
      ? $("#armour").css("display", "none")
      : $("#armour").css("display", "initial");
    message.sprinting === false && message.stamina === 100
      ? $("#stamina").css("display", "none")
      : $("#stamina").css("display", "initial");
    message.underwater === false
      ? $("#oxygen").css("display", "none")
      : $("#oxygen").css("display", "initial");

    progressCircle(message.health, ".health");
    progressCircle(message.armour, ".armour");
    progressCircle(message.hunger, ".hunger");
    progressCircle(message.thirst, ".thirst");
    progressCircle(message.stamina, ".stamina");
    progressCircle(message.oxygen, ".oxygen");

    if (parseInt(message.vehicleSpeed) > message.speedlimit) {
      $('#textSpeedLimit').addClass('blink');
    } else {
      $('#textSpeedLimit').removeClass('blink');
    }

    if (message.inVehicle) {
      $(".car-wrapper").css("display", "block");

      $("#gear").text(message.vehicleGear);
      $("#speed").text(Math.floor(message.vehicleSpeed));
      $("#textSpeedLimit").text(message.speedlimit);
      $("#displaytext").text(message.displaytext);
      $("#vehicleFuel").text(Math.floor(message.vehicleFuel)+'%');

      if (message.vehicleFuel < 11) {
        vehicleFuel.style.color = 'red';
      } else {
        vehicleFuel.style.color = 'green';
         }
      

      document.querySelector("#progress-speed svg circle.speed").style.strokeDashoffset = message.vehiclePercentageSpeed;

      if (message.vehicleSpeed > message.speedlimit) {
        document.querySelector(
          "#progress-speed svg circle.speed"
        ).style.stroke = "#ff0000";
      } else if (message.vehicleSpeed > message.speedlimit * 0.9) {
        document.querySelector(
          "#progress-speed svg circle.speed"
        ).style.stroke = "#ff3f00";
      } else if (message.vehicleSpeed > message.speedlimit * 0.8) {
        document.querySelector(
          "#progress-speed svg circle.speed"
        ).style.stroke = "#ff7f00";
      } else if (message.vehicleSpeed > message.speedlimit * 0.7) {
        document.querySelector(
          "#progress-speed svg circle.speed"
        ).style.stroke = "#ffbf00";
      } else if (message.vehicleSpeed > message.speedlimit * 0.6) {
        document.querySelector(
          "#progress-speed svg circle.speed"
        ).style.stroke = "#ffff00";
      } else if (message.vehicleSpeed > message.speedlimit * 0.5) {
        document.querySelector(
          "#progress-speed svg circle.speed"
        ).style.stroke = "#bfff00";
      } else if (message.vehicleSpeed > message.speedlimit * 0.4) {
        document.querySelector(
          "#progress-speed svg circle.speed"
        ).style.stroke = "#7fff00";
      } else if (message.vehicleSpeed > message.speedlimit * 0.3) {
        document.querySelector(
          "#progress-speed svg circle.speed"
        ).style.stroke = "#3fff00";
      } else if (message.vehicleSpeed > message.speedlimit * 0.2) {
        document.querySelector(
          "#progress-speed svg circle.speed"
        ).style.stroke = "#00ff00";
      } else if (message.vehicleSpeed > message.speedlimit * 0.1) {
        document.querySelector(
          "#progress-speed svg circle.speed"
        ).style.stroke = "#00ff3f";
      }
    } else {
      $(".car-wrapper").css("display", "none");
    }
  }
});

let progressCircle = (percent, element) => {
  const circle = document.querySelector(element);
  const radius = circle.r.baseVal.value;
  const circumference = radius * 2 * Math.PI;
  const html = $(element).parent().parent().find("span");

  circle.style.strokeDasharray = `${circumference} ${circumference}`;
  circle.style.strokeDashoffset = `${circumference}`;

  const offset = circumference - ((-percent * 100) / 100 / 100) * circumference;
  circle.style.strokeDashoffset = -offset;

  html.text(Math.round(percent));
};
