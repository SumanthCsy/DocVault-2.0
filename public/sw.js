if (!self.define) {
  const e = (e) => {
      let r = {};
      const n = (n) => {
        if (r[n]) return r[n].exports;
        const t = { id: n, exports: {} };
        return e[n](t, t.exports), (r[n] = t), t.exports;
      };
      return n.m = e, n;
    },
    r = Object.create(null);
  self.define = (e, t) => {
    e = n(e);
    let a;
    void 0 === r[e] &&
      ((a = {}),
      Object.defineProperty(a, Symbol.toStringTag, { value: "Module" }),
      (r[e] = a)),
      ("function" == typeof t ? t(a.exports) : t).next &&
        ((a.exports.default = t),
        Object.defineProperty(a.exports, Symbol.toStringTag, {
          value: "Module",
        }));
  };
}

define("/cache-first", function (e, r) {
  r.exports = {
    cacheName: "next-image",
    plugins: [
      {
        handlerDidError: async () =>
          (await caches.match("/public/favicon.ico")) ||
          new Response.error(),
      },
    ],
  };
});
