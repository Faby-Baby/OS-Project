document.addEventListener("DOMContentLoaded", function () {
  recalculateServiceTime();
  document.querySelectorAll('.priority-only').forEach(function (element) {
      element.disabled = true;
  });

document.querySelectorAll('input[type=radio][name=algorithm]').forEach(function (radio) {
   radio.addEventListener('change', function () {
       var algorithmValue = this.value;

        document.querySelectorAll('.priority-only').forEach(function (element) {
           element.disabled= false;
       });

        document.querySelectorAll('.servtime').forEach(function (element) {
           element.style.display = 'block';
       });

        if (algorithmValue === 'robin') {
           document.querySelectorAll('.servtime').forEach(function (element) {
               element.style.display = 'none';
           });
           document.getElementById('quantumParagraph').style.display = 'block';
       } else {
           document.getElementById('quantumParagraph').style.display = 'none';
           document.querySelectorAll('.servtime').forEach(function (element) {
               element.style.display = 'block';
           });
       }

        recalculateServiceTime();
   });
});

document.getElementById('inputTable').querySelectorAll('input').forEach(function (input) {
   input.addEventListener('change', function () {
       recalculateServiceTime();
   });
});
});

function addRow() {
var inputTable = document.getElementById('inputTable');
var lastRow = inputTable.rows[inputTable.rows.length - 1];
var lastRowNumber = inputTable.rows.length-2;

var newRow = document.createElement('tr');
newRow.innerHTML = '<td>P' + (lastRowNumber + 1) + '</td>' +
   '<td>' + (lastRowNumber + 1) + '</td>' +
   '<td><input class="exectime" type="text"/></td>' +
   '<td class="servtime"></td>' + '<td><input class="priority-only" type="text"/></td>';

inputTable.appendChild(newRow);

if (inputTable.rows.length -1+2> 1) {
  minus.style.display = 'inline-block';
}

if (document.querySelector('input[name=algorithm]:checked').value !== 'priority') {
   document.querySelectorAll('.priority-only').forEach(function (element) {
       element.disabled = true;
   });
}

recalculateServiceTime();
}

function deleteRow() {
var inputTable = document.getElementById('inputTable');
inputTable.deleteRow(inputTable.rows.length - 1);

if (inputTable.rows.length - 1 < 1) {
   minus.style.display = 'none';
}
}

document.querySelectorAll('.initial').forEach(function (element) {
element.addEventListener('change', function () {
   recalculateServiceTime();
});
});

function recalculateServiceTime() {
var inputTable = document.getElementById('inputTable').rows;
var totalExecuteTime = 0;

var algorithm = document.querySelector('input[name=algorithm]:checked').value;
if (algorithm === 'fcfs') {
   for (var i = 1; i < inputTable.length; i++) {
       var executeTime = parseInt(inputTable[i].cells[2].querySelector('.exectime').value);
       inputTable[i].cells[3].innerText = totalExecuteTime;

        totalExecuteTime += executeTime;
   }
} else if (algorithm === 'sjf') {
   var executeTimes = [];
   for (var i = 1; i < inputTable.length; i++) {
       executeTimes.push(parseInt(inputTable[i].cells[2].querySelector('.exectime').value));
   }

    var currentIndex = -1;
   for (var i = 0; i < executeTimes.length; i++) {
       currentIndex = findNextIndex(currentIndex, executeTimes);

        if (currentIndex === -1) return;

        inputTable[currentIndex + 1].cells[3].innerText = totalExecuteTime;

        totalExecuteTime += executeTimes[currentIndex];
   }
} else if (algorithm === 'priority') {
   var executeTimes = [];
   var priorities = [];

    for (var i = 1; i < inputTable.length; i++) {
       executeTimes.push(parseInt(inputTable[i].cells[2].querySelector('.exectime').value));
       priorities.push(parseInt(inputTable[i].cells[4].querySelector('input').value));
   }

    var currentIndex = -1;
   for (var i = 0; i < executeTimes.length; i++) {
       currentIndex = findNextIndexWithPriority(currentIndex, priorities);

        if (currentIndex === -1) return;

        inputTable[currentIndex + 1].cells[3].innerText = totalExecuteTime;

        totalExecuteTime += executeTimes[currentIndex];
   }
} else if (algorithm === 'robin') {
   for (var i = 1; i < inputTable.length; i++) {
       inputTable[i].cells[3].innerText = '';
   }
}
}

function findNextIndexWithPriority(currentIndex, priorities) {
var currentPriority = currentIndex !== -1 ? priorities[currentIndex] : 1000000;
var resultPriority = 0;
var resultIndex = -1;
var samePriority = false;
var areWeThereYet = false;

for (var i = 0; i < priorities.length; i++) {
   var changeInThisIteration = false;

    if (i === currentIndex) {
       areWeThereYet = true;
       continue;
   }
   if (priorities[i] <= currentPriority && priorities[i] >= resultPriority) {
       if (priorities[i] === resultPriority) {
           if (currentPriority === priorities[i] && !samePriority) {
               samePriority = true;
               changeInThisIteration = true;
               resultPriority = priorities[i];
               resultIndex = i;
           }
       } else if (priorities[i] === currentPriority) {
           if (areWeThereYet) {
               samePriority = true;
               areWeThereYet = false;
               changeInThisIteration = true;
               resultPriority = priorities[i];
               resultIndex = i;
           }
       } else {
           resultPriority = priorities[i];
           resultIndex = i;
       }

        if (priorities[i] > resultPriority && !changeInThisIteration) {
           samePriority = false;
       }
   }
}
return resultIndex;
}

