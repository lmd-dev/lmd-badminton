/**
 * Represents a 64 bits integer
 */
class int64
{
	private _highOrder: number;
	public get highOrder(): number { return this._highOrder; }
	public set highOrder(value: number) { this._highOrder = value; }

	private _lowOrder: number;
	public get lowOrder(): number { return this._lowOrder; }
	public set lowOrder(value: number) { this._lowOrder = value; }

	constructor(msint_32: number, lsint_32: number)
	{
		this.highOrder = msint_32;
		this.lowOrder = lsint_32;
	}
}

/**
 * Class responsible for hashing string with SHA512 algorithme
 */
export class SHA512
{
	private static handle: SHA512 | null = null;

	private H = [new int64(0x6a09e667, 0xf3bcc908), new int64(0xbb67ae85, 0x84caa73b),
	new int64(0x3c6ef372, 0xfe94f82b), new int64(0xa54ff53a, 0x5f1d36f1),
	new int64(0x510e527f, 0xade682d1), new int64(0x9b05688c, 0x2b3e6c1f),
	new int64(0x1f83d9ab, 0xfb41bd6b), new int64(0x5be0cd19, 0x137e2179)];

	private K = [new int64(0x428a2f98, 0xd728ae22), new int64(0x71374491, 0x23ef65cd),
	new int64(0xb5c0fbcf, 0xec4d3b2f), new int64(0xe9b5dba5, 0x8189dbbc),
	new int64(0x3956c25b, 0xf348b538), new int64(0x59f111f1, 0xb605d019),
	new int64(0x923f82a4, 0xaf194f9b), new int64(0xab1c5ed5, 0xda6d8118),
	new int64(0xd807aa98, 0xa3030242), new int64(0x12835b01, 0x45706fbe),
	new int64(0x243185be, 0x4ee4b28c), new int64(0x550c7dc3, 0xd5ffb4e2),
	new int64(0x72be5d74, 0xf27b896f), new int64(0x80deb1fe, 0x3b1696b1),
	new int64(0x9bdc06a7, 0x25c71235), new int64(0xc19bf174, 0xcf692694),
	new int64(0xe49b69c1, 0x9ef14ad2), new int64(0xefbe4786, 0x384f25e3),
	new int64(0x0fc19dc6, 0x8b8cd5b5), new int64(0x240ca1cc, 0x77ac9c65),
	new int64(0x2de92c6f, 0x592b0275), new int64(0x4a7484aa, 0x6ea6e483),
	new int64(0x5cb0a9dc, 0xbd41fbd4), new int64(0x76f988da, 0x831153b5),
	new int64(0x983e5152, 0xee66dfab), new int64(0xa831c66d, 0x2db43210),
	new int64(0xb00327c8, 0x98fb213f), new int64(0xbf597fc7, 0xbeef0ee4),
	new int64(0xc6e00bf3, 0x3da88fc2), new int64(0xd5a79147, 0x930aa725),
	new int64(0x06ca6351, 0xe003826f), new int64(0x14292967, 0x0a0e6e70),
	new int64(0x27b70a85, 0x46d22ffc), new int64(0x2e1b2138, 0x5c26c926),
	new int64(0x4d2c6dfc, 0x5ac42aed), new int64(0x53380d13, 0x9d95b3df),
	new int64(0x650a7354, 0x8baf63de), new int64(0x766a0abb, 0x3c77b2a8),
	new int64(0x81c2c92e, 0x47edaee6), new int64(0x92722c85, 0x1482353b),
	new int64(0xa2bfe8a1, 0x4cf10364), new int64(0xa81a664b, 0xbc423001),
	new int64(0xc24b8b70, 0xd0f89791), new int64(0xc76c51a3, 0x0654be30),
	new int64(0xd192e819, 0xd6ef5218), new int64(0xd6990624, 0x5565a910),
	new int64(0xf40e3585, 0x5771202a), new int64(0x106aa070, 0x32bbd1b8),
	new int64(0x19a4c116, 0xb8d2d0c8), new int64(0x1e376c08, 0x5141ab53),
	new int64(0x2748774c, 0xdf8eeb99), new int64(0x34b0bcb5, 0xe19b48a8),
	new int64(0x391c0cb3, 0xc5c95a63), new int64(0x4ed8aa4a, 0xe3418acb),
	new int64(0x5b9cca4f, 0x7763e373), new int64(0x682e6ff3, 0xd6b2b8a3),
	new int64(0x748f82ee, 0x5defb2fc), new int64(0x78a5636f, 0x43172f60),
	new int64(0x84c87814, 0xa1f0ab72), new int64(0x8cc70208, 0x1a6439ec),
	new int64(0x90befffa, 0x23631e28), new int64(0xa4506ceb, 0xde82bde9),
	new int64(0xbef9a3f7, 0xb2c67915), new int64(0xc67178f2, 0xe372532b),
	new int64(0xca273ece, 0xea26619c), new int64(0xd186b8c7, 0x21c0c207),
	new int64(0xeada7dd6, 0xcde0eb1e), new int64(0xf57d4f7f, 0xee6ed178),
	new int64(0x06f067aa, 0x72176fba), new int64(0x0a637dc5, 0xa2c898a6),
	new int64(0x113f9804, 0xbef90dae), new int64(0x1b710b35, 0x131c471b),
	new int64(0x28db77f5, 0x23047d84), new int64(0x32caab7b, 0x40c72493),
	new int64(0x3c9ebe0a, 0x15c9bebc), new int64(0x431d67c4, 0x9c100d4c),
	new int64(0x4cc5d4be, 0xcb3e42b6), new int64(0x597f299c, 0xfc657e2a),
	new int64(0x5fcb6fab, 0x3ad6faec), new int64(0x6c44198c, 0x4a475817)];

