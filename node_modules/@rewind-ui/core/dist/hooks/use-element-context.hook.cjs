'use client';
"use strict";var e=require("react/jsx-runtime"),r=require("react");exports.createElementContext=function(t){const n=r.createContext(null);return[({children:r,value:t})=>e.jsx(n.Provider,Object.assign({value:t},{children:r})),()=>{const e=r.useContext(n);if(null===e)throw new Error(t);return e}]};
