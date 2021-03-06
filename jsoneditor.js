/**
 * @name JSON Editor
 * @description JSON Schema Based Editor
 * Deprecation notice
 * This repo is no longer maintained (see also https://github.com/jdorn/json-editor/issues/800)
 * Development is continued at https://github.com/json-editor/json-editor
 * For details please visit https://github.com/json-editor/json-editor/issues/5
 * @version {{ VERSION }}
 * @author Jeremy Dorn
 * @see https://github.com/jdorn/json-editor/
 * @see https://github.com/json-editor/json-editor
 * @license MIT
 * @example see README.md and docs/ for requirements, examples and usage info
 */
!function(a,b){"use strict";var c=b(a);"object"==typeof module&&null!=module&&module.exports?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):a.JSONEditor=c}("undefined"!=typeof window?window:this,function(a,b){/*jshint loopfunc: true */
    /* Simple JavaScript Inheritance
     * By John Resig http://ejohn.org/
     * MIT Licensed.
     */
    // Inspired by base2 and Prototype
    var c;!function(){var a=!1,b=/xyz/.test(function(){window.postMessage("xyz")})?/\b_super\b/:/.*/;
    // The base Class implementation (does nothing)
    // Create a new Class that inherits from this class
    return c=function(){},c.extend=function d(c){
    // The dummy class constructor
    function e(){
    // All construction is actually done in the init method
    !a&&this.init&&this.init.apply(this,arguments)}var f=this.prototype;
    // Instantiate a base class (but only create the instance,
    // don't run the init constructor)
    a=!0;var g=new this;a=!1;
    // Copy the properties over onto the new prototype
    for(var h in c)
    // Check if we're overwriting an existing function
    g[h]="function"==typeof c[h]&&"function"==typeof f[h]&&b.test(c[h])?function(a,b){return function(){var c=this._super;
    // Add a new ._super() method that is the same method
    // but on the super-class
    this._super=f[a];
    // The method only need to be bound temporarily, so we
    // remove it when we're done executing
    var d=b.apply(this,arguments);return this._super=c,d}}(h,c[h]):c[h];
    // Populate our constructed prototype object
    // Enforce the constructor to be what we expect
    // And make this class extendable
    return e.prototype=g,e.prototype.constructor=e,e.extend=d,e},c}(),
    // CustomEvent constructor polyfill
    // From MDN
    function(){function a(a,c){c=c||{bubbles:!1,cancelable:!1,detail:b};var d=document.createEvent("CustomEvent");return d.initCustomEvent(a,c.bubbles,c.cancelable,c.detail),d}a.prototype=window.Event.prototype,window.CustomEvent=a}(),
    // requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
    // MIT license
    function(){for(var a=0,b=["ms","moz","webkit","o"],c=0;c<b.length&&!window.requestAnimationFrame;++c)window.requestAnimationFrame=window[b[c]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[b[c]+"CancelAnimationFrame"]||window[b[c]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(b,c){var d=(new Date).getTime(),e=Math.max(0,16-(d-a)),f=window.setTimeout(function(){b(d+e)},e);return a=d+e,f}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(a){clearTimeout(a)})}(),
    // Array.isArray polyfill
    // From MDN
    function(){Array.isArray||(Array.isArray=function(a){return"[object Array]"===Object.prototype.toString.call(a)})}();/**
     * Taken from jQuery 2.1.3
     *
     * @param obj
     * @returns {boolean}
     */
    var d=function(a){
    // Not plain objects:
    // - Any object or value whose internal [[Class]] property is not "[object Object]"
    // - DOM nodes
    // - window
    // Not plain objects:
    // - Any object or value whose internal [[Class]] property is not "[object Object]"
    // - DOM nodes
    // - window
    return!("object"!=typeof a||a.nodeType||null!==a&&a===a.window)&&!(a.constructor&&!Object.prototype.hasOwnProperty.call(a.constructor.prototype,"isPrototypeOf"))},e=function(a){var b,c,f;for(c=1;c<arguments.length;c++){b=arguments[c];for(f in b)b.hasOwnProperty(f)&&(b[f]&&d(b[f])?(a.hasOwnProperty(f)||(a[f]={}),e(a[f],b[f])):a[f]=b[f])}return a},f=function(a,b){if(a&&"object"==typeof a){var c;if(Array.isArray(a)||"number"==typeof a.length&&a.length>0&&a.length-1 in a){for(c=0;c<a.length;c++)if(b(c,a[c])===!1)return}else if(Object.keys){var d=Object.keys(a);for(c=0;c<d.length;c++)if(b(d[c],a[d[c]])===!1)return}else for(c in a)if(a.hasOwnProperty(c)&&b(c,a[c])===!1)return}},g=function(a,b){var c=document.createEvent("HTMLEvents");c.initEvent(b,!0,!0),a.dispatchEvent(c)},h=function(a,b){if(!(a instanceof Element))throw new Error("element should be an instance of Element");b=e({},h.defaults.options,b||{}),this.element=a,this.options=b,this.init()};h.prototype={
    // necessary since we remove the ctor property by doing a literal assignment. Without this
    // the $isplainobject function will think that this is a plain object.
    constructor:h,init:function(){var a=this;this.ready=!1,this.copyClipboard=null;var b=h.defaults.themes[this.options.theme||h.defaults.theme];if(!b)throw"Unknown theme "+(this.options.theme||h.defaults.theme);this.schema=this.options.schema,this.theme=new b,this.template=this.options.template,this.refs=this.options.refs||{},this.uuid=0,this.__data={};var c=h.defaults.iconlibs[this.options.iconlib||h.defaults.iconlib];c&&(this.iconlib=new c),this.root_container=this.theme.getContainer(),this.element.appendChild(this.root_container),this.translate=this.options.translate||h.defaults.translate,
    // Fetch all external refs via ajax
    this._loadExternalRefs(this.schema,function(){a._getDefinitions(a.schema);
    // Validator options
    var b={};a.options.custom_validators&&(b.custom_validators=a.options.custom_validators),a.validator=new h.Validator(a,null,b);
    // Create the root editor
    var c=a.expandRefs(a.schema),d=a.getEditorClass(c);a.root=a.createEditor(d,{jsoneditor:a,schema:c,required:!0,container:a.root_container}),a.root.preBuild(),a.root.build(),a.root.postBuild(),
    // Starting data
    a.options.hasOwnProperty("startval")&&a.root.setValue(a.options.startval),a.validation_results=a.validator.validate(a.root.getValue()),a.root.showValidationErrors(a.validation_results),a.ready=!0,
    // Fire ready event asynchronously
    window.requestAnimationFrame(function(){a.ready&&(a.validation_results=a.validator.validate(a.root.getValue()),a.root.showValidationErrors(a.validation_results),a.trigger("ready"),a.trigger("change"))})})},getValue:function(){if(!this.ready)throw"JSON Editor not ready yet.  Listen for 'ready' event before getting the value";return this.root.getValue()},setValue:function(a){if(!this.ready)throw"JSON Editor not ready yet.  Listen for 'ready' event before setting the value";return this.root.setValue(a),this},validate:function(a){if(!this.ready)throw"JSON Editor not ready yet.  Listen for 'ready' event before validating";
    // Custom value
    // Custom value
    return 1===arguments.length?this.validator.validate(a):this.validation_results},destroy:function(){this.destroyed||this.ready&&(this.schema=null,this.options=null,this.root.destroy(),this.root=null,this.root_container=null,this.validator=null,this.validation_results=null,this.theme=null,this.iconlib=null,this.template=null,this.__data=null,this.ready=!1,this.element.innerHTML="",this.destroyed=!0)},on:function(a,b){return this.callbacks=this.callbacks||{},this.callbacks[a]=this.callbacks[a]||[],this.callbacks[a].push(b),this},off:function(a,b){
    // Specific callback
    if(a&&b){this.callbacks=this.callbacks||{},this.callbacks[a]=this.callbacks[a]||[];for(var c=[],d=0;d<this.callbacks[a].length;d++)this.callbacks[a][d]!==b&&c.push(this.callbacks[a][d]);this.callbacks[a]=c}else a?(this.callbacks=this.callbacks||{},this.callbacks[a]=[]):this.callbacks={};return this},trigger:function(a){if(this.callbacks&&this.callbacks[a]&&this.callbacks[a].length)for(var b=0;b<this.callbacks[a].length;b++)this.callbacks[a][b].apply(this,[]);return this},setOption:function(a,b){if("show_errors"!==a)throw"Option "+a+" must be set during instantiation and cannot be changed later";return this.options.show_errors=b,this.onChange(),this},getEditorClass:function(a){var b;if(a=this.expandSchema(a),f(h.defaults.resolvers,function(c,d){var e=d(a);if(e&&h.defaults.editors[e])return b=e,!1}),!b)throw"Unknown editor for schema "+JSON.stringify(a);if(!h.defaults.editors[b])throw"Unknown editor "+b;return h.defaults.editors[b]},createEditor:function(a,b){return b=e({},a.options||{},b),new a(b)},onChange:function(){if(this.ready&&!this.firing_change){this.firing_change=!0;var a=this;return window.requestAnimationFrame(function(){a.firing_change=!1,a.ready&&(
    // Validate and cache results
    a.validation_results=a.validator.validate(a.root.getValue()),"never"!==a.options.show_errors?a.root.showValidationErrors(a.validation_results):a.root.showValidationErrors([]),
    // Fire change event
    a.trigger("change"))}),this}},compileTemplate:function(a,b){b=b||h.defaults.template;var c;
    // Specifying a preset engine
    if("string"==typeof b){if(!h.defaults.templates[b])throw"Unknown template engine "+b;if(c=h.defaults.templates[b](),!c)throw"Template engine "+b+" missing required library."}else c=b;if(!c)throw"No template engine set";if(!c.compile)throw"Invalid template engine set";return c.compile(a)},_data:function(a,b,c){
    // Setting data
    if(3!==arguments.length)
    // No data stored
    // No data stored
    return a.hasAttribute("data-jsoneditor-"+b)?this.__data[a.getAttribute("data-jsoneditor-"+b)]:null;var d;a.hasAttribute("data-jsoneditor-"+b)?d=a.getAttribute("data-jsoneditor-"+b):(d=this.uuid++,a.setAttribute("data-jsoneditor-"+b,d)),this.__data[d]=c},registerEditor:function(a){return this.editors=this.editors||{},this.editors[a.path]=a,this},unregisterEditor:function(a){return this.editors=this.editors||{},this.editors[a.path]=null,this},getEditor:function(a){if(this.editors)return this.editors[a]},watch:function(a,b){return this.watchlist=this.watchlist||{},this.watchlist[a]=this.watchlist[a]||[],this.watchlist[a].push(b),this},unwatch:function(a,b){if(!this.watchlist||!this.watchlist[a])return this;
    // If removing all callbacks for a path
    if(!b)return this.watchlist[a]=null,this;for(var c=[],d=0;d<this.watchlist[a].length;d++)this.watchlist[a][d]!==b&&c.push(this.watchlist[a][d]);return this.watchlist[a]=c.length?c:null,this},notifyWatchers:function(a){if(!this.watchlist||!this.watchlist[a])return this;for(var b=0;b<this.watchlist[a].length;b++)this.watchlist[a][b]()},isEnabled:function(){return!this.root||this.root.isEnabled()},enable:function(){this.root.enable()},disable:function(){this.root.disable()},_getDefinitions:function(a,b){if(b=b||"#/definitions/",a.definitions)for(var c in a.definitions)a.definitions.hasOwnProperty(c)&&(this.refs[b+c]=a.definitions[c],a.definitions[c].definitions&&this._getDefinitions(a.definitions[c],b+c+"/definitions/"))},_getExternalRefs:function(a){var b={},c=function(a){for(var c in a)a.hasOwnProperty(c)&&(b[c]=!0)};a.$ref&&"object"!=typeof a.$ref&&"#"!==a.$ref.substr(0,1)&&!this.refs[a.$ref]&&(b[a.$ref]=!0);for(var d in a)if(a.hasOwnProperty(d))if(a[d]&&"object"==typeof a[d]&&Array.isArray(a[d]))for(var e=0;e<a[d].length;e++)a[d][e]&&"object"==typeof a[d][e]&&c(this._getExternalRefs(a[d][e]));else a[d]&&"object"==typeof a[d]&&c(this._getExternalRefs(a[d]));return b},_getFileBase:function(){var a=this.options.ajaxBase;return"undefined"==typeof a&&(a=this._getFileBaseFromFileLocation(document.location.toString())),a},_getFileBaseFromFileLocation:function(a){var b=a.split("/");return b.pop(),b.join("/")+"/"},_loadExternalRefs:function(a,b,c){c=c||this._getFileBase();var d=this,e=this._getExternalRefs(a),g=0,h=0,i=!1;f(e,function(a){if(!d.refs[a]){if(!d.options.ajax)throw"Must set ajax option to true to load external ref "+a;d.refs[a]="loading",h++;var e=a;c!=a.substr(0,c.length)&&"http"!=a.substr(0,4)&&"/"!=a.substr(0,1)&&(e=c+a);var f=new XMLHttpRequest;f.open("GET",e,!0),d.options.ajaxCredentials&&(f.withCredentials=d.options.ajaxCredentials),f.onreadystatechange=function(){if(4==f.readyState){
    // Request succeeded
    if(200!==f.status)throw window.console.log(f),"Failed to fetch ref via ajax- "+a;var c;try{c=JSON.parse(f.responseText)}catch(j){throw window.console.log(j),"Failed to parse external ref "+e}if(!c||"object"!=typeof c)throw"External ref does not contain a valid schema - "+e;d.refs[a]=c,d._loadExternalRefs(c,function(){g++,g>=h&&!i&&(i=!0,b())},d._getFileBaseFromFileLocation(e))}},f.send()}}),h||b()},expandRefs:function(a){for(a=e({},a);a.$ref;){var b=a.$ref;delete a.$ref,this.refs[b]||(b=decodeURIComponent(b)),a=this.extendSchemas(a,this.refs[b])}return a},expandSchema:function(a){var b,c=this,d=e({},a);
    // allOf schemas should be merged into the parent
    if(
    // Version 3 `type`
    "object"==typeof a.type&&(
    // Array of types
    Array.isArray(a.type)?f(a.type,function(b,d){
    // Schema
    "object"==typeof d&&(a.type[b]=c.expandSchema(d))}):a.type=c.expandSchema(a.type)),
    // Version 3 `disallow`
    "object"==typeof a.disallow&&(
    // Array of types
    Array.isArray(a.disallow)?f(a.disallow,function(b,d){
    // Schema
    "object"==typeof d&&(a.disallow[b]=c.expandSchema(d))}):a.disallow=c.expandSchema(a.disallow)),
    // Version 4 `anyOf`
    a.anyOf&&f(a.anyOf,function(b,d){a.anyOf[b]=c.expandSchema(d)}),
    // Version 4 `dependencies` (schema dependencies)
    a.dependencies&&f(a.dependencies,function(b,d){"object"!=typeof d||Array.isArray(d)||(a.dependencies[b]=c.expandSchema(d))}),
    // Version 4 `not`
    a.not&&(a.not=this.expandSchema(a.not)),a.allOf){for(b=0;b<a.allOf.length;b++)d=this.extendSchemas(d,this.expandSchema(a.allOf[b]));delete d.allOf}
    // extends schemas should be merged into parent
    if(a["extends"]){
    // If extends is a schema
    if(Array.isArray(a["extends"]))for(b=0;b<a["extends"].length;b++)d=this.extendSchemas(d,this.expandSchema(a["extends"][b]));else d=this.extendSchemas(d,this.expandSchema(a["extends"]));delete d["extends"]}
    // parent should be merged into oneOf schemas
    if(a.oneOf){var g=e({},d);for(delete g.oneOf,b=0;b<a.oneOf.length;b++)d.oneOf[b]=this.extendSchemas(this.expandSchema(a.oneOf[b]),g)}return this.expandRefs(d)},extendSchemas:function(a,b){a=e({},a),b=e({},b);var c=this,d={};
    // Properties in obj2 that aren't in obj1
    return f(a,function(a,e){
    // If this key is also defined in obj2, merge them
    "undefined"!=typeof b[a]?
    // Required and defaultProperties arrays should be unioned together
    "required"!==a&&"defaultProperties"!==a||"object"!=typeof e||!Array.isArray(e)?"type"!==a||"string"!=typeof e&&!Array.isArray(e)?"object"==typeof e&&Array.isArray(e)?d[a]=e.filter(function(c){return b[a].indexOf(c)!==-1}):"object"==typeof e&&null!==e?d[a]=c.extendSchemas(e,b[a]):d[a]=e:(
    // Make sure we're dealing with arrays
    "string"==typeof e&&(e=[e]),"string"==typeof b.type&&(b.type=[b.type]),
    // If type is only defined in the first schema, keep it
    b.type&&b.type.length?d.type=e.filter(function(a){return b.type.indexOf(a)!==-1}):d.type=e,
    // If there's only 1 type and it's a primitive, use a string instead of array
    1===d.type.length&&"string"==typeof d.type[0]?d.type=d.type[0]:0===d.type.length&&delete d.type):
    // Union arrays and unique
    d[a]=e.concat(b[a]).reduce(function(a,b){return a.indexOf(b)<0&&a.push(b),a},[]):d[a]=e}),f(b,function(b,c){"undefined"==typeof a[b]&&(d[b]=c)}),d},setCopyClipboardContents:function(a){this.copyClipboard=a},getCopyClipboardContents:function(){return this.copyClipboard}},h.defaults={themes:{},templates:{},iconlibs:{},editors:{},languages:{},resolvers:[],custom_validators:[]},h.Validator=c.extend({init:function(a,b,c){this.jsoneditor=a,this.schema=b||this.jsoneditor.schema,this.options=c||{},this.translate=this.jsoneditor.translate||h.defaults.translate},validate:function(a){return this._validateSchema(this.schema,a)},_validateSchema:function(a,c,d){var g,i,j,k=this,l=[],m=JSON.stringify(c);/*
         * Type Agnostic Validation
         */
    // Version 3 `required` and `required_by_default`
    if(d=d||"root",
    // Work on a copy of the schema
    a=e({},this.jsoneditor.expandRefs(a)),"undefined"==typeof c)return("undefined"!=typeof a.required&&a.required===!0||"undefined"==typeof a.required&&this.jsoneditor.options.required_by_default===!0)&&l.push({path:d,property:"required",message:this.translate("error_notset")}),l;
    // `enum`
    if(a["enum"]){for(g=!1,i=0;i<a["enum"].length;i++)m===JSON.stringify(a["enum"][i])&&(g=!0);g||l.push({path:d,property:"enum",message:this.translate("error_enum")})}
    // `extends` (version 3)
    if(a["extends"])for(i=0;i<a["extends"].length;i++)l=l.concat(this._validateSchema(a["extends"][i],c,d));
    // `allOf`
    if(a.allOf)for(i=0;i<a.allOf.length;i++)l=l.concat(this._validateSchema(a.allOf[i],c,d));
    // `anyOf`
    if(a.anyOf){for(g=!1,i=0;i<a.anyOf.length;i++)if(!this._validateSchema(a.anyOf[i],c,d).length){g=!0;break}g||l.push({path:d,property:"anyOf",message:this.translate("error_anyOf")})}
    // `oneOf`
    if(a.oneOf){g=0;var n=[];for(i=0;i<a.oneOf.length;i++){
    // Set the error paths to be path.oneOf[i].rest.of.path
    var o=this._validateSchema(a.oneOf[i],c,d);for(o.length||g++,j=0;j<o.length;j++)o[j].path=d+".oneOf["+i+"]"+o[j].path.substr(d.length);n=n.concat(o)}1!==g&&(l.push({path:d,property:"oneOf",message:this.translate("error_oneOf",[g])}),l=l.concat(n))}
    // `type` (both Version 3 and Version 4 support)
    if(
    // `not`
    a.not&&(this._validateSchema(a.not,c,d).length||l.push({path:d,property:"not",message:this.translate("error_not")})),a.type)
    // Union type
    if(Array.isArray(a.type)){for(g=!1,i=0;i<a.type.length;i++)if(this._checkType(a.type[i],c)){g=!0;break}g||l.push({path:d,property:"type",message:this.translate("error_type_union")})}else["date","time","datetime-local"].indexOf(a.format)!=-1&&"integer"==a.type?
    // Hack to get validator to validate as string even if value is integer
    // As validation of 'date', 'time', 'datetime-local' is done in separate validator
    this._checkType("string",""+c)||l.push({path:d,property:"type",message:this.translate("error_type",[a.format])}):this._checkType(a.type,c)||l.push({path:d,property:"type",message:this.translate("error_type",[a.type])});
    // `disallow` (version 3)
    if(a.disallow)
    // Union type
    if(Array.isArray(a.disallow)){for(g=!0,i=0;i<a.disallow.length;i++)if(this._checkType(a.disallow[i],c)){g=!1;break}g||l.push({path:d,property:"disallow",message:this.translate("error_disallow_union")})}else this._checkType(a.disallow,c)&&l.push({path:d,property:"disallow",message:this.translate("error_disallow",[a.disallow])});/*
         * Type Specific Validation
         */
    // Number Specific Validation
    if("number"==typeof c){
    // `multipleOf` and `divisibleBy`
    if(a.multipleOf||a.divisibleBy){var p=a.multipleOf||a.divisibleBy;
    // Vanilla JS, prone to floating point rounding errors (e.g. 1.14 / .01 == 113.99999)
    g=c/p===Math.floor(c/p),
    // Use math.js is available
    window.math?g=window.math.mod(window.math.bignumber(c),window.math.bignumber(p)).equals(0):window.Decimal&&(g=new window.Decimal(c).mod(new window.Decimal(p)).equals(0)),g||l.push({path:d,property:a.multipleOf?"multipleOf":"divisibleBy",message:this.translate("error_multipleOf",[p])})}
    // `maximum`
    a.hasOwnProperty("maximum")&&(
    // Vanilla JS, prone to floating point rounding errors (e.g. .999999999999999 == 1)
    g=a.exclusiveMaximum?c<a.maximum:c<=a.maximum,
    // Use math.js is available
    window.math?g=window.math[a.exclusiveMaximum?"smaller":"smallerEq"](window.math.bignumber(c),window.math.bignumber(a.maximum)):window.Decimal&&(g=new window.Decimal(c)[a.exclusiveMaximum?"lt":"lte"](new window.Decimal(a.maximum))),g||l.push({path:d,property:"maximum",message:this.translate(a.exclusiveMaximum?"error_maximum_excl":"error_maximum_incl",[a.maximum])})),
    // `minimum`
    a.hasOwnProperty("minimum")&&(
    // Vanilla JS, prone to floating point rounding errors (e.g. .999999999999999 == 1)
    g=a.exclusiveMinimum?c>a.minimum:c>=a.minimum,
    // Use math.js is available
    window.math?g=window.math[a.exclusiveMinimum?"larger":"largerEq"](window.math.bignumber(c),window.math.bignumber(a.minimum)):window.Decimal&&(g=new window.Decimal(c)[a.exclusiveMinimum?"gt":"gte"](new window.Decimal(a.minimum))),g||l.push({path:d,property:"minimum",message:this.translate(a.exclusiveMinimum?"error_minimum_excl":"error_minimum_incl",[a.minimum])}))}else if("string"==typeof c)
    // `maxLength`
    a.maxLength&&(c+"").length>a.maxLength&&l.push({path:d,property:"maxLength",message:this.translate("error_maxLength",[a.maxLength])}),
    // `minLength`
    a.minLength&&(c+"").length<a.minLength&&l.push({path:d,property:"minLength",message:this.translate(1===a.minLength?"error_notempty":"error_minLength",[a.minLength])}),
    // `pattern`
    a.pattern&&(new RegExp(a.pattern).test(c)||l.push({path:d,property:"pattern",message:this.translate("error_pattern",[a.pattern])}));else if("object"==typeof c&&null!==c&&Array.isArray(c)){
    // `items` and `additionalItems`
    if(a.items)
    // `items` is an array
    if(Array.isArray(a.items))for(i=0;i<c.length;i++)
    // If this item has a specific schema tied to it
    // Validate against it
    if(a.items[i])l=l.concat(this._validateSchema(a.items[i],c[i],d+"."+i));else{if(a.additionalItems===!0)break;if(!a.additionalItems){if(a.additionalItems===!1){l.push({path:d,property:"additionalItems",message:this.translate("error_additionalItems")});break}break}l=l.concat(this._validateSchema(a.additionalItems,c[i],d+"."+i))}else
    // Each item in the array must validate against the schema
    for(i=0;i<c.length;i++)l=l.concat(this._validateSchema(a.items,c[i],d+"."+i));
    // `uniqueItems`
    if(
    // `maxItems`
    a.maxItems&&c.length>a.maxItems&&l.push({path:d,property:"maxItems",message:this.translate("error_maxItems",[a.maxItems])}),
    // `minItems`
    a.minItems&&c.length<a.minItems&&l.push({path:d,property:"minItems",message:this.translate("error_minItems",[a.minItems])}),a.uniqueItems){var q={};for(i=0;i<c.length;i++){if(g=JSON.stringify(c[i]),q[g]){l.push({path:d,property:"uniqueItems",message:this.translate("error_uniqueItems")});break}q[g]=!0}}}else if("object"==typeof c&&null!==c){
    // `maxProperties`
    if(a.maxProperties){g=0;for(i in c)c.hasOwnProperty(i)&&g++;g>a.maxProperties&&l.push({path:d,property:"maxProperties",message:this.translate("error_maxProperties",[a.maxProperties])})}
    // `minProperties`
    if(a.minProperties){g=0;for(i in c)c.hasOwnProperty(i)&&g++;g<a.minProperties&&l.push({path:d,property:"minProperties",message:this.translate("error_minProperties",[a.minProperties])})}
    // Version 4 `required`
    if("undefined"!=typeof a.required&&Array.isArray(a.required))for(i=0;i<a.required.length;i++)"undefined"==typeof c[a.required[i]]&&l.push({path:d,property:"required",message:this.translate("error_required",[a.required[i]])});
    // `properties`
    var r={};for(i in a.properties)a.properties.hasOwnProperty(i)&&(r[i]=!0,l=l.concat(this._validateSchema(a.properties[i],c[i],d+"."+i)));
    // `patternProperties`
    if(a.patternProperties)for(i in a.patternProperties)if(a.patternProperties.hasOwnProperty(i)){var s=new RegExp(i);
    // Check which properties match
    for(j in c)c.hasOwnProperty(j)&&s.test(j)&&(r[j]=!0,l=l.concat(this._validateSchema(a.patternProperties[i],c[j],d+"."+j)))}
    // `additionalProperties`
    if(
    // The no_additional_properties option currently doesn't work with extended schemas that use oneOf or anyOf
    "undefined"!=typeof a.additionalProperties||!this.jsoneditor.options.no_additional_properties||a.oneOf||a.anyOf||(a.additionalProperties=!1),"undefined"!=typeof a.additionalProperties)for(i in c)if(c.hasOwnProperty(i)&&!r[i]){
    // No extra properties allowed
    if(!a.additionalProperties){l.push({path:d,property:"additionalProperties",message:this.translate("error_additional_properties",[i])});break}if(a.additionalProperties===!0)break;l=l.concat(this._validateSchema(a.additionalProperties,c[i],d+"."+i))}
    // `dependencies`
    if(a.dependencies)for(i in a.dependencies)if(a.dependencies.hasOwnProperty(i)&&"undefined"!=typeof c[i])
    // Property dependency
    if(Array.isArray(a.dependencies[i]))for(j=0;j<a.dependencies[i].length;j++)"undefined"==typeof c[a.dependencies[i][j]]&&l.push({path:d,property:"dependencies",message:this.translate("error_dependency",[a.dependencies[i][j]])});else l=l.concat(this._validateSchema(a.dependencies[i],c,d))}
    // date, time and datetime-local validation
    if(["date","time","datetime-local"].indexOf(a.format)!=-1){var t={date:/^(\d{4}\D\d{2}\D\d{2})?$/,time:/^(\d{2}:\d{2}(?::\d{2})?)?$/,"datetime-local":/^(\d{4}\D\d{2}\D\d{2} \d{2}:\d{2}(?::\d{2})?)?$/},u={date:'"YYYY-MM-DD"',time:'"HH:MM"',"datetime-local":'"YYYY-MM-DD HH:MM"'},v=this.jsoneditor.getEditor(d),w=v.flatpickr?v.flatpickr.config.dateFormat:u[v.format];if("integer"==a.type)
    // The value is a timestamp
    1*c<1?
    // If value is less than 1, then it's an invalid epoch date before 00:00:00 UTC Thursday, 1 January 1970
    l.push({path:d,property:"format",message:this.translate("error_invalid_epoch")}):c!=Math.abs(parseInt(c))&&
    // not much to check for, so we assume value is ok if it's a positive number
    l.push({path:d,property:"format",message:this.translate("error_"+v.format.replace(/-/g,"_"),[w])});else if(v.flatpickr){
    // Flatpickr validation
    if(""!==c){var x;if("single"!=v.flatpickr.config.mode){var y="range"==v.flatpickr.config.mode?v.flatpickr.l10n.rangeSeparator:", ",z=v.flatpickr.selectedDates.map(function(a){return v.flatpickr.formatDate(a,v.flatpickr.config.dateFormat)});x=z.join(y)}try{if(x){
    // Not the best validation method, but range and multiple mode are special
    // Optimal solution would be if it is possible to change the return format from string/integer to array
    if(x!=c)throw v.flatpickr.config.mode+" mismatch"}else if(v.flatpickr.formatDate(v.flatpickr.parseDate(c,v.flatpickr.config.dateFormat),v.flatpickr.config.dateFormat)!=c)throw"mismatch"}catch(A){var B=v.flatpickr.config.errorDateFormat!==b?v.flatpickr.config.errorDateFormat:v.flatpickr.config.dateFormat;l.push({path:d,property:"format",message:this.translate("error_"+v.format.replace(/-/g,"_"),[B])})}}}else
    // Standard string input, without flatpickr
    t[v.format].test(c)||l.push({path:d,property:"format",message:this.translate("error_"+v.format.replace(/-/g,"_"),[u[v.format]])})}
    // Custom type validation (global)
    // Custom type validation (instance specific)
    return f(h.defaults.custom_validators,function(b,e){l=l.concat(e.call(k,a,c,d))}),this.options.custom_validators&&f(this.options.custom_validators,function(b,e){l=l.concat(e.call(k,a,c,d))}),l},_checkType:function(a,b){
    // Simple types
    // Simple types
    return"string"==typeof a?"string"===a?"string"==typeof b:"number"===a?"number"==typeof b:"integer"===a?"number"==typeof b&&b===Math.floor(b):"boolean"===a?"boolean"==typeof b:"array"===a?Array.isArray(b):"object"===a?null!==b&&!Array.isArray(b)&&"object"==typeof b:"null"!==a||null===b:!this._validateSchema(a,b).length}}),/**
     * All editors should extend from this class
     */
    h.AbstractEditor=c.extend({onChildEditorChange:function(a){this.onChange(!0)},notify:function(){this.path&&this.jsoneditor.notifyWatchers(this.path)},change:function(){this.parent?this.parent.onChildEditorChange(this):this.jsoneditor&&this.jsoneditor.onChange()},onChange:function(a){this.notify(),this.watch_listener&&this.watch_listener(),a&&this.change()},register:function(){this.jsoneditor.registerEditor(this),this.onChange()},unregister:function(){this.jsoneditor&&this.jsoneditor.unregisterEditor(this)},getNumColumns:function(){return 12},init:function(a){this.jsoneditor=a.jsoneditor,this.theme=this.jsoneditor.theme,this.template_engine=this.jsoneditor.template,this.iconlib=this.jsoneditor.iconlib,this.translate=this.jsoneditor.translate||h.defaults.translate,this.original_schema=a.schema,this.schema=this.jsoneditor.expandSchema(this.original_schema),this.options=e({},this.options||{},this.schema.options||{},a.schema.options||{},a),a.path||this.schema.id||(this.schema.id="root"),this.path=a.path||"root",this.formname=a.formname||this.path.replace(/\.([^.]+)/g,"[$1]"),this.jsoneditor.options.form_name_root&&(this.formname=this.formname.replace(/^root\[/,this.jsoneditor.options.form_name_root+"[")),this.key=this.path.split(".").pop(),this.parent=a.parent,this.link_watchers=[],a.container&&this.setContainer(a.container),this.registerDependencies()},registerDependencies:function(){this.dependenciesFulfilled=!0;var a=this.options.dependencies;if(a){var b=this;Object.keys(a).forEach(function(c){var d=b.path.split(".");d[d.length-1]=c,d=d.join(".");var e=a[c];b.jsoneditor.watch(d,function(){b.checkDependency(d,e)})})}},checkDependency:function(a,c){var d=this.control||this.container;if(this.path!==a&&d){var e=this,f=this.jsoneditor.getEditor(a),g=f?f.getValue():b,h=this.dependenciesFulfilled;this.dependenciesFulfilled=!1,f&&f.dependenciesFulfilled?Array.isArray(c)?c.some(function(a){if(g===a)return e.dependenciesFulfilled=!0,!0}):"object"==typeof c?"object"!=typeof g?this.dependenciesFulfilled=c===g:Object.keys(c).some(function(a){return!!c.hasOwnProperty(a)&&(g.hasOwnProperty(a)&&c[a]===g[a]?void(e.dependenciesFulfilled=!0):(e.dependenciesFulfilled=!1,!0))}):"string"==typeof c||"number"==typeof c?this.dependenciesFulfilled=g===c:"boolean"==typeof c&&(c?this.dependenciesFulfilled=g&&g.length>0:this.dependenciesFulfilled=!g||0===g.length):this.dependenciesFulfilled=!1,this.dependenciesFulfilled!==h&&this.notify(),this.dependenciesFulfilled?d.style.display="block":d.style.display="none"}},setContainer:function(a){this.container=a,this.schema.id&&this.container.setAttribute("data-schemaid",this.schema.id),this.schema.type&&"string"==typeof this.schema.type&&this.container.setAttribute("data-schematype",this.schema.type),this.container.setAttribute("data-schemapath",this.path)},preBuild:function(){},build:function(){},postBuild:function(){this.setupWatchListeners(),this.addLinks(),this.setValue(this.getDefault(),!0),this.updateHeaderText(),this.register(),this.onWatchedFieldChange()},setupWatchListeners:function(){var a=this;if(
    // Watched fields
    this.watched={},this.schema.vars&&(this.schema.watch=this.schema.vars),this.watched_values={},this.watch_listener=function(){a.refreshWatchedFieldValues()&&a.onWatchedFieldChange()},this.schema.hasOwnProperty("watch")){var b,c,d,e,f;for(var g in this.schema.watch)if(this.schema.watch.hasOwnProperty(g)){if(b=this.schema.watch[g],Array.isArray(b)){if(b.length<2)continue;c=[b[0]].concat(b[1].split("."))}else c=b.split("."),a.theme.closest(a.container,'[data-schemaid="'+c[0]+'"]')||c.unshift("#");if(d=c.shift(),"#"===d&&(d=a.jsoneditor.schema.id||"root"),
    // Find the root node for this template variable
    e=a.theme.closest(a.container,'[data-schemaid="'+d+'"]'),!e)throw"Could not find ancestor node with id "+d;
    // Keep track of the root node and path for use when rendering the template
    f=e.getAttribute("data-schemapath")+"."+c.join("."),a.jsoneditor.watch(f,a.watch_listener),a.watched[g]=f}}
    // Dynamic header
    this.schema.headerTemplate&&(this.header_template=this.jsoneditor.compileTemplate(this.schema.headerTemplate,this.template_engine))},addLinks:function(){
    // Add links
    if(!this.no_link_holder&&(this.link_holder=this.theme.getLinksHolder(),this.container.appendChild(this.link_holder),this.schema.links))for(var a=0;a<this.schema.links.length;a++)this.addLink(this.getLink(this.schema.links[a]))},getButton:function(a,b,c){var d="json-editor-btn-"+b;b=this.iconlib?this.iconlib.getIcon(b):null,!b&&c&&(a=c,c=null);var e=this.theme.getButton(a,b,c);return e.className+=" "+d+" ",e},setButtonText:function(a,b,c,d){return c=this.iconlib?this.iconlib.getIcon(c):null,!c&&d&&(b=d,d=null),this.theme.setButtonText(a,b,c,d)},addLink:function(a){this.link_holder&&this.link_holder.appendChild(a)},getLink:function(a){var b,c,d=a.mediaType||"application/javascript",e=d.split("/")[0],f=this.jsoneditor.compileTemplate(a.href,this.template_engine),g=this.jsoneditor.compileTemplate(a.rel?a.rel:a.href,this.template_engine),h=null;
    // Image links
    if(a.download&&(h=a.download),h&&h!==!0&&(h=this.jsoneditor.compileTemplate(h,this.template_engine)),"image"===e){b=this.theme.getBlockLinkHolder(),c=document.createElement("a"),c.setAttribute("target","_blank");var i=document.createElement("img");this.theme.createImageLink(b,c,i),
    // When a watched field changes, update the url  
    this.link_watchers.push(function(a){var b=f(a),d=g(a);c.setAttribute("href",b),c.setAttribute("title",d||b),i.setAttribute("src",b)})}else if(["audio","video"].indexOf(e)>=0){b=this.theme.getBlockLinkHolder(),c=this.theme.getBlockLink(),c.setAttribute("target","_blank");var j=document.createElement(e);j.setAttribute("controls","controls"),this.theme.createMediaLink(b,c,j),
    // When a watched field changes, update the url  
    this.link_watchers.push(function(a){var b=f(a),d=g(a);c.setAttribute("href",b),c.textContent=d||b,j.setAttribute("src",b)})}else c=b=this.theme.getBlockLink(),b.setAttribute("target","_blank"),b.textContent=a.rel,
    // When a watched field changes, update the url
    this.link_watchers.push(function(a){var c=f(a),d=g(a);b.setAttribute("href",c),b.textContent=d||c});return h&&c&&(h===!0?c.setAttribute("download",""):this.link_watchers.push(function(a){c.setAttribute("download",h(a))})),a["class"]&&(c.className=c.className+" "+a["class"]),b},refreshWatchedFieldValues:function(){if(this.watched_values){var a={},b=!1,c=this;if(this.watched){var d,e;for(var f in this.watched)this.watched.hasOwnProperty(f)&&(e=c.jsoneditor.getEditor(this.watched[f]),d=e?e.getValue():null,c.watched_values[f]!==d&&(b=!0),a[f]=d)}return a.self=this.getValue(),this.watched_values.self!==a.self&&(b=!0),this.watched_values=a,b}},getWatchedFieldValues:function(){return this.watched_values},updateHeaderText:function(){if(this.header)
    // If the header has children, only update the text node's value
    if(this.header.children.length){for(var a=0;a<this.header.childNodes.length;a++)if(3===this.header.childNodes[a].nodeType){this.header.childNodes[a].nodeValue=this.getHeaderText();break}}else this.header.textContent=this.getHeaderText()},getHeaderText:function(a){return this.header_text?this.header_text:a?this.schema.title:this.getTitle()},onWatchedFieldChange:function(){var a;if(this.header_template){a=e(this.getWatchedFieldValues(),{key:this.key,i:this.key,i0:1*this.key,i1:1*this.key+1,title:this.getTitle()});var b=this.header_template(a);b!==this.header_text&&(this.header_text=b,this.updateHeaderText(),this.notify())}if(this.link_watchers.length){a=this.getWatchedFieldValues();for(var c=0;c<this.link_watchers.length;c++)this.link_watchers[c](a)}},setValue:function(a){this.value=a},getValue:function(){return this.dependenciesFulfilled?this.value:b},refreshValue:function(){},getChildEditors:function(){return!1},destroy:function(){var a=this;this.unregister(this),f(this.watched,function(b,c){a.jsoneditor.unwatch(c,a.watch_listener)}),this.watched=null,this.watched_values=null,this.watch_listener=null,this.header_text=null,this.header_template=null,this.value=null,this.container&&this.container.parentNode&&this.container.parentNode.removeChild(this.container),this.container=null,this.jsoneditor=null,this.schema=null,this.path=null,this.key=null,this.parent=null},getDefault:function(){if("undefined"!=typeof this.schema["default"])return this.schema["default"];if("undefined"!=typeof this.schema["enum"])return this.schema["enum"][0];var a=this.schema.type||this.schema.oneOf;if(a&&Array.isArray(a)&&(a=a[0]),a&&"object"==typeof a&&(a=a.type),a&&Array.isArray(a)&&(a=a[0]),"string"==typeof a){if("number"===a)return 0;if("boolean"===a)return!1;if("integer"===a)return 0;if("string"===a)return"";if("object"===a)return{};if("array"===a)return[]}return null},getTitle:function(){return this.schema.title||this.key},enable:function(){this.disabled=!1},disable:function(){this.disabled=!0},isEnabled:function(){return!this.disabled},isRequired:function(){return"boolean"==typeof this.schema.required?this.schema.required:this.parent&&this.parent.schema&&Array.isArray(this.parent.schema.required)?this.parent.schema.required.indexOf(this.key)>-1:!!this.jsoneditor.options.required_by_default},getDisplayText:function(a){var b=[],c={};
    // Determine how many times each attribute name is used.
    // This helps us pick the most distinct display text for the schemas.
    f(a,function(a,b){b.title&&(c[b.title]=c[b.title]||0,c[b.title]++),b.description&&(c[b.description]=c[b.description]||0,c[b.description]++),b.format&&(c[b.format]=c[b.format]||0,c[b.format]++),b.type&&(c[b.type]=c[b.type]||0,c[b.type]++)}),
    // Determine display text for each element of the array
    f(a,function(a,d){var e;
    // If it's a simple string
    e="string"==typeof d?d:d.title&&c[d.title]<=1?d.title:d.format&&c[d.format]<=1?d.format:d.type&&c[d.type]<=1?d.type:d.description&&c[d.description]<=1?d.descripton:d.title?d.title:d.format?d.format:d.type?d.type:d.description?d.description:JSON.stringify(d).length<50?JSON.stringify(d):"type",b.push(e)});
    // Replace identical display text with "text 1", "text 2", etc.
    var d={};return f(b,function(a,e){d[e]=d[e]||0,d[e]++,c[e]>1&&(b[a]=e+" "+d[e])}),b},getOption:function(a){try{throw"getOption is deprecated"}catch(b){window.console.error(b)}return this.options[a]},showValidationErrors:function(a){}}),h.defaults.editors["null"]=h.AbstractEditor.extend({getValue:function(){return this.dependenciesFulfilled?null:b},setValue:function(){this.onChange()},getNumColumns:function(){return 2}}),h.defaults.editors.string=h.AbstractEditor.extend({register:function(){this._super(),this.input&&this.input.setAttribute("name",this.formname)},unregister:function(){this._super(),this.input&&this.input.removeAttribute("name")},setValue:function(a,b,c){if((!this.template||c)&&(null===a||"undefined"==typeof a?a="":"object"==typeof a?a=JSON.stringify(a):"string"!=typeof a&&(a=""+a),a!==this.serialized)){
    // Sanitize value before setting it
    var d=this.sanitize(a);if(this.input.value!==d){this.input.value=d,
    // If using SCEditor, update the WYSIWYG
    this.sceditor_instance?this.sceditor_instance.val(d):this.SimpleMDE?this.SimpleMDE.value(d):this.ace_editor&&this.ace_editor.setValue(d);var e=c||this.getValue()!==a;this.refreshValue(),b?this.is_dirty=!1:"change"===this.jsoneditor.options.show_errors&&(this.is_dirty=!0),this.adjust_height&&this.adjust_height(this.input),
    // Bubble this setValue to parents if the value changed
    this.onChange(e)}}},getNumColumns:function(){var a,b=Math.ceil(Math.max(this.getTitle().length,this.schema.maxLength||0,this.schema.minLength||0)/5);return a="textarea"===this.input_type?6:["text","email"].indexOf(this.input_type)>=0?4:2,Math.min(12,Math.max(b,a))},build:function(){var a=this;
    // Specific format
    if(this.options.compact||(this.header=this.label=this.theme.getFormInputLabel(this.getTitle())),this.schema.description&&(this.description=this.theme.getFormInputDescription(this.schema.description)),this.options.infoText&&(this.infoButton=this.theme.getInfoButton(this.options.infoText)),this.format=this.schema.format,!this.format&&this.schema.media&&this.schema.media.type&&(this.format=this.schema.media.type.replace(/(^(application|text)\/(x-)?(script\.)?)|(-source$)/g,"")),!this.format&&this.options.default_format&&(this.format=this.options.default_format),this.options.format&&(this.format=this.options.format),this.format)
    // Text Area
    if("textarea"===this.format)this.input_type="textarea",this.input=this.theme.getTextareaInput();else if("range"===this.format){this.input_type="range";var b=this.schema.minimum||0,c=this.schema.maximum||Math.max(100,b+1),d=1;this.schema.multipleOf&&(b%this.schema.multipleOf&&(b=Math.ceil(b/this.schema.multipleOf)*this.schema.multipleOf),c%this.schema.multipleOf&&(c=Math.floor(c/this.schema.multipleOf)*this.schema.multipleOf),d=this.schema.multipleOf),this.input=this.theme.getRangeInput(b,c,d)}else["actionscript","batchfile","bbcode","c","c++","cpp","coffee","csharp","css","dart","django","ejs","erlang","golang","groovy","handlebars","haskell","haxe","html","ini","jade","java","javascript","json","less","lisp","lua","makefile","markdown","matlab","mysql","objectivec","pascal","perl","pgsql","php","python","r","ruby","sass","scala","scss","smarty","sql","stylus","svg","twig","vbscript","xml","yaml"].indexOf(this.format)>=0?(this.input_type=this.format,this.source_code=!0,this.input=this.theme.getTextareaInput()):(this.input_type=this.format,this.input=this.theme.getFormInputField(this.input_type));else this.input_type="text",this.input=this.theme.getFormInputField(this.input_type);if(
    // minLength, maxLength, and pattern
    "undefined"!=typeof this.schema.maxLength&&this.input.setAttribute("maxlength",this.schema.maxLength),"undefined"!=typeof this.schema.pattern?this.input.setAttribute("pattern",this.schema.pattern):"undefined"!=typeof this.schema.minLength&&this.input.setAttribute("pattern",".{"+this.schema.minLength+",}"),this.options.compact?this.container.className+=" compact":this.options.input_width&&(this.input.style.width=this.options.input_width),(this.schema.readOnly||this.schema.readonly||this.schema.template)&&(this.always_disabled=!0,this.input.setAttribute("readonly","true")),this.schema.options&&this.schema.options.inputAttributes&&this.schema.options.inputAttributes.length>0){var e=this.input;this.schema.options.inputAttributes.forEach(function(a){e.setAttribute(a.name,a.value)})}
    // output element to display the range value when it changes or have default.
    if(this.input.addEventListener("change",function(b){
    // Don't allow changing if this field is a template
    if(b.preventDefault(),b.stopPropagation(),a.schema.template)return void(this.value=a.value);var c=this.value,d=a.sanitize(c);c!==d&&(this.value=d),a.is_dirty=!0,a.refreshValue(),a.onChange(!0)}),this.options.input_height&&(this.input.style.height=this.options.input_height),this.options.expand_height&&(this.adjust_height=function(a){if(a){var b,c=a.offsetHeight;
    // Input too short
    if(a.offsetHeight<a.scrollHeight)for(b=0;a.offsetHeight<a.scrollHeight+3&&!(b>100);)b++,c++,a.style.height=c+"px";else{for(b=0;a.offsetHeight>=a.scrollHeight+3&&!(b>100);)b++,c--,a.style.height=c+"px";a.style.height=c+1+"px"}}},this.input.addEventListener("keyup",function(b){a.adjust_height(this)}),this.input.addEventListener("change",function(b){a.adjust_height(this)}),this.adjust_height()),this.format&&this.input.setAttribute("data-schemaformat",this.format),this.control=this.theme.getFormControl(this.label,this.input,this.description,this.infoButton),"range"===this.format){var f=document.createElement("output");f.setAttribute("class","range-output"),this.control.appendChild(f),f.value=this.schema["default"],this.input.addEventListener("change",function(){f.value=a.input.value}),this.input.addEventListener("input",function(){f.value=a.input.value})}this.container.appendChild(this.control),
    // Any special formatting that needs to happen after the input is added to the dom
    window.requestAnimationFrame(function(){
    // Skip in case the input is only a temporary editor,
    // otherwise, in the case of an ace_editor creation,
    // it will generate an error trying to append it to the missing parentNode
    a.input.parentNode&&a.afterInputReady(),a.adjust_height&&a.adjust_height(a.input)}),
    // Compile and store the template
    this.schema.template?(this.template=this.jsoneditor.compileTemplate(this.schema.template,this.template_engine),this.refreshValue()):this.refreshValue()},enable:function(){this.always_disabled||(this.input.disabled=!1,
    // TODO: WYSIWYG and Markdown editors
    this._super())},disable:function(a){a&&(this.always_disabled=!0),this.input.disabled=!0,
    // TODO: WYSIWYG and Markdown editors
    this._super()},afterInputReady:function(){var a,b=this;
    // Code editor
    if(this.source_code)
    // WYSIWYG html and bbcode editor
    if(this.options.wysiwyg&&["html","bbcode"].indexOf(this.input_type)>=0&&window.jQuery&&window.jQuery.fn&&window.jQuery.fn.sceditor)a=e({},{plugins:"html"===b.input_type?"xhtml":"bbcode",emoticonsEnabled:!1,width:"100%",height:300},h.plugins.sceditor,b.options.sceditor_options||{}),window.jQuery(b.input).sceditor(a),b.sceditor_instance=window.jQuery(b.input).sceditor("instance"),b.sceditor_instance.blur(function(){
    // Get editor's value
    var a=window.jQuery("<div>"+b.sceditor_instance.val()+"</div>");
    // Remove sceditor spans/divs
    window.jQuery("#sceditor-start-marker,#sceditor-end-marker,.sceditor-nlf",a).remove(),
    // Set the value and update
    b.input.value=a.html(),b.value=b.input.value,b.is_dirty=!0,b.onChange(!0)});else if("markdown"===this.input_type&&window.SimpleMDE)a=e({},h.plugins.SimpleMDE,{element:this.input}),this.SimpleMDE=new window.SimpleMDE(a),this.SimpleMDE.codemirror.on("change",function(){b.value=b.SimpleMDE.value(),b.is_dirty=!0,b.onChange(!0)});else if(window.ace){var c=this.input_type;
    // aliases for c/cpp
    "cpp"!==c&&"c++"!==c&&"c"!==c||(c="c_cpp"),this.ace_container=document.createElement("div"),this.ace_container.style.width="100%",this.ace_container.style.position="relative",this.ace_container.style.height="400px",this.input.parentNode.insertBefore(this.ace_container,this.input),this.input.style.display="none",this.ace_editor=window.ace.edit(this.ace_container),this.ace_editor.setValue(this.getValue()),
    // The theme
    h.plugins.ace.theme&&this.ace_editor.setTheme("ace/theme/"+h.plugins.ace.theme),
    // The mode
    this.ace_editor.getSession().setMode("ace/mode/"+this.schema.format),
    // Listen for changes
    this.ace_editor.on("change",function(){var a=b.ace_editor.getValue();b.input.value=a,b.refreshValue(),b.is_dirty=!0,b.onChange(!0)})}b.theme.afterInputReady(b.input)},refreshValue:function(){this.value=this.input.value,"string"!=typeof this.value&&(this.value=""),this.serialized=this.value},destroy:function(){
    // If using SCEditor, destroy the editor instance
    this.sceditor_instance?this.sceditor_instance.destroy():this.SimpleMDE?this.SimpleMDE.destroy():this.ace_editor&&this.ace_editor.destroy(),this.template=null,this.input&&this.input.parentNode&&this.input.parentNode.removeChild(this.input),this.label&&this.label.parentNode&&this.label.parentNode.removeChild(this.label),this.description&&this.description.parentNode&&this.description.parentNode.removeChild(this.description),this._super()},/**
       * This is overridden in derivative editors
       */
    sanitize:function(a){return a},/**
       * Re-calculates the value if needed
       */
    onWatchedFieldChange:function(){var a;
    // If this editor needs to be rendered by a macro template
    this.template&&(a=this.getWatchedFieldValues(),this.setValue(this.template(a),!1,!0)),this._super()},showValidationErrors:function(a){var b=this;if("always"===this.jsoneditor.options.show_errors);else if(!this.is_dirty&&this.previous_error_setting===this.jsoneditor.options.show_errors)return;this.previous_error_setting=this.jsoneditor.options.show_errors;var c=[];f(a,function(a,d){d.path===b.path&&c.push(d.message)}),c.length?this.theme.addInputError(this.input,c.join(". ")+"."):this.theme.removeInputError(this.input)}}),/**
     * Created by Mehmet Baker on 12.04.2017
     */
    h.defaults.editors.hidden=h.AbstractEditor.extend({register:function(){this._super(),this.input&&this.input.setAttribute("name",this.formname)},unregister:function(){this._super(),this.input&&this.input.removeAttribute("name")},setValue:function(a,b,c){if((!this.template||c)&&(null===a||"undefined"==typeof a?a="":"object"==typeof a?a=JSON.stringify(a):"string"!=typeof a&&(a=""+a),a!==this.serialized)){
    // Sanitize value before setting it
    var d=this.sanitize(a);if(this.input.value!==d){this.input.value=d;var e=c||this.getValue()!==a;this.refreshValue(),b?this.is_dirty=!1:"change"===this.jsoneditor.options.show_errors&&(this.is_dirty=!0),this.adjust_height&&this.adjust_height(this.input),
    // Bubble this setValue to parents if the value changed
    this.onChange(e)}}},getNumColumns:function(){return 2},enable:function(){this._super()},disable:function(){this._super()},refreshValue:function(){this.value=this.input.value,"string"!=typeof this.value&&(this.value=""),this.serialized=this.value},destroy:function(){this.template=null,this.input&&this.input.parentNode&&this.input.parentNode.removeChild(this.input),this.label&&this.label.parentNode&&this.label.parentNode.removeChild(this.label),this.description&&this.description.parentNode&&this.description.parentNode.removeChild(this.description),this._super()},/**
       * This is overridden in derivative editors
       */
    sanitize:function(a){return a},/**
       * Re-calculates the value if needed
       */
    onWatchedFieldChange:function(){var a;
    // If this editor needs to be rendered by a macro template
    this.template&&(a=this.getWatchedFieldValues(),this.setValue(this.template(a),!1,!0)),this._super()},build:function(){this.format=this.schema.format,!this.format&&this.options.default_format&&(this.format=this.options.default_format),this.options.format&&(this.format=this.options.format),this.input_type="hidden",this.input=this.theme.getFormInputField(this.input_type),this.format&&this.input.setAttribute("data-schemaformat",this.format),this.container.appendChild(this.input),
    // Compile and store the template
    this.schema.template?(this.template=this.jsoneditor.compileTemplate(this.schema.template,this.template_engine),this.refreshValue()):this.refreshValue()}}),h.defaults.editors.number=h.defaults.editors.string.extend({build:function(){if(this._super(),"undefined"!=typeof this.schema.minimum){var a=this.schema.minimum;"undefined"!=typeof this.schema.exclusiveMinimum&&(a+=1),this.input.setAttribute("min",a)}if("undefined"!=typeof this.schema.maximum){var b=this.schema.maximum;"undefined"!=typeof this.schema.exclusiveMaximum&&(b-=1),this.input.setAttribute("max",b)}if("undefined"!=typeof this.schema.step){var c=this.schema.step||1;this.input.setAttribute("step",c)}},sanitize:function(a){return(a+"").replace(/[^0-9\.\-eE]/g,"")},getNumColumns:function(){return 2},getValue:function(){return this.dependenciesFulfilled?""===this.value?b:1*this.value:b}}),h.defaults.editors.integer=h.defaults.editors.number.extend({sanitize:function(a){return a+="",a.replace(/[^0-9\-]/g,"")},getNumColumns:function(){return 2}}),h.defaults.editors.rating=h.defaults.editors.integer.extend({build:function(){var a,b=this;this.options.compact||(this.header=this.label=this.theme.getFormInputLabel(this.getTitle())),this.schema.description&&(this.description=this.theme.getFormInputDescription(this.schema.description));
    // Dynamically add the required CSS the first time this editor is used
    var c="json-editor-style-rating",d=document.getElementById(c);if(!d){var e=document.createElement("style");e.id=c,e.type="text/css",e.innerHTML="      .rating-container {        display: inline-block;        clear: both;      }            .rating {        float:left;      }            /* :not(:checked) is a filter, so that browsers that don’t support :checked don’t         follow these rules. Every browser that supports :checked also supports :not(), so         it doesn’t make the test unnecessarily selective */      .rating:not(:checked) > input {        position:absolute;        top:-9999px;        clip:rect(0,0,0,0);      }            .rating:not(:checked) > label {        float:right;        width:1em;        padding:0 .1em;        overflow:hidden;        white-space:nowrap;        cursor:pointer;        color:#ddd;      }            .rating:not(:checked) > label:before {        content: '★ ';      }            .rating > input:checked ~ label {        color: #FFB200;      }            .rating:not([readOnly]):not(:checked) > label:hover,      .rating:not([readOnly]):not(:checked) > label:hover ~ label {        color: #FFDA00;      }            .rating:not([readOnly]) > input:checked + label:hover,      .rating:not([readOnly]) > input:checked + label:hover ~ label,      .rating:not([readOnly]) > input:checked ~ label:hover,      .rating:not([readOnly]) > input:checked ~ label:hover ~ label,      .rating:not([readOnly]) > label:hover ~ input:checked ~ label {        color: #FF8C0D;      }            .rating:not([readOnly])  > label:active {        position:relative;        top:2px;        left:2px;      }",document.getElementsByTagName("head")[0].appendChild(e)}this.input=this.theme.getFormInputField("hidden"),this.container.appendChild(this.input);
    // Required to keep height
    var g=document.createElement("div");g.className="rating-container";
    // Contains options for rating
    var h=document.createElement("div");h.setAttribute("name",this.formname),h.className="rating",g.appendChild(h),this.options.compact&&this.container.setAttribute("class",this.container.getAttribute("class")+" compact");var i=this.schema.maximum?this.schema.maximum:5;for(this.schema.exclusiveMaximum&&i--,this.inputs=[],a=i;a>0;a--){var j=this.formname+a,k=this.theme.getFormInputField("radio");k.setAttribute("id",j),k.setAttribute("value",a),k.setAttribute("name",this.formname),h.appendChild(k),this.inputs.push(k);var l=document.createElement("label");l.setAttribute("for",j),l.appendChild(document.createTextNode(a+(1==a?" star":" stars"))),h.appendChild(l)}(this.schema.readOnly||this.schema.readonly)&&(this.always_disabled=!0,f(this.inputs,function(a,b){h.setAttribute("readOnly","readOnly"),b.disabled=!0})),g.addEventListener("change",function(a){a.preventDefault(),a.stopPropagation(),b.input.value=a.srcElement.value,b.is_dirty=!0,b.refreshValue(),b.watch_listener(),b.jsoneditor.notifyWatchers(b.path),b.parent?b.parent.onChildEditorChange(b):b.jsoneditor.onChange()}),this.control=this.theme.getFormControl(this.label,g,this.description),this.container.appendChild(this.control),this.refreshValue()},setValue:function(a){var b=this.sanitize(a);if(this.value!==b){var c=this;f(this.inputs,function(a,d){if(d.value===b)return d.checked=!0,c.value=b,c.input.value=c.value,c.watch_listener(),c.jsoneditor.notifyWatchers(c.path),!1})}}}),h.defaults.editors.object=h.AbstractEditor.extend({getDefault:function(){return e({},this.schema["default"]||{})},getChildEditors:function(){return this.editors},register:function(){if(this._super(),this.editors)for(var a in this.editors)this.editors.hasOwnProperty(a)&&this.editors[a].register()},unregister:function(){if(this._super(),this.editors)for(var a in this.editors)this.editors.hasOwnProperty(a)&&this.editors[a].unregister()},getNumColumns:function(){return Math.max(Math.min(12,this.maxwidth),3)},enable:function(){if(!this.always_disabled&&(this.editjson_button&&(this.editjson_button.disabled=!1),this.addproperty_button&&(this.addproperty_button.disabled=!1),this._super(),this.editors))for(var a in this.editors)this.editors.hasOwnProperty(a)&&this.editors[a].enable()},disable:function(a){if(a&&(this.always_disabled=!0),this.editjson_button&&(this.editjson_button.disabled=!0),this.addproperty_button&&(this.addproperty_button.disabled=!0),this.hideEditJSON(),this._super(),this.editors)for(var b in this.editors)this.editors.hasOwnProperty(b)&&this.editors[b].disable(a)},layoutEditors:function(){var a,b,c=this;if(this.row_container){
    // Sort editors by propertyOrder
    this.property_order=Object.keys(this.editors),this.property_order=this.property_order.sort(function(a,b){var d=c.editors[a].schema.propertyOrder,e=c.editors[b].schema.propertyOrder;return"number"!=typeof d&&(d=1e3),"number"!=typeof e&&(e=1e3),d-e});var d=document.createElement("div"),e="categories"===this.format;if("grid"===this.format){var h=[];
    // Make almost full rows width 12
    // Do this by increasing all editors' sizes proprotionately
    // Any left over space goes to the biggest editor
    // Don't touch rows with a width of 6 or less
    for(f(this.property_order,function(a,b){var d=c.editors[b];if(!d.property_removed){
    // See if the editor will fit in any of the existing rows first
    for(var e=!1,f=d.options.hidden?0:d.options.grid_columns||d.getNumColumns(),g=d.options.hidden?0:d.container.offsetHeight,i=0;i<h.length;i++)
    // If the editor will fit in the row horizontally
    h[i].width+f<=12&&(!g||.5*h[i].minh<g&&2*h[i].maxh>g)&&(e=i);
    // If there isn't a spot in any of the existing rows, start a new row
    e===!1&&(h.push({width:0,minh:999999,maxh:0,editors:[]}),e=h.length-1),h[e].editors.push({key:b,
    //editor: editor,
    width:f,height:g}),h[e].width+=f,h[e].minh=Math.min(h[e].minh,g),h[e].maxh=Math.max(h[e].maxh,g)}}),a=0;a<h.length;a++)if(h[a].width<12){var i=!1,j=0;for(b=0;b<h[a].editors.length;b++)i===!1?i=b:h[a].editors[b].width>h[a].editors[i].width&&(i=b),h[a].editors[b].width*=12/h[a].width,h[a].editors[b].width=Math.floor(h[a].editors[b].width),j+=h[a].editors[b].width;j<12&&(h[a].editors[i].width+=12-j),h[a].width=12}
    // layout hasn't changed
    if(this.layout===JSON.stringify(h))return!1;
    // Layout the form
    for(this.layout=JSON.stringify(h),a=0;a<h.length;a++){var k=this.theme.getGridRow();for(d.appendChild(k),b=0;b<h[a].editors.length;b++){var l=h[a].editors[b].key,m=this.editors[l];m.options.hidden?m.container.style.display="none":this.theme.setGridColumnSize(m.container,h[a].editors[b].width),k.appendChild(m.container)}}}else{if(e){
    //A container for properties not object nor arrays
    var n=document.createElement("div"),o=this.theme.getTopTabHolder(this.schema.title),p=this.theme.getTopTabContentHolder(o);
    //Erase old panes
    for(f(this.property_order,function(a,b){var d=c.editors[b];if(!d.property_removed){var e=c.theme.getTabContent(),f=d.schema&&("object"===d.schema.type||"array"===d.schema.type);
    //mark the pane
    e.isObjOrArray=f;var g=c.theme.getGridRow();
    //this happens with added properties, they don't have a tab
    d.tab||(
    //Pass the pane which holds the editor
    "undefined"==typeof c.basicPane?
    //There is no basicPane yet, so aPane will be it
    c.addRow(d,o,e):c.addRow(d,o,c.basicPane)),e.id=d.tab_text.textContent,
    //For simple properties, add them on the same panel (Basic)
    f?(e.appendChild(g),p.appendChild(e),
    //newTabs_holder.firstChild.appendChild(editor.tab);
    c.theme.addTopTab(o,d.tab)):(n.appendChild(g),
    //There is already some panes
    p.childElementCount>0?
    //If first pane is object or array, insert before a simple pane
    p.firstChild.isObjOrArray&&(
    //Append pane for simple properties
    e.appendChild(n),p.insertBefore(e,p.firstChild),
    //Add "Basic" tab
    c.theme.insertBasicTopTab(d.tab,o),
    //newTabs_holder.firstChild.insertBefore(editor.tab,newTabs_holder.firstChild.firstChild);
    //Update the basicPane
    d.basicPane=e):(
    //Append pane for simple properties
    e.appendChild(n),p.appendChild(e),
    //Add "Basic" tab
    //newTabs_holder.firstChild.appendChild(editor.tab);
    c.theme.addTopTab(o,d.tab),
    //Update the basicPane
    d.basicPane=e)),d.options.hidden?d.container.style.display="none":c.theme.setGridColumnSize(d.container,12),
    //Now, add the property editor to the row
    g.appendChild(d.container),
    //Update the container (same as self.rows[x].container)
    d.container=e}});this.tabPanesContainer.firstChild;)this.tabPanesContainer.removeChild(this.tabPanesContainer.firstChild);
    //Erase old tabs and set the new ones
    var q=this.tabs_holder.parentNode;q.removeChild(q.firstChild),q.appendChild(o),this.tabPanesContainer=p,this.tabs_holder=o;
    //Activate the first tab
    var r=this.theme.getFirstTab(this.tabs_holder);return void(r&&g(r,"click"))}f(this.property_order,function(a,b){var e=c.editors[b];if(!e.property_removed){var f=c.theme.getGridRow();d.appendChild(f),e.options.hidden?e.container.style.display="none":c.theme.setGridColumnSize(e.container,12),f.appendChild(e.container)}})}
    //for grid and normal layout
    for(;this.row_container.firstChild;)this.row_container.removeChild(this.row_container.firstChild);this.row_container.appendChild(d)}},getPropertySchema:function(a){
    // Schema declared directly in properties
    var b=this.schema.properties[a]||{};b=e({},b);var c=!!this.schema.properties[a];
    // Any matching patternProperties should be merged in
    if(this.schema.patternProperties)for(var d in this.schema.patternProperties)if(this.schema.patternProperties.hasOwnProperty(d)){var f=new RegExp(d);f.test(a)&&(b.allOf=b.allOf||[],b.allOf.push(this.schema.patternProperties[d]),c=!0)}
    // Hasn't matched other rules, use additionalProperties schema
    return!c&&this.schema.additionalProperties&&"object"==typeof this.schema.additionalProperties&&(b=e({},this.schema.additionalProperties)),b},preBuild:function(){this._super(),this.editors={},this.cached_editors={};var a=this;
    // If the object should be rendered as a table row
    if(this.format=this.options.layout||this.options.object_layout||this.schema.format||this.jsoneditor.options.object_layout||"normal",this.schema.properties=this.schema.properties||{},this.minwidth=0,this.maxwidth=0,this.options.table_row)f(this.schema.properties,function(b,c){var d=a.jsoneditor.getEditorClass(c);a.editors[b]=a.jsoneditor.createEditor(d,{jsoneditor:a.jsoneditor,schema:c,path:a.path+"."+b,parent:a,compact:!0,required:!0}),a.editors[b].preBuild();var e=a.editors[b].options.hidden?0:a.editors[b].options.grid_columns||a.editors[b].getNumColumns();a.minwidth+=e,a.maxwidth+=e}),this.no_link_holder=!0;else{if(this.options.table)
    // TODO: table display format
    throw"Not supported yet";this.schema.defaultProperties||(this.jsoneditor.options.display_required_only||this.options.display_required_only?(this.schema.defaultProperties=[],f(this.schema.properties,function(b,c){a.isRequired({key:b,schema:c})&&a.schema.defaultProperties.push(b)})):a.schema.defaultProperties=Object.keys(a.schema.properties)),
    // Increase the grid width to account for padding
    a.maxwidth+=1,f(this.schema.defaultProperties,function(b,c){a.addObjectProperty(c,!0),a.editors[c]&&(a.minwidth=Math.max(a.minwidth,a.editors[c].options.grid_columns||a.editors[c].getNumColumns()),a.maxwidth+=a.editors[c].options.grid_columns||a.editors[c].getNumColumns())})}
    // Sort editors by propertyOrder
    this.property_order=Object.keys(this.editors),this.property_order=this.property_order.sort(function(b,c){var d=a.editors[b].schema.propertyOrder,e=a.editors[c].schema.propertyOrder;return"number"!=typeof d&&(d=1e3),"number"!=typeof e&&(e=1e3),d-e})},
    //"Borrow" from arrays code
    addTab:function(a){var b=this,c=b.rows[a].schema&&("object"===b.rows[a].schema.type||"array"===b.rows[a].schema.type);b.tabs_holder&&(b.rows[a].tab_text=document.createElement("span"),c?b.rows[a].tab_text.textContent=b.rows[a].getHeaderText():b.rows[a].tab_text.textContent="undefined"==typeof b.schema.basicCategoryTitle?"Basic":b.schema.basicCategoryTitle,b.rows[a].tab=b.theme.getTopTab(b.rows[a].tab_text,b.rows[a].tab_text.textContent),b.rows[a].tab.addEventListener("click",function(c){b.active_tab=b.rows[a].tab,b.refreshTabs(),c.preventDefault(),c.stopPropagation()}))},addRow:function(a,b,c){var d=this,e=this.rows.length,f="object"===a.schema.type||"array"===a.schema.type;
    //Add a row
    d.rows[e]=a,
    //container stores the editor corresponding pane to set the display style when refreshing Tabs
    d.rows[e].container=c,f?(d.addTab(e),d.theme.addTopTab(b,d.rows[e].tab)):
    //This is the first simple property to be added,
    //add a ("Basic") tab for it and save it's row number
    "undefined"==typeof d.basicTab?(d.addTab(e),
    //Store the index row of the first simple property added
    d.basicTab=e,d.basicPane=c,d.theme.addTopTab(b,d.rows[e].tab)):(
    //Any other simple property gets the same tab (and the same pane) as the first one,
    //so, when 'click' event is fired from a row, it gets the correct ("Basic") tab
    d.rows[e].tab=d.rows[d.basicTab].tab,d.rows[e].tab_text=d.rows[d.basicTab].tab_text,d.rows[e].container=d.rows[d.basicTab].container)},
    //Mark the active tab and make visible the corresponding pane, hide others
    refreshTabs:function(a){var b=this,c="undefined"!=typeof b.basicTab,d=!1;f(this.rows,function(e,f){
    //If it's an orphan row (some property which has been deleted), return
    f.tab&&f.container&&f.container.parentNode&&(c&&f.tab==b.rows[b.basicTab].tab&&d||(a?f.tab_text.textContent=f.getHeaderText():(
    //All rows of simple properties point to the same tab, so refresh just once
    c&&f.tab==b.rows[b.basicTab].tab&&(d=!0),f.tab===b.active_tab?b.theme.markTabActive(f):b.theme.markTabInactive(f))))})},build:function(){var a=this,b="categories"===this.format;
    // If the object should be rendered as a table row
    if(this.rows=[],this.active_tab=null,this.options.table_row)this.editor_holder=this.container,f(this.editors,function(b,c){var d=a.theme.getTableCell();a.editor_holder.appendChild(d),c.setContainer(d),c.build(),c.postBuild(),a.editors[b].options.hidden&&(d.style.display="none"),a.editors[b].options.input_width&&(d.style.width=a.editors[b].options.input_width)});else{if(this.options.table)
    // TODO: table display format
    throw"Not supported yet";this.header=document.createElement("span"),this.header.textContent=this.getTitle(),this.title=this.theme.getHeader(this.header),this.container.appendChild(this.title),this.container.style.position="relative",
    // Edit JSON modal
    this.editjson_holder=this.theme.getModal(),this.editjson_textarea=this.theme.getTextareaInput(),this.editjson_textarea.style.height="170px",this.editjson_textarea.style.width="300px",this.editjson_textarea.style.display="block",this.editjson_save=this.getButton("Save","save","Save"),this.editjson_save.addEventListener("click",function(b){b.preventDefault(),b.stopPropagation(),a.saveJSON()}),this.editjson_cancel=this.getButton("Cancel","cancel","Cancel"),this.editjson_cancel.addEventListener("click",function(b){b.preventDefault(),b.stopPropagation(),a.hideEditJSON()}),this.editjson_holder.appendChild(this.editjson_textarea),this.editjson_holder.appendChild(this.editjson_save),this.editjson_holder.appendChild(this.editjson_cancel),
    // Manage Properties modal
    this.addproperty_holder=this.theme.getModal(),this.addproperty_list=document.createElement("div"),this.addproperty_list.style.width="295px",this.addproperty_list.style.maxHeight="160px",this.addproperty_list.style.padding="5px 0",this.addproperty_list.style.overflowY="auto",this.addproperty_list.style.overflowX="hidden",this.addproperty_list.style.paddingLeft="5px",this.addproperty_list.setAttribute("class","property-selector"),this.addproperty_add=this.getButton("add","add","add"),this.addproperty_input=this.theme.getFormInputField("text"),this.addproperty_input.setAttribute("placeholder","Property name..."),this.addproperty_input.style.width="220px",this.addproperty_input.style.marginBottom="0",this.addproperty_input.style.display="inline-block",this.addproperty_add.addEventListener("click",function(b){if(b.preventDefault(),b.stopPropagation(),a.addproperty_input.value){if(a.editors[a.addproperty_input.value])return void window.alert("there is already a property with that name");a.addObjectProperty(a.addproperty_input.value),a.editors[a.addproperty_input.value]&&a.editors[a.addproperty_input.value].disable(),a.onChange(!0)}}),this.addproperty_holder.appendChild(this.addproperty_list),this.addproperty_holder.appendChild(this.addproperty_input),this.addproperty_holder.appendChild(this.addproperty_add);var c=document.createElement("div");c.style.clear="both",this.addproperty_holder.appendChild(c),
    // Description
    this.schema.description&&(this.description=this.theme.getDescription(this.schema.description),this.container.appendChild(this.description)),
    // Validation error placeholder area
    this.error_holder=document.createElement("div"),this.container.appendChild(this.error_holder),
    // Container for child editor area
    this.editor_holder=this.theme.getIndentedPanel(),this.container.appendChild(this.editor_holder),
    // Container for rows of child editors
    this.row_container=this.theme.getGridContainer(),b?(this.tabs_holder=this.theme.getTopTabHolder(this.schema.title),this.tabPanesContainer=this.theme.getTopTabContentHolder(this.tabs_holder),this.editor_holder.appendChild(this.tabs_holder)):(this.tabs_holder=this.theme.getTabHolder(this.schema.title),this.tabPanesContainer=this.theme.getTabContentHolder(this.tabs_holder),this.editor_holder.appendChild(this.row_container)),f(this.editors,function(c,d){var e=a.theme.getTabContent(),f=a.theme.getGridColumn(),g=!(!d.schema||"object"!==d.schema.type&&"array"!==d.schema.type);if(e.isObjOrArray=g,b){if(g){var h=a.theme.getGridContainer();h.appendChild(f),e.appendChild(h),a.tabPanesContainer.appendChild(e),a.row_container=h}else"undefined"==typeof a.row_container_basic&&(a.row_container_basic=a.theme.getGridContainer(),e.appendChild(a.row_container_basic),0==a.tabPanesContainer.childElementCount?a.tabPanesContainer.appendChild(e):a.tabPanesContainer.insertBefore(e,a.tabPanesContainer.childNodes[1])),a.row_container_basic.appendChild(f);a.addRow(d,a.tabs_holder,e),e.id=d.schema.title}else a.row_container.appendChild(f);d.setContainer(f),d.build(),d.postBuild()}),this.rows[0]&&g(this.rows[0].tab,"click"),
    // Control buttons
    this.title_controls=this.theme.getHeaderButtonHolder(),this.editjson_controls=this.theme.getHeaderButtonHolder(),this.addproperty_controls=this.theme.getHeaderButtonHolder(),this.title.appendChild(this.title_controls),this.title.appendChild(this.editjson_controls),this.title.appendChild(this.addproperty_controls),
    // Show/Hide button
    this.collapsed=!1,this.toggle_button=this.getButton("","collapse",this.translate("button_collapse")),this.title_controls.appendChild(this.toggle_button),this.toggle_button.addEventListener("click",function(b){b.preventDefault(),b.stopPropagation(),a.collapsed?(a.editor_holder.style.display="",a.collapsed=!1,a.setButtonText(a.toggle_button,"","collapse",a.translate("button_collapse"))):(a.editor_holder.style.display="none",a.collapsed=!0,a.setButtonText(a.toggle_button,"","expand",a.translate("button_expand")))}),
    // If it should start collapsed
    this.options.collapsed&&g(this.toggle_button,"click"),
    // Collapse button disabled
    this.schema.options&&"undefined"!=typeof this.schema.options.disable_collapse?this.schema.options.disable_collapse&&(this.toggle_button.style.display="none"):this.jsoneditor.options.disable_collapse&&(this.toggle_button.style.display="none"),
    // Edit JSON Button
    this.editjson_button=this.getButton("JSON","edit","Edit JSON"),this.editjson_button.addEventListener("click",function(b){b.preventDefault(),b.stopPropagation(),a.toggleEditJSON()}),this.editjson_controls.appendChild(this.editjson_button),this.editjson_controls.appendChild(this.editjson_holder),
    // Edit JSON Buttton disabled
    this.schema.options&&"undefined"!=typeof this.schema.options.disable_edit_json?this.schema.options.disable_edit_json&&(this.editjson_button.style.display="none"):this.jsoneditor.options.disable_edit_json&&(this.editjson_button.style.display="none"),
    // Object Properties Button
    this.addproperty_button=this.getButton("Properties","edit","Object Properties"),this.addproperty_button.addEventListener("click",function(b){b.preventDefault(),b.stopPropagation(),a.toggleAddProperty()}),this.addproperty_controls.appendChild(this.addproperty_button),this.addproperty_controls.appendChild(this.addproperty_holder),this.refreshAddProperties()}
    // Fix table cell ordering
    this.options.table_row?(this.editor_holder=this.container,f(this.property_order,function(b,c){a.editor_holder.appendChild(a.editors[c].container)})):(
    // Initial layout
    this.layoutEditors(),
    // Do it again now that we know the approximate heights of elements
    this.layoutEditors())},showEditJSON:function(){this.editjson_holder&&(this.hideAddProperty(),
    // Position the form directly beneath the button
    // TODO: edge detection
    this.editjson_holder.style.left=this.editjson_button.offsetLeft+"px",this.editjson_holder.style.top=this.editjson_button.offsetTop+this.editjson_button.offsetHeight+"px",
    // Start the textarea with the current value
    this.editjson_textarea.value=JSON.stringify(this.getValue(),null,2),
    // Disable the rest of the form while editing JSON
    this.disable(),this.editjson_holder.style.display="",this.editjson_button.disabled=!1,this.editing_json=!0)},hideEditJSON:function(){this.editjson_holder&&this.editing_json&&(this.editjson_holder.style.display="none",this.enable(),this.editing_json=!1)},saveJSON:function(){if(this.editjson_holder)try{var a=JSON.parse(this.editjson_textarea.value);this.setValue(a),this.hideEditJSON()}catch(b){throw window.alert("invalid JSON"),b}},toggleEditJSON:function(){this.editing_json?this.hideEditJSON():this.showEditJSON()},insertPropertyControlUsingPropertyOrder:function(a,b,c){var d;this.schema.properties[a]&&(d=this.schema.properties[a].propertyOrder),"number"!=typeof d&&(d=1e3),b.propertyOrder=d;for(var e=0;e<c.childNodes.length;e++){var f=c.childNodes[e];if(b.propertyOrder<f.propertyOrder){this.addproperty_list.insertBefore(b,f),b=null;break}}b&&this.addproperty_list.appendChild(b)},addPropertyCheckbox:function(a){var b,c,d,e,f=this;
    //control.style.overflowY = 'hidden';
    return b=f.theme.getCheckbox(),b.style.width="auto",d=this.schema.properties[a]&&this.schema.properties[a].title?this.schema.properties[a].title:a,c=f.theme.getCheckboxLabel(d),e=f.theme.getFormControl(c,b),e.style.paddingBottom=e.style.marginBottom=e.style.paddingTop=e.style.marginTop=0,e.style.height="auto",this.insertPropertyControlUsingPropertyOrder(a,e,this.addproperty_list),b.checked=a in this.editors,b.addEventListener("change",function(){b.checked?f.addObjectProperty(a):f.removeObjectProperty(a),f.onChange(!0)}),f.addproperty_checkboxes[a]=b,b},showAddProperty:function(){this.addproperty_holder&&(this.hideEditJSON(),
    // Position the form directly beneath the button
    // TODO: edge detection
    this.addproperty_holder.style.left=this.addproperty_button.offsetLeft+"px",this.addproperty_holder.style.top=this.addproperty_button.offsetTop+this.addproperty_button.offsetHeight+"px",
    // Disable the rest of the form while editing JSON
    this.disable(),this.adding_property=!0,this.addproperty_button.disabled=!1,this.addproperty_holder.style.display="",this.refreshAddProperties())},hideAddProperty:function(){this.addproperty_holder&&this.adding_property&&(this.addproperty_holder.style.display="none",this.enable(),this.adding_property=!1)},toggleAddProperty:function(){this.adding_property?this.hideAddProperty():this.showAddProperty()},removeObjectProperty:function(a){this.editors[a]&&(this.editors[a].unregister(),delete this.editors[a],this.refreshValue(),this.layoutEditors())},addObjectProperty:function(a,b){var c=this;
    // Property is already added
    if(!this.editors[a]){
    // Property was added before and is cached
    if(this.cached_editors[a]){if(this.editors[a]=this.cached_editors[a],b)return;this.editors[a].register()}else{if(!(this.canHaveAdditionalProperties()||this.schema.properties&&this.schema.properties[a]))return;var d=c.getPropertySchema(a);"number"!=typeof d.propertyOrder&&(
    // if the propertyOrder undefined, then set a smart default value.
    d.propertyOrder=Object.keys(c.editors).length+1e3);
    // Add the property
    var e=c.jsoneditor.getEditorClass(d);if(c.editors[a]=c.jsoneditor.createEditor(e,{jsoneditor:c.jsoneditor,schema:d,path:c.path+"."+a,parent:c}),c.editors[a].preBuild(),!b){var f=c.theme.getChildEditorHolder();c.editor_holder.appendChild(f),c.editors[a].setContainer(f),c.editors[a].build(),c.editors[a].postBuild()}c.cached_editors[a]=c.editors[a]}
    // If we're only prebuilding the editors, don't refresh values
    b||(c.refreshValue(),c.layoutEditors())}},onChildEditorChange:function(a){this.refreshValue(),this._super(a)},canHaveAdditionalProperties:function(){return"boolean"==typeof this.schema.additionalProperties?this.schema.additionalProperties:!this.jsoneditor.options.no_additional_properties},destroy:function(){f(this.cached_editors,function(a,b){b.destroy()}),this.editor_holder&&(this.editor_holder.innerHTML=""),this.title&&this.title.parentNode&&this.title.parentNode.removeChild(this.title),this.error_holder&&this.error_holder.parentNode&&this.error_holder.parentNode.removeChild(this.error_holder),this.editors=null,this.cached_editors=null,this.editor_holder&&this.editor_holder.parentNode&&this.editor_holder.parentNode.removeChild(this.editor_holder),this.editor_holder=null,this._super()},getValue:function(){if(!this.dependenciesFulfilled)return b;var a=this._super();if(this.jsoneditor.options.remove_empty_properties||this.options.remove_empty_properties)for(var c in a)a.hasOwnProperty(c)&&("undefined"==typeof a[c]||""===a[c]||a[c]===Object(a[c])&&0==Object.keys(a[c]).length&&a[c].constructor==Object)&&delete a[c];return a},refreshValue:function(){this.value={};for(var a in this.editors)this.editors.hasOwnProperty(a)&&(this.value[a]=this.editors[a].getValue());this.adding_property&&this.refreshAddProperties()},refreshAddProperties:function(){if(this.options.disable_properties||this.options.disable_properties!==!1&&this.jsoneditor.options.disable_properties)return void(this.addproperty_controls.style.display="none");var a,b=!1,c=!1,d=0,e=!1;
    // Get number of editors
    for(a in this.editors)this.editors.hasOwnProperty(a)&&d++;
    // Determine if we can add back removed properties
    b=this.canHaveAdditionalProperties()&&!("undefined"!=typeof this.schema.maxProperties&&d>=this.schema.maxProperties),this.addproperty_checkboxes&&(this.addproperty_list.innerHTML=""),this.addproperty_checkboxes={};
    // Check for which editors can't be removed or added back
    for(a in this.cached_editors)this.cached_editors.hasOwnProperty(a)&&(this.addPropertyCheckbox(a),this.isRequired(this.cached_editors[a])&&a in this.editors&&(this.addproperty_checkboxes[a].disabled=!0),"undefined"!=typeof this.schema.minProperties&&d<=this.schema.minProperties?(this.addproperty_checkboxes[a].disabled=this.addproperty_checkboxes[a].checked,this.addproperty_checkboxes[a].checked||(e=!0)):a in this.editors?(e=!0,c=!0):b||this.schema.properties.hasOwnProperty(a)?(this.addproperty_checkboxes[a].disabled=!1,e=!0):this.addproperty_checkboxes[a].disabled=!0);this.canHaveAdditionalProperties()&&(e=!0);
    // Additional addproperty checkboxes not tied to a current editor
    for(a in this.schema.properties)this.schema.properties.hasOwnProperty(a)&&(this.cached_editors[a]||(e=!0,this.addPropertyCheckbox(a)));
    // If no editors can be added or removed, hide the modal button
    e?this.canHaveAdditionalProperties()?b?this.addproperty_add.disabled=!1:this.addproperty_add.disabled=!0:(this.addproperty_add.style.display="none",this.addproperty_input.style.display="none"):(this.hideAddProperty(),this.addproperty_controls.style.display="none")},isRequired:function(a){return"boolean"==typeof a.schema.required?a.schema.required:Array.isArray(this.schema.required)?this.schema.required.indexOf(a.key)>-1:!!this.jsoneditor.options.required_by_default},setValue:function(a,b){var c=this;a=a||{},("object"!=typeof a||Array.isArray(a))&&(a={}),
    // First, set the values for all of the defined properties
    f(this.cached_editors,function(d,e){
    // Value explicitly set
    "undefined"!=typeof a[d]?(c.addObjectProperty(d),e.setValue(a[d],b)):b||c.isRequired(e)?e.setValue(e.getDefault(),b):c.removeObjectProperty(d)}),f(a,function(a,d){c.cached_editors[a]||(c.addObjectProperty(a),c.editors[a]&&c.editors[a].setValue(d,b))}),this.refreshValue(),this.layoutEditors(),this.onChange()},showValidationErrors:function(a){var b=this,c=[],d=[];
    // Show errors for this editor
    if(f(a,function(a,e){e.path===b.path?c.push(e):d.push(e)}),this.error_holder)if(c.length){this.error_holder.innerHTML="",this.error_holder.style.display="",f(c,function(a,c){b.error_holder.appendChild(b.theme.getErrorMessage(c.message))})}else this.error_holder.style.display="none";
    // Show error for the table row if this is inside a table
    this.options.table_row&&(c.length?this.theme.addTableRowError(this.container):this.theme.removeTableRowError(this.container)),
    // Show errors for child editors
    f(this.editors,function(a,b){b.showValidationErrors(d)})}}),h.defaults.editors.array=h.AbstractEditor.extend({askConfirmation:function(){return this.jsoneditor.options.prompt_before_delete!==!0||confirm("Are you sure you want to remove this node?")!==!1},getDefault:function(){return this.schema["default"]||[]},register:function(){if(this._super(),this.rows)for(var a=0;a<this.rows.length;a++)this.rows[a].register()},unregister:function(){if(this._super(),this.rows)for(var a=0;a<this.rows.length;a++)this.rows[a].unregister()},getNumColumns:function(){var a=this.getItemInfo(0);
    // Tabs require extra horizontal space
    // Tabs require extra horizontal space
    return this.tabs_holder&&"tabs-top"!==this.schema.format?Math.max(Math.min(12,a.width+2),4):a.width},enable:function(){if(!this.always_disabled){if(this.add_row_button&&(this.add_row_button.disabled=!1),this.remove_all_rows_button&&(this.remove_all_rows_button.disabled=!1),this.delete_last_row_button&&(this.delete_last_row_button.disabled=!1),this.rows)for(var a=0;a<this.rows.length;a++)this.rows[a].enable(),this.rows[a].moveup_button&&(this.rows[a].moveup_button.disabled=!1),this.rows[a].movedown_button&&(this.rows[a].movedown_button.disabled=!1),this.rows[a].delete_button&&(this.rows[a].delete_button.disabled=!1);this._super()}},disable:function(a){if(a&&(this.always_disabled=!0),this.add_row_button&&(this.add_row_button.disabled=!0),this.remove_all_rows_button&&(this.remove_all_rows_button.disabled=!0),this.delete_last_row_button&&(this.delete_last_row_button.disabled=!0),this.rows)for(var b=0;b<this.rows.length;b++)this.rows[b].disable(a),this.rows[b].moveup_button&&(this.rows[b].moveup_button.disabled=!0),this.rows[b].movedown_button&&(this.rows[b].movedown_button.disabled=!0),this.rows[b].delete_button&&(this.rows[b].delete_button.disabled=!0);this._super()},preBuild:function(){this._super(),this.rows=[],this.row_cache=[],this.hide_delete_buttons=this.options.disable_array_delete||this.jsoneditor.options.disable_array_delete,this.hide_delete_all_rows_buttons=this.hide_delete_buttons||this.options.disable_array_delete_all_rows||this.jsoneditor.options.disable_array_delete_all_rows,this.hide_delete_last_row_buttons=this.hide_delete_buttons||this.options.disable_array_delete_last_row||this.jsoneditor.options.disable_array_delete_last_row,this.hide_move_buttons=this.options.disable_array_reorder||this.jsoneditor.options.disable_array_reorder,this.hide_add_button=this.options.disable_array_add||this.jsoneditor.options.disable_array_add,this.show_copy_button=this.options.enable_array_copy||this.jsoneditor.options.enable_array_copy,this.array_controls_top=this.options.array_controls_top||this.jsoneditor.options.array_controls_top},build:function(){this.options.compact?(this.panel=this.theme.getIndentedPanel(),this.container.appendChild(this.panel),this.title_controls=this.theme.getHeaderButtonHolder(),this.panel.appendChild(this.title_controls),this.controls=this.theme.getButtonHolder(),this.panel.appendChild(this.controls),this.row_holder=document.createElement("div"),this.panel.appendChild(this.row_holder)):(this.header=document.createElement("span"),this.header.textContent=this.getTitle(),this.title=this.theme.getHeader(this.header),this.container.appendChild(this.title),this.title_controls=this.theme.getHeaderButtonHolder(),this.title.appendChild(this.title_controls),this.schema.description&&(this.description=this.theme.getDescription(this.schema.description),this.container.appendChild(this.description)),this.error_holder=document.createElement("div"),this.container.appendChild(this.error_holder),"tabs-top"===this.schema.format?(this.controls=this.theme.getHeaderButtonHolder(),this.title.appendChild(this.controls),this.tabs_holder=this.theme.getTopTabHolder(this.getItemTitle()),this.container.appendChild(this.tabs_holder),this.row_holder=this.theme.getTopTabContentHolder(this.tabs_holder),this.active_tab=null):"tabs"===this.schema.format?(this.controls=this.theme.getHeaderButtonHolder(),this.title.appendChild(this.controls),this.tabs_holder=this.theme.getTabHolder(this.getItemTitle()),this.container.appendChild(this.tabs_holder),this.row_holder=this.theme.getTabContentHolder(this.tabs_holder),this.active_tab=null):(this.panel=this.theme.getIndentedPanel(),this.container.appendChild(this.panel),this.row_holder=document.createElement("div"),this.panel.appendChild(this.row_holder),this.controls=this.theme.getButtonHolder(),this.array_controls_top?this.title.appendChild(this.controls):this.panel.appendChild(this.controls))),
    // Add controls
    this.addControls()},onChildEditorChange:function(a){this.refreshValue(),this.refreshTabs(!0),this._super(a)},getItemTitle:function(){if(!this.item_title)if(this.schema.items&&!Array.isArray(this.schema.items)){var a=this.jsoneditor.expandRefs(this.schema.items);this.item_title=a.title||"item"}else this.item_title="item";return this.item_title},getItemSchema:function(a){return Array.isArray(this.schema.items)?a>=this.schema.items.length?this.schema.additionalItems===!0?{}:this.schema.additionalItems?e({},this.schema.additionalItems):void 0:e({},this.schema.items[a]):this.schema.items?e({},this.schema.items):{}},getItemInfo:function(a){var b=this.getItemSchema(a);
    // Check if it's cached
    this.item_info=this.item_info||{};var c=JSON.stringify(b);
    // Get the schema for this item
    return"undefined"!=typeof this.item_info[c]?this.item_info[c]:(b=this.jsoneditor.expandRefs(b),this.item_info[c]={title:b.title||"item","default":b["default"],width:12,child_editors:b.properties||b.items},this.item_info[c])},getElementEditor:function(a){var b=this.getItemInfo(a),c=this.getItemSchema(a);c=this.jsoneditor.expandRefs(c),c.title=b.title+" "+(a+1);var d,e=this.jsoneditor.getEditorClass(c);this.tabs_holder?(d="tabs-top"===this.schema.format?this.theme.getTopTabContent():this.theme.getTabContent(),d.id=this.path+"."+a):d=b.child_editors?this.theme.getChildEditorHolder():this.theme.getIndentedPanel(),this.row_holder.appendChild(d);var f=this.jsoneditor.createEditor(e,{jsoneditor:this.jsoneditor,schema:c,container:d,path:this.path+"."+a,parent:this,required:!0});return f.preBuild(),f.build(),f.postBuild(),f.title_controls||(f.array_controls=this.theme.getButtonHolder(),d.appendChild(f.array_controls)),f},destroy:function(){this.empty(!0),this.title&&this.title.parentNode&&this.title.parentNode.removeChild(this.title),this.description&&this.description.parentNode&&this.description.parentNode.removeChild(this.description),this.row_holder&&this.row_holder.parentNode&&this.row_holder.parentNode.removeChild(this.row_holder),this.controls&&this.controls.parentNode&&this.controls.parentNode.removeChild(this.controls),this.panel&&this.panel.parentNode&&this.panel.parentNode.removeChild(this.panel),this.rows=this.row_cache=this.title=this.description=this.row_holder=this.panel=this.controls=null,this._super()},empty:function(a){if(this.rows){var b=this;f(this.rows,function(c,d){a&&(d.tab&&d.tab.parentNode&&d.tab.parentNode.removeChild(d.tab),b.destroyRow(d,!0),b.row_cache[c]=null),b.rows[c]=null}),b.rows=[],a&&(b.row_cache=[])}},destroyRow:function(a,b){var c=a.container;b?(a.destroy(),c.parentNode&&c.parentNode.removeChild(c),a.tab&&a.tab.parentNode&&a.tab.parentNode.removeChild(a.tab)):(a.tab&&(a.tab.style.display="none"),c.style.display="none",a.unregister())},getMax:function(){return Array.isArray(this.schema.items)&&this.schema.additionalItems===!1?Math.min(this.schema.items.length,this.schema.maxItems||1/0):this.schema.maxItems||1/0},refreshTabs:function(a){var b=this;f(this.rows,function(c,d){d.tab&&(a?d.tab_text.textContent=d.getHeaderText():d.tab===b.active_tab?b.theme.markTabActive(d):b.theme.markTabInactive(d))})},setValue:function(a,b){
    // Update the array's value, adding/removing rows when necessary
    a=a||[],Array.isArray(a)||(a=[a]);var c=JSON.stringify(a);if(c!==this.serialized){
    // Make sure value has between minItems and maxItems items in it
    if(this.schema.minItems)for(;a.length<this.schema.minItems;)a.push(this.getItemInfo(a.length)["default"]);this.getMax()&&a.length>this.getMax()&&(a=a.slice(0,this.getMax()));var d=this;f(a,function(a,c){d.rows[a]?
    // TODO: don't set the row's value if it hasn't changed
    d.rows[a].setValue(c,b):d.row_cache[a]?(d.rows[a]=d.row_cache[a],d.rows[a].setValue(c,b),d.rows[a].container.style.display="",d.rows[a].tab&&(d.rows[a].tab.style.display=""),d.rows[a].register()):d.addRow(c,b)});for(var e=a.length;e<d.rows.length;e++)d.destroyRow(d.rows[e]),d.rows[e]=null;d.rows=d.rows.slice(0,a.length);
    // Set the active tab
    var g=null;f(d.rows,function(a,b){if(b.tab===d.active_tab)return g=b.tab,!1}),!g&&d.rows.length&&(g=d.rows[0].tab),d.active_tab=g,d.refreshValue(b),d.refreshTabs(!0),d.refreshTabs(),d.onChange()}},refreshValue:function(a){var b=this,c=this.value?this.value.length:0;if(this.value=[],f(this.rows,function(a,c){
    // Get the value for this editor
    b.value[a]=c.getValue()}),c!==this.value.length||a){
    // If we currently have minItems items in the array
    var d=this.schema.minItems&&this.schema.minItems>=this.rows.length;f(this.rows,function(a,c){
    // Hide the move down button for the last row
    c.movedown_button&&(a===b.rows.length-1?c.movedown_button.style.display="none":c.movedown_button.style.display=""),
    // Hide the delete button if we have minItems items
    c.delete_button&&(d?c.delete_button.style.display="none":c.delete_button.style.display=""),
    // Get the value for this editor
    b.value[a]=c.getValue()});var e=!1;this.value.length?1===this.value.length?(this.remove_all_rows_button.style.display="none",
    // If there are minItems items in the array, or configured to hide the delete_last_row button, hide the delete button beneath the rows
    d||this.hide_delete_last_row_buttons?this.delete_last_row_button.style.display="none":(this.delete_last_row_button.style.display="",e=!0)):(d||this.hide_delete_last_row_buttons?this.delete_last_row_button.style.display="none":(this.delete_last_row_button.style.display="",e=!0),d||this.hide_delete_all_rows_buttons?this.remove_all_rows_button.style.display="none":(this.remove_all_rows_button.style.display="",e=!0)):(this.delete_last_row_button.style.display="none",this.remove_all_rows_button.style.display="none"),
    // If there are maxItems in the array, hide the add button beneath the rows
    this.getMax()&&this.getMax()<=this.rows.length||this.hide_add_button?this.add_row_button.style.display="none":(this.add_row_button.style.display="",e=!0),!this.collapsed&&e?this.controls.style.display="inline-block":this.controls.style.display="none"}},addRow:function(a,b){var c=this,d=this.rows.length;c.rows[d]=this.getElementEditor(d),c.row_cache[d]=c.rows[d],c.tabs_holder&&(c.rows[d].tab_text=document.createElement("span"),c.rows[d].tab_text.textContent=c.rows[d].getHeaderText(),"tabs-top"===c.schema.format?(c.rows[d].tab=c.theme.getTopTab(c.rows[d].tab_text,c.rows[d].path),c.theme.addTopTab(c.tabs_holder,c.rows[d].tab)):(c.rows[d].tab=c.theme.getTab(c.rows[d].tab_text,c.rows[d].path),c.theme.addTab(c.tabs_holder,c.rows[d].tab)),c.rows[d].tab.addEventListener("click",function(a){c.active_tab=c.rows[d].tab,c.refreshTabs(),a.preventDefault(),a.stopPropagation()}));var e=c.rows[d].title_controls||c.rows[d].array_controls;
    // Buttons to delete row, move row up, and move row down
    c.hide_delete_buttons||(c.rows[d].delete_button=this.getButton(c.getItemTitle(),"delete",this.translate("button_delete_row_title",[c.getItemTitle()])),c.rows[d].delete_button.className+=" delete",c.rows[d].delete_button.setAttribute("data-i",d),c.rows[d].delete_button.addEventListener("click",function(a){if(a.preventDefault(),a.stopPropagation(),!c.askConfirmation())return!1;var b=1*this.getAttribute("data-i"),d=c.getValue(),e=[],g=null;f(d,function(a,c){a!==b&&e.push(c)}),c.empty(!0),c.setValue(e),c.rows[b]?g=c.rows[b].tab:c.rows[b-1]&&(g=c.rows[b-1].tab),g&&(c.active_tab=g,c.refreshTabs()),c.onChange(!0)}),e&&e.appendChild(c.rows[d].delete_button)),
    //Button to copy an array element and add it as last element
    c.show_copy_button&&(c.rows[d].copy_button=this.getButton(c.getItemTitle(),"copy","Copy "+c.getItemTitle()),c.rows[d].copy_button.className+=" copy",c.rows[d].copy_button.setAttribute("data-i",d),c.rows[d].copy_button.addEventListener("click",function(a){var b=c.getValue();a.preventDefault(),a.stopPropagation();var d=1*this.getAttribute("data-i");f(b,function(a,c){a===d&&b.push(c)}),c.setValue(b),c.refreshValue(!0),c.onChange(!0)}),e.appendChild(c.rows[d].copy_button)),d&&!c.hide_move_buttons&&(c.rows[d].moveup_button=this.getButton("","moveup",this.translate("button_move_up_title")),c.rows[d].moveup_button.className+=" moveup",c.rows[d].moveup_button.setAttribute("data-i",d),c.rows[d].moveup_button.addEventListener("click",function(a){a.preventDefault(),a.stopPropagation();var b=1*this.getAttribute("data-i");if(!(b<=0)){var d=c.getValue(),e=d[b-1];d[b-1]=d[b],d[b]=e,c.setValue(d),c.active_tab=c.rows[b-1].tab,c.refreshTabs(),c.onChange(!0)}}),e&&e.appendChild(c.rows[d].moveup_button)),c.hide_move_buttons||(c.rows[d].movedown_button=this.getButton("","movedown",this.translate("button_move_down_title")),c.rows[d].movedown_button.className+=" movedown",c.rows[d].movedown_button.setAttribute("data-i",d),c.rows[d].movedown_button.addEventListener("click",function(a){a.preventDefault(),a.stopPropagation();var b=1*this.getAttribute("data-i"),d=c.getValue();if(!(b>=d.length-1)){var e=d[b+1];d[b+1]=d[b],d[b]=e,c.setValue(d),c.active_tab=c.rows[b+1].tab,c.refreshTabs(),c.onChange(!0)}}),e&&e.appendChild(c.rows[d].movedown_button)),a&&c.rows[d].setValue(a,b),c.refreshTabs()},addControls:function(){var a=this;this.collapsed=!1,this.toggle_button=this.getButton("","collapse",this.translate("button_collapse")),this.title_controls.appendChild(this.toggle_button);var b=a.row_holder.style.display,c=a.controls.style.display;this.toggle_button.addEventListener("click",function(d){d.preventDefault(),d.stopPropagation(),a.collapsed?(a.collapsed=!1,a.panel&&(a.panel.style.display=""),a.row_holder.style.display=b,a.tabs_holder&&(a.tabs_holder.style.display=""),a.controls.style.display=c,a.setButtonText(this,"","collapse",a.translate("button_collapse"))):(a.collapsed=!0,a.row_holder.style.display="none",a.tabs_holder&&(a.tabs_holder.style.display="none"),a.controls.style.display="none",a.panel&&(a.panel.style.display="none"),a.setButtonText(this,"","expand",a.translate("button_expand")))}),
    // If it should start collapsed
    this.options.collapsed&&g(this.toggle_button,"click"),
    // Collapse button disabled
    this.schema.options&&"undefined"!=typeof this.schema.options.disable_collapse?this.schema.options.disable_collapse&&(this.toggle_button.style.display="none"):this.jsoneditor.options.disable_collapse&&(this.toggle_button.style.display="none"),
    // Add "new row" and "delete last" buttons below editor
    this.add_row_button=this.getButton(this.getItemTitle(),"add",this.translate("button_add_row_title",[this.getItemTitle()])),this.add_row_button.addEventListener("click",function(b){b.preventDefault(),b.stopPropagation();var c=a.rows.length;a.row_cache[c]?(a.rows[c]=a.row_cache[c],a.rows[c].setValue(a.rows[c].getDefault(),!0),a.rows[c].container.style.display="",a.rows[c].tab&&(a.rows[c].tab.style.display=""),a.rows[c].register()):a.addRow(),a.active_tab=a.rows[c].tab,a.refreshTabs(),a.refreshValue(),a.onChange(!0)}),a.controls.appendChild(this.add_row_button),this.delete_last_row_button=this.getButton(this.translate("button_delete_last",[this.getItemTitle()]),"delete",this.translate("button_delete_last_title",[this.getItemTitle()])),this.delete_last_row_button.addEventListener("click",function(b){if(b.preventDefault(),b.stopPropagation(),!a.askConfirmation())return!1;var c=a.getValue(),d=null;c.pop(),a.empty(!0),a.setValue(c),a.rows[a.rows.length-1]&&(d=a.rows[a.rows.length-1].tab),d&&(a.active_tab=d,a.refreshTabs()),a.onChange(!0)}),a.controls.appendChild(this.delete_last_row_button),this.remove_all_rows_button=this.getButton(this.translate("button_delete_all"),"delete",this.translate("button_delete_all_title")),this.remove_all_rows_button.addEventListener("click",function(b){return b.preventDefault(),b.stopPropagation(),!!a.askConfirmation()&&(a.empty(!0),a.setValue([]),void a.onChange(!0))}),a.controls.appendChild(this.remove_all_rows_button),a.tabs&&(this.add_row_button.style.width="100%",this.add_row_button.style.textAlign="left",this.add_row_button.style.marginBottom="3px",this.delete_last_row_button.style.width="100%",this.delete_last_row_button.style.textAlign="left",this.delete_last_row_button.style.marginBottom="3px",this.remove_all_rows_button.style.width="100%",this.remove_all_rows_button.style.textAlign="left",this.remove_all_rows_button.style.marginBottom="3px")},showValidationErrors:function(a){var b=this,c=[],d=[];
    // Show errors for this editor
    if(f(a,function(a,e){e.path===b.path?c.push(e):d.push(e)}),this.error_holder)if(c.length){this.error_holder.innerHTML="",this.error_holder.style.display="",f(c,function(a,c){b.error_holder.appendChild(b.theme.getErrorMessage(c.message))})}else this.error_holder.style.display="none";
    // Show errors for child editors
    f(this.rows,function(a,b){b.showValidationErrors(d)})}}),h.defaults.editors.table=h.defaults.editors.array.extend({register:function(){if(this._super(),this.rows)for(var a=0;a<this.rows.length;a++)this.rows[a].register()},unregister:function(){if(this._super(),this.rows)for(var a=0;a<this.rows.length;a++)this.rows[a].unregister()},getNumColumns:function(){return Math.max(Math.min(12,this.width),3)},preBuild:function(){var a=this.jsoneditor.expandRefs(this.schema.items||{});this.item_title=a.title||"row",this.item_default=a["default"]||null,this.item_has_child_editors=a.properties||a.items,this.width=12,this._super()},build:function(){var a=this;this.table=this.theme.getTable(),this.container.appendChild(this.table),this.thead=this.theme.getTableHead(),this.table.appendChild(this.thead),this.header_row=this.theme.getTableRow(),this.thead.appendChild(this.header_row),this.row_holder=this.theme.getTableBody(),this.table.appendChild(this.row_holder);
    // Determine the default value of array element
    var b=this.getElementEditor(0,!0);if(this.item_default=b.getDefault(),this.width=b.getNumColumns()+2,this.options.compact?(this.panel=document.createElement("div"),this.container.appendChild(this.panel)):(this.title=this.theme.getHeader(this.getTitle()),this.container.appendChild(this.title),this.title_controls=this.theme.getHeaderButtonHolder(),this.title.appendChild(this.title_controls),this.schema.description&&(this.description=this.theme.getDescription(this.schema.description),this.container.appendChild(this.description)),this.panel=this.theme.getIndentedPanel(),this.container.appendChild(this.panel),this.error_holder=document.createElement("div"),this.panel.appendChild(this.error_holder)),this.panel.appendChild(this.table),this.controls=this.theme.getButtonHolder(),this.panel.appendChild(this.controls),this.item_has_child_editors)for(var c=b.getChildEditors(),d=b.property_order||Object.keys(c),e=0;e<d.length;e++){var f=a.theme.getTableHeaderCell(c[d[e]].getTitle());c[d[e]].options.hidden&&(f.style.display="none"),a.header_row.appendChild(f)}else a.header_row.appendChild(a.theme.getTableHeaderCell(this.item_title));b.destroy(),this.row_holder.innerHTML="",
    // Row Controls column
    this.controls_header_cell=a.theme.getTableHeaderCell(" "),a.header_row.appendChild(this.controls_header_cell),
    // Add controls
    this.addControls()},onChildEditorChange:function(a){this.refreshValue(),this._super()},getItemDefault:function(){return e({},{"default":this.item_default})["default"]},getItemTitle:function(){return this.item_title},getElementEditor:function(a,b){var c=e({},this.schema.items),d=this.jsoneditor.getEditorClass(c,this.jsoneditor),f=this.row_holder.appendChild(this.theme.getTableRow()),g=f;this.item_has_child_editors||(g=this.theme.getTableCell(),f.appendChild(g));var h=this.jsoneditor.createEditor(d,{jsoneditor:this.jsoneditor,schema:c,container:g,path:this.path+"."+a,parent:this,compact:!0,table_row:!0});return h.preBuild(),b||(h.build(),h.postBuild(),h.controls_cell=f.appendChild(this.theme.getTableCell()),h.row=f,h.table_controls=this.theme.getButtonHolder(),h.controls_cell.appendChild(h.table_controls),h.table_controls.style.margin=0,h.table_controls.style.padding=0),h},destroy:function(){this.innerHTML="",this.title&&this.title.parentNode&&this.title.parentNode.removeChild(this.title),this.description&&this.description.parentNode&&this.description.parentNode.removeChild(this.description),this.row_holder&&this.row_holder.parentNode&&this.row_holder.parentNode.removeChild(this.row_holder),this.table&&this.table.parentNode&&this.table.parentNode.removeChild(this.table),this.panel&&this.panel.parentNode&&this.panel.parentNode.removeChild(this.panel),this.rows=this.title=this.description=this.row_holder=this.table=this.panel=null,this._super()},setValue:function(a,b){
    // Make sure value has between minItems and maxItems items in it
    if(
    // Update the array's value, adding/removing rows when necessary
    a=a||[],this.schema.minItems)for(;a.length<this.schema.minItems;)a.push(this.getItemDefault());this.schema.maxItems&&a.length>this.schema.maxItems&&(a=a.slice(0,this.schema.maxItems));var c=JSON.stringify(a);if(c!==this.serialized){var d=!1,e=this;f(a,function(a,b){e.rows[a]?
    // TODO: don't set the row's value if it hasn't changed
    e.rows[a].setValue(b):(e.addRow(b),d=!0)});for(var g=a.length;g<e.rows.length;g++){var h=e.rows[g].container;e.item_has_child_editors||e.rows[g].row.parentNode.removeChild(e.rows[g].row),e.rows[g].destroy(),h.parentNode&&h.parentNode.removeChild(h),e.rows[g]=null,d=!0}e.rows=e.rows.slice(0,a.length),e.refreshValue(),(d||b)&&e.refreshRowButtons(),e.onChange()}},refreshRowButtons:function(){var a=this,b=this.schema.minItems&&this.schema.minItems>=this.rows.length,c=!1;f(this.rows,function(d,e){
    // Hide the move down button for the last row
    e.movedown_button&&(d===a.rows.length-1?e.movedown_button.style.display="none":(c=!0,e.movedown_button.style.display="")),
    // Hide the delete button if we have minItems items
    e.delete_button&&(b?e.delete_button.style.display="none":(c=!0,e.delete_button.style.display="")),e.moveup_button&&(c=!0)}),
    // Show/hide controls column in table
    f(this.rows,function(a,b){c?b.controls_cell.style.display="":b.controls_cell.style.display="none"}),c?this.controls_header_cell.style.display="":this.controls_header_cell.style.display="none";var d=!1;this.value.length?1===this.value.length?(this.table.style.display="",this.remove_all_rows_button.style.display="none",
    // If there are minItems items in the array, or configured to hide the delete_last_row button, hide the delete button beneath the rows
    b||this.hide_delete_last_row_buttons?this.delete_last_row_button.style.display="none":(this.delete_last_row_button.style.display="",d=!0)):(this.table.style.display="",b||this.hide_delete_last_row_buttons?this.delete_last_row_button.style.display="none":(this.delete_last_row_button.style.display="",d=!0),b||this.hide_delete_all_rows_buttons?this.remove_all_rows_button.style.display="none":(this.remove_all_rows_button.style.display="",d=!0)):(this.delete_last_row_button.style.display="none",this.remove_all_rows_button.style.display="none",this.table.style.display="none"),
    // If there are maxItems in the array, hide the add button beneath the rows
    this.schema.maxItems&&this.schema.maxItems<=this.rows.length||this.hide_add_button?this.add_row_button.style.display="none":(this.add_row_button.style.display="",d=!0),d?this.controls.style.display="":this.controls.style.display="none"},refreshValue:function(){var a=this;this.value=[],f(this.rows,function(b,c){
    // Get the value for this editor
    a.value[b]=c.getValue()}),this.serialized=JSON.stringify(this.value)},addRow:function(a){var b=this,c=this.rows.length;b.rows[c]=this.getElementEditor(c);var d=b.rows[c].table_controls;
    // Buttons to delete row, move row up, and move row down
    this.hide_delete_buttons||(b.rows[c].delete_button=this.getButton("","delete",this.translate("button_delete_row_title_short")),b.rows[c].delete_button.className+=" delete",b.rows[c].delete_button.setAttribute("data-i",c),b.rows[c].delete_button.addEventListener("click",function(a){if(a.preventDefault(),a.stopPropagation(),!b.askConfirmation())return!1;var c=1*this.getAttribute("data-i"),d=b.getValue(),e=[];f(d,function(a,b){a!==c&&// If this is the one we're deleting
    e.push(b)}),b.setValue(e),b.onChange(!0)}),d.appendChild(b.rows[c].delete_button)),c&&!this.hide_move_buttons&&(b.rows[c].moveup_button=this.getButton("","moveup",this.translate("button_move_up_title")),b.rows[c].moveup_button.className+=" moveup",b.rows[c].moveup_button.setAttribute("data-i",c),b.rows[c].moveup_button.addEventListener("click",function(a){a.preventDefault(),a.stopPropagation();var c=1*this.getAttribute("data-i");if(!(c<=0)){var d=b.getValue(),e=d[c-1];d[c-1]=d[c],d[c]=e,b.setValue(d),b.onChange(!0)}}),d.appendChild(b.rows[c].moveup_button)),this.hide_move_buttons||(b.rows[c].movedown_button=this.getButton("","movedown",this.translate("button_move_down_title")),b.rows[c].movedown_button.className+=" movedown",b.rows[c].movedown_button.setAttribute("data-i",c),b.rows[c].movedown_button.addEventListener("click",function(a){a.preventDefault(),a.stopPropagation();var c=1*this.getAttribute("data-i"),d=b.getValue();if(!(c>=d.length-1)){var e=d[c+1];d[c+1]=d[c],d[c]=e,b.setValue(d),b.onChange(!0)}}),d.appendChild(b.rows[c].movedown_button)),a&&b.rows[c].setValue(a)},addControls:function(){var a=this;this.collapsed=!1,this.toggle_button=this.getButton("","collapse",this.translate("button_collapse")),this.title_controls&&(this.title_controls.appendChild(this.toggle_button),this.toggle_button.addEventListener("click",function(b){b.preventDefault(),b.stopPropagation(),a.collapsed?(a.collapsed=!1,a.panel.style.display="",a.setButtonText(this,"","collapse",a.translate("button_collapse"))):(a.collapsed=!0,a.panel.style.display="none",a.setButtonText(this,"","expand",a.translate("button_expand")))}),
    // If it should start collapsed
    this.options.collapsed&&g(this.toggle_button,"click"),
    // Collapse button disabled
    this.schema.options&&"undefined"!=typeof this.schema.options.disable_collapse?this.schema.options.disable_collapse&&(this.toggle_button.style.display="none"):this.jsoneditor.options.disable_collapse&&(this.toggle_button.style.display="none")),
    // Add "new row" and "delete last" buttons below editor
    this.add_row_button=this.getButton(this.getItemTitle(),"add",this.translate("button_add_row_title",[this.getItemTitle()])),this.add_row_button.addEventListener("click",function(b){b.preventDefault(),b.stopPropagation(),a.addRow(),a.refreshValue(),a.refreshRowButtons(),a.onChange(!0)}),a.controls.appendChild(this.add_row_button),this.delete_last_row_button=this.getButton(this.translate("button_delete_last",[this.getItemTitle()]),"delete",this.translate("button_delete_last_title",[this.getItemTitle()])),this.delete_last_row_button.addEventListener("click",function(b){if(b.preventDefault(),b.stopPropagation(),!a.askConfirmation())return!1;var c=a.getValue();c.pop(),a.setValue(c),a.onChange(!0)}),a.controls.appendChild(this.delete_last_row_button),this.remove_all_rows_button=this.getButton(this.translate("button_delete_all"),"delete",this.translate("button_delete_all_title")),this.remove_all_rows_button.addEventListener("click",function(b){return b.preventDefault(),b.stopPropagation(),!!a.askConfirmation()&&(a.setValue([]),void a.onChange(!0))}),a.controls.appendChild(this.remove_all_rows_button)}}),
    // Multiple Editor (for when `type` is an array, also when `oneOf` is present)
    h.defaults.editors.multiple=h.AbstractEditor.extend({register:function(){if(this.editors){for(var a=0;a<this.editors.length;a++)this.editors[a]&&this.editors[a].unregister();this.editors[this.type]&&this.editors[this.type].register()}this._super()},unregister:function(){if(this._super(),this.editors)for(var a=0;a<this.editors.length;a++)this.editors[a]&&this.editors[a].unregister()},getNumColumns:function(){return this.editors[this.type]?Math.max(this.editors[this.type].getNumColumns(),4):4},enable:function(){if(!this.always_disabled){if(this.editors)for(var a=0;a<this.editors.length;a++)this.editors[a]&&this.editors[a].enable();this.switcher.disabled=!1,this._super()}},disable:function(a){if(a&&(this.always_disabled=!0),this.editors)for(var b=0;b<this.editors.length;b++)this.editors[b]&&this.editors[b].disable(a);this.switcher.disabled=!0,this._super()},switchEditor:function(a){var b=this;this.editors[a]||this.buildChildEditor(a);var c=b.getValue();b.type=a,b.register(),f(b.editors,function(a,d){d&&(b.type===a?(b.keep_values&&d.setValue(c,!0),d.container.style.display=""):d.container.style.display="none")}),b.refreshValue(),b.refreshHeaderText()},buildChildEditor:function(a){var b=this,c=this.types[a],d=b.theme.getChildEditorHolder();b.editor_holder.appendChild(d);var f;"string"==typeof c?(f=e({},b.schema),f.type=c):(f=e({},b.schema,c),f=b.jsoneditor.expandRefs(f),
    // If we need to merge `required` arrays
    c&&c.required&&Array.isArray(c.required)&&b.schema.required&&Array.isArray(b.schema.required)&&(f.required=b.schema.required.concat(c.required)));var g=b.jsoneditor.getEditorClass(f);b.editors[a]=b.jsoneditor.createEditor(g,{jsoneditor:b.jsoneditor,schema:f,container:d,path:b.path,parent:b,required:!0}),b.editors[a].preBuild(),b.editors[a].build(),b.editors[a].postBuild(),b.editors[a].header&&(b.editors[a].header.style.display="none"),b.editors[a].option=b.switcher_options[a],d.addEventListener("change_header_text",function(){b.refreshHeaderText()}),a!==b.type&&(d.style.display="none")},preBuild:function(){if(this.types=[],this.type=0,this.editors=[],this.validators=[],this.keep_values=!0,"undefined"!=typeof this.jsoneditor.options.keep_oneof_values&&(this.keep_values=this.jsoneditor.options.keep_oneof_values),"undefined"!=typeof this.options.keep_oneof_values&&(this.keep_values=this.options.keep_oneof_values),this.schema.oneOf)this.oneOf=!0,this.types=this.schema.oneOf,delete this.schema.oneOf;else if(this.schema.anyOf)this.anyOf=!0,this.types=this.schema.anyOf,delete this.schema.anyOf;else{if(this.schema.type&&"any"!==this.schema.type)Array.isArray(this.schema.type)?this.types=this.schema.type:this.types=[this.schema.type];else
    // If any of these primitive types are disallowed
    if(this.types=["string","number","integer","boolean","object","array","null"],this.schema.disallow){var a=this.schema.disallow;"object"==typeof a&&Array.isArray(a)||(a=[a]);var b=[];f(this.types,function(c,d){a.indexOf(d)===-1&&b.push(d)}),this.types=b}delete this.schema.type}this.display_text=this.getDisplayText(this.types)},build:function(){var a=this,b=this.container;this.header=this.label=this.theme.getFormInputLabel(this.getTitle()),this.container.appendChild(this.header),this.switcher=this.theme.getSwitcher(this.display_text),b.appendChild(this.switcher),this.switcher.addEventListener("change",function(b){b.preventDefault(),b.stopPropagation(),a.switchEditor(a.display_text.indexOf(this.value)),a.onChange(!0)}),this.editor_holder=document.createElement("div"),b.appendChild(this.editor_holder);var c={};a.jsoneditor.options.custom_validators&&(c.custom_validators=a.jsoneditor.options.custom_validators),this.switcher_options=this.theme.getSwitcherOptions(this.switcher),f(this.types,function(b,d){a.editors[b]=!1;var f;"string"==typeof d?(f=e({},a.schema),f.type=d):(f=e({},a.schema,d),
    // If we need to merge `required` arrays
    d.required&&Array.isArray(d.required)&&a.schema.required&&Array.isArray(a.schema.required)&&(f.required=a.schema.required.concat(d.required))),a.validators[b]=new h.Validator(a.jsoneditor,f,c)}),this.switchEditor(0)},onChildEditorChange:function(a){this.editors[this.type]&&(this.refreshValue(),this.refreshHeaderText()),this._super()},refreshHeaderText:function(){var a=this.getDisplayText(this.types);f(this.switcher_options,function(b,c){c.textContent=a[b]})},refreshValue:function(){this.value=this.editors[this.type].getValue()},setValue:function(a,b){
    // Determine type by getting the first one that validates
    var c=this,d=this.type;f(this.validators,function(b,d){if(!d.validate(a).length)return c.type=b,c.switcher.value=c.display_text[b],!1});var e=this.type!=d;e&&this.switchEditor(this.type),this.editors[this.type].setValue(a,b),this.refreshValue(),c.onChange(e)},destroy:function(){f(this.editors,function(a,b){b&&b.destroy()}),this.editor_holder&&this.editor_holder.parentNode&&this.editor_holder.parentNode.removeChild(this.editor_holder),this.switcher&&this.switcher.parentNode&&this.switcher.parentNode.removeChild(this.switcher),this._super()},showValidationErrors:function(a){var b=this;
    // oneOf and anyOf error paths need to remove the oneOf[i] part before passing to child editors
    if(this.oneOf||this.anyOf){var c=this.oneOf?"oneOf":"anyOf";f(this.editors,function(d,g){if(g){var h=b.path+"."+c+"["+d+"]",i=[];f(a,function(a,c){if(c.path.substr(0,h.length)===h){var d=e({},c);d.path=b.path+d.path.substr(h.length),i.push(d)}}),g.showValidationErrors(i)}})}else f(this.editors,function(b,c){c&&c.showValidationErrors(a)})}}),
    // Enum Editor (used for objects and arrays with enumerated values)
    h.defaults.editors["enum"]=h.AbstractEditor.extend({getNumColumns:function(){return 4},build:function(){this.container;this.title=this.header=this.label=this.theme.getFormInputLabel(this.getTitle()),this.container.appendChild(this.title),this.options.enum_titles=this.options.enum_titles||[],this["enum"]=this.schema["enum"],this.selected=0,this.select_options=[],this.html_values=[];for(var a=this,b=0;b<this["enum"].length;b++)this.select_options[b]=this.options.enum_titles[b]||"Value "+(b+1),this.html_values[b]=this.getHTML(this["enum"][b]);
    // Switcher
    this.switcher=this.theme.getSwitcher(this.select_options),this.container.appendChild(this.switcher),
    // Display area
    this.display_area=this.theme.getIndentedPanel(),this.container.appendChild(this.display_area),this.options.hide_display&&(this.display_area.style.display="none"),this.switcher.addEventListener("change",function(){a.selected=a.select_options.indexOf(this.value),a.value=a["enum"][a.selected],a.refreshValue(),a.onChange(!0)}),this.value=this["enum"][0],this.refreshValue(),1===this["enum"].length&&(this.switcher.style.display="none")},refreshValue:function(){var a=this;a.selected=-1;var b=JSON.stringify(this.value);return f(this["enum"],function(c,d){if(b===JSON.stringify(d))return a.selected=c,!1}),a.selected<0?void a.setValue(a["enum"][0]):(this.switcher.value=this.select_options[this.selected],void(this.display_area.innerHTML=this.html_values[this.selected]))},enable:function(){this.always_disabled||(this.switcher.disabled=!1,this._super())},disable:function(a){a&&(this.always_disabled=!0),this.switcher.disabled=!0,this._super()},getHTML:function(a){var b=this;if(null===a)return"<em>null</em>";if("object"==typeof a){
    // TODO: use theme
    var c="";return f(a,function(d,e){var f=b.getHTML(e);
    // Add the keys to object children
    Array.isArray(a)||(
    // TODO: use theme
    f="<div><em>"+d+"</em>: "+f+"</div>"),
    // TODO: use theme
    c+="<li>"+f+"</li>"}),c=Array.isArray(a)?"<ol>"+c+"</ol>":"<ul style='margin-top:0;margin-bottom:0;padding-top:0;padding-bottom:0;'>"+c+"</ul>"}return"boolean"==typeof a?a?"true":"false":"string"==typeof a?a.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"):a},setValue:function(a){this.value!==a&&(this.value=a,this.refreshValue(),this.onChange())},destroy:function(){this.display_area&&this.display_area.parentNode&&this.display_area.parentNode.removeChild(this.display_area),this.title&&this.title.parentNode&&this.title.parentNode.removeChild(this.title),this.switcher&&this.switcher.parentNode&&this.switcher.parentNode.removeChild(this.switcher),this._super()}}),h.defaults.editors.select=h.AbstractEditor.extend({setValue:function(a,b){a=this.typecast(a||"");
    // Sanitize value before setting it
    var c=a;this.enum_values.indexOf(c)<0&&(c=this.enum_values[0]),this.value!==c&&(b?this.is_dirty=!1:"change"===this.jsoneditor.options.show_errors&&(this.is_dirty=!0),this.input.value=this.enum_options[this.enum_values.indexOf(c)],this.select2&&(this.select2v4?this.select2.val(this.input.value).trigger("change"):this.select2.select2("val",this.input.value)),this.value=c,this.onChange(),this.change())},register:function(){this._super(),this.input&&this.input.setAttribute("name",this.formname)},unregister:function(){this._super(),this.input&&this.input.removeAttribute("name")},getNumColumns:function(){if(!this.enum_options)return 3;for(var a=this.getTitle().length,b=0;b<this.enum_options.length;b++)a=Math.max(a,this.enum_options[b].length+4);return Math.min(12,Math.max(a/7,2))},typecast:function(a){return"boolean"===this.schema.type?!!a:"number"===this.schema.type?1*a:"integer"===this.schema.type?Math.floor(1*a):""+a},getValue:function(){return this.dependenciesFulfilled?this.typecast(this.value):b},preBuild:function(){var a=this;this.input_type="select",this.enum_options=[],this.enum_values=[],this.enum_display=[];var c;
    // Enum options enumerated
    if(this.schema["enum"]){var d=this.schema.options&&this.schema.options.enum_titles||[];f(this.schema["enum"],function(b,c){a.enum_options[b]=""+c,a.enum_display[b]=""+(d[b]||c),a.enum_values[b]=a.typecast(c)}),this.isRequired()||(a.enum_display.unshift(" "),a.enum_options.unshift("undefined"),a.enum_values.unshift(b))}else if("boolean"===this.schema.type)a.enum_display=this.schema.options&&this.schema.options.enum_titles||["true","false"],a.enum_options=["1",""],a.enum_values=[!0,!1],this.isRequired()||(a.enum_display.unshift(" "),a.enum_options.unshift("undefined"),a.enum_values.unshift(b));else{if(!this.schema.enumSource)throw"'select' editor requires the enum property to be set.";
    // Shortcut declaration for using a single array
    if(this.enumSource=[],this.enum_display=[],this.enum_options=[],this.enum_values=[],Array.isArray(this.schema.enumSource))for(c=0;c<this.schema.enumSource.length;c++)
    // Shorthand for watched variable
    "string"==typeof this.schema.enumSource[c]?this.enumSource[c]={source:this.schema.enumSource[c]}:Array.isArray(this.schema.enumSource[c])?this.enumSource[c]=this.schema.enumSource[c]:this.enumSource[c]=e({},this.schema.enumSource[c]);else this.schema.enumValue?this.enumSource=[{source:this.schema.enumSource,value:this.schema.enumValue}]:this.enumSource=[{source:this.schema.enumSource}];
    // Now, enumSource is an array of sources
    // Walk through this array and fix up the values
    for(c=0;c<this.enumSource.length;c++)this.enumSource[c].value&&(this.enumSource[c].value=this.jsoneditor.compileTemplate(this.enumSource[c].value,this.template_engine)),this.enumSource[c].title&&(this.enumSource[c].title=this.jsoneditor.compileTemplate(this.enumSource[c].title,this.template_engine)),this.enumSource[c].filter&&(this.enumSource[c].filter=this.jsoneditor.compileTemplate(this.enumSource[c].filter,this.template_engine))}},build:function(){var a=this;this.options.compact||(this.header=this.label=this.theme.getFormInputLabel(this.getTitle())),this.schema.description&&(this.description=this.theme.getFormInputDescription(this.schema.description)),this.options.infoText&&(this.infoButton=this.theme.getInfoButton(this.options.infoText)),this.options.compact&&(this.container.className+=" compact"),this.input=this.theme.getSelectInput(this.enum_options),this.theme.setSelectOptions(this.input,this.enum_options,this.enum_display),(this.schema.readOnly||this.schema.readonly)&&(this.always_disabled=!0,this.input.disabled=!0),this.input.addEventListener("change",function(b){b.preventDefault(),b.stopPropagation(),a.onInputChange()}),this.control=this.theme.getFormControl(this.label,this.input,this.description,this.infoButton),this.container.appendChild(this.control),this.value=this.enum_values[0]},onInputChange:function(){var a,b=this.typecast(this.input.value);
    // Invalid option, use first option instead
    a=this.enum_values.indexOf(b)===-1?this.enum_values[0]:this.enum_values[this.enum_values.indexOf(b)],
    // If valid hasn't changed
    a!==this.value&&(this.is_dirty=!0,
    // Store new value and propogate change event
    this.value=a,this.onChange(!0))},setupSelect2:function(){
    // If the Select2 library is loaded use it when we have lots of items
    if(window.jQuery&&window.jQuery.fn&&window.jQuery.fn.select2&&(this.enum_options.length>2||this.enum_options.length&&this.enumSource)){var a=e({},h.plugins.select2);this.schema.options&&this.schema.options.select2_options&&(a=e(a,this.schema.options.select2_options)),this.select2=window.jQuery(this.input).select2(a),this.select2v4=this.select2.select2.hasOwnProperty("amd");var b=this;this.select2.on("select2-blur",function(){b.select2v4?b.input.value=b.select2.val():b.input.value=b.select2.select2("val"),b.onInputChange()}),this.select2.on("change",function(){b.select2v4?b.input.value=b.select2.val():b.input.value=b.select2.select2("val"),b.onInputChange()})}else this.select2=null},postBuild:function(){this._super(),this.theme.afterInputReady(this.input),this.setupSelect2()},onWatchedFieldChange:function(){var a,b;
    // If this editor uses a dynamic select box
    if(this.enumSource){a=this.getWatchedFieldValues();for(var c=[],d=[],e=0;e<this.enumSource.length;e++)
    // Constant values
    if(Array.isArray(this.enumSource[e]))c=c.concat(this.enumSource[e]),d=d.concat(this.enumSource[e]);else{var f=[];if(
    // Static list of items
    f=Array.isArray(this.enumSource[e].source)?this.enumSource[e].source:a[this.enumSource[e].source]){
    // Filter the items
    if(
    // Only use a predefined part of the array
    this.enumSource[e].slice&&(f=Array.prototype.slice.apply(f,this.enumSource[e].slice)),this.enumSource[e].filter){var g=[];for(b=0;b<f.length;b++)this.enumSource[e].filter({i:b,item:f[b],watched:a})&&g.push(f[b]);f=g}var h=[],i=[];for(b=0;b<f.length;b++){var j=f[b];
    // Rendered value
    this.enumSource[e].value?i[b]=this.enumSource[e].value({i:b,item:j}):i[b]=f[b],
    // Rendered title
    this.enumSource[e].title?h[b]=this.enumSource[e].title({i:b,item:j}):h[b]=i[b]}
    // TODO: sort
    c=c.concat(i),d=d.concat(h)}}var k=this.value;this.theme.setSelectOptions(this.input,c,d),this.enum_options=c,this.enum_display=d,this.enum_values=c,this.select2&&this.select2.select2("destroy"),
    // If the previous value is still in the new select options, stick with it
    c.indexOf(k)!==-1?(this.input.value=k,this.value=k):(this.input.value=c[0],this.value=this.typecast(c[0]||""),this.parent?this.parent.onChildEditorChange(this):this.jsoneditor.onChange(),this.jsoneditor.notifyWatchers(this.path)),this.setupSelect2()}this._super()},enable:function(){this.always_disabled||(this.input.disabled=!1,this.select2&&(this.select2v4?this.select2.prop("disabled",!1):this.select2.select2("enable",!0))),this._super()},disable:function(a){a&&(this.always_disabled=!0),this.input.disabled=!0,this.select2&&(this.select2v4?this.select2.prop("disabled",!0):this.select2.select2("enable",!1)),this._super()},destroy:function(){this.label&&this.label.parentNode&&this.label.parentNode.removeChild(this.label),this.description&&this.description.parentNode&&this.description.parentNode.removeChild(this.description),this.input&&this.input.parentNode&&this.input.parentNode.removeChild(this.input),this.select2&&(this.select2.select2("destroy"),this.select2=null),this._super()},showValidationErrors:function(a){var b=this;if("always"===this.jsoneditor.options.show_errors);else if(!this.is_dirty&&this.previous_error_setting===this.jsoneditor.options.show_errors)return;this.previous_error_setting=this.jsoneditor.options.show_errors;var c=[];f(a,function(a,d){d.path===b.path&&c.push(d.message)}),c.length?this.theme.addInputError(this.input,c.join(". ")+"."):this.theme.removeInputError(this.input)}}),h.defaults.editors.selectize=h.AbstractEditor.extend({setValue:function(a,b){a=this.typecast(a||"");
    // Sanitize value before setting it
    var c=a;this.enum_values.indexOf(c)<0&&(c=this.enum_values[0]),this.value!==c&&(this.input.value=this.enum_options[this.enum_values.indexOf(c)],this.selectize&&this.selectize[0].selectize.addItem(c),this.value=c,this.onChange())},register:function(){this._super(),this.input&&this.input.setAttribute("name",this.formname)},unregister:function(){this._super(),this.input&&this.input.removeAttribute("name")},getNumColumns:function(){if(!this.enum_options)return 3;for(var a=this.getTitle().length,b=0;b<this.enum_options.length;b++)a=Math.max(a,this.enum_options[b].length+4);return Math.min(12,Math.max(a/7,2))},typecast:function(a){return"boolean"===this.schema.type?!!a:"number"===this.schema.type?1*a:"integer"===this.schema.type?Math.floor(1*a):""+a},getValue:function(){return this.dependenciesFulfilled?this.value:b},preBuild:function(){var a=this;this.input_type="select",this.enum_options=[],this.enum_values=[],this.enum_display=[];var b;
    // Enum options enumerated
    if(this.schema["enum"]){var c=this.schema.options&&this.schema.options.enum_titles||[];f(this.schema["enum"],function(b,d){a.enum_options[b]=""+d,a.enum_display[b]=""+(c[b]||d),a.enum_values[b]=a.typecast(d)})}else if("boolean"===this.schema.type)a.enum_display=this.schema.options&&this.schema.options.enum_titles||["true","false"],a.enum_options=["1","0"],a.enum_values=[!0,!1];else{if(!this.schema.enumSource)throw"'select' editor requires the enum property to be set.";
    // Shortcut declaration for using a single array
    if(this.enumSource=[],this.enum_display=[],this.enum_options=[],this.enum_values=[],Array.isArray(this.schema.enumSource))for(b=0;b<this.schema.enumSource.length;b++)
    // Shorthand for watched variable
    "string"==typeof this.schema.enumSource[b]?this.enumSource[b]={source:this.schema.enumSource[b]}:Array.isArray(this.schema.enumSource[b])?this.enumSource[b]=this.schema.enumSource[b]:this.enumSource[b]=e({},this.schema.enumSource[b]);else this.schema.enumValue?this.enumSource=[{source:this.schema.enumSource,value:this.schema.enumValue}]:this.enumSource=[{source:this.schema.enumSource}];
    // Now, enumSource is an array of sources
    // Walk through this array and fix up the values
    for(b=0;b<this.enumSource.length;b++)this.enumSource[b].value&&(this.enumSource[b].value=this.jsoneditor.compileTemplate(this.enumSource[b].value,this.template_engine)),this.enumSource[b].title&&(this.enumSource[b].title=this.jsoneditor.compileTemplate(this.enumSource[b].title,this.template_engine)),this.enumSource[b].filter&&(this.enumSource[b].filter=this.jsoneditor.compileTemplate(this.enumSource[b].filter,this.template_engine))}},build:function(){var a=this;this.options.compact||(this.header=this.label=this.theme.getFormInputLabel(this.getTitle())),this.schema.description&&(this.description=this.theme.getFormInputDescription(this.schema.description)),this.options.infoText&&(this.infoButton=this.theme.getInfoButton(this.options.infoText)),this.options.compact&&(this.container.className+=" compact"),this.input=this.theme.getSelectInput(this.enum_options),this.theme.setSelectOptions(this.input,this.enum_options,this.enum_display),(this.schema.readOnly||this.schema.readonly)&&(this.always_disabled=!0,this.input.disabled=!0),this.input.addEventListener("change",function(b){b.preventDefault(),b.stopPropagation(),a.onInputChange()}),this.control=this.theme.getFormControl(this.label,this.input,this.description,this.infoButton),this.container.appendChild(this.control),this.value=this.enum_values[0]},onInputChange:function(){
    //console.log("onInputChange");
    var a=this.input.value,b=a;this.enum_options.indexOf(a)===-1&&(b=this.enum_options[0]),
    //this.value = this.enum_values[this.enum_options.indexOf(val)];
    this.value=a,this.onChange(!0)},setupSelectize:function(){
    // If the Selectize library is loaded use it when we have lots of items
    var a=this;if(window.jQuery&&window.jQuery.fn&&window.jQuery.fn.selectize&&(this.enum_options.length>=2||this.enum_options.length&&this.enumSource)){var c=e({},h.plugins.selectize);this.schema.options&&this.schema.options.selectize_options&&(c=e(c,this.schema.options.selectize_options)),this.selectize=window.jQuery(this.input).selectize(e(c,{
    // set the create option to true by default, or to the user specified value if defined
    create:c.create===b||c.create,onChange:function(){a.onInputChange()}}))}else this.selectize=null},postBuild:function(){this._super(),this.theme.afterInputReady(this.input),this.setupSelectize()},onWatchedFieldChange:function(){var a,c;
    // If this editor uses a dynamic select box
    if(this.enumSource){a=this.getWatchedFieldValues();for(var d=[],e=[],f=0;f<this.enumSource.length;f++)
    // Constant values
    if(Array.isArray(this.enumSource[f]))d=d.concat(this.enumSource[f]),e=e.concat(this.enumSource[f]);else if(a[this.enumSource[f].source]){var g=a[this.enumSource[f].source];
    // Filter the items
    if(
    // Only use a predefined part of the array
    this.enumSource[f].slice&&(g=Array.prototype.slice.apply(g,this.enumSource[f].slice)),this.enumSource[f].filter){var h=[];for(c=0;c<g.length;c++)this.enumSource[f].filter({i:c,item:g[c]})&&h.push(g[c]);g=h}var i=[],j=[];for(c=0;c<g.length;c++){var k=g[c];
    // Rendered value
    this.enumSource[f].value?j[c]=this.enumSource[f].value({i:c,item:k}):j[c]=g[c],
    // Rendered title
    this.enumSource[f].title?i[c]=this.enumSource[f].title({i:c,item:k}):i[c]=j[c]}
    // TODO: sort
    d=d.concat(j),e=e.concat(i)}var l=this.value;
    // Check to see if this item is in the list
    // Note: We have to skip empty string for watch lists to work properly
    l!==b&&""!==l&&d.indexOf(l)===-1&&(
    // item is not in the list. Add it.
    d=d.concat(l),e=e.concat(l)),this.theme.setSelectOptions(this.input,d,e),this.enum_options=d,this.enum_display=e,this.enum_values=d,
    // If the previous value is still in the new select options, stick with it
    d.indexOf(l)!==-1?(this.input.value=l,this.value=l):(this.input.value=d[0],this.value=d[0]||"",this.parent?this.parent.onChildEditorChange(this):this.jsoneditor.onChange(),this.jsoneditor.notifyWatchers(this.path)),this.selectize?
    // Update the Selectize options
    this.updateSelectizeOptions(d):this.setupSelectize(),this._super()}},updateSelectizeOptions:function(a){var b=this.selectize[0].selectize,c=this;b.off(),b.clearOptions();for(var d in a)b.addOption({value:a[d],text:a[d]});b.addItem(this.value),b.on("change",function(){c.onInputChange()})},enable:function(){this.always_disabled||(this.input.disabled=!1,this.selectize&&this.selectize[0].selectize.unlock(),this._super())},disable:function(a){a&&(this.always_disabled=!0),this.input.disabled=!0,this.selectize&&this.selectize[0].selectize.lock(),this._super()},destroy:function(){this.label&&this.label.parentNode&&this.label.parentNode.removeChild(this.label),this.description&&this.description.parentNode&&this.description.parentNode.removeChild(this.description),this.input&&this.input.parentNode&&this.input.parentNode.removeChild(this.input),this.selectize&&(this.selectize[0].selectize.destroy(),this.selectize=null),this._super()}}),h.defaults.editors.multiselect=h.AbstractEditor.extend({preBuild:function(){this._super();var a;this.select_options={},this.select_values={};var b=this.jsoneditor.expandRefs(this.schema.items||{}),c=b["enum"]||[],d=b.options?b.options.enum_titles||[]:[];for(this.option_keys=[],this.option_titles=[],a=0;a<c.length;a++)
    // If the sanitized value is different from the enum value, don't include it
    this.sanitize(c[a])===c[a]&&(this.option_keys.push(c[a]+""),this.option_titles.push((d[a]||c[a])+""),this.select_values[c[a]+""]=c[a])},build:function(){var a,b=this;if(this.options.compact||(this.header=this.label=this.theme.getFormInputLabel(this.getTitle())),this.schema.description&&(this.description=this.theme.getFormInputDescription(this.schema.description)),!this.schema.format&&this.option_keys.length<8||"checkbox"===this.schema.format){for(this.input_type="checkboxes",this.inputs={},this.controls={},a=0;a<this.option_keys.length;a++){this.inputs[this.option_keys[a]]=this.theme.getCheckbox(),this.select_options[this.option_keys[a]]=this.inputs[this.option_keys[a]];var c=this.theme.getCheckboxLabel(this.option_titles[a]);this.controls[this.option_keys[a]]=this.theme.getFormControl(c,this.inputs[this.option_keys[a]])}this.control=this.theme.getMultiCheckboxHolder(this.controls,this.label,this.description)}else{for(this.input_type="select",this.input=this.theme.getSelectInput(this.option_keys),this.theme.setSelectOptions(this.input,this.option_keys,this.option_titles),this.input.multiple=!0,this.input.size=Math.min(10,this.option_keys.length),a=0;a<this.option_keys.length;a++)this.select_options[this.option_keys[a]]=this.input.children[a];(this.schema.readOnly||this.schema.readonly)&&(this.always_disabled=!0,this.input.disabled=!0),this.control=this.theme.getFormControl(this.label,this.input,this.description)}this.container.appendChild(this.control),this.control.addEventListener("change",function(c){c.preventDefault(),c.stopPropagation();var d=[];for(a=0;a<b.option_keys.length;a++)(b.select_options[b.option_keys[a]].selected||b.select_options[b.option_keys[a]].checked)&&d.push(b.select_values[b.option_keys[a]]);b.updateValue(d),b.onChange(!0)})},setValue:function(a,b){var c;
    // Make sure we are dealing with an array of strings so we can check for strict equality
    for(a=a||[],"object"!=typeof a?a=[a]:Array.isArray(a)||(a=[]),c=0;c<a.length;c++)"string"!=typeof a[c]&&(a[c]+="");
    // Update selected status of options
    for(c in this.select_options)this.select_options.hasOwnProperty(c)&&(this.select_options[c]["select"===this.input_type?"selected":"checked"]=a.indexOf(c)!==-1);this.updateValue(a),this.onChange()},setupSelect2:function(){if(window.jQuery&&window.jQuery.fn&&window.jQuery.fn.select2){var a=window.jQuery.extend({},h.plugins.select2);this.schema.options&&this.schema.options.select2_options&&(a=e(a,this.schema.options.select2_options)),this.select2=window.jQuery(this.input).select2(a),this.select2v4=this.select2.select2.hasOwnProperty("amd");var b=this;this.select2.on("select2-blur",function(){b.select2v4?b.value=b.select2.val():b.value=b.select2.select2("val"),b.onChange(!0)}),this.select2.on("change",function(){b.select2v4?b.value=b.select2.val():b.value=b.select2.select2("val"),b.onChange(!0)})}else this.select2=null},onInputChange:function(){this.value=this.input.value,this.onChange(!0)},postBuild:function(){this._super(),this.setupSelect2()},register:function(){this._super(),this.input&&this.input.setAttribute("name",this.formname)},unregister:function(){this._super(),this.input&&this.input.removeAttribute("name")},getNumColumns:function(){var a=this.getTitle().length;for(var b in this.select_values)this.select_values.hasOwnProperty(b)&&(a=Math.max(a,(this.select_values[b]+"").length+4));return Math.min(12,Math.max(a/7,2))},updateValue:function(a){for(var b=!1,c=[],d=0;d<a.length;d++)if(this.select_options[a[d]+""]){var e=this.sanitize(this.select_values[a[d]]);c.push(e),e!==a[d]&&(b=!0)}else b=!0;return this.value=c,this.select2&&(this.select2v4?this.select2.val(this.value).trigger("change"):this.select2.select2("val",this.value)),b},sanitize:function(a){return"number"===this.schema.items.type?1*a:"integer"===this.schema.items.type?Math.floor(1*a):""+a},enable:function(){if(!this.always_disabled){if(this.input)this.input.disabled=!1;else if(this.inputs)for(var a in this.inputs)this.inputs.hasOwnProperty(a)&&(this.inputs[a].disabled=!1);this.select2&&(this.select2v4?this.select2.prop("disabled",!1):this.select2.select2("enable",!0)),this._super()}},disable:function(a){if(a&&(this.always_disabled=!0),this.input)this.input.disabled=!0;else if(this.inputs)for(var b in this.inputs)this.inputs.hasOwnProperty(b)&&(this.inputs[b].disabled=!0);this.select2&&(this.select2v4?this.select2.prop("disabled",!0):this.select2.select2("enable",!1)),this._super()},destroy:function(){this.select2&&(this.select2.select2("destroy"),this.select2=null),this._super()}}),h.defaults.editors.base64=h.AbstractEditor.extend({getNumColumns:function(){return 4},setFileReaderListener:function(a){var b=this;a.addEventListener("load",function(a){if(b.count==b.current_item_index)
    // Overwrite existing file by default, leave other properties unchanged
    b.value[b.count][b.schema.title]=a.target.result;else{var c={};
    // Create empty object
    for(var d in b.parent.schema.properties)c[d]="";
    // Set object media file
    c[b.schema.title]=a.target.result,b.value.splice(b.count,0,c)}
    // Increment using the listener and not the 'for' loop as the listener will be processed asynchronously
    b.count+=1,
    // When all files have been processed, update the value of the editor
    b.count==b.total+b.current_item_index&&b.arrayEditor.setValue(b.value)})},build:function(){var a=this;
    // Don't show uploader if this is readonly
    if(this.title=this.header=this.label=this.theme.getFormInputLabel(this.getTitle()),this.options.infoText&&(this.infoButton=this.theme.getInfoButton(this.options.infoText)),
    // Input that holds the base64 string
    this.input=this.theme.getFormInputField("hidden"),this.container.appendChild(this.input),!this.schema.readOnly&&!this.schema.readonly){if(!window.FileReader)throw"FileReader required for base64 editor";
    // File uploader
    this.uploader=this.theme.getFormInputField("file"),
    // Set attribute of file input field to 'multiple' if:
    // 'multiple' key has been set to 'true' in the schema
    // and the parent object is of type 'object'
    // and the parent of the parent type has been set to 'array'
    a.schema.options.multiple&&1==a.schema.options.multiple&&a.parent&&"object"==a.parent.schema.type&&a.parent.parent&&"array"==a.parent.parent.schema.type&&this.uploader.setAttribute("multiple",""),this.uploader.addEventListener("change",function(b){if(b.preventDefault(),b.stopPropagation(),this.files&&this.files.length)
    // Check the amount of files uploaded.
    // If 1, use the regular upload, otherwise use the multiple upload method
    if(this.files.length>1&&a.schema.options.multiple&&1==a.schema.options.multiple&&a.parent&&"object"==a.parent.schema.type&&a.parent.parent&&"array"==a.parent.parent.schema.type){
    // Load editor of parent.parent to get the array
    a.arrayEditor=a.jsoneditor.getEditor(a.parent.parent.path),
    // Check the current value of this editor
    a.value=a.arrayEditor.getValue(),
    // Set variables for amount of files, index of current array item and
    // count value containing current status of processed files
    a.total=this.files.length,a.current_item_index=parseInt(a.parent.key),a.count=a.current_item_index;for(var c=0;c<a.total;c++){var d=new FileReader;a.setFileReaderListener(d),d.readAsDataURL(this.files[c])}}else{var e=new FileReader;e.onload=function(b){a.value=b.target.result,a.refreshPreview(),a.onChange(!0),e=null},e.readAsDataURL(this.files[0])}})}this.preview=this.theme.getFormInputDescription(this.schema.description),this.container.appendChild(this.preview),this.control=this.theme.getFormControl(this.label,this.uploader||this.input,this.preview,this.infoButton),this.container.appendChild(this.control)},refreshPreview:function(){if(this.last_preview!==this.value&&(this.last_preview=this.value,this.preview.innerHTML="",this.value)){var a=this.value.match(/^data:([^;,]+)[;,]/);if(a&&(a=a[1]),a){if(this.preview.innerHTML="<strong>Type:</strong> "+a+", <strong>Size:</strong> "+Math.floor((this.value.length-this.value.split(",")[0].length-1)/1.33333)+" bytes","image"===a.substr(0,5)){this.preview.innerHTML+="<br>";var b=document.createElement("img");b.style.maxWidth="100%",b.style.maxHeight="100px",b.src=this.value,this.preview.appendChild(b)}}else this.preview.innerHTML="<em>Invalid data URI</em>"}},enable:function(){this.always_disabled||(this.uploader&&(this.uploader.disabled=!1),this._super())},disable:function(a){a&&(this.always_disabled=!0),this.uploader&&(this.uploader.disabled=!0),this._super()},setValue:function(a){this.value!==a&&(this.value=a,this.input.value=this.value,this.refreshPreview(),this.onChange())},destroy:function(){this.preview&&this.preview.parentNode&&this.preview.parentNode.removeChild(this.preview),this.title&&this.title.parentNode&&this.title.parentNode.removeChild(this.title),this.input&&this.input.parentNode&&this.input.parentNode.removeChild(this.input),this.uploader&&this.uploader.parentNode&&this.uploader.parentNode.removeChild(this.uploader),this._super()}}),h.defaults.editors.upload=h.AbstractEditor.extend({getNumColumns:function(){return 4},build:function(){var a=this;
    // Don't show uploader if this is readonly
    if(this.title=this.header=this.label=this.theme.getFormInputLabel(this.getTitle()),
    // Input that holds the base64 string
    this.input=this.theme.getFormInputField("hidden"),this.container.appendChild(this.input),!this.schema.readOnly&&!this.schema.readonly){if(!this.jsoneditor.options.upload)throw"Upload handler required for upload editor";
    // File uploader
    this.uploader=this.theme.getFormInputField("file"),this.uploader.addEventListener("change",function(b){if(b.preventDefault(),b.stopPropagation(),this.files&&this.files.length){var c=new FileReader;c.onload=function(b){a.preview_value=b.target.result,a.refreshPreview(),a.onChange(!0),c=null},c.readAsDataURL(this.files[0])}})}var b=this.schema.description;b||(b=""),this.preview=this.theme.getFormInputDescription(b),this.container.appendChild(this.preview),this.control=this.theme.getFormControl(this.label,this.uploader||this.input,this.preview),this.container.appendChild(this.control),window.requestAnimationFrame(function(){if(a.value){var b=document.createElement("img");b.style.maxWidth="100%",b.style.maxHeight="100px",b.onload=function(c){a.preview.appendChild(b)},b.onerror=function(a){console.error("upload error",a)},b.src=a.container.querySelector("a").href}})},refreshPreview:function(){if(this.last_preview!==this.preview_value&&(this.last_preview=this.preview_value,this.preview.innerHTML="",this.preview_value)){var a=this,b=this.preview_value.match(/^data:([^;,]+)[;,]/);b&&(b=b[1]),b||(b="unknown");var c=this.uploader.files[0];if(this.preview.innerHTML="<strong>Type:</strong> "+b+", <strong>Size:</strong> "+c.size+" bytes","image"===b.substr(0,5)){this.preview.innerHTML+="<br>";var d=document.createElement("img");d.style.maxWidth="100%",d.style.maxHeight="100px",d.src=this.preview_value,this.preview.appendChild(d)}this.preview.innerHTML+="<br>";var e=this.getButton("Upload","upload","Upload");this.preview.appendChild(e),e.addEventListener("click",function(b){b.preventDefault(),e.setAttribute("disabled","disabled"),a.theme.removeInputError(a.uploader),a.theme.getProgressBar&&(a.progressBar=a.theme.getProgressBar(),a.preview.appendChild(a.progressBar)),a.jsoneditor.options.upload(a.path,c,{success:function(b){a.setValue(b),a.parent?a.parent.onChildEditorChange(a):a.jsoneditor.onChange(),a.progressBar&&a.preview.removeChild(a.progressBar),e.removeAttribute("disabled")},failure:function(b){a.theme.addInputError(a.uploader,b),a.progressBar&&a.preview.removeChild(a.progressBar),e.removeAttribute("disabled")},updateProgress:function(b){a.progressBar&&(b?a.theme.updateProgressBar(a.progressBar,b):a.theme.updateProgressBarUnknown(a.progressBar))}})}),(this.jsoneditor.options.auto_upload||this.schema.options.auto_upload)&&(e.dispatchEvent(new MouseEvent("click")),this.preview.removeChild(e))}},enable:function(){this.always_disabled||(this.uploader&&(this.uploader.disabled=!1),this._super())},disable:function(a){a&&(this.always_disabled=!0),this.uploader&&(this.uploader.disabled=!0),this._super()},setValue:function(a){this.value!==a&&(this.value=a,this.input.value=this.value,this.onChange())},destroy:function(){this.preview&&this.preview.parentNode&&this.preview.parentNode.removeChild(this.preview),this.title&&this.title.parentNode&&this.title.parentNode.removeChild(this.title),this.input&&this.input.parentNode&&this.input.parentNode.removeChild(this.input),this.uploader&&this.uploader.parentNode&&this.uploader.parentNode.removeChild(this.uploader),this._super()}}),h.defaults.editors.checkbox=h.AbstractEditor.extend({setValue:function(a,b){this.value=!!a,this.input.checked=this.value,this.onChange()},register:function(){this._super(),this.input&&this.input.setAttribute("name",this.formname)},unregister:function(){this._super(),this.input&&this.input.removeAttribute("name")},getNumColumns:function(){return Math.min(12,Math.max(this.getTitle().length/7,2))},build:function(){var a=this;this.options.compact||(this.label=this.header=this.theme.getCheckboxLabel(this.getTitle())),this.schema.description&&(this.description=this.theme.getFormInputDescription(this.schema.description)),this.options.infoText&&(this.infoButton=this.theme.getInfoButton(this.options.infoText)),this.options.compact&&(this.container.className+=" compact"),this.input=this.theme.getCheckbox(),this.control=this.theme.getFormControl(this.label,this.input,this.description,this.infoButton),(this.schema.readOnly||this.schema.readonly)&&(this.always_disabled=!0,this.input.disabled=!0),this.input.addEventListener("change",function(b){b.preventDefault(),b.stopPropagation(),a.value=this.checked,a.onChange(!0)}),this.container.appendChild(this.control)},enable:function(){this.always_disabled||(this.input.disabled=!1,this._super())},disable:function(a){a&&(this.always_disabled=!0),this.input.disabled=!0,this._super()},destroy:function(){this.label&&this.label.parentNode&&this.label.parentNode.removeChild(this.label),this.description&&this.description.parentNode&&this.description.parentNode.removeChild(this.description),this.input&&this.input.parentNode&&this.input.parentNode.removeChild(this.input),this._super()},showValidationErrors:function(a){var b=this;if("always"===this.jsoneditor.options.show_errors);else if(!this.is_dirty&&this.previous_error_setting===this.jsoneditor.options.show_errors)return;this.previous_error_setting=this.jsoneditor.options.show_errors;var c=[];f(a,function(a,d){d.path===b.path&&c.push(d.message)}),this.input.controlgroup=this.control,c.length?this.theme.addInputError(this.input,c.join(". ")+"."):this.theme.removeInputError(this.input)}}),h.defaults.editors.arraySelectize=h.AbstractEditor.extend({build:function(){this.title=this.theme.getFormInputLabel(this.getTitle()),this.title_controls=this.theme.getHeaderButtonHolder(),this.title.appendChild(this.title_controls),this.error_holder=document.createElement("div"),this.schema.description&&(this.description=this.theme.getDescription(this.schema.description)),this.input=document.createElement("select"),this.input.setAttribute("multiple","multiple");var a=this.theme.getFormControl(this.title,this.input,this.description);this.container.appendChild(a),this.container.appendChild(this.error_holder),window.jQuery(this.input).selectize({delimiter:!1,createOnBlur:!0,create:!0})},postBuild:function(){var a=this;this.input.selectize.on("change",function(b){a.refreshValue(),a.onChange(!0)})},destroy:function(){this.empty(!0),this.title&&this.title.parentNode&&this.title.parentNode.removeChild(this.title),this.description&&this.description.parentNode&&this.description.parentNode.removeChild(this.description),this.input&&this.input.parentNode&&this.input.parentNode.removeChild(this.input),this._super()},empty:function(a){},setValue:function(a,b){var c=this;
    // Update the array's value, adding/removing rows when necessary
    a=a||[],Array.isArray(a)||(a=[a]),this.input.selectize.clearOptions(),this.input.selectize.clear(!0),a.forEach(function(a){c.input.selectize.addOption({text:a,value:a})}),this.input.selectize.setValue(a),this.refreshValue(b)},refreshValue:function(a){this.value=this.input.selectize.getValue()},showValidationErrors:function(a){var b=this,c=[],d=[];
    // Show errors for this editor
    if(f(a,function(a,e){e.path===b.path?c.push(e):d.push(e)}),this.error_holder)if(c.length){this.error_holder.innerHTML="",this.error_holder.style.display="",f(c,function(a,c){b.error_holder.appendChild(b.theme.getErrorMessage(c.message))})}else this.error_holder.style.display="none"}}),h.defaults.editors.starrating=h.defaults.editors.string.extend({build:function(){var a=this;this.options.compact||(this.header=this.label=this.theme.getFormInputLabel(this.getTitle())),this.schema.description&&(this.description=this.theme.getFormInputDescription(this.schema.description)),this.options.infoText&&(this.infoButton=this.theme.getInfoButton(this.options.infoText)),this.options.compact&&(this.container.className+=" compact"),this.ratingContainer=document.createElement("div"),this.ratingContainer.classList.add("starrating"),this.enum_values=this.schema["enum"],this.radioGroup=[];for(var b=function(b){b.preventDefault(),b.stopPropagation(),a.setValue(this.value),a.onChange(!0)},c=this.enum_values.length-1;c>-1;c--){var d=this.key+"-"+c,e=this.theme.getFormInputField("radio");e.name=this.formname+"[starrating]",e.value=this.enum_values[c],e.id=d,e.addEventListener("change",b,!1),this.radioGroup.push(e);
    // form-label for radio elements
    var f=document.createElement("label");f.htmlFor=d,f.title=this.enum_values[c],this.options.displayValue&&f.classList.add("starrating-display-enabled"),this.ratingContainer.appendChild(e),this.ratingContainer.appendChild(f)}if(this.options.displayValue&&(this.displayRating=document.createElement("div"),this.displayRating.classList.add("starrating-display"),this.displayRating.innerText=this.enum_values[0],this.ratingContainer.appendChild(this.displayRating)),this.schema.readOnly||this.schema.readonly){this.always_disabled=!0;for(var g=0;c<this.radioGroup.length;g++)this.radioGroup[g].disabled=!0;this.ratingContainer.classList.add("readonly")}var h=this.theme.getContainer();h.appendChild(this.ratingContainer),this.input=h,this.control=this.theme.getFormControl(this.label,h,this.description,this.infoButton),this.container.appendChild(this.control)},enable:function(){if(!this.always_disabled){for(var a=0;a<this.radioGroup.length;a++)this.radioGroup[a].disabled=!1;this.ratingContainer.classList.remove("readonly"),this._super()}},disable:function(a){a&&(this.always_disabled=!0);for(var b=0;b<this.radioGroup.length;b++)this.radioGroup[b].disabled=!0;this.ratingContainer.classList.add("readonly"),this._super()},destroy:function(){this.ratingContainer.parentNode&&this.ratingContainer.parentNode.parentNode&&this.ratingContainer.parentNode.parentNode.removeChild(this.ratingContainer.parentNode),this.label&&this.label.parentNode&&this.label.parentNode.removeChild(this.label),this.description&&this.description.parentNode&&this.description.parentNode.removeChild(this.description),this._super()},getNumColumns:function(){return 2},setValue:function(a){for(var b=0;b<this.radioGroup.length;b++)if(this.radioGroup[b].value==a){this.radioGroup[b].checked=!0,this.value=a,this.options.displayValue&&(this.displayRating.innerHTML=this.value),this.onChange();break}}}),/*
    
    Edtended handling of date, time and datetime-local type fields.
    
    Works with both string and integer data types. (default only support string type)
    Adds support for setting "placeholder" through options.
    Has optional support for using flatpickr datepicker.
    All flatpickr options is supported with a few minor differences.
    - "enableTime" and "noCalendar" are set automatically, based on the data type.
    - Extra config option "errorDateFormat". If this is set, it will replace the format displayed in error messages.
    - It is not possible to use "inline" and "wrap" options together.
    - When using the "wrap" option, "toggle" and "clear" buttons are automatically added to markup. 2 extra boolean options ("showToggleButton" and "showClearButton") are available to control which buttons to display. Note: not all frameworks supports this. (Works in: Bootstrap and Foundation)
    - When using the "inline" option, an extra boolean option ("inlineHideInput") is available to hide the original input field.
    - If "mode" is set to either "multiple" or "range", only string data type is supported. Also the result from these is returned as a string not an array.
    
    ToDo:
    - Add support for "required" attribute. (Maybe this should be done on a general scale, as support for other input attributes are also missing, such as "placeholder")
    
    - Test if validation works with "required" fields. (Not sure if I have to put this into custom validator, or if it's handled elsewhere. UPDATE required attribute is currently not supported at ALL!)
    
     - Improve Handling of flatpicker "multiple" and "range" modes. (Currently the values are just added as string values, but the optimal scenario would be to save those as array if possible)
    
    */
    h.defaults.editors.datetime=h.defaults.editors.string.extend({build:function(){if(this._super(),this.input&&(
    // Add required and placeholder text if available
    this.options.placeholder!==b&&this.input.setAttribute("placeholder",this.options.placeholder),window.flatpickr&&"object"==typeof this.options.flatpickr)){
    // Make sure that flatpickr settings matches the input type
    this.options.flatpickr.enableTime="date"!=this.schema.format,this.options.flatpickr.noCalendar="time"==this.schema.format,
    // Curently only string can contain range or multiple values
    "integer"==this.schema.type&&(this.options.flatpickr.mode="single"),
    // Attribute for flatpicker
    this.input.setAttribute("data-input","");var a=this.input;if(this.options.flatpickr.wrap===!0){
    // Create buttons for input group
    var c=[];if(this.options.flatpickr.showToggleButton!==!1){var d=this.getButton("","time"==this.schema.format?"time":"calendar",this.translate("flatpickr_toggle_button"));
    // Attribute for flatpicker
    d.setAttribute("data-toggle",""),c.push(d)}if(this.options.flatpickr.showClearButton!==!1){var e=this.getButton("","clear",this.translate("flatpickr_clear_button"));
    // Attribute for flatpicker
    e.setAttribute("data-clear",""),c.push(e)}
    // Save position of input field
    var f=this.input.parentNode,g=this.input.nextSibling,h=this.theme.getInputGroup(this.input,c);h!==b?(
    // Make sure "inline" option is turned off
    this.options.flatpickr.inline=!1,
    // Insert container at same position as input field
    f.insertBefore(h,g),a=h):this.options.flatpickr.wrap=!1}this.flatpickr=window.flatpickr(a,this.options.flatpickr),this.options.flatpickr.inline===!0&&this.options.flatpickr.inlineHideInput===!0&&this.input.setAttribute("type","hidden")}},getValue:function(){if(!this.dependenciesFulfilled)return b;if("string"==this.schema.type)return this.value;if(""===this.value||this.value===b)return b;var a="time"==this.schema.format?"1970-01-01 "+this.value:this.value;return parseInt(new Date(a).getTime()/1e3)},setValue:function(a,b,c){if("string"==this.schema.type)this._super();else{var d,e=new Date(1e3*a),f=e.getFullYear(),g=this.zeroPad(e.getMonth()+1),h=this.zeroPad(e.getDate()),i=this.zeroPad(e.getHours()),j=this.zeroPad(e.getMinutes()),k=this.zeroPad(e.getSeconds()),l=[f,g,h].join("-"),m=[i,j,k].join(":");d="date"==this.schema.format?l:"time"==this.schema.format?m:l+" "+m,this.value=d}},destroy:function(){this.flatpickr&&this.flatpickr.destroy(),this.flatpickr=null,this._super()},
    // helper function
    zeroPad:function(a){return("0"+a).slice(-2)}}),h.defaults.editors.signature=h.defaults.editors.string.extend({
    // This editor is using the signature pad editor from https://github.com/szimek/signature_pad
    // Credits for the pad itself go to https://github.com/szimek
    build:function(){var a=this;this.options.compact||(this.header=this.label=this.theme.getFormInputLabel(this.getTitle())),this.schema.description&&(this.description=this.theme.getFormInputDescription(this.schema.description));var b=this.formname.replace(/\W/g,"");if("function"==typeof SignaturePad){
    // Dynamically add the required CSS the first time this editor is used
    var c="json-editor-style-signature";document.getElementById(c);this.input=this.theme.getFormInputField("hidden"),this.container.appendChild(this.input);
    // Required to keep height
    var d=document.createElement("div");d.className="signature-container";
    // Create canvas for signature pad
    var e=document.createElement("canvas");e.setAttribute("name",b),e.className="signature",d.appendChild(e),a.signaturePad=new window.SignaturePad(e,{onEnd:function(){
    // check if the signature is not empty before setting a value
    a.signaturePad.isEmpty()?a.input.value="":a.input.value=a.signaturePad.toDataURL(),a.is_dirty=!0,a.refreshValue(),a.watch_listener(),a.jsoneditor.notifyWatchers(a.path),a.parent?a.parent.onChildEditorChange(a):a.jsoneditor.onChange()}});
    // create button containers and add clear signature button
    var g=document.createElement("div"),h=document.createElement("button");h.className="tiny button",h.innerHTML="Clear signature",g.appendChild(h),d.appendChild(g),this.options.compact&&this.container.setAttribute("class",this.container.getAttribute("class")+" compact"),(this.schema.readOnly||this.schema.readonly)&&(this.always_disabled=!0,f(this.inputs,function(a,b){e.setAttribute("readOnly","readOnly"),b.disabled=!0})),
    // add listener to the clear button. when clicked, trigger a canvas change after emptying the canvas
    h.addEventListener("click",function(b){b.preventDefault(),b.stopPropagation(),a.signaturePad.clear(),
    // trigger stroke end to let signaturePad update the dataURL
    a.signaturePad.strokeEnd()}),this.control=this.theme.getFormControl(this.label,d,this.description),this.container.appendChild(this.control),this.refreshValue(),
    // signature canvas will stretch to signatureContainer width
    e.width=d.offsetWidth,a.options&&a.options.canvas_height?e.height=a.options.canvas_height:e.height="300"}else{var i=document.createElement("p");i.innerHTML="Signature pad is not available, please include SignaturePad from https://github.com/szimek/signature_pad",this.container.appendChild(i)}},setValue:function(a){var b=this;if("function"==typeof SignaturePad){var c=(this.formname.replace(/\W/g,""),this.sanitize(a));if(this.value===c)return;
    // only set contents if value != ''
    return b.value=c,b.input.value=b.value,b.signaturePad.clear(),a&&""!=a&&b.signaturePad.fromDataURL(a),b.watch_listener(),b.jsoneditor.notifyWatchers(b.path),!1}},destroy:function(){var a=this;this.formname.replace(/\W/g,"");a.signaturePad.off(),delete a.signaturePad}});var i=function(){var a=document.documentElement;return a.matches?"matches":a.webkitMatchesSelector?"webkitMatchesSelector":a.mozMatchesSelector?"mozMatchesSelector":a.msMatchesSelector?"msMatchesSelector":a.oMatchesSelector?"oMatchesSelector":void 0}();
    // Base Foundation theme
    // Foundation 3 Specific Theme
    // Foundation 4 Specific Theme
    // Foundation 5 Specific Theme
    // Set the default theme
    // Set the default template engine
    // Default options when initializing JSON Editor
    // String translate function
    // Translation strings and default languages
    // Miscellaneous Plugin Settings
    // Default per-editor options
    // Set the default resolvers
    // Use "multiple" as a fall back for everything
    // If the type is not set but properties are defined, we can infer the type is actually object
    // If the type is set and it's a basic type, use the primitive editor
    // Use specialized editor for signatures
    // Use a specialized editor for ratings
    // Use the select editor for all boolean values
    // Use the multiple editor for schemas where the `type` is set to "any"
    // Editor for base64 encoded files
    // Editor for uploading files
    // Use the table editor for arrays with the format set to `table`
    // Use the `select` editor for dynamic enumSource enums
    // Use the `enum` or `select` editors for schemas with enumerated properties
    // Specialized editors for arrays of strings
    // Use the multiple editor for schemas with `oneOf` set
    // Specialized editor for date, time and datetime-local formats
    // Use a specialized editor for starratings
    /**
     * This is a small wrapper for using JSON Editor like a typical jQuery plugin.
     */
    return h.AbstractTheme=c.extend({getContainer:function(){return document.createElement("div")},getFloatRightLinkHolder:function(){var a=document.createElement("div");return a.style=a.style||{},a.style.cssFloat="right",a.style.marginLeft="10px",a},getModal:function(){var a=document.createElement("div");return a.style.backgroundColor="white",a.style.border="1px solid black",a.style.boxShadow="3px 3px black",a.style.position="absolute",a.style.zIndex="10",a.style.display="none",a},getGridContainer:function(){var a=document.createElement("div");return a},getGridRow:function(){var a=document.createElement("div");return a.className="row",a},getGridColumn:function(){var a=document.createElement("div");return a},setGridColumnSize:function(a,b){},getLink:function(a){var b=document.createElement("a");return b.setAttribute("href","#"),b.appendChild(document.createTextNode(a)),b},disableHeader:function(a){a.style.color="#ccc"},disableLabel:function(a){a.style.color="#ccc"},enableHeader:function(a){a.style.color=""},enableLabel:function(a){a.style.color=""},getInfoButton:function(a){var b=document.createElement("span");b.innerText="ⓘ",b.style.fontSize="16px",b.style.fontWeight="bold",b.style.padding=".25rem",b.style.position="relative",b.style.display="inline-block";var c=document.createElement("span");return c.style.fontSize="12px",b.style.fontWeight="normal",c.style["font-family"]="sans-serif",c.style.visibility="hidden",c.style["background-color"]="rgba(50, 50, 50, .75)",c.style.margin="0 .25rem",c.style.color="#FAFAFA",c.style.padding=".5rem 1rem",c.style["border-radius"]=".25rem",c.style.width="20rem",c.style.position="absolute",c.innerText=a,b.onmouseover=function(){c.style.visibility="visible"},b.onmouseleave=function(){c.style.visibility="hidden"},b.appendChild(c),b},getFormInputLabel:function(a){var b=document.createElement("label");return b.appendChild(document.createTextNode(a)),b},getCheckboxLabel:function(a){var b=this.getFormInputLabel(a);return b.style.fontWeight="normal",b},getHeader:function(a){var b=document.createElement("h3");return"string"==typeof a?b.textContent=a:b.appendChild(a),b},getCheckbox:function(){var a=this.getFormInputField("checkbox");return a.style.display="inline-block",a.style.width="auto",a},getMultiCheckboxHolder:function(a,b,c){var d=document.createElement("div");b&&(b.style.display="block",d.appendChild(b));for(var e in a)a.hasOwnProperty(e)&&(a[e].style.display="inline-block",a[e].style.marginRight="20px",d.appendChild(a[e]));return c&&d.appendChild(c),d},getSelectInput:function(a){var b=document.createElement("select");return a&&this.setSelectOptions(b,a),b},getSwitcher:function(a){var b=this.getSelectInput(a);return b.style.backgroundColor="transparent",b.style.display="inline-block",b.style.fontStyle="italic",b.style.fontWeight="normal",b.style.height="auto",b.style.marginBottom=0,b.style.marginLeft="5px",b.style.padding="0 0 0 3px",b.style.width="auto",b},getSwitcherOptions:function(a){return a.getElementsByTagName("option")},setSwitcherOptions:function(a,b,c){this.setSelectOptions(a,b,c)},setSelectOptions:function(a,b,c){c=c||[],a.innerHTML="";for(var d=0;d<b.length;d++){var e=document.createElement("option");e.setAttribute("value",b[d]),e.textContent=c[d]||b[d],a.appendChild(e)}},getTextareaInput:function(){var a=document.createElement("textarea");return a.style=a.style||{},a.style.width="100%",a.style.height="300px",a.style.boxSizing="border-box",a},getRangeInput:function(a,b,c){var d=this.getFormInputField("range");return d.setAttribute("min",a),d.setAttribute("max",b),d.setAttribute("step",c),d},getFormInputField:function(a){var b=document.createElement("input");return b.setAttribute("type",a),b},afterInputReady:function(a){},getFormControl:function(a,b,c,d){var e=document.createElement("div");return e.className="form-control",a&&e.appendChild(a),"checkbox"===b.type&&a?(a.insertBefore(b,a.firstChild),d&&a.appendChild(d)):(d&&a.appendChild(d),e.appendChild(b)),c&&e.appendChild(c),e},getIndentedPanel:function(){var a=document.createElement("div");return a.style=a.style||{},a.style.paddingLeft="10px",a.style.marginLeft="10px",a.style.borderLeft="1px solid #ccc",a},getTopIndentedPanel:function(){var a=document.createElement("div");return a.style=a.style||{},a.style.paddingLeft="10px",a.style.marginLeft="10px",a},getChildEditorHolder:function(){return document.createElement("div")},getDescription:function(a){var b=document.createElement("p");return b.innerHTML=a,b},getCheckboxDescription:function(a){return this.getDescription(a)},getFormInputDescription:function(a){return this.getDescription(a)},getHeaderButtonHolder:function(){return this.getButtonHolder()},getButtonHolder:function(){return document.createElement("div")},getButton:function(a,b,c){var d=document.createElement("button");return d.type="button",this.setButtonText(d,a,b,c),d},setButtonText:function(a,b,c,d){a.innerHTML="",c&&(a.appendChild(c),a.innerHTML+=" "),a.appendChild(document.createTextNode(b)),d&&a.setAttribute("title",d)},getTable:function(){return document.createElement("table")},getTableRow:function(){return document.createElement("tr")},getTableHead:function(){return document.createElement("thead")},getTableBody:function(){return document.createElement("tbody")},getTableHeaderCell:function(a){var b=document.createElement("th");return b.textContent=a,b},getTableCell:function(){var a=document.createElement("td");return a},getErrorMessage:function(a){var b=document.createElement("p");return b.style=b.style||{},b.style.color="red",b.appendChild(document.createTextNode(a)),b},addInputError:function(a,b){},removeInputError:function(a){},addTableRowError:function(a){},removeTableRowError:function(a){},getTabHolder:function(a){var b="undefined"==typeof a?"":a,c=document.createElement("div");return c.innerHTML="<div style='float: left; width: 130px;' class='tabs' id='"+b+"'></div><div class='content' style='margin-left: 120px;' id='"+b+"'></div><div style='clear:both;'></div>",c},getTopTabHolder:function(a){var b="undefined"==typeof a?"":a,c=document.createElement("div");return c.innerHTML="<div class='tabs' style='margin-left: 10px;' id='"+b+"'></div><div style='clear:both;'></div><div class='content' id='"+b+"'></div>",c},applyStyles:function(a,b){for(var c in b)b.hasOwnProperty(c)&&(a.style[c]=b[c])},closest:function(a,b){for(;a&&a!==document;){if(!a[i])return!1;if(a[i](b))return a;a=a.parentNode}return!1},insertBasicTopTab:function(a,b){b.firstChild.insertBefore(a,b.firstChild.firstChild)},getTab:function(a,b){var c=document.createElement("div");return c.appendChild(a),c.id=b,c.style=c.style||{},this.applyStyles(c,{border:"1px solid #ccc",borderWidth:"1px 0 1px 1px",textAlign:"center",lineHeight:"30px",borderRadius:"5px",borderBottomRightRadius:0,borderTopRightRadius:0,fontWeight:"bold",cursor:"pointer"}),c},getTopTab:function(a,b){var c=document.createElement("div");return c.id=b,c.appendChild(a),c.style=c.style||{},this.applyStyles(c,{"float":"left",border:"1px solid #ccc",borderWidth:"1px 1px 0px 1px",textAlign:"center",lineHeight:"30px",borderRadius:"5px",paddingLeft:"5px",paddingRight:"5px",borderBottomRightRadius:0,borderBottomLeftRadius:0,fontWeight:"bold",cursor:"pointer"}),c},getTabContentHolder:function(a){return a.children[1]},getTopTabContentHolder:function(a){return a.children[1]},getTabContent:function(){return this.getIndentedPanel()},getTopTabContent:function(){return this.getTopIndentedPanel()},markTabActive:function(a){this.applyStyles(a.tab,{opacity:1,background:"white"}),a.container.style.display=""},markTabInactive:function(a){this.applyStyles(a.tab,{opacity:.5,background:""}),a.container.style.display="none"},addTab:function(a,b){a.children[0].appendChild(b)},addTopTab:function(a,b){a.children[0].appendChild(b)},getBlockLink:function(){var a=document.createElement("a");return a.style.display="block",a},getBlockLinkHolder:function(){var a=document.createElement("div");return a},getLinksHolder:function(){var a=document.createElement("div");return a},createMediaLink:function(a,b,c){a.appendChild(b),c.style.width="100%",a.appendChild(c)},createImageLink:function(a,b,c){a.appendChild(b),b.appendChild(c)},getFirstTab:function(a){return a.firstChild.firstChild},getInputGroup:function(a,c){return b}}),h.defaults.themes.bootstrap2=h.AbstractTheme.extend({getRangeInput:function(a,b,c){
    // TODO: use bootstrap slider
    return this._super(a,b,c)},getGridContainer:function(){var a=document.createElement("div");return a.className="container-fluid",a},getGridRow:function(){var a=document.createElement("div");return a.className="row-fluid",a},getFormInputLabel:function(a){var b=this._super(a);return b.style.display="inline-block",b.style.fontWeight="bold",b},setGridColumnSize:function(a,b){a.className="span"+b},getSelectInput:function(a){var b=this._super(a);return b.style.width="auto",b.style.maxWidth="98%",b},getFormInputField:function(a){var b=this._super(a);return b.style.width="98%",b},afterInputReady:function(a){if(!a.controlgroup&&(a.controlgroup=this.closest(a,".control-group"),a.controls=this.closest(a,".controls"),this.closest(a,".compact")&&(a.controlgroup.className=a.controlgroup.className.replace(/control-group/g,"").replace(/[ ]{2,}/g," "),a.controls.className=a.controlgroup.className.replace(/controls/g,"").replace(/[ ]{2,}/g," "),a.style.marginBottom=0),this.queuedInputErrorText)){var b=this.queuedInputErrorText;delete this.queuedInputErrorText,this.addInputError(a,b)}},getIndentedPanel:function(){var a=document.createElement("div");return a.className="well well-small",a.style.paddingBottom=0,a},getInfoButton:function(a){var b=document.createElement("span");b.className="icon-info-sign pull-right",b.style.padding=".25rem",b.style.position="relative",b.style.display="inline-block";var c=document.createElement("span");return c.style["font-family"]="sans-serif",c.style.visibility="hidden",c.style["background-color"]="rgba(50, 50, 50, .75)",c.style.margin="0 .25rem",c.style.color="#FAFAFA",c.style.padding=".5rem 1rem",c.style["border-radius"]=".25rem",c.style.width="25rem",c.style.transform="translateX(-27rem) translateY(-.5rem)",c.style.position="absolute",c.innerText=a,b.onmouseover=function(){c.style.visibility="visible"},b.onmouseleave=function(){c.style.visibility="hidden"},b.appendChild(c),b},getFormInputDescription:function(a){var b=document.createElement("p");return b.className="help-inline",b.textContent=a,b},getFormControl:function(a,b,c,d){var e=document.createElement("div");e.className="control-group";var f=document.createElement("div");return f.className="controls",a&&"checkbox"===b.getAttribute("type")?(e.appendChild(f),a.className+=" checkbox",a.appendChild(b),f.appendChild(a),d&&f.appendChild(d),f.style.height="30px"):(a&&(a.className+=" control-label",e.appendChild(a)),d&&f.appendChild(d),f.appendChild(b),e.appendChild(f)),c&&f.appendChild(c),e},getHeaderButtonHolder:function(){var a=this.getButtonHolder();return a.style.marginLeft="10px",a},getButtonHolder:function(){var a=document.createElement("div");return a.className="btn-group",a},getButton:function(a,b,c){var d=this._super(a,b,c);return d.className+=" btn btn-default",d},getTable:function(){var a=document.createElement("table");return a.className="table table-bordered",a.style.width="auto",a.style.maxWidth="none",a},addInputError:function(a,b){return a.controlgroup?void(a.controlgroup&&a.controls&&(a.controlgroup.className+=" error",a.errmsg?a.errmsg.style.display="":(a.errmsg=document.createElement("p"),a.errmsg.className="help-block errormsg",a.controls.appendChild(a.errmsg)),a.errmsg.textContent=b)):void(this.queuedInputErrorText=b)},removeInputError:function(a){a.controlgroup||delete this.queuedInputErrorText,a.errmsg&&(a.errmsg.style.display="none",a.controlgroup.className=a.controlgroup.className.replace(/\s?error/g,""))},getTabHolder:function(a){var b="undefined"==typeof a?"":a,c=document.createElement("div");return c.className="tabbable tabs-left",c.innerHTML="<ul class='nav nav-tabs'  id='"+b+"'></ul><div class='tab-content well well-small' id='"+b+"'></div>",c},getTopTabHolder:function(a){var b="undefined"==typeof a?"":a,c=document.createElement("div");return c.className="tabbable tabs-over",c.innerHTML="<ul class='nav nav-tabs' id='"+b+"'></ul><div class='tab-content well well-small'  id='"+b+"'></div>",c},getTab:function(a,b){var c=document.createElement("li");c.className="nav-item";var d=document.createElement("a");return d.setAttribute("href","#"+b),d.appendChild(a),c.appendChild(d),c},getTopTab:function(a,b){var c=document.createElement("li");c.className="nav-item";var d=document.createElement("a");return d.setAttribute("href","#"+b),d.appendChild(a),c.appendChild(d),c},getTabContentHolder:function(a){return a.children[1]},getTopTabContentHolder:function(a){return a.children[1]},getTabContent:function(){var a=document.createElement("div");return a.className="tab-pane",a},getTopTabContent:function(){var a=document.createElement("div");return a.className="tab-pane",a},markTabActive:function(a){a.tab.className=a.tab.className.replace(/\s?active/g,""),a.tab.className+=" active",a.container.className=a.container.className.replace(/\s?active/g,""),a.container.className+=" active"},markTabInactive:function(a){a.tab.className=a.tab.className.replace(/\s?active/g,""),a.container.className=a.container.className.replace(/\s?active/g,"")},addTab:function(a,b){a.children[0].appendChild(b)},addTopTab:function(a,b){a.children[0].appendChild(b)},getProgressBar:function(){var a=document.createElement("div");a.className="progress";var b=document.createElement("div");return b.className="bar",b.style.width="0%",a.appendChild(b),a},updateProgressBar:function(a,b){a&&(a.firstChild.style.width=b+"%")},updateProgressBarUnknown:function(a){a&&(a.className="progress progress-striped active",a.firstChild.style.width="100%")},getInputGroup:function(a,b){if(a){var c=document.createElement("div");c.className="input-append",c.appendChild(a);for(var d=0;d<b.length;d++)b[d].classList.add("btn"),c.appendChild(b[d]);return c}}}),h.defaults.themes.bootstrap3=h.AbstractTheme.extend({getSelectInput:function(a){var b=this._super(a);
    //el.style.width = 'auto';
    return b.className+="form-control",b},setGridColumnSize:function(a,b){a.className="col-md-"+b},afterInputReady:function(a){if(!a.controlgroup&&(a.controlgroup=this.closest(a,".form-group"),this.closest(a,".compact")&&(a.controlgroup.style.marginBottom=0),this.queuedInputErrorText)){var b=this.queuedInputErrorText;delete this.queuedInputErrorText,this.addInputError(a,b)}},getTextareaInput:function(){var a=document.createElement("textarea");return a.className="form-control",a},getRangeInput:function(a,b,c){
    // TODO: use better slider
    return this._super(a,b,c)},getFormInputField:function(a){var b=this._super(a);return"checkbox"!==a&&(b.className+="form-control"),b},getFormControl:function(a,b,c,d){var e=document.createElement("div");return a&&"checkbox"===b.type?(e.className+=" checkbox",a.appendChild(b),a.style.fontSize="14px",e.style.marginTop="0",d&&e.appendChild(d),e.appendChild(a),b.style.position="relative",b.style.cssFloat="left"):(e.className+=" form-group",a&&(a.className+=" control-label",e.appendChild(a)),d&&e.appendChild(d),e.appendChild(b)),c&&e.appendChild(c),e},getIndentedPanel:function(){var a=document.createElement("div");return a.className="well well-sm",a.style.paddingBottom=0,a},getInfoButton:function(a){var b=document.createElement("span");b.className="glyphicon glyphicon-info-sign pull-right",b.style.padding=".25rem",b.style.position="relative",b.style.display="inline-block";var c=document.createElement("span");return c.style["font-family"]="sans-serif",c.style.visibility="hidden",c.style["background-color"]="rgba(50, 50, 50, .75)",c.style.margin="0 .25rem",c.style.color="#FAFAFA",c.style.padding=".5rem 1rem",c.style["border-radius"]=".25rem",c.style.width="25rem",c.style.transform="translateX(-27rem) translateY(-.5rem)",c.style.position="absolute",c.innerText=a,b.onmouseover=function(){c.style.visibility="visible"},b.onmouseleave=function(){c.style.visibility="hidden"},b.appendChild(c),b},getFormInputDescription:function(a){var b=document.createElement("p");return b.className="help-block",b.innerHTML=a,b},getHeaderButtonHolder:function(){var a=this.getButtonHolder();return a.style.marginLeft="10px",a},getButtonHolder:function(){var a=document.createElement("div");return a.className="btn-group",a},getButton:function(a,b,c){var d=this._super(a,b,c);return d.className+="btn btn-default",d},getTable:function(){var a=document.createElement("table");return a.className="table table-bordered",a.style.width="auto",a.style.maxWidth="none",a},addInputError:function(a,b){return a.controlgroup?(a.controlgroup.className=a.controlgroup.className.replace(/\s?has-error/g,""),a.controlgroup.className+=" has-error",a.errmsg?a.errmsg.style.display="":(a.errmsg=document.createElement("p"),a.errmsg.className="help-block errormsg",a.controlgroup.appendChild(a.errmsg)),void(a.errmsg.textContent=b)):void(this.queuedInputErrorText=b)},removeInputError:function(a){a.controlgroup||delete this.queuedInputErrorText,a.errmsg&&(a.errmsg.style.display="none",a.controlgroup.className=a.controlgroup.className.replace(/\s?has-error/g,""))},getTabHolder:function(a){var b="undefined"==typeof a?"":a,c=document.createElement("div");return c.innerHTML="<ul class='col-md-2 nav nav-pills nav-stacked' id='"+b+"' role='tablist'></ul><div class='col-md-10 tab-content well well-small'  id='"+b+"'></div>",c},getTopTabHolder:function(a){var b="undefined"==typeof a?"":a,c=document.createElement("div");return c.innerHTML="<ul class='nav nav-tabs' id='"+b+"' role='tablist'></ul><div class='tab-content well well-small'  id='"+b+"'></div>",c},getTab:function(a,b){var c=document.createElement("li");c.setAttribute("role","presentation");var d=document.createElement("a");return d.setAttribute("href","#"+b),d.appendChild(a),d.setAttribute("aria-controls",b),d.setAttribute("role","tab"),d.setAttribute("data-toggle","tab"),c.appendChild(d),c},getTopTab:function(a,b){var c=document.createElement("li");c.setAttribute("role","presentation");var d=document.createElement("a");return d.setAttribute("href","#"+b),d.appendChild(a),d.setAttribute("aria-controls",b),d.setAttribute("role","tab"),d.setAttribute("data-toggle","tab"),c.appendChild(d),c},getTabContent:function(){var a=document.createElement("div");return a.className="tab-pane",a.setAttribute("role","tabpanel"),a},getTopTabContent:function(){var a=document.createElement("div");return a.className="tab-pane",a.setAttribute("role","tabpanel"),a},markTabActive:function(a){a.tab.className=a.tab.className.replace(/\s?active/g,""),a.tab.className+=" active",a.container.className=a.container.className.replace(/\s?active/g,""),a.container.className+=" active"},markTabInactive:function(a){a.tab.className=a.tab.className.replace(/\s?active/g,""),a.container.className=a.container.className.replace(/\s?active/g,"")},getProgressBar:function(){var a=0,b=100,c=0,d=document.createElement("div");d.className="progress";var e=document.createElement("div");return e.className="progress-bar",e.setAttribute("role","progressbar"),e.setAttribute("aria-valuenow",c),e.setAttribute("aria-valuemin",a),e.setAttribute("aria-valuenax",b),e.innerHTML=c+"%",d.appendChild(e),d},updateProgressBar:function(a,b){if(a){var c=a.firstChild,d=b+"%";c.setAttribute("aria-valuenow",b),c.style.width=d,c.innerHTML=d}},updateProgressBarUnknown:function(a){if(a){var b=a.firstChild;a.className="progress progress-striped active",b.removeAttribute("aria-valuenow"),b.style.width="100%",b.innerHTML=""}},getInputGroup:function(a,b){if(a){var c=document.createElement("div");c.className="input-group",c.appendChild(a);var d=document.createElement("div");d.className="input-group-btn",c.appendChild(d);for(var e=0;e<b.length;e++)d.appendChild(b[e]);return c}}}),h.defaults.themes.bootstrap4=h.AbstractTheme.extend({getSelectInput:function(a){var b=this._super(a);
    //el.style.width = 'auto';
    return b.className+="form-control",b},setGridColumnSize:function(a,b){a.className="col-md-"+b},afterInputReady:function(a){a.controlgroup||(a.controlgroup=this.closest(a,".form-group"),this.closest(a,".compact")&&(a.controlgroup.style.marginBottom=0))},getTextareaInput:function(){var a=document.createElement("textarea");return a.className="form-control",a},getRangeInput:function(a,b,c){
    // TODO: use better slider
    return this._super(a,b,c)},getFormInputField:function(a){var b=this._super(a);return"checkbox"!==a&&(b.className+="form-control"),b},getFormControl:function(a,b,c){var d=document.createElement("div");return a&&"checkbox"===b.type?(d.className+=" checkbox",a.appendChild(b),a.style.fontSize="14px",d.style.marginTop="0",d.appendChild(a),b.style.position="relative",b.style.cssFloat="left"):(d.className+=" form-group",a&&(a.className+=" form-control-label",d.appendChild(a)),d.appendChild(b)),c&&d.appendChild(c),d},getIndentedPanel:function(){var a=document.createElement("div");return a.className="card card-body bg-light",a},getFormInputDescription:function(a){var b=document.createElement("p");return b.className="form-text",b.innerHTML=a,b},getHeaderButtonHolder:function(){var a=this.getButtonHolder();return a.style.marginLeft="10px",a},getButtonHolder:function(){var a=document.createElement("div");return a.className="btn-group",a},getButton:function(a,b,c){var d=this._super(a,b,c);return d.className+="btn btn-secondary",d},getTable:function(){var a=document.createElement("table");return a.className="table-bordered table-sm",a.style.width="auto",a.style.maxWidth="none",a},addInputError:function(a,b){a.controlgroup&&(a.controlgroup.className+=" has-error",a.errmsg?a.errmsg.style.display="":(a.errmsg=document.createElement("p"),a.errmsg.className="form-text errormsg",a.controlgroup.appendChild(a.errmsg)),a.errmsg.textContent=b)},removeInputError:function(a){a.errmsg&&(a.errmsg.style.display="none",a.controlgroup.className=a.controlgroup.className.replace(/\s?has-error/g,""))},getTabHolder:function(a){var b=document.createElement("div"),c="undefined"==typeof a?"":a;return b.innerHTML="<div class='col-md-2' id='"+c+"'><ul class='nav flex-column nav-pills'></ul></div><div class='tab-content col-md-10' id='"+c+"'></div>",b.className="row",b},addTab:function(a,b){a.children[0].children[0].appendChild(b)},getTopTabHolder:function(a){var b="undefined"==typeof a?"":a,c=document.createElement("div");return c.innerHTML="<ul class='nav nav-tabs' id='"+b+"'></ul><div class='card-body' id='"+b+"'></div>",c},getTab:function(a,b){var c=document.createElement("li");c.className="nav-item";var d=document.createElement("a");return d.className="nav-link",d.setAttribute("style","padding:10px;"),d.setAttribute("href","#"+b),d.appendChild(a),c.appendChild(d),c},getTopTab:function(a,b){var c=document.createElement("li");c.className="nav-item";var d=document.createElement("a");return d.className="nav-link",d.setAttribute("href","#"+b),d.appendChild(a),c.appendChild(d),c},markTabActive:function(a){var b=a.tab.firstChild;b.className=b.className.replace(/\s?active/g,""),b.className+=" active",a.container.style.display=""},markTabInactive:function(a){var b=a.tab.firstChild;b.className=b.className.replace(/\s?active/g,""),a.container.style.display="none"},getProgressBar:function(){var a=0,b=100,c=0,d=document.createElement("div");d.className="progress";var e=document.createElement("div");return e.className="progress-bar",e.setAttribute("role","progressbar"),e.setAttribute("aria-valuenow",c),e.setAttribute("aria-valuemin",a),e.setAttribute("aria-valuenax",b),e.innerHTML=c+"%",d.appendChild(e),d},updateProgressBar:function(a,b){if(a){var c=a.firstChild,d=b+"%";c.setAttribute("aria-valuenow",b),c.style.width=d,c.innerHTML=d}},updateProgressBarUnknown:function(a){if(a){var b=a.firstChild;a.className="progress progress-striped active",b.removeAttribute("aria-valuenow"),b.style.width="100%",b.innerHTML=""}},getInputGroup:function(a,b){if(a){var c=document.createElement("div");c.className="input-group",c.appendChild(a);var d=document.createElement("div");d.className="input-group-btn",c.appendChild(d);for(var e=0;e<b.length;e++)d.appendChild(b[e]);return c}}}),h.defaults.themes.foundation=h.AbstractTheme.extend({getChildEditorHolder:function(){var a=document.createElement("div");return a.style.marginBottom="15px",a},getSelectInput:function(a){var b=this._super(a);return b.style.minWidth="none",b.style.padding="5px",b.style.marginTop="3px",b},getSwitcher:function(a){var b=this._super(a);return b.style.paddingRight="8px",b},afterInputReady:function(a){if(!a.group&&(this.closest(a,".compact")&&(a.style.marginBottom=0),a.group=this.closest(a,".form-control"),this.queuedInputErrorText)){var b=this.queuedInputErrorText;delete this.queuedInputErrorText,this.addInputError(a,b)}},getFormInputLabel:function(a){var b=this._super(a);return b.style.display="inline-block",b},getFormInputField:function(a){var b=this._super(a);return b.style.width="100%",b.style.marginBottom="checkbox"===a?"0":"12px",b},getFormInputDescription:function(a){var b=document.createElement("p");return b.textContent=a,b.style.marginTop="-10px",b.style.fontStyle="italic",b},getIndentedPanel:function(){var a=document.createElement("div");return a.className="panel",a.style.paddingBottom=0,a},getHeaderButtonHolder:function(){var a=this.getButtonHolder();return a.style.display="inline-block",a.style.marginLeft="10px",a.style.verticalAlign="middle",a},getButtonHolder:function(){var a=document.createElement("div");return a.className="button-group",a},getButton:function(a,b,c){var d=this._super(a,b,c);return d.className+=" small button",d},addInputError:function(a,b){return a.group?(a.group.className+=" error",a.errmsg?a.errmsg.style.display="":(a.insertAdjacentHTML("afterend",'<small class="error"></small>'),a.errmsg=a.parentNode.getElementsByClassName("error")[0]),void(a.errmsg.textContent=b)):void(this.queuedInputErrorText=b)},removeInputError:function(a){a.group||delete this.queuedInputErrorText,a.errmsg&&(a.group.className=a.group.className.replace(/ error/g,""),a.errmsg.style.display="none")},getProgressBar:function(){var a=document.createElement("div");a.className="progress";var b=document.createElement("span");return b.className="meter",b.style.width="0%",a.appendChild(b),a},updateProgressBar:function(a,b){a&&(a.firstChild.style.width=b+"%")},updateProgressBarUnknown:function(a){a&&(a.firstChild.style.width="100%")},getInputGroup:function(a,c){if(!a)return b;var d=document.createElement("div");d.className="input-group",a.classList.add("input-group-field"),d.appendChild(a);for(var e=0;e<c.length;e++){var f=document.createElement("div");f.className="input-group-button",f.style.verticalAlign="top",c[e].classList.remove("small"),f.appendChild(c[e]),d.appendChild(f)}return d}}),h.defaults.themes.foundation3=h.defaults.themes.foundation.extend({getHeaderButtonHolder:function(){var a=this._super();return a.style.fontSize=".6em",a},getFormInputLabel:function(a){var b=this._super(a);return b.style.fontWeight="bold",b},getTabHolder:function(a){var b="undefined"==typeof a?"":a,c=document.createElement("div");return c.className="row",c.innerHTML='<dl class="tabs vertical two columns" id="'+b+'"></dl><div class="tabs-content ten columns" id="'+b+'"></div>',c},getTopTabHolder:function(a){var b="undefined"==typeof a?"":a,c=document.createElement("div");return c.className="row",c.innerHTML='<dl class="tabs horizontal" style="padding-left: 10px; margin-left: 10px;" id="'+b+'"></dl><div class="tabs-content twelve columns" style="padding: 10px; margin-left: 10px;" id="'+b+'"></div>',c},setGridColumnSize:function(a,b){var c=["zero","one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve"];a.className="columns "+c[b]},getTab:function(a,b){var c=document.createElement("dd"),d=document.createElement("a");return d.setAttribute("href","#"+b),d.appendChild(a),c.appendChild(d),c},getTopTab:function(a,b){var c=document.createElement("dd"),d=document.createElement("a");return d.setAttribute("href","#"+b),d.appendChild(a),c.appendChild(d),c},getTabContentHolder:function(a){return a.children[1]},getTopTabContentHolder:function(a){return a.children[1]},getTabContent:function(){var a=document.createElement("div");return a.className="content active",a.style.paddingLeft="5px",a},getTopTabContent:function(){var a=document.createElement("div");return a.className="content active",a.style.paddingLeft="5px",a},markTabActive:function(a){a.tab.className=a.tab.className.replace(/\s?active/g,""),a.tab.className+=" active",a.container.style.display=""},markTabInactive:function(a){a.tab.className=a.tab.className.replace(/\s?active/g,""),a.container.style.display="none"},addTab:function(a,b){a.children[0].appendChild(b)},addTopTab:function(a,b){a.children[0].appendChild(b)}}),h.defaults.themes.foundation4=h.defaults.themes.foundation.extend({getHeaderButtonHolder:function(){var a=this._super();return a.style.fontSize=".6em",a},setGridColumnSize:function(a,b){a.className="columns large-"+b},getFormInputDescription:function(a){var b=this._super(a);return b.style.fontSize=".8rem",b},getFormInputLabel:function(a){var b=this._super(a);return b.style.fontWeight="bold",b}}),h.defaults.themes.foundation5=h.defaults.themes.foundation.extend({getFormInputDescription:function(a){var b=this._super(a);return b.style.fontSize=".8rem",b},setGridColumnSize:function(a,b){a.className="columns medium-"+b},getButton:function(a,b,c){var d=this._super(a,b,c);return d.className=d.className.replace(/\s*small/g,"")+" tiny",d},getTabHolder:function(a){var b="undefined"==typeof a?"":a,c=document.createElement("div");return c.innerHTML='<dl class="tabs vertical" id="'+b+'"></dl><div class="tabs-content vertical" id="'+b+'"></div>',c},getTopTabHolder:function(a){var b="undefined"==typeof a?"":a,c=document.createElement("div");return c.className="row",c.innerHTML='<dl class="tabs horizontal" style="padding-left: 10px;" id="'+b+'"></dl><div class="tabs-content horizontal" style="padding: 10px;" id="'+b+'"></div>',c},getTab:function(a,b){var c=document.createElement("dd"),d=document.createElement("a");return d.setAttribute("href","#"+b),d.appendChild(a),c.appendChild(d),c},getTopTab:function(a,b){var c=document.createElement("dd"),d=document.createElement("a");return d.setAttribute("href","#"+b),d.appendChild(a),c.appendChild(d),c},getTabContentHolder:function(a){return a.children[1]},getTopTabContentHolder:function(a){return a.children[1]},getTabContent:function(){var a=document.createElement("div");return a.className="tab-content active",a.style.paddingLeft="5px",a},getTopTabContent:function(){var a=document.createElement("div");return a.className="tab-content active",a.style.paddingLeft="5px",a},markTabActive:function(a){a.tab.className=a.tab.className.replace(/\s?active/g,""),a.tab.className+=" active",a.container.style.display=""},markTabInactive:function(a){a.tab.className=a.tab.className.replace(/\s?active/g,""),a.container.style.display="none"},addTab:function(a,b){a.children[0].appendChild(b)},addTopTab:function(a,b){a.children[0].appendChild(b)}}),h.defaults.themes.foundation6=h.defaults.themes.foundation5.extend({getIndentedPanel:function(){var a=document.createElement("div");return a.className="callout secondary",a.className.style="padding-left: 10px; margin-left: 10px;",a},getButtonHolder:function(){var a=document.createElement("div");return a.className="button-group tiny",a.style.marginBottom=0,a},getFormInputLabel:function(a){var b=this._super(a);return b.style.display="block",b},getFormControl:function(a,b,c,d){var e=document.createElement("div");return e.className="form-control",a&&e.appendChild(a),"checkbox"===b.type?a.insertBefore(b,a.firstChild):a?(d&&a.appendChild(d),a.appendChild(b)):(d&&e.appendChild(d),e.appendChild(b)),c&&a.appendChild(c),e},addInputError:function(a,b){if(a.group){if(a.group.className+=" error",a.errmsg)a.errmsg.style.display="",a.className="";else{var c=document.createElement("span");c.className="form-error is-visible",a.group.getElementsByTagName("label")[0].appendChild(c),a.className=a.className+" is-invalid-input",a.errmsg=c}a.errmsg.textContent=b}},removeInputError:function(a){a.errmsg&&(a.className=a.className.replace(/ is-invalid-input/g,""),a.errmsg.parentNode&&a.errmsg.parentNode.removeChild(a.errmsg))},getTabHolder:function(a){var b="undefined"==typeof a?"":a,c=document.createElement("div");return c.className="grid-x",c.innerHTML='<div class="medium-2 cell" style="float: left;"><ul class="vertical tabs" data-tabs id="'+b+'"></ul></div><div class="medium-10 cell" style="float: left;"><div class="tabs-content" data-tabs-content="'+b+'"></div></div>',c},getTopTabHolder:function(a){var b="undefined"==typeof a?"":a,c=document.createElement("div");return c.className="grid-y",c.innerHTML='<div className="cell"><ul class="tabs" data-tabs id="'+b+'"></ul><div class="tabs-content" data-tabs-content="'+b+'"></div></div>',c},insertBasicTopTab:function(a,b){b.firstChild.firstChild.insertBefore(a,b.firstChild.firstChild.firstChild)},getTab:function(a,b){var c=document.createElement("li");c.className="tabs-title";var d=document.createElement("a");return d.setAttribute("href","#"+b),d.appendChild(a),c.appendChild(d),c},getTopTab:function(a,b){var c=document.createElement("li");c.className="tabs-title";var d=document.createElement("a");return d.setAttribute("href","#"+b),d.appendChild(a),c.appendChild(d),c},getTabContentHolder:function(a){return a.children[1].firstChild},getTopTabContentHolder:function(a){return a.firstChild.children[1]},getTabContent:function(){var a=document.createElement("div");return a.className="tabs-panel",a.style.paddingLeft="5px",a},getTopTabContent:function(){var a=document.createElement("div");return a.className="tabs-panel",a.style.paddingLeft="5px",a},markTabActive:function(a){a.tab.className=a.tab.className.replace(/\s?is-active/g,""),a.tab.className+=" is-active",a.tab.firstChild.setAttribute("aria-selected","true"),a.container.className=a.container.className.replace(/\s?is-active/g,""),a.container.className+=" is-active",a.container.setAttribute("aria-selected","true")},markTabInactive:function(a){a.tab.className=a.tab.className.replace(/\s?is-active/g,""),a.tab.firstChild.removeAttribute("aria-selected"),a.container.className=a.container.className.replace(/\s?is-active/g,""),a.container.removeAttribute("aria-selected")},addTab:function(a,b){a.children[0].firstChild.appendChild(b)},addTopTab:function(a,b){a.firstChild.children[0].appendChild(b)},getFirstTab:function(a){return a.firstChild.firstChild.firstChild}}),h.defaults.themes.html=h.AbstractTheme.extend({getFormInputLabel:function(a){var b=this._super(a);return b.style.display="block",b.style.marginBottom="3px",b.style.fontWeight="bold",b},getFormInputDescription:function(a){var b=this._super(a);return b.style.fontSize=".8em",b.style.margin=0,b.style.display="inline-block",b.style.fontStyle="italic",b},getIndentedPanel:function(){var a=this._super();return a.style.border="1px solid #ddd",a.style.padding="5px",a.style.margin="10px",a.style.borderRadius="3px",a},getTopIndentedPanel:function(){return this.getIndentedPanel()},getChildEditorHolder:function(){var a=this._super();return a.style.marginBottom="8px",a},getHeaderButtonHolder:function(){var a=this.getButtonHolder();return a.style.display="inline-block",a.style.marginLeft="10px",a.style.fontSize=".8em",a.style.verticalAlign="middle",a},getTable:function(){var a=this._super();return a.style.borderBottom="1px solid #ccc",a.style.marginBottom="5px",a},addInputError:function(a,b){if(a.style.borderColor="red",a.errmsg)a.errmsg.style.display="block";else{var c=this.closest(a,".form-control");a.errmsg=document.createElement("div"),a.errmsg.setAttribute("class","errmsg"),a.errmsg.style=a.errmsg.style||{},a.errmsg.style.color="red",c.appendChild(a.errmsg)}a.errmsg.innerHTML="",a.errmsg.appendChild(document.createTextNode(b))},removeInputError:function(a){a.style.borderColor="",a.errmsg&&(a.errmsg.style.display="none")},getProgressBar:function(){var a=100,b=0,c=document.createElement("progress");return c.setAttribute("max",a),c.setAttribute("value",b),c},updateProgressBar:function(a,b){a&&a.setAttribute("value",b)},updateProgressBarUnknown:function(a){a&&a.removeAttribute("value")}}),h.defaults.themes.jqueryui=h.AbstractTheme.extend({getTable:function(){var a=this._super();return a.setAttribute("cellpadding",5),a.setAttribute("cellspacing",0),a},getTableHeaderCell:function(a){var b=this._super(a);return b.className="ui-state-active",b.style.fontWeight="bold",b},getTableCell:function(){var a=this._super();return a.className="ui-widget-content",a},getHeaderButtonHolder:function(){var a=this.getButtonHolder();return a.style.marginLeft="10px",a.style.fontSize=".6em",a.style.display="inline-block",a},getFormInputDescription:function(a){var b=this.getDescription(a);return b.style.marginLeft="10px",b.style.display="inline-block",b},getFormControl:function(a,b,c,d){var e=this._super(a,b,c,d);return"checkbox"===b.type?(e.style.lineHeight="25px",e.style.padding="3px 0"):e.style.padding="4px 0 8px 0",e},getDescription:function(a){var b=document.createElement("span");return b.style.fontSize=".8em",b.style.fontStyle="italic",b.textContent=a,b},getButtonHolder:function(){var a=document.createElement("div");return a.className="ui-buttonset",a.style.fontSize=".7em",a},getFormInputLabel:function(a){var b=document.createElement("label");return b.style.fontWeight="bold",b.style.display="block",b.textContent=a,b},getButton:function(a,b,c){var d=document.createElement("button");d.className="ui-button ui-widget ui-state-default ui-corner-all",
    // Icon only
    b&&!a?(d.className+=" ui-button-icon-only",b.className+=" ui-button-icon-primary ui-icon-primary",d.appendChild(b)):b?(d.className+=" ui-button-text-icon-primary",b.className+=" ui-button-icon-primary ui-icon-primary",d.appendChild(b)):d.className+=" ui-button-text-only";var e=document.createElement("span");return e.className="ui-button-text",e.textContent=a||c||".",d.appendChild(e),d.setAttribute("title",c),d},setButtonText:function(a,b,c,d){a.innerHTML="",a.className="ui-button ui-widget ui-state-default ui-corner-all",
    // Icon only
    c&&!b?(a.className+=" ui-button-icon-only",c.className+=" ui-button-icon-primary ui-icon-primary",a.appendChild(c)):c?(a.className+=" ui-button-text-icon-primary",c.className+=" ui-button-icon-primary ui-icon-primary",a.appendChild(c)):a.className+=" ui-button-text-only";var e=document.createElement("span");e.className="ui-button-text",e.textContent=b||d||".",a.appendChild(e),a.setAttribute("title",d)},getIndentedPanel:function(){var a=document.createElement("div");return a.className="ui-widget-content ui-corner-all",a.style.padding="1em 1.4em",a.style.marginBottom="20px",a},afterInputReady:function(a){if(!a.controls&&(a.controls=this.closest(a,".form-control"),this.queuedInputErrorText)){var b=this.queuedInputErrorText;delete this.queuedInputErrorText,this.addInputError(a,b)}},addInputError:function(a,b){return a.controls?(a.errmsg?a.errmsg.style.display="":(a.errmsg=document.createElement("div"),a.errmsg.className="ui-state-error",a.controls.appendChild(a.errmsg)),void(a.errmsg.textContent=b)):void(this.queuedInputErrorText=b)},removeInputError:function(a){a.controls||delete this.queuedInputErrorText,a.errmsg&&(a.errmsg.style.display="none")},markTabActive:function(a){a.tab.className=a.tab.className.replace(/\s?ui-widget-header/g,"").replace(/\s?ui-state-active/g,"")+" ui-state-active",a.container.style.display=""},markTabInactive:function(a){a.tab.className=a.tab.className.replace(/\s?ui-state-active/g,"").replace(/\s?ui-widget-header/g,"")+" ui-widget-header",a.container.style.display="none"}}),h.defaults.themes.barebones=h.AbstractTheme.extend({getFormInputLabel:function(a){var b=this._super(a);return b},getFormInputDescription:function(a){var b=this._super(a);return b},getIndentedPanel:function(){var a=this._super();return a},getChildEditorHolder:function(){var a=this._super();return a},getHeaderButtonHolder:function(){var a=this.getButtonHolder();return a},getTable:function(){var a=this._super();return a},addInputError:function(a,b){if(a.errmsg)a.errmsg.style.display="block";else{var c=this.closest(a,".form-control");a.errmsg=document.createElement("div"),a.errmsg.setAttribute("class","errmsg"),c.appendChild(a.errmsg)}a.errmsg.innerHTML="",a.errmsg.appendChild(document.createTextNode(b))},removeInputError:function(a){a.style.borderColor="",a.errmsg&&(a.errmsg.style.display="none")},getProgressBar:function(){var a=100,b=0,c=document.createElement("progress");return c.setAttribute("max",a),c.setAttribute("value",b),c},updateProgressBar:function(a,b){a&&a.setAttribute("value",b)},updateProgressBarUnknown:function(a){a&&a.removeAttribute("value")}}),h.defaults.themes.materialize=h.AbstractTheme.extend({/**
       * Applies grid size to specified element.
       *
       * @param {HTMLElement} el The DOM element to have specified size applied.
       * @param {int} size The grid column size.
       * @see http://materializecss.com/grid.html
       */
    setGridColumnSize:function(a,b){a.className="col s"+b},/**
       * Gets a wrapped button element for a header.
       *
       * @returns {HTMLElement} The wrapped button element.
       */
    getHeaderButtonHolder:function(){return this.getButtonHolder()},/**
       * Gets a wrapped button element.
       *
       * @returns {HTMLElement} The wrapped button element.
       */
    getButtonHolder:function(){return document.createElement("span")},/**
       * Gets a single button element.
       *
       * @param {string} text The button text.
       * @param {HTMLElement} icon The icon object.
       * @param {string} title The button title.
       * @returns {HTMLElement} The button object.
       * @see http://materializecss.com/buttons.html
       */
    getButton:function(a,b,c){
    // Prepare icon.
    a&&(b.className+=" left",b.style.marginRight="5px");
    // Create and return button.
    var d=this._super(a,b,c);return d.className="waves-effect waves-light btn",d.style.fontSize="0.75rem",d.style.height="24px",d.style.lineHeight="24px",d.style.marginLeft="5px",d.style.padding="0 0.5rem",d},/**
       * Gets a form control object consisiting of several sub objects.
       *
       * @param {HTMLElement} label The label element.
       * @param {HTMLElement} input The input element.
       * @param {string} description The element description.
       * @param {string} infoText The element information text.
       * @returns {HTMLElement} The assembled DOM element.
       * @see http://materializecss.com/forms.html
       */
    getFormControl:function(a,b,c,d){var e,f=b.type;
    // Checkboxes get wrapped in p elements.
    if(f&&"checkbox"===f){if(e=document.createElement("p"),a){var g=document.createElement("span");g.innerHTML=a.innerHTML,a.innerHTML="",a.setAttribute("for",b.id),e.appendChild(a),a.appendChild(b),a.appendChild(g)}else e.appendChild(b);return e}
    // Anything else gets wrapped in divs.
    // Not .input-field for select wrappers.
    // Color needs special attention.
    return e=this._super(a,b,c,d),f&&f.startsWith("select")||(e.className="input-field"),f&&"color"===f&&(b.style.height="3rem",b.style.width="100%",b.style.margin="5px 0 20px 0",b.style.padding="3px",a&&(a.style.transform="translateY(-14px) scale(0.8)",a.style["-webkit-transform"]="translateY(-14px) scale(0.8)",a.style["-webkit-transform-origin"]="0 0",a.style["transform-origin"]="0 0")),e},getDescription:function(a){var b=document.createElement("div");return b.className="grey-text",b.style.marginTop="-15px",b.innerHTML=a,b},/**
       * Gets a header element.
       *
       * @param {string|HTMLElement} text The header text or element.
       * @returns {HTMLElement} The header element.
       */
    getHeader:function(a){var b=document.createElement("h5");return"string"==typeof a?b.textContent=a:b.appendChild(a),b},getChildEditorHolder:function(){var a=document.createElement("div");return a.marginBottom="10px",a},getIndentedPanel:function(){var a=document.createElement("div");return a.className="card-panel",a},getTable:function(){var a=document.createElement("table");return a.className="striped bordered",a.style.marginBottom="10px",a},getTableRow:function(){return document.createElement("tr")},getTableHead:function(){return document.createElement("thead")},getTableBody:function(){return document.createElement("tbody")},getTableHeaderCell:function(a){var b=document.createElement("th");return b.textContent=a,b},getTableCell:function(){var a=document.createElement("td");return a},/**
       * Gets the tab holder element.
       *
       * @returns {HTMLElement} The tab holder component.
       * @see https://github.com/Dogfalo/materialize/issues/2542#issuecomment-233458602
       */
    getTabHolder:function(){var a=['<div class="col s2">','   <ul class="tabs" style="height: auto; margin-top: 0.82rem; -ms-flex-direction: column; -webkit-flex-direction: column; flex-direction: column; display: -webkit-flex; display: flex;">',"   </ul>","</div>",'<div class="col s10">',"<div>"].join("\n"),b=document.createElement("div");return b.className="row card-panel",b.innerHTML=a,b},/**
       * Add specified tab to specified holder element.
       *
       * @param {HTMLElement} holder The tab holder element.
       * @param {HTMLElement} tab The tab to add.
       */
    addTab:function(a,b){a.children[0].children[0].appendChild(b)},/**
       * Gets a single tab element.
       *
       * @param {HTMLElement} span The tab's content.
       * @returns {HTMLElement} The tab element.
       * @see https://github.com/Dogfalo/materialize/issues/2542#issuecomment-233458602
       */
    getTab:function(a){var b=document.createElement("li");return b.className="tab",this.applyStyles(b,{width:"100%",textAlign:"left",lineHeight:"24px",height:"24px",fontSize:"14px",cursor:"pointer"}),b.appendChild(a),b},/**
       * Marks specified tab as active.
       *
       * @returns {HTMLElement} The tab element.
       * @see https://github.com/Dogfalo/materialize/issues/2542#issuecomment-233458602
       */
    markTabActive:function(a){this.applyStyles(a,{width:"100%",textAlign:"left",lineHeight:"24px",height:"24px",fontSize:"14px",cursor:"pointer",color:"rgba(238,110,115,1)",transition:"border-color .5s ease",borderRight:"3px solid #424242"})},/**
       * Marks specified tab as inactive.
       *
       * @returns {HTMLElement} The tab element.
       * @see https://github.com/Dogfalo/materialize/issues/2542#issuecomment-233458602
       */
    markTabInactive:function(a){this.applyStyles(a,{width:"100%",textAlign:"left",lineHeight:"24px",height:"24px",fontSize:"14px",cursor:"pointer",color:"rgba(238,110,115,0.7)"})},/**
       * Returns the element that holds the tab contents.
       *
       * @param {HTMLElement} tabHolder The full tab holder element.
       * @returns {HTMLElement} The content element inside specified tab holder.
       */
    getTabContentHolder:function(a){return a.children[1]},/**
       * Creates and returns a tab content element.
       *
       * @returns {HTMLElement} The new tab content element.
       */
    getTabContent:function(){return document.createElement("div")},/**
       * Adds an error message to the specified input element.
       *
       * @param {HTMLElement} input The input element that caused the error.
       * @param {string} text The error message.
       */
    addInputError:function(a,b){
    // Get the parent element. Should most likely be a <div class="input-field" ... />.
    var c,d=a.parentNode;d&&(
    // Remove any previous error.
    this.removeInputError(a),
    // Append an error message div.
    c=document.createElement("div"),c.className="error-text red-text",c.textContent=b,d.appendChild(c))},/**
       * Removes any error message from the specified input element.
       *
       * @param {HTMLElement} input The input element that previously caused the error.
       */
    removeInputError:function(a){
    // Get the parent element. Should most likely be a <div class="input-field" ... />.
    var b,c=a.parentElement;if(c){
    // Remove all elements having class .error-text.
    b=c.getElementsByClassName("error-text");for(var d=0;d<b.length;d++)c.removeChild(b[d])}},addTableRowError:function(a){},removeTableRowError:function(a){},/**
       * Gets a select DOM element.
       *
       * @param {object} options The option values.
       * @return {HTMLElement} The DOM element.
       * @see http://materializecss.com/forms.html#select
       */
    getSelectInput:function(a){var b=this._super(a);return b.className="browser-default",b},/**
       * Gets a textarea DOM element.
       *
       * @returns {HTMLElement} The DOM element.
       * @see http://materializecss.com/forms.html#textarea
       */
    getTextareaInput:function(){var a=document.createElement("textarea");return a.style.marginBottom="5px",a.style.fontSize="1rem",a.style.fontFamily="monospace",a},getCheckbox:function(){var a=this.getFormInputField("checkbox");return a.id=this.createUuid(),a},/**
       * Gets the modal element for displaying Edit JSON and Properties dialogs.
       *
       * @returns {HTMLElement} The modal DOM element.
       * @see http://materializecss.com/cards.html
       */
    getModal:function(){var a=document.createElement("div");return a.className="card-panel z-depth-3",a.style.padding="5px",a.style.position="absolute",a.style.zIndex="10",a.style.display="none",a},/**
       * Creates and returns a RFC4122 version 4 compliant unique id.
       *
       * @returns {string} A GUID.
       * @see https://stackoverflow.com/a/2117523
       */
    createUuid:function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(a){var b=16*Math.random()|0,c="x"==a?b:3&b|8;return c.toString(16)})}}),h.AbstractIconLib=c.extend({mapping:{collapse:"",expand:"","delete":"",edit:"",add:"",cancel:"",save:"",moveup:"",movedown:""},icon_prefix:"",getIconClass:function(a){return this.mapping[a]?this.icon_prefix+this.mapping[a]:null},getIcon:function(a){var b=this.getIconClass(a);if(!b)return null;var c=document.createElement("i");return c.className=b,c}}),h.defaults.iconlibs.bootstrap2=h.AbstractIconLib.extend({mapping:{collapse:"chevron-down",expand:"chevron-up","delete":"trash",edit:"pencil",add:"plus",cancel:"ban-circle",save:"ok",moveup:"arrow-up",movedown:"arrow-down",clear:"remove-circle",time:"time",calendar:"calendar"},icon_prefix:"icon-"}),h.defaults.iconlibs.bootstrap3=h.AbstractIconLib.extend({mapping:{collapse:"chevron-down",expand:"chevron-right","delete":"remove",edit:"pencil",add:"plus",cancel:"floppy-remove",save:"floppy-saved",moveup:"arrow-up",movedown:"arrow-down",clear:"remove-circle",time:"time",calendar:"calendar"},icon_prefix:"glyphicon glyphicon-"}),h.defaults.iconlibs.fontawesome3=h.AbstractIconLib.extend({mapping:{collapse:"chevron-down",expand:"chevron-right","delete":"remove",edit:"pencil",add:"plus",cancel:"ban-circle",save:"save",moveup:"arrow-up",movedown:"arrow-down",clear:"remove-circle",time:"time",calendar:"calendar"},icon_prefix:"icon-"}),h.defaults.iconlibs.fontawesome4=h.AbstractIconLib.extend({mapping:{collapse:"caret-square-o-down",expand:"caret-square-o-right","delete":"times",edit:"pencil",add:"plus",cancel:"ban",save:"save",moveup:"arrow-up",movedown:"arrow-down",copy:"files-o",clear:"times-circle-o",time:"clock-o",calendar:"calendar"},icon_prefix:"fa fa-"}),h.defaults.iconlibs.foundation2=h.AbstractIconLib.extend({mapping:{collapse:"minus",expand:"plus","delete":"remove",edit:"edit",add:"add-doc",cancel:"error",save:"checkmark",moveup:"up-arrow",movedown:"down-arrow",clear:"remove",time:"clock",calendar:"calendar"},icon_prefix:"foundicon-"}),h.defaults.iconlibs.foundation3=h.AbstractIconLib.extend({mapping:{collapse:"minus",expand:"plus","delete":"x",edit:"pencil",add:"page-add",cancel:"x-circle",save:"save",moveup:"arrow-up",movedown:"arrow-down",clear:"x-circle",time:"clock",calendar:"calendar"},icon_prefix:"fi-"}),h.defaults.iconlibs.jqueryui=h.AbstractIconLib.extend({mapping:{collapse:"triangle-1-s",expand:"triangle-1-e","delete":"trash",edit:"pencil",add:"plusthick",cancel:"closethick",save:"disk",moveup:"arrowthick-1-n",movedown:"arrowthick-1-s",clear:"circle-close",time:"time",calendar:"calendar"},icon_prefix:"ui-icon ui-icon-"}),h.defaults.iconlibs.materialicons=h.AbstractIconLib.extend({mapping:{collapse:"arrow_drop_up",expand:"arrow_drop_down","delete":"delete",edit:"edit",add:"add",cancel:"cancel",save:"save",moveup:"arrow_upward",movedown:"arrow_downward",copy:"content_copy",clear:"highlight_off",time:"access_time",calendar:"calendar_today"},icon_class:"material-icons",icon_prefix:"",getIconClass:function(a){
    // This method is unused.
    return this.icon_class},getIcon:function(a){
    // Get the mapping.
    var b=this.mapping[a];if(!b)return null;
    // @see http://materializecss.com/icons.html
    var c=document.createElement("i");c.className=this.icon_class;var d=document.createTextNode(b);return c.appendChild(d),c}}),h.defaults.templates["default"]=function(){return{compile:function(a){var b=a.match(/{{\s*([a-zA-Z0-9\-_ \.]+)\s*}}/g),c=b&&b.length;
    // Shortcut if the template contains no variables
    if(!c)return function(){return a};for(var d=[],e=function(a){var c,e=b[a].replace(/[{}]+/g,"").trim().split("."),f=e.length;if(f>1){var g;c=function(b){for(g=b,a=0;a<f&&(g=g[e[a]],g);a++);return g}}else e=e[0],c=function(a){return a[e]};d.push({s:b[a],r:c})},f=0;f<c;f++)e(f);
    // The compiled function
    return function(b){var e,g=a+"";for(f=0;f<c;f++)e=d[f],g=g.replace(e.s,e.r(b));return g}}}},h.defaults.templates.ejs=function(){return!!window.EJS&&{compile:function(a){var b=new window.EJS({text:a});return function(a){return b.render(a)}}}},h.defaults.templates.handlebars=function(){return window.Handlebars},h.defaults.templates.hogan=function(){return!!window.Hogan&&{compile:function(a){var b=window.Hogan.compile(a);return function(a){return b.render(a)}}}},h.defaults.templates.lodash=function(){return!!window._&&{compile:function(a){return function(b){return window._.template(a)(b)}}}},h.defaults.templates.markup=function(){return!(!window.Mark||!window.Mark.up)&&{compile:function(a){return function(b){return window.Mark.up(a,b)}}}},h.defaults.templates.mustache=function(){return!!window.Mustache&&{compile:function(a){return function(b){return window.Mustache.render(a,b)}}}},h.defaults.templates.swig=function(){return window.swig},h.defaults.templates.underscore=function(){return!!window._&&{compile:function(a){return function(b){return window._.template(a,b)}}}},h.defaults.theme="html",h.defaults.template="default",h.defaults.options={},h.defaults.options.prompt_before_delete=!0,h.defaults.translate=function(a,b){var c=h.defaults.languages[h.defaults.language];if(!c)throw"Unknown language "+h.defaults.language;var d=c[a]||h.defaults.languages[h.defaults.default_language][a];if("undefined"==typeof d)throw"Unknown translate string "+a;if(b)for(var e=0;e<b.length;e++)d=d.replace(new RegExp("\\{\\{"+e+"}}","g"),b[e]);return d},h.defaults.default_language="en",h.defaults.language=h.defaults.default_language,h.defaults.languages.en={/**
       * When a property is not set
       */
    error_notset:"Property must be set",/**
       * When a string must not be empty
       */
    error_notempty:"Value required",/**
       * When a value is not one of the enumerated values
       */
    error_enum:"Value must be one of the enumerated values",/**
       * When a value doesn't validate any schema of a 'anyOf' combination
       */
    error_anyOf:"Value must validate against at least one of the provided schemas",/**
       * When a value doesn't validate
       * @variables This key takes one variable: The number of schemas the value does not validate
       */
    error_oneOf:"Value must validate against exactly one of the provided schemas. It currently validates against {{0}} of the schemas.",/**
       * When a value does not validate a 'not' schema
       */
    error_not:"Value must not validate against the provided schema",/**
       * When a value does not match any of the provided types
       */
    error_type_union:"Value must be one of the provided types",/**
       * When a value does not match the given type
       * @variables This key takes one variable: The type the value should be of
       */
    error_type:"Value must be of type {{0}}",/**
       *  When the value validates one of the disallowed types
       */
    error_disallow_union:"Value must not be one of the provided disallowed types",/**
       *  When the value validates a disallowed type
       * @variables This key takes one variable: The type the value should not be of
       */
    error_disallow:"Value must not be of type {{0}}",/**
       * When a value is not a multiple of or divisible by a given number
       * @variables This key takes one variable: The number mentioned above
       */
    error_multipleOf:"Value must be a multiple of {{0}}",/**
       * When a value is greater than it's supposed to be (exclusive)
       * @variables This key takes one variable: The maximum
       */
    error_maximum_excl:"Value must be less than {{0}}",/**
       * When a value is greater than it's supposed to be (inclusive
       * @variables This key takes one variable: The maximum
       */
    error_maximum_incl:"Value must be at most {{0}}",/**
       * When a value is lesser than it's supposed to be (exclusive)
       * @variables This key takes one variable: The minimum
       */
    error_minimum_excl:"Value must be greater than {{0}}",/**
       * When a value is lesser than it's supposed to be (inclusive)
       * @variables This key takes one variable: The minimum
       */
    error_minimum_incl:"Value must be at least {{0}}",/**
       * When a value have too many characters
       * @variables This key takes one variable: The maximum character count
       */
    error_maxLength:"Value must be at most {{0}} characters long",/**
       * When a value does not have enough characters
       * @variables This key takes one variable: The minimum character count
       */
    error_minLength:"Value must be at least {{0}} characters long",/**
       * When a value does not match a given pattern
       */
    error_pattern:"Value must match the pattern {{0}}",/**
       * When an array has additional items whereas it is not supposed to
       */
    error_additionalItems:"No additional items allowed in this array",/**
       * When there are to many items in an array
       * @variables This key takes one variable: The maximum item count
       */
    error_maxItems:"Value must have at most {{0}} items",/**
       * When there are not enough items in an array
       * @variables This key takes one variable: The minimum item count
       */
    error_minItems:"Value must have at least {{0}} items",/**
       * When an array is supposed to have unique items but has duplicates
       */
    error_uniqueItems:"Array must have unique items",/**
       * When there are too many properties in an object
       * @variables This key takes one variable: The maximum property count
       */
    error_maxProperties:"Object must have at most {{0}} properties",/**
       * When there are not enough properties in an object
       * @variables This key takes one variable: The minimum property count
       */
    error_minProperties:"Object must have at least {{0}} properties",/**
       * When a required property is not defined
       * @variables This key takes one variable: The name of the missing property
       */
    error_required:"Object is missing the required property '{{0}}'",/**
       * When there is an additional property is set whereas there should be none
       * @variables This key takes one variable: The name of the additional property
       */
    error_additional_properties:"No additional properties allowed, but property {{0}} is set",/**
       * When a dependency is not resolved
       * @variables This key takes one variable: The name of the missing property for the dependency
       */
    error_dependency:"Must have property {{0}}",/**
       * When a date is in incorrect format
       * @variables This key takes one variable: The valid format
       */
    error_date:"Date must be in the format {{0}}",/**
       * When a time is in incorrect format
       * @variables This key takes one variable: The valid format
       */
    error_time:"Time must be in the format {{0}}",/**
       * When a datetime-local is in incorrect format
       * @variables This key takes one variable: The valid format
       */
    error_datetime_local:"Datetime must be in the format {{0}}",/**
       * When a integer date is less than 1 January 1970
       */
    error_invalid_epoch:"Date must be greater than 1 January 1970",/**
       * Text on Delete All buttons
       */
    button_delete_all:"All",/**
       * Title on Delete All buttons
       */
    button_delete_all_title:"Delete All",/**
        * Text on Delete Last buttons
        * @variable This key takes one variable: The title of object to delete
        */
    button_delete_last:"Last {{0}}",/**
        * Title on Delete Last buttons
        * @variable This key takes one variable: The title of object to delete
        */
    button_delete_last_title:"Delete Last {{0}}",/**
        * Title on Add Row buttons
        * @variable This key takes one variable: The title of object to add
        */
    button_add_row_title:"Add {{0}}",/**
        * Title on Move Down buttons
        */
    button_move_down_title:"Move down",/**
        * Title on Move Up buttons
        */
    button_move_up_title:"Move up",/**
        * Title on Delete Row buttons
        * @variable This key takes one variable: The title of object to delete
        */
    button_delete_row_title:"Delete {{0}}",/**
        * Title on Delete Row buttons, short version (no parameter with the object title)
        */
    button_delete_row_title_short:"Delete",/**
        * Title on Collapse buttons
        */
    button_collapse:"Collapse",/**
        * Title on Expand buttons
        */
    button_expand:"Expand",/**
        * Title on Flatpickr toggle buttons
        */
    flatpickr_toggle_button:"Toggle",/**
        * Title on Flatpickr clear buttons
        */
    flatpickr_clear_button:"Clear"},h.plugins={ace:{theme:""},SimpleMDE:{},sceditor:{},select2:{},selectize:{}},f(h.defaults.editors,function(a,b){h.defaults.editors[a].options=b.options||{}}),h.defaults.resolvers.unshift(function(a){if("string"!=typeof a.type)return"multiple"}),h.defaults.resolvers.unshift(function(a){
    // If the schema is a simple type
    if(!a.type&&a.properties)return"object"}),h.defaults.resolvers.unshift(function(a){
    // If the schema is a simple type
    if("string"==typeof a.type)return a.type}),h.defaults.resolvers.unshift(function(a){if("string"===a.type&&"signature"===a.format)return"signature"}),h.defaults.resolvers.unshift(function(a){if("integer"===a.type&&"rating"===a.format)return"rating"}),h.defaults.resolvers.unshift(function(a){if("boolean"===a.type)
    // If explicitly set to 'checkbox', use that
    // If explicitly set to 'checkbox', use that
    return"checkbox"===a.format||a.options&&a.options.checkbox?"checkbox":h.plugins.selectize.enable?"selectize":"select"}),h.defaults.resolvers.unshift(function(a){
    // If the schema can be of any type
    if("any"===a.type)return"multiple"}),h.defaults.resolvers.unshift(function(a){
    // If the schema can be of any type
    if("string"===a.type&&a.media&&"base64"===a.media.binaryEncoding)return"base64"}),h.defaults.resolvers.unshift(function(a){if("string"===a.type&&"url"===a.format&&a.options&&a.options.upload===!0&&window.FileReader)return"upload"}),h.defaults.resolvers.unshift(function(a){
    // Type `array` with format set to `table`
    if("array"===a.type&&"table"===a.format)return"table"}),h.defaults.resolvers.unshift(function(a){if(a.enumSource)return h.plugins.selectize.enable?"selectize":"select"}),h.defaults.resolvers.unshift(function(a){if(a["enum"]){if("array"===a.type||"object"===a.type)return"enum";if("number"===a.type||"integer"===a.type||"string"===a.type)return h.plugins.selectize.enable?"selectize":"select"}}),h.defaults.resolvers.unshift(function(a){if("array"===a.type&&a.items&&!Array.isArray(a.items)&&a.uniqueItems&&["string","number","integer"].indexOf(a.items.type)>=0){
    // For enumerated strings, number, or integers
    if(a.items["enum"])return"multiselect";if(h.plugins.selectize.enable&&"string"===a.items.type)return"arraySelectize"}}),h.defaults.resolvers.unshift(function(a){
    // If this schema uses `oneOf` or `anyOf`
    if(a.oneOf||a.anyOf)return"multiple"}),h.defaults.resolvers.unshift(function(a){if(["string","integer"].indexOf(a.type)!==-1&&["date","time","datetime-local"].indexOf(a.format)!==-1)return"datetime"}),h.defaults.resolvers.unshift(function(a){if("string"===a.type&&"starrating"===a.format)return"starrating"}),function(){if(window.jQuery||window.Zepto){var a=window.jQuery||window.Zepto;a.jsoneditor=h.defaults,a.fn.jsoneditor=function(a){var b=this,c=this.data("jsoneditor");if("value"===a){if(!c)throw"Must initialize jsoneditor before getting/setting the value";
    // Set value
    if(!(arguments.length>1))return c.getValue();c.setValue(arguments[1])}else{if("validate"===a){if(!c)throw"Must initialize jsoneditor before validating";
    // Validate a specific value
    // Validate a specific value
    return arguments.length>1?c.validate(arguments[1]):c.validate()}"destroy"===a?c&&(c.destroy(),this.data("jsoneditor",null)):(
    // Destroy first
    c&&c.destroy(),
    // Create editor
    c=new h(this.get(0),a),this.data("jsoneditor",c),
    // Setup event listeners
    c.on("change",function(){b.trigger("change")}),c.on("ready",function(){b.trigger("ready")}))}return this}}}(),h});
    //# sourceMappingURL=jsoneditor.min.js.map