
import {
	BASE36, 
	bi_parse,
	bi_compare, bi_length,
	bi_and, bi_or, bi_xor, bi_not,
	bi_left, bi_right,
	bi_add, bi_sub
} from './core.mjs';

/** BigInteger
 *	
 *	@property {String} value		bytes	[ 0x00, ..., 0xff ]
 *	@property {Boolean} negative
 *	
 */
export default class BigInteger {
	
	constructor( value, negative = false ) {
		
		this.value = bi_parse( value );
		this.negative = negative;
		
	}
	
	clone() {
		
		return new BigInteger( this.value, this.negative );
		
	}
	
	add( input ) {
		
		return BigInteger.Add( this, input );
		
	}
	
	sub( input ) {
		
		return BigInteger.Sub( this, input );
		
	}
	
	mul( input ) {
		
		return BigInteger.Mul( this, input );
		
	}
	
	div( input ) {
		
		return BigInteger.Div( this, input );
		
	}
	
	toString( base = 10 ) {
		
		base = new BigInteger( String.fromCharCode( base ) );
		
		let input = this;
		let output = '';
		
		while( bi_compare( input.value, '\x00' ) > 0 ) {
			
			let e = input.div( base );
			
			output = BASE36.charAt( e[1].value.charCodeAt(0) ) + output;
			input = e[0];
		}
		
		return (this.negative?'-':'') + (output || BASE36[0]);
		
	}
	
	/* */
	
	static From( input, base = 10 ) {
		
		input = input.toUpperCase();
		
		base = new BigInteger( String.fromCharCode( base ) );
		
		let output = new BigInteger('\x00');
		
		for( let i = 0; i < input.length; i++ ) {
			
			let code = BASE36.indexOf( input.charAt( i ) );
			
			output = output.mul( base ).add( new BigInteger( String.fromCharCode( code ) ) );
		
		}
		
		return output;
		
	}
	
	/** Add
	 *	
	 *	@param {BigInteger} a
	 *	@param {BigInteger} b
	 *	@return {BigInteger}
	 */
	static Add( a, b ) {
		
		if( a.negative == b.negative )
			return new BigInteger( bi_add( a.value, b.value ), a.negative );
		
		if( bi_compare( a.value, b.value ) > 0 )
			return new BigInteger( bi_sub( a.value, b.value ), a.negative );
			
		return new BigInteger( bi_sub( b.value, a.value ), !a.negative );
		
	}
	
	/** Sub
	 *	
	 *	@param {BigInteger} a
	 *	@param {BigInteger} b
	 *	@return {BigInteger}
	 */
	static Sub( a, b ) {
		
		let negative = a.negative;
		
		if( bi_compare( b.value, a.value ) > 0 ) negative = !b.negative;
		
		if( a.negative == b.negative )
			return new BigInteger( bi_sub( a.value, b.value ), negative );
			
		return new BigInteger( bi_add( a.value, b.value ), negative );
		
	}
	
	
	/** Mul
	 *	
	 *	@param {BigInteger} a
	 *	@param {BigInteger} b
	 *	@return {BigInteger}
	 */
	static Mul( a, b ) {
		
		let x = a.value,
			y = b.value;
		
		let output = '\x00';
		
		while( y != '\x00' ) {
			
			if( bi_and( y, '\x01' ) == '\x01' )
				output = bi_add( output, x );
			
			x = bi_left( x, 1 );
			y = bi_right( y, 1 );
			
		}
		
		let negative = (a.negative == b.negative)? false : true;
		
		return new BigInteger( output, negative );
		
	}
	
	/** Div
	 *	
	 *	@param {BigInteger} a
	 *	@param {BigInteger} b
	 *	@return {Array[2]<BigInteger>}
	 */
	static Div( a, b ) {
		
		let x = a.value;
		let y = b.value;
		
		if( bi_compare( y, '\x00' ) == 0 ) return [ new BigInteger( '\x00' ), new BigInteger( '\x00' ) ];
		
		if( x == y ) return [ new BigInteger( '\x01' ), new BigInteger( '\x00' ) ];
		
		if( bi_compare( y, x ) > 0 ) return [ new BigInteger( '\x00' ), a.clone() ];
		
		
		
		let n = bi_length(x) - bi_length(y);
		
		y = bi_left( y, n );
		
		let output = '\x00';
		let remainder = x;
		
		while( n >= 0 ) {
			
			output = bi_left( output, 1 );
			
			if( bi_compare( y, remainder ) < 1 ) {
				
				output = bi_or( output, '\x01' );
				remainder = bi_sub( remainder, y );
				
			}
			
			y = bi_right( y, 1 );
			
			n--;
			
		};
		
		let negative = (a.negative == b.negative)? false : true;
		
		return [
			new BigInteger( output, negative ),
			new BigInteger( remainder, a.negative )
		]
	
	}
	
}
