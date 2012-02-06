var ClientHash = function(){}

ClientHash.prototype.putClientHash = function(name, value, domain, path, secure) {
    document.cookie = name + '=' + value +
	    ((domain) ? '; domain=' + domain : '') +
        ((path) ? '; path=' + path : '; path=/') +
        ((secure) ? '; Secure' : '');
}


ClientHash.prototype.getClientHash = function(name) {
    var dc = document.cookie;
    var prefix = name + '=';
    var begin = dc.indexOf('; ' + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    } else {
        begin += 2;
    }
    var end = document.cookie.indexOf(';', begin);
    if (end == -1) {
        end = dc.length;
    }
    return unescape(dc.substring(begin + prefix.length, end));
}

ClientHash.prototype.needsClientHash = function(hashName, hashValue, clientSrc, nextPage) {

    var clientHash = ClientHash.prototype.getClientHash(hashName);
        
    var needsClientHash = clientHash == hashValue;
    
    if (!needsClientHash) {
        var currLoc = unescape(window.location.href);
        var index = currLoc.indexOf(hashValue, 0);
        needsClientHash = index > -1;
    }

    if (!needsClientHash) {
        window.location.href = nextPage + '&winLoc=' + window.location + '&c=' + clientHash + '&s=' + hashValue + '&cs=' + clientSrc;
    }

    return needsClientHash;
}

