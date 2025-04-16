///

const getCode = String.fromCharCode;

export const BASE36 = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';


export function bi_parse( value ) {
	
	value = value.replace(/^\x00+/, '')
	
	if( value == '' ) return '\x00';
	
	return value
	
}

/* */

export function bi_length( string ) {
	
	return ((string.length - 1) * 8) + Math.floor( Math.log2( string.charCodeAt(0) ) );
	
}

export function bi_compare( a, b ) {
	
	if( a == b ) return 0;
	
	let al = bi_length( a );
	let bl = bi_length( b );
	
	if( al > bl ) {
		
		return 1;
		
	} else if( bl > al ) {
		
		return -1;
		
	} else {
		
		for( let i = 0; i < a.length; i++ ) {
			
			let d = a.charCodeAt(i) - b.charCodeAt(i);
			
			if( d > 0 ) return 1;
			if( d < 0 ) return -1;
			
		}
		
		return 0;
		
	}
	
}

/* */

export function bi_and( a, b ) {
	
	let n = Math.max( a.length, b.length );
	
	a = a.padStart( n, '\x00' );
	b = b.padStart( n, '\x00' );
	
	let output = '';
	
	for( let i = 0; i < n; i++ )
		output += getCode( a.charCodeAt(i) & b.charCodeAt(i) );
	
	return bi_parse( output );
	
}

export function bi_or( a, b ) {
		
	let n = Math.max( a.length, b.length );
	
	a = a.padStart( n, '\x00' );
	b = b.padStart( n, '\x00' );
	
	let output = '';
	
	for( let i = 0; i < n; i++ )
		output += getCode( a.charCodeAt(i) | b.charCodeAt(i) );
	
	return bi_parse( output );
	
}

export function bi_xor( a, b ) {
		
	let n = Math.max( a.length, b.length );
	
	a = a.padStart( n, '\x00' );
	b = b.padStart( n, '\x00' );
	
	let output = '';
	
	for( let i = 0; i < n; i++ )
		output += getCode( a.charCodeAt(i) ^ b.charCodeAt(i) );
	
	return bi_parse( output );
	
}

export function bi_not( input ) {
	
	let output = '';
	
	for( let i = 0; i < input.length; i++ )
		output += getCode((~input.charCodeAt( i )) >>> 0);
	
	return bi_parse( output );
	
}

/* */

function int_left_core( input, delta ) {
	
	let output = '';
	let length = input.length;
	
	
	let cache = 0;
	
	for( let i = 0; i < length; i++ ) {
		
		let e = input.charCodeAt( length - i - 1 ) << delta;
		
		output = getCode( (e | cache) & 0xff ) + output;
		
		cache = (e >> 8) & 0xff;
		
	}

	if( cache != 0 )
		output = getCode( cache ) + output;
	
	return output;
	
}

/// <<
export function bi_left( input, delta ) {
	
	while( delta > 0 ) {
		
		let n = ( delta < 8 )? delta : 8;
		
		input = int_left_core( input, n );
		
		delta -= n;
		
	}
	
	return bi_parse( input );
	
}

function int_right_core( input, delta ) {
	
	let output = '';
	let length = input.length;
	
	let cache = 0;
	
	for( let i = 0; i < length; i++ ) {
		
		let e = input.charCodeAt( i );
		
		output += getCode( cache | (e >> delta) );
		
		cache = (e << (8-delta)) & 0xff;
	
	}
	
	return output;
	
}

/// >>
export function bi_right( input, delta ) {
	
	while( delta > 0 ) {
		
		let n = ( delta < 8 )? delta : 8;
		
		input = int_right_core( input, n );
		
		delta -= n;
		
	}
	
	return bi_parse( input );
	
}

/* */

/** 
 *	
 */
export function bi_add( a, b ) {
	
	let carry = bi_and( a, b );
	let result = bi_xor( a, b );
	
	while( carry != '\x00' ) {
		
		/// ShiftLeft
		let shiftedcarry = bi_left( carry, 1 );
		
		carry = bi_and( result, shiftedcarry );
		result = bi_xor( result, shiftedcarry );
		
	}
	
	return result;
	
}

export function bi_sub( a, b ) {
	
	if( bi_compare( a, b ) == -1 )
		[ a, b ] = [ b, a ];
	
	let carry = bi_and( bi_not(a), b );
	let result = bi_xor( a, b );
	
	while( carry != '\x00' ) {
		
		let shiftedcarry = bi_left( carry, 1 );
		
		carry = bi_and( bi_not( result ), shiftedcarry );
		result = bi_xor( result, shiftedcarry );
		
	}
	
	return result;
	
}

