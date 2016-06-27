// 1. Write a function that utilizes recursion to calculate the factorial of a number.

function factorial (x) {
	if (x === 1) {
		return 1;
	} else {
		return x * factorial(x - 1);
	}
}

console.assert(factorial(5) === 120);
console.assert(factorial(12) === 479001600);


// 2.1 Write a function called walkTheDOM that will execute a callback function for every descendant of a node.

function walkTheDOM (parent, callback) {
	callback(parent);
	for (var i = 0; i < parent.children.length; i++) {
		walkTheDOM(parent.children[i], callback);
	}
}


// 2.2 Write a function called findElementById that uses walkTheDOM to return the first element with the specified id in the document.

// The function should take an id (string) as the first argument.
// The function should return the first element with the specified id that is found.

function findElementById (parent, id) {
	var result;
	walkTheDOM(parent, function (x) {
		if (x.id === id && !result) {
			result = x;
		}
	})
	return result;
}

console.assert(document.getElementById('lookyHere') === findElementById(document.body, 'lookyHere'));
console.assert(document.getElementById('bigWords') === findElementById(document.body, 'bigWords'));


// 2.3 Write a function called findElementsByTagName that uses walkTheDOM to return an array of a node's descendants that have a specific tag name.

// The function should take a starting node as the first argument followed by a tag name (e.g. "p", "nav").

function findElementsByTagName (start, tagName) {
	var result = [];
	tagName = tagName.toUpperCase();
	walkTheDOM(start, function (x) {
		if (x.tagName === tagName) {
			result.push(x);
		}
	})
	return result;
};

console.assert(document.getElementsByTagName('main')[0] === findElementsByTagName(document.body, 'main')[0]);
console.assert(document.getElementsByTagName('div')[1] === findElementsByTagName(document.body, 'div')[1]);


// 2.4 Write a function called findElementsByClassName that uses walkTheDOM to return an array of a node's descendants that have a set of specific class names.

// The function should take a starting node as the first argument followed by a variable number of class names (strings).
// The function should return an array of elements.
// The elements in the resulting array should have all of the class names that were specified, not just one.

// This is the stuff I did wrong that I didn't delete:

// function findElementsByClassName (start) {
// 	var args = arguments;
// 	var result = [];
// 	walkTheDOM(start, function (x) {
// 		for (var i = 1; i < args.length; i++) {
// 			if (!x.classList.contains(args[i])) {
// 				return;
// 			} else {
// 				result.push(x);
// 			}
// 		}
// 	});
// 	return result;
// }

// function findElementsByClassName (start) {
//     var args = arguments
//     var result = [];
//     walkTheDOM(start, function (x) {
//         for (var i = 1; i < args.length; i++) {
//             if (x.classList.contains(args[i])) {
//                 result.push(x);
//             }
//         }
//     })
//     return result;
// };

function findElementsByClassName (start) {
    var args = arguments;
    var result = [];
    walkTheDOM(start, function (x) {
        for (var i = 1; i < args.length; i++) {
        	// without the !, the function will stop after the first time it finds a match.
            if (!x.classList.contains(args[i])) {
                return;
            }
        }
        result.push(x);
    });
    return result;
}

console.log(findElementsByClassName(document.body, 'thisOne', 'thisOtherOne'));

var a = findElementsByClassName(document.body, 'thisOne', 'thisOtherOne');

console.assert(a.length === 1);
console.assert(a[0].classList.contains('thisOne') && a[0].classList.contains('thisOtherOne'));