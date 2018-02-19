console.log('Hello World!');

var string = "Test test test";
var string2 = 'Test2 test2 test2';
var string3 = `Test3 test3

test3`;

console.log(string);
console.log(string2);
console.log(string3);

var integer = 12;

console.log(integer);

var float = 3.14;

console.log(float);

var booleanT = true;
var booleanF = false;

console.log(booleanT);
console.log(booleanF);

var niza1 = ['pero', 'janko', 'stanko'];
console.log(niza1);
console.log(niza1[0]);
console.log(niza1[1]);
console.log(niza1[2]);

// niza1[100] = 'Bojan';
// niza1.append('Bojan');
niza1.push('Bojan');

console.log(niza1.length);

console.log("****************************");

for(let i = 0; i < niza1.length; i++){
    console.log(niza1[i]); 
}

for(let i in niza1){
    console.log(niza1[i]);
    break;
}

// == === <= != >= ! && ||


var broevi = [3, 2, 6, 3, 8, 34, 15, 43, 5, 30, 5, 60, 4, 8, 9];

//  ako brojot e delliv so 3 -> fiz
//  ako brojot e delliv so 5 -> buzz
//  ako brojot e delliv so i 3 i so 5 -> fizbuzz

console.log('******************************************');

for(let i in broevi) {
    var o = '';

    if(broevi[i] % 3 == 0){
        o += 'fizz';
    }

    if(broevi[i] % 5 == 0){
        o += 'buzz';
    }

    console.log(broevi[i] + "\t = \t" + o);
}



var brojach = 0;

while(brojach <= 10){
    console.log(brojach);
    brojach++;
}

console.log(brojach);

do {
    console.log(brojach);
    brojach++;
} while(brojach < 10);


console.log('***********************************');



















