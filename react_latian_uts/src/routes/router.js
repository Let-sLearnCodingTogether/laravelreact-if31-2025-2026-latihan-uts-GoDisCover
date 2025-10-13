// File: src/routes/router.js

import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    // Rute 1: Halaman Utama (Daftar Kutipan)
    {
        path: "/",
        lazy: {
            Component: async () => {
                const component = await import("../pages/quotes/Quotes")

                return component.default
            }
        }
    },
    // Rute 2: Halaman untuk Membuat Kutipan Baru
    {
        path: "/new-quote",
        lazy: {
            Component: async () => {
                const component = await import("../pages/quotes/CreateQuote")

                return component.default
            }
        }
    },
    // Rute 3: Halaman untuk Memperbarui Kutipan (dengan ID dinamis)
    {
        path: "/update-quote/:id", // Ini adalah cara menggunakan parameter
        lazy: {
            Component: async () => {
                const component = await import("../pages/quotes/UpdateQuote")

                return component.default
            }
        }
    },
]);

export default router;