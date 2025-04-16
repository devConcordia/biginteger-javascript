
import BigInteger from '../../source/BigInteger.mjs';

function bin2int( input ) {
	
	var output = '0x';
	
	for( var e of input )
		output += e.charCodeAt(0).toString(16).padStart(2,'0');
	
	return BigInt( output );
	
}


const IN_X = '\xb1\xf3\xe5\xa1\x3f\x0b\x89\xb0\xa1\x3f\x0b\x89\xb0';
const IN_Y = '\x6a\x54\xf0\xec\x3d\x5a';

let x = bin2int( IN_X );
let y = bin2int( IN_Y );


let a = new BigInteger(IN_X, false);
let b = new BigInteger(IN_Y, false);

console.log( BigInteger.Add( a, b ).toString(), '\t', (x + y) )
console.log( BigInteger.Add( b, a ).toString(), '\t', (y + x) )

a = new BigInteger(IN_X, true);
b = new BigInteger(IN_Y, true);

console.log( BigInteger.Add( a, b ).toString(), '\t', ((-x) + (-y)) )
console.log( BigInteger.Add( b, a ).toString(), '\t', ((-y) + (-x)) )

a = new BigInteger(IN_X, false);
b = new BigInteger(IN_Y, true);

console.log( BigInteger.Add( a, b ).toString(), '\t', ((x) + (-y)) )
console.log( BigInteger.Add( b, a ).toString(), '\t', ((-y) + (x)) )

a = new BigInteger(IN_X, true);
b = new BigInteger(IN_Y, false);

console.log( BigInteger.Add( a, b ).toString(), '\t', ((-x) + (y)) )
console.log( BigInteger.Add( b, a ).toString(), '\t', ((y) + (-x)) )

/**/

console.log( '' );
a = new BigInteger(IN_X, false);
b = new BigInteger(IN_Y, false);

console.log( BigInteger.Sub( a, b ).toString(), '\t', (x - y) )
console.log( BigInteger.Sub( b, a ).toString(), '\t', (y - x) )

a = new BigInteger(IN_X, true);
b = new BigInteger(IN_Y, true);

console.log( BigInteger.Sub( a, b ).toString(), '\t', ((-x) - (-y)) )
console.log( BigInteger.Sub( b, a ).toString(), '\t', ((-y) - (-x)) )

a = new BigInteger(IN_X, false);
b = new BigInteger(IN_Y, true);

console.log( BigInteger.Sub( a, b ).toString(), '\t', ((x) - (-y)) )
console.log( BigInteger.Sub( b, a ).toString(), '\t', ((-y) - (x)) )

a = new BigInteger(IN_X, true);
b = new BigInteger(IN_Y, false);

console.log( BigInteger.Sub( a, b ).toString(), '\t', ((-x) - (y)) )
console.log( BigInteger.Sub( b, a ).toString(), '\t', ((y) - (-x)) )

/**/


console.log( '' );
a = new BigInteger(IN_X, false);
b = new BigInteger(IN_Y, false);

console.log( BigInteger.Mul( a, b ).toString(), '\t', (x * y) )
console.log( BigInteger.Mul( b, a ).toString(), '\t', (y * x) )

a = new BigInteger(IN_X, true);
b = new BigInteger(IN_Y, true);

console.log( BigInteger.Mul( a, b ).toString(), '\t', ((-x) * (-y)) )
console.log( BigInteger.Mul( b, a ).toString(), '\t', ((-y) * (-x)) )

a = new BigInteger(IN_X, false);
b = new BigInteger(IN_Y, true);

console.log( BigInteger.Mul( a, b ).toString(), '\t', ((x) * (-y)) )
console.log( BigInteger.Mul( b, a ).toString(), '\t', ((-y) * (x)) )

a = new BigInteger(IN_X, true);
b = new BigInteger(IN_Y, false);

console.log( BigInteger.Mul( a, b ).toString(), '\t', ((-x) * (y)) )
console.log( BigInteger.Mul( b, a ).toString(), '\t', ((y) * (-x)) )

/**/


console.log( '' );

a = new BigInteger(IN_X, true);
b = new BigInteger(IN_Y, true);

console.log( BigInteger.Div( a, b ).map(e=>e.toString()).join(' '), 
	'\t', ((-x) / (-y)), ((-x) % (-y)) );

console.log( BigInteger.Div( b, a ).map(e=>e.toString()).join(' '), 
	'\t', ((-y) / (-x)), ((-y) % (-x)) )

a = new BigInteger(IN_X, false);
b = new BigInteger(IN_Y, true);

console.log( BigInteger.Div( a, b ).map(e=>e.toString()).join(' '), 
	'\t', ((x) / (-y)), ((x) % (-y)) )
console.log( BigInteger.Div( b, a ).map(e=>e.toString()).join(' '), 
	'\t', ((-y) / (x)), ((-y) % (x)) )

a = new BigInteger(IN_X, true);
b = new BigInteger(IN_Y, false);

console.log( BigInteger.Div( a, b ).map(e=>e.toString()).join(' '), 
	'\t', ((-x) / (y)), ((-x) % (y)) )
console.log( BigInteger.Div( b, a ).map(e=>e.toString()).join(' '), 
	'\t', ((y) / (-x)), ((y) % (-x)) )
	
/**/


