/* @flow */

type PRED = (_:any) => boolean;

function pipeline<A, B, C>(fn1: ((_: A) => B), fn2: ((_:B) => C) ) : ( (_:A) => C ) {
    return function(something) {
        return fn2(fn1(something));
    };
};

function kestrel<A, B>(x: B) : ((_:A) => B) {
    return function(y) {
        return x;
    };
};

function starling<A, B, C>(fun1: ((_:A, _:B) => C), fun2 : ((_:A) => B)): ((_:A) => C) {
    return function(x) {
        return fun1(x, fun2(x));
    };
};

function identity<A>(x: A) : A {
    return x;
};

function partial2<A, B, C>(fn: ( (_: A, _: B) => C), x: A) : ( (_:B) => C ) {
    return function(y) {
        return fn(x, y);
    };
};

function range(start:number, end:number, step=1) : Array<number> {
    var result = [];
    for (var i = start; i < end; i += step) {
        result.push(i);
    }
    return result;
}

function map<A, B>(fn:( (x: A) => B ), src:Array<A>) : Array<B> {
    var result = [];
    for(var i = 0; i < src.length; i++) {
        result.push(fn(src[i]));
    }
    return result;
}

function filter<A>(fn: PRED, src:Array<A>) : Array<A> {
    var result = [];
    for (var i = 0; i < src.length; i++) {
        var elem = src[i];
        if (fn(elem)) {
            result.push(elem);
        }
    }
    return result;
}

function reduce<A, B>(fn:( (x: A, acc: B) => B), init:B, src:Array<A>): B {
    var result = init;
    for (var i = 0; i < src.length; i++) {
        var elem = src[i];
        result = fn(elem, result);
    }
    return result;
}

function concat<A>(one:Array<A>, two:Array<A>): Array<A> {
    var result = [];
    var i;
    for (i = 0; i < one.length; i++) {
        result.push(one[i]);
    }
    for (i = 0; i < two.length; i++) {
        result.push(two[i]);
    }
    return result;
}

function any<A>(test : PRED, haystack: Array<A>) : boolean {
    var result = false;
    for(var i = 0; i < haystack.length; i++) {
        if (test(haystack[i])) {
            result = true;
            break;
        }
    }
    return result;
};

function negate<A>(fn : ((_:A) => boolean)) : ((_:A) => boolean) {
    return function(x) {
        return !(fn(x));
    };
};
