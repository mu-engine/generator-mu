const _ = require("lodash");

exports.nameFor = function(s) {
  if (!_.isString(s) || _.isEmpty(s.trim())) {
    throw new Error("Name is required");
  }

  return {
    kebab: _.kebabCase(s.trim()),
    constant: _.upperFirst(_.camelCase(s.trim())),
  };
}

// key[:type[@module]][=value]
exports.splitField = function(s) {
  const pair = s.split("=", 2);

  if (pair.length > 1) {
    return exports.splitComponent(pair[0]).concat([ pair[1] ]);
  } else {
    return exports.splitComponent(pair[0]).concat([ "" ]);
  }
}

// key[:type[@module]]
exports.splitComponent = function(s) {
  const pair = s.split(":", 2);

  return [ _.camelCase(pair[0]) ].concat(exports.splitTypeinfo(pair[1]));
}

// type[@module]
exports.splitTypeinfo = function(s) {
  if (s !== undefined) {
    const pair = s.split("@", 2);
    const type = _.upperFirst(_.camelCase(pair[0].trim()));

    if (pair.length > 1) {
      return [ type, pair[1].trim() ];
    } else if ([ "string", "number", "boolean", "date" ].includes(pair[0].trim())) {
      return [ pair[0].trim(), "" ];
    } else {
      return [ type, "mu-engine" ];
    }
  } else {
    return [ "any", "" ];
  }
}

exports.fieldsFor = function(s) {
  return _.chain(s)
    .split(",")
    .filter((e) => !_.isEmpty(e.trim()))
    .map((e) => {
      const field = exports.splitField(e);

      return {
        key: field[0],
        type: field[1],
        module: field[2],
        imports: [ field[1] ],
        defaults: field[3],
      };
    }).value();
}

exports.eventsFor = function(s) {
  return _.chain(s)
    .split(",")
    .filter((e) => !_.isEmpty(e.trim()))
    .map((e) => {
      const component = exports.splitComponent(e);

      return {
        key: _.kebabCase(component[0]),
        type: (component[1] === "any" ? "" : component[1] ),
        module: (component[2] === "." ?
                ("../events/" + _.kebabCase(component[1]) + "-event") :
                component[2]),
        imports: [ (component[1] + "Event"), (component[1] + "EventData") ],
      };
    }).value();
}

exports.componentsFor = function(s) {
  return _.chain(s)
    .split(",")
    .filter((e) => !_.isEmpty(e.trim()))
    .map((e) => {
      const typeinfo = exports.splitTypeinfo(e);

      return {
        key: _.kebabCase(typeinfo[0]),
        type: typeinfo[0],
        module: (typeinfo[1] === "." ?
                ("../components/" + _.kebabCase(typeinfo[0]) + "-component") :
                typeinfo[1]),
        imports: [ (typeinfo[0] + "Data"), (typeinfo[0] + "Component") ],
      };
    }).value();
}

exports.systemsFor = function(s) {
  return _.chain(s)
    .split(",")
    .filter((e) => !_.isEmpty(e.trim()))
    .map((e) => {
      const typeinfo = exports.splitTypeinfo(e);

      return {
        type: typeinfo[0],
        module: (typeinfo[1] === "." ?
                ("../systems/" + _.kebabCase(typeinfo[0]) + "-system") :
                typeinfo[1]),
        imports: [ (typeinfo[0] + "System") ],
      };
    }).value();
}

exports.typesFor = function(s) {
  return _.chain(s)
    .split(",")
    .filter((e) => !_.isEmpty(e.trim()))
    .map((e) => _.kebabCase(e))
    .value();
}

exports.parentFor = function(s) {
  if (!_.isString(s) || _.isEmpty(s.trim())) {
    return {
      type: "",
      module: "mu-engine",
      imports: [ "Entity" ],
    };
  } else {
    const typeinfo = exports.splitTypeinfo(s);

    return {
      type: typeinfo[0],
      module: (typeinfo[1] === "." ?
              ("../entities/" + _.kebabCase(typeinfo[0]) + "-entity") :
              typeinfo[1]),
      imports: [ (typeinfo[0] + "Entity"), (typeinfo[0] + "EntityConfig") ],
    };
  }
}

exports.importsFor = function(a) {
  return _.chain(a)
    .groupBy("module")
    .map((v,k) => {
      return {
        name: k,
        list: _.uniq(_.flatten(_.map(v, "imports"))),
      };
    }).filter((e) => !_.isEmpty(e.name.trim()))
    .value();
}

