"use client";
"use strict";
exports.__esModule = true;
var framer_motion_1 = require("framer-motion");
var functions_1 = require("../../functions");
var Container = function (_a) {
    var children = _a.children, className = _a.className, _b = _a.delay, delay = _b === void 0 ? 0.2 : _b, reverse = _a.reverse, simple = _a.simple;
    return (React.createElement(framer_motion_1.motion.div, { className: functions_1.cn("w-full h-full", className), initial: { opacity: 0, y: reverse ? -10 : 10 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-50px" }, transition: {
            delay: delay,
            duration: simple ? 0.3 : 0.5,
            type: "tween",
            ease: "easeOut",
            opacity: { duration: 0.4 }
        } }, children));
};
exports["default"] = Container;
