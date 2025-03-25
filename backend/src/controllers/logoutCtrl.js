const logoutCtrl = {}

logoutCtrl.logout = async (req, res) => {
    try {
        res.clearCookie("authToken");
        res.json({ message: "Logout successful" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export default logoutCtrl;