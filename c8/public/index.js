var fname = document.querySelector('.firstname');
var lname = document.querySelector('.lastname');
var btnAddUser = document.querySelector('#add-user');

btnAddUser.addEventListener('click', function(){
    var data = {
        firstname: fname.value,
        lastname: lname.value
    };

    // console.log(data);

    fetch(
        'http://127.0.0.1:3000/api/users',
        {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }
    ).then(function(res){
        return res.text();
    }).then(function(data){
        console.log(data);
    });
});