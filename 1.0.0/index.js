!function(a,b){function c(b,d){var e,f;if("."!=b[0]&&"/"!=b[0])return a(b);if(d=d||"root",e=c.resolve(b),!e&&/\.json$/i.test(b))return a("./"+c.basename(b));if(f=c.cache[e],!f)try{return a(b)}catch(g){throw Error('failed to require "'+b+'" from '+d+"\n"+g.message+"\n"+g.stack)}return f.exports||(f.exports={},f.call(f.exports,f,f.exports,c.relative(e))),f.exports}c.cache={},c.basename=a("path").basename,c.resolve=function(b){var d,e,f,g;if("."!=b[0])return a.resolve(b);for(d="/"===b.slice(-1)?b:b+"/",e=[b,b+".js",d+"index.js",b+".json",d+"index.json"],f=0;g=e[f];f++)if(c.cache[g])return g},c.register=function(a,b){c.cache[a]=b},c.relative=function(a){function b(b){var d,e,f,g,h;if("."!=b[0])return c(b);for(d=a.split("/"),e=b.split("/"),d.pop(),f=0,g=e.length;g>f;f+=1)h=e[f],".."==h?d.pop():"."!=h&&d.push(h);return c(d.join("/"),a)}return b.resolve=c.resolve,b.cache=c.cache,b},c.register("./event-emitter.js",function(a,b,c){var d=c("events"),e=c("util");a.exports.makeEmitter=function(a){e.inherits(a,d)},a.exports.instantiateEmitter=function(a){d.call(a)}}),c.register("./wb-characteristic.js",function(a,b,c){function h(a,b,c){function h(a,b){var c=d.hexAsArray(b);n=new DataView(new Uint8Array(c).buffer),g.emit("characteristicvaluechanged",{target:g})}var g,j,k,l,m,n,o;e.instantiateEmitter(this),g=this,j=b,k=a,l=c,c.wbCharacteristic=this,m=new i(l.allProperties()),n=null,o=!1,Object.defineProperty(this,"uuid",{get:function(){return d.toWbUUID(l.uuid)}}),Object.defineProperty(this,"service",{get:function(){return k}}),Object.defineProperty(this,"properties",{get:function(){return m}}),Object.defineProperty(this,"value",{get:function(){return n}}),this.getDescriptor=function(a){var b=this;return d.errorLoggingPromise(function(c,e){var h,g=d.toVensiUUID(j.BluetoothUUID.getDescriptor(a));void 0===g?e("Unable to find descriptor with requested UUID "+a):(h=l.findDescriptor(g),h?c(new f(b,j,h)):e("Descriptor "+a+" not found"))})},this.getDescriptors=function(a){var b=this;return d.errorLoggingPromise(function(c,e){var i,k,m,g=l.getAllDescriptors(),h=Object.values(g);if(a)i=d.toVensiUUID(j.BluetoothUUID.getDescriptor(a)),h.indexOf(i)>-1?c([new f(b,j,i)]):e("Unable to find descriptor with requested UUID "+a);else{for(k=[],m=0;m<h.length;m++)k.push(new f(b,j,h[m]));c(k)}})},this.readValue=function(){return d.errorLoggingPromise(function(a,b){l.readValue({fulfill:function(b,c){var e=d.hexAsArray(c);a(new DataView(new Uint8Array(e).buffer))},reject:b})})},this.writeValue=function(a){return d.errorLoggingPromise(function(b,c){l.writeValue({fulfill:b,reject:c},d.arrayAsHex(Array.prototype.slice.call(a)))})},this.startNotifications=function(){var a=this;return d.errorLoggingPromise(function(b,c){return o?void c("Already notifying"):void l.enableNotifications({fulfill:function(d,e){e?(o=!0,d.on("valueChange",h),b(a)):c("Did not receive expected response from the gateway")},reject:c},!0)})},this.stopNotifications=function(){var a=this;return d.errorLoggingPromise(function(b,c){return o?void l.enableNotifications({fulfill:function(d,e){e?c("Did not receive expected response from the gateway"):(o=!1,d.removeListener("valueChange",h),b(a))},reject:c},!1):void c("Was not notifying")})},this.addEventListener=function(a,b){this.on(a,b)},this.removeEventListener=function(a,b){this.removeListener(a,b)}}function i(a){function b(a){return a.charAt(0).toUpperCase()+a.slice(1)}var c,d;for(c in g)wbPropName=g[c],d=b(wbPropName),"object"==typeof a[d]?this[wbPropName]=1==a[d].enabled:("reliableWrite"==wbPropName||"writableAuxiliaries"==wbPropName)&&(a.ExtendedProperties&&1===a.ExtendedProperties.enabled?(console.error("WB spec 5.4.1 section not fully implemented."),this[wbPropName]=!1):this[wbPropName]=!1)}var d=c("./util.js"),e=c("./event-emitter"),f=c("./wb-descriptor").BluetoothRemoteGATTDescriptor,g=["broadcast","read","writeWithoutResponse","write","notify","indicate","authenticatedSignedWrites","reliableWrite","writableAuxiliaries"];a.exports.BluetoothRemoteGATTCharacteristic=h,e.makeEmitter(h)}),c.register("./wb-server.js",function(a,b,c){function g(a,b,c,g,h,i){function n(){var c,a=l.getAllServices(),b=Object.keys(a);for(c=0;c<b.length;c++)"string"==typeof b[c]&&4==b[c].length&&(b[c]=parseInt(b[c],16));return i?g.getAllSupportedServices(k,b,i,h):g.getOptionalServices(k,b,h)}function o(a){var b=this;return d.errorLoggingPromise(function(c,f){var h,i,j,g=n();if(a)h=d.toVensiUUID(k.BluetoothUUID.getService(a)),g.indexOf(h)>-1?c([new e(b.device,k,h)]):f("Service "+a+" not found");else{for(i=[],j=0;j<g.length;j++)i.push(new e(b.device,k,g[j]));c(i)}})}function p(a){var b=this;return d.errorLoggingPromise(function(c,f){var h,g=d.toVensiUUID(k.BluetoothUUID.getService(a));-1!=n().indexOf(g)?void 0===g?f("Unable to find service with requested UUID "+a):(h=l.findService(g),h?c(new e(b.device,k,h)):(h=l.findService(a),h?(console.error("Hack alert: Fix VensiUUID "),c(new e(b.device,k,h))):f("Service "+a+" not found"))):f("Service not supported")})}var j,k,l,m;f.instantiateEmitter(this),j=this,k=b,l=c,m=!1,Object.defineProperty(this,"device",{get:function(){return a}}),Object.defineProperty(this,"connected",{get:function(){return m},set:function(a){m=a}}),j.connect=function(){var a=this;return new Promise(function(b,c){l.connect({fulfill:function(c){l=c,m=!0,b(a)},reject:c})})},j.disconnect=function(){var a=this;m&&l.disconnect(function(b){a.device.emit("gattserverdisconnected",{target:a}),d.removeNotificationListeners(b),a.device=null,m=!1})},j.getPrimaryService=p,j.getPrimaryServices=o}var d=c("./util.js"),e=c("./wb-service").BluetoothRemoteGATTService,f=c("./event-emitter");a.exports.BluetoothRemoteGATTServer=g,f.makeEmitter(g)}),c.register("./wb-advertisement.js",function(a,b,c){"use strict";var d=c("./util.js"),e=function(a){var b=this;return Object.defineProperty(b,"device",{get:function(){return a}}),Object.defineProperty(b,"uuids",{get:function(){return a.serviceUUIDs}}),Object.defineProperty(b,"name",{get:function(){return a.name}}),Object.defineProperty(b,"appearance",{get:function(){return void 0}}),Object.defineProperty(b,"txPower",{get:function(){return a.txPowerLevel}}),Object.defineProperty(b,"rssi",{get:function(){return a.rssi}}),Object.defineProperty(b,"manufacturerData",{get:function(){return d.mfrDataToMap(a)}}),Object.defineProperty(b,"serviceData",{get:function(){return void 0}}),b},f=function(a,b){var c=this,f=a.getGateway(),g=function(a){a.uuid==b.id&&b.emit("advertisementreceived",new e(a))};c.watchAdv=function(){return b.watchingAdvertisements=!0,d.errorLoggingPromise(function(a){f.scan(function(){f.on("scan",g),a(void 0)})})},c.unwatchAdv=function(){f.stopScan(function(){f.removeListener("scan",g),console.log("scan stopped")}),b.watchingAdvertisements=!1}};a.exports.Advertisement=f,a.exports.BluetoothAdvertisingEvent=e}),c.register("./wb-service.js",function(a,b,c){function f(a,b,c){var f=this,g=b,i=c;Object.defineProperty(f,"uuid",{get:function(){return d.toWbUUID(i.uuid)}}),Object.defineProperty(f,"isPrimary",{get:function(){return!0}}),Object.defineProperty(f,"device",{get:function(){return f._device}}),f.getCharacteristic=function(a){var b=this;return d.errorLoggingPromise(function(c,f){var j,h=d.toVensiUUID(g.BluetoothUUID.getCharacteristic(a));void 0===h?f("Unable to find characteristic with requested UUID "+a):(j=i.findCharacteristic(h),j?c(new e(b,g,j)):(j=i.findCharacteristic(a),j?(console.error("Hack alert: Fix VensiUUID "),c(new e(b,g,j))):f("Characteristic "+a+" not found")))})},f.getCharacteristics=function(a){var b=this;return d.errorLoggingPromise(function(c,f){var k,l,m,n,h=i.getAllCharacteristics(),j=Object.values(h);if(a)k=d.toVensiUUID(g.BluetoothUUID.getService(a)),l=i.findCharacteristic(k),l?c([new e(b,g,l)]):f("Characteristic "+a+" not found");else{for(m=[],n=0;n<j.length;n++)m.push(new e(b,g,j[n]));c(m)}})},f.getIncludedService=function(){return d.errorLoggingPromise(function(a,b){b("Not implemented")})},f.getIncludedServices=function(){return d.errorLoggingPromise(function(a,b){b("Not implemented")})}}var d=c("./util.js"),e=c("./wb-characteristic").BluetoothRemoteGATTCharacteristic;a.exports.BluetoothRemoteGATTService=f}),c.register("./wb-errors.js",function(a){var d={INVALID_OPTIONS_ERROR_MESSAGE:"Either 'filters' should be present or 'acceptAllDevices' should be true, but not both.",INVALID_LESCAN_OPTIONS_ERROR_MESSAGE:"Either 'filters' should be present or 'acceptAllAdvertisements' should be true, but not both.",EMPTY_FILTER_ERROR_MESSAGE:"'filters' member must be non-empty to find any devices.",INVALID_MFR_DATA_FORMAT:"Invalid manufacturerData format",INVALID_SERVICE_DATA_FORMAT:"Invalid serviceData format",INVALID_NAME_ERROR_MESSAGE:"Invalid name format",INVALID_NAME_PREFIX_ERROR_MESSAGE:"Invalid name prefix"};a.exports.invalidServiceUUIDMessage=function(a){return"Invalid Service name: '"+a+"'. It must be a valid UUID alias (e.g. 0x1234), UUID (lowercase hex characters e.g. '00001234-0000-1000-8000-00805f9b34fb'), or recognized standard name from https://www.bluetooth.com/specifications/gatt/services e.g. 'alert_notification'."},a.exports.errors=d}),c.register("./util.js",function(a){function e(a){return 8==a.indexOf(d)?0==a.indexOf("0000")?a.substring(4,8):a.substring(0,8):a}var d="-0000-1000-8000-00805F9B34FB";a.exports.toVensiUUID=function(a){switch(typeof a){case"string":return e(a.toUpperCase());case"number":return(+a).toString(16).toUpperCase();default:return void console.warn("Unable to convert uuid "+a+" to hex string")}},a.exports.toWbUUID=function(a){return a&&(a=a.toLowerCase()),a},a.exports.hexAsArray=function(a){var c,b=[];for(a.length%2==1&&(a="0"+a),c=0;c<a.length-1;c+=2)b.push(parseInt(a.substr(c,2),16));return b},a.exports.arrayAsHex=function(a){var c,d,b="";for(c in a)byte=a[c],d=(255&byte).toString(16),1==d.length&&(d="0"+d),b+=d;return b.toUpperCase()},a.exports.isHex=function(a){var b=/^[A-Fa-f0-9-x]+$/;return null!=(""+a).match(b)},a.exports.isLowercase=function(a){return a.toLowerCase()==a},a.exports.isEmpty=function(a){for(var b in a)if(a.hasOwnProperty(b))return!1;return!0},a.exports.stringIsInteger=function(a){var b,c;return a=a.replace(/\b0+/g,""),b=parseInt(a),c=""+b,a===c},a.exports.uintArrayToString=function(a){var d,b=""+a,c=b.split(",");for(d=0;d<c.length;d++)1==c[d].length&&(c[d]="0"+c[d]);return c.join("")},a.exports.uncaughtError=function(a){console.error("Uncaught error:",a,a.stack)},a.exports.gattIpRequestPromise=function(b){return new Promise(function(c,d){try{b(c,d)}catch(e){throw a.exports.uncaughtError(e),e}})},a.exports.errorLoggingPromise=function(b){return new Promise(function(c,d){try{b(c,d)}catch(e){throw a.exports.uncaughtError(e),e}})},a.exports.mfrDataToMap=function(b){var e,f,g,h,c=new Map,d=b.getAllMfrData();for(e in d)d.hasOwnProperty(e)&&(f=a.exports.hexAsArray(d[e]),g=new DataView(new Uint8Array(f).buffer),h=parseInt(e,16),c.set(h,g));return c},a.exports.getUTF8Length=function(a){var c,d,b=0;for(c=0;c<a.length;c++)d=a.charCodeAt(c),128>d?b++:b+=d>127&&2048>d?2:3;return b},a.exports.objectKeysToArrayOfIntegers=function(a){var c,b=[];for(c in a)a.hasOwnProperty(c)&&b.push(""+parseInt(c,16));return b},a.exports.removeNotificationListeners=function(a){var c,d,e,b=a.getAllServices();for(c in b){d=b[c].getAllCharacteristics();for(e in d)d[e].wbCharacteristic&&(console.log("removing the listeners for characteristic :"+e),d[e].wbCharacteristic.removeAllListeners())}}}),c.register("./wb-device.js",function(a,b,c){function h(a,b,c,h,i){function p(a){j.gatt.connected=!1,d.removeNotificationListeners(a),j.emit("gattserverdisconnected",{target:j})}var j,k,l,m,n,o;e.instantiateEmitter(this),j=this,k=a,l=b,m=!1,n=new g(k,this),o=new f(j,a,b,c,h,i),j.addEventListener=function(a,b){this.on(a,b)},j.removeEventListener=function(a,b){this.removeListener(a,b)},l.once("disconnected",p),Object.defineProperty(this,"gatt",{get:function(){return o}}),Object.defineProperty(this,"name",{get:function(){return l.name}}),Object.defineProperty(this,"id",{get:function(){return l.uuid}}),Object.defineProperty(this,"watchingAdvertisements",{get:function(){return m},set:function(a){m=a}}),j.watchAdvertisements=n.watchAdv,j.unwatchAdvertisements=n.unwatchAdv}var d=c("./util.js"),e=c("./event-emitter"),f=c("./wb-server").BluetoothRemoteGATTServer,g=c("./wb-advertisement").Advertisement;a.exports.BluetoothDevice=h,e.makeEmitter(h)}),c.register("./filter-util.js",function(a,b,c){function e(a,b,c){var e,d=a.match(/.{1,2}/g);if(!(d.length>=b.length))return!1;for(e=0;e<b.length;e++)if((b[e]&c[e])!=(d[e]&c[e]))return!1;return!0}var d=c("./util");a.exports.nameFilter=function(a,b){return a.name?a.name===b.name:!0},a.exports.namePrefixFilter=function(a,b){return a.namePrefix?b.name.indexOf(a.namePrefix)>-1:!0},a.exports.servicesFilter=function(a,b,c){var e,f,g;if(b.services){for(e=!0,f=0;f<b.services.length;f++)g=d.toVensiUUID(a.BluetoothUUID.getService(b.services[f])),-1===c.serviceUUIDs.indexOf(d.toVensiUUID(a.BluetoothUUID.getService(b.services[f])))&&(e=!1);return e}return!0},a.exports.manufacturerDataFilter=function(a,b){var c,f,g,h;if(a.manufacturerData){if(c=b.getAllMfrData(),f=d.objectKeysToArrayOfIntegers(c),d.isEmpty(a.manufacturerData))return!1;for(g in a.manufacturerData)if(a.manufacturerData.hasOwnProperty(g)){if(-1==f.indexOf(g)&&-1==f.indexOf(""+parseInt(g,16)))return!1;if(!d.isEmpty(a.manufacturerData[g]))if(!d.isEmpty(a.manufacturerData[g])&&"mask"in a.manufacturerData[g]){if(0==e(c[g],a.manufacturerData[g].dataPrefix,a.manufacturerData[g].mask))return!1}else if(h=d.uintArrayToString(a.manufacturerData[g].dataPrefix),0!=c[g].indexOf(h))return!1}return!0}return!0},a.exports.serviceDataFilter=function(a,b){var c,e;if(a.serviceData){if(c=b.getAllSvcData(),d.isEmpty(a.serviceData))return!1;for(e in a.serviceData)if(a.serviceData.hasOwnProperty(e)){if(!c.hasOwnProperty(e))return!1;if(!d.isEmpty(a.serviceData[e]))return!1}return!0}return!0}}),c.register("./index.js",function(a,b,c){"use strict";function n(a){this.gateway=a,this.activeScans=[],this.foundDevices=[]}var m,o,p,d=c("gatt-ip-js").GATTIP,e=c("./util.js"),f=c("./thirdparty"),g=c("./wb-device").BluetoothDevice,h=c("./wb-filters"),i=c("./filter-validation"),j=c("./wb-advertisement"),k=c("events"),l=new k.EventEmitter;a.exports.navigator=void 0,n.prototype.requestLEScan=function(a){var d,f,b=this,c=this.gateway;if(a.filters&&a.filters.length>0)for(d=[],f=0;f<a.filters.length;f++)d.push(new h.BluetoothLEScanFilterInit(a.filters[f]));return e.errorLoggingPromise(function(a){c.getGateway()?a(c.getGateway()):c.once("ready",function(b){a(b)})}).then(function(){return e.errorLoggingPromise(function(e,f){var j,k,h=(setTimeout(function(){m.errorCallback?m.errorCallback({error:"Timed out"}):f(new DOMException("No devices found.","NotFoundError"))},3e4),i.validateFilters(c,d,a.options.acceptAllAdvertisements));return h.error?void f(new TypeError(h.message)):(j=h.isFiltering,k=c.getGateway(),void(k&&e(new o(b,c,j,a))))})})},n.prototype.requestDevice=function(a){var c,f,j,k,d=a.acceptAllDevices,b=a.optionalServices;if(a.filters&&a.filters.length>0)for(f=[],j=0;j<a.filters.length;j++)f.push(new h.BluetoothLEScanFilterInit(a.filters[j]));return k=this.gateway,e.errorLoggingPromise(function(a){k.getGateway()?a(k.getGateway()):k.once("ready",function(b){a(b)})}).then(function(){return e.errorLoggingPromise(function(a,e){function q(a){var b,d;clearTimeout(j),n?(d=h.filterScan(k,a,f),b=d.peripheral,c=d.filter):c=void 0,m.returnData?n?b&&m.returnData({peripheral:b}):m.returnData({peripheral:a}):n?b&&(o.removeListener("scan",q),r(b)):r(a)}function r(d){o.stopScan(function(){o.removeListener("scan",q),console.log("Scan stopped"),console.log("FOUND",d.name);var e=new g(k,d,h,b,c);c=void 0,a(e)})}function s(a){o.stopScan(function(){console.log("Scan stopped")}),e(a)}var n,o,p,j=setTimeout(function(){m.errorCallback?(m.errorCallback({error:"Timed out"}),e(new DOMException("No devices found.","NotFoundError"))):e("Timed out")},3e4),l=i.validateFilters(k,f,d,b);return l.error?void e(new TypeError(l.message)):(n=l.isFiltering,o=k.getGateway(),p={connectScan:!0},k.on("state",function(a){a||e("Bluetooth is off")}),void o.scan(function(){m.returnData&&m.returnData({select:r,reject:s}),o.on("scan",q)}))})})},o=function(a,b,c,d){function q(a){var d;d=c?h.filterScan(b,a,f.filters).peripheral:a,0==f.keepRepeatedDevices&&(d=p(n.foundDevices,d)),d&&(d.manufacturerData=e.mfrDataToMap(d),n.foundDevices[d.uuid]=d,l.emit("advertisementreceived",new j.BluetoothAdvertisingEvent(d)))}var n,o,f=this,g=!1,i=d.filters,k=d.options.keepRepeatedDevices,m=d.options.acceptAllAdvertisements;Object.defineProperty(f,"active",{get:function(){return g}}),Object.defineProperty(f,"filters",{get:function(){return i}}),Object.defineProperty(f,"keepRepeatedDevices",{get:function(){return k}}),Object.defineProperty(f,"acceptAllAdvertisements",{get:function(){return m}}),n=a,o=b.getGateway(),o.scan(function(){g=!0,n.activeScans.push(f),o.on("scan",q)}),f.stop=function(){o.stopScan(function(){g=!1;var a=n.activeScans.indexOf(f);n.activeScans.splice(a,1),console.log("Scan stopped")})}},n.prototype.addEventListener=function(a,b){l.on(a,b)},n.prototype.removeEventListener=function(a,b){l.removeListener(a,b)},p=function(a,b){var e,c=b,d=!1;for(e in a)e==c.uuid&&(d=!0);return d&&(c=void 0),c},a.exports.init=function(a){var b,c;return m=a?a:{},b=new d,b.BluetoothUUID=f.BluetoothUUID,c={},c.bluetooth=new n(b),m.token&&(c.bluetooth.referringDevice={dummy:"this is a dummy device",id:m.deviceUUID}),c.bluetooth.gattip=b,b.open(m),b.on("error",function(a){console.error("Service Error:",a.message),a.stack&&console.error("Error Stack:",a.stack)}),{navigator:c}}}),c.register("./wb-descriptor.js",function(a,b,c){function e(a,b,c){var j,k,e=this,g=a,h=c,i=null;Object.defineProperty(e,"uuid",{get:function(){return d.toWbUUID(h.uuid)}}),Object.defineProperty(e,"characteristic",{get:function(){return g}}),Object.defineProperty(e,"value",{get:function(){return i}}),j=function(){return d.errorLoggingPromise(function(a,b){h.readValue({fulfill:function(b,c){var e=d.hexAsArray(c);a(new DataView(new Uint8Array(e).buffer))},reject:b})})},k=function(a){return d.errorLoggingPromise(function(b,c){h.writeValue({fulfill:b,reject:c},d.arrayAsHex(Array.prototype.slice.call(a)))})}}var d=c("./util");a.exports.BluetoothRemoteGATTDescriptor=e}),c.register("./thirdparty.js",function(a){function e(a){a>>>=0;var b="0000000"+a.toString(16);return b=b.substr(-8),b+"-0000-1000-8000-00805f9b34fb"}function f(b){var c=a.exports.BluetoothUUID[b];return function(a){return"string"==typeof a&&(a=a.toLowerCase()),"number"==typeof a?e(a):d.test(a)?a:c.hasOwnProperty(a)?c[a]:!1}}var d=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;a.exports.BluetoothUUID={},a.exports.BluetoothUUID.canonicalUUID=e,a.exports.BluetoothUUID.service={alert_notification:e(6161),automation_io:e(6165),battery_service:e(6159),blood_pressure:e(6160),body_composition:e(6171),bond_management:e(6174),continuous_glucose_monitoring:e(6175),current_time:e(6149),cycling_power:e(6168),cycling_speed_and_cadence:e(6166),device_information:e(6154),environmental_sensing:e(6170),generic_access:e(6144),generic_attribute:e(6145),glucose:e(6152),health_thermometer:e(6153),heart_rate:e(6157),human_interface_device:e(6162),immediate_alert:e(6146),indoor_positioning:e(6177),internet_protocol_support:e(6176),link_loss:e(6147),location_and_navigation:e(6169),next_dst_change:e(6151),phone_alert_status:e(6158),pulse_oximeter:e(6178),reference_time_update:e(6150),running_speed_and_cadence:e(6164),scan_parameters:e(6163),tx_power:e(6148),user_data:e(6172),weight_scale:e(6173)},a.exports.BluetoothUUID.characteristic={aerobic_heart_rate_lower_limit:e(10878),aerobic_heart_rate_upper_limit:e(10884),aerobic_threshold:e(10879),age:e(10880),aggregate:e(10842),alert_category_id:e(10819),alert_category_id_bit_mask:e(10818),alert_level:e(10758),alert_notification_control_point:e(10820),alert_status:e(10815),altitude:e(10931),anaerobic_heart_rate_lower_limit:e(10881),anaerobic_heart_rate_upper_limit:e(10882),anaerobic_threshold:e(10883),analog:e(10840),apparent_wind_direction:e(10867),apparent_wind_speed:e(10866),"gap.appearance":e(10753),barometric_pressure_trend:e(10915),battery_level:e(10777),blood_pressure_feature:e(10825),blood_pressure_measurement:e(10805),body_composition_feature:e(10907),body_composition_measurement:e(10908),body_sensor_location:e(10808),bond_management_control_point:e(10916),bond_management_feature:e(10917),boot_keyboard_input_report:e(10786),boot_keyboard_output_report:e(10802),boot_mouse_input_report:e(10803),"gap.central_address_resolution_support":e(10918),cgm_feature:e(10920),cgm_measurement:e(10919),cgm_session_run_time:e(10923),cgm_session_start_time:e(10922),cgm_specific_ops_control_point:e(10924),cgm_status:e(10921),csc_feature:e(10844),csc_measurement:e(10843),current_time:e(10795),cycling_power_control_point:e(10854),cycling_power_feature:e(10853),cycling_power_measurement:e(10851),cycling_power_vector:e(10852),database_change_increment:e(10905),date_of_birth:e(10885),date_of_threshold_assessment:e(10886),date_time:e(10760),day_date_time:e(10762),day_of_week:e(10761),descriptor_value_changed:e(10877),"gap.device_name":e(10752),dew_point:e(10875),digital:e(10838),dst_offset:e(10765),elevation:e(10860),email_address:e(10887),exact_time_256:e(10764),fat_burn_heart_rate_lower_limit:e(10888),fat_burn_heart_rate_upper_limit:e(10889),firmware_revision_string:e(10790),first_name:e(10890),five_zone_heart_rate_limits:e(10891),floor_number:e(10930),gender:e(10892),glucose_feature:e(10833),glucose_measurement:e(10776),glucose_measurement_context:e(10804),gust_factor:e(10868),hardware_revision_string:e(10791),heart_rate_control_point:e(10809),heart_rate_max:e(10893),heart_rate_measurement:e(10807),heat_index:e(10874),height:e(10894),hid_control_point:e(10828),hid_information:e(10826),hip_circumference:e(10895),humidity:e(10863),"ieee_11073-20601_regulatory_certification_data_list":e(10794),indoor_positioning_configuration:e(10925),intermediate_blood_pressure:e(10806),intermediate_temperature:e(10782),irradiance:e(10871),language:e(10914),last_name:e(10896),latitude:e(10926),ln_control_point:e(10859),ln_feature:e(10858),"local_east_coordinate.xml":e(10929),local_north_coordinate:e(10928),local_time_information:e(10767),location_and_speed:e(10855),location_name:e(10933),longitude:e(10927),magnetic_declination:e(10796),magnetic_flux_density_2D:e(10912),magnetic_flux_density_3D:e(10913),manufacturer_name_string:e(10793),maximum_recommended_heart_rate:e(10897),measurement_interval:e(10785),model_number_string:e(10788),navigation:e(10856),new_alert:e(10822),"gap.peripheral_preferred_connection_parameters":e(10756),"gap.peripheral_privacy_flag":e(10754),plx_continuous_measurement:e(10847),plx_features:e(10848),plx_spot_check_measurement:e(10846),pnp_id:e(10832),pollen_concentration:e(10869),position_quality:e(10857),pressure:e(10861),protocol_mode:e(10830),rainfall:e(10872),"gap.reconnection_address":e(10755),record_access_control_point:e(10834),reference_time_information:e(10772),report:e(10829),report_map:e(10827),resting_heart_rate:e(10898),ringer_control_point:e(10816),ringer_setting:e(10817),rsc_feature:e(10836),rsc_measurement:e(10835),sc_control_point:e(10837),scan_interval_window:e(10831),scan_refresh:e(10801),sensor_location:e(10845),serial_number_string:e(10789),"gatt.service_changed":e(10757),software_revision_string:e(10792),sport_type_for_aerobic_and_anaerobic_thresholds:e(10899),supported_new_alert_category:e(10823),supported_unread_alert_category:e(10824),system_id:e(10787),temperature:e(10862),temperature_measurement:e(10780),temperature_type:e(10781),three_zone_heart_rate_limits:e(10900),time_accuracy:e(10770),time_source:e(10771),time_update_control_point:e(10774),time_update_state:e(10775),time_with_dst:e(10769),time_zone:e(10766),true_wind_direction:e(10865),true_wind_speed:e(10864),two_zone_heart_rate_limit:e(10901),tx_power_level:e(10759),uncertainty:e(10932),unread_alert_status:e(10821),user_control_point:e(10911),user_index:e(10906),uv_index:e(10870),vo2_max:e(10902),waist_circumference:e(10903),weight:e(10904),weight_measurement:e(10909),weight_scale_feature:e(10910),wind_chill:e(10873)},a.exports.BluetoothUUID.descriptor={"gatt.characteristic_extended_properties":e(10496),"gatt.characteristic_user_description":e(10497),"gatt.client_characteristic_configuration":e(10498),"gatt.server_characteristic_configuration":e(10499),"gatt.characteristic_presentation_format":e(10500),"gatt.characteristic_aggregate_format":e(10501),valid_range:e(10502),external_report_reference:e(10503),report_reference:e(10504),value_trigger_setting:e(10506),es_configuration:e(10507),es_measurement:e(10508),es_trigger_setting:e(10509)},a.exports.BluetoothUUID.getService=f("service"),a.exports.BluetoothUUID.getCharacteristic=f("characteristic"),a.exports.BluetoothUUID.getDescriptor=f("descriptor")}),c.register("./filter-validation.js",function(a,b,c){function g(a,b){var c=!0;return"string"==typeof b?d.isHex(b)?d.isLowercase(b)||(c=!1):d.toVensiUUID(a.BluetoothUUID.getService(b))||(c=!1):"number"!=typeof b&&(c=!1),c}function h(a){for(var b in a.manufacturerData)if(a.manufacturerData.hasOwnProperty(b)){if(!(d.stringIsInteger(b)&&void 0!=b&&b>0&&65535>b))return!1;if("object"!=typeof a.manufacturerData[b]||!(d.isEmpty(a.manufacturerData[b])||"dataPrefix"in a.manufacturerData[b]))return!1;if("dataPrefix"in a.manufacturerData[b]){if(a.manufacturerData[b].dataPrefix instanceof Uint8Array==0)return!1;if("mask"in a.manufacturerData[b]){if(a.manufacturerData[b].mask instanceof Uint8Array==0)return!1;if(a.manufacturerData[b].dataPrefix.byteLength!=a.manufacturerData[b].mask.byteLength)return!1}}}return!0}function i(a){for(var b in a.serviceData)if(a.serviceData.hasOwnProperty(b)&&!d.isEmpty(a.serviceData[b]))return!1;return!0}function j(a,b){var d,f,c={};if(0!=b.length){for(d=0;d<b.length;d++)if(f=b[d],!g(a,f))return c={error:!0,message:e.invalidServiceUUIDMessage(f)}}else c={error:!0,message:"Illegal filter object"};return c}function k(a){return"object"!=typeof a.manufacturerData||d.isEmpty(a.manufacturerData)||!h(a)?{error:!0,message:f.INVALID_MFR_DATA_FORMAT}:{}}function l(a){return"object"!=typeof a.serviceData||d.isEmpty(a.serviceData)||!i(a)?{error:!0,message:f.INVALID_SERVICE_DATA_FORMAT}:{}}function m(a){return"string"!=typeof a.name||d.getUTF8Length(a.name)>248?{error:!0,message:f.INVALID_NAME_ERROR_MESSAGE}:{}}function n(a){return 0==a.namePrefix.length||"string"!=typeof a.namePrefix||d.getUTF8Length(a.namePrefix)>248?{error:!0,message:f.INVALID_NAME_PREFIX_ERROR_MESSAGE}:{}}function o(a,b,c){return a&&b?c?{error:!0,message:f.INVALID_OPTIONS_ERROR_MESSAGE}:{error:!0,message:f.INVALID_LESCAN_OPTIONS_ERROR_MESSAGE}:a&&0==a.length?{error:!0,message:f.EMPTY_FILTER_ERROR_MESSAGE}:a&&0!=a.length||!b?a||b?{error:!1,isFiltering:!0}:c?{error:!0,message:f.INVALID_OPTIONS_ERROR_MESSAGE}:{error:!0,message:f.INVALID_LESCAN_OPTIONS_ERROR_MESSAGE}:{error:!1,isFiltering:!1}}var d=c("./util"),e=c("./wb-errors"),f=c("./wb-errors").errors;a.exports.validateFilters=function(a,b,c,d){var h,i,p,q,r,f=4==arguments.length,g=o(b,c,f);if(g.error)return g;if(g.isFiltering)for(h=0;h<b.length;h++){i=b[h];for(p in i)if(i.hasOwnProperty(p)&&void 0!=i[p]){switch(p){case"services":q=j(a,i.services);break;case"name":q=m(i);break;case"namePrefix":q=n(i);break;case"manufacturerData":q=k(i);break;case"serviceData":q=l(i);break;default:q={error:!0,message:"Illegal filter object"}}if(q.error)return q}}return d&&(r=j(a,d),r.error)?r:g}}),c.register("./wb-filters.js",function(a,b,c){function f(a,b,c){var f,g,h,i,e=[];for(f=0;f<c.length;f++)for(g=d.toVensiUUID(a.BluetoothUUID.getService(c[f])),h=0;h<b.length;h++)i=d.toVensiUUID(a.BluetoothUUID.getService(b[h])),g==i&&-1==e.indexOf(i)&&e.push(i);return e}var d=c("./util"),e=c("./filter-util"),g=function(a,b,c){return c.hasOwnProperty("services")&&void 0!=c.services&&c.services.length>0?f(a,c.services,b):[]};a.exports.getOptionalServices=function(a,b,c){return c&&c.length>0?f(a,c,b):[]},a.exports.getAllSupportedServices=function(b,c,d,e){var f=[],h=g(b,c,d),i=a.exports.getOptionalServices(b,c,e);return f=h.concat(i)},a.exports.filterScan=function(a,b,c){var d,f,g,h,i,j;for(b.advdata&&b.advdata.serviceUUIDs.length>0?b.serviceUUIDs=b.advdata.serviceUUIDs:b.serviceUUIDs=b.getAllAdvertisedServiceUUIDs(),d=0;d<c.length;d++)if(f=e.nameFilter(c[d],b),g=e.namePrefixFilter(c[d],b),h=e.servicesFilter(a,c[d],b),i=e.manufacturerDataFilter(c[d],b),j=e.serviceDataFilter(c[d],b),f&&g&&h&&i&&j)return{peripheral:b,filter:c[d]};return!1},a.exports.BluetoothLEScanFilterInit=function(a){var c,b=this;b.services=void 0,b.name=void 0,b.namePrefix=void 0,b.manufacturerData=void 0,b.serviceData=void 0;for(c in a)if(a.hasOwnProperty(c)){if(!(c in b))throw Error("Illegal filter property");b[c]=a[c]}return this}}),b.exports=c("./index.js")}(require,module);
