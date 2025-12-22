module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/redux/constant/common.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "API_CALLING",
    ()=>API_CALLING,
    "API_FAILURE",
    ()=>API_FAILURE
]);
const API_CALLING = "api_calling";
const API_FAILURE = "api_failure";
}),
"[project]/redux/reducers/user.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "userReducer",
    ()=>userReducer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$constant$2f$common$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/redux/constant/common.tsx [app-ssr] (ecmascript)");
;
const initialState = {
    bookList: []
};
const userReducer = (state = initialState, action)=>{
    switch(action.type){
        case __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$constant$2f$common$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_CALLING"]:
            return {
                ...state,
                isLoading: true
            };
        default:
            return state;
    }
};
}),
"[project]/redux/reducers/rootReducer.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$redux$2f$dist$2f$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/redux/dist/redux.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$reducers$2f$user$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/redux/reducers/user.tsx [app-ssr] (ecmascript)");
;
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$redux$2f$dist$2f$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["combineReducers"])({
    userReducer: __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$reducers$2f$user$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["userReducer"]
});
}),
"[project]/redux/sagas/user.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getUserSaga",
    ()=>getUserSaga
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$redux$2d$saga$2f$effects$2f$dist$2f$redux$2d$saga$2d$effects$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/redux-saga/effects/dist/redux-saga-effects.esm.js [app-ssr] (ecmascript) <locals>");
;
;
function* getUserSaga() {}
}),
"[project]/redux/sagas/index.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$redux$2d$saga$2f$effects$2f$dist$2f$redux$2d$saga$2d$effects$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/redux-saga/effects/dist/redux-saga-effects.esm.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$redux$2d$saga$2f$core$2f$effects$2f$dist$2f$redux$2d$saga$2d$core$2d$effects$2e$development$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@redux-saga/core/effects/dist/redux-saga-core-effects.development.esm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$sagas$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/redux/sagas/user.js [app-ssr] (ecmascript)");
;
;
function* rootSaga() {
    yield (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$redux$2d$saga$2f$core$2f$effects$2f$dist$2f$redux$2d$saga$2d$core$2d$effects$2e$development$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["all"])([
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$sagas$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getUserSaga"])()
    ]);
}
const __TURBOPACK__default__export__ = rootSaga;
}),
"[project]/redux/store.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "store",
    ()=>store
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$redux$2d$saga$2f$dist$2f$redux$2d$saga$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/redux-saga/dist/redux-saga.esm.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$redux$2d$saga$2f$core$2f$dist$2f$redux$2d$saga$2d$core$2e$development$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@redux-saga/core/dist/redux-saga-core.development.esm.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$reducers$2f$rootReducer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/redux/reducers/rootReducer.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$sagas$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/redux/sagas/index.js [app-ssr] (ecmascript)");
;
;
;
;
const sagaMiddleware = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$redux$2d$saga$2f$core$2f$dist$2f$redux$2d$saga$2d$core$2e$development$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])();
const store = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["configureStore"])({
    reducer: __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$reducers$2f$rootReducer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
    middleware: (getDefaultMiddleware)=>getDefaultMiddleware({
            thunk: false
        }).concat(sagaMiddleware)
});
sagaMiddleware.run(__TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$sagas$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]);
}),
"[project]/redux/ReduxProvider.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ReduxProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-redux/dist/react-redux.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/redux/store.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
function ReduxProvider({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Provider"], {
        store: __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["store"],
        children: children
    }, void 0, false, {
        fileName: "[project]/redux/ReduxProvider.tsx",
        lineNumber: 7,
        columnNumber: 10
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__37ab2f8f._.js.map