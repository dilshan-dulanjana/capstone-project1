"use strict";exports.textNormalize=function(e){return e.trim().normalize("NFD").replace(/\p{Diacritic}/gu,"").toLowerCase()};