function findNextIndex(currentIndex, array) {
var currentTime = currentIndex !== -1 ? array[currentIndex] : 0;
var resultTime = 1000000;
var resultIndex = -1;
var sameTime = false;
var areWeThereYet = false;

for (var i = 0; i < array.length; i++) {
   var changeInThisIteration = false;

    if (i === currentIndex) {
       areWeThereYet = true;
       continue;
   }
   if (array[i] >= currentTime && array[i] <= resultTime) {
       if (array[i] === resultTime) {
           if (currentTime === array[i] && !sameTime) {
               sameTime = true;
               changeInThisIteration = true;
               resultTime = array[i];
               resultIndex = i;
           }
       } else if (array[i] === currentTime) {
           if (areWeThereYet) {
               sameTime = true;
               areWeThereYet = false;
               changeInThisIteration = true;
               resultTime = array[i];
               resultIndex = i;
           }
       } else {
           resultTime = array[i];
           resultIndex = i;
       }

        if (array[i] < resultTime && !changeInThisIteration) {
           sameTime = false;
       }
   }
}
return resultIndex;
}

function draw() {
document.getElementById('fresh').innerHTML = '';
var inputTable = document.querySelectorAll('#inputTable tr');
var th = '';
var td = '';

var algorithm = document.querySelector('input[name=algorithm]:checked').value;
if (algorithm === "fcfs") {
 Array.from(inputTable).forEach(function (value, key) {
   if (key === 0) return true;
   var executeTime = parseInt(value.children[2].children[0].value);
   th += '<th style="height: 60px; width: ' + executeTime * 20 + 'px;">P' + (key - 1) + '</th>';
   td += '<td>' + executeTime + '</td>';
 });

 document.getElementById('fresh').innerHTML = '<table id="resultTable"><tr>'
   + th
   + '</tr><tr>'
   + td
   + '</tr></table>';
}
else if (algorithm === "sjf") {
 var executeTimes = [];

 Array.from(inputTable).forEach(function (value, key) {
   if (key === 0) return true;
   var executeTime = parseInt(value.children[2].children[0].value);
   executeTimes[key - 1] = { "executeTime": executeTime, "P": key - 1 };
 });

 executeTimes.sort(function (a, b) {
   if (a.executeTime === b.executeTime)
     return a.P - b.P;
   return a.executeTime - b.executeTime;
 });

 executeTimes.forEach(function (value) {
   th += '<th style="height: 60px; width: ' + value.executeTime * 20 + 'px;">P' + value.P + '</th>';
   td += '<td>' + value.executeTime + '</td>';
 });

 document.getElementById('fresh').innerHTML = '<table id="resultTable"><tr>'
   + th
   + '</tr><tr>'
   + td
   + '</tr></table>';
}
else if (algorithm === "priority") {
 var executeTimes = [];

 Array.from(inputTable).forEach(function (value, key) {
   if (key === 0) return true;
   var executeTime = parseInt(value.children[2].children[0].value);
   var priority = parseInt(value.children[4].children[0].value);
   executeTimes[key - 1] = { "executeTime": executeTime, "P": key - 1, "priority": priority };
 });

 executeTimes.sort(function (a, b) {
   if (a.priority === b.priority)
     return a.P - b.P;
   return b.priority - a.priority;
 });

 executeTimes.forEach(function (value) {
   th += '<th style="height: 60px; width: ' + value.executeTime * 20 + 'px;">P' + value.P + '</th>';
   td += '<td>' + value.executeTime + '</td>';
 });

 document.getElementById('fresh').innerHTML = '<table id="resultTable" style="width: 70%"><tr>'
   + th
   + '</tr><tr>'
   + td
   + '</tr></table>';
}
else if (algorithm === "robin") {
 var quantum = document.getElementById('quantum').value;
 var executeTimes = [];

 Array.from(inputTable).forEach(function (value, key) {
   if (key === 0) return true;
   var executeTime = parseInt(value.children[2].children[0].value);
   executeTimes[key - 1] = { "executeTime": executeTime, "P": key - 1 };
 });

 var areWeThereYet = false;
 while (!areWeThereYet) {
   areWeThereYet = true;
   executeTimes.forEach(function (value) {
     if (value.executeTime > 0) {
       th += '<th style="height: 60px; width: ' + (value.executeTime > quantum ? quantum : value.executeTime) * 20 + 'px;">P' + value.P + '</th>';
       td += '<td>' + (value.executeTime > quantum ? quantum : value.executeTime) + '</td>';
       value.executeTime -= quantum;
       areWeThereYet = false;
     }
   });
 }
 document.getElementById('fresh').innerHTML = '<table id="resultTable" style="width: 70%"><tr>'
   + th
   + '</tr><tr>'
   + td
   + '</tr></table>';
}
}