	private W = new Array(64);
	private a: int64;
	private b: int64;
	private c: int64;
	private d: int64;
	private e: int64;
	private f: int64;
	private g: int64;
	private h: int64;
	private T1: int64;
	private T2: int64;
	private charsize = 8;

	utf8_encode(str: string)
	{
		return decodeURIComponent(encodeURIComponent(str));
	}

	str2binb(str: string)
	{
		var bin = [];
		var mask = (1 << this.charsize) - 1;
		var len = str.length * this.charsize;

		for (var i = 0; i < len; i += this.charsize)
		{
			bin[i >> 5] |= (str.charCodeAt(i / this.charsize) & mask) << (32 - this.charsize - (i % 32));
		}

		return bin;
	}

	binb2hex(binarray: number[])
	{
		var hex_tab = "0123456789abcdef";
		var str = "";
		var length = binarray.length * 4;
		var srcByte: number;

		for (var i = 0; i < length; i += 1)
		{
			srcByte = binarray[i >> 2] >> ((3 - (i % 4)) * 8);
			str += hex_tab.charAt((srcByte >> 4) & 0xF) + hex_tab.charAt(srcByte & 0xF);
		}

		return str;
	}

	safe_add_2(x: int64, y: int64)
	{
		var lsw: number, msw: number, lowOrder: number, highOrder: number;

		lsw = (x.lowOrder & 0xFFFF) + (y.lowOrder & 0xFFFF);
		msw = (x.lowOrder >>> 16) + (y.lowOrder >>> 16) + (lsw >>> 16);
		lowOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);

