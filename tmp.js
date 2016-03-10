
=============================

=============================


if (inst.isInit && path.length >= 1) {

    var a = path[0].trim();

    if (typeof inst.namespaces[a] !== 'object' || !!reload)
        inst.namespaces[a] = {has: inst.has(a)};
    if (typeof inst[a] !== 'object' || !!reload)
        inst[a] = inst.namespaces[a];

    if(path.length == 1)
        return inst.namespaces[a];

}

if (inst.isInit && path.length >= 2) {

    var b = path[1].trim();

    if (typeof inst.namespaces[a][b] !== 'object' || !!reload)
        inst.namespaces[a][b] = inst.label(b, {_app_: {name: b, permission: 1}});
    inst[a][b] = inst.namespaces[a][b];

    if (a === 'Controller' && inst.namespaces[a][b].construct) {
        inst.namespaces[a][b].construct.call(inst.namespaces[a][b])
    }else if (a === 'Action' && inst.namespaces[a][b].init) {
        inst.namespaces[a][b].init.call(inst.namespaces[a][b])
    }

    if(path.length == 2)
        return inst.namespaces[a][b];
}

if (inst.isInit && path.length >= 3) {

    var c = path[2].trim();

    if (typeof inst.namespaces[a][b][c] !== 'object' || !!reload)
        inst.namespaces[a][b][c] = inst.label(c, {_app_: {name: c, permission: 1}});
    inst[a][b][c] = inst.namespaces[a][b][c];

    if(path.length == 3)
        return inst.namespaces[a][b][c];
}

if (inst.isInit && path.length >= 4) {

    var d = path[3].trim();

    if (typeof inst.namespaces[a][b][c][d] !== 'object' || !!reload)
        inst.namespaces[a][b][c][d] = inst.label(d, {_app_: {name: d, permission: 1}});
    inst[a][b][c][d] = inst.namespaces[a][b][c][d];

    if(path.length == 4)
        return inst.namespaces[a][b][c][d];

}

if (inst.isInit && path.length >= 5) {

    var e = path[4].trim();

    if (typeof inst.namespaces[a][b][c][d][e] !== 'object' || !!reload)
        inst.namespaces[a][b][c][d][e] = inst.label(e, {_app_: {name: e, permission: 1}});
    inst[a][b][c][d][e] = inst.namespaces[a][b][c][d][e];

    return inst.namespaces[a][b][c][d][e];
}












=============================================================================