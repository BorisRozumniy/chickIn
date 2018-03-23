;
var button = document.querySelector('button');
var showLocalBtn = document.querySelector('#showLocalBtn');
var mainInput = document.querySelector('input');
var counter = () => {
	if (localStorage.counter > 0 ) {
		return localStorage.getItem('counter')
	} else {
		localStorage.setItem('counter', 0);
		return localStorage.getItem('counter');
	}
}

var fromStore = {}
checkStore();

//// складируем все введённые данные в fromStore под уникальным ключем
function temporalySave (obj) {
	var key = () => ++localStorage.counter;
	fromStore['person' + key()] = obj;
}

//// берем старые данные из localStorage.personsObject и добавляем их в fromStore к новым данным
function checkStore () {
	var key = () => ++localStorage.counter;
	if(localStorage.personsObject) {
		var oldDataString = localStorage.getItem('personsObject');
		var oldDataObject = JSON.parse(oldDataString);
		for (p in oldDataObject) {
			fromStore[p] = (oldDataObject[p])
		}
		return fromStore;
	}
}

////выгружаем всё из fromStore в localStorage.personOnject
function addAllToStorage () {
	
	var toStor = JSON.stringify(fromStore);
	localStorage.setItem('personsObject', toStor);
}

function tHandler() {
	if(document.querySelector('table') == null){
		if (JSON.stringify(fromStore) == "{}") return alert('Данные отсутствуют');
		var table = document.createElement('table');
		table.classList.add('from-store');
		for (x in fromStore) {
			var tRow = table.insertRow(0);
			tRow.insertCell(0).innerHTML = fromStore[x].name;
			tRow.insertCell(1).innerHTML = fromStore[x].surname;
			tRow.insertCell(2).innerHTML = fromStore[x].birth;
			tRow.insertCell(3).innerHTML = fromStore[x].сity;
		}
		document.body.appendChild(table);
	}else{
		document.querySelector('table').remove();
	}
}

function addPersonHandler(){
	var person = {};
	Object.defineProperty(person, 'aboutPerson', {
		set: function(value){
			var split = value.split(' ');
			this.name = split[0];
			this.surname = split[1];
			this.birth = split[2];
			this.сity = split[3];
		},
		get: function(){
			return this.name + ' ' + this.surname + ' ' + this.birth + ' ' + this.сity;
		}
	});

	person.aboutPerson = mainInput.value;

	temporalySave(person);

	mainInput.value = '';

	if(document.querySelector('.from-store')){
		var table = document.querySelector('.from-store');
		var tRow = table.insertRow(0);

			tRow.insertCell(0).innerHTML = person.name;
			tRow.insertCell(1).innerHTML = person.surname;
			tRow.insertCell(2).innerHTML = person.birth;
			tRow.insertCell(3).innerHTML = person.сity;
			tRow.insertCell(0).innerHTML = counter();
	}

	showLocalBtn.querySelector('span').innerHTML = localStorage.counter;
	addAllToStorage()
}

(function showCounter(){
	showLocalBtn.querySelector('span').innerHTML = counter();
})()

button.addEventListener('click', addPersonHandler);
showLocalBtn.addEventListener('click', tHandler);