const fetch = require('node-fetch');

function sobiraj(a, b) {
    console.log(a + b);
}

function sobiraj2(a, b) {
    return a + b;
}

// sobiraj(2, 5);

var res = sobiraj2(4, 6);
console.log(res);

console.log(sobiraj2(4, 6));


// *****************************

var sobiraj3 = function(a, b){
    return a + b;
};

console.log(sobiraj3(4, 11));

var calc = function(c, d, fn){
    return fn(c, d);
}

var res2 = calc(6, 21, sobiraj3);
console.log(res2);


var res3 = calc(10, 43, function(a, b){
    return a * b;
});

var res4 = calc(10, 43, function (a, b) {
    return a / b;
});

var res5 = calc(10, 43, function (a, b) {
    return a - b;
});


// fetch('https://jsonplaceholder.typicode.com/posts')
//     .then(
//         function(res){
//             return res.json();
//         },
//         function(err){
//             console.error(err)
//         }
//     )
//     .then(
//         function(data){
//             console.log(data);
//         },
//         function(err){
//             console.error(err);
//         }
//     );

// fetch('https://jsonplaceholder.typicode.com/posts')
//     .then(
//         function (res) {
//             return res.json();
//         }
//     )
//     .then(
//         function (data) {
//             console.log(data);
//         }
//     );

setTimeout(function () {
    console.log('TIMEOUT');
}, 3000);


var p1 = (a, b) => { // FAT-ARROW function
    return new Promise((success, fail) => {
        var res = a + b;

        if(res <= 10){
            return success(res);
        } else {
            return fail('Number is too big');
        }
    });
};

var p2 = (c) => {
    return new Promise((success, fail) => {
        var res = c / 10;

        if(res <= 10){
            success(res);
        } else {
            fail('The final result is too big');
        }
    });
}

// p1(2, 4)
//     .then(
//         (data) => {
//             console.log('Success! The result is: ' + data);
//         },
//         (err) => {
//             console.error(err);
//         }
//     );

// p1(2, 40)
//     .then(
//         (data) => {
//             console.log('Success! The result is: ' + data);
//         },
//         (err) => {
//             console.error(err);
//         }
//     );

p1(2, 5)
    .then(
        (data) => {
            return p2(data)
        },
        (err) => {
            console.error(err);
        }
    )
    .then(
        (data) => {
            console.log('Final data: ' + data);
        },
        (err) => {
            console.log(err);
        }
    );

var n1 = [1, 2, 3, 4, 5, 6, 7, 8, 9];

var n2 = n1.map((val) => {
    return val * 10;
});

var n3 = n1.reduce((prev, cur) => {
    return prev + cur;
});

var n4 = n1.filter((val) => {
    return val % 2 == 0;
});


var n5 = n1.filter((val) => {
    return val % 2 == 1;
}).map((val) => {
    return val * 2;
}).filter((val) => {
    return val < 10;
}).reduce((prev, cur) => {
    return prev + cur;
});



console.log(n2);
console.log(n3);
console.log(n4);
console.log(n5);

