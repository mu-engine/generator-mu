var _ = require("lodash");

exports.nameFor = function(s) {
  if (!_.isString(s) || _.isEmpty(s.trim())) {
    throw new Error("Name is required");
  }

  return {
    kebab: _.kebabCase(s.trim()),
    constant: _.upperFirst(_.camelCase(s.trim())),
  };
}

exports.fieldsFor = function(s) {
  return _.chain(s || "")
    .split(",")
    .filter(function(e) { return !_.isEmpty(e.trim()); })
    .map(function(e) {
      var pair = e.split("=", 2);
      var lval = pair[0].split(":", 2);

      return {
        key: _.camelCase(lval[0]),
        type: (lval[1] !== undefined ? lval[1] : "any"),
        defaults: pair[1],
      };
    }).value();
}

exports.modulesFor = function(s) {
  return _.chain((s || "").trim())
    .split(",")
    .filter(function(e) { return !_.isEmpty(e.trim()); })
    .map(function(e) {
      var pair = e.split(":", 2);

      if (pair.length > 1) {
        return {
          key: _.camelCase(pair[1].trim()),
          constant: _.upperFirst(_.camelCase(pair[1].trim())),
          module: (pair[0].trim() === "." ?
                   pair[0].trim() : _.kebabCase(pair[0].trim())),
        };
      } else {
        return {
          key: _.camelCase(pair[0].trim()),
          constant: _.upperFirst(_.camelCase(pair[0].trim())),
          module: "mu-engine",
        };
      }
    }).value();
}

exports.importsFor = function(a) {
  return _.chain(a)
    .groupBy("module")
    .map(function(v,k) {
      return {
        name: k,
        list: _.uniq(_.flatten(_.map(v, "imports"))),
      };
    }).value();
}

exports.componentsFor = function(s) {
  return _.forEach(exports.modulesFor(s), function(e) {
    e.imports = [ (e.constant + "Data"), (e.constant + "Component") ];

    if (e.module === ".") {
      e.module = "../components/" + _.kebabCase(e.key) + "-component";
    }
  });
}

exports.systemsFor = function(s) {
  return _.forEach(exports.modulesFor(s), function(e) {
    e.imports = [ (e.constant + "System") ];

    if (e.module === ".") {
      e.module = "../systems/" + _.kebabCase(e.key) + "-system";
    }
  });
}

exports.parentFor = function(s) {
  if (!_.isString(s) || _.isEmpty(s.trim())) {
    s = "base";
  }

  return _.first(_.forEach(exports.modulesFor(s), function(e) {
    e.imports = [ (e.constant + "Entity") ];

    if (e.module === ".") {
      e.module = "../entities/" + _.kebabCase(e.key) + "-entity";
    }
  }));
}

