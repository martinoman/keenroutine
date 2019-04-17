export function sortOnIndex(arr){
    return arr.sort(function(a, b){
        return a.index - b.index;
    });
}
