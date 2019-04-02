export function sortOnIndex(arr){
    console.log(arr);
    return arr.sort(function(a, b){
        return a.index - b.index;
    });
}
