/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/api_protect/users/route";
exports.ids = ["app/api/api_protect/users/route"];
exports.modules = {

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "sqlite3":
/*!**************************!*\
  !*** external "sqlite3" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("sqlite3");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fapi_protect%2Fusers%2Froute&page=%2Fapi%2Fapi_protect%2Fusers%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fapi_protect%2Fusers%2Froute.ts&appDir=%2Fhome%2Fyoungchan%2FDocuments%2Fbio-web%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fyoungchan%2FDocuments%2Fbio-web&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fapi_protect%2Fusers%2Froute&page=%2Fapi%2Fapi_protect%2Fusers%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fapi_protect%2Fusers%2Froute.ts&appDir=%2Fhome%2Fyoungchan%2FDocuments%2Fbio-web%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fyoungchan%2FDocuments%2Fbio-web&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _home_youngchan_Documents_bio_web_app_api_api_protect_users_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/api_protect/users/route.ts */ \"(rsc)/./app/api/api_protect/users/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/api_protect/users/route\",\n        pathname: \"/api/api_protect/users\",\n        filename: \"route\",\n        bundlePath: \"app/api/api_protect/users/route\"\n    },\n    resolvedPagePath: \"/home/youngchan/Documents/bio-web/app/api/api_protect/users/route.ts\",\n    nextConfigOutput,\n    userland: _home_youngchan_Documents_bio_web_app_api_api_protect_users_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZhcGlfcHJvdGVjdCUyRnVzZXJzJTJGcm91dGUmcGFnZT0lMkZhcGklMkZhcGlfcHJvdGVjdCUyRnVzZXJzJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGYXBpX3Byb3RlY3QlMkZ1c2VycyUyRnJvdXRlLnRzJmFwcERpcj0lMkZob21lJTJGeW91bmdjaGFuJTJGRG9jdW1lbnRzJTJGYmlvLXdlYiUyRmFwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9JTJGaG9tZSUyRnlvdW5nY2hhbiUyRkRvY3VtZW50cyUyRmJpby13ZWImaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ3FCO0FBQ29CO0FBQ2pHO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGOztBQUUxRiIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCIvaG9tZS95b3VuZ2NoYW4vRG9jdW1lbnRzL2Jpby13ZWIvYXBwL2FwaS9hcGlfcHJvdGVjdC91c2Vycy9yb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvYXBpX3Byb3RlY3QvdXNlcnMvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9hcGlfcHJvdGVjdC91c2Vyc1wiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvYXBpX3Byb3RlY3QvdXNlcnMvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCIvaG9tZS95b3VuZ2NoYW4vRG9jdW1lbnRzL2Jpby13ZWIvYXBwL2FwaS9hcGlfcHJvdGVjdC91c2Vycy9yb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fapi_protect%2Fusers%2Froute&page=%2Fapi%2Fapi_protect%2Fusers%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fapi_protect%2Fusers%2Froute.ts&appDir=%2Fhome%2Fyoungchan%2FDocuments%2Fbio-web%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fyoungchan%2FDocuments%2Fbio-web&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(rsc)/./app/api/api_protect/users/route.ts":
/*!********************************************!*\
  !*** ./app/api/api_protect/users/route.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   DELETE: () => (/* binding */ DELETE),\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var sqlite3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! sqlite3 */ \"sqlite3\");\n/* harmony import */ var sqlite3__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(sqlite3__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var sqlite__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! sqlite */ \"(rsc)/./node_modules/sqlite/build/index.mjs\");\n\n\n\n// SQLite 데이터베이스를 열기 위한 함수\nasync function openDB() {\n    return (0,sqlite__WEBPACK_IMPORTED_MODULE_2__.open)({\n        filename: 'prisma/dev.db',\n        driver: (sqlite3__WEBPACK_IMPORTED_MODULE_1___default().Database)\n    });\n}\n// GET 요청 핸들러\nasync function GET() {\n    try {\n        const db = await openDB();\n        // User 테이블에서 데이터 가져오기\n        const users = await db.all('SELECT key_id AS key, id, name, regi_date FROM User');\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(users);\n    } catch (error) {\n        console.error('Database Error:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'Failed to fetch users'\n        }, {\n            status: 500\n        });\n    }\n}\nasync function DELETE(req) {\n    try {\n        const { id } = await req.json();\n        if (!id) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'User ID is required'\n            }, {\n                status: 400\n            });\n        }\n        const db = await openDB();\n        await db.run('DELETE FROM User WHERE id = ?', id);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            message: 'User deleted successfully'\n        });\n    } catch (error) {\n        console.error('Database Error:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'Failed to delete user'\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2FwaV9wcm90ZWN0L3VzZXJzL3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUEyQztBQUNiO0FBQ0E7QUFHOUIsMEJBQTBCO0FBQzFCLGVBQWVHO0lBQ2IsT0FBT0QsNENBQUlBLENBQUM7UUFDVkUsVUFBVTtRQUNWQyxRQUFRSix5REFBZ0I7SUFDMUI7QUFDRjtBQUVBLGFBQWE7QUFDTixlQUFlTTtJQUNwQixJQUFJO1FBQ0YsTUFBTUMsS0FBSyxNQUFNTDtRQUVqQixzQkFBc0I7UUFDdEIsTUFBTU0sUUFBUSxNQUFNRCxHQUFHRSxHQUFHLENBQUM7UUFFM0IsT0FBT1YscURBQVlBLENBQUNXLElBQUksQ0FBQ0Y7SUFDM0IsRUFBRSxPQUFPRyxPQUFPO1FBQ2RDLFFBQVFELEtBQUssQ0FBQyxtQkFBbUJBO1FBQ2pDLE9BQU9aLHFEQUFZQSxDQUFDVyxJQUFJLENBQUM7WUFBRUMsT0FBTztRQUF3QixHQUFHO1lBQUVFLFFBQVE7UUFBSTtJQUM3RTtBQUNGO0FBRU8sZUFBZUMsT0FBT0MsR0FBWTtJQUN2QyxJQUFJO1FBQ0YsTUFBTSxFQUFFQyxFQUFFLEVBQUUsR0FBRyxNQUFNRCxJQUFJTCxJQUFJO1FBQzdCLElBQUksQ0FBQ00sSUFBSTtZQUNQLE9BQU9qQixxREFBWUEsQ0FBQ1csSUFBSSxDQUFDO2dCQUFFQyxPQUFPO1lBQXNCLEdBQUc7Z0JBQUVFLFFBQVE7WUFBSTtRQUMzRTtRQUNBLE1BQU1OLEtBQUssTUFBTUw7UUFFakIsTUFBTUssR0FBR1UsR0FBRyxDQUFDLGlDQUFpQ0Q7UUFDOUMsT0FBT2pCLHFEQUFZQSxDQUFDVyxJQUFJLENBQUM7WUFBRVEsU0FBUztRQUE0QjtJQUNsRSxFQUFFLE9BQU9QLE9BQU87UUFDZEMsUUFBUUQsS0FBSyxDQUFDLG1CQUFtQkE7UUFDakMsT0FBT1oscURBQVlBLENBQUNXLElBQUksQ0FBQztZQUFFQyxPQUFPO1FBQXdCLEdBQUc7WUFBRUUsUUFBUTtRQUFJO0lBQzdFO0FBQ0YiLCJzb3VyY2VzIjpbIi9ob21lL3lvdW5nY2hhbi9Eb2N1bWVudHMvYmlvLXdlYi9hcHAvYXBpL2FwaV9wcm90ZWN0L3VzZXJzL3JvdXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gJ25leHQvc2VydmVyJztcbmltcG9ydCBzcWxpdGUzIGZyb20gJ3NxbGl0ZTMnO1xuaW1wb3J0IHsgb3BlbiB9IGZyb20gJ3NxbGl0ZSc7XG5pbXBvcnQgeyBtZXNzYWdlIH0gZnJvbSAnYW50ZCc7XG5cbi8vIFNRTGl0ZSDrjbDsnbTthLDrsqDsnbTsiqTrpbwg7Je06riwIOychO2VnCDtlajsiJhcbmFzeW5jIGZ1bmN0aW9uIG9wZW5EQigpIHtcbiAgcmV0dXJuIG9wZW4oe1xuICAgIGZpbGVuYW1lOiAncHJpc21hL2Rldi5kYicsIC8vIGRldi5kYuydmCDsi6TsoJwg6rK966GcXG4gICAgZHJpdmVyOiBzcWxpdGUzLkRhdGFiYXNlLFxuICB9KTtcbn1cblxuLy8gR0VUIOyalOyyrSDtlbjrk6Trn6xcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBHRVQoKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgZGIgPSBhd2FpdCBvcGVuREIoKTtcblxuICAgIC8vIFVzZXIg7YWM7J2067iU7JeQ7IScIOuNsOydtO2EsCDqsIDsoLjsmKTquLBcbiAgICBjb25zdCB1c2VycyA9IGF3YWl0IGRiLmFsbCgnU0VMRUNUIGtleV9pZCBBUyBrZXksIGlkLCBuYW1lLCByZWdpX2RhdGUgRlJPTSBVc2VyJyk7XG5cbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24odXNlcnMpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0RhdGFiYXNlIEVycm9yOicsIGVycm9yKTtcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogJ0ZhaWxlZCB0byBmZXRjaCB1c2VycycgfSwgeyBzdGF0dXM6IDUwMCB9KTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gREVMRVRFKHJlcTogUmVxdWVzdCkge1xuICB0cnkge1xuICAgIGNvbnN0IHsgaWQgfSA9IGF3YWl0IHJlcS5qc29uKCk7XG4gICAgaWYgKCFpZCkge1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6ICdVc2VyIElEIGlzIHJlcXVpcmVkJyB9LCB7IHN0YXR1czogNDAwIH0pO1xuICAgIH1cbiAgICBjb25zdCBkYiA9IGF3YWl0IG9wZW5EQigpO1xuXG4gICAgYXdhaXQgZGIucnVuKCdERUxFVEUgRlJPTSBVc2VyIFdIRVJFIGlkID0gPycsIGlkKTtcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBtZXNzYWdlOiAnVXNlciBkZWxldGVkIHN1Y2Nlc3NmdWxseScgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcignRGF0YWJhc2UgRXJyb3I6JywgZXJyb3IpO1xuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiAnRmFpbGVkIHRvIGRlbGV0ZSB1c2VyJyB9LCB7IHN0YXR1czogNTAwIH0pO1xuICB9XG59XG4iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwic3FsaXRlMyIsIm9wZW4iLCJvcGVuREIiLCJmaWxlbmFtZSIsImRyaXZlciIsIkRhdGFiYXNlIiwiR0VUIiwiZGIiLCJ1c2VycyIsImFsbCIsImpzb24iLCJlcnJvciIsImNvbnNvbGUiLCJzdGF0dXMiLCJERUxFVEUiLCJyZXEiLCJpZCIsInJ1biIsIm1lc3NhZ2UiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/api_protect/users/route.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/sqlite"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fapi_protect%2Fusers%2Froute&page=%2Fapi%2Fapi_protect%2Fusers%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fapi_protect%2Fusers%2Froute.ts&appDir=%2Fhome%2Fyoungchan%2FDocuments%2Fbio-web%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fyoungchan%2FDocuments%2Fbio-web&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();