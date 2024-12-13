const pagesController = {
    index: (req, res) => {
        res.render("pages/index", { title: "Головна сторінка" });
    },
    login: (req, res) => {
        res.render("pages/login", { title: "Авторизація" });
    },
    register: (req, res) => {
        res.render("pages/register", { title: "Реєстрація" });
    },
    user: (req, res) => {
        res.render("pages/user", { title: "Користувач", userId: req.user.id });
    },
};

export default pagesController;