import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
	base: "/",
	server: {
		port: 5173,
		open: true,
	},
	build: {
		outDir: "dist",
		assetsDir: "assets", 
		sourcemap: false, 
		rollupOptions: {
			input: {
				main: resolve(__dirname, "index.html"),
				basketLIst: resolve(__dirname, "src/pages/basketLIst/index.html"),
				cardProduct: resolve(__dirname, "src/pages/cardProduct/index.html"),
				favoritesList: resolve(__dirname, "src/pages/favoritesList/index.html"),
				technicalList: resolve(__dirname, "src/pages/technicalList/index.html"),
			},
		},
	},
	preview: {
		port: 5000,
		open: true,
	},
});
