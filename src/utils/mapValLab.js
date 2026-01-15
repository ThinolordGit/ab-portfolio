
export function mapValLab(need, arr, defaultlab="") {
    // console.log(need)
    return arr.filter(s => s.value === need).map(s => s?.label) || need || defaultlab
}