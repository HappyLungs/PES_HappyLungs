function parseLocalProfileImage(img) {
	if (img !== null && img !== undefined) {
		if (!img.includes("file://")) {
			return img;
		}
	}
	return "https://www.congresodelasemfyc.com/assets/imgs/default/default-logo.jpg";
}
export { parseLocalProfileImage };
