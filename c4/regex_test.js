// var re1 = '/users'; // /\/users/
// var re2 = '/users/{num}'; // /\/users\/[0-9]+/
// var re3 = '/users/{num}/firstname'; // /\/users\/[0-9]+\/firstname/
// var re4 = '/users/{num}/{alpha}'; // /\/users\/[0-9]+\/firstname/
// var re5 = '/users/{num}/{alnum}'; // /\/users\/[0-9]+\/firstname/

// console.log(re1);
// console.log(re2);
// console.log(re3);
// console.log(re4);
// console.log(re5);

// console.log('/' + re1.replace(new RegExp('/', 'g'), "\\/") + '/');
// console.log('/' + re2.replace('{num}', '[0-9]+').replace(new RegExp('/', 'g'), "\\/") + '/');
// console.log('/' + re3.replace('{num}', '[0-9]+').replace(new RegExp('/', 'g'), "\\/") + '/');
// console.log('/' + re4.replace('{num}', '[0-9]+').replace('{alpha}', '[a-z]+').replace(new RegExp('/', 'g'), "\\/") + '/');
// console.log('/' + re5.replace('{num}', '[0-9]+').replace('{alnum}', '[a-z0-9]+').replace(new RegExp('/', 'g'), "\\/") + '/');


// var str1 = 'Hello regex';
// str1 = str1.replace('regex', 'World');
// console.log(str1);

// var str2 = 'Hello regex regex';
// str2 = str2.replace('regex', 'World');
// console.log(str2);

// var str3 = 'Hello regex regex';
// var search = new RegExp('regex', 'g');
// str3 = str3.replace(search, 'World');
// console.log(str3);

// var str4 = 'Hello regex regex';
// str4 = str4.replace(/regex/g, 'World');
// console.log(str4);


// var re1 = '/users'; // /\/users/
// re1 = '/' + re1.replace('/', '\\/') + '/';
// console.log(re1);


// var re2 = '/users/{num}'; // /\/users\/[0-9]+/
// re2 = '/' + re2.replace(new RegExp('/', 'g'), '\\/').replace(new RegExp('{num}', 'g'), '[0-9]+') + '/';
// console.log(re2);

var re1 = '/users';
var re2 = '/users/{num}';
var re3 = '/users/{num}/firstname';
var re4 = '/users/{num}/{alpha}';
var re5 = '/users/{num}/{alnum}';

function URLToRegex(url){
    var output = url.replace(new RegExp('/', 'g'), '\\/')
    .replace(new RegExp('{num}', 'g'), '[0-9]+')
    .replace(new RegExp('{alnum}', 'g'), '[a-z0-9]+')
    .replace(new RegExp('{alpha}', 'g'), '[a-z]+')

    return '/' + output + '/';
}

console.log(URLToRegex(re1));
console.log(URLToRegex(re2));
console.log(URLToRegex(re3));
console.log(URLToRegex(re4));
console.log(URLToRegex(re5));