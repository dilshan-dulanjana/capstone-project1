'use client';
"use strict";var e=require("react/jsx-runtime"),t=require("react");exports.createIndependentContext=function(){const r=t.createContext({});return[({children:t,value:n})=>e.jsx(r.Provider,Object.assign({value:n},{children:t})),()=>t.useContext(r)]};
