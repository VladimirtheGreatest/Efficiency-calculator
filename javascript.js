/**
 * Create a better total efficiency calculatation. Design and create better way to display the information than just plain text.
 * Create a better efficiency to colour conversion for each worker. The higher their efficiency, the closer to green their colour should be. The lower, it should be closer to red.
 * Make as many other graphical improvements as you wish.
 */
var panel = $(".panel");


function create_worker(worker){
  var newworker = $('<li class="col-4 mx-auto"><i class="fas fa-user fa-2x col-12 p-2"></i></li>');
  if(worker.efficiency > 80) {
    newworker.text(worker.name)
    newworker.append('<i class="fas fa-child fa-2x col-12 p-2"></i>')
    newworker.addClass('card amazingEfficiency')
  } else if (worker.efficiency > 50) {
    newworker.addClass('card goodEfficiency')
    newworker.text(worker.name)
    newworker.append('<i class="fas fa-smile fa-2x col-12 p-2"></i>')
  } else if (worker.efficiency > 30) {
    newworker.addClass('card lowEfficiency')
    newworker.text(worker.name)
    newworker.append('<i class="fas fa-meh fa-2x col-12 p-2"></i>')
  } else {
    newworker.addClass('card trashEfficiency')
    newworker.text(worker.name)
    newworker.append('<i class="far fa-frown fa-2x col-12 p-2"></i>')
  }
  //worker.efficiency > 50 ? newworker.addClass('card bg-success') : newworker.addClass('card bg-danger')     //this is a minimalistic solution
  return newworker;
}
function create_office_div(office){
  //this is the way we can get the data from the office, it is an object with the name of the company and array(workers), array contains name of the employee and efficiency stored as an object
  let workers = office.workers;
  let companies = office.company;
  let offices = office;

 const res = _(workers).flatMap(_.entries).groupBy(0).mapValues(v=>_.sumBy(v, 1)).value()  //I am using lodash to calculate efficiency
 let howManyWorkers = workers.length;  //how many workers are there in the office? this helps us to calculate the average
 console.log(howManyWorkers);
 
 let average = res.efficiency / howManyWorkers   // average office efficiency = total efficiency / workers
  
  var newdiv = $('<div class="col-12 main mb-5 mt-5 p-5 animated zoomIn delay-1s"></div>');
  newdiv.append($('<h1 class="card-title p-4 office"></h1>').text(office.company));
  newdiv.append($('<h2 class="card-title"></h2>').text('Employees'));
  var ol = $('<ul class="row"></ul>');
  for(let i = 0; i < office.workers.length; i ++){
    ol.append(create_worker(office.workers[i]));
  }
  newdiv.append(ol);
  newdiv.append($('<div class="row"></div>'))
  newdiv.append($('<h4 class="pt-5"></h4>').text('Average efficiency'));
  newdiv.append($('<h1 class="averageEfficiency"></h1>').text(average));
  newdiv.append($('<h4 class="pt-3 "></h4>').text('Total efficiency'));
  newdiv.append($('<h1 class="averageEfficiency"></h1>').text(res.efficiency)); //we want to display the efficiency
  panel.append(newdiv);
  return newdiv;
}
function create_offices(offices){
  console.log(offices);
  for(let i = 0; i < offices.length; i ++){
    create_office_div(offices[i]);
  }
}

function main(){
  offices = d();
  create_offices(offices);
  increase(); //animation for the average efficiency
}



//animation for the average efficiency
const increase = () => {$('.averageEfficiency').each(function () {
  $(this).prop('Counter',0).animate({
      Counter: $(this).text()
  }, {
      duration: 4000,
      easing: 'swing',
      step: function (now) {
          $(this).text(Math.ceil(now));
      }
  });
});
}



$(document).ready(main);