		lsw = (x.highOrder & 0xFFFF) + (y.highOrder & 0xFFFF) + (msw >>> 16);
		msw = (x.highOrder >>> 16) + (y.highOrder >>> 16) + (lsw >>> 16);
		highOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);

		return new int64(highOrder, lowOrder);
	}

	safe_add_4(a: int64, b: int64, c: int64, d: int64)
	{
		var lsw: number, msw: number, lowOrder: number, highOrder: number;

		lsw = (a.lowOrder & 0xFFFF) + (b.lowOrder & 0xFFFF) + (c.lowOrder & 0xFFFF) + (d.lowOrder & 0xFFFF);
		msw = (a.lowOrder >>> 16) + (b.lowOrder >>> 16) + (c.lowOrder >>> 16) + (d.lowOrder >>> 16) + (lsw >>> 16);
		lowOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);

		lsw = (a.highOrder & 0xFFFF) + (b.highOrder & 0xFFFF) + (c.highOrder & 0xFFFF) + (d.highOrder & 0xFFFF) + (msw >>> 16);
		msw = (a.highOrder >>> 16) + (b.highOrder >>> 16) + (c.highOrder >>> 16) + (d.highOrder >>> 16) + (lsw >>> 16);
		highOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);

		return new int64(highOrder, lowOrder);
	}

	safe_add_5(a: int64, b: int64, c: int64, d: int64, e: int64)
	{
		var lsw: number, msw: number, lowOrder: number, highOrder: number;

		lsw = (a.lowOrder & 0xFFFF) + (b.lowOrder & 0xFFFF) + (c.lowOrder & 0xFFFF) + (d.lowOrder & 0xFFFF) + (e.lowOrder & 0xFFFF);
		msw = (a.lowOrder >>> 16) + (b.lowOrder >>> 16) + (c.lowOrder >>> 16) + (d.lowOrder >>> 16) + (e.lowOrder >>> 16) + (lsw >>> 16);
		lowOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);

		lsw = (a.highOrder & 0xFFFF) + (b.highOrder & 0xFFFF) + (c.highOrder & 0xFFFF) + (d.highOrder & 0xFFFF) + (e.highOrder & 0xFFFF) + (msw >>> 16);
		msw = (a.highOrder >>> 16) + (b.highOrder >>> 16) + (c.highOrder >>> 16) + (d.highOrder >>> 16) + (e.highOrder >>> 16) + (lsw >>> 16);
		highOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);

		return new int64(highOrder, lowOrder);
	}

	maj(x: int64, y: int64, z: int64)
	{
		return new int64(
			(x.highOrder & y.highOrder) ^ (x.highOrder & z.highOrder) ^ (y.highOrder & z.highOrder),
			(x.lowOrder & y.lowOrder) ^ (x.lowOrder & z.lowOrder) ^ (y.lowOrder & z.lowOrder)
		);
	}

	ch(x: int64, y: int64, z: int64)
	{
		return new int64(
			(x.highOrder & y.highOrder) ^ (~x.highOrder & z.highOrder),
			(x.lowOrder & y.lowOrder) ^ (~x.lowOrder & z.lowOrder)
		);
	}

	rotr(x: int64, n: number)
	{
		if (n <= 32)
		{
			return new int64(
				(x.highOrder >>> n) | (x.lowOrder << (32 - n)),
				(x.lowOrder >>> n) | (x.highOrder << (32 - n))
			);
		} else
		{
			return new int64(
				(x.lowOrder >>> n) | (x.highOrder << (32 - n)),
				(x.highOrder >>> n) | (x.lowOrder << (32 - n))
			);
		}
	}

	sigma0(x: int64)
	{
		var rotr28 = this.rotr(x, 28);
		var rotr34 = this.rotr(x, 34);
		var rotr39 = this.rotr(x, 39);

		return new int64(
			rotr28.highOrder ^ rotr34.highOrder ^ rotr39.highOrder,
			rotr28.lowOrder ^ rotr34.lowOrder ^ rotr39.lowOrder
		);
	}

	sigma1(x: int64)
	{
		var rotr14 = this.rotr(x, 14);
		var rotr18 = this.rotr(x, 18);
		var rotr41 = this.rotr(x, 41);

		return new int64(
			rotr14.highOrder ^ rotr18.highOrder ^ rotr41.highOrder,
			rotr14.lowOrder ^ rotr18.lowOrder ^ rotr41.lowOrder
		);
	}

	gamma0(x: int64)
	{
		var rotr1 = this.rotr(x, 1), rotr8 = this.rotr(x, 8), shr7 = this.shr(x, 7);

		return new int64(
			rotr1.highOrder ^ rotr8.highOrder ^ shr7.highOrder,
			rotr1.lowOrder ^ rotr8.lowOrder ^ shr7.lowOrder
		);
	}

	gamma1(x: int64)
	{
		var rotr19 = this.rotr(x, 19);
		var rotr61 = this.rotr(x, 61);
		var shr6 = this.shr(x, 6);

		return new int64(
			rotr19.highOrder ^ rotr61.highOrder ^ shr6.highOrder,
			rotr19.lowOrder ^ rotr61.lowOrder ^ shr6.lowOrder
		);
	}

	shr(x: int64, n: number)
	{
		if (n <= 32)
		{
			return new int64(
				x.highOrder >>> n,
				x.lowOrder >>> n | (x.highOrder << (32 - n))
			);
		} else
		{
			return new int64(
				0,
				x.highOrder << (32 - n)
			);
		}
	}

	static hash(str: string)
	{
		SHA512.handle = new SHA512();

		var that = SHA512.handle;

		str = that.utf8_encode(str);
		var strlen = str.length * that.charsize;
		var bin = that.str2binb(str);

		bin[strlen >> 5] |= 0x80 << (24 - strlen % 32);
		bin[(((strlen + 128) >> 10) << 5) + 31] = strlen;

		for (var i = 0; i < str.length; i += 32)
		{
			that.a = that.H[0];
			that.b = that.H[1];
			that.c = that.H[2];
			that.d = that.H[3];
			that.e = that.H[4];
			that.f = that.H[5];
			that.g = that.H[6];
			that.h = that.H[7];

			for (var j = 0; j < 80; j++)
			{
				if (j < 16)
				{
					that.W[j] = new int64(bin[j * 2 + i], bin[j * 2 + i + 1]);
				} else
				{
					that.W[j] = that.safe_add_4(that.gamma1(that.W[j - 2]), that.W[j - 7], that.gamma0(that.W[j - 15]), that.W[j - 16]);
				}

				that.T1 = that.safe_add_5(that.h, that.sigma1(that.e), that.ch(that.e, that.f, that.g), that.K[j], that.W[j]);
				that.T2 = that.safe_add_2(that.sigma0(that.a), that.maj(that.a, that.b, that.c));
				that.h = that.g;
				that.g = that.f;
				that.f = that.e;
				that.e = that.safe_add_2(that.d, that.T1);
				that.d = that.c;
				that.c = that.b;
				that.b = that.a;
				that.a = that.safe_add_2(that.T1, that.T2);
			}

			that.H[0] = that.safe_add_2(that.a, that.H[0]);
			that.H[1] = that.safe_add_2(that.b, that.H[1]);
			that.H[2] = that.safe_add_2(that.c, that.H[2]);
			that.H[3] = that.safe_add_2(that.d, that.H[3]);
			that.H[4] = that.safe_add_2(that.e, that.H[4]);
			that.H[5] = that.safe_add_2(that.f, that.H[5]);
			that.H[6] = that.safe_add_2(that.g, that.H[6]);
			that.H[7] = that.safe_add_2(that.h, that.H[7]);
		}

		var binarray : number[] = [];
		for (var i = 0; i < that.H.length; i++)
		{
			binarray.push(that.H[i].highOrder);
			binarray.push(that.H[i].lowOrder);
		}
		return that.binb2hex(binarray);
	}
}
