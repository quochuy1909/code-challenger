var sum_to_n_a = function(n) {
    let total = 0
    for(let i = 1; i <= n; i++) {
        total += i
    };
    return total;
};

var sum_to_n_b = function(n) {
    let array=[]
    for(let i = 1; i <= n; i++) {
        array.push(i)
    };
    return array.reduce((a, b) => a + b, 0)
};

var sum_to_n_c = function(n) {
    let i = 1;
    let total=0;
    while(i<=n){
        total += i;
        i++
    }
    return total
};