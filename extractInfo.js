export const extractInfo = (dataSet) => {

    var p1 = dataSet;
    var arrayLength = p1.length;

    var reg = /^\d+$/;
    let i = 1
    let a = 0;
    let b = false;
    let c = "";

    while (i < p1.length) {

        let curword = p1[i].toLowerCase();
        //console.log(curword);
        if (curword === 'take') {
            //console.log("Here 1");
            let lC = p1[i + 1].toLowerCase();

            if (lC === "1" || lC === "once" || lC === "one" || lC === "1x") { a = 1 }
            else if (lC === "2" || lC === "twice" || lC === "two" || lC === "2x") { a = 2 }
            else if (lC === "3" || lC === "thrice" || lC === "three" || lC === "3x") { a = 3 }
            else if (lC === "4" || lC === "four" || lC === "4x") { a = 4 }
            else if (lC === "5" || lC === "five" || lC === "5x") { a = 5 }
            else if (lC === "6" || lC === "six" || lC === "6x") { a = 6 }
            else if (lC === "7" || lC === "seven" || lC === "7x") { a = 7 }
            else if (lC === "8" || lC === "eight" || lC === "8x") { a = 8 }
            else if (lC === "9" || lC === "nine" || lC === "9x") { a = 9 }
            else if (reg.test(lC)) { a = lC }

        } else if (curword === "refills") {
            // code block
            //console.log("Here 2");
            let pC = p1[i - 1].toLowerCase();
            if (pC !== "no") { b = true; }

        } else if (curword === "before") {
            if (date1.test(p1[i + 1]) || date2.test(p1[i + 1]) || date0.test(p1[i + 1]) || date4.test(p1[i + 1])) {
                c = p1[i + 1]
            }
        }
        i++ // code block
    }

    return {
        // num of times someone has to take it daily
        dailyDosage: a,
        // use before date
        useBefore: c,
        // boolean if refils are avaliable
        refills: b
    }

}

// const nums = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten']
// const charNums = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']

// export const extractInfo = (dataSet = []) => {

//     console.log(typeof dataSet)

//     const takeIndex = dataSet.indexOf('take')

//     for (x = takeIndex; x < dataSet.length; x++) {
//         console.log('index: ' + x)
//         console.log(dataSet[x])
//     }
// }