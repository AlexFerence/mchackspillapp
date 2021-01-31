const dataSet1 = [
    "manitoba pharmacy 204 manitoba street winnipeg mb m2b 2y2 canda stare 0001 rx#2042042 ref:0 toba man take 1 capsule three times daily until finished (antibiotic) phone: 204-204-2004 dr. manitoba apo-amoxi 500mg amoxicillin 500mg red/yel/ellipiapo(500) 30 cap apx 00628123 14 oct 2007 tetal:21 43 eds important: take this medication for the prescribed duration.",
    "manitoba",
    "pharmacy",
    "204",
    "manitoba",
    "street",
    "winnipeg",
    "mb",
    "m2b",
    "2y2",
    "canda",
    "stare",
    "0001",
    "rx#2042042",
    "ref:0",
    "toba",
    "man",
    "take",
    "1",
    "capsule",
    "three",
    "times",
    "daily",
    "until",
    "finished",
    "(antibiotic)",
    "phone:",
    "204-204-2004",
    "dr.",
    "manitoba",
    "apo-amoxi",
    "500mg",
    "amoxicillin",
    "500mg",
    "red/yel/ellipiapo(500)",
    "30",
    "cap",
    "apx",
    "00628123",
    "14",
    "oct",
    "2007",
    "tetal:21",
    "43",
    "eds",
    "important:",
    "take",
    "this",
    "medication",
    "for",
    "the",
    "prescribed",
    "duration.",
]

const dataSet2 = [
    "taylor's neighborhood pharmacy 1900 belmont blvd nashville, tn 37212 615-460-6040 rx # 6001103 smith, john dr. d. haase 00/00/0000 rb nashville, tn 37212 1900 belmont blvd take two tablets by mouth 2 times a day 120metformin hcl 500 mg tabl no refills ndc# 00378-0234-01 orig 08/26/10 cauton fh",
    "taylor's",
    "neighborhood",
    "pharmacy",
    "1900",
    "belmont",
    "blvd",
    "nashville,",
    "tn",
    "37212",
    "615-460-6040",
    "rx",
    "#",
    "6001103",
    "smith,",
    "john",
    "dr.",
    "d.",
    "haase",
    "00/00/0000",
    "rb",
    "nashville,",
    "tn",
    "37212",
    "1900",
    "belmont",
    "blvd",
    "take",
    "two",
    "tablets",
    "by",
    "mouth",
    "2",
    "times",
    "a",
    "day",
    "120metformin",
    "hcl",
    "500",
    "mg",
    "tabl",
    "no",
    "refills",
    "ndc#",
    "00378-0234-01",
    "orig",
    "08/26/10",
    "cauton",
    "fh"]

const dataSet3 = [
    "local pharmacy 123 main street anytown, usa 11111 (800)555-5555 dr c. jones no 0060023-08291 date 06/23/09 jane smith 456 main street anytown, us 11111 take one capsule by mouth three times daily for 10 days until all taken amoxicillin 500mg capsules qty mrg no refills- dr. authorization required use before 06/23/12 slf/slf",
    "local",
    "pharmacy",
    "123",
    "main",
    "street",
    "anytown,",
    "usa",
    "11111",
    "(800)555-5555",
    "dr",
    "c.",
    "jones",
    "no",
    "0060023-08291",
    "date",
    "06/23/09",
    "jane",
    "smith",
    "456",
    "main",
    "street",
    "anytown,",
    "us",
    "11111",
    "take",
    "one",
    "capsule",
    "by",
    "mouth",
    "three",
    "times",
    "daily",
    "for",
    "10",
    "days",
    "until",
    "all",
    "taken",
    "amoxicillin",
    "500mg",
    "capsules",
    "qty",
    "mrg",
    "no",
    "refills-",
    "dr.",
    "authorization",
    "required",
    "use",
    "before",
    "06/23/12",
    "slf/slf",
]
let date2 = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
let date1 = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{2}$/;
let str = "12-12-12";

const strNums = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten']

const nums = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']

const dailyIndicator = ['day', 'daily']

const week

const

const extractInfo = (dataSet) => {

    const takeIndex = dataSet.indexOf('take')

    let numIndex = 0

    for (var x = takeIndex; x < dataSet.length - 1; x++) {
        const str = dataSet[x].trim()
        if (nums.indexOf(str) > -1 || strNums.indexOf(str) > -1) {
            console.log(str)
            if (numIndex === 0) {

            }

        }

    }


}

console.log(extractInfo(dataSet1));

    //console.log(date1.test(str));
// const extractInfo = (dataSet) => {

//     var p1 = dataSet;
//     var arrayLength = p1.length;
//     var reg = /^\d+$/;
//     let i = 0
//     let a = 0;
//     let b = false;
//     let c = "";
//     do {
//         switch(p1[i].toLowerCase) {
//             case "take":
//                 let lC = p1[i+1].toLowerCase();
//               if( lC === "1" || lC === "once" || lC === "one" || lC === "1x")
//               {a = 1}
//               else if (lC === "2" || lC === "twice" || lC === "two" || lC === "2x")
//               {a = 2}
//               else if (lC === "3" || lC === "thrice" || lC === "three" || lC === "3x")
//               {a = 3}
//               else if (lC === "4" || lC === "four" || lC === "4x")
//               {a = 4}
//               else if (lC === "5" || lC === "five" || lC === "5x")
//               {a = 5}
//               else if (lC === "6" || lC === "six" || lC === "6x")
//               {a = 6}
//               else if (lC === "7" || lC === "seven" || lC === "7x")
//               {a = 7}
//               else if (lC === "8" || lC === "eight" || lC === "8x")
//               {a = 8}
//               else if (lC === "9" || lC === "nine" || lC === "9x")
//               {a = 9}
//               else if (reg.test(lC))
//               {a = lC}
//               i++
//               break;
//             case "refills":
//               // code block
//                 let pC = p1[i-1].toLowerCase;
//                 if (pC !== "no")
//                 {b = true;}
//                 i++
//               break;

//             case "before":
//                 if (date1.test(p1[i+1]) || date2.test(p1[i+1]))
//                 {c = p1[i+1]}
//                 i++
//                 break;
//             default:
//                 i++
//               // code block
//           }
//     } while (i<p1.length);

//     return {
//         // num of times someone has to take it daily
//         dailyDosage: a,
//         // use before date
//         useBefore: c,
//         // boolean if refils are avaliable
//         refills: b

//     }
// }

// console.log(extractInfo(dataSet1